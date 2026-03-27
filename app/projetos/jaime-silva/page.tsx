"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   GLOBAL KEYFRAME CSS
═══════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
    25%      { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
    50%      { transform: translateY(-10px) translateX(-10px); opacity: 0.5; }
    75%      { transform: translateY(-40px) translateX(20px); opacity: 0.9; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.3), 0 0 40px rgba(124,58,237,0.15); }
    50%      { box-shadow: 0 0 40px rgba(37,99,235,0.6), 0 0 80px rgba(124,58,237,0.3); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(10px); }
  }
  @keyframes typing {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes blink {
    0%, 100% { border-color: transparent; }
    50%      { border-color: rgba(255,255,255,0.8); }
  }
  @keyframes flowDash {
    0%   { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes nodePulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(37,99,235,0.3); }
    50%      { transform: scale(1.05); box-shadow: 0 0 25px rgba(37,99,235,0.6); }
  }
  @keyframes gridPan {
    0%   { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroGradient {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  @keyframes dotNav {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.3); }
  }
`;

/* ═══════════════════════════════════════════════════════════
   TYPES & DATA
═══════════════════════════════════════════════════════════ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface Project {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  tags: string[];
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const SECTIONS = ["hero", "manifesto", "arsenal", "systems", "philosophy", "timeline", "contact"];

const SECTION_LABELS: Record<string, string> = {
  hero: "Inicio",
  manifesto: "Manifesto",
  arsenal: "Projetos",
  systems: "Sistema",
  philosophy: "Filosofia",
  timeline: "Percurso",
  contact: "Contacto",
};

const PROJECTS: Project[] = [
  {
    emoji: "🚀",
    title: "Descomplicai",
    subtitle: "Plataforma com 85+ experiencias",
    description:
      "A plataforma central que agrega todos os projetos, ferramentas e sites. Uma montra interativa do que e possivel construir com IA e determinacao.",
    gradient: "from-blue-500 to-cyan-400",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    emoji: "🤖",
    title: "MYLO",
    subtitle: "Assistente pessoal de IA",
    description:
      "Sistema de IA pessoal que opera via Telegram e Claude. Gere cron jobs, responde perguntas, automatiza tarefas e aprende continuamente.",
    gradient: "from-purple-500 to-pink-400",
    tags: ["Python", "Claude API", "Telegram", "ChromaDB", "Cron"],
  },
  {
    emoji: "🌐",
    title: "Futuro Portfolio",
    subtitle: "Portfolio 3D interativo",
    description:
      "Portfolio pessoal com experiencia 3D imersiva. Navegacao espacial, particulas interativas e design futurista.",
    gradient: "from-indigo-500 to-blue-400",
    tags: ["Three.js", "React", "WebGL", "Framer Motion"],
  },
  {
    emoji: "🏘️",
    title: "Figueira Sites",
    subtitle: "25 websites para negocios locais",
    description:
      "Conjunto de 25+ websites profissionais para restaurantes, clinicas e negocios da Figueira da Foz. Design personalizado para cada um.",
    gradient: "from-emerald-500 to-teal-400",
    tags: ["Next.js", "Tailwind", "SEO", "Responsive"],
  },
  {
    emoji: "🌱",
    title: "Seeds",
    subtitle: "Presente para a humanidade",
    description:
      "Projeto de storytelling e partilha. Sementes de ideias, historias e reflexoes para inspirar e conectar pessoas.",
    gradient: "from-amber-500 to-orange-400",
    tags: ["Storytelling", "React", "Design", "Content"],
  },
  {
    emoji: "⚡",
    title: "Integration Hub",
    subtitle: "Backbone de infraestrutura IA",
    description:
      "O sistema central que conecta todas as pecas. SearXNG, ChromaDB, Obsidian, webhooks e automacoes que fazem tudo funcionar.",
    gradient: "from-red-500 to-rose-400",
    tags: ["Python", "Docker", "APIs", "Webhooks", "ChromaDB"],
  },
];

const MILESTONES: Milestone[] = [
  { year: "2019", title: "Entrou no Tecnico", description: "Inicio da jornada em Ciencias de Computadores no IST." },
  { year: "2022", title: "Co-fundou Fraqtory", description: "Software house focada em solucoes digitais." },
  { year: "2024", title: "MSc concluido", description: "Mestrado em Computer Science pelo Instituto Superior Tecnico." },
  { year: "2025", title: "Descomplicai nasceu", description: "Plataforma de IA sem complexidade. Building in public." },
  { year: "2026", title: "85+ projetos", description: "Building in public. Meta: 200k antes dos 25." },
];

const SYSTEM_NODES = [
  { id: "center", label: "Jaime", emoji: "🧠", x: 50, y: 50 },
  { id: "claude", label: "Claude", emoji: "🤖", x: 20, y: 20 },
  { id: "telegram", label: "Telegram", emoji: "📱", x: 80, y: 20 },
  { id: "searxng", label: "SearXNG", emoji: "🔍", x: 15, y: 55 },
  { id: "obsidian", label: "Obsidian", emoji: "📝", x: 85, y: 55 },
  { id: "chromadb", label: "ChromaDB", emoji: "🗄️", x: 25, y: 82 },
  { id: "vercel", label: "Vercel", emoji: "▲", x: 75, y: 82 },
  { id: "github", label: "GitHub", emoji: "🐙", x: 50, y: 90 },
];

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Python", "Tailwind CSS", "Three.js", "Claude API", "Node.js",
];

const STATS = [
  { label: "Sites", value: 85, suffix: "+" },
  { label: "Ferramentas", value: 30, suffix: "+" },
  { label: "Cron Jobs", value: 37, suffix: "" },
  { label: "Hooks", value: 9, suffix: "" },
];

const DECISION_FILTERS = ["ROI", "Scalability", "Automation", "Velocity"];

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */

function useInView(threshold = 0.15) {
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

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            setActive(e.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView, duration]);
  return count;
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

function Particles({ count = 65 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 8,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? "rgba(37,99,235,0.7)"
              : p.id % 3 === 1
              ? "rgba(124,58,237,0.6)"
              : "rgba(255,255,255,0.5)",
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-4 py-1.5 rounded-full text-sm font-medium
        backdrop-blur-xl bg-white/5 border border-white/10 text-white/80
        shadow-lg shadow-black/20"
    >
      {children}
    </span>
  );
}

function StatCounter({ label, value, suffix, inView }: { label: string; value: number; suffix: string; inView: boolean }) {
  const count = useCountUp(value, inView);
  return (
    <div className="text-center">
      <div
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm mt-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group text-left w-full rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/[0.03] border border-white/10
        hover:border-white/20 transition-all duration-500 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />
      <div className="p-6">
        <div className="text-4xl mb-3">{project.emoji}</div>
        <h3
          className="text-xl font-bold text-white mb-1"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          {project.subtitle}
        </p>
      </div>
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"
      />
    </motion.button>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden
          backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-2xl"
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{project.emoji}</span>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              x
            </button>
          </div>
          <p
            className="text-white/70 leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium
                  bg-white/10 text-white/70 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SystemDiagram() {
  const center = SYSTEM_NODES[0];
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      {/* Connection lines via SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
        {SYSTEM_NODES.slice(1).map((node) => (
          <line
            key={node.id}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke="rgba(37,99,235,0.3)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            style={{ animation: "flowDash 2s linear infinite" }}
          />
        ))}
      </svg>
      {/* Nodes */}
      {SYSTEM_NODES.map((node) => {
        const isCenter = node.id === "center";
        return (
          <div
            key={node.id}
            className={`absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2
              ${isCenter ? "z-10" : "z-5"}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={`rounded-full flex items-center justify-center backdrop-blur-xl
                border border-white/15 shadow-lg
                ${isCenter
                  ? "w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-3xl md:text-4xl"
                  : "w-12 h-12 md:w-14 md:h-14 bg-white/[0.06] text-xl md:text-2xl"
                }`}
              style={{ animation: `nodePulse ${isCenter ? 3 : 4}s ease-in-out infinite ${isCenter ? 0 : Math.random() * 2}s` }}
            >
              {node.emoji}
            </div>
            <span
              className={`text-white/70 font-medium ${isCenter ? "text-sm md:text-base" : "text-[10px] md:text-xs"}`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function NavDots({ active }: { active: string }) {
  return (
    <nav
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
      aria-label="Navegacao por secoes"
    >
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className="group relative flex items-center justify-end cursor-pointer"
          aria-label={SECTION_LABELS[id]}
        >
          {/* label on hover */}
          <span
            className="absolute right-6 px-2 py-0.5 rounded text-[10px] font-medium
              bg-white/10 text-white/70 opacity-0 group-hover:opacity-100
              transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm"
          >
            {SECTION_LABELS[id]}
          </span>
          <span
            className={`block rounded-full transition-all duration-300
              ${active === id
                ? "w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30"
                : "w-2 h-2 bg-white/25 hover:bg-white/50"
              }`}
          />
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */

export default function JaimeSilvaPage() {
  /* ── state ── */
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const activeSection = useActiveSection();

  /* ── intersection refs ── */
  const manifesto = useInView(0.2);
  const arsenal = useInView(0.15);
  const systems = useInView(0.2);
  const philosophy = useInView(0.2);
  const timeline = useInView(0.15);
  const contact = useInView(0.2);

  /* ── parallax ── */
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  /* ── mount ── */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── inject CSS ── */
  useEffect(() => {
    const id = "jaime-silva-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #030014 0%, #0a1628 30%, #030014 70%, #0a0a1a 100%)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* ── NAV DOTS ── */}
      <NavDots active={activeSection} />

      {/* ═══════════════════════════════════════════════════
         SECTION 1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        {/* Particle field */}
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Particles count={65} />
        </motion.div>

        {/* ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
            bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        {/* content */}
        <motion.div
          className="relative z-10 text-center max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <GlassBadge>24 anos</GlassBadge>
            <GlassBadge>Tecnico</GlassBadge>
            <GlassBadge>Figueira da Foz</GlassBadge>
          </motion.div>

          {/* name */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "heroGradient 6s ease-in-out infinite",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
          >
            JAIME SILVA
          </motion.h1>

          {/* glow behind name */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[120px]
              bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[80px] pointer-events-none -z-10"
            style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            aria-hidden="true"
          />

          {/* subtitle with typing effect */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-white/80
                text-lg sm:text-xl md:text-2xl text-white/70 font-medium tracking-wide"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                animation: "typing 3s steps(38) 1s forwards, blink 0.75s step-end infinite",
                width: 0,
              }}
            >
              Builder &middot; AI Architect &middot; Systems Creator
            </div>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Scroll
          </span>
          <svg
            className="w-5 h-5 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ animation: "bounce 2s ease-in-out infinite" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ── ORIGIN STRIP (between hero and manifesto) ── */}
      <div className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-px rounded-2xl overflow-hidden
              backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {[
              { icon: "🌊", label: "Raizes", value: "Fuzeta, Algarve" },
              { icon: "🎓", label: "Formacao", value: "MSc Computer Science, IST" },
              { icon: "📍", label: "Base", value: "Figueira da Foz, Portugal" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`p-6 text-center ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""}`}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div
                  className="text-xs text-white/40 uppercase tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-sm text-white/70 font-medium"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
         SECTION 2 — MANIFESTO
      ═══════════════════════════════════════════════════ */}
      <section
        id="manifesto"
        ref={manifesto.ref}
        className="relative py-32 px-4 overflow-hidden"
      >
        {/* bg gradient shift */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={manifesto.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Manifesto
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤝",
                title: "Humanos Primeiro",
                desc: "A tecnologia serve pessoas. Nunca o contrario. Cada linha de codigo existe para melhorar vidas.",
              },
              {
                icon: "🌊",
                title: "Vida Autentica",
                desc: "Viver de verdade, nao apenas sobreviver. Construir com proposito, partilhar com intencao.",
              },
              {
                icon: "❤️",
                title: "Amor no Codigo",
                desc: "Espalhar amor em tudo o que faco. Cada projeto e uma extensao de quem sou.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-2xl p-8 backdrop-blur-xl bg-white/[0.04] border border-white/10
                  hover:border-white/20 transition-colors duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={manifesto.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-white/60 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 3 — ARSENAL
      ═══════════════════════════════════════════════════ */}
      <section
        id="arsenal"
        ref={arsenal.ref}
        className="relative py-32 px-4"
      >
        <div className="max-w-6xl mx-auto">
          {/* header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={arsenal.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                O que construi
              </span>
            </h2>
            <p className="text-white/50 text-lg" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              15+ apps em 10 dias &middot; Building in public
            </p>
          </motion.div>

          {/* stat counters */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={arsenal.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} inView={arsenal.inView} />
            ))}
          </motion.div>

          {/* project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={arsenal.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
         SECTION 4 — SYSTEMS
      ═══════════════════════════════════════════════════ */}
      <section
        id="systems"
        ref={systems.ref}
        className="relative py-32 px-4 overflow-hidden"
      >
        {/* bg */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={systems.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              O meu sistema
            </span>
          </motion.h2>

          {/* diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={systems.inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <SystemDiagram />
          </motion.div>

          {/* tech stack badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={systems.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-medium
                  backdrop-blur-xl bg-white/[0.06] border border-white/10
                  text-white/70 hover:text-white hover:border-white/25
                  transition-all duration-300"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 5 — PHILOSOPHY
      ═══════════════════════════════════════════════════ */}
      <section
        id="philosophy"
        ref={philosophy.ref}
        className="relative py-32 px-4 overflow-hidden"
      >
        {/* parallax grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "gridPan 20s linear infinite",
          }}
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* big quote */}
          <motion.blockquote
            className="text-center mb-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={philosophy.inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                &ldquo;Good enough now &gt; perfect later&rdquo;
              </span>
            </p>
          </motion.blockquote>

          {/* decision filters */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={philosophy.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3
              className="text-lg text-white/50 mb-8"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Filtros de decisao
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DECISION_FILTERS.map((filter, i) => (
              <motion.div
                key={filter}
                className="rounded-xl p-5 text-center backdrop-blur-xl bg-white/[0.04]
                  border border-white/10 hover:border-white/20 transition-colors duration-500"
                initial={{ opacity: 0, x: -30 }}
                animate={philosophy.inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-white/80 mb-1" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm text-white/60 font-medium" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {filter}
                </div>
              </motion.div>
            ))}
          </div>

          {/* connecting arrows */}
          <div className="hidden md:flex justify-center mt-4" aria-hidden="true">
            <div className="flex items-center gap-0 text-white/20">
              {DECISION_FILTERS.map((_, i) => (
                <span key={i} className="flex items-center">
                  {i < DECISION_FILTERS.length - 1 && (
                    <span className="text-xs mx-2">&rarr;</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Building in Public ethos */}
          <motion.div
            className="mt-20 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={philosophy.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <div
              className="rounded-2xl p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10
                hover:border-white/20 transition-colors duration-500"
            >
              <div className="text-3xl mb-4">🏗️</div>
              <h4
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                Building in Public
              </h4>
              <p
                className="text-white/55 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Cada projeto, cada erro, cada vitoria — tudo partilhado abertamente.
                Transparencia total no processo criativo. A jornada e tao importante
                quanto o destino.
              </p>
            </div>
            <div
              className="rounded-2xl p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10
                hover:border-white/20 transition-colors duration-500"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h4
                className="text-lg font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                Meta: 200k antes dos 25
              </h4>
              <p
                className="text-white/55 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Um objetivo ambicioso com deadline: maio de 2026. Nao e so sobre dinheiro —
                e provar que determinacao, IA e execucao consistente podem transformar
                uma visao em realidade.
              </p>
            </div>
          </motion.div>

          {/* Additional philosophy quotes */}
          <motion.div
            className="mt-12 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={philosophy.inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.7 }}
          >
            {[
              "Autenticidade > Perfeicao",
              "Sistemas > Esforco manual",
              "Impacto > Vaidade",
            ].map((quote, i) => (
              <motion.div
                key={quote}
                className="flex items-center gap-4 px-6 py-4 rounded-xl
                  backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]"
                initial={{ opacity: 0, x: -20 }}
                animate={philosophy.inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1 + i * 0.12, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                <span
                  className="text-white/50 text-sm font-medium"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {quote}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 6 — TIMELINE
      ═══════════════════════════════════════════════════ */}
      <section
        id="timeline"
        ref={timeline.ref}
        className="relative py-32 px-4"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={timeline.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Percurso
            </span>
          </motion.h2>

          {/* vertical timeline */}
          <div className="relative">
            {/* central line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"
              aria-hidden="true"
            />

            {MILESTONES.map((ms, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={ms.year}
                  className={`relative flex items-start mb-12 last:mb-0
                    ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={timeline.inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
                >
                  {/* dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2
                      bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-[#030014]
                      shadow-lg shadow-blue-500/30 z-10"
                  />

                  {/* content card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)]
                      ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                  >
                    <div
                      className="rounded-xl p-5 backdrop-blur-xl bg-white/[0.04] border border-white/10
                        hover:border-white/20 transition-colors duration-500"
                    >
                      <div
                        className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400
                          bg-clip-text text-transparent mb-1"
                        style={{ fontFamily: "var(--font-sora), sans-serif" }}
                      >
                        {ms.year}
                      </div>
                      <h3
                        className="text-lg font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-sora), sans-serif" }}
                      >
                        {ms.title}
                      </h3>
                      <p
                        className="text-white/55 text-sm"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {ms.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         SECTION 7 — CONTACT / FOOTER
      ═══════════════════════════════════════════════════ */}
      <section
        id="contact"
        ref={contact.ref}
        className="relative py-32 px-4 overflow-hidden"
      >
        {/* ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
            bg-gradient-to-t from-blue-600/10 to-transparent blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={contact.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Vamos construir algo?
            </span>
          </motion.h2>

          <motion.p
            className="text-white/50 text-lg mb-12 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            initial={{ opacity: 0 }}
            animate={contact.inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Se tens uma ideia, um projeto ou apenas queres conversar sobre tecnologia e humanos,
            entra em contacto.
          </motion.p>

          {/* contact links */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={contact.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {[
              { label: "Email", href: "mailto:jaime@descomplicai.pt", icon: "📧" },
              { label: "GitHub", href: "https://github.com/jaimesilva", icon: "🐙" },
              { label: "LinkedIn", href: "https://linkedin.com/in/jaimesilva", icon: "💼" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full
                  backdrop-blur-xl bg-white/[0.06] border border-white/10
                  text-white/70 hover:text-white hover:border-white/25
                  hover:bg-white/[0.1] transition-all duration-300"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </motion.div>

          {/* motto */}
          <motion.p
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={contact.inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Keep building. Share Love.
            </span>
          </motion.p>
        </div>

        {/* gradient footer bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      </section>
    </div>
  );
}
