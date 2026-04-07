import React, { useState } from "react";
import { SlidersHorizontal, Download } from "lucide-react";
import { WatchlistCoin } from "@/types/index";
import { CoinRowSection } from "./coinRowSection";
import { usePagination } from "@/hooks/usePagination";
import { useWatchlistFilters } from "@/hooks/useWatchlistFilters";
import { FilterSection } from "./filterSection";
import { exportWatchlistToCSV } from "@/lib/helpers/watchlistExport";

interface CoinTableProps {
  coins: WatchlistCoin[];
  title: string;
  onToggleStar: (id: string) => void;
  onToggleAlert: (id: string) => void;
  showExport?: boolean;
  pageSize?: number;
}
function CoinTable({
  coins,
  title,
  onToggleStar,
  onToggleAlert,
}: CoinTableProps) {
  const PAGE_SIZE = 8;
  const [showFilter, setShowFilter] = useState(false);

  const { filters, setFilter, resetFilters, isActive, filtered } =
    useWatchlistFilters(coins);
  const { page, setPage, totalPages, paginated } = usePagination(
    filtered,
    PAGE_SIZE,
  );
  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{title}</h2>
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
              <FilterSection
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

        <div
          className="overflow-x-auto -mx-6 px-6 scroll-smooth"
          style={{
            scrollbarColor: "#000000 transparent",
          }}
        >
          <table className="w-full min-w-[600px] bg-white/5">
            <thead>
              <tr className="text-[12px] text-white/30 uppercase tracking-widest">
                <th className="text-left pt-4 pb-4 font-bold pl-2">Coin</th>
                <th className="text-left  pt-4 pb-4 font-bold">Price</th>
                <th className="text-left pt-4 pb-4 font-bold">24H Change</th>
                <th className="text-left pt-4 pb-4 font-bold hidden md:table-cell">
                  7D Change
                </th>
                <th className="text-left  pt-4 pb-4 font-bold hidden lg:table-cell">
                  Market Cap
                </th>
                <th className="text-left  pt-4 pb-4 font-bold hidden sm:table-cell">
                  Last 7 Days
                </th>
                <th className="text-left pt-4 pb-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((coin) => (
                <CoinRowSection
                  key={coin.id}
                  coin={coin}
                  onToggleStar={onToggleStar}
                  onToggleAlert={onToggleAlert}
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
    </>
  );
}

export default CoinTable;
