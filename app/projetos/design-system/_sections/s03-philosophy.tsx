"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { BlurText } from "@/components/ui/blur-text";
import { DotGrid } from "@/components/ui/dot-grid";

const principles = [
  {
    icon: "🧩",
    name: "Composicao sobre Heranca",
    explanation:
      "Componentes devem compor, nunca estender. Em vez de criar hierarquias rigidas com classes base, cada peca encaixa livremente noutra — como blocos LEGO. Isto permite combinacoes que nunca foram planeadas.",
    example: "<GlowCard><GlassCard><Spotlight/></GlassCard></GlowCard>",
  },
  {
    icon: "🪜",
    name: "Progressive Enhancement",
    explanation:
      "A experiencia base funciona sem JavaScript. Animacoes sao melhorias, nunca requisitos. Se o browser nao suporta, o conteudo continua acessivel e funcional. A forma segue a funcao.",
    example: "prefers-reduced-motion: reduce",
  },
  {
    icon: "🛡️",
    name: "Type Safety",
    explanation:
      "Zero `any`. Cada prop, cada tipo de retorno, cada callback — tipado. O TypeScript nao e burocracia, e documentacao viva. Erros sao apanhados antes do browser, nao pelo utilizador.",
    example: "as?: React.ElementType",
  },
  {
    icon: "⚡",
    name: "Performance Budget",
    explanation:
      "Cada componente tem menos de 5KB gzipped. Sem layout thrashing. Will-change declarado explicitamente. Performance nao e optimizacao — e uma restricao de design desde o primeiro commit.",
    example: "will-change: transform",
  },
  {
    icon: "🌫️",
    name: "Sensory Restraint",
    explanation:
      "Efeitos devem ser sentidos, nao notados. Grain a 1.2% de opacidade. Parallax a 0.3x. A elegancia esta na contencao — quando o utilizador percebe o efeito, ja e demasiado.",
    example: "opacity: 0.012",
  },
  {
    icon: "♿",
    name: "Accessibility First",
    explanation:
      "Nao e um pensamento posterior. Reduced motion, ARIA labels, focus rings, alvos de toque de 44px. Acessibilidade e a base — se nao funciona para todos, nao funciona de todo.",
    example: "min-height: 44px",
  },
];

export function PhilosophySection() {
  return (
    <section className="relative bg-[#fafaf9] py-32 px-6">
      <DotGrid opacity={0.04} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 01"
          title="Filosofia de Design"
          description="Antes do codigo, existem principios. Cada decisao neste sistema segue estas seis regras."
        />

        <StaggerContainer
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {principles.map((p) => (
            <GlassCard key={p.name} data-hover className="flex flex-col gap-4">
              <Spotlight size={180} />

              <span className="text-4xl" aria-hidden="true">
                {p.icon}
              </span>

              <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {p.explanation}
              </p>

              <div className="mt-auto rounded-lg bg-slate-50 px-4 py-3">
                <code className="text-xs font-mono text-slate-500">
                  {p.example}
                </code>
              </div>
            </GlassCard>
          ))}
        </StaggerContainer>

        {/* Quote */}
        <div className="mt-24 flex flex-col items-center text-center">
          <BlurText
            text="A verdadeira sofisticacao e a simplicidade."
            animateBy="words"
            as="p"
            className="text-2xl font-semibold tracking-tight text-slate-800 md:text-3xl lg:text-4xl"
          />
          <span className="mt-4 text-sm text-slate-400">
            — Leonardo da Vinci
          </span>
        </div>
      </div>
    </section>
  );
}
