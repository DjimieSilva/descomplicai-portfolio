"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[#1B4332]"
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #B87333 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4332]/40 via-transparent to-[#1B4332]/80" />
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute top-16 left-8 right-8 h-px bg-[#B87333]/40 origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-24 left-8 right-8 h-px bg-[#B87333]/40 origin-right"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-[#B87333]" />
          <span
            className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Figueira da Foz · Desde 1987
          </span>
          <div className="h-px w-12 bg-[#B87333]" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-light text-[#FFFBEB] mb-4 leading-none tracking-tight"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          O Picadeiro
        </motion.h1>

        {/* Copper divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-0.5 bg-[#B87333] mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-[#FFFBEB]/80 font-light mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-literata)", fontStyle: "italic" }}
        >
          Referência Gastronómica na Figueira da Foz
        </motion.p>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm tracking-[0.2em] uppercase text-[#FFFBEB]/50 mb-12"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Cozinha Portuguesa · Ingredientes Sazonais · Experiência Refinada
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#reservas"
            className="group inline-flex items-center gap-3 bg-[#B87333] text-[#FFFBEB] px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#FFFBEB] hover:text-[#1B4332]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reservar Mesa
            <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
          </a>
          <a
            href="#ementa"
            className="inline-flex items-center gap-3 border border-[#FFFBEB]/30 text-[#FFFBEB]/80 px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#B87333] hover:text-[#B87333]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Ver Ementa
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#FFFBEB]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
