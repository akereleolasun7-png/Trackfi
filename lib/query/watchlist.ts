import { useQuery } from '@tanstack/react-query'
import { fetchWatchlist , fetchWatchlistStats } from '../api/index'

export const useWatchlist = () =>
    useQuery({
        queryKey: ['watchlist'],
        queryFn: fetchWatchlist,
        refetchInterval: 30000,
        staleTime: 1000 * 60 * 5,
    })

export const useWatchlistStats = () =>
    useQuery({
        queryKey: ['watchlist-stats'],
        queryFn: fetchWatchlistStats,
        refetchInterval: 30000,
        staleTime: 1000 * 60 * 5,
    })
