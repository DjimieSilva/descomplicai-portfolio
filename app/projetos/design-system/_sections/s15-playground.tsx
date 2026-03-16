"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { StaggerContainer } from "@/components/ui/stagger-container";

const colorPresets = [
  { name: "Blue", value: "rgba(59,130,246,0.35)" },
  { name: "Purple", value: "rgba(139,92,246,0.35)" },
  { name: "Cyan", value: "rgba(6,182,212,0.35)" },
  { name: "Red", value: "rgba(239,68,68,0.35)" },
  { name: "Emerald", value: "rgba(16,185,129,0.35)" },
  { name: "Amber", value: "rgba(245,158,11,0.35)" },
];

const colorClasses: Record<string, string> = {
  "rgba(59,130,246,0.35)": "bg-blue-500",
  "rgba(139,92,246,0.35)": "bg-purple-500",
  "rgba(6,182,212,0.35)": "bg-cyan-500",
  "rgba(239,68,68,0.35)": "bg-red-500",
  "rgba(16,185,129,0.35)": "bg-emerald-500",
  "rgba(245,158,11,0.35)": "bg-amber-500",
};

const defaults = {
  glowColor: "rgba(59,130,246,0.35)",
  blurAmount: 20,
  showSpotlight: true,
  showGlow: true,
  titleText: "Card Titulo",
  titleMode: "blur" as "blur" | "scramble" | "static",
  spotlightSize: 220,
};

export function PlaygroundSection() {
  const [glowColor, setGlowColor] = useState(defaults.glowColor);
  const [blurAmount, setBlurAmount] = useState(defaults.blurAmount);
  const [showSpotlight, setShowSpotlight] = useState(defaults.showSpotlight);
  const [showGlow, setShowGlow] = useState(defaults.showGlow);
  const [titleText, setTitleText] = useState(defaults.titleText);
  const [titleMode, setTitleMode] = useState<"blur" | "scramble" | "static">(
    defaults.titleMode
  );
  const [spotlightSize, setSpotlightSize] = useState(defaults.spotlightSize);

  function resetAll() {
    setGlowColor(defaults.glowColor);
    setBlurAmount(defaults.blurAmount);
    setShowSpotlight(defaults.showSpotlight);
    setShowGlow(defaults.showGlow);
    setTitleText(defaults.titleText);
    setTitleMode(defaults.titleMode);
    setSpotlightSize(defaults.spotlightSize);
  }

  function generateCode() {
    const lines: string[] = [];
    if (showGlow) {
      lines.push(`<GlowCard glowColor="${glowColor}">`);
    }
    lines.push(
      `  <GlassCard blur={${blurAmount}} className="relative space-y-4">`
    );
    if (showSpotlight) {
      lines.push(`    <Spotlight size={${spotlightSize}} />`);
    }
    if (titleMode === "blur") {
      lines.push(`    <BlurText text="${titleText}" as="h3" once={false} />`);
    } else if (titleMode === "scramble") {
      lines.push(
        `    <TextScramble text="${titleText}" as="h3" once={false} />`
      );
    } else {
      lines.push(`    <h3>${titleText}</h3>`);
    }
    lines.push(`    <p>Conteudo do card aqui.</p>`);
    lines.push(`    <MagneticButton>Acao</MagneticButton>`);
    lines.push(`  </GlassCard>`);
    if (showGlow) {
      lines.push(`</GlowCard>`);
    }
    return lines.join("\n");
  }

  const previewCard = (
    <GlassCard
      hover={false}
      blur={blurAmount}
      className="relative space-y-4 min-h-[300px]"
      style={{
        background: "rgba(30,41,59,0.6)",
        border: "1px solid rgba(51,65,85,0.4)",
      }}
    >
      {showSpotlight && <Spotlight size={spotlightSize} />}

      {titleMode === "blur" && (
        <BlurText
          text={titleText}
          as="h3"
          once={false}
          className="text-2xl font-bold text-white"
        />
      )}
      {titleMode === "scramble" && (
        <TextScramble
          text={titleText}
          as="h3"
          once={false}
          className="text-2xl font-bold text-white"
        />
      )}
      {titleMode === "static" && (
        <h3 className="text-2xl font-bold text-white">{titleText}</h3>
      )}

      <p className="text-sm text-slate-400 leading-relaxed">
        Este e um paragrafo de exemplo dentro do card. Experimenta alterar os
        controlos a esquerda para ver como cada componente afeta o resultado
        final. O Design System e modular — cada camada e independente.
      </p>

      <div className="pt-2">
        <MagneticButton
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          data-hover
        >
          Acao
        </MagneticButton>
      </div>
    </GlassCard>
  );

  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 14"
          title="Playground"
          description="Monte o seu card perfeito. Combine componentes, ajuste parametros e copie o codigo."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls — left 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-6">
              {/* Cor do Glow */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 block">
                  Cor do Glow
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setGlowColor(c.value)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        glowColor === c.value
                          ? "bg-slate-700 text-white ring-1 ring-slate-500"
                          : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                      }`}
                      data-hover
                    >
                      <span
                        className={`h-3 w-3 rounded-full ${colorClasses[c.value]}`}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backdrop Blur */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 block">
                  Backdrop Blur — {blurAmount}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full accent-blue-500"
                  data-hover
                />
              </div>

              {/* Spotlight */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 block">
                  Spotlight
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => setShowSpotlight(!showSpotlight)}
                    className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                      showSpotlight
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                    data-hover
                  >
                    {showSpotlight ? "ON" : "OFF"}
                  </button>
                </div>
                {showSpotlight && (
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Tamanho: {spotlightSize}px
                    </span>
                    <input
                      type="range"
                      min={100}
                      max={400}
                      value={spotlightSize}
                      onChange={(e) => setSpotlightSize(Number(e.target.value))}
                      className="w-full accent-blue-500"
                      data-hover
                    />
                  </div>
                )}
              </div>

              {/* Glow */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 block">
                  Glow
                </label>
                <button
                  onClick={() => setShowGlow(!showGlow)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                    showGlow
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                  data-hover
                >
                  {showGlow ? "ON" : "OFF"}
                </button>
              </div>

              {/* Titulo */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 block">
                  Titulo
                </label>
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
                  data-hover
                />
                <div className="flex gap-1.5">
                  {(["blur", "scramble", "static"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTitleMode(mode)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                        titleMode === mode
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                      data-hover
                    >
                      {mode === "blur"
                        ? "Blur"
                        : mode === "scramble"
                        ? "Scramble"
                        : "Static"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="pt-2 border-t border-slate-800">
                <MagneticButton
                  onClick={resetAll}
                  className="rounded-xl bg-slate-700 px-5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-600 transition-colors w-full"
                  data-hover
                >
                  Reset
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Preview + Code — right 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Preview */}
            <div
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              data-hover
            >
              <p className="text-xs font-mono uppercase text-slate-500 mb-4 tracking-wider">
                Preview
              </p>
              {showGlow ? (
                <GlowCard glowColor={glowColor} data-hover>
                  {previewCard}
                </GlowCard>
              ) : (
                previewCard
              )}
            </div>

            {/* Code Output */}
            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] font-mono text-slate-500">
                  playground-output.tsx
                </span>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
                <code>{generateCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
