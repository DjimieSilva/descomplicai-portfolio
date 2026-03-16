"use client";

import { useState } from "react";

const categories = [
  {
    name: "Efeitos Visuais",
    components: ["GlassCard", "Spotlight", "GrainOverlay", "AnimatedGradient", "DotGrid"],
    color: "blue",
    bgClass: "bg-blue-600",
    bgFadedClass: "bg-blue-600/20",
    emoji: "\u2728",
  },
  {
    name: "Tipografia",
    components: ["BlurText", "TextScramble", "SectionHeading"],
    color: "purple",
    bgClass: "bg-purple-600",
    bgFadedClass: "bg-purple-600/20",
    emoji: "\uD83D\uDDA4",
  },
  {
    name: "Interacao",
    components: ["MagneticButton", "CursorFollower", "GlowCard"],
    color: "cyan",
    bgClass: "bg-cyan-600",
    bgFadedClass: "bg-cyan-600/20",
    emoji: "\uD83D\uDD79\uFE0F",
  },
  {
    name: "Scroll & Layout",
    components: ["ParallaxSection", "StaggerContainer", "SmoothScrollProvider"],
    color: "emerald",
    bgClass: "bg-emerald-600",
    bgFadedClass: "bg-emerald-600/20",
    emoji: "\uD83D\uDCDC",
  },
  {
    name: "Composicao",
    components: ["All components working together"],
    color: "amber",
    bgClass: "bg-amber-600",
    bgFadedClass: "bg-amber-600/20",
    emoji: "\uD83E\uDDE9",
  },
  {
    name: "Performance",
    components: ["Tree-shaking", "IntersectionObserver", "rAF"],
    color: "pink",
    bgClass: "bg-pink-600",
    bgFadedClass: "bg-pink-600/20",
    emoji: "\u26A1",
  },
];

export function HoverGallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Explorar por Categoria
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={cat.name}
                data-hover
                className={`h-64 rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-300 ${
                  isHovered ? `${cat.bgClass} scale-[1.02]` : cat.bgFadedClass
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Faded emoji background */}
                <div
                  className={`absolute inset-0 flex items-center justify-center text-8xl transition-opacity duration-300 ${
                    isHovered ? "opacity-10" : "opacity-20"
                  }`}
                >
                  {cat.emoji}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                  {/* Category name */}
                  <h3
                    className={`font-bold text-white transition-all duration-300 ${
                      isHovered ? "text-lg mb-4 mt-2" : "text-2xl"
                    }`}
                  >
                    {cat.name}
                  </h3>

                  {/* Component count badge */}
                  <div
                    className={`transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-y-0 mb-3"
                        : "opacity-0 -translate-y-2 mb-0 h-0"
                    }`}
                  >
                    <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {cat.components.length} componente{cat.components.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Component pills */}
                  <div
                    className={`flex flex-wrap justify-center gap-2 transition-all duration-300 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {cat.components.map((comp, j) => (
                      <span
                        key={comp}
                        className="inline-block bg-white/15 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300"
                        style={{
                          transitionDelay: isHovered ? `${j * 50}ms` : "0ms",
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        }}
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
