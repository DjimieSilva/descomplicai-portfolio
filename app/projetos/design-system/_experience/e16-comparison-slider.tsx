"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export function ComparisonSliderSection() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = (x / rect.width) * 100
      setSliderPosition(Math.min(95, Math.max(5, pct)))
    },
    []
  )

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <section className="bg-[#fafaf9] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">
          Antes &amp; Depois
        </h2>
        <p className="text-slate-500 text-center mb-16">
          Arrasta o slider para ver o impacto do Design System.
        </p>

        {/* Comparison container */}
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative h-[500px] border border-slate-200 select-none"
          style={{ cursor: isDragging ? "grabbing" : "default" }}
        >
          {/* LEFT SIDE — Sem Design System */}
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="w-full max-w-sm px-8">
              {/* Label */}
              <div className="flex justify-center mb-8">
                <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                  Sem Design System
                </span>
              </div>
              {/* Plain card */}
              <div className="border border-gray-200 rounded-md p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Card Titulo
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded">
                  Botao Simples
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Com Design System */}
          <div
            className="absolute inset-0 bg-slate-900 flex items-center justify-center"
            style={{
              clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            }}
          >
            <div className="w-full max-w-sm px-8">
              {/* Label */}
              <div className="flex justify-center mb-8">
                <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full">
                  Com Design System
                </span>
              </div>
              {/* Enhanced glass card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

                <h3 className="relative text-lg font-semibold text-white mb-2">
                  Card Titulo
                </h3>
                <p className="relative text-sm text-slate-300 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button className="relative bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow">
                  Botao Estilizado
                </button>
              </div>
            </div>
          </div>

          {/* SLIDER */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            {/* Vertical line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white shadow-lg" />

            {/* Handle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <span className="text-slate-500 text-sm font-medium select-none pointer-events-none">
                &#10216; &#10217;
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-400 text-center mt-6">
          Dica: O lado direito usa GlassCard, Spotlight, AnimatedGradient e
          MagneticButton compostos.
        </p>
      </div>
    </section>
  )
}
