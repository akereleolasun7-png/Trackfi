"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { PriceAlert } from "@/types/alerts";
import { AlertList } from "./alertsList";
import { AlertConfigPanel } from "./alertConfigPanel";
import { SetAlertModal } from "@/components/shared/modals/setAlertModal";
import { AlertCondition } from "@/types";
import { createAlert } from "@/lib/api";
import { useWatchlist } from "@/lib/query/watchlist";

interface AlertFullProps {
  alerts: PriceAlert[];
}

export function AlertFull({ alerts: initialAlerts }: AlertFullProps) {
  const { data: watchlistCoins = [] } = useWatchlist();
  const supportedCoins = watchlistCoins.map((coin) => ({
    label: coin.symbol,
    coin: coin.name,
    symbol: coin.symbol,
    current_price: coin.current_price ?? 0,
  }));
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<PriceAlert | null>(
    initialAlerts[0] ?? null,
  );
  const [showModal, setShowModal] = useState(false);

  const [condition, setCondition] = useState<AlertCondition>(
    selectedAlert?.condition ?? "above",
  );
  const [targetPrice, setTargetPrice] = useState(
    selectedAlert?.targetPrice?.toString() ?? "",
  );
  const [inApp, setInApp] = useState(
    selectedAlert?.deliveryChannels.inApp ?? true,
  );
  const [email, setEmail] = useState(
    selectedAlert?.deliveryChannels.email ?? false,
  );
  const [selectedCoin, setSelectedCoin] = useState(
    supportedCoins.find((c) => c.symbol === selectedAlert?.symbol) ??
      supportedCoins[0] ??
      null,
  );

  function handleSelect(alert: PriceAlert) {
    setSelectedAlert(alert);
    setCondition(alert.condition);
    setTargetPrice(alert.targetPrice.toString());
    setInApp(alert.deliveryChannels.inApp);
    setEmail(alert.deliveryChannels.email);
    setSelectedCoin(
      supportedCoins.find((c) => c.symbol === alert.symbol) ??
        supportedCoins[0] ??
        null,
    );
  }

  function handleToggle(id: string) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a,
      ),
    );
  }

  function handleDelete(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
  }

  function handleSave() {
    if (!selectedAlert) return;
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === selectedAlert.id
          ? {
              ...a,
              coin: selectedCoin.coin,
              symbol: selectedCoin.symbol,
              condition,
              targetPrice: parseFloat(targetPrice) || a.targetPrice,
              deliveryChannels: { inApp, email },
            }
          : a,
      ),
    );
  }

  async function handleCreate(type: AlertCondition, value: number) {
    try {
      const newAlert = await createAlert({
        symbol: selectedCoin.symbol,
        coin: selectedCoin.coin,
        condition: type === "change" ? "above" : type,
        targetPrice: value,
        deliveryChannels: { inApp: true, email: false },
        status: "active",
      });
      if (newAlert) {
        setAlerts((prev) => [newAlert, ...prev]);
        setSelectedAlert(newAlert);
      }
    } catch (err) {
      console.error("Failed to create alert", err);
    }
  }

  const activeCount = alerts.filter((a) => a.status === "active").length;
  const pausedCount = alerts.filter((a) => a.status === "paused").length;

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Price Alerts</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your automated triggers and market signals in real-time.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-black font-bold text-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Alert
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        <AlertList
          alerts={alerts}
          selectedId={selectedAlert?.id ?? null}
          onSelect={handleSelect}
          onToggle={handleToggle}
          onDelete={handleDelete}
          active={activeCount}
          paused={pausedCount}
        />

        {selectedAlert && (
          <AlertConfigPanel
            coins={supportedCoins}
            selectedCoin={selectedCoin}
            onCoinSelect={setSelectedCoin}
            condition={condition}
            onConditionChange={setCondition}
            targetPrice={targetPrice}
            onTargetPriceChange={setTargetPrice}
            inApp={inApp}
            onInAppChange={setInApp}
            email={email}
            onEmailChange={setEmail}
            isEmpty={false}
            onSave={handleSave}
            editingTitle="Edit Alert Details"
          />
        )}
      </div>

      {/* Create Alert Modal */}
      {showModal && selectedCoin && (
        <SetAlertModal
          coinSymbol={selectedCoin.symbol}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
