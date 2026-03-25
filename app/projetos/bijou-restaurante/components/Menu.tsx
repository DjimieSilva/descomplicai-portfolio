"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type MenuItem = { name: string; description: string; price: string; tag?: string };
type MenuSection = { category: string; items: MenuItem[] };

const menuData: MenuSection[] = [
  {
    category: "Entradas",
    items: [
      {
        name: "Ameijoas à Bulhão Pato",
        description: "Ameijoas frescas da Ria de Aveiro, alho, coentros e azeite virgem extra",
        price: "€ 14",
        tag: "Favorito",
      },
      {
        name: "Caldo Verde da Casa",
        description: "Receita original de 1912, couve galega, chouriço de Arouca, azeite verde",
        price: "€ 8",
        tag: "Desde 1912",
      },
      {
        name: "Pataniscas de Bacalhau",
        description: "Bacalhau desfiado, salsa, cebola, servido com arroz de feijão",
        price: "€ 12",
      },
      {
        name: "Queijo da Serra com Mel e Nozes",
        description: "Queijo curado da Serra da Estrela, mel de rosmaninho, nozes tostadas",
        price: "€ 11",
      },
      {
        name: "Presunto de Lamego com Melão",
        description: "Presunto de pata negra, melão piel de sapo, azeite do Alentejo",
        price: "€ 13",
      },
      {
        name: "Sopa de Peixe do Dia",
        description: "Preparada com o peixe fresco do dia, legumes da horta e pão torrado",
        price: "€ 9",
      },
    ],
  },
  {
    category: "Pratos Principais",
    items: [
      {
        name: "Bacalhau à Bijou",
        description:
          "Lombo de bacalhau demolhado 48h, batata a murro, grelos salteados, ovo cozido, azeite virgem extra. A receita que nos define.",
        price: "€ 22",
        tag: "Ex Libris",
      },
      {
        name: "Arroz de Tamboril com Gambas",
        description:
          "Tamboril fresco de Buarcos, gambas, arroz malandrinho, coentros, vinho branco da região",
        price: "€ 26",
        tag: "Favorito",
      },
      {
        name: "Cataplana de Mariscos",
        description:
          "Amêijoas, mexilhões, gambas, lingueirão, tomate, pimento, coentros. Para dois.",
        price: "€ 28",
        tag: "Para 2",
      },
      {
        name: "Cabrito Assado no Forno",
        description:
          "Cabrito da Serra, alho, louro, vinho branco, banha, batatas a rodelar. Assado durante 4 horas.",
        price: "€ 24",
        tag: "Encomenda",
      },
      {
        name: "Leitão à Bairrada",
        description:
          "Leitão estaladiço, banhado em caldo de alho e louro, laranja da época",
        price: "€ 22",
      },
      {
        name: "Carne de Porco Alentejana",
        description:
          "Cubos de lombo marinados em massa de pimentão, ameijoas, coentros, batata frita",
        price: "€ 19",
      },
      {
        name: "Dourada Grelhada ao Sal",
        description: "Dourada inteira grelhada no carvão, sal grosso, azeite do Alentejo, salada",
        price: "€ 20",
      },
      {
        name: "Bacalhau com Broa de Milho",
        description: "Lombo de bacalhau, crosta de broa de Avintes, grelos, alho confitado",
        price: "€ 21",
      },
    ],
  },
  {
    category: "Sobremesas",
    items: [
      {
        name: "Leite Creme Queimado",
        description: "Receita centenária da casa, creme rico, caramelizado na hora com açúcar queimado",
        price: "€ 7",
        tag: "Desde 1912",
      },
      {
        name: "Pudim Abade de Priscos",
        description: "Pudim conventual, toucinho, ovos, vinho do Porto, caramelo escuro",
        price: "€ 8",
      },
      {
        name: "Tarte de Amêndoa com Gelado",
        description: "Tarte estaladiça de amêndoa da Covilhã, gelado de baunilha artesanal",
        price: "€ 8",
      },
      {
        name: "Mousse de Chocolate Negro",
        description: "Chocolate 72% cacau, flor de sal, azeite de qualidade, biscoito de cacau",
        price: "€ 7",
      },
      {
        name: "Arroz Doce da Avó Elvira",
        description: "Receita original de 1912, arroz carolino, leite, canela, limão. Servido frio.",
        price: "€ 6",
        tag: "Desde 1912",
      },
      {
        name: "Frutos da Época com Gelado",
        description: "Seleção de frutas frescas da época, gelado de baunilha, mel de rosmaninho",
        price: "€ 9",
      },
    ],
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  "Ex Libris": { bg: "#800020", text: "#FFFFF0" },
  Favorito: { bg: "#CFB53B", text: "#4A3728" },
  "Desde 1912": { bg: "#4A3728", text: "#CFB53B" },
  "Para 2": { bg: "#6B5344", text: "#FFFFF0" },
  Encomenda: { bg: "rgba(128,0,32,0.15)", text: "#800020" },
};

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="menu"
      className="py-24 px-6"
      style={{
        background: "linear-gradient(180deg, #FFFFF0 0%, #FAF7F0 100%)",
      }}
    >
      <div ref={ref} className="max-w-4xl mx-auto">
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
            A Nossa Ementa
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
          >
            Sabores de Portugal
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "#6B5344", fontFamily: "var(--font-source-sans-3)" }}
          >
            Cozinha portuguesa tradicional, preparada com ingredientes frescos
            e receitas que resistiram ao teste do tempo.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-0 mb-12 border"
          style={{ borderColor: "rgba(74,55,40,0.2)" }}
        >
          {menuData.map((section, i) => (
            <button
              key={section.category}
              onClick={() => setActiveCategory(i)}
              className="flex-1 py-3 text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-source-sans-3)",
                background: activeCategory === i ? "#800020" : "transparent",
                color: activeCategory === i ? "#FFFFF0" : "#6B5344",
                borderRight: i < menuData.length - 1 ? "1px solid rgba(74,55,40,0.2)" : "none",
              }}
            >
              {section.category}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-0"
        >
          {menuData[activeCategory].items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group py-6 border-b flex items-start gap-4"
              style={{ borderColor: "rgba(74,55,40,0.1)" }}
            >
              <div className="flex-1">
                <div className="flex items-start gap-3 flex-wrap mb-1">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
                  >
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span
                      className="text-xs px-2 py-0.5 tracking-wide self-center"
                      style={{
                        background: tagColors[item.tag]?.bg ?? "#CFB53B",
                        color: tagColors[item.tag]?.text ?? "#4A3728",
                        fontFamily: "var(--font-source-sans-3)",
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#8B6E5A", fontFamily: "var(--font-source-sans-3)" }}
                >
                  {item.description}
                </p>
              </div>
              <div
                className="text-xl font-bold flex-shrink-0 pt-1"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#800020" }}
              >
                {item.price}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs mt-8"
          style={{ color: "#8B6E5A", fontFamily: "var(--font-source-sans-3)" }}
        >
          * Preços com IVA incluído. O cabrito assado requer encomenda com 24h de antecedência.
          Ementa sujeita a alterações conforme disponibilidade sazonal.
        </motion.p>
      </div>
    </section>
  );
}
