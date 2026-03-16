"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Design System Components ─── */
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { DotGrid } from "@/components/ui/dot-grid";
import { BlurText } from "@/components/ui/blur-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { GlowCard } from "@/components/ui/glow-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { StaggerContainer } from "@/components/ui/stagger-container";

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM SHOWCASE — OVERKILL EDITION
   ═══════════════════════════════════════════════════════ */

export default function DesignSystemPage() {
  /* ─── State for playground section ─── */
  const [playgroundGlow, setPlaygroundGlow] = useState("rgba(59,130,246,0.35)");
  const [playgroundBlur, setPlaygroundBlur] = useState(20);

  /* ─── Animated counters for metrics ─── */
  const counter1 = useAnimatedCounter(15, 1800);
  const counter2 = useAnimatedCounter(847, 2200);
  const counter3 = useAnimatedCounter(100, 2000);
  const counter4 = useAnimatedCounter(60, 1600);

  return (
    <main className="relative min-h-screen bg-[#fafaf9] overflow-x-hidden">
      {/* ─── Global Overlays ─── */}
      <ScrollProgress color="linear-gradient(to right, #2563eb, #7c3aed, #06b6d4)" />
      <GrainOverlay opacity={0.012} />
      <CursorFollower />

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg gradient-text" data-hover>
            descomplicai
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <Link href="/projetos" className="hover:text-blue-600 transition-colors" data-hover>
              Projetos
            </Link>
            <Link href="/#services" className="hover:text-blue-600 transition-colors" data-hover>
              Servicos
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
         SECTION 1: HERO — DARK CINEMATIC
         ═══════════════════════════════════════════════════ */}
      <section className="relative pt-14 min-h-screen flex items-center overflow-hidden bg-slate-950">
        <AnimatedGradient colors={["#2563eb", "#7c3aed", "#06b6d4"]} />
        <DotGrid opacity={0.06} color="rgb(148,163,184)" size={32} />

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/3 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-24">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-400 transition-colors mb-12"
            data-hover
          >
            <ArrowLeft className="w-4 h-4" /> Voltar aos Projetos
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-mono tracking-wide">v2.0 — 15 COMPONENTES</span>
              </div>

              <BlurText
                text="Design System"
                as="h1"
                className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white"
                gradient
                animateBy="letters"
                delay={100}
              />

              <div className="mt-6 h-8">
                <TextScramble
                  text="Onde a arte encontra a engenharia."
                  as="p"
                  className="text-xl sm:text-2xl text-slate-400"
                  speed={25}
                />
              </div>

              <p className="mt-8 text-slate-500 max-w-lg text-base leading-relaxed">
                Sistema de componentes construido de raiz para criar experiencias
                digitais cinematicas. GSAP, Lenis, Framer Motion e glassmorphism
                em perfeita harmonia.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <MagneticButton
                  className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors"
                  strength={0.35}
                  data-hover
                >
                  Explorar Componentes
                </MagneticButton>
                <MagneticButton
                  className="px-8 py-3.5 rounded-full border border-slate-700 text-slate-300 font-medium text-sm hover:border-slate-500 hover:text-white transition-colors"
                  strength={0.3}
                  href="https://github.com"
                  data-hover
                >
                  Ver Codigo <ArrowUpRight className="w-4 h-4 ml-1.5 inline" />
                </MagneticButton>
              </div>
            </div>

            {/* Hero visual — stacked glass cards */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md ml-auto">
                <ParallaxSection speed={0.15} className="absolute inset-0">
                  <div className="absolute top-8 left-8 right-8 bottom-8">
                    <GlassCard
                      className="w-full h-full !bg-white/5 !border-white/10"
                      hover={false}
                    >
                      <div className="relative z-10 h-full flex flex-col justify-between p-4">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400/60" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                          <div className="w-3 h-3 rounded-full bg-green-400/60" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-3/4 rounded-full bg-white/10" />
                          <div className="h-2 w-1/2 rounded-full bg-white/10" />
                          <div className="h-2 w-2/3 rounded-full bg-blue-500/20" />
                          <div className="h-2 w-1/3 rounded-full bg-purple-500/20" />
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </ParallaxSection>

                <ParallaxSection speed={0.25} className="absolute inset-0">
                  <div className="absolute top-24 left-0 w-48">
                    <GlowCard
                      glowColor="rgba(59,130,246,0.25)"
                      className="bg-slate-900/80 backdrop-blur-sm"
                    >
                      <div className="text-center py-3">
                        <p className="text-2xl font-bold text-white">15</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Componentes</p>
                      </div>
                    </GlowCard>
                  </div>
                </ParallaxSection>

                <ParallaxSection speed={0.35} className="absolute inset-0">
                  <div className="absolute bottom-16 right-0 w-44">
                    <GlowCard
                      glowColor="rgba(168,85,247,0.25)"
                      className="bg-slate-900/80 backdrop-blur-sm"
                    >
                      <div className="text-center py-3">
                        <p className="text-xs font-mono text-purple-400">GSAP + Lenis</p>
                        <p className="text-[10px] text-slate-500 mt-1">60fps garantidos</p>
                      </div>
                    </GlowCard>
                  </div>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafaf9] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 2: CAPABILITIES — O QUE PERMITE
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <DotGrid opacity={0.025} />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Capacidades"
            title="O Que Este Sistema Permite"
            description="Cada componente foi desenhado para resolver um problema especifico — juntos, criam experiencias que impressionam."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.08}
          >
            {[
              {
                icon: "🎬",
                title: "Scroll Cinematico",
                desc: "Lenis smooth scroll + GSAP ScrollTrigger para animacoes suaves a 60fps.",
                color: "blue",
              },
              {
                icon: "🪟",
                title: "Glassmorphism",
                desc: "Backdrop blur, saturacao e transparencias calibradas para qualquer fundo.",
                color: "purple",
              },
              {
                icon: "✦",
                title: "Micro-Interacoes",
                desc: "Cursor personalizado, botoes magneticos e spotlights que seguem o rato.",
                color: "cyan",
              },
              {
                icon: "📝",
                title: "Tipografia Viva",
                desc: "Blur reveal, scramble decode e gradient text com triggers de scroll.",
                color: "amber",
              },
            ].map((cap) => (
              <GlassCard key={cap.title} className="min-h-[220px]" data-hover>
                <Spotlight size={200} />
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{cap.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">{cap.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 3: METRICS — NUMEROS ANIMADOS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-slate-950 overflow-hidden">
        <AnimatedGradient colors={["#2563eb", "#7c3aed", "#06b6d4"]} />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Em Numeros"
            title="Construido Para Performance"
            description="Cada decisao de design foi tomada com a performance em mente."
            dark
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { counter: counter1, suffix: "", label: "Componentes", sublabel: "Prontos a usar" },
              { counter: counter2, suffix: "", label: "Linhas de Codigo", sublabel: "TypeScript puro" },
              { counter: counter3, suffix: "%", label: "Type-Safe", sublabel: "Zero any" },
              { counter: counter4, suffix: "fps", label: "Performance", sublabel: "Consistente" },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-block">
                  <span
                    ref={metric.counter.ref}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tabular-nums"
                  >
                    {metric.counter.count}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-400 ml-1">
                    {metric.suffix}
                  </span>
                </div>
                <p className="text-slate-300 font-medium mt-3">{metric.label}</p>
                <p className="text-slate-500 text-sm mt-1">{metric.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 4: GLASSMORPHISM SHOWCASE
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Efeitos Visuais"
            title="Glassmorphism & Spotlight"
            description="Cards com backdrop-blur, spotlight que segue o cursor e hover com spring physics."
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            <GlassCard className="min-h-[260px]" data-hover>
              <Spotlight size={280} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-5">
                  <span className="text-blue-600 text-xl font-bold">G</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">GlassCard</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Backdrop blur 20px com saturacao a 180%. Hover lift animado com spring physics.
                  Componente polimorfico via prop <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono">as</code>.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">Framer Motion</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">Polymorphic</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="min-h-[260px]" data-hover>
              <Spotlight size={280} className="from-purple-200 via-purple-300 to-purple-400" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-5">
                  <span className="text-purple-600 text-xl font-bold">S</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Spotlight</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Gradiente radial que segue o cursor com spring physics. Cores, tamanho e
                  spring configuraveis. Auto-detecta o parent.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">Mouse Tracking</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">Spring</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="min-h-[260px]" data-hover>
              <Spotlight size={280} className="from-emerald-200 via-emerald-300 to-emerald-400" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
                  <span className="text-emerald-600 text-xl font-bold">O</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Overlays</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  GrainOverlay com SVG feTurbulence e DotGrid configuravel. Ambos
                  activos nesta pagina — subtis mas presentes.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">SVG Noise</span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">CSS Pattern</span>
                </div>
              </div>
            </GlassCard>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 5: GLOW CARDS — DARK SECTION
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden">
        <AnimatedGradient colors={["#3b82f6", "#8b5cf6", "#06b6d4"]} />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Interativo"
            title="Glow Cards"
            description="Hover sobre cada card para ver o efeito de glow. Cor, intensidade e raio totalmente configuraveis."
            dark
          />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { color: "rgba(59,130,246,0.3)", label: "Blue", hex: "#3B82F6", desc: "Primario — confianca" },
              { color: "rgba(168,85,247,0.3)", label: "Purple", hex: "#A855F7", desc: "Acento — criatividade" },
              { color: "rgba(6,182,212,0.3)", label: "Cyan", hex: "#06B6D4", desc: "Info — tecnologia" },
              { color: "rgba(16,185,129,0.3)", label: "Emerald", hex: "#10B981", desc: "Sucesso — crescimento" },
            ].map((glow) => (
              <GlowCard
                key={glow.label}
                glowColor={glow.color}
                className="bg-slate-900/80 backdrop-blur-sm"
                data-hover
              >
                <div className="text-center py-4">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: glow.color }}
                  >
                    <div className="w-4 h-4 rounded-full bg-white/80" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{glow.label} Glow</h3>
                  <p className="text-xs text-slate-500 font-mono mb-2">{glow.hex}</p>
                  <p className="text-xs text-slate-400">{glow.desc}</p>
                </div>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 6: TYPOGRAPHY
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Tipografia"
            title="Animacoes de Texto"
            description="Blur reveal, decode scramble e gradient text. Cada um com IntersectionObserver para trigger automatico."
          />

          <div className="space-y-24">
            {/* BlurText — words */}
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6">
                BlurText — Reveal por Palavras
              </p>
              <BlurText
                text="Simplicidade e a sofisticacao suprema"
                as="h2"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 justify-center"
                animateBy="words"
                once={false}
              />
              <p className="text-sm text-slate-400 mt-4 font-mono">
                animateBy=&quot;words&quot; — delay por palavra, blur 12px → 0px
              </p>
            </div>

            {/* BlurText — letters + gradient */}
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6">
                BlurText — Letras + Gradiente
              </p>
              <BlurText
                text="Descomplicai"
                as="h2"
                className="text-5xl sm:text-7xl lg:text-8xl font-bold justify-center"
                animateBy="letters"
                gradient
                once={false}
              />
              <p className="text-sm text-slate-400 mt-4 font-mono">
                animateBy=&quot;letters&quot; + gradient — cada letra revela independentemente
              </p>
            </div>

            {/* TextScramble */}
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6">
                TextScramble — Efeito Decode
              </p>
              <TextScramble
                text="O futuro pertence a quem simplifica o complexo."
                as="h2"
                className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900"
                speed={30}
                once={false}
              />
              <p className="text-sm text-slate-400 mt-4 font-mono">
                speed=30 — caracteres aleatorios resolvem para o texto final
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 7: MAGNETIC BUTTONS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <DotGrid opacity={0.025} />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Interacao"
            title="Botoes Magneticos"
            description="Botoes que reagem ao cursor com efeito de atracao magnetica. Retorno via spring physics. Desktop-only com fallback gracioso."
          />

          <div className="space-y-16">
            {/* Row 1 — Primary variants */}
            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">
                Variantes Primarias
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <MagneticButton
                  className="px-10 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  data-hover
                >
                  Acao Principal
                </MagneticButton>

                <MagneticButton
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-600/20"
                  strength={0.4}
                  data-hover
                >
                  Gradiente CTA
                </MagneticButton>

                <MagneticButton
                  className="px-10 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                  strength={0.35}
                  data-hover
                >
                  Dark Mode
                </MagneticButton>
              </div>
            </div>

            {/* Row 2 — Outline variants */}
            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">
                Variantes Outline
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <MagneticButton
                  className="px-10 py-4 rounded-full border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-all"
                  strength={0.3}
                  data-hover
                >
                  Secundario
                </MagneticButton>

                <MagneticButton
                  className="px-10 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all"
                  strength={0.3}
                  data-hover
                >
                  Outline Blue
                </MagneticButton>

                <MagneticButton
                  className="px-6 py-4 rounded-2xl border border-slate-200 text-slate-600 text-sm hover:border-blue-300 hover:text-blue-600 transition-all"
                  strength={0.25}
                  data-hover
                >
                  Subtil →
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 8: PARALLAX — LAYERED CINEMATIC
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Scroll & Layout"
            title="Parallax Cinematico"
            description="Multiplas camadas com velocidades diferentes criam profundidade ao fazer scroll. Powered by GSAP ScrollTrigger."
            dark
          />

          {/* Parallax composition */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/30">
            {/* Layer 1 — Background dots, slowest */}
            <ParallaxSection speed={0.1} className="absolute inset-0">
              <DotGrid opacity={0.15} color="rgb(59,130,246)" size={40} dotSize={1.5} />
            </ParallaxSection>

            {/* Layer 2 — Large floating shapes */}
            <ParallaxSection speed={0.2} className="absolute inset-0">
              <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-full border border-blue-500/20" />
              <div className="absolute top-[60%] right-[15%] w-64 h-64 rounded-full border border-purple-500/15" />
              <div className="absolute top-[30%] right-[25%] w-24 h-24 rounded-full bg-cyan-500/5" />
              <div className="absolute bottom-[20%] left-[20%] w-32 h-32 rounded-full bg-blue-500/5" />
            </ParallaxSection>

            {/* Layer 3 — Grid of small squares */}
            <ParallaxSection speed={0.3} className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-6 gap-6 opacity-30 rotate-12">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg"
                      style={{
                        background: i % 3 === 0 ? "rgba(59,130,246,0.3)" : i % 3 === 1 ? "rgba(168,85,247,0.3)" : "rgba(6,182,212,0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </ParallaxSection>

            {/* Layer 4 — Main text, medium-fast */}
            <ParallaxSection speed={0.45} className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[8rem] sm:text-[12rem] font-black text-white/[0.03] leading-none select-none">
                    DEPTH
                  </p>
                </div>
              </div>
            </ParallaxSection>

            {/* Layer 5 — Foreground card, fastest */}
            <ParallaxSection speed={0.55} className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                  <p className="text-white/80 text-lg font-medium mb-2">5 camadas em paralaxe</p>
                  <p className="text-slate-400 text-sm">
                    Cada elemento move a uma velocidade diferente, criando ilusao de profundidade tridimensional.
                  </p>
                  <div className="flex justify-center gap-3 mt-6">
                    {[0.1, 0.2, 0.3, 0.45, 0.55].map((speed) => (
                      <div
                        key={speed}
                        className="px-3 py-1 rounded-full text-[10px] font-mono border"
                        style={{
                          borderColor: `rgba(59,130,246,${speed})`,
                          color: `rgba(147,197,253,${0.4 + speed})`,
                        }}
                      >
                        {speed}x
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 9: STAGGER CONTAINER DIRECTIONS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Animacoes de Entrada"
            title="Stagger Container"
            description="Quatro direcoes de entrada com timing staggered. Ideal para listas, grids e sequencias de conteudo."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {(["up", "down", "left", "right"] as const).map((dir) => (
              <div key={dir}>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-4 text-center">
                  direction: &quot;{dir}&quot;
                </p>
                <StaggerContainer className="space-y-3" direction={dir} once={false}>
                  {["Alpha", "Beta", "Gamma", "Delta"].map((label) => (
                    <div
                      key={label}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-600 text-center font-medium shadow-sm"
                    >
                      {label}
                    </div>
                  ))}
                </StaggerContainer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 10: COMPARACAO ANTES/DEPOIS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Comparacao"
            title="Antes & Depois"
            description="O impacto visual de aplicar o design system a elementos comuns de interface."
          />

          <StaggerContainer className="grid lg:grid-cols-2 gap-8" staggerDelay={0.15}>
            {/* Before/After — Card */}
            <div className="space-y-4">
              <p className="text-[10px] font-mono text-red-400 uppercase tracking-[0.3em]">
                Sem Design System
              </p>
              <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">Card Basico</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Um card HTML padrao sem efeitos visuais, sem hover states e sem interactividade.
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded">
                  Botao Simples
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-mono text-green-500 uppercase tracking-[0.3em]">
                Com Design System
              </p>
              <GlassCard className="min-h-[160px]" data-hover>
                <Spotlight size={250} className="from-green-200 via-emerald-300 to-cyan-400" />
                <div className="relative z-10">
                  <h3 className="font-bold text-slate-900 mb-2">Card Elevado</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    GlassCard com Spotlight, hover lift via spring e cursor follower activo.
                  </p>
                  <MagneticButton
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white text-sm font-medium shadow-lg shadow-green-500/20"
                    strength={0.3}
                    data-hover
                  >
                    Botao Magnetico
                  </MagneticButton>
                </div>
              </GlassCard>
            </div>

            {/* Before/After — Text */}
            <div className="space-y-4">
              <p className="text-[10px] font-mono text-red-400 uppercase tracking-[0.3em]">
                Titulo Estatico
              </p>
              <div className="p-6 rounded-lg bg-white border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800">
                  Bem-vindo ao Projecto
                </h2>
                <p className="text-gray-500 mt-2">Subtitulo descritivo aqui.</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-mono text-green-500 uppercase tracking-[0.3em]">
                Titulo Animado
              </p>
              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                <BlurText
                  text="Bem-vindo ao Projecto"
                  as="h2"
                  className="text-3xl font-bold text-slate-900"
                  animateBy="words"
                  once={false}
                />
                <div className="mt-3">
                  <TextScramble
                    text="Subtitulo descritivo aqui."
                    as="p"
                    className="text-slate-500"
                    speed={35}
                    once={false}
                  />
                </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 11: PLAYGROUND INTERACTIVO
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden">
        <AnimatedGradient colors={["#06b6d4", "#3b82f6", "#8b5cf6"]} />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Playground"
            title="Componha em Tempo Real"
            description="Combine componentes para ver como interagem. Mude a cor do glow e o blur do glass."
            dark
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-3">Cor do Glow</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { color: "rgba(59,130,246,0.35)", label: "Blue" },
                    { color: "rgba(168,85,247,0.35)", label: "Purple" },
                    { color: "rgba(6,182,212,0.35)", label: "Cyan" },
                    { color: "rgba(239,68,68,0.35)", label: "Red" },
                    { color: "rgba(234,179,8,0.35)", label: "Yellow" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setPlaygroundGlow(opt.color)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: playgroundGlow === opt.color ? opt.color : "rgba(255,255,255,0.05)",
                        color: playgroundGlow === opt.color ? "white" : "rgba(255,255,255,0.5)",
                        border: `1px solid ${playgroundGlow === opt.color ? opt.color : "rgba(255,255,255,0.1)"}`,
                      }}
                      data-hover
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-3">
                  Blur Intensity: {playgroundBlur}px
                </p>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={playgroundBlur}
                  onChange={(e) => setPlaygroundBlur(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2">Codigo</p>
                <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
{`<GlowCard
  glowColor="${playgroundGlow}"
>
  <GlassCard blur={${playgroundBlur}}>
    <Spotlight />
    {children}
  </GlassCard>
</GlowCard>`}
                </pre>
              </div>
            </div>

            {/* Preview — 2 columns */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <GlowCard
                glowColor={playgroundGlow}
                className="bg-slate-900/60"
                data-hover
              >
                <GlassCard
                  blur={playgroundBlur}
                  className="!bg-white/5 !border-white/10 min-h-[200px]"
                  hover={false}
                >
                  <Spotlight size={220} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: playgroundGlow }}>
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Card Composto</h3>
                    <p className="text-sm text-slate-400">GlowCard + GlassCard + Spotlight compostos numa unica unidade.</p>
                  </div>
                </GlassCard>
              </GlowCard>

              <GlowCard
                glowColor={playgroundGlow}
                className="bg-slate-900/60"
                data-hover
              >
                <GlassCard
                  blur={playgroundBlur}
                  className="!bg-white/5 !border-white/10 min-h-[200px]"
                  hover={false}
                >
                  <Spotlight size={220} className="from-purple-200 via-purple-300 to-purple-400" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: playgroundGlow }}>
                      <span className="text-white text-sm font-bold">B</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Mesma Estrutura</h3>
                    <p className="text-sm text-slate-400">Mude os controlos a esquerda e observe ambos os cards reagirem em tempo real.</p>
                  </div>
                </GlassCard>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 12: ANIMATED GRADIENT GALLERY
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Gradientes"
            title="Mesh Gradients Animados"
            description="Tres radial gradients sobrepostos com animacao mesh-shift. Perfeitos para backgrounds de seccoes."
          />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {[
              { colors: ["#3b82f6", "#8b5cf6", "#06b6d4"] as [string, string, string], label: "Blue / Purple / Cyan", theme: "Ocean" },
              { colors: ["#ef4444", "#f97316", "#eab308"] as [string, string, string], label: "Red / Orange / Yellow", theme: "Sunset" },
              { colors: ["#10b981", "#06b6d4", "#3b82f6"] as [string, string, string], label: "Emerald / Cyan / Blue", theme: "Forest" },
              { colors: ["#ec4899", "#8b5cf6", "#3b82f6"] as [string, string, string], label: "Pink / Purple / Blue", theme: "Aurora" },
              { colors: ["#f59e0b", "#ef4444", "#ec4899"] as [string, string, string], label: "Amber / Red / Pink", theme: "Vulcao" },
              { colors: ["#6366f1", "#8b5cf6", "#a855f7"] as [string, string, string], label: "Indigo / Violet / Purple", theme: "Nebula" },
            ].map((g) => (
              <div
                key={g.theme}
                className="relative h-48 rounded-2xl overflow-hidden border border-slate-200/50 group"
                data-hover
              >
                <AnimatedGradient colors={g.colors} className="!opacity-40" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{g.theme}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{g.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 13: COMPONENT INDEX — VISUAL
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 bg-slate-950 overflow-hidden">
        <AnimatedGradient colors={["#2563eb", "#7c3aed", "#06b6d4"]} />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="Referencia"
            title="Todos os 15 Componentes"
            description="O catalogo completo do design system. Cada componente e independente, type-safe e pronto para producao."
            dark
          />

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.04}
          >
            {[
              { name: "ScrollProgress", category: "Layout", icon: "━━━", color: "#3b82f6", desc: "Barra de progresso fixa no topo" },
              { name: "GrainOverlay", category: "Visual", icon: "░░░", color: "#64748b", desc: "Textura SVG noise em overlay" },
              { name: "CursorFollower", category: "Interativo", icon: "◎", color: "#a855f7", desc: "Cursor personalizado mix-blend" },
              { name: "AnimatedGradient", category: "Visual", icon: "◐◑◒", color: "#06b6d4", desc: "3 gradientes com mesh-shift" },
              { name: "DotGrid", category: "Visual", icon: "· · ·", color: "#64748b", desc: "Padrao de pontos configuravel" },
              { name: "BlurText", category: "Tipografia", icon: "Aa", color: "#3b82f6", desc: "Reveal com blur por letra/palavra" },
              { name: "TextScramble", category: "Tipografia", icon: "▓▒░", color: "#10b981", desc: "Efeito decode/scramble" },
              { name: "SectionHeading", category: "Tipografia", icon: "H", color: "#f59e0b", desc: "Label + titulo + descricao" },
              { name: "GlassCard", category: "Visual", icon: "▢", color: "#3b82f6", desc: "Glassmorphism com hover spring" },
              { name: "Spotlight", category: "Visual", icon: "☀", color: "#a855f7", desc: "Gradiente radial mouse-tracking" },
              { name: "GlowCard", category: "Interativo", icon: "◈", color: "#06b6d4", desc: "Box-shadow glow no hover" },
              { name: "MagneticButton", category: "Interativo", icon: "⊕", color: "#3b82f6", desc: "Botao com atracao magnetica" },
              { name: "ParallaxSection", category: "Layout", icon: "⇅", color: "#10b981", desc: "GSAP ScrollTrigger parallax" },
              { name: "StaggerContainer", category: "Layout", icon: "▸▸▸", color: "#f59e0b", desc: "Stagger children em 4 direcoes" },
              { name: "SmoothScrollProvider", category: "Layout", icon: "↕", color: "#64748b", desc: "Lenis wrapper global" },
            ].map((comp) => (
              <GlowCard
                key={comp.name}
                glowColor={`${comp.color}40`}
                className="bg-slate-900/60 backdrop-blur-sm"
                data-hover
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-sm font-mono"
                    style={{ background: `${comp.color}15`, color: comp.color }}
                  >
                    {comp.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-semibold text-white truncate">
                        {comp.name}
                      </code>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{comp.desc}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${comp.color}15`, color: comp.color }}
                      >
                        {comp.category}
                      </span>
                      <span className="text-[9px] text-slate-600 font-mono truncate">
                        @/components/ui/
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 14: TECH STACK PILLS
         ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-8">
            Construido Com
          </p>
          <StaggerContainer className="flex flex-wrap justify-center gap-3" direction="up" staggerDelay={0.05}>
            {[
              "Next.js 15",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "GSAP",
              "Lenis",
              "React 19",
              "CSS Custom Properties",
              "IntersectionObserver",
              "Spring Physics",
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm text-slate-600 font-medium hover:border-blue-300 hover:text-blue-600 transition-colors cursor-default"
                data-hover
              >
                {tech}
              </span>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative px-6 py-20 bg-slate-950 overflow-hidden">
        <AnimatedGradient colors={["#2563eb", "#7c3aed", "#06b6d4"]} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <BlurText
            text="Descomplicai"
            as="p"
            className="text-4xl sm:text-5xl font-bold justify-center mb-6"
            gradient
            animateBy="letters"
          />
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            Design System v2.0 — 15 componentes construidos com Next.js, GSAP, Lenis e Framer Motion.
            De engenheiros para engenheiros.
          </p>
          <MagneticButton
            href="/"
            className="px-8 py-3 rounded-full border border-slate-700 text-slate-400 text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
            strength={0.3}
            data-hover
          >
            Voltar ao Inicio
          </MagneticButton>
          <p className="text-xs text-slate-600 mt-12">
            &copy; 2026 Descomplicai — Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
