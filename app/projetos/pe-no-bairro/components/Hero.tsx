"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#171717]"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )`,
          }}
        />
      </div>

      {/* Mustard accent block */}
      <motion.div
        style={{ y }}
        className="absolute top-0 right-0 w-1/3 h-full bg-[#EAB308] opacity-10 skew-x-6 translate-x-12"
      />

      {/* Brick red accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#EAB308]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#EAB308]/10 border border-[#EAB308]/30 rounded-full px-4 py-2 mb-8"
        >
          <MapPin size={14} className="text-[#EAB308]" />
          <span className="text-[#EAB308] text-sm font-medium tracking-widest uppercase font-[family-name:var(--font-inter)]">
            Figueira da Foz
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tight text-white mb-6">
            Pé no
            <br />
            <span className="text-[#EAB308]">Bairro</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
        >
          <div className="w-12 h-0.5 bg-[#EAB308]" />
          <p className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl text-[#A3A3A3] font-medium tracking-wide">
            Cozinha de Bairro com Alma
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#A3A3A3] max-w-xl leading-relaxed mb-12"
        >
          Um restaurante que nasceu do bairro, para o bairro. Comida portuguesa
          honesta, feita com ingredientes frescos e muito carinho. Aqui, toda a
          gente é bem-vinda.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reservas"
            className="inline-flex items-center justify-center gap-2 bg-[#EAB308] text-[#171717] font-[family-name:var(--font-space-grotesk)] font-bold px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#ca9a06] transition-colors duration-200"
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="inline-flex items-center justify-center gap-2 border border-[#A3A3A3]/40 text-[#A3A3A3] font-[family-name:var(--font-space-grotesk)] font-medium px-8 py-4 text-sm tracking-widest uppercase hover:border-[#EAB308] hover:text-[#EAB308] transition-colors duration-200"
          >
            Ver Ementa
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-[#EAB308]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
