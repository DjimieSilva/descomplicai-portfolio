"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#1C1917]">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Gradient overlay simulating coastal dusk */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/60 via-[#1C1917]/40 to-[#1C1917]/90 z-10" />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 z-20 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        {/* Simulated coastal/sand image via CSS gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2218] via-[#1C1917] to-[#0d0b08]" />
        {/* Horizontal sand stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#D4C5A9]/8 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-[#D4C5A9]/70 text-xs tracking-[0.4em] uppercase mb-8 font-['Libre_Franklin']"
        >
          Murtinheira · Figueira da Foz
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="font-['Playfair_Display'] text-[#FAF9F6] text-[clamp(5rem,18vw,14rem)] leading-[0.85] tracking-tight font-light"
          >
            SAND
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          className="w-24 h-px bg-[#92702B] my-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-[#D4C5A9]/80 text-sm md:text-base tracking-[0.25em] uppercase font-['Libre_Franklin'] font-light"
        >
          Cozinha Contemporânea Portuguesa
        </motion.p>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 flex items-center gap-3 border border-[#92702B]/40 px-5 py-2.5 backdrop-blur-sm"
        >
          <span className="text-[#92702B] text-lg font-['Playfair_Display']">9.7</span>
          <div className="w-px h-4 bg-[#92702B]/40" />
          <span className="text-[#D4C5A9]/70 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin']">
            O melhor da região
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#D4C5A9]/50 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
