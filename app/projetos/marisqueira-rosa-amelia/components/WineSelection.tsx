"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const wines = [
  {
    categoria: "Vinho Verde Branco",
    lista: [
      { nome: "Alvarinho Soalheiro", regiao: "Monção e Melgaço", garrafa: "€28", copo: "€6" },
      { nome: "Loureiro Quinta da Aveleda", regiao: "Lima · Vinho Verde", garrafa: "€18", copo: "€4.50" },
      { nome: "Muros Antigos Alvarinho", regiao: "Monção · Vinho Verde", garrafa: "€22", copo: "€5" },
      { nome: "Azal Adega de Monção", regiao: "Monção · Vinho Verde", garrafa: "€14", copo: "€3.50" },
    ],
  },
  {
    categoria: "Branco Atlântico",
    lista: [
      { nome: "Encruzado Dão Quinta dos Roques", regiao: "Dão", garrafa: "€24", copo: "€5.50" },
      { nome: "Antão Vaz Esporão", regiao: "Alentejo", garrafa: "€20", copo: "€5" },
      { nome: "Arinto Casa Santos Lima", regiao: "Lisboa", garrafa: "€16", copo: "€4" },
      { nome: "Fernão Pires Falua", regiao: "Tejo", garrafa: "€14", copo: "€3.50" },
    ],
  },
  {
    categoria: "Espumante & Rosé",
    lista: [
      { nome: "Raposeira Super Reserva Bruto", regiao: "Lamego", garrafa: "€22", copo: "€5.50" },
      { nome: "Murganheira Bruto Nature", regiao: "Távora-Varosa", garrafa: "€26", copo: "€6" },
      { nome: "Rosé Quinta da Lixa", regiao: "Vinho Verde", garrafa: "€15", copo: "€4" },
      { nome: "Adega do Cartaxo Rosé", regiao: "Ribatejo", garrafa: "€13", copo: "€3.50" },
    ],
  },
];

export default function WineSelection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="vinhos" className="bg-[#FFF1E6] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946]/70 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Carta de Vinhos
          </p>
          <h2
            className="text-[#1D3557] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Vinhos para o{" "}
            <span className="italic text-[#E63946]">Mar</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#D4A574] mx-auto mt-8"
          />
          <p className="text-[#1D3557]/60 text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Seleção criteriosamente escolhida para acompanhar marisco e peixe.
            Privilegiamos vinhos verdes e brancos atlânticos, parceiros naturais do mar.
          </p>
        </motion.div>

        {/* Wine categories */}
        <div className="space-y-14">
          {wines.map((cat, catIdx) => (
            <motion.div
              key={cat.categoria}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + catIdx * 0.2 }}
            >
              {/* Category title */}
              <div className="flex items-center gap-4 mb-6">
                <h3
                  className="text-[#1D3557] text-xl font-light"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  {cat.categoria}
                </h3>
                <div className="flex-1 h-px bg-[#D4A574]/30" />
              </div>

              {/* Wine items */}
              <div className="divide-y divide-[#D4A574]/15">
                {cat.lista.map((wine) => (
                  <div
                    key={wine.nome}
                    className="flex items-center justify-between py-4 group"
                  >
                    <div className="flex-1">
                      <p
                        className="text-[#1D3557] text-base font-light group-hover:text-[#E63946] transition-colors"
                        style={{ fontFamily: "var(--font-newsreader), serif" }}
                      >
                        {wine.nome}
                      </p>
                      <p className="text-[#1D3557]/40 text-xs mt-0.5"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        {wine.regiao}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-[#1D3557]/35 text-[10px] tracking-[0.15em] uppercase mb-0.5"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                          Copo
                        </p>
                        <p
                          className="text-[#D4A574] text-base font-light"
                          style={{ fontFamily: "var(--font-newsreader), serif" }}
                        >
                          {wine.copo}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#1D3557]/35 text-[10px] tracking-[0.15em] uppercase mb-0.5"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                          Garrafa
                        </p>
                        <p
                          className="text-[#E63946] text-base font-light"
                          style={{ fontFamily: "var(--font-newsreader), serif" }}
                        >
                          {wine.garrafa}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendation note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 p-6 border border-[#D4A574]/30 rounded-sm bg-white/60 text-center"
        >
          <p
            className="text-[#1D3557] text-lg font-light italic mb-2"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            &ldquo;Para marisco, nada melhor do que um Alvarinho bem fresco de Monção.&rdquo;
          </p>
          <p className="text-[#1D3557]/45 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            — Recomendação da Casa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
