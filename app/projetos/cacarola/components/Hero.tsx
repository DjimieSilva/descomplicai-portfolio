"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #7C2D12 0%, #C2410C 40%, #92400E 75%, #451A03 100%)",
          }}
        />

        {/* Azulejo-inspired tile pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="azulejo"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                {/* Tile border */}
                <rect x="2" y="2" width="76" height="76" fill="none" stroke="#FFFBEB" strokeWidth="1.5" />
                <rect x="8" y="8" width="64" height="64" fill="none" stroke="#FFFBEB" strokeWidth="0.5" />
                {/* Corner motifs */}
                <circle cx="2" cy="2" r="3" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                <circle cx="78" cy="2" r="3" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                <circle cx="2" cy="78" r="3" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                <circle cx="78" cy="78" r="3" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                {/* Center flower */}
                <circle cx="40" cy="40" r="8" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                <path d="M40 28 Q44 34 40 40 Q36 34 40 28Z" fill="none" stroke="#FFFBEB" strokeWidth="0.8" />
                <path d="M40 52 Q44 46 40 40 Q36 46 40 52Z" fill="none" stroke="#FFFBEB" strokeWidth="0.8" />
                <path d="M28 40 Q34 44 40 40 Q34 36 28 40Z" fill="none" stroke="#FFFBEB" strokeWidth="0.8" />
                <path d="M52 40 Q46 44 40 40 Q46 36 52 40Z" fill="none" stroke="#FFFBEB" strokeWidth="0.8" />
                {/* Diagonal lines */}
                <path d="M14 14 Q40 30 66 14" fill="none" stroke="#FFFBEB" strokeWidth="0.4" />
                <path d="M14 66 Q40 50 66 66" fill="none" stroke="#FFFBEB" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#azulejo)" />
          </svg>
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Top ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-28" style={{ background: "#FDE68A" }} />
          {/* Clay pot icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M8 22 Q4 20 4 16 Q4 10 14 10 Q24 10 24 16 Q24 20 20 22Z"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M9 10 Q9 6 14 6 Q19 6 19 10" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
            <path d="M11 6 Q10 2 14 2 Q18 2 17 6" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 1" />
            <path d="M8 22 L8 24 Q8 25 9 25 L19 25 Q20 25 20 24 L20 22" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
          </svg>
          <div className="h-px flex-1 max-w-28" style={{ background: "#FDE68A" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs tracking-[0.45em] uppercase mb-5"
          style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
        >
          Figueira da Foz · Cozinha Portuguesa de Tradição
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-8xl md:text-[10rem] font-bold mb-4 leading-none"
          style={{
            fontFamily: "var(--font-source-serif-4)",
            color: "#FFFBEB",
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          Caçarola
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px flex-1 max-w-20" style={{ background: "rgba(253,230,138,0.45)" }} />
          <p
            className="text-xl md:text-2xl italic"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#FDE68A" }}
          >
            Sabores de Portugal
          </p>
          <div className="h-px flex-1 max-w-20" style={{ background: "rgba(253,230,138,0.45)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(255,251,235,0.85)", fontFamily: "var(--font-inter)" }}
        >
          A cozinha que reconheces desde criança. Receitas transmitidas de geração
          em geração, preparadas com os ingredientes da nossa terra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "#C2410C",
              color: "#FFFBEB",
              border: "2px solid #C2410C",
              fontFamily: "var(--font-inter)",
            }}
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#FDE68A",
              border: "2px solid rgba(253,230,138,0.6)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Ver Ementa
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={28} style={{ color: "#FDE68A" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom terracotta border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #FDE68A, transparent)" }}
      />
    </section>
  );
}
