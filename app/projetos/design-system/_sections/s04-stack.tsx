"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { TextScramble } from "@/components/ui/text-scramble";
import { BlurText } from "@/components/ui/blur-text";

interface TechComparison {
  chosen: string;
  alternative: string;
  chosenPros: string[];
  alternativeCons: string[];
  verdict: string;
}

const comparisons: TechComparison[] = [
  {
    chosen: "GSAP",
    alternative: "CSS @keyframes",
    chosenPros: [
      "ScrollTrigger nativo",
      "Controlo de timeline",
      "60fps garantidos",
      "Fisica e easing custom",
    ],
    alternativeCons: [
      "Sem sincronizacao com scroll",
      "Easing limitado",
      "Sem orquestracao",
    ],
    verdict: "GSAP — controlo total sobre timing e scroll",
  },
  {
    chosen: "Lenis",
    alternative: "Native Scroll",
    chosenPros: [
      "Scroll suave como manteiga",
      "Momentum natural",
      "Sincroniza com GSAP",
      "Customizavel",
    ],
    alternativeCons: [
      "Jerky em alguns browsers",
      "Sem momentum",
      "Impossivel sincronizar com animacoes",
    ],
    verdict: "Lenis — suavidade cinematica",
  },
  {
    chosen: "Framer Motion",
    alternative: "React Spring",
    chosenPros: [
      "AnimatePresence",
      "Layout animations",
      "Suporte a gestos",
      "API declarativa simples",
    ],
    alternativeCons: [
      "Mais verboso",
      "Sem layout animations",
      "Curva de aprendizagem maior",
    ],
    verdict: "Framer Motion — API declarativa e AnimatePresence",
  },
  {
    chosen: "Tailwind CSS",
    alternative: "CSS Modules",
    chosenPros: [
      "Estilos co-localizados",
      "Design tokens nativos",
      "Responsive utilities",
      "Consistencia automatica",
    ],
    alternativeCons: [
      "Ficheiros separados",
      "Naming fatigue",
      "Sem design tokens",
    ],
    verdict: "Tailwind — velocidade e consistencia",
  },
];

const stackBadges = [
  { name: "GSAP", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Lenis", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { name: "Framer Motion", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
  { name: "Tailwind CSS", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
  { name: "Next.js 16", color: "bg-white/10 text-white border-white/20" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "Vercel", color: "bg-white/10 text-white border-white/20" },
];

export function StackSection() {
  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 02"
          title="A Stack"
          description="Cada tecnologia foi escolhida por uma razao. Aqui esta o raciocinio."
        />

        <StaggerContainer
          className="grid gap-8 lg:grid-cols-2"
          staggerDelay={0.12}
        >
          {comparisons.map((comp) => (
            <GlowCard
              key={comp.chosen}
              className="bg-slate-900/60 backdrop-blur-md"
              glowColor="rgba(59,130,246,0.12)"
              data-hover
            >
              {/* Header row */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-400">
                  {comp.chosen}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600">
                  vs
                </span>
                <span className="text-lg font-bold text-slate-500">
                  {comp.alternative}
                </span>
              </div>

              {/* Two columns */}
              <div className="grid grid-cols-2 gap-6">
                {/* Chosen — pros */}
                <div>
                  <span className="mb-3 block text-[11px] font-mono uppercase tracking-widest text-emerald-400/70">
                    Escolhido
                  </span>
                  <ul className="space-y-2">
                    {comp.chosenPros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <span className="mt-0.5 text-emerald-400">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternative — cons */}
                <div>
                  <span className="mb-3 block text-[11px] font-mono uppercase tracking-widest text-slate-500/70">
                    Alternativa
                  </span>
                  <ul className="space-y-2">
                    {comp.alternativeCons.map((con) => (
                      <li
                        key={con}
                        className="flex items-start gap-2 text-sm text-slate-500"
                      >
                        <span className="mt-0.5 text-slate-600">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verdict */}
              <div className="mt-6 rounded-lg bg-slate-800/50 px-4 py-3">
                <span className="mr-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Veredicto:
                </span>
                <TextScramble
                  text={comp.verdict}
                  className="text-sm font-semibold text-emerald-400"
                  speed={25}
                />
              </div>
            </GlowCard>
          ))}
        </StaggerContainer>

        {/* Stack Completa summary */}
        <div className="mt-20 text-center">
          <BlurText
            text="Stack Completa"
            animateBy="words"
            as="h3"
            className="mb-8 text-xl font-bold tracking-tight text-white md:text-2xl"
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {stackBadges.map((badge) => (
              <span
                key={badge.name}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${badge.color}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
