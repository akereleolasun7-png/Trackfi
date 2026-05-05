"use client";
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { hero } from "@/lib/constants/landing";
import Link from "next/link";
import Image from "next/image";
export function HeroSection() {
  return (
    <section className="relative top-10 md:top-20 min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full mx-auto px-6 py-2 md:py-4 flex flex-col items-center justify-center text-center gap-8 md:gap-12">
        {/* Text */}
        <div className="w-full text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            {hero.heading[0]}
            <br />
            {hero.heading[1]}
            <br />
            <span className="text-orange-400">{hero.heading[2]}</span>
            <br />
            {hero.heading[3]}
          </h1>
          <p className="text-white/50 text-sm md:text-lg leading-relaxed mb-8">
            {hero.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={"/dashboard"}>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm transition-colors cursor-pointer ">
                {hero.primaryCta} <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="steps">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-white/5 hover:bg-white/10">
                <Play className="w-3.5 h-3.5 fill-current" />{" "}
                {hero.secondaryCta}
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute top-0  md:top-[15%] left-10 md:left-60 opacity-30 float-fast">
          <Image src="/logos/bitcoin.png" className=" md:w-20" width={58} height={58} alt="BTC" />
        </div>
        <div className="absolute top-0  md:top-[23%] right-10 md:right-60 opacity-40 float-slow">
          <Image src="/logos/ethereum.png" className="md:w-20" width={58} height={58} alt="ETH" />
        </div>
        <div className="absolute bottom-1/3 md:bottom-1/3 left-10 md:left-52 opacity-40 float-mid">
          <Image src="/logos/solana.png" className="md:w-15" width={58} height={58} alt="SOL" />
        </div>
        <div className="absolute bottom-1/3 md:bottom-1/3 right-10 md:right-52 opacity-40 float-fast">
          <Image src="/logos/bnb.png" className="md:w-15" width={58} height={58} alt="BNB" />
        </div>
      </div>

      {/* Trusted by bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.02] py-4 overflow-hidden">
        <div className="flex items-center gap-10 w-max animate-marquee">
          {[
            ...hero.trustedBrands,
            ...hero.trustedBrands,
            ...hero.trustedBrands,
            ...hero.trustedBrands,
          ].map((name, i) => (
            <span
              key={i}
              className="text-white/30 text-xs font-semibold tracking-widest whitespace-nowrap hover:text-white/50 transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
