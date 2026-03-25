"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Waves, Anchor, Users } from "lucide-react";

const pillars = [
  {
    icon: Waves,
    title: "A Costa de Buarcos",
    text: "Buarcos é uma das mais antigas aldeias piscatórias de Portugal. As suas ruas de calçada guardam séculos de história marítima, onde os pescadores ainda saem ao mar de madrugada.",
  },
  {
    icon: Anchor,
    title: "Do Mar para a Mesa",
    text: "O nosso peixe não passa por intermediários. Vem direto dos barcos que atracam na nossa praia, garantindo a frescura que só uma tasca de aldeia piscatória pode oferecer.",
  },
  {
    icon: Users,
    title: "Tradição de Família",
    text: "Receitas passadas de avó para mãe, de mãe para filha. A caldeirada que servimos hoje é feita com a mesma alma e os mesmos temperos de há décadas.",
  },
];

export function Tradition() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      {/* Wood grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #8B7355 0px,
            transparent 2px,
            transparent 40px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            A Nossa História
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            A Alma de uma Aldeia<br />
            <span className="text-[#8B7355]">Piscatória</span>
          </h2>
          <div className="w-16 h-1 bg-[#C9B896] mx-auto mb-6" />
          <p className="text-lg text-[#1E3A5F]/70 max-w-2xl mx-auto leading-relaxed">
            Buarcos não é apenas um lugar — é um modo de vida. Aqui, o peixe
            não é só comida. É herança, é identidade, é o cheiro a sal e a
            brasa que atravessa gerações.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E3A5F]/5 border border-[#C9B896]/40 mb-5 group-hover:bg-[#1E3A5F] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#8B7355] group-hover:text-[#C9B896] transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-xl font-bold text-[#1E3A5F] mb-3"
                  style={{ fontFamily: "var(--font-merriweather)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[#1E3A5F]/65 leading-relaxed text-sm md:text-base">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-block bg-[#1E3A5F] px-8 py-6 md:px-12 md:py-8 rounded-sm relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-16 h-1 bg-[#C9B896]" />
            <p
              className="text-xl md:text-2xl text-white/90 italic leading-relaxed"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              "Comida real, feita por gente real,<br className="hidden md:block" />
              para quem sabe o que é bom."
            </p>
            <p className="text-[#C9B896] text-sm mt-4 uppercase tracking-widest">
              — A Família da Tasca
            </p>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
