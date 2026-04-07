'use client'
import React from 'react'
import Link from 'next/link'
import { Star, Bell, TrendingUp, Globe } from 'lucide-react'

export function WatchlistEmpty() {
  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        <p className="text-white/50 mt-1 text-sm">Monitor your potential investments in real-time.</p>
      </div>

      {/* Empty state card */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col items-center justify-center py-20 px-6 mb-8">
        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
        </div>

        {/* icon cluster */}
        <div className="relative mb-8">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-2xl">💲</span>
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-primary text-sm font-bold">+</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-3">No coins in your watchlist yet.</h2>
        <p className="text-white/40 text-sm text-center max-w-md mb-8 leading-relaxed">
          Search and add coins above to start tracking performance, volume, and market sentiment updates directly from your ledger.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href={'/markets'}>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold rounded-full px-6 py-3 transition-colors">
            <Star className="w-4 h-4 fill-black" />
            Add Your First Coin
          </button></Link>
          
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: <Bell className="w-5 h-5 text-primary" />,
            title: 'Real-time Alerts',
            desc: 'Get notified instantly when assets in your watchlist hit price targets.',
          },
          {
            icon: <TrendingUp className="w-5 h-5 text-primary" />,
            title: 'Market Insights',
            desc: 'Access unique metrics like social sentiment and whale movement for your coins.',
          },
          {
            icon: <Globe className="w-5 h-5 text-primary" />,
            title: 'Global Sync',
            desc: 'Your watchlist is synced across all devices via the Trackfi Cloud.',
          },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="mb-3">{f.icon}</div>
            <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
            <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}