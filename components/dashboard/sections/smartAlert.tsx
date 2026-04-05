    import React from 'react'
    import { Bell, Zap, Activity , ArrowUpDown , Target } from 'lucide-react'
    import Link from 'next/link'
    import { SmartAlertItem } from '@/types/index'

    const smartSuggestions = [
    {
        id: 'sug_1',
        icon: <Activity className="w-4 h-4" />,
        bg: 'bg-orange-500/20',
        text: 'text-orange-400',
        title: 'Market Volatility Alert',
        description: 'Set up triggers to be notified of sudden market swings.',
    },
    {
        id: 'sug_2',
        icon: <Bell className="w-4 h-4" />,
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        title: 'Whale Watch',
        description: 'Track significant on-chain movements for BTC and ETH.',
    },
    ]

   const typeConfig: Record<SmartAlertItem['type'], { bg: string; text: string; icon: React.ReactNode }> = {
  volatility: { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: <Activity className="w-4 h-4" /> },
  whale:      { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: <ArrowUpDown className="w-4 h-4" /> },
  target:     { bg: 'bg-green-500/20',  text: 'text-green-400',  icon: <Target className="w-4 h-4" /> },
  limit:      { bg: 'bg-blue-500/20',   text: 'text-blue-400',   icon: <Bell className="w-4 h-4" /> },
}

    function SmartAlerts({ alerts }: { alerts: SmartAlertItem[] }) {
    const isEmpty = alerts.length === 0

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
                {isEmpty ? 'Smart Alerts' : 'Active Alerts'}
            </h2>
            <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <Link href="/alerts" className="text-sm text-primary hover:underline">
            Configure All
            </Link>
        </div>

        {isEmpty ? (
            <div className="flex flex-col gap-3">
            {smartSuggestions.map(s => (
                <div key={s.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.bg} ${s.text}`}>
                    {s.icon}
                </div>
                <div>
                    <p className="text-sm font-medium text-white">{s.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{s.description}</p>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="flex flex-col gap-3">
            {alerts.map(alert => {
                const config = typeConfig[alert.type]
                return (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.text}`}>
                    {config.icon}
                    </div>
                    <div className="flex-1">
                    <p className="text-sm font-medium text-white">{alert.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{alert.description}</p>
                    {alert.action && (
                        <Link
                        href="/alerts"
                        className="text-xs text-primary uppercase tracking-wider font-semibold mt-2 inline-block hover:underline"
                        >
                        {alert.action}
                        </Link>
                    )}
                    </div>
                </div>
                )
            })}
            </div>
        )}
        </div>
    )
    }

    export default SmartAlerts