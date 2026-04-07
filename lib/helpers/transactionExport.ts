import { Transaction } from '@/types/transactions'
 
export function exportTransactionsToCSV(transactions: Transaction[]) {
  const headers = ['Date', 'Coin', 'Symbol', 'Type', 'Amount', 'Price', 'Total Value', 'P&L', 'Status']
  const rows = transactions.map(tx => [
    new Date(tx.date).toLocaleDateString(),
    tx.coin,
    tx.symbol,
    tx.type,
    tx.amount,
    `$${tx.price.toLocaleString()}`,
    `$${tx.total_value.toLocaleString()}`,
    `${tx.pnl >= 0 ? '+' : ''}$${tx.pnl.toFixed(2)}`,
    tx.status,
  ])
 
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `trackfi-transactions-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
 