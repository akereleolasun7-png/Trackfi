import { mockTransactions, mockTransactionStats } from '@/lib/mock/transactions'
 
export async function fetchTransactions() {
  // const res = await fetch('/api/transactions')
  // if (!res.ok) throw new Error('Failed to fetch transactions')
  // return res.json()
  return mockTransactions
}
 
export async function fetchTransactionStats() {
  // const res = await fetch('/api/transactions/stats')
  // if (!res.ok) throw new Error('Failed to fetch transaction stats')
  // return res.json()
  return mockTransactionStats
}
 
export async function createTransaction(data: unknown) {
  // TODO: wire to /api/transactions when backend is ready
  console.warn('createTransaction: not implemented', data)
  return null
}
 
export async function deleteTransaction(id: string) {
  // TODO: wire to /api/transactions/[id] when backend is ready
  console.warn('deleteTransaction: not implemented', id)
  return null
}
 
 