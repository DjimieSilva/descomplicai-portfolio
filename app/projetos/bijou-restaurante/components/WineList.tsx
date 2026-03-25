"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type Wine = { name: string; region: string; grape: string; notes: string; price: string; year?: string };
type WineCategory = { category: string; description: string; wines: Wine[] };

const wineData: WineCategory[] = [
  {
    category: "Vinhos Tintos",
    description: "Seleção dos melhores tintos das regiões do Dão, Bairrada e Douro",
    wines: [
      {
        name: "Quinta das Bágeiras",
        region: "Bairrada",
        grape: "Baga",
        notes: "Notas de ameixa, especiarias e taninos elegantes. Longa persistência.",
        price: "€ 32",
        year: "2019",
      },
      {
        name: "Quinta do Crasto Reserva",
        region: "Douro",
        grape: "Touriga Nacional, Touriga Franca",
        notes: "Frutos negros, notas de carvalho, estrutura robusta com final longo.",
        price: "€ 45",
        year: "2018",
      },
      {
        name: "Casa da Passarella",
        region: "Dão",
        grape: "Touriga Nacional",
        notes: "Violetas, frutos silvestres, acidez equilibrada, elegante e fresco.",
        price: "€ 28",
        year: "2020",
      },
      {
        name: "Vinho da Casa",
        region: "Dão",
        grape: "Blend Regional",
        notes: "Encorpado, frutado, harmonioso. O companheiro perfeito das nossas carnes.",
        price: "€ 14 (garrafa)",
        year: "2021",
      },
    ],
  },
  {
    category: "Vinhos Brancos",
    description: "Brancos frescos e aromáticos, perfeitos com o peixe da costa",
    wines: [
      {
        name: "Quinta de Lemos Encruzado",
        region: "Dão",
        grape: "Encruzado",
        notes: "Cítricos, floral, mineralidade elegante, ótima acidez. Ideal com peixe.",
        price: "€ 29",
        year: "2022",
      },
      {
        name: "Alvarinho Soalheiro",
        region: "Vinho Verde",
        grape: "Alvarinho",
        notes: "Fresco, pétillant, limão, maçã verde. Casamento perfeito com marisco.",
        price: "€ 26",
        year: "2023",
      },
      {
        name: "Anselmo Mendes Muros Antigos",
        region: "Vinho Verde",
        grape: "Loureiro",
        notes: "Floral, fresco, notas herbáceas, acidez vibrante e refrescante.",
        price: "€ 22",
        year: "2023",
      },
      {
        name: "Vinho Branco da Casa",
        region: "Bairrada",
        grape: "Bical, Maria Gomes",
        notes: "Fresco, ligeiramente frutado, bom acompanhamento para peixes grelhados.",
        price: "€ 12 (garrafa)",
        year: "2023",
      },
    ],
  },
  {
    category: "Vinhos do Porto & Digestivos",
    description: "Para encerrar uma refeição com a elegância que merece",
    wines: [
      {
        name: "Ramos Pinto 10 Anos Tawny",
        region: "Douro",
        grape: "Blend Douro",
        notes: "Figos secos, nozes, caramelo, final longo e aveludado.",
        price: "€ 8 (copo)",
      },
      {
        name: "Graham's LBV",
        region: "Douro",
        grape: "Blend Douro",
        notes: "Frutos negros concentrados, chocolate, elegante e estruturado.",
        price: "€ 9 (copo)",
      },
      {
        name: "Ginjinha do Óbidos",
        region: "Óbidos",
        grape: "Ginja",
        notes: "Cereja, especiarias, doçura equilibrada. Tradição portuguesa.",
        price: "€ 4 (copo)",
      },
    ],
  },
];

export default function WineList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="adega"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#800020" }}
    >
      {/* Background ornament */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" className="absolute right-0 top-0 w-96 h-96" fill="none">
          <circle cx="200" cy="200" r="150" stroke="#CFB53B" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" stroke="#CFB53B" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="90" stroke="#CFB53B" strokeWidth="1" />
          <path d="M200 50L200 350M50 200L350 200M80 80L320 320M320 80L80 320" stroke="#CFB53B" strokeWidth="0.5" />
        </svg>
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            A Nossa Adega
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
          >
            Carta de Vinhos
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.6)" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#CFB53B">
              <path d="M7 0C7 0 3 2.5 3 6.5C3 9 4.79 11 7 11C9.21 11 11 9 11 6.5C11 2.5 7 0 7 0ZM7 9C5.9 9 5 8.1 5 7C5 5.67 5.63 4.17 7 3C8.37 4.17 9 5.67 9 7C9 8.1 8.1 9 7 9Z" />
              <path d="M6.5 11H7.5V14H6.5V11Z" />
              <path d="M4 13H10V14H4V13Z" />
            </svg>
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.6)" }} />
          </div>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,240,0.8)", fontFamily: "var(--font-source-sans-3)" }}
          >
            Uma seleção cuidada das melhores regiões vinícolas portuguesas,
            para harmonizar com cada prato da nossa ementa.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-0 mb-10"
        >
          {wineData.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className="py-3 px-6 text-xs tracking-widest uppercase transition-all duration-300 border"
              style={{
                fontFamily: "var(--font-source-sans-3)",
                background: activeCategory === i ? "#CFB53B" : "transparent",
                color: activeCategory === i ? "#4A3728" : "rgba(207,181,59,0.7)",
                borderColor: "rgba(207,181,59,0.3)",
              }}
            >
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          key={`desc-${activeCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center text-sm mb-8 italic"
          style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-eb-garamond)" }}
        >
          {wineData[activeCategory].description}
        </motion.p>

        {/* Wine items */}
        <motion.div
          key={`wines-${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-0"
        >
          {wineData[activeCategory].wines.map((wine, i) => (
            <motion.div
              key={wine.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-6 border-b"
              style={{ borderColor: "rgba(207,181,59,0.15)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
                    >
                      {wine.name}
                    </h3>
                    {wine.year && (
                      <span
                        className="text-xs tracking-wide"
                        style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                      >
                        {wine.year}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs tracking-wide mb-2"
                    style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    {wine.region} · {wine.grape}
                  </p>
                  <p
                    className="text-sm italic"
                    style={{ color: "rgba(255,255,240,0.65)", fontFamily: "var(--font-eb-garamond)" }}
                  >
                    {wine.notes}
                  </p>
                </div>
                <div
                  className="text-lg font-bold flex-shrink-0"
                  style={{ fontFamily: "var(--font-eb-garamond)", color: "#CFB53B" }}
                >
                  {wine.price}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs mt-8"
          style={{ color: "rgba(255,255,240,0.4)", fontFamily: "var(--font-source-sans-3)" }}
        >
          * Carta sujeita a alterações conforme disponibilidade. Peça ao nosso sommelier sugestões de harmonização.
        </motion.p>
      </div>
    </section>
  );
}
