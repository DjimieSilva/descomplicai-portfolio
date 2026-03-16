"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";

const atomicLevels = [
  {
    level: "Atomos",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    components: "Spotlight, DotGrid, GrainOverlay, AnimatedGradient",
    description: "Elementos base que nao funcionam sozinhos",
  },
  {
    level: "Moleculas",
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    components: "GlassCard+Spotlight, GlowCard, MagneticButton",
    description: "Combinacoes com funcionalidade propria",
  },
  {
    level: "Organismos",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    components: "Card com titulo animado, hero completo, secao interativa",
    description: "Padroes completos prontos para producao",
  },
];

const recipes = [
  {
    name: "Basico",
    description: "Apenas um GlassCard com conteudo",
    code: `<GlassCard>
  <p>Conteudo simples</p>
</GlassCard>`,
    render: "basic",
  },
  {
    name: "Com Spotlight",
    description: "GlassCard + Spotlight para tracking do cursor",
    code: `<GlassCard className="relative">
  <Spotlight size={200} />
  <p>Move o cursor sobre mim</p>
</GlassCard>`,
    render: "spotlight",
  },
  {
    name: "Com Glow",
    description: "GlowCard envolvendo GlassCard + Spotlight",
    code: `<GlowCard glowColor="rgba(59,130,246,0.3)">
  <GlassCard className="relative">
    <Spotlight size={200} />
    <p>Hover para ver o glow</p>
  </GlassCard>
</GlowCard>`,
    render: "glow",
  },
  {
    name: "Full Stack",
    description: "Todas as camadas compostas num unico componente",
    code: `<GlowCard glowColor="rgba(59,130,246,0.3)">
  <GlassCard className="relative">
    <Spotlight size={220} />
    <BlurText text="Titulo Animado" as="h3" />
    <TextScramble text="Subtitulo" />
    <MagneticButton>
      Acao Principal
    </MagneticButton>
  </GlassCard>
</GlowCard>`,
    render: "full",
  },
];

export function CompositionSection() {
  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Capitulo 10"
          title="Composicao"
          description="15 componentes simples. Infinitas combinacoes. O poder esta em como os juntas."
        />

        {/* Atomos → Moleculas → Organismos */}
        <div className="mb-24">
          <BlurText
            text="Atomos → Moleculas → Organismos"
            as="h3"
            className="text-2xl font-bold tracking-tight text-white mb-4"
          />
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            O Atomic Design de Brad Frost aplicado a este sistema. Cada nivel constroi
            sobre o anterior — nunca ao lado.
          </p>

          <StaggerContainer
            className="grid gap-6 md:grid-cols-3"
            staggerDelay={0.12}
          >
            {atomicLevels.map((item) => (
              <GlowCard
                key={item.level}
                glowColor="rgba(59,130,246,0.15)"
                className={`${item.bg} ${item.border}`}
                data-hover
              >
                <div className="space-y-4">
                  <h4 className={`text-xl font-bold ${item.color}`}>
                    {item.level}
                  </h4>
                  <p className="text-sm font-mono text-slate-300 leading-relaxed">
                    {item.components}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>

        {/* Receitas de Composicao */}
        <div className="mb-24">
          <BlurText
            text="Receitas de Composicao"
            as="h3"
            className="text-2xl font-bold tracking-tight text-white mb-4"
          />
          <p className="text-slate-400 leading-relaxed mb-10 max-w-3xl">
            Quatro niveis de complexidade. Cada receita adiciona uma camada ao anterior.
            Experimenta passar o cursor sobre cada exemplo.
          </p>

          <div className="space-y-12">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.name}
                className="grid gap-6 lg:grid-cols-2 items-start"
              >
                {/* Live preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-mono text-sm font-bold">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      {recipe.name}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {recipe.description}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6" data-hover>
                    {recipe.render === "basic" && (
                      <GlassCard
                        hover
                        className="!bg-slate-800/60 !border-slate-700/40"
                        style={{
                          background: "rgba(30,41,59,0.6)",
                          border: "1px solid rgba(51,65,85,0.4)",
                        }}
                      >
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Um card simples com blur de fundo e hover lift. A base de tudo.
                        </p>
                      </GlassCard>
                    )}

                    {recipe.render === "spotlight" && (
                      <GlassCard
                        hover
                        className="relative"
                        style={{
                          background: "rgba(30,41,59,0.6)",
                          border: "1px solid rgba(51,65,85,0.4)",
                        }}
                      >
                        <Spotlight size={200} />
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Move o cursor. O Spotlight segue-te com um gradiente suave
                          que responde a posicao do rato em tempo real.
                        </p>
                      </GlassCard>
                    )}

                    {recipe.render === "glow" && (
                      <GlowCard glowColor="rgba(59,130,246,0.3)" data-hover>
                        <GlassCard
                          hover={false}
                          className="relative"
                          style={{
                            background: "rgba(30,41,59,0.6)",
                            border: "1px solid rgba(51,65,85,0.4)",
                          }}
                        >
                          <Spotlight size={200} />
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Spotlight interno + glow externo. Duas camadas de feedback
                            visual que funcionam em conjunto sem interferir.
                          </p>
                        </GlassCard>
                      </GlowCard>
                    )}

                    {recipe.render === "full" && (
                      <GlowCard glowColor="rgba(59,130,246,0.3)" data-hover>
                        <GlassCard
                          hover={false}
                          className="relative space-y-4"
                          style={{
                            background: "rgba(30,41,59,0.6)",
                            border: "1px solid rgba(51,65,85,0.4)",
                          }}
                        >
                          <Spotlight size={220} />
                          <BlurText
                            text="Titulo Animado"
                            as="h3"
                            className="text-xl font-bold text-white"
                          />
                          <TextScramble
                            text="Subtitulo com efeito scramble"
                            as="p"
                            className="text-sm text-slate-400"
                          />
                          <div className="pt-2">
                            <MagneticButton
                              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
                              data-hover
                            >
                              Acao Principal
                            </MagneticButton>
                          </div>
                        </GlassCard>
                      </GlowCard>
                    )}
                  </div>
                </div>

                {/* Code block */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs font-mono text-slate-500">
                      receita-{index + 1}.tsx
                    </span>
                  </div>
                  <pre className="font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    <code>{recipe.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principio da Separacao */}
        <div>
          <BlurText
            text="Principio da Separacao"
            as="h3"
            className="text-2xl font-bold tracking-tight text-white mb-6"
          />

          <div className="max-w-3xl space-y-6">
            <GlowCard
              glowColor="rgba(59,130,246,0.15)"
              className="bg-slate-900/60 border-slate-800"
            >
              <p className="text-slate-300 leading-relaxed">
                Cada componente faz <strong className="text-white">UMA coisa</strong>.
                GlassCard cuida do blur e hover. Spotlight cuida do tracking.
                GlowCard cuida do glow. Quando os combinas, cada um mantem a sua
                responsabilidade.
              </p>
            </GlowCard>

            <GlowCard
              glowColor="rgba(168,85,247,0.15)"
              className="bg-slate-900/60 border-slate-800"
            >
              <p className="text-slate-300 leading-relaxed">
                Isto significa que podes usar Spotlight sem GlassCard, GlowCard sem
                Spotlight, ou todos juntos.{" "}
                <strong className="text-white">
                  Nenhum depende do outro.
                </strong>{" "}
                A independencia e o que torna a composicao possivel — e poderosa.
              </p>
            </GlowCard>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <p className="text-xs font-mono text-slate-500 mb-3">
                Analogia
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pensa em audio: um equalizador tem graves, medios e agudos. Cada
                controlo afeta uma frequencia. Podes ajustar qualquer um sem tocar nos
                outros. Os nossos componentes funcionam da mesma forma — camadas
                independentes que, juntas, criam a experiencia completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
