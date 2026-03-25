"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    label: "A Sala Principal",
    year: "c. 1930",
    color: "#3D2B1F",
    sepia: true,
    description: "A sala histórica do Bijou, com as suas mesas cobertas de toalhas brancas.",
  },
  {
    id: 2,
    label: "Bacalhau à Bijou",
    year: "Ex Libris",
    color: "#5C3D2E",
    sepia: false,
    description: "O prato que nos define. Lombo de bacalhau, batata a murro, grelos, azeite.",
  },
  {
    id: 3,
    label: "A Fachada Histórica",
    year: "c. 1920",
    color: "#4A3728",
    sepia: true,
    description: "A fachada original do Bijou na Rua da Figueira da Foz, decorada para as festas.",
  },
  {
    id: 4,
    label: "Cataplana de Mariscos",
    year: "Receita da Casa",
    color: "#6B4C3B",
    sepia: false,
    description: "A nossa cataplana, preparada com mariscos frescos da costa.",
  },
  {
    id: 5,
    label: "A Adega Histórica",
    year: "c. 1960",
    color: "#2C1F15",
    sepia: true,
    description: "A adega do Bijou, com garrafas que testemunharam décadas de história.",
  },
  {
    id: 6,
    label: "Arroz de Tamboril",
    year: "Favorito",
    color: "#7A5241",
    sepia: false,
    description: "O arroz de tamboril com gambas, preparado com peixe fresco de Buarcos.",
  },
  {
    id: 7,
    label: "Equipa de Cozinha",
    year: "c. 1975",
    color: "#3A2A1E",
    sepia: true,
    description: "Segunda geração da família Pinto, com a equipa de cozinha.",
  },
  {
    id: 8,
    label: "Mesa de Celebração",
    year: "Centenário 2012",
    color: "#8C5C3E",
    sepia: false,
    description: "Celebração dos 100 anos do Bijou, com toda a família presente.",
  },
];

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden"
      style={{ aspectRatio: index % 3 === 0 ? "4/5" : "3/4" }}
    >
      {/* Placeholder with vintage styling */}
      <div
        className="relative w-full h-full transition-transform duration-700 group-hover:scale-105"
        style={{ background: item.color }}
      >
        {/* Grain/texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
            opacity: item.sepia ? 0.6 : 0.2,
          }}
        />
        {/* Sepia overlay for historic photos */}
        {item.sepia && (
          <div
            className="absolute inset-0"
            style={{ background: "rgba(180,120,60,0.25)", mixBlendMode: "multiply" }}
          />
        )}
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div
            className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
            >
              {item.year}
            </p>
            <p
              className="text-base font-bold"
              style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
            >
              {item.label}
            </p>
          </div>
        </div>
        {/* Border on hover */}
        <div
          className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderColor: "#CFB53B" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(207,181,59,0.9)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#4A3728">
              <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 6L14 10L10 14V11H6V9H10V6Z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  };

  return (
    <section
      id="galeria"
      className="py-24 px-6"
      style={{ background: "#FAF7F0" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            Galeria
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
          >
            Imagens de Uma
            <br />
            <em>Vida Inteira</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setSelectedIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image placeholder */}
              <div
                className="w-full aspect-video"
                style={{ background: galleryItems[selectedIndex].color, position: "relative" }}
              >
                {galleryItems[selectedIndex].sepia && (
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(180,120,60,0.3)", mixBlendMode: "multiply" }}
                  />
                )}
                <div
                  className="absolute inset-0 flex items-end p-6"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                  }}
                >
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                    >
                      {galleryItems[selectedIndex].year}
                    </p>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
                    >
                      {galleryItems[selectedIndex].label}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,240,0.75)", fontFamily: "var(--font-source-sans-3)" }}
                    >
                      {galleryItems[selectedIndex].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center"
                style={{ background: "#800020" }}
              >
                <X size={18} color="#FFFFF0" />
              </button>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(207,181,59,0.3)" }}
              >
                <ChevronLeft size={20} color="#CFB53B" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(207,181,59,0.3)" }}
              >
                <ChevronRight size={20} color="#CFB53B" />
              </button>

              {/* Counter */}
              <p
                className="text-center mt-3 text-xs tracking-widest"
                style={{ color: "rgba(207,181,59,0.6)", fontFamily: "var(--font-source-sans-3)" }}
              >
                {selectedIndex + 1} / {galleryItems.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
