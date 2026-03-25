"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Leaf, Clock, Users } from "lucide-react";

const values = [
  {
    icon: Flame,
    title: "Lume Brando",
    desc: "Não há pressa na nossa cozinha. O cozido leva o tempo que leva. O tempero faz-se devagar. A pressa é inimiga do sabor.",
  },
  {
    icon: Leaf,
    title: "Produtos Frescos",
    desc: "Verduras da época, carnes de criadores regionais, bacalhau do Porto. Ingredientes com história e com sabor.",
  },
  {
    icon: Clock,
    title: "Receitas de Sempre",
    desc: "Não inventamos — preservamos. As receitas que usamos hoje são as mesmas de há gerações. Algumas nunca foram escritas.",
  },
  {
    icon: Users,
    title: "Para Toda a Família",
    desc: "Uma mesa de família cabe sempre mais um. Os nossos espaços foram feitos para reunir, celebrar e partilhar.",
  },
];

export default function HomeCooking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#7C2D12" }}
    >
      {/* Background azulejo pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="azulejo-dark"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect x="1" y="1" width="58" height="58" fill="none" stroke="#FFFBEB" strokeWidth="1.5" />
              <rect x="6" y="6" width="48" height="48" fill="none" stroke="#FFFBEB" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="12" fill="none" stroke="#FFFBEB" strokeWidth="1" />
              <path d="M30 16 L30 44 M16 30 L44 30" stroke="#FFFBEB" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="3" fill="#FFFBEB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#azulejo-dark)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.45em] uppercase mb-5"
              style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
            >
              A Nossa Filosofia
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
            >
              Comida da Avó.
              <br />
              <em>Feita com amor.</em>
            </h2>

            <div className="space-y-4 mb-8">
              {[
                "Acreditamos que a melhor cozinha é a que não precisa de truques — só de bons ingredientes, tempo e dedicação.",
                "Cada prato que servimos representa uma escolha consciente de preservar o que de melhor existe na gastronomia portuguesa.",
                "Não somos um restaurante de autor. Somos uma tasca com orgulho — onde a comida sabe a casa e o ambiente cheira a família.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(255,251,235,0.8)", fontFamily: "var(--font-inter)" }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="border-l-4 pl-5 py-2"
              style={{ borderColor: "#FDE68A" }}
            >
              <p
                className="text-lg italic"
                style={{ fontFamily: "var(--font-source-serif-4)", color: "#FDE68A" }}
              >
                &ldquo;A cozinha portuguesa é simples porque a vida simples é bonita.&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>

          {/* Right: values grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, i) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-40px" });
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  ref={cardRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="p-5"
                  style={{
                    background: "rgba(255,251,235,0.07)",
                    border: "1px solid rgba(255,251,235,0.12)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-3"
                    style={{ background: "rgba(253,230,138,0.15)" }}
                  >
                    <Icon size={20} style={{ color: "#FDE68A" }} />
                  </div>
                  <h4
                    className="text-sm font-bold mb-2"
                    style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
                  >
                    {value.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                  >
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
