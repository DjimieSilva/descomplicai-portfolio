"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "1912", label: "Ano de Fundação" },
  { value: "4ª", label: "Geração da Família" },
  { value: "+110", label: "Anos de História" },
  { value: "∞", label: "Receitas Preservadas" },
];

const traditions = [
  {
    title: "O Bacalhau que Nos Define",
    body: "Nenhum prato representa melhor o Bijou do que o nosso bacalhau. Demolhado durante 48 horas em água fria, preparado com paciência e servido com grelos frescos, batata a murro e um fio de azeite virgem extra. A receita de 1912 nunca foi alterada.",
    accent: true,
  },
  {
    title: "Os Fornecedores de Sempre",
    body: "Trabalhamos com os mesmos fornecedores há décadas. O peixe chega diariamente de Buarcos. Os legumes vêm da horta familiar em Quiaios. O azeite é do mesmo lagar do Alentejo há mais de 30 anos. A qualidade começa na escolha.",
    accent: false,
  },
  {
    title: "O Caderno da Avó Elvira",
    body: "Guardamos ainda hoje o caderno de receitas original de dona Elvira, a fundadora. Escrito a tinta azul, com rasuras e anotações ao longo de décadas. É o nosso bem mais precioso — e a nossa bússola na cozinha.",
    accent: false,
  },
  {
    title: "Uma Mesa Para a Família",
    body: "No Bijou, a mesa é longa. Há famílias que vêm ao almoço de domingo desde que têm memória. Filhos que trouxeram os netos. Turistas que voltam todos os verões. Esta continuidade é a nossa maior recompensa.",
    accent: true,
  },
];

export default function Tradition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tradicao"
      className="py-24 px-6"
      style={{ background: "#FFFFF0" }}
    >
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20 border"
          style={{ borderColor: "rgba(128,0,32,0.15)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center py-8 px-4"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(128,0,32,0.15)" : "none",
              }}
            >
              <p
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#800020" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "#8B6E5A", fontFamily: "var(--font-source-sans-3)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            O Que Nos Torna Únicos
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
          >
            A Força da
            <br />
            <em>Tradição</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
        </motion.div>

        {/* Traditions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {traditions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="p-8 border relative overflow-hidden"
              style={{
                background: item.accent ? "#800020" : "rgba(128,0,32,0.04)",
                borderColor: item.accent ? "#800020" : "rgba(128,0,32,0.15)",
              }}
            >
              {/* Decorative number */}
              <div
                className="absolute top-4 right-6 text-7xl font-bold opacity-10 select-none"
                style={{
                  fontFamily: "var(--font-eb-garamond)",
                  color: item.accent ? "#FFFFF0" : "#800020",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="text-2xl font-bold mb-4 relative"
                style={{
                  fontFamily: "var(--font-eb-garamond)",
                  color: item.accent ? "#CFB53B" : "#800020",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed relative"
                style={{
                  color: item.accent ? "rgba(255,255,240,0.85)" : "#6B5344",
                  fontFamily: "var(--font-source-sans-3)",
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Heritage seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Outer circle */}
              <circle cx="80" cy="80" r="75" fill="none" stroke="#CFB53B" strokeWidth="1" />
              <circle cx="80" cy="80" r="65" fill="none" stroke="#CFB53B" strokeWidth="0.5" />
              {/* Inner decorative ring */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#800020" strokeWidth="0.5" strokeDasharray="4 4" />
              {/* Center fill */}
              <circle cx="80" cy="80" r="50" fill="rgba(128,0,32,0.05)" />
              {/* Text on arc */}
              <path id="arc-top" d="M 20,80 A 60,60 0 0,1 140,80" fill="none" />
              <text fontSize="9" fill="#CFB53B" letterSpacing="4" fontFamily="Source Sans 3, sans-serif">
                <textPath href="#arc-top" startOffset="5%">
                  FIGUEIRA DA FOZ · PORTUGAL ·
                </textPath>
              </text>
              <path id="arc-bottom" d="M 140,80 A 60,60 0 0,1 20,80" fill="none" />
              <text fontSize="9" fill="#CFB53B" letterSpacing="4" fontFamily="Source Sans 3, sans-serif">
                <textPath href="#arc-bottom" startOffset="8%">
                  ESTABELECIDO DESDE · 1912 ·
                </textPath>
              </text>
              {/* Center text */}
              <text
                x="80"
                y="72"
                textAnchor="middle"
                fontSize="22"
                fontWeight="bold"
                fill="#800020"
                fontFamily="EB Garamond, serif"
              >
                Bijou
              </text>
              <text
                x="80"
                y="92"
                textAnchor="middle"
                fontSize="9"
                fill="#CFB53B"
                letterSpacing="3"
                fontFamily="Source Sans 3, sans-serif"
              >
                RESTAURANTE
              </text>
              {/* Stars */}
              <text x="62" y="110" textAnchor="middle" fontSize="8" fill="#CFB53B">★</text>
              <text x="80" y="112" textAnchor="middle" fontSize="8" fill="#CFB53B">★</text>
              <text x="98" y="110" textAnchor="middle" fontSize="8" fill="#CFB53B">★</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
