"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, TreePine, Users } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-20 lg:py-28 bg-white"
      aria-label="Sobre a clínica"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm font-bold tracking-widest uppercase text-[#C2703B] mb-4"
            >
              A Nossa História
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-6"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Enraizados em Quiaios,
              <br />
              ao serviço da nossa gente
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[#6B5040] leading-relaxed mb-5 text-base sm:text-lg"
            >
              A Clínica Médico Dentária de Quiaios nasceu do desejo de trazer
              cuidados de saúde oral de qualidade à nossa vila, sem que as
              famílias precisem de se deslocar até à cidade para um tratamento
              de confiança.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[#6B5040] leading-relaxed mb-8 text-base sm:text-lg"
            >
              Somos parte desta comunidade. Conhecemos as nossas famílias pelo
              nome, recordamos as histórias de cada paciente e tratamos cada
              sorriso com o carinho que a nossa terra merece. Porque em
              Quiaios, a saúde ainda tem rosto humano.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              {[
                { icon: Heart, text: "Atendimento personalizado" },
                { icon: TreePine, text: "No coração de Quiaios" },
                { icon: Users, text: "Gerações de famílias" },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-[#FFF8F0] rounded-xl px-4 py-2.5 border border-[#C2703B]/10"
                >
                  <Icon className="w-4 h-4 text-[#C2703B] shrink-0" />
                  <span className="text-sm font-semibold text-[#8B6F47]">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: decorative card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-[#C2703B] to-[#A85E2E] rounded-3xl p-8 text-white shadow-2xl">
              {/* Nature illustration placeholder */}
              <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-white/15 flex items-center justify-center">
                  {/* Pine tree + tooth SVG icon */}
                  <svg
                    viewBox="0 0 80 80"
                    className="w-20 h-20"
                    aria-hidden="true"
                  >
                    {/* Tooth */}
                    <path
                      d="M28,20 C24,20 20,24 20,30 C20,36 22,42 24,48 C25,52 27,56 30,56 C32,56 33,52 34,48 C35,44 35,40 38,40 C41,40 41,44 42,48 C43,52 44,56 46,56 C49,56 51,52 52,48 C54,42 56,36 56,30 C56,24 52,20 48,20 C44,20 42,22 40,22 C38,22 36,20 32,20 Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    {/* Small tree */}
                    <polygon
                      points="62,60 68,45 74,60"
                      fill="white"
                      fillOpacity="0.5"
                    />
                    <polygon
                      points="62,50 68,35 74,50"
                      fill="white"
                      fillOpacity="0.5"
                    />
                    <rect
                      x="66"
                      y="60"
                      width="4"
                      height="8"
                      fill="white"
                      fillOpacity="0.4"
                    />
                  </svg>
                </div>
              </div>

              <blockquote className="text-center">
                <p className="text-xl font-bold leading-snug mb-4" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                  &ldquo;Tratamos de si como família, porque em Quiaios
                  é assim que sempre foi.&rdquo;
                </p>
                <cite className="text-white/75 text-sm not-italic">
                  — A equipa da clínica
                </cite>
              </blockquote>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 border border-[#C2703B]/10">
              <div
                className="text-2xl font-extrabold text-[#C2703B]"
                style={{ fontFamily: "'Nunito Sans', sans-serif" }}
              >
                Largo de S. Sebastião
              </div>
              <div className="text-xs text-[#8B6F47] font-medium mt-0.5">
                Quiaios, Figueira da Foz
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-1.5 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#5F7A3A]"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
