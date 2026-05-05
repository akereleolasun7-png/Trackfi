import Navbar from "./navbar";
import { HeroSection } from "@/components/base/heroSection";
import { FeaturesSection } from "@/components/base/featuresSection";
import { StepsSection } from "@/components/base/stepsSection";
import { StatsSection } from "@/components/base/statsSection";
import { TestimonialsSection } from "@/components/base/testimonialsSection";
import { PricingSection } from "@/components/base/pricingSection";
import { FAQSection } from "@/components/base/faqSection";
import { CTASection } from "@/components/base/ctaSection";
import { FooterSection } from "@/components/base/footerSection";
import { PinnedSections } from "@/components/base/pinnedSection";
export default function LandingPage() {
  return (
    <>
      <Navbar isLanding={true} />
      <main className="bg-[#0a0a0a]">
        <HeroSection />
        <FeaturesSection />
        <PinnedSections />
        <StepsSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <FooterSection />
      </main>
    </>
  );
}
