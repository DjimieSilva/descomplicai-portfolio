"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, Car, Heart, Calendar } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  useFadeIn — IntersectionObserver-based fade-in                     */
/* ------------------------------------------------------------------ */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ------------------------------------------------------------------ */
/*  Feature cards data                                                 */
/* ------------------------------------------------------------------ */
const features = [
  {
    emoji: "🏠",
    icon: Home,
    title: "Feito em Casa",
    description:
      "Cada receita é preparada com ingredientes frescos e o carinho de sempre",
  },
  {
    emoji: "🚗",
    icon: Car,
    title: "Entrega ao Domicílio",
    description:
      "Levaremos até si, de segunda a sexta, no conforto da sua casa",
  },
  {
    emoji: "❤️",
    icon: Heart,
    title: "Feito com Amor",
    description:
      "Tradição familiar que se prova em cada pedaço",
  },
];

/* ------------------------------------------------------------------ */
/*  FeatureCard                                                        */
/* ------------------------------------------------------------------ */
function FeatureCard({
  emoji,
  title,
  description,
  index,
  isVisible,
}: {
  emoji: string;
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: "easeOut" }}
      className="group flex flex-col items-center text-center rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default"
      style={{
        backgroundColor: "#F0E0CC",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Emoji */}
      <span className="text-4xl mb-4 block transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </span>

      {/* Title */}
      <h3
        className="font-serif text-xl font-bold mb-3"
        style={{ color: "#1B5E5E" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed max-w-xs"
        style={{ color: "#2D2D2D" }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SobreSection                                                       */
/* ------------------------------------------------------------------ */
export function SobreSection() {
  const { ref: sectionRef, isVisible } = useFadeIn(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useFadeIn(0.1);
  const { ref: hoursRef, isVisible: hoursVisible } = useFadeIn(0.2);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #FFF8F0 0%, #F0E0CC 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* ---- Section title ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-16"
        >
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "#1B5E5E" }}
          >
            A Nossa História
          </h2>

          {/* Decorative divider: line + star + line */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 md:w-20 h-px"
              style={{ backgroundColor: "#C9A050" }}
            />
            <span className="text-lg" style={{ color: "#C9A050" }}>
              ⭐
            </span>
            <div
              className="w-12 md:w-20 h-px"
              style={{ backgroundColor: "#C9A050" }}
            />
          </div>

          {/* Heartfelt text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed text-center max-w-2xl"
            style={{ color: "#2D2D2D" }}
          >
            No coração de Olhão, entre o aroma do pão quente e a doçura dos bolos
            tradicionais, nasceu o{" "}
            <strong style={{ color: "#1B5E5E" }}>Sabor Abençoado</strong>. Cada
            receita é uma herança de família, preparada com ingredientes frescos e
            todo o amor que uma cozinha caseira pode oferecer. Acreditamos que o
            melhor sabor é aquele que nos faz sentir em casa.
          </motion.p>
        </motion.div>

        {/* ---- Feature cards ---- */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14"
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>

        {/* ---- Business hours card ---- */}
        <div ref={hoursRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hoursVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl px-8 py-6 mx-auto max-w-md"
            style={{
              backgroundColor: "rgba(27, 94, 94, 0.06)",
              border: "1px solid rgba(27, 94, 94, 0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              <Calendar
                size={22}
                style={{ color: "#C9A050" }}
              />
              <span className="text-2xl">🗓</span>
            </div>
            <div className="text-center sm:text-left">
              <p
                className="font-serif text-lg font-bold"
                style={{ color: "#1B5E5E" }}
              >
                Segunda a Sexta
              </p>
              <p className="text-sm" style={{ color: "#2D2D2D" }}>
                Encomendas e entregas ao domicílio
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
