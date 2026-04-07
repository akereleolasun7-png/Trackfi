"use client";
// components/transactions/sections/TransactionStats.tsx
import React from "react";
import { CalendarDays, ShoppingCart, Tag, List } from "lucide-react";
import { TransactionStats } from "@/types/transactions";
import { formatCurrency } from "@/lib/helpers/formatPrice";

interface TransactionStatsProps {
  stats: TransactionStats;
  period: string;
  onPeriodChange: (val: string) => void;
}

export function TransactionStatsSection({
  stats,
  period,
  onPeriodChange,
}: TransactionStatsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-6">
      {/* Left — 65% */}
      <div className="w-full lg:w-[65%] bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 md:mb-2">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Lifetime Activity
            </p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl md:text-5xl font-bold">{stats.total}</h2>
              <span className="text-white/40 text-xs md:text-sm">
                Transactions
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-full sm:w-auto">
            <CalendarDays className="w-4 h-4 text-white/40 shrink-0" />
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="bg-[#111] text-white text-xs focus:outline-none cursor-pointer flex-1 sm:flex-none"
            >
              <option value="30" className="bg-[#111] text-white">
                Last 30 Days
              </option>
              <option value="90" className="bg-[#111] text-white">
                Last 90 Days
              </option>
              <option value="180" className="bg-[#111] text-white">
                Last 6 Months
              </option>
              <option value="365" className="bg-[#111] text-white">
                Last 12 Months
              </option>
              <option value="all" className="bg-[#111] text-white">
                All Time
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 mt-auto">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <span>
              <ShoppingCart className="w-5 h-5 md:w-8 md:h-8 text-green-500 shrink-0" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                Total Volume Bought
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg md:text-xl font-bold text-primary truncate">
                  {formatCurrency(stats.totalVolumeBought)}
                </p>
                <span className="text-xs text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded shrink-0">
                  +{stats.boughtChange}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <span>
              <Tag className="w-5 h-5 md:w-8 md:h-8 text-red-400 shrink-0" />
            </span>

            <div className="min-w-0">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                Total Volume Sold
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg md:text-xl font-bold text-red-400 truncate">
                  {formatCurrency(stats.totalVolumeSold)}
                </p>
                <span className="text-xs text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded shrink-0">
                  {stats.soldChange}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — 35% */}
      <div className="w-full lg:w-[35%] bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col gap-2">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
          Filter by Type
        </p>

        {[
          {
            label: "All Transactions",
            count: stats.total,
            icon: <List className="w-4 h-4" />,
            active: true,
          },
          {
            label: "Buy Orders",
            count: stats.buyOrders,
            icon: <ShoppingCart className="w-4 h-4" />,
            active: false,
          },
          {
            label: "Sell Orders",
            count: stats.sellOrders,
            icon: <Tag className="w-4 h-4" />,
            active: false,
          },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm transition-colors
              ${
                item.active
                  ? "bg-primary/20 border border-primary/30 text-primary"
                  : "hover:bg-white/5 text-white/60 hover:text-white"
              }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              {item.icon}
              <span className="truncate">{item.label}</span>
            </div>
            <span
              className={`text-xs font-medium ml-2 shrink-0 ${item.active ? "text-primary" : "text-white/30"}`}
            >
              {item.count}
            </span>
          </button>
        ))}

        <div className="border-t border-white/10 mt-auto pt-4">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
            Network Status
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-white/60">
              {stats.networkStatus}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
