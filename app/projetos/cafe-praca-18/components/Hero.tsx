"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with warm café gradient */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #3C1518 0%, #6B2D32 35%, #3C1518 65%, #2A0E10 100%)",
          }}
        />
        {/* Warm light overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(181,166,66,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(232,213,183,0.08) 0%, transparent 50%)",
          }}
        />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative brass coffee cup motif */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="cafe-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                <circle cx="80" cy="80" r="35" fill="none" stroke="#B5A642" strokeWidth="0.8" />
                <circle cx="80" cy="80" r="20" fill="none" stroke="#B5A642" strokeWidth="0.5" />
                <line x1="80" y1="45" x2="80" y2="115" stroke="#B5A642" strokeWidth="0.3" />
                <line x1="45" y1="80" x2="115" y2="80" stroke="#B5A642" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cafe-pattern)" />
          </svg>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border"
          style={{
            borderColor: "rgba(181,166,66,0.5)",
            backgroundColor: "rgba(181,166,66,0.12)",
            color: "#B5A642",
          }}
        >
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium tracking-widest uppercase">
            9.6 / 10 — O Mais Bem Avaliado
          </span>
          <Star className="w-4 h-4 fill-current" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-domine), serif",
            color: "#E8D5B7",
          }}
        >
          Café Praça 18
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl mb-4"
          style={{ color: "rgba(232,213,183,0.7)", fontFamily: "var(--font-domine), serif" }}
        >
          O Coração da Figueira
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(181,166,66,0.5)" }} />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#B5A642" }}
          />
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(181,166,66,0.5)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-base md:text-lg tracking-widest uppercase mb-12"
          style={{ color: "rgba(181,166,66,0.7)", letterSpacing: "0.15em" }}
        >
          Pequenos-Almoços · Almoços · Pastéis · Café
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="inline-block px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#B5A642",
              color: "#3C1518",
              borderRadius: "2px",
            }}
          >
            Ver Ementa
          </a>
          <a
            href="#location"
            className="inline-block px-8 py-4 text-sm font-semibold tracking-widest uppercase border transition-all duration-300 hover:bg-white/10"
            style={{
              borderColor: "rgba(232,213,183,0.4)",
              color: "#E8D5B7",
              borderRadius: "2px",
            }}
          >
            Como Chegar
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: "rgba(181,166,66,0.6)" }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #FFF8F0)",
        }}
      />
    </section>
  );
}
