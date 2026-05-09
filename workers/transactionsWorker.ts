import { Worker } from "bullmq";
import Redis from "ioredis";
import { createClient } from "@supabase/supabase-js";

interface BlockstreamTx {
  txid: string;
  vout: { scriptpubkey_address: string; value: number }[];
  vin: { prevout: { scriptpubkey_address: string; value: number } }[];
  status: { confirmed: boolean; block_time: number };
}

interface HeliusTx {
  signature: string;
  timestamp: number;
  transactionError: null | object;
  type: string;
  tokenTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    mint: string;
  }[];
  nativeTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }[];
}

interface MoralisTx {
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  block_timestamp: string;
  receipt_status: string;
  native_price?: { usd_price: number };
}

interface TransactionRow {
  user_id: string;
  coin_id: string;
  symbol: string;
  type: "deposit" | "withdrawal";
  amount: number;
  price: number;
  total_value: number;
  status: "completed" | "failed";
  network: string;
  date: string;
  tx_hash: string;
}

// interface ChainMeta {
//   coin_id: string;
//   symbol: string;
// }
interface EvmChainMeta {
  moralisChain: string;
  coin_id: string;
  symbol: string;
}

// ─── Env Guards ───────────────────────────────────────────────
if (!process.env.REDIS_URL) throw new Error("REDIS_URL is required");
if (!process.env.MORALIS_API_KEY) throw new Error("MORALIS_API_KEY is required");
if (!process.env.HELIUS_API_KEY) throw new Error("HELIUS_API_KEY is required");
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("Supabase credentials are required");

const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {},
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const EVM_CHAIN_META: Record<string, EvmChainMeta> = {
  ethereum: { moralisChain: "eth",      coin_id: "ethereum",      symbol: "ETH"  },
  polygon:  { moralisChain: "polygon",  coin_id: "matic-network", symbol: "MATIC" },
  base:     { moralisChain: "base",     coin_id: "ethereum",      symbol: "ETH"  },
  bsc:      { moralisChain: "bsc",      coin_id: "binancecoin",   symbol: "BNB"  },
  arbitrum: { moralisChain: "arbitrum", coin_id: "ethereum",      symbol: "ETH"  },
};

// const CHAIN_META: Record<string, ChainMeta> = {
//   bitcoin: { coin_id: "bitcoin", symbol: "BTC" },
//   solana:  { coin_id: "solana",  symbol: "SOL" },
//   ...Object.fromEntries(
//     Object.entries(EVM_CHAIN_META).map(([k, v]) => [k, { coin_id: v.coin_id, symbol: v.symbol }])
//   ),
// };

// ─── Fetchers ─────────────────────────────────────────────────
async function fetchEvm(walletAddress: string, moralisChain: string): Promise<MoralisTx[]> {
  const url = `https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/history?chain=${moralisChain}&limit=80`;
  const res = await fetch(url, { headers: { "X-API-Key": process.env.MORALIS_API_KEY! } });
  const json = await res.json();
  return json.result ?? [];
}

async function fetchBtc(walletAddress: string): Promise<BlockstreamTx[]> {
  const res = await fetch(`https://blockstream.info/api/address/${walletAddress}/txs`);
  return res.json();
}

async function fetchSol(walletAddress: string): Promise<HeliusTx[]> {
  const res = await fetch(
    `https://api.helius.xyz/v0/addresses/${walletAddress}/transactions?api-key=${process.env.HELIUS_API_KEY}&limit=100`
  );
  return res.json();
}

// ─── Mappers ──────────────────────────────────────────────────
function mapEvmTx(tx: MoralisTx, walletAddress: string, userId: string, meta: EvmChainMeta, provider: string): TransactionRow {
  const isSend = tx.from_address?.toLowerCase() === walletAddress.toLowerCase();
  const amount = Number(tx.value) / 1e18;
  const price = tx.native_price?.usd_price ?? 0;
  return {
    user_id: userId,
    coin_id: meta.coin_id,
    symbol: meta.symbol,
    type: isSend ? "withdrawal" : "deposit",
    amount,
    price,
    total_value: amount * price,
    status: tx.receipt_status === "1" ? "completed" : "failed",
    network: provider,
    date: new Date(tx.block_timestamp).toISOString(),
    tx_hash: tx.hash,
  };
}

function mapBtcTx(tx: BlockstreamTx, walletAddress: string, userId: string): TransactionRow {
  const receivedValue = tx.vout
    .filter(o => o.scriptpubkey_address === walletAddress)
    .reduce((sum, o) => sum + o.value, 0);

  const sentValue = tx.vin
    .filter(i => i.prevout?.scriptpubkey_address === walletAddress)
    .reduce((sum, i) => sum + i.prevout.value, 0);

  const isSend = sentValue > 0;
  const amount = (isSend ? sentValue - receivedValue : receivedValue) / 1e8;

  return {
    user_id: userId,
    coin_id: "bitcoin",
    symbol: "BTC",
    type: isSend ? "withdrawal" : "deposit",
    amount: Math.abs(amount),
    price: 0,
    total_value: 0,
    status: tx.status.confirmed ? "completed" : "failed",
    network: "bitcoin",
    date: new Date(tx.status.block_time * 1000).toISOString(),
    tx_hash: tx.txid,
  };
}

function mapSolTx(tx: HeliusTx, walletAddress: string, userId: string): TransactionRow | null {
  // Only handle TRANSFER type for now
  if (tx.type !== "TRANSFER") return null;

  // Check native SOL transfers first
  const nativeSend = tx.nativeTransfers.find(t => t.fromUserAccount === walletAddress);
  const nativeReceive = tx.nativeTransfers.find(t => t.toUserAccount === walletAddress);

  if (nativeSend || nativeReceive) {
    const transfer = nativeSend || nativeReceive!;
    const amount = transfer.amount / 1e9;
    return {
      user_id: userId,
      coin_id: "solana",
      symbol: "SOL",
      type: nativeSend ? "withdrawal" : "deposit",
      amount,
      price: 0,
      total_value: 0,
      status: tx.transactionError === null ? "completed" : "failed",
      network: "solana",
      date: new Date(tx.timestamp * 1000).toISOString(),
      tx_hash: tx.signature,
    };
  }

  // Token transfers
  const tokenSend = tx.tokenTransfers.find(t => t.fromUserAccount === walletAddress);
  const tokenReceive = tx.tokenTransfers.find(t => t.toUserAccount === walletAddress);
  const transfer = tokenSend || tokenReceive;
  if (!transfer) return null;

  return {
    user_id: userId,
    coin_id: "solana",
    symbol: "SOL",
    type: tokenSend ? "withdrawal" : "deposit",
    amount: transfer.tokenAmount,
    price: 0,
    total_value: 0,
    status: tx.transactionError === null ? "completed" : "failed",
    network: "solana",
    date: new Date(tx.timestamp * 1000).toISOString(),
    tx_hash: tx.signature,
  };
}

// ─── Worker ───────────────────────────────────────────────────
const worker = new Worker(
  "transactionQueue",
  async (job) => {
    const { userId, walletAddress, integrationId, lastSyncedAt, provider } = job.data;
    console.log(`🔄 Syncing ${walletAddress} for user ${userId} on ${provider}`);

    const lastSync = lastSyncedAt ? new Date(lastSyncedAt) : null;

    let rows: TransactionRow[] = [];

    if (provider === "bitcoin") {
      const txs = await fetchBtc(walletAddress);
      const newTxs = lastSync
        ? txs.filter(tx => new Date(tx.status.block_time * 1000) > lastSync)
        : txs;
      rows = newTxs.map(tx => mapBtcTx(tx, walletAddress, userId));

    } else if (provider === "solana") {
      const txs = await fetchSol(walletAddress);
      const newTxs = lastSync
        ? txs.filter(tx => new Date(tx.timestamp * 1000) > lastSync)
        : txs;
      rows = newTxs
        .map(tx => mapSolTx(tx, walletAddress, userId))
        .filter(Boolean) as TransactionRow[];

    } else {
      const evmMeta = EVM_CHAIN_META[provider];
      if (!evmMeta) throw new Error(`Unsupported provider: ${provider}`);
      const txs = await fetchEvm(walletAddress, evmMeta.moralisChain);
      const newTxs = lastSync
        ? txs.filter(tx => new Date(tx.block_timestamp) > lastSync)
        : txs;
      rows = newTxs.map(tx => mapEvmTx(tx, walletAddress, userId, evmMeta, provider));
    }

    console.log(`📦 Found ${rows.length} new transactions`);
    if (rows.length === 0) return { success: true, count: 0 };

    // Upsert transactions
    const { error: insertError } = await supabase
      .from("transactions")
      .upsert(rows, { onConflict: "user_id,tx_hash" });
    if (insertError) throw new Error(`Insert failed: ${insertError.message}`);

    // Update holdings
    const coinIds = [...new Set(rows.map(r => r.coin_id))];
    for (const coinId of coinIds) {
      const { data: allCoinTxs, error: allTxsError } = await supabase
        .from("transactions")
        .select("type, amount, symbol")
        .eq("user_id", userId)
        .eq("coin_id", coinId)
        .eq("status", "completed");
      if (allTxsError) throw new Error(`Holdings fetch failed: ${allTxsError.message}`);

      const totalHolding = allCoinTxs?.reduce((acc, tx) => {
        if (tx.type === "deposit" || tx.type === "buy") return acc + tx.amount;
        if (tx.type === "withdrawal" || tx.type === "sell") return acc - tx.amount;
        return acc;
      }, 0) ?? 0;

      const { error: holdingError } = await supabase
        .from("holdings")
        .upsert(
          { user_id: userId, coin_id: coinId, amount: totalHolding, source: "wallet" },
          { onConflict: "user_id,coin_id" }
        );
      if (holdingError) throw new Error(`Holdings update failed: ${holdingError.message}`);
      console.log(`[HOLDINGS] Updated ${coinId} to ${totalHolding}`);
    }

    // Update last_synced_at
    const { error: syncError } = await supabase
      .from("integrations")
      .update({ last_synced_at: new Date().toISOString() })
      .eq("id", integrationId);
    if (syncError) throw new Error(`Sync update failed: ${syncError.message}`);

    console.log(`✅ Synced ${rows.length} transactions for ${walletAddress}`);
    return { success: true, count: rows.length };
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
);

worker.on("completed", (job) => console.log(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job?.id} failed:`, err.message));
worker.on("error", (err) => console.error("Worker error:", err));

console.log("🚀 Transaction worker started");

process.on("SIGTERM", async () => { await worker.close(); connection.quit(); });
process.on("unhandledRejection", (reason) => console.error("[UNHANDLED]", reason));
process.on("uncaughtException", (error) => console.error("[UNCAUGHT]", error));