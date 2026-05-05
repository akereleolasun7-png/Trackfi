import {
  PortfolioStats,
  AssetAllocationItem,
  RecentTransactionItem,
  MarketCoinItem,
  SmartAlertItem,
} from "@/types/index";

export const dashboardApi = {
  async fetchPortfolioStats(): Promise<PortfolioStats["stats"]> {
    const res = await fetch("/api/dashboard/stats");
    if (!res.ok) throw new Error("Failed to fetch portfolio stats");
    return res.json();
  },

  async fetchWatchlistPrices(): Promise<MarketCoinItem[]> {
    const res = await fetch("/api/watchlist?limit=5");
    if (!res.ok) throw new Error("Failed to fetch market prices");
    const data = await res.json();
    return data.coins || [];
  },

  async fetchRecentTransactions(): Promise<RecentTransactionItem[]> {
    const res = await fetch("/api/transactions?limit=8");
    if (!res.ok) throw new Error("Failed to fetch transactions");
    const data = await res.json();
    return data.transactions || [];
  },

  async fetchActiveAlerts(): Promise<SmartAlertItem[]> {
    const res = await fetch("/api/alerts?limit=2");
    if (!res.ok) throw new Error("Failed to fetch alerts");
    return res.json();
  },

  async fetchAssetAllocation(): Promise<AssetAllocationItem[]> {
    const res = await fetch("/api/watchlist?limit=1000");
    if (!res.ok) throw new Error("Failed to fetch allocation");
    const data = await res.json();
    const coins = data.coins || [];

    // Transform coins to allocation format with percentages
    const totalValue = coins.reduce(
      (sum: number, c: MarketCoinItem)=> sum + (c.holdings || 0),
      0,
    );
    const colors = [
      "#ff9062",
      "#a78bfa",
      "#38bdf8",
      "#34d399",
      "#fbbf24",
      "#f87171",
      "#ec4899",
      "#8b5cf6",
    ];

    return coins.map((coin: MarketCoinItem, idx: number) => ({
      label: coin.symbol.toUpperCase(),
      percent:
        totalValue > 0
          ? Number(((coin.holdings / totalValue) * 100).toFixed(1))
          : 0,
      color: colors[idx % colors.length],
    }));
  },
};
