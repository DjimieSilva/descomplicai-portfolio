"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { GlowCard } from "@/components/ui/glow-card";
import { BlurText } from "@/components/ui/blur-text";
import { DotGrid } from "@/components/ui/dot-grid";

const pillars = [
  {
    icon: "⏸",
    name: "Reduced Motion",
    description:
      "Quando `prefers-reduced-motion: reduce` esta activo, TODAS as animacoes sao desactivadas. Lenis smooth scroll nao inicializa. GSAP parallax nao corre. Framer Motion duration vai a 0. O site funciona perfeitamente — apenas sem movimento.",
  },
  {
    icon: "👆",
    name: "Touch Targets",
    description:
      "Todos os botoes magneticos tem min-height de 44px (WCAG 2.5.5). Em mobile, o efeito magnetico e desactivado mas o tamanho do alvo mantem-se generoso.",
  },
  {
    icon: "👁",
    name: "Contraste",
    description:
      "Texto principal a #0f172a sobre fundo #fafaf9 = ratio 16.5:1 (AAA). Texto secundario a #64748b = ratio 4.8:1 (AA). Todos os textos passam WCAG AA minimo.",
  },
  {
    icon: "⌨️",
    name: "Keyboard Nav",
    description:
      "Todos os elementos interactivos sao focusaveis via Tab. Focus rings visiveis em todos os botoes e links. Nenhuma armadilha de focus — a navegacao e linear e previsivel.",
  },
];

const checklist = [
  "Reduced motion respeitado em todos os 15 componentes",
  "Touch targets >= 44px em mobile",
  "Contraste AA em todo o texto",
  "Focus rings visiveis",
  "Sem auto-play de animacoes disruptivas",
  "Scroll hijacking desactivado com reduced-motion",
  "Cursor follower apenas em hover:hover devices",
  "Parallax reduzido 50% em touch devices",
];

const codeSnippet = `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

export function AccessibilitySection() {
  return (
    <section className="relative bg-white py-32 px-6">
      <DotGrid opacity={0.04} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 11"
          title="Acessibilidade"
          description="Um design system que so funciona para alguns nao e um design system. E um problema."
        />

        {/* Os 4 Pilares */}
        <div className="mb-24">
          <BlurText
            text="Os 4 Pilares"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-slate-900 md:text-2xl"
          />

          <StaggerContainer
            className="grid gap-8 sm:grid-cols-2"
            staggerDelay={0.1}
          >
            {pillars.map((pillar) => (
              <GlassCard key={pillar.name} data-hover className="flex flex-col gap-4">
                <Spotlight size={180} />

                <span className="text-4xl" aria-hidden="true">
                  {pillar.icon}
                </span>

                <h4 className="text-lg font-bold text-slate-900">
                  {pillar.name}
                </h4>

                <p className="text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>

        {/* Media Query que Salva Vidas */}
        <div className="mb-24">
          <BlurText
            text="Media Query que Salva Vidas"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-slate-900 md:text-2xl"
          />

          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
            {/* Code header */}
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-xs font-mono text-slate-500">
                globals.css
              </span>
            </div>

            {/* Code body */}
            <pre className="overflow-x-auto p-6">
              <code className="text-sm font-mono leading-relaxed text-slate-300">
                {codeSnippet}
              </code>
            </pre>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-500">
            Esta unica media query e o safety net. Se um componente esquecer de
            verificar por si, esta regra global garante que nenhuma animacao
            corre.
          </p>
        </div>

        {/* Checklist de Acessibilidade */}
        <div className="mb-24">
          <BlurText
            text="Checklist de Acessibilidade"
            animateBy="words"
            as="h3"
            className="mb-10 text-center text-xl font-bold tracking-tight text-slate-900 md:text-2xl"
          />

          <div className="mx-auto max-w-2xl space-y-3">
            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 7.5L5.5 10.5L11.5 3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* O Custo de Ignorar */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200/60 bg-amber-50/50 px-8 py-10 text-center">
          <div className="mb-4 text-3xl" aria-hidden="true">
            ♿
          </div>
          <BlurText
            text="15% da populacao mundial tem alguma forma de deficiencia. Ignorar acessibilidade nao e apenas eticamente errado — e excluir 1.2 mil milhoes de pessoas."
            animateBy="words"
            as="p"
            className="text-lg font-semibold leading-relaxed text-slate-800 md:text-xl"
          />
        </div>
      </div>
    </section>
  );
}
