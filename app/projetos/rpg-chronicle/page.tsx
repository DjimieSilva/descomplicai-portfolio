"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

/* =============================================================================
   CONSTANTS & DATA
   ============================================================================= */

const TOTAL_HEIGHT = 12000;
const CHAPTER_RANGES = [
  { start: 0, end: 1200, label: "Portal" },
  { start: 1200, end: 2800, label: "O Inicio" },
  { start: 2800, end: 4200, label: "A Oficina" },
  { start: 4200, end: 5800, label: "Vila dos Sabores" },
  { start: 5800, end: 7200, label: "Distrito da Saude" },
  { start: 7200, end: 9000, label: "Laboratorio" },
  { start: 9000, end: 10200, label: "A Jornada" },
  { start: 10200, end: 12000, label: "O Topo" },
] as const;

const RESTAURANT_DATA = [
  {
    emoji: "\u{1F372}",
    name: "Cacarola",
    desc: "Cozinha tradicional portuguesa com alma",
    slug: "cacarola",
    color: "#D97706",
  },
  {
    emoji: "\u{1F37D}\u{FE0F}",
    name: "Bijou",
    desc: "Fine dining de autor",
    slug: "bijou-restaurante",
    color: "#7C3AED",
  },
  {
    emoji: "\u{1F377}",
    name: "MeioCheio",
    desc: "Wine bar & petiscos",
    slug: "meiocheio",
    color: "#DC2626",
  },
  {
    emoji: "\u2615",
    name: "Cafe Praca 18",
    desc: "O cafe iconico da praca",
    slug: "cafe-praca-18",
    color: "#92400E",
  },
  {
    emoji: "\u{1F99E}",
    name: "Marisqueira Rosa Amelia",
    desc: "Marisco fresco ha geracoes",
    slug: "marisqueira-rosa-amelia",
    color: "#0E7490",
  },
  {
    emoji: "\u{1F3C4}\u200D\u2642\u{FE0F}",
    name: "Nalu Cabedelo",
    desc: "Surf cafe a beira-mar",
    slug: "nalu-cabedelo",
    color: "#0D9488",
  },
  {
    emoji: "\u{1F305}",
    name: "Sand Murtinheira",
    desc: "Beach lounge & sunset",
    slug: "sand-murtinheira",
    color: "#EA580C",
  },
  {
    emoji: "\u2693",
    name: "Tasca da Praia",
    desc: "Petiscos com vista oceano",
    slug: "tasca-da-praia",
    color: "#1D4ED8",
  },
  {
    emoji: "\u{1F969}",
    name: "Tasca Dentro",
    desc: "Sabores do interior",
    slug: "tasca-dentro",
    color: "#B45309",
  },
  {
    emoji: "\u{1F37A}",
    name: "Vinho na Rua",
    desc: "Wine & street food",
    slug: "vinho-na-rua",
    color: "#7C2D12",
  },
  {
    emoji: "\u{1F370}",
    name: "Sabor Abencoado",
    desc: "Pastelaria artesanal",
    slug: "sabor-abencoado",
    color: "#DB2777",
  },
  {
    emoji: "\u{1F355}",
    name: "Zeff Pizza",
    desc: "Pizza napolitana autentica",
    slug: "zeff-pizza",
    color: "#DC2626",
  },
  {
    emoji: "\u{1F37E}",
    name: "Vindima Selvagem",
    desc: "Vinhos naturais e petiscos",
    slug: "vindima-selvagem",
    color: "#6D28D9",
  },
  {
    emoji: "\u{1F95A}",
    name: "Mesa dos Amigos",
    desc: "Brunch & conforto",
    slug: "mesa-dos-amigos",
    color: "#CA8A04",
  },
  {
    emoji: "\u{1F3AA}",
    name: "O Picadeiro",
    desc: "Tapas com espetaculo",
    slug: "o-picadeiro",
    color: "#E11D48",
  },
  {
    emoji: "\u{1F30A}",
    name: "Pe na Areia",
    desc: "Restaurante de praia",
    slug: "pe-na-areia",
    color: "#0891B2",
  },
  {
    emoji: "\u{1F3F0}",
    name: "Ribeirosanto",
    desc: "Cozinha de autor historica",
    slug: "ribeirosanto",
    color: "#4338CA",
  },
] as const;

const MORE_RESTAURANT_DATA = [
  {
    emoji: "\u{1F331}",
    name: "Seeds",
    desc: "Vegetariano criativo",
    slug: "seeds",
    color: "#059669",
  },
  {
    emoji: "\u{1F3D6}\u{FE0F}",
    name: "Ondas Academy",
    desc: "Surf school & bar",
    slug: "ondas-academy",
    color: "#0284C7",
  },
  {
    emoji: "\u{1F3E1}",
    name: "Casa dos Papagaios",
    desc: "Cozinha regional caseira",
    slug: "casa-dos-papagaios",
    color: "#15803D",
  },
  {
    emoji: "\u{1F3C7}",
    name: "Quinta da Salmanha",
    desc: "Turismo rural & gastronomia",
    slug: "quinta-da-salmanha",
    color: "#854D0E",
  },
  {
    emoji: "\u{1F30A}",
    name: "Maregrafo",
    desc: "Fine dining a beira-mar",
    slug: "maregrafo",
    color: "#1E40AF",
  },
  {
    emoji: "\u{1F377}",
    name: "Rota dos Vinhos",
    desc: "Enoteca & degustacao",
    slug: "rota-dos-vinhos",
    color: "#9F1239",
  },
  {
    emoji: "\u{1F3D5}\u{FE0F}",
    name: "Cataventos",
    desc: "Camping & restaurant",
    slug: "cataventos",
    color: "#0D9488",
  },
  {
    emoji: "\u2B50",
    name: "Quintas Estrelas",
    desc: "Eventos & banquetes",
    slug: "quintas-estrelas",
    color: "#B45309",
  },
] as const;

const CLINIC_DATA = [
  {
    emoji: "\u{1F9B7}",
    name: "DentalKid",
    desc: "O dentista das criancas",
    slug: "dentalkid",
    color: "#06B6D4",
  },
  {
    emoji: "\u{1F451}",
    name: "Clinica Vasco da Gama",
    desc: "Premium dental",
    slug: "clinica-vasco-da-gama",
    color: "#8B5CF6",
  },
  {
    emoji: "\u{1F3E8}",
    name: "FozClinica",
    desc: "Multidisciplinar",
    slug: "fozclinica",
    color: "#2563EB",
  },
  {
    emoji: "\u26A1",
    name: "UpConcept",
    desc: "7 dias por semana",
    slug: "upconcept-clinica",
    color: "#F59E0B",
  },
  {
    emoji: "\u{1F33F}",
    name: "Premium Clinica",
    desc: "Foco em prevencao",
    slug: "premium-clinica-dentaria",
    color: "#10B981",
  },
  {
    emoji: "\u{1F52C}",
    name: "Clinica Tamargueira",
    desc: "Implantologia",
    slug: "clinica-tamargueira",
    color: "#6366F1",
  },
  {
    emoji: "\u{1F3E5}",
    name: "Clinica de Quiaios",
    desc: "Familiar e acessivel",
    slug: "clinica-dentaria-quiaios",
    color: "#EC4899",
  },
  {
    emoji: "\u{1F9B7}",
    name: "Alba Saude",
    desc: "Estetica dental moderna",
    slug: "alba-saude-dentaria",
    color: "#14B8A6",
  },
] as const;

const TOOL_DATA = [
  // Musica (cyan)
  {
    emoji: "\u{1F3B5}",
    name: "Synth",
    desc: "Sintetizador virtual",
    slug: "synth",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F941}",
    name: "Drum Machine",
    desc: "Bateria electronica",
    slug: "drum-machine",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F3B8}",
    name: "Guitar Tuner",
    desc: "Afinador de guitarra",
    slug: "guitar-tuner",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F3B6}",
    name: "Music Box",
    desc: "Caixinha de musica",
    slug: "music-box",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F3BC}",
    name: "Music Theory",
    desc: "Teoria musical interativa",
    slug: "music-theory",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  // Criativo (magenta)
  {
    emoji: "\u{1F3A8}",
    name: "Generative Art",
    desc: "Arte generativa com codigo",
    slug: "generative-art",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u{1F5BC}\u{FE0F}",
    name: "Pixel Art",
    desc: "Editor de pixel art",
    slug: "pixel-art",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u270F\u{FE0F}",
    name: "Drawing Canvas",
    desc: "Tela de desenho livre",
    slug: "drawing-canvas",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u{1F308}",
    name: "Color Palette",
    desc: "Gerador de paletas",
    slug: "color-palette-generator",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u{1F3A8}",
    name: "Gradient Maker",
    desc: "Criador de gradientes",
    slug: "gradient-maker",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u{1F5BC}\u{FE0F}",
    name: "CSS Art Gallery",
    desc: "Galeria de arte CSS",
    slug: "css-art-gallery",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  // Jogos (green)
  {
    emoji: "\u265F\u{FE0F}",
    name: "Chess",
    desc: "Xadrez classico",
    slug: "chess",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F40D}",
    name: "Snake",
    desc: "O classico jogo da cobra",
    slug: "snake-game",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F9E0}",
    name: "Memory",
    desc: "Jogo da memoria",
    slug: "memory-game",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F1F5}\u{1F1F9}",
    name: "Quiz Portugal",
    desc: "Quao bem conheces PT?",
    slug: "quiz-portugal",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F9E9}",
    name: "Maze Solver",
    desc: "Resolve labirintos",
    slug: "maze-solver",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F92A}",
    name: "Emoji Mixer",
    desc: "Mistura emojis unicos",
    slug: "emoji-mixer",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  // Dev Tools (amber)
  {
    emoji: "\u{1F4CB}",
    name: "JSON Formatter",
    desc: "Formata e valida JSON",
    slug: "json-formatter",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F50D}",
    name: "Regex Tester",
    desc: "Testa expressoes regulares",
    slug: "regex-tester",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F3A8}",
    name: "CSS Playground",
    desc: "Experimenta CSS ao vivo",
    slug: "css-playground",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F4DD}",
    name: "Markdown Editor",
    desc: "Escreve e pre-visualiza MD",
    slug: "markdown-editor",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F3A8}",
    name: "Color Theory",
    desc: "Teoria de cores interativa",
    slug: "color-theory",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  // Produtividade (blue)
  {
    emoji: "\u{1F345}",
    name: "Pomodoro",
    desc: "Timer de foco",
    slug: "pomodoro",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F4C8}",
    name: "Habit Tracker",
    desc: "Rastreador de habitos",
    slug: "habit-tracker",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F4CB}",
    name: "Todo Kanban",
    desc: "Quadro Kanban de tarefas",
    slug: "todo-kanban",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F4DA}",
    name: "Flashcards",
    desc: "Cartoes de memoria",
    slug: "flashcards",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u23F3",
    name: "Countdown",
    desc: "Contagem regressiva",
    slug: "countdown",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F3B0}",
    name: "Decision Wheel",
    desc: "Roda de decisoes",
    slug: "decision-wheel",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F4DD}",
    name: "Mood Journal",
    desc: "Diario de humor diario",
    slug: "mood-journal",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F510}",
    name: "Password Generator",
    desc: "Gerador de senhas seguras",
    slug: "password-generator",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  // Mais jogos
  {
    emoji: "\u{1F5A5}\u{FE0F}",
    name: "Typing Speed",
    desc: "Teste de velocidade de digitacao",
    slug: "typing-speed-test",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F4F7}",
    name: "Photo Filters",
    desc: "Filtros de foto CSS",
    slug: "photo-filters",
    category: "criativo",
    color: "#D946EF",
    preview: "gradient",
  },
  {
    emoji: "\u{1F4E1}",
    name: "Morse Code",
    desc: "Tradutor de codigo Morse",
    slug: "morse-code",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F504}",
    name: "Unit Converter",
    desc: "Conversor universal",
    slug: "unit-converter",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F4CA}",
    name: "Music Visualizer",
    desc: "Visualizador de audio",
    slug: "music-visualizer",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F9D8}",
    name: "Breathing Exercise",
    desc: "Exercicios de respiracao",
    slug: "breathing-exercise",
    category: "produtividade",
    color: "#3B82F6",
    preview: "gradient",
  },
  {
    emoji: "\u{1F4A1}",
    name: "AI Chat Sim",
    desc: "Simulador de chat IA",
    slug: "ai-chat-sim",
    category: "experiencias",
    color: "#EAB308",
    preview: "code",
  },
  {
    emoji: "\u{1F9EE}",
    name: "Calculator",
    desc: "Calculadora cientifica",
    slug: "calculator",
    category: "dev",
    color: "#F59E0B",
    preview: "code",
  },
  {
    emoji: "\u{1F4E6}",
    name: "Recipe Finder",
    desc: "Encontra receitas por ingredientes",
    slug: "recipe-finder",
    category: "experiencias",
    color: "#EAB308",
    preview: "code",
  },
  // Ciencia (purple)
  {
    emoji: "\u269B\u{FE0F}",
    name: "Periodic Table",
    desc: "Tabela periodica interativa",
    slug: "periodic-table",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  {
    emoji: "\u{1FA90}",
    name: "Solar System",
    desc: "Modelo do sistema solar",
    slug: "solar-system",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  {
    emoji: "\u{1F300}",
    name: "Fractal Explorer",
    desc: "Explorador de fractais",
    slug: "fractal-explorer",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  {
    emoji: "\u2728",
    name: "Particle Sim",
    desc: "Simulador de particulas",
    slug: "particle-sim",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  {
    emoji: "\u{1F4CA}",
    name: "Sorting Visualizer",
    desc: "Algoritmos visuais",
    slug: "sorting-visualizer",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  {
    emoji: "\u{1F4CF}",
    name: "BMI Calculator",
    desc: "Calcula o teu IMC",
    slug: "bmi-calculator",
    category: "ciencia",
    color: "#A855F7",
    preview: "code",
  },
  {
    emoji: "\u{1F4DD}",
    name: "Text Analyzer",
    desc: "Analisa textos em detalhe",
    slug: "text-analyzer",
    category: "ciencia",
    color: "#A855F7",
    preview: "code",
  },
  {
    emoji: "\u{1F441}\u{FE0F}",
    name: "Color Blindness Sim",
    desc: "Simula daltonismo",
    slug: "color-blindness-sim",
    category: "ciencia",
    color: "#A855F7",
    preview: "gradient",
  },
  // Experiencias (gold)
  {
    emoji: "\u{1F30C}",
    name: "Aurora Borealis",
    desc: "Aurora boreal interativa",
    slug: "aurora-borealis",
    category: "experiencias",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F326}\u{FE0F}",
    name: "Weather Mood",
    desc: "Clima e emocoes",
    slug: "weather-mood",
    category: "experiencias",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F30D}",
    name: "Globe Explorer",
    desc: "Explorador do globo",
    slug: "globe-explorer",
    category: "experiencias",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F570}\u{FE0F}",
    name: "World Clock",
    desc: "Relogios mundiais",
    slug: "world-clock",
    category: "experiencias",
    color: "#EAB308",
    preview: "code",
  },
  {
    emoji: "\u{1F5FA}\u{FE0F}",
    name: "Mapa Portugal",
    desc: "Mapa interativo de PT",
    slug: "mapa-portugal",
    category: "experiencias",
    color: "#EAB308",
    preview: "gradient",
  },
] as const;

const TIMELINE_DATA = [
  {
    year: "2019",
    title: "IST \u2014 Inicio do caminho",
    emoji: "\u{1F393}",
  },
  {
    year: "2020",
    title: "Primeiros projetos freelance",
    emoji: "\u{1F4BB}",
  },
  {
    year: "2021",
    title: "Fraqtory \u2014 Experiencia em startup",
    emoji: "\u{1F680}",
  },
  {
    year: "2022",
    title: "Foco em IA e automacao",
    emoji: "\u{1F916}",
  },
  {
    year: "2023",
    title: "Mentoria e consultoria",
    emoji: "\u{1F3AF}",
  },
  {
    year: "2024",
    title: "MSc concluido + Descomplicai nasceu",
    emoji: "\u{1F331}",
  },
  {
    year: "2025",
    title: "55+ projetos, building in public",
    emoji: "\u{1F3D7}\u{FE0F}",
  },
  {
    year: "2026",
    title: "109 paginas numa noite. O futuro e agora.",
    emoji: "\u26A1",
  },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  all: "Todos",
  musica: "\u{1F3B5} Musica",
  criativo: "\u{1F3A8} Criativo",
  jogos: "\u{1F3AE} Jogos",
  dev: "\u{1F6E0}\u{FE0F} Dev Tools",
  produtividade: "\u{1F4CA} Produtividade",
  ciencia: "\u{1F52C} Ciencia",
  experiencias: "\u{1F30D} Experiencias",
};

/* =============================================================================
   UTILITY HOOKS
   ============================================================================= */

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useChapterProgress(
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"],
  chapterIndex: number
) {
  const range = CHAPTER_RANGES[chapterIndex];
  const start = range.start / TOTAL_HEIGHT;
  const end = range.end / TOTAL_HEIGHT;
  return useTransform(scrollY, [start, end], [0, 1]);
}

function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* =============================================================================
   SEED-BASED RANDOM FOR SSR CONSISTENCY
   ============================================================================= */

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* =============================================================================
   ANIMATED COUNTER COMPONENT
   ============================================================================= */

const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  inView,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
});

/* =============================================================================
   PARTICLE SYSTEMS
   ============================================================================= */

const StarField = memo(function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 7 + 2) * 100,
      size: seededRandom(i * 7 + 3) * 2.5 + 0.5,
      duration: seededRandom(i * 7 + 4) * 6 + 2,
      delay: seededRandom(i * 7 + 5) * 5,
      opacity: seededRandom(i * 7 + 6) * 0.7 + 0.3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            willChange: "opacity",
          }}
        />
      ))}
    </div>
  );
});

const AmbientParticles = memo(function AmbientParticles({
  type,
  count = 30,
}: {
  type: "leaves" | "sparks" | "steam" | "heartbeat" | "binary" | "dust" | "snow" | "stars";
  count?: number;
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 13 + 1) * 100,
      y: seededRandom(i * 13 + 2) * 100,
      size: seededRandom(i * 13 + 3) * 4 + 2,
      duration: seededRandom(i * 13 + 4) * 8 + 4,
      delay: seededRandom(i * 13 + 5) * 6,
    }));
  }, [count]);

  const getParticleStyle = useCallback(
    (p: (typeof particles)[0]) => {
      const base: React.CSSProperties = {
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        willChange: "transform, opacity",
      };
      switch (type) {
        case "leaves":
          return {
            ...base,
            backgroundColor: "#4ade80",
            borderRadius: "50% 0 50% 0",
            animation: `floatDown ${p.duration}s ease-in-out ${p.delay}s infinite`,
          };
        case "sparks":
          return {
            ...base,
            backgroundColor: "#F59E0B",
            borderRadius: "50%",
            animation: `sparkle ${p.duration * 0.5}s ease-out ${p.delay}s infinite`,
          };
        case "steam":
          return {
            ...base,
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "50%",
            animation: `riseUp ${p.duration}s ease-out ${p.delay}s infinite`,
          };
        case "heartbeat":
          return {
            ...base,
            backgroundColor: "#EC4899",
            borderRadius: "50%",
            animation: `pulseGrow ${p.duration * 0.3}s ease-out ${p.delay}s infinite`,
          };
        case "binary":
          return {
            ...base,
            color: "rgba(34,197,94,0.15)",
            fontSize: `${p.size * 2}px`,
            fontFamily: "monospace",
            animation: `riseUp ${p.duration}s linear ${p.delay}s infinite`,
          };
        case "dust":
          return {
            ...base,
            backgroundColor: "#EAB308",
            borderRadius: "50%",
            opacity: 0.3,
            animation: `floatDown ${p.duration}s ease-in-out ${p.delay}s infinite`,
          };
        case "snow":
          return {
            ...base,
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: "50%",
            animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
          };
        default:
          return base;
      }
    },
    [type]
  );

  if (type === "binary") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={getParticleStyle(p)}
          >
            {seededRandom(p.id * 99) > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={getParticleStyle(p)}
        />
      ))}
    </div>
  );
});

/* =============================================================================
   NEBULA BLOBS
   ============================================================================= */

const NebulaBlobs = memo(function NebulaBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple nebula */}
      <div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          left: "10%",
          top: "20%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          animation: "nebulaDrift1 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Blue nebula */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          right: "5%",
          top: "40%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          animation: "nebulaDrift2 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Pink nebula */}
      <div
        className="absolute rounded-full"
        style={{
          width: "450px",
          height: "450px",
          left: "50%",
          top: "60%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)",
          animation: "nebulaDrift3 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
});

/* =============================================================================
   SHOOTING STAR
   ============================================================================= */

const ShootingStar = memo(function ShootingStar() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute"
        style={{
          width: "100px",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          top: "15%",
          left: "-100px",
          transform: "rotate(-15deg)",
          animation: "shootingStar 7s linear infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
});

/* =============================================================================
   CHARACTER COMPONENT (PIXEL JAIME)
   ============================================================================= */

const PixelCharacter = memo(function PixelCharacter({
  variant = "normal",
  walking = false,
  flipped = false,
  size = 48,
}: {
  variant?:
    | "normal"
    | "sitting"
    | "chef"
    | "lab"
    | "hacker"
    | "hero";
  walking?: boolean;
  flipped?: boolean;
  size?: number;
}) {
  const scale = size / 48;

  const bodyColor = (() => {
    switch (variant) {
      case "chef":
      case "lab":
        return "#FFFFFF";
      case "hacker":
        return "#1E293B";
      case "hero":
        return "#EAB308";
      default:
        return "#3B82F6";
    }
  })();

  const headAccessory = (() => {
    switch (variant) {
      case "chef":
        return (
          <div
            className="absolute rounded-t-full bg-white"
            style={{
              width: `${14 * scale}px`,
              height: `${10 * scale}px`,
              top: `${-8 * scale}px`,
              left: `${1 * scale}px`,
              boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
            }}
          />
        );
      case "hacker":
        return (
          <div
            className="absolute"
            style={{
              width: `${14 * scale}px`,
              height: `${4 * scale}px`,
              top: `${4 * scale}px`,
              left: `${1 * scale}px`,
              backgroundColor: "#06B6D4",
              opacity: 0.8,
              borderRadius: `${2 * scale}px`,
            }}
          />
        );
      case "hero":
        return (
          <div
            className="absolute"
            style={{
              width: `${20 * scale}px`,
              height: `${12 * scale}px`,
              top: `${14 * scale}px`,
              left: `${-2 * scale}px`,
              background:
                "linear-gradient(135deg, #EAB308, #F59E0B)",
              clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
              transformOrigin: "top left",
              animation: walking
                ? "capeFlutter 1.5s ease-in-out infinite"
                : undefined,
            }}
          />
        );
      default:
        return null;
    }
  })();

  const isSitting = variant === "sitting";

  return (
    <div
      className="relative"
      style={{
        width: `${16 * scale}px`,
        height: `${size}px`,
        transform: flipped ? "scaleX(-1)" : undefined,
      }}
    >
      {/* Hair */}
      <div
        className="absolute rounded-t-lg"
        style={{
          width: `${14 * scale}px`,
          height: `${6 * scale}px`,
          top: 0,
          left: `${1 * scale}px`,
          backgroundColor: "#1E1B4B",
        }}
      />
      {/* Head */}
      <div
        className="absolute rounded-lg"
        style={{
          width: `${14 * scale}px`,
          height: `${14 * scale}px`,
          top: `${2 * scale}px`,
          left: `${1 * scale}px`,
          backgroundColor: "#FBBF24",
        }}
      >
        {/* Eyes */}
        <div
          className="absolute rounded-full bg-[#1E1B4B]"
          style={{
            width: `${2 * scale}px`,
            height: `${2 * scale}px`,
            top: `${5 * scale}px`,
            left: `${3 * scale}px`,
          }}
        />
        <div
          className="absolute rounded-full bg-[#1E1B4B]"
          style={{
            width: `${2 * scale}px`,
            height: `${2 * scale}px`,
            top: `${5 * scale}px`,
            right: `${3 * scale}px`,
          }}
        />
        {/* Smile */}
        <div
          className="absolute"
          style={{
            width: `${6 * scale}px`,
            height: `${3 * scale}px`,
            bottom: `${2 * scale}px`,
            left: `${4 * scale}px`,
            borderBottom: `${1.5 * scale}px solid #92400E`,
            borderRadius: `0 0 ${3 * scale}px ${3 * scale}px`,
          }}
        />
      </div>
      {headAccessory}
      {/* Body */}
      <div
        className="absolute rounded"
        style={{
          width: `${14 * scale}px`,
          height: `${14 * scale}px`,
          top: `${17 * scale}px`,
          left: `${1 * scale}px`,
          backgroundColor: bodyColor,
          border:
            variant === "chef" || variant === "lab"
              ? "1px solid #E5E7EB"
              : "none",
        }}
      />
      {/* Arms */}
      {isSitting ? (
        <>
          <div
            className="absolute rounded"
            style={{
              width: `${4 * scale}px`,
              height: `${8 * scale}px`,
              top: `${19 * scale}px`,
              left: `${-2 * scale}px`,
              backgroundColor: bodyColor,
              transform: "rotate(30deg)",
              animation: "typing 0.4s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute rounded"
            style={{
              width: `${4 * scale}px`,
              height: `${8 * scale}px`,
              top: `${19 * scale}px`,
              right: `${-2 * scale}px`,
              backgroundColor: bodyColor,
              transform: "rotate(-30deg)",
              animation:
                "typing 0.4s ease-in-out 0.2s infinite alternate",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute rounded"
            style={{
              width: `${3 * scale}px`,
              height: `${10 * scale}px`,
              top: `${18 * scale}px`,
              left: `${-2 * scale}px`,
              backgroundColor: bodyColor,
              animation: walking
                ? "armSwing 0.4s ease-in-out infinite alternate"
                : undefined,
              transformOrigin: "top",
            }}
          />
          <div
            className="absolute rounded"
            style={{
              width: `${3 * scale}px`,
              height: `${10 * scale}px`,
              top: `${18 * scale}px`,
              right: `${-2 * scale}px`,
              backgroundColor: bodyColor,
              animation: walking
                ? "armSwing 0.4s ease-in-out 0.2s infinite alternate"
                : undefined,
              transformOrigin: "top",
            }}
          />
        </>
      )}
      {/* Legs */}
      {!isSitting && (
        <>
          <div
            className="absolute rounded"
            style={{
              width: `${4 * scale}px`,
              height: `${12 * scale}px`,
              top: `${31 * scale}px`,
              left: `${2 * scale}px`,
              backgroundColor: "#1E293B",
              animation: walking
                ? "legWalk 0.4s ease-in-out infinite alternate"
                : undefined,
              transformOrigin: "top",
            }}
          />
          <div
            className="absolute rounded"
            style={{
              width: `${4 * scale}px`,
              height: `${12 * scale}px`,
              top: `${31 * scale}px`,
              right: `${2 * scale}px`,
              backgroundColor: "#1E293B",
              animation: walking
                ? "legWalk 0.4s ease-in-out 0.2s infinite alternate"
                : undefined,
              transformOrigin: "top",
            }}
          />
        </>
      )}
      {/* Feet for sitting */}
      {isSitting && (
        <div
          className="absolute rounded"
          style={{
            width: `${14 * scale}px`,
            height: `${4 * scale}px`,
            top: `${31 * scale}px`,
            left: `${1 * scale}px`,
            backgroundColor: "#1E293B",
          }}
        />
      )}
    </div>
  );
});

/* =============================================================================
   SPEECH BUBBLE
   ============================================================================= */

const SpeechBubble = memo(function SpeechBubble({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
      }}
      className="relative px-4 py-2 rounded-xl bg-white text-gray-800 text-sm font-medium shadow-lg max-w-[220px]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {text}
      <div
        className="absolute -bottom-2 left-6 w-0 h-0"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid white",
        }}
      />
    </motion.div>
  );
});

/* =============================================================================
   SVG MOUNTAIN SILHOUETTES
   ============================================================================= */

const MountainLayer = memo(function MountainLayer({
  color,
  pathD,
  opacity = 1,
}: {
  color: string;
  pathD: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 320"
      className="absolute bottom-0 left-0 w-full"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <path d={pathD} fill={color} />
    </svg>
  );
});

/* =============================================================================
   SKILL BAR COMPONENT
   ============================================================================= */

const SkillBar = memo(function SkillBar({
  name,
  percentage,
  gradient,
  inView,
  delay = 0,
}: {
  name: string;
  percentage: number;
  gradient: string;
  inView: boolean;
  delay?: number;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1 text-sm">
        <span className="font-medium text-gray-700">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-gray-500"
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: gradient }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
});

/* =============================================================================
   TOOL CARD PREVIEW ANIMATIONS
   ============================================================================= */

const ToolPreview = memo(function ToolPreview({
  type,
  color,
}: {
  type: string;
  color: string;
}) {
  switch (type) {
    case "equalizer":
      return (
        <div className="flex items-end gap-1 h-8 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 rounded-t"
              style={{
                backgroundColor: color,
                animation: `eqBounce ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                height: `${12 + seededRandom(i * 37) * 20}px`,
              }}
            />
          ))}
        </div>
      );
    case "gradient":
      return (
        <div
          className="h-8 w-full rounded"
          style={{
            background: `linear-gradient(90deg, ${color}, transparent, ${color})`,
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease-in-out infinite",
          }}
        />
      );
    case "character":
      return (
        <div className="flex justify-center items-center h-8">
          <div
            className="w-3 h-3 rounded-sm"
            style={{
              backgroundColor: color,
              animation: "characterBounce 0.6s ease-in-out infinite",
            }}
          />
        </div>
      );
    case "code":
      return (
        <div className="flex flex-col gap-1 h-8 justify-center font-mono text-[8px]">
          <div
            className="h-1 rounded"
            style={{
              width: "60%",
              backgroundColor: `${color}40`,
            }}
          />
          <div
            className="h-1 rounded"
            style={{
              width: "80%",
              backgroundColor: `${color}30`,
            }}
          />
          <div
            className="h-1 rounded"
            style={{
              width: "45%",
              backgroundColor: `${color}20`,
            }}
          />
          <div
            className="w-1.5 h-2.5 inline-block"
            style={{
              backgroundColor: color,
              animation: "cursorBlink 1s step-end infinite",
            }}
          />
        </div>
      );
    default:
      return null;
  }
});

/* =============================================================================
   ECG LINE
   ============================================================================= */

const ECGLine = memo(function ECGLine() {
  return (
    <svg
      viewBox="0 0 1200 60"
      className="absolute bottom-8 left-0 w-full h-12 opacity-10"
      preserveAspectRatio="none"
    >
      <path
        d="M0,30 L200,30 L220,10 L240,50 L260,10 L280,50 L300,30 L500,30 L520,10 L540,50 L560,10 L580,50 L600,30 L800,30 L820,10 L840,50 L860,10 L880,50 L900,30 L1200,30"
        fill="none"
        stroke="#EC4899"
        strokeWidth="2"
        strokeDasharray="1200"
        strokeDashoffset="1200"
        style={{
          animation: "ecgDraw 3s linear infinite",
        }}
      />
    </svg>
  );
});

/* =============================================================================
   CONFETTI BURST
   ============================================================================= */

const ConfettiBurst = memo(function ConfettiBurst({
  active,
}: {
  active: boolean;
}) {
  const pieces = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 31 + 1) * 100,
      color: [
        "#EF4444",
        "#F59E0B",
        "#10B981",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#06B6D4",
        "#EAB308",
      ][Math.floor(seededRandom(i * 31 + 2) * 8)],
      size: seededRandom(i * 31 + 3) * 8 + 4,
      delay: seededRandom(i * 31 + 4) * 0.5,
      rotation: seededRandom(i * 31 + 5) * 360,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall 3s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
});

/* =============================================================================
   GLASSMORPHISM CARD
   ============================================================================= */

const GlassCard = memo(function GlassCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
});

/* =============================================================================
   FLOATING ORBS DECORATION
   ============================================================================= */

const FloatingOrbs = memo(function FloatingOrbs({
  count = 5,
  baseColor = "#06B6D4",
  sizeRange = [40, 120],
}: {
  count?: number;
  baseColor?: string;
  sizeRange?: [number, number];
}) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 19 + 1) * 80 + 10,
      y: seededRandom(i * 19 + 2) * 80 + 10,
      size:
        sizeRange[0] +
        seededRandom(i * 19 + 3) * (sizeRange[1] - sizeRange[0]),
      duration: seededRandom(i * 19 + 4) * 15 + 10,
      delay: seededRandom(i * 19 + 5) * 5,
      opacity: seededRandom(i * 19 + 6) * 0.08 + 0.02,
    }));
  }, [count, sizeRange]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${baseColor}${Math.floor(orb.opacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            animation: `nebulaDrift${(orb.id % 3) + 1} ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
            willChange: "transform",
            filter: `blur(${orb.size * 0.3}px)`,
          }}
        />
      ))}
    </div>
  );
});

/* =============================================================================
   ANIMATED GRADIENT BORDER CARD
   ============================================================================= */

const GradientBorderCard = memo(function GradientBorderCard({
  children,
  gradient = "linear-gradient(135deg, #06B6D4, #8B5CF6, #EC4899)",
  className = "",
}: {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-[1px] ${className}`}
      style={{ background: gradient }}
    >
      <div className="rounded-2xl bg-gray-900/95 backdrop-blur-sm h-full">
        {children}
      </div>
    </div>
  );
});

/* =============================================================================
   WAVE DIVIDER
   ============================================================================= */

const WaveDivider = memo(function WaveDivider({
  color = "#030014",
  flip = false,
  opacity = 1,
}: {
  color?: string;
  flip?: boolean;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className="absolute left-0 w-full"
      style={{
        bottom: flip ? "auto" : 0,
        top: flip ? 0 : "auto",
        transform: flip ? "scaleY(-1)" : undefined,
        opacity,
      }}
      preserveAspectRatio="none"
    >
      <path
        d="M0,64 C288,96 576,32 864,64 C1152,96 1296,32 1440,48 L1440,120 L0,120 Z"
        fill={color}
      />
    </svg>
  );
});

/* =============================================================================
   GLOWING TEXT
   ============================================================================= */

const GlowingText = memo(function GlowingText({
  children,
  color = "#06B6D4",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`relative ${className}`}
      style={{
        textShadow: `0 0 10px ${color}40, 0 0 20px ${color}20, 0 0 40px ${color}10`,
        color,
      }}
    >
      {children}
    </span>
  );
});

/* =============================================================================
   ANIMATED SKILL BADGE
   ============================================================================= */

const SkillBadge = memo(function SkillBadge({
  name,
  level,
  color,
  inView,
  delay = 0,
}: {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  color: string;
  inView: boolean;
  delay?: number;
}) {
  const dots = level === "expert" ? 5 : level === "advanced" ? 4 : 3;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
    >
      <span className="text-xs font-medium text-white/80">{name}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: i < dots ? color : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

/* =============================================================================
   SCROLL INDICATOR
   ============================================================================= */

const ScrollIndicator = memo(function ScrollIndicator({
  visible,
}: {
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1"
    >
      <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white/60"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[10px] text-white/30 mt-1">Scroll</span>
    </motion.div>
  );
});

/* =============================================================================
   CHAPTER TITLE OVERLAY
   ============================================================================= */

const ChapterTitle = memo(function ChapterTitle({
  number,
  title,
  subtitle,
  visible,
}: {
  number: number;
  title: string;
  subtitle?: string;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed left-6 bottom-20 z-40 hidden md:block"
        >
          <div className="flex items-baseline gap-3">
            <span
              className="text-6xl font-black text-white/5"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              {String(number).padStart(2, "0")}
            </span>
            <div>
              <h3
                className="text-sm font-bold text-white/40 tracking-wider uppercase"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-white/20 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* =============================================================================
   DECORATIVE GRID OVERLAY
   ============================================================================= */

const GridOverlay = memo(function GridOverlay({
  color = "rgba(255,255,255,0.03)",
  size = 60,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
});

/* =============================================================================
   ANIMATED LINE CONNECTOR
   ============================================================================= */

const LineConnector = memo(function LineConnector({
  from,
  to,
  color = "rgba(255,255,255,0.1)",
  animated = true,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  animated?: boolean;
}) {
  const length = Math.sqrt(
    Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
  );
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="1"
        strokeDasharray={animated ? length : undefined}
        strokeDashoffset={animated ? length : undefined}
        style={
          animated
            ? { animation: `ecgDraw ${length * 0.01}s ease-out forwards` }
            : undefined
        }
      />
    </svg>
  );
});

/* =============================================================================
   RADIAL PROGRESS RING
   ============================================================================= */

const ProgressRing = memo(function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 4,
  color = "#06B6D4",
  label,
  inView,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  inView: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - (inView ? percentage / 100 : 0));

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
      </svg>
      <span
        className="text-lg font-bold text-white"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        {inView ? percentage : 0}%
      </span>
      {label && (
        <span className="text-xs text-white/50">{label}</span>
      )}
    </div>
  );
});

/* =============================================================================
   FLOATING ACTION CARD
   ============================================================================= */

const FloatingCard = memo(function FloatingCard({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const initialPos = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

/* =============================================================================
   PORTFOLIO PROJECT LINK CARD (reusable)
   ============================================================================= */

const ProjectLinkCard = memo(function ProjectLinkCard({
  emoji,
  name,
  desc,
  slug,
  color,
  borderStyle = "top",
}: {
  emoji: string;
  name: string;
  desc: string;
  slug: string;
  color: string;
  borderStyle?: "top" | "left" | "bottom";
}) {
  const borderProp = {
    top: { borderTop: `4px solid ${color}` },
    left: { borderLeft: `4px solid ${color}` },
    bottom: { borderBottom: `4px solid ${color}` },
  }[borderStyle];

  return (
    <Link href={`/projetos/${slug}`} className="block group">
      <div
        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
        style={borderProp}
      >
        <div className="text-2xl mb-2">{emoji}</div>
        <h4
          className="font-bold text-gray-900 text-sm"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {name}
        </h4>
        <p className="text-xs text-gray-500 mt-1">{desc}</p>
        <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity mt-2 inline-block">
          Ver site {"\u2192"}
        </span>
      </div>
    </Link>
  );
});

/* =============================================================================
   MINI MAP (bottom left)
   ============================================================================= */

const MiniMap = memo(function MiniMap({
  activeChapter,
  progress,
}: {
  activeChapter: number;
  progress: number;
}) {
  return (
    <div className="fixed left-4 bottom-4 z-40 hidden lg:block">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-white/5">
        <div className="flex gap-0.5">
          {CHAPTER_RANGES.map((_, i) => {
            const chStart = CHAPTER_RANGES[i].start / TOTAL_HEIGHT;
            const chEnd = CHAPTER_RANGES[i].end / TOTAL_HEIGHT;
            const chProgress =
              progress >= chEnd
                ? 1
                : progress <= chStart
                  ? 0
                  : (progress - chStart) / (chEnd - chStart);
            return (
              <div
                key={i}
                className="w-2 h-12 rounded-full overflow-hidden bg-white/5"
              >
                <div
                  className="w-full rounded-full transition-all duration-300"
                  style={{
                    height: `${chProgress * 100}%`,
                    backgroundColor:
                      activeChapter === i
                        ? "#06B6D4"
                        : "rgba(255,255,255,0.2)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
   PORTFOLIO STAT BADGE
   ============================================================================= */

const StatBadge = memo(function StatBadge({
  icon,
  value,
  label,
  color = "#06B6D4",
}: {
  icon: string;
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
      <span className="text-lg">{icon}</span>
      <div>
        <div
          className="text-sm font-bold"
          style={{ color, fontFamily: "var(--font-sora), sans-serif" }}
        >
          {value}
        </div>
        <div className="text-[10px] text-white/40">{label}</div>
      </div>
    </div>
  );
});

/* =============================================================================
   NAVIGATION DOTS
   ============================================================================= */

const NavigationDots = memo(function NavigationDots({
  activeChapter,
}: {
  activeChapter: number;
}) {
  const scrollToChapter = useCallback((index: number) => {
    const range = CHAPTER_RANGES[index];
    const targetY = range.start + (range.end - range.start) * 0.1;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-0 hidden md:flex">
      {/* Connecting line */}
      <div className="absolute top-0 bottom-0 w-px bg-white/10" />
      {CHAPTER_RANGES.map((ch, i) => (
        <div key={i} className="relative group">
          <button
            onClick={() => scrollToChapter(i)}
            className="relative z-10 p-2 transition-all duration-300"
            aria-label={`Ir para ${ch.label}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: activeChapter === i ? "14px" : "8px",
                height: activeChapter === i ? "14px" : "8px",
                backgroundColor:
                  activeChapter === i
                    ? "#06B6D4"
                    : "rgba(255,255,255,0.3)",
                boxShadow:
                  activeChapter === i
                    ? "0 0 12px rgba(6,182,212,0.5)"
                    : "none",
              }}
            />
          </button>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-lg bg-gray-900/90 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {ch.label}
          </div>
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   PROGRESS BAR
   ============================================================================= */

const ProgressBar = memo(function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]">
      <motion.div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #3B82F6, #06B6D4, #10B981, #F59E0B, #EAB308)",
          backgroundSize: "400% 100%",
          backgroundPositionX: `${progress * 100}%`,
        }}
      />
    </div>
  );
});

/* =============================================================================
   TYPING TEXT ANIMATION
   ============================================================================= */

const TypingText = memo(function TypingText({
  text,
  active,
  speed = 50,
}: {
  text: string;
  active: boolean;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [active, text, speed]);

  useEffect(() => {
    const blink = setInterval(
      () => setShowCursor((c) => !c),
      530
    );
    return () => clearInterval(blink);
  }, []);

  return (
    <span className="font-mono text-[#4ade80]">
      {displayed}
      <span
        className="inline-block w-2 h-5 ml-0.5 align-middle"
        style={{
          backgroundColor: showCursor
            ? "#4ade80"
            : "transparent",
        }}
      />
    </span>
  );
});

/* =============================================================================
   STAGGERED LETTER REVEAL
   ============================================================================= */

const LetterReveal = memo(function LetterReveal({
  text,
  active,
  className = "",
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: i * 0.05,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="inline-block"
          style={{ willChange: "transform, opacity" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
});

/* =============================================================================
   CHAPTER 0: PORTAL
   ============================================================================= */

const ChapterPortal = memo(function ChapterPortal({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const titleOpacity = useTransform(
    chapterProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const subtitleOpacity = useTransform(
    chapterProgress,
    [0.25, 0.35, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const portalOpacity = useTransform(
    chapterProgress,
    [0.45, 0.55, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const ctaOpacity = useTransform(
    chapterProgress,
    [0.65, 0.75, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const bgOpacity = useTransform(
    chapterProgress,
    [0, 0.9, 1],
    [1, 1, 0]
  );

  const starsY = useTransform(chapterProgress, [0, 1], ["0%", "-5%"]);
  const nebulaY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-15%"]
  );
  const textY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-50%"]
  );
  const portalY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-30%"]
  );

  const [titleActive, setTitleActive] = useState(false);
  const [subtitleActive, setSubtitleActive] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setTitleActive(v > 0.15);
    setSubtitleActive(v > 0.3);
  });

  const portalStats = [
    { label: "109 Paginas", delay: 0 },
    { label: "55+ Projetos", delay: 0.1 },
    { label: "52K+ Linhas", delay: 0.2 },
  ];

  return (
    <section
      className="relative"
      style={{ height: "1200px" }}
    >
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Background: pitch black */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#030014" }}
        />

        {/* Stars layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : starsY,
            willChange: "transform",
          }}
        >
          <StarField />
        </motion.div>

        {/* Nebulae layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : nebulaY,
            willChange: "transform",
          }}
        >
          <NebulaBlobs />
        </motion.div>

        {/* Floating orbs */}
        {!reducedMotion && (
          <FloatingOrbs count={4} baseColor="#8B5CF6" sizeRange={[80, 200]} />
        )}

        {/* Shooting star */}
        {!reducedMotion && <ShootingStar />}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Title */}
          <motion.div
            style={{
              opacity: titleOpacity,
              y: reducedMotion ? 0 : textY,
              willChange: "transform, opacity",
            }}
            className="text-center mb-4"
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                background:
                  "linear-gradient(135deg, #3B82F6, #06B6D4, #8B5CF6)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: reducedMotion
                  ? undefined
                  : "gradientTitle 4s ease-in-out infinite",
                textShadow: "none",
                filter:
                  "drop-shadow(0 0 20px rgba(6,182,212,0.3)) drop-shadow(0 0 40px rgba(139,92,246,0.2)) drop-shadow(0 0 60px rgba(59,130,246,0.15))",
              }}
            >
              <LetterReveal
                text="DESCOMPLICAI"
                active={titleActive}
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            style={{
              opacity: subtitleOpacity,
              y: reducedMotion ? 0 : textY,
              willChange: "transform, opacity",
            }}
            className="mb-12 text-center px-4"
          >
            <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto">
              <TypingText
                text="Uma jornada pelo universo da inteligencia artificial"
                active={subtitleActive}
              />
            </p>
          </motion.div>

          {/* Portal circles */}
          <motion.div
            style={{
              opacity: portalOpacity,
              y: reducedMotion ? 0 : portalY,
              willChange: "transform, opacity",
            }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            {portalStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  titleActive
                    ? { scale: 1, opacity: 1 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: stat.delay + 0.5,
                }}
              >
                <GlassCard className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-center p-3">
                  <span
                    className="text-sm sm:text-base font-semibold text-white/90"
                    style={{
                      fontFamily:
                        "var(--font-sora), sans-serif",
                    }}
                  >
                    {stat.label}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              willChange: "opacity",
            }}
            className="text-white/60 text-sm"
          >
            <motion.p
              animate={
                reducedMotion
                  ? {}
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Desce para comecar \u2193
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 1: O INICIO
   ============================================================================= */

const ChapterInicio = memo(function ChapterInicio({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgGradient = useTransform(
    chapterProgress,
    [0, 0.3, 0.7, 1],
    [
      "linear-gradient(180deg, #030014, #1e1b4b, #312e81)",
      "linear-gradient(180deg, #312e81, #6d28d9, #db2777)",
      "linear-gradient(180deg, #db2777, #f97316, #fbbf24)",
      "linear-gradient(180deg, #f97316, #fbbf24, #60a5fa)",
    ]
  );

  const mountainsY1 = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-10%"]
  );
  const mountainsY2 = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-25%"]
  );
  const hillsY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-50%"]
  );
  const groundY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-80%"]
  );

  const charX = useTransform(
    chapterProgress,
    [0.05, 0.45, 0.5, 1],
    ["-60%", "0%", "0%", "60%"]
  );

  const [scrolling, setScrolling] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showMantra, setShowMantra] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setScrolling(v > 0.05 && v < 0.95);
    setShowBubble(v > 0.2);
    setShowBio(v > 0.35);
    setShowValues(v > 0.65);
    setShowQuote(v > 0.5);
    setShowMantra(v > 0.85);
  });

  const bioCards = [
    { emoji: "\u{1F3E0}", text: "Fuzeta, Algarve \u2192 Figueira da Foz" },
    {
      emoji: "\u{1F393}",
      text: "MSc Engenharia \u2014 Instituto Superior Tecnico",
    },
    { emoji: "\u{1F4A1}", text: "Fundador da Descomplicai" },
  ];

  const valueCards = [
    {
      emoji: "\u{1F91D}",
      title: "Humanos Primeiro",
      desc: "A tecnologia e o meio, nao o fim.",
    },
    {
      emoji: "\u{1F30A}",
      title: "Vida Autentica",
      desc: "Surf, natureza, codigo com proposito.",
    },
    {
      emoji: "\u2764\uFE0F",
      title: "Amor no Codigo",
      desc: "Cada linha escrita com intencao.",
    },
  ];

  return (
    <section className="relative" style={{ height: "1600px" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Sky gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ background: bgGradient }}
        />

        {/* Mountain layer 1 - distant */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[60%]"
          style={{
            y: reducedMotion ? 0 : mountainsY1,
            willChange: "transform",
          }}
        >
          <MountainLayer
            color="#1e1b4b"
            pathD="M0,160 C240,80 480,200 720,120 C960,40 1200,180 1440,100 L1440,320 L0,320 Z"
          />
        </motion.div>

        {/* Mountain layer 2 - mid */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[50%]"
          style={{
            y: reducedMotion ? 0 : mountainsY2,
            willChange: "transform",
          }}
        >
          <MountainLayer
            color="#312e81"
            pathD="M0,200 C180,140 360,240 540,180 C720,120 900,220 1080,160 C1260,100 1350,200 1440,160 L1440,320 L0,320 Z"
          />
        </motion.div>

        {/* Hills layer */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[40%]"
          style={{
            y: reducedMotion ? 0 : hillsY,
            willChange: "transform",
          }}
        >
          <MountainLayer
            color="#166534"
            pathD="M0,240 C120,200 240,260 360,220 C480,180 600,250 720,210 C840,170 960,240 1080,200 C1200,160 1320,230 1440,200 L1440,320 L0,320 Z"
          />
        </motion.div>

        {/* Ground + leaves */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[20%]"
          style={{
            y: reducedMotion ? 0 : groundY,
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0 bg-[#15803d]" />
        </motion.div>

        {/* Ambient particles */}
        {!reducedMotion && (
          <AmbientParticles type="leaves" count={20} />
        )}

        {/* Content layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          {/* Character */}
          <motion.div
            className="absolute bottom-[25%] z-20"
            style={{
              x: reducedMotion ? 0 : charX,
              willChange: "transform",
            }}
          >
            {showBubble && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <SpeechBubble
                  text={
                    showMantra
                      ? "O futuro e humano."
                      : "Ola! Sou o Jaime."
                  }
                />
              </div>
            )}
            <PixelCharacter
              variant="normal"
              walking={scrolling}
              size={56}
            />
          </motion.div>

          {/* Quote behind character */}
          <AnimatePresence>
            {showQuote && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                className="absolute text-3xl sm:text-4xl md:text-5xl font-serif text-white text-center max-w-3xl px-4"
                style={{
                  fontFamily: "var(--font-inter), serif",
                  top: "20%",
                }}
              >
                Acredito que a tecnologia deve servir pessoas.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Bio cards */}
          <AnimatePresence>
            {showBio && (
              <motion.div className="absolute top-[12%] right-4 sm:right-[10%] flex flex-col gap-3 z-20 max-w-xs">
                {bioCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: 60,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: i * 0.15,
                    }}
                  >
                    <GlassCard className="px-4 py-3 text-white/90 text-sm">
                      <span className="mr-2">
                        {card.emoji}
                      </span>
                      {card.text}
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Value cards */}
          <AnimatePresence>
            {showValues && (
              <motion.div className="absolute bottom-[38%] left-4 sm:left-[8%] flex flex-col sm:flex-row gap-3 z-20">
                {valueCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: i * 0.3,
                    }}
                    className="bg-white rounded-xl p-4 shadow-lg max-w-[180px] group hover:shadow-xl transition-shadow cursor-default"
                  >
                    <div className="text-2xl mb-1">
                      {card.emoji}
                    </div>
                    <h4
                      className="font-bold text-gray-900 text-sm mb-1"
                      style={{
                        fontFamily:
                          "var(--font-sora), sans-serif",
                      }}
                    >
                      {card.title}
                    </h4>
                    <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 2: A OFICINA
   ============================================================================= */

const ChapterOficina = memo(function ChapterOficina({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const [ref, inView] = useInView(0.1);
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);

  const [showSkills, setShowSkills] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setShowSkills(v > 0.15);
    setShowStats(v > 0.4);
    setShowProcess(v > 0.6);
    setShowBubble(v > 0.85);
  });

  const techSkills = [
    { name: "React", pct: 95 },
    { name: "TypeScript", pct: 92 },
    { name: "Next.js", pct: 90 },
    { name: "Python", pct: 85 },
    { name: "Three.js", pct: 78 },
  ];

  const creativeSkills = [
    { name: "UI/UX Design", pct: 93 },
    { name: "Brand Identity", pct: 88 },
    { name: "Motion Design", pct: 85 },
    { name: "Content Strategy", pct: 82 },
  ];

  const stats = [
    { value: 109, suffix: "", label: "Paginas criadas" },
    { value: 55, suffix: "+", label: "Projetos completos" },
    { value: 52, suffix: "K+", label: "Linhas de codigo" },
    { value: 1, suffix: "", label: "Noite para criar tudo" },
  ];

  const processSteps = [
    { step: 1, label: "Conversa", icon: "\u{1F4AC}" },
    { step: 2, label: "Pesquisa", icon: "\u{1F50D}" },
    { step: 3, label: "Design", icon: "\u{1F3A8}" },
    { step: 4, label: "Build", icon: "\u{1F528}" },
  ];

  return (
    <section className="relative" style={{ height: "1400px" }} ref={ref}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Warm workshop background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#fef3c7" }}
        />

        {/* Back wall with shelves */}
        <div
          className="absolute top-0 left-0 w-full h-[30%]"
          style={{ backgroundColor: "#92400E", opacity: 0.15 }}
        />

        {/* Ambient particles */}
        {!reducedMotion && (
          <AmbientParticles type="sparks" count={15} />
        )}

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col lg:flex-row items-start justify-center px-4 sm:px-8 lg:px-16 gap-8 pt-12 overflow-y-auto">
          {/* Left column - Tech Skills */}
          <div className="w-full lg:w-1/3">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={showSkills ? { opacity: 1, x: 0 } : {}}
              className="text-lg font-bold text-gray-800 mb-4"
              style={{
                fontFamily: "var(--font-sora), sans-serif",
              }}
            >
              {"\u{1F4BB}"} Technical Skills
            </motion.h3>
            {techSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.pct}
                gradient="linear-gradient(90deg, #3B82F6, #06B6D4)"
                inView={showSkills}
                delay={i * 0.15}
              />
            ))}

            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={showSkills ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-lg font-bold text-gray-800 mb-4 mt-6"
              style={{
                fontFamily: "var(--font-sora), sans-serif",
              }}
            >
              {"\u{1F3A8}"} Creative Skills
            </motion.h3>
            {creativeSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.pct}
                gradient="linear-gradient(90deg, #8B5CF6, #EC4899)"
                inView={showSkills}
                delay={i * 0.15 + 0.5}
              />
            ))}
          </div>

          {/* Center column - Stats + Character */}
          <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
            {/* Character sitting at desk */}
            <div className="relative mb-4">
              <div className="bg-amber-800 rounded-t-lg w-40 h-3" />
              <div className="bg-amber-700 rounded w-48 h-20 flex items-start justify-center pt-2">
                <PixelCharacter variant="sitting" size={48} />
              </div>
              <div className="bg-amber-900 w-2 h-12 mx-auto" />
            </div>

            {/* Stats */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3 w-full max-w-xs"
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gray-900 rounded-xl p-3 text-center"
                      style={{
                        boxShadow:
                          "0 0 15px rgba(6,182,212,0.15)",
                      }}
                    >
                      <div
                        className="text-2xl font-black text-white"
                        style={{
                          fontFamily:
                            "var(--font-sora), sans-serif",
                        }}
                      >
                        <AnimatedCounter
                          target={stat.value}
                          suffix={stat.suffix}
                          inView={showStats}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Speech bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <SpeechBubble text="Estas sao as ferramentas. Agora vou mostrar-te o que construi com elas." />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right column - Process */}
          <div className="w-full lg:w-1/3">
            <AnimatePresence>
              {showProcess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3
                    className="text-lg font-bold text-gray-800 mb-6"
                    style={{
                      fontFamily:
                        "var(--font-sora), sans-serif",
                    }}
                  >
                    {"\u{1F5FA}\u{FE0F}"} Processo
                  </h3>
                  <div className="flex flex-col gap-4">
                    {processSteps.map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: i * 0.2,
                          type: "spring",
                        }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-xl">
                          {p.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-800">
                            {p.step}. {p.label}
                          </div>
                        </div>
                        {i < processSteps.length - 1 && (
                          <motion.div
                            className="absolute ml-6 mt-14 w-px h-4 bg-gray-300"
                            initial={{
                              scaleY: 0,
                            }}
                            animate={{
                              scaleY: 1,
                            }}
                            transition={{
                              delay:
                                i * 0.2 + 0.1,
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Extra skill badges */}
            <AnimatePresence>
              {showProcess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6"
                >
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    Outras competencias
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Node.js", level: "advanced" as const, color: "#10B981" },
                      { name: "PostgreSQL", level: "advanced" as const, color: "#3B82F6" },
                      { name: "Docker", level: "intermediate" as const, color: "#06B6D4" },
                      { name: "Git", level: "expert" as const, color: "#F59E0B" },
                      { name: "Figma", level: "expert" as const, color: "#A855F7" },
                      { name: "Tailwind", level: "expert" as const, color: "#06B6D4" },
                      { name: "Prisma", level: "advanced" as const, color: "#2563EB" },
                      { name: "Supabase", level: "advanced" as const, color: "#10B981" },
                      { name: "Vercel", level: "expert" as const, color: "#000000" },
                      { name: "Framer Motion", level: "expert" as const, color: "#EC4899" },
                    ].map((skill, i) => (
                      <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={skill.color}
                        inView={showProcess}
                        delay={0.8 + i * 0.05}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress rings */}
            <AnimatePresence>
              {showProcess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6"
                >
                  <h4 className="text-sm font-semibold text-gray-600 mb-4">
                    Satisfacao dos clientes
                  </h4>
                  <div className="flex gap-6 justify-center">
                    <ProgressRing
                      percentage={98}
                      color="#10B981"
                      label="Satisfacao"
                      inView={showProcess}
                      size={70}
                    />
                    <ProgressRing
                      percentage={100}
                      color="#3B82F6"
                      label="Entrega"
                      inView={showProcess}
                      size={70}
                    />
                    <ProgressRing
                      percentage={95}
                      color="#8B5CF6"
                      label="Repeticao"
                      inView={showProcess}
                      size={70}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 3: VILA DOS SABORES
   ============================================================================= */

const ChapterVila = memo(function ChapterVila({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);

  const skyY = useTransform(chapterProgress, [0, 1], ["0%", "-10%"]);
  const rooftopsY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-20%"]
  );
  const streetY = useTransform(
    chapterProgress,
    [0, 1],
    ["0%", "-40%"]
  );

  const charX = useTransform(
    chapterProgress,
    [0.05, 0.95],
    ["-50%", "50%"]
  );

  const [scrolling, setScrolling] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showEndBubble, setShowEndBubble] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setScrolling(v > 0.05 && v < 0.95);
    setVisibleCards(Math.floor(v * 10));
    setShowEndBubble(v > 0.88);
  });

  return (
    <section className="relative" style={{ height: "1600px" }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Sky */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #7DD3FC, #BAE6FD, #E0F2FE)",
            y: reducedMotion ? 0 : skyY,
            willChange: "transform",
          }}
        />

        {/* Clouds */}
        {!reducedMotion && (
          <motion.div
            className="absolute top-[8%] w-full"
            style={{
              y: reducedMotion ? 0 : skyY,
              willChange: "transform",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/70"
                style={{
                  width: `${100 + i * 40}px`,
                  height: `${40 + i * 10}px`,
                  left: `${15 + i * 30}%`,
                  top: `${i * 20}px`,
                  animation: `cloudDrift ${20 + i * 5}s linear infinite`,
                  willChange: "transform",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Terracotta rooftops */}
        <motion.div
          className="absolute bottom-[40%] left-0 w-full h-[30%]"
          style={{
            y: reducedMotion ? 0 : rooftopsY,
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0 flex justify-around items-end">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  width: `${80 + seededRandom(i * 17) * 60}px`,
                  height: `${60 + seededRandom(i * 17 + 1) * 40}px`,
                }}
              >
                {/* Roof */}
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: "20px",
                    backgroundColor: "#C2410C",
                    clipPath:
                      "polygon(0% 100%, 50% 0%, 100% 100%)",
                  }}
                />
                {/* Building */}
                <div
                  className="absolute bottom-0 left-[10%] w-[80%] h-[70%] rounded-t"
                  style={{
                    backgroundColor: `hsl(${30 + seededRandom(i * 17 + 2) * 20}, 70%, ${70 + seededRandom(i * 17 + 3) * 15}%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cobblestone street */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[35%]"
          style={{
            y: reducedMotion ? 0 : streetY,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#D6D3D1" }}
          />
          {/* Bunting / flags */}
          {!reducedMotion && (
            <div className="absolute -top-6 left-0 w-full flex justify-center">
              <svg
                viewBox="0 0 800 40"
                className="w-full max-w-3xl h-10"
              >
                <path
                  d="M0,5 Q200,30 400,5 Q600,30 800,5"
                  fill="none"
                  stroke="#D6D3D1"
                  strokeWidth="1"
                />
                {Array.from({ length: 12 }, (_, i) => {
                  const x = 30 + i * 65;
                  const colors = [
                    "#EF4444",
                    "#F59E0B",
                    "#10B981",
                    "#3B82F6",
                    "#8B5CF6",
                    "#EC4899",
                  ];
                  return (
                    <polygon
                      key={i}
                      points={`${x},8 ${x + 12},8 ${x + 6},22`}
                      fill={
                        colors[i % colors.length]
                      }
                      style={{
                        animation: `flagWave ${1.5 + seededRandom(i * 41) * 0.5}s ease-in-out infinite`,
                        transformOrigin: `${x + 6}px 8px`,
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </motion.div>

        {/* Steam particles */}
        {!reducedMotion && (
          <AmbientParticles type="steam" count={20} />
        )}

        {/* Character walking */}
        <motion.div
          className="absolute bottom-[30%] z-30"
          style={{
            left: "50%",
            x: reducedMotion ? 0 : charX,
            willChange: "transform",
          }}
        >
          {showEndBubble && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <SpeechBubble text="17 restaurantes. Cada um com a sua personalidade." />
            </div>
          )}
          <PixelCharacter
            variant="chef"
            walking={scrolling}
            size={48}
          />
        </motion.div>

        {/* Restaurant storefronts */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 z-20 overflow-y-auto px-4">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {"\u{1F3D8}\u{FE0F}"} Vila dos Sabores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
            {RESTAURANT_DATA.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={
                  visibleCards > i
                    ? { opacity: 1, scale: 1 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: (i % 4) * 0.1,
                }}
              >
                <Link
                  href={`/projetos/${r.slug}`}
                  className="block group"
                >
                  <div
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                    style={{
                      borderTop: `4px solid ${r.color}`,
                    }}
                  >
                    {/* Awning */}
                    <div
                      className="h-8 flex items-center justify-center"
                      style={{
                        background: `repeating-linear-gradient(90deg, ${r.color}, ${r.color} 20px, white 20px, white 40px)`,
                        opacity: 0.3,
                      }}
                    />
                    <div className="p-4">
                      <div className="text-2xl mb-1">
                        {r.emoji}
                      </div>
                      <h4
                        className="font-bold text-gray-900 text-sm"
                        style={{
                          fontFamily:
                            "var(--font-sora), sans-serif",
                        }}
                      >
                        {r.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {r.desc}
                      </p>
                      <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity mt-2 inline-block">
                        Ver site {"\u2192"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* More restaurants - second row */}
          <h3
            className="text-lg font-semibold text-gray-700 mt-8 mb-4 text-center"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            E mais...
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 max-w-5xl w-full pb-8">
            {MORE_RESTAURANT_DATA.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  visibleCards > 6 + i
                    ? { opacity: 1, y: 0 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: (i % 4) * 0.08,
                }}
              >
                <Link
                  href={`/projetos/${r.slug}`}
                  className="block group"
                >
                  <div
                    className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer text-center"
                    style={{
                      borderBottom: `3px solid ${r.color}`,
                    }}
                  >
                    <div className="text-xl mb-0.5">
                      {r.emoji}
                    </div>
                    <h4
                      className="font-bold text-gray-900 text-[10px] truncate"
                      style={{
                        fontFamily: "var(--font-sora), sans-serif",
                      }}
                    >
                      {r.name}
                    </h4>
                    <p className="text-[8px] text-gray-400 mt-0.5 truncate">
                      {r.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Restaurant count badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visibleCards > 12 ? { opacity: 1 } : {}}
            className="flex justify-center mt-4 mb-8"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-6 py-2 border border-white/10">
              <span className="text-sm font-bold text-white">
                {RESTAURANT_DATA.length + MORE_RESTAURANT_DATA.length} restaurantes
              </span>
              <span className="text-xs text-white/50 ml-2">digitalizados</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 4: DISTRITO DA SAUDE
   ============================================================================= */

const ChapterSaude = memo(function ChapterSaude({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);
  const [visibleCards, setVisibleCards] = useState(0);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setVisibleCards(Math.floor(v * 12));
  });

  return (
    <section className="relative" style={{ height: "1400px" }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Light blue sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #DBEAFE, #EFF6FF, #F0F9FF)",
          }}
        />

        {/* Modern buildings */}
        <div className="absolute bottom-0 left-0 w-full h-[30%]">
          <div className="absolute inset-0 flex justify-around items-end px-8">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="rounded-t-lg"
                style={{
                  width: `${100 + i * 20}px`,
                  height: `${80 + seededRandom(i * 23 + 1) * 60}px`,
                  backgroundColor: `rgba(147, 197, 253, ${0.2 + seededRandom(i * 23) * 0.15})`,
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(147,197,253,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ECG line */}
        {!reducedMotion && <ECGLine />}

        {/* Heartbeat particles */}
        {!reducedMotion && (
          <AmbientParticles type="heartbeat" count={10} />
        )}

        {/* Character */}
        <div className="absolute bottom-[25%] left-[10%] z-20">
          <PixelCharacter variant="lab" size={48} />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 z-10 overflow-y-auto px-4">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {"\u{1F3E5}"} Distrito da Saude
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            8 clinicas digitalizadas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
            {CLINIC_DATA.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  visibleCards > i
                    ? { opacity: 1, y: 0 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: (i % 4) * 0.1,
                }}
              >
                <Link
                  href={`/projetos/${c.slug}`}
                  className="block group"
                >
                  <div
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                    style={{
                      borderLeft: `4px solid ${c.color}`,
                    }}
                  >
                    <div className="text-2xl mb-2">
                      {c.emoji}
                    </div>
                    <h4
                      className="font-bold text-gray-900 text-sm"
                      style={{
                        fontFamily:
                          "var(--font-sora), sans-serif",
                      }}
                    >
                      {c.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {c.desc}
                    </p>
                    <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity mt-2 inline-block">
                      Ver site {"\u2192"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 5: LABORATORIO
   ============================================================================= */

const ChapterLab = memo(function ChapterLab({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCards, setVisibleCards] = useState(0);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setVisibleCards(Math.floor(v * 50));
  });

  const filteredTools = useMemo(() => {
    if (activeCategory === "all") return TOOL_DATA;
    return TOOL_DATA.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative" style={{ height: "1800px" }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Dark lab background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#0f172a" }}
        />

        {/* Neon grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Circuit board pattern subtle */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #06B6D4 1px, transparent 1px), radial-gradient(circle at 75% 75%, #8B5CF6 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        {/* Binary particles */}
        {!reducedMotion && (
          <AmbientParticles type="binary" count={25} />
        )}

        {/* Character with visor */}
        <div className="absolute bottom-8 left-8 z-30">
          <PixelCharacter variant="hacker" size={48} />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col pt-6 px-4 sm:px-8 overflow-y-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {"\u{1F52C}"} Laboratorio
          </h2>
          <p className="text-sm text-gray-400 mb-4 text-center">
            30+ ferramentas e experiencias interativas
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {Object.entries(CATEGORY_LABELS).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === key
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Tool cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-7xl mx-auto w-full pb-16">
            {filteredTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  visibleCards > i
                    ? { opacity: 1, scale: 1 }
                    : {}
                }
                transition={{
                  delay: (i % 3) * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Link
                  href={`/projetos/${tool.slug}`}
                  className="block group"
                >
                  <div
                    className="rounded-xl p-3 transition-all hover:-translate-y-1 cursor-pointer"
                    style={{
                      backgroundColor:
                        "rgba(15,23,42,0.8)",
                      border: `1px solid ${tool.color}20`,
                      boxShadow: `0 0 0 0 ${tool.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.boxShadow = `0 0 20px ${tool.color}30`;
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.borderColor = `${tool.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.boxShadow = `0 0 0 0 ${tool.color}00`;
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.borderColor = `${tool.color}20`;
                    }}
                  >
                    {/* Mini preview */}
                    <div className="mb-2 rounded-lg bg-black/30 p-2">
                      <ToolPreview
                        type={tool.preview}
                        color={tool.color}
                      />
                    </div>
                    <div className="text-lg mb-1">
                      {tool.emoji}
                    </div>
                    <h4
                      className="font-bold text-white text-xs truncate"
                      style={{
                        fontFamily:
                          "var(--font-sora), sans-serif",
                      }}
                    >
                      {tool.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                      {tool.desc}
                    </p>
                    <span className="text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1 inline-block">
                      Experimentar {"\u2192"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured portfolio experiences */}
          <AnimatePresence>
            {visibleCards > 20 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
              >
                <GlassCard className="px-4 py-2 flex items-center gap-4">
                  <span className="text-xs text-white/50">
                    {filteredTools.length} experiencias
                  </span>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="text-xs text-cyan-400">
                    Clica para experimentar
                  </span>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Portfolio sites section */}
          <AnimatePresence>
            {visibleCards > 30 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-20 right-8 z-20 hidden lg:block"
              >
                <GradientBorderCard
                  gradient="linear-gradient(135deg, #06B6D4, #8B5CF6)"
                  className="max-w-[200px]"
                >
                  <div className="p-3">
                    <h5
                      className="text-xs font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-sora), sans-serif" }}
                    >
                      Sites portfolio
                    </h5>
                    <div className="flex flex-col gap-1">
                      {[
                        { name: "Cosmos", slug: "descomplicai-cosmos" },
                        { name: "Terminal", slug: "descomplicai-terminal" },
                        { name: "Editorial", slug: "descomplicai-editorial" },
                        { name: "Jardim", slug: "descomplicai-jardim" },
                        { name: "Brutalist", slug: "descomplicai-brutalist" },
                      ].map((site) => (
                        <Link
                          key={site.slug}
                          href={`/projetos/${site.slug}`}
                          className="text-[10px] text-white/40 hover:text-cyan-400 transition-colors"
                        >
                          {site.name} {"\u2192"}
                        </Link>
                      ))}
                    </div>
                  </div>
                </GradientBorderCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 6: A JORNADA (TIMELINE)
   ============================================================================= */

const ChapterJornada = memo(function ChapterJornada({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);
  const lineProgress = useTransform(chapterProgress, [0.1, 0.9], [0, 1]);
  const lineProgressSpring = useSpring(lineProgress, {
    stiffness: 100,
    damping: 30,
  });

  const [visibleMilestones, setVisibleMilestones] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setVisibleMilestones(Math.floor(v * 10));
    setScrolling(v > 0.05 && v < 0.95);
  });

  return (
    <section className="relative" style={{ height: "1200px" }}>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ opacity: bgOpacity }}
      >
        {/* Golden hour sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F59E0B, #EC4899, #7C3AED, #312e81)",
          }}
        />

        {/* Sun rays */}
        <div
          className="absolute"
          style={{
            width: "300px",
            height: "300px",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.1) 40%, transparent 70%)",
          }}
        />

        {/* Clouds lit from below */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 50}px`,
              height: `${50 + i * 15}px`,
              left: `${10 + i * 35}%`,
              top: `${30 + i * 8}%`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(251,191,36,0.2))",
            }}
          />
        ))}

        {/* Golden dust */}
        {!reducedMotion && (
          <AmbientParticles type="dust" count={25} />
        )}

        {/* Road/path */}
        <div
          className="absolute bottom-0 left-0 w-full h-[15%]"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(30,27,75,0.4))",
          }}
        />

        {/* Character walking along timeline */}
        <motion.div
          className="absolute bottom-[12%] z-20"
          style={{
            left: `${10}%`,
            willChange: "transform",
          }}
        >
          <PixelCharacter
            variant="normal"
            walking={scrolling}
            size={40}
          />
        </motion.div>

        {/* Timeline content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center pt-8 px-4 overflow-y-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            {"\u{1F4C5}"} A Jornada
          </h2>

          <div className="relative max-w-2xl w-full pb-16">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
              <div className="w-full h-full bg-white/10" />
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400 to-amber-600"
                style={{
                  scaleY: lineProgressSpring,
                  transformOrigin: "top",
                  height: "100%",
                }}
              />
            </div>

            {/* Milestones */}
            {TIMELINE_DATA.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-center mb-8 ${
                    isLeft
                      ? "flex-row"
                      : "flex-row-reverse"
                  }`}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -40 : 40,
                  }}
                  animate={
                    visibleMilestones > i
                      ? { opacity: 1, x: 0 }
                      : {}
                  }
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.1,
                  }}
                >
                  {/* Card */}
                  <div
                    className={`w-[45%] ${isLeft ? "pr-6 text-right" : "pl-6 text-left"}`}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-3xl font-black text-amber-300 mb-1">
                        {milestone.year}
                      </div>
                      <p className="text-sm text-white/80">
                        {milestone.title}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-lg shadow-lg"
                      initial={{ scale: 0 }}
                      animate={
                        visibleMilestones > i
                          ? { scale: 1 }
                          : {}
                      }
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.05,
                      }}
                      style={{
                        boxShadow:
                          "0 0 20px rgba(245,158,11,0.4)",
                      }}
                    >
                      {milestone.emoji}
                    </motion.div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
});

/* =============================================================================
   CHAPTER 7: O TOPO
   ============================================================================= */

const ChapterTopo = memo(function ChapterTopo({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: ReturnType<typeof useTransform>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);

  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showFlip, setShowFlip] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setShowText1(v > 0.1);
    setShowText2(v > 0.25);
    setShowText3(v > 0.4);
    setShowFlip(v > 0.55);
    setShowBubble(v > 0.6);
    setShowContact(v > 0.7);
    setShowConstellation(v > 0.85);
    setShowConfetti(v > 0.95);
    setShowFooter(v > 0.95);
  });

  const contactLinks = [
    {
      emoji: "\u{1F4E7}",
      label: "jdsds.pt@gmail.com",
      href: "mailto:jdsds.pt@gmail.com",
    },
    {
      emoji: "\u{1F419}",
      label: "github.com/DjimieSilva",
      href: "https://github.com/DjimieSilva",
    },
    {
      emoji: "\u{1F4BC}",
      label: "LinkedIn",
      href: "https://linkedin.com/in/jaime-silva",
    },
    {
      emoji: "\u{1F310}",
      label: "descomplicai.pt",
      href: "https://descomplicai.pt",
    },
  ];

  const constellationStats = [
    "109 Paginas",
    "55+ Projetos",
    "52K Linhas",
    "30+ Tools",
    "25 Sites",
    "1 Noite",
  ];

  return (
    <section className="relative" style={{ height: "1800px" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: bgOpacity }}
        >
          {/* Star field (returning to space theme) */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#030014" }}
          />
          <StarField />

          {/* Northern lights */}
          {!reducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute"
                style={{
                  width: "200%",
                  height: "200px",
                  top: "15%",
                  left: "-50%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(34,197,94,0.15), rgba(139,92,246,0.15), rgba(34,197,94,0.1), transparent)",
                  filter: "blur(40px)",
                  animation:
                    "auroraWave 8s ease-in-out infinite",
                  willChange: "transform",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "200%",
                  height: "150px",
                  top: "20%",
                  left: "-30%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.1), rgba(236,72,153,0.1), transparent)",
                  filter: "blur(50px)",
                  animation:
                    "auroraWave 12s ease-in-out 2s infinite",
                  willChange: "transform",
                }}
              />
            </div>
          )}

          {/* Cloud layer below */}
          <div
            className="absolute bottom-[20%] left-0 w-full h-[15%]"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05), transparent)",
            }}
          />

          {/* Mountain peak */}
          <svg
            viewBox="0 0 1440 200"
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L0,200 L600,200 L720,40 L840,200 L1440,200 L1440,200 Z"
              fill="#1E1B4B"
            />
          </svg>

          {/* Snowflakes */}
          {!reducedMotion && (
            <AmbientParticles type="snow" count={30} />
          )}

          {/* Character at the peak */}
          <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 z-20">
            {showBubble && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <SpeechBubble text="Obrigado por fazeres esta jornada comigo." />
              </div>
            )}
            <PixelCharacter
              variant="hero"
              flipped={showFlip}
              size={56}
            />
          </div>

          {/* Epic text sequence */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-[10%] z-10 px-4">
            <AnimatePresence>
              {showText1 && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 text-center"
                  style={{
                    fontFamily:
                      "var(--font-sora), sans-serif",
                  }}
                >
                  Keep building.
                </motion.h2>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showText2 && (
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-300 mb-4 text-center"
                  style={{
                    fontFamily:
                      "var(--font-sora), sans-serif",
                  }}
                >
                  Share Love.
                </motion.h3>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showText3 && (
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-300 mb-8 text-center"
                  style={{
                    fontFamily:
                      "var(--font-sora), sans-serif",
                  }}
                >
                  O futuro e humano.
                </motion.h3>
              )}
            </AnimatePresence>

            {/* Services section */}
            <AnimatePresence>
              {showText3 && !showContact && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl w-full mx-auto mb-6"
                >
                  {[
                    {
                      icon: "\u{1F310}",
                      title: "Websites",
                      desc: "Sites modernos, rapidos e responsivos com Next.js e React",
                      gradient: "from-blue-500/20 to-cyan-500/20",
                    },
                    {
                      icon: "\u{1F3A8}",
                      title: "Branding",
                      desc: "Identidade visual completa para o teu negocio",
                      gradient: "from-purple-500/20 to-pink-500/20",
                    },
                    {
                      icon: "\u{1F4F1}",
                      title: "Apps Web",
                      desc: "Aplicacoes interativas e ferramentas personalizadas",
                      gradient: "from-green-500/20 to-emerald-500/20",
                    },
                    {
                      icon: "\u{1F916}",
                      title: "Automacao",
                      desc: "Fluxos automatizados com IA para poupar tempo",
                      gradient: "from-amber-500/20 to-orange-500/20",
                    },
                    {
                      icon: "\u{1F4CA}",
                      title: "Consultoria",
                      desc: "Estrategia digital e optimizacao de processos",
                      gradient: "from-indigo-500/20 to-violet-500/20",
                    },
                    {
                      icon: "\u{1F91D}",
                      title: "Mentoria",
                      desc: "Acompanhamento personalizado para devs e empreendedores",
                      gradient: "from-rose-500/20 to-red-500/20",
                    },
                  ].map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                    >
                      <GlassCard className="p-4 h-full">
                        <div className="text-2xl mb-2">{service.icon}</div>
                        <h5
                          className="text-sm font-bold text-white mb-1"
                          style={{ fontFamily: "var(--font-sora), sans-serif" }}
                        >
                          {service.title}
                        </h5>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          {service.desc}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonials / Social proof */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-lg w-full mx-auto mb-6"
                >
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <StatBadge
                      icon={"\u{1F4C4}"}
                      value="109"
                      label="Paginas"
                      color="#06B6D4"
                    />
                    <StatBadge
                      icon={"\u{1F4BB}"}
                      value="55+"
                      label="Projetos"
                      color="#8B5CF6"
                    />
                    <StatBadge
                      icon={"\u{1F4DD}"}
                      value="52K+"
                      label="Linhas"
                      color="#10B981"
                    />
                    <StatBadge
                      icon={"\u{1F3E5}"}
                      value="8"
                      label="Clinicas"
                      color="#EC4899"
                    />
                    <StatBadge
                      icon={"\u{1F37D}\u{FE0F}"}
                      value="17+"
                      label="Restaurantes"
                      color="#F59E0B"
                    />
                    <StatBadge
                      icon={"\u{1F6E0}\u{FE0F}"}
                      value="30+"
                      label="Tools"
                      color="#3B82F6"
                    />
                  </div>
                  <p className="text-center text-xs text-white/30 italic">
                    Tudo construido com paixao, uma linha de cada vez.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact section */}
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" }}
                >
                  <GlassCard className="px-6 sm:px-10 py-6 sm:py-8 max-w-md w-full mx-auto">
                    <h4
                      className="text-lg font-bold text-white mb-4 text-center"
                      style={{
                        fontFamily:
                          "var(--font-sora), sans-serif",
                      }}
                    >
                      Vamos conversar?
                    </h4>
                    <div className="flex flex-col gap-3">
                      {contactLinks.map((link, i) => (
                        <motion.a
                          key={i}
                          href={link.href}
                          target={
                            link.href.startsWith(
                              "mailto"
                            )
                              ? undefined
                              : "_blank"
                          }
                          rel="noopener noreferrer"
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: i * 0.1,
                          }}
                          className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
                        >
                          <span className="text-lg">
                            {link.emoji}
                          </span>
                          <span>{link.label}</span>
                        </motion.a>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Constellation stats */}
            <AnimatePresence>
              {showConstellation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 max-w-lg w-full mx-auto"
                >
                  <div className="relative">
                    {/* Connecting lines */}
                    <svg
                      viewBox="0 0 400 200"
                      className="absolute inset-0 w-full h-full"
                    >
                      <line
                        x1="67"
                        y1="50"
                        x2="200"
                        y2="50"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                      <line
                        x1="200"
                        y1="50"
                        x2="333"
                        y2="50"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                      <line
                        x1="67"
                        y1="150"
                        x2="200"
                        y2="150"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                      <line
                        x1="200"
                        y1="150"
                        x2="333"
                        y2="150"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                      <line
                        x1="67"
                        y1="50"
                        x2="67"
                        y2="150"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                      <line
                        x1="333"
                        y1="50"
                        x2="333"
                        y2="150"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="grid grid-cols-3 gap-4">
                      {constellationStats.map(
                        (stat, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              opacity: 0,
                              scale: 0,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              delay: i * 0.1,
                              type: "spring",
                            }}
                            className="text-center py-4"
                          >
                            <div
                              className="w-3 h-3 rounded-full bg-cyan-400 mx-auto mb-2"
                              style={{
                                boxShadow:
                                  "0 0 10px rgba(6,182,212,0.5)",
                              }}
                            />
                            <span
                              className="text-xs text-white/70"
                              style={{
                                fontFamily:
                                  "var(--font-sora), sans-serif",
                              }}
                            >
                              {stat}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <AnimatePresence>
              {showFooter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-center"
                >
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10 mb-4"
                  >
                    Voltar ao inicio {"\u2191"}
                  </button>
                  <p className="text-xs text-white/30">
                    {"\u00A9"} 2026 Descomplicai
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Confetti */}
      <ConfettiBurst active={showConfetti} />
    </section>
  );
});

/* =============================================================================
   MAIN PAGE COMPONENT
   ============================================================================= */

export default function ChronicleRPGPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const scrollPx = v * TOTAL_HEIGHT;
    for (let i = CHAPTER_RANGES.length - 1; i >= 0; i--) {
      if (scrollPx >= CHAPTER_RANGES[i].start) {
        setActiveChapter(i);
        break;
      }
    }
  });

  const ch0Progress = useChapterProgress(scrollYProgress, 0);
  const ch1Progress = useChapterProgress(scrollYProgress, 1);
  const ch2Progress = useChapterProgress(scrollYProgress, 2);
  const ch3Progress = useChapterProgress(scrollYProgress, 3);
  const ch4Progress = useChapterProgress(scrollYProgress, 4);
  const ch5Progress = useChapterProgress(scrollYProgress, 5);
  const ch6Progress = useChapterProgress(scrollYProgress, 6);
  const ch7Progress = useChapterProgress(scrollYProgress, 7);

  return (
    <>
      {/* Global CSS animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes nebulaDrift1 {
          0%, 100% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(30px) translateY(-20px); }
          66% { transform: translateX(-20px) translateY(15px); }
        }

        @keyframes nebulaDrift2 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-40px) translateY(25px); }
        }

        @keyframes nebulaDrift3 {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(25px) translateY(-15px); }
          75% { transform: translateX(-30px) translateY(20px); }
        }

        @keyframes shootingStar {
          0% { transform: translateX(-100px) rotate(-15deg); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translateX(120vw) rotate(-15deg); opacity: 0; }
          100% { transform: translateX(120vw) rotate(-15deg); opacity: 0; }
        }

        @keyframes gradientTitle {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes floatDown {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes sparkle {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-40px) scale(0.5); opacity: 0; }
        }

        @keyframes riseUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        @keyframes pulseGrow {
          0% { transform: scale(0.5); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
        }

        @keyframes eqBounce {
          0% { height: 4px; }
          100% { height: 24px; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes characterBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(0); }
        }

        @keyframes flagWave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes ecgDraw {
          0% { stroke-dashoffset: 1200; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes auroraWave {
          0%, 100% { transform: translateX(0) skewX(0deg); }
          25% { transform: translateX(5%) skewX(2deg); }
          50% { transform: translateX(-3%) skewX(-1deg); }
          75% { transform: translateX(4%) skewX(1deg); }
        }

        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes legWalk {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }

        @keyframes armSwing {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(10deg); }
        }

        @keyframes typing {
          0% { transform: rotate(25deg) translateY(0); }
          100% { transform: rotate(35deg) translateY(-2px); }
        }

        @keyframes capeFlutter {
          0%, 100% { transform: rotate(0deg) skewX(0deg); }
          50% { transform: rotate(5deg) skewX(5deg); }
        }

        /* Reduced motion overrides */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar but keep functionality */
        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        body::-webkit-scrollbar {
          width: 6px;
        }
        body::-webkit-scrollbar-track {
          background: transparent;
        }
        body::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative"
        style={{
          height: `${TOTAL_HEIGHT}px`,
          fontFamily: "var(--font-inter), sans-serif",
          color: "white",
        }}
      >
        {/* Persistent UI */}
        <ProgressBar progress={progress} />
        <NavigationDots activeChapter={activeChapter} />
        <MiniMap activeChapter={activeChapter} progress={progress} />
        <ScrollIndicator visible={progress < 0.05} />
        <ChapterTitle
          number={activeChapter}
          title={CHAPTER_RANGES[activeChapter].label}
          visible={progress > 0.02 && progress < 0.98}
        />

        {/* Chapters */}
        <ChapterPortal
          chapterProgress={ch0Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterInicio
          chapterProgress={ch1Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterOficina
          chapterProgress={ch2Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterVila
          chapterProgress={ch3Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterSaude
          chapterProgress={ch4Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterLab
          chapterProgress={ch5Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterJornada
          chapterProgress={ch6Progress}
          reducedMotion={reducedMotion}
        />
        <ChapterTopo
          chapterProgress={ch7Progress}
          reducedMotion={reducedMotion}
        />
      </div>
    </>
  );
}
