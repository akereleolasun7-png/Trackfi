import { StatCard } from "./statCard";
import { TrendingUp, Bell, Trophy, Wallet } from "lucide-react";

import React from "react";
import { PortfolioStats } from "@/types/dashboard";
import { formatCurrency } from "@/lib/helpers/formatPrice";
function DashboardStats({ isEmpty, stats }: PortfolioStats) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Total Portfolio"
        value={
          isEmpty ? (
            "$0.00"
          ) : (
            <>
              <span className="hidden sm:inline">
                ${stats?.totalValue.toLocaleString()}
              </span>
              <span className="sm:hidden">
                {formatCurrency(stats?.totalValue ?? 0)}
              </span>
            </>
          )
        }
        sub={isEmpty ? "N/A last 24h" : `+${stats?.pnlPercent}% this month`}
        icon={<Wallet className="w-5 h-5 text-primary" />}
      />
      <StatCard
        label="Total P&L"
        value={
          isEmpty ? (
            "$0.00"
          ) : (
            <>
              <span className="hidden sm:inline">
                ${stats?.netPnL.toLocaleString()}
              </span>
              <span className="sm:hidden">
                {formatCurrency(stats?.netPnL ?? 0)}
              </span>
            </>
          )
        }
        sub={isEmpty ? "No trading history" : "Realized gains"}
        icon={<TrendingUp className="w-5 h-5 text-green-400" />}
        highlight={!isEmpty}
      />
      <StatCard
        label="Best Performer"
        value={isEmpty ? "No data" : (stats?.bestPerformer?.symbol ?? "—")}
        sub={
          isEmpty ? "Add coins to track" : `+${stats?.bestPerformer?.percent}%`
        }
        icon={<Trophy className="w-5 h-5 text-yellow-400" />}
      />
      <StatCard
        label="Active Alerts"
        value={isEmpty ? "0" : String(stats?.activeAlerts)}
        sub={isEmpty ? "0 triggered today" : "Action required"}
        icon={<Bell className="w-5 h-5 text-red-400" />}
      />
    </div>
  );
}

export default DashboardStats;
