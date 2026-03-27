"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CinematicHero() {
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
        {/* Dark green to black gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #1A1A18 0%, #2A3A20 20%, #3D5A3E 45%, #2A2821 70%, #1A1A18 100%)",
          }}
        />

        {/* SVG botanical olive branch pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg
            viewBox="0 0 1440 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="olive-pattern"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                {/* Olive branch */}
                <path
                  d="M30 170 C50 150 70 120 100 100 C130 80 160 70 180 40"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                />
                {/* Olive leaves */}
                <ellipse
                  cx="60"
                  cy="140"
                  rx="12"
                  ry="6"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  transform="rotate(-40 60 140)"
                />
                <ellipse
                  cx="90"
                  cy="110"
                  rx="12"
                  ry="6"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  transform="rotate(-30 90 110)"
                />
                <ellipse
                  cx="120"
                  cy="88"
                  rx="12"
                  ry="6"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  transform="rotate(-25 120 88)"
                />
                <ellipse
                  cx="150"
                  cy="62"
                  rx="12"
                  ry="6"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1"
                  transform="rotate(-20 150 62)"
                />
                {/* Olives */}
                <circle cx="75" cy="128" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <circle cx="135" cy="75" r="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                {/* Small leaves on opposite side */}
                <ellipse
                  cx="80"
                  cy="118"
                  rx="10"
                  ry="5"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.8"
                  transform="rotate(30 80 118)"
                />
                <ellipse
                  cx="140"
                  cy="68"
                  rx="10"
                  ry="5"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.8"
                  transform="rotate(35 140 68)"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#olive-pattern)" />
          </svg>
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to top, #1A1A18, transparent)",
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
          <div className="h-px w-20" style={{ background: "#C9A96E" }} />
          <span
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
          >
            Paisagismo de Autor &middot; Algarve
          </span>
          <div className="h-px w-20" style={{ background: "#C9A96E" }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          className="font-bold leading-none mb-4"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#F5F0E8",
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
        >
          Jardim<br />
          <em style={{ color: "#C9A96E" }}>Algarvio</em>
        </motion.h1>

        {/* Divider ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-4 my-6"
        >
          <div
            className="h-px flex-1 max-w-28"
            style={{ background: "rgba(201,169,110,0.5)" }}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 C8 6 4 10 4 14 C4 18.4 7.6 22 12 22 C16.4 22 20 18.4 20 14 C20 10 16 6 12 2Z"
              stroke="#C9A96E"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 8 L12 16 M9 12 C9 14 10.5 16 12 16 C13.5 16 15 14 15 12"
              stroke="#C9A96E"
              strokeWidth="1"
            />
          </svg>
          <div
            className="h-px flex-1 max-w-28"
            style={{ background: "rgba(201,169,110,0.5)" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "rgba(245,240,232,0.85)",
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
          }}
        >
          Transformamos espa&ccedil;os exteriores em obras de arte vivas.
          Arquitetura paisagista exclusiva com plantas mediterr&acirc;nicas nativas e design de autor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projetos"
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "#C9A96E",
              color: "#1A1A18",
              fontFamily: "var(--font-inter)",
            }}
          >
            Ver Projetos
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#C9A96E",
              border: "1px solid #C9A96E",
              fontFamily: "var(--font-inter)",
            }}
          >
            Consulta Gratuita
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
            <ChevronDown size={28} style={{ color: "#C9A96E" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gold bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)",
        }}
      />
    </section>
  );
}
