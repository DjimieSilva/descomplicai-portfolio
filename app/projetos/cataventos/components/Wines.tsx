"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wine } from "lucide-react";

const regions = [
  {
    name: "Dão",
    description: "Vinhos elegantes do coração da Beira Alta, com taninos suaves e acidez equilibrada.",
    wines: [
      { name: "Quinta dos Roques Encruzado", type: "Branco", year: "2022", price: "38€" },
      { name: "Casa de Mouraz Tinto", type: "Tinto", year: "2021", price: "32€" },
    ],
  },
  {
    name: "Bairrada",
    description: "Região vizinha, conhecida pela Baga robusta e pelos espumantes de método clássico.",
    wines: [
      { name: "Filipa Pato Blanc de Noirs", type: "Espumante", year: "2021", price: "45€", highlight: true },
      { name: "Luís Pato Vinha Pan", type: "Tinto", year: "2019", price: "42€" },
    ],
  },
  {
    name: "Alentejo",
    description: "Vinhos de carácter, ricos e generosos, fruto do sol e dos solos de ardósia.",
    wines: [
      { name: "Esporão Reserva Branco", type: "Branco", year: "2022", price: "28€" },
      { name: "Herdade do Esporão Reserva Tinto", type: "Tinto", year: "2020", price: "30€", highlight: true },
    ],
  },
  {
    name: "Douro",
    description: "Vinhos com alma, forjados em xisto e altitude. O melhor do Nordeste transmontano.",
    wines: [
      { name: "Niepoort Redoma Branco", type: "Branco", year: "2022", price: "48€", highlight: true },
      { name: "Quinta do Crasto LBV", type: "Porto", year: "2018", price: "35€" },
    ],
  },
];

const typeColors: { [key: string]: string } = {
  Branco: "bg-[#F59E0B]/15 text-[#B45309] border-[#F59E0B]/30",
  Tinto: "bg-[#1E293B]/10 text-[#1E293B] border-[#1E293B]/20",
  Espumante: "bg-[#FFFDF7] text-[#B45309] border-[#F59E0B]/40",
  Porto: "bg-[#B45309]/10 text-[#B45309] border-[#B45309]/30",
};

export default function Wines() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="vinhos" className="py-24 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332] via-[#1E293B] to-[#1a2332]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      {/* Background wine glass silhouette */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-3 pointer-events-none">
        <svg viewBox="0 0 200 400" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 20 L140 20 Q160 80 140 140 Q130 180 100 190 Q70 180 60 140 Q40 80 60 20Z M100 190 L100 340 M70 340 L130 340"
            stroke="#F59E0B"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <Wine className="w-5 h-5 text-[#F59E0B]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Carta de Vinhos
          </h2>
          <p className="text-[#FFFDF7]/60 text-lg max-w-xl mx-auto">
            Uma seleção curada das melhores regiões vinícolas portuguesas. Cada garrafa conta uma história de terroir e dedicação.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#F59E0B]/15 border border-[#F59E0B]/30 rounded-full px-4 py-2">
            <span className="text-[#F59E0B] text-sm font-medium">
              Distinguida na Seleção Gastronomia e Vinhos
            </span>
          </div>
        </motion.div>

        {/* Wine regions grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="border border-[#FFFDF7]/10 rounded-sm p-8 hover:border-[#F59E0B]/30 transition-all duration-300 bg-[#FFFDF7]/3"
            >
              {/* Region header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-[#F59E0B]" />
                <h3
                  className="text-xl font-bold text-[#F59E0B] tracking-wide"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {region.name}
                </h3>
              </div>
              <p className="text-[#FFFDF7]/50 text-sm leading-relaxed mb-6">{region.description}</p>

              {/* Wine list */}
              <div className="space-y-4">
                {region.wines.map((wine) => (
                  <div
                    key={wine.name}
                    className={`flex items-center justify-between gap-4 p-4 rounded-sm transition-all ${
                      wine.highlight
                        ? "bg-[#F59E0B]/10 border border-[#F59E0B]/20"
                        : "bg-[#FFFDF7]/3 border border-[#FFFDF7]/5"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[#FFFDF7] font-medium text-sm truncate">{wine.name}</span>
                        {wine.highlight && (
                          <span className="text-[#F59E0B] text-xs border border-[#F59E0B]/30 px-1.5 py-0.5 rounded-sm tracking-wide flex-shrink-0">
                            Seleção
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-sm border ${typeColors[wine.type] || ""}`}
                        >
                          {wine.type}
                        </span>
                        <span className="text-[#FFFDF7]/30 text-xs">{wine.year}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-[#F59E0B] font-bold text-sm">{wine.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sommelier note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-[#FFFDF7]/40 text-sm italic">
            O nosso sommelier está disponível para sugerir a combinação ideal para a sua refeição.
            Carta completa disponível no restaurante.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
