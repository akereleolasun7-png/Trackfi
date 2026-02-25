'use client';
import React from 'react';
import { about } from '@/lib/constants/landing';
import { useGsapFadeUp, useGsapFadeLeft } from '@/hooks/useGsapAnimation';

export default function AboutSection() {
  const titleRef = useGsapFadeUp();
  const step0Ref = useGsapFadeLeft({ delay: 0 });
  const step1Ref = useGsapFadeLeft({ delay: 0.15 });
  const step2Ref = useGsapFadeLeft({ delay: 0.3 });
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-xs font-semibold text-[#16A34A] uppercase tracking-widest mb-3">
          Simple Process
        </p>
        <h2 ref={titleRef} className="text-3xl font-bold text-gray-900 text-center mb-10">
          {about.title}
        </h2>
        <div className="flex flex-col gap-4">
          {about.steps.map((step, index) => {
            const Icon = step.icon;
            const isMiddle = index === 1;
            return (
              <div
                key={index}
                ref={stepRefs[index]}
                className={`flex items-start gap-4 rounded-2xl border p-5 transition-all ${
                  isMiddle ? 'border-[#16A34A]/30 bg-[#F0FDF4] shadow-sm' : 'border-gray-200 bg-white'
                }`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isMiddle ? 'bg-[#16A34A]' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${isMiddle ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
                <span className="ml-auto shrink-0 text-xs font-bold text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}