"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const spaces = [
  {
    title: "Sala Principal",
    subtitle: "Atmosfera íntima para 40 pessoas",
    description:
      "Tectos altos, paredes de pedra aparente e iluminação de velas. A sala principal evoca a tradição das tabernas portuguesas, com um toque contemporâneo que a torna atemporal.",
    palette: "bg-[#1B4332]",
    textColor: "text-[#FFFBEB]",
    size: "large",
  },
  {
    title: "Salão do Lar",
    subtitle: "Calor de lareira em dias frios",
    description:
      "Em redor da lareira histórica do século XIX, este espaço é o coração emocional do restaurante. Ideal para jantares de inverno e momentos de celebração.",
    palette: "bg-[#B87333]",
    textColor: "text-[#FFFBEB]",
    size: "small",
  },
  {
    title: "Terraço de Verão",
    subtitle: "Ar livre no coração da cidade",
    description:
      "Com vista para a Rua do Centro, o terraço serve de extensão natural nos meses quentes. Sombreado, fresco e perfumado com ervas aromáticas.",
    palette: "bg-[#FFFBEB]",
    textColor: "text-[#292524]",
    size: "small",
  },
  {
    title: "Adega Privada",
    subtitle: "Jantar entre anfitriões",
    description:
      "Espaço exclusivo para até 12 pessoas, emoldurado pelas nossas melhores garrafeiras. Iluminação intimista e serviço dedicado para experiências únicas.",
    palette: "bg-[#292524]",
    textColor: "text-[#FFFBEB]",
    size: "large",
  },
];

export default function Ambiance() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              O Espaço
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#292524] mb-4"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            Ambientes que{" "}
            <span className="italic text-[#1B4332]">Contam Histórias</span>
          </h2>

          <p
            className="text-[#292524]/60 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Cada espaço do Picadeiro tem carácter próprio. Escolha o ambiente
            que melhor combina com a sua ocasião.
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative overflow-hidden ${space.palette} ${
                space.size === "large" ? "md:row-span-1" : ""
              }`}
            >
              {/* Texture */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="relative p-8 md:p-10 min-h-[240px] flex flex-col justify-between">
                <div>
                  <span
                    className={`text-xs tracking-[0.25em] uppercase opacity-60 mb-3 block ${space.textColor}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {space.subtitle}
                  </span>
                  <h3
                    className={`text-2xl md:text-3xl font-light mb-4 ${space.textColor}`}
                    style={{ fontFamily: "var(--font-literata)" }}
                  >
                    {space.title}
                  </h3>
                  <div
                    className={`w-8 h-px mb-4 transition-all duration-500 group-hover:w-16 ${
                      space.palette === "bg-[#FFFBEB]"
                        ? "bg-[#B87333]"
                        : "bg-current opacity-40"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm leading-relaxed opacity-70 ${space.textColor}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {space.description}
                </p>
              </div>

              {/* Corner ornament */}
              <div
                className={`absolute bottom-4 right-4 w-6 h-6 border-b border-r opacity-30 ${
                  space.palette === "bg-[#FFFBEB]"
                    ? "border-[#B87333]"
                    : "border-current"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Capacity note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {[
            { label: "Lugares totais", value: "80" },
            { label: "Sala privada", value: "12" },
            { label: "Terraço verão", value: "24" },
            { label: "Acessibilidade", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-light text-[#1B4332] mb-1"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#292524]/40"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
