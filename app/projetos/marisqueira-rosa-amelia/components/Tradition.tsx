"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C10 4 5 9 5 16C5 23 10 28 16 28C22 28 27 23 27 16C27 9 22 4 16 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M16 4L15 14 M16 4L17 14 M16 4L13 12 M16 4L19 12 M16 4L11 11 M16 4L21 11" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    titulo: "Tradição desde 1978",
    texto:
      "A Rosa Amélia abriu portas em 1978 com uma missão simples: servir o melhor marisco da Costa da Prata. Quatro décadas e gerações depois, a missão continua.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20C4 20 8 10 16 10C24 10 28 20 28 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 22C6 22 10 14 16 14C22 14 26 22 26 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"/>
        <path d="M2 24H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 24V28 M14 24V28 M18 24V28 M24 24V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    titulo: "Directo do Mar",
    texto:
      "Todos os dias, o marisco chega fresco da Lota da Figueira da Foz e dos melhores viveiros do litoral português. Da água para a mesa em poucas horas.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6L18.5 12H25L19.5 16L21.5 22L16 18L10.5 22L12.5 16L7 12H13.5L16 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    titulo: "Receitas de Família",
    texto:
      "As cataplanas e os arrozes são confecionados com receitas guardadas pela família Amélia há décadas. Temperos que não se ensinam, transmitem-se.",
  },
];

export default function Tradition() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="tradicao" className="bg-[#1D3557] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#D4A574]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            A Nossa História
          </p>
          <h2
            className="text-[#FFF1E6] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Uma Tradição de{" "}
            <span className="italic text-[#D4A574]">Mar e Sabor</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#E63946] mx-auto mt-8"
          />
        </motion.div>

        {/* Story text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-[#FFF1E6]/70 text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-newsreader), serif" }}>
            Nascida da paixão de Rosa Amélia pelo mar e pela cozinha portuguesa, esta marisqueira
            tornou-se um ponto de referência incontornável na Figueira da Foz. Aqui, cada prato
            conta uma história de sal, de vento atlântico e de amor genuíno pelo marisco.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.titulo}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="text-center p-8 border border-[#D4A574]/15 rounded-sm hover:border-[#D4A574]/35 transition-colors"
            >
              <div className="text-[#D4A574] mb-5 flex justify-center">{pillar.icon}</div>
              <h3
                className="text-[#FFF1E6] text-xl mb-4 font-light"
                style={{ fontFamily: "var(--font-newsreader), serif" }}
              >
                {pillar.titulo}
              </h3>
              <p className="text-[#FFF1E6]/55 text-sm leading-relaxed">{pillar.texto}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-[#D4A574]/15"
        >
          {[
            { numero: "+46", label: "Anos de Tradição" },
            { numero: "+30", label: "Espécies de Marisco" },
            { numero: "100%", label: "Marisco Fresco" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-[#D4A574] text-[clamp(2rem,5vw,3.5rem)] font-light mb-2"
                style={{ fontFamily: "var(--font-newsreader), serif" }}
              >
                {stat.numero}
              </p>
              <p className="text-[#FFF1E6]/45 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
