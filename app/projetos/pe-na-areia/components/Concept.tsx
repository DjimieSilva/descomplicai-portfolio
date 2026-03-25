"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Pés na Areia",
    body: "A mesa mais especial é aquela onde a areia da praia serve de tapete. Dine com os pés descalços, ouvindo as ondas, vivendo o momento.",
  },
  {
    number: "02",
    title: "Mar do Dia",
    body: "Cada prato começa no cais. Os nossos produtores chegam cedo, trazendo o que o oceano oferece nesse dia. Sem congelados, sem compromissos.",
  },
  {
    number: "03",
    title: "Luxo Descalço",
    body: "Sofisticação sem pretensão. Serviço impecável, vinhos cuidadosamente selecionados, e uma vista que nenhum restaurante de interior pode oferecer.",
  },
];

export default function Concept() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[#120f0b] relative overflow-hidden">
      {/* Parallax decorative ocean layer */}
      <div ref={scrollRef} className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#0E7490]/8 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#DDB892]/6 to-transparent" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              O Conceito
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#FAF8F4] text-4xl md:text-5xl font-light leading-tight mb-8"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
            >
              Onde a gastronomia{" "}
              <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
                encontra o oceano
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-[#9A8C72] text-base leading-relaxed mb-6"
            >
              Há lugares que se tornam lendas. O Pé na Areia nasceu da convicção
              de que a melhor refeição é aquela partilhada com a natureza — o sal
              no ar, a brisa atlântica, a luz que muda a cada hora do dia.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-[#9A8C72] text-base leading-relaxed"
            >
              Instalados diretamente na praia da Figueira da Foz, convertemos
              décadas de tradição piscatória numa experiência gastronómica
              distinguida pelos mais exigentes críticos nacionais.
            </motion.p>
          </div>

          {/* Right — pillars */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="flex gap-6 p-6 border border-[#DDB892]/8 rounded-xl hover:border-[#DDB892]/20 transition-colors duration-400 bg-[#DDB892]/2"
              >
                <div
                  className="text-[#DDB892]/20 text-3xl font-light leading-none flex-shrink-0 mt-1"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
                >
                  {pillar.number}
                </div>
                <div>
                  <h3
                    className="text-[#DDB892] text-base font-medium mb-2"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-[#9A8C72] text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative wave divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-20"
        >
          <svg viewBox="0 0 1200 30" className="w-full opacity-15" fill="none">
            <path
              d="M0,15 C150,0 300,30 450,15 C600,0 750,30 900,15 C1050,0 1150,25 1200,15"
              stroke="#DDB892"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
