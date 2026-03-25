"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const specialties = [
  {
    name: "Bacalhau ao Curry Verde",
    thaiName: "Gaeng Khiao Wan Bacalhau",
    desc: "Bacalhau desfiado cozinhado em pasta de curry verde Thai com leite de coco, pimentos e manjericão tailandês. A fusão mais emblemática da nossa cozinha.",
    price: "€19",
    badge: "Fusão Exclusiva",
    color: "#059669",
    spice: 2,
  },
  {
    name: "Polvo à Tailandesa",
    thaiName: "Plaa Muek Yang",
    desc: "Polvo grelhado da costa da Figueira marinado em molho de tamarindo, alho e chili. Servido com arroz jasmim e salada de papaia verde.",
    price: "€22",
    badge: "Chef Recomenda",
    color: "#EAB308",
    spice: 3,
  },
  {
    name: "Tom Kha Marisco",
    thaiName: "Tom Kha Talay",
    desc: "Sopa cremosa de leite de coco com camarão e amêijoas da ria de Aveiro, galangal, lemongrass e folhas de kaffir lime.",
    price: "€17",
    badge: "Sazonal",
    color: "#EC4899",
    spice: 1,
  },
];

export default function Specialties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="especialidades"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#292524" }}
    >
      {/* Decorative gold corner elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="#EAB308" />
          <path d="M20 20 Q30 10 40 20 Q30 30 20 20Z" fill="#EAB308" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path d="M80 0 L40 0 L40 5 L75 5 L75 40 L80 40 Z" fill="#EAB308" />
          <path d="M60 20 Q50 10 40 20 Q50 30 60 20Z" fill="#EAB308" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
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
              Especialidades da Casa
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Fusão Thai-Portuguesa
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)" }} className="max-w-xl mx-auto">
            Criações únicas que unem a riqueza das especiarias tailandesas com os
            melhores produtos do mar português.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {specialties.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative rounded-xl overflow-hidden group cursor-default"
              style={{
                background: "rgba(245,240,232,0.04)",
                border: `1px solid ${dish.color}25`,
              }}
            >
              {/* Top color bar */}
              <div className="h-1" style={{ background: dish.color }} />

              <div className="p-8">
                {/* Badge */}
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full mb-4 tracking-wider uppercase font-semibold"
                  style={{
                    background: `${dish.color}20`,
                    color: dish.color,
                    border: `1px solid ${dish.color}40`,
                    fontFamily: "var(--font-sora)",
                  }}
                >
                  {dish.badge}
                </span>

                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
                >
                  {dish.name}
                </h3>
                <p
                  className="text-sm italic mb-4"
                  style={{ color: "rgba(234,179,8,0.7)" }}
                >
                  {dish.thaiName}
                </p>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(245,240,232,0.65)" }}
                >
                  {dish.desc}
                </p>

                {/* Spice level */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
                    Picante:
                  </span>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span
                      key={j}
                      className="text-sm"
                      style={{ opacity: j < dish.spice ? 1 : 0.2 }}
                    >
                      🌶️
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: dish.color, fontFamily: "var(--font-sora)" }}
                  >
                    {dish.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={14} fill="#EAB308" style={{ color: "#EAB308" }} />
                    <span className="text-xs" style={{ color: "rgba(245,240,232,0.5)" }}>
                      Mais pedido
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{ boxShadow: `inset 0 0 40px ${dish.color}10` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
