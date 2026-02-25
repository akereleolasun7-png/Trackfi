'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homePage } from "@/lib/constants/landing";
import { useIsMobile } from '@/hooks/use-mobile';
import { useGsapFadeUp, useGsapFadeRight } from '@/hooks/useGsapAnimation';
const Hero = () => {
  const isMobile = useIsMobile();
  // refs
  const titleRef = useGsapFadeUp({ scroll: false, delay: 0 });
  const descRef = useGsapFadeUp({ scroll: false, delay: 0.2 });
  const btnRef = useGsapFadeUp({ scroll: false, delay: 0.4 });
  const imagesRef = useGsapFadeRight({ scroll: false, delay: 0.5 })
  return (
    <div className="relative min-h-[70vh] lg:min-h-screen bg-linear-to-b from-[#E8F5EE] via-[#F0FAF4] to-white overflow-hidden">

      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4ADE80]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 lg:py-16 flex flex-col lg:flex-row items-center justify-evenly gap-8 lg:gap-12">

        {/* LEFT SIDE - TEXT */}
        <div className="flex  flex-col items-center justify-center text-center">
          <h1 ref={titleRef} className=" text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-[#0A0F0C]">
            Scan.<br />
            Order.<br />
            <span className="text-[#16A34A]">Relax.</span>
          </h1>

          <p ref={descRef} className="mt-6 text-base  text-[#374151] leading-relaxed max-w-md mx-auto lg:mx-0">
            {homePage.description}
          </p>

          <div ref={btnRef} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
            <Link href="/tables">
              <button className="bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3.5 rounded-full transition-colors">

                {homePage.btn} →
              </button>
            </Link>
            <Link href="#about">
              <button className="bg-white border border-gray-200 text-[#0A0F0C] font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <span className="w-5 h-5 rounded-full bg-[#0A0F0C] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white fill-white" viewBox="0 0 10 10">
                    <polygon points="3,1 9,5 3,9" />
                  </svg>
                </span>
                {homePage.getMore}
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGES (Desktop Only) */}
        {!isMobile && (
          <div ref={imagesRef} className=" grid grid-cols-2 gap-4 max-w-md">
            {homePage.images.map((src, index) => (
              <div
                key={index}
                className="relative w-[200px] h-[190px] overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={src}
                  alt={`Hero food ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;