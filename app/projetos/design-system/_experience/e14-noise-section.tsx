"use client"

import { useEffect, useRef } from "react"

export function NoiseGradientSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const style = document.createElement("style")
    style.textContent = `
      @keyframes mesh1 {
        0%, 100% { transform: translate(0%, 0%) scale(1); }
        25% { transform: translate(10%, -15%) scale(1.1); }
        50% { transform: translate(-5%, 10%) scale(0.95); }
        75% { transform: translate(-10%, -5%) scale(1.05); }
      }
      @keyframes mesh2 {
        0%, 100% { transform: translate(0%, 0%) scale(1); }
        25% { transform: translate(-15%, 10%) scale(1.05); }
        50% { transform: translate(10%, -10%) scale(1.1); }
        75% { transform: translate(5%, 15%) scale(0.95); }
      }
      @keyframes mesh3 {
        0%, 100% { transform: translate(0%, 0%) scale(1.05); }
        25% { transform: translate(12%, 8%) scale(0.95); }
        50% { transform: translate(-8%, -12%) scale(1.1); }
        75% { transform: translate(-12%, 5%) scale(1); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] w-full overflow-hidden py-32 px-6"
    >
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500" />

      {/* Layer 2: Animated mesh gradients */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%)",
          animation: "mesh1 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, transparent 70%)",
          animation: "mesh2 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[20%] right-[10%] w-[60%] h-[60%] rounded-full opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.7) 0%, transparent 70%)",
          animation: "mesh3 28s ease-in-out infinite",
        }}
      />

      {/* Layer 3: SVG noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-15 mix-blend-overlay pointer-events-none">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Layer 4: Dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(70vh-16rem)]">
        <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white text-center leading-tight max-w-4xl mx-auto">
          &ldquo;O melhor design system é aquele que ninguém nota que existe.&rdquo;
        </blockquote>

        <p className="text-white/60 text-sm font-mono mt-8">
          — Princípio #5: Sensory Restraint
        </p>

        <div className="w-16 h-px bg-white/30 mx-auto mt-8" />

        <p className="text-white/50 text-sm text-center mt-6 max-w-md mx-auto">
          Aplicado em cada componente deste sistema. O grain que estás a ver? 1.2% de opacidade.
        </p>
      </div>
    </section>
  )
}
