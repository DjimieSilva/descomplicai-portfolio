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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#1a1410]">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Layered gradients simulating beach/ocean at golden hour */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E7490]/30 via-[#1a1410]/50 to-[#1a1410]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/10 via-transparent to-[#0E7490]/20" />
        {/* Sand stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#DDB892]/12 via-[#9A8C72]/5 to-transparent" />
        {/* Ocean shimmer at top */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#0E7490]/25 to-transparent" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 z-10 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        {/* Wave shapes */}
        <svg
          className="absolute bottom-8 left-0 w-full opacity-10"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
            fill="#DDB892"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full opacity-8"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
            fill="#9A8C72"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 px-5 py-2 border border-[#DDB892]/40 rounded-full bg-[#DDB892]/8 backdrop-blur-sm"
        >
          <span
            className="text-[#DDB892] text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Distinguido · Seleção Gastronomia &amp; Vinhos
          </span>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[#DDB892]/60 text-xs tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Figueira da Foz · Praia
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[#FAF8F4] text-[clamp(4.5rem,17vw,13rem)] leading-[0.85] tracking-tight font-light"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Pé na
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="text-[#DDB892] text-[clamp(4.5rem,17vw,13rem)] leading-[0.85] tracking-tight font-light italic"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Areia
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
          className="w-20 h-px bg-[#F97316]/60 my-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="text-[#DDB892]/75 text-sm md:text-base tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
        >
          Sabor com Vista Mar
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[#9A8C72]/60 text-[10px] tracking-[0.3em] uppercase">
            Descobrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#9A8C72]/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
