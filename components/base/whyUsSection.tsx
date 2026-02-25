'use client';
import React from 'react';
import { whyUs } from '@/lib/constants/landing';
import { useGsapFadeUp, useGsapScaleFade } from '@/hooks/useGsapAnimation';

export default function WhyUsSection() {
  const titleRef = useGsapFadeUp();
  const card0 = useGsapScaleFade({ delay: 0 });
  const card1 = useGsapScaleFade({ delay: 0.1 });
  const card2 = useGsapScaleFade({ delay: 0.2 });
  const card3 = useGsapScaleFade({ delay: 0.3 });
  const card4 = useGsapScaleFade({ delay: 0.4 });
  const card5 = useGsapScaleFade({ delay: 0.5 });
  const cardRefs = [card0, card1, card2, card3, card4, card5];

  return (
    <section id="whyus" className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{whyUs.title}</h2>
          <p className="text-sm text-gray-500 mt-2">{whyUs.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {whyUs.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={cardRefs[index]}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3 hover:border-[#16A34A]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}