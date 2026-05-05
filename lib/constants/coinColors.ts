export const coinColors: Record<string, { bg: string; text: string }> = {
  bitcoin: { bg: "bg-orange-500/20", text: "text-orange-400" },
  ethereum: { bg: "bg-blue-500/20", text: "text-blue-400" },
  binancecoin: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  solana: { bg: "bg-purple-500/20", text: "text-purple-400" },
  cardano: { bg: "bg-sky-500/20", text: "text-sky-400" },
  tether: { bg: "bg-green-500/20", text: "text-green-400" },
  usdcoin: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  ripple :{ bg: "bg-indigo-500/20", text: "text-indigo-400" },
  polkadot: { bg: "bg-pink-500/20", text: "text-pink-400" },
  dogecoin: { bg: "bg-lime-500/20", text: "text-lime-400" },
};

export const defaultCoinColor = { bg: "bg-primary/10", text: "text-white/60" };

export function getCoinColor(symbol: string) {
  return coinColors[symbol.toLowerCase()] ?? defaultCoinColor;
}
