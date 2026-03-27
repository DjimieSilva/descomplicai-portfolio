"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sun, Snowflake } from "lucide-react";
import BotanicalDivider from "./BotanicalDivider";

const seasons = [
  {
    id: "primavera",
    label: "Primavera",
    icon: Leaf,
    color: "#43A047",
    bgColor: "rgba(107,143,60,0.06)",
    services: [
      "Plantação de novas espécies",
      "Preparação de canteiros",
      "Adubação de fundo",
      "Controlo de ervas daninhas",
    ],
    quote:
      "A primavera no Algarve é explosiva — o momento ideal para plantar.",
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[180px]">
        {/* Stem */}
        <path d="M100 150 C100 120, 98 90, 100 60" stroke="#43A047" strokeWidth="2" />
        {/* Leaves unfurling */}
        <path d="M100 100 C85 90, 70 85, 65 92 C60 99, 75 105, 100 100Z" fill="#43A047" fillOpacity={0.4} />
        <path d="M100 100 C115 90, 130 85, 135 92 C140 99, 125 105, 100 100Z" fill="#4CAF50" fillOpacity={0.4} />
        <path d="M100 80 C88 70, 75 68, 72 75 C69 82, 82 86, 100 80Z" fill="#43A047" fillOpacity={0.35} />
        <path d="M100 80 C112 70, 125 68, 128 75 C131 82, 118 86, 100 80Z" fill="#4CAF50" fillOpacity={0.35} />
        {/* Flower bud */}
        <circle cx="100" cy="55" r="8" fill="#D4552A" fillOpacity={0.3} />
        <path d="M100 47 C96 42, 92 40, 90 44 C88 48, 94 50, 100 47Z" fill="#D4552A" fillOpacity={0.5} />
        <path d="M100 47 C104 42, 108 40, 110 44 C112 48, 106 50, 100 47Z" fill="#D4552A" fillOpacity={0.5} />
        <path d="M100 47 C100 40, 98 35, 100 32" stroke="#D4552A" strokeWidth="0.8" />
        {/* Small butterfly */}
        <path d="M140 45 C145 40, 150 38, 148 43 C146 48, 142 47, 140 45Z" fill="#64B5F6" fillOpacity={0.6} />
        <path d="M140 45 C135 40, 130 38, 132 43 C134 48, 138 47, 140 45Z" fill="#64B5F6" fillOpacity={0.5} />
        {/* Ground */}
        <path d="M60 150 C80 148, 120 148, 140 150" stroke="#3E2723" strokeWidth="0.8" strokeOpacity={0.3} />
      </svg>
    ),
  },
  {
    id: "verao",
    label: "Verão",
    icon: Sun,
    color: "#D4552A",
    bgColor: "rgba(194,112,62,0.06)",
    services: [
      "Rega intensiva e monitorização",
      "Corte de relva frequente",
      "Proteção contra pragas",
      "Poda de manutenção",
    ],
    quote:
      "Os verões algarvios exigem atenção redobrada à rega e proteção solar.",
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[180px]">
        {/* Sun */}
        <circle cx="100" cy="40" r="20" fill="#D4552A" fillOpacity={0.2} stroke="#D4552A" strokeWidth="1.5" />
        <circle cx="100" cy="40" r="12" fill="#D4552A" fillOpacity={0.15} />
        {/* Sun rays - precomputed for hydration safety */}
        {[
          { x1: 124, y1: 40, x2: 132, y2: 40 },
          { x1: 116.97, y1: 23.03, x2: 122.63, y2: 17.37 },
          { x1: 100, y1: 16, x2: 100, y2: 8 },
          { x1: 83.03, y1: 23.03, x2: 77.37, y2: 17.37 },
          { x1: 76, y1: 40, x2: 68, y2: 40 },
          { x1: 83.03, y1: 56.97, x2: 77.37, y2: 62.63 },
          { x1: 100, y1: 64, x2: 100, y2: 72 },
          { x1: 116.97, y1: 56.97, x2: 122.63, y2: 62.63 },
        ].map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#D4552A" strokeWidth="1.2" strokeLinecap="round" />
        ))}
        {/* Dry landscape with green garden */}
        <path d="M30 140 C50 135, 70 138, 100 135 C130 132, 150 136, 170 140" stroke="#C4AA85" strokeWidth="1" />
        {/* Green oasis in center */}
        <path d="M80 135 C85 120, 90 115, 95 118 C98 112, 102 112, 105 118 C110 115, 115 120, 120 135" fill="#43A047" fillOpacity={0.3} />
        {/* Watering can */}
        <path d="M55 120 L55 105 L70 105 L70 120 Z" stroke="#64B5F6" strokeWidth="1" fill="#64B5F6" fillOpacity={0.2} />
        <path d="M70 108 L80 100 L82 102 L72 110" stroke="#64B5F6" strokeWidth="0.8" />
        {/* Water drops */}
        <path d="M78 104 C79 100, 80 98, 78 97" stroke="#64B5F6" strokeWidth="0.6" />
        <path d="M82 106 C83 102, 84 100, 82 99" stroke="#64B5F6" strokeWidth="0.6" />
      </svg>
    ),
  },
  {
    id: "outono",
    label: "Outono",
    icon: Leaf,
    color: "#8B6914",
    bgColor: "rgba(139,105,20,0.06)",
    services: [
      "Recolha de folhas",
      "Plantação de bolbos",
      "Preparação para o inverno",
      "Manutenção de rega",
    ],
    quote:
      "O outono é o tempo de preparar o jardim para a estação fria.",
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[180px]">
        {/* Tree with falling leaves */}
        <path d="M100 150 L100 80" stroke="#3E2723" strokeWidth="2.5" />
        <path d="M100 110 C85 100, 75 95, 80 90" stroke="#3E2723" strokeWidth="1.2" fill="none" />
        <path d="M100 100 C115 90, 125 85, 120 80" stroke="#3E2723" strokeWidth="1.2" fill="none" />
        {/* Sparse canopy */}
        <path d="M100 80 C80 70, 65 55, 75 45 C85 35, 95 40, 100 45 C105 40, 115 35, 125 45 C135 55, 120 70, 100 80Z" fill="#8B6914" fillOpacity={0.2} stroke="#8B6914" strokeWidth="1" />
        {/* Falling leaves */}
        <path d="M65 85 C60 82, 58 80, 60 84 C62 88, 67 87, 65 85Z" fill="#D4552A" fillOpacity={0.6} transform="rotate(20 65 85)" />
        <path d="M140 70 C135 67, 133 65, 135 69 C137 73, 142 72, 140 70Z" fill="#8B6914" fillOpacity={0.6} transform="rotate(-15 140 70)" />
        <path d="M55 110 C50 107, 48 105, 50 109 C52 113, 57 112, 55 110Z" fill="#D4552A" fillOpacity={0.5} transform="rotate(35 55 110)" />
        <path d="M145 100 C140 97, 138 95, 140 99 C142 103, 147 102, 145 100Z" fill="#8B6914" fillOpacity={0.5} transform="rotate(-30 145 100)" />
        <path d="M80 130 C75 127, 73 125, 75 129 C77 133, 82 132, 80 130Z" fill="#D4552A" fillOpacity={0.4} transform="rotate(45 80 130)" />
        {/* Ground leaves pile */}
        <path d="M60 150 C70 145, 80 147, 90 145 C100 143, 110 146, 120 145 C130 144, 140 147, 145 150" fill="#8B6914" fillOpacity={0.15} />
      </svg>
    ),
  },
  {
    id: "inverno",
    label: "Inverno",
    icon: Snowflake,
    color: "#64B5F6",
    bgColor: "rgba(184,212,227,0.08)",
    services: [
      "Poda de formação",
      "Tratamento de árvores de fruto",
      "Limpeza geral",
      "Planeamento da primavera",
    ],
    quote:
      "No Algarve, o inverno suave permite poda e tratamentos essenciais.",
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" className="w-full max-w-[180px]">
        {/* Bare tree with pruning */}
        <path d="M100 150 L100 70" stroke="#3E2723" strokeWidth="2.5" />
        <path d="M100 100 C80 85, 65 80, 60 75" stroke="#3E2723" strokeWidth="1.5" fill="none" />
        <path d="M100 90 C120 75, 135 70, 140 65" stroke="#3E2723" strokeWidth="1.5" fill="none" />
        <path d="M100 80 C85 68, 75 62, 72 55" stroke="#3E2723" strokeWidth="1.2" fill="none" />
        <path d="M100 75 C110 65, 118 58, 125 52" stroke="#3E2723" strokeWidth="1.2" fill="none" />
        <path d="M100 70 C95 60, 92 52, 95 45" stroke="#3E2723" strokeWidth="1" fill="none" />
        {/* Pruning marks */}
        <circle cx="60" cy="75" r="3" stroke="#D4552A" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        <circle cx="140" cy="65" r="3" stroke="#D4552A" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        {/* Soft rain/mist */}
        {[40, 70, 130, 160].map((x, i) => (
          <line key={i} x1={x} y1={20 + i * 5} x2={x - 3} y2={35 + i * 5} stroke="#64B5F6" strokeWidth="0.8" strokeOpacity={0.5} />
        ))}
        {/* Ground */}
        <path d="M50 150 C80 147, 120 147, 150 150" stroke="#4CAF50" strokeWidth="0.8" strokeOpacity={0.4} />
        {/* Small green shoots at base */}
        <path d="M90 148 C89 143, 90 140, 91 138" stroke="#43A047" strokeWidth="0.8" />
        <path d="M110 148 C111 143, 110 140, 109 138" stroke="#43A047" strokeWidth="0.8" />
      </svg>
    ),
  },
];

export default function SeasonalServices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#FBF1E0" }}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-libre-caslon), serif",
            color: "#2E7D32",
          }}
        >
          Cada Estação, Um Cuidado Diferente
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#4CAF50",
          }}
        >
          O Algarve tem um clima único — e os nossos serviços acompanham cada estação
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Season tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {seasons.map((season, index) => {
            const IconComponent = season.icon;
            const isActive = activeTab === index;
            return (
              <motion.button
                key={season.id}
                onClick={() => setActiveTab(index)}
                className="relative flex items-center gap-2 px-6 py-3 text-base font-semibold transition-all duration-300"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  backgroundColor: isActive ? season.color : "transparent",
                  color: isActive ? "#FBF1E0" : season.color,
                  borderRadius: "9999px",
                  border: `2px solid ${season.color}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <IconComponent
                  size={18}
                  style={{
                    transform: season.id === "outono" ? "rotate(180deg)" : undefined,
                  }}
                />
                {season.label}
              </motion.button>
            );
          })}
        </div>

        {/* Season content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={seasons[activeTab].id}
            className="rounded-3xl p-8 md:p-12"
            style={{
              backgroundColor: seasons[activeTab].bgColor,
              border: `1px solid ${seasons[activeTab].color}20`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Illustration */}
              <div className="flex-shrink-0 flex justify-center">
                {seasons[activeTab].illustration}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-libre-caslon), serif",
                    color: seasons[activeTab].color,
                  }}
                >
                  {seasons[activeTab].label}
                </h3>

                <ul className="space-y-3 mb-8">
                  {seasons[activeTab].services.map((service, i) => (
                    <motion.li
                      key={service}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 2 C14 4, 17 8, 17 12 C17 16, 14 18, 10 18 C6 18, 3 16, 3 12 C3 8, 6 4, 10 2Z"
                          fill={seasons[activeTab].color}
                          fillOpacity={0.2}
                        />
                        <path d="M7 10 L9 12 L13 8" stroke={seasons[activeTab].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        style={{
                          fontFamily: "var(--font-source-sans), sans-serif",
                          color: "#3E2723",
                        }}
                      >
                        {service}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <blockquote
                  className="pl-4 py-2"
                  style={{
                    borderLeft: `3px solid ${seasons[activeTab].color}`,
                    fontFamily: "var(--font-newsreader), serif",
                    fontStyle: "italic",
                    color: "#3E2723",
                    opacity: 0.85,
                  }}
                >
                  {seasons[activeTab].quote}
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-20">
        <BotanicalDivider variant="olive" />
      </div>
    </section>
  );
}
