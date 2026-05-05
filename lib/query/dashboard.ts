import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/index'

export const usePortfolioStats = () =>
  useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: dashboardApi.fetchPortfolioStats,
    refetchInterval: 60000,
    staleTime:  1000 * 60 * 5,
  })

export const useWatchlistPrices = () =>
  useQuery({
    queryKey: ['watchlist-prices'],
    queryFn: dashboardApi.fetchWatchlistPrices,
    refetchInterval: 60000,
    staleTime:  1000 * 60 * 2,
  })

export const useRecentTransactions = () =>
  useQuery({
    queryKey: ['recent-transactions'],
    queryFn: dashboardApi.fetchRecentTransactions,
    refetchInterval: 60000,
    staleTime:  1000 * 60 * 2,
  })

export const useAssetAllocation = () =>
  useQuery({
    queryKey: ['asset-allocation'],
    queryFn: dashboardApi.fetchAssetAllocation,
    staleTime:1000 * 60 * 5,
  })

export const useSmartAlerts = () =>
  useQuery({
    queryKey: ['smart-alerts'],
    queryFn: dashboardApi.fetchActiveAlerts,
    staleTime:1000 * 60 * 5,
  })