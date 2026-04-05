// lib/api/watchlist.ts
import { mockWatchlist, mockWatchlistStats } from '@/lib/mock/watchlist'
import { WatchlistCoin, WatchlistStats } from '@/types/index'
// swap these for real fetch calls when backend is ready
export async function fetchWatchlist(): Promise<WatchlistCoin[]> {
  // const res = await fetch('/api/watchlist')
  // if (!res.ok) throw new Error('Failed to fetch watchlist')
  // return res.json()
  return mockWatchlist
}

export async function fetchWatchlistStats(): Promise<WatchlistStats> {
  // const res = await fetch('/api/watchlist/stats')
  // if (!res.ok) throw new Error('Failed to fetch watchlist stats')
  // return res.json()
  return mockWatchlistStats
}