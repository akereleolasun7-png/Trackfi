"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export function PortfolioSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left — image */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-orange-500/5 rounded-3xl blur-2xl scale-110" />
          <img
            src="/images/image-5.png"
            alt="Portfolio performance chart"
            className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>

        {/* Right — text */}
        <div className="flex-1 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
            Portfolio Intelligence
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Visual Portfolio Intelligence
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Get a holistic view of your wealth. We consolidate your coin
            holdings, exchange accounts, and traditional balances into one
            luminous signal.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-colors">
            Explore Analytics <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}