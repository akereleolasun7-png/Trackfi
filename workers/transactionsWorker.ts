import { Worker } from "bullmq";
import Redis from "ioredis";
import { createClient } from "@supabase/supabase-js";

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

interface ChainMeta {
  moralisChain: string;
  coin_id: string;
  symbol: string;
}

// ─── Env Guards ───────────────────────────────────────────────
if (!process.env.REDIS_URL) throw new Error("REDIS_URL is required");
if (!process.env.MORALIS_API_KEY) throw new Error("MORALIS_API_KEY is required");
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

const CHAIN_META: Record<string, ChainMeta> = {
  ethereum: { moralisChain: "eth",      coin_id: "ethereum",      symbol: "ETH"  },
  polygon:  { moralisChain: "polygon",  coin_id: "matic-network", symbol: "MATIC" },
  base:     { moralisChain: "base",     coin_id: "ethereum",      symbol: "ETH"  },
  bsc:      { moralisChain: "bsc",      coin_id: "binancecoin",   symbol: "BNB"  },
  arbitrum: { moralisChain: "arbitrum", coin_id: "ethereum",      symbol: "ETH"  },
  bitcoin:  { moralisChain: "btc",      coin_id: "bitcoin",       symbol: "BTC"  },
  solana:   { moralisChain: "solana",   coin_id: "solana",        symbol: "SOL"  },
};

async function fetchChain(walletAddress: string, moralisChain: string): Promise<MoralisTx[]> {
  let url: string;

  if (moralisChain === "solana") {
    url = `https://solana-gateway.moralis.io/account/mainnet/${walletAddress}/transactions`;
  } else {
    url = `https://deep-index.moralis.io/api/v2.2/wallets/${walletAddress}/history?chain=${moralisChain}&limit=80`;
  }

  const res = await fetch(url, {
    headers: { "X-API-Key": process.env.MORALIS_API_KEY! },
  });
  const json = await res.json();
  return json.result ?? [];
}

const worker = new Worker(
  "transactionQueue",
  async (job) => {
    const { userId, walletAddress, integrationId, lastSyncedAt, provider } = job.data;
    console.log(`🔄 Syncing ${walletAddress} for user ${userId} on ${provider}`);

    const meta = CHAIN_META[provider];
    if (!meta) throw new Error(`Unsupported provider: ${provider}`);

    const lastSync = lastSyncedAt ? new Date(lastSyncedAt).toISOString() : null;

    // 1. Fetch from Moralis
    let txs: MoralisTx[];
    try {
      txs = await fetchChain(walletAddress, meta.moralisChain);
      console.log(`📦 Found ${txs.length} transactions on ${provider}`);
    } catch (err) {
      console.error(`[ERROR] Moralis fetch failed:`, err);
      throw err;
    }

    // 2. Filter since last sync
    const newTxs = txs.filter(tx => {
      if (!lastSync) return true;
      return new Date(tx.block_timestamp) > new Date(lastSync);
    });

    console.log(`🆕 New transactions: ${newTxs.length}`);

    if (newTxs.length === 0) {
      console.log("✅ No new transactions");
      return { success: true, count: 0 };
    }

    // 3. Map to schema
    const rows: TransactionRow[] = newTxs.map(tx => {
      const isSend = tx.from_address?.toLowerCase() === walletAddress.toLowerCase();
      const amount = provider === "bitcoin" 
          ? Number(tx.value) / 1e8 
          : Number(tx.value) / 1e18;
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
    });

    console.log(`[MAPPING_COMPLETE] Mapped ${rows.length} rows`);

    // 4. Upsert transactions
    const { error: insertError } = await supabase
      .from("transactions")
      .upsert(rows, { onConflict: "user_id,tx_hash" });

    if (insertError) throw new Error(`Insert failed: ${insertError.message}`);
    console.log(`[UPSERT_SUCCESS] Upserted ${rows.length} transactions`);

    // 5. Update holdings
    const coinIds = [...new Set(rows.map(r => r.coin_id))];

    for (const coinId of coinIds) {
      const { data: allCoinTxs, error: allTxsError } = await supabase
        .from("transactions")
        .select("type, amount, symbol")
        .eq("user_id", userId)
        .eq("coin_id", coinId)
        .eq("status", "completed");

      if (allTxsError) throw new Error(`Holdings fetch failed: ${allTxsError.message}`);

      const symbol = allCoinTxs?.[0]?.symbol ?? rows.find(r => r.coin_id === coinId)?.symbol;

      const totalHolding = allCoinTxs?.reduce((acc, tx) => {
        if (tx.type === "deposit" || tx.type === "buy") return acc + tx.amount;
        if (tx.type === "withdrawal" || tx.type === "sell") return acc - tx.amount;
        return acc;
      }, 0) ?? 0;

      console.log(`[HOLDINGS] ${coinId}: ${totalHolding} ${symbol}`);

      const { error: holdingError } = await supabase
        .from("holdings")
        .upsert(
          { user_id: userId, coin_id: coinId, amount: totalHolding, source: "wallet" },
          { onConflict: "user_id,coin_id" }
        );

      if (holdingError) throw new Error(`Holdings update failed: ${holdingError.message}`);
      console.log(`[HOLDINGS] Updated ${coinId} to ${totalHolding}`);
    }

    // 6. Update last_synced_at
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

// ─── Events ───────────────────────────────────────────────────
worker.on("completed", (job) => console.log(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job?.id} failed:`, err.message));
worker.on("error", (err) => console.error("Worker error:", err));

console.log("🚀 Transaction worker started");

process.on("SIGTERM", async () => {
  await worker.close();
  connection.quit();
});

process.on("unhandledRejection", (reason) => console.error("[UNHANDLED]", reason));
process.on("uncaughtException", (error) => console.error("[UNCAUGHT]", error));