import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/index'

export const usePortfolioStats = () =>
  useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: dashboardApi.fetchPortfolioStats,
    refetchInterval: 30000,
    staleTime:  1000 * 60 * 5,
  })

export const useMarketPrices = () =>
  useQuery({
    queryKey: ['market-prices'],
    queryFn: dashboardApi.fetchMarketPrices,
    refetchInterval: 30000,
    staleTime:  1000 * 30,
  })

export const useRecentTransactions = () =>
  useQuery({
    queryKey: ['recent-transactions'],
    queryFn: dashboardApi.fetchRecentTransactions,
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