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
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#1D3557]">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Deep ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D3557] via-[#1D3557]/90 to-[#1D3557]" />
        {/* Warm coral overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/15 via-transparent to-[#D4A574]/10" />
        {/* Gold shimmer */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#D4A574]/8 to-transparent" />

        {/* Shell motif SVG pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="shell-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40,10 C55,10 65,22 65,38 C65,54 55,66 40,70 C25,66 15,54 15,38 C15,22 25,10 40,10 Z M40,20 C50,20 57,28 57,38 C57,48 50,56 40,58 C30,56 23,48 23,38 C23,28 30,20 40,20 Z M40,10 L38,30 M40,10 L42,30 M40,10 L35,28 M40,10 L45,28 M40,10 L32,25 M40,10 L48,25"
                stroke="#D4A574"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shell-pattern)" />
        </svg>

        {/* Wave decoration bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-15"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,50 C240,10 480,90 720,50 C960,10 1200,90 1440,50 L1440,100 L0,100 Z"
            fill="#D4A574"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full opacity-8"
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,18 1440,35 L1440,70 L0,70 Z"
            fill="#E63946"
          />
        </svg>

        {/* Grain texture */}
        <div
          className="absolute inset-0 z-10 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 px-5 py-2 border border-[#D4A574]/40 rounded-full bg-[#D4A574]/8 backdrop-blur-sm"
        >
          <span
            className="text-[#D4A574] text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Figueira da Foz · Desde 1978
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[#D4A574]/60 text-xs tracking-[0.35em] uppercase mb-5"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          A Casa do Marisco
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[#FFF1E6] text-[clamp(3rem,11vw,8.5rem)] leading-[0.9] tracking-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Marisqueira
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="text-[#D4A574] text-[clamp(3rem,11vw,8.5rem)] leading-[0.9] tracking-tight italic font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Rosa Amélia
          </motion.h1>
        </div>

        {/* Decorative shell divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.0, ease: "easeOut" }}
          className="flex items-center gap-4 my-4"
        >
          <div className="w-16 h-px bg-[#E63946]/50" />
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="text-[#D4A574]/60">
            <path
              d="M12,2 C18,2 22,7 22,12 C22,17 18,20 12,20 C6,20 2,17 2,12 C2,7 6,2 12,2 Z M12,2 L11,10 M12,2 L13,10 M12,2 L9.5,9 M12,2 L14.5,9 M12,2 L8,8 M12,2 L16,8"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <div className="w-16 h-px bg-[#E63946]/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="text-[#FFF1E6]/65 text-sm md:text-base tracking-[0.2em] uppercase mt-2"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Marisco Fresco · Tradição Portuguesa
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <a
            href="#reservas"
            className="px-8 py-3.5 bg-[#E63946] text-white text-sm tracking-[0.15em] uppercase rounded-sm hover:bg-[#E63946]/90 transition-colors"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="px-8 py-3.5 border border-[#D4A574]/50 text-[#D4A574] text-sm tracking-[0.15em] uppercase rounded-sm hover:border-[#D4A574] hover:bg-[#D4A574]/8 transition-colors"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Ver Ementa
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[#D4A574]/50 text-[10px] tracking-[0.3em] uppercase">
            Descobrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#D4A574]/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
