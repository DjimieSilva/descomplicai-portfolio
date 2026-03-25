"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Feito com Amor",
    text: "A Dona Conceição ainda vem cedo pôr o tacho ao lume. Não há robot de cozinha que substitua as mãos que sabem.",
  },
  {
    icon: Users,
    title: "Família em Primeiro",
    text: "Somos três gerações na mesma cozinha. Os netos já ajudam a limpar o peixe aos fins de semana.",
  },
  {
    icon: Award,
    title: "Orgulho Local",
    text: "Não temos estrelas Michelin. Temos clientes que vêm de Lisboa só para comer a nossa caldeirada.",
  },
];

export function Family() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#1E3A5F" }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9B896 0px,
            #C9B896 1px,
            transparent 1px,
            transparent 16px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C9B896] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
              Quem Somos
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              A Família<br />
              <span className="text-[#C9B896]">Por Detrás da Tasca</span>
            </h2>
            <div className="w-16 h-1 bg-[#C9B896]/60 mb-8" />

            <div className="space-y-5 text-white/70 leading-relaxed">
              <p>
                A Tasca Da Praia nasceu quando o Sr. Manuel — pescador de
                Buarcos durante trinta anos — decidiu que o melhor peixe da
                costa merecia uma casa digna para ser servido.
              </p>
              <p>
                Com a ajuda da Dona Conceição, abriram a tasca nesta mesma rua
                onde os pescadores chegavam com as redes. O cheiro a brasa
                cedo se tornou marca registada do bairro.
              </p>
              <p>
                Hoje, os filhos e netos continuam a tradição. Mesmas receitas,
                mesmo carvão, mesma honestidade. Só o peixe muda — porque o
                mar assim o decide.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="text-center">
                <p className="text-3xl font-black text-[#C9B896]" style={{ fontFamily: "var(--font-merriweather)" }}>3</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Gerações</p>
              </div>
              <div className="w-px h-10 bg-[#C9B896]/30" />
              <div className="text-center">
                <p className="text-3xl font-black text-[#C9B896]" style={{ fontFamily: "var(--font-merriweather)" }}>30+</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Anos</p>
              </div>
              <div className="w-px h-10 bg-[#C9B896]/30" />
              <div className="text-center">
                <p className="text-3xl font-black text-[#C9B896]" style={{ fontFamily: "var(--font-merriweather)" }}>∞</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Amor</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Values side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + 0.15 * i }}
                  className="flex gap-5 group"
                >
                  <div className="shrink-0 w-12 h-12 rounded bg-[#C9B896]/10 border border-[#C9B896]/20 flex items-center justify-center group-hover:bg-[#C9B896]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#C9B896]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-white mb-1.5"
                      style={{ fontFamily: "var(--font-merriweather)" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
