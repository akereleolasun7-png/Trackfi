"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/lib/constants/landing";
import Link from "next/link";
import Image from "next/image";

export function PortfolioSection() {
  

  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col justify-evenly md:flex-row items-center gap-16">
        {/* Left — image */}
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/5 rounded-3xl blur-2xl scale-110" />
          <Image
            src="/images/dashboard-iphone.png"
            alt="Portfolio performance chart"
            className="w-[12em] md:w-[15em]  relative z-10 rounded-2xl shadow-2xl"
            height={400}
            width={400}
          />
        </div>

        {/* Right — text */}
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-6">
            {portfolio.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {portfolio.heading}
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            {portfolio.description}
          </p>
          <Link href={"/dashboard"}>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-colors cursor-pointer">
              {portfolio.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
