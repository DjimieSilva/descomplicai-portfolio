"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const photos = [
  {
    id: 1,
    titulo: "Cataplana de Marisco",
    subtitulo: "Receita da Casa · Para 2 Pessoas",
    size: "large",
    bg: "from-[#E63946]/80 via-[#1D3557]/60 to-[#1D3557]",
    emoji: "🦐",
  },
  {
    id: 2,
    titulo: "Lagosta Grelhada",
    subtitulo: "Grelhada na Brasa · A Rainha do Mar",
    size: "small",
    bg: "from-[#D4A574]/70 via-[#1D3557]/60 to-[#1D3557]",
    emoji: "🦞",
  },
  {
    id: 3,
    titulo: "Percebes da Berlenga",
    subtitulo: "Apanhados Artesanalmente",
    size: "small",
    bg: "from-[#1D3557]/80 via-[#E63946]/30 to-[#1D3557]",
    emoji: "🌿",
  },
  {
    id: 4,
    titulo: "Sapateira Recheada",
    subtitulo: "Receita Tradicional · Coral e Carne",
    size: "small",
    bg: "from-[#E63946]/60 via-[#D4A574]/40 to-[#1D3557]",
    emoji: "🦀",
  },
  {
    id: 5,
    titulo: "Arroz de Lavagante",
    subtitulo: "Meloso · Para 2 Pessoas",
    size: "large",
    bg: "from-[#D4A574]/80 via-[#E63946]/30 to-[#1D3557]",
    emoji: "🦞",
  },
  {
    id: 6,
    titulo: "Sala Tradicional",
    subtitulo: "Ambiente Acolhedor · Tradição Portuguesa",
    size: "small",
    bg: "from-[#1D3557]/90 via-[#D4A574]/20 to-[#1D3557]",
    emoji: "🏛️",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  const selectedPhoto = photos.find((p) => p.id === selected);

  return (
    <section ref={ref} id="galeria" className="bg-[#1D3557] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[#D4A574]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Galeria
          </p>
          <h2
            className="text-[#FFF1E6] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            O Sabor em{" "}
            <span className="italic text-[#D4A574]">Imagens</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#E63946] mx-auto mt-8"
          />
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              onClick={() => setSelected(photo.id)}
              className={`relative overflow-hidden rounded-sm cursor-pointer group text-left ${
                photo.size === "large" ? "col-span-2 md:col-span-1 row-span-2" : ""
              }`}
              style={{ aspectRatio: photo.size === "large" ? "1/1.6" : "1/0.9" }}
            >
              {/* Gradient background (placeholder for real images) */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${photo.bg} transition-transform duration-700 group-hover:scale-105`}
              />

              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`p-${photo.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="8" stroke="#D4A574" strokeWidth="0.5" fill="none"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#p-${photo.id})`}/>
                </svg>
              </div>

              {/* Emoji display */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[5rem] opacity-25 group-hover:opacity-40 transition-opacity">
                {photo.emoji}
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p
                  className="text-white text-sm font-light"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  {photo.titulo}
                </p>
                <p className="text-white/60 text-xs mt-0.5"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {photo.subtitulo}
                </p>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border border-[#D4A574]/0 group-hover:border-[#D4A574]/40 transition-colors rounded-sm" />
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        {selected && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-lg w-full aspect-square rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${selectedPhoto.bg}`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] opacity-30">
                {selectedPhoto.emoji}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p
                  className="text-white text-2xl font-light"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  {selectedPhoto.titulo}
                </p>
                <p className="text-white/60 text-sm mt-1">{selectedPhoto.subtitulo}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
