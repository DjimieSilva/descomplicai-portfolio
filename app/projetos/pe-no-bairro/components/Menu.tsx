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

const menuData: MenuCategory[] = [
  {
    id: "pratos",
    label: "Pratos do Dia",
    items: [
      {
        name: "Bacalhau à Pé no Bairro",
        description:
          "Lombos de bacalhau confitados, grão-de-bico salteado com couve e azeite de alho",
        price: "€16",
        tag: "Favorito",
      },
      {
        name: "Cozido à Portuguesa (sextas e sábados)",
        description:
          "Cozido tradicional com enchidos, legumes da época e arroz de caldo",
        price: "€15",
      },
      {
        name: "Frango do Campo no Forno",
        description:
          "Frango inteiro assado lentamente com ervas aromáticas, batata assada e salada",
        price: "€14",
      },
      {
        name: "Prego no Pão com Ovo",
        description:
          "Alcatra tenra grelhada, pão de semente artesanal, ovo a cavalo e batatas fritas",
        price: "€12",
      },
    ],
  },
  {
    id: "bifanas",
    label: "Bifanas Gourmet",
    items: [
      {
        name: "Bifana Clássica",
        description:
          "Porco marinado em vinho branco e alho, pão crocante, mostarda artesanal",
        price: "€8",
        tag: "Ícone",
      },
      {
        name: "Bifana do Bairro",
        description:
          "Porco ibérico, queijo da Serra curado, pimentão assado, maionese de coentros",
        price: "€10",
        tag: "Chef",
      },
      {
        name: "Bifana Picante",
        description:
          "Porco apimentado, molho piri-piri da casa, cebola caramelizada, pickle de pepino",
        price: "€9",
      },
    ],
  },
  {
    id: "francesinha",
    label: "Francesinha",
    items: [
      {
        name: "Francesinha Tradicional",
        description:
          "Pão de forma, fiambre, linguiça, bife, queijo fundido, molho picante da casa",
        price: "€14",
        tag: "Clássico",
      },
      {
        name: "Francesinha do Mar",
        description:
          "Camarão salteado, bacalhau desfiado, queijo fundido, molho de marisco",
        price: "€16",
        tag: "Novidade",
      },
    ],
  },
  {
    id: "petiscos",
    label: "Petiscos",
    items: [
      {
        name: "Croquetes da Casa",
        description:
          "Croquetes de carne feitos no dia, maionese de limão",
        price: "€5",
        tag: "Favorito",
      },
      {
        name: "Rissóis de Camarão",
        description: "Rissóis caseiros com recheio generoso de camarão e bechamel",
        price: "€6",
      },
      {
        name: "Tosta de Queijo e Enchidos",
        description:
          "Pão artesanal tostado, queijo da Serra, presunto e chouriço do Alentejo",
        price: "€7",
      },
      {
        name: "Alheira Grelhada",
        description: "Alheira de caça grelhada, ovo estrelado e pimento assado",
        price: "€8",
      },
      {
        name: "Pataniscas de Bacalhau",
        description:
          "Pataniscas caseiras com bacalhau desfiado, arroz de feijão",
        price: "€9",
      },
      {
        name: "Pica-Pau",
        description:
          "Bochechas de porco grelhadas, picles variados, pão artesanal",
        price: "€10",
        tag: "Chef",
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  Favorito: "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30",
  Chef: "bg-[#B91C1C]/20 text-[#ef4444] border-[#B91C1C]/30",
  Ícone: "bg-white/10 text-white border-white/20",
  Clássico: "bg-[#A3A3A3]/10 text-[#A3A3A3] border-[#A3A3A3]/20",
  Novidade: "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30",
};

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("pratos");

  const activeMenu = menuData.find((m) => m.id === activeCategory)!;

  return (
    <section
      id="ementa"
      ref={ref}
      className="bg-[#0f0f0f] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#EAB308]" />
            <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
              Ementa
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
            Comida que reconforta,
            <br />
            <span className="text-[#EAB308]">sabores que ficam.</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-[#EAB308] text-[#171717]"
                  : "border border-white/10 text-[#A3A3A3] hover:border-[#EAB308]/40 hover:text-[#EAB308]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {activeMenu.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group p-6 bg-white/[0.03] border border-white/[0.06] hover:border-[#EAB308]/20 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-base leading-snug">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span
                        className={`flex-shrink-0 text-[10px] font-[family-name:var(--font-space-grotesk)] font-bold tracking-widest uppercase px-2 py-1 border ${tagColors[item.tag]}`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-[family-name:var(--font-space-grotesk)] font-black text-[#EAB308] text-lg flex-shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm leading-relaxed">
                  {item.description}
                </p>
                {/* Hover accent line */}
                <div className="mt-4 h-0.5 w-0 bg-[#EAB308] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Allergens note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 font-[family-name:var(--font-inter)] text-[#A3A3A3]/60 text-xs"
        >
          * Informação sobre alergénios disponível mediante pedido. Os preços incluem IVA à taxa em vigor.
        </motion.p>
      </div>
    </section>
  );
}
