"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const specialties = [
  {
    number: "01",
    name: "Pastel de Nata",
    tagline: "A Estrela da Casa",
    description:
      "A receita que nos define. Massa folhada estaladiça, creme de ovos aveludado, canela e açúcar em pó. Acabado de fazer, sempre quentinho.",
    detail: "€1.50 · Disponível todo o dia",
  },
  {
    number: "02",
    name: "Galão da Praça",
    tagline: "O Ritual do Café",
    description:
      "O nosso galão é feito com blend especialmente selecionado. Cremoso, equilibrado, com a temperatura certa. O melhor começar de dia.",
    detail: "€1.50 · Blend exclusivo",
  },
  {
    number: "03",
    name: "Prato do Dia",
    tagline: "Feito com Amor",
    description:
      "Todos os dias uma receita diferente, sempre com produtos frescos e locais. Sopa, prato principal e bebida — tudo incluído. Como em casa.",
    detail: "€8.50–€10.00 · De segunda a sexta",
  },
  {
    number: "04",
    name: "Tosta Especial",
    tagline: "O Favorito da Manhã",
    description:
      "Pão de forma artesanal tostado, queijo derretido, presunto e tomate seco. A tosta que todos os clientes habituais pedem pelo nome.",
    detail: "€6.00 · Pequenos-almoços",
  },
];

export default function Specialties() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="specialties"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Especialidades
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            Os Nossos
            <br />
            <span style={{ color: "#B5A642" }}>Momentos Especiais</span>
          </h2>
        </motion.div>

        {/* Specialty items */}
        <div className="space-y-0">
          {specialties.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group grid md:grid-cols-12 gap-8 items-center py-12 border-b"
              style={{ borderBottomColor: "rgba(60,21,24,0.1)" }}
            >
              {/* Number */}
              <div className="md:col-span-1 hidden md:block">
                <span
                  className="text-4xl font-bold opacity-20"
                  style={{
                    fontFamily: "var(--font-domine), serif",
                    color: "#3C1518",
                  }}
                >
                  {item.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-7">
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "#B5A642" }}
                >
                  {item.tagline}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-domine), serif",
                    color: "#3C1518",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(60,21,24,0.65)" }}
                >
                  {item.description}
                </p>
              </div>

              {/* Detail tag */}
              <div className="md:col-span-4 md:text-right">
                <span
                  className="inline-block px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(181,166,66,0.12)",
                    color: "#B5A642",
                    borderRadius: "2px",
                  }}
                >
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
