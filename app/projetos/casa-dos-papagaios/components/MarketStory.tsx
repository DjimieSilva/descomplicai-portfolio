"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingBasket, Clock, Users, Heart } from "lucide-react";

const stats = [
  { icon: Clock, value: "6h00", label: "Chegamos ao mercado" },
  { icon: ShoppingBasket, value: "Diário", label: "Compra de ingredientes" },
  { icon: Users, value: "+500", label: "Refeições por semana" },
  { icon: Heart, value: "100%", label: "Paixão no prato" },
];

export default function MarketStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#FEF3C7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Market stall illustration */}
            <div className="relative bg-[#15803D] rounded-2xl p-8 shadow-2xl overflow-hidden">
              {/* Striped awning */}
              <div
                className="absolute top-0 left-0 right-0 h-8 rounded-t-2xl"
                style={{
                  background: "repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 20px, #FEF3C7 20px, #FEF3C7 40px)",
                }}
              />

              {/* Content inside stall */}
              <div className="mt-4 space-y-4">
                {/* Sign */}
                <div className="bg-[#78350F] text-[#FEF3C7] text-center py-3 px-4 rounded-lg">
                  <p className="font-black text-xl" style={{ fontFamily: "var(--font-public-sans)" }}>
                    CASA DOS PAPAGAIOS
                  </p>
                  <p className="text-xs opacity-75">Mercado Municipal · Figueira da Foz</p>
                </div>

                {/* Produce grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🍅", label: "Tomates" },
                    { emoji: "🐟", label: "Peixe Fresco" },
                    { emoji: "🌿", label: "Ervas" },
                    { emoji: "🧅", label: "Cebolas" },
                    { emoji: "🦐", label: "Camarão" },
                    { emoji: "🥦", label: "Legumes" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#FEF3C7] rounded-lg p-3 text-center"
                    >
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <p className="text-[#78350F] text-xs font-semibold">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tag */}
                <div className="flex items-center justify-center gap-2 bg-[#DC2626] text-white rounded-lg py-2 px-4">
                  <span className="text-sm font-bold">✓ Apanhado esta manhã</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-[#DC2626] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-xs font-bold text-center leading-tight">Premiado</span>
            </motion.div>
          </motion.div>

          {/* Right: Story text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-[#DC2626] font-bold uppercase tracking-widest text-sm mb-4">
              A Nossa História
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight mb-6"
              style={{ fontFamily: "var(--font-public-sans)" }}
            >
              Nascemos dentro
              <br />
              do mercado.
              <br />
              <span className="text-[#15803D]">É a nossa vantagem.</span>
            </h2>
            <div className="space-y-4 text-[#78350F]/80 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              <p>
                A Casa dos Papagaios não é apenas um restaurante — é parte integrante do
                Mercado Municipal da Figueira da Foz. Isso significa que os nossos ingredientes
                percorrem metros, não quilómetros, da banca para a cozinha.
              </p>
              <p>
                Todos os dias, ao amanhecer, a nossa equipa percorre as bancas do mercado
                para selecionar o melhor do melhor: peixe acabado de chegar, legumes da época,
                ervas aromáticas frescas. O menu muda com as estações e com o que o mar e a terra
                têm de melhor para oferecer.
              </p>
              <p className="font-semibold text-[#78350F]">
                Esta é a nossa promessa: a frescura máxima, todos os dias, no seu prato.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm"
                >
                  <div className="bg-[#DC2626]/10 p-2 rounded-lg">
                    <stat.icon size={20} className="text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="font-black text-[#78350F] text-lg leading-none" style={{ fontFamily: "var(--font-public-sans)" }}>
                      {stat.value}
                    </p>
                    <p className="text-[#78350F]/60 text-xs mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
