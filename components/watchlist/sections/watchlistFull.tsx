"use client";
import React, { useState } from "react";
import {
  ArrowUpRight,
  SlidersHorizontal,
  Download,
  Rocket,
} from "lucide-react";
import { formatCurrency } from "@/lib/helpers/formatPrice";
import { WatchlistCoin, WatchlistStats } from "@/types/index";
import { SentimentBar } from "./watchSentimentBar";
import { CoinRow } from "./watchCoinRow";
import { usePagination } from "@/hooks/usePagination";
import { useWatchlistFilters } from "@/hooks/useWatchlistFilters";
import { WatchlistFilter } from "../sections/watchlistFilter";
import { exportWatchlistToCSV } from "@/lib/helpers/watchlistExport";

const PAGE_SIZE = 8;

interface WatchlistFullProps {
  coins: WatchlistCoin[];
  stats?: WatchlistStats;
}

export function WatchlistFull({
  coins: initialCoins,
  stats,
}: WatchlistFullProps) {
  const safeStats = stats ?? {
    totalValue: 0,
    totalChangePercent: 0,
    topPerformer: { symbol: "N/A", changePercent: 0 },
    marketSentiment: { label: "Neutral", score: 50 },
  };
  const [coins, setCoins] = useState(initialCoins);
  const [showFilter, setShowFilter] = useState(false);

  const { filters, setFilter, resetFilters, isActive, filtered } =
    useWatchlistFilters(coins);
  const { page, setPage, totalPages, paginated } = usePagination(
    filtered,
    PAGE_SIZE,
  );

  const toggleStar = (id: string) =>
    setCoins((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isWatchlisted: !c.isWatchlisted } : c,
      ),
    );

  const toggleAlert = (id: string) =>
    setCoins((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hasAlert: !c.hasAlert } : c)),
    );

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Total Value
          </p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(safeStats.totalValue)}
          </p>
          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />+{safeStats.totalChangePercent}%
          </p>
        </div>

        {/* Top Performer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Top Performer
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                {safeStats.topPerformer.symbol}
              </p>
              <p className="text-xs text-green-400">
                +{safeStats.topPerformer.changePercent}% Today
              </p>
            </div>
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Market Sentiment
          </p>
          <SentimentBar
            label={safeStats.marketSentiment.label}
            score={safeStats.marketSentiment.score}
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">My Watchlist</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilter((p) => !p)}
              className={`flex items-center gap-1.5 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors ${isActive ? "border-primary/40 text-primary" : ""}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter {isActive && "•"}
            </button>
            <button
              onClick={() => exportWatchlistToCSV(filtered)}
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            {showFilter && (
              <WatchlistFilter
                filters={filters}
                onChange={setFilter}
                onReset={resetFilters}
                onClose={() => setShowFilter(false)}
                totalCoins={coins.length}
                filteredCount={filtered.length}
              />
            )}
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-[10px] text-white/30 uppercase tracking-widest">
                <th className="text-left pb-4 font-medium pl-2">Coin</th>
                <th className="text-left pb-4 font-medium">Price</th>
                <th className="text-left pb-4 font-medium">24H Change</th>
                <th className="text-left pb-4 font-medium hidden md:table-cell">
                  7D Change
                </th>
                <th className="text-left pb-4 font-medium hidden lg:table-cell">
                  Market Cap
                </th>
                <th className="text-left pb-4 font-medium hidden sm:table-cell">
                  Last 7 Days
                </th>
                <th className="text-left pb-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((coin) => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  onToggleStar={toggleStar}
                  onToggleAlert={toggleAlert}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <p className="text-xs text-white/30">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, coins.length)} of {coins.length} assets
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                  ${page === n ? "bg-primary text-black" : "text-white/40 hover:text-white hover:bg-white/10"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
