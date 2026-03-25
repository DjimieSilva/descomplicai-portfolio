"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Leaf } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  badge?: string;
  vegan?: boolean;
};

type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    id: "petiscos",
    label: "Petiscos",
    emoji: "🐟",
    items: [
      {
        name: "Polvo à Lagareiro",
        description: "Polvo grelhado, batata murro, azeite e alho",
        price: "€14",
        badge: "Favorito",
      },
      {
        name: "Ameijoas à Bulhão Pato",
        description: "Ameijoas frescas, coentros, limão e azeite",
        price: "€13",
      },
      {
        name: "Camarão Grelhado",
        description: "Camarão selvagem, manteiga de alho e ervas",
        price: "€12",
        badge: "Popular",
      },
      {
        name: "Pataniscas de Bacalhau",
        description: "Pataniscas artesanais com molho de tomate caseiro",
        price: "€9",
      },
      {
        name: "Pica-Pau",
        description: "Lombinhos de porco marinados, pickles e mostarda",
        price: "€10",
      },
      {
        name: "Hummus da Praia",
        description: "Hummus cremoso, pão pita, azeitonas e legumes",
        price: "€7",
        vegan: true,
      },
      {
        name: "Queijo da Serra com Doce",
        description: "Queijo curado, doce de abóbora e nozes",
        price: "€8",
      },
      {
        name: "Nachos Tropicais",
        description: "Nachos, guacamole, salsa de mango e sour cream",
        price: "€6",
        vegan: true,
      },
    ],
  },
  {
    id: "pratos",
    label: "Pratos",
    emoji: "🍽️",
    items: [
      {
        name: "Poke Bowl NALU",
        description: "Atum fresco, arroz sushi, edamame, pepino e molho teriyaki",
        price: "€16",
        badge: "Estrela da Casa",
      },
      {
        name: "Poke Bowl Salmão",
        description: "Salmão marinado, abacate, manga, wakame e sésamo",
        price: "€17",
      },
      {
        name: "Poke Vegan",
        description: "Tofu grelhado, batata doce, cenoura, couve e tahini",
        price: "€13",
        vegan: true,
      },
      {
        name: "NALU Burger",
        description: "Hambúrguer artesanal 180g, cheddar, caramelized onion, alface e tomate",
        price: "€15",
        badge: "Clássico",
      },
      {
        name: "Fish Burger",
        description: "Prego de peixe, coleslaw de coentros, limão e pickles",
        price: "€14",
      },
      {
        name: "Veggie Burger",
        description: "Hambúrguer de grão, rúcula, tomate assado e aioli",
        price: "€12",
        vegan: true,
      },
      {
        name: "Bacalhau com Broa",
        description: "Lombo de bacalhau, crosta de broa, legumes salteados",
        price: "€19",
      },
      {
        name: "Frango Grelhado Tropical",
        description: "Frango marinado em coco e limão, arroz basmati e salada",
        price: "€15",
      },
      {
        name: "Dourada do Dia",
        description: "Dourada fresca grelhada, batata assada e salada verde",
        price: "€22",
        badge: "Dia",
      },
    ],
  },
  {
    id: "saladas",
    label: "Saladas",
    emoji: "🥗",
    items: [
      {
        name: "Salada NALU",
        description: "Mista, atum, ovo, azeitonas, tomate e vinagrete de mostarda",
        price: "€12",
        badge: "Fresco",
      },
      {
        name: "Salada Mediterrânea",
        description: "Rúcula, feta, tomate cherry, pepino e azeitonas Kalamata",
        price: "€10",
        vegan: true,
      },
      {
        name: "Salada de Camarão",
        description: "Camarão grelhado, abacate, manga e vinagrete de caju",
        price: "€14",
      },
      {
        name: "Wrap Tropical",
        description: "Frango grelhado, abacate, alface, tomate e molho chipotle",
        price: "€11",
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    emoji: "🍦",
    items: [
      {
        name: "Cheesecake de Maracujá",
        description: "Cremoso, base de bolacha, coulis de maracujá fresco",
        price: "€6",
        badge: "Favorito",
      },
      {
        name: "Mousse de Chocolate",
        description: "Chocolate 70%, raspas de laranja e fleur de sel",
        price: "€5",
      },
      {
        name: "Semifrio de Manga",
        description: "Semifrio artesanal, calda de manga e hortelã",
        price: "€6",
        vegan: true,
      },
      {
        name: "Gelado Artesanal",
        description: "2 bolas à escolha: baunilha, chocolate, manga ou coco",
        price: "€4",
      },
    ],
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("petiscos");

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0A1628 0%, #0D1F3C 50%, #0A1628 100%)",
      }}
    >
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,0 L0,0 Z" fill="#0077B6" opacity="0.15" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[#2D6A4F] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Ementa
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            O Que Temos
            <br />
            <span className="text-[#FF6B35]">Para Ti</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Ingredientes frescos, sabores autênticos. Uma cozinha que respeita o
            mar e celebra a nossa terra.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#FF6B35] text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>{cat.emoji}</span>
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
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {currentCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex items-start justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B35]/30 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3
                      className="text-white font-bold text-base group-hover:text-[#FF6B35] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold px-2 py-0.5 rounded-full border border-[#FF6B35]/30">
                        {item.badge}
                      </span>
                    )}
                    {item.vegan && (
                      <Leaf size={14} className="text-[#2D6A4F]" />
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div
                  className="text-[#FF6B35] font-black text-lg shrink-0 mt-0.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/30 text-xs mt-8"
        >
          Preços com IVA incluído · Informamos sobre alergénios · Menu sujeito a alterações sazonais
        </motion.p>
      </div>
    </section>
  );
}
