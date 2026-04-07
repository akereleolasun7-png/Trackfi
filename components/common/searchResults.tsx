"use client";
import React from "react";
import { ArrowUpRight, ArrowDownRight, Bell, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/helpers/formatPrice";
import { SearchResultsQueryProps } from "@/types/search";
import { formatDate } from "@/lib/helpers/formatDate";

const typeColors: Record<string, string> = {
  buy: "text-green-400",
  sell: "text-red-400",
  swap: "text-blue-400",
  deposit: "text-teal-400",
  withdrawal: "text-orange-400",
};

export function SearchResults({
  results,
  focused,
  onSelect,
}: SearchResultsQueryProps) {
  let idx = 0;

  return (
    <div className="py-2">
      {/* coins */}
      {results.coins.length > 0 && (
        <section>
          <p className="px-4 pt-2 pb-1 text-[10px] text-white/30 uppercase tracking-widest font-medium">
            Coins
          </p>
          {results.coins.map((coin) => {
            const i = idx++;
            const isPos = coin.price_change_percentage_24h >= 0;
            return (
              <button
                key={coin.id}
                onClick={() => onSelect(`/markets?coin=${coin.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                  ${focused === i ? "bg-white/8" : "hover:bg-white/5"}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                  {coin.symbol.slice(0, 3).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {coin.name}
                  </p>
                  <p className="text-xs text-white/40">
                    {coin.symbol.toUpperCase()}/USD
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-white font-medium">
                    {formatCurrency(coin.current_price)}
                  </p>
                  <p
                    className={`text-xs flex items-center gap-0.5 justify-end ${isPos ? "text-green-400" : "text-red-400"}`}
                  >
                    {isPos ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </p>
                </div>
              </button>
            );
          })}
        </section>
      )}

      {/* transactions */}
      {results.transactions.length > 0 && (
        <section>
          <p className="px-4 pt-3 pb-1 text-[10px] text-white/30 uppercase tracking-widest font-medium">
            Transactions
          </p>
          {results.transactions.map((tx) => {
            const i = idx++;
            return (
              <button
                key={tx.id}
                onClick={() => onSelect(`/transactions?id=${tx.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                  ${focused === i ? "bg-white/8" : "hover:bg-white/5"}`}
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-white/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white capitalize">
                    {tx.type} <span className="text-primary">{tx.coin}</span>
                  </p>
                  <p className="text-xs text-white/40">{formatDate(tx.date)}</p>
                </div>
                <p
                  className={`text-sm font-medium shrink-0 ${typeColors[tx.type] ?? "text-white"}`}
                >
                  {tx.type === "buy" || tx.type === "deposit" ? "+" : "-"}$
                  {tx.total_value.toLocaleString()}
                </p>
              </button>
            );
          })}
        </section>
      )}

      {/* alerts */}
      {results.alerts.length > 0 && (
        <section>
          <p className="px-4 pt-3 pb-1 text-[10px] text-white/30 uppercase tracking-widest font-medium">
            Alerts
          </p>
          {results.alerts.map((alert) => {
            const i = idx++;
            return (
              <button
                key={alert.id}
                onClick={() => onSelect(`/alerts?id=${alert.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                  ${focused === i ? "bg-white/8" : "hover:bg-white/5"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${alert.triggered ? "bg-red-500/20" : "bg-white/5"}`}
                >
                  <Bell
                    className={`w-4 h-4 ${alert.triggered ? "text-red-400" : "text-white/40"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {alert.title}
                  </p>
                  <p className="text-xs text-white/40 truncate">
                    {alert.description}
                  </p>
                </div>
                {alert.triggered && (
                  <span className="text-[10px] text-red-400 border border-red-400/30 rounded-full px-2 py-0.5 shrink-0">
                    Triggered
                  </span>
                )}
              </button>
            );
          })}
        </section>
      )}
    </div>
  );
}
