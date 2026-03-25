"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Fish, Waves, Sun } from "lucide-react";

const catches = [
  { name: "Sardinha", season: "Jun – Set", note: "A rainha do verão" },
  { name: "Robalo", season: "Todo o Ano", note: "O favorito da casa" },
  { name: "Dourada", season: "Todo o Ano", note: "Fresca da costa" },
  { name: "Linguado", season: "Abr – Out", note: "Delicado e saboroso" },
  { name: "Cherne", season: "Out – Mar", note: "Raro e especial" },
  { name: "Tamboril", season: "Out – Abr", note: "Para a caldeirada" },
  { name: "Polvo", season: "Abr – Nov", note: "À lagareiro ou grelhado" },
  { name: "Carapau", season: "Todo o Ano", note: "Humilde e honesto" },
];

export function DailyCatch() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" fill="#F9FAFB">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            Peixe do Dia
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            O que o Mar<br />
            <span className="text-[#8B7355]">Nos Traz Hoje</span>
          </h2>
          <div className="w-16 h-1 bg-[#C9B896] mx-auto mb-6" />
          <p className="text-[#1E3A5F]/65 max-w-xl mx-auto leading-relaxed">
            O peixe do dia é o que os barcos de Buarcos trouxeram esta manhã.
            Não há lista fixa — há o que o mar oferece e a cozinha transforma.
          </p>
        </motion.div>

        {/* Fish grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {catches.map((fish, i) => (
            <motion.div
              key={fish.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="group bg-[#F9FAFB] border border-[#C9B896]/30 rounded p-4 text-center hover:bg-[#1E3A5F] hover:border-[#1E3A5F] transition-all duration-300 cursor-default"
            >
              <div className="mb-3 flex justify-center">
                <Fish
                  className="w-8 h-8 text-[#C9B896] group-hover:text-white transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <h3
                className="font-bold text-[#1E3A5F] group-hover:text-white text-sm md:text-base transition-colors mb-1"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                {fish.name}
              </h3>
              <p className="text-[10px] text-[#8B7355] group-hover:text-[#C9B896] uppercase tracking-wider transition-colors mb-1">
                {fish.season}
              </p>
              <p className="text-xs text-[#1E3A5F]/50 group-hover:text-white/60 transition-colors italic">
                {fish.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Daily catch note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-[#1E3A5F]/5 border-l-4 border-[#C9B896] px-6 py-5 rounded-r flex items-start gap-4"
        >
          <Sun className="w-5 h-5 text-[#C9B896] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#1E3A5F] text-sm mb-1" style={{ fontFamily: "var(--font-merriweather)" }}>
              Pergunta ao chegar — a ementa do dia é dita ao ouvido
            </p>
            <p className="text-xs text-[#1E3A5F]/60 leading-relaxed">
              Na Tasca Da Praia não há ecrãs nem menus digitais. O empregado
              diz-lhe o que há hoje, com orgulho. É assim que sempre foi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
