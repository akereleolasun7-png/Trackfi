export interface PortfolioStats {
  isEmpty: boolean;
  stats?: {
    totalValue: number;
    pnlPercent: number;
    netPnL: number;
    bestPerformer: { symbol: string; percent: number } | null;
    activeAlerts: number;
    chartData: { date: string; value: number }[];
  }
}
export interface AssetAllocationItem {
  label: string;
  percent: number;
  color: string;
}

export interface RecentTransactionItem {
  id: string;
  type: "buy" | "sell"| "swap" | "deposit" | "withdrawal";
  value: number;
  coin: string  ;
  date: string;
}

export interface MarketCoinItem {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  holdings: number;      
}

export interface SmartAlertItem {
  id: string;
  type: "volatility" | "whale" | "target" | "limit";
  title: string;
  description: string;
  triggered: boolean;
  action?: string;
}