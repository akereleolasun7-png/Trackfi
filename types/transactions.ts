export type TransactionType = 'buy' | 'sell' | 'swap' | 'deposit' | 'withdrawal'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  date: string        
  coin: string        
  symbol: string    
  type: TransactionType
  amount: number      
  price: number     
  total_value: number 
  pnl: number        
  status: TransactionStatus
  network?: string    
}

export interface TransactionStats {
  total: number
  totalVolumeBought: number
  totalVolumeSold: number
  boughtChange: number   
  soldChange: number   
  buyOrders: number
  sellOrders: number
  networkStatus: string
}