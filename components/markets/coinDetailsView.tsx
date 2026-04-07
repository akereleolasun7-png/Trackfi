"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CoinDetail, TimeRange } from "@/types/markets";
import { PriceChart } from "../common/priceChart";
import { formatDate } from "@/lib/helpers/formatDate";
import { SetAlertModal } from "../shared/modals/setAlertModal";
import { CoinNotAvailable } from "./sections/coinNotAvailable";
import { CoinDetailHeader } from "./sections/coinDetailHeader";
import { CoinStatsGrid } from "./sections/coinStatsGrid";

interface Props {
  coin?: CoinDetail;
}

export default function CoinDetailView({ coin }: Props) {
  const [range, setRange] = useState<TimeRange>("1M");
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  if (!coin) {
    return <CoinNotAvailable />;
  }

  const isPositive = coin.price_change_percentage_24h >= 0;
  const chartPoints = coin.chartData[range];

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      {/* Back */}
      <Link
        href="/markets"
        className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 transition-colors w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      {/* Header */}
      <CoinDetailHeader
        coin={coin}
        isWatchlisted={isWatchlisted}
        onToggleWatchlist={() => setIsWatchlisted((p) => !p)}
        onOpenAlert={() => setShowAlertModal(true)}
      />

      {/* Chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-white/80">Price Chart</h2>
          <div className="flex gap-1">
            {(["1D", "1W", "1M", "1Y"] as TimeRange[]).map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  range === t
                    ? "bg-primary text-black"
                    : "text-white/40 hover:text-white hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full md:w-[99%]">
          <PriceChart
            labels={chartPoints.map((d) => formatDate(d.date, range))}
            values={chartPoints.map((d) => d.value)}
            color={isPositive ? "#4ade80" : "#f97066"}
            height="h-72"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <CoinStatsGrid coin={coin} />

      {/* Description */}
      {coin.description && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-3">About {coin.name}</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            {coin.description}
          </p>
        </div>
      )}

      {/* Set Alert Modal */}
      {showAlertModal && (
        <SetAlertModal
          coinSymbol={coin.symbol}
          onClose={() => setShowAlertModal(false)}
          onCreate={(type, value) => {
            console.log(`Alert created: ${type} ${value}`);
          }}
        />
      )}
    </div>
  );
}
