"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const levels = [
  {
    level: 0,
    label: "Sem Picante",
    thaiLabel: "Mai Phet",
    desc: "Para os mais sensíveis. Sabores suaves e aromáticos, sem calor.",
    color: "#059669",
    emoji: "🟢",
    dishes: ["Tom Kha Gai", "Spring Rolls", "Mango Sticky Rice"],
  },
  {
    level: 1,
    label: "Levemente Picante",
    thaiLabel: "Phet Nit Noi",
    desc: "Um toque subtil que aquece. Perfeito para iniciantes na cozinha Thai.",
    color: "#EAB308",
    emoji: "🟡",
    dishes: ["Satay de Frango", "Pad Thai", "Massaman Curry"],
  },
  {
    level: 2,
    label: "Moderadamente Picante",
    thaiLabel: "Phet Klang",
    desc: "O equilíbrio perfeito entre sabor e calor. A escolha da maioria.",
    color: "#F97316",
    emoji: "🟠",
    dishes: ["Curry Vermelho", "Bacalhau ao Curry Verde", "Gyoza"],
  },
  {
    level: 3,
    label: "Bem Picante",
    thaiLabel: "Phet Mak",
    desc: "Intenso e aromático. Para quem aprecia a autenticidade Thai sem compromissos.",
    color: "#991B1B",
    emoji: "🔴",
    dishes: ["Tom Yum", "Curry Verde com Frango", "Papaia Salad"],
  },
  {
    level: 4,
    label: "Muito Picante",
    thaiLabel: "Phet Mak Mak",
    desc: "Nível de chefs tailandeses. Desafio para os verdadeiros amantes de picante.",
    color: "#7C2D12",
    emoji: "🌶️",
    dishes: ["Prik Khing Especial", "Jungle Curry", "Larb Picante"],
  },
];

export default function SpiceLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="guia-picante"
      className="relative py-24 md:py-28 overflow-hidden"
      style={{ background: "#292524" }}
    >
      {/* Flame background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-5">
        <svg viewBox="0 0 400 800" className="h-full" preserveAspectRatio="xMaxYMid meet">
          <path
            d="M200 800 Q180 600 220 500 Q160 450 180 300 Q140 280 160 150 Q180 50 200 0 Q220 50 240 150 Q260 280 220 300 Q240 450 180 500 Q220 600 200 800Z"
            fill="#991B1B"
          />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Guia de Picante
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Escala de Intensidade
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)" }} className="max-w-xl mx-auto">
            Na cozinha Thai, o picante é uma arte. Escolha o seu nível de conforto —
            adaptamos qualquer prato ao seu gosto.
          </p>
        </motion.div>

        {/* Levels */}
        <div className="space-y-4">
          {levels.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-6 items-start p-5 rounded-xl"
              style={{
                background: "rgba(245,240,232,0.04)",
                border: `1px solid ${level.color}20`,
              }}
            >
              {/* Level indicator */}
              <div className="shrink-0 text-center w-14">
                <div className="text-2xl mb-1">{level.emoji}</div>
                <div
                  className="text-xs font-bold"
                  style={{ color: level.color, fontFamily: "var(--font-sora)" }}
                >
                  Nível {level.level}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                  >
                    {level.label}
                  </h3>
                  <span
                    className="text-xs italic"
                    style={{ color: "rgba(234,179,8,0.6)" }}
                  >
                    {level.thaiLabel}
                  </span>
                </div>
                <p
                  className="text-sm mb-3"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  {level.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {level.dishes.map((dish) => (
                    <span
                      key={dish}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: `${level.color}15`,
                        color: level.color,
                        border: `1px solid ${level.color}30`,
                      }}
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heat bar */}
              <div className="shrink-0 hidden sm:flex flex-col justify-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      background: j <= level.level ? level.color : "rgba(245,240,232,0.1)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 p-5 rounded-xl text-center"
          style={{
            background: "rgba(234,179,8,0.06)",
            border: "1px solid rgba(234,179,8,0.2)",
          }}
        >
          <p
            className="text-sm"
            style={{ color: "rgba(245,240,232,0.7)" }}
          >
            🍃 Todos os níveis de picante são preparados com chilies frescos.
            Informe o nosso staff sobre preferências — adaptamos com prazer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
