"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useInView,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";

/* ==========================================================================
   DESCOMPLICAI COSMOS v2.0 — Complete Rewrite

   A deep-space themed homepage with:
   - Persistent star field with scroll parallax
   - Shifting nebula system that changes color temperature
   - Seamless section transitions via continuous gradient backgrounds
   - 8 immersive sections that flow into each other
   - Mouse-driven parallax on hero
   - SVG constellation animations
   - Orbital animations for services
   - Scattered project cards at different depths
   - Animated process path with scroll-driven rocket
   - Full accessibility and responsive design
   ========================================================================== */

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  size: number;
  color1: string;
  color2: string;
  animationDuration: number;
  animationDelay: number;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

// ---------------------------------------------------------------------------
// SEED-BASED RANDOM (stable across renders)
// ---------------------------------------------------------------------------

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const SECTION_IDS = [
  "hero",
  "quem-somos",
  "servicos",
  "projetos",
  "portfolio",
  "manifesto",
  "processo",
  "contacto",
] as const;

const SECTION_LABELS = [
  "Inicio",
  "Quem Somos",
  "Servicos",
  "Projetos",
  "Portfolio",
  "Manifesto",
  "Processo",
  "Contacto",
];

const SERVICES = [
  {
    emoji: "\u{1F680}",
    title: "Presenca Digital",
    subtitle: "Sites, portfolios, landing pages que impressionam",
    description:
      "Criamos presencas digitais que comunicam a tua essencia. Design moderno, rapido e otimizado para converter visitantes em clientes.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    stat: "25 sites para negocios locais",
    gradient: ["#2563eb", "#06b6d4"],
    orbitColor: "#06b6d4",
  },
  {
    emoji: "\u{1F916}",
    title: "IA & Automacao",
    subtitle: "Sistemas inteligentes que trabalham por ti",
    description:
      "Workflows inteligentes, chatbots e automacoes que libertam o teu tempo para o que realmente importa. A inteligencia artificial ao teu servico.",
    tags: ["Claude API", "Python", "ChromaDB"],
    stat: "37 cron jobs ativos",
    gradient: ["#7c3aed", "#ec4899"],
    orbitColor: "#a855f7",
  },
  {
    emoji: "\u{1F3AF}",
    title: "Mentoria 1:1",
    subtitle: "Sessoes personalizadas de crescimento digital",
    description:
      "Orientacao digital personalizada do conceito ao lancamento. Sessoes individuais focadas nos teus objetivos, ao teu ritmo.",
    tags: ["Estrategia", "Formacao", "Acompanhamento"],
    stat: "Resultados em 30 dias",
    gradient: ["#059669", "#10b981"],
    orbitColor: "#22c55e",
  },
];

const FEATURED_PROJECTS = [
  {
    name: "RPG Quest",
    slug: "rpg-quest",
    emoji: "\u{1F3AE}",
    description: "RPG 2D com 15 NPCs e 8 quests",
    color: "#f59e0b",
    depth: 1,
    position: { top: "5%", left: "8%" },
  },
  {
    name: "Chronicle",
    slug: "chronicle",
    emoji: "\u{1F4DC}",
    description: "8 capitulos parallax cinematograficos",
    color: "#8b5cf6",
    depth: 0.8,
    position: { top: "2%", left: "55%" },
  },
  {
    name: "Fractal Explorer",
    slug: "fractal-explorer",
    emoji: "\u{1F300}",
    description: "Zoom infinito no Mandelbrot",
    color: "#ec4899",
    depth: 1.2,
    position: { top: "30%", left: "15%" },
  },
  {
    name: "Synth",
    slug: "synth",
    emoji: "\u{1F3B9}",
    description: "Sintetizador com ADSR e oscilloscope",
    color: "#06b6d4",
    depth: 0.9,
    position: { top: "25%", left: "62%" },
  },
  {
    name: "Chess",
    slug: "chess",
    emoji: "\u265F\uFE0F",
    description: "Xadrez completo com todas as regras",
    color: "#22c55e",
    depth: 1.1,
    position: { top: "55%", left: "5%" },
  },
  {
    name: "Mapa Portugal",
    slug: "mapa-portugal",
    emoji: "\u{1F5FA}\uFE0F",
    description: "20 distritos SVG interativos",
    color: "#ef4444",
    depth: 0.7,
    position: { top: "50%", left: "50%" },
  },
  {
    name: "Generative Art",
    slug: "generative-art",
    emoji: "\u{1F3A8}",
    description: "8 algoritmos de arte com codigo",
    color: "#f97316",
    depth: 1.3,
    position: { top: "75%", left: "25%" },
  },
  {
    name: "Particle Sim",
    slug: "particle-sim",
    emoji: "\u269B\uFE0F",
    description: "Simulador de N corpos com Verlet",
    color: "#14b8a6",
    depth: 0.85,
    position: { top: "72%", left: "68%" },
  },
];

const PORTFOLIO_CATEGORIES = [
  {
    label: "Restaurantes",
    emoji: "\u{1F37D}\uFE0F",
    count: 18,
    accentColor: "#f59e0b",
    items: [
      { name: "Cacarola", slug: "cacarola" },
      { name: "Mesa dos Amigos", slug: "mesa-dos-amigos" },
      { name: "Tasca da Praia", slug: "tasca-da-praia" },
      { name: "Sabor Abencoado", slug: "sabor-abencoado" },
      { name: "Marisqueira Rosa Amelia", slug: "marisqueira-rosa-amelia" },
      { name: "Tasca Dentro", slug: "tasca-dentro" },
      { name: "Pe na Areia", slug: "pe-na-areia" },
      { name: "Vindima Selvagem", slug: "vindima-selvagem" },
      { name: "O Cantinho", slug: "o-cantinho" },
      { name: "Churrascaria Figueirense", slug: "churrascaria-figueirense" },
    ],
  },
  {
    label: "Clinicas",
    emoji: "\u{1F3E5}",
    count: 9,
    accentColor: "#14b8a6",
    items: [
      { name: "Alba Saude Dentaria", slug: "alba-saude-dentaria" },
      { name: "Premium Clinica", slug: "premium-clinica-dentaria" },
      { name: "FozClinica", slug: "fozclinica" },
      { name: "Clinica Tamargueira", slug: "clinica-tamargueira" },
      { name: "DentalKid", slug: "dentalkid" },
      { name: "Clinica Quiaios", slug: "clinica-dentaria-quiaios" },
    ],
  },
  {
    label: "Ferramentas",
    emoji: "\u{1F6E0}\uFE0F",
    count: 35,
    accentColor: "#06b6d4",
    items: [
      { name: "Fractal Explorer", slug: "fractal-explorer" },
      { name: "Synth", slug: "synth" },
      { name: "Chess", slug: "chess" },
      { name: "Pomodoro", slug: "pomodoro" },
      { name: "Calculator", slug: "calculator" },
      { name: "Drawing Canvas", slug: "drawing-canvas" },
      { name: "Markdown Editor", slug: "markdown-editor" },
      { name: "JSON Formatter", slug: "json-formatter" },
      { name: "Color Picker", slug: "color-picker" },
      { name: "QR Generator", slug: "qr-generator" },
    ],
  },
  {
    label: "Experiencias",
    emoji: "\u{1F3AE}",
    count: 15,
    accentColor: "#a855f7",
    items: [
      { name: "Generative Art", slug: "generative-art" },
      { name: "Particle Sim", slug: "particle-sim" },
      { name: "Solar System", slug: "solar-system" },
      { name: "Globe Explorer", slug: "globe-explorer" },
      { name: "Aurora Borealis", slug: "aurora-borealis" },
      { name: "Music Visualizer", slug: "music-visualizer" },
      { name: "RPG Quest", slug: "rpg-quest" },
      { name: "Chronicle", slug: "chronicle" },
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: 1,
    emoji: "\u{1F6F8}",
    title: "Contacto",
    description:
      "Conversa inicial para perceber o que precisas. Ouvimos a tua visao, os teus objetivos e o que te move.",
  },
  {
    number: 2,
    emoji: "\u{1F4D0}",
    title: "Pesquisa",
    description:
      "Analise, wireframes, estrategia e definicao de metas. Estudamos o mercado e as melhores praticas.",
  },
  {
    number: 3,
    emoji: "\u{1F680}",
    title: "Construcao",
    description:
      "Desenvolvimento agil com entregas constantes. Codigo limpo, rapido e feito para durar.",
  },
  {
    number: 4,
    emoji: "\u{1F31F}",
    title: "Lancamento",
    description:
      "Deploy, otimizacao e acompanhamento continuo. O teu projeto no ar, com suporte dedicado.",
  },
];

const CONTACT_METHODS = [
  {
    emoji: "\u{1F4E7}",
    title: "Email",
    value: "jdsds.pt@gmail.com",
    href: "mailto:jdsds.pt@gmail.com",
    color: "#06b6d4",
  },
  {
    emoji: "\u{1F4F1}",
    title: "WhatsApp",
    value: "Mensagem direta",
    href: "https://wa.me/351916894498",
    color: "#22c55e",
  },
  {
    emoji: "\u{1F419}",
    title: "GitHub",
    value: "DjimieSilva",
    href: "https://github.com/DjimieSilva",
    color: "#8b5cf6",
  },
  {
    emoji: "\u{1F4BC}",
    title: "LinkedIn",
    value: "jaime-djimie-silva",
    href: "https://linkedin.com/in/jaime-djimie-silva",
    color: "#3b82f6",
  },
];

// ---------------------------------------------------------------------------
// STAR / NEBULA / PARTICLE GENERATORS (memoized with seed)
// ---------------------------------------------------------------------------

function generateStars(count: number, seed: number): Star[] {
  const rand = seededRandom(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2.5 + 0.5,
      delay: rand() * 8,
      duration: rand() * 6 + 2,
      opacity: rand() * 0.6 + 0.2,
    });
  }
  return stars;
}

function generateNebulae(seed: number): Nebula[] {
  const rand = seededRandom(seed);
  return [
    {
      id: 0,
      x: 15 + rand() * 10,
      y: 10 + rand() * 5,
      size: 500 + rand() * 200,
      color1: "rgba(59, 130, 246, 0.08)",
      color2: "rgba(139, 92, 246, 0.04)",
      animationDuration: 25 + rand() * 10,
      animationDelay: 0,
    },
    {
      id: 1,
      x: 65 + rand() * 15,
      y: 25 + rand() * 10,
      size: 400 + rand() * 150,
      color1: "rgba(168, 85, 247, 0.06)",
      color2: "rgba(236, 72, 153, 0.03)",
      animationDuration: 30 + rand() * 10,
      animationDelay: 5,
    },
    {
      id: 2,
      x: 30 + rand() * 20,
      y: 55 + rand() * 10,
      size: 550 + rand() * 200,
      color1: "rgba(20, 184, 166, 0.06)",
      color2: "rgba(16, 185, 129, 0.03)",
      animationDuration: 35 + rand() * 10,
      animationDelay: 10,
    },
    {
      id: 3,
      x: 70 + rand() * 15,
      y: 75 + rand() * 10,
      size: 450 + rand() * 180,
      color1: "rgba(245, 158, 11, 0.06)",
      color2: "rgba(234, 88, 12, 0.03)",
      animationDuration: 28 + rand() * 10,
      animationDelay: 15,
    },
  ];
}

function generateParticles(count: number, seed: number): FloatingParticle[] {
  const rand = seededRandom(seed);
  const particles: FloatingParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 3 + 1,
      duration: rand() * 20 + 15,
      delay: rand() * 10,
      drift: (rand() - 0.5) * 40,
    });
  }
  return particles;
}

// ---------------------------------------------------------------------------
// GLOBAL STYLES (injected via <style>)
// ---------------------------------------------------------------------------

const globalStyles = `
  /* ---- RESET & BASE ---- */
  .cosmos-root {
    font-family: var(--font-inter, 'Inter', system-ui, sans-serif);
    background: #030014;
    color: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .cosmos-root * { box-sizing: border-box; }
  .cosmos-heading {
    font-family: var(--font-sora, 'Sora', system-ui, sans-serif);
  }

  /* ---- STAR TWINKLE ---- */
  @keyframes cosmosTwinkle {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 1; }
  }

  /* ---- NEBULA DRIFT VARIANTS ---- */
  @keyframes nebulaDrift0 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    25% { transform: translate(30px, -20px) scale(1.05); opacity: 0.8; }
    50% { transform: translate(-15px, 25px) scale(0.95); opacity: 0.5; }
    75% { transform: translate(20px, 10px) scale(1.03); opacity: 0.7; }
  }
  @keyframes nebulaDrift1 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    25% { transform: translate(-25px, 20px) scale(1.08); opacity: 0.7; }
    50% { transform: translate(18px, -30px) scale(0.92); opacity: 0.4; }
    75% { transform: translate(-10px, -15px) scale(1.02); opacity: 0.65; }
  }
  @keyframes nebulaDrift2 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
    33% { transform: translate(20px, 25px) scale(0.96); opacity: 0.75; }
    66% { transform: translate(-30px, -15px) scale(1.04); opacity: 0.45; }
  }
  @keyframes nebulaDrift3 {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    30% { transform: translate(-20px, -25px) scale(1.06); opacity: 0.7; }
    60% { transform: translate(25px, 15px) scale(0.94); opacity: 0.4; }
  }

  /* ---- FLOATING PARTICLES ---- */
  @keyframes cosmosFloat {
    0% { transform: translateY(0px) translateX(0px); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-120px) translateX(var(--drift, 20px)); opacity: 0; }
  }

  /* ---- ORBIT ANIMATIONS ---- */
  @keyframes cosmosOrbit1 {
    0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
  }
  @keyframes cosmosOrbit2 {
    0% { transform: rotate(120deg) translateX(280px) rotate(-120deg); }
    100% { transform: rotate(480deg) translateX(280px) rotate(-480deg); }
  }
  @keyframes cosmosOrbit3 {
    0% { transform: rotate(240deg) translateX(240px) rotate(-240deg); }
    100% { transform: rotate(600deg) translateX(240px) rotate(-600deg); }
  }
  @keyframes cosmosOrbitMobile1 {
    0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
  }
  @keyframes cosmosOrbitMobile2 {
    0% { transform: rotate(120deg) translateX(150px) rotate(-120deg); }
    100% { transform: rotate(480deg) translateX(150px) rotate(-480deg); }
  }
  @keyframes cosmosOrbitMobile3 {
    0% { transform: rotate(240deg) translateX(135px) rotate(-240deg); }
    100% { transform: rotate(600deg) translateX(135px) rotate(-600deg); }
  }

  /* ---- SHOOTING STAR ---- */
  @keyframes shootingStar {
    0% { transform: translateX(0) translateY(0); opacity: 0; width: 0; }
    5% { opacity: 1; width: 80px; }
    15% { opacity: 1; }
    30% { transform: translateX(300px) translateY(200px); opacity: 0; width: 120px; }
    100% { transform: translateX(300px) translateY(200px); opacity: 0; width: 0; }
  }

  /* ---- TYPING CURSOR ---- */
  @keyframes cosmosBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ---- GLOW PULSE ---- */
  @keyframes cosmosGlowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.2), 0 0 40px rgba(6, 182, 212, 0.1); }
    50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2); }
  }

  /* ---- SVG DASH FLOW ---- */
  @keyframes cosmosDashFlow {
    0% { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 0; }
  }

  /* ---- PLANET ROTATE ---- */
  @keyframes cosmosPlanetRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ---- SATELLITE ORBIT ---- */
  @keyframes cosmosSatellite {
    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  @keyframes cosmosSatelliteSmall {
    0% { transform: rotate(0deg) translateX(65px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(65px) rotate(-360deg); }
  }

  /* ---- CONSTELLATION GLOW ---- */
  @keyframes cosmosNodeGlow {
    0%, 100% { filter: drop-shadow(0 0 4px currentColor); }
    50% { filter: drop-shadow(0 0 12px currentColor); }
  }

  /* ---- AURORA ---- */
  @keyframes cosmosAurora {
    0% { transform: translateX(-30%) skewX(-5deg); opacity: 0.3; }
    25% { transform: translateX(-10%) skewX(2deg); opacity: 0.5; }
    50% { transform: translateX(10%) skewX(-3deg); opacity: 0.35; }
    75% { transform: translateX(-5%) skewX(4deg); opacity: 0.45; }
    100% { transform: translateX(-30%) skewX(-5deg); opacity: 0.3; }
  }
  @keyframes cosmosAurora2 {
    0% { transform: translateX(20%) skewX(3deg); opacity: 0.2; }
    33% { transform: translateX(-15%) skewX(-4deg); opacity: 0.4; }
    66% { transform: translateX(5%) skewX(2deg); opacity: 0.25; }
    100% { transform: translateX(20%) skewX(3deg); opacity: 0.2; }
  }

  /* ---- BOUNCE DOWN ---- */
  @keyframes cosmosBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(12px); }
  }

  /* ---- GRADIENT TEXT ---- */
  .cosmos-gradient-text {
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #8b5cf6 50%, #06b6d4 75%, #3b82f6 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: cosmosGradientShift 8s ease-in-out infinite;
  }
  @keyframes cosmosGradientShift {
    0% { background-position: 0% center; }
    50% { background-position: 100% center; }
    100% { background-position: 0% center; }
  }

  /* ---- GLASSMORPHISM ---- */
  .cosmos-glass {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .cosmos-glass-strong {
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* ---- SCROLLBAR ---- */
  .cosmos-root::-webkit-scrollbar { width: 5px; }
  .cosmos-root::-webkit-scrollbar-track { background: transparent; }
  .cosmos-root::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #2563eb, #8b5cf6, #06b6d4);
    border-radius: 4px;
  }

  /* ---- SELECTION ---- */
  .cosmos-root ::selection {
    background: rgba(139, 92, 246, 0.4);
    color: #ffffff;
  }

  /* ---- ORBIT RING ---- */
  @keyframes cosmosOrbitRingSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ---- BUTTON ORBIT DOT ---- */
  @keyframes cosmosBtnOrbit {
    0% { transform: rotate(0deg) translateX(calc(50% + 20px)) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(calc(50% + 20px)) rotate(-360deg); }
  }

  /* ---- PROCESS PATH DASH ---- */
  @keyframes cosmosPathDash {
    0% { stroke-dashoffset: 12; }
    100% { stroke-dashoffset: 0; }
  }

  /* ---- STATION PULSE RING ---- */
  @keyframes cosmosStationPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.3); opacity: 0; }
  }

  /* ---- GRADIENT BORDER ANIMATION ---- */
  @keyframes cosmosGradientBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ---- REDUCED MOTION ---- */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// ---------------------------------------------------------------------------
// HOOKS
// ---------------------------------------------------------------------------

function useMouseParallax(strength: number = 10) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          mouseX.set(((e.clientX - centerX) / centerX) * -strength);
          mouseY.set(((e.clientY - centerY) / centerY) * -strength);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, mouseX, mouseY]);

  return { x: smoothX, y: smoothY };
}

function useTypingEffect(text: string, speed: number = 40, delay: number = 1200) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    setDisplayed("");

    timeout = setTimeout(() => {
      const type = () => {
        if (charIndex < text.length) {
          setDisplayed(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setTimeout(() => setShowCursor(true), 500);
        }
      };
      type();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, showCursor };
}

function useCountUp(
  end: number,
  duration: number = 2000,
  inView: boolean = false
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return count;
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Persistent Layers
// ---------------------------------------------------------------------------

/* ---- PERSISTENT STAR FIELD ---- */
function PersistentStarField({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const stars = useMemo(() => generateStars(200, 42), []);
  const parallaxY = useTransform(scrollY, [0, 10000], [0, -500]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        y: parallaxY,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: `rgba(255, 255, 255, ${star.opacity})`,
            animation: `cosmosTwinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            willChange: "opacity",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ---- PERSISTENT NEBULA SYSTEM ---- */
function PersistentNebulae({ scrollY }: { scrollY: ReturnType<typeof useScroll>["scrollY"] }) {
  const nebulae = useMemo(() => generateNebulae(99), []);
  const parallaxY = useTransform(scrollY, [0, 10000], [0, -800]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        y: parallaxY,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {nebulae.map((n) => (
        <div
          key={n.id}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.size,
            height: n.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${n.color1} 0%, ${n.color2} 40%, transparent 70%)`,
            animation: `nebulaDrift${n.id} ${n.animationDuration}s ease-in-out infinite`,
            animationDelay: `${n.animationDelay}s`,
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ---- FLOATING PARTICLES ---- */
function FloatingParticles() {
  const particles = useMemo(() => generateParticles(30, 77), []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.3)",
            animation: `cosmosFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ---- SCROLL PROGRESS BAR ---- */
function ScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useSpring(progress as MotionValue<number>, { stiffness: 80, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 60,
        background: "linear-gradient(90deg, #2563eb, #06b6d4, #10b981, #f59e0b)",
        transformOrigin: "0%",
        scaleX,
      }}
      aria-hidden="true"
    />
  );
}

/* ---- NAVIGATION DOTS ---- */
function NavigationDots({
  activeSection,
  onNavigate,
}: {
  activeSection: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <nav
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
      aria-label="Navegacao por seccoes"
      className="hidden lg:flex"
    >
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() => onNavigate(i)}
          aria-label={`Ir para ${SECTION_LABELS[i]}`}
          aria-current={activeSection === i ? "true" : undefined}
          title={SECTION_LABELS[i]}
          style={{
            width: activeSection === i ? 12 : 8,
            height: activeSection === i ? 12 : 8,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background:
              activeSection === i
                ? "linear-gradient(135deg, #06b6d4, #8b5cf6)"
                : "rgba(255, 255, 255, 0.25)",
            boxShadow:
              activeSection === i
                ? "0 0 12px rgba(6, 182, 212, 0.6), 0 0 24px rgba(139, 92, 246, 0.3)"
                : "none",
            padding: 0,
          }}
        />
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Navigation
// ---------------------------------------------------------------------------

function Navigation({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bgOpacity = useTransform(scrollProgress, [0, 0.05], [0, 0.8]);
  const borderOpacity = useTransform(scrollProgress, [0, 0.05], [0, 0.1]);

  const navLinks = [
    { label: "Servicos", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#quem-somos" },
    { label: "Contacto", href: "#contacto" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 55,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(3, 0, 20, 1)`,
            opacity: bgOpacity,
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255, 255, 255, 0.05)",
            opacity: borderOpacity,
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="cosmos-heading cosmos-gradient-text"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            descomplicai
          </a>

          {/* Desktop links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                style={{
                  color: "rgba(255, 255, 255, 0.65)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255, 255, 255, 0.65)")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contacto");
            }}
            className="hidden md:flex"
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#06b6d4",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.1)",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(139, 92, 246, 0.25))";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(6, 182, 212, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15))";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(6, 182, 212, 0.1)";
            }}
          >
            Falar connosco
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden"
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              style={{
                width: 22,
                height: 2,
                background: "white",
                borderRadius: 2,
                transition: "all 0.3s",
                transform: mobileMenuOpen
                  ? "rotate(45deg) translateY(7px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "white",
                borderRadius: 2,
                transition: "all 0.3s",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "white",
                borderRadius: 2,
                transition: "all 0.3s",
                transform: mobileMenuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 54,
              background: "rgba(3, 0, 20, 0.95)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="cosmos-heading"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contacto");
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                padding: "12px 32px",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
                border: "1px solid rgba(6, 182, 212, 0.4)",
                color: "#06b6d4",
                fontSize: "1.1rem",
                fontWeight: 600,
                textDecoration: "none",
                marginTop: 16,
              }}
            >
              Falar connosco
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Shooting Star
// ---------------------------------------------------------------------------

function ShootingStar() {
  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        left: "10%",
        width: 100,
        height: 2,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
        borderRadius: 2,
        animation: "shootingStar 8s ease-in-out infinite",
        animationDelay: "3s",
        opacity: 0,
        transform: "rotate(35deg)",
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Aurora
// ---------------------------------------------------------------------------

function AuroraEffect({
  position = "bottom",
  colors = ["rgba(34, 197, 94, 0.12)", "rgba(139, 92, 246, 0.08)"],
}: {
  position?: "top" | "bottom";
  colors?: string[];
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-20%",
        right: "-20%",
        height: 120,
        ...(position === "bottom" ? { bottom: 0 } : { top: 0 }),
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent, ${colors[0]}, transparent)`,
          animation: "cosmosAurora 15s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent, ${colors[1]}, transparent)`,
          animation: "cosmosAurora2 18s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Section Wrapper
// ---------------------------------------------------------------------------

function SectionWrapper({
  id,
  children,
  className = "",
  style = {},
  minHeight = "100vh",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  minHeight?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Section Title
// ---------------------------------------------------------------------------

function SectionTitle({
  children,
  accent = "\u2726",
  delay = 0,
}: {
  children: React.ReactNode;
  accent?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: "center",
        marginBottom: 60,
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(139, 92, 246, 0.7)",
          marginBottom: 12,
        }}
      >
        {accent} {accent} {accent}
      </span>
      <h2
        className="cosmos-heading"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          background:
            "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h2>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: Wave Divider
// ---------------------------------------------------------------------------

function WaveDivider({
  flip = false,
  color = "rgba(139, 92, 246, 0.05)",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 120,
        ...(flip ? { top: -1 } : { bottom: -1 }),
        transform: flip ? "scaleY(-1)" : undefined,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <path
          d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
          fill={color}
        />
        <path
          d="M0,60 C360,10 720,110 1080,50 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SECTION 1: HERO
// ---------------------------------------------------------------------------

function HeroSection() {
  const mouse = useMouseParallax(10);
  const starMouse = useMouseParallax(5);
  const { displayed, showCursor } = useTypingEffect(
    "Tornamos a inteligencia artificial acessivel a pessoas e empresas.",
    35,
    1800
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const titleLetters = "descomplicai".split("");

  return (
    <SectionWrapper
      id="hero"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.06) 0%, transparent 60%)",
        justifyContent: "center",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* Shooting stars */}
      <ShootingStar />
      {/* Second shooting star */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "15%",
          width: 80,
          height: 1.5,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(139, 92, 246, 0.6), rgba(255,255,255,0))",
          borderRadius: 2,
          animation: "shootingStar 12s ease-in-out infinite",
          animationDelay: "7s",
          opacity: 0,
          transform: "rotate(42deg)",
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      />
      {/* Third shooting star */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "30%",
          width: 60,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(6, 182, 212, 0.5), rgba(255,255,255,0))",
          borderRadius: 2,
          animation: "shootingStar 15s ease-in-out infinite",
          animationDelay: "11s",
          opacity: 0,
          transform: "rotate(28deg)",
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      />

      {/* Planet */}
      <motion.div
        style={{
          position: "absolute",
          right: "5%",
          top: "15%",
          width: "clamp(180px, 25vw, 320px)",
          height: "clamp(180px, 25vw, 320px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #4f46e5, #1e1b4b 50%, #0f0a2e 80%)",
          boxShadow:
            "inset -30px -20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(79, 70, 229, 0.15), 0 0 160px rgba(79, 70, 229, 0.05)",
          x: mouse.x,
          y: mouse.y,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Atmosphere ring */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            animation: "cosmosPlanetRotate 120s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -16,
            borderRadius: "50%",
            border: "1px solid rgba(99, 102, 241, 0.06)",
            animation: "cosmosPlanetRotate 180s linear infinite reverse",
          }}
        />
      </motion.div>

      {/* Small asteroid / moon */}
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          bottom: "25%",
          width: "clamp(30px, 4vw, 50px)",
          height: "clamp(30px, 4vw, 50px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, #64748b, #334155 60%, #1e293b 90%)",
          boxShadow:
            "inset -5px -4px 10px rgba(0,0,0,0.5), 0 0 20px rgba(100, 116, 139, 0.1)",
          x: starMouse.x,
          y: starMouse.y,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Crater details */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "30%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "55%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "65%",
            left: "25%",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.12)",
          }}
        />
      </motion.div>

      {/* Distant galaxy cluster (top left) */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "20%",
          width: 60,
          height: 20,
          background:
            "radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(8px)",
          transform: "rotate(-15deg)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          maxWidth: 800,
          x: mouse.x,
          y: mouse.y,
        }}
      >
        {/* Title with letter-by-letter animation */}
        <h1
          className="cosmos-heading"
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="cosmos-gradient-text"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.05,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                textShadow:
                  "0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(139, 92, 246, 0.15), 0 0 120px rgba(6, 182, 212, 0.08), 0 0 200px rgba(139, 92, 246, 0.05)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom: 28,
          }}
        >
          Estrutura Digital &middot; Mentoria &middot; Inteligencia Artificial
        </motion.p>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#22c55e",
            fontFamily: "'Courier New', monospace",
            marginBottom: 48,
            minHeight: "1.8em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>{displayed}</span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.2em",
              background: "#22c55e",
              marginLeft: 2,
              animation: showCursor
                ? "cosmosBlink 1s step-end infinite"
                : "none",
              opacity: showCursor ? 1 : 0,
            }}
          />
        </motion.div>

        {/* Orbiting stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "relative",
            width: "clamp(280px, 50vw, 560px)",
            height: "clamp(280px, 50vw, 560px)",
            margin: "0 auto 48px",
          }}
          className="hidden md:block"
        >
          {/* Orbit rings */}
          <div
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "50%",
              border: "1px dashed rgba(255, 255, 255, 0.06)",
            }}
            aria-hidden="true"
          />
          <div
            style={{
              position: "absolute",
              inset: "0%",
              borderRadius: "50%",
              border: "1px dashed rgba(255, 255, 255, 0.04)",
            }}
            aria-hidden="true"
          />
          <div
            style={{
              position: "absolute",
              inset: "5%",
              borderRadius: "50%",
              border: "1px dashed rgba(255, 255, 255, 0.05)",
            }}
            aria-hidden="true"
          />

          {/* Center dot */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            }}
            aria-hidden="true"
          />

          {/* Stat 1 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
              animation: "cosmosOrbit1 20s linear infinite",
            }}
          >
            <div
              className="cosmos-glass"
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                padding: "10px 16px",
                borderRadius: 999,
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#06b6d4",
                animation: "cosmosGlowPulse 4s ease-in-out infinite",
              }}
            >
              109 Paginas
            </div>
          </div>

          {/* Stat 2 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
              animation: "cosmosOrbit2 28s linear infinite",
            }}
          >
            <div
              className="cosmos-glass"
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                padding: "10px 16px",
                borderRadius: 999,
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#a855f7",
              }}
            >
              55+ Projetos
            </div>
          </div>

          {/* Stat 3 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
              animation: "cosmosOrbit3 24s linear infinite",
            }}
          >
            <div
              className="cosmos-glass"
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                padding: "10px 16px",
                borderRadius: 999,
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#22c55e",
              }}
            >
              52K Linhas
            </div>
          </div>
        </motion.div>

        {/* Mobile stats (no orbit) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex md:hidden"
          style={{
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {[
            { label: "109 Paginas", color: "#06b6d4" },
            { label: "55+ Projetos", color: "#a855f7" },
            { label: "52K Linhas", color: "#22c55e" },
          ].map((s) => (
            <span
              key={s.label}
              className="cosmos-glass"
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: s.color,
              }}
            >
              {s.label}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <a
            href="#quem-somos"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#quem-somos")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cosmos-glass-strong"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              color: "rgba(255, 255, 255, 0.9)",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "all 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(6, 182, 212, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255, 255, 255, 0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Explorar o Universo
            <span
              style={{
                display: "inline-block",
                animation: "cosmosBounce 2s ease-in-out infinite",
              }}
            >
              &darr;
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom aurora transition */}
      <AuroraEffect
        position="bottom"
        colors={["rgba(34, 197, 94, 0.08)", "rgba(139, 92, 246, 0.06)"]}
      />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 2: QUEM SOMOS
// ---------------------------------------------------------------------------

function QuemSomosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const stat1 = useCountUp(109, 2500, statsInView);
  const stat2 = useCountUp(55, 2500, statsInView);
  const stat3 = useCountUp(25, 2500, statsInView);

  /* Constellation nodes */
  const constellationNodes = [
    { label: "IA", cx: 150, cy: 60, color: "#06b6d4" },
    { label: "Design", cx: 280, cy: 40, color: "#a855f7" },
    { label: "Codigo", cx: 350, cy: 150, color: "#22c55e" },
    { label: "Estrategia", cx: 280, cy: 260, color: "#f59e0b" },
    { label: "Pessoas", cx: 150, cy: 240, color: "#ec4899" },
    { label: "Simplicidade", cx: 80, cy: 150, color: "#06b6d4" },
  ];

  const constellationEdges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [0, 3], [1, 4], [2, 5],
  ];

  return (
    <SectionWrapper
      id="quem-somos"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(15, 23, 42, 0.3) 30%, rgba(15, 23, 42, 0.4) 70%, rgba(3, 0, 20, 0) 100%)",
      }}
    >
      {/* Top aurora */}
      <AuroraEffect
        position="top"
        colors={["rgba(34, 197, 94, 0.06)", "rgba(139, 92, 246, 0.04)"]}
      />

      <SectionTitle accent="\u2726">Quem Somos</SectionTitle>

      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 60,
          maxWidth: 1100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* LEFT: Constellation SVG */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: "1 1 400px",
            maxWidth: 440,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 420 300"
            style={{
              width: "100%",
              maxWidth: 420,
              height: "auto",
              overflow: "visible",
            }}
            aria-label="Constelacao de competencias"
          >
            {/* Edges */}
            {constellationEdges.map(([from, to], i) => (
              <line
                key={i}
                x1={constellationNodes[from].cx}
                y1={constellationNodes[from].cy}
                x2={constellationNodes[to].cx}
                y2={constellationNodes[to].cy}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="1"
                strokeDasharray="6 4"
                style={{
                  animation: `cosmosDashFlow 3s linear infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
            {/* Nodes */}
            {constellationNodes.map((node, i) => (
              <g key={i}>
                {/* Outer glow */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="20"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  opacity="0.2"
                  style={{
                    animation: `cosmosNodeGlow 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
                {/* Inner dot */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="5"
                  fill={node.color}
                  style={{
                    filter: `drop-shadow(0 0 6px ${node.color})`,
                  }}
                />
                {/* Label */}
                <text
                  x={node.cx}
                  y={node.cy + 32}
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.6)"
                  fontSize="11"
                  fontFamily="var(--font-inter, system-ui)"
                  fontWeight="500"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* RIGHT: Mission text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: "1 1 400px",
            maxWidth: 500,
          }}
        >
          <h3
            className="cosmos-heading"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 20,
              background:
                "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Descomplicamos a tecnologia para que tu possas focar no que importa.
          </h3>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
              color: "rgba(255, 255, 255, 0.55)",
              lineHeight: 1.8,
              marginBottom: 12,
            }}
          >
            Somos um estudio digital de Figueira da Foz que acredita que a
            tecnologia deve servir as pessoas, nao o contrario. Combinamos
            design, codigo e inteligencia artificial para criar experiencias
            digitais que fazem a diferenca.
          </p>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
              color: "rgba(255, 255, 255, 0.55)",
              lineHeight: 1.8,
            }}
          >
            Cada projeto e uma parceria. Cada linha de codigo tem intencao.
            Building in public, com transparencia e amor pelo que fazemos.
          </p>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 60,
          justifyContent: "center",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        {[
          {
            value: stat1,
            suffix: "",
            label: "Paginas Construidas",
            borderColor: "#06b6d4",
          },
          {
            value: stat2,
            suffix: "+",
            label: "Projetos Ativos",
            borderColor: "#a855f7",
          },
          {
            value: stat3,
            suffix: "",
            label: "Negocios Locais Digitalizados",
            borderColor: "#22c55e",
          },
          {
            value: 1,
            suffix: "",
            label: "Noite Epica de Building",
            borderColor: "#f59e0b",
            isSpecial: true,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="cosmos-glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={statsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            style={{
              flex: "1 1 200px",
              maxWidth: 240,
              padding: "24px 20px",
              borderRadius: 16,
              textAlign: "center",
              borderBottom: `2px solid ${stat.borderColor}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${stat.borderColor}, transparent)`,
              }}
            />
            <div
              className="cosmos-heading"
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: stat.borderColor,
                marginBottom: 4,
              }}
            >
              {"isSpecial" in stat ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.8,
                  }}
                >
                  {stat.value}
                </motion.span>
              ) : (
                <>
                  {stat.value}
                  {stat.suffix}
                </>
              )}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech Stack Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          marginTop: 60,
          width: "100%",
          maxWidth: 1100,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.25)",
              fontWeight: 600,
            }}
          >
            Tecnologias que dominamos
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {[
            { name: "Next.js", color: "#ffffff" },
            { name: "React", color: "#61dafb" },
            { name: "TypeScript", color: "#3178c6" },
            { name: "Tailwind CSS", color: "#06b6d4" },
            { name: "Node.js", color: "#68a063" },
            { name: "Python", color: "#ffd43b" },
            { name: "Claude API", color: "#d4a574" },
            { name: "Vercel", color: "#ffffff" },
            { name: "Supabase", color: "#3ecf8e" },
            { name: "Framer Motion", color: "#bb4bff" },
            { name: "GSAP", color: "#88ce02" },
            { name: "Figma", color: "#a259ff" },
            { name: "Git", color: "#f14e32" },
            { name: "PostgreSQL", color: "#336791" },
            { name: "ChromaDB", color: "#ff6b6b" },
            { name: "Docker", color: "#2496ed" },
          ].map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.04, duration: 0.3 }}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: "0.72rem",
                fontWeight: 600,
                background: `${tech.color}08`,
                color: `${tech.color}cc`,
                border: `1px solid ${tech.color}18`,
                letterSpacing: "0.02em",
              }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Testimonial / Building in Public badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          marginTop: 48,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          className="cosmos-glass"
          style={{
            padding: "24px 32px",
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #22c55e, transparent)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#22c55e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {"\u{1F7E2}"} Building in Public
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(255, 255, 255, 0.5)",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            &ldquo;Partilhamos cada passo da nossa jornada. Os erros ensinam, as
            vitorias inspiram. Transparencia e o nosso principio
            fundamental.&rdquo;
          </p>
          <p
            style={{
              fontSize: "0.78rem",
              color: "rgba(255, 255, 255, 0.3)",
              marginTop: 12,
            }}
          >
            &mdash; Jaime Silva, Fundador
          </p>
        </div>
      </motion.div>

      <WaveDivider color="rgba(88, 28, 135, 0.04)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 3: SERVICOS
// ---------------------------------------------------------------------------

function ServicosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="servicos"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(30, 10, 60, 0.15) 40%, rgba(30, 10, 60, 0.15) 60%, rgba(3, 0, 20, 0) 100%)",
      }}
    >
      <SectionTitle>O que fazemos</SectionTitle>

      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
          maxWidth: 1100,
          width: "100%",
          position: "relative",
        }}
      >
        {/* SVG connecting lines (desktop only) */}
        <svg
          className="hidden lg:block"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <line
            x1="25%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="1"
            strokeDasharray="6 4"
            style={{ animation: "cosmosDashFlow 3s linear infinite" }}
          />
          <line
            x1="50%"
            y1="50%"
            x2="75%"
            y2="50%"
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="1"
            strokeDasharray="6 4"
            style={{
              animation: "cosmosDashFlow 3s linear infinite",
              animationDelay: "1s",
            }}
          />
        </svg>

        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.15,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHoveredService(i)}
            onMouseLeave={() => setHoveredService(null)}
            style={{
              flex: "1 1 300px",
              maxWidth: 340,
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              cursor: "default",
            }}
          >
            {/* Planet circle */}
            <div
              style={{
                position: "relative",
                width: "clamp(140px, 18vw, 180px)",
                height: "clamp(140px, 18vw, 180px)",
                margin: "0 auto 24px",
              }}
            >
              {/* Orbit ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: "50%",
                  border: `1px dashed ${service.orbitColor}33`,
                  animation: `cosmosOrbitRingSpin ${30 + i * 10}s linear infinite`,
                }}
                aria-hidden="true"
              />

              {/* Satellite dots */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  animation: `cosmosSatelliteSmall ${8 + i * 3}s linear infinite`,
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: service.orbitColor,
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 6px ${service.orbitColor}`,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                  animation: `cosmosSatelliteSmall ${12 + i * 2}s linear infinite reverse`,
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: `${service.orbitColor}88`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>

              {/* Planet body */}
              <motion.div
                animate={{
                  scale: hoveredService === i ? 1.08 : 1,
                  boxShadow:
                    hoveredService === i
                      ? `0 0 60px ${service.orbitColor}40, 0 0 120px ${service.orbitColor}15`
                      : `0 0 30px ${service.orbitColor}15`,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, ${service.gradient[0]}, ${service.gradient[1]} 70%, rgba(0,0,0,0.5) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  position: "relative",
                }}
              >
                {service.emoji}
              </motion.div>
            </div>

            {/* Service info */}
            <h3
              className="cosmos-heading"
              style={{
                fontSize: "clamp(1.15rem, 2vw, 1.3rem)",
                fontWeight: 700,
                marginBottom: 8,
                color: "#ffffff",
              }}
            >
              {service.title}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              {service.subtitle}
            </p>

            {/* Tags */}
            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    background: `${service.orbitColor}15`,
                    color: service.orbitColor,
                    border: `1px solid ${service.orbitColor}25`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stat */}
            <p
              style={{
                fontSize: "0.8rem",
                color: service.orbitColor,
                fontWeight: 600,
              }}
            >
              {service.stat}
            </p>

            {/* Expanded description on hover */}
            <AnimatePresence>
              {hoveredService === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.45)",
                    lineHeight: 1.6,
                    marginTop: 12,
                    overflow: "hidden",
                  }}
                >
                  {service.description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <WaveDivider color="rgba(37, 99, 235, 0.04)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 4: PROJETOS EM ORBITA
// ---------------------------------------------------------------------------

function ProjetosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <SectionWrapper
      id="projetos"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(15, 23, 42, 0.25) 40%, rgba(15, 23, 42, 0.25) 60%, rgba(3, 0, 20, 0) 100%)",
        minHeight: "120vh",
      }}
    >
      <SectionTitle accent="\u{1F4AB}">Projetos em Orbita</SectionTitle>

      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          minHeight: 600,
        }}
        className="hidden md:block"
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : {}
            }
            transition={{
              delay: 0.1 + i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.06,
              zIndex: 10,
              boxShadow: `0 0 40px ${project.color}30, 0 20px 60px rgba(0,0,0,0.3)`,
            }}
            onClick={() => setSelectedProject(i)}
            style={{
              position: "absolute",
              top: project.position.top,
              left: project.position.left,
              width: "clamp(180px, 22vw, 240px)",
              padding: "20px",
              borderRadius: 16,
              cursor: "pointer",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${project.color}20`,
              transition: "box-shadow 0.3s",
              transform: `scale(${0.9 + project.depth * 0.1})`,
              zIndex: Math.round(project.depth * 5),
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                borderRadius: "16px 16px 0 0",
                opacity: 0.5,
              }}
            />
            <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>
              {project.emoji}
            </div>
            <div
              className="cosmos-heading"
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                marginBottom: 4,
                color: "#ffffff",
              }}
            >
              {project.name}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255, 255, 255, 0.45)",
                lineHeight: 1.4,
              }}
            >
              {project.description}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div
        className="flex md:hidden"
        style={{
          flexDirection: "column",
          gap: 12,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {FEATURED_PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.06 }}
            onClick={() => setSelectedProject(i)}
            className="cosmos-glass"
            style={{
              padding: "16px",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              borderLeft: `3px solid ${project.color}`,
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{project.emoji}</span>
            <div>
              <div
                className="cosmos-heading"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                {project.name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.45)",
                }}
              >
                {project.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(3, 0, 20, 0.85)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="cosmos-glass-strong"
              style={{
                maxWidth: 480,
                width: "100%",
                padding: 32,
                borderRadius: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>
                {FEATURED_PROJECTS[selectedProject].emoji}
              </div>
              <h3
                className="cosmos-heading"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {FEATURED_PROJECTS[selectedProject].name}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {FEATURED_PROJECTS[selectedProject].description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={`/projetos/${FEATURED_PROJECTS[selectedProject].slug}`}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    background: `${FEATURED_PROJECTS[selectedProject].color}20`,
                    border: `1px solid ${FEATURED_PROJECTS[selectedProject].color}40`,
                    color: FEATURED_PROJECTS[selectedProject].color,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Experimentar &rarr;
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* See all CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ marginTop: 60, textAlign: "center" }}
      >
        <Link
          href="/projetos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: 999,
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(139, 92, 246, 0.15))",
            border: "1px solid rgba(37, 99, 235, 0.3)",
            color: "#60a5fa",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s",
          }}
        >
          Ver todos os 109 projetos
          <span
            style={{ display: "inline-block", transition: "transform 0.3s" }}
          >
            &rarr;
          </span>
        </Link>
      </motion.div>

      <WaveDivider color="rgba(20, 184, 166, 0.03)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 5: PORTFOLIO SHOWCASE
// ---------------------------------------------------------------------------

function PortfolioSection() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="portfolio"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(15, 23, 42, 0.15) 40%, rgba(15, 23, 42, 0.15) 60%, rgba(3, 0, 20, 0) 100%)",
      }}
    >
      <SectionTitle accent="\u2728">O Universo Completo</SectionTitle>

      {/* Category tabs */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 40,
        }}
        role="tablist"
      >
        {PORTFOLIO_CATEGORIES.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`tab-panel-${i}`}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.3s",
              background:
                activeTab === i
                  ? `${cat.accentColor}20`
                  : "rgba(255, 255, 255, 0.03)",
              color:
                activeTab === i
                  ? cat.accentColor
                  : "rgba(255, 255, 255, 0.5)",
              borderBottom:
                activeTab === i
                  ? `2px solid ${cat.accentColor}`
                  : "2px solid transparent",
              boxShadow:
                activeTab === i
                  ? `0 0 20px ${cat.accentColor}15`
                  : "none",
            }}
          >
            {cat.emoji} {cat.label} ({cat.count})
          </button>
        ))}
      </motion.div>

      {/* Card grid */}
      <div
        style={{
          maxWidth: 900,
          width: "100%",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            {PORTFOLIO_CATEGORIES[activeTab].items.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={`/projetos/${item.slug}`}
                  className="cosmos-glass"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    borderLeft: `3px solid ${PORTFOLIO_CATEGORIES[activeTab].accentColor}30`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderLeftColor =
                      PORTFOLIO_CATEGORIES[activeTab].accentColor;
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.borderLeftColor = `${PORTFOLIO_CATEGORIES[activeTab].accentColor}30`;
                    e.currentTarget.style.color =
                      "rgba(255, 255, 255, 0.7)";
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        PORTFOLIO_CATEGORIES[activeTab].accentColor,
                      flexShrink: 0,
                    }}
                  />
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Total count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 40,
          fontSize: "0.85rem",
          color: "rgba(255, 255, 255, 0.35)",
          textAlign: "center",
        }}
      >
        109 paginas &middot; 70+ projetos unicos &middot; Todos estaticos, sem
        backend
      </motion.p>

      <WaveDivider color="rgba(139, 92, 246, 0.04)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 6: MANIFESTO
// ---------------------------------------------------------------------------

function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { label: "Humanos Primeiro", color: "#3b82f6" },
    { label: "Vida Autentica", color: "#22c55e" },
    { label: "Amor no Codigo", color: "#ec4899" },
  ];

  const philosophy = [
    {
      title: "Simplicidade",
      description:
        "O complexo tornado simples. Sem jargao, sem complicacoes. Cada decisao e guiada pela clareza.",
      color: "#06b6d4",
    },
    {
      title: "Transparencia",
      description:
        "Building in public. Cada erro e vitoria partilhados. Crescemos juntos com a comunidade.",
      color: "#a855f7",
    },
    {
      title: "Proposito",
      description:
        "Cada projeto tem um porque. Cada linha de codigo, uma intencao. Nada e criado por acaso.",
      color: "#f59e0b",
    },
  ];

  return (
    <SectionWrapper
      id="manifesto"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(30, 10, 60, 0.1) 40%, rgba(30, 10, 60, 0.1) 60%, rgba(3, 0, 20, 0) 100%)",
      }}
    >
      {/* Background constellation */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.15,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 12 }, (_, i) => {
          const rand = seededRandom(i + 200);
          const cx = 10 + rand() * 80;
          const cy = 10 + rand() * 80;
          return (
            <circle
              key={i}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="2"
              fill="rgba(139, 92, 246, 0.6)"
              style={{
                animation: `cosmosNodeGlow 4s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const rand = seededRandom(i + 300);
          const x1 = 10 + rand() * 80;
          const y1 = 10 + rand() * 80;
          const x2 = 10 + rand() * 80;
          const y2 = 10 + rand() * 80;
          return (
            <line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              style={{
                animation: `cosmosDashFlow 5s linear infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          );
        })}
      </svg>

      <div ref={ref} style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%" }}>
        {/* Large quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <h2
            className="cosmos-heading"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            O futuro e humano.
            <br />A tecnologia e o caminho.
          </h2>
        </motion.div>

        {/* Value pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {values.map((v, i) => (
            <span
              key={i}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: "0.85rem",
                fontWeight: 600,
                background: `${v.color}12`,
                color: v.color,
                border: `1px solid ${v.color}30`,
                boxShadow: `0 0 20px ${v.color}10`,
              }}
            >
              {v.label}
            </span>
          ))}
        </motion.div>

        {/* Philosophy cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {philosophy.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.5 + i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="cosmos-glass"
              style={{
                flex: "1 1 250px",
                maxWidth: 280,
                padding: "28px 24px",
                borderRadius: 16,
                textAlign: "center",
                borderTop: `2px solid ${p.color}40`,
              }}
            >
              <h4
                className="cosmos-heading"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: 10,
                  color: p.color,
                }}
              >
                {p.title}
              </h4>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  lineHeight: 1.7,
                }}
              >
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDivider color="rgba(245, 158, 11, 0.03)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 7: PROCESSO
// ---------------------------------------------------------------------------

function ProcessoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rocketProgress = useTransform(sectionProgress, [0.2, 0.8], [0, 100]);
  const rocketProgressSpring = useSpring(rocketProgress, {
    stiffness: 50,
    damping: 20,
  });

  return (
    <SectionWrapper
      id="processo"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(30, 20, 10, 0.08) 40%, rgba(30, 20, 10, 0.08) 60%, rgba(3, 0, 20, 0) 100%)",
      }}
    >
      <div ref={sectionRef as React.RefObject<HTMLDivElement>}>
        <SectionTitle accent="\u{1F6F8}">Como Trabalhamos</SectionTitle>

        <div
          ref={ref}
          style={{
            maxWidth: 800,
            width: "100%",
            position: "relative",
          }}
        >
          {/* SVG connecting path (desktop) */}
          <svg
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 40,
              top: 0,
              width: 4,
              height: "100%",
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{
                animation: "cosmosPathDash 4s linear infinite",
              }}
            />
          </svg>

          {/* Rocket indicator (desktop) */}
          <motion.div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 28,
              top: rocketProgressSpring.get() + "%",
              fontSize: "1.5rem",
              zIndex: 5,
              willChange: "top",
            }}
            aria-hidden="true"
          >
            <motion.span
              style={{
                display: "inline-block",
                top: `${rocketProgressSpring}%`,
              }}
            >
              {"\u{1F680}"}
            </motion.span>
          </motion.div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              paddingLeft: 0,
            }}
            className="md:pl-[80px]"
          >
            {PROCESS_STEPS.map((step, i) => {
              const stepThreshold = 0.2 + (i / (PROCESS_STEPS.length - 1)) * 0.6;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    position: "relative",
                  }}
                >
                  {/* Station circle */}
                  <div
                    style={{
                      position: "relative",
                      flexShrink: 0,
                    }}
                    className="hidden md:block"
                  >
                    {/* Pulse ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        border: "2px solid rgba(139, 92, 246, 0.2)",
                        animation:
                          "cosmosStationPulse 3s ease-in-out infinite",
                        animationDelay: `${i * 0.8}s`,
                      }}
                    />
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(139, 92, 246, 0.2))",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        position: "relative",
                      }}
                    >
                      {step.emoji}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="cosmos-glass" style={{
                    padding: "20px 24px",
                    borderRadius: 14,
                    flex: 1,
                  }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        className="md:hidden"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {step.emoji}
                      </span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "rgba(139, 92, 246, 0.6)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Passo {step.number}
                      </span>
                    </div>
                    <h4
                      className="cosmos-heading"
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255, 255, 255, 0.5)",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          marginTop: 48,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          className="cosmos-glass"
          style={{
            padding: "20px 28px",
            borderRadius: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[
            { label: "Prazo medio", value: "2-4 semanas", color: "#06b6d4" },
            { label: "Metodologia", value: "Agil", color: "#a855f7" },
            { label: "Comunicacao", value: "Diaria", color: "#22c55e" },
            { label: "Revisoes", value: "Ilimitadas", color: "#f59e0b" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                className="cosmos-heading"
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: 2,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255, 255, 255, 0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline dots connecting steps visually (mobile) */}
      <motion.div
        className="flex md:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 32,
          justifyContent: "center",
          gap: 8,
          alignItems: "center",
        }}
      >
        {PROCESS_STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #2563eb, #8b5cf6)",
                boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
              }}
            />
            {i < PROCESS_STEPS.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 1,
                  background:
                    "linear-gradient(90deg, #8b5cf6, rgba(139, 92, 246, 0.2))",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      <WaveDivider color="rgba(6, 182, 212, 0.03)" />
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// SECTION 8: CONTACTO + FOOTER
// ---------------------------------------------------------------------------

function ContactoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="contacto"
      style={{
        background:
          "linear-gradient(180deg, rgba(3, 0, 20, 0) 0%, rgba(3, 0, 20, 0.3) 50%, #030014 100%)",
        paddingBottom: 40,
      }}
    >
      {/* Aurora at bottom */}
      <AuroraEffect
        position="bottom"
        colors={["rgba(34, 197, 94, 0.06)", "rgba(59, 130, 246, 0.04)"]}
      />

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="cosmos-heading"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 16,
            background:
              "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Vamos Explorar Juntos?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.5)",
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Tens uma ideia? Um projeto? Uma curiosidade? Fala connosco.
        </motion.p>

        {/* Contact satellites */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {CONTACT_METHODS.map((method, i) => (
            <motion.a
              key={i}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.5,
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 0 30px ${method.color}20`,
              }}
              className="cosmos-glass"
              style={{
                padding: "24px 16px",
                borderRadius: 16,
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "all 0.3s",
                borderBottom: `2px solid ${method.color}30`,
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{method.emoji}</span>
              <span
                className="cosmos-heading"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: method.color,
                }}
              >
                {method.title}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  wordBreak: "break-all",
                }}
              >
                {method.value}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Availability indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
          style={{
            marginBottom: 32,
          }}
        >
          <div
            className="cosmos-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                animation: "cosmosGlowPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 500,
              }}
            >
              Disponivel para novos projetos
            </span>
          </div>
        </motion.div>

        {/* Response time indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.68, duration: 0.4 }}
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {[
            { label: "Resposta em 24h", icon: "\u{23F0}" },
            { label: "Reuniao gratuita", icon: "\u{1F4AC}" },
            { label: "Sem compromisso", icon: "\u{2705}" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <a
            href="mailto:jdsds.pt@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              borderRadius: 999,
              fontSize: "1.05rem",
              fontWeight: 700,
              textDecoration: "none",
              color: "#ffffff",
              background:
                "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.25))",
              backgroundSize: "200% auto",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              transition: "all 0.3s",
              animation: "cosmosGradientBorder 6s ease-in-out infinite",
              boxShadow:
                "0 0 30px rgba(139, 92, 246, 0.15), 0 0 60px rgba(6, 182, 212, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 50px rgba(139, 92, 246, 0.3), 0 0 100px rgba(6, 182, 212, 0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(139, 92, 246, 0.15), 0 0 60px rgba(6, 182, 212, 0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Agendar Reuniao {"\u{1F680}"}
          </a>
        </motion.div>
      </div>

      {/* What you get summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 48,
          maxWidth: 700,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              emoji: "\u{1F3AF}",
              title: "Estrategia Clara",
              desc: "Plano detalhado antes de comecar a construir",
            },
            {
              emoji: "\u{26A1}",
              title: "Entrega Rapida",
              desc: "Projetos concluidos em semanas, nao meses",
            },
            {
              emoji: "\u{1F4B0}",
              title: "Preco Justo",
              desc: "Transparencia total nos custos desde o inicio",
            },
            {
              emoji: "\u{1F91D}",
              title: "Suporte Continuo",
              desc: "Nao desaparecemos apos o lancamento",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              className="cosmos-glass"
              style={{
                padding: "18px 16px",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>
                {item.emoji}
              </div>
              <div
                className="cosmos-heading"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255, 255, 255, 0.35)",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 5,
          marginTop: 80,
          textAlign: "center",
          width: "100%",
          maxWidth: 800,
        }}
      >
        {/* Back to top */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() =>
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="cosmos-glass"
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.4)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
            }}
            aria-label="Voltar ao topo"
          >
            &uarr; Voltar ao topo
          </button>
        </div>

        {/* Footer links */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {[
            { label: "GitHub", href: "https://github.com/DjimieSilva" },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/jaime-djimie-silva",
            },
            { label: "Email", href: "mailto:jdsds.pt@gmail.com" },
            { label: "WhatsApp", href: "https://wa.me/351916894498" },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.3)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.3)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Gradient bar */}
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #2563eb, #8b5cf6, #06b6d4, transparent)",
            marginBottom: 24,
            opacity: 0.4,
          }}
          aria-hidden="true"
        />

        {/* Location badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: "0.85rem" }}>{"\u{1F1F5}\u{1F1F9}"}</span>
          <span
            style={{
              fontSize: "0.78rem",
              color: "rgba(255, 255, 255, 0.25)",
            }}
          >
            Figueira da Foz, Portugal
          </span>
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(255, 255, 255, 0.3)",
            marginBottom: 6,
          }}
        >
          &copy; 2026 Descomplicai
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(255, 255, 255, 0.2)",
            marginBottom: 16,
          }}
        >
          Feito com &hearts; e Claude
        </p>

        {/* Bottom gradient strip */}
        <div
          style={{
            width: "100%",
            height: 3,
            background:
              "linear-gradient(90deg, #2563eb, #8b5cf6, #06b6d4, #22c55e, #f59e0b)",
            borderRadius: 999,
            opacity: 0.6,
          }}
          aria-hidden="true"
        />
      </footer>
    </SectionWrapper>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------

export default function DescomplicaiCosmosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  // Background gradient shift with scroll
  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [
      "#030014",
      "#050118",
      "#07011c",
      "#050118",
      "#07011c",
      "#080214",
      "#050118",
      "#030014",
    ]
  );

  // Intersection observer for active section tracking
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = SECTION_IDS.indexOf(
              entry.target.id as (typeof SECTION_IDS)[number]
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navigateToSection = useCallback((index: number) => {
    const el = document.getElementById(SECTION_IDS[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <motion.div
        ref={containerRef}
        className="cosmos-root"
        style={{
          background: bgGradient,
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Persistent layers */}
        <PersistentStarField scrollY={scrollY} />
        <PersistentNebulae scrollY={scrollY} />
        <FloatingParticles />

        {/* Navigation */}
        <Navigation scrollProgress={scrollYProgress} />
        <ScrollProgressBar progress={scrollYProgress} />
        <NavigationDots
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        {/* Sections */}
        <HeroSection />
        <QuemSomosSection />
        <ServicosSection />
        <ProjetosSection />
        <PortfolioSection />
        <ManifestoSection />
        <ProcessoSection />
        <ContactoSection />
      </motion.div>
    </>
  );
}
