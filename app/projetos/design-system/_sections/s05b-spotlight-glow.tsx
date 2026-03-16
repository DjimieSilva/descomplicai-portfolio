"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { DotGrid } from "@/components/ui/dot-grid";
import { MagneticButton } from "@/components/ui/magnetic-button";

const howItWorksSteps = [
  {
    step: 1,
    title: "Captura do Cursor",
    description:
      "onMouseMove captura a posicao do cursor relativa ao card. Usamos getBoundingClientRect() para converter coordenadas da janela em coordenadas locais do elemento.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    step: 2,
    title: "Interpolacao Suave",
    description:
      "useSpring do Framer Motion interpola suavemente para a posicao target. Em vez de saltar instantaneamente, o gradiente desliza com fisica de mola — bounce: 0 para movimento limpo.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    step: 3,
    title: "Posicionamento do Gradiente",
    description:
      "Um radial-gradient e posicionado nas coordenadas interpoladas. useTransform converte os valores X/Y em strings CSS de left/top, centrando o gradiente no cursor.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    step: 4,
    title: "Blending Final",
    description:
      "mix-blend-mode e opacity criam o efeito subtil. O gradiente usa blur-xl para suavizar as bordas e transita de opacity 0 para 1 no hover — aparece e desaparece naturalmente.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const spotlightDemos = [
  {
    label: "Default (Blue)",
    colors: "from-blue-200 via-blue-300 to-blue-400",
    size: 200,
    description: "O gradiente padrao. Subtil, profissional, versatil.",
  },
  {
    label: "Purple",
    colors: "from-purple-200 via-purple-300 to-purple-400",
    size: 220,
    description: "Ideal para seccoes criativas ou acento visual.",
  },
  {
    label: "Emerald",
    colors: "from-emerald-200 via-emerald-300 to-emerald-400",
    size: 180,
    description: "Perfeito para estados de sucesso ou natureza.",
  },
];

const glowCards = [
  {
    color: "Blue",
    glow: "rgba(59,130,246,0.3)",
    hex: "#3B82F6",
    dot: "bg-blue-500",
    label: "Primario — confianca",
    useCase: "CTAs principais, links activos, elementos de navegacao primaria",
  },
  {
    color: "Purple",
    glow: "rgba(168,85,247,0.3)",
    hex: "#A855F7",
    dot: "bg-purple-500",
    label: "Acento — criatividade",
    useCase: "Destaques, badges premium, elementos de marca",
  },
  {
    color: "Cyan",
    glow: "rgba(6,182,212,0.3)",
    hex: "#06B6D4",
    dot: "bg-cyan-500",
    label: "Info — tecnologia",
    useCase: "Blocos de codigo, specs tecnicas, dados e metricas",
  },
  {
    color: "Emerald",
    glow: "rgba(16,185,129,0.3)",
    hex: "#10B981",
    dot: "bg-emerald-500",
    label: "Sucesso — crescimento",
    useCase: "Confirmacoes, resultados positivos, progressao",
  },
];

const spotlightProps = [
  {
    prop: "size",
    type: "number",
    default: "200",
    description: "Diametro do gradiente em px. Controla a area de iluminacao.",
  },
  {
    prop: "className",
    type: "string",
    default: "from-blue-200 via-blue-300 to-blue-400",
    description:
      "Classes Tailwind para as cores do gradiente. Usa from/via/to para definir o radial-gradient.",
  },
  {
    prop: "springOptions",
    type: "SpringOptions",
    default: "{ bounce: 0 }",
    description:
      "Configuracao da mola do Framer Motion. Controla suavidade e responsividade do tracking.",
  },
];

export function SpotlightGlowSection() {
  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "radial-gradient(ellipse at 30% 50%, #3b82f6, transparent 60%), radial-gradient(ellipse at 70% 80%, #8b5cf6, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 05"
          title="Spotlight & Glow"
          description="Efeitos que respondem ao cursor criam uma conexao directa entre o utilizador e a interface."
        />

        {/* Como Funciona o Spotlight */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
            Como Funciona o Spotlight
          </h3>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            Quatro passos transformam uma posicao de cursor num gradiente suave que
            segue o utilizador. Cada passo resolve um problema especifico.
          </p>

          <StaggerContainer
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {howItWorksSteps.map((step) => (
              <GlowCard
                key={step.step}
                glowColor="rgba(59,130,246,0.12)"
                className="bg-slate-900/60"
                data-hover
              >
                <div className="space-y-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${step.bg} ${step.color} font-mono text-sm font-bold`}>
                    {step.step}
                  </div>
                  <h4 className={`text-base font-semibold ${step.color}`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>

        {/* Spotlight Demo */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
            Spotlight Demo
          </h3>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            Move o cursor sobre cada card. O mesmo componente, tres personalidades
            diferentes — apenas mudando as classes de cor.
          </p>

          <StaggerContainer
            className="grid gap-6 md:grid-cols-3"
            staggerDelay={0.12}
          >
            {spotlightDemos.map((demo) => (
              <GlassCard
                key={demo.label}
                hover
                className="relative min-h-[280px] flex flex-col justify-between"
                style={{
                  background: "rgba(30,41,59,0.6)",
                  border: "1px solid rgba(51,65,85,0.4)",
                }}
                data-hover
              >
                <Spotlight size={demo.size} className={demo.colors} />

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">
                    {demo.label}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 space-y-2">
                  <code className="block text-xs font-mono text-slate-500">
                    className=&quot;{demo.colors}&quot;
                  </code>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600" />
                    size: {demo.size}px
                  </div>
                </div>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>

        {/* Glow Cards */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
            Glow Cards
          </h3>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            O GlowCard adiciona um brilho exterior no hover. A cor comunica intencao —
            cada variante tem um proposito semantico claro.
          </p>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {glowCards.map((card) => (
              <GlowCard
                key={card.color}
                glowColor={card.glow}
                className="bg-slate-900/60"
                data-hover
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded-full ${card.dot}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-white">
                      {card.color}
                    </span>
                  </div>

                  <code className="block text-xs font-mono text-slate-500">
                    {card.hex}
                  </code>

                  <p className="text-sm font-medium text-slate-300">
                    {card.label}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.useCase}
                  </p>
                </div>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>

        {/* Spotlight Props */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
            Spotlight Props
          </h3>
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            Referencia rapida das props configuraveis. Tres parametros, controlo total.
          </p>

          <div className="overflow-hidden rounded-2xl border border-slate-800">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-4 bg-slate-900/80 px-6 py-4 border-b border-slate-800">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Prop
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Tipo
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Default
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Descricao
              </span>
            </div>

            {/* Table rows */}
            {spotlightProps.map((row, index) => (
              <div
                key={row.prop}
                className={`grid grid-cols-4 gap-4 px-6 py-4 ${
                  index < spotlightProps.length - 1
                    ? "border-b border-slate-800/60"
                    : ""
                } hover:bg-slate-900/40 transition-colors`}
                data-hover
              >
                <code className="text-sm font-mono text-blue-400 font-medium">
                  {row.prop}
                </code>
                <code className="text-sm font-mono text-purple-400">
                  {row.type}
                </code>
                <code className="text-sm font-mono text-slate-500">
                  {row.default}
                </code>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {row.description}
                </p>
              </div>
            ))}
          </div>

          {/* Usage note */}
          <GlowCard
            glowColor="rgba(59,130,246,0.1)"
            className="mt-8 max-w-3xl bg-slate-900/40 border-l-4 border-l-blue-500/40"
            data-hover
          >
            <p className="text-sm text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Nota:</strong> O Spotlight deve ser
              colocado como filho directo de um elemento com{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs font-mono text-blue-400">
                position: relative
              </code>{" "}
              e{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs font-mono text-blue-400">
                overflow: hidden
              </code>
              . O GlassCard ja inclui estas propriedades por defeito — por isso a
              combinacao funciona sem configuracao extra.
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
