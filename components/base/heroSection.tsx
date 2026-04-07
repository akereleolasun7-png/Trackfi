"use client";
import React from "react";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left — text */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Track Your<br />
            Crypto.{" "}
            <span className="text-orange-400">Own</span><br />
            Your Finances.
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
            The ultimate dashboard to monitor your portfolio, set price alerts,
            and gain deep insights into your financial future.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition-colors">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" /> See How It Works
            </button>
          </div>
        </div>

        {/* Right — dashboard image (desktop) */}
        <div className="flex-1 relative hidden md:flex justify-end">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-2xl scale-105" />
            <img
              src="/images/image-1.png"
              alt="Dashboard preview"
              className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile — image below text */}
        <div className="md:hidden w-full">
          <img
            src="/images/image-1.png"
            alt="Dashboard preview"
            className="w-full rounded-2xl border border-white/10 shadow-xl"
          />
        </div>
      </div>

      {/* Trusted by bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.02] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-10 overflow-x-auto">
          <span className="text-white/20 text-xs uppercase tracking-widest whitespace-nowrap">Trusted by</span>
          {["CRYPTO", "BLOCK VENTURES", "HOMESTREAM", "BETLABS", "INTRASET"].map((name) => (
            <span key={name} className="text-white/30 text-xs font-semibold tracking-widest whitespace-nowrap hover:text-white/50 transition-colors cursor-default">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}