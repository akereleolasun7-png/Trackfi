"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export function AlertsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left — text */}
        <div className="flex-1 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
            Smart Alerts
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Automated Alerts That Work For You
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Don&apos;t spend your day staring at charts. Set your parameters and
            let our intelligent alert engine do the heavy lifting. Your targets
            and your life, on your terms.
          </p>

          {/* Sample alert card */}
          <div className="bg-white/5 border border-orange-500/30 rounded-xl px-4 py-3 flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Price Alert: BTC &gt; $55,000</span>
            <span className="ml-auto text-green-400 text-xs font-semibold">Active</span>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition-colors">
            Set Your First Alert <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right — image */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-orange-500/5 rounded-3xl blur-2xl scale-110" />
          <img
            src="/images/image-4.png"
            alt="Price alerts UI"
            className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}