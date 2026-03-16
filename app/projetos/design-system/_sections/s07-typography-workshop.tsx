"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DotGrid } from "@/components/ui/dot-grid";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { GlowCard } from "@/components/ui/glow-card";

export function TypographyWorkshopSection() {
  const [animMode, setAnimMode] = useState<"words" | "letters">("words");
  const [useGradient, setUseGradient] = useState(false);
  const [sampleText, setSampleText] = useState("Descomplicar e uma arte");

  const [scrambleSpeed, setScrambleSpeed] = useState(30);
  const [scrambleText, setScrambleText] = useState(
    "O futuro pertence a quem simplifica"
  );

  return (
    <section className="relative bg-slate-950 py-32 px-6">
      <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />
      <DotGrid opacity={0.03} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 06"
          title="Workshop de Tipografia"
          description="Texto estatico e texto morto. Estas animacoes dao vida, personalidade e ritmo ao conteudo."
        />

        {/* --- Psicologia da Animacao de Texto --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            Psicologia da Animacao de Texto
          </h3>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.12}
          >
            <GlowCard
              glowColor="rgba(59,130,246,0.2)"
              className="bg-slate-900/60"
              data-hover
            >
              <h4 className="mb-3 text-lg font-bold text-blue-400">Atencao</h4>
              <p className="text-sm leading-relaxed text-slate-400">
                BlurText forca o olho a seguir a revelacao. O blur cria
                misterio, a resolucao cria satisfacao.
              </p>
            </GlowCard>

            <GlowCard
              glowColor="rgba(139,92,246,0.2)"
              className="bg-slate-900/60"
              data-hover
            >
              <h4 className="mb-3 text-lg font-bold text-purple-400">
                Personalidade
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                TextScramble evoca tecnologia, hacking, decifrar. Da ao texto
                uma aura de inteligencia.
              </p>
            </GlowCard>

            <GlowCard
              glowColor="rgba(6,182,212,0.2)"
              className="bg-slate-900/60"
              data-hover
            >
              <h4 className="mb-3 text-lg font-bold text-cyan-400">Ritmo</h4>
              <p className="text-sm leading-relaxed text-slate-400">
                Stagger delays criam cadencia. Rapido demais e ninguem le. Lento
                demais e perde-se o interesse.
              </p>
            </GlowCard>
          </StaggerContainer>
        </div>

        {/* --- BlurText Playground --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            BlurText Playground
          </h3>

          <GlassCard className="bg-slate-900/40 border-white/5" data-hover>
            <Spotlight size={240} />

            {/* Controls */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex overflow-hidden rounded-lg border border-white/10">
                <button
                  onClick={() => setAnimMode("words")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    animMode === "words"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                  data-hover
                >
                  Palavras
                </button>
                <button
                  onClick={() => setAnimMode("letters")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    animMode === "letters"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                  data-hover
                >
                  Letras
                </button>
              </div>

              <button
                onClick={() => setUseGradient((g) => !g)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  useGradient
                    ? "border-purple-500 bg-purple-600/20 text-purple-300"
                    : "border-white/10 bg-slate-800 text-slate-400 hover:text-white"
                }`}
                data-hover
              >
                Gradiente
              </button>

              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="flex-1 min-w-[200px] rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
                placeholder="Escreve o teu texto..."
              />
            </div>

            {/* Live Preview */}
            <div className="mb-8 flex min-h-[120px] items-center justify-center rounded-2xl border border-white/5 bg-slate-950/60 p-8">
              <BlurText
                key={`${sampleText}-${animMode}-${useGradient}`}
                text={sampleText}
                animateBy={animMode}
                gradient={useGradient}
                once={false}
                as="h2"
                className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
              />
            </div>

            {/* Code Block */}
            <div className="rounded-xl bg-slate-950 border border-white/5 p-5 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300">
                <code>{`<BlurText
  text="${sampleText}"
  animateBy="${animMode}"
  gradient={${useGradient}}
  once={false}
  as="h2"
  className="text-4xl font-bold"
/>`}</code>
              </pre>
            </div>
          </GlassCard>
        </div>

        {/* --- TextScramble Playground --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            TextScramble Playground
          </h3>

          <GlassCard className="bg-slate-900/40 border-white/5" data-hover>
            <Spotlight size={240} />

            {/* Controls */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-400">Velocidade</label>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={scrambleSpeed}
                  onChange={(e) => setScrambleSpeed(Number(e.target.value))}
                  className="w-32 accent-cyan-500"
                  data-hover
                />
                <span className="text-sm font-mono text-cyan-400">
                  {scrambleSpeed}ms
                </span>
              </div>

              <input
                type="text"
                value={scrambleText}
                onChange={(e) => setScrambleText(e.target.value)}
                className="flex-1 min-w-[200px] rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                placeholder="Escreve o teu texto..."
              />
            </div>

            {/* Live Preview */}
            <div className="mb-8 flex min-h-[120px] items-center justify-center rounded-2xl border border-white/5 bg-slate-950/60 p-8">
              <TextScramble
                key={`${scrambleText}-${scrambleSpeed}`}
                text={scrambleText}
                speed={scrambleSpeed}
                once={false}
                as="h2"
                className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
              />
            </div>

            {/* Code Block */}
            <div className="rounded-xl bg-slate-950 border border-white/5 p-5 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300">
                <code>{`<TextScramble
  text="${scrambleText}"
  speed={${scrambleSpeed}}
  once={false}
  as="h2"
  className="text-4xl font-bold"
/>`}</code>
              </pre>
            </div>
          </GlassCard>
        </div>

        {/* --- Quando Usar Cada Um --- */}
        <div>
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            Quando Usar Cada Um
          </h3>

          <StaggerContainer
            className="grid gap-4 sm:grid-cols-3"
            staggerDelay={0.1}
          >
            <GlowCard
              glowColor="rgba(59,130,246,0.15)"
              className="bg-slate-900/60"
              data-hover
            >
              <div className="mb-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1">
                <span className="text-xs font-semibold text-blue-400">
                  BlurText
                </span>
              </div>
              <p className="mb-2 text-sm font-medium text-white/90">
                Heroes, titulos de seccao, frases de impacto
              </p>
              <p className="text-xs text-slate-500">Elegante, cinematico</p>
            </GlowCard>

            <GlowCard
              glowColor="rgba(6,182,212,0.15)"
              className="bg-slate-900/60"
              data-hover
            >
              <div className="mb-3 inline-flex rounded-full bg-cyan-500/10 px-3 py-1">
                <span className="text-xs font-semibold text-cyan-400">
                  TextScramble
                </span>
              </div>
              <p className="mb-2 text-sm font-medium text-white/90">
                Subtitulos, valores numericos, tech vibes
              </p>
              <p className="text-xs text-slate-500">Dinamico, futurista</p>
            </GlowCard>

            <GlowCard
              glowColor="rgba(139,92,246,0.15)"
              className="bg-slate-900/60"
              data-hover
            >
              <div className="mb-3 inline-flex rounded-full bg-purple-500/10 px-3 py-1">
                <span className="text-xs font-semibold text-purple-400">
                  Ambos
                </span>
              </div>
              <p className="mb-2 text-sm font-medium text-white/90">
                Landing pages, portfolios, dashboards
              </p>
              <p className="text-xs text-slate-500">Versatil</p>
            </GlowCard>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
