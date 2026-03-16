"use client"

import { useRef, useState, useCallback } from "react"

interface CardData {
  title: string
  description: string
  icon: string
  gradient: string
}

const cards: CardData[] = [
  {
    title: "Scroll Cinematico",
    description:
      "Lenis + GSAP ScrollTrigger sincronizados num loop unico de requestAnimationFrame. 60fps garantidos.",
    icon: "🎞️",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "Spring Physics",
    description:
      "Hooke's Law aplicada a cada interacao. Botoes magneticos, hover lift, accordions — tudo com fisica real.",
    icon: "⚛️",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    title: "Glassmorphism",
    description:
      "Backdrop blur calibrado, saturacao a 180%, bordas subtis. O efeito de vidro que define interfaces premium.",
    icon: "✨",
    gradient: "from-amber-500 to-orange-400",
  },
]

function TiltCard({ card }: { card: CardData }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)")

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = (-mouseY / (rect.height / 2)) * 15
      const rotateY = (mouseX / (rect.width / 2)) * 15

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg)")
  }, [])

  return (
    <div style={{ perspective: 1000 }}>
      <div
        ref={cardRef}
        data-hover
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-8 min-h-[350px] border border-white/20 cursor-pointer`}
        style={{
          transform,
          transition: "transform 0.15s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner glow / shine effect */}
        <div
          className="pointer-events-none absolute inset-x-4 top-4 h-1/2 rounded-2xl bg-white/10"
          style={{ transform: "translateZ(20px)" }}
        />

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <span className="block text-5xl mb-6">{card.icon}</span>
          <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
          <p className="text-white/80 text-base leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TiltCardsSection() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4">
          Capacidades
        </p>
        <h2 className="text-4xl font-bold text-slate-900 mb-16">
          Construido Para Impressionar
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <TiltCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
