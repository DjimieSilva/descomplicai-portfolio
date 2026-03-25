"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Placeholder gallery items with ocean/fishing themed colors and descriptions
const items = [
  {
    id: 1,
    label: "A Brasa",
    sub: "Sardinha a assar no carvão",
    color: "#2D4F3C",
    emoji: "🔥",
    aspect: "tall",
  },
  {
    id: 2,
    label: "O Porto",
    sub: "Barcos de pesca em Buarcos",
    color: "#1E3A5F",
    emoji: "⚓",
    aspect: "wide",
  },
  {
    id: 3,
    label: "Caldeirada",
    sub: "A receita de sempre",
    color: "#6B3E26",
    emoji: "🍲",
    aspect: "square",
  },
  {
    id: 4,
    label: "Arroz de Marisco",
    sub: "Malandrinho e cheio",
    color: "#2D4F3C",
    emoji: "🦐",
    aspect: "square",
  },
  {
    id: 5,
    label: "A Tasca",
    sub: "As paredes que guardam histórias",
    color: "#8B7355",
    emoji: "🏠",
    aspect: "tall",
  },
  {
    id: 6,
    label: "Percebes",
    sub: "Quando o mar os oferece",
    color: "#1E3A5F",
    emoji: "🌊",
    aspect: "wide",
  },
];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #8B7355 0px,
            transparent 1px,
            transparent 50px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            A Tasca em Imagens
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Vista, Sinta e Venha
          </h2>
          <div className="w-16 h-1 bg-[#C9B896] mx-auto" />
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`relative overflow-hidden rounded group cursor-pointer ${
                item.aspect === "tall"
                  ? "row-span-2"
                  : item.aspect === "wide"
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
              style={{
                minHeight: item.aspect === "tall" ? "360px" : "180px",
              }}
            >
              {/* Colored placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: item.color }}
              />

              {/* Grain overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                <span className="text-4xl md:text-5xl mb-3">{item.emoji}</span>
                <h3
                  className="text-base md:text-lg font-bold text-center"
                  style={{ fontFamily: "var(--font-merriweather)" }}
                >
                  {item.label}
                </h3>
                <p className="text-xs text-white/70 text-center mt-1">
                  {item.sub}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C9B896]/0 group-hover:bg-[#C9B896]/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-[#1E3A5F]/50 text-sm">
            Siga-nos no Instagram para ver o peixe do dia e os momentos da tasca
          </p>
          <a
            href="#"
            className="inline-block mt-3 text-[#8B7355] font-semibold text-sm hover:text-[#1E3A5F] transition-colors underline underline-offset-4"
          >
            @tascadapraia.buarcos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
