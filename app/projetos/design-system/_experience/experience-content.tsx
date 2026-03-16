"use client";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM — EXPERIENCIA INTERATIVA
   15 ferramentas interativas numa jornada imersiva
   ═══════════════════════════════════════════════════════ */

import { ParticleHero } from "./e01-particle-hero";
import { TiltCardsSection } from "./e02-tilt-cards";
import { ScrollTextFillSection } from "./e03-scroll-text-fill";
import { BentoGridSection } from "./e04-bento-grid";
import { MarqueeSection } from "./e05-marquee";
import { MorphingBlobsSection } from "./e06-morphing-blobs";
import { ColorPaletteSection } from "./e07-color-palette";
import { TypewriterSection } from "./e08-typewriter";
import { HoverGallerySection } from "./e09-hover-gallery";
import { OdometerStatsSection } from "./e10-odometer-stats";
import { ProgressRing } from "./e11-progress-ring";
import { CursorTrail } from "./e12-cursor-trail";
import { AccordionFaqSection } from "./e13-accordion-faq";
import { NoiseGradientSection } from "./e14-noise-section";
import { MagneticCtaSection } from "./e15-cta-magnetic";
import { ComparisonSliderSection } from "./e16-comparison-slider";
import { AnimatedCodeSection } from "./e17-animated-code";

export function ExperienceContent() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ─── Global Effects ─── */}
      <ProgressRing />
      <CursorTrail />

      {/* ─── Sections ─── */}
      <ParticleHero />
      <TiltCardsSection />
      <ScrollTextFillSection />
      <BentoGridSection />
      <MarqueeSection />
      <MorphingBlobsSection />
      <AnimatedCodeSection />
      <OdometerStatsSection />
      <ComparisonSliderSection />
      <HoverGallerySection />
      <ColorPaletteSection />
      <TypewriterSection />
      <NoiseGradientSection />
      <AccordionFaqSection />
      <MagneticCtaSection />
    </div>
  );
}
