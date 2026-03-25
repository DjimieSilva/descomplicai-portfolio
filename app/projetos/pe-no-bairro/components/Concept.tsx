"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Leaf } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Feito com Alma",
    description:
      "Cada prato sai da cozinha com a dedicação de quem cozinha para a família. Não há atalhos quando se cozinha com coração.",
  },
  {
    icon: Users,
    title: "Do Bairro para Todos",
    description:
      "Um sítio onde os vizinhos se encontram, onde há sempre uma mesa para mais um. O Pé no Bairro é um ponto de encontro.",
  },
  {
    icon: Leaf,
    title: "Produto Fresco",
    description:
      "Trabalhamos com produtores locais da região de Coimbra e Figueira da Foz. O que está na ementa depende do que há de melhor hoje.",
  },
];

export default function Concept() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-[#171717] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-0.5 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
            A Nossa Filosofia
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Big statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white mb-6">
              Um restaurante que{" "}
              <span className="text-[#EAB308]">cheira a casa</span> e sabe a
              bairro.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-base sm:text-lg leading-relaxed mb-6">
              O Pé no Bairro nasceu da vontade de criar um sítio diferente.
              Diferente dos restaurantes turísticos, diferente das cadeias
              sem alma. Um espaço onde a cozinha portuguesa é tratada com
              respeito — moderna quando tem de ser, tradicional quando assim
              o pede.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-base sm:text-lg leading-relaxed">
              Em Figueira da Foz, a cidade que vive entre o rio e o mar, o Pé
              no Bairro é o sítio onde se come bem, se bebe ainda melhor, e se
              sai com vontade de voltar amanhã.
            </p>

            {/* Stats */}
            <div className="flex gap-12 mt-10">
              {[
                { value: "2024", label: "Aberto desde" },
                { value: "100%", label: "Produto nacional" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-space-grotesk)] font-black text-3xl text-[#EAB308]">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-xs text-[#A3A3A3] tracking-widest uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values cards */}
          <div className="flex flex-col gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="flex gap-5 p-6 bg-white/[0.03] border border-white/[0.06] hover:border-[#EAB308]/30 transition-colors duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#EAB308]/10 flex items-center justify-center group-hover:bg-[#EAB308]/20 transition-colors duration-300">
                  <value.icon size={18} className="text-[#EAB308]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-base mb-2">
                    {value.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
