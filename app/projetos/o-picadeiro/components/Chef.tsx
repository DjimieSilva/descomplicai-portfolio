"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Utensils } from "lucide-react";

const credentials = [
  {
    icon: Award,
    label: "Prémio Gastronómico",
    detail: "Melhor Chef da Região Centro 2022",
  },
  {
    icon: BookOpen,
    label: "Formação",
    detail: "Escola de Hotelaria de Lisboa · Estágio em França e Espanha",
  },
  {
    icon: Utensils,
    label: "Experiência",
    detail: "37 anos dedicados à cozinha portuguesa",
  },
];

export default function Chef() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            {/* Main image placeholder */}
            <div className="relative aspect-[3/4] bg-[#1B4332] overflow-hidden">
              {/* Texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #B87333 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Chef silhouette / content area */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-8">
                <div className="text-center">
                  <div className="w-16 h-px bg-[#B87333] mx-auto mb-6" />
                  <p
                    className="text-6xl font-light text-[#FFFBEB]/20"
                    style={{ fontFamily: "var(--font-literata)" }}
                  >
                    37
                  </p>
                  <p
                    className="text-[#FFFBEB]/40 text-sm tracking-[0.2em] uppercase mt-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    anos de paixão
                  </p>
                </div>
              </div>
              {/* Corner ornament */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#B87333]/60" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#B87333]/60" />
            </div>

            {/* Floating credential box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-right-10 bg-[#B87333] p-6 max-w-[200px]"
            >
              <p
                className="text-[#FFFBEB] text-3xl font-light mb-1"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                1987
              </p>
              <p
                className="text-[#FFFBEB]/70 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Fundação do Picadeiro
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#B87333]" />
              <span
                className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Chef & Fundador
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-light text-[#292524] mb-2 leading-tight"
              style={{ fontFamily: "var(--font-literata)" }}
            >
              Pedro Assunção
            </h2>
            <p
              className="text-lg italic text-[#1B4332] mb-8"
              style={{ fontFamily: "var(--font-literata)" }}
            >
              O Homem por Detrás da Lareira
            </p>

            <div className="space-y-5 text-[#292524]/70 leading-relaxed mb-10" style={{ fontFamily: "var(--font-inter)" }}>
              <p>
                Natural da Figueira da Foz, Pedro Assunção cresceu entre as
                cozinhas das avós e os mercados de peixe fresco da Costa de Prata.
                Aos 22 anos abriu O Picadeiro com uma missão simples: servir a
                melhor cozinha portuguesa que a cidade alguma vez provou.
              </p>
              <p>
                Formado em Lisboa e temperado nos fogões de Lyon e San Sebastián,
                voltou às raízes com uma técnica afinada e uma convicção inabalável:
                o produto português, bem tratado, rivaliza com qualquer gastronomia
                do mundo.
              </p>
              <p>
                Hoje, com quatro décadas de ofício, Pedro continua no ativo —
                na linha da frente, a orientar cada serviço com a mesma intensidade
                do primeiro dia.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-4 border-t border-[#292524]/10 pt-8">
              {credentials.map((cred, i) => {
                const Icon = cred.icon;
                return (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 border border-[#B87333]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div>
                      <p
                        className="text-xs tracking-[0.15em] uppercase text-[#B87333] mb-0.5"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cred.label}
                      </p>
                      <p
                        className="text-sm text-[#292524]/70"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {cred.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
