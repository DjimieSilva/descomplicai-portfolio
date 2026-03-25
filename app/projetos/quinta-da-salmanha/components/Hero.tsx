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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="inicio"
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Estate gradient — rolling hills, vineyard, stone walls feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #2D3A1E 0%, #4A5E2A 25%, #556B2F 45%, #722F37 75%, #3D1A20 100%)",
          }}
        />
        {/* Linen/stone texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Pastoral botanical pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            viewBox="0 0 1440 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="botanical"
                x="0"
                y="0"
                width="160"
                height="160"
                patternUnits="userSpaceOnUse"
              >
                {/* Grape vine motif */}
                <path
                  d="M80 20 C60 40 40 60 50 90 C60 120 90 130 80 160"
                  fill="none"
                  stroke="#FEFCE8"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="90" r="12" fill="none" stroke="#FEFCE8" strokeWidth="1" />
                <circle cx="65" cy="70" r="8" fill="none" stroke="#FEFCE8" strokeWidth="1" />
                <path
                  d="M50 90 C30 80 20 60 40 50"
                  fill="none"
                  stroke="#FEFCE8"
                  strokeWidth="1"
                />
                <path
                  d="M50 90 C70 80 80 60 100 70"
                  fill="none"
                  stroke="#FEFCE8"
                  strokeWidth="1"
                />
                {/* Leaf shapes */}
                <ellipse cx="40" cy="50" rx="10" ry="15" fill="none" stroke="#FEFCE8" strokeWidth="0.8" transform="rotate(-30 40 50)" />
                <ellipse cx="100" cy="70" rx="10" ry="15" fill="none" stroke="#FEFCE8" strokeWidth="0.8" transform="rotate(20 100 70)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#botanical)" />
          </svg>
        </div>
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to top, rgba(45,58,30,0.8), transparent)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-20" style={{ background: "#C4A55A" }} />
          <span
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
          >
            Figueira da Foz · Quinta Histórica
          </span>
          <div className="h-px w-20" style={{ background: "#C4A55A" }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          className="font-bold leading-none mb-4"
          style={{
            fontFamily: "var(--font-libre-caslon)",
            color: "#FEFCE8",
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          Quinta da<br />
          <em style={{ color: "#C4A55A" }}>Salmanha</em>
        </motion.h1>

        {/* Divider ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-4 my-6"
        >
          <div className="h-px flex-1 max-w-28" style={{ background: "rgba(196,165,90,0.5)" }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#C4A55A">
            <path d="M10 1 L11.8 7.2 L18 7.2 L13 11 L14.8 17.2 L10 13.5 L5.2 17.2 L7 11 L2 7.2 L8.2 7.2 Z" />
          </svg>
          <div className="h-px flex-1 max-w-28" style={{ background: "rgba(196,165,90,0.5)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "rgba(254,252,232,0.88)",
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
          }}
        >
          Uma experiência gastronómica única, entre muros de pedra e o suave fluir do rio.
          Cozinha tradicional portuguesa, buffet diário e eventos inesquecíveis numa quinta de charme.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "#722F37",
              color: "#FEFCE8",
              fontFamily: "var(--font-inter)",
            }}
          >
            Reservar Mesa
          </a>
          <a
            href="#eventos"
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#C4A55A",
              border: "1px solid #C4A55A",
              fontFamily: "var(--font-inter)",
            }}
          >
            Eventos &amp; Casamentos
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <ChevronDown size={28} style={{ color: "#C4A55A" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gold bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #C4A55A 30%, #C4A55A 70%, transparent)",
        }}
      />
    </section>
  );
}
