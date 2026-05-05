"use client";
import React, { useState } from "react";
import { X, Bell, ChevronDown } from "lucide-react";
import { AlertCondition, WatchlistCoin } from "@/types";
import { formatCrypto } from "@/lib/helpers/formatPrice";
import Image from "next/image";
interface SetAlertModalProps {
  coins: WatchlistCoin[];
  onClose: () => void;
  onCreate: (type: AlertCondition, value: number, coinId: string) => void;
}

export function SetAlertModal({
  coins,
  onClose,
  onCreate,
}: SetAlertModalProps) {
  const [alertType, setAlertType] = useState<AlertCondition>("above");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(coins[0] ?? null); // ✅ local state
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    const num = parseFloat(value);
    if (!value || isNaN(num) || num <= 0) {
      setError("Please enter a value greater than 0");
      return;
    }
    setError("");
    setIsCreating(true);
    await onCreate(alertType, num, selectedCoin.id);
    setIsCreating(false);
    setValue("");
    onClose();
  };

  const labels = {
    above: "Alert when price is above",
    below: "Alert when price is below",
    change: "Alert when price changes by %",
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed z-50
        {/* mobile — bottom sheet */}
        bottom-0 left-0 right-0 rounded-tl-2xl rounded-tr-2xl
        {/* desktop — centered modal */}
        sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        sm:w-full sm:max-w-sm sm:rounded-2xl

        bg-[#1a1a1a] border border-white/10 p-6
        animate-in fade-in duration-200
        sm:slide-in-from-bottom-0
        slide-in-from-bottom
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Set Alert for {selectedCoin?.symbol}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>
        <div className="mb-6">
          <select
            value={selectedCoin?.id}
            onChange={(e) =>
              setSelectedCoin(
                coins.find((c) => c.id === e.target.value) ?? coins[0],
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
          >
            {coins.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#111]">
                {c.name} ({c.symbol})
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
        </div>
        {/* Alert Type Selection */}
        <div className="mb-6">
          <p className="text-sm text-white/60 mb-3">Alert when price is:</p>
          <div className="flex flex-col gap-2">
            {(["above", "below", "change"] as AlertCondition[]).map((type) => (
              <button
                key={type}
                onClick={() => setAlertType(type)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left border
                  ${
                    alertType === type
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "border-white/10 text-white/60 hover:text-white hover:border-white/20"
                  }`}
              >
                {type === "above" && "Above"}
                {type === "below" && "Below"}
                {type === "change" && "Changes by %"}
              </button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <div className="mb-6">
          <label className="text-sm text-white/60 mb-2 block">
            {labels[alertType]}
          </label>
          <div className="relative">
            {alertType !== "change" && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 ">
                $
              </span>
            )}
            <input
              type="number"
              value={value}
              min={0}
              max={alertType === "change" ? 100 : undefined}
              step={alertType === "change" ? 1 : 0.01}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                alertType === "change"
                  ? "5"
                  : `${formatCrypto(selectedCoin?.current_price)}`
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/20
                focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-colors
                pl-6"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            {alertType === "change" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                %
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!value || isCreating}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-black text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isCreating ? (
              <span className="flex items-center justify-center gap-2">
                <Image
                  src={"/logos/Spinner.svg"}
                  alt="loading svg"
                  width={20}
                  height={20}
                />
                Creating...
              </span>
            ) : (
              "Create Alert"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
