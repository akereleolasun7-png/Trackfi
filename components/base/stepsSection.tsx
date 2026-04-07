"use client";
import React from "react";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up in seconds with bank-grade security and streamlined onboarding features.",
  },
  {
    number: "02",
    title: "Add/Manage Assets",
    description: "Add your crypto holdings and connect your exchanges. Manage your portfolio data from day one.",
  },
  {
    number: "03",
    title: "Monitor Your History",
    description: "Track performance over time, review transactions, and analyse your financial history.",
  },
];

export function StepsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Your Journey in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] right-0 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
              )}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300">
                <span className="text-5xl font-black text-orange-500/20 block mb-4">
                  {step.number}
                </span>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}