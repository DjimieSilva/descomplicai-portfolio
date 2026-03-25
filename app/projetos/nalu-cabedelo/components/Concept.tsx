"use client";

import { motion } from "framer-motion";
import { Waves, Sun, Music, Utensils } from "lucide-react";

const pillars = [
  {
    icon: Waves,
    title: "Frente de Praia",
    description:
      "Diretamente na Praia de Cabedelo. Os pés na areia, os olhos no oceano. A localização perfeita.",
    color: "#0077B6",
    bg: "rgba(0,119,182,0.15)",
  },
  {
    icon: Sun,
    title: "Surf Culture",
    description:
      "Nascemos do espírito do surf. Descontraído, autêntico, livre. Uma vibe que se sente desde o primeiro momento.",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.15)",
  },
  {
    icon: Utensils,
    title: "Sabores do Mar",
    description:
      "Cozinha fresca e descomplicada. Petiscos com alma, pratos com personalidade. Ingredientes locais, receitas com história.",
    color: "#2D6A4F",
    bg: "rgba(45,106,79,0.15)",
  },
  {
    icon: Music,
    title: "Boa Vibração",
    description:
      "Da manhã à noite, a música certa para cada momento. Sunsets sessions, DJs locais e noites que não acabam.",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.15)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Concept() {
  return (
    <section
      id="concept"
      className="relative py-24 md:py-32 bg-[#0A1628] overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0077B6]/50 to-transparent" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#0077B6]/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#FF6B35] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            O Nosso Conceito
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Mais do que um
            <br />
            <span className="text-[#0077B6]">Bar de Praia</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            O NALU é um estado de espírito. Um lugar onde o tempo abranda, o sol
            aquece e cada sip sabe melhor com o som das ondas ao fundo.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 cursor-default"
                style={{ background: pillar.bg }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${pillar.color}25` }}
                >
                  <Icon size={24} style={{ color: pillar.color }} />
                </div>
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          {[
            { value: "9.3", label: "Avaliação Média" },
            { value: "+500", label: "Clientes por Dia" },
            { value: "5★", label: "No Facebook" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-3xl md:text-4xl font-black text-[#FF6B35] mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
