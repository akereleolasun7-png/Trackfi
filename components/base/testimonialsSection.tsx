"use client";
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    handle: "@alexc",
    rating: 5,
    text: "This tool completely changed how I manage my crypto. The portfolio dashboard is incredibly detailed and the alerts are spot on.",
  },
  {
    name: "Sarah Omar",
    handle: "@sarahomar",
    rating: 5,
    text: "I've tried many crypto trackers but the UX on this is unmatched. The second dashboard is as fast as the first one I've ever used.",
  },
  {
    name: "Marcus Rivera",
    handle: "@mrivera",
    rating: 5,
    text: "Our wealth started to grow in total after switching to this. A brilliant instead of just watching the ticker, our portfolio is actually tracked.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">What people say</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Voice of the Evolution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-orange-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}