"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Award, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E293B]">
      {/* Background pattern */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] via-[#1E293B]/90 to-[#1E293B]" />
        {/* Decorative geometric pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
        {/* Radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/8 blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-full px-4 py-2 mb-8"
        >
          <Award className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[#F59E0B] text-sm font-medium tracking-wider uppercase">
            Seleção Gastronomia e Vinhos
          </span>
          <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#FFFDF7] mb-4 leading-none tracking-tight"
          style={{ fontFamily: "'Work Sans', sans-serif" }}
        >
          Cataventos
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-0.5 bg-[#F59E0B] mx-auto mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[#FFFDF7]/70 text-lg md:text-xl mb-4 font-light tracking-wide"
        >
          Gastronomia Portuguesa de Excelência
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[#FFFDF7]/50 text-sm md:text-base tracking-widest uppercase"
        >
          Figueira da Foz
        </motion.p>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 inline-flex items-center gap-3 border border-[#FFFDF7]/10 rounded-lg px-6 py-3"
        >
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <Star className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
          </div>
          <span className="text-[#FFFDF7] font-bold text-xl">8.1</span>
          <span className="text-[#FFFDF7]/40 text-sm">/10</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#B45309] text-[#1E293B] font-semibold px-8 py-4 rounded-sm transition-all duration-300 tracking-wide text-sm uppercase"
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="inline-flex items-center justify-center gap-2 border border-[#FFFDF7]/20 hover:border-[#F59E0B]/60 text-[#FFFDF7] hover:text-[#F59E0B] font-medium px-8 py-4 rounded-sm transition-all duration-300 tracking-wide text-sm uppercase"
          >
            Ver Ementa
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-[#FFFDF7]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
