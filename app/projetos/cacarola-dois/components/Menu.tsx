"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    id: "entrada",
    label: "Entradas",
    items: [
      {
        name: "Ceviche de Dourada",
        description:
          "Dourada da costa atlântica, leite de tigre cítrico, cebola roxa, coentros e pepino",
        price: "€14",
        tag: "Destaque",
      },
      {
        name: "Tartare de Atum",
        description:
          "Atum fresco, abacate, gergelim tostado, molho de soja e limão, chips de wonton",
        price: "€16",
      },
      {
        name: "Amêijoas à Bulhão Pato",
        description:
          "Amêijoas da Ria de Aveiro, azeite, alho, coentros e vinho branco da região",
        price: "€13",
        tag: "Clássico",
      },
      {
        name: "Percebes da Costa",
        description: "Percebes apanhados na costa da Figueira, cozidos no ponto",
        price: "€18",
      },
    ],
  },
  {
    id: "principal",
    label: "Principais",
    items: [
      {
        name: "Arroz de Tamboril",
        description:
          "Tamboril fresco, arroz carolino, camarão, açafrão e ervas aromáticas",
        price: "€22",
        tag: "Especialidade",
      },
      {
        name: "Polvo à Lagareiro",
        description:
          "Polvo confitado, batatas a murro, azeite extra-virgem e alho assado",
        price: "€19",
        tag: "Destaque",
      },
      {
        name: "Robalo Grelhado",
        description:
          "Robalo inteiro grelhado na brasa, legumes salteados, molho verde e limão",
        price: "€23",
      },
      {
        name: "Açorda de Marisco",
        description:
          "Pão caseiro, camarão, berbigão, coentros e gema de ovo — reconforto à beira-mar",
        price: "€20",
        tag: "Clássico",
      },
    ],
  },
  {
    id: "sobremesa",
    label: "Sobremesas",
    items: [
      {
        name: "Tarte de Lima e Coco",
        description:
          "Base de amendoim, creme de lima fresca, coco tostado e raspas de lima",
        price: "€7",
        tag: "Destaque",
      },
      {
        name: "Mousse de Chocolate Negro",
        description: "Chocolate negro 70%, flor de sal da Figueira e azeite",
        price: "€6",
      },
      {
        name: "Pudim de Leite da Caçarola",
        description: "Receita da casa desde o início — cremoso, caramelizado na perfeição",
        price: "€6",
        tag: "Original",
      },
    ],
  },
];

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("entrada");

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="ementa" ref={ref} className="bg-[#0C2340] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-[#FB923C] text-xs tracking-[0.35em] uppercase mb-4"
        >
          A Ementa
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-white mb-4"
        >
          Mar fresco,
          <br />
          <span className="text-[#0369A1]">sabor autêntico</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-inter)] text-white/50 text-sm mb-12 max-w-md"
        >
          A ementa varia consoante a disponibilidade do mercado. Pergunte ao
          servidor sobre as sugestões do dia.
        </motion.p>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-[family-name:var(--font-hanken)] font-semibold px-6 py-3 text-sm tracking-wide rounded-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#FB923C] text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="divide-y divide-white/5"
          >
            {currentCategory.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-start justify-between gap-6 py-6 hover:bg-white/2 -mx-4 px-4 rounded-lg transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-base sm:text-lg">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium font-[family-name:var(--font-inter)] ${
                          item.tag === "Destaque" || item.tag === "Especialidade"
                            ? "bg-[#FB923C]/20 text-[#FB923C]"
                            : item.tag === "Clássico"
                            ? "bg-[#0369A1]/30 text-[#7DD3FC]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="font-[family-name:var(--font-hanken)] font-bold text-[#FB923C] text-lg whitespace-nowrap pt-0.5">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-[family-name:var(--font-inter)] text-white/25 text-xs mt-10 pt-8 border-t border-white/5"
        >
          Preços incluem IVA à taxa legal em vigor. Informamos sobre alergénios
          a pedido. A ementa pode sofrer alterações sem aviso prévio.
        </motion.p>
      </div>
    </section>
  );
}
