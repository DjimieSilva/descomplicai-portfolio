"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const categories = [
  {
    title: "Entradas & Frios",
    items: ["Presunto e enchidos da serra", "Queijos regionais", "Saladas frescas da horta", "Patés artesanais", "Acepipes tradicionais"],
  },
  {
    title: "Pratos Quentes",
    items: ["Bacalhau à moda da Quinta", "Cozido à Portuguesa", "Borrego assado em forno de lenha", "Frango no churrasco", "Arroz malandro e legumes da época"],
  },
  {
    title: "Doces & Sobremesas",
    items: ["Arroz-doce com canela", "Leite-creme brûlée", "Frutos da época", "Bolo de mel de cana", "Doçaria conventual regional"],
  },
];

export default function Buffet() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="buffet"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#FEFCE8" }}
    >
      {/* Subtle stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #556B2F 0, #556B2F 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#556B2F", fontFamily: "var(--font-inter)" }}
          >
            Buffet Diário
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
          >
            A Abundância da Quinta
          </h2>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "#722F37" }} />
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            O nosso buffet é uma celebração da cozinha portuguesa: uma mesa farta, colorida
            e cheia de sabores autênticos. Renovado diariamente com os melhores produtos
            da época e das nossas hortas.
          </p>
        </motion.div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div
            className="inline-flex flex-col items-center px-12 py-6 rounded-sm"
            style={{
              background: "#722F37",
              boxShadow: "0 8px 40px rgba(114,47,55,0.3)",
            }}
          >
            <span
              className="text-xs tracking-[0.4em] uppercase mb-1"
              style={{ color: "rgba(254,252,232,0.7)", fontFamily: "var(--font-inter)" }}
            >
              Buffet por pessoa
            </span>
            <span
              className="text-5xl font-bold"
              style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
            >
              14<span className="text-2xl">,90€</span>
            </span>
            <span
              className="text-xs mt-1"
              style={{ color: "rgba(254,252,232,0.6)", fontFamily: "var(--font-inter)" }}
            >
              Bebida e sobremesa incluídas
            </span>
          </div>
        </motion.div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="p-7 rounded-sm"
              style={{
                background: "white",
                boxShadow: "0 4px 24px rgba(61,43,31,0.08)",
                border: "1px solid rgba(168,162,158,0.2)",
              }}
            >
              <div
                className="w-8 h-[2px] mb-4"
                style={{ background: i === 0 ? "#C4A55A" : i === 1 ? "#722F37" : "#556B2F" }}
              />
              <h3
                className="text-xl font-bold mb-5"
                style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
              >
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={14}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#556B2F" }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-10 text-sm"
          style={{ color: "#A8A29E", fontFamily: "var(--font-inter)", fontStyle: "italic" }}
        >
          O buffet é renovado diariamente. Menu sujeito a sazonalidade e disponibilidade de produto.
          Opções vegetarianas sempre disponíveis.
        </motion.p>
      </div>
    </section>
  );
}
