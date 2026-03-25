"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const menuCategories = [
  {
    id: "entradas",
    label: "Entradas",
    emoji: "🥢",
    items: [
      {
        name: "Spring Rolls",
        thaiName: "Por Pia Tod",
        desc: "Rolinhos crocantes com legumes, tofu e camarão. Servidos com molho agridoce.",
        price: "€8",
        spice: 0,
        veg: false,
      },
      {
        name: "Satay de Frango",
        thaiName: "Gai Satay",
        desc: "Espetadas de frango marinadas em cúrcuma e cozinhadas no carvão. Com molho de amendoim.",
        price: "€9",
        spice: 1,
        veg: false,
      },
      {
        name: "Edamame Temperado",
        thaiName: "Thua Fak Yao",
        desc: "Edamame salteado com alho, chili e flor de sal da Figueira.",
        price: "€6",
        spice: 1,
        veg: true,
      },
      {
        name: "Gyoza de Camarão",
        thaiName: "Khanom Jeeb Goong",
        desc: "Dumplings cozidos a vapor com camarão da costa e molho de gengibre.",
        price: "€10",
        spice: 0,
        veg: false,
      },
    ],
  },
  {
    id: "sopas",
    label: "Sopas",
    emoji: "🍜",
    items: [
      {
        name: "Tom Yum",
        thaiName: "Tom Yum Goong",
        desc: "Sopa picante e ácida de camarão com lemongrass, galangal e cogumelos shiitake.",
        price: "€12",
        spice: 3,
        veg: false,
      },
      {
        name: "Tom Kha Gai",
        thaiName: "Tom Kha Gai",
        desc: "Sopa cremosa de leite de coco com frango, galangal e folhas de kaffir lime.",
        price: "€11",
        spice: 1,
        veg: false,
      },
      {
        name: "Caldo de Miso Thai",
        thaiName: "Soup Miso Thai",
        desc: "Fusão de miso japonês com pasta Thai e tofu de seda. Vegetariano.",
        price: "€9",
        spice: 1,
        veg: true,
      },
    ],
  },
  {
    id: "pratos",
    label: "Pratos Principais",
    emoji: "🍛",
    items: [
      {
        name: "Pad Thai",
        thaiName: "Phat Thai",
        desc: "Noodles de arroz wok com camarão, ovo, brotos de feijão, amendoins e molho de tamarindo.",
        price: "€14",
        spice: 1,
        veg: false,
        featured: true,
      },
      {
        name: "Curry Verde com Frango",
        thaiName: "Gaeng Khiao Wan Gai",
        desc: "Curry verde tailandês cremoso com frango, beringela tailandesa, leite de coco e arroz jasmim.",
        price: "€16",
        spice: 3,
        veg: false,
        featured: true,
      },
      {
        name: "Curry Vermelho com Tofu",
        thaiName: "Gaeng Phet Tofu",
        desc: "Curry vermelho aromático com tofu firme, pimentos, bambu e leite de coco. Vegetariano.",
        price: "€14",
        spice: 2,
        veg: true,
      },
      {
        name: "Massaman Curry",
        thaiName: "Gaeng Massaman",
        desc: "Curry suave de influência persa com borrego, batata, amendoins e especiarias doces.",
        price: "€18",
        spice: 1,
        veg: false,
      },
      {
        name: "Fried Rice com Caranguejo",
        thaiName: "Khao Phat Puu",
        desc: "Arroz frito wok com caranguejo da costa, ovo, cebolinho e molho de ostras.",
        price: "€17",
        spice: 0,
        veg: false,
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    emoji: "🍮",
    items: [
      {
        name: "Arroz Doce Thai",
        thaiName: "Khao Niao Mamuang",
        desc: "Arroz glutinoso com leite de coco e manga fresca. O doce mais icónico da Tailândia.",
        price: "€7",
        spice: 0,
        veg: true,
      },
      {
        name: "Gelado de Chá Verde",
        thaiName: "I Tim Cha Khiao",
        desc: "Gelado artesanal de matcha com crocante de sésamo e mel de Coimbra.",
        price: "€6",
        spice: 0,
        veg: true,
      },
      {
        name: "Toucinho do Céu Thai",
        thaiName: "Khanom Fang",
        desc: "Fusão: toucinho do céu português infusionado com pandan e leite de coco.",
        price: "€6",
        spice: 0,
        veg: true,
        featured: true,
      },
    ],
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("pratos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const current = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section
      ref={ref}
      id="menu"
      className="relative py-24 md:py-32"
      style={{ background: "#1C1412" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Ementa
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            A Nossa Cozinha
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)" }}>
            Pratos autenticos da Tailândia com ingredientes premium da costa portuguesa
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat.id ? "#991B1B" : "rgba(245,240,232,0.06)",
                color: activeCategory === cat.id ? "#F5F0E8" : "rgba(245,240,232,0.6)",
                border: activeCategory === cat.id
                  ? "1px solid #991B1B"
                  : "1px solid rgba(245,240,232,0.1)",
                fontFamily: "var(--font-sora)",
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-xl group"
              style={{
                background: "rgba(245,240,232,0.04)",
                border: item.featured
                  ? "1px solid rgba(234,179,8,0.3)"
                  : "1px solid rgba(245,240,232,0.08)",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-semibold text-base"
                        style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                      >
                        {item.name}
                      </h3>
                      {item.featured && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(234,179,8,0.15)",
                            color: "#EAB308",
                            border: "1px solid rgba(234,179,8,0.3)",
                            fontFamily: "var(--font-sora)",
                          }}
                        >
                          ★ Popular
                        </span>
                      )}
                      {item.veg && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(5,150,105,0.15)",
                            color: "#059669",
                            border: "1px solid rgba(5,150,105,0.3)",
                          }}
                        >
                          🌱 Veg
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs italic mb-2"
                      style={{ color: "rgba(234,179,8,0.6)" }}
                    >
                      {item.thaiName}
                    </p>
                  </div>
                  <span
                    className="text-lg font-bold shrink-0"
                    style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
                  >
                    {item.price}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-2"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  {item.desc}
                </p>
                {item.spice > 0 && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className="text-xs"
                        style={{ opacity: j < item.spice ? 1 : 0.15 }}
                      >
                        🌶️
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Allergen note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs mt-10"
          style={{ color: "rgba(245,240,232,0.35)" }}
        >
          Informe-nos de alergias ou intolerâncias alimentares. Todos os pratos podem ser adaptados.
          Preços incluem IVA à taxa legal em vigor.
        </motion.p>
      </div>
    </section>
  );
}
