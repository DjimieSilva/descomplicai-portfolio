"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Sunset, Wind, Users } from "lucide-react";

const experiences = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Vista panorâmica",
    text: "As nossas mesas junto à janela oferecem uma vista 180° sobre o Atlântico e a foz do Mondego.",
  },
  {
    icon: <Sunset className="w-6 h-6" />,
    title: "Pôr do sol sobre o mar",
    text: "À tarde, o sol poente sobre o oceano cria uma luz única que transforma o jantar numa experiência inesquecível.",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Terraço de verão",
    text: "De junho a setembro, a esplanada com vista mar recebe até 40 pessoas para refeições ao ar livre.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Sala privada para grupos",
    text: "Dispomos de sala reservada para grupos até 20 pessoas — eventos de empresa, aniversários ou jantares especiais.",
  },
];

export default function SeaView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="vista"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#003049" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-semibold">Vista sobre o Atlântico</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            Comer com o mar
            <br />
            <span style={{ color: "#B8E0D2" }}>à sua frente</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(184,224,210,0.7)" }}>
            No Marégrafo, a experiência começa antes do primeiro prato. A vista sobre o Atlântico
            é tão boa quanto a comida — e quem nos visita raramente discorda.
          </p>
        </motion.div>

        {/* Main visual block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden mb-16 relative"
          style={{ aspectRatio: "16/7", backgroundColor: "#001f30" }}
        >
          {/* Ocean panorama illustration */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #FF6B35 0%, #FF8C00 15%, #FFD700 25%, #87CEEB 40%, #4682B4 60%, #003049 80%, #001f30 100%)",
              opacity: 0.85,
            }}
          />
          {/* Horizon line glow */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "32%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(255,200,100,0.6), transparent)",
            }}
          />
          {/* Waves */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
          >
            <path
              fill="#001f30"
              d="M0,100 C240,60 480,140 720,100 C960,60 1200,140 1440,100 L1440,200 L0,200 Z"
            />
          </svg>

          {/* Centered overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p
                className="text-3xl md:text-5xl font-bold text-white mb-3"
                style={{ fontFamily: "Lexend, sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                "A melhor vista da Figueira"
              </p>
              <p className="text-white/70 text-sm">— opinião recorrente nas avaliações Google</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Experience cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(184,224,210,0.07)",
                border: "1px solid rgba(184,224,210,0.15)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
              >
                {exp.icon}
              </div>
              <h3
                className="font-bold text-white mb-2"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                {exp.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(184,224,210,0.65)" }}>
                {exp.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
