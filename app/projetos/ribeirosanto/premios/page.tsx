"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Star,
  Trophy,
  Medal,
  Quote,
  TrendingUp,
  Globe,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const CRITIC_SCORES = [
  { publication: "Wine Enthusiast", score: 91, max: 100, color: "#C4A882" },
  { publication: "Robert Parker", score: 89, max: 100, color: "#B8976A" },
  { publication: "Revista de Vinhos", score: 17, max: 20, color: "#D4B896" },
  { publication: "Wine Spectator", score: 89, max: 100, color: "#C4A882" },
  { publication: "Grandes Escolhas", score: 18.5, max: 20, color: "#E0C9A6" },
];

const TIMELINE_EVENTS = [
  {
    year: "2000",
    title: "Primeiro vinho engarrafado",
    description: "Primeiro vinho engarrafado sob a marca Ribeiro Santo, marcando o inicio de uma jornada de excelencia.",
    side: "left" as const,
  },
  {
    year: "2011",
    title: "Fundacao da Magnum",
    description: "Nasce a Magnum - Carlos Lucas Vinhos, com adega propria no Dao. Uma nova era para a marca.",
    side: "right" as const,
  },
  {
    year: "2013",
    title: "Berliner Wine Trophy Gold",
    description: "Encruzado conquista a medalha de Ouro na Berliner Wine Trophy, reconhecimento internacional.",
    side: "left" as const,
  },
  {
    year: "2014",
    title: "Agricultor do Ano",
    description: "Carlos Lucas distinguido pelo Ministerio da Agricultura. Robert Parker 89pts (E.T.). Grandes Escolhas elege E.T. entre os 'Best 30 Wines of Portugal'.",
    side: "right" as const,
    highlight: true,
  },
  {
    year: "2015-2020",
    title: "Consolidacao internacional",
    description: "Distribuicao no UK atraves da The Wine Society. Medalhas consecutivas em concursos internacionais. Crescimento sustentado.",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "Excelencia continuada",
    description: "Encruzado mantem Wine Enthusiast 91pts. Vivino Top 2% global. Malvasia Fina conquista Prata no IWC e Mundus Vini.",
    side: "right" as const,
  },
  {
    year: "2025",
    title: "Discovery of 2025",
    description: "Reconhecido como 'Discovery of 2025' na comunidade Vivino. Novos vintages continuam a tradicao de excelencia.",
    side: "left" as const,
  },
];

const VIVINO_WINES = [
  {
    name: "Vinha da Neve",
    type: "Branco & Tinto",
    score: 4.1,
    topPercent: 3,
    region: "Dao",
    ratings: "1,200+",
    quote: "Full-bodied, dry, med-acidic... approved sensorially",
  },
  {
    name: "Encruzado",
    type: "Branco",
    score: 3.9,
    topPercent: 2,
    region: "Dao",
    ratings: "5,800+",
    quote: "Wow. So unique... tropical fruits with high acid... amazing",
  },
  {
    name: "Tinto",
    type: "Tinto",
    score: 3.8,
    topPercent: 8,
    region: "Dao",
    ratings: "800+",
    quote: "Excellent everyday party glugger, super value",
  },
  {
    name: "Malvasia Fina & Encruzado",
    type: "Branco",
    score: 3.7,
    topPercent: 10,
    region: "Dao",
    ratings: "1,274",
    quote: "Discovery of 2025",
  },
];

const MEDALS = [
  { competition: "Berliner Wine Trophy", year: "2013", medal: "Ouro", wine: "Encruzado", type: "gold" as const },
  { competition: "International Wine Challenge", year: "2024", medal: "Prata", wine: "Malvasia Fina & Encruzado", type: "silver" as const },
  { competition: "Mundus Vini", year: "2024", medal: "Prata", wine: "Malvasia Fina & Encruzado", type: "silver" as const },
  { competition: "Wine Spectator", year: "2024", medal: "89 pts", wine: "Malvasia Fina & Encruzado", type: "gold" as const },
];

const PRESS_QUOTES = [
  {
    quote: "Wow. So unique... tropical fruits with high acid... amazing",
    source: "Vivino Community",
    wine: "Encruzado",
  },
  {
    quote: "Discovery of 2025",
    source: "Vivino Trending",
    wine: "Ribeiro Santo",
  },
  {
    quote: "Excellent everyday party glugger, super value",
    source: "Vivino Reviewer",
    wine: "Tinto",
  },
  {
    quote: "Best 30 Wines of Portugal",
    source: "Grandes Escolhas",
    wine: "Encruzado E.T. 2014",
  },
  {
    quote: "Os Melhores de Portugal",
    source: "Revista de Vinhos",
    wine: "Encruzado E.T.",
  },
];

const FINAL_STATS = [
  { value: 8000, suffix: "+", label: "Avaliacoes Vivino" },
  { value: 91, suffix: " pts", label: "Wine Enthusiast (max)" },
  { value: 18.5, suffix: " pts", label: "Grandes Escolhas (max)", isDecimal: true },
  { value: 2, suffix: "%", label: "Top Mundial", prefix: "Top " },
];

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ═══════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════ */

function useIntersection(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCounter(target: number, inView: boolean, duration = 2000, isDecimal = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (isDecimal) {
        setCount(Math.round(eased * target * 10) / 10);
      } else {
        setCount(Math.round(eased * target));
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, isDecimal]);

  return count;
}

/* ═══════════════════════════════════════════════
   SCORE RING COMPONENT
   ═══════════════════════════════════════════════ */

function ScoreRing({
  score,
  max,
  publication,
  color,
  index,
}: {
  score: number;
  max: number;
  publication: string;
  color: string;
  index: number;
}) {
  const { ref, inView } = useIntersection(0.3);
  const percentage = (score / max) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-32 h-32 md:w-36 md:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          {/* Score ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? strokeDashoffset : circumference}
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionDelay: `${index * 0.15}s`,
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl md:text-3xl font-serif font-light"
            style={{ color, fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {score}
          </span>
          <span className="text-[10px] text-neutral-500">/ {max}</span>
        </div>
      </div>
      <p className="text-sm text-neutral-300 text-center font-medium tracking-wide">
        {publication}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   VIVINO STAR RATING
   ═══════════════════════════════════════════════ */

function VividStars({ score }: { score: number }) {
  const full = Math.floor(score);
  const partial = score - full;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && partial >= 0.5
              ? "fill-amber-400/50 text-amber-400"
              : "text-neutral-600"
          }
        />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════════════ */

function FinalStatCard({
  stat,
  inView,
  index,
}: {
  stat: (typeof FINAL_STATS)[number];
  inView: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, inView, 2000, stat.isDecimal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="text-center space-y-2"
    >
      <p
        className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#C4A882]"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {stat.prefix ?? ""}
        {stat.isDecimal ? count.toFixed(1) : count}
        {stat.suffix}
      </p>
      <p className="text-neutral-500 text-sm tracking-wide">{stat.label}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function PremiosPage() {
  const heroSection = useIntersection(0.3);
  const heroCount = useCounter(15, heroSection.inView, 2000);
  const finalStatsSection = useIntersection(0.3);

  return (
    <div className="bg-[#1C1210] text-white overflow-x-hidden">

      {/* ══════════════════════════════════════════
          1. HERO — Grand opening
          ══════════════════════════════════════════ */}
      <section
        ref={heroSection.ref}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#1C1210]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,168,130,0.12) 0%, rgba(28,18,16,0) 70%)",
          }}
        />

        {/* Decorative trophy/medal SVG shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left trophy */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-[15%] left-[5%] w-32 h-32 md:w-48 md:h-48"
            viewBox="0 0 100 120"
            fill="none"
          >
            <path d="M30 10 H70 V40 Q70 70 50 80 Q30 70 30 40 Z" fill="#C4A882" />
            <rect x="45" y="80" width="10" height="20" fill="#C4A882" />
            <rect x="35" y="100" width="30" height="6" rx="3" fill="#C4A882" />
            <path d="M30 20 Q10 20 10 40 Q10 55 30 50" fill="#C4A882" />
            <path d="M70 20 Q90 20 90 40 Q90 55 70 50" fill="#C4A882" />
          </motion.svg>

          {/* Right medal */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute top-[20%] right-[8%] w-28 h-28 md:w-40 md:h-40"
            viewBox="0 0 100 130"
            fill="none"
          >
            <polygon points="35,0 45,0 60,40 50,40" fill="#C4A882" />
            <polygon points="55,0 65,0 60,40 50,40" fill="#B8976A" />
            <circle cx="50" cy="70" r="30" fill="none" stroke="#C4A882" strokeWidth="3" />
            <circle cx="50" cy="70" r="24" fill="none" stroke="#C4A882" strokeWidth="1" />
            <text x="50" y="76" textAnchor="middle" fill="#C4A882" fontSize="16" fontFamily="Georgia">&#9733;</text>
          </motion.svg>

          {/* Bottom left star */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="absolute bottom-[20%] left-[12%] w-20 h-20 md:w-28 md:h-28"
            viewBox="0 0 100 100"
            fill="none"
          >
            <polygon
              points="50,5 63,35 95,40 72,62 78,95 50,78 22,95 28,62 5,40 37,35"
              fill="#C4A882"
            />
          </motion.svg>
        </div>

        {/* Hero content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-[#C4A882]/80 tracking-[0.35em] uppercase text-xs md:text-sm font-light"
          >
            Ribeiro Santo · Dao · Portugal
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Premios &{" "}
            <span className="text-[#C4A882]">Reconhecimento</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg md:text-xl text-neutral-400 font-light max-w-xl mx-auto"
          >
            O Dao no palco mundial
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C4A882]" />
            <Trophy size={18} className="text-[#C4A882]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C4A882]" />
          </motion.div>

          {/* Animated counter */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="pt-4"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-[#C4A882]/20 rounded-full px-8 py-3">
              <Award size={20} className="text-[#C4A882]" />
              <span
                className="text-2xl md:text-3xl font-serif font-light text-[#C4A882]"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                {heroCount}+
              </span>
              <span className="text-sm text-neutral-400">premios internacionais</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURED AWARD — Agricultor do Ano
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6 overflow-hidden">
        {/* Gold gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #2A1F14 0%, #3D2E1A 30%, #2A1F14 60%, #1C1210 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Trophy SVG */}
            <motion.div variants={fadeInUp} custom={0} className="flex justify-center">
              <div className="relative">
                <svg
                  viewBox="0 0 160 200"
                  className="w-32 h-40 md:w-44 md:h-52 mx-auto drop-shadow-2xl"
                  fill="none"
                >
                  {/* Glow */}
                  <defs>
                    <radialGradient id="trophyGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C4A882" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C4A882" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E0C9A6" />
                      <stop offset="50%" stopColor="#C4A882" />
                      <stop offset="100%" stopColor="#B8976A" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="100" r="70" fill="url(#trophyGlow)" />
                  {/* Cup */}
                  <path
                    d="M50 30 H110 V70 Q110 110 80 125 Q50 110 50 70 Z"
                    fill="url(#trophyGold)"
                    opacity="0.9"
                  />
                  {/* Handles */}
                  <path
                    d="M50 40 Q25 40 25 65 Q25 85 50 80"
                    fill="none"
                    stroke="url(#trophyGold)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M110 40 Q135 40 135 65 Q135 85 110 80"
                    fill="none"
                    stroke="url(#trophyGold)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Stem */}
                  <rect x="73" y="125" width="14" height="30" rx="2" fill="url(#trophyGold)" opacity="0.85" />
                  {/* Base */}
                  <rect x="55" y="155" width="50" height="10" rx="5" fill="url(#trophyGold)" opacity="0.8" />
                  {/* Star on cup */}
                  <polygon
                    points="80,50 86,66 103,66 89,76 94,92 80,82 66,92 71,76 57,66 74,66"
                    fill="#1C1210"
                    opacity="0.3"
                  />
                </svg>
                {/* Sparkle animations */}
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#C4A882]"
                />
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  className="absolute top-8 left-0 w-2 h-2 rounded-full bg-[#E0C9A6]"
                />
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                  className="absolute bottom-12 right-0 w-2 h-2 rounded-full bg-[#C4A882]"
                />
              </div>
            </motion.div>

            {/* Label */}
            <motion.div variants={fadeInUp} custom={1}>
              <span className="inline-block text-xs tracking-[0.4em] uppercase text-[#C4A882]/70 mb-2">
                Distincao Maxima
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeInUp}
              custom={2}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              <span className="text-[#C4A882]">Agricultor do Ano</span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl text-white/90">2014</span>
            </motion.h2>

            {/* Source */}
            <motion.p
              variants={fadeInUp}
              custom={3}
              className="text-lg md:text-xl text-[#C4A882]/80 tracking-wide"
            >
              Ministerio da Agricultura de Portugal
            </motion.p>

            {/* Divider */}
            <motion.div variants={fadeInUp} custom={4} className="flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4A882]/40" />
              <Award size={16} className="text-[#C4A882]/50" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4A882]/40" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              custom={5}
              className="text-neutral-400 leading-relaxed max-w-2xl mx-auto text-base md:text-lg"
            >
              A mais alta distincao agricola portuguesa, reconhecendo a excelencia na
              viticultura, a inovacao na producao vinicola e o contributo para o
              desenvolvimento da regiao do Dao.
            </motion.p>

            {/* Carlos Lucas badge */}
            <motion.div
              variants={fadeInUp}
              custom={6}
              className="inline-flex items-center gap-3 bg-[#C4A882]/10 border border-[#C4A882]/20 rounded-full px-6 py-3 mt-4"
            >
              <Trophy size={18} className="text-[#C4A882]" />
              <span className="text-[#C4A882] text-sm tracking-wide">Carlos Lucas — Enologo & Visionario</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CRITIC SCORES — Score rings
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#1A0F0D]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Avaliacoes Profissionais
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Classificacoes da <span className="text-[#C4A882]">Critica</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center">
            {CRITIC_SCORES.map((critic, i) => (
              <ScoreRing
                key={critic.publication}
                score={critic.score}
                max={critic.max}
                publication={critic.publication}
                color={critic.color}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. AWARDS TIMELINE
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1C1210 0%, #1A0F0D 50%, #1C1210 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-20"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Desde 2000
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Percurso de <span className="text-[#C4A882]">Excelencia</span>
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#722F37] to-transparent md:-translate-x-px" />

            <div className="space-y-12 md:space-y-16">
              {TIMELINE_EVENTS.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
                    event.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Gold dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-[#C4A882] border-2 border-[#1C1210] -translate-x-1/2 z-10 top-1 md:top-1/2 md:-translate-y-1/2">
                    {event.highlight && (
                      <span className="absolute inset-0 rounded-full bg-[#C4A882] animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      event.side === "left" ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                  >
                    <div
                      className={`inline-block rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                        event.highlight
                          ? "bg-gradient-to-br from-[#3D2E1A] to-[#2A1F14] border-[#C4A882]/30 shadow-[0_0_40px_rgba(196,168,130,0.1)]"
                          : "bg-[#261A17] border-white/5 hover:border-[#722F37]/30"
                      }`}
                    >
                      <span
                        className={`inline-block text-sm font-serif mb-2 ${
                          event.highlight ? "text-[#C4A882]" : "text-[#722F37]"
                        }`}
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        {event.year}
                      </span>
                      <h3
                        className="text-lg md:text-xl font-serif font-light mb-2"
                        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                      >
                        {event.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. VIVINO RANKINGS
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#140E0C]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(114,47,55,0.06) 0%, transparent 50%, rgba(114,47,55,0.04) 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              8,000+ Avaliacoes
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Reconhecimento dos <span className="text-[#C4A882]">Consumidores</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {VIVINO_WINES.map((wine, i) => (
              <motion.div
                key={wine.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative bg-gradient-to-b from-[#261A17] to-[#1C1210] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-[#722F37]/30 transition-all duration-500"
              >
                {/* Top badge */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3
                      className="text-xl md:text-2xl font-serif font-light"
                      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    >
                      {wine.name}
                    </h3>
                    <span className="text-xs text-neutral-500 tracking-widest uppercase">
                      {wine.type} · {wine.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#722F37]/20 rounded-full px-3 py-1.5">
                    <TrendingUp size={14} className="text-[#C4A882]" />
                    <span className="text-xs text-[#C4A882] font-medium">Top {wine.topPercent}%</span>
                  </div>
                </div>

                {/* Score display */}
                <div className="flex items-end gap-4 mb-4">
                  <span
                    className="text-5xl md:text-6xl font-serif font-light text-[#C4A882]"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                  >
                    {wine.score}
                  </span>
                  <div className="pb-2">
                    <VividStars score={wine.score} />
                    <span className="text-xs text-neutral-500 mt-1 block">
                      {wine.ratings} avaliacoes
                    </span>
                  </div>
                </div>

                {/* Top percent bar */}
                <div className="mb-5">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${100 - wine.topPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #722F37, #C4A882)",
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1.5">
                    Top {wine.topPercent}% de todos os vinhos no mundo
                  </p>
                </div>

                {/* Quote */}
                <div className="flex gap-2 items-start">
                  <Quote size={14} className="text-[#C4A882]/40 shrink-0 mt-0.5" />
                  <p className="text-sm text-neutral-400 italic leading-relaxed">
                    &ldquo;{wine.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. INTERNATIONAL MEDALS
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#1C1210]">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Concursos Internacionais
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Medalhas <span className="text-[#C4A882]">Internacionais</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {MEDALS.map((medal, i) => (
              <motion.div
                key={medal.competition}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Medal SVG */}
                <div className="relative mb-5 transition-transform duration-500 group-hover:[transform:perspective(400px)_rotateY(15deg)]">
                  <svg viewBox="0 0 120 160" className="w-24 h-32 md:w-28 md:h-36" fill="none">
                    {/* Ribbon */}
                    <polygon
                      points="40,0 55,0 70,50 60,50"
                      fill={medal.type === "gold" ? "#C4A882" : "#A0A0A0"}
                      opacity="0.8"
                    />
                    <polygon
                      points="65,0 80,0 70,50 60,50"
                      fill={medal.type === "gold" ? "#B8976A" : "#888888"}
                      opacity="0.8"
                    />
                    {/* Medal circle */}
                    <circle
                      cx="60"
                      cy="95"
                      r="40"
                      fill={medal.type === "gold" ? "url(#medalGold)" : "url(#medalSilver)"}
                    />
                    <circle
                      cx="60"
                      cy="95"
                      r="34"
                      fill="none"
                      stroke={medal.type === "gold" ? "#E0C9A6" : "#C0C0C0"}
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    <circle
                      cx="60"
                      cy="95"
                      r="28"
                      fill="none"
                      stroke={medal.type === "gold" ? "#E0C9A6" : "#C0C0C0"}
                      strokeWidth="0.8"
                      opacity="0.3"
                    />
                    {/* Star center */}
                    <polygon
                      points="60,72 65,85 79,85 68,93 72,106 60,98 48,106 52,93 41,85 55,85"
                      fill={medal.type === "gold" ? "#2A1F14" : "#555555"}
                      opacity="0.4"
                    />
                    <defs>
                      <radialGradient id="medalGold" cx="40%" cy="40%">
                        <stop offset="0%" stopColor="#E0C9A6" />
                        <stop offset="100%" stopColor="#B8976A" />
                      </radialGradient>
                      <radialGradient id="medalSilver" cx="40%" cy="40%">
                        <stop offset="0%" stopColor="#D0D0D0" />
                        <stop offset="100%" stopColor="#909090" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                {/* Medal info */}
                <span
                  className={`text-sm font-medium tracking-wide mb-1 ${
                    medal.type === "gold" ? "text-[#C4A882]" : "text-neutral-300"
                  }`}
                >
                  {medal.medal}
                </span>
                <h3 className="text-sm md:text-base font-medium text-white mb-1">
                  {medal.competition}
                </h3>
                <p className="text-xs text-neutral-500">{medal.wine} · {medal.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. PRESS QUOTES
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#140E0C]">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Imprensa & Comunidade
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              O Que Dizem <span className="text-[#C4A882]">de Nos</span>
            </motion.h2>
          </motion.div>

          {/* Staggered quote cards */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {PRESS_QUOTES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="break-inside-avoid bg-[#FAF7F2] rounded-2xl p-6 md:p-8 text-[#2A1F1B]"
              >
                <Quote size={24} className="text-[#C4A882] mb-4" />
                <p
                  className="text-lg md:text-xl font-serif font-light leading-relaxed mb-5"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#2A1F1B]/10">
                  <div className="w-8 h-8 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                    <Star size={14} className="text-[#722F37]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2A1F1B]">{item.source}</p>
                    <p className="text-xs text-neutral-500">{item.wine}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. NUMBERS SUMMARY
          ══════════════════════════════════════════ */}
      <section
        ref={finalStatsSection.ref}
        className="relative py-20 md:py-28 px-6 bg-[#0F0A08]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(196,168,130,0.05) 0%, transparent 50%, rgba(196,168,130,0.03) 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Em Numeros
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              O Impacto em <span className="text-[#C4A882]">Numeros</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {FINAL_STATS.map((stat, i) => (
              <FinalStatCard
                key={stat.label}
                stat={stat}
                inView={finalStatsSection.inView}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Return / Explore
          ══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #3A1520 0%, #722F37 40%, #4A1F28 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='white'/%3E%3C/svg%3E\")",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative max-w-3xl mx-auto text-center space-y-8"
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Descubra os <span className="text-[#C4A882]">Vinhos Premiados</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-white/70 leading-relaxed max-w-xl mx-auto"
          >
            Cada garrafa carrega consigo decadas de dedicacao, o reconhecimento da
            critica internacional e a essencia unica do Dao.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/projetos/ribeirosanto/vinhos"
              className="inline-flex items-center gap-2 bg-white text-[#2A1F1B] px-8 py-3.5 rounded-full font-medium hover:bg-[#C4A882] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Globe size={18} />
              Ver Vinhos
            </Link>
            <Link
              href="/projetos/ribeirosanto"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <BarChart3 size={18} />
              Pagina Inicial
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
