"use client";
import { useEffect } from "react";
import { DashboardSkeleton } from "../common/skeleton";

import { toast } from "sonner";
import {
  usePortfolioStats,
  useMarketPrices,
  useRecentTransactions,
  useAssetAllocation,
  useSmartAlerts,
} from "@/lib/query";
import DashboardStats from "./sections/dashboardStats";
import PerformanceCharts from "./sections/performanceChart";
import MarketWatchlist from "./sections/marketWatchlist";
import AssetAllocation from "./sections/assetAllocation";
import RecentTransactions from "./sections/recentTransactions";
import SmartAlerts from "./sections/smartAlert";
export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = usePortfolioStats();
  const { data: market = [], isLoading: marketLoading } = useMarketPrices();
  const { data: transactions = [] } = useRecentTransactions();
  const { data: allocation = [] } = useAssetAllocation();
  const {data: alerts = []} = useSmartAlerts();
  useEffect(() => {
    if (statsError) toast.error("Failed to load stats");
  }, [statsError]);

  const loading = statsLoading || marketLoading;
  
  const isEmpty = !stats || stats.totalValue === 0;

  if (loading) return <DashboardSkeleton />;
  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <DashboardStats isEmpty={isEmpty} stats={stats} />
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Chart + Watchlist */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PerformanceCharts isEmpty={isEmpty} stats={stats} />
          <MarketWatchlist market={market} />
        </div>

        {/* Right — Allocation + Transactions + Alerts */}
        <div className="flex flex-col gap-6">
          <AssetAllocation allocation={allocation} />
          <RecentTransactions transactions={transactions} />
          <SmartAlerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
