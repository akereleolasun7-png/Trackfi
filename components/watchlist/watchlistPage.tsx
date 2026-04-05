'use client'
import { WatchlistEmpty } from './sections/watchlistEmpty'
import { WatchlistFull } from './sections/watchlistFull'
import { WatchlistSkeleton } from '../common/skeleton'
import { useWatchlist, useWatchlistStats } from '@/lib/query/watchlist'

function WatchlistPage() {
  const { data: coins = [], isLoading } = useWatchlist()
  const {data : stats , isLoading: statsLoading} = useWatchlistStats()

  if (isLoading || statsLoading) return <WatchlistSkeleton />

  const isEmpty = coins.length === 0
  return isEmpty ? <WatchlistEmpty /> : <WatchlistFull coins={coins} stats={stats} />
}

export default WatchlistPage