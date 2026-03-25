"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wine, Droplets, Star } from "lucide-react";

const wines = [
  {
    name: "Niepoort Redoma Branco",
    region: "Douro",
    grape: "Rabigato, Códega, Viosinho",
    pairing: "Ceviches e tartares",
    year: "2022",
    price: "€38",
  },
  {
    name: "Quinta dos Carvalhais Encruzado",
    region: "Dão",
    grape: "Encruzado",
    pairing: "Peixe grelhado e açordas",
    year: "2023",
    price: "€32",
  },
  {
    name: "Esporão Reserva Branco",
    region: "Alentejo",
    grape: "Antão Vaz, Roupeiro",
    pairing: "Marisco e arrozes",
    year: "2022",
    price: "€26",
  },
  {
    name: "Luís Pato Vinha Formal",
    region: "Bairrada",
    grape: "Bical",
    pairing: "Polvo e pratos intensos",
    year: "2021",
    price: "€42",
    featured: true,
  },
];

export default function WineBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0C2340] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-inter)] text-[#FB923C] text-xs tracking-[0.35em] uppercase mb-4"
            >
              Carta de Vinhos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-tight tracking-tight text-white"
            >
              Vinhos que
              <br />
              <span className="text-[#0369A1]">abraçam o mar</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-inter)] text-white/50 text-base leading-relaxed"
          >
            Uma seleção cuidada de brancos e vinhos naturais portugueses,
            escolhida para complementar — nunca competir — com o pescado. O
            sommelier está sempre disponível para aconselhar a melhor harmonia.
          </motion.p>
        </div>

        {/* Wine cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {wines.map((wine, i) => (
            <motion.div
              key={wine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-xl p-6 border transition-all duration-200 ${
                wine.featured
                  ? "bg-[#0369A1]/20 border-[#0369A1]/50"
                  : "bg-white/3 border-white/8 hover:bg-white/6"
              }`}
            >
              {wine.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#FB923C]/20 border border-[#FB923C]/40 rounded-full px-2.5 py-1">
                  <Star size={10} className="text-[#FB923C] fill-[#FB923C]" />
                  <span className="text-[#FB923C] text-xs font-medium font-[family-name:var(--font-inter)]">
                    Seleção
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#0369A1]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Wine size={16} className="text-[#7DD3FC]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-base leading-tight">
                    {wine.name}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-white/40 text-xs mt-0.5">
                    {wine.region} · {wine.year}
                  </p>
                </div>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-white/50 text-xs mb-3 leading-relaxed">
                {wine.grape}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Droplets size={12} className="text-[#FB923C]" />
                  <span className="font-[family-name:var(--font-inter)] text-[#FB923C]/80 text-xs">
                    {wine.pairing}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-hanken)] font-bold text-white text-base">
                  {wine.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cocktails note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#FB923C]/10 border border-[#FB923C]/20 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FB923C]/20 flex items-center justify-center flex-shrink-0">
            <Wine size={18} className="text-[#FB923C]" />
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-hanken)] font-bold text-white text-base mb-1">
              Bar de Cocktails Marinhos
            </h4>
            <p className="font-[family-name:var(--font-inter)] text-white/50 text-sm leading-relaxed">
              Cocktails criados com algas, citrinos atlânticos e destilados
              portugueses. Perfeitos para começar ou encerrar a noite. Peça ao
              bartender a sugestão da semana.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
