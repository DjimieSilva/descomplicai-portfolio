"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Heart, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Coffee,
    title: "Café de Qualidade",
    description:
      "Cada chávena preparada com rigor. Espresso, galão, meia de leite — o ritual do café português como deve ser.",
  },
  {
    icon: Heart,
    title: "Alma Portuguesa",
    description:
      "Um espaço onde a tradição do café de bairro se encontra com o aconchego de estar em casa. Onde toda a gente se conhece.",
  },
  {
    icon: MapPin,
    title: "No Coração da Praça",
    description:
      "Na praça histórica da Figueira da Foz, onde a vida acontece. O ponto de encontro de quem conhece a cidade.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#FFF8F0" }}
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <div
              className="inline-flex items-center gap-3 mb-6"
              style={{ color: "#B5A642" }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
              <span className="text-xs font-semibold tracking-widest uppercase">
                O Nosso Café
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-domine), serif",
                color: "#3C1518",
              }}
            >
              Onde a Figueira
              <br />
              <span style={{ color: "#B5A642" }}>Toma Café</span>
            </h2>

            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "rgba(60,21,24,0.7)" }}
            >
              Há lugares que toda a gente conhece. O Café Praça 18 é esse lugar
              na Figueira da Foz — onde os dias começam com um bom café e uma
              tosta quente, onde o almoço é sempre com boa companhia, e onde o
              tempo passa devagar porque não há pressa.
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(60,21,24,0.7)" }}
            >
              Com uma avaliação de{" "}
              <strong style={{ color: "#3C1518" }}>9.6 em 10</strong>, somos o
              café mais bem avaliado da Figueira da Foz. Um reconhecimento que
              pertence a quem nos visita todos os dias.
            </p>
          </motion.div>

          {/* Decorative right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative p-10 rounded-sm overflow-hidden"
              style={{ backgroundColor: "#3C1518" }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, #B5A642 0%, transparent 70%)",
                }}
              />
              <div
                className="text-7xl font-bold mb-2 leading-none"
                style={{
                  fontFamily: "var(--font-domine), serif",
                  color: "#B5A642",
                }}
              >
                9.6
              </div>
              <div
                className="text-sm font-semibold tracking-widest uppercase mb-6"
                style={{ color: "rgba(181,166,66,0.7)" }}
              >
                Avaliação / 10
              </div>
              <div
                className="w-12 h-px mb-6"
                style={{ backgroundColor: "rgba(181,166,66,0.3)" }}
              />
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(232,213,183,0.8)" }}
              >
                "O melhor café da cidade. Atendimento impecável, ambiente
                acolhedor e os melhores pastéis de nata que já comi."
              </p>
              <div
                className="mt-4 text-sm"
                style={{ color: "rgba(181,166,66,0.6)" }}
              >
                — Cliente habitual
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="p-8 border-l-2"
                style={{ borderLeftColor: "#B5A642" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5 rounded-sm"
                  style={{ backgroundColor: "rgba(181,166,66,0.1)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#B5A642" }} />
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-domine), serif",
                    color: "#3C1518",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(60,21,24,0.65)" }}
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
