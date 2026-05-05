"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Star,
} from "lucide-react";
import { MarketCoinItem } from "@/types/dashboard";
import { getCoinColor } from "@/lib/constants/coinColors";
import Image from "next/image";

function MarketWatchlist({ market }: { market: MarketCoinItem[] }) {
  const router = useRouter();
  const [watchlisted, setWatchlisted] = useState<Set<string>>(new Set());
  const toggleWatchlist = (id: string) => {
    setWatchlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Market Watchlist</h2>
        <Link
          href="/watchlist"
          className="text-sm text-primary hover:underline"
        >
          View All Markets
        </Link>
      </div>

      {market.length === 0 ? (
        <p className="text-white/40 text-sm text-center py-8">
          No market data yet
        </p>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="text-xs text-white/40 uppercase tracking-wider">
                <th></th>
                <th className="text-left pb-4 font-medium">Asset</th>
                <th className="text-left pb-4 font-medium">Price</th>
                <th className="text-left pb-4 font-medium">24H Change</th>
                <th className="text-left pb-4 font-medium">Holding</th>
                <th className="text-left pb-4 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {market.map((coin) => {
                const isPositive = coin.price_change_percentage_24h >= 0;
                const symbol = coin.symbol.toUpperCase()?.slice(0, 3);
                const color = getCoinColor(coin.symbol);

                return (
                  <tr
                    key={coin.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                    onClick={() => router.push(`/watchlist?coin=${coin.id}`)}
                  >
                    <td className="py-4">
                      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0  ">
                        {coin.image ? (
                          <Image
                            src={coin.image}
                            alt={coin.name}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.removeAttribute(
                                "hidden",
                              );
                            }}
                          />
                        ) : null}
                      </div>
                    </td>
                    {/* Asset */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium">{coin.name}</p>
                          <p className="text-xs text-white/40">
                            {coin.symbol}/USD
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4">
                      <p className="text-sm font-medium">
                        ${coin.current_price.toLocaleString()}
                      </p>
                    </td>

                    {/* 24H Change */}
                    <td className="py-4">
                      <span
                        className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {isPositive ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </td>

                    {/* Holding */}
                    <td className="py-4">
                      <p className="text-sm font-medium">
                        {coin.holdings
                          ? `${coin.holdings} ${coin.symbol}`
                          : "0 " + coin.symbol}
                      </p>
                      <p className="text-xs text-white/40">
                        $
                        {(
                          (coin.holdings ?? 0) * coin.current_price
                        ).toLocaleString()}
                      </p>
                    </td>

                    {/* Trend */}
                    <td className="py-4">
                      {isPositive ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MarketWatchlist;
