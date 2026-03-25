"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const shellfish = [
  {
    nome: "Camarão",
    nomeEn: "Gambas",
    preco: "€35/kg",
    descricao:
      "Camarão tigre e camarão da costa, cozido em água do mar com sal grosso e louro. Servido quente ou frio, com manteiga de alho.",
    destaque: "Especialidade da Casa",
    emoji: "🦐",
    cor: "#E63946",
  },
  {
    nome: "Lagosta",
    nomeEn: "Homard",
    preco: "€65/kg",
    descricao:
      "Lagosta viva, grelhada na brasa com azeite virgem extra e alho, ou cozida com sal marinho. A rainha da nossa marisqueira.",
    destaque: "Reservar Antecipadamente",
    emoji: "🦞",
    cor: "#D4A574",
  },
  {
    nome: "Sapateira",
    nomeEn: "Tourteau",
    preco: "€28/kg",
    descricao:
      "Sapateira recheada com a sua própria carne e coral, temperada com limão e azeite. Uma delícia atlântica imperdível.",
    destaque: "Prato Emblemático",
    emoji: "🦀",
    cor: "#E63946",
  },
  {
    nome: "Percebes",
    nomeEn: "Pousse-pied",
    preco: "€45/kg",
    descricao:
      "Percebes da Berlenga e da Costa Vicentina, cozidos em água salgada. O sabor mais puro e intenso do Atlântico.",
    destaque: "Produto Sazonal",
    emoji: "🌿",
    cor: "#D4A574",
  },
  {
    nome: "Amêijoa",
    nomeEn: "Palourde",
    preco: "€22/kg",
    descricao:
      "Amêijoa à Bulhão Pato, em azeite, alho e coentros frescos. Ou simplesmente cozida no vapor. Um clássico irresistível.",
    destaque: "Favorita dos Clientes",
    emoji: "🐚",
    cor: "#1D3557",
  },
  {
    nome: "Mexilhão",
    nomeEn: "Moule",
    preco: "€12/kg",
    descricao:
      "Mexilhão do Alvor, cozido no vapor ou na marinara. Carnudo e aromático, ideal para partilhar em início de refeição.",
    destaque: "Entrada Tradicional",
    emoji: "🐚",
    cor: "#1D3557",
  },
];

export default function Shellfish() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="marisco" className="bg-[#FFF1E6] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946]/70 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Do Mar à Mesa
          </p>
          <h2
            className="text-[#1D3557] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            O Nosso{" "}
            <span className="italic text-[#E63946]">Marisco</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#D4A574] mx-auto mt-8"
          />
          <p className="text-[#1D3557]/60 text-base mt-6 max-w-xl mx-auto leading-relaxed">
            Seleccionado diariamente na Lota da Figueira da Foz. Preços por quilograma.
            Produto fresco, conforme disponibilidade.
          </p>
        </motion.div>

        {/* Shellfish grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shellfish.map((item, i) => (
            <motion.div
              key={item.nome}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className="group relative bg-white border border-[#D4A574]/20 rounded-sm overflow-hidden hover:shadow-lg hover:shadow-[#E63946]/5 transition-all duration-300"
            >
              {/* Destaque tag */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: item.cor + "15",
                    color: item.cor,
                    border: `1px solid ${item.cor}30`,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {item.destaque}
                </span>
              </div>

              {/* Card content */}
              <div className="p-7">
                {/* Emoji / icon */}
                <div className="text-4xl mb-5 opacity-80">{item.emoji}</div>

                {/* Name row */}
                <div className="flex items-end justify-between mb-1">
                  <h3
                    className="text-[#1D3557] text-2xl font-light group-hover:text-[#E63946] transition-colors"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    {item.nome}
                  </h3>
                  <span
                    className="text-[#E63946] text-xl font-light mb-0.5"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    {item.preco}
                  </span>
                </div>
                <p className="text-[#1D3557]/40 text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {item.nomeEn}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-[#D4A574]/20 mb-4" />

                {/* Description */}
                <p className="text-[#1D3557]/65 text-sm leading-relaxed">{item.descricao}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: item.cor }}
              />
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-[#1D3557]/40 text-xs mt-10 tracking-[0.1em]"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Preços sujeitos a alteração conforme mercado · Produto fresco sujeito a disponibilidade diária
        </motion.p>
      </div>
    </section>
  );
}
