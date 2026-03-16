"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { DotGrid } from "@/components/ui/dot-grid";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { BlurText } from "@/components/ui/blur-text";

const speedLevels = [
  {
    speed: "0.08x",
    label: "Background",
    description: "Quase estatico, ancora visual",
    glow: "rgba(100,116,139,0.2)",
    color: "text-slate-400",
    badge: "bg-slate-500/10",
  },
  {
    speed: "0.15x",
    label: "Decorativo",
    description: "Movimento lento, atmosferico",
    glow: "rgba(59,130,246,0.2)",
    color: "text-blue-400",
    badge: "bg-blue-500/10",
  },
  {
    speed: "0.25x",
    label: "Medio",
    description: "Equilibrio entre fundo e frente",
    glow: "rgba(139,92,246,0.2)",
    color: "text-purple-400",
    badge: "bg-purple-500/10",
  },
  {
    speed: "0.4x",
    label: "Conteudo",
    description: "Movimento notavel, chama atencao",
    glow: "rgba(6,182,212,0.2)",
    color: "text-cyan-400",
    badge: "bg-cyan-500/10",
  },
  {
    speed: "0.55x",
    label: "Primeiro Plano",
    description: "Rapido, destaque maximo",
    glow: "rgba(16,185,129,0.2)",
    color: "text-emerald-400",
    badge: "bg-emerald-500/10",
  },
];

export function ParallaxMasterclassSection() {
  return (
    <section className="relative bg-slate-950 py-32 px-6">
      <AnimatedGradient colors={["#8b5cf6", "#3b82f6", "#06b6d4"]} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 07"
          title="Parallax & Profundidade"
          description="O cerebro interpreta objectos que se movem mais devagar como mais distantes. Exploramos esse principio."
        />

        {/* --- A Ciencia --- */}
        <div className="mb-24 mx-auto max-w-3xl space-y-6">
          <h3 className="mb-6 text-center text-xl font-semibold text-white/80">
            A Ciencia
          </h3>
          <p className="text-base leading-relaxed text-slate-400">
            Parallax vem do grego &lsquo;parallaxis&rsquo; — mudanca de
            posicao. Na natureza, objectos distantes parecem mover-se mais
            devagar que objectos proximos quando nos movemos.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            No web design, simulamos isto dando velocidades de scroll diferentes
            a camadas de conteudo. Camadas lentas = fundo. Camadas rapidas =
            primeiro plano.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            O nosso ParallaxSection usa GSAP ScrollTrigger com{" "}
            <code className="rounded bg-slate-800 px-2 py-0.5 text-sm font-mono text-cyan-400">
              scrub: 0.5
            </code>{" "}
            para interpolar suavemente entre posicoes.
          </p>
        </div>

        {/* --- 5 Camadas em Accao --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            5 Camadas em Accao
          </h3>

          <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Layer 1 — speed 0.08: Background DotGrid */}
            <ParallaxSection speed={0.08} className="absolute inset-0">
              <DotGrid opacity={0.06} color="#3b82f6" />
            </ParallaxSection>

            {/* Layer 2 — speed 0.15: Floating circle outlines */}
            <ParallaxSection speed={0.15} className="absolute inset-0">
              <div className="relative h-full w-full">
                <div
                  className="absolute left-[10%] top-[15%] h-48 w-48 rounded-full border-2 border-blue-500/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute right-[15%] top-[30%] h-32 w-32 rounded-full border-2 border-purple-500/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute left-[40%] bottom-[20%] h-56 w-56 rounded-full border border-cyan-500/15"
                  aria-hidden="true"
                />
                <div
                  className="absolute right-[30%] bottom-[35%] h-24 w-24 rounded-full border-2 border-emerald-500/20"
                  aria-hidden="true"
                />
              </div>
            </ParallaxSection>

            {/* Layer 3 — speed 0.25: Small colored squares */}
            <ParallaxSection speed={0.25} className="absolute inset-0">
              <div className="relative h-full w-full rotate-12">
                <div className="absolute left-[20%] top-[25%] grid grid-cols-4 gap-3">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-sm"
                      style={{
                        backgroundColor:
                          i % 4 === 0
                            ? "rgba(59,130,246,0.15)"
                            : i % 4 === 1
                              ? "rgba(139,92,246,0.12)"
                              : i % 4 === 2
                                ? "rgba(6,182,212,0.12)"
                                : "rgba(16,185,129,0.1)",
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="absolute right-[15%] bottom-[30%] grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{
                        backgroundColor:
                          i % 3 === 0
                            ? "rgba(59,130,246,0.12)"
                            : i % 3 === 1
                              ? "rgba(139,92,246,0.1)"
                              : "rgba(6,182,212,0.1)",
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </ParallaxSection>

            {/* Layer 4 — speed 0.4: Giant transparent text */}
            <ParallaxSection speed={0.4} className="absolute inset-0">
              <div className="flex h-full items-center justify-center">
                <span
                  className="select-none text-[10rem] font-black leading-none text-white/[0.03]"
                  aria-hidden="true"
                >
                  DEPTH
                </span>
              </div>
            </ParallaxSection>

            {/* Layer 5 — speed 0.55: Foreground info card */}
            <ParallaxSection
              speed={0.55}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="mx-4 max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md">
                <h4 className="mb-3 text-lg font-bold text-white">
                  5 Velocidades, 1 Composicao
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                  Cada camada move-se a uma velocidade diferente, criando a
                  ilusao de profundidade. Faz scroll para observar o efeito.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: "0.08x", c: "bg-slate-700 text-slate-300" },
                    { v: "0.15x", c: "bg-blue-900/50 text-blue-300" },
                    { v: "0.25x", c: "bg-purple-900/50 text-purple-300" },
                    { v: "0.4x", c: "bg-cyan-900/50 text-cyan-300" },
                    { v: "0.55x", c: "bg-emerald-900/50 text-emerald-300" },
                  ].map((badge) => (
                    <span
                      key={badge.v}
                      className={`rounded-full px-3 py-1 text-xs font-mono font-medium ${badge.c}`}
                    >
                      {badge.v}
                    </span>
                  ))}
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>

        {/* --- Velocidade vs Percepcao --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            Velocidade vs Percepcao
          </h3>

          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            staggerDelay={0.08}
          >
            {speedLevels.map((level) => (
              <GlowCard
                key={level.speed}
                glowColor={level.glow}
                className="bg-slate-900/60 text-center"
                data-hover
              >
                <div
                  className={`mb-3 inline-flex rounded-full px-3 py-1 ${level.badge}`}
                >
                  <span
                    className={`text-xs font-mono font-semibold ${level.color}`}
                  >
                    {level.speed}
                  </span>
                </div>
                <h4 className="mb-2 text-sm font-bold text-white/90">
                  {level.label}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  {level.description}
                </p>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>

        {/* --- Codigo --- */}
        <div className="mb-24">
          <h3 className="mb-8 text-center text-xl font-semibold text-white/80">
            Codigo
          </h3>

          <div className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-slate-900/60 p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-slate-300">
              <code>{`<ParallaxSection speed={0.3}>
  {/* Conteudo move a 30% da velocidade do scroll */}
  <Card>...</Card>
</ParallaxSection>`}</code>
            </pre>
          </div>
        </div>

        {/* --- Dica de Performance --- */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-amber-400 text-lg" aria-hidden="true">
                !
              </span>
              <h4 className="text-sm font-bold text-amber-300">
                Dica de Performance
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Em dispositivos touch, o parallax e automaticamente reduzido a 50%
              para evitar jank. Use{" "}
              <code className="rounded bg-slate-800 px-2 py-0.5 text-xs font-mono text-amber-300">
                (pointer: coarse)
              </code>{" "}
              media query para detectar dispositivos touch e ajustar a
              experiencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
