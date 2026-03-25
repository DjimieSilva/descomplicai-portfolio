"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    "Há lugares que existem fora do tempo.",
    "O SAND é um deles.",
  ];

  return (
    <section ref={ref} className="bg-[#FAF9F6] py-24 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">

          {/* Left — editorial quote block */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-6">
                A Nossa História
              </p>
              <div className="space-y-2 mb-8">
                {lines.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: "100%" }}
                      animate={isInView ? { y: 0 } : {}}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 * i }}
                      className="font-['Playfair_Display'] text-[#1C1917] text-3xl md:text-4xl leading-tight font-light"
                    >
                      {line}
                    </motion.h2>
                  </div>
                ))}
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ originX: 0 }}
                className="h-px w-16 bg-[#92702B]"
              />
            </motion.div>
          </div>

          {/* Right — narrative text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-6"
          >
            <p className="text-[#1C1917]/70 text-base md:text-lg leading-relaxed font-['Libre_Franklin'] font-light">
              Encostado às dunas de Murtinheira, a poucos metros do Oceano Atlântico, o SAND nasceu da vontade de celebrar o território. Não como decoração, mas como essência. O mar que se avista pela janela é o mesmo que inspira cada prato.
            </p>
            <p className="text-[#1C1917]/70 text-base md:text-lg leading-relaxed font-['Libre_Franklin'] font-light">
              A cozinha é contemporânea, mas profundamente portuguesa. Peixe apanhado de madrugada nas águas da Figueira da Foz, ervas colhidas nas encostas da Mata Nacional do Urso, azeite do interior da Beira. Cada ingrediente tem nome e origem.
            </p>
            <p className="text-[#1C1917]/70 text-base md:text-lg leading-relaxed font-['Libre_Franklin'] font-light">
              Com nota 9.7 em 10, somos o restaurante mais bem avaliado da região. Mas os números pouco nos preocupam. O que nos move é a memória que cada refeição deixa.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1C1917]/10">
              {[
                { value: "9.7", label: "Classificação" },
                { value: "2018", label: "Fundado em" },
                { value: "40", label: "Lugares" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                >
                  <p className="font-['Playfair_Display'] text-[#92702B] text-3xl font-light">{stat.value}</p>
                  <p className="text-[#1C1917]/50 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin'] mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
