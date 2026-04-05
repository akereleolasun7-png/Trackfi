// lib/mock/market.ts
import { MarketCoinItem } from '@/types/dashboard'

export const mockMarket: MarketCoinItem[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    current_price: 64281.40,
    price_change_percentage_24h: 2.45,
    holdings: 0.154,
    
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    current_price: 3422.15,
    price_change_percentage_24h: 1.82,
    holdings: 1.82,
    
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    current_price: 148.90,
    price_change_percentage_24h: 12.4,
    holdings: 42.5,
    
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    current_price: 7.24,
    price_change_percentage_24h: -0.42,
    holdings: 120,
  },
]