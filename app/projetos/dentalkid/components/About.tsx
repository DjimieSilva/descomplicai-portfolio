"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Star, Smile } from "lucide-react";

const stats = [
  { value: "+500", label: "Famílias atendidas", emoji: "👨‍👩‍👧" },
  { value: "2", label: "Clínicas em Figueira", emoji: "🏥" },
  { value: "0-17", label: "Anos de idade", emoji: "🎂" },
  { value: "100%", label: "Especializada em crianças", emoji: "⭐" },
];

const values = [
  {
    icon: Heart,
    color: "#F472B6",
    bg: "#FDF2F8",
    title: "Cuidado com carinho",
    desc: "Cada criança é tratada com a mesma atenção que daríamos ao nosso próprio filho.",
  },
  {
    icon: Shield,
    color: "#7C3AED",
    bg: "#F5F3FF",
    title: "Ambiente sem medos",
    desc: "A nossa clínica foi desenhada para que as crianças se sintam seguras e confortáveis.",
  },
  {
    icon: Star,
    color: "#FBBF24",
    bg: "#FFFBEB",
    title: "Especialistas em crianças",
    desc: "Formação especializada em odontopediatria — sabemos exatamente como lidar com os mais novos.",
  },
  {
    icon: Smile,
    color: "#34D399",
    bg: "#F0FDF4",
    title: "Experiência divertida",
    desc: "Tornamos cada consulta numa aventura positiva para que o teu filho espere pela próxima visita!",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="sobre">
      {/* decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🦷 Sobre o Dentalkid
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Especialistas em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              sorrisos pequeninos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O Dentalkid nasceu com uma missão simples:{" "}
            <strong className="text-purple-700">
              acabar com o medo do dentista nas crianças
            </strong>
            . Em Figueira da Foz, com duas clínicas — Buarcos e Tavarede — somos
            a primeira escolha das famílias que querem o melhor para os seus
            filhos.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="text-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div
                className="text-3xl font-black text-purple-700 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((val) => (
            <motion.div
              key={val.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: val.bg }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                style={{ backgroundColor: val.color }}
              >
                <val.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-black text-gray-900 mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {val.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
