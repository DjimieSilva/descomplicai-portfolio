"use client"

import { useEffect, useRef } from "react"

const blobPath1 =
  "M44.7,-76.4C58.8,-69.2,71.8,-58.1,79.6,-44.2C87.4,-30.3,90,-13.6,88.2,2.1C86.4,17.8,80.2,32.6,70.4,44.6C60.6,56.6,47.2,65.8,32.6,73.2C18,80.6,2.2,86.2,-13.8,85.4C-29.8,84.6,-46,77.4,-58.4,66.2C-70.8,55,-79.4,39.8,-83.6,23.4C-87.8,7,-87.6,-10.6,-82.2,-26.2C-76.8,-41.8,-66.2,-55.4,-52.6,-62.8C-39,-70.2,-22.4,-71.4,-5.2,-63.2C12,-55,30.6,-83.6,44.7,-76.4Z"

const blobPath2 =
  "M39.3,-67.5C51.5,-60.3,62.5,-50.8,70.2,-38.8C77.9,-26.8,82.3,-12.2,80.8,1.4C79.3,15,71.9,27.6,63.2,38.8C54.5,50,44.5,59.8,32.4,66.4C20.3,73,6.1,76.4,-8.6,76.2C-23.3,76,-38.5,72.2,-50.2,64C-61.9,55.8,-70.1,43.2,-74.8,29.4C-79.5,15.6,-80.7,0.6,-77.6,-13C-74.5,-26.6,-67.1,-38.8,-56.8,-47.4C-46.5,-56,-33.3,-61,-20.6,-67.8C-7.9,-74.6,4.3,-83.2,17.4,-82.6C30.5,-82,27.1,-74.7,39.3,-67.5Z"

const blobPath3 =
  "M47.5,-80.3C60.9,-72.6,70.7,-58.4,77.3,-43.2C83.9,-28,87.3,-11.8,84.7,3C82.1,17.8,73.5,31.6,63.7,43.8C53.9,56,42.9,66.6,29.8,73.4C16.7,80.2,1.5,83.2,-14.2,82C-29.9,80.8,-46.1,75.4,-57.4,65C-68.7,54.6,-75.1,39.2,-79.2,23.2C-83.3,7.2,-85.1,-9.4,-80.4,-23.8C-75.7,-38.2,-64.5,-50.4,-51.2,-58.2C-37.9,-66,-22.5,-69.4,-6.4,-60.6C9.7,-51.8,34.1,-88,47.5,-80.3Z"

const keyframesCSS = `
@keyframes blob1Move {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(40px, -60px) scale(1.1); }
  50% { transform: translate(-30px, 40px) scale(0.95); }
  75% { transform: translate(60px, 20px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes blob2Move {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(-50px, 30px) rotate(90deg) scale(1.08); }
  50% { transform: translate(30px, -40px) rotate(180deg) scale(0.92); }
  75% { transform: translate(-20px, -60px) rotate(270deg) scale(1.05); }
  100% { transform: translate(0, 0) rotate(360deg) scale(1); }
}
@keyframes blob3Move {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(50px, 30px) scale(1.12); }
  66% { transform: translate(-40px, -20px) scale(0.88); }
  100% { transform: translate(0, 0) scale(1); }
}
`

interface FeatureCard {
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    title: "Intuitivo",
    description:
      "Componentes que se comportam como esperas. Sem surpresas, sem gotchas.",
  },
  {
    title: "Compos\u00EDvel",
    description:
      "Combina qualquer componente com qualquer outro. Zero depend\u00EAncias cruzadas.",
  },
  {
    title: "Performant",
    description:
      "Cada componente < 2KB. 60fps em qualquer dispositivo.",
  },
]

export function MorphingBlobsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement
            const index = cards.indexOf(el)
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateY(0)"
            }, index * 150)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-32 px-6">
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

      {/* Blob 1 — blue */}
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] opacity-100 pointer-events-none"
        style={{ animation: "blob1Move 20s ease-in-out infinite" }}
      >
        <svg
          viewBox="-100 -100 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={blobPath1}
            className="fill-blue-500/10"
          />
        </svg>
      </div>

      {/* Blob 2 — purple */}
      <div
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] -translate-y-1/2 pointer-events-none"
        style={{ animation: "blob2Move 25s ease-in-out infinite reverse" }}
      >
        <svg
          viewBox="-100 -100 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={blobPath2}
            className="fill-purple-500/10"
          />
        </svg>
      </div>

      {/* Blob 3 — cyan */}
      <div
        className="absolute -bottom-40 left-1/3 w-[800px] h-[800px] pointer-events-none"
        style={{ animation: "blob3Move 30s ease-in-out infinite" }}
      >
        <svg
          viewBox="-100 -100 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={blobPath3}
            className="fill-cyan-500/10"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 text-center">
          N&atilde;o &eacute; s&oacute; o que constru&iacute;mos.
        </h2>
        <p className="text-4xl sm:text-6xl font-bold text-center mt-2">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
            &Eacute; como te faz sentir.
          </span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
