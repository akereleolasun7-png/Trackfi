import React from 'react'
import Link from 'next/link'
import { Clock2, ArrowUpRight, ArrowDownRight, ArrowLeftRight, Plus, Minus } from 'lucide-react'
import { RecentTransactionItem } from '@/types/dashboard'

const txConfig: Record<RecentTransactionItem['type'], {
  icon: React.ReactNode
  bg: string
  text: string
  label: string
  prefix: string
}> = {
  buy:        { icon: <ArrowUpRight className="w-4 h-4" />,    bg: 'bg-green-500/20',  text: 'text-green-400',  label: 'Buy',        prefix: '+' },
  sell:       { icon: <ArrowDownRight className="w-4 h-4" />,  bg: 'bg-red-500/20',    text: 'text-red-400',    label: 'Sell',       prefix: '-' },
  swap:       { icon: <ArrowLeftRight className="w-4 h-4" />,  bg: 'bg-blue-500/20',   text: 'text-blue-400',   label: 'Swap',       prefix: '' },
  deposit:    { icon: <Plus className="w-4 h-4" />,            bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Deposit',    prefix: '+' },
  withdrawal: { icon: <Minus className="w-4 h-4" />,           bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Withdrawal', prefix: '-' },
}

function RecentTransactions({ transactions }: { transactions: RecentTransactionItem[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <Link href="/transactions" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center py-6 gap-2 text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Clock2 className="w-5 h-5 text-white/40" />
          </div>
          <p className="text-sm text-white/50">No transactions yet</p>
          <p className="text-xs text-white/30">Your activity will appear here once you connect</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => {
            const config = txConfig[tx.type]
            return (
              <div key={tx.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.text}`}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{config.label} {tx.coin}</p>
                    <p className="text-xs text-white/40">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <p className={`text-sm font-medium ${config.text}`}>
                  {config.prefix}${tx.value.toLocaleString()}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentTransactions