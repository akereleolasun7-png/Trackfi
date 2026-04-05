import React from "react";

export function StatCard({ label, value, sub, icon, highlight }: {
    label: string;
    value: React.ReactNode;
    sub: string;
    icon: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
                {icon}
            </div>
            <p className={`text-2xl font-bold ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</p>
            <p className="text-xs text-white/40">{sub}</p>
        </div>
    )
}
