"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL CSS — keyframe animations injected via <style> tag
═══════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
    25% { transform: translateY(-40px) translateX(20px); opacity: 0.7; }
    50% { transform: translateY(-15px) translateX(-15px); opacity: 0.4; }
    75% { transform: translateY(-55px) translateX(25px); opacity: 0.8; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(12px); }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes nodePulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(6,182,212,0.3); }
    50% { transform: scale(1.06); box-shadow: 0 0 20px rgba(6,182,212,0.6); }
  }
  @keyframes heroGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes connectionPulse {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.4; }
  }
  @keyframes timelinePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(6,182,212,0); }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
}

interface Project {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  tags: string[];
  highlight?: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const SECTIONS = [
  "hero",
  "origin",
  "manifesto",
  "arsenal",
  "systems",
  "timeline",
  "contact",
] as const;

const SECTION_LABELS: Record<string, string> = {
  hero: "Inicio",
  origin: "Origens",
  manifesto: "Manifesto",
  arsenal: "Arsenal",
  systems: "Sistema",
  timeline: "Percurso",
  contact: "Contacto",
};

const HERO_BADGES = [
  { text: "24 anos", icon: "🎂" },
  { text: "MSc IST", icon: "🎓" },
  { text: "Figueira da Foz", icon: "🌊" },
  { text: "Building in Public", icon: "🏗️" },
];

const ORIGIN_CARDS = [
  {
    emoji: "🌊",
    title: "Raizes",
    subtitle: "Fuzeta, Algarve",
    description:
      "Nasci junto ao mar, na Fuzeta. O Algarve ensinou-me a respeitar o ritmo da natureza, a valorizar a simplicidade e a entender que a verdadeira riqueza esta nas experiencias.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    iconBg: "bg-cyan-500/10",
  },
  {
    emoji: "🎓",
    title: "Formacao",
    subtitle: "MSc IST, Lisboa",
    description:
      "Mestrado em Engenharia Informatica no Instituto Superior Tecnico. 5 anos de rigor academico, pensamento logico e noites a debuggar codigo.",
    gradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/20 hover:border-purple-400/40",
    iconBg: "bg-purple-500/10",
  },
  {
    emoji: "📍",
    title: "Base Atual",
    subtitle: "Figueira da Foz",
    description:
      "Surf de manha, codigo a tarde. Um custo de vida que permite construir sem pressao. A cidade perfeita para equilibrio entre produtividade e qualidade de vida.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20 hover:border-emerald-400/40",
    iconBg: "bg-emerald-500/10",
  },
];

const MANIFESTO_VALUES = [
  {
    emoji: "🤝",
    title: "Humanos Primeiro",
    description:
      "A tecnologia existe para servir pessoas. Cada linha de codigo tem um proposito humano. A IA deve democratizar o acesso ao conhecimento, nao complicar.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    iconBg: "bg-cyan-500/10",
  },
  {
    emoji: "🌊",
    title: "Vida Autentica",
    description:
      "Surfar ao nascer do sol. Caminhar na natureza. Viver nao e so produzir — e sentir, respirar, estar presente. A autenticidade e a unica estrategia que funciona.",
    gradient: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/20 hover:border-purple-400/40",
    iconBg: "bg-purple-500/10",
  },
  {
    emoji: "❤️",
    title: "Amor no Codigo",
    description:
      "Cada projeto e um ato de cuidado. Nomes de variaveis pensados com intencao. Animacoes com proposito. Programar e uma linguagem de amor.",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20 hover:border-amber-400/40",
    iconBg: "bg-amber-500/10",
  },
];

const PROJECTS: Project[] = [
  {
    emoji: "🚀",
    title: "Descomplicai",
    subtitle: "Plataforma com 109+ paginas",
    description:
      "Plataforma de democratizacao de IA com mais de 109 paginas construidas numa unica noite. Ferramentas inteligentes, portfolios para restaurantes, clinicas e negocios locais.",
    gradient: "from-blue-500 to-cyan-400",
    tags: ["Next.js", "React", "Tailwind", "109+ paginas"],
    highlight: "Flagship",
  },
  {
    emoji: "🤖",
    title: "MYLO",
    subtitle: "Assistente IA pessoal via Telegram",
    description:
      "Bot de Telegram com IA integrada, pesquisa web via SearXNG, gestao de tarefas, lembretes e conversas contextuais com ChromaDB.",
    gradient: "from-purple-500 to-violet-400",
    tags: ["Python", "Telegram API", "Claude", "Cron"],
    highlight: "AI Core",
  },
  {
    emoji: "🌐",
    title: "Futuro Portfolio",
    subtitle: "Portfolio 3D com Three.js",
    description:
      "Portfolio interativo com cenas 3D, transicoes cinematicas e experiencia imersiva usando Three.js, WebGL e GSAP.",
    gradient: "from-cyan-500 to-blue-400",
    tags: ["Three.js", "WebGL", "React", "GSAP"],
  },
  {
    emoji: "🏘️",
    title: "Figueira Sites",
    subtitle: "25 websites para negocios locais",
    description:
      "Colecao de 25 websites profissionais para restaurantes, clinicas e negocios da Figueira da Foz. Design unico, SEO local, mobile-first.",
    gradient: "from-emerald-500 to-teal-400",
    tags: ["Next.js", "Tailwind", "SEO", "25 sites"],
  },
  {
    emoji: "📜",
    title: "Contract Builder",
    subtitle: "Gerador de contratos para web",
    description:
      "Ferramenta que gera contratos profissionais para servicos web em portugues. Templates personalizaveis e exportacao em PDF.",
    gradient: "from-amber-500 to-orange-400",
    tags: ["React", "PDF", "Templates", "Legal"],
  },
  {
    emoji: "🎮",
    title: "RPG Quest",
    subtitle: "RPG 2D jogavel com 15 NPCs",
    description:
      "Jogo RPG 2D completo com sistema de combate, inventario, 15 NPCs com dialogos ramificados, mapa exploravel e sistema de quests.",
    gradient: "from-rose-500 to-pink-400",
    tags: ["Canvas", "Game Loop", "TypeScript", "2D RPG"],
  },
];

const STATS = [
  { label: "Paginas Online", value: 109, suffix: "+", color: "text-cyan-400" },
  { label: "Projetos", value: 55, suffix: "+", color: "text-purple-400" },
  { label: "Linhas de Codigo", value: 52, suffix: "k+", color: "text-amber-400" },
  { label: "Ferramentas", value: 35, suffix: "+", color: "text-emerald-400" },
];

const SYSTEM_NODES = [
  { label: "Claude AI", emoji: "🧠", color: "#06b6d4", x: 50, y: 20 },
  { label: "Next.js", emoji: "▲", color: "#8b5cf6", x: 20, y: 40 },
  { label: "Vercel", emoji: "🔺", color: "#f59e0b", x: 80, y: 40 },
  { label: "Python", emoji: "🐍", color: "#06b6d4", x: 15, y: 65 },
  { label: "Telegram", emoji: "📨", color: "#8b5cf6", x: 85, y: 65 },
  { label: "SearXNG", emoji: "🔍", color: "#f59e0b", x: 30, y: 80 },
  { label: "ChromaDB", emoji: "🗄️", color: "#06b6d4", x: 50, y: 85 },
  { label: "GitHub", emoji: "🐙", color: "#8b5cf6", x: 70, y: 80 },
  { label: "Obsidian", emoji: "💎", color: "#f59e0b", x: 50, y: 50 },
];

const CONNECTIONS = [
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
  [0, 1], [0, 2], [3, 5], [3, 6], [4, 7], [1, 3], [2, 4],
];

const MILESTONES: Milestone[] = [
  {
    year: "2019",
    title: "Entrada no IST",
    description: "Inicio do percurso academico em Engenharia Informatica no Instituto Superior Tecnico.",
    icon: "🎓",
    color: "border-cyan-500/40",
  },
  {
    year: "2021",
    title: "Primeiros Projetos",
    description: "Comecei a construir projetos pessoais, explorando React, JavaScript e design de interfaces.",
    icon: "💻",
    color: "border-purple-500/40",
  },
  {
    year: "2022",
    title: "Descoberta da IA",
    description: "Primeiro contacto com modelos de linguagem e machine learning. Mudou a minha visao de tudo.",
    icon: "🤖",
    color: "border-amber-500/40",
  },
  {
    year: "2023",
    title: "Mestrado Concluido",
    description: "Conclusao do MSc no IST. 5 anos de rigor que moldaram o meu pensamento critico.",
    icon: "🏆",
    color: "border-emerald-500/40",
  },
  {
    year: "2024",
    title: "Nasce a Descomplicai",
    description: "Fundacao da Descomplicai. IA, presenca digital e mentoring para PMEs portuguesas.",
    icon: "🚀",
    color: "border-cyan-500/40",
  },
  {
    year: "2025",
    title: "109 Paginas Numa Noite",
    description: "Uma noite epica: 109 paginas, 55+ projetos, 52.000 linhas de codigo. Building in public.",
    icon: "🔥",
    color: "border-purple-500/40",
  },
  {
    year: "2026",
    title: "Escalar",
    description: "Objetivo: 200k revenue, democratizar IA para negocios portugueses, partilhar tudo.",
    icon: "🎯",
    color: "border-amber-500/40",
  },
];

const CONTACT_METHODS = [
  {
    emoji: "📧",
    label: "Email",
    value: "jdsds.pt@gmail.com",
    href: "mailto:jdsds.pt@gmail.com",
  },
  {
    emoji: "🐙",
    label: "GitHub",
    value: "DjimieSilva",
    href: "https://github.com/DjimieSilva",
  },
  {
    emoji: "💼",
    label: "LinkedIn",
    value: "Jaime Silva",
    href: "https://linkedin.com/in/jaime-djimie-silva",
  },
  {
    emoji: "🌐",
    label: "Website",
    value: "descomplicai.pt",
    href: "https://descomplicai.pt",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
═══════════════════════════════════════════════════════════════════ */
function generateParticles(count: number): Particle[] {
  const colors = ["#06b6d4", "#8b5cf6", "#f59e0b", "#3b82f6", "#ec4899"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 8,
    opacity: Math.random() * 0.5 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useTypingEffect(words: string[], typingSpeed = 65, pauseTime = 2200) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, pauseTime]);

  return text;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "-60px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════════ */

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const { ref, isVisible } = useScrollReveal();

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

function GlassCard({
  children,
  className = "",
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 ${className}`}
    >
      {glow && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
          style={{ background: glow }}
        />
      )}
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, isVisible } = useScrollReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function JaimeSilvaPortfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [heroLettersVisible, setHeroLettersVisible] = useState(false);

  const particles = useMemo(() => generateParticles(60), []);
  const { scrollYProgress } = useScroll();

  const typingText = useTypingEffect(
    ["Builder", "AI Architect", "Systems Creator", "Surfer", "Descomplicador"],
    65,
    2200
  );

  /* ── Mount ───────────────────────────────────────────────── */
  useEffect(() => {
    setIsMounted(true);
    const t = setTimeout(() => setHeroLettersVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  /* ── Active section tracking ────────────────────────────── */
  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMounted]);

  const scrollToSection = useCallback((id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const heroName = "JAIME SILVA";
  const heroLetters = heroName.split("");

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-sm font-[var(--font-inter)]">A carregar...</p>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════ */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── Scroll progress bar ──────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #f59e0b)",
        }}
      />

      {/* ── Navigation dots ──────────────────────────────────── */}
      <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {SECTIONS.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center justify-end"
            aria-label={SECTION_LABELS[id]}
          >
            <span className="absolute right-8 px-2 py-1 rounded bg-white/10 backdrop-blur text-white/70 text-xs font-[var(--font-inter)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {SECTION_LABELS[id]}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "w-3 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </nav>

      <div className="bg-[#030014] text-white min-h-screen overflow-x-hidden font-[var(--font-inter)]">
        {/* ═══════════════════════════════════════════════════════
           SECTION 1: HERO
        ═══════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Particle field */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Ambient glows */}
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)" }}
          />

          {/* Hero content */}
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
            {/* Name letters */}
            <div className="mb-6 flex flex-wrap justify-center gap-1 sm:gap-2">
              {heroLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-[var(--font-sora)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={
                    heroLettersVisible
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: letter === " " ? "transparent" : "transparent",
                    animation: "heroGradient 4s ease infinite",
                    display: letter === " " ? "inline-block" : undefined,
                    width: letter === " " ? "0.3em" : undefined,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            {/* Glow line */}
            <motion.div
              className="mx-auto mb-8 h-[2px] rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60%", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{
                background: "linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, transparent)",
              }}
            />

            {/* Typing subtitle */}
            <div className="text-xl sm:text-2xl md:text-3xl text-white/60 font-[var(--font-sora)] font-light mb-8 h-[2.5rem]">
              <span>{typingText}</span>
              <span
                className="inline-block w-[2px] h-[1.2em] bg-cyan-400 ml-1 align-middle"
                style={{ animation: "cursorBlink 1s ease-in-out infinite" }}
              />
            </div>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {HERO_BADGES.map((badge) => (
                <div
                  key={badge.text}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-white/60 text-sm font-[var(--font-inter)] flex items-center gap-2"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div
                className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                style={{ animation: "bounce 2s ease-in-out infinite" }}
              >
                <div className="w-1 h-2 rounded-full bg-cyan-400" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
           SECTION 2: ORIGIN
        ═══════════════════════════════════════════════════════ */}
        <section id="origin" className="relative py-24 sm:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  De onde venho
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Origens
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {ORIGIN_CARDS.map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.15}>
                  <GlassCard className={`group p-6 sm:p-8 h-full ${card.borderColor} hover:bg-white/[0.05] transition-all duration-500`}>
                    <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center text-2xl mb-5`}>
                      {card.emoji}
                    </div>
                    <h3 className="font-[var(--font-sora)] text-xl font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-cyan-400/70 text-sm font-[var(--font-inter)] mb-4">
                      {card.subtitle}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed font-[var(--font-inter)]">
                      {card.description}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
           SECTION 3: MANIFESTO
        ═══════════════════════════════════════════════════════ */}
        <section id="manifesto" className="relative py-24 sm:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-purple-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  No que acredito
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #f59e0b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Manifesto
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {MANIFESTO_VALUES.map((val, i) => (
                <ScrollReveal key={val.title} delay={i * 0.15}>
                  <GlassCard className={`group p-6 sm:p-8 h-full ${val.borderColor} hover:bg-white/[0.05] transition-all duration-500`}>
                    <div className={`w-14 h-14 rounded-2xl ${val.iconBg} flex items-center justify-center text-2xl mb-5`}>
                      {val.emoji}
                    </div>
                    <h3 className="font-[var(--font-sora)] text-xl font-bold text-white mb-4">
                      {val.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed font-[var(--font-inter)]">
                      {val.description}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
           SECTION 4: ARSENAL (Stats + Projects)
        ═══════════════════════════════════════════════════════ */}
        <section id="arsenal" className="relative py-24 sm:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  O que construi
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Arsenal
                </h2>
              </div>
            </ScrollReveal>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
              {STATS.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <GlassCard className="p-5 sm:p-6 text-center hover:border-white/20 transition-all duration-500">
                    <div className={`font-[var(--font-sora)] text-3xl sm:text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/40 text-xs sm:text-sm font-[var(--font-inter)]">
                      {stat.label}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {PROJECTS.map((project, i) => (
                <ScrollReveal key={project.title} delay={i * 0.08}>
                  <div
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <GlassCard className="p-5 sm:p-6 h-full hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl">{project.emoji}</span>
                        {project.highlight && (
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${project.gradient.includes("blue") ? "#06b6d4" : "#8b5cf6"}22, transparent)`,
                              color: project.gradient.includes("blue") ? "#06b6d4" : "#8b5cf6",
                              border: `1px solid ${project.gradient.includes("blue") ? "#06b6d4" : "#8b5cf6"}33`,
                            }}
                          >
                            {project.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="font-[var(--font-sora)] text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-sm mb-3 font-[var(--font-inter)]">
                        {project.subtitle}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/40 border border-white/[0.05] font-[var(--font-inter)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Modal ──────────────────────────────────── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <motion.div
                className="relative max-w-lg w-full rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl p-6 sm:p-8"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
                >
                  x
                </button>
                <span className="text-4xl block mb-4">{selectedProject.emoji}</span>
                <h3 className="font-[var(--font-sora)] text-2xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-cyan-400/70 text-sm mb-4 font-[var(--font-inter)]">
                  {selectedProject.subtitle}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6 font-[var(--font-inter)]">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08] font-[var(--font-inter)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════
           SECTION 5: SYSTEMS (Node diagram — CSS only)
        ═══════════════════════════════════════════════════════ */}
        <section id="systems" className="relative py-24 sm:py-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  Como tudo se liga
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "heroGradient 4s ease infinite",
                  }}
                >
                  Sistema
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <GlassCard className="p-4 sm:p-8">
                <div className="relative w-full" style={{ paddingBottom: "70%" }}>
                  {/* Connection lines */}
                  {CONNECTIONS.map(([from, to], i) => {
                    const fromNode = SYSTEM_NODES[from];
                    const toNode = SYSTEM_NODES[to];
                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                    return (
                      <div
                        key={`conn-${i}`}
                        className="absolute"
                        style={{
                          left: `${fromNode.x}%`,
                          top: `${fromNode.y}%`,
                          width: `${length}%`,
                          height: "1px",
                          background: `linear-gradient(90deg, ${fromNode.color}33, ${toNode.color}33)`,
                          transform: `rotate(${angle}deg)`,
                          transformOrigin: "0 0",
                          animation: `connectionPulse 3s ease-in-out ${i * 0.3}s infinite`,
                        }}
                      />
                    );
                  })}

                  {/* Nodes */}
                  {SYSTEM_NODES.map((node, i) => (
                    <ScrollReveal key={node.label} delay={i * 0.08}>
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        <div
                          className="relative flex flex-col items-center gap-1 cursor-default"
                        >
                          <div
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl border bg-[#030014]/80 backdrop-blur flex items-center justify-center text-lg sm:text-2xl"
                            style={{
                              borderColor: `${node.color}44`,
                              animation: `nodePulse 3s ease-in-out ${i * 0.5}s infinite`,
                              boxShadow: `0 0 15px ${node.color}22`,
                            }}
                          >
                            {node.emoji}
                          </div>
                          <span
                            className="text-[9px] sm:text-[11px] font-[var(--font-inter)] font-medium whitespace-nowrap"
                            style={{ color: `${node.color}cc` }}
                          >
                            {node.label}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
           SECTION 6: TIMELINE
        ═══════════════════════════════════════════════════════ */}
        <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  O caminho ate aqui
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Percurso
                </h2>
              </div>
            </ScrollReveal>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-amber-500/30" />

              <div className="space-y-8 sm:space-y-12">
                {MILESTONES.map((milestone, i) => {
                  const isLeft = i % 2 === 0;

                  return (
                    <ScrollReveal
                      key={milestone.year}
                      delay={i * 0.1}
                      direction={isLeft ? "left" : "right"}
                    >
                      <div className={`relative flex items-start gap-6 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}>
                        {/* Content */}
                        <div className={`flex-1 ml-10 md:ml-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                          <GlassCard className={`p-5 sm:p-6 ${milestone.color} hover:bg-white/[0.05] transition-all duration-500`}>
                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                              <span className="text-2xl">{milestone.icon}</span>
                              <span className="text-cyan-400 font-[var(--font-sora)] font-bold text-lg">
                                {milestone.year}
                              </span>
                            </div>
                            <h3 className="font-[var(--font-sora)] text-lg font-bold text-white mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed font-[var(--font-inter)]">
                              {milestone.description}
                            </p>
                          </GlassCard>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6">
                          <div
                            className="w-4 h-4 rounded-full bg-[#030014] border-2 border-cyan-400"
                            style={{ animation: `timelinePulse 2s ease-in-out ${i * 0.4}s infinite` }}
                          />
                        </div>

                        {/* Spacer on desktop */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
           SECTION 7: CONTACT
        ═══════════════════════════════════════════════════════ */}
        <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6">
          {/* Background glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[400px] rounded-full blur-[150px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.08), rgba(139,92,246,0.05), transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="mb-16">
                <p className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-[var(--font-inter)]">
                  Vamos conversar
                </p>
                <h2
                  className="font-[var(--font-sora)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "heroGradient 4s ease infinite",
                  }}
                >
                  Vamos construir algo?
                </h2>
                <p className="text-white/40 text-lg sm:text-xl max-w-2xl mx-auto font-[var(--font-inter)] leading-relaxed">
                  Se tens uma ideia, um projeto ou apenas queres conversar
                  sobre tecnologia e humanos — estou a um email de distancia.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-20">
              {CONTACT_METHODS.map((contact, i) => (
                <ScrollReveal key={contact.label} delay={0.1 + i * 0.1}>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={contact.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="block"
                  >
                    <GlassCard className="p-5 sm:p-6 text-center h-full hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer">
                      <span className="text-3xl block mb-3">{contact.emoji}</span>
                      <p className="font-[var(--font-sora)] text-sm font-semibold text-white/70 mb-1">
                        {contact.label}
                      </p>
                      <p className="text-white/35 text-xs font-[var(--font-inter)] break-all">
                        {contact.value}
                      </p>
                    </GlassCard>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Motto */}
            <ScrollReveal delay={0.3}>
              <p
                className="font-[var(--font-sora)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-16"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b, #8b5cf6, #06b6d4)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "heroGradient 8s ease infinite",
                }}
              >
                Keep building.
                <br />
                Share Love.
              </p>
            </ScrollReveal>

            {/* Footer */}
            <div className="w-full h-[2px] rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-amber-500/30 mb-8" />
            <div className="text-white/15 text-xs font-[var(--font-inter)] space-y-1">
              <p>&copy; {new Date().getFullYear()} Jaime Silva &middot; Feito com amor e Claude AI</p>
              <p>Fuzeta &middot; Lisboa &middot; Figueira da Foz</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
