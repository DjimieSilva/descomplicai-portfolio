"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Photography-like color palettes simulating food/coastal photography
const galleryItems = [
  { bg: "from-[#8B6914] to-[#4a3308]", label: "Polvo Grelhado", aspect: "row-span-2" },
  { bg: "from-[#2d4a3e] to-[#1a2e26]", label: "Arroz de Marisco", aspect: "" },
  { bg: "from-[#6b4c2a] to-[#3d2a14]", label: "Pastel de Nata", aspect: "" },
  { bg: "from-[#3d5a6b] to-[#1e2f38]", label: "Vista do Atlântico", aspect: "row-span-2" },
  { bg: "from-[#5c4a1e] to-[#2e240f]", label: "Robalo no Sal", aspect: "" },
  { bg: "from-[#1e3d2a] to-[#0f1e15]", label: "Amêijoas", aspect: "" },
  { bg: "from-[#7a5c1e] to-[#3d2e0f]", label: "Sobremesa", aspect: "" },
  { bg: "from-[#4a3d5c] to-[#231e2e]", label: "Sala de Jantar", aspect: "" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#FAF9F6] py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-3"
            >
              Galeria
            </motion.p>
            <motion.div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-['Playfair_Display'] text-[#1C1917] text-4xl md:text-5xl font-light"
              >
                Momentos
              </motion.h2>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#1C1917]/50 text-sm font-['Libre_Franklin'] max-w-xs leading-relaxed"
          >
            A mesa, o prato, o mar. Cada visita é uma memória.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group cursor-pointer ${
                i === 0 ? "row-span-2" : ""
              } ${i === 3 ? "row-span-2" : ""}`}
            >
              {/* Simulated photography with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} transition-transform duration-700 group-hover:scale-105`} />
              {/* Grain */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px",
                }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1C1917]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                <span className="text-[#FAF9F6] text-sm font-['Libre_Franklin'] tracking-[0.15em] uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
