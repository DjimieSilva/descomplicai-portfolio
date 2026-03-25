"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    emoji: "🐙",
    title: "Polvo à Lagareiro",
    category: "Pratos",
    span: "col-span-2 row-span-2",
    bg: "#15803D",
    size: "large",
  },
  {
    id: 2,
    emoji: "🦪",
    title: "Amêijoas Frescas",
    category: "Mariscos",
    span: "col-span-1 row-span-1",
    bg: "#DC2626",
    size: "small",
  },
  {
    id: 3,
    emoji: "🐟",
    title: "Cherne do Dia",
    category: "Peixes",
    span: "col-span-1 row-span-1",
    bg: "#78350F",
    size: "small",
  },
  {
    id: 4,
    emoji: "🍲",
    title: "Caldeirada Tradicional",
    category: "Pratos",
    span: "col-span-1 row-span-2",
    bg: "#DC2626",
    size: "medium",
  },
  {
    id: 5,
    emoji: "🏪",
    title: "Interior do Mercado",
    category: "Espaço",
    span: "col-span-2 row-span-1",
    bg: "#15803D",
    size: "wide",
  },
  {
    id: 6,
    emoji: "🍮",
    title: "Pudim da Casa",
    category: "Sobremesas",
    span: "col-span-1 row-span-1",
    bg: "#78350F",
    size: "small",
  },
  {
    id: 7,
    emoji: "🫕",
    title: "Arroz de Lingueirão",
    category: "Pratos",
    span: "col-span-1 row-span-1",
    bg: "#DC2626",
    size: "small",
  },
  {
    id: 8,
    emoji: "🌿",
    title: "Ervas Frescas do Mercado",
    category: "Ingredientes",
    span: "col-span-2 row-span-1",
    bg: "#15803D",
    size: "wide",
  },
];

type GalleryItem = typeof galleryItems[0];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#FEF3C7]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[#DC2626] font-bold uppercase tracking-widest text-sm mb-4">
            Galeria
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Uma imagem
            <br />
            vale por mil sabores
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-4 h-[600px] md:h-[800px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(item)}
              className={`${item.span} rounded-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group`}
              style={{ background: item.bg }}
            >
              {/* Content */}
              <div className="text-center z-10 relative px-4">
                <div
                  className={`mb-2 select-none ${
                    item.size === "large" ? "text-8xl" :
                    item.size === "medium" ? "text-6xl" :
                    item.size === "wide" ? "text-5xl" : "text-4xl"
                  }`}
                >
                  {item.emoji}
                </div>
                <p className="text-white/80 text-xs font-bold uppercase tracking-wide">
                  {item.category}
                </p>
                {(item.size === "large" || item.size === "medium" || item.size === "wide") && (
                  <p
                    className="text-white font-black mt-1 text-lg leading-tight"
                    style={{ fontFamily: "var(--font-public-sans)" }}
                  >
                    {item.title}
                  </p>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>

              {/* Decorative pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-10 max-w-sm w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} className="text-[#78350F]" />
              </button>
              <div className="text-8xl mb-4">{selected.emoji}</div>
              <p className="text-[#DC2626] text-xs font-bold uppercase tracking-wide mb-2">
                {selected.category}
              </p>
              <h3
                className="text-2xl font-black text-[#78350F]"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                {selected.title}
              </h3>
              <p className="text-[#78350F]/60 text-sm mt-3" style={{ fontFamily: "var(--font-inter)" }}>
                Casa dos Papagaios — Mercado Municipal, Figueira da Foz
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
