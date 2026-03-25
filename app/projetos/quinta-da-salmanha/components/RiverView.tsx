"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function RiverView() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="terraco"
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax river-view background */}
      <motion.div
        ref={bgRef}
        style={{ y: bgY }}
        className="absolute inset-[-20%] z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1A2E4A 0%, #2C4E7A 20%, #4A7A9B 40%, #5E9B8A 60%, #556B2F 80%, #3D2B1F 100%)",
          }}
        />
        {/* River ripple simulation */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 18 }).map((_, i) => (
              <ellipse
                key={i}
                cx={720}
                cy={300 + i * 32}
                rx={400 + i * 20}
                ry={8}
                fill="none"
                stroke="#FEFCE8"
                strokeWidth="0.8"
                opacity={0.4 - i * 0.02}
              />
            ))}
            {/* Quinta silhouette */}
            <path
              d="M0 600 L200 550 L240 520 L260 500 L280 520 L400 540 L500 530 L600 560 L700 540 L800 550 L900 530 L1000 545 L1100 520 L1150 510 L1200 530 L1300 545 L1440 560 L1440 900 L0 900 Z"
              fill="rgba(45,58,30,0.6)"
            />
          </svg>
        </div>
        {/* Overlay gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(61,43,31,0.75) 0%, rgba(45,58,30,0.55) 50%, rgba(26,46,74,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.5em] uppercase mb-5"
          style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
        >
          Terraço com Vista Rio
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
        >
          Jantar com o Mondego
          <br />
          <em style={{ color: "#C4A55A" }}>aos seus pés</em>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="w-20 h-[2px] mx-auto mb-8"
          style={{ background: "#722F37" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(254,252,232,0.85)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          O nosso terraço exterior abre-se sobre o rio Mondego, proporcionando uma das mais
          belas vistas da região de Figueira da Foz. O cenário ideal para um jantar romântico,
          uma celebração em família ou simplesmente um momento de quietude.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "180°", label: "Vista Panorâmica" },
            { value: "80", label: "Lugares Exteriores" },
            { value: "12h", label: "Ao pôr-do-sol" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: "var(--font-libre-caslon)", color: "#C4A55A" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-wide uppercase"
                style={{ color: "rgba(254,252,232,0.65)", fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative gold horizontal rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #C4A55A 40%, #C4A55A 60%, transparent)",
        }}
      />
    </section>
  );
}
