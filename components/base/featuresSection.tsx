"use client";
import React from "react";
import { LineChart, PieChart, Bell, Clock } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Live Data Stream",
    description:
      "Access live price streams, realtime market ticks, and up-to-the-second financial data across hundreds of assets.",
    image: "/images/image-2.png",
    span: "col-span-1 md:col-span-2",
  },
  {
    icon: PieChart,
    title: "Portfolio P&L",
    description:
      "Visualise gains and losses across your entire portfolio with advanced charting, tracking, and detailed breakdowns.",
    image: null,
    span: "col-span-1",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description:
      "Set custom triggers for price movements so you never miss a critical market signal or trading opportunity.",
    image: null,
    span: "col-span-1",
  },
  {
    icon: Clock,
    title: "Transaction History",
    description:
      "Every trade logged and searchable. Full history designed for seamless accurate record keeping and tax reporting.",
    image: null,
    span: "col-span-1 md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything you need to master your assets.
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">
            Track8 provides real-time tools and advanced analytics to help you make
            smarter financial moves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`${feature.span} bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-orange-500/20 hover:bg-white/[0.05] transition-all duration-300`}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-orange-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                {feature.image && (
                  <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
                    <img src={feature.image} alt={feature.title} className="w-full object-cover" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}