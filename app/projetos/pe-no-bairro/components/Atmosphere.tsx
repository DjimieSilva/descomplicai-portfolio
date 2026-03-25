"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Music, Volume2, Sun, Moon } from "lucide-react";

const vibes = [
  {
    icon: Sun,
    time: "Almoço",
    mood: "Casual e descontraído",
    description:
      "O movimento do dia a dia. Colegas de trabalho, famílias, reformados do bairro. Uma refeição sem pressa mas sem demora.",
  },
  {
    icon: Moon,
    time: "Jantar",
    mood: "Animado e acolhedor",
    description:
      "A noite no Pé no Bairro tem outra energia. A música sobe um pouco, as conversas alargam-se, e o tempo passa sem dar por isso.",
  },
  {
    icon: Music,
    time: "Fins de semana",
    mood: "Cheio de vida",
    description:
      "Aos fins de semana há sempre mais gente, mais barulho (o bom barulho) e frequentemente música ao vivo para animar a noite.",
  },
  {
    icon: Volume2,
    time: "Esplanada",
    mood: "Ar livre e bom ambiente",
    description:
      "Quando o tempo permite, a esplanada fica cheia. É o lugar perfeito para uma imperial gelada e uma bifana enquanto o dia passa.",
  },
];

export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#0f0f0f] py-24 px-6 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-end mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#EAB308]" />
              <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
                O Ambiente
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
              Paredes com história,
              <br />
              <span className="text-[#EAB308]">mesas com vida.</span>
            </h2>
          </div>
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-base sm:text-lg leading-relaxed">
              O Pé no Bairro tem o visual de um espaço urbano contemporâneo —
              tijolo à vista, madeira escura, iluminação quente — mas a alma de
              uma taberna de bairro. Aqui sente-se bem, come-se melhor.
            </p>
          </div>
        </motion.div>

        {/* Large accent banner */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-[#EAB308] via-[#B91C1C] to-transparent mb-16 origin-left"
        />

        {/* Vibes grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vibes.map((vibe, i) => (
            <motion.div
              key={vibe.time}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="group"
            >
              <div className="mb-4 w-10 h-10 bg-[#EAB308]/10 flex items-center justify-center group-hover:bg-[#EAB308]/20 transition-colors duration-300">
                <vibe.icon size={16} className="text-[#EAB308]" />
              </div>
              <div className="mb-1">
                <span className="font-[family-name:var(--font-space-grotesk)] font-black text-white text-lg">
                  {vibe.time}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#EAB308] tracking-widest uppercase">
                  {vibe.mood}
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm leading-relaxed">
                {vibe.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Full-width visual break */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 relative overflow-hidden bg-[#EAB308]/5 border border-[#EAB308]/10 p-8 sm:p-12"
        >
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-[#EAB308]/5 to-transparent" />
          <blockquote className="relative">
            <p className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(1.4rem,4vw,2.2rem)] text-white leading-tight max-w-2xl">
              "Um bairro tem alma quando tem um sítio onde toda a gente se sente
              em casa. O Pé no Bairro quer ser esse sítio."
            </p>
            <footer className="mt-4 font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm">
              — A equipa do Pé no Bairro
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
