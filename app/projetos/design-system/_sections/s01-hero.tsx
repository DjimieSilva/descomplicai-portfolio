"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { DotGrid } from "@/components/ui/dot-grid";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowCard } from "@/components/ui/glow-card";
import { Spotlight } from "@/components/ui/spotlight";

/* ------------------------------------------------------------------ */
/*  useAnimatedCounter — counts from 0 to target on intersection      */
/* ------------------------------------------------------------------ */
function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [target, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Counter stat item                                                  */
/* ------------------------------------------------------------------ */
function CounterStat({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const { count, ref } = useAnimatedCounter(target);
  return (
    <div className="text-center" data-hover>
      <span
        ref={ref}
        className="block text-3xl font-bold tracking-tight text-white md:text-4xl"
      >
        {count}
        {suffix}
      </span>
      <span className="mt-1 block text-xs uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  HeroSection                                                        */
/* ================================================================== */
export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center">
      {/* ---- background layers ---- */}
      <AnimatedGradient
        colors={["#2563eb", "#7c3aed", "#06b6d4"]}
        className="opacity-60"
      />
      <DotGrid size={32} dotSize={1} opacity={0.04} color="rgb(148,163,184)" />

      {/* ---- floating decorative blurs ---- */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[140px]"
        aria-hidden="true"
      />

      {/* ---- content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        {/* back link */}
        <Link
          href="/projetos"
          className="group mb-16 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          data-hover
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar aos Projetos
        </Link>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ---- LEFT: copy ---- */}
          <div className="max-w-xl">
            {/* badge */}
            <span className="mb-6 inline-block rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300">
              v3.0 &mdash; Masterclass Edition &mdash; 16 Capitulos
            </span>

            {/* title */}
            <BlurText
              text="Design System"
              as="h1"
              animateBy="letters"
              gradient
              className="text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl"
            />

            {/* scramble subtitle */}
            <TextScramble
              text="Uma masterclass interativa sobre engenharia de interfaces."
              as="p"
              className="mt-6 text-lg font-medium text-slate-300 md:text-xl"
              speed={25}
            />

            {/* description */}
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              Mais do que um conjunto de componentes &mdash; esta e uma jornada
              pelos principios, tecnicas e decisoes por detras de cada pixel.
              GSAP, Lenis, Framer Motion, glassmorphism, spring physics &mdash;
              tudo a funcionar em harmonia, documentado capitulo a capitulo.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="#indice"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition-shadow hover:shadow-white/20"
                data-hover
              >
                Comecar a Masterclass
              </MagneticButton>
              <MagneticButton
                href="https://github.com"
                className="rounded-full border border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                data-hover
              >
                <span className="flex items-center gap-2">
                  Ver Codigo
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* ---- RIGHT: visual composition (desktop only) ---- */}
          <div className="relative hidden h-[500px] lg:block" aria-hidden="true">
            <Spotlight size={300} className="from-blue-400/30 via-violet-400/20 to-transparent" />

            {/* Layer 1 — code editor card */}
            <ParallaxSection speed={0.15} className="absolute inset-4">
              <GlassCard
                hover={false}
                className="h-full w-full !bg-slate-900/70 !border-slate-700/40"
              >
                {/* fake title bar */}
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3 text-[10px] text-slate-500 font-mono">
                    design-system.tsx
                  </span>
                </div>
                {/* fake code lines */}
                <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
                  <div>
                    <span className="text-violet-400">export function</span>{" "}
                    <span className="text-blue-300">GlassCard</span>
                    <span className="text-slate-500">{"({"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-500">children,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">blur</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-amber-300">20</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">hover</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-amber-300">true</span>
                    <span className="text-slate-500">,</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{"}) {"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-violet-400">return</span>{" "}
                    <span className="text-slate-500">(</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-blue-400">{"<motion.div"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-cyan-300">whileHover</span>
                    <span className="text-slate-500">{"={{ "}</span>
                    <span className="text-cyan-300">y</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-300">-4</span>
                    <span className="text-slate-500">{" }}"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-cyan-300">style</span>
                    <span className="text-slate-500">{"={{ "}</span>
                    <span className="text-cyan-300">backdropFilter</span>
                    <span className="text-slate-500">{": `blur(${blur}px)` }}"}</span>
                  </div>
                  <div className="pl-6">
                    <span className="text-blue-400">{"/>"}</span>
                  </div>
                </div>
              </GlassCard>
            </ParallaxSection>

            {/* Layer 2 — floating chapter count */}
            <ParallaxSection speed={0.35} className="absolute -top-4 -right-4 z-20">
              <GlowCard
                glowColor="rgba(139,92,246,0.25)"
                className="rounded-xl bg-slate-900/90 px-5 py-4"
                data-hover
              >
                <span className="block text-2xl font-bold text-white">16</span>
                <span className="text-[10px] uppercase tracking-widest text-violet-300">
                  Capitulos
                </span>
              </GlowCard>
            </ParallaxSection>

            {/* Layer 3 — floating fps badge */}
            <ParallaxSection speed={0.5} className="absolute -bottom-2 -left-4 z-20">
              <GlowCard
                glowColor="rgba(6,182,212,0.2)"
                className="rounded-xl bg-slate-900/90 px-5 py-4"
                data-hover
              >
                <span className="block text-2xl font-bold text-white">60fps</span>
                <span className="text-[10px] uppercase tracking-widest text-cyan-300">
                  GSAP + Lenis
                </span>
              </GlowCard>
            </ParallaxSection>
          </div>
        </div>

        {/* ---- COUNTERS row ---- */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-slate-800/60 pt-12 md:grid-cols-4">
          <CounterStat target={15} label="Componentes" />
          <CounterStat target={16} label="Capitulos" />
          <CounterStat target={847} label="Linhas de Codigo" />
          <CounterStat target={60} label="FPS" suffix="fps" />
        </div>
      </div>

      {/* ---- bottom gradient fade ---- */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
