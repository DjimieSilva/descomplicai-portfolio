"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Flame, Leaf } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: "recomendado" | "sazonal" | "popular";
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const categories: Category[] = [
  {
    id: "especialidades",
    label: "Especialidades",
    emoji: "⭐",
    items: [
      {
        name: "Caldeirada à Pescador",
        description:
          "Peixe misto do dia com batata, tomate, pimento e coentros. A receita mais antiga da casa.",
        price: "€18",
        tag: "recomendado",
      },
      {
        name: "Arroz de Marisco do Marégrafo",
        description:
          "Arroz caldoso com gambas, amêijoas, mexilhão e sapateira. Para 2 pessoas.",
        price: "€34",
        tag: "recomendado",
      },
      {
        name: "Cataplana de Amêijoas",
        description: "Amêijoas com chouriço, tomate, salsa e vinho branco.",
        price: "€22",
        tag: "popular",
      },
      {
        name: "Açorda de Bacalhau",
        description:
          "Açorda alentejana com bacalhau desfiado, ovo escalfado e coentros frescos.",
        price: "€16",
      },
    ],
  },
  {
    id: "grelhados",
    label: "Grelhados",
    emoji: "🔥",
    items: [
      {
        name: "Peixe do Dia Grelhado",
        description:
          "O peixe fresco desta manhã, grelhado na brasa com azeite e limão. Acompanha batata e salada.",
        price: "€14–22",
        tag: "sazonal",
      },
      {
        name: "Dourada Grelhada",
        description: "Dourada inteira com escamas de sal, azeite e ervas aromáticas.",
        price: "€17",
      },
      {
        name: "Robalo no Sal",
        description: "Robalo inteiro em crosta de sal grosso. Sabor puro do mar.",
        price: "€22",
        tag: "recomendado",
      },
      {
        name: "Camarão Tigre Grelhado",
        description: "Camarão tigre com alho, manteiga e limão. Acompanha pão de alho.",
        price: "€26",
      },
    ],
  },
  {
    id: "marisco",
    label: "Marisco",
    emoji: "🦞",
    items: [
      {
        name: "Amêijoas à Bulhão Pato",
        description: "Amêijoas frescas com alho, azeite e coentros. Clássico português.",
        price: "€15",
        tag: "popular",
      },
      {
        name: "Percebes",
        description: "Percebes da costa atlântica, cozidos com água do mar e sal.",
        price: "€22",
        tag: "sazonal",
      },
      {
        name: "Sapateira Recheada",
        description: "Sapateira com recheio da própria, mostarda, whisky e azeitona.",
        price: "€20",
      },
      {
        name: "Lagosta Grelhada",
        description: "Lagosta inteira com manteiga de ervas. Sob encomenda.",
        price: "€35",
        tag: "recomendado",
      },
    ],
  },
  {
    id: "entradas",
    label: "Entradas",
    emoji: "🫙",
    items: [
      {
        name: "Polvo à Lagareiro",
        description: "Tentáculos de polvo com batata a murro, azeite e alho assado.",
        price: "€16",
        tag: "popular",
      },
      {
        name: "Pataniscas de Bacalhau",
        description: "Pataniscas caseiras com feijão-frade e salada de tomate.",
        price: "€9",
      },
      {
        name: "Canapés de Marisco",
        description: "Seleção de canapés com gambas, cavala fumada e pasta de atum.",
        price: "€12",
      },
      {
        name: "Gaspacho do Mar",
        description: "Gaspacho frio com camarão marinado e pepino. Entrada refrescante.",
        price: "€8",
        tag: "sazonal",
      },
    ],
  },
];

const tagColors: Record<string, { bg: string; text: string; label: string }> = {
  recomendado: { bg: "#D4A574", text: "white", label: "Chef recomenda" },
  popular: { bg: "#003049", text: "#B8E0D2", label: "Muito pedido" },
  sazonal: { bg: "#B8E0D2", text: "#003049", label: "Sazonal" },
};

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("especialidades");

  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <section
      ref={ref}
      id="ementa"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ backgroundColor: "#B8E0D2", color: "#003049" }}
          >
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">Ementa 2025</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
          >
            O que o mar trouxe hoje
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#4a6070" }}>
            A nossa ementa muda com as estações e com o que os pescadores trazem.
            O que se mantém é sempre a frescura.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300"
              style={
                activeCategory === cat.id
                  ? { backgroundColor: "#003049", color: "white" }
                  : { backgroundColor: "white", color: "#003049", border: "1.5px solid #B8E0D2" }
              }
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-5"
        >
          {current.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 flex justify-between gap-4 group hover:shadow-md transition-all duration-300"
              style={{ backgroundColor: "white", border: "1px solid #e8f0f5" }}
            >
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
                  >
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span
                      className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: tagColors[item.tag].bg,
                        color: tagColors[item.tag].text,
                      }}
                    >
                      {tagColors[item.tag].label}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6070" }}>
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "Lexend, sans-serif", color: "#D4A574" }}
                >
                  {item.price}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm"
          style={{ color: "#4a6070" }}
        >
          <Leaf className="w-4 h-4" />
          <span>
            Ementa sujeita a alterações conforme disponibilidade diária. Preços com IVA incluído.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
