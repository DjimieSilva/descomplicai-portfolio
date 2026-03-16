"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { BlurText } from "@/components/ui/blur-text";

/* ─── Frame Budget Timeline ─── */

const frameBudget = [
  { label: "Layout", ms: 2, color: "bg-cyan-400" },
  { label: "Paint", ms: 4, color: "bg-violet-400" },
  { label: "Composite", ms: 2, color: "bg-emerald-400" },
  { label: "JS", ms: 4, color: "bg-amber-400" },
  { label: "Free", ms: 4.67, color: "bg-slate-600" },
];

const totalMs = frameBudget.reduce((sum, f) => sum + f.ms, 0);

/* ─── Bundle Size Data ─── */

type Category = "visual" | "interactive" | "layout" | "typography";

interface BundleEntry {
  name: string;
  size: number;
  category: Category;
}

const bundleData: BundleEntry[] = [
  { name: "CursorFollower", size: 1.5, category: "interactive" },
  { name: "MagneticButton", size: 1.3, category: "interactive" },
  { name: "BlurText", size: 1.2, category: "typography" },
  { name: "TextScramble", size: 1.1, category: "typography" },
  { name: "GlassCard", size: 1.0, category: "visual" },
  { name: "Spotlight", size: 1.0, category: "visual" },
  { name: "SmoothScrollProvider", size: 1.0, category: "layout" },
  { name: "StaggerContainer", size: 0.9, category: "layout" },
  { name: "GlowCard", size: 0.8, category: "visual" },
  { name: "ParallaxSection", size: 0.8, category: "layout" },
  { name: "SectionHeading", size: 0.6, category: "typography" },
  { name: "AnimatedGradient", size: 0.5, category: "visual" },
  { name: "ScrollProgress", size: 0.5, category: "layout" },
  { name: "DotGrid", size: 0.4, category: "visual" },
  { name: "GrainOverlay", size: 0.3, category: "visual" },
];

const maxSize = Math.max(...bundleData.map((b) => b.size));
const totalSize = bundleData.reduce((sum, b) => sum + b.size, 0);

const categoryColors: Record<Category, string> = {
  visual: "bg-blue-500",
  interactive: "bg-violet-500",
  layout: "bg-cyan-500",
  typography: "bg-amber-500",
};

const categoryLabels: Record<Category, string> = {
  visual: "Visual",
  interactive: "Interactivo",
  layout: "Layout",
  typography: "Tipografia",
};

/* ─── Optimization Techniques ─── */

const techniques = [
  {
    title: "will-change: transform",
    description:
      "Promove o elemento para a sua propria GPU layer, evitando repaint da pagina inteira.",
  },
  {
    title: "IntersectionObserver",
    description:
      "Animacoes so iniciam quando o elemento esta visivel. Zero trabalho fora do viewport.",
  },
  {
    title: "requestAnimationFrame",
    description:
      "Todas as animacoes imperativas usam rAF, sincronizadas com o refresh rate do monitor.",
  },
  {
    title: "Tree Shaking",
    description:
      "Cada componente e um ficheiro independente. Importas apenas o que usas — zero dead code.",
  },
];

/* ─── System Rules ─── */

const rules = [
  "Componente individual: < 2KB gzipped",
  "Bundle total do design system: < 15KB gzipped",
  "First paint impact: < 50ms",
  "Scroll handler: < 1ms por frame",
  "Zero layout thrashing — reads antes de writes",
];

/* ─── Component ─── */

export function PerformanceSection() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-32 px-6 overflow-hidden"
    >
      <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 12"
          title="Performance"
          description="16.67ms. Esse e o budget por frame a 60fps. Cada componente foi optimizado para caber nesse orcamento."
        />

        {/* ─── O Budget de 16.67ms ─── */}
        <div className="mb-24">
          <BlurText
            text="O Budget de 16.67ms"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-white md:text-2xl"
          />

          <div className="mx-auto max-w-3xl">
            {/* Timeline bar */}
            <div className="flex h-14 w-full overflow-hidden rounded-xl border border-slate-800">
              {frameBudget.map((segment) => (
                <div
                  key={segment.label}
                  className={`${segment.color} relative flex items-center justify-center transition-all duration-1000 ease-out`}
                  style={{
                    width: animate
                      ? `${(segment.ms / totalMs) * 100}%`
                      : "0%",
                  }}
                >
                  <span className="text-[10px] font-mono font-bold text-slate-950 md:text-xs">
                    {segment.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {frameBudget.map((segment) => (
                <div key={segment.label} className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${segment.color}`}
                  />
                  <span className="text-xs text-slate-400">
                    {segment.label}:{" "}
                    <span className="font-mono text-slate-300">
                      {segment.ms}ms
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Se o JavaScript demorar mais de ~10ms, o frame e dropped e o
              utilizador sente jank.
            </p>
          </div>
        </div>

        {/* ─── Bundle Size por Componente ─── */}
        <div className="mb-24">
          <BlurText
            text="Bundle Size por Componente"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-white md:text-2xl"
          />

          {/* Category legend */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            {(Object.keys(categoryColors) as Category[]).map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${categoryColors[cat]}`}
                />
                <span className="text-xs text-slate-400">
                  {categoryLabels[cat]}
                </span>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl space-y-2">
            {bundleData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-right text-xs font-mono text-slate-400">
                  {entry.name}
                </span>
                <div className="flex-1">
                  <div
                    className={`${categoryColors[entry.category]} h-6 rounded-r-md transition-all duration-1000 ease-out`}
                    style={{
                      width: animate
                        ? `${(entry.size / maxSize) * 100}%`
                        : "0%",
                      opacity: 0.8,
                    }}
                  />
                </div>
                <span className="w-14 shrink-0 text-xs font-mono text-slate-500">
                  {entry.size.toFixed(1)}KB
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="mt-4 flex items-center gap-3 border-t border-slate-800 pt-4">
              <span className="w-40 shrink-0 text-right text-xs font-mono font-bold text-emerald-400">
                Total (gzipped)
              </span>
              <div className="flex-1">
                <div
                  className="h-6 rounded-r-md bg-emerald-500 transition-all duration-1000 ease-out"
                  style={{
                    width: animate ? "100%" : "0%",
                    opacity: 0.8,
                  }}
                />
              </div>
              <span className="w-14 shrink-0 text-xs font-mono font-bold text-emerald-400">
                {totalSize.toFixed(1)}KB
              </span>
            </div>
          </div>
        </div>

        {/* ─── Tecnicas de Optimizacao ─── */}
        <div className="mb-24">
          <BlurText
            text="Tecnicas de Optimizacao"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-white md:text-2xl"
          />

          <StaggerContainer
            className="grid gap-8 sm:grid-cols-2"
            staggerDelay={0.1}
          >
            {techniques.map((tech) => (
              <GlowCard
                key={tech.title}
                className="bg-slate-900/60 backdrop-blur-md"
                glowColor="rgba(59,130,246,0.12)"
                data-hover
              >
                <h4 className="mb-3 text-base font-bold text-white">
                  <code className="rounded bg-slate-800 px-2 py-1 text-sm font-mono text-emerald-400">
                    {tech.title}
                  </code>
                </h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  {tech.description}
                </p>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>

        {/* ─── Regras do Sistema ─── */}
        <div>
          <BlurText
            text="Regras do Sistema"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-white md:text-2xl"
          />

          <div className="mx-auto max-w-2xl space-y-3">
            {rules.map((rule) => (
              <div
                key={rule}
                className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  &lt;
                </span>
                <span className="text-sm font-medium text-slate-300">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
