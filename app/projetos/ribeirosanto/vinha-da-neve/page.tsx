"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Snowflake,
  Wine,
  Star,
  ThermometerSnowflake,
  Clock,
  Grape,
  Award,
  ChevronDown,
  UtensilsCrossed,
  Quote,
  Thermometer,
  GlassWater,
  Timer,
  Mountain,
  Droplets,
  Leaf,
  FlaskConical,
  Warehouse,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════
   SNOW PARTICLES — CSS-driven for performance
   ═══════════════════════════════════════════════════ */

function SnowParticles({ count = 60 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.45,
      drift: -30 + Math.random() * 60,
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      <style>{`
        @keyframes vdn-snow-fall {
          0% { transform: translateY(-10px) translateX(0px); opacity: 0; }
          10% { opacity: var(--snow-opacity); }
          90% { opacity: var(--snow-opacity); }
          100% { transform: translateY(calc(100vh + 10px)) translateX(var(--snow-drift)); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            ["--snow-opacity" as string]: p.opacity,
            ["--snow-drift" as string]: `${p.drift}px`,
            animation: `vdn-snow-fall ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL WRAPPER
   ═══════════════════════════════════════════════════ */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   ANIMATED BAR — fills on scroll
   ═══════════════════════════════════════════════════ */

function AnimatedBar({
  value,
  max = 10,
  color = "#C9A96E",
  delay = 0,
}: {
  value: number;
  max?: number;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const pct = (value / max) * 100;

  return (
    <div ref={ref} className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════════ */

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.floor(rating)
              ? "fill-[#C9A96E] text-[#C9A96E]"
              : i - 0.5 <= rating
              ? "fill-[#C9A96E]/50 text-[#C9A96E]"
              : "text-white/20"
          }
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */

export default function VinhaDaNevePage() {
  const [activeQuote, setActiveQuote] = useState(0);

  /* Auto-rotate quotes */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((q) => (q + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const quotes = [
    { text: "Blend of fruit and spice", stars: 4 },
    { text: "Full-bodied with blackberry, black plum, mulberry", stars: 5 },
    {
      text: "Vanilla, sweet baking spice... firm tannins, fresh acidity",
      stars: 4,
    },
    { text: "Needs a few more years", note: "potencial de guarda", stars: 4 },
  ];

  const tastingNotes = [
    {
      label: "Fruta Negra",
      value: 9,
      desc: "Amora, ameixa negra, amora silvestre",
    },
    {
      label: "Especiarias",
      value: 8,
      desc: "Baunilha, canela, tomilho, alecrim",
    },
    { label: "Madeira", value: 7, desc: "Carvalho francês, tabaco" },
    { label: "Terroir", value: 8, desc: "Mineral, pederneira" },
    { label: "Corpo", value: 9, desc: "Encorpado, taninos firmes" },
    { label: "Frescura", value: 8, desc: "Acidez fresca, final longo" },
  ];

  const vintages = [
    { year: 2011, rating: 4.3, reviews: 87 },
    { year: 2012, rating: 4.2, reviews: 151 },
    { year: 2020, rating: 4.1, reviews: 303 },
    { year: 2021, rating: 4.1, reviews: 117 },
  ];

  const vinification = [
    {
      icon: <Leaf size={28} />,
      title: "Vindima Manual",
      desc: "Seleção parcela a parcela, colheita nos momentos ideais de maturação",
    },
    {
      icon: <ThermometerSnowflake size={28} />,
      title: "Maceração a Frio",
      desc: "Maceração pré-fermentativa para extração aromática delicada",
    },
    {
      icon: <FlaskConical size={28} />,
      title: "Fermentação Controlada",
      desc: "Em cubas de inox com temperatura rigorosamente controlada",
    },
    {
      icon: <Warehouse size={28} />,
      title: "12 Meses em Carvalho",
      desc: "Estágio em barricas de carvalho francês 100% novas",
    },
    {
      icon: <Package size={28} />,
      title: "Estágio em Garrafa",
      desc: "Repouso adicional antes do lançamento para integração plena",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0608] via-[#120a10] to-[#0a0a0a]" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(120,30,50,0.15),transparent_70%)]" />

        <SnowParticles count={50} />

        <motion.div
          className="relative z-20 text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-[#C9A96E]/40" />
            <Snowflake size={16} className="text-[#C9A96E]/60" />
            <span className="h-px w-12 bg-[#C9A96E]/40" />
          </motion.div>

          <motion.h1
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Vinha
            </span>
            <span className="block text-[0.65em] tracking-[0.15em] text-white/40 font-light mt-1">
              da
            </span>
            <span className="block bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent italic">
              Neve
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-base sm:text-lg tracking-[0.25em] uppercase text-[#C9A96E]/70 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            A expressão mais elevada do Dão
          </motion.p>

          <motion.div
            className="mt-4 flex items-center justify-center gap-2 text-white/30 text-sm tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <Wine size={14} />
            <span>Ribeiro Santo</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-white/30">
            Descobrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — THE NAME (Story)
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-40 lg:py-52 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0c0e] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="h-px w-16 bg-[#C9A96E]/30" />
              <Mountain size={18} className="text-[#C9A96E]/50" />
              <span className="h-px w-16 bg-[#C9A96E]/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-white/90 leading-tight">
              Onde a Neve Toca a Vinha
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-12 font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-white/50 max-w-2xl mx-auto">
              A 600 metros de altitude, onde o inverno cobre as vinhas de
              branco, nasce um vinho de excepção.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-8 font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-white/50 max-w-2xl mx-auto">
              O frio extremo abranda a maturação, concentra os sabores e cria
              uma complexidade que só a paciência da natureza permite.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <p className="mt-8 font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/70 max-w-2xl mx-auto">
              <em>Vinha da Neve</em> não é apenas um nome
              <span className="text-[#C9A96E]">&nbsp;&mdash;&nbsp;</span>
              é uma promessa de terroir.
            </p>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-16 flex items-center justify-center gap-6 text-sm text-white/30 tracking-widest uppercase">
              <span>400–600m altitude</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A96E]/40" />
              <span>Região do Dão</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — THE WINES (Dual Showcase)
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Os Vinhos
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Duas expressões, uma alma
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
            {/* BRANCO */}
            <Reveal delay={0.1}>
              <div className="group relative bg-gradient-to-br from-[#F5F0E8] to-[#EDE5D8] p-8 sm:p-12 lg:p-16 text-[#2a2118] transition-all duration-700 hover:shadow-[inset_0_0_80px_rgba(201,169,110,0.1)] min-h-[500px] flex flex-col justify-between">
                {/* Gold accent line on right edge (desktop) */}
                <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent" />

                <div>
                  <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-4 py-1.5 rounded-full mb-8">
                    Branco
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl italic mb-6 text-[#2a2118]/90">
                    Vinha da Neve
                  </h3>

                  <div className="space-y-3 text-sm text-[#2a2118]/60">
                    <p className="flex items-center gap-2">
                      <Clock size={14} className="text-[#C9A96E]" />
                      12 meses em carvalho francês novo
                    </p>
                    <p className="flex items-center gap-2">
                      <Droplets size={14} className="text-[#C9A96E]" />
                      Carvalho, baunilha, tabaco, fruta vermelha
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Stars rating={4.1} />
                    <span className="text-lg font-medium text-[#2a2118]/80">
                      4.1/5
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-[#C9A96E] font-medium">
                      <Award size={12} /> Top 3% Mundial
                    </span>
                    <span className="text-[#2a2118]/40">
                      117 avaliações Vivino
                    </span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#2a2118]/10">
                    <span className="font-serif text-3xl text-[#2a2118]/80">
                      €30
                    </span>
                    <span className="text-sm text-[#2a2118]/50">.42</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* TINTO */}
            <Reveal delay={0.25}>
              <div className="group relative bg-gradient-to-br from-[#1a0f14] to-[#120a0e] p-8 sm:p-12 lg:p-16 text-white transition-all duration-700 hover:shadow-[inset_0_0_80px_rgba(120,30,50,0.15)] min-h-[500px] flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E]/30 px-4 py-1.5 rounded-full mb-8">
                    Tinto
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl italic mb-6 text-white/90">
                    Vinha da Neve
                  </h3>

                  <div className="space-y-3 text-sm text-white/50">
                    <p className="flex items-center gap-2">
                      <Grape size={14} className="text-[#C9A96E]" />
                      Touriga Nacional, Tinto Cão, Alfrocheiro
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={14} className="text-[#C9A96E]" />
                      12 meses em carvalho francês novo
                    </p>
                    <p className="flex items-center gap-2">
                      <Wine size={14} className="text-[#C9A96E]" />
                      Encorpado &middot; Taninos firmes &middot; Final longo
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Stars rating={4.1} />
                    <span className="text-lg font-medium text-white/80">
                      4.1/5
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-[#C9A96E] font-medium">
                      <Award size={12} /> Top 3% Mundial
                    </span>
                    <span className="text-white/30">
                      117 avaliações Vivino
                    </span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <span className="font-serif text-3xl text-white/80">
                      €30
                    </span>
                    <span className="text-sm text-white/50">.42</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — TASTING NOTES
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0e0a0c] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Notas de Prova
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Tinto &middot; Perfil sensorial
              </p>
            </div>
          </Reveal>

          <div className="space-y-8">
            {tastingNotes.map((note, i) => (
              <Reveal key={note.label} delay={i * 0.08}>
                <div className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-base sm:text-lg font-medium text-white/80">
                        {note.label}
                      </span>
                      <span className="ml-3 text-sm text-white/30">
                        {note.desc}
                      </span>
                    </div>
                    <span className="text-[#C9A96E] font-serif text-lg font-medium">
                      {note.value}
                      <span className="text-white/20 text-sm">/10</span>
                    </span>
                  </div>
                  <AnimatedBar
                    value={note.value}
                    delay={i * 0.1}
                    color={
                      i % 2 === 0
                        ? "#C9A96E"
                        : "linear-gradient(90deg, #C9A96E, #8B6F47)"
                    }
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div className="mt-16 grid grid-cols-3 gap-8 text-center pt-12 border-t border-white/5">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#C9A96E]">
                  Encorpado
                </p>
                <p className="text-xs text-white/30 mt-2 uppercase tracking-widest">
                  Corpo
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#C9A96E]">
                  Firmes
                </p>
                <p className="text-xs text-white/30 mt-2 uppercase tracking-widest">
                  Taninos
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#C9A96E]">
                  Longo
                </p>
                <p className="text-xs text-white/30 mt-2 uppercase tracking-widest">
                  Final
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — VINTAGE EVOLUTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Evolução por Colheita
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Consistência ao longo de uma década
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {vintages.map((v, i) => (
              <Reveal key={v.year} delay={i * 0.1}>
                <div className="relative group bg-white/[0.03] rounded-2xl p-6 sm:p-8 text-center border border-white/5 hover:border-[#C9A96E]/20 transition-all duration-500 hover:bg-white/[0.05]">
                  <p className="text-white/30 text-sm tracking-widest mb-4">
                    {v.year}
                  </p>

                  {/* Rating circle */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="4"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="#C9A96E"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        initial={{
                          strokeDashoffset: 2 * Math.PI * 34,
                        }}
                        whileInView={{
                          strokeDashoffset:
                            2 * Math.PI * 34 * (1 - v.rating / 5),
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3 + i * 0.15,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-xl text-white/80">
                      {v.rating}
                    </span>
                  </div>

                  <Stars rating={v.rating} size={12} />
                  <p className="mt-3 text-xs text-white/25">
                    {v.reviews} avaliações
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <p className="mt-12 text-center text-white/40 font-serif text-lg italic">
              Consistentemente acima de 4.0 ao longo de uma década
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — VINIFICATION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0c0a08] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Vinificação
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Da vinha à garrafa
              </p>
            </div>
          </Reveal>

          <div className="space-y-0">
            {vinification.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="group relative flex items-start gap-6 sm:gap-10 py-8 sm:py-10 border-b border-white/5 last:border-b-0">
                  {/* Step number & line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:border-[#C9A96E]/50 group-hover:bg-[#C9A96E]/5 transition-all duration-500">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#C9A96E]/40 text-xs tracking-widest font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-xl font-medium text-white/80">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — WHAT THEY SAY
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                O Que Dizem
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Avaliações Vivino
              </p>
            </div>
          </Reveal>

          <div className="relative min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <Quote
                  size={40}
                  className="mx-auto mb-8 text-[#C9A96E]/30"
                />
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-white/70 leading-snug max-w-xl mx-auto">
                  &ldquo;{quotes[activeQuote].text}&rdquo;
                </blockquote>
                {quotes[activeQuote].note && (
                  <p className="mt-4 text-[#C9A96E]/60 text-sm tracking-widest uppercase">
                    {quotes[activeQuote].note}
                  </p>
                )}
                <div className="mt-8 flex justify-center">
                  <Stars rating={quotes[activeQuote].stars} size={18} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeQuote
                    ? "bg-[#C9A96E] w-6"
                    : "bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Ver avaliação ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — FOOD PAIRING
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0d0b08] to-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Harmonizações
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Sugestões gastronómicas
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Branco pairings */}
            <Reveal delay={0.1}>
              <div className="bg-gradient-to-br from-[#F5F0E8]/[0.04] to-transparent rounded-2xl p-8 sm:p-10 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Wine size={20} className="text-[#C9A96E]/70" />
                  <h3 className="font-serif text-xl italic text-white/80">
                    Branco
                  </h3>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      dish: "Bacalhau Assado",
                      desc: "Com batata a murro e azeite da casa",
                    },
                    {
                      dish: "Leitão da Bairrada",
                      desc: "Pele estaladiça, suculência e tradição",
                    },
                    {
                      dish: "Queijos Curados",
                      desc: "Queijos de vaca e ovelha da região",
                    },
                    {
                      dish: "Risotto de Cogumelos",
                      desc: "Cogumelos silvestres e parmesão",
                    },
                  ].map((item, i) => (
                    <div key={i} className="group/item">
                      <p className="text-white/70 font-medium text-base">
                        {item.dish}
                      </p>
                      <p className="text-white/30 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tinto pairings */}
            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-[#2a0f18]/30 to-transparent rounded-2xl p-8 sm:p-10 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Wine size={20} className="text-[#C9A96E]/70" />
                  <h3 className="font-serif text-xl italic text-white/80">
                    Tinto
                  </h3>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      dish: "Cabrito Assado no Forno",
                      desc: "Receita tradicional da Beira Alta",
                    },
                    {
                      dish: "Javali Estufado",
                      desc: "Carnes de caça com ervas aromáticas",
                    },
                    {
                      dish: "Queijo da Serra da Estrela",
                      desc: "DOP curado, amanteigado, intenso",
                    },
                    {
                      dish: "Chocolate Negro",
                      desc: "70% cacau, complementa os taninos",
                    },
                  ].map((item, i) => (
                    <div key={i} className="group/item">
                      <p className="text-white/70 font-medium text-base">
                        {item.dish}
                      </p>
                      <p className="text-white/30 text-sm mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — SERVE & STORE
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white/90 italic">
                Como Servir
              </h2>
              <p className="mt-4 text-white/40 tracking-widest uppercase text-sm">
                Para a experiência ideal
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Thermometer size={24} />,
                title: "Temperatura",
                branco: "10–12°C",
                tinto: "16–18°C",
              },
              {
                icon: <GlassWater size={24} />,
                title: "Decanter",
                branco: "Opcional",
                tinto: "30 min recomendado",
              },
              {
                icon: <Timer size={24} />,
                title: "Guarda",
                branco: "Até 8 anos",
                tinto: "Até 10 anos",
              },
              {
                icon: <Wine size={24} />,
                title: "Copo",
                branco: "Borgonha",
                tinto: "Bordalês amplo",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="bg-white/[0.02] rounded-2xl p-6 sm:p-8 text-center border border-white/5 hover:border-[#C9A96E]/15 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] mx-auto mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-white/70 font-medium text-sm uppercase tracking-widest mb-4">
                    {item.title}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-white/25 uppercase tracking-wider">
                        Branco
                      </span>
                      <p className="text-white/60 text-sm mt-0.5">
                        {item.branco}
                      </p>
                    </div>
                    <div className="w-6 h-px bg-white/5 mx-auto" />
                    <div>
                      <span className="text-xs text-white/25 uppercase tracking-wider">
                        Tinto
                      </span>
                      <p className="text-white/60 text-sm mt-0.5">
                        {item.tinto}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <p className="mt-10 text-center text-white/25 text-sm">
              Conservar em cave a 12–16°C, ao abrigo da luz e vibrações
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — CTA
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-40 lg:py-52 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0810] to-[#0a0608]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(120,30,50,0.12),transparent_70%)]" />

        <SnowParticles count={35} />

        <div className="relative z-20 max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="h-px w-12 bg-[#C9A96E]/30" />
              <Snowflake size={16} className="text-[#C9A96E]/50" />
              <span className="h-px w-12 bg-[#C9A96E]/30" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-white/90 leading-tight">
              Prove a Vinha da Neve
            </h2>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <span className="font-serif text-5xl sm:text-6xl text-[#C9A96E]">
                €30
              </span>
              <span className="text-xl text-[#C9A96E]/60">.42</span>
              <span className="block text-white/30 text-sm mt-2 tracking-widest uppercase">
                por garrafa
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-8 text-white/40 text-base leading-relaxed max-w-md mx-auto">
              Disponível na nossa loja da Quinta e em garrafeiras selecionadas
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/projetos/ribeirosanto/enoturismo"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] text-[#0a0a0a] font-medium text-sm uppercase tracking-widest rounded-full hover:bg-[#d4b878] transition-all duration-300"
              >
                <Mountain size={16} />
                Visitar a Quinta
              </Link>
              <Link
                href="/projetos/ribeirosanto/contacto"
                className="group inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/70 font-medium text-sm uppercase tracking-widest rounded-full hover:border-[#C9A96E]/40 hover:text-white/90 transition-all duration-300"
              >
                Contactar
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <p className="mt-16 text-white/15 text-xs tracking-widest uppercase">
              Ribeiro Santo &middot; Vinhos do Dão desde 1940
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
