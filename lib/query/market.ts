import { useQuery } from '@tanstack/react-query'
import { fetchMarketlist , fetchCoinDetail } from '../api/index'

export const useMarkets = () =>
    useQuery({
        queryKey: ['marketlist'],
        queryFn: fetchMarketlist,
        refetchInterval: 30000,
        staleTime: 1000 * 60 * 5,
    })

export const useCoinDetail = (id: string) =>
  useQuery({
    queryKey: ['coin-detail', id],
    queryFn: () => fetchCoinDetail(id),
    staleTime: 1000 * 30,
  })