"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const drinkSections = [
  {
    title: "Cocktails Thai",
    subtitle: "Criações exóticas",
    color: "#EC4899",
    icon: "🍹",
    drinks: [
      {
        name: "Thai Sunset",
        desc: "Vodka, leite de coco, sumo de manga e espuma de lemongrass",
        price: "€10",
        badge: "Assinatura",
      },
      {
        name: "Lotus Blossom",
        desc: "Gin, água de rosas, lichia, lima e pétala de flor de lótus",
        price: "€11",
        badge: null,
      },
      {
        name: "Chili Passion",
        desc: "Rum branco, fruta da paixão, gengibre fresco e toque de chili vermelho",
        price: "€10",
        badge: "Picante",
      },
      {
        name: "Golden Temple",
        desc: "Whisky, mel de Bangkok, açafrão e água tônica premium",
        price: "€12",
        badge: null,
      },
    ],
  },
  {
    title: "Sake & Vinho",
    subtitle: "Para acompanhar",
    color: "#EAB308",
    icon: "🍶",
    drinks: [
      {
        name: "Sake Junmai",
        desc: "Sake artesanal japonês puro de arroz. Servido quente ou frio.",
        price: "€8 / copo",
        badge: "Importado",
      },
      {
        name: "Vinho Verde da Casa",
        desc: "Vinho Verde da região do Minho. Frescura perfeita para curries.",
        price: "€18 / garrafa",
        badge: null,
      },
      {
        name: "Rosé Português",
        desc: "Rosé da Região do Douro. Equilíbrio ideal com pratos Thai.",
        price: "€20 / garrafa",
        badge: null,
      },
      {
        name: "Sake Premium Daiginjo",
        desc: "Sake de grão super-polido com aroma floral e final longo.",
        price: "€15 / copo",
        badge: "Premium",
      },
    ],
  },
  {
    title: "Chás & Sem Álcool",
    subtitle: "Tradição tailandesa",
    color: "#059669",
    icon: "🍵",
    drinks: [
      {
        name: "Thai Iced Tea",
        desc: "Chá preto tailandês com leite de coco condensado e gelo.",
        price: "€5",
        badge: "Clássico",
      },
      {
        name: "Matcha Latte",
        desc: "Chá verde matcha com leite de aveia cremoso e espuma.",
        price: "€5",
        badge: null,
      },
      {
        name: "Butterfly Pea Lemonade",
        desc: "Limonada com chá de borboleta azul — muda de cor com o limão.",
        price: "€6",
        badge: "Instagram",
      },
      {
        name: "Água de Coco Natural",
        desc: "Coco fresco servido na própria casca com palhinha de bambu.",
        price: "€5",
        badge: null,
      },
    ],
  },
];

export default function Drinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="bebidas"
      className="relative py-24 md:py-32"
      style={{ background: "#1C1412" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Bar & Bebidas
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Elixires do Oriente
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)" }} className="max-w-xl mx-auto">
            Cocktails artesanais inspirados nos mercados de Bangkok, sake premium
            e chás tailandeses com história.
          </p>
        </motion.div>

        {/* Drink sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {drinkSections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: si * 0.15 }}
            >
              {/* Section header */}
              <div
                className="flex items-center gap-3 mb-6 pb-4"
                style={{ borderBottom: `1px solid ${section.color}30` }}
              >
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: section.color, fontFamily: "var(--font-sora)" }}
                  >
                    {section.title}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(245,240,232,0.4)" }}
                  >
                    {section.subtitle}
                  </p>
                </div>
              </div>

              {/* Drinks */}
              <div className="space-y-4">
                {section.drinks.map((drink, di) => (
                  <motion.div
                    key={drink.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: si * 0.15 + di * 0.08 + 0.3 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span
                          className="font-semibold text-sm"
                          style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                        >
                          {drink.name}
                        </span>
                        {drink.badge && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: `${section.color}15`,
                              color: section.color,
                              border: `1px solid ${section.color}30`,
                            }}
                          >
                            {drink.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(245,240,232,0.55)" }}
                      >
                        {drink.desc}
                      </p>
                    </div>
                    <span
                      className="text-sm font-bold shrink-0"
                      style={{ color: section.color, fontFamily: "var(--font-sora)" }}
                    >
                      {drink.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Happy hour banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 p-6 rounded-xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(153,27,27,0.2), rgba(234,179,8,0.1))",
            border: "1px solid rgba(234,179,8,0.25)",
          }}
        >
          <span
            className="text-lg font-bold mr-2"
            style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
          >
            Happy Hour Thai
          </span>
          <span style={{ color: "rgba(245,240,232,0.7)" }}>
            Cocktails a €7 · Segunda a Quinta · 18h00 - 20h00
          </span>
        </motion.div>
      </div>
    </section>
  );
}
