"use client";
import React, { useState, useEffect } from "react";
import CoinTable from "@/components/common/coinTable";
import { MarketsSkeleton } from "@/components/common/skeleton";
import { useMarkets } from "@/lib/query/index";
import { SetAlertModal } from "../shared/modals/setAlertModal";
import { toggleMarketAlert } from "@/lib/api";
import { toast } from "sonner";
import { AlertCondition } from "@/types";
function MarketPage() {
  const { data: coins = [], isLoading, isError } = useMarkets();
  const [coinList, setCoinList] = useState(coins);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load markets.");
    }
  }, [isError]);

  useEffect(() => {
    setCoinList(coins);
  }, [coins]);

  const toggleStar = (id: string) =>
    setCoinList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isWatchlisted: !c.isWatchlisted } : c,
      ),
    );

  const toggleAlert = (id: string) => {
    setSelectedCoinId(id);
    setShowAlertModal(true);
  };

  const handleAlertCreate = (type: AlertCondition, value: number) => {
    if (selectedCoinId) {
      setCoinList((prev) =>
        prev.map((c) =>
          c.id === selectedCoinId ? { ...c, hasAlert: true } : c,
        ),
      );
      toggleMarketAlert(selectedCoinId, {
        type: type === "change" ? "percentage" : "price",
        value,
      });
    }
  };

  if (isLoading) return <MarketsSkeleton />;

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Markets</h1>
        <p className="text-white/50 mt-1 text-sm">
          Live prices across 10,000+ assets.
        </p>
      </div>

      <CoinTable
        coins={coinList}
        title="All Markets"
        onToggleStar={toggleStar}
        onToggleAlert={toggleAlert}
        showExport={false}
      />

      {showAlertModal && selectedCoinId && (
        <SetAlertModal
          coinSymbol={
            coinList.find((c) => c.id === selectedCoinId)?.symbol || ""
          }
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

export default MarketPage;
