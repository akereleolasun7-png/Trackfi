import {
  PortfolioStats,
  AssetAllocationItem,
  RecentTransactionItem,
  MarketCoinItem,
  SmartAlertItem,
} from "@/types/index";

// this  file is mock data
import { mockStats } from "@/lib/mock/portfolio";
import { mockDashboardPortfolio } from "@/lib/mock/dashoboardPorfolio";
import { mockTransactions } from "@/lib/mock/transactions";
import { mockAllocation } from "@/lib/mock/allocation";
import { mockAlerts } from "../mock/alert";

export const dashboardApi = {
  
  async fetchPortfolioStats(): Promise<PortfolioStats["stats"]> {
    // const res = await fetch('/api/portfolio/stats');
    // if (!res.ok) throw new Error('Failed to fetch portfolio stats');
    // return res.json();

    // this is a placeholder for the actual API call to Supabase. In a real implementation, you would fetch from your backend API that queries Supabase for the user's portfolio stats.
    return mockStats;
  },

  // Live market prices from CoinGecko (cached via Redis)
  async fetchMarketPrices(): Promise<MarketCoinItem[]> {
    // const res = await fetch('/api/market/prices');
    // if (!res.ok) throw new Error('Failed to fetch market prices');
    // return res.json();

    // this is a placeholder for the actual API call to CoinGecko, which should be cached on the server side using Redis for performance. In a real implementation, you would fetch from your backend API that handles the caching logic.
    return mockDashboardPortfolio;
  },

  // Recent transactions from Supabase
  async fetchRecentTransactions(): Promise<RecentTransactionItem[]> {
    // const res = await fetch('/api/transactions/recent');
    // if (!res.ok) throw new Error('Failed to fetch transactions');
    // return res.json();

    // this is a placeholder for the actual API call to Supabase. In a real implementation, you would fetch from your backend API that queries Supabase for the user's recent transactions.
    return mockTransactions;
  },
  // Active alerts count from Supabase
  async fetchActiveAlerts(): Promise<SmartAlertItem[]> {
    // const res = await fetch('/api/alerts/count');
    // if (!res.ok) throw new Error('Failed to fetch alerts');
    // const data = await res.json();
    // return data.count;

    // this is a placeholder for the actual API call to Supabase. In a real implementation, you would fetch from your backend API that queries Supabase for the user's active alerts.
    return mockAlerts;
  },

  // Asset allocation breakdown
  async fetchAssetAllocation(): Promise<AssetAllocationItem[]> {
    // const res = await fetch('/api/portfolio/allocation');
    // if (!res.ok) throw new Error('Failed to fetch allocation');
    // return res.json();

    // this is a placeholder for the actual API call to Supabase. In a real implementation, you would fetch from your backend API that queries Supabase for the user's asset allocation.
    return mockAllocation;
  },
};
