'use client'
import React from 'react'
import { Transaction } from '@/types/transactions'
import { formatDate } from '@/lib/helpers/formatDate'
import { usePagination } from '@/hooks/usePagination'

const coinColors: Record<string, { bg: string; text: string }> = {
  BTC:  { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  ETH:  { bg: 'bg-blue-500/20',   text: 'text-blue-400' },
  SOL:  { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  BNB:  { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  XRP:  { bg: 'bg-sky-500/20',    text: 'text-sky-400' },
  ADA:  { bg: 'bg-teal-500/20',   text: 'text-teal-400' },
}
const defaultColor = { bg: 'bg-white/10', text: 'text-white/60' }

const typeBadge: Record<string, string> = {
  buy:        'bg-green-500/10 text-green-400 border border-green-500/20',
  sell:       'bg-red-500/10 text-red-400 border border-red-500/20',
  swap:       'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  deposit:    'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  withdrawal: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
}

const statusDot: Record<string, string> = {
  completed: 'bg-green-400',
  pending:   'bg-yellow-400',
  failed:    'bg-red-400',
}

const PAGE_SIZE = 8

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { page, setPage, totalPages, paginated } = usePagination(transactions, PAGE_SIZE)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="overflow-x-auto w-full"
      style={{
            scrollbarColor: "#000000 transparent",
          }}
      >
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-[12px] text-white/30 uppercase tracking-widest border-b border-white/5">
              <th className="text-left pb-4 font-medium">Date/Time</th>
              <th className="text-left pb-4 font-medium">Coin</th>
              <th className="text-left pb-4 font-medium">Type</th>
              <th className="text-left pb-4 font-medium">Amount</th>
              <th className="text-left pb-4 font-medium hidden md:table-cell">Price</th>
              <th className="text-left pb-4 font-medium hidden md:table-cell">Total Value</th>
              <th className="text-left pb-4 font-medium hidden lg:table-cell">P&L</th>
              <th className="text-left pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(tx => {
              const color = coinColors[tx.symbol] ?? defaultColor
              const isPnlPos = tx.pnl >= 0
              return (
                <tr key={tx.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  {/* Date */}
                  <td className="py-4 pr-4">
                    <p className="text-sm text-white font-medium">
                      {formatDate(tx.date)}
                    </p>
                    <p className="text-xs text-white/30">
                      {new Date(tx.date).toLocaleTimeString('en-US', {
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                      })} UTC
                    </p>
                  </td>

                  {/* Coin */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color.bg} ${color.text}`}>
                        {tx.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{tx.coin}</p>
                        <p className="text-xs text-white/40">{tx.symbol}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 pr-4">
                    <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${typeBadge[tx.type]}`}>
                      {tx.type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 pr-4">
                    <p className="text-sm font-medium text-white whitespace-nowrap">
                      {tx.amount.toFixed(tx.amount < 1 ? 3 : 2)} {tx.symbol}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="py-4 pr-4 hidden md:table-cell">
                    <p className="text-sm text-white/70 whitespace-nowrap">
                      ${tx.price.toLocaleString()}
                    </p>
                  </td>

                  {/* Total Value */}
                  <td className="py-4 pr-4 hidden md:table-cell">
                    <p className="text-sm font-medium text-white whitespace-nowrap">
                      ${tx.total_value.toLocaleString()}
                    </p>
                  </td>

                  {/* P&L */}
                  <td className="py-4 pr-4 hidden lg:table-cell">
                    <p className={`text-sm font-semibold whitespace-nowrap ${isPnlPos ? 'text-green-400' : 'text-red-400'}`}>
                      {isPnlPos ? '+' : ''}${tx.pnl.toFixed(2)}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[tx.status]}`} />
                      <span className="text-xs text-white/60 capitalize">{tx.status}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <p className="text-xs text-white/30">
          Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, transactions.length)} of {transactions.length} transactions
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
          >‹</button>
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${page === n ? 'bg-primary text-black' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
            >{n}</button>
          ))}
          {totalPages > 4 && <span className="text-white/30 text-sm px-1">...</span>}
          {totalPages > 4 && (
            <button
              onClick={() => setPage(totalPages)}
              className="w-8 h-8 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >{totalPages}</button>
          )}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
          >›</button>
        </div>
      </div>
    </div>
  )
}