"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, MapPin, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToNext = () => {
    const el = document.getElementById("concept");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient Sky Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#1B3F72] via-40% to-[#FF6B35]/80" />
        {/* Sun glow */}
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-40 h-40 bg-[#FF6B35]/30 rounded-full blur-[50px]" />
      </motion.div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="#0077B6"
            opacity="0.6"
          />
          <path
            d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,80 1440,80 L1440,120 L0,120 Z"
            fill="#005F8F"
            opacity="0.8"
          />
          <path
            d="M0,100 C480,60 960,110 1440,90 L1440,120 L0,120 Z"
            fill="#0A1628"
          />
        </svg>
      </div>

      {/* Floating surf board decorative element */}
      <div className="absolute top-20 right-8 md:right-20 opacity-20 rotate-12">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
          <ellipse cx="20" cy="60" rx="18" ry="55" fill="#FF6B35" />
          <line
            x1="20"
            y1="5"
            x2="20"
            y2="115"
            stroke="#F4E4C1"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute top-32 left-8 md:left-20 opacity-15 -rotate-6">
        <svg width="30" height="90" viewBox="0 0 30 90" fill="none">
          <ellipse cx="15" cy="45" rx="13" ry="42" fill="#0077B6" />
          <line
            x1="15"
            y1="3"
            x2="15"
            y2="87"
            stroke="#F4E4C1"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
        >
          <MapPin size={14} className="text-[#FF6B35]" />
          <span className="text-sm font-medium text-white/90">
            Praia de Cabedelo · Figueira da Foz
          </span>
          <div className="w-px h-4 bg-white/20" />
          <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
          <span className="text-sm font-bold text-[#FFD700]">9.3</span>
        </motion.div>

        {/* Main Logo/Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-tighter text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            NALU
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[clamp(1rem,3vw,1.5rem)] text-[#F4E4C1] font-light tracking-widest uppercase mt-2 mb-6"
        >
          Onde o Mar Encontra o Sabor
        </motion.p>

        {/* Sub description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Bar de praia com alma de surf. Petiscos frescos, cocktails tropicais e
          o pôr do sol mais bonito de Portugal.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="bg-[#FF6B35] hover:bg-[#e55a24] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Ver Menu
          </a>
          <a
            href="#location"
            className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Como Chegar
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.button>
    </section>
  );
}
