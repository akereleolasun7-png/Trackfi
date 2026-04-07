export interface SearchBarResultsItem {
  coins: {
    id: string
    symbol: string
    name: string
    current_price: number
    price_change_percentage_24h: number
  }[]
  transactions: {
    id: string
    type: 'buy' | 'sell' | 'swap' | 'deposit' | 'withdrawal'
    coin: string
    total_value: number
    date: string
  }[]
  alerts: {
    id: string
    title: string
    description: string
    type: string
    triggered: boolean
  }[]
}

export interface SearchResultsQueryProps {
  results: SearchBarResultsItem
  focused: number
  onSelect: (href: string) => void
}