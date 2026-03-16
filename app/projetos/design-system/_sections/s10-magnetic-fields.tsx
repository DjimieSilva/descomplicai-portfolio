"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { DotGrid } from "@/components/ui/dot-grid";

export function MagneticFieldsSection() {
  const [strength, setStrength] = useState(0.3);

  return (
    <section className="relative bg-slate-50 py-32 px-6 overflow-hidden">
      <DotGrid opacity={0.04} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 09"
          title="Campos Magneticos"
          description="Botoes que atraem o cursor reduzem o esforco cognitivo e motor. E ciencia, nao magia."
        />

        {/* ---------- Lei de Fitts ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Lei de Fitts
          </h3>

          <GlassCard className="mx-auto max-w-3xl text-center" hover={false}>
            <p className="font-mono text-3xl md:text-4xl tracking-wide">
              <span className="text-rose-600 font-bold">T</span>
              <span className="text-slate-800"> = </span>
              <span className="text-slate-500 font-bold">a</span>
              <span className="text-slate-800"> + </span>
              <span className="text-slate-500 font-bold">b</span>
              <span className="text-slate-800"> x </span>
              <span className="text-blue-600">log</span>
              <span className="text-blue-600 text-xl align-sub">2</span>
              <span className="text-slate-800">(</span>
              <span className="text-purple-600 font-bold">D</span>
              <span className="text-slate-800">/</span>
              <span className="text-emerald-600 font-bold">W</span>
              <span className="text-slate-800"> + 1)</span>
            </p>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-xl mx-auto">
              O tempo para atingir um alvo (
              <span className="font-bold text-rose-600">T</span>) depende da
              distancia (<span className="font-bold text-purple-600">D</span>) e
              do tamanho do alvo (
              <span className="font-bold text-emerald-600">W</span>). Botoes
              magneticos efectivamente aumentam{" "}
              <span className="font-bold text-emerald-600">W</span> — o alvo
              virtual e maior que o visual.
            </p>
          </GlassCard>

          {/* visual diagram */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {/* normal button */}
            <div className="text-center">
              <div className="flex items-center justify-center h-32">
                <div className="inline-flex items-center justify-center rounded-xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 border border-slate-300">
                  Botao Normal
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Area de clique = area visual
              </p>
            </div>

            {/* magnetic button */}
            <div className="text-center">
              <div className="relative flex items-center justify-center h-32">
                {/* attraction field indicator */}
                <div className="absolute w-40 h-40 rounded-full border-2 border-dashed border-blue-200 opacity-50" />
                <MagneticButton
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                  data-hover
                >
                  Botao Magnetico
                </MagneticButton>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Area de clique = area visual + campo de atracao (~40px)
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 max-w-lg mx-auto">
            O botao magnetico tem um campo de atracao de ~40px, efectivamente
            duplicando a area de clique.
          </p>
        </div>

        {/* ---------- Variantes ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Variantes
          </h3>

          <div className="mx-auto max-w-3xl space-y-10">
            {/* Row 1: Primarias */}
            <div>
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.15em] text-slate-400">
                Primarias
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                  data-hover
                >
                  Solid Blue
                </MagneticButton>

                <MagneticButton
                  className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white"
                  data-hover
                >
                  Gradient
                </MagneticButton>

                <MagneticButton
                  className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white"
                  data-hover
                >
                  Dark
                </MagneticButton>
              </div>
            </div>

            {/* Row 2: Outline */}
            <div>
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.15em] text-slate-400">
                Outline
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
                  data-hover
                >
                  Border Slate
                </MagneticButton>

                <MagneticButton
                  className="rounded-xl border border-blue-300 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                  data-hover
                >
                  Border Blue
                </MagneticButton>

                <MagneticButton
                  className="rounded-xl px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800"
                  data-hover
                >
                  Subtle
                  <span className="ml-2" aria-hidden="true">
                    &rarr;
                  </span>
                </MagneticButton>
              </div>
            </div>

            {/* Row 3: Especiais */}
            <div>
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.15em] text-slate-400">
                Especiais
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  className="flex items-center justify-center rounded-full w-14 h-14 bg-slate-900 text-white"
                  data-hover
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </MagneticButton>

                <MagneticButton
                  className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-white"
                  data-hover
                >
                  <span className="mr-2" aria-hidden="true">
                    &#9889;
                  </span>
                  Pill Button
                </MagneticButton>

                <MagneticButton
                  className="px-2 py-1 text-sm font-medium text-blue-600 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600"
                  data-hover
                >
                  Text link style
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Forca de Atracao ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Forca de Atracao
          </h3>

          <GlassCard className="mx-auto max-w-3xl" hover={false}>
            {/* slider */}
            <div className="mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  Strength
                </label>
                <span className="text-sm font-bold text-blue-600">
                  {strength.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={0.6}
                step={0.05}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full accent-blue-600"
                data-hover
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0.1 (subtil)</span>
                <span>0.6 (forte)</span>
              </div>
            </div>

            {/* demo buttons */}
            <div className="flex items-center justify-center gap-6">
              <MagneticButton
                strength={strength}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                data-hover
              >
                Botao A
              </MagneticButton>

              <MagneticButton
                strength={strength}
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
                data-hover
              >
                Botao B
              </MagneticButton>

              <MagneticButton
                strength={strength}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white"
                data-hover
              >
                Botao C
              </MagneticButton>
            </div>

            {/* code block */}
            <div className="mt-8 rounded-lg bg-slate-900 px-5 py-4 overflow-x-auto">
              <code className="text-sm font-mono text-slate-300">
                <span className="text-slate-500">{"<"}</span>
                <span className="text-blue-400">MagneticButton</span>
                <span className="text-cyan-400"> strength</span>
                <span className="text-slate-500">{"={"}</span>
                <span className="text-amber-400">{strength.toFixed(2)}</span>
                <span className="text-slate-500">{"}"}</span>
                <span className="text-slate-500">{">"}</span>
              </code>
            </div>
          </GlassCard>
        </div>

        {/* ---------- Acessibilidade ---------- */}
        <div>
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Acessibilidade
          </h3>

          <GlassCard
            className="mx-auto max-w-2xl border-l-4 border-l-blue-500"
            hover={false}
          >
            <Spotlight size={220} />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600"
                  aria-hidden="true"
                >
                  1
                </span>
                <p className="text-sm leading-relaxed text-slate-600">
                  Em dispositivos touch (
                  <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                    pointer: coarse
                  </code>
                  ), o efeito magnetico e automaticamente desactivado. O botao
                  funciona como um botao normal com{" "}
                  <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                    min-height
                  </code>{" "}
                  de 44px.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600"
                  aria-hidden="true"
                >
                  2
                </span>
                <p className="text-sm leading-relaxed text-slate-600">
                  Todos os botoes magneticos suportam navegacao por teclado e
                  focus ring visivel.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
