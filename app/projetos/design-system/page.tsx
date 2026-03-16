"use client";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM MASTERCLASS — v3.0
   16 Capitulos · 15 Componentes · Uma Jornada Completa
   ═══════════════════════════════════════════════════════ */

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CursorFollower } from "@/components/ui/cursor-follower";

/* ─── Section Components ─── */
import { HeroSection } from "./_sections/s01-hero";
import { TableOfContentsSection } from "./_sections/s02-toc";
import { PhilosophySection } from "./_sections/s03-philosophy";
import { StackSection } from "./_sections/s04-stack";
import { SmoothScrollSection } from "./_sections/s05-smooth-scroll";
import { SpotlightGlowSection } from "./_sections/s05b-spotlight-glow";
import { GlassmorphismLabSection } from "./_sections/s06-glassmorphism-lab";
import { TypographyWorkshopSection } from "./_sections/s07-typography-workshop";
import { ParallaxMasterclassSection } from "./_sections/s08-parallax-masterclass";
import { SpringPhysicsSection } from "./_sections/s09-spring-physics";
import { MagneticFieldsSection } from "./_sections/s10-magnetic-fields";
import { CompositionSection } from "./_sections/s11-composition";
import { AccessibilitySection } from "./_sections/s12-accessibility";
import { PerformanceSection } from "./_sections/s13-performance";
import { ComponentCatalogSection } from "./_sections/s14-component-catalog";
import { PlaygroundSection } from "./_sections/s15-playground";
import { GradientGallerySection } from "./_sections/s16-gradient-gallery";
import { StaggerBeforeAfterSection } from "./_sections/s17-stagger-before-after";
import { MetricsSection } from "./_sections/s00-metrics";
import { TechStackSection, FooterSection } from "./_sections/s18-tech-footer";

export default function DesignSystemPage() {
  return (
    <main className="relative min-h-screen bg-[#fafaf9] overflow-x-hidden">
      {/* ─── Global Overlays ─── */}
      <ScrollProgress color="linear-gradient(to right, #2563eb, #7c3aed, #06b6d4)" />
      <GrainOverlay opacity={0.012} />
      <CursorFollower />

      {/* ─── Chapters ─── */}
      <HeroSection />
      <TableOfContentsSection />
      <PhilosophySection />
      <StackSection />
      <SmoothScrollSection />
      <SpotlightGlowSection />
      <GlassmorphismLabSection />
      <MetricsSection />
      <TypographyWorkshopSection />
      <ParallaxMasterclassSection />
      <SpringPhysicsSection />
      <MagneticFieldsSection />
      <CompositionSection />
      <AccessibilitySection />
      <PerformanceSection />
      <ComponentCatalogSection />
      <PlaygroundSection />
      <GradientGallerySection />
      <StaggerBeforeAfterSection />
      <TechStackSection />
      <FooterSection />
    </main>
  );
}
