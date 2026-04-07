"use client";
import React from "react";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50+", label: "Coins Supported" },
  { value: "99.9%", label: "Uptime" },
];

export function StatsSection() {
  return (
    <section className="bg-[#0a0a0a] py-20 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.value} className="py-6">
              <p className="text-5xl md:text-6xl font-black text-orange-400 mb-2">
                {stat.value}
              </p>
              <p className="text-white/40 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}