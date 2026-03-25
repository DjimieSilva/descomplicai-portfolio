"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, UtensilsCrossed, Users, Star } from "lucide-react";

const highlights = [
  { icon: UtensilsCrossed, label: "Cozinha Portuguesa Tradicional" },
  { icon: Clock, label: "Aberto Todos os Dias ao Almoço" },
  { icon: Users, label: "Capacidade para 200 Pessoas" },
  { icon: Star, label: "Produtos Locais da Região" },
];

export default function Restaurant() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="restaurante"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#3D2B1F" }}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
          >
            Almoço Diário
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
          >
            O Restaurante da Quinta
          </h2>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "#722F37" }} />
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Todos os dias, a cozinha da Quinta da Salmanha abre as suas portas para o almoço.
            Pratos confeccionados com receitas tradicionais portuguesas, ingredientes da época e
            o calor genuíno de quem cozinha com alma.
          </p>
        </motion.div>

        {/* Highlights bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 text-center rounded-sm"
              style={{
                background: "rgba(254,252,232,0.05)",
                border: "1px solid rgba(196,165,90,0.2)",
              }}
            >
              <h.icon size={22} style={{ color: "#C4A55A" }} />
              <p
                className="text-sm leading-snug"
                style={{ color: "rgba(254,252,232,0.85)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {h.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature blocks */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 rounded-sm relative overflow-hidden"
            style={{ background: "rgba(114,47,55,0.25)", border: "1px solid rgba(114,47,55,0.4)" }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ background: "#722F37" }}
            />
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
            >
              Almoço Tradicional
            </h3>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Cozido à Portuguesa, bacalhau em múltiplas preparações, leitão à Bairrada,
              ensopado de borrego — pratos que definem a identidade gastronómica desta região.
              Cozinhados lentamente, servidos com generosidade.
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
            >
              12h00 — 15h30 · Todos os dias
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="p-8 rounded-sm relative overflow-hidden"
            style={{ background: "rgba(85,107,47,0.2)", border: "1px solid rgba(85,107,47,0.35)" }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ background: "#556B2F" }}
            />
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
            >
              Vinhos da Região
            </h3>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A nossa carta de vinhos privilegia os produtores da Bairrada e da Beira Litoral.
              Tintos encorpados, brancos frescos e espumantes que complementam cada prato
              com a personalidade única do terroir local.
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
            >
              Selecção de Produtores Locais
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
