"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, Wind, Users, Umbrella } from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Esplanada Ensolarada",
    description: "Vista directa para a praça histórica, ao sol todo o ano.",
  },
  {
    icon: Wind,
    title: "Brisa da Cidade",
    description: "No coração da Figueira, com a animação da praça ao vivo.",
  },
  {
    icon: Umbrella,
    title: "Conforto Total",
    description: "Toldos e aquecedores para os dias mais frescos.",
  },
  {
    icon: Users,
    title: "Para Todos",
    description: "Famílias, grupos, romântico a dois — temos espaço para todos.",
  },
];

export default function Terrace() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="terrace"
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#3C1518" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 L55 50 L5 50 Z' fill='none' stroke='%23B5A642' strokeWidth='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
        style={{ backgroundColor: "#B5A642" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="inline-flex items-center gap-3 mb-6"
              style={{ color: "#B5A642" }}
            >
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "#B5A642" }}
              />
              <span className="text-xs font-semibold tracking-widest uppercase">
                Esplanada
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-domine), serif",
                color: "#E8D5B7",
              }}
            >
              Café na Praça,
              <br />
              <span style={{ color: "#B5A642" }}>Como Deve Ser</span>
            </h2>

            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "rgba(232,213,183,0.7)" }}
            >
              A nossa esplanada na Praça é mais do que uma mesa ao ar livre — é
              um lugar para ver a vida da cidade passar. O café do fim da tarde,
              o almoço demorado ao sol, o encontro casual com amigos.
            </p>

            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "rgba(232,213,183,0.7)" }}
            >
              Na Figueira da Foz, há uma coisa que toda a gente faz: vai ao Café
              Praça 18 sentar na esplanada.
            </p>

            <a
              href="#location"
              className="inline-block px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#B5A642",
                color: "#3C1518",
                borderRadius: "2px",
              }}
            >
              Ver Localização
            </a>
          </motion.div>

          {/* Right: Features grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-sm"
                  style={{
                    backgroundColor: "rgba(232,213,183,0.06)",
                    border: "1px solid rgba(181,166,66,0.15)",
                  }}
                >
                  <Icon
                    className="w-6 h-6 mb-4"
                    style={{ color: "#B5A642" }}
                  />
                  <h3
                    className="text-sm font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-domine), serif",
                      color: "#E8D5B7",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(232,213,183,0.55)" }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
