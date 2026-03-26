"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testemunhos = [
  {
    nome: "Margarida Fernandes",
    origem: "Figueira da Foz",
    avaliacao: 5,
    texto:
      "Vim ao Caçarola pela primeira vez com os meus pais quando tinha 8 anos. Agora trago os meus filhos. A cataplana de mariscos é exactamente como eu a recordo — nada mudou, e isso é tudo.",
    tempo: "há 2 semanas",
  },
  {
    nome: "João Carvalho",
    origem: "Coimbra",
    avaliacao: 5,
    texto:
      "Venho de propósito de Coimbra só para comer aqui. O arroz de lingueirão é o melhor que já provei na minha vida, sem exagero. O serviço da Graça é de uma simpatia genuína que já não se encontra em todo o lado.",
    tempo: "há 1 mês",
  },
  {
    nome: "Ana Sofia Lopes",
    origem: "Lisboa",
    avaliacao: 5,
    texto:
      "Passei o fim-de-semana em Figueira e o Caçarola foi, de longe, a melhor refeição que tive. Caldeirada à pescador com o peixe do dia — não sabia o que estava à espera. Voltarei de certeza.",
    tempo: "há 3 semanas",
  },
  {
    nome: "Manuel Rodrigues",
    origem: "Figueira da Foz",
    avaliacao: 5,
    texto:
      "Frequento o Caçarola há mais de 20 anos. É o tipo de restaurante que já não existe — preços honestos, doses generosas, comida feita com alma. O Alcino ainda se lembra do meu pedido habitual.",
    tempo: "há 1 semana",
  },
  {
    nome: "Beatriz Mendonça",
    origem: "Porto",
    avaliacao: 5,
    texto:
      "Fomos em família — 8 pessoas — e saímos todos satisfeitíssimos. A açorda de gambas é extraordinária. Há uma autenticidade aqui que os restaurantes modernos nunca conseguem imitar.",
    tempo: "há 2 meses",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? "#C2410C" : "none"}
          stroke={i < count ? "#C2410C" : "rgba(194,65,12,0.3)"}
          strokeWidth="1"
        >
          <path d="M7 1L8.5 5.2L13 5.7L9.5 8.9L10.6 13.5L7 11.1L3.4 13.5L4.5 8.9L1 5.7L5.5 5.2L7 1Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testemunhos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testemunhos"
      className="py-24 px-6"
      style={{ background: "#7C2D12" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden" style={{ position: "relative" }}>
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="test-pattern"
              x="0"
              y="0"
              width="70"
              height="70"
              patternUnits="userSpaceOnUse"
            >
              <rect x="3" y="3" width="64" height="64" fill="none" stroke="#FFFBEB" strokeWidth="1" />
              <circle cx="35" cy="35" r="10" fill="none" stroke="#FFFBEB" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#test-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">
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
            style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
          >
            Testemunhos
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
          >
            O que dizem
            <br />
            <em>os nossos clientes</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: "rgba(253,230,138,0.5)" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#FDE68A">
              <path d="M7 1L8.5 5.2L13 5.7L9.5 8.9L10.6 13.5L7 11.1L3.4 13.5L4.5 8.9L1 5.7L5.5 5.2L7 1Z" />
            </svg>
            <div className="h-px w-16" style={{ background: "rgba(253,230,138,0.5)" }} />
          </div>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3">
            <StarRating count={5} />
            <span
              className="text-sm"
              style={{ color: "rgba(255,251,235,0.7)", fontFamily: "var(--font-inter)" }}
            >
              5.0 · Mais de 400 avaliações no Google
            </span>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testemunhos.map((t, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-40px" });
            return (
              <motion.div
                key={t.nome}
                ref={cardRef}
                initial={{ opacity: 0, y: 24 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col p-6"
                style={{
                  background: "rgba(255,251,235,0.06)",
                  border: "1px solid rgba(255,251,235,0.12)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="absolute top-4 right-5 text-5xl leading-none font-bold select-none"
                  style={{
                    fontFamily: "var(--font-source-serif-4)",
                    color: "rgba(253,230,138,0.15)",
                  }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="mb-4">
                  <StarRating count={t.avaliacao} />
                </div>

                {/* Review text */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-5 relative z-10"
                  style={{ color: "rgba(255,251,235,0.85)", fontFamily: "var(--font-inter)" }}
                >
                  {t.texto}
                </p>

                {/* Author */}
                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
                    >
                      {t.nome}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(253,230,138,0.6)", fontFamily: "var(--font-inter)" }}
                    >
                      {t.origem}
                    </p>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,251,235,0.35)", fontFamily: "var(--font-inter)" }}
                  >
                    {t.tempo}
                  </span>
                </div>

                {/* Google badge */}
                <div
                  className="mt-4 pt-4 flex items-center gap-1.5"
                  style={{ borderTop: "1px solid rgba(255,251,235,0.08)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="rgba(253,230,138,0.4)"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="rgba(253,230,138,0.4)"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="rgba(253,230,138,0.4)"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="rgba(253,230,138,0.4)"
                    />
                  </svg>
                  <span
                    className="text-[10px] tracking-wide"
                    style={{ color: "rgba(253,230,138,0.4)", fontFamily: "var(--font-inter)" }}
                  >
                    Google Reviews
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
