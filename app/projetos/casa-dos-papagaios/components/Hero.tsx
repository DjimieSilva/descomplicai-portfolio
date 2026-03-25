"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#78350F]">
      {/* Animated background pattern - market tiles */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #DC2626 0px,
              #DC2626 2px,
              transparent 2px,
              transparent 20px
            ), repeating-linear-gradient(
              -45deg,
              #15803D 0px,
              #15803D 2px,
              transparent 2px,
              transparent 20px
            )`,
          }}
        />
      </div>

      {/* Floating ingredient orbs */}
      {["🍅", "🌿", "🐟", "🧅", "🍋", "🌶️"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 2) * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 tracking-wide uppercase"
        >
          <MapPin size={14} />
          Mercado Municipal da Figueira da Foz
        </motion.div>

        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-[#FEF3C7] leading-none tracking-tight"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Casa dos
            <br />
            <span className="text-[#DC2626]">Papagaios</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-[#FEF3C7]/80 mb-4 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Do Mercado Para o Prato
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-[#FEF3C7]/60 mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A frescura do mercado municipal no seu prato — todos os dias
        </motion.p>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-1 mb-10"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="fill-[#DC2626] text-[#DC2626]" />
          ))}
          <span className="ml-2 text-[#FEF3C7]/70 text-sm">Restaurante Premiado</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="bg-[#DC2626] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#B91C1C] transition-colors duration-200 inline-block"
          >
            Ver a Ementa
          </a>
          <a
            href="#reservas"
            className="border-2 border-[#FEF3C7] text-[#FEF3C7] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FEF3C7] hover:text-[#78350F] transition-colors duration-200 inline-block"
          >
            Reservar Mesa
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} className="text-[#FEF3C7]/50" />
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FEF3C7]">
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
