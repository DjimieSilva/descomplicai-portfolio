"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Wine,
  MapPin,
  Award,
  Star,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

/* ─── Data ─── */

const FEATURED_WINES = [
  {
    name: "Encruzado",
    vintage: "2024",
    price: "€9.90",
    vivino: 3.9,
    accolades: "Wine Enthusiast 91pts · Top 2% Global",
    notes: "Pera madura, flores brancas, acidez citrica vibrante. Estagio em barrica confere complexidade e elegancia.",
    type: "Branco",
  },
  {
    name: "Vinha da Neve Tinto",
    vintage: "2021",
    price: "€30.42",
    vivino: 4.1,
    accolades: "Top 3% Global Vivino",
    notes: "Amora silvestre, baunilha, tabaco. Taninos firmes e sedosos com final prolongado e mineral.",
    type: "Tinto",
  },
  {
    name: "Grande Escolha Red",
    vintage: "2020",
    price: "€23.49",
    vivino: 4.0,
    accolades: "14% alc. · Grandes Escolhas",
    notes: "Mineralidade granítica, frutos silvestres, notas fumadas. Frescura excelente e profundidade notável.",
    type: "Tinto",
  },
];

const STATS = [
  { value: 30, suffix: "+", label: "Anos de Viticultura" },
  { value: 9, suffix: "", label: "Vinhos no Portefólio" },
  { value: 91, suffix: "", label: "Pontos Wine Enthusiast" },
  { value: 600, suffix: "m", label: "Altitude Máxima Vinhas", prefix: "400-" },
];

const AWARDS = [
  "Agricultor do Ano 2014",
  "Wine Enthusiast 91pts",
  "Robert Parker 89pts",
  "Berliner Wine Trophy Gold",
  "Top 2% Vivino Global",
  "Grandes Escolhas Best 30",
];

/* ─── Animation Variants ─── */

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

/* ─── Counter Hook ─── */

function useCounter(target: number, inView: boolean, duration = 2000) {
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
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

/* ─── Intersection Observer Hook ─── */

function useIntersection(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Star Rating Component ─── */

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
      <span className="ml-1.5 text-sm text-amber-300 font-medium">{score}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function RibeiroSantoPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const statsSection = useIntersection(0.3);

  return (
    <main className="bg-[#1C1210] text-white overflow-x-hidden">
      {/* ══════════════════════════════════════════
          1. HERO — Full viewport cinematic
          ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background layers */}
        <motion.div
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0"
        >
          {/* Base dark wine */}
          <div className="absolute inset-0 bg-[#1C1210]" />
          {/* Radial burgundy glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(114,47,55,0.45) 0%, rgba(28,18,16,0) 70%)",
            }}
          />
          {/* Vineyard dusk simulation */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(175deg, transparent 30%, rgba(60,20,30,0.3) 50%, rgba(28,18,16,0.9) 80%)",
            }}
          />
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='white'/%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* Floating parallax elements */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-5xl md:text-7xl top-[15%] left-[8%] opacity-20 select-none"
          >
            🍇
          </motion.span>
          <motion.span
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute text-4xl md:text-6xl top-[25%] right-[10%] opacity-15 select-none"
          >
            🍷
          </motion.span>
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute text-3xl md:text-5xl bottom-[30%] left-[15%] opacity-10 select-none"
          >
            🍇
          </motion.span>
          <motion.span
            animate={{ y: [0, 18, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute text-3xl md:text-4xl bottom-[25%] right-[18%] opacity-10 select-none"
          >
            🌿
          </motion.span>
          {/* Wine glass SVG silhouette */}
          <motion.svg
            animate={{ y: [0, -10, 0], opacity: [0.06, 0.1, 0.06] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[30%] w-24 h-24 md:w-32 md:h-32"
            viewBox="0 0 100 140"
            fill="none"
          >
            <path
              d="M30 10 Q30 60 50 75 Q70 60 70 10 Z"
              fill="rgba(114,47,55,0.15)"
            />
            <line x1="50" y1="75" x2="50" y2="120" stroke="rgba(114,47,55,0.12)" strokeWidth="3" />
            <line x1="35" y1="120" x2="65" y2="120" stroke="rgba(114,47,55,0.12)" strokeWidth="3" />
          </motion.svg>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Pre-heading */}
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-amber-400/80 tracking-[0.35em] uppercase text-xs md:text-sm font-light"
            >
              Ribeiro Santo · Dão · Portugal
            </motion.p>

            {/* Main heading */}
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Onde a terra
              <br />
              <span className="text-[#C4A882]">encontra a alma</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg md:text-xl text-neutral-400 font-light max-w-xl mx-auto"
            >
              Vinhos de autor no coracao do Dao — desde 1994
            </motion.p>

            {/* Decorative line */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex items-center justify-center gap-3 pt-2"
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#722F37]" />
              <Wine size={18} className="text-[#722F37]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#722F37]" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-neutral-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. BRAND STORY
          ══════════════════════════════════════════ */}
      <section className="bg-[#FAF7F2] text-[#2A1F1B] py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#722F37] tracking-[0.3em] uppercase text-xs font-medium"
            >
              A Nossa Historia
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Tres decadas de{" "}
              <span className="text-[#722F37]">paixao</span> pelo Dao
            </motion.h2>
            <motion.div variants={fadeInUp} custom={2} className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                A Quinta do Ribeiro Santo situa-se em Carregal do Sal, no coracao
                da regiao do Dao. Adquirida pela familia Lucas em 1994, as vinhas
                foram imediatamente replantadas com castas nobres da regiao.
              </p>
              <p>
                O primeiro vinho foi engarrafado em 2000, marcando o inicio de uma
                jornada dedicada a expressar o terroir unico desta terra granítica.
                Em 2011 nasceu a Ribeiro Santo by Magnum, com adega propria no Dao.
              </p>
              <p>
                Carlos Lucas, enologo e visionario, foi distinguido como{" "}
                <strong className="text-[#2A1F1B]">
                  Agricultor do Ano 2014
                </strong>{" "}
                pelo Ministerio da Agricultura — reconhecimento de uma filosofia que
                une tradicao e inovacao.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={3} className="flex items-center gap-3 pt-2">
              <MapPin size={16} className="text-[#722F37]" />
              <span className="text-sm text-neutral-500">
                Carregal do Sal, Dao, Portugal
              </span>
            </motion.div>
          </motion.div>

          {/* Decorative element — wine bottle silhouette */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Background circle */}
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(114,47,55,0.2) 0%, transparent 70%)",
                }}
              />
              {/* Bottle SVG */}
              <svg
                viewBox="0 0 200 500"
                className="w-40 md:w-48 mx-auto drop-shadow-2xl"
                fill="none"
              >
                {/* Bottle body */}
                <path
                  d="M85 140 C85 140 60 180 60 240 L60 420 C60 440 80 460 100 460 C120 460 140 440 140 420 L140 240 C140 180 115 140 115 140 L115 60 L85 60 Z"
                  fill="url(#bottleGradient)"
                  stroke="#4A2028"
                  strokeWidth="1.5"
                />
                {/* Neck */}
                <rect x="88" y="20" width="24" height="42" rx="2" fill="#3A1820" />
                {/* Cap */}
                <rect x="86" y="10" width="28" height="14" rx="3" fill="#C4A882" />
                {/* Label */}
                <rect x="70" y="280" width="60" height="80" rx="3" fill="#FAF7F2" opacity="0.9" />
                <text x="100" y="310" textAnchor="middle" fill="#2A1F1B" fontSize="8" fontFamily="Georgia">
                  Ribeiro
                </text>
                <text x="100" y="322" textAnchor="middle" fill="#2A1F1B" fontSize="8" fontFamily="Georgia">
                  Santo
                </text>
                <line x1="82" y1="332" x2="118" y2="332" stroke="#C4A882" strokeWidth="0.8" />
                <text x="100" y="346" textAnchor="middle" fill="#722F37" fontSize="6" fontFamily="Georgia">
                  Dao
                </text>
                <text x="100" y="356" textAnchor="middle" fill="#999" fontSize="5">
                  2024
                </text>
                <defs>
                  <linearGradient id="bottleGradient" x1="60" y1="140" x2="140" y2="460">
                    <stop offset="0%" stopColor="#3A1820" />
                    <stop offset="50%" stopColor="#2A1018" />
                    <stop offset="100%" stopColor="#1C0C10" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Floating vintage year */}
              <div className="absolute -top-4 -right-4 md:right-0 bg-[#722F37] text-white text-xs tracking-widest px-4 py-2 rounded-full shadow-lg">
                Est. 1994
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. FEATURED WINES
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#1A0F0D]">
        {/* Subtle dot grid */}
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
              Colecao
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Vinhos em Destaque
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURED_WINES.map((wine, i) => (
              <motion.div
                key={wine.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-b from-[#261A17] to-[#1C1210] rounded-2xl p-8 border border-white/5 hover:border-[#722F37]/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(114,47,55,0.3)] cursor-pointer"
              >
                {/* Wine type badge */}
                <span
                  className={`inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-6 ${
                    wine.type === "Branco"
                      ? "bg-amber-400/10 text-amber-400"
                      : "bg-[#722F37]/20 text-[#C4A882]"
                  }`}
                >
                  {wine.type}
                </span>

                {/* Wine emoji placeholder */}
                <div className="text-5xl mb-4 opacity-80">
                  {wine.type === "Branco" ? "🥂" : "🍷"}
                </div>

                <h3
                  className="text-xl md:text-2xl font-serif mb-1"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {wine.name}
                </h3>
                <p className="text-neutral-500 text-sm mb-4">
                  Colheita {wine.vintage}
                </p>

                <VividStars score={wine.vivino} />

                <p className="text-xs text-[#C4A882]/70 mt-2 mb-4">
                  {wine.accolades}
                </p>

                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {wine.notes}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-2xl font-light text-white">
                    {wine.price}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#C4A882] text-sm group-hover:gap-3 transition-all duration-300">
                    Ver detalhes <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. NUMBERS — Animated stats
          ══════════════════════════════════════════ */}
      <section
        ref={statsSection.ref}
        className="relative py-20 md:py-28 px-6 bg-[#140E0C]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(114,47,55,0.08) 0%, transparent 50%, rgba(114,47,55,0.05) 100%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={statsSection.inView} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. TERROIR TEASER
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1C1210 0%, #2A1518 50%, #1C1210 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs"
            >
              Terroir
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              O Terroir do <span className="text-[#C4A882]">Dao</span>
            </motion.h2>
            <motion.div variants={fadeInUp} custom={2} className="space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Solos graniticos, clima continental com influencia atlantica,
                vinhas entre os 400 e 600 metros de altitude. Protegidas pelas
                serras da Estrela, do Caramulo e do Bucaco, as vinhas beneficiam
                de amplitudes termicas que preservam a acidez natural das uvas.
              </p>
              <p>
                Entre os rios Mondego e Dao, o terroir confere aos vinhos uma
                mineralidade e frescura distintivas — a assinatura inconfundivel
                do Dao.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} custom={3}>
              <Link
                href="/projetos/ribeirosanto/quinta"
                className="inline-flex items-center gap-2 text-[#C4A882] hover:text-white transition-colors group mt-2"
              >
                Explorar a Quinta
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Map illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center"
          >
            <svg viewBox="0 0 300 420" className="w-full max-w-xs md:max-w-sm mx-auto">
              {/* Portugal outline (simplified) */}
              <path
                d="M150 20 C120 20 90 40 80 70 C70 100 65 130 60 160 C55 190 50 220 55 250 C60 280 70 310 90 340 C100 360 120 380 140 395 C150 400 160 400 170 395 C190 380 210 350 220 320 C230 290 235 260 230 230 C225 200 215 170 210 140 C205 110 200 80 190 55 C180 35 165 20 150 20 Z"
                fill="none"
                stroke="#C4A882"
                strokeWidth="1.5"
                opacity="0.3"
              />
              {/* Dao region highlight */}
              <ellipse
                cx="145"
                cy="165"
                rx="30"
                ry="20"
                fill="rgba(114,47,55,0.4)"
                stroke="#C4A882"
                strokeWidth="1.5"
              />
              {/* Pin */}
              <circle cx="145" cy="165" r="4" fill="#C4A882" />
              <circle cx="145" cy="165" r="8" fill="none" stroke="#C4A882" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Label */}
              <text x="185" y="170" fill="#C4A882" fontSize="14" fontFamily="Georgia">
                Dao
              </text>
              {/* Rivers */}
              <path
                d="M110 150 Q130 160 155 155 Q170 152 185 160"
                fill="none"
                stroke="rgba(196,168,130,0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M120 175 Q140 180 160 178 Q175 176 190 185"
                fill="none"
                stroke="rgba(196,168,130,0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Labels for rivers */}
              <text x="112" y="145" fill="rgba(196,168,130,0.3)" fontSize="7" fontFamily="Georgia">
                Mondego
              </text>
              <text x="125" y="195" fill="rgba(196,168,130,0.3)" fontSize="7" fontFamily="Georgia">
                Dao
              </text>
              {/* Altitude indicator */}
              <text x="95" y="230" fill="rgba(196,168,130,0.4)" fontSize="9">
                ▲ 400-600m
              </text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. AWARDS MARQUEE
          ══════════════════════════════════════════ */}
      <section className="bg-[#0F0A08] py-6 overflow-hidden border-y border-white/5">
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...AWARDS, ...AWARDS, ...AWARDS, ...AWARDS].map((award, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 mx-8 text-[#C4A882] text-sm md:text-base tracking-wide"
              >
                <Award size={14} className="text-[#722F37] shrink-0" />
                {award}
              </span>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA — Visit / Contact
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
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
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-white/60 tracking-[0.3em] uppercase text-xs"
          >
            Enoturismo
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Venha <span className="text-[#C4A882]">Conhecer-nos</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-white/70 leading-relaxed max-w-xl mx-auto"
          >
            Visite a Quinta do Ribeiro Santo e descubra o Dao como nunca viu.
            Passeie pelas vinhas, conheca a adega e prove os nossos vinhos
            acompanhados pela gastronomia regional. Uma experiencia que combina
            paisagem, tradicao e sabor.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/projetos/ribeirosanto/enoturismo"
              className="inline-flex items-center gap-2 bg-white text-[#2A1F1B] px-8 py-3.5 rounded-full font-medium hover:bg-[#C4A882] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Wine size={18} />
              Enoturismo
            </Link>
            <Link
              href="/projetos/ribeirosanto/contacto"
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <MapPin size={18} />
              Contacto
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER BAR
          ══════════════════════════════════════════ */}
      <footer className="bg-[#0F0A08] py-8 px-6 text-center">
        <p className="text-neutral-600 text-sm">
          Ribeiro Santo by Magnum — Carlos Lucas Vinhos · Carregal do Sal, Dao, Portugal
        </p>
      </footer>
    </main>
  );
}

/* ─── Stat Card Sub-component ─── */

function StatCard({
  stat,
  inView,
  index,
}: {
  stat: (typeof STATS)[number];
  inView: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center space-y-2"
    >
      <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#C4A882]">
        {stat.prefix ?? ""}
        {count}
        {stat.suffix}
      </p>
      <p className="text-neutral-500 text-sm tracking-wide">{stat.label}</p>
    </motion.div>
  );
}
