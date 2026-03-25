"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "1912",
    title: "A Fundação",
    description:
      "Manuel Augusto Pinto abre as portas do Bijou numa pequena sala no centro da Figueira da Foz. A cozinha de dona Elvira torna-se rapidamente a favorita dos pescadores e comerciantes locais.",
  },
  {
    year: "1930s",
    title: "Os Anos de Ouro",
    description:
      "Com a fama a crescer, o Bijou torna-se ponto de encontro da sociedade figueiriense. Alargamento da sala e introdução das famosas cataplanas da costa.",
  },
  {
    year: "1955",
    title: "Segunda Geração",
    description:
      "Joaquim Pinto, filho do fundador, assume a cozinha. Preserva as receitas originais e acrescenta o arroz de tamboril que ainda hoje é o prato mais pedido da casa.",
  },
  {
    year: "1974",
    title: "Um Marco Histórico",
    description:
      "O Bijou serve o jantar de celebração da liberdade na cidade. Testemunha viva da história portuguesa, o restaurante torna-se símbolo de resistência e tradição.",
  },
  {
    year: "1989",
    title: "Terceira Geração",
    description:
      "Ana Luísa Pinto, neta do fundador, traz formação em artes culinárias de Lisboa e renova a adega com vinhos do Dão e Bairrada. A alma permanece intacta.",
  },
  {
    year: "2012",
    title: "Centenário",
    description:
      "100 anos de história celebrados com uma semana gastronómica especial. As receitas originais de 1912 são revividas. A fila de espera dura três semanas.",
  },
  {
    year: "Hoje",
    title: "Uma Lenda Viva",
    description:
      "Quarta geração, mais de 110 anos de portas abertas. As receitas de dona Elvira continuam a sair da cozinha, agora com o cuidado de quem sabe que herança carrega.",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 md:gap-8">
      {/* Desktop: alternating layout */}
      <div className="hidden md:flex w-full items-start">
        {/* Left content */}
        <div className={`w-5/12 ${isLeft ? "text-right pr-8" : ""}`}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <YearBadge year={item.year} align="right" />
              <h3
                className="text-2xl font-bold mt-2 mb-3"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#800020" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                {item.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Center line & dot */}
        <div className="w-2/12 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-5 h-5 rounded-full border-4 z-10 mt-1"
            style={{
              background: "#CFB53B",
              borderColor: "#800020",
              boxShadow: "0 0 0 4px rgba(128,0,32,0.15)",
            }}
          />
          <div className="flex-1 w-px" style={{ background: "rgba(207,181,59,0.3)" }} />
        </div>

        {/* Right content */}
        <div className={`w-5/12 ${!isLeft ? "pl-8" : ""}`}>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <YearBadge year={item.year} align="left" />
              <h3
                className="text-2xl font-bold mt-2 mb-3"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#800020" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5344" }}>
                {item.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="flex md:hidden gap-4 w-full">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-4 h-4 rounded-full border-4 z-10 mt-1 flex-shrink-0"
            style={{ background: "#CFB53B", borderColor: "#800020" }}
          />
          <div className="flex-1 w-px mt-2" style={{ background: "rgba(207,181,59,0.3)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="pb-10"
        >
          <YearBadge year={item.year} align="left" />
          <h3
            className="text-xl font-bold mt-2 mb-2"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#800020" }}
          >
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#6B5344" }}>
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function YearBadge({ year, align }: { year: string; align: "left" | "right" }) {
  return (
    <span
      className={`inline-block text-xs tracking-[0.3em] uppercase font-semibold px-3 py-1 ${
        align === "right" ? "float-right" : ""
      }`}
      style={{
        background: "rgba(128,0,32,0.08)",
        color: "#800020",
        border: "1px solid rgba(128,0,32,0.2)",
        fontFamily: "var(--font-source-sans-3)",
      }}
    >
      {year}
    </span>
  );
}

export default function History() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="historia"
      className="py-24 px-6"
      style={{ background: "#FFFFF0" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            A Nossa História
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
          >
            Mais de 110 Anos
            <br />
            <em>de Tradição</em>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#CFB53B">
              <path d="M8 1L9.39 5.26L14 6L10.5 9.24L11.56 14L8 11.77L4.44 14L5.5 9.24L2 6L6.61 5.26L8 1Z" />
            </svg>
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
          <p
            className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6B5344", fontFamily: "var(--font-source-sans-3)" }}
          >
            Quatro gerações de uma família dedicaram a vida a preservar a autenticidade
            da cozinha portuguesa, transformando o Bijou numa referência gastronómica
            incontornável da Figueira da Foz.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "rgba(207,181,59,0.2)" }}
          />

          <div className="space-y-0">
            {milestones.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
