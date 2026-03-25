"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    label: "Cocktails de Autor",
    emoji: "🍹",
    color: "#FF6B35",
    aspect: "tall",
  },
  {
    id: 2,
    label: "Poke Bowl NALU",
    emoji: "🥗",
    color: "#2D6A4F",
    aspect: "wide",
  },
  {
    id: 3,
    label: "Sunset Sessions",
    emoji: "🌅",
    color: "#FFD700",
    aspect: "square",
  },
  {
    id: 4,
    label: "Praia de Cabedelo",
    emoji: "🏄",
    color: "#0077B6",
    aspect: "square",
  },
  {
    id: 5,
    label: "Live Music",
    emoji: "🎸",
    color: "#9B5DE5",
    aspect: "wide",
  },
  {
    id: 6,
    label: "Esplanada",
    emoji: "☀️",
    color: "#FF6B35",
    aspect: "tall",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 bg-[#0D1F3C] overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#2D6A4F] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Galeria
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Uma Imagem
            <br />
            <span className="text-[#2D6A4F]">Vale Mil Palavras</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Momentos reais, vibes autênticas. O NALU em todo o seu esplendor.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                item.aspect === "tall"
                  ? "row-span-2"
                  : item.aspect === "wide"
                  ? "col-span-2"
                  : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`,
                border: `1px solid ${item.color}30`,
              }}
            >
              {/* Decorative pattern */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, ${item.color} 0%, transparent 60%)`,
                  }}
                />
                {/* Wave pattern */}
                <svg
                  className="absolute bottom-0 left-0 right-0 opacity-20"
                  viewBox="0 0 400 60"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,30 C100,50 200,10 300,30 C350,40 380,20 400,30 L400,60 L0,60 Z"
                    fill={item.color}
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </span>
                <span
                  className="text-white font-bold text-sm text-center px-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${item.color}15` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Social CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm mb-4">
            Partilha os teus momentos com{" "}
            <span className="text-[#FF6B35] font-semibold">#NaluCabedelo</span>
          </p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#9B5DE5] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="text-white/70 text-sm">@nalu.cabedelo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
