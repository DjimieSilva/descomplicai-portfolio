"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Maria Gonçalves",
    location: "Figueira da Foz",
    rating: 10,
    text: "O melhor café da cidade, sem dúvida. Os pastéis de nata são divinos e o pessoal é sempre tão simpático. É o meu sítio de eleição para o pequeno-almoço.",
    date: "Novembro 2024",
  },
  {
    name: "João Ferreira",
    location: "Coimbra",
    rating: 10,
    text: "Vim visitar a Figueira e fiquei rendido. A tosta especial é fenomenal, o café é perfeito e a esplanada na praça é simplesmente irresistível.",
    date: "Outubro 2024",
  },
  {
    name: "Ana Silva",
    location: "Lisboa",
    rating: 9,
    text: "Ambiente acolhedor, serviço rápido e atencioso. O prato do dia estava delicioso — bacalhau à brás de fazer inveja. Vou com certeza repetir.",
    date: "Setembro 2024",
  },
  {
    name: "Pedro Costa",
    location: "Porto",
    rating: 10,
    text: "Descobri este café por acaso e foi a melhor descoberta da viagem. Avaliação completamente merecida. O galão foi o melhor que bebi em anos.",
    date: "Agosto 2024",
  },
  {
    name: "Carla Mendes",
    location: "Figueira da Foz",
    rating: 10,
    text: "Sou cliente habitual há anos. É o tipo de café onde entras e já sabes o teu pedido a caminho. Familiar, acolhedor, imprescindível.",
    date: "Julho 2024",
  },
  {
    name: "Rui Almeida",
    location: "Aveiro",
    rating: 9,
    text: "Ambiente autêntico de café português. Sem ostentação, com muito sabor e ainda mais simpatia. Os bolinhos de bacalhau são para comer e não parar.",
    date: "Junho 2024",
  },
];

const stats = [
  { value: "9.6", label: "Avaliação Média", suffix: "/10" },
  { value: "500", label: "Avaliações Positivas", suffix: "+" },
  { value: "15", label: "Anos de História", suffix: "+" },
  { value: "1°", label: "Café da Figueira", suffix: "" },
];

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="reviews"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#E8D5B7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              O Que Dizem de Nós
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            O Café Mais Bem Avaliado
            <br />
            <span style={{ color: "#B5A642" }}>da Figueira da Foz</span>
          </h2>

          {/* Big rating display */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-7 h-7 fill-current"
                style={{ color: "#B5A642" }}
              />
            ))}
          </div>
          <div
            className="text-7xl font-bold leading-none mb-2"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            9.6
          </div>
          <div
            className="text-sm tracking-widest uppercase"
            style={{ color: "rgba(60,21,24,0.5)" }}
          >
            em 10 — Avaliação Média
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 rounded-sm"
              style={{ backgroundColor: "rgba(60,21,24,0.06)" }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-domine), serif",
                  color: "#3C1518",
                }}
              >
                {stat.value}
                <span style={{ color: "#B5A642" }}>{stat.suffix}</span>
              </div>
              <div
                className="text-xs tracking-wide uppercase"
                style={{ color: "rgba(60,21,24,0.55)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-sm flex flex-col"
              style={{
                backgroundColor: "#FFF8F0",
                border: "1px solid rgba(60,21,24,0.08)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-current"
                    style={{ color: "#B5A642" }}
                  />
                ))}
              </div>

              {/* Review text */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5 italic"
                style={{ color: "rgba(60,21,24,0.75)" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#3C1518" }}
                  >
                    {review.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(60,21,24,0.45)" }}
                  >
                    {review.location}
                  </div>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(60,21,24,0.35)" }}
                >
                  {review.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
