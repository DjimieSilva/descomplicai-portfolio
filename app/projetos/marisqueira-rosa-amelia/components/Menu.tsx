"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "mariscos",
    label: "Mariscos ao Peso",
    items: [
      { nome: "Camarão cozido", detalhe: "tigre ou da costa", preco: "€35/kg" },
      { nome: "Camarão grelhado", detalhe: "com alho e azeite", preco: "€38/kg" },
      { nome: "Lagosta cozida", detalhe: "reservar c/ antecedência", preco: "€65/kg" },
      { nome: "Lagosta grelhada", detalhe: "na brasa, com manteiga", preco: "€68/kg" },
      { nome: "Sapateira recheada", detalhe: "receita da casa", preco: "€28/kg" },
      { nome: "Percebes", detalhe: "Berlenga e Costa Vicentina", preco: "€45/kg" },
      { nome: "Amêijoa à Bulhão Pato", detalhe: "coentros e alho", preco: "€22/kg" },
      { nome: "Mexilhão vapor", detalhe: "do Alvor", preco: "€12/kg" },
      { nome: "Lingueirão grelhado", detalhe: "com limão", preco: "€25/kg" },
      { nome: "Navalha", detalhe: "sal grosso", preco: "€30/kg" },
      { nome: "Berbigão", detalhe: "alho e salsa", preco: "€10/kg" },
      { nome: "Vieira grelhada", detalhe: "manteiga e salsa", preco: "€35/kg" },
    ],
  },
  {
    id: "pratos",
    label: "Pratos da Casa",
    items: [
      { nome: "Cataplana de Marisco", detalhe: "para 2 pessoas · camarão, amêijoa, mexilhão", preco: "€35" },
      { nome: "Arroz de Lavagante", detalhe: "para 2 pessoas · meloso e aromático", preco: "€50" },
      { nome: "Arroz de Tamboril", detalhe: "para 2 pessoas · peixe fresco da costa", preco: "€38" },
      { nome: "Açorda de Marisco", detalhe: "para 2 pessoas · receita alentejana", preco: "€32" },
      { nome: "Arroz de Camarão", detalhe: "para 2 pessoas · camarão da costa", preco: "€30" },
      { nome: "Arroz de Berbigão e Amêijoa", detalhe: "para 2 pessoas", preco: "€24" },
      { nome: "Caldeirada de Peixe", detalhe: "peixe do dia, batatas, tomate", preco: "€22" },
      { nome: "Bacalhau à Rosa Amélia", detalhe: "receita exclusiva da casa", preco: "€18" },
    ],
  },
  {
    id: "entradas",
    label: "Entradas",
    items: [
      { nome: "Gambas al Ajillo", detalhe: "azeite, alho e malagueta", preco: "€14" },
      { nome: "Pica-pau de Camarão", detalhe: "mostarda e pickles", preco: "€13" },
      { nome: "Mexilhão Marinara", detalhe: "tomate, alho, vinho branco", preco: "€9" },
      { nome: "Amêijoas à Espanhola", detalhe: "molho verde e pão", preco: "€11" },
      { nome: "Pão de Alho com Gambas", detalhe: "manteiga e ervas", preco: "€10" },
      { nome: "Salada de Polvo", detalhe: "polvo cozido, cebola roxa, azeite", preco: "€12" },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      { nome: "Pudim Abade de Priscos", detalhe: "receita tradicional", preco: "€5" },
      { nome: "Pastel de Nata", detalhe: "da pastelaria da Figueira", preco: "€2" },
      { nome: "Mousse de Chocolate", detalhe: "chocolate negro 70%", preco: "€5" },
      { nome: "Arroz Doce", detalhe: "canela e raspa de limão", preco: "€4" },
      { nome: "Salada de Frutas", detalhe: "fruta fresca da época", preco: "€5" },
      { nome: "Queijo da Serra com Mel", detalhe: "acompanhado de nozes", preco: "€7" },
    ],
  },
];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("mariscos");

  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <section ref={ref} id="ementa" className="bg-[#1D3557] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[#D4A574]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Ementa Completa
          </p>
          <h2
            className="text-[#FFF1E6] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            O que Servimos
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#E63946] mx-auto mt-8"
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all rounded-sm ${
                activeCategory === cat.id
                  ? "bg-[#E63946] text-white"
                  : "border border-[#D4A574]/30 text-[#D4A574]/70 hover:border-[#D4A574]/60 hover:text-[#D4A574]"
              }`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="divide-y divide-[#D4A574]/10"
          >
            {current.items.map((item, i) => (
              <motion.div
                key={item.nome}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-baseline justify-between py-4 group"
              >
                <div className="flex-1 pr-4">
                  <span
                    className="text-[#FFF1E6] text-base font-light group-hover:text-[#D4A574] transition-colors"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    {item.nome}
                  </span>
                  {item.detalhe && (
                    <span className="text-[#FFF1E6]/35 text-xs ml-3" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      {item.detalhe}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-20 border-t border-dotted border-[#D4A574]/20" />
                  <span
                    className="text-[#D4A574] text-base font-light whitespace-nowrap"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    {item.preco}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 pt-8 border-t border-[#D4A574]/15 text-center"
        >
          <p className="text-[#FFF1E6]/35 text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Preços incluem IVA à taxa legal em vigor · Produto fresco sujeito a disponibilidade ·
            Couvert (pão, manteiga, azeitonas) €2,50 por pessoa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
