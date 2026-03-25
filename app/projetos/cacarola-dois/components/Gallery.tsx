"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type GalleryItem = {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  size: "large" | "small" | "medium";
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Ceviche de Dourada", subtitle: "Entrada de assinatura", color: "#0369A1", accent: "#7DD3FC", size: "large" },
  { id: 2, title: "Vista para o Mar", subtitle: "Sala principal", color: "#0C2340", accent: "#0369A1", size: "small" },
  { id: 3, title: "Polvo à Lagareiro", subtitle: "Especialidade da casa", color: "#FB923C", accent: "#FED7AA", size: "small" },
  { id: 4, title: "Arroz de Tamboril", subtitle: "Para dois", color: "#0C2340", accent: "#7DD3FC", size: "medium" },
  { id: 5, title: "Bar de Vinhos", subtitle: "Mais de 60 referências", color: "#1E3A5F", accent: "#FB923C", size: "medium" },
  { id: 6, title: "Tartare de Atum", subtitle: "Preparado na mesa", color: "#0369A1", accent: "#F1F5F9", size: "small" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F1F5F9] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-[0.35em] uppercase mb-4"
        >
          Galeria
        </motion.p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-tight tracking-tight text-[#0C2340]"
          >
            O espaço &amp; os <span className="text-[#0369A1]">pratos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-[family-name:var(--font-inter)] text-[#475569] text-sm max-w-xs leading-relaxed"
          >
            Um espaço contemporâneo, luminoso, com vista para a ria e a costa
            da Figueira da Foz.
          </motion.p>
        </div>

        {/* Mosaic grid — placeholders with texture */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                item.size === "large"
                  ? "col-span-2 row-span-2 aspect-square sm:aspect-auto sm:h-80"
                  : item.size === "medium"
                  ? "col-span-1 aspect-video"
                  : "col-span-1 aspect-square"
              }`}
              style={{ backgroundColor: item.color }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 70% 30%, ${item.accent}40, transparent 70%)`,
                }}
              />
              {/* Wave pattern */}
              <div className="absolute bottom-0 left-0 w-full opacity-10">
                <svg viewBox="0 0 400 80" className="w-full fill-white" preserveAspectRatio="none">
                  <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" />
                </svg>
              </div>
              {/* Hover reveal */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-sm sm:text-base leading-tight mb-0.5">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
                  {item.subtitle}
                </p>
              </div>
              {/* Always visible label on mobile */}
              <div className="absolute bottom-4 left-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-[family-name:var(--font-inter)] text-white/70 text-xs bg-black/30 rounded-full px-2.5 py-1 backdrop-blur-sm sm:hidden">
                  {item.title}
                </span>
              </div>
              {/* Dot accent */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                style={{ backgroundColor: item.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-hanken)] text-[#0369A1] font-semibold text-sm tracking-wide hover:text-[#FB923C] transition-colors duration-200 group"
          >
            <span>Ver mais no Instagram</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
