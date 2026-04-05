export interface WatchlistCoin {
  id: string
  symbol: string
  name: string
  image?: string
  current_price: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  market_cap: number
  sparkline: number[]
  isWatchlisted: boolean
  hasAlert: boolean
}

export interface WatchlistStats {
  totalValue: number
  totalChangePercent: number
  topPerformer: { symbol: string; changePercent: number }
  marketSentiment: { label: string; score: number }
}