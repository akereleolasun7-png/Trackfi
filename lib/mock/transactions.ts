// lib/mock/transactions.ts
import { RecentTransactionItem } from '@/types/dashboard'

export const mockTransactions: RecentTransactionItem[] = [
  { id: "txn_001", type: "buy",  coin: "BTC", value: 3120, date: "2024-03-19T10:24:00Z" },
  { id: "txn_002", type: "sell", coin: "ETH", value: 3936, date: "2024-03-18T14:10:00Z" },
  { id: "txn_003", type: "buy",  coin: "SOL", value: 1480, date: "2024-03-17T09:05:00Z" },
  { id: "txn_004", type: "buy",  coin: "ADA", value: 290,  date: "2024-03-16T16:33:00Z" },
  { id: "txn_005", type: "swap", coin: "BTC", value: 1236, date: "2024-03-15T11:50:00Z" },
  { id: "txn_006", type: "deposit", coin: "ETH", value: 1000, date: "2024-03-14T09:15:00Z" },
  { id: "txn_007", type: "withdrawal", coin: "SOL", value: 500, date: "2024-03-13T14:20:00Z" },
]