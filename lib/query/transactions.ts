import { useQuery } from '@tanstack/react-query'
import { fetchTransactions, fetchTransactionStats } from '@/lib/api/transactions'
 
export const useTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 2,
    refetchInterval: false,
    retry: false,
  })
 
export const useTransactionStats = () =>
  useQuery({
    queryKey: ['transaction-stats'],
    queryFn: fetchTransactionStats,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  })
 