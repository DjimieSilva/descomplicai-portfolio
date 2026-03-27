"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Palette, Hammer, Leaf } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Visita & Consulta",
    description:
      "Avaliamos o espaço, solo, exposição solar e as suas expectativas. Cada projeto começa com uma conversa e uma visita detalhada ao local.",
    Icon: Eye,
  },
  {
    number: "02",
    title: "Projeto & Design",
    description:
      "Plano paisagístico detalhado com plantas 3D, seleção de espécies, definição de materiais e sistema de rega. Tudo personalizado.",
    Icon: Palette,
  },
  {
    number: "03",
    title: "Execução",
    description:
      "Equipa especializada transforma o projeto em realidade. Preparação de terreno, plantação, instalação de rega e acabamentos.",
    Icon: Hammer,
  },
  {
    number: "04",
    title: "Manutenção",
    description:
      "Cuidado contínuo para um jardim sempre impecável. Poda, fertilização, ajustes de rega e acompanhamento sazonal.",
    Icon: Leaf,
  },
];

export default function DesignProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: "#2A2821" }}
      id="processo"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Metodologia
            </span>
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            O Nosso <span style={{ color: "#C9A96E" }}>Processo</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] origin-left"
            style={{ background: "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.3), #C9A96E)" }}
          />

          {/* Connecting line — mobile/tablet (vertical) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="lg:hidden absolute top-0 bottom-0 left-8 w-[2px] origin-top"
            style={{ background: "linear-gradient(180deg, #C9A96E, rgba(201,169,110,0.3), #C9A96E)" }}
          />

          {/* Desktop: horizontal layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="relative text-center"
              >
                {/* Circle node */}
                <div
                  className="w-[120px] h-[120px] mx-auto mb-8 rounded-full flex items-center justify-center relative"
                  style={{
                    background: "rgba(201,169,110,0.08)",
                    border: "2px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <phase.Icon size={32} style={{ color: "#C9A96E" }} />
                  {/* Number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "#C9A96E",
                      color: "#1A1A18",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {phase.number}
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet: vertical layout */}
          <div className="lg:hidden space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="relative pl-20"
              >
                {/* Circle node on the line */}
                <div
                  className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(201,169,110,0.08)",
                    border: "2px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <phase.Icon size={24} style={{ color: "#C9A96E" }} />
                </div>

                <div
                  className="text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
                >
                  Fase {phase.number}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
