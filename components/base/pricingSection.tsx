"use client";
import React from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started with the basics.",
    features: ["5 Alerts", "Basic Portfolio", "Limited History"],
    cta: "Start for Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    description: "For serious crypto investors.",
    features: [
      "Unlimited Alerts",
      "Full Portfolio P&L",
      "Full Transaction History",
      "Priority Support",
      "CSV Exports",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$29",
    period: "/mo",
    description: "For teams and power users.",
    features: [
      "Everything in Pro",
      "Multi-user Access",
      "Dedicated Account Manager",
      "Advanced Analytics",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "bg-orange-500/10 border-orange-500/40 shadow-lg shadow-orange-500/10"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-black text-xs font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-white/40 text-sm mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/40 text-sm mb-1">{plan.period}</span>}
                </div>
                <p className="text-white/30 text-xs mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-orange-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                  plan.highlight
                    ? "bg-orange-500 hover:bg-orange-400 text-black"
                    : "border border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}