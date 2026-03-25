"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Flame, Leaf, Fish } from "lucide-react";

const weeklySpecials = [
  {
    day: "Segunda",
    shortDay: "Seg",
    special: "Caldeirada de Peixe",
    description: "Peixe fresco do dia com legumes da época em caldo aromático",
    emoji: "🍲",
    type: "Peixe",
    price: "12,50€",
    icon: Fish,
    available: false,
  },
  {
    day: "Terça",
    shortDay: "Ter",
    special: "Polvo à Lagareiro",
    description: "Polvo macio com batatinhas assadas e azeite virgem extra",
    emoji: "🐙",
    type: "Mar",
    price: "14,00€",
    icon: Fish,
    available: false,
  },
  {
    day: "Quarta",
    shortDay: "Qua",
    special: "Bacalhau com Broa",
    description: "Bacalhau do porto com broa crocante, grelos e cebola caramelizada",
    emoji: "🐟",
    type: "Tradicional",
    price: "13,50€",
    icon: Fish,
    available: false,
  },
  {
    day: "Quinta",
    shortDay: "Qui",
    special: "Arroz de Lingueirão",
    description: "Arroz malandrinho com lingueirões apanhados nesta manhã",
    emoji: "🦪",
    type: "Mar",
    price: "13,00€",
    icon: Fish,
    available: true,
  },
  {
    day: "Sexta",
    shortDay: "Sex",
    special: "Cherne Grelhado",
    description: "Cherne do Atlântico com salada de tomate e pimentos assados",
    emoji: "🐠",
    type: "Peixe",
    price: "15,50€",
    icon: Flame,
    available: true,
  },
  {
    day: "Sábado",
    shortDay: "Sáb",
    special: "Amêijoas à Bulhão Pato",
    description: "Amêijoas frescas com alho, coentros e vinho branco da região",
    emoji: "🦪",
    type: "Especial",
    price: "14,50€",
    icon: Leaf,
    available: true,
  },
  {
    day: "Domingo",
    shortDay: "Dom",
    special: "Roupa Velha de Bacalhau",
    description: "O clássico reconfortante da cozinha portuguesa, feito com carinho",
    emoji: "🫕",
    type: "Tradicional",
    price: "12,00€",
    icon: Flame,
    available: true,
  },
];

export default function DailySpecials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="especiais-do-dia"
      ref={ref}
      className="py-20 md:py-32 bg-[#FEF3C7]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Calendar size={14} />
            Esta Semana no Mercado
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Especiais do Dia
          </h2>
          <p className="text-[#78350F]/70 text-lg max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            O nosso menu muda todas as semanas conforme o que está mais fresco
            no mercado. Uma surpresa deliciosa a cada visita.
          </p>
        </motion.div>

        {/* Today's special — prominent card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#78350F] rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 text-[200px] opacity-5 leading-none select-none pointer-events-none">
            🐟
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  🔥 Hoje — Quinta-feira
                </span>
                <span className="text-[#FEF3C7]/60 text-sm">Disponível agora</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-6xl">🦪</span>
                <div>
                  <h3
                    className="text-3xl md:text-4xl font-black text-[#FEF3C7]"
                    style={{ fontFamily: "var(--font-public-sans)" }}
                  >
                    Arroz de Lingueirão
                  </h3>
                  <p className="text-[#FEF3C7]/70 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Arroz malandrinho com lingueirões apanhados nesta manhã
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="bg-[#15803D] text-white px-3 py-1 rounded-full text-sm font-bold">
                  ✓ Ingredientes de hoje
                </span>
                <span className="text-[#FEF3C7]/60 text-sm">Serve 1 pessoa</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[#FEF3C7]/50 text-sm mb-1">Preço do dia</p>
              <p
                className="text-5xl font-black text-[#FEF3C7]"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                13,00€
              </p>
              <p className="text-[#FEF3C7]/50 text-xs mt-1">inclui sopa ou sobremesa</p>
            </div>
          </div>
        </motion.div>

        {/* Weekly schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {weeklySpecials.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className={`rounded-xl p-4 border-2 transition-all duration-200 ${
                item.day === "Quinta"
                  ? "border-[#DC2626] bg-[#DC2626]/10 shadow-md"
                  : item.available
                  ? "border-[#15803D]/30 bg-white hover:border-[#15803D] hover:shadow-sm"
                  : "border-[#78350F]/10 bg-white/50 opacity-60"
              }`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-wide mb-2 ${
                  item.day === "Quinta" ? "text-[#DC2626]" : "text-[#78350F]/50"
                }`}
              >
                {item.shortDay}
                {item.day === "Quinta" && " 🔥"}
              </p>
              <div className="text-2xl mb-2">{item.emoji}</div>
              <h4
                className="text-sm font-black text-[#78350F] leading-tight mb-1"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                {item.special}
              </h4>
              <p className="text-[#78350F]/60 text-xs leading-relaxed mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                {item.description}
              </p>
              <p className="text-[#DC2626] font-bold text-sm">{item.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-[#78350F]/50 text-sm mt-8"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          * O menu pode variar conforme a disponibilidade dos produtos no mercado nesse dia.
          Ligamos sempre se algo não estiver disponível.
        </motion.p>
      </div>
    </section>
  );
}
