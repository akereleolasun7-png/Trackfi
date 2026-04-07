'use client'
import React from 'react'
import { X, ArrowUpDown } from 'lucide-react'
import { WatchlistFilters, PerformanceFilter, SortKey } from '@/hooks/useWatchlistFilters'

interface WatchlistFilterProps {
  filters: WatchlistFilters
  onChange: (patch: Partial<WatchlistFilters>) => void
  onReset: () => void
  onClose: () => void
  totalCoins: number
  filteredCount: number
}

export function FilterSection({
  filters,
  onChange,
  onReset,
  onClose,
  totalCoins,
  filteredCount,
}: WatchlistFilterProps) {

  const performanceOpts: { label: string; value: PerformanceFilter; color: string }[] = [
    { label: 'All',     value: 'all',     color: 'text-white' },
    { label: 'Gainers', value: 'gainers', color: 'text-green-400' },
    { label: 'Losers',  value: 'losers',  color: 'text-red-400' },
  ]

  const sortOpts: { label: string; value: SortKey }[] = [
    { label: 'Default',    value: 'default' },
    { label: 'Price',      value: 'price' },
    { label: '24H Change', value: 'change_24h' },
    { label: '7D Change',  value: 'change_7d' },
    { label: 'Market Cap', value: 'market_cap' },
  ]

  return (
    <>
    <div
    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
    onClick={onClose}
  />
        <div className="
    fixed z-50
    
    {/* mobile — bottom sheet */}
    bottom-0 left-0 right-0 rounded-tl-2xl rounded-tr-2xl
    
    {/* desktop — centered modal */}
    sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
    sm:w-full sm:max-w-lg sm:rounded-2xl

    bg-[#1a1a1a] border border-white/10 p-5
    animate-in fade-in duration-200
    sm:slide-in-from-bottom-0
    slide-in-from-bottom
  ">
      
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-white">Filter & Sort</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">
            {filteredCount} of {totalCoins} coins
          </span>
          <button
            onClick={onReset}
            className="text-xs text-primary hover:underline"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Performance */}
        <div>
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Performance</p>
          <div className="flex gap-2">
            {performanceOpts.map(opt => (
              <button
                key={opt.value}
                onClick={() => onChange({ performance: opt.value })}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors border
                  ${filters.performance === opt.value
                    ? 'bg-primary/20 border-primary/40 text-primary'
                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
                  }`}
              >
                <span className={filters.performance === opt.value ? '' : opt.color}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div>
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Sort By</p>
          <div className="flex flex-wrap gap-1.5">
            {sortOpts.map(opt => (
              <button
                key={opt.value}
                onClick={() => onChange({ sortKey: opt.value })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border
                  ${filters.sortKey === opt.value
                    ? 'bg-primary/20 border-primary/40 text-primary'
                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direction + Watchlisted */}
        <div className="flex flex-col gap-3">
          {/* Sort direction */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Direction</p>
            <button
              onClick={() => onChange({ sortDir: filters.sortDir === 'desc' ? 'asc' : 'desc' })}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {filters.sortDir === 'desc' ? 'High → Low' : 'Low → High'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}