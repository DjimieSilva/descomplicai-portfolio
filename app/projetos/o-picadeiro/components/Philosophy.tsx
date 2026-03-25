"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Award, Heart } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Sazonalidade",
    description:
      "A nossa ementa acompanha o ritmo das estações. Trabalhamos com produtores locais da região de Coimbra e Mondego, garantindo produtos no seu pico de frescura e sabor.",
  },
  {
    icon: Award,
    title: "Excelência",
    description:
      "Cada prato é uma obra de precisão. Técnicas tradicionais portuguesas elevadas com rigor contemporâneo, preservando a autenticidade que nos distingue desde 1987.",
  },
  {
    icon: Heart,
    title: "Hospitalidade",
    description:
      "A mesa portuguesa sempre foi espaço de partilha e afeto. Cultivamos uma experiência que vai além da refeição — criamos memórias que perduram.",
  },
];

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#1B4332]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A Nossa Filosofia
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#FFFBEB] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            Cozinha com{" "}
            <span className="italic text-[#B87333]">Alma</span>
          </h2>

          <p
            className="text-[#FFFBEB]/70 max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A cozinha portuguesa tem uma profundidade que transcende a receita.
            É memória, é território, é identidade. No Picadeiro, honramos essa
            herança com dedicação e criatividade.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2 }}
                className="group text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#B87333]/40 mb-6 group-hover:border-[#B87333] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#B87333]" />
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-light text-[#FFFBEB] mb-4"
                  style={{ fontFamily: "var(--font-literata)" }}
                >
                  {pillar.title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-px bg-[#B87333]/50 mx-auto mb-4 group-hover:w-12 transition-all duration-300" />

                {/* Description */}
                <p
                  className="text-[#FFFBEB]/60 leading-relaxed text-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 text-center border-t border-[#B87333]/20 pt-16"
        >
          <p
            className="text-2xl md:text-3xl font-light italic text-[#FFFBEB]/80 mb-6 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            "A boa mesa não é um luxo — é um ato de generosidade para com
            quem amamos."
          </p>
          <cite
            className="text-[#B87333] text-sm tracking-[0.2em] uppercase not-italic"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            — Chef Pedro Assunção, O Picadeiro
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
