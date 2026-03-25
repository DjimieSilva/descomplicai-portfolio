"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Story() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#1C1412" }}
    >
      {/* Background lotus pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="lotus-bg" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="60" fill="none" stroke="#EC4899" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#EAB308" strokeWidth="0.5" />
              <path d="M100 40 Q120 70 100 100 Q80 70 100 40Z" fill="none" stroke="#EC4899" strokeWidth="1" />
              <path d="M160 100 Q130 120 100 100 Q130 80 160 100Z" fill="none" stroke="#EC4899" strokeWidth="1" />
              <path d="M100 160 Q80 130 100 100 Q120 130 100 160Z" fill="none" stroke="#EC4899" strokeWidth="1" />
              <path d="M40 100 Q70 80 100 100 Q70 120 40 100Z" fill="none" stroke="#EC4899" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lotus-bg)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 justify-center"
        >
          <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
          >
            A Nossa História
          </span>
          <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
            >
              Onde o Atlântico
              <br />
              <span style={{ color: "#EAB308" }}>Encontra o Oriente</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(245,240,232,0.75)" }}
            >
              Na Mesa dos Amigos, a Tailândia chegou à orla atlântica da Figueira da Foz.
              Somos o único restaurante Thai desta costa, onde os aromas do lemongrass
              e do galangal se misturam com a brisa do mar português.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(245,240,232,0.75)" }}
            >
              Uma fusão única entre a riqueza de especiarias do Sudeste Asiático
              e os ingredientes frescos da costa central portuguesa — o melhor de
              dois mundos numa mesa partilhada entre amigos.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { value: "9.2", label: "Avaliação" },
                { value: "#1", label: "Thai na Região" },
                { value: "100%", label: "Autêntico" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — concept cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                emoji: "🌿",
                title: "Ingredientes Frescos",
                desc: "Ervas aromáticas tailandesas e mariscos da costa portuguesa",
                color: "#059669",
              },
              {
                emoji: "🌶️",
                title: "Especiarias Autênticas",
                desc: "Pasta de curry importada diretamente da Tailândia",
                color: "#991B1B",
              },
              {
                emoji: "🪷",
                title: "Ambiente Exótico",
                desc: "Decoração que transporta para os templos de Chiang Mai",
                color: "#EC4899",
              },
              {
                emoji: "⭐",
                title: "Fusão Criativa",
                desc: "Receitas Thai com toque atlântico que surpreendem",
                color: "#EAB308",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-lg"
                style={{
                  background: "rgba(245,240,232,0.04)",
                  border: `1px solid ${card.color}30`,
                }}
              >
                <div className="text-2xl mb-3">{card.emoji}</div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: card.color, fontFamily: "var(--font-sora)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
