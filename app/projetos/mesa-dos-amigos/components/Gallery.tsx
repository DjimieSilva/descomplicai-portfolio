"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryItems = [
  {
    label: "Pad Thai clássico com camarão",
    category: "Pratos",
    color: "#EAB308",
    size: "large",
    gradient: "from-amber-900 via-yellow-800 to-amber-950",
    icon: "🍜",
    detail: "Noodles wok, camarão tigre, ovo, amendoins",
  },
  {
    label: "Interior do restaurante",
    category: "Espaço",
    color: "#EC4899",
    size: "small",
    gradient: "from-pink-950 via-rose-900 to-pink-950",
    icon: "🏮",
    detail: "Lanternas vermelhas e decoração tailandesa",
  },
  {
    label: "Curry verde com frango",
    category: "Pratos",
    color: "#059669",
    size: "small",
    gradient: "from-emerald-950 via-green-900 to-emerald-950",
    icon: "🍛",
    detail: "Pasta de curry fresca, leite de coco, beringela Thai",
  },
  {
    label: "Tom Yum fumegante",
    category: "Sopas",
    color: "#991B1B",
    size: "small",
    gradient: "from-red-950 via-red-900 to-red-950",
    icon: "🥣",
    detail: "Camarão, cogumelos, lemongrass, chili",
  },
  {
    label: "Thai Sunset cocktail",
    category: "Bebidas",
    color: "#F97316",
    size: "small",
    gradient: "from-orange-950 via-orange-900 to-orange-950",
    icon: "🍹",
    detail: "Vodka, coco, manga, espuma de lemongrass",
  },
  {
    label: "Mesa preparada ao pôr do sol",
    category: "Espaço",
    color: "#EAB308",
    size: "large",
    gradient: "from-yellow-950 via-amber-900 to-yellow-950",
    icon: "🌅",
    detail: "Vista para a Figueira da Foz",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="galeria"
      className="relative py-24 md:py-32"
      style={{ background: "#292524" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Galeria
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Uma Viagem Visual
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                item.size === "large" ? "col-span-2 md:col-span-1" : ""
              }`}
              style={{ aspectRatio: item.size === "large" ? "16/9" : "4/3" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Simulated image with gradient + large emoji */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id={`gal-pat-${i}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                      <circle cx="12.5" cy="12.5" r="4" fill="none" stroke={item.color} strokeWidth="0.5" />
                      <path d="M12.5 8.5 Q16 12.5 12.5 16.5 Q9 12.5 12.5 8.5Z" fill="none" stroke={item.color} strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#gal-pat-${i})`} />
                </svg>
              </div>

              {/* Central emoji/icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: hovered === i ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl md:text-6xl select-none"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}
              >
                <span
                  className="text-xs px-2 py-0.5 rounded-full w-fit mb-2"
                  style={{
                    background: `${item.color}25`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {item.category}
                </span>
                <p
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {item.detail}
                </p>
              </motion.div>

              {/* Default label */}
              <motion.div
                className="absolute bottom-3 left-3 right-3"
                animate={{ opacity: hovered === i ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <p
                  className="text-xs text-white font-medium"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                >
                  {item.label}
                </p>
              </motion.div>

              {/* Border */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300"
                style={{
                  border: hovered === i
                    ? `1px solid ${item.color}60`
                    : "1px solid rgba(245,240,232,0.08)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <p
            className="text-sm"
            style={{ color: "rgba(245,240,232,0.5)" }}
          >
            Siga-nos{" "}
            <span style={{ color: "#EC4899" }}>@mesadosamigos.ffoz</span>{" "}
            para mais momentos exóticos
          </p>
        </motion.div>
      </div>
    </section>
  );
}
