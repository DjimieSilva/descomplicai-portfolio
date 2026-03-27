"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#0a0a0a",
  green: "#22c55e",
  cyan: "#06b6d4",
  amber: "#f59e0b",
  red: "#ef4444",
  muted: "#4b5563",
  darkGreen: "#166534",
  darkCyan: "#0e7490",
  surface: "#111111",
  surfaceLight: "#1a1a1a",
};

const FONT = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";

const BOOT_LINES = [
  { text: "> DESCOMPLICAI OS v2.6 [Build 2026.03.27]", color: COLORS.green },
  { text: "> Initializing neural networks... OK", color: COLORS.green },
  { text: "> Loading portfolio modules... OK", color: COLORS.green },
  { text: "> Scanning 109 pages... FOUND", color: COLORS.cyan },
  { text: "> Compiling 52,847 lines of code... DONE", color: COLORS.cyan },
  {
    text: "> Status: ALL SYSTEMS OPERATIONAL \u2713",
    color: COLORS.green,
    bold: true,
  },
  { text: "", color: COLORS.green },
  { text: "> Welcome, visitor.", color: COLORS.amber },
  {
    text: "> Type 'help' or scroll to explore.",
    color: COLORS.muted,
    italic: true,
  },
];

const SERVICES = [
  {
    pid: "001",
    name: "sites-portfolios",
    status: "RUNNING",
    uptime: "24/7",
    description:
      "Sites de portfolio personalizados para restaurantes, clinicas, empresas e marcas pessoais. Design responsivo, SEO otimizado, performance maxima. Cada site e uma obra unica.",
    tech: "Next.js, Tailwind CSS, Framer Motion, Vercel",
    clients: "40+",
  },
  {
    pid: "002",
    name: "ia-automacao",
    status: "RUNNING",
    uptime: "24/7",
    description:
      "Automacoes inteligentes com IA para poupar tempo e aumentar produtividade. Chatbots, geracao de conteudo, analise de dados, workflows automatizados com Claude, GPT e ferramentas custom.",
    tech: "Claude AI, Python, Node.js, APIs REST",
    clients: "15+",
  },
  {
    pid: "003",
    name: "mentoria-1-1",
    status: "RUNNING",
    uptime: "ON-DEMAND",
    description:
      "Sessoes de mentoria individual para quem quer lancar o seu negocio digital. Desde a ideia ao MVP, passando por tech stack, marketing e monetizacao. Sem bullshit, so acao.",
    tech: "Zoom, Notion, Loom, Miro",
    clients: "25+",
  },
];

const PROJECT_DIRS = [
  {
    name: "restaurantes",
    permissions: "drwxr-xr-x",
    count: 17,
    projects: [
      { name: "cacarola/", href: "/projetos/cacarola" },
      { name: "cacarola-dois/", href: "/projetos/cacarola-dois" },
      { name: "bijou/", href: "/projetos/bijou-restaurante" },
      { name: "meiocheio/", href: "/projetos/meiocheio" },
      { name: "cafe-praca-18/", href: "/projetos/cafe-praca-18" },
      { name: "mesa-dos-amigos/", href: "/projetos/mesa-dos-amigos" },
      { name: "tasca-da-praia/", href: "/projetos/tasca-da-praia" },
      { name: "tasca-dentro/", href: "/projetos/tasca-dentro" },
      { name: "marisqueira-rosa-amelia/", href: "/projetos/marisqueira-rosa-amelia" },
      { name: "pe-na-areia/", href: "/projetos/pe-na-areia" },
      { name: "o-picadeiro/", href: "/projetos/o-picadeiro" },
      { name: "sabor-abencoado/", href: "/projetos/sabor-abencoado" },
      { name: "zeff-pizza/", href: "/projetos/zeff-pizza" },
      { name: "vindima-selvagem/", href: "/projetos/vindima-selvagem" },
      { name: "rota-dos-vinhos/", href: "/projetos/rota-dos-vinhos" },
      { name: "vinho-na-rua/", href: "/projetos/vinho-na-rua" },
      { name: "nalu-cabedelo/", href: "/projetos/nalu-cabedelo" },
    ],
  },
  {
    name: "clinicas",
    permissions: "drwxr-xr-x",
    count: 8,
    projects: [
      { name: "fozclinica/", href: "/projetos/fozclinica" },
      { name: "alba-saude-dentaria/", href: "/projetos/alba-saude-dentaria" },
      { name: "clinica-dentaria-quiaios/", href: "/projetos/clinica-dentaria-quiaios" },
      { name: "clinica-tamargueira/", href: "/projetos/clinica-tamargueira" },
      { name: "clinica-vasco-da-gama/", href: "/projetos/clinica-vasco-da-gama" },
      { name: "dentalkid/", href: "/projetos/dentalkid" },
      { name: "dentalkid-v2/", href: "/projetos/dentalkid-v2" },
      { name: "premium-clinica-dentaria/", href: "/projetos/premium-clinica-dentaria" },
    ],
  },
  {
    name: "ferramentas",
    permissions: "drwxr-xr-x",
    count: 30,
    projects: [
      { name: "calculator/", href: "/projetos/calculator" },
      { name: "pomodoro/", href: "/projetos/pomodoro" },
      { name: "todo-kanban/", href: "/projetos/todo-kanban" },
      { name: "password-generator/", href: "/projetos/password-generator" },
      { name: "markdown-editor/", href: "/projetos/markdown-editor" },
      { name: "json-formatter/", href: "/projetos/json-formatter" },
      { name: "regex-tester/", href: "/projetos/regex-tester" },
      { name: "unit-converter/", href: "/projetos/unit-converter" },
      { name: "color-palette-generator/", href: "/projetos/color-palette-generator" },
      { name: "gradient-maker/", href: "/projetos/gradient-maker" },
      { name: "text-analyzer/", href: "/projetos/text-analyzer" },
      { name: "css-playground/", href: "/projetos/css-playground" },
      { name: "habit-tracker/", href: "/projetos/habit-tracker" },
      { name: "flashcards/", href: "/projetos/flashcards" },
      { name: "typing-speed-test/", href: "/projetos/typing-speed-test" },
    ],
  },
  {
    name: "experiencias",
    permissions: "drwxr-xr-x",
    count: 10,
    projects: [
      { name: "aurora-borealis/", href: "/projetos/aurora-borealis" },
      { name: "solar-system/", href: "/projetos/solar-system" },
      { name: "fractal-explorer/", href: "/projetos/fractal-explorer" },
      { name: "particle-sim/", href: "/projetos/particle-sim" },
      { name: "generative-art/", href: "/projetos/generative-art" },
      { name: "music-visualizer/", href: "/projetos/music-visualizer" },
      { name: "globe-explorer/", href: "/projetos/globe-explorer" },
      { name: "pixel-art/", href: "/projetos/pixel-art" },
      { name: "css-art-gallery/", href: "/projetos/css-art-gallery" },
      { name: "synth/", href: "/projetos/synth" },
    ],
  },
];

const FEATURED_PROJECTS = [
  {
    name: "Cacarola",
    description: "Site de portfolio para restaurante premiado em Figueira da Foz. Design elegante com menu interativo e reservas online.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    href: "/projetos/cacarola",
    window: "cacarola.foz",
  },
  {
    name: "FozClinica",
    description: "Plataforma digital para clinica medica. Agendamento online, perfis de medicos, e informacao para pacientes.",
    tech: ["React", "TypeScript", "Supabase"],
    href: "/projetos/fozclinica",
    window: "fozclinica.pt",
  },
  {
    name: "Aurora Borealis",
    description: "Experiencia visual interativa que simula auroras boreais com particulas e gradientes dinamicos em tempo real.",
    tech: ["Canvas API", "WebGL", "Framer Motion"],
    href: "/projetos/aurora-borealis",
    window: "aurora.sim",
  },
  {
    name: "Descomplicai Cosmos",
    description: "Redesign do site Descomplicai com tematica espacial. Navegacao por constelacoes e animacoes de galaxias.",
    tech: ["Three.js", "Next.js", "GSAP"],
    href: "/projetos/descomplicai-cosmos",
    window: "cosmos.dcai",
  },
  {
    name: "Solar System",
    description: "Modelo 3D interativo do sistema solar com orbitas realistas, informacao de cada planeta e controlo de tempo.",
    tech: ["Three.js", "React", "Physics Engine"],
    href: "/projetos/solar-system",
    window: "solar.sys",
  },
  {
    name: "Generative Art",
    description: "Galeria de arte generativa criada com algoritmos. Cada visita gera obras unicas usando matematica e aleatoriedade.",
    tech: ["Canvas", "Algorithms", "Randomness"],
    href: "/projetos/generative-art",
    window: "genart.io",
  },
];

const GIT_LOG = [
  {
    hash: "a7f3c2e",
    date: "2026-03",
    message: "feat: 109 pages in one night",
    branch: "HEAD -> master",
  },
  {
    hash: "b9d4e1a",
    date: "2025-12",
    message: "feat: Descomplicai platform v2",
    branch: null,
  },
  {
    hash: "c3f8a7b",
    date: "2025-06",
    message: "feat: AI tools & automation suite",
    branch: null,
  },
  {
    hash: "d1e6c9f",
    date: "2024-06",
    message: "docs: MSc thesis complete",
    branch: null,
  },
  {
    hash: "e5a2b8d",
    date: "2023-01",
    message: "feat: mentoria program launch",
    branch: null,
  },
  {
    hash: "f7c4d3e",
    date: "2022-06",
    message: "refactor: pivot to AI focus",
    branch: null,
  },
  {
    hash: "a8b5e2c",
    date: "2021-01",
    message: "feat: first client projects",
    branch: null,
  },
  {
    hash: "b2d9f1a",
    date: "2019-09",
    message: "init: IST engineering degree",
    branch: null,
  },
];

const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Comandos disponiveis:",
    "",
    "  about      Sobre o Jaime Silva",
    "  projects   Lista categorias de projetos",
    "  skills     Tech stack completa",
    "  contact    Informacao de contacto",
    "  services   Servicos disponiveis",
    "  clear      Limpar terminal",
    "  exit       Sair do terminal",
    "",
    'Dica: escreve "projects" para explorar o portfolio.',
  ],
  about: [
    "┌────────────────────────────────────────────┐",
    "│  JAIME SILVA                               │",
    "│  Fundador @ Descomplicai                   │",
    "│                                            │",
    "│  Engenheiro pelo IST, Lisboa.              │",
    "│  Mestre em Engenharia e Gestao.            │",
    "│  Apaixonado por tecnologia e pessoas.      │",
    "│                                            │",
    "│  Missao: Descomplico tecnologia para       │",
    "│  quem quer transformar o mundo.            │",
    "│                                            │",
    "│  Base: Figueira da Foz, Portugal           │",
    "│  Status: Building in public                │",
    "└────────────────────────────────────────────┘",
  ],
  projects: [
    "Categorias de projetos:",
    "",
    "  /restaurantes    17 projetos",
    "  /clinicas         8 projetos",
    "  /ferramentas     30 projetos",
    "  /experiencias    10 projetos",
    "  /redesigns        5 projetos",
    "  /jogos           12 projetos",
    "",
    "Total: 109+ paginas publicadas",
  ],
  skills: [
    "Tech Stack:",
    "",
    "  Frontend    React, Next.js, TypeScript",
    "  Styling     Tailwind CSS, Framer Motion",
    "  Backend     Node.js, Python, Supabase",
    "  AI          Claude, GPT, Langchain",
    "  Tools       Git, Vercel, Figma, VS Code",
    "  Other       Three.js, Canvas API, WebGL",
    "",
    "Linhas de codigo: 52,847+",
  ],
  contact: [
    "Contacto:",
    "",
    "  Email      jdsds.pt@gmail.com",
    "  GitHub     github.com/DjimieSilva",
    "  LinkedIn   linkedin.com/in/jaime-silva",
    "  Website    descomplicai.com",
    "",
    "Respondo em < 24h.",
  ],
  services: [
    "Servicos ativos:",
    "",
    "  [001] sites-portfolios    RUNNING  24/7",
    "  [002] ia-automacao         RUNNING  24/7",
    "  [003] mentoria-1-1         RUNNING  ON-DEMAND",
    "",
    "Todos os servicos operacionais.",
  ],
};

const NAV_ITEMS = [
  { label: "services", href: "#services" },
  { label: "projetos", href: "#projetos" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY: Katakana/ASCII character pool for matrix rain
   ═══════════════════════════════════════════════════════════════════════════ */

const MATRIX_CHARS =
  "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F20123456789ABCDEF";

function randomChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Matrix Rain Column
   ═══════════════════════════════════════════════════════════════════════════ */

function MatrixColumn({ index, total }: { index: number; total: number }) {
  const [chars, setChars] = useState<string[]>([]);
  const speed = useMemo(() => 0.6 + Math.random() * 1.4, []);
  const delay = useMemo(() => Math.random() * 5, []);
  const left = useMemo(() => `${(index / total) * 100}%`, [index, total]);
  const charCount = useMemo(() => 15 + Math.floor(Math.random() * 20), []);

  useEffect(() => {
    const arr: string[] = [];
    for (let i = 0; i < charCount; i++) {
      arr.push(randomChar());
    }
    setChars(arr);

    const interval = setInterval(() => {
      setChars((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = randomChar();
        return next;
      });
    }, 200 + Math.random() * 300);

    return () => clearInterval(interval);
  }, [charCount]);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 0,
        fontSize: "14px",
        fontFamily: FONT,
        color: COLORS.green,
        opacity: 0.08,
        writingMode: "vertical-rl",
        textOrientation: "upright",
        animation: `matrixFall ${8 / speed}s linear ${delay}s infinite`,
        letterSpacing: "2px",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            opacity: i === chars.length - 1 ? 1 : 0.3 + (i / chars.length) * 0.7,
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Background Matrix Rain (low opacity)
   ═══════════════════════════════════════════════════════════════════════════ */

function MatrixRainBackground() {
  const cols = 30;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <MatrixColumn key={i} index={i} total={cols} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Scanlines Overlay
   ═══════════════════════════════════════════════════════════════════════════ */

function ScanlinesOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Green Scanline Effect
   ═══════════════════════════════════════════════════════════════════════════ */

function GreenScanline() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background: `linear-gradient(90deg, transparent, ${COLORS.green}, transparent)`,
        opacity: 0.03,
        zIndex: 9999,
        animation: "scanlineMove 6s linear infinite",
        pointerEvents: "none",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Blinking Cursor
   ═══════════════════════════════════════════════════════════════════════════ */

function BlinkingCursor({ color = COLORS.green }: { color?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: "10px",
        height: "20px",
        backgroundColor: color,
        marginLeft: "2px",
        animation: "cursorBlink 1s step-end infinite",
        verticalAlign: "text-bottom",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Typewriter Line
   ═══════════════════════════════════════════════════════════════════════════ */

function TypewriterLine({
  text,
  color,
  bold,
  italic,
  delay,
  onComplete,
}: {
  text: string;
  color: string;
  bold?: boolean;
  italic?: boolean;
  delay: number;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || text === "") {
      if (started && text === "") {
        setDone(true);
        onComplete?.();
      }
      return;
    }
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayedText(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [started, text, onComplete]);

  if (!started) return <div style={{ height: "24px" }} />;

  return (
    <div
      style={{
        color,
        fontWeight: bold ? 700 : 400,
        fontStyle: italic ? "italic" : "normal",
        fontFamily: FONT,
        fontSize: "14px",
        lineHeight: "24px",
        minHeight: "24px",
        whiteSpace: "pre",
      }}
    >
      {displayedText}
      {!done && <BlinkingCursor color={color} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Section Title
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionTitle({ children }: { children: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: FONT,
        fontSize: "16px",
        color: COLORS.cyan,
        marginBottom: "24px",
        fontWeight: 400,
      }}
    >
      {children}
    </motion.h2>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: ASCII Border Box
   ═══════════════════════════════════════════════════════════════════════════ */

function ASCIIBox({
  children,
  style: extraStyle,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        border: `1px solid ${COLORS.muted}`,
        borderRadius: "2px",
        padding: "20px",
        position: "relative",
        ...extraStyle,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "-1px",
          left: "8px",
          color: COLORS.muted,
          fontSize: "12px",
          fontFamily: FONT,
          lineHeight: "1",
          background: COLORS.bg,
          padding: "0 4px",
        }}
      >
        +
      </span>
      <span
        style={{
          position: "absolute",
          top: "-1px",
          right: "8px",
          color: COLORS.muted,
          fontSize: "12px",
          fontFamily: FONT,
          lineHeight: "1",
          background: COLORS.bg,
          padding: "0 4px",
        }}
      >
        +
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "-1px",
          left: "8px",
          color: COLORS.muted,
          fontSize: "12px",
          fontFamily: FONT,
          lineHeight: "1",
          background: COLORS.bg,
          padding: "0 4px",
        }}
      >
        +
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "-1px",
          right: "8px",
          color: COLORS.muted,
          fontSize: "12px",
          fontFamily: FONT,
          lineHeight: "1",
          background: COLORS.bg,
          padding: "0 4px",
        }}
      >
        +
      </span>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS: Glitch Text
   ═══════════════════════════════════════════════════════════════════════════ */

function GlitchText({
  children,
  style: extraStyle,
}: {
  children: string;
  style?: React.CSSProperties;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      style={{
        position: "relative",
        display: "inline-block",
        ...extraStyle,
      }}
    >
      {isGlitching && (
        <>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "2px",
              color: COLORS.red,
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              animation: "glitch1 0.2s infinite",
            }}
          >
            {children}
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "-2px",
              color: COLORS.cyan,
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              animation: "glitch2 0.3s infinite",
            }}
          >
            {children}
          </span>
        </>
      )}
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION: Navigation Bar
   ═══════════════════════════════════════════════════════════════════════════ */

function NavigationBar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => ({
        id: item.href.slice(1),
        el: document.getElementById(item.href.slice(1)),
      }));
      for (const section of sections.reverse()) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveTab(section.id);
            return;
          }
        }
      }
      setActiveTab(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 5, duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        background: "rgba(10, 10, 10, 0.95)",
        borderBottom: `1px solid ${COLORS.muted}33`,
        backdropFilter: "blur(10px)",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "48px",
        }}
      >
        {/* Left dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: COLORS.red, fontSize: "12px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.amber, fontSize: "12px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.green, fontSize: "12px" }}>{"\u25CF"}</span>
          <span
            style={{
              color: COLORS.muted,
              fontSize: "12px",
              marginLeft: "12px",
            }}
          >
            visitor@descomplicai:~$
          </span>
        </div>

        {/* Desktop tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.href.slice(1))
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                color:
                  activeTab === item.href.slice(1)
                    ? COLORS.green
                    : COLORS.muted,
                fontSize: "13px",
                padding: "6px 14px",
                textDecoration: "none",
                borderBottom:
                  activeTab === item.href.slice(1)
                    ? `2px solid ${COLORS.green}`
                    : "2px solid transparent",
                transition: "all 0.2s",
                fontFamily: FONT,
              }}
            >
              [{item.label}]
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: COLORS.green,
            fontSize: "20px",
            cursor: "pointer",
            fontFamily: FONT,
          }}
        >
          {mobileOpen ? "\u2715" : "\u2261"}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="nav-mobile-dropdown"
            style={{
              overflow: "hidden",
              borderTop: `1px solid ${COLORS.muted}33`,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  document
                    .getElementById(item.href.slice(1))
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  color: COLORS.green,
                  textDecoration: "none",
                  fontSize: "14px",
                  fontFamily: FONT,
                  borderBottom: `1px solid ${COLORS.muted}22`,
                }}
              >
                {">"} {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1: Boot Sequence Hero
   ═══════════════════════════════════════════════════════════════════════════ */

function BootSequenceHero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleLineComplete = useCallback(() => {
    setCurrentLine((prev) => {
      const next = prev + 1;
      if (next >= BOOT_LINES.length) {
        setTimeout(() => setBootComplete(true), 600);
      }
      return next;
    });
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 40px",
      }}
    >
      {/* Matrix Rain for hero - higher opacity */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <MatrixColumn key={`hero-${i}`} index={i} total={30} />
        ))}
      </div>

      {/* CRT Vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Boot terminal */}
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          zIndex: 3,
          padding: "40px",
          borderRadius: "4px",
          border: `1px solid ${COLORS.muted}44`,
          background: "rgba(10, 10, 10, 0.8)",
        }}
      >
        {/* Terminal title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
            paddingBottom: "12px",
            borderBottom: `1px solid ${COLORS.muted}33`,
          }}
        >
          <span style={{ color: COLORS.red, fontSize: "10px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.amber, fontSize: "10px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.green, fontSize: "10px" }}>{"\u25CF"}</span>
          <span
            style={{
              color: COLORS.muted,
              fontSize: "11px",
              fontFamily: FONT,
              marginLeft: "8px",
            }}
          >
            descomplicai - boot sequence
          </span>
        </div>

        {BOOT_LINES.map((line, i) => (
          <TypewriterLine
            key={i}
            text={line.text}
            color={line.color}
            bold={line.bold}
            italic={line.italic}
            delay={i * 400}
            onComplete={i <= currentLine ? handleLineComplete : undefined}
          />
        ))}

        {bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: "32px" }}
          >
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-block",
                color: COLORS.green,
                fontFamily: FONT,
                fontSize: "16px",
                textDecoration: "none",
                padding: "10px 20px",
                border: `1px solid ${COLORS.green}66`,
                borderRadius: "2px",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${COLORS.green}15`;
                e.currentTarget.style.borderColor = COLORS.green;
                e.currentTarget.style.boxShadow = `0 0 20px ${COLORS.green}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = `${COLORS.green}66`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {">"} ./explore --all
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2: System Status (Services)
   ═══════════════════════════════════════════════════════════════════════════ */

function SystemStatus() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ cat /services/index.md</SectionTitle>

      <ASCIIBox>
        {/* Table header */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: "13px",
            color: COLORS.muted,
            borderBottom: `1px solid ${COLORS.muted}44`,
            paddingBottom: "8px",
            marginBottom: "8px",
            display: "grid",
            gridTemplateColumns: "60px 1fr 100px 100px",
            gap: "8px",
          }}
        >
          <span>PID</span>
          <span>SERVICE</span>
          <span>STATUS</span>
          <span>UPTIME</span>
        </div>

        {/* Service rows */}
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.pid}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <div
              onClick={() =>
                setExpanded(expanded === service.pid ? null : service.pid)
              }
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 100px 100px",
                gap: "8px",
                fontFamily: FONT,
                fontSize: "14px",
                padding: "10px 0",
                borderBottom: `1px solid ${COLORS.muted}22`,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${COLORS.green}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ color: COLORS.amber }}>{service.pid}</span>
              <span style={{ color: COLORS.green }}>{service.name}</span>
              <span
                style={{
                  color: COLORS.green,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: COLORS.green,
                    boxShadow: `0 0 6px ${COLORS.green}`,
                  }}
                />
                {service.status}
              </span>
              <span style={{ color: COLORS.muted }}>{service.uptime}</span>
            </div>

            <AnimatePresence>
              {expanded === service.pid && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    overflow: "hidden",
                    fontFamily: FONT,
                    fontSize: "13px",
                    padding: "0 0 0 60px",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 0",
                      borderLeft: `2px solid ${COLORS.green}44`,
                      paddingLeft: "16px",
                    }}
                  >
                    <div style={{ color: COLORS.green, marginBottom: "8px" }}>
                      {service.description}
                    </div>
                    <div style={{ color: COLORS.cyan, marginBottom: "4px" }}>
                      Tech: {service.tech}
                    </div>
                    <div style={{ color: COLORS.amber }}>
                      Clientes: {service.clients}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </ASCIIBox>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3: Project Database
   ═══════════════════════════════════════════════════════════════════════════ */

function ProjectDatabase() {
  const [expandedDir, setExpandedDir] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projetos"
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ ls -la /projetos/</SectionTitle>

      <div style={{ fontFamily: FONT, fontSize: "14px" }}>
        {PROJECT_DIRS.map((dir, i) => (
          <motion.div
            key={dir.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div
              onClick={() =>
                setExpandedDir(expandedDir === dir.name ? null : dir.name)
              }
              style={{
                display: "flex",
                gap: "16px",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${COLORS.green}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ color: COLORS.muted }}>{dir.permissions}</span>
              <span style={{ color: COLORS.muted }}>
                {String(dir.count).padStart(2, " ")}
              </span>
              <span style={{ color: COLORS.amber }}>jaime</span>
              <span
                style={{
                  color: COLORS.cyan,
                  fontWeight: 600,
                }}
              >
                {dir.name}/
              </span>
            </div>

            <AnimatePresence>
              {expandedDir === dir.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: "8px 0 16px 24px",
                      borderLeft: `1px solid ${COLORS.muted}44`,
                      marginLeft: "12px",
                    }}
                  >
                    <div
                      style={{
                        color: COLORS.muted,
                        fontSize: "12px",
                        marginBottom: "8px",
                        paddingLeft: "12px",
                      }}
                    >
                      $ ls {dir.name}/
                    </div>
                    {dir.projects.map((project, j) => (
                      <motion.a
                        key={project.name}
                        href={project.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        style={{
                          display: "block",
                          color: COLORS.green,
                          textDecoration: "none",
                          padding: "4px 12px",
                          fontSize: "13px",
                          borderRadius: "2px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${COLORS.green}12`;
                          e.currentTarget.style.paddingLeft = "20px";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.paddingLeft = "12px";
                        }}
                      >
                        {project.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* README.md line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            gap: "16px",
            padding: "8px 12px",
            color: COLORS.muted,
          }}
        >
          <span>-rw-r--r--</span>
          <span> 1</span>
          <span style={{ color: COLORS.amber }}>jaime</span>
          <span>README.md</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4: Featured Projects
   ═══════════════════════════════════════════════════════════════════════════ */

function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ cat /projetos/HIGHLIGHTS.md</SectionTitle>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.href}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.1 }}
            style={{
              display: "block",
              textDecoration: "none",
              border: `1px solid ${COLORS.muted}44`,
              borderRadius: "4px",
              overflow: "hidden",
              transition: "all 0.3s",
              background: COLORS.surface,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.green}88`;
              e.currentTarget.style.boxShadow = `0 0 30px ${COLORS.green}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.muted}44`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Terminal title bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderBottom: `1px solid ${COLORS.muted}33`,
                background: COLORS.surfaceLight,
              }}
            >
              <span style={{ color: COLORS.red, fontSize: "8px" }}>{"\u25CF"}</span>
              <span style={{ color: COLORS.amber, fontSize: "8px" }}>{"\u25CF"}</span>
              <span style={{ color: COLORS.green, fontSize: "8px" }}>{"\u25CF"}</span>
              <span
                style={{
                  color: COLORS.muted,
                  fontSize: "11px",
                  fontFamily: FONT,
                  marginLeft: "6px",
                }}
              >
                {project.window}
              </span>
            </div>

            {/* Card content */}
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  color: COLORS.cyan,
                  fontFamily: FONT,
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                {project.name}
              </div>
              <div
                style={{
                  color: COLORS.green,
                  fontFamily: FONT,
                  fontSize: "13px",
                  lineHeight: "1.6",
                  marginBottom: "16px",
                  opacity: 0.8,
                }}
              >
                {project.description}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "16px",
                }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      color: COLORS.amber,
                      fontFamily: FONT,
                      fontSize: "11px",
                      padding: "2px 8px",
                      border: `1px solid ${COLORS.amber}44`,
                      borderRadius: "2px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                style={{
                  color: COLORS.green,
                  fontFamily: FONT,
                  fontSize: "13px",
                  opacity: 0.6,
                }}
              >
                {">"} open {project.name.toLowerCase().replace(/\s/g, "-")}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5: Tech Stack (Neofetch)
   ═══════════════════════════════════════════════════════════════════════════ */

function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const asciiLogo = [
    "  ██████╗ ",
    "  ██╔══██╗",
    "  ██║  ██║",
    "  ██║  ██║",
    "  ██████╔╝",
    "  ╚═════╝ ",
  ];

  const stats = [
    { label: "OS", value: "Descomplicai v2.6", color: COLORS.green },
    { label: "Host", value: "Figueira da Foz, PT", color: COLORS.green },
    { label: "Kernel", value: "Next.js 15", color: COLORS.green },
    { label: "Shell", value: "TypeScript 5", color: COLORS.green },
    { label: "DE", value: "Tailwind CSS v4", color: COLORS.green },
    { label: "WM", value: "Framer Motion", color: COLORS.green },
    { label: "Terminal", value: "Claude AI", color: COLORS.green },
    { label: "CPU", value: "React 19 @ \u221e GHz", color: COLORS.green },
    { label: "Memory", value: "52,847 lines", color: COLORS.green },
    { label: "Uptime", value: "2019-present", color: COLORS.green },
  ];

  const paletteColors = [
    COLORS.red,
    COLORS.amber,
    COLORS.green,
    COLORS.cyan,
    "#8b5cf6",
    "#ec4899",
    "#f97316",
    "#6366f1",
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ neofetch</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <ASCIIBox>
          <div
            style={{
              display: "flex",
              gap: "40px",
              fontFamily: FONT,
              fontSize: "14px",
              flexWrap: "wrap",
            }}
          >
            {/* ASCII art D */}
            <div
              style={{
                color: COLORS.cyan,
                lineHeight: "1.2",
                flexShrink: 0,
                whiteSpace: "pre",
                fontSize: "16px",
              }}
            >
              {asciiLogo.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  {line}
                </motion.div>
              ))}
              <div
                style={{
                  color: COLORS.green,
                  fontSize: "12px",
                  marginTop: "4px",
                  textAlign: "center",
                }}
              >
                descomplicai
              </div>
            </div>

            {/* Stats */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  color: COLORS.cyan,
                  fontWeight: 700,
                  marginBottom: "8px",
                  fontSize: "15px",
                }}
              >
                jaime@descomplicai
              </div>
              <div
                style={{
                  color: COLORS.muted,
                  marginBottom: "12px",
                  fontSize: "12px",
                }}
              >
                --------------------
              </div>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  style={{
                    display: "flex",
                    gap: "8px",
                    lineHeight: "1.8",
                  }}
                >
                  <span style={{ color: COLORS.cyan, fontWeight: 700 }}>
                    {stat.label}:
                  </span>
                  <span style={{ color: stat.color }}>{stat.value}</span>
                </motion.div>
              ))}

              {/* Color blocks */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginTop: "16px",
                }}
              >
                {paletteColors.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: c,
                      borderRadius: "2px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ASCIIBox>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6: Git Log (Timeline)
   ═══════════════════════════════════════════════════════════════════════════ */

function GitLogTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ git log --oneline --graph</SectionTitle>

      <div style={{ fontFamily: FONT, fontSize: "14px" }}>
        {GIT_LOG.map((entry, i) => (
          <motion.div
            key={entry.hash}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.12 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              padding: "8px 0",
              flexWrap: "wrap",
            }}
          >
            {/* Graph character */}
            <span style={{ color: COLORS.green, flexShrink: 0 }}>*</span>

            {/* Hash */}
            <span style={{ color: COLORS.amber, flexShrink: 0 }}>
              {entry.hash}
            </span>

            {/* Date */}
            <span style={{ color: COLORS.cyan, flexShrink: 0 }}>
              {entry.date}
            </span>

            {/* Separator */}
            <span style={{ color: COLORS.muted }}>|</span>

            {/* Message */}
            <span style={{ color: COLORS.green }}>{entry.message}</span>

            {/* Branch */}
            {entry.branch && (
              <span
                style={{
                  color: COLORS.red,
                  fontSize: "12px",
                  padding: "1px 6px",
                  border: `1px solid ${COLORS.red}44`,
                  borderRadius: "2px",
                }}
              >
                ({entry.branch})
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7: Manifesto
   ═══════════════════════════════════════════════════════════════════════════ */

function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { key: "HUMANS_FIRST", value: "true" },
    { key: "AUTHENTIC_LIFE", value: "true" },
    { key: "LOVE_IN_CODE", value: "true" },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ cat /philosophy/manifesto.txt</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <ASCIIBox
          style={{
            textAlign: "center",
            padding: "48px 32px",
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: "clamp(18px, 3vw, 28px)",
              color: COLORS.green,
              lineHeight: "1.8",
              marginBottom: "24px",
            }}
          >
            <GlitchText>{'"O futuro e humano.'}</GlitchText>
            <br />
            <span style={{ color: COLORS.cyan }}>
              A tecnologia e o caminho.
            </span>
            <br />
            <span style={{ color: COLORS.amber }}>
              O codigo e a linguagem.
            </span>
            <br />
            <GlitchText
              style={{ color: COLORS.green }}
            >
              {'O amor e o proposito."'}
            </GlitchText>
          </div>

          <div
            style={{
              color: COLORS.muted,
              fontFamily: FONT,
              fontSize: "14px",
              marginBottom: "40px",
            }}
          >
            -- Jaime Silva, 2026
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.15 }}
                style={{
                  fontFamily: FONT,
                  fontSize: "13px",
                }}
              >
                <span style={{ color: COLORS.cyan }}>export </span>
                <span style={{ color: COLORS.amber }}>{v.key}</span>
                <span style={{ color: COLORS.muted }}>=</span>
                <span style={{ color: COLORS.green }}>{v.value}</span>
              </motion.div>
            ))}
          </div>
        </ASCIIBox>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8: Contact
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const options = [
    {
      flag: "--email",
      value: "jdsds.pt@gmail.com",
      href: "mailto:jdsds.pt@gmail.com",
    },
    {
      flag: "--github",
      value: "github.com/DjimieSilva",
      href: "https://github.com/DjimieSilva",
    },
    {
      flag: "--linkedin",
      value: "linkedin.com/in/jaime-silva",
      href: "https://linkedin.com/in/jaime-silva",
    },
    {
      flag: "--whatsapp",
      value: "+351 XXX XXX XXX",
      href: "https://wa.me/351000000000",
    },
    {
      flag: "--meeting",
      value: "calendly.com/descomplicai",
      href: "https://calendly.com/descomplicai",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ ./contact --help</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <ASCIIBox>
          <div style={{ fontFamily: FONT, fontSize: "14px" }}>
            <div style={{ color: COLORS.green, marginBottom: "16px" }}>
              USAGE: contact [OPTIONS]
            </div>
            <div style={{ color: COLORS.muted, marginBottom: "16px" }}>
              OPTIONS:
            </div>

            {options.map((opt, i) => (
              <motion.a
                key={opt.flag}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "8px 12px",
                  textDecoration: "none",
                  borderRadius: "2px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${COLORS.green}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    color: COLORS.cyan,
                    width: "120px",
                    flexShrink: 0,
                  }}
                >
                  {opt.flag}
                </span>
                <span style={{ color: COLORS.green }}>{opt.value}</span>
              </motion.a>
            ))}

            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: `1px solid ${COLORS.muted}33`,
              }}
            >
              <div style={{ color: COLORS.muted, marginBottom: "8px" }}>
                EXAMPLES:
              </div>
              <div style={{ color: COLORS.green, marginBottom: "4px" }}>
                {'  $ contact --email "Ola, quero um site!"'}
              </div>
              <div style={{ color: COLORS.green }}>
                {"  $ contact --meeting --type=discovery"}
              </div>
            </div>
          </div>
        </ASCIIBox>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9: Interactive Terminal
   ═══════════════════════════════════════════════════════════════════════════ */

interface TerminalEntry {
  type: "input" | "output";
  content: string;
  color?: string;
}

function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: "output",
      content:
        "Bem-vindo ao terminal interativo Descomplicai. Escreve 'help' para ver os comandos disponiveis.",
      color: COLORS.muted,
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newEntries: TerminalEntry[] = [
        { type: "input", content: cmd },
      ];

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "exit") {
        newEntries.push({
          type: "output",
          content: "Obrigado pela visita! \uD83D\uDC4B",
          color: COLORS.amber,
        });
        newEntries.push({
          type: "output",
          content: "A redirecionar para /projetos em 2s...",
          color: COLORS.muted,
        });
        setHistory((prev) => [...prev, ...newEntries]);
        setTimeout(() => {
          window.location.href = "/projetos";
        }, 2000);
        return;
      }

      if (trimmed === "sudo rm -rf /") {
        newEntries.push({
          type: "output",
          content: "Nice try \uD83D\uDE0F",
          color: COLORS.red,
        });
        newEntries.push({
          type: "output",
          content: "Permission denied. Este terminal nao e assim tao perigoso.",
          color: COLORS.muted,
        });
      } else if (trimmed === "sudo" || trimmed.startsWith("sudo ")) {
        newEntries.push({
          type: "output",
          content:
            "Permission denied. Nao es root aqui, amigo.",
          color: COLORS.red,
        });
      } else if (trimmed === "ls") {
        newEntries.push({
          type: "output",
          content:
            "services/  projetos/  about.md  contact.md  manifesto.txt  .secret",
          color: COLORS.green,
        });
      } else if (trimmed === "cat .secret") {
        newEntries.push({
          type: "output",
          content: "O segredo e: nunca parar de criar. \u2728",
          color: COLORS.amber,
        });
      } else if (trimmed === "whoami") {
        newEntries.push({
          type: "output",
          content: "visitor (guest)",
          color: COLORS.green,
        });
      } else if (trimmed === "pwd") {
        newEntries.push({
          type: "output",
          content: "/home/visitor/descomplicai",
          color: COLORS.green,
        });
      } else if (trimmed === "date") {
        newEntries.push({
          type: "output",
          content: new Date().toString(),
          color: COLORS.green,
        });
      } else if (trimmed === "uptime") {
        newEntries.push({
          type: "output",
          content:
            "up since 2019, 7 years, load average: 0.42, 0.38, 0.35",
          color: COLORS.green,
        });
      } else if (trimmed === "neofetch") {
        newEntries.push({
          type: "output",
          content: "Faz scroll para cima para ver o neofetch completo!",
          color: COLORS.cyan,
        });
      } else if (TERMINAL_COMMANDS[trimmed]) {
        TERMINAL_COMMANDS[trimmed].forEach((line) => {
          newEntries.push({
            type: "output",
            content: line,
            color: COLORS.green,
          });
        });
      } else if (trimmed === "") {
        // Empty command, just add the input line
      } else {
        newEntries.push({
          type: "output",
          content: `bash: ${trimmed}: command not found. Type 'help' for available commands.`,
          color: COLORS.red,
        });
      }

      setHistory((prev) => [...prev, ...newEntries]);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        setCmdHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
      }
      executeCommand(input);
      setInput("");
    },
    [input, executeCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? cmdHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(cmdHistory[newIndex]);
        }
      }
    },
    [cmdHistory, historyIndex]
  );

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 5,
      }}
    >
      <SectionTitle>$ terminal</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          border: `1px solid ${COLORS.muted}44`,
          borderRadius: "6px",
          overflow: "hidden",
          background: COLORS.surface,
        }}
      >
        {/* Terminal title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: COLORS.surfaceLight,
            borderBottom: `1px solid ${COLORS.muted}33`,
          }}
        >
          <span style={{ color: COLORS.red, fontSize: "10px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.amber, fontSize: "10px" }}>{"\u25CF"}</span>
          <span style={{ color: COLORS.green, fontSize: "10px" }}>{"\u25CF"}</span>
          <span
            style={{
              color: COLORS.muted,
              fontSize: "12px",
              fontFamily: FONT,
              marginLeft: "8px",
            }}
          >
            visitor@descomplicai:~
          </span>
        </div>

        {/* Terminal output */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          style={{
            padding: "16px",
            maxHeight: "400px",
            overflowY: "auto",
            cursor: "text",
            fontFamily: FONT,
            fontSize: "13px",
            lineHeight: "1.8",
          }}
        >
          {history.map((entry, i) => (
            <div key={i}>
              {entry.type === "input" ? (
                <div>
                  <span style={{ color: COLORS.cyan }}>
                    visitor@descomplicai
                  </span>
                  <span style={{ color: COLORS.muted }}>:</span>
                  <span style={{ color: COLORS.cyan }}>~</span>
                  <span style={{ color: COLORS.muted }}>$ </span>
                  <span style={{ color: COLORS.green }}>{entry.content}</span>
                </div>
              ) : (
                <div
                  style={{
                    color: entry.color || COLORS.green,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {entry.content}
                </div>
              )}
            </div>
          ))}

          {/* Input line */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "4px",
            }}
          >
            <span style={{ color: COLORS.cyan, flexShrink: 0 }}>
              visitor@descomplicai
            </span>
            <span style={{ color: COLORS.muted, flexShrink: 0 }}>:</span>
            <span style={{ color: COLORS.cyan, flexShrink: 0 }}>~</span>
            <span style={{ color: COLORS.muted, flexShrink: 0 }}>$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: COLORS.green,
                fontFamily: FONT,
                fontSize: "13px",
                caretColor: COLORS.green,
                padding: 0,
              }}
            />
          </form>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer
      style={{
        padding: "60px 24px",
        textAlign: "center",
        fontFamily: FONT,
        position: "relative",
        zIndex: 5,
        borderTop: `1px solid ${COLORS.muted}22`,
      }}
    >
      <div
        style={{
          color: COLORS.muted,
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        <span style={{ color: COLORS.red }}>$ exit</span>
        <span style={{ color: COLORS.muted }}>
          {" "}
          — Session terminated.{" "}
        </span>
        <span style={{ color: COLORS.muted }}>&copy; 2026 Descomplicai</span>
      </div>
      <div
        style={{
          color: COLORS.muted,
          fontSize: "12px",
          opacity: 0.6,
        }}
      >
        Feito com {"\uD83D\uDC9A"} e Claude
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES (injected via style tag)
   ═══════════════════════════════════════════════════════════════════════════ */

function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* ── Matrix Rain Animation ────────────────────────────────── */
          @keyframes matrixFall {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }

          /* ── Cursor Blink ─────────────────────────────────────────── */
          @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          /* ── Scanline Move ────────────────────────────────────────── */
          @keyframes scanlineMove {
            0% { top: 0; }
            100% { top: 100vh; }
          }

          /* ── Glitch Effects ───────────────────────────────────────── */
          @keyframes glitch1 {
            0% { transform: translateX(0); }
            20% { transform: translateX(-3px); }
            40% { transform: translateX(3px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(2px); }
            100% { transform: translateX(0); }
          }

          @keyframes glitch2 {
            0% { transform: translateX(0); }
            20% { transform: translateX(3px); }
            40% { transform: translateX(-2px); }
            60% { transform: translateX(1px); }
            80% { transform: translateX(-3px); }
            100% { transform: translateX(0); }
          }

          /* ── Responsive Navigation ────────────────────────────────── */
          @media (max-width: 768px) {
            .nav-desktop {
              display: none !important;
            }
            .nav-mobile-btn {
              display: block !important;
            }
          }
          @media (min-width: 769px) {
            .nav-mobile-dropdown {
              display: none !important;
            }
          }

          /* ── Scrollbar Styling ────────────────────────────────────── */
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #0a0a0a;
          }
          ::-webkit-scrollbar-thumb {
            background: #4b556344;
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #22c55e44;
          }

          /* ── Selection Color ──────────────────────────────────────── */
          ::selection {
            background: #22c55e33;
            color: #22c55e;
          }

          /* ── Smooth Scrolling ─────────────────────────────────────── */
          html {
            scroll-behavior: smooth;
          }
        `,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function DescomplicaiTerminalPage() {
  return (
    <div
      style={{
        backgroundColor: COLORS.bg,
        minHeight: "100vh",
        fontFamily: FONT,
        color: COLORS.green,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlobalStyles />
      <MatrixRainBackground />
      <ScanlinesOverlay />
      <GreenScanline />
      <NavigationBar />

      <main>
        <BootSequenceHero />
        <SystemStatus />
        <ProjectDatabase />
        <FeaturedProjects />
        <TechStack />
        <GitLogTimeline />
        <Manifesto />
        <ContactSection />
        <InteractiveTerminal />
      </main>

      <Footer />
    </div>
  );
}
