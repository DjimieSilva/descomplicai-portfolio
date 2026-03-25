"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    number: "01",
    title: "A Chegada",
    description: "Entre pela porta e sinta o contraste com o exterior. O espaço foi desenhado para desacelerar — luz baixa, madeira escura, o som distante do Atlântico.",
  },
  {
    number: "02",
    title: "A Mesa",
    description: "Quarenta lugares, sem pressa. A mesa é sua pela noite. Não há segunda rotação. Acreditamos que uma refeição memorável não obedece ao relógio.",
  },
  {
    number: "03",
    title: "A Carta de Vinhos",
    description: "Uma seleção de 80 referências, com foco em Bairrada, Dão e Lisboa. O sommelier está disponível para sugerir a harmonização perfeita para cada prato.",
  },
  {
    number: "04",
    title: "O Serviço",
    description: "Discreto mas presente. A equipa do SAND conhece cada ingrediente de cada prato. Pergunte — gostamos de contar a história do que está no prato.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#FAF9F6] py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-4"
          >
            A Experiência
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-['Playfair_Display'] text-[#1C1917] text-4xl md:text-5xl font-light"
            >
              Uma noite no SAND
            </motion.h2>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <span className="font-['Playfair_Display'] text-[#92702B]/30 text-5xl font-light leading-none shrink-0 group-hover:text-[#92702B]/60 transition-colors duration-500">
                  {exp.number}
                </span>
                <div>
                  <h3 className="font-['Playfair_Display'] text-[#1C1917] text-xl mb-3 font-light">
                    {exp.title}
                  </h3>
                  <p className="text-[#1C1917]/60 text-sm leading-relaxed font-['Libre_Franklin'] font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-20 text-center border-t border-[#1C1917]/10 pt-16"
        >
          <p className="font-['Playfair_Display'] text-[#1C1917]/40 text-2xl md:text-3xl font-light italic leading-relaxed max-w-2xl mx-auto">
            "O SAND é, simplesmente, o melhor jantar que alguma vez tive na Costa de Coimbra."
          </p>
          <p className="text-[#92702B]/60 text-xs tracking-[0.3em] uppercase font-['Libre_Franklin'] mt-5">
            — TimeOut Lisboa, 2024
          </p>
        </motion.div>

      </div>
    </section>
  );
}
