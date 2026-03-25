"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, MapPin, Utensils } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Receitas de Família",
    description:
      "Cada prato que sai da nossa cozinha carrega anos de tradição. Receitas passadas de mão em mão, guardadas com o mesmo carinho com que foram criadas.",
  },
  {
    icon: Utensils,
    title: "Ingredientes da Terra",
    description:
      "Trabalhamos com produtores locais da região de Coimbra e da Beira Litoral. Do campo à mesa, com honestidade e respeito pelo produto.",
  },
  {
    icon: MapPin,
    title: "Dois Espaços, Uma Alma",
    description:
      "Caçarola e Caçarola Dois — dois restaurantes no coração de Figueira da Foz, unidos pela mesma filosofia: cozinha portuguesa verdadeira.",
  },
];

export default function Story() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="historia"
      className="py-24 px-6"
      style={{ background: "#FFFBEB" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            A Nossa História
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Duas Caçarolas,
            <br />
            <em>uma só tradição</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: "#C2410C" }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#C2410C">
              <path d="M7 1L8.5 5.2L13 5.7L9.5 8.9L10.6 13.5L7 11.1L3.4 13.5L4.5 8.9L1 5.7L5.5 5.2L7 1Z" />
            </svg>
            <div className="h-px w-16" style={{ background: "#C2410C" }} />
          </div>
          <p
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            Nascemos do desejo de trazer a figueira da foz a cozinha que todos conhecemos
            de casa — a comida da avó, o cozido de domingo, o bacalhau que cheira a lar.
            Com dois espaços na cidade, servimos a mesma receita de sempre: ingredientes
            bons, mãos honestas e muito amor ao que fazemos.
          </p>
        </motion.div>

        {/* Two restaurants highlight */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {[
            {
              name: "Caçarola",
              subtitle: "O Original",
              desc: "O nosso primeiro lar. Uma sala acolhedora com azulejos tradicionais, onde tudo começou. O Caçarola é a casa — literalmente. O espaço onde as receitas foram criadas, testadas e aperfeiçoadas ao longo dos anos.",
              tag: "Restaurante Principal",
              delay: 0.1,
            },
            {
              name: "Caçarola Dois",
              subtitle: "A Expansão",
              desc: "Crescemos porque Figueira da Foz pediu mais. O Caçarola Dois traz o mesmo ADN do original — a mesma ementa, os mesmos sabores, o mesmo calor humano — num espaço que recebe famílias, grupos e celebrações.",
              tag: "Restaurante Irmão",
              delay: 0.25,
            },
          ].map((restaurant) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
            return (
              <motion.div
                key={restaurant.name}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: restaurant.delay }}
                className="relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)",
                  border: "1px solid rgba(194,65,12,0.2)",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: "linear-gradient(90deg, #C2410C, #92400E)" }}
                />
                <div className="p-8">
                  <span
                    className="text-xs tracking-[0.35em] uppercase font-semibold px-3 py-1 mb-4 inline-block"
                    style={{
                      background: "rgba(194,65,12,0.1)",
                      color: "#C2410C",
                      border: "1px solid rgba(194,65,12,0.25)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {restaurant.tag}
                  </span>
                  <h3
                    className="text-3xl font-bold mt-3 mb-1"
                    style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
                  >
                    {restaurant.name}
                  </h3>
                  <p
                    className="text-base italic mb-4"
                    style={{ fontFamily: "var(--font-source-serif-4)", color: "#C2410C" }}
                  >
                    {restaurant.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                  >
                    {restaurant.desc}
                  </p>
                </div>

                {/* Azulejo corner decoration */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <rect x="2" y="2" width="44" height="44" fill="none" stroke="#C2410C" strokeWidth="1.5" />
                    <rect x="8" y="8" width="32" height="32" fill="none" stroke="#C2410C" strokeWidth="1" />
                    <circle cx="24" cy="24" r="8" fill="none" stroke="#C2410C" strokeWidth="1" />
                    <path d="M24 14 Q28 19 24 24 Q20 19 24 14Z" fill="#C2410C" />
                    <path d="M24 34 Q28 29 24 24 Q20 29 24 34Z" fill="#C2410C" />
                    <path d="M14 24 Q19 28 24 24 Q19 20 14 24Z" fill="#C2410C" />
                    <path d="M34 24 Q29 28 24 24 Q29 20 34 24Z" fill="#C2410C" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const pillarRef = useRef(null);
            const pillarInView = useInView(pillarRef, { once: true, margin: "-60px" });
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                ref={pillarRef}
                initial={{ opacity: 0, y: 24 }}
                animate={pillarInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center px-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(194,65,12,0.1)", border: "1px solid rgba(194,65,12,0.2)" }}
                >
                  <Icon size={24} style={{ color: "#C2410C" }} />
                </div>
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
                >
                  {pillar.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
