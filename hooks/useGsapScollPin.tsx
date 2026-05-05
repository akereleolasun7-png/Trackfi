// hooks/useGsapSectionPin.ts
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapSectionPin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    if (!container || !sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        if (i === 0) return; // first section is default visible

        gsap.set(section, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: container,
          start: `${i * 33}% center`,
          end: `${(i + 1) * 33}% center`,
          onEnter: () => {
            gsap.to(sections[i - 1], { opacity: 0, y: -40, duration: 0.5 });
            gsap.to(section, { opacity: 1, y: 0, duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(section, { opacity: 0, y: 40, duration: 0.5 });
            gsap.to(sections[i - 1], { opacity: 1, y: 0, duration: 0.5 });
          },
        });
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        pinSpacing: false,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return { containerRef, sectionsRef };
}