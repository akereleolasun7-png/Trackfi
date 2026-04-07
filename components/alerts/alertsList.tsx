'use client'
import React from 'react'
import { Trash2 } from 'lucide-react'
import { PriceAlert } from '@/types/alerts'
import { formatDate }  from '@/lib/helpers/formatDate'

const coinColors: Record<string, { bg: string; text: string }> = {
  BTC:   { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  ETH:   { bg: 'bg-blue-500/20',   text: 'text-blue-400' },
  SOL:   { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  BNB:   { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  XRP:   { bg: 'bg-sky-500/20',    text: 'text-sky-400' },
  ADA:   { bg: 'bg-teal-500/20',   text: 'text-teal-400' },
  DOGE:  { bg: 'bg-amber-500/20',  text: 'text-amber-400' },
  MATIC: { bg: 'bg-violet-500/20', text: 'text-violet-400' },
}
const defaultColor = { bg: 'bg-white/10', text: 'text-white/60' }

interface AlertListProps {
  alerts: PriceAlert[]
  selectedId: string | null
  onSelect: (alert: PriceAlert) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  active: number
  paused: number
}

export function AlertList({
  alerts,
  selectedId,
  onSelect,
  onToggle,
  onDelete,
  active,
  paused,
}: AlertListProps) {
  return (
    <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Monitored Pairs</p>
        <span className="text-xs text-white/40">
          <span className="text-primary font-semibold">{active} Active</span>
          {' / '}
          <span className="text-white/40">{paused} Paused</span>
        </span>
      </div>

      {/* Alert rows */}
      <div className="flex flex-col gap-2">
        {alerts.map(alert => {
          const color = coinColors[alert.symbol] ?? defaultColor
          const isSelected = selectedId === alert.id
          const isActive = alert.status === 'active'

          return (
            <div
              key={alert.id}
              onClick={() => onSelect(alert)}
              className={`rounded-xl border p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left: icon + name */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color.bg} ${color.text}`}>
                    {alert.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {alert.symbol} {alert.condition === 'above' ? 'Above' : 'Below'} ${alert.targetPrice.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-white/30">Created {formatDate(alert.createdAt)}</p>
                  </div>
                </div>

                {/* Right: toggle + delete */}
                <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => onToggle(alert.id)}
                    className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${isActive ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isActive ? 'left-5' : 'left-1'}`} />
                  </button>
                  <button
                    onClick={() => onDelete(alert.id)}
                    className="text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Triggered badge */}
              {alert.triggeredRecently && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                    Triggered Recently
                  </span>
                  {alert.lastPrice && (
                    <span className="text-[11px] text-white/30">
                      Last price: ${alert.lastPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}