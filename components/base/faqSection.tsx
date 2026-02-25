'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faq } from '@/lib/constants/landing';
import { useGsapFadeUp } from '@/hooks/useGsapAnimation';
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useGsapFadeUp();
  const listRef = useGsapFadeUp({ delay: 0.2 });
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{faq.title}</h2>
          <p className="text-gray-500 mt-2 text-sm">{faq.description}</p>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="flex flex-col gap-3">
          {faq.items.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'border-[#16A34A]/30 bg-[#F0FDF4]'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className={`text-sm font-semibold transition-colors ${
                  openIndex === index ? 'text-[#16A34A]' : 'text-gray-800'
                }`}>
                  {item.question}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-[#16A34A] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {openIndex === index
                    ? <Minus className="w-3.5 h-3.5" />
                    : <Plus className="w-3.5 h-3.5" />
                  }
                </span>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}