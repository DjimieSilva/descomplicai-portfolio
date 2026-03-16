"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";

const directions = [
  { dir: "up" as const, label: "Up" },
  { dir: "down" as const, label: "Down" },
  { dir: "left" as const, label: "Left" },
  { dir: "right" as const, label: "Right" },
];

const staggerItems = ["Alpha", "Beta", "Gamma", "Delta"];

const directionGuide = [
  {
    dir: "up",
    description:
      "Default. Conteudo que sobe ao aparecer. O mais natural.",
  },
  {
    dir: "down",
    description:
      "Dropdowns, notificacoes, elementos que descem.",
  },
  {
    dir: "left",
    description:
      "Sidebars, menus laterais, conteudo que entra da esquerda.",
  },
  {
    dir: "right",
    description: "Timelines, listas de progresso.",
  },
];

export function StaggerBeforeAfterSection() {
  return (
    <section className="bg-white border-y border-slate-100 py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Part A: Stagger Container */}
        <SectionHeading
          label="Capitulo 16"
          title="Stagger & Coreografia"
          description="A ordem e direcao de entrada dos elementos criam ritmo visual. Quatro direcoes, timing configuravel."
        />

        {/* 4 direction columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {directions.map(({ dir, label }) => (
            <div key={dir}>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 font-mono text-xs font-bold">
                  {dir[0].toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {label}
                </span>
              </div>

              <StaggerContainer
                className="space-y-3"
                direction={dir}
                staggerDelay={0.12}
                once={false}
              >
                {staggerItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                    data-hover
                  >
                    {item}
                  </div>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>

        {/* Quando Usar */}
        <div className="mb-28 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-6 text-center">
            Quando Usar
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {directionGuide.map((item) => (
              <div
                key={item.dir}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
              >
                <span className="inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-mono font-bold text-blue-600 mb-2">
                  {item.dir}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: Before / After */}
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-4">
            Antes & Depois
          </h3>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
            O mesmo conteudo com e sem Design System. A diferenca esta nos
            detalhes — feedback visual, animacao, interacao.
          </p>

          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            {/* Without DS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold">
                  Sem Design System
                </span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Titulo do Card
                </h4>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Um card basico sem efeitos visuais. Sem feedback ao hover, sem
                  spotlight, sem glow. Funcional mas sem personalidade.
                </p>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
                  Botao Simples
                </button>
              </div>
            </div>

            {/* With DS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
                  Com Design System
                </span>
              </div>
              <GlassCard hover className="relative space-y-4" data-hover>
                <Spotlight size={200} />
                <BlurText
                  text="Titulo do Card"
                  as="h3"
                  className="text-lg font-semibold text-slate-900"
                  once={false}
                />
                <p className="text-sm text-slate-500 leading-relaxed">
                  GlassCard com blur de fundo, Spotlight que segue o cursor, titulo
                  com BlurText animado e MagneticButton interativo. Cada camada
                  adiciona personalidade.
                </p>
                <div>
                  <MagneticButton
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                    data-hover
                  >
                    Botao Magnetico
                  </MagneticButton>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Second row: Text animations */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Without DS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold">
                  Sem Design System
                </span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-xl font-bold text-slate-900 mb-1">
                  Bem-vindo ao Projecto
                </h4>
                <p className="text-sm text-slate-500">
                  Subtitulo estatico sem qualquer animacao ou efeito de entrada.
                </p>
              </div>
            </div>

            {/* With DS */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
                  Com Design System
                </span>
              </div>
              <div
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                data-hover
              >
                <BlurText
                  text="Bem-vindo ao Projecto"
                  as="h3"
                  className="text-xl font-bold text-slate-900 mb-1"
                  once={false}
                />
                <TextScramble
                  text="Subtitulo com efeito scramble que revela caracter a caracter"
                  as="p"
                  className="text-sm text-slate-500"
                  once={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
