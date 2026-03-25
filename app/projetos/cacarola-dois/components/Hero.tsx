"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, ChevronDown, Waves } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const waveY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0C2340]"
    >
      {/* Ocean gradient background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0369A1] to-[#0C2340] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(3,105,161,0.5)_0%,_transparent_70%)]" />
      </motion.div>

      {/* Wave pattern */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-[#F1F5F9]" preserveAspectRatio="none">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* Coral accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FB923C]" aria-hidden="true" />

      {/* Floating sea shimmer orbs */}
      <motion.div
        aria-hidden="true"
        style={{ y: waveY }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0369A1]/30 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#0EA5E9]/20 blur-3xl"
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32"
      >
        {/* Location + brand tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <MapPin size={13} className="text-[#FB923C]" />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase font-[family-name:var(--font-inter)]">
              Figueira da Foz
            </span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FB923C]/20 border border-[#FB923C]/40 rounded-full px-4 py-2 backdrop-blur-sm">
            <Waves size={13} className="text-[#FB923C]" />
            <span className="text-[#FB923C] text-xs font-medium tracking-widest uppercase font-[family-name:var(--font-inter)]">
              Mariscos & Mar
            </span>
          </div>
        </motion.div>

        {/* Brand lineage */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[family-name:var(--font-inter)] text-[#FB923C] text-sm tracking-[0.3em] uppercase mb-4"
        >
          Da família Caçarola
        </motion.p>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h1 className="font-[family-name:var(--font-hanken)] font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-tight text-white mb-2">
            Caçarola
            <br />
            <span className="text-[#FB923C]">Dois</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center gap-4 mb-8 mt-6"
        >
          <div className="w-12 h-0.5 bg-[#FB923C]" />
          <p className="font-[family-name:var(--font-hanken)] text-xl sm:text-2xl text-white/70 font-medium tracking-wide">
            O Mar na Mesa
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-12"
        >
          O segundo capítulo da Caçarola — dedicado ao mar. Frutos do mar
          frescos da costa da Figueira, preparados com técnica contemporânea
          e respeito pelos sabores da nossa costa atlântica.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reservas"
            className="inline-flex items-center justify-center gap-2 bg-[#FB923C] text-white font-[family-name:var(--font-hanken)] font-bold px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#ea7c1e] transition-colors duration-200 rounded-sm"
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/80 font-[family-name:var(--font-hanken)] font-medium px-8 py-4 text-sm tracking-widest uppercase hover:border-[#FB923C] hover:text-[#FB923C] transition-colors duration-200 rounded-sm backdrop-blur-sm"
          >
            Ver Ementa
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-[#FB923C]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
