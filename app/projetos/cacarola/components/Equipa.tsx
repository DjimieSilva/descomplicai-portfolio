"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Award, Users } from "lucide-react";

const membros = [
  {
    nome: "Graça Mortágua",
    papel: "Fundadora & Chefe de Cozinha",
    descricao:
      "Graça cresceu entre panelas e receitas de família em Figueira da Foz. Em 1976, com Alcino, abriu o Caçarola com a certeza de que a cozinha portuguesa merecia ser preservada tal como sempre foi — com tempo, dedicação e os melhores ingredientes.",
    destaque: "50 anos de cozinha",
  },
  {
    nome: "Alcino Mortágua",
    papel: "Cofundador & Sala",
    descricao:
      "Alcino é o rosto do Caçarola na sala — o homem que conhece o nome de todos, que lembra as preferências dos clientes que vêm há décadas. Com Graça, construiu mais do que um restaurante: construiu um lar para toda a cidade.",
    destaque: "A alma do serviço",
  },
  {
    nome: "A Equipa",
    papel: "Cozinha & Sala",
    descricao:
      "A equipa do Caçarola é de casa — muitos trabalham connosco há mais de 10 anos. Não há segredos guardados: as receitas são passadas a quem quer aprender, e o espírito de família estende-se a cada pessoa que põe o avental.",
    destaque: "Uma família de 12",
  },
];

export default function Equipa() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="equipa"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#FFFBEB" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="equipa-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect x="2" y="2" width="56" height="56" fill="none" stroke="#7C2D12" strokeWidth="1.5" />
              <circle cx="30" cy="30" r="10" fill="none" stroke="#7C2D12" strokeWidth="1" />
              <path d="M30 18 L30 42 M18 30 L42 30" stroke="#7C2D12" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#equipa-pattern)" />
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
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            A Nossa Equipa
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Família Mortágua,
            <br />
            <em>desde 1976</em>
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
            O Caçarola nasceu das mãos de Graça e Alcino Mortágua com uma missão clara:
            servir Figueira da Foz com a cozinha que todos tínhamos em casa.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {membros.map((membro, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
            return (
              <motion.div
                key={membro.nome}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #FEF3C7 0%, #FFFBEB 100%)",
                  border: "1px solid rgba(194,65,12,0.2)",
                }}
              >
                {/* Top accent */}
                <div
                  className="h-1 w-full"
                  style={{ background: "linear-gradient(90deg, #C2410C, #92400E)" }}
                />

                <div className="p-8">
                  {/* Avatar placeholder */}
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(194,65,12,0.1)",
                      border: "1.5px solid rgba(194,65,12,0.25)",
                    }}
                  >
                    {i === 2 ? (
                      <Users size={28} style={{ color: "#C2410C" }} />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="10" r="5" stroke="#C2410C" strokeWidth="1.5" />
                        <path
                          d="M4 26 C4 20 9 17 14 17 C19 17 24 20 24 26"
                          stroke="#C2410C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
                  >
                    {membro.nome}
                  </h3>
                  <p
                    className="text-xs tracking-wider uppercase mb-4 font-semibold"
                    style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
                  >
                    {membro.papel}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                  >
                    {membro.descricao}
                  </p>

                  {/* Destaque badge */}
                  <span
                    className="inline-flex items-center gap-1.5 text-xs tracking-wide px-3 py-1.5"
                    style={{
                      background: "rgba(194,65,12,0.08)",
                      border: "1px solid rgba(194,65,12,0.2)",
                      color: "#92400E",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <Award size={11} style={{ color: "#C2410C" }} />
                    {membro.destaque}
                  </span>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 opacity-8">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <rect x="2" y="2" width="36" height="36" fill="none" stroke="#C2410C" strokeWidth="1" />
                    <circle cx="20" cy="20" r="7" fill="none" stroke="#C2410C" strokeWidth="0.8" />
                    <path d="M20 12 Q23 16 20 20 Q17 16 20 12Z" fill="#C2410C" fillOpacity="0.3" />
                    <path d="M20 28 Q23 24 20 20 Q17 24 20 28Z" fill="#C2410C" fillOpacity="0.3" />
                    <path d="M12 20 Q16 23 20 20 Q16 17 12 20Z" fill="#C2410C" fillOpacity="0.3" />
                    <path d="M28 20 Q24 23 20 20 Q24 17 28 20Z" fill="#C2410C" fillOpacity="0.3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote / values strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative overflow-hidden py-12 px-8 text-center"
          style={{
            background: "linear-gradient(135deg, #7C2D12 0%, #92400E 100%)",
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="strip-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="8" fill="none" stroke="#FFFBEB" strokeWidth="1" />
                  <path d="M20 10 L20 30 M10 20 L30 20" stroke="#FFFBEB" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#strip-pattern)" />
            </svg>
          </div>

          <div className="relative flex items-center justify-center gap-3 mb-4">
            <Heart size={16} style={{ color: "#FDE68A" }} />
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
            >
              A Nossa Promessa
            </p>
            <Heart size={16} style={{ color: "#FDE68A" }} />
          </div>
          <blockquote
            className="text-2xl md:text-3xl font-bold italic max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
          >
            &ldquo;Cada cliente que entra pela porta é tratado como parte da família.
            Sempre foi assim. Sempre será.&rdquo;
          </blockquote>
          <p
            className="mt-4 text-sm"
            style={{ color: "rgba(253,230,138,0.7)", fontFamily: "var(--font-inter)" }}
          >
            — Graça Mortágua, fundadora
          </p>
        </motion.div>
      </div>
    </section>
  );
}
