"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Wine {
  name: string;
  producer: string;
  year: string;
  grape: string;
  notes: string;
  price: string;
  by_glass?: string;
}

interface WineRegion {
  region: string;
  description: string;
  whites: Wine[];
  reds: Wine[];
}

const wineRegions: WineRegion[] = [
  {
    region: "Vinhos Verdes",
    description: "Da região minhota, frescos e minerais — perfeitos para os frutos do mar",
    whites: [
      {
        name: "Alvarinho Reserva",
        producer: "Quinta de Soalheiro",
        year: "2023",
        grape: "Alvarinho",
        notes: "Floral, pêssego branco, mineralidade viva, final longo e salino",
        price: "€ 42",
        by_glass: "€ 9",
      },
      {
        name: "Loureiro Sobre Lies",
        producer: "Aphros",
        year: "2023",
        grape: "Loureiro",
        notes: "Citrino, flor de acácia, borbulha fina, acidez refrescante",
        price: "€ 38",
        by_glass: "€ 8",
      },
    ],
    reds: [],
  },
  {
    region: "Dão",
    description: "Elegância e terroir granítico — a Borgonha portuguesa",
    whites: [
      {
        name: "Encruzado Grande Reserva",
        producer: "Quinta dos Carvalhais",
        year: "2022",
        grape: "Encruzado",
        notes: "Maçã verde, cítrico, notas minerais, textura cremosa e fresca",
        price: "€ 55",
      },
    ],
    reds: [
      {
        name: "Touriga Nacional Reserva",
        producer: "Quinta da Pellada",
        year: "2020",
        grape: "Touriga Nacional",
        notes: "Violeta, frutos negros, especiaria, taninos sedosos, longa persistência",
        price: "€ 65",
        by_glass: "€ 13",
      },
      {
        name: "Tinto Colheita",
        producer: "Casa de Mouraz",
        year: "2021",
        grape: "Touriga Nacional, Alfrocheiro, Tinta Roriz",
        notes: "Amoras, especiarias, herbáceo, fresco e equilibrado",
        price: "€ 48",
        by_glass: "€ 10",
      },
    ],
  },
  {
    region: "Alentejo",
    description: "Potência, generosidade e sol — para os pratos mais robustos",
    whites: [
      {
        name: "Antão Vaz Reserva",
        producer: "Esporão",
        year: "2022",
        grape: "Antão Vaz",
        notes: "Tropical, baunilha, nozes, encorpado e longo",
        price: "€ 52",
      },
    ],
    reds: [
      {
        name: "Cartuxa Reserva",
        producer: "Fundação Eugénio de Almeida",
        year: "2019",
        grape: "Aragonez, Trincadeira, Alicante Bouschet",
        notes: "Frutos negros maduros, tabaco, cedro, taninos polidos",
        price: "€ 72",
        by_glass: "€ 15",
      },
      {
        name: "Monte da Cal Tinto",
        producer: "Herdade do Sobroso",
        year: "2021",
        grape: "Aragonez, Syrah, Alicante Bouschet",
        notes: "Ameixa, chocolate negro, pimenta preta, estruturado",
        price: "€ 58",
      },
    ],
  },
  {
    region: "Douro",
    description: "Personalidade e profundidade dos socalcos xistosos do Rio Douro",
    whites: [],
    reds: [
      {
        name: "Niepoort Redoma Reserva",
        producer: "Niepoort",
        year: "2020",
        grape: "Castelão, Touriga Franca, Tinta Amarela",
        notes: "Elegante, frutas vermelhas, mineral, balsâmico, longa persistência",
        price: "€ 85",
        by_glass: "€ 18",
      },
      {
        name: "Quinta do Crasto Reserva",
        producer: "Quinta do Crasto",
        year: "2019",
        grape: "Touriga Nacional, Touriga Franca",
        notes: "Amoras, especiaria, chocolate, estrutura firme e elegante",
        price: "€ 68",
      },
    ],
  },
];

export default function WineSelection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeRegion, setActiveRegion] = useState(0);

  const region = wineRegions[activeRegion];
  const allWines = [...region.whites, ...region.reds];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#292524]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Adega
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#FFFBEB] mb-4"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            Vinhos{" "}
            <span className="italic text-[#B87333]">Portugueses</span>
          </h2>

          <p
            className="text-[#FFFBEB]/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Uma cave cuidadosamente curada com os melhores produtores das regiões
            vitivinícolas portuguesas, selecionados pelo nosso sommelier.
          </p>
        </motion.div>

        {/* Region tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {wineRegions.map((r, i) => (
            <button
              key={r.region}
              onClick={() => setActiveRegion(i)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                activeRegion === i
                  ? "bg-[#B87333] text-[#FFFBEB]"
                  : "border border-[#FFFBEB]/15 text-[#FFFBEB]/50 hover:border-[#B87333]/50 hover:text-[#B87333]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {r.region}
            </button>
          ))}
        </motion.div>

        {/* Region info */}
        <motion.p
          key={activeRegion + "-desc"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center text-[#FFFBEB]/40 text-sm mb-10 italic"
          style={{ fontFamily: "var(--font-literata)" }}
        >
          {region.description}
        </motion.p>

        {/* Wines grid */}
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#FFFBEB]/8"
        >
          {allWines.map((wine, i) => (
            <div
              key={wine.name}
              className="bg-[#292524] p-8 hover:bg-[#1B4332]/30 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase text-[#B87333]/70 border border-[#B87333]/30 px-2 py-0.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {i < region.whites.length ? "Branco" : "Tinto"}
                    </span>
                    <span
                      className="text-[10px] text-[#FFFBEB]/30"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {wine.year}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-light text-[#FFFBEB] group-hover:text-[#B87333] transition-colors"
                    style={{ fontFamily: "var(--font-literata)" }}
                  >
                    {wine.name}
                  </h3>
                  <p
                    className="text-xs text-[#FFFBEB]/40 mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {wine.producer} · {wine.grape}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-[#B87333] font-medium text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {wine.price}
                  </p>
                  {wine.by_glass && (
                    <p
                      className="text-[#FFFBEB]/30 text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Copo {wine.by_glass}
                    </p>
                  )}
                </div>
              </div>
              <p
                className="text-sm text-[#FFFBEB]/40 leading-relaxed italic"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {wine.notes}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Sommelier note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p
            className="text-[#FFFBEB]/30 text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A nossa carta conta com mais de 200 referências · Harmonização orientada pelo Sommelier Rui Neves
          </p>
        </motion.div>
      </div>
    </section>
  );
}
