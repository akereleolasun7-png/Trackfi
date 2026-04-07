"use client";
import React from "react";
import { Check } from "lucide-react";

const bullets = [
  "Hold 250+ Cryptocurrencies",
  "Custom Watchlists",
];

export function MarketCoverageSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left — image */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-orange-500/5 rounded-3xl blur-2xl scale-110" />
          <img
            src="/images/image-3.png"
            alt="Live coin prices"
            className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>

        {/* Right — text */}
        <div className="flex-1 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
            Live Market Data
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Real-Time Global Market Coverage
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Monitor thousands of prices across major exchanges. Get ultra-fast
            API access dedicated to seeing the price at the moment, not
            fractions of a second ago.
          </p>
          <ul className="space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-orange-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}