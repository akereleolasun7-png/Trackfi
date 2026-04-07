"use client";
import React, { useState } from "react";
import { Bell, Plus, Zap, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertConfigPanel } from "./alertConfigPanel";
import { SetAlertModal } from "@/components/shared/modals/setAlertModal";
import { AlertCondition } from "@/types";
import { createAlert } from "@/lib/api";
import { useWatchlist } from "@/lib/query/watchlist";

function AlertEmpty() {
  const { data: watchlistCoins = [] } = useWatchlist();
  const supportedCoins = watchlistCoins.map((coin) => ({
    label: coin.symbol,
    coin: coin.name,
    symbol: coin.symbol,
    current_price: coin.current_price ?? 0,
  }));

  // Guard: if no watchlist coins, can't create alerts
  const hasCoins = supportedCoins.length > 0;
  const [selectedCoin, setSelectedCoin] = useState(
    hasCoins ? supportedCoins[0] : null,
  );
  const [condition, setCondition] = useState<AlertCondition>("above");
  const [targetPrice, setTargetPrice] = useState("");
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function handleCreate(type: AlertCondition, value: number) {
    if (!selectedCoin) return;
    try {
      await createAlert({
        symbol: selectedCoin.symbol,
        coin: selectedCoin.coin,
        condition: type === "change" ? "above" : type,
        targetPrice: value,
        deliveryChannels: { inApp: true, email: false },
        status: "active",
      });
      // After first alert created, parent should re-fetch / switch to AlertFull
    } catch (err) {
      console.error("Failed to create alert", err);
    }
  }

  // If user has no watchlist coins, show different message
  if (!hasCoins) {
    return (
      <div className="pt-24 px-6 pb-10 min-h-screen text-white">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Price Alerts</h1>
            <p className="text-white/40 text-sm mt-1">
              Manage your automated market triggers
            </p>
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[520px]">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-white/20" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-3">No coins to watch yet</h3>
            <p className="text-white/40 text-sm max-w-xs mb-8 leading-relaxed">
              Add coins to your watchlist first. Then you can set up price
              alerts for them.
            </p>
            <a
              href="/watchlist"
              className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-semibold rounded-full px-6 py-5 inline-block transition-colors"
            >
              <Plus className="w-4 h-4 mr-2 inline" />
              Go to Watchlist
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Price Alerts</h1>
            <p className="text-white/40 text-sm mt-1">
              Manage your automated market triggers
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-black font-bold rounded-full px-5 py-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[520px]">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-white/20" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-3">No alerts created yet</h3>
            <p className="text-white/40 text-sm max-w-xs mb-8 leading-relaxed">
              Stay ahead of the market. Set custom price targets for your
              favorite assets and we&apos;ll notify you the instant they hit.
            </p>
            <Button
              onClick={() => setShowModal(true)} // ✅ fixed — was calling SetAlertModal() as a function
              className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-semibold rounded-full px-6 py-5 mb-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create your first alert
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 w-full max-w-sm">
              {[
                {
                  icon: <Zap className="w-5 h-5 text-blue-400" />,
                  bg: "bg-blue-500/10",
                  border: "hover:border-blue-500/40",
                  label: "Instant Triggers",
                  sub: "Real-time price monitoring",
                },
                {
                  icon: <Smartphone className="w-5 h-5 text-primary" />,
                  bg: "bg-primary/10",
                  border: "hover:border-primary/40",
                  label: "Push Notifications",
                  sub: "In-app & email delivery",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`group border border-white/10 ${item.border} rounded-2xl p-5 text-center transition-all duration-200 cursor-pointer hover:bg-white/5`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-3 transition-transform duration-200 group-hover:-translate-y-1`}
                  >
                    {item.icon}
                  </div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-white/40 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

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
            isEmpty
          />
        </div>
      </div>

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

export default AlertEmpty;
