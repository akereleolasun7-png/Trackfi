"use client";
import { useGsapSectionPin } from "@/hooks/useGsapScollPin";
import { PortfolioSection } from "./portfolioSection";
import { AlertsSection } from "./alertsSection";
import { MarketCoverageSection } from "./marketCoverageSection";

export function PinnedSections() {
  const { containerRef, sectionsRef } = useGsapSectionPin();

  const sections = [
    <PortfolioSection key="portfolio" />,
    <AlertsSection key="alerts" />,
    <MarketCoverageSection key="market" />,
  ];

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      
        {sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sectionsRef.current[i] = el;
            }}
            className="absolute inset-0"
          >
            {section}
          </div>
        ))}
      
    </section>
  );
}
