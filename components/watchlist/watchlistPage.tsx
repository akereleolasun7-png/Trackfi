'use client'
import { useEffect } from 'react'
import { WatchlistEmpty } from './sections/watchlistEmpty'
import { WatchlistFull } from './sections/watchlistFull'
import { WatchlistSkeleton } from '../common/skeleton'
import { useWatchlist, useWatchlistStats } from '@/lib/query/index'
import { toast } from 'sonner'

function WatchlistPage() {
  const { data: coins = [], isLoading, isError } = useWatchlist()
  const {data : stats , isLoading: statsLoading} = useWatchlistStats()
  useEffect(() => {
    if(isError) {
      toast.error("Failed to load watchlist.");
    }
  },[isError]);
  if (isLoading || statsLoading) return <WatchlistSkeleton />
  
  const isEmpty = coins.length === 0
  return isEmpty ? <WatchlistEmpty /> : <WatchlistFull coins={coins} stats={stats} />
}

export default WatchlistPage