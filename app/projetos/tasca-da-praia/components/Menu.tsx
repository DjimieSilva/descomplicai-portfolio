"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Flame, Info } from "lucide-react";

type Category = "grelhados" | "tachos" | "entradas" | "sobremesas";

const menu: Record<Category, { name: string; desc: string; price: string; badge?: string }[]> = {
  grelhados: [
    {
      name: "Sardinha Assada",
      desc: "Sardinha da costa, sal grosso, brasa de carvão. Acompanha pão alentejano e pimentos assados.",
      price: "€8",
      badge: "Favorito",
    },
    {
      name: "Robalo Grelhado",
      desc: "Robalo do mar, limão e azeite virgem extra. Servido com batata a murro e salada da época.",
      price: "€16",
    },
    {
      name: "Dourada da Costa",
      desc: "Dourada fresca grelhada na brasa, alho e ervas aromáticas. Consoante o tamanho do peixe.",
      price: "€14",
    },
    {
      name: "Cherne Grelhado",
      desc: "O rei dos peixes da nossa costa. Quando há, é dia de festa.",
      price: "€22",
      badge: "Especial",
    },
  ],
  tachos: [
    {
      name: "Caldeirada de Peixe",
      desc: "A receita da avó. Peixe misto do dia, batata, pimento, tomate e muito coentro. Uma refeição completa.",
      price: "€20",
      badge: "Tradição",
    },
    {
      name: "Arroz de Marisco",
      desc: "Malandrinho, como deve ser. Com berbigão, camarão, amêijoa e mexilhão da costa.",
      price: "€25",
    },
    {
      name: "Sopa de Peixe",
      desc: "Caldo encorpado de peixe, com hortelã e pão de trigo. O aquecimento da alma.",
      price: "€6",
    },
    {
      name: "Conquilhas à Bulhão Pato",
      desc: "Conquilhas alandoadas com alho, coentros, limão e vinho branco. Para comer com pão.",
      price: "€12",
    },
  ],
  entradas: [
    {
      name: "Percebes do Dia",
      desc: "Quando há. Cozidos em água do mar com louro. Preço conforme a apanha.",
      price: "MP",
      badge: "Sazonal",
    },
    {
      name: "Pataniscas de Bacalhau",
      desc: "Feitas em casa, leves e estaladiças. Com arroz de feijão frade.",
      price: "€9",
    },
    {
      name: "Camarão Cozido",
      desc: "Com sal grosso, louro e limão. Simples, como o mar manda.",
      price: "€14",
    },
    {
      name: "Pão com Manteiga e Azeitonas",
      desc: "Para abrir o apetite. Azeitonas marinadas da casa.",
      price: "€3",
    },
  ],
  sobremesas: [
    {
      name: "Pudim da Tasca",
      desc: "O pudim caseiro que toda a gente pede uma segunda porção.",
      price: "€3.5",
      badge: "Caseiro",
    },
    {
      name: "Arroz Doce",
      desc: "Com canela e limão, à portuguesa. Feito todos os dias de manhã.",
      price: "€3",
    },
    {
      name: "Mousse de Chocolate",
      desc: "Densa, caseira, sem história. Só chocolate.",
      price: "€3.5",
    },
    {
      name: "Fruta da Época",
      desc: "Porque às vezes é o que sabe melhor.",
      price: "€2.5",
    },
  ],
};

const tabs: { key: Category; label: string }[] = [
  { key: "grelhados", label: "Grelhados" },
  { key: "tachos", label: "Tachos & Sopas" },
  { key: "entradas", label: "Entradas" },
  { key: "sobremesas", label: "Sobremesas" },
];

export function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<Category>("grelhados");

  return (
    <section
      id="menu"
      ref={ref}
      className="py-20 md:py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      {/* Subtle wood grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #8B7355 0px,
            transparent 1px,
            transparent 30px
          )`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            A Nossa Ementa
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Cozinha da Costa
          </h2>
          <p className="text-[#1E3A5F]/60 max-w-xl mx-auto text-sm leading-relaxed">
            A ementa muda com o mar. O que está aqui é o que temos mais vezes —
            mas pergunte sempre o peixe do dia.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#8B7355] text-xs">
            <Info className="w-3.5 h-3.5" />
            <span>MP = Mercado do dia</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                active === tab.key
                  ? "bg-[#1E3A5F] text-white shadow-md"
                  : "bg-white text-[#1E3A5F]/60 border border-[#C9B896]/40 hover:border-[#1E3A5F]/40 hover:text-[#1E3A5F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {menu[active].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 * i }}
              className="bg-white border border-[#C9B896]/30 p-5 md:p-6 rounded group hover:border-[#8B7355]/50 hover:shadow-sm transition-all duration-300 relative"
            >
              {item.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#C9B896]/20 text-[#8B7355] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3
                  className="text-base md:text-lg font-bold text-[#1E3A5F] group-hover:text-[#8B7355] transition-colors leading-snug pr-12"
                  style={{ fontFamily: "var(--font-merriweather)" }}
                >
                  {item.name}
                </h3>
              </div>
              <p className="text-sm text-[#1E3A5F]/60 leading-relaxed mb-3">
                {item.desc}
              </p>
              <p className="text-xl font-black text-[#1E3A5F]">{item.price}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs text-[#1E3A5F]/40 mt-8 flex items-center justify-center gap-2"
        >
          <Flame className="w-3.5 h-3.5 text-[#C9B896]" />
          Todos os preços com IVA incluído. Pergunte o peixe do dia ao chegar.
          <Flame className="w-3.5 h-3.5 text-[#C9B896]" />
        </motion.p>
      </div>
    </section>
  );
}
