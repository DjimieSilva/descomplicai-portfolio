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
      {/* Background gradient */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a0a0a 0%, #291010 30%, #3d1515 55%, #1e1a18 100%)",
          }}
        />

        {/* Thai lantern pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 1200 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="thai-pattern"
                x="0"
                y="0"
                width="160"
                height="160"
                patternUnits="userSpaceOnUse"
              >
                {/* Lotus petal motif */}
                <ellipse cx="80" cy="30" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" />
                <ellipse cx="110" cy="50" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" transform="rotate(60 110 50)" />
                <ellipse cx="110" cy="110" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" transform="rotate(120 110 110)" />
                <ellipse cx="80" cy="130" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" transform="rotate(180 80 130)" />
                <ellipse cx="50" cy="110" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" transform="rotate(240 50 110)" />
                <ellipse cx="50" cy="50" rx="10" ry="22" fill="none" stroke="#EAB308" strokeWidth="0.8" transform="rotate(300 50 50)" />
                <circle cx="80" cy="80" r="6" fill="none" stroke="#EAB308" strokeWidth="0.8" />
                {/* Lantern dot */}
                <circle cx="80" cy="80" r="2" fill="#EAB308" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#thai-pattern)" />
          </svg>
        </div>

        {/* Gold accent gradient top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, transparent, #EAB308, #991B1B, #EAB308, transparent)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </motion.div>

      {/* Floating lantern decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[
          { top: "10%", left: "8%", delay: 0, scale: 1 },
          { top: "15%", right: "10%", delay: 0.4, scale: 0.7 },
          { top: "60%", left: "5%", delay: 0.8, scale: 0.5 },
          { top: "70%", right: "8%", delay: 0.2, scale: 0.8 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ ...pos }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.25, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 1, delay: pos.delay },
              y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut", delay: pos.delay },
            }}
          >
            <svg
              width={40 * (pos.scale as number)}
              height={60 * (pos.scale as number)}
              viewBox="0 0 40 60"
            >
              <rect x="15" y="0" width="10" height="5" rx="2" fill="#EAB308" />
              <ellipse cx="20" cy="32" rx="16" ry="22" fill="#991B1B" opacity="0.9" />
              <ellipse cx="20" cy="32" rx="10" ry="16" fill="#EAB308" opacity="0.3" />
              <line x1="20" y1="54" x2="20" y2="60" stroke="#EAB308" strokeWidth="1.5" />
              <line x1="18" y1="58" x2="22" y2="60" stroke="#EAB308" strokeWidth="1" />
              {/* Lantern lines */}
              <line x1="4" y1="20" x2="36" y2="20" stroke="#EAB308" strokeWidth="0.5" opacity="0.5" />
              <line x1="4" y1="32" x2="36" y2="32" stroke="#EAB308" strokeWidth="0.5" opacity="0.5" />
              <line x1="4" y1="44" x2="36" y2="44" stroke="#EAB308" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(234,179,8,0.15)",
            border: "1px solid rgba(234,179,8,0.4)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#EAB308">
            <path d="M12 2L14.09 8.26L20.18 9L15.09 13.74L16.36 20L12 16.77L7.64 20L8.91 13.74L3.82 9L9.91 8.26L12 2Z" />
          </svg>
          <span
            className="text-sm tracking-widest uppercase"
            style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
          >
            9.2 / 10 — O Único Thai da Costa
          </span>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, transparent, #EAB308)" }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#EC4899" opacity="0.8">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, #EAB308, transparent)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm tracking-[0.5em] uppercase mb-4"
          style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
        >
          Figueira da Foz · Tailândia
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-3 leading-tight"
          style={{
            fontFamily: "var(--font-sora)",
            color: "#F5F0E8",
            textShadow: "0 4px 40px rgba(153,27,27,0.5)",
          }}
        >
          Mesa dos Amigos
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-3xl mb-3 italic"
          style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
        >
          Sabores da Tailândia
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(245,240,232,0.75)" }}
        >
          A Tailândia Chegou à Figueira da Foz. Uma viagem de sabores exóticos
          que funde o oriente com a costa atlântica portuguesa.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "#991B1B",
              color: "#F5F0E8",
              border: "1px solid #991B1B",
              fontFamily: "var(--font-sora)",
              boxShadow: "0 0 30px rgba(153,27,27,0.3)",
            }}
          >
            Reservar Mesa
          </a>
          <a
            href="#menu"
            className="px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              color: "#EAB308",
              border: "1px solid rgba(234,179,8,0.6)",
              fontFamily: "var(--font-sora)",
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
            <ChevronDown size={28} style={{ color: "#EAB308" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #EAB308, #991B1B, #EAB308, transparent)",
        }}
      />
    </section>
  );
}
