"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { DotGrid } from "@/components/ui/dot-grid";
import { BlurText } from "@/components/ui/blur-text";

const configOptions = [
  {
    prop: "duration: 1.2",
    desc: "Tempo de interpolacao em segundos. Quanto maior, mais suave (e mais lento) o scroll parece.",
  },
  {
    prop: "smoothWheel: true",
    desc: "Suavizar eventos de roda do rato. Sem isto, o Lenis so afeta touch/trackpad.",
  },
  {
    prop: "touchMultiplier: 1.5",
    desc: "Multiplicador de velocidade em dispositivos touch. Controla a sensibilidade do dedo.",
  },
  {
    prop: 'easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))',
    desc: "Curva exponencial para naturalidade. Desacelera progressivamente como objetos reais.",
  },
];

export function SmoothScrollSection() {
  return (
    <section className="relative bg-white py-32 px-6 overflow-hidden">
      <DotGrid opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 03"
          title="Smooth Scroll"
          description="Como o Lenis transforma uma scroll nativa num cinema a 60fps."
        />

        {/* O Problema */}
        <div className="mb-20">
          <BlurText
            text="O Problema"
            as="h3"
            className="text-2xl font-bold tracking-tight text-slate-900 mb-6"
          />

          <GlassCard className="max-w-4xl" hover={false}>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                A scroll nativa do browser parece funcionar bem — ate precisarmos de
                controlo real. Na verdade, esconde varios problemas:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <span>
                    <strong className="text-slate-800">Frame-synced ao browser paint</strong> — a
                    posicao do scroll esta atrelada ao ciclo de rendering do browser,
                    que pode variar entre 30fps e 144fps dependendo do dispositivo.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <span>
                    <strong className="text-slate-800">Comportamento inconsistente</strong> — Chrome,
                    Safari e Firefox implementam smooth scrolling de formas diferentes.
                    O mesmo site sente-se diferente em cada browser.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <span>
                    <strong className="text-slate-800">Sem momentum no desktop</strong> — no
                    telemovel temos scroll inercial natural, mas no desktop com rato a
                    scroll para imediatamente quando largamos a roda.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <span>
                    <strong className="text-slate-800">GSAP ScrollTrigger depende da scroll nativa</strong> —
                    o ScrollTrigger escuta eventos nativos de scroll, o que significa que
                    animacoes baseadas em scroll herdam todas estas inconsistencias.
                  </span>
                </li>
              </ul>
              <p className="text-slate-500 text-sm italic mt-4">
                Resultado: animacoes que parecem suaves no MacBook do designer, mas
                tremem no PC do cliente.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* A Solucao */}
        <div className="mb-20">
          <BlurText
            text="A Solucao"
            as="h3"
            className="text-2xl font-bold tracking-tight text-slate-900 mb-8"
          />

          <StaggerContainer
            className="grid gap-6 md:grid-cols-3"
            staggerDelay={0.12}
          >
            {/* Card 1 */}
            <GlassCard className="relative">
              <Spotlight size={180} />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-lg">
                1
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">
                Lenis Hijack
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                O Lenis interceta os eventos de <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-blue-600">wheel</code> e{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-blue-600">touch</code> do
                browser e calcula uma posicao de scroll interpolada com easing
                personalizado. Em vez de saltar de posicao em posicao, o scroll desliza
                suavemente entre valores.
              </p>
            </GlassCard>

            {/* Card 2 */}
            <GlassCard className="relative">
              <Spotlight size={180} />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 font-bold text-lg">
                2
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">
                GSAP Sync
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                A linha{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-violet-600">
                  lenis.on(&quot;scroll&quot;, ScrollTrigger.update)
                </code>{" "}
                conecta os eventos de scroll do Lenis ao sistema ScrollTrigger do GSAP.
                Cada vez que o Lenis calcula uma nova posicao, o ScrollTrigger
                atualiza as suas animacoes.
              </p>
            </GlassCard>

            {/* Card 3 */}
            <GlassCard className="relative">
              <Spotlight size={180} />
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 font-bold text-lg">
                3
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">
                RAF Loop
              </h4>
              <p className="text-sm leading-relaxed text-slate-600">
                A linha{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-cyan-600">
                  gsap.ticker.add((time) =&gt; lenis.raf(time * 1000))
                </code>{" "}
                sincroniza ambos os sistemas no mesmo loop de{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-cyan-600">
                  requestAnimationFrame
                </code>
                . Zero desync, zero jank.
              </p>
            </GlassCard>
          </StaggerContainer>
        </div>

        {/* Codigo Real */}
        <div className="mb-20">
          <BlurText
            text="Codigo Real"
            as="h3"
            className="text-2xl font-bold tracking-tight text-slate-900 mb-6"
          />

          <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Estas 4 linhas sao tudo o que precisamos para ligar o Lenis ao GSAP.
            Parece simples — e e. Mas cada linha resolve um problema especifico:
          </p>

          <div className="max-w-3xl rounded-2xl bg-slate-900 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-mono text-slate-500">
                smooth-scroll.ts
              </span>
            </div>

            <pre className="font-mono text-sm leading-loose overflow-x-auto">
              <code>
                <span className="text-slate-500">{"// 1. Criar instancia com easing suave"}</span>
                {"\n"}
                <span className="text-blue-400">const</span>{" "}
                <span className="text-cyan-300">lenis</span>{" "}
                <span className="text-slate-400">=</span>{" "}
                <span className="text-blue-400">new</span>{" "}
                <span className="text-yellow-300">Lenis</span>
                <span className="text-slate-400">{"({ "}</span>
                <span className="text-purple-300">duration</span>
                <span className="text-slate-400">: </span>
                <span className="text-orange-300">1.2</span>
                <span className="text-slate-400">, </span>
                <span className="text-purple-300">smoothWheel</span>
                <span className="text-slate-400">: </span>
                <span className="text-orange-300">true</span>
                <span className="text-slate-400">{" });"}</span>
                {"\n\n"}
                <span className="text-slate-500">{"// 2. Conectar Lenis → ScrollTrigger"}</span>
                {"\n"}
                <span className="text-cyan-300">lenis</span>
                <span className="text-slate-400">.</span>
                <span className="text-green-300">on</span>
                <span className="text-slate-400">(</span>
                <span className="text-amber-300">&quot;scroll&quot;</span>
                <span className="text-slate-400">, </span>
                <span className="text-yellow-300">ScrollTrigger</span>
                <span className="text-slate-400">.</span>
                <span className="text-green-300">update</span>
                <span className="text-slate-400">);</span>
                {"\n\n"}
                <span className="text-slate-500">{"// 3. Sync no mesmo RAF loop"}</span>
                {"\n"}
                <span className="text-yellow-300">gsap</span>
                <span className="text-slate-400">.</span>
                <span className="text-cyan-300">ticker</span>
                <span className="text-slate-400">.</span>
                <span className="text-green-300">add</span>
                <span className="text-slate-400">{"(("}
                </span>
                <span className="text-orange-300">time</span>
                <span className="text-slate-400">{") => "}</span>
                <span className="text-cyan-300">lenis</span>
                <span className="text-slate-400">.</span>
                <span className="text-green-300">raf</span>
                <span className="text-slate-400">(</span>
                <span className="text-orange-300">time</span>
                <span className="text-slate-400">{" * "}</span>
                <span className="text-orange-300">1000</span>
                <span className="text-slate-400">{"));"}</span>
                {"\n\n"}
                <span className="text-slate-500">{"// 4. Desativar lag compensation do GSAP"}</span>
                {"\n"}
                <span className="text-yellow-300">gsap</span>
                <span className="text-slate-400">.</span>
                <span className="text-cyan-300">ticker</span>
                <span className="text-slate-400">.</span>
                <span className="text-green-300">lagSmoothing</span>
                <span className="text-slate-400">(</span>
                <span className="text-orange-300">0</span>
                <span className="text-slate-400">);</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Configuracao */}
        <div>
          <BlurText
            text="Configuracao"
            as="h3"
            className="text-2xl font-bold tracking-tight text-slate-900 mb-8"
          />

          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            O Lenis aceita varias opcoes de configuracao. Estas sao as que uso neste
            projeto e porque:
          </p>

          <StaggerContainer
            className="grid gap-4 md:grid-cols-2"
            staggerDelay={0.1}
          >
            {configOptions.map((opt) => (
              <GlassCard key={opt.prop} hover={false} className="relative">
                <Spotlight size={160} />
                <code className="inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-mono text-green-400 mb-3">
                  {opt.prop}
                </code>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {opt.desc}
                </p>
              </GlassCard>
            ))}
          </StaggerContainer>

          <GlassCard hover={false} className="mt-8 max-w-3xl border-l-4 border-l-blue-400">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Nota importante:</strong> A chamada{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-blue-600">
                gsap.ticker.lagSmoothing(0)
              </code>{" "}
              desativa a compensacao de lag do GSAP. Sem isto, quando o browser perde
              frames, o GSAP tenta &quot;compensar&quot; saltando frames — o que cria
              micro-jumps visiveis no scroll suave. Com{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-blue-600">0</code>,
              preferimos um frame atrasado a um salto visivel.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
