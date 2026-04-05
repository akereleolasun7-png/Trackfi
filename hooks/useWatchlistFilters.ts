// hooks/useWatchlistFilters.ts
import { useState, useMemo } from 'react'
import { WatchlistCoin } from '@/types/index'

export type PerformanceFilter = 'all' | 'gainers' | 'losers'
export type SortKey = 'default' | 'price' | 'change_24h' | 'change_7d' | 'market_cap'
export type SortDir = 'asc' | 'desc'

export interface WatchlistFilters {
  performance: PerformanceFilter
  
  sortKey: SortKey
  sortDir: SortDir
}

const DEFAULT_FILTERS: WatchlistFilters = {
  performance: 'all',
  sortKey: 'default',
  sortDir: 'desc',
}

export function useWatchlistFilters(coins: WatchlistCoin[]) {
  const [filters, setFilters] = useState<WatchlistFilters>(DEFAULT_FILTERS)

  const setFilter = (patch: Partial<WatchlistFilters>) =>
    setFilters(prev => ({ ...prev, ...patch }))

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  const isActive =
    filters.performance !== 'all' ||
    filters.sortKey !== 'default'

  const filtered = useMemo(() => {
    let result = [...coins]

    // performance filter
    if (filters.performance === 'gainers')
      result = result.filter(c => c.price_change_percentage_24h > 0)
    if (filters.performance === 'losers')
      result = result.filter(c => c.price_change_percentage_24h < 0)

    // sort
    if (filters.sortKey !== 'default') {
      result.sort((a, b) => {
        let aVal = 0, bVal = 0
        if (filters.sortKey === 'price')      { aVal = a.current_price; bVal = b.current_price }
        if (filters.sortKey === 'change_24h') { aVal = a.price_change_percentage_24h; bVal = b.price_change_percentage_24h }
        if (filters.sortKey === 'change_7d')  { aVal = a.price_change_percentage_7d;  bVal = b.price_change_percentage_7d }
        if (filters.sortKey === 'market_cap') { aVal = a.market_cap; bVal = b.market_cap }
        return filters.sortDir === 'desc' ? bVal - aVal : aVal - bVal
      })
    }

    return result
  }, [coins, filters])

  return { filters, setFilter, resetFilters, isActive, filtered }
}