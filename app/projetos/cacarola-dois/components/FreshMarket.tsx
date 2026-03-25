"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Award, Users, Compass } from "lucide-react";

const stats = [
  { icon: Clock, value: "5h", label: "Do mar à mesa" },
  { icon: Award, value: "100%", label: "Pescado nacional" },
  { icon: Users, value: "3", label: "Famílias de pescadores parceiras" },
  { icon: Compass, value: "12km", label: "Raio máximo de sourcing" },
];

export default function FreshMarket() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F1F5F9] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-[0.35em] uppercase mb-4"
            >
              Do Mar à Mesa
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#0C2340] mb-6"
            >
              Sourcing de
              <br />
              <span className="text-[#0369A1]">mercado fresco</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[#475569] text-base leading-relaxed mb-5"
            >
              Todas as manhãs, a nossa equipa visita o mercado de pescado de
              Figueira da Foz para escolher o melhor que o mar tem para oferecer.
              Trabalhamos com pescadores que conhecemos pelo nome, que partilham os
              nossos valores de respeito pelo oceano.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-[family-name:var(--font-inter)] text-[#475569] text-base leading-relaxed"
            >
              Não temos uma ementa fixa — temos produtos de excelência e uma
              cozinha que sabe o que fazer com eles. O que o mar traz hoje é o
              que vai ao prato amanhã.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 inline-flex items-center gap-3 bg-[#0369A1]/5 border border-[#0369A1]/20 rounded-xl px-6 py-4"
            >
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-[family-name:var(--font-inter)] text-[#0369A1] text-sm font-medium">
                Ementa atualizada diariamente
              </span>
            </motion.div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0369A1]/10 flex items-center justify-center">
                  <stat.icon size={18} className="text-[#0369A1]" />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-hanken)] font-black text-3xl text-[#0C2340] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-[#475569] text-sm leading-snug">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 bg-[#0C2340] rounded-2xl p-8 sm:p-12 grid sm:grid-cols-3 gap-8 text-center"
        >
          {[
            { title: "Pesca Artesanal", sub: "Métodos tradicionais, impacto mínimo" },
            { title: "Sem Aquacultura", sub: "Apenas peixe selvagem da costa" },
            { title: "Zero Desperdício", sub: "Caldos e bases feitos com o que sobra" },
          ].map((item, i) => (
            <div key={item.title} className={i > 0 ? "sm:border-l border-white/10 sm:pl-8" : ""}>
              <div className="font-[family-name:var(--font-hanken)] font-bold text-white text-lg mb-2">
                {item.title}
              </div>
              <div className="font-[family-name:var(--font-inter)] text-white/40 text-sm">
                {item.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
