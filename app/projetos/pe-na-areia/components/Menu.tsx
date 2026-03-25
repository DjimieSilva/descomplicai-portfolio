"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "entradas",
    label: "Entradas",
    items: [
      {
        name: "Amêijoas à Bulhão Pato",
        desc: "Amêijoas frescas, azeite extra virgem, alho, coentros e vinho branco",
        price: "18",
        tag: "Clássico",
      },
      {
        name: "Percebes do Dia",
        desc: "Percebes apanhados na costa, cozidos em água do mar",
        price: "24",
        tag: "Sazonal",
      },
      {
        name: "Camarão da Costa",
        desc: "Camarão grelhado na brasa, manteiga de ervas aromáticas",
        price: "22",
        tag: null,
      },
      {
        name: "Polvo à Lagareiro",
        desc: "Tentáculos de polvo confitados, azeite de coentros, batata a murro",
        price: "19",
        tag: "Distinção",
      },
    ],
  },
  {
    id: "mar",
    label: "Do Mar",
    items: [
      {
        name: "Dourada da Foz Grelhada",
        desc: "Dourada inteira grelhada na brasa, guarnição de legumes da horta e arroz de limão",
        price: "34",
        tag: "Recomendado",
      },
      {
        name: "Robalo Selvagem ao Sal",
        desc: "Robalo do Atlântico em crosta de sal marinho, azeite de ervas finas",
        price: "42",
        tag: "Assinatura",
      },
      {
        name: "Cataplana de Marisco",
        desc: "Amêijoas, mexilhão, camarão e berbigão, tomate, pimento e coentros",
        price: "38",
        tag: "Para 2",
      },
      {
        name: "Arroz de Lingueirão",
        desc: "Arroz malandrinho, lingueirão fresco, salsa e limão",
        price: "32",
        tag: null,
      },
    ],
  },
  {
    id: "terra",
    label: "Da Terra",
    items: [
      {
        name: "Secretos de Porco Preto",
        desc: "Secretos grelhados, legumes da estação salteados, molho de mostarda e mel",
        price: "28",
        tag: null,
      },
      {
        name: "Bife do Lombo",
        desc: "Lombo de novilho, manteiga de alho e tomilho, batata frita caseira",
        price: "36",
        tag: null,
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      {
        name: "Tarte de Lima com Merengue",
        desc: "Lima da Figueira, merengue queimado, coulis de frutos vermelhos",
        price: "9",
        tag: "Distinção",
      },
      {
        name: "Arroz Doce da Casa",
        desc: "Receita tradicional, canela do Oriente, raspa de limão",
        price: "7",
        tag: "Clássico",
      },
      {
        name: "Semifrio de Chocolate",
        desc: "Chocolate 70%, flor de sal, crocante de amêndoa",
        price: "9",
        tag: null,
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  Clássico: "#9A8C72",
  Sazonal: "#0E7490",
  Distinção: "#DDB892",
  Recomendado: "#F97316",
  Assinatura: "#DDB892",
  "Para 2": "#9A8C72",
};

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("entradas");

  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <section ref={ref} id="ementa" className="py-24 md:py-32 bg-[#16120e] relative overflow-hidden">
      {/* Subtle sand background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#DDB892]/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Ementa
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Sabores do{" "}
            <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
              Atlântico
            </span>
          </h2>
          <p className="text-[#9A8C72] text-sm max-w-md mx-auto">
            A nossa ementa muda com as marés — peixe e marisco frescos todos os
            dias, diretos do Atlântico.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#DDB892] text-[#1a1410] font-medium"
                  : "border border-[#DDB892]/20 text-[#9A8C72] hover:border-[#DDB892]/40 hover:text-[#DDB892]"
              }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {active.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 border border-[#DDB892]/8 rounded-xl hover:border-[#DDB892]/20 transition-all duration-400 bg-[#1a1410]/60 hover:bg-[#DDB892]/4"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3
                      className="text-[#FAF8F4] text-base font-medium"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border"
                        style={{
                          color: tagColors[item.tag] || "#9A8C72",
                          borderColor: `${tagColors[item.tag] || "#9A8C72"}40`,
                          backgroundColor: `${tagColors[item.tag] || "#9A8C72"}10`,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[#9A8C72] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div
                  className="text-[#DDB892] font-light text-lg flex-shrink-0"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
                >
                  {item.price}€
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-[#9A8C72]/50 text-xs mt-10 tracking-wide"
        >
          A ementa pode variar consoante a disponibilidade do produto fresco do dia.
          Informamos sobre alérgenos a pedido.
        </motion.p>
      </div>
    </section>
  );
}
