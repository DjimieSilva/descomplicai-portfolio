"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "2.400m\u00B2", label: "de jardim" },
  { value: "87", label: "esp\u00E9cies plantadas" },
  { value: "Smart", label: "rega inteligente" },
  { value: "6", label: "meses de projeto" },
];

export default function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
          >
            Projeto em Destaque
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Project details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
            >
              Villa Quinta do Lago
            </h2>
            <p
              className="text-lg mb-2"
              style={{
                color: "#C9A96E",
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "1.25rem",
              }}
            >
              Transforma&ccedil;&atilde;o Completa
            </p>

            <div
              className="w-16 h-[2px] my-8"
              style={{ background: "#C9A96E" }}
            />

            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "rgba(245,240,232,0.75)" }}
            >
              Uma propriedade de luxo na Quinta do Lago transformada num verdadeiro
              para&iacute;so mediterr&acirc;nico. O projeto envolveu a cria&ccedil;&atilde;o
              de v&aacute;rias zonas &mdash; desde a piscina natural biol&oacute;gica
              rodeada de gram&iacute;neas ornamentais, ao jardim formal com sebes de
              buxo esculpidas, passando pela zona de convívio com p&eacute;rgola de
              glicínia e o pomar de citrinos junto &agrave; cozinha exterior.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "rgba(245,240,232,0.75)" }}
            >
              O sistema de rega inteligente, controlado por sensores de humidade e
              dados meteorol&oacute;gicos, reduz o consumo de &aacute;gua em 60%
              comparado com sistemas tradicionais. Cada planta foi selecionada pela
              sua adapta&ccedil;&atilde;o ao microclima espec&iacute;fico do terreno.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-playfair)", color: "#C9A96E" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Gradient image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden"
            style={{ borderRadius: "4px", minHeight: "500px" }}
          >
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0"
            >
              {/* Multi-layer gradient to simulate a lush garden scene */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #2A4A2C 0%, #3D5A3E 25%, #5A7D5C 50%, #3D5A3E 75%, #1A2A18 100%)",
                }}
              />
              {/* Pool water suggestion */}
              <div
                className="absolute bottom-[20%] left-[10%] right-[10%] h-[25%] rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(100,160,180,0.3) 0%, rgba(60,120,140,0.2) 100%)",
                }}
              />
              {/* Garden texture pattern */}
              <div className="absolute inset-0 opacity-[0.1]">
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern
                      id="garden-tex"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="20" cy="20" r="8" fill="none" stroke="#F5F0E8" strokeWidth="0.5" />
                      <path d="M20 12 L20 28 M12 20 L28 20" stroke="#F5F0E8" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#garden-tex)" />
                </svg>
              </div>
              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(26,26,24,0.4) 100%)",
                }}
              />
            </motion.div>

            {/* Project label overlay */}
            <div className="absolute bottom-6 left-6 z-10">
              <div
                className="px-4 py-2 text-xs tracking-wider uppercase"
                style={{
                  background: "rgba(26,26,24,0.7)",
                  backdropFilter: "blur(8px)",
                  color: "#C9A96E",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                Quinta do Lago, Algarve
              </div>
            </div>

            {/* Gold corner accents */}
            <div
              className="absolute top-4 left-4 w-8 h-8"
              style={{
                borderTop: "2px solid rgba(201,169,110,0.4)",
                borderLeft: "2px solid rgba(201,169,110,0.4)",
              }}
            />
            <div
              className="absolute bottom-4 right-4 w-8 h-8"
              style={{
                borderBottom: "2px solid rgba(201,169,110,0.4)",
                borderRight: "2px solid rgba(201,169,110,0.4)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
