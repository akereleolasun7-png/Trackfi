"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is it free to use?",
    answer: "Yes, Track8 has a free tier that gives you access to core features including basic portfolio tracking and up to 5 price alerts.",
  },
  {
    question: "What exchanges are supported?",
    answer: "We support all major exchanges including Binance, Coinbase, Kraken, and many more. New integrations are added regularly.",
  },
  {
    question: "Can I track multiple exchanges?",
    answer: "Pro and Enterprise users can connect and consolidate data from multiple exchanges into one unified dashboard.",
  },
  {
    question: "Is mobile app available?",
    answer: "Our platform is fully responsive and optimised for mobile browsers. A dedicated native app is on our roadmap.",
  },
  {
    question: "Do you support tax reporting?",
    answer: "Yes, Pro users can export full transaction history as CSV for use with popular crypto tax tools and accountants.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl transition-all duration-300 ${
                open === i ? "border-orange-500/30 bg-orange-500/5" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-white text-sm font-medium">{faq.question}</span>
                {open === i ? (
                  <Minus className="w-4 h-4 text-orange-400 flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-white/30 flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}