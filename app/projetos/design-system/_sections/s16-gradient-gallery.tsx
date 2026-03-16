"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { GlowCard } from "@/components/ui/glow-card";

const gradientThemes: {
  name: string;
  colors: [string, string, string];
  useCase: string;
}[] = [
  {
    name: "Ocean",
    colors: ["#3b82f6", "#8b5cf6", "#06b6d4"],
    useCase: "Profissional, tech, confianca",
  },
  {
    name: "Sunset",
    colors: ["#ef4444", "#f97316", "#eab308"],
    useCase: "Energia, urgencia, calor",
  },
  {
    name: "Forest",
    colors: ["#10b981", "#06b6d4", "#3b82f6"],
    useCase: "Natureza, crescimento, saude",
  },
  {
    name: "Aurora",
    colors: ["#ec4899", "#8b5cf6", "#3b82f6"],
    useCase: "Criatividade, luxo, magia",
  },
  {
    name: "Vulcao",
    colors: ["#f59e0b", "#ef4444", "#ec4899"],
    useCase: "Paixao, intensidade, fogo",
  },
  {
    name: "Nebula",
    colors: ["#6366f1", "#8b5cf6", "#a855f7"],
    useCase: "Misterio, profundidade, cosmos",
  },
  {
    name: "Arctic",
    colors: ["#06b6d4", "#3b82f6", "#6366f1"],
    useCase: "Frio, clareza, precisao",
  },
  {
    name: "Wine",
    colors: ["#881337", "#9f1239", "#be123c"],
    useCase: "Elegancia, maturidade, requinte",
  },
  {
    name: "Midnight",
    colors: ["#1e1b4b", "#312e81", "#4338ca"],
    useCase: "Nocturno, premium, exclusivo",
  },
];

const usageCode = `import { AnimatedGradient } from "@/components/ui/animated-gradient";

// Dentro de qualquer seccao com position relative:
<section className="relative overflow-hidden">
  <AnimatedGradient
    colors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
  />
  {/* O teu conteudo aqui */}
</section>

// Props disponiveis:
// colors — [string, string, string] — 3 cores hex
// className — classes CSS adicionais
// animate — boolean (default: true) — ligar/desligar animacao`;

export function GradientGallerySection() {
  return (
    <section className="relative bg-[#fafaf9] py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 15"
          title="Gradientes Animados"
          description="Tres gradientes radiais sobrepostos com animacao mesh-shift. A linguagem visual das seccoes."
        />

        {/* Como Funciona */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-4 text-center">
            Como Funciona
          </h3>
          <p className="text-slate-600 leading-relaxed text-center">
            AnimatedGradient cria 3 circulos com radial-gradient, cada um com
            50-70% de tamanho, posicionados aleatoriamente. A animacao mesh-shift
            move-os lentamente, criando um efeito organico. O resultado e um fundo
            vivo que respira — sem distrair do conteudo.
          </p>
        </div>

        {/* Gallery Grid */}
        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20"
          staggerDelay={0.08}
        >
          {gradientThemes.map((theme) => (
            <div
              key={theme.name}
              className="group relative h-48 rounded-2xl overflow-hidden border border-slate-200/60 bg-white"
              data-hover
            >
              <AnimatedGradient
                colors={theme.colors}
                className="!opacity-40"
              />

              <div className="relative z-10 flex flex-col justify-end h-full p-5">
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  {theme.name}
                </h4>
                <div className="flex items-center gap-1.5 mb-2">
                  {theme.colors.map((color, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 rounded-full border border-white/50"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="ml-1 text-[10px] font-mono text-slate-500">
                    {theme.colors.join(", ")}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {theme.useCase}
                </p>
              </div>
            </div>
          ))}
        </StaggerContainer>

        {/* Uso */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-6 text-center">
            Uso
          </h3>
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-mono text-slate-500">
                animated-gradient.tsx
              </span>
            </div>
            <pre className="font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
              <code>{usageCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
