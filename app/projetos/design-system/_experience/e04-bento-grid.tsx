"use client"

import { useRef, useEffect, useState } from "react"

interface BentoCard {
  title: string
  label: string
  colSpan: string
  rowSpan: string
  bg: string
  mobileSingleSpan?: boolean
}

const bentoCards: BentoCard[] = [
  {
    title: "GlassCard + Spotlight",
    label: "Glassmorphism com spotlight cursor-aware",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    bg: "glass",
  },
  {
    title: "BlurText",
    label: "Revelacao progressiva com desfoque",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    bg: "blur",
  },
  {
    title: "TextScramble",
    label: "Caracteres embaralhados em transicao",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    bg: "scramble",
  },
  {
    title: "Parallax",
    label: "Camadas com profundidade no scroll",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-2",
    bg: "parallax",
  },
  {
    title: "MagneticButton",
    label: "Botao com atracao magnetica ao cursor",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    bg: "magnetic",
  },
  {
    title: "SmoothScroll + ScrollProgress",
    label: "Scroll suave com barra de progresso",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    bg: "scroll",
  },
  {
    title: "GrainOverlay",
    label: "Textura de ruido cinematografico",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    bg: "grain",
  },
  {
    title: "AnimatedGradient",
    label: "Gradiente em movimento continuo",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    bg: "gradient",
  },
]

function GlassCardContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Ambient blobs */}
      <div className="absolute top-6 left-8 w-32 h-32 rounded-full bg-blue-500/30 blur-2xl" />
      <div className="absolute bottom-8 right-6 w-28 h-28 rounded-full bg-purple-500/25 blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-cyan-400/20 blur-xl" />

      {/* Glass card mockup */}
      <div className="relative w-48 h-28 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl flex flex-col items-start justify-end p-4">
        <div className="w-8 h-1 rounded-full bg-white/40 mb-2" />
        <div className="w-20 h-1 rounded-full bg-white/25" />
        <div className="w-14 h-1 rounded-full bg-white/15 mt-1" />
        {/* Spotlight shimmer */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 blur-lg" />
      </div>
    </div>
  )
}

function BlurTextContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
      <span
        className="relative text-5xl font-bold text-white/90"
        style={{ filter: "blur(0px)", textShadow: "0 0 20px rgba(147,197,253,0.5)" }}
      >
        Aa
      </span>
      <span
        className="absolute text-5xl font-bold text-blue-300/40"
        style={{ filter: "blur(6px)" }}
      >
        Aa
      </span>
    </div>
  )
}

function ScrambleContent() {
  const [chars, setChars] = useState("T3xT$cr")
  const scrambleChars = "!@#$%&*?ABCXYZ01789"

  useEffect(() => {
    const interval = setInterval(() => {
      const length = 7
      let result = ""
      for (let i = 0; i < length; i++) {
        result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      }
      setChars(result)
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 to-violet-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_70%)]" />
      <span className="relative font-mono text-2xl tracking-widest text-purple-200/90">
        {chars}
      </span>
    </div>
  )
}

function ParallaxContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-cyan-600 to-teal-800 overflow-hidden">
      {/* Stacked layers */}
      <div className="relative w-28 h-full flex flex-col items-center justify-center gap-3">
        <div className="w-full h-8 rounded-lg bg-white/10 border border-white/20 transform -translate-y-2 scale-90" />
        <div className="w-full h-8 rounded-lg bg-white/15 border border-white/25 transform scale-95" />
        <div className="w-full h-8 rounded-lg bg-white/25 border border-white/30 transform translate-y-1" />
        <div className="w-full h-8 rounded-lg bg-white/35 border border-white/40 transform translate-y-3 scale-105" />
      </div>
      {/* Depth arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white/30">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L6 11M6 1L2 5M6 1L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 11L6 1M6 11L2 7M6 11L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  )
}

function MagneticContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,116,139,0.2),transparent_70%)]" />
      {/* Button mockup */}
      <div className="relative w-16 h-16 rounded-full border-2 border-slate-400/40 bg-slate-700/60 flex items-center justify-center shadow-lg">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-300">
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Magnetic field lines */}
      <div className="absolute w-24 h-24 rounded-full border border-dashed border-slate-600/30" />
      <div className="absolute w-36 h-36 rounded-full border border-dashed border-slate-600/15" />
    </div>
  )
}

function ScrollProgressContent() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1))
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
      {/* Progress bar */}
      <div className="relative w-3/4 h-1.5 rounded-full bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Fake scroll lines */}
      <div className="relative mt-4 flex flex-col gap-1.5 w-3/4">
        <div className="w-full h-0.5 rounded-full bg-slate-700/60" />
        <div className="w-4/5 h-0.5 rounded-full bg-slate-700/40" />
        <div className="w-3/5 h-0.5 rounded-full bg-slate-700/30" />
      </div>
    </div>
  )
}

function GrainContent() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-stone-200 overflow-hidden">
      {/* Simulated grain via SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
      <div className="relative w-16 h-16 rounded-lg bg-stone-300/60 border border-stone-400/30 flex items-center justify-center">
        <div className="w-6 h-6 rounded bg-stone-400/50" />
      </div>
    </div>
  )
}

function GradientContent() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f472b6, #a78bfa, #38bdf8, #34d399)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 4s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
    </div>
  )
}

function getCardContent(bg: string) {
  switch (bg) {
    case "glass":
      return <GlassCardContent />
    case "blur":
      return <BlurTextContent />
    case "scramble":
      return <ScrambleContent />
    case "parallax":
      return <ParallaxContent />
    case "magnetic":
      return <MagneticContent />
    case "scroll":
      return <ScrollProgressContent />
    case "grain":
      return <GrainContent />
    case "gradient":
      return <GradientContent />
    default:
      return null
  }
}

function BentoCard({ card, index }: { card: BentoCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isDark = ["glass", "scramble", "magnetic", "scroll"].includes(card.bg)

  return (
    <div
      ref={ref}
      data-hover
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:scale-[1.02]
        col-span-1 row-span-1
        ${card.colSpan} ${card.rowSpan}
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Card visual */}
      <div className="absolute inset-0">{getCardContent(card.bg)}</div>

      {/* Label overlay */}
      <div className={`absolute inset-x-0 bottom-0 p-4 ${isDark ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-black/40 to-transparent"}`}>
        <p className={`font-mono text-sm ${isDark ? "text-white/90" : "text-white/95"}`}>
          {card.title}
        </p>
        <p className={`text-xs mt-0.5 ${isDark ? "text-white/50" : "text-white/60"}`}>
          {card.label}
        </p>
      </div>
    </div>
  )
}

export function BentoGridSection() {
  return (
    <section className="bg-[#fafaf9] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Os 15 Componentes</h2>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto">
            Cada um resolve um problema especifico. Juntos, criam experiencias.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ gridAutoRows: "180px" }}
        >
          {bentoCards.map((card, i) => (
            <BentoCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
