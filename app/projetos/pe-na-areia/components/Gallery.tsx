"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";

const galleryItems = [
  {
    label: "Robalo ao Sal",
    category: "Cozinha",
    aspectRatio: "aspect-square",
    gradient: "from-[#1a1410] via-[#2a1f14] to-[#DDB892]/20",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Vista da Esplanada",
    category: "Espaço",
    aspectRatio: "aspect-[4/5]",
    gradient: "from-[#0E7490]/30 via-[#1a1410] to-[#0a0d10]",
    size: "col-span-1 row-span-2",
  },
  {
    label: "Cataplana de Marisco",
    category: "Cozinha",
    aspectRatio: "aspect-square",
    gradient: "from-[#1a1410] via-[#2d1a0e] to-[#F97316]/20",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Pôr do Sol",
    category: "Atmosfera",
    aspectRatio: "aspect-video",
    gradient: "from-[#F97316]/20 via-[#DDB892]/15 to-[#0d0b08]",
    size: "col-span-2 row-span-1",
  },
  {
    label: "Cocktail Oceano",
    category: "Bar",
    aspectRatio: "aspect-square",
    gradient: "from-[#0d1a1f] via-[#0E7490]/25 to-[#1a1410]",
    size: "col-span-1 row-span-1",
  },
  {
    label: "Mesa na Areia",
    category: "Espaço",
    aspectRatio: "aspect-square",
    gradient: "from-[#1a1410] via-[#2a2318] to-[#DDB892]/25",
    size: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#120f0b] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Galeria
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Momentos{" "}
            <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
              Inesquecíveis
            </span>
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${item.size}`}
            >
              {/* Simulated image via gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-105`}
              />

              {/* Grain texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "100px",
                }}
              />

              {/* Organic wave shapes */}
              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  d={
                    i % 3 === 0
                      ? "M0,100 C50,80 150,120 200,100 L200,200 L0,200 Z"
                      : i % 3 === 1
                      ? "M0,120 C60,90 140,150 200,110 L200,200 L0,200 Z"
                      : "M0,80 C80,60 120,140 200,90 L200,200 L0,200 Z"
                  }
                  fill="#DDB892"
                />
              </svg>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1a1410]/0 group-hover:bg-[#1a1410]/50 transition-colors duration-400" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <div
                  className="text-[9px] tracking-[0.3em] uppercase text-[#DDB892]/60 mb-1"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.category}
                </div>
                <p
                  className="text-[#FAF8F4] text-sm font-medium"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-7 py-3.5 border border-[#DDB892]/20 rounded-full hover:border-[#DDB892]/50 hover:bg-[#DDB892]/6 transition-all duration-300"
          >
            <Instagram className="w-4 h-4 text-[#DDB892]/60 group-hover:text-[#DDB892] transition-colors" />
            <span
              className="text-[#9A8C72] text-xs tracking-[0.25em] uppercase group-hover:text-[#DDB892] transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              @penaareia · Seguir no Instagram
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
