"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { EnrichedAlert } from "@/types/alerts";
import { AlertList } from "./alertsList";
import { AlertConfigPanel } from "./alertConfigPanel";
import { SetAlertModal } from "@/components/shared/modals/setAlertModal";
import { AlertCondition, WatchlistCoin } from "@/types";
import {
  createAlert,
  toggleAlertStatus,
  deleteAlert,
  updateAlert,
} from "@/lib/api";
interface AlertFullProps {
  alerts: EnrichedAlert[];
  watchListCoins: WatchlistCoin[];
}

export function AlertFull({
  alerts: initialAlerts,
  watchListCoins,
}: AlertFullProps) {
  const supportedCoins = initialAlerts?.map((alert) => ({
    ...alert,
    label: alert.coin_symbol,
    coin: alert.coin_name,
    coin_symbol: alert.coin_symbol,
    current_price: alert.current_price ?? 0,
  }));
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<EnrichedAlert | null>(
    initialAlerts[0] ?? null,
  );
  const [showModal, setShowModal] = useState(false);

  const [condition, setCondition] = useState<AlertCondition>(
    selectedAlert?.condition ?? "above",
  );
  const [targetPrice, setTargetPrice] = useState(
    selectedAlert?.target_price?.toString() ?? "",
  );
  const [inApp, setInApp] = useState(selectedAlert?.in_app ?? true);
  const [email, setEmail] = useState(selectedAlert?.email ?? false);

  const [selectedCoin, setSelectedCoin] = useState(
    supportedCoins.find((c) => c.coin_symbol === selectedAlert?.coin_symbol) ??
      supportedCoins[0] ??
      null,
  );
  const [isSaving, setIsSaving] = useState(false);

  function handleSelect(alert: EnrichedAlert) {
    setSelectedAlert(alert);
    setCondition(alert.condition);
    setTargetPrice(alert.target_price.toString());
    setInApp(alert.in_app);
    setEmail(alert.email);
    setSelectedCoin({
      ...alert,
      label: alert.coin_symbol,
      coin: alert.coin_name,
      current_price: alert.current_price ?? 0,
    });
  }

  async function handleToggle(id: string) {
    const newStatus =
      alerts.find((a) => a.id === id)?.status === "active"
        ? "paused"
        : "active";

    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
    await toggleAlertStatus(id, newStatus);
  }

  async function handleDelete(id: string) {
    const previous = alerts;
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);

    const success = await deleteAlert(id);
    if (!success) {
      setAlerts(previous);
    }
  }

  async function handleSave() {
    if (!selectedAlert) return;
    setIsSaving(true);
    const previous = alerts;
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === selectedAlert.id
          ? {
              ...a,
              coin: selectedCoin.coin_name,
              coin_symbol: selectedCoin.coin_symbol,
              condition,
              target_price: parseFloat(targetPrice) || a.target_price,
              in_app: inApp,
              email: email,
            }
          : a,
      ),
    );

    const result = await updateAlert(selectedAlert.id, {
      condition,
      target_price: parseFloat(targetPrice) || selectedAlert.target_price,
      in_app: inApp,
      email: email,
    });

    if (!result) {
      setAlerts(previous);
    }
    setIsSaving(false);
  }

  async function handleCreate(
    type: AlertCondition,
    value: number,
    coinId: string,
  ) {
    try {
      const watchCoin = watchListCoins.find((c) => c.id === coinId);

      if (type === "change") {
        const coin = watchListCoins.find((c) => c.id === coinId);
        const currentPrice = coin?.current_price ?? 0;
        const upperTarget = currentPrice * (1 + value / 100);
        const lowerTarget = currentPrice * (1 - value / 100);

        const upperAlert = await createAlert({
          coin_id: coinId,
          condition: "above",
          target_price: upperTarget,
          in_app: true,
          email: false,
          status: "active",
        });

        if (!upperAlert) {
          console.error("Failed to create upper alert");
          return;
        }

        const lowerAlert = await createAlert({
          coin_id: coinId,
          condition: "below",
          target_price: lowerTarget,
          in_app: true,
          email: false,
          status: "active",
        });

        if (!lowerAlert) {
          console.error("Failed to create lower alert");
          return;
        }

        const enrichedUpper = {
          ...upperAlert,
          coin_name: watchCoin?.name ?? coinId,
          coin_symbol: watchCoin?.symbol ?? "",
          coin_image: watchCoin?.image ?? "",
          current_price: watchCoin?.current_price ?? null,
        };
        const enrichedLower = {
          ...lowerAlert,
          coin_name: watchCoin?.name ?? coinId,
          coin_symbol: watchCoin?.symbol ?? "",
          coin_image: watchCoin?.image ?? "",
          current_price: watchCoin?.current_price ?? null,
        };
        setAlerts((prev) => [enrichedLower, enrichedUpper, ...prev]);
        setSelectedAlert(enrichedUpper);
        return;
      }

      const newAlert = await createAlert({
        coin_id: coinId,
        condition: type,
        target_price: value,
        in_app: true,
        email: false,
        status: "active",
      });
      if (newAlert) {
        console.log("newAlert id:", newAlert.id, newAlert);
        const enriched = {
          ...newAlert,
          coin_name: watchCoin?.name ?? coinId,
          coin_symbol: watchCoin?.symbol ?? "",
          coin_image: watchCoin?.image ?? "",
          current_price: watchCoin?.current_price ?? null,
        };
        setAlerts((prev) => [enriched, ...prev]);
        setSelectedAlert(enriched);
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
          disabled={watchListCoins.length === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-black font-bold text-sm transition-colors cursor-pointer
            ${watchListCoins.length === 0 ? "opacity-50 cursor-not-allowed" : ""}

        `}
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
            onCoinSelect={(coin) =>
              setSelectedCoin(coin as (typeof supportedCoins)[0])
            }
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
            isSaving={isSaving}
            editingTitle="Edit Alert Details"
          />
        )}
      </div>

      {/* Create Alert Modal */}
      {showModal && selectedCoin && (
        <SetAlertModal
          coins={watchListCoins}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
