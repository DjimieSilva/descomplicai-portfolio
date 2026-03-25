"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "lucide-react";

const galleryItems = [
  {
    label: "O Espaço",
    description: "Sala principal com decoração contemporânea e vistas para a cidade",
    aspect: "aspect-[4/5]",
    accent: "#F59E0B",
    size: "large",
  },
  {
    label: "Bacalhau à Lagareiro",
    description: "O nosso prato de assinatura",
    aspect: "aspect-square",
    accent: "#B45309",
    size: "small",
  },
  {
    label: "Carta de Vinhos",
    description: "Seleção curada de vinhos portugueses",
    aspect: "aspect-square",
    accent: "#F59E0B",
    size: "small",
  },
  {
    label: "Ambiente Noturno",
    description: "Uma experiência sensorial completa ao jantar",
    aspect: "aspect-[16/9]",
    accent: "#1E293B",
    size: "wide",
  },
  {
    label: "Sobremesas",
    description: "O doce final de uma refeição de excelência",
    aspect: "aspect-[4/5]",
    accent: "#B45309",
    size: "medium",
  },
  {
    label: "Terraço",
    description: "Espaço exterior para as noites de verão",
    aspect: "aspect-square",
    accent: "#F59E0B",
    size: "medium",
  },
];

function GalleryPlaceholder({
  item,
  index,
  inView,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-sm bg-[#1E293B] cursor-pointer"
    >
      {/* Placeholder visual */}
      <div className="w-full h-full min-h-[200px] flex items-center justify-center relative">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #1E293B 0%, ${item.accent}20 50%, #1E293B 100%)`,
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`gallery-grid-${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0 L30 0 L30 30" fill="none" stroke={item.accent} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gallery-grid-${index})`} />
          </svg>
        </div>

        {/* Center icon */}
        <div className="relative z-10 text-center p-6">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border"
            style={{ borderColor: `${item.accent}40`, backgroundColor: `${item.accent}15` }}
          >
            <Camera className="w-5 h-5" style={{ color: item.accent }} />
          </div>
          <div className="text-[#FFFDF7]/70 font-medium text-sm mb-1">{item.label}</div>
          <div className="text-[#FFFDF7]/30 text-xs">{item.description}</div>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
          style={{ background: `linear-gradient(to top, ${item.accent}CC, transparent)` }}
        >
          <div>
            <div className="text-white font-bold text-base">{item.label}</div>
            <div className="text-white/70 text-xs mt-1">{item.description}</div>
          </div>
        </div>

        {/* Border accent on hover */}
        <div
          className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-60 transition-all duration-300 rounded-sm"
          style={{ borderColor: item.accent }}
        />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="galeria" className="py-24 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <Camera className="w-5 h-5 text-[#F59E0B]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Galeria
          </h2>
          <p className="text-[#FFFDF7]/60 text-lg max-w-xl mx-auto">
            Um vislumbre da experiência Cataventos — o espaço, os pratos, os momentos.
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Large item — spans 2 rows on desktop */}
          <div className="col-span-2 md:col-span-1 md:row-span-2">
            <GalleryPlaceholder item={galleryItems[0]} index={0} inView={inView} />
          </div>

          {/* Small items */}
          <div className="col-span-1">
            <GalleryPlaceholder item={galleryItems[1]} index={1} inView={inView} />
          </div>
          <div className="col-span-1">
            <GalleryPlaceholder item={galleryItems[2]} index={2} inView={inView} />
          </div>

          {/* Wide item */}
          <div className="col-span-2 md:col-span-1">
            <GalleryPlaceholder item={galleryItems[4]} index={4} inView={inView} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <GalleryPlaceholder item={galleryItems[5]} index={5} inView={inView} />
          </div>
        </div>

        {/* Wide bottom item */}
        <div className="mt-4">
          <GalleryPlaceholder item={galleryItems[3]} index={3} inView={inView} />
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-[#FFFDF7]/30 text-sm mt-8 italic"
        >
          Siga-nos no Facebook para as últimas novidades e imagens do restaurante.
        </motion.p>
      </div>
    </section>
  );
}
