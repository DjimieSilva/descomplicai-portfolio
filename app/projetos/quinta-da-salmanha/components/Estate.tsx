"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sun, Wind } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "Jardins Centenários",
    text: "Pomares, hortas e jardins que alimentam a nossa cozinha com produtos frescos colhidos de manhã.",
  },
  {
    icon: Sun,
    title: "Muros de Pedra",
    text: "Arquitectura rural portuguesa preservada com amor, onde cada pedra conta séculos de história.",
  },
  {
    icon: Wind,
    title: "Brisa do Mondego",
    text: "Situada junto ao rio, a Quinta respira o aroma da terra e da água que marcam esta região.",
  },
];

export default function Estate() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="quinta"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#FEFCE8" }}
    >
      {/* Stone wall texture side accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2 md:w-3"
        style={{ background: "linear-gradient(180deg, #A8A29E, #722F37 50%, #556B2F)" }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p
              className="text-xs tracking-[0.45em] uppercase mb-4"
              style={{ color: "#556B2F", fontFamily: "var(--font-inter)" }}
            >
              A Nossa História
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
            >
              Uma Quinta com
              <br />
              <em style={{ color: "#722F37" }}>Alma Portuguesa</em>
            </h2>
            <div
              className="w-16 h-[2px] mb-8"
              style={{ background: "#C4A55A" }}
            />
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A Quinta da Salmanha ergue-se entre o verde das colinas e o brilho sereno do Mondego.
              Propriedade rural de charme preservado, foi ao longo de gerações um lugar de lavoura,
              festa e convívio — valores que continuam vivos na nossa cozinha e na hospitalidade
              que oferecemos a cada visita.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Hoje, convidamos famílias, casais e empresas a partilhar este espaço único,
              onde o tempo abranda e cada refeição se torna memória.
            </p>

            <motion.a
              href="#restaurante"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-flex items-center gap-2 mt-10 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:gap-4"
              style={{ color: "#722F37", fontFamily: "var(--font-inter)" }}
            >
              Descobrir o Restaurante
              <span>→</span>
            </motion.a>
          </motion.div>

          {/* Visual pillars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Large accent block */}
            <div
              className="rounded-sm p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #556B2F, #2D3A1E)" }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <p
                className="text-5xl font-bold mb-2 relative z-10"
                style={{ fontFamily: "var(--font-libre-caslon)", color: "#C4A55A" }}
              >
                1892
              </p>
              <p
                className="text-sm tracking-widest uppercase relative z-10"
                style={{ color: "rgba(254,252,232,0.8)", fontFamily: "var(--font-inter)" }}
              >
                Ano de fundação da Quinta
              </p>
            </div>

            {/* Pillars */}
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.15 }}
                className="flex gap-5 items-start p-5 rounded-sm"
                style={{ background: "rgba(168,162,158,0.12)", border: "1px solid rgba(168,162,158,0.25)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#722F37" }}
                >
                  <item.icon size={16} color="#FEFCE8" />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F", fontSize: "1.05rem" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
