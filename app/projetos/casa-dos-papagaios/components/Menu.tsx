"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type Category = "entradas" | "peixes" | "carnes" | "sobremesas";

const menu: Record<Category, { name: string; description: string; price: string; tag?: string }[]> = {
  entradas: [
    {
      name: "Amêijoas à Bulhão Pato",
      description: "Amêijoas fresquíssimas com alho, coentros e vinho branco da região Centro",
      price: "8,50€",
      tag: "Favorito",
    },
    {
      name: "Camarão Cozido",
      description: "Camarão do Atlântico cozido com sal grosso e louro, servido com manteiga de alho",
      price: "9,00€",
    },
    {
      name: "Percebes",
      description: "Quando disponíveis — frescos e preparados no momento",
      price: "MP",
      tag: "Sazonal",
    },
    {
      name: "Sopa do Mercado",
      description: "Sopa do dia com legumes frescos do mercado — muda consoante a época",
      price: "2,50€",
    },
    {
      name: "Petiscos da Casa",
      description: "Azeitonas, pão regional, manteiga e enchidos artesanais da região",
      price: "5,00€",
    },
  ],
  peixes: [
    {
      name: "Cherne Grelhado",
      description: "Cherne do Atlântico grelhado em brasa com azeite, alho e limão da horta",
      price: "18,00€",
      tag: "Premiado",
    },
    {
      name: "Linguado à Meunière",
      description: "Linguado fresco em manteiga com salsa e alcaparras, servido com arroz de limão",
      price: "16,50€",
    },
    {
      name: "Caldeirada Tradicional",
      description: "Mix de peixe do dia em caldeirada aromática com batata, tomate e coentros",
      price: "14,00€",
      tag: "Favorito",
    },
    {
      name: "Polvo à Lagareiro",
      description: "Polvo macio com batatinhas assadas e regado com azeite virgem extra de Trás-os-Montes",
      price: "15,50€",
    },
    {
      name: "Arroz de Lingueirão",
      description: "Arroz malandrinho com lingueirões acabados de apanhar na Ria de Aveiro",
      price: "13,00€",
    },
    {
      name: "Bacalhau à Brás",
      description: "O clássico com ovos mexidos, batata palha e azeitonas — receita tradicional",
      price: "13,50€",
    },
  ],
  carnes: [
    {
      name: "Bife da Casa",
      description: "Bife de novilho grelhado com molho de cogumelos e batata frita caseira",
      price: "14,50€",
    },
    {
      name: "Frango do Campo Assado",
      description: "Frango criado em campo assado no forno com ervas aromáticas e alho",
      price: "12,00€",
      tag: "Popular",
    },
    {
      name: "Costeletas de Vitela",
      description: "Costeletas grelhadas com alho, limão e salada mista de legumes frescos",
      price: "13,00€",
    },
    {
      name: "Lombinho de Porco",
      description: "Lombinho marinado com vinho branco e especiarias, servido com arroz e feijão verde",
      price: "13,50€",
    },
  ],
  sobremesas: [
    {
      name: "Pudim Abade de Priscos",
      description: "O pudim mais famoso de Portugal, feito à maneira tradicional com toucinho e vinho do Porto",
      price: "4,50€",
      tag: "Imperdível",
    },
    {
      name: "Leite Creme da Avó",
      description: "Leite creme queimado na hora com canela e casca de limão da nossa árvore",
      price: "3,50€",
      tag: "Favorito",
    },
    {
      name: "Tarte de Nata",
      description: "Tarte de nata com canela e açúcar em pó — receita da casa",
      price: "3,00€",
    },
    {
      name: "Fruta da Época",
      description: "Seleção de fruta fresca do mercado — o que está melhor neste momento",
      price: "3,00€",
      tag: "Sazonal",
    },
    {
      name: "Arroz Doce",
      description: "Arroz doce cremoso com canela e limão — feito todos os dias de manhã",
      price: "3,00€",
    },
  ],
};

const categoryLabels: Record<Category, { label: string; emoji: string }> = {
  entradas: { label: "Entradas & Petiscos", emoji: "🦪" },
  peixes: { label: "Peixes & Mariscos", emoji: "🐟" },
  carnes: { label: "Carnes", emoji: "🥩" },
  sobremesas: { label: "Sobremesas", emoji: "🍮" },
};

const tagColors: Record<string, string> = {
  Premiado: "bg-[#DC2626] text-white",
  Favorito: "bg-[#15803D] text-white",
  Popular: "bg-[#78350F] text-white",
  Sazonal: "bg-[#FEF3C7] text-[#78350F] border border-[#78350F]/30",
  Imperdível: "bg-[#DC2626] text-white",
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("peixes");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[#DC2626] font-bold uppercase tracking-widest text-sm mb-4">
            A Nossa Ementa
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Cozinha Portuguesa
            <br />
            de Mercado
          </h2>
          <p className="text-[#78350F]/60 max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Todos os preços incluem IVA à taxa legal em vigor.
            Menu sujeito a alterações conforme disponibilidade do mercado.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#78350F] text-white shadow-md scale-105"
                  : "bg-[#FEF3C7] text-[#78350F] hover:bg-[#78350F]/10"
              }`}
            >
              <span>{categoryLabels[cat].emoji}</span>
              {categoryLabels[cat].label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {menu[activeCategory].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#FEF3C7]/50 border border-[#78350F]/10 rounded-xl p-5 flex items-start gap-4 hover:bg-[#FEF3C7] hover:border-[#78350F]/20 transition-all duration-200 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3
                    className="font-black text-[#78350F] text-lg group-hover:text-[#DC2626] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-public-sans)" }}
                  >
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tagColors[item.tag] || "bg-gray-100 text-gray-600"}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-[#78350F]/60 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p
                  className="text-xl font-black text-[#DC2626]"
                  style={{ fontFamily: "var(--font-public-sans)" }}
                >
                  {item.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 p-5 bg-[#15803D]/10 border border-[#15803D]/20 rounded-xl text-center"
        >
          <p className="text-[#15803D] font-semibold text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            🌿 Menu de almoço com prato do dia, sopa e bebida incluídos a partir de{" "}
            <strong>9,50€</strong> — disponível de segunda a domingo, das 12h às 15h.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
