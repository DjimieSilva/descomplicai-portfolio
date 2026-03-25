"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Anchor, Fish } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#1E3A5F" }}
    >
      {/* Rope texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9B896 0px,
            #C9B896 1px,
            transparent 1px,
            transparent 12px
          ), repeating-linear-gradient(
            -45deg,
            #C9B896 0px,
            #C9B896 1px,
            transparent 1px,
            transparent 12px
          )`,
        }}
      />

      {/* Ocean wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full" fill="#F9FAFB">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Anchor icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Anchor className="w-16 h-16 text-[#C9B896]" strokeWidth={1.5} />
            <div className="absolute -inset-4 border border-[#C9B896]/30 rounded-full" />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Tasca Da Praia
        </motion.h1>

        {/* Divider with fish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-4 my-6"
        >
          <div className="h-px bg-[#C9B896]/60 w-20 md:w-32" />
          <Fish className="w-5 h-5 text-[#C9B896]" />
          <div className="h-px bg-[#C9B896]/60 w-20 md:w-32" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-[#C9B896] font-light tracking-widest uppercase mb-4"
        >
          Sabor de Buarcos
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Peixe Fresco do Dia, Tradição de Buarcos.<br />
          Na rua dos pescadores, desde sempre.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="px-8 py-4 bg-[#C9B896] text-[#1E3A5F] font-bold rounded text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
          >
            Ver Ementa
          </a>
          <a
            href="#reservas"
            className="px-8 py-4 border border-[#C9B896]/60 text-[#C9B896] font-semibold rounded text-sm uppercase tracking-widest hover:border-white hover:text-white transition-colors duration-300"
          >
            Reservar Mesa
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#C9B896]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
