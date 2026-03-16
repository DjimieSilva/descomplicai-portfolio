"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ─── Design System Components ─── */
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { DotGrid } from "@/components/ui/dot-grid";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { StaggerContainer } from "@/components/ui/stagger-container";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM SHOWCASE
   ═══════════════════════════════════════════════════════ */

export default function DesignSystemPage() {
  return (
    <main className="relative min-h-screen bg-[#fafaf9] overflow-x-hidden">
      {/* ─── Global Overlays ─── */}
      <ScrollProgress />
      <GrainOverlay opacity={0.012} />
      <CursorFollower />

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg gradient-text">
            descomplicai
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <Link href="/projetos" className="hover:text-blue-600 transition-colors">
              Projetos
            </Link>
            <Link href="/#services" className="hover:text-blue-600 transition-colors">
              Servicos
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
         SECTION 1: HERO
         ═══════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 px-6 min-h-[80vh] flex items-center overflow-hidden">
        <AnimatedGradient />
        <DotGrid opacity={0.04} />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Projetos
          </Link>

          <BlurText
            text="Design System"
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900"
            gradient
            animateBy="letters"
            delay={200}
          />

          <div className="mt-6 h-8">
            <TextScramble
              text="15 componentes. GSAP. Lenis. Glassmorphism."
              as="p"
              className="text-lg sm:text-xl text-slate-500"
              speed={25}
            />
          </div>

          <p className="mt-6 text-slate-400 max-w-xl text-sm leading-relaxed">
            Sistema de design centralizado para todos os projetos Descomplicai.
            Scroll cinematico, animacoes de entrada, efeitos visuais e componentes interativos.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 2: GLASS CARDS + SPOTLIGHT
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Visual Effects"
            title="Glassmorphism"
            description="Cards com backdrop-blur, spotlight mouse-tracking e hover lift via spring physics."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            <GlassCard className="min-h-[200px]" data-hover>
              <Spotlight size={250} />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-lg">01</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">GlassCard</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Backdrop blur 20px + saturate 180%. Hover lift com spring physics.
                  Polymorphic via prop <code className="text-xs bg-slate-100 px-1 rounded">as</code>.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="min-h-[200px]" data-hover>
              <Spotlight size={250} className="from-purple-200 via-purple-300 to-purple-400" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <span className="text-purple-600 text-lg">02</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Spotlight</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Radial gradient que segue o cursor com spring physics.
                  Cores e tamanho configuraveis.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="min-h-[200px]" data-hover>
              <Spotlight size={250} className="from-cyan-200 via-cyan-300 to-cyan-400" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <span className="text-cyan-600 text-lg">03</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">GrainOverlay</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  SVG feTurbulence noise em overlay fixo. Subtil a 1.2% opacity.
                  Visivel nesta pagina.
                </p>
              </div>
            </GlassCard>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 3: GLOW CARDS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 bg-slate-950">
        <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading
            label="Interactive"
            title="Glow Effects"
            description="Cards com box-shadow glow configuravel no hover. Tres cores."
            dark
          />

          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            <GlowCard
              glowColor="rgba(59,130,246,0.3)"
              className="bg-slate-900/80 backdrop-blur-sm"
            >
              <div className="text-center py-6">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="font-semibold text-white mb-1">Blue Glow</h3>
                <p className="text-sm text-slate-400">rgba(59,130,246,0.3)</p>
              </div>
            </GlowCard>

            <GlowCard
              glowColor="rgba(168,85,247,0.3)"
              className="bg-slate-900/80 backdrop-blur-sm"
            >
              <div className="text-center py-6">
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="font-semibold text-white mb-1">Purple Glow</h3>
                <p className="text-sm text-slate-400">rgba(168,85,247,0.3)</p>
              </div>
            </GlowCard>

            <GlowCard
              glowColor="rgba(6,182,212,0.3)"
              className="bg-slate-900/80 backdrop-blur-sm"
            >
              <div className="text-center py-6">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-semibold text-white mb-1">Cyan Glow</h3>
                <p className="text-sm text-slate-400">rgba(6,182,212,0.3)</p>
              </div>
            </GlowCard>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 4: MAGNETIC BUTTONS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <DotGrid opacity={0.03} />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading
            label="Interaction"
            title="Magnetic Buttons"
            description="Botoes atraidos pelo cursor com retorno via spring. Desktop-only, 44px+ touch targets."
          />

          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              data-hover
            >
              Primary Action
            </MagneticButton>

            <MagneticButton
              className="px-8 py-3 rounded-full border-2 border-slate-900 text-slate-900 font-medium hover:bg-slate-900 hover:text-white transition-colors"
              strength={0.4}
              data-hover
            >
              Secondary
            </MagneticButton>

            <MagneticButton
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
              strength={0.5}
              data-hover
            >
              Gradient CTA
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 5: TYPOGRAPHY
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Typography"
            title="Text Animations"
            description="Blur reveal, decode scramble e gradient text. Trigger via IntersectionObserver."
          />

          <div className="space-y-16">
            {/* BlurText — words */}
            <div className="text-center">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                BlurText — words
              </p>
              <BlurText
                text="IA sem complexidade com resultados reais"
                as="h2"
                className="text-3xl sm:text-5xl font-bold text-slate-900 justify-center"
                animateBy="words"
                once={false}
              />
            </div>

            {/* BlurText — letters + gradient */}
            <div className="text-center">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                BlurText — letters + gradient
              </p>
              <BlurText
                text="Descomplicai"
                as="h2"
                className="text-4xl sm:text-6xl font-bold justify-center"
                animateBy="letters"
                gradient
                once={false}
              />
            </div>

            {/* TextScramble */}
            <div className="text-center">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                TextScramble — decode effect
              </p>
              <TextScramble
                text="O futuro e construido por quem simplifica."
                as="h2"
                className="text-2xl sm:text-4xl font-bold text-slate-900"
                speed={35}
                once={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 6: PARALLAX + STAGGER
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Layout & Scroll"
            title="Parallax & Stagger"
            description="GSAP ScrollTrigger para parallax. Framer Motion para stagger de entrada."
          />

          {/* Parallax demo */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-16">
            <ParallaxSection speed={0.2} className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4 p-8 opacity-20">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-lg bg-blue-500"
                      style={{ opacity: 0.3 + (i % 4) * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.4} className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl sm:text-8xl font-bold text-slate-900/10">
                    PARALLAX
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Scroll para ver o efeito
                  </p>
                </div>
              </div>
            </ParallaxSection>
          </div>

          {/* Stagger demo — direction variants */}
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                StaggerContainer — direction: up
              </p>
              <StaggerContainer className="space-y-3" direction="up">
                {["Primeiro item", "Segundo item", "Terceiro item", "Quarto item"].map(
                  (label) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-600"
                    >
                      {label}
                    </div>
                  )
                )}
              </StaggerContainer>
            </div>

            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                StaggerContainer — direction: left
              </p>
              <StaggerContainer className="space-y-3" direction="left">
                {["Alpha", "Beta", "Gamma", "Delta"].map((label) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-600"
                  >
                    {label}
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 7: COMPONENT INDEX
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Reference"
            title="Todos os Componentes"
            description="15 componentes prontos a usar em qualquer projeto."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.05}
          >
            {[
              { name: "ScrollProgress", category: "Layout", color: "blue" },
              { name: "GrainOverlay", category: "Visual", color: "slate" },
              { name: "CursorFollower", category: "Interactive", color: "purple" },
              { name: "AnimatedGradient", category: "Visual", color: "cyan" },
              { name: "DotGrid", category: "Visual", color: "slate" },
              { name: "BlurText", category: "Typography", color: "blue" },
              { name: "TextScramble", category: "Typography", color: "green" },
              { name: "SectionHeading", category: "Typography", color: "amber" },
              { name: "GlassCard", category: "Visual", color: "blue" },
              { name: "Spotlight", category: "Visual", color: "purple" },
              { name: "GlowCard", category: "Interactive", color: "cyan" },
              { name: "MagneticButton", category: "Interactive", color: "blue" },
              { name: "ParallaxSection", category: "Layout", color: "green" },
              { name: "StaggerContainer", category: "Layout", color: "amber" },
              { name: "SmoothScrollProvider", category: "Layout", color: "slate" },
            ].map((comp) => (
              <div
                key={comp.name}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-semibold text-slate-900">
                    {comp.name}
                  </code>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {comp.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  @/components/ui/{comp.name.replace(/([A-Z])/g, (m, c, i) =>
                    i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`
                  )}
                </p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-6 py-12 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Design System v1.0 — Built with Next.js, GSAP, Lenis, Framer Motion
        </p>
        <p className="text-xs text-slate-300 mt-1">
          &copy; 2026 Descomplicai
        </p>
      </footer>
    </main>
  );
}
