"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Fish, Sun, Droplets } from "lucide-react";

const principles = [
  {
    icon: Sun,
    emoji: "🌅",
    title: "Colhido Hoje",
    description:
      "Cada ingrediente chega à nossa cozinha no próprio dia. Nada de conservas, nada de congelados. O que não é fresco, não entra na ementa.",
    color: "#DC2626",
    bg: "#FEE2E2",
  },
  {
    icon: Fish,
    emoji: "🐟",
    title: "Peixe do Dia",
    description:
      "Trabalhamos diretamente com os pescadores da Figueira da Foz. O peixe que está no seu prato estava no mar esta manhã.",
    color: "#15803D",
    bg: "#DCFCE7",
  },
  {
    icon: Leaf,
    emoji: "🌿",
    title: "Produtos da Época",
    description:
      "A nossa ementa respeita as estações do ano. No verão, tomates e pimentos. No inverno, caldos e grelos. Sempre o melhor de cada momento.",
    color: "#78350F",
    bg: "#FEF3C7",
  },
  {
    icon: Droplets,
    emoji: "💧",
    title: "Sem Aditivos",
    description:
      "Cozinhamos como se fazia antigamente — com sabor real, temperos naturais e o tempo necessário para cada prato ficar perfeito.",
    color: "#1D4ED8",
    bg: "#DBEAFE",
  },
];

export default function Freshness() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#15803D] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #FEF3C7 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FEF3C7]">
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#FEF3C7]/70 font-bold uppercase tracking-widest text-sm mb-4">
            A Nossa Filosofia
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FEF3C7] leading-tight mb-6"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            A Frescura do Mercado
            <br />
            <span className="text-[#FEF3C7]/60">no Seu Prato</span>
          </h2>
          <p className="text-[#FEF3C7]/80 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Quatro princípios que guiam cada prato que sai da nossa cozinha.
            Sem compromissos. Sem atalhos.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-default"
            >
              {/* Emoji */}
              <div className="text-4xl mb-4">{p.emoji}</div>

              {/* Icon badge */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: p.bg }}
              >
                <p.icon size={20} style={{ color: p.color }} />
              </div>

              <h3
                className="text-xl font-black text-[#78350F] mb-3"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                {p.title}
              </h3>
              <p className="text-[#78350F]/70 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 bg-[#DC2626] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3
              className="text-2xl font-black text-white mb-2"
              style={{ fontFamily: "var(--font-public-sans)" }}
            >
              Veja o que está fresco hoje
            </h3>
            <p className="text-white/80 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              O nosso menu do dia muda consoante o que o mercado tem de melhor.
            </p>
          </div>
          <a
            href="#especiais-do-dia"
            className="bg-white text-[#DC2626] font-bold px-8 py-3 rounded-full hover:bg-[#FEF3C7] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            Especiais do Dia →
          </a>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FEF3C7]">
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
