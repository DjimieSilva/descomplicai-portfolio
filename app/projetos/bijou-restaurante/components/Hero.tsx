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
              "linear-gradient(135deg, #4A3728 0%, #800020 40%, #2C1810 100%)",
          }}
        />
        {/* Vintage texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Art Nouveau decorative lines */}
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="heritage-pattern"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60 10 Q80 30 60 60 Q40 30 60 10Z"
                  fill="none"
                  stroke="#CFB53B"
                  strokeWidth="1"
                />
                <circle cx="60" cy="60" r="20" fill="none" stroke="#CFB53B" strokeWidth="0.5" />
                <path
                  d="M10 60 Q30 40 60 60 Q30 80 10 60Z"
                  fill="none"
                  stroke="#CFB53B"
                  strokeWidth="1"
                />
                <path
                  d="M110 60 Q90 40 60 60 Q90 80 110 60Z"
                  fill="none"
                  stroke="#CFB53B"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heritage-pattern)" />
          </svg>
        </div>
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-32" style={{ background: "#CFB53B" }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#CFB53B">
            <path d="M12 2L14.09 8.26L20.18 9L15.09 13.74L16.36 20L12 16.77L7.64 20L8.91 13.74L3.82 9L9.91 8.26L12 2Z" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: "#CFB53B" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
        >
          Figueira da Foz · Desde 1912
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-7xl md:text-9xl font-bold mb-6 leading-none"
          style={{
            fontFamily: "var(--font-eb-garamond)",
            color: "#FFFFF0",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          Bijou
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px flex-1 max-w-24" style={{ background: "rgba(207,181,59,0.5)" }} />
          <p
            className="text-xl md:text-2xl italic"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#CFB53B" }}
          >
            Restaurante
          </p>
          <div className="h-px flex-1 max-w-24" style={{ background: "rgba(207,181,59,0.5)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,240,0.85)", fontFamily: "var(--font-source-sans-3)" }}
        >
          Mais de 110 anos de tradição gastronómica portuguesa,
          transmitida de geração em geração no coração da Figueira da Foz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "#800020",
              color: "#FFFFF0",
              border: "1px solid #800020",
              fontFamily: "var(--font-source-sans-3)",
            }}
          >
            Reservar Mesa
          </a>
          <a
            href="#menu"
            className="px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#CFB53B",
              border: "1px solid #CFB53B",
              fontFamily: "var(--font-source-sans-3)",
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
            <ChevronDown size={28} style={{ color: "#CFB53B" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #CFB53B, transparent)" }}
      />
    </section>
  );
}
