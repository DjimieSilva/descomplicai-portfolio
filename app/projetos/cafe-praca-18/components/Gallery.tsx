"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
  {
    label: "Pastéis de Nata",
    accent: "#B5A642",
    bg: "linear-gradient(135deg, #3C1518 0%, #6B2D32 100%)",
    size: "tall",
  },
  {
    label: "Esplanada da Praça",
    accent: "#E8D5B7",
    bg: "linear-gradient(135deg, #5C3317 0%, #8B4513 100%)",
    size: "normal",
  },
  {
    label: "Café Perfeito",
    accent: "#B5A642",
    bg: "linear-gradient(135deg, #2A1810 0%, #4A2820 100%)",
    size: "normal",
  },
  {
    label: "Interior Acolhedor",
    accent: "#E8D5B7",
    bg: "linear-gradient(135deg, #3C1518 0%, #5C2520 100%)",
    size: "wide",
  },
  {
    label: "Prato do Dia",
    accent: "#B5A642",
    bg: "linear-gradient(135deg, #4A3010 0%, #7A5520 100%)",
    size: "normal",
  },
  {
    label: "Tostas & Brunch",
    accent: "#E8D5B7",
    bg: "linear-gradient(135deg, #3C1518 0%, #6B3020 100%)",
    size: "tall",
  },
];

// Decorative SVG patterns for gallery placeholders
const CupSvg = () => (
  <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-30" fill="none">
    <ellipse cx="40" cy="55" rx="20" ry="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 35 Q20 55 40 55 Q60 55 60 35" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 35 L22 20 L58 20 L60 35" stroke="currentColor" strokeWidth="1.5" />
    <path d="M60 28 Q72 28 72 35 Q72 42 60 42" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="40" cy="20" rx="18" ry="4" stroke="currentColor" strokeWidth="1" />
    <path d="M35 10 Q40 5 45 10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const PlateSvg = () => (
  <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-30" fill="none">
    <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1" />
    <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="0.5" />
    <path d="M33 35 Q40 28 47 35 Q47 45 40 47 Q33 45 33 35Z" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CroissantSvg = () => (
  <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-30" fill="none">
    <path d="M15 55 Q25 20 40 18 Q55 20 65 55 Q55 65 40 63 Q25 65 15 55Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M25 50 Q35 30 40 28 Q45 30 55 50" stroke="currentColor" strokeWidth="1" />
    <path d="M10 48 Q15 55 25 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M70 48 Q65 55 55 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const icons = [CupSvg, PlateSvg, CroissantSvg, CupSvg, PlateSvg, CroissantSvg];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="gallery"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Galeria
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            Uma Fatia do Nosso Dia
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${
                  item.size === "tall"
                    ? "row-span-2"
                    : item.size === "wide"
                    ? "col-span-2"
                    : ""
                }`}
                style={{
                  background: item.bg,
                  minHeight: item.size === "tall" ? "360px" : item.size === "wide" ? "200px" : "180px",
                }}
              >
                {/* Decorative overlay */}
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ color: item.accent }}>
                  <Icon />
                </div>

                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='%23ffffff' strokeWidth='0.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                  style={{ background: "linear-gradient(to top, rgba(60,21,24,0.9) 0%, transparent 60%)" }}
                >
                  <span
                    className="text-sm font-semibold tracking-wide"
                    style={{
                      fontFamily: "var(--font-domine), serif",
                      color: "#E8D5B7",
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Label always visible on mobile */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 md:hidden"
                  style={{
                    background: "linear-gradient(to top, rgba(60,21,24,0.8) 0%, transparent 100%)",
                  }}
                >
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#E8D5B7" }}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm mt-8"
          style={{ color: "rgba(60,21,24,0.4)" }}
        >
          Siga-nos no Instagram @cafepraça18 para mais momentos
        </motion.p>
      </div>
    </section>
  );
}
