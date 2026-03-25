"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Eye, Radio, Layers, Zap, Shield } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    name: "Scanner Intraoral 3D",
    description:
      "Digitalização oral de alta precisão sem necessidade de moldes tradicionais. Conforto total para o paciente e resultados mais precisos.",
    badge: "Sem Moldes",
    color: "#2563EB",
  },
  {
    icon: Eye,
    name: "CBCT — Tomografia Cone Beam",
    description:
      "Imagiologia tridimensional de dentes, osso alveolar e estruturas maxilofaciais para diagnóstico cirúrgico e implantológico de excelência.",
    badge: "3D",
    color: "#06B6D4",
  },
  {
    icon: Layers,
    name: "Sistema CAD/CAM",
    description:
      "Fresagem digital de próteses, coroas e facetas cerâmicas em consultório. Restaurações numa única visita com precisão computorizada.",
    badge: "1 Visita",
    color: "#2563EB",
  },
  {
    icon: Radio,
    name: "Radiografia Digital",
    description:
      "Radiografias intraorais e panorâmicas com 90% menos radiação do que os métodos convencionais e imagem imediata no monitor.",
    badge: "−90% Radiação",
    color: "#06B6D4",
  },
  {
    icon: Zap,
    name: "Laser Dentário",
    description:
      "Tratamentos periodontais, estéticos e cirúrgicos minimamente invasivos com laser de díodo. Recuperação mais rápida e sem dor.",
    badge: "Sem Dor",
    color: "#2563EB",
  },
  {
    icon: Shield,
    name: "Microscópio Operatório",
    description:
      "Magnificação cirúrgica de alta resolução para endodontia, periodontia e microestética dentária com precisão máxima.",
    badge: "Alta Precisão",
    color: "#06B6D4",
  },
];

export default function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tecnologia" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D1421]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)",
          }}
        />
        {/* Animated circuit-like lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 L 30 50 L 30 20 L 70 20 L 70 80 L 100 80" fill="none" stroke="#2563EB" strokeWidth="1" />
              <circle cx="30" cy="50" r="3" fill="#2563EB" />
              <circle cx="70" cy="20" r="3" fill="#06B6D4" />
              <circle cx="70" cy="80" r="3" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10"
          >
            <Cpu className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
              Tecnologia de Ponta
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            Equipamento do futuro,
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              cuidados de hoje
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter-uc)]"
          >
            Investimos continuamente nas tecnologias mais avançadas da medicina dentária
            para oferecer diagnósticos mais precisos e tratamentos mais confortáveis.
          </motion.p>
        </div>

        {/* Technologies grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-opacity-60 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${tech.color}, transparent)`,
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="relative z-10">
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${tech.color}20`,
                      border: `1px solid ${tech.color}40`,
                    }}
                  >
                    <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full font-[family-name:var(--font-inter-uc)]"
                    style={{
                      background: `${tech.color}20`,
                      color: tech.color,
                      border: `1px solid ${tech.color}40`,
                    }}
                  >
                    {tech.badge}
                  </span>
                </div>

                <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-base mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-500 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-[#06B6D4]/30 bg-[#06B6D4]/10">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <p className="text-[#06B6D4] font-medium font-[family-name:var(--font-inter-uc)] text-sm">
              Todo o equipamento disponível todos os dias — incluindo fins de semana e feriados
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
