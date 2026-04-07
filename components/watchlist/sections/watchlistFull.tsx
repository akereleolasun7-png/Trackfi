"use client";
import React, { useState } from "react";
import { ArrowUpRight, Rocket } from "lucide-react";
import { formatCurrency } from "@/lib/helpers/formatPrice";
import { WatchlistCoin, WatchlistStats } from "@/types/index";
import { SentimentBar } from "./watchSentimentBar";
import CoinTable from "@/components/common/coinTable";
import { toggleWatchlistAlert, toggleWatchlistStar } from "@/lib/api";
import { SetAlertModal } from "../../shared/modals/setAlertModal";
import { AlertCondition } from "@/types/index";

interface WatchlistFullProps {
  coins: WatchlistCoin[];
  stats?: WatchlistStats;
}

export function WatchlistFull({
  coins: initialCoins,
  stats,
}: WatchlistFullProps) {
  const safeStats = stats ?? {
    totalValue: 0,
    totalChangePercent: 0,
    topPerformer: { symbol: "N/A", changePercent: 0 },
    marketSentiment: { label: "Neutral", score: 50 },
  };
  const [coins, setCoins] = useState(initialCoins);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  const toggleStar = (id: string) => {
    setCoins((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isWatchlisted: !c.isWatchlisted } : c,
      ),
    );
    toggleWatchlistStar(id, !coins.find((c) => c.id === id)?.isWatchlisted);
  };

  const toggleAlert = (id: string) => {
    setSelectedCoinId(id);
    setShowAlertModal(true);
  };

  const handleAlertCreate = (type: AlertCondition, value: number) => {
    if (selectedCoinId) {
      setCoins((prev) =>
        prev.map((c) =>
          c.id === selectedCoinId ? { ...c, hasAlert: true } : c,
        ),
      );
      toggleWatchlistAlert(selectedCoinId, {
        type: type === "change" ? "percentage" : "price",
        value,
      });
    }
  };

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Total Value
          </p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(safeStats.totalValue)}
          </p>
          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />+{safeStats.totalChangePercent}%
          </p>
        </div>

        {/* Top Performer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Top Performer
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                {safeStats.topPerformer.symbol}
              </p>
              <p className="text-xs text-green-400">
                +{safeStats.topPerformer.changePercent}% Today
              </p>
            </div>
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
            Market Sentiment
          </p>
          <SentimentBar
            label={safeStats.marketSentiment.label}
            score={safeStats.marketSentiment.score}
          />
        </div>
      </div>

      <CoinTable
        coins={coins}
        title="My Watchlist"
        showExport={true}
        onToggleStar={toggleStar}
        onToggleAlert={toggleAlert}
      />

      {showAlertModal && selectedCoinId && (
        <SetAlertModal
          coinSymbol={coins.find((c) => c.id === selectedCoinId)?.symbol || ""}
          onClose={() => {
            setShowAlertModal(false);
            setSelectedCoinId(null);
          }}
          onCreate={handleAlertCreate}
        />
      )} 
    </div>
  );
}
