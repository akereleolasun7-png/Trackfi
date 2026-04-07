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

export async function toggleWatchlistStar(coinId: string, starred: boolean) {
  // const res = await fetch(`/api/watchlist/${coinId}/star`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ starred }),
  // })
  // if (!res.ok) throw new Error('Failed to toggle watchlist star')
  // return res.json()
  console.log(`Toggled star for ${coinId}: ${starred}`)
}

export async function toggleWatchlistAlert(coinId: string, alert: { type: 'price' | 'percentage'; value: number } | null) { 
  // const res = await fetch(`/api/watchlist/${coinId}/alert`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(alert),
  // })
  // if (!res.ok) throw new Error('Failed to toggle watchlist alert')
  // return res.json()
  console.log(`Toggled alert for ${coinId}: ${alert ? `${alert.type} ${alert.value}` : 'none'}`)
}