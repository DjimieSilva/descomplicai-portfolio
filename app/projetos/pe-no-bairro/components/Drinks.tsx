"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Beer, Wine, Coffee } from "lucide-react";

const drinksCategories = [
  {
    icon: Beer,
    title: "Cerveja Artesanal",
    accent: "#EAB308",
    items: [
      { name: "Vadia Branca", origin: "Aveiro", price: "€3.50" },
      { name: "Letra A", origin: "Guimarães", price: "€4" },
      { name: "Dois Corvos Finisterra", origin: "Lisboa", price: "€4.50" },
      { name: "Sovina Extra-Stout", origin: "Porto", price: "€4.50" },
    ],
  },
  {
    icon: Wine,
    title: "Vinhos e Sangria",
    accent: "#B91C1C",
    items: [
      { name: "Sangria da Casa (jarro)", origin: "Receita própria", price: "€9" },
      { name: "Vinho Verde (garrafa)", origin: "Minho", price: "€14" },
      { name: "Dão Tinto (garrafa)", origin: "Dão", price: "€18" },
      { name: "Bairrada Espumante", origin: "Bairrada", price: "€22" },
    ],
  },
  {
    icon: Coffee,
    title: "Gin & Cocktails",
    accent: "#A3A3A3",
    items: [
      { name: "Gin Tónico do Bairro", origin: "Hendrick's + pepino + cardamomo", price: "€8" },
      { name: "Negroni Nacional", origin: "Sharish Gin + Campari + Vermute", price: "€9" },
      { name: "Sangria Branca", origin: "Vinho branco + fruta + hortelã", price: "€5 / copo" },
      { name: "Limonada de Bairro", origin: "Caseira, com ou sem álcool", price: "€3.50" },
    ],
  },
];

export default function Drinks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#171717] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#EAB308]" />
            <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
              Para Beber
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
            Do copo{" "}
            <span className="text-[#EAB308]">certo</span> para a mesa certa.
          </h2>
        </motion.div>

        {/* Drinks grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {drinksCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white/[0.03] border border-white/[0.06] p-6 hover:border-[#EAB308]/20 transition-colors duration-300 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ backgroundColor: `${category.accent}15` }}
                >
                  <category.icon
                    size={16}
                    style={{ color: category.accent }}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-sm tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white text-sm">
                        {item.name}
                      </p>
                      <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-xs mt-0.5">
                        {item.origin}
                      </p>
                    </div>
                    <span
                      className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm flex-shrink-0"
                      style={{ color: category.accent }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div
                className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: category.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="w-full h-px bg-white/5" />
          <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3]/60 text-xs text-center whitespace-nowrap">
            Carta de bebidas completa disponível no restaurante
          </p>
          <div className="w-full h-px bg-white/5" />
        </motion.div>
      </div>
    </section>
  );
}
