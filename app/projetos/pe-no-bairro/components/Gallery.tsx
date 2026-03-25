"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "lucide-react";

// Gallery items with placeholder colors representing different food/atmosphere shots
const galleryItems = [
  {
    label: "Bifana do Bairro",
    color: "#1a1209",
    accent: "#EAB308",
    size: "large",
    emoji: "🥩",
    caption: "A bifana que toda a gente fala",
  },
  {
    label: "Mesa de Petiscos",
    color: "#120a0a",
    accent: "#B91C1C",
    size: "small",
    emoji: "🍽️",
    caption: "Partilhar é viver",
  },
  {
    label: "Esplanada ao Sol",
    color: "#0d1008",
    accent: "#4ade80",
    size: "small",
    emoji: "☀️",
    caption: "Verão em Figueira",
  },
  {
    label: "Francesinha",
    color: "#1a0f09",
    accent: "#f97316",
    size: "medium",
    emoji: "🧀",
    caption: "Molho da casa — segredo guardado",
  },
  {
    label: "Cerveja Artesanal",
    color: "#0a0d12",
    accent: "#60a5fa",
    size: "medium",
    emoji: "🍺",
    caption: "Nacional e com carácter",
  },
  {
    label: "Interior do Restaurante",
    color: "#0f0d08",
    accent: "#EAB308",
    size: "large",
    emoji: "🏠",
    caption: "O bairro tem endereço",
  },
];

const gridConfig = [
  { col: "col-span-2 row-span-2", height: "h-72" },
  { col: "col-span-1 row-span-1", height: "h-32" },
  { col: "col-span-1 row-span-1", height: "h-32" },
  { col: "col-span-1 row-span-2", height: "h-72" },
  { col: "col-span-1 row-span-1", height: "h-32" },
  { col: "col-span-2 row-span-1", height: "h-32" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#171717] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#EAB308]" />
              <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
                Galeria
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
              O bairro em imagens.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#A3A3A3] hover:text-[#EAB308] transition-colors font-[family-name:var(--font-space-grotesk)] text-sm font-medium tracking-wide group"
          >
            <Camera size={16} />
            <span>@penobairro</span>
            <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300">→</span>
          </a>
        </motion.div>

        {/* Mosaic grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-4 gap-3"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={`${gridConfig[i].col} relative overflow-hidden cursor-pointer group`}
              style={{ minHeight: "140px" }}
            >
              {/* Placeholder card */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: item.color }}
              >
                {/* Texture overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, ${item.accent}30, transparent 60%)`,
                  }}
                />
                {/* Emoji placeholder */}
                <span className="text-5xl mb-3 relative z-10 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  {item.emoji}
                </span>
                <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] text-xs text-white/30 tracking-wider uppercase">
                  {item.label}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#EAB308]/0 group-hover:bg-[#EAB308]/5 transition-colors duration-300" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-[family-name:var(--font-inter)] text-white text-xs">
                    {item.caption}
                  </p>
                </div>

                {/* Border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: item.accent }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm">
            Segue-nos no Instagram para mais fotos do dia a dia do bairro.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
