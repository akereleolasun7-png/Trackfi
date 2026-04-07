"use client";
import React from "react";
import {
  Search,
  TrendingUp,
  DollarSign,
  Smartphone,
  Mail,
  Lightbulb,
} from "lucide-react";

interface Coin {
  label: string;
  coin: string;
  symbol: string;
  current_price: number;
}

interface AlertConfigPanelProps {
  coins: Coin[];
  selectedCoin: Coin | null;
  onCoinSelect: (coin: Coin) => void;
  condition: "above" | "below" | "change";
  onConditionChange: (c: "above" | "below" | "change") => void;
  targetPrice: string;
  onTargetPriceChange: (v: string) => void;
  inApp: boolean;
  onInAppChange: (v: boolean) => void;
  email: boolean;
  onEmailChange: (v: boolean) => void;
  isEmpty?: boolean;
  onSave?: () => void;
  editingTitle?: string;
}

// Build price map from coins data (dynamic, not hardcoded)
export function AlertConfigPanel({
  coins,
  selectedCoin,
  onCoinSelect,
  condition,
  onConditionChange,
  targetPrice,
  onTargetPriceChange,
  inApp,
  onInAppChange,
  email,
  onEmailChange,
  isEmpty,
  onSave,
  editingTitle,
}: AlertConfigPanelProps) {
  if (!selectedCoin) return null;

  // Build dynamic price map from coins data
  const currentPrices = coins.reduce(
    (acc, coin) => {
      acc[coin.symbol] = coin.current_price;
      return acc;
    },
    {} as Record<string, number>,
  );

  const currentPrice = currentPrices[selectedCoin.symbol];

  return (
    <div className="w-full lg:w-[340px] shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
      {/* Title */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
          {editingTitle ? "Edit Alert Details" : "Configuration"}
        </p>
        {editingTitle && (
          <p className="text-sm text-white/60">{editingTitle}</p>
        )}
      </div>

      {/* Select Asset */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <DollarSign className="w-3 h-3" /> Select Asset
        </p>

        {isEmpty ? (
          <>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search coins..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {coins.map((c) => (
                <button
                  key={c.symbol}
                  onClick={() => onCoinSelect(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    selectedCoin.symbol === c.symbol
                      ? "bg-primary text-black"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <select
            value={selectedCoin.symbol}
            onChange={(e) =>
              onCoinSelect(
                coins.find((c) => c.symbol === e.target.value) ?? coins[0],
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
          >
            {coins.map((c) => (
              <option key={c.symbol} value={c.symbol} className="bg-[#111]">
                {c.coin} ({c.symbol})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Condition */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3" /> Condition
        </p>
        <div className="flex gap-2">
          {(["above", "below"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => onConditionChange(opt)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors ${
                condition === opt
                  ? "bg-primary text-black"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {isEmpty
                ? `Price ${opt.charAt(0).toUpperCase() + opt.slice(1)}`
                : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Target Price */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <DollarSign className="w-3 h-3" /> Target Price (USD)
        </p>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <span className="text-white/40 text-sm">$</span>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => onTargetPriceChange(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
          />
        </div>
        {currentPrice && (
          <p className="text-[11px] text-white/30 mt-1.5 text-right">
            Current {selectedCoin.symbol} Price: $
            {currentPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Delivery / Notification */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
          {isEmpty ? "Notification Method" : "Delivery Channels"}
        </p>
        <div className="flex flex-col gap-2">
          {/* In-app */}
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
              inApp
                ? "bg-primary/10 border-primary/20"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Smartphone
                className={`w-4 h-4 ${inApp ? "text-primary" : "text-white/30"}`}
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {isEmpty ? "In-app Push" : "In-app Notification"}
                </p>
                {!isEmpty && (
                  <p className="text-[11px] text-white/30">
                    Instant push alert
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => onInAppChange(!inApp)}
              className={`w-10 h-6 rounded-full transition-colors relative ${inApp ? "bg-primary" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${inApp ? "left-5" : "left-1"}`}
              />
            </button>
          </div>

          {/* Email */}
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
              email
                ? "bg-primary/10 border-primary/20"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail
                className={`w-4 h-4 ${email ? "text-primary" : "text-white/30"}`}
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {isEmpty ? "Email Alert" : "Email Digest"}
                </p>
                {!isEmpty && (
                  <p className="text-[11px] text-white/30">market@user.com</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onEmailChange(!email)}
              className={`w-10 h-6 rounded-full transition-colors relative ${email ? "bg-primary" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${email ? "left-5" : "left-1"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Pro tip (empty state only) */}
      {isEmpty && (
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-purple-400 mb-1">
                Pro Tip:
              </p>
              <p className="text-xs text-white/40 leading-relaxed">
                Set multiple alerts for the same coin to create a &ldquo;trading
                corridor&rdquo; notification system.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      {!isEmpty && (
        <>
          <p className="text-[11px] text-white/20 leading-relaxed">
            This alert will remain active until manually disabled or deleted.
          </p>
          <button
            onClick={onSave}
            className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </>
      )}

      {isEmpty && (
        <button
          onClick={onSave}
          className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3.5 rounded-2xl transition-colors cursor-pointer"
        >
          Save Alert
        </button>
      )}
    </div>
  );
}
