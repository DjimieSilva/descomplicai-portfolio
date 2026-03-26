"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const especialidades = [
  {
    name: "Cataplana de Mariscos",
    tag: "Ícone da Casa",
    desc: "A nossa cataplana chega à mesa fechada, a cheirar a mar. Berbigão, amêijoa, camarão e lingueirão cozinhados com tomate, pimentos e azeite da região. Aberta na mesa, como manda a tradição.",
    nota: "Para 2 pessoas · Preparação 40 min",
  },
  {
    name: "Arroz de Lingueirão",
    tag: "Favorito",
    desc: "Arroz caldoso com lingueirão fresco da costa da Figueira. Temperado com alho, coentros e um fio de azeite virgem. Um prato que transporta para a beira-mar.",
    nota: "Para 2 pessoas · Produto da época",
  },
  {
    name: "Caldeirada à Pescador",
    tag: "Tradicional",
    desc: "Peixe do dia em camadas — robalo, pargo, tamboril — com batata, cebola e tomate. Receita de pescadores, feita como sempre se fez na Figueira da Foz.",
    nota: "Peixe do dia · Consoante a apanha",
  },
  {
    name: "Açorda de Gambas",
    tag: "Especialidade",
    desc: "Pão de aldeia demolhado com gambas salteadas em alho e coentros frescos. Textura cremosa, sabor intenso. Uma açorda que nos define.",
    nota: "Gambas do Atlântico · Coentros da horta",
  },
  {
    name: "Bacalhau à Lagareiro",
    tag: "Clássico",
    desc: "Lombo de bacalhau do Porto assado no forno com batatas a murro e regado com azeite virgem extra a ferver. Simples, honesto e perfeito.",
    nota: "Bacalhau do Porto · Azeite da Beira",
  },
];

export default function Especialidades() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="especialidades"
      className="py-24 px-6"
      style={{ background: "#FEF3C7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            Especialidades
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Os Pratos que nos
            <br />
            <em>definem</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: "#C2410C" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#C2410C">
              <path d="M7 1L8.5 5.2L13 5.7L9.5 8.9L10.6 13.5L7 11.1L3.4 13.5L4.5 8.9L1 5.7L5.5 5.2L7 1Z" />
            </svg>
            <div className="h-px w-16" style={{ background: "#C2410C" }} />
          </div>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            Pratos que existem na nossa cozinha há décadas. Receitas aperfeiçoadas ao
            longo de gerações, com o mar de Figueira da Foz sempre presente.
          </p>
        </motion.div>

        {/* Dishes list */}
        <div className="space-y-0">
          {especialidades.map((prato, i) => {
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-40px" });
            return (
              <motion.div
                key={prato.name}
                ref={itemRef}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={itemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative overflow-hidden"
                style={{
                  borderBottom: "1px solid rgba(146,64,14,0.15)",
                }}
              >
                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg, rgba(194,65,12,0.04) 0%, transparent 100%)" }}
                />

                <div className="relative flex flex-col md:flex-row md:items-start gap-4 py-8 px-4">
                  {/* Index number */}
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-xs font-bold tracking-widest"
                    style={{
                      border: "1.5px solid rgba(194,65,12,0.3)",
                      color: "#C2410C",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-3 mb-2">
                      <h3
                        className="text-xl md:text-2xl font-bold leading-tight"
                        style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
                      >
                        {prato.name}
                      </h3>
                      <span
                        className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 mt-1"
                        style={{
                          background: "rgba(194,65,12,0.12)",
                          color: "#C2410C",
                          border: "1px solid rgba(194,65,12,0.25)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {prato.tag}
                      </span>
                    </div>
                    <p
                      className="text-base leading-relaxed mb-3 max-w-2xl"
                      style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                    >
                      {prato.desc}
                    </p>
                    <p
                      className="text-xs tracking-wide"
                      style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
                    >
                      {prato.nota}
                    </p>
                  </div>

                  {/* Right ornament */}
                  <div className="hidden md:flex flex-shrink-0 items-center self-stretch opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4L14 9.5L20 10.5L16 14L17.2 20L12 17.2L6.8 20L8 14L4 10.5L10 9.5L12 4Z"
                        fill="#C2410C"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-xs mt-10"
          style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
        >
          Pratos sujeitos à disponibilidade do produto fresco · Consulte o prato do dia no balcão
        </motion.p>
      </div>
    </section>
  );
}
