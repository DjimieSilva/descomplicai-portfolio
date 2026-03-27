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
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";

/* =============================================================================
   CONSTANTS & DATA
   ============================================================================= */

const TOTAL_HEIGHT = 12000;
const CHAPTER_RANGES = [
  { start: 0, end: 1200, label: "Portal" },
  { start: 1200, end: 2800, label: "O Início" },
  { start: 2800, end: 4200, label: "A Oficina" },
  { start: 4200, end: 5800, label: "Vila dos Sabores" },
  { start: 5800, end: 7200, label: "Distrito da Saúde" },
  { start: 7200, end: 9000, label: "Laboratório" },
  { start: 9000, end: 10200, label: "A Jornada" },
  { start: 10200, end: 12000, label: "O Topo" },
] as const;

const RESTAURANT_DATA = [
  {
    emoji: "\u{1F372}",
    name: "Caçarola",
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
    name: "Café Praça 18",
    desc: "O café icónico da praça",
    slug: "cafe-praca-18",
    color: "#92400E",
  },
  {
    emoji: "\u{1F99E}",
    name: "Marisqueira Rosa Amelia",
    desc: "Marisco fresco há gerações",
    slug: "marisqueira-rosa-amelia",
    color: "#0E7490",
  },
  {
    emoji: "\u{1F3C4}\u200D\u2642\u{FE0F}",
    name: "Nalu Cabedelo",
    desc: "Surf café à beira-mar",
    slug: "nalu-cabedelo",
    color: "#0D9488",
  },
  {
    emoji: "\u{1F305}",
    name: "Sand Murtinheira",
    desc: "Lounge de praia & pôr do sol",
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
    name: "Sabor Abençoado",
    desc: "Pastelaria artesanal",
    slug: "sabor-abencoado",
    color: "#DB2777",
  },
  {
    emoji: "\u{1F355}",
    name: "Zeff Pizza",
    desc: "Pizza napolitana autêntica",
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
    desc: "Tapas com espetáculo",
    slug: "o-picadeiro",
    color: "#E11D48",
  },
  {
    emoji: "\u{1F30A}",
    name: "Pé na Areia",
    desc: "Restaurante de praia",
    slug: "pe-na-areia",
    color: "#0891B2",
  },
  {
    emoji: "\u{1F3F0}",
    name: "Ribeirosanto",
    desc: "Cozinha de autor histórica",
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
    desc: "Escola de surf & bar",
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
    name: "Marégrafo",
    desc: "Fine dining à beira-mar",
    slug: "maregrafo",
    color: "#1E40AF",
  },
  {
    emoji: "\u{1F377}",
    name: "Rota dos Vinhos",
    desc: "Enoteca & degustação",
    slug: "rota-dos-vinhos",
    color: "#9F1239",
  },
  {
    emoji: "\u{1F3D5}\u{FE0F}",
    name: "Cataventos",
    desc: "Campismo & restaurante",
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
    desc: "O dentista das crianças",
    slug: "dentalkid",
    color: "#06B6D4",
  },
  {
    emoji: "\u{1F451}",
    name: "Clínica Vasco da Gama",
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
    desc: "Foco em prevenção",
    slug: "premium-clinica-dentaria",
    color: "#10B981",
  },
  {
    emoji: "\u{1F52C}",
    name: "Clínica Tamargueira",
    desc: "Implantologia",
    slug: "clinica-tamargueira",
    color: "#6366F1",
  },
  {
    emoji: "\u{1F3E5}",
    name: "Clínica de Quiaios",
    desc: "Familiar e acessível",
    slug: "clinica-dentaria-quiaios",
    color: "#EC4899",
  },
  {
    emoji: "\u{1F9B7}",
    name: "Alba Saúde",
    desc: "Estética dental moderna",
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
    desc: "Bateria eletrónica",
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
    desc: "Caixinha de música",
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
    desc: "Arte generativa com código",
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
    desc: "Xadrez clássico",
    slug: "chess",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F40D}",
    name: "Snake",
    desc: "O clássico jogo da cobra",
    slug: "snake-game",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F9E0}",
    name: "Memory",
    desc: "Jogo da memória",
    slug: "memory-game",
    category: "jogos",
    color: "#22C55E",
    preview: "character",
  },
  {
    emoji: "\u{1F1F5}\u{1F1F9}",
    name: "Quiz Portugal",
    desc: "Quão bem conheces PT?",
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
    desc: "Mistura emojis únicos",
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
    desc: "Testa expressões regulares",
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
    desc: "Escreve e pré-visualiza MD",
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
    desc: "Rastreador de hábitos",
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
    desc: "Cartões de memória",
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
    desc: "Roda de decisões",
    slug: "decision-wheel",
    category: "produtividade",
    color: "#3B82F6",
    preview: "code",
  },
  {
    emoji: "\u{1F4DD}",
    name: "Mood Journal",
    desc: "Diário de humor",
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
    desc: "Teste de velocidade de digitação",
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
    desc: "Tradutor de código Morse",
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
    desc: "Visualizador de áudio",
    slug: "music-visualizer",
    category: "musica",
    color: "#06B6D4",
    preview: "equalizer",
  },
  {
    emoji: "\u{1F9D8}",
    name: "Breathing Exercise",
    desc: "Exercícios de respiração",
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
    category: "experiências",
    color: "#EAB308",
    preview: "code",
  },
  {
    emoji: "\u{1F9EE}",
    name: "Calculator",
    desc: "Calculadora científica",
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
    category: "experiências",
    color: "#EAB308",
    preview: "code",
  },
  // Ciencia (purple)
  {
    emoji: "\u269B\u{FE0F}",
    name: "Periodic Table",
    desc: "Tabela periódica interativa",
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
    desc: "Simulador de partículas",
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
    category: "experiências",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F326}\u{FE0F}",
    name: "Weather Mood",
    desc: "Clima e emoções",
    slug: "weather-mood",
    category: "experiências",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F30D}",
    name: "Globe Explorer",
    desc: "Explorador do globo",
    slug: "globe-explorer",
    category: "experiências",
    color: "#EAB308",
    preview: "gradient",
  },
  {
    emoji: "\u{1F570}\u{FE0F}",
    name: "World Clock",
    desc: "Relógios mundiais",
    slug: "world-clock",
    category: "experiências",
    color: "#EAB308",
    preview: "code",
  },
  {
    emoji: "\u{1F5FA}\u{FE0F}",
    name: "Mapa Portugal",
    desc: "Mapa interativo de PT",
    slug: "mapa-portugal",
    category: "experiências",
    color: "#EAB308",
    preview: "gradient",
  },
] as const;

const TIMELINE_DATA = [
  {
    year: "2019",
    title: "IST \u2014 Início do caminho",
    emoji: "\u{1F393}",
  },
  {
    year: "2020",
    title: "Primeiros projetos freelance",
    emoji: "\u{1F4BB}",
  },
  {
    year: "2021",
    title: "Fraqtory \u2014 Experiência em startup",
    emoji: "\u{1F680}",
  },
  {
    year: "2022",
    title: "Foco em IA e automação",
    emoji: "\u{1F916}",
  },
  {
    year: "2023",
    title: "Mentoria e consultoria",
    emoji: "\u{1F3AF}",
  },
  {
    year: "2024",
    title: "MSc concluído + Descomplicai nasceu",
    emoji: "\u{1F331}",
  },
  {
    year: "2025",
    title: "55+ projetos, building in public",
    emoji: "\u{1F3D7}\u{FE0F}",
  },
  {
    year: "2026",
    title: "109 páginas numa noite. O futuro é agora.",
    emoji: "\u26A1",
  },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  all: "Todos",
  musica: "\u{1F3B5} Música",
  criativo: "\u{1F3A8} Criativo",
  jogos: "\u{1F3AE} Jogos",
  dev: "\u{1F6E0}\u{FE0F} Dev Tools",
  produtividade: "\u{1F4CA} Produtividade",
  ciencia: "\u{1F52C} Ciência",
  experiencias: "\u{1F30D} Experiências",
};

/* =============================================================================
   ACHIEVEMENT & STATISTICS TYPES
   ============================================================================= */

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  hiddenDescription: string;
}

interface AchievementState {
  unlocked: Record<string, boolean>;
  unlockedAt: Record<string, number>;
}

interface StatsState {
  totalScroll: number;
  timeSpent: number;
  chaptersCompleted: Record<number, boolean>;
  interactiveClicks: number;
  characterClicks: number;
  returnVisits: number;
  chapterTimes: Record<number, number>;
  easterEggsFound: number;
  miniGamesCompleted: number;
  startTime: number;
  backToTopUsed: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "primeiro-capitulo",
    icon: "\u{1F31F}",
    name: "Primeiro Capítulo",
    description: "Scrollar para lá do Capítulo 0",
    hiddenDescription: "???",
  },
  {
    id: "leitor-avido",
    icon: "\u{1F4D6}",
    name: "Leitor Ávido",
    description: "Explorar todos os 8 capítulos",
    hiddenDescription: "???",
  },
  {
    id: "observador",
    icon: "\u{1F50D}",
    name: "Observador",
    description: "Clicar em 5 elementos interativos diferentes",
    hiddenDescription: "???",
  },
  {
    id: "speed-reader",
    icon: "\u26A1",
    name: "Leitor Relâmpago",
    description: "Completar todos os capítulos em menos de 2 minutos",
    hiddenDescription: "???",
  },
  {
    id: "apreciador",
    icon: "\u{1F40C}",
    name: "Apreciador",
    description: "Passar mais de 10 minutos a explorar",
    hiddenDescription: "???",
  },
  {
    id: "jogador",
    icon: "\u{1F3AE}",
    name: "Jogador",
    description: "Completar pelo menos 1 mini-jogo",
    hiddenDescription: "???",
  },
  {
    id: "noctambulo",
    icon: "\u{1F319}",
    name: "Noctâmbulo",
    description: "Visitar o site entre as 22:00 e as 06:00",
    hiddenDescription: "???",
  },
  {
    id: "mobile-explorer",
    icon: "\u{1F4F1}",
    name: "Explorador Móvel",
    description: "Visitar num ecrã mobile",
    hiddenDescription: "???",
  },
  {
    id: "volta-ao-inicio",
    icon: "\u{1F504}",
    name: "Volta ao Início",
    description: "Usar o botão de voltar ao topo",
    hiddenDescription: "???",
  },
  {
    id: "completista",
    icon: "\u{1F3C6}",
    name: "Completista",
    description: "Desbloquear todas as outras conquistas",
    hiddenDescription: "???",
  },
];

const STORAGE_KEY_ACHIEVEMENTS = "rpg-chronicle-achievements";
const STORAGE_KEY_STATS = "rpg-chronicle-stats";

const DEFAULT_ACHIEVEMENT_STATE: AchievementState = {
  unlocked: {},
  unlockedAt: {},
};

const DEFAULT_STATS_STATE: StatsState = {
  totalScroll: 0,
  timeSpent: 0,
  chaptersCompleted: {},
  interactiveClicks: 0,
  characterClicks: 0,
  returnVisits: 0,
  chapterTimes: {},
  easterEggsFound: 0,
  miniGamesCompleted: 0,
  startTime: Date.now(),
  backToTopUsed: false,
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
  scrollY: MotionValue<number>,
  chapterIndex: number
): MotionValue<number> {
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
   SCROLL TRACKER HOOK
   ============================================================================= */

function getCurrentChapter(): number {
  const scrollPx = window.scrollY;
  for (let i = CHAPTER_RANGES.length - 1; i >= 0; i--) {
    if (scrollPx >= CHAPTER_RANGES[i].start) return i;
  }
  return 0;
}

function useScrollTracker() {
  const totalScroll = useRef(0);
  const chapterTimes = useRef<Record<number, number>>({});
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const chaptersVisited = useRef<Record<number, boolean>>({});

  useEffect(() => {
    const handler = () => {
      const now = Date.now();
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      totalScroll.current += delta;

      const chapter = getCurrentChapter();
      chaptersVisited.current[chapter] = true;
      chapterTimes.current[chapter] =
        (chapterTimes.current[chapter] || 0) + (now - lastTimestamp.current);

      lastScrollY.current = window.scrollY;
      lastTimestamp.current = now;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { totalScroll, chapterTimes, chaptersVisited };
}

/* =============================================================================
   ACHIEVEMENT & STATS MANAGER HOOK
   ============================================================================= */

function useAchievements() {
  const [achievements, setAchievements] = useState<AchievementState>(DEFAULT_ACHIEVEMENT_STATE);
  const [stats, setStats] = useState<StatsState>(DEFAULT_STATS_STATE);
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTab, setPanelTab] = useState<"achievements" | "stats">("achievements");
  const [mounted, setMounted] = useState(false);

  const scrollTracker = useScrollTracker();
  const startTimeRef = useRef(Date.now());
  const interactiveClicksRef = useRef(0);
  const characterClicksRef = useRef(0);

  // Load from localStorage after hydration
  useEffect(() => {
    setMounted(true);
    try {
      const savedAch = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (savedAch) {
        const parsed = JSON.parse(savedAch);
        setAchievements(parsed);
      }
    } catch {}
    try {
      const savedStats = localStorage.getItem(STORAGE_KEY_STATS);
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setStats((prev) => ({
          ...prev,
          ...parsed,
          returnVisits: (parsed.returnVisits || 0) + 1,
          startTime: Date.now(),
        }));
      } else {
        setStats((prev) => ({ ...prev, returnVisits: 1 }));
      }
    } catch {
      setStats((prev) => ({ ...prev, returnVisits: 1 }));
    }
  }, []);

  // Save to localStorage periodically and on unload
  const saveToStorage = useCallback(() => {
    if (!mounted) return;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const currentStats: StatsState = {
      ...stats,
      totalScroll: stats.totalScroll + scrollTracker.totalScroll.current,
      timeSpent: stats.timeSpent + elapsed,
      chapterTimes: { ...stats.chapterTimes },
      interactiveClicks: stats.interactiveClicks + interactiveClicksRef.current,
      characterClicks: stats.characterClicks + characterClicksRef.current,
    };
    // Merge chapter times
    Object.entries(scrollTracker.chapterTimes.current).forEach(([ch, time]) => {
      const chNum = Number(ch);
      currentStats.chapterTimes[chNum] = (currentStats.chapterTimes[chNum] || 0) + time;
    });
    // Merge chapters completed
    Object.keys(scrollTracker.chaptersVisited.current).forEach((ch) => {
      currentStats.chaptersCompleted[Number(ch)] = true;
    });

    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(currentStats));
    } catch {}
  }, [mounted, stats, achievements, scrollTracker]);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(saveToStorage, 30000);
    const handleUnload = () => saveToStorage();
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [mounted, saveToStorage]);

  // Unlock achievement
  const unlock = useCallback(
    (id: string) => {
      setAchievements((prev) => {
        if (prev.unlocked[id]) return prev;
        const next = {
          unlocked: { ...prev.unlocked, [id]: true },
          unlockedAt: { ...prev.unlockedAt, [id]: Date.now() },
        };
        setToastQueue((q) => [...q, id]);
        return next;
      });
    },
    []
  );

  const dismissToast = useCallback(() => {
    setToastQueue((q) => q.slice(1));
  }, []);

  const unlockedCount = Object.values(achievements.unlocked).filter(Boolean).length;

  const registerInteractiveClick = useCallback(() => {
    interactiveClicksRef.current += 1;
  }, []);

  const registerCharacterClick = useCallback(() => {
    characterClicksRef.current += 1;
  }, []);

  const markBackToTop = useCallback(() => {
    setStats((prev) => ({ ...prev, backToTopUsed: true }));
  }, []);

  // Compute live stats for display
  const getLiveStats = useCallback((): StatsState => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const result: StatsState = {
      ...stats,
      totalScroll: stats.totalScroll + scrollTracker.totalScroll.current,
      timeSpent: stats.timeSpent + elapsed,
      chapterTimes: { ...stats.chapterTimes },
      chaptersCompleted: { ...stats.chaptersCompleted },
      interactiveClicks: stats.interactiveClicks + interactiveClicksRef.current,
      characterClicks: stats.characterClicks + characterClicksRef.current,
    };
    Object.entries(scrollTracker.chapterTimes.current).forEach(([ch, time]) => {
      const chNum = Number(ch);
      result.chapterTimes[chNum] = (result.chapterTimes[chNum] || 0) + time;
    });
    Object.keys(scrollTracker.chaptersVisited.current).forEach((ch) => {
      result.chaptersCompleted[Number(ch)] = true;
    });
    return result;
  }, [stats, scrollTracker]);

  return {
    achievements,
    stats,
    toastQueue,
    panelOpen,
    setPanelOpen,
    panelTab,
    setPanelTab,
    unlock,
    dismissToast,
    unlockedCount,
    mounted,
    scrollTracker,
    registerInteractiveClick,
    registerCharacterClick,
    markBackToTop,
    getLiveStats,
    startTimeRef,
  };
}

/* =============================================================================
   MOUSE PARALLAX HOOK (desktop only)
   ============================================================================= */

function useMouseParallax(): {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  layer2X: MotionValue<number>;
  layer2Y: MotionValue<number>;
  layer3X: MotionValue<number>;
  layer3Y: MotionValue<number>;
} {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const layer2X = useTransform(mouseX, [-1, 1], [-15, 15]);
  const layer2Y = useTransform(mouseY, [-1, 1], [-15, 15]);
  const layer3X = useTransform(mouseX, [-1, 1], [-8, 8]);
  const layer3Y = useTransform(mouseY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, layer2X, layer2Y, layer3X, layer3Y };
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
   CODE RAIN EFFECT (Matrix-style)
   ============================================================================= */

const CodeRain = memo(function CodeRain({ count = 20 }: { count?: number }) {
  const columns = useMemo(() => {
    const chars = "01{}[]<>/;:=()+-*&#@!?%$ABCDEFabcdef";
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 29 + 1) * 100,
      speed: seededRandom(i * 29 + 2) * 8 + 4,
      delay: seededRandom(i * 29 + 3) * 6,
      fontSize: seededRandom(i * 29 + 4) * 8 + 10,
      opacity: seededRandom(i * 29 + 5) * 0.15 + 0.05,
      chars: Array.from(
        { length: Math.floor(seededRandom(i * 29 + 6) * 12) + 8 },
        (_, j) => chars[Math.floor(seededRandom(i * 100 + j * 7) * chars.length)]
      ).join("\n"),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute whitespace-pre font-mono"
          style={{
            left: `${col.x}%`,
            top: "-20%",
            fontSize: `${col.fontSize}px`,
            color: "#22C55E",
            opacity: col.opacity,
            lineHeight: "1.2",
            animation: `codeRainFall ${col.speed}s linear ${col.delay}s infinite`,
            willChange: "transform",
            textShadow: "0 0 8px rgba(34,197,94,0.4)",
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   FIREFLIES (warm blink)
   ============================================================================= */

const Fireflies = memo(function Fireflies({ count = 15 }: { count?: number }) {
  const flies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 37 + 1) * 100,
      y: seededRandom(i * 37 + 2) * 100,
      size: seededRandom(i * 37 + 3) * 4 + 2,
      driftDuration: seededRandom(i * 37 + 4) * 10 + 8,
      blinkDuration: seededRandom(i * 37 + 5) * 3 + 1.5,
      delay: seededRandom(i * 37 + 6) * 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            backgroundColor: "#FBBF24",
            boxShadow: "0 0 6px 2px rgba(251,191,36,0.5)",
            animation: `fireflyBlink ${f.blinkDuration}s ease-in-out ${f.delay}s infinite, fireflyDrift ${f.driftDuration}s ease-in-out ${f.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
});

/* =============================================================================
   CHAPTER TRANSITION OVERLAY
   ============================================================================= */

const ChapterTransition = memo(function ChapterTransition({
  fromColor,
  toColor,
  progress,
  reducedMotion,
}: {
  fromColor: string;
  toColor: string;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const opacity = useTransform(progress, [0.85, 1], [0, 1]);
  if (reducedMotion) return null;
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[5]"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${toColor}80 60%, ${toColor} 100%)`,
        opacity,
        willChange: "opacity",
      }}
    />
  );
});

/* =============================================================================
   FLOATING TOOL ICONS (orbit effect)
   ============================================================================= */

const FloatingToolIcons = memo(function FloatingToolIcons() {
  const tools = useMemo(() => {
    const icons = ["\u{1F527}", "\u2699\uFE0F", "\u{1F4BB}", "\u{1F3A8}", "\u{1F50C}", "\u{1F4D0}"];
    return icons.map((icon, i) => ({
      id: i,
      icon,
      radius: 100 + i * 30,
      speed: 12 + i * 4,
      delay: i * 2,
      startAngle: i * 60,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {tools.map((t) => (
        <div
          key={t.id}
          className="absolute text-2xl"
          style={{
            left: "50%",
            top: "40%",
            animation: `orbitFloat ${t.speed}s linear ${t.delay}s infinite`,
            transformOrigin: `0 ${t.radius}px`,
            willChange: "transform",
            opacity: 0.3,
          }}
        >
          {t.icon}
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   STEAM CHIMNEYS
   ============================================================================= */

const SteamChimneys = memo(function SteamChimneys() {
  const chimneyPositions = useMemo(
    () => [15, 35, 55, 78].map((x, i) => ({
      x,
      particles: Array.from({ length: 4 }, (_, j) => ({
        id: j,
        size: seededRandom(i * 50 + j * 11 + 1) * 10 + 6,
        duration: seededRandom(i * 50 + j * 11 + 2) * 3 + 2,
        delay: seededRandom(i * 50 + j * 11 + 3) * 2,
        drift: seededRandom(i * 50 + j * 11 + 4) * 30 - 15,
      })),
    })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {chimneyPositions.map((chimney, ci) => (
        <div key={ci} className="absolute" style={{ left: `${chimney.x}%`, bottom: "60%" }}>
          {chimney.particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: "rgba(255,255,255,0.15)",
                animation: `steamRise ${p.duration}s ease-out ${p.delay}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   STREET LAMPS (warm glow)
   ============================================================================= */

const StreetLamps = memo(function StreetLamps() {
  const lamps = [20, 40, 60, 80];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {lamps.map((x, i) => (
        <div key={i} className="absolute" style={{ left: `${x}%`, bottom: "35%" }}>
          {/* Lamp post */}
          <div className="w-1 h-16 bg-gray-600 mx-auto" />
          {/* Lamp head */}
          <div className="w-6 h-4 bg-gray-500 rounded-t mx-auto -mt-1" />
          {/* Glow */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "40px",
              height: "40px",
              background: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
              animation: `lampGlow 3s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   MEDICAL CROSSES (clinical floating particles)
   ============================================================================= */

const MedicalCrosses = memo(function MedicalCrosses({ count = 12 }: { count?: number }) {
  const crosses = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 43 + 1) * 100,
      y: seededRandom(i * 43 + 2) * 100,
      size: seededRandom(i * 43 + 3) * 8 + 6,
      duration: seededRandom(i * 43 + 4) * 8 + 5,
      delay: seededRandom(i * 43 + 5) * 5,
      opacity: seededRandom(i * 43 + 6) * 0.08 + 0.02,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {crosses.map((c) => (
        <div
          key={c.id}
          className="absolute font-bold"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            fontSize: `${c.size}px`,
            color: "#93C5FD",
            opacity: c.opacity,
            animation: `medicalFloat ${c.duration}s ease-in-out ${c.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          +
        </div>
      ))}
    </div>
  );
});

/* =============================================================================
   CIRCUIT GRID LINES (glowing)
   ============================================================================= */

const CircuitGrid = memo(function CircuitGrid() {
  const lines = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x1: seededRandom(i * 53 + 1) * 100,
      y1: seededRandom(i * 53 + 2) * 100,
      x2: seededRandom(i * 53 + 3) * 100,
      y2: seededRandom(i * 53 + 4) * 100,
      delay: seededRandom(i * 53 + 5) * 4,
    }));
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ opacity: 0.08 }}>
      {lines.map((l) => (
        <line
          key={l.id}
          x1={`${l.x1}%`}
          y1={`${l.y1}%`}
          x2={`${l.x2}%`}
          y2={`${l.y2}%`}
          stroke="#06B6D4"
          strokeWidth="1"
          strokeDasharray="200"
          strokeDashoffset="200"
          style={{
            animation: `circuitDraw 3s ease-out ${l.delay}s infinite`,
            filter: "drop-shadow(0 0 4px #06B6D4)",
          }}
        />
      ))}
      {/* Circuit nodes */}
      {lines.map((l) => (
        <React.Fragment key={`node-${l.id}`}>
          <circle cx={`${l.x1}%`} cy={`${l.y1}%`} r="2" fill="#06B6D4" opacity="0.3" />
          <circle cx={`${l.x2}%`} cy={`${l.y2}%`} r="2" fill="#8B5CF6" opacity="0.3" />
        </React.Fragment>
      ))}
    </svg>
  );
});

/* =============================================================================
   GOLDEN MILESTONE PARTICLES
   ============================================================================= */

const GoldenParticles = memo(function GoldenParticles({ active, count = 20 }: { active: boolean; count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: seededRandom(i * 61 + 1) * 360,
      distance: seededRandom(i * 61 + 2) * 40 + 10,
      size: seededRandom(i * 61 + 3) * 3 + 1,
      duration: seededRandom(i * 61 + 4) * 2 + 1,
      delay: seededRandom(i * 61 + 5) * 0.5,
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#FBBF24",
            boxShadow: "0 0 4px rgba(251,191,36,0.6)",
            animation: `goldenBurst ${p.duration}s ease-out ${p.delay}s forwards`,
            transform: `rotate(${p.angle}deg) translateX(${p.distance}px)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
});

/* =============================================================================
   LIGHT RAYS (from top)
   ============================================================================= */

const LightRays = memo(function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: 0,
            left: `${15 + i * 18}%`,
            width: "2px",
            height: "60%",
            background: `linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)`,
            transform: `rotate(${-10 + i * 5}deg)`,
            transformOrigin: "top center",
            animation: `lightRayPulse ${4 + i}s ease-in-out ${i * 0.8}s infinite`,
            willChange: "opacity",
          }}
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
          animation: "nebulaDrift1 20s ease-in-out infinite, nebulaPulse 6s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Blue nebula - pulsing */}
      <div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          right: "5%",
          top: "40%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)",
          animation: "nebulaDrift2 25s ease-in-out infinite, nebulaPulse 8s ease-in-out 2s infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Pink nebula - pulsing */}
      <div
        className="absolute rounded-full"
        style={{
          width: "450px",
          height: "450px",
          left: "50%",
          top: "60%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.03) 40%, transparent 70%)",
          animation: "nebulaDrift3 22s ease-in-out infinite, nebulaPulse 7s ease-in-out 4s infinite",
          willChange: "transform, opacity",
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
   CHARACTER COMPONENT (PIXEL JAIME) — DETAILED PIXEL ART
   ============================================================================= */

type CharacterVariant =
  | "normal"
  | "sitting"
  | "chef"
  | "lab"
  | "hacker"
  | "hero"
  | "climbing";

const SHIRT_COLORS: Record<CharacterVariant, string> = {
  normal: "#3B82F6",
  sitting: "#3B82F6",
  chef: "#FFFFFF",
  lab: "#FFFFFF",
  hacker: "#1E293B",
  hero: "#EAB308",
  climbing: "#F97316",
};

const PixelCharacter = memo(function PixelCharacter({
  variant = "normal",
  walking = false,
  flipped = false,
  size = 48,
}: {
  variant?: CharacterVariant;
  walking?: boolean;
  flipped?: boolean;
  size?: number;
}) {
  const s = size / 40; // base unit scale (40px base height)

  const shirtColor = SHIRT_COLORS[variant] || "#3B82F6";
  const skinColor = "#F5C78A";
  const hairColor = "#3B2507";
  const pantsColor = "#1E293B";
  const shoeColor = "#4A3728";
  const eyeWhite = "#FFFFFF";
  const pupilColor = "#1E1B4B";

  const isSitting = variant === "sitting";
  const isClimbing = variant === "climbing";
  const isHero = variant === "hero";
  const isChef = variant === "chef";
  const isHacker = variant === "hacker";
  const isLab = variant === "lab";

  // Idle animations (only when not walking)
  const idleBody =
    !walking && !isSitting
      ? "pixelBreathe 3s ease-in-out infinite"
      : undefined;
  const idleEyes = !walking
    ? "pixelBlink 4s step-end infinite"
    : undefined;
  const idlePupils =
    !walking && !isSitting
      ? "pixelLookAround 5s ease-in-out infinite"
      : undefined;
  const idleHair = walking
    ? "pixelHairBounce 0.35s ease-in-out infinite"
    : undefined;
  const walkBob = walking
    ? "pixelWalkBob 0.35s ease-in-out infinite"
    : undefined;

  return (
    <div
      className="relative"
      style={{
        width: `${20 * s}px`,
        height: `${40 * s}px`,
        transform: flipped ? "scaleX(-1)" : undefined,
        animation: walkBob,
        willChange: "transform",
      }}
    >
      {/* ========= HAIR ========= */}
      <div
        className="absolute"
        style={{
          width: `${14 * s}px`,
          height: `${5 * s}px`,
          top: 0,
          left: `${3 * s}px`,
          backgroundColor: hairColor,
          animation: idleHair,
        }}
      />
      {/* Hair side tufts */}
      <div
        className="absolute"
        style={{
          width: `${2 * s}px`,
          height: `${4 * s}px`,
          top: `${2 * s}px`,
          left: `${2 * s}px`,
          backgroundColor: hairColor,
        }}
      />
      <div
        className="absolute"
        style={{
          width: `${2 * s}px`,
          height: `${4 * s}px`,
          top: `${2 * s}px`,
          right: `${2 * s}px`,
          backgroundColor: hairColor,
        }}
      />

      {/* ========= HEAD / FACE ========= */}
      <div
        className="absolute"
        style={{
          width: `${12 * s}px`,
          height: `${10 * s}px`,
          top: `${3 * s}px`,
          left: `${4 * s}px`,
          backgroundColor: skinColor,
        }}
      >
        {/* Left eye */}
        <div
          className="absolute"
          style={{
            width: `${3 * s}px`,
            height: `${3 * s}px`,
            top: `${3 * s}px`,
            left: `${1 * s}px`,
            backgroundColor: eyeWhite,
            animation: idleEyes,
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${1.5 * s}px`,
              height: `${1.5 * s}px`,
              top: `${0.75 * s}px`,
              left: `${0.75 * s}px`,
              backgroundColor: pupilColor,
              animation: idlePupils,
            }}
          />
        </div>
        {/* Right eye */}
        <div
          className="absolute"
          style={{
            width: `${3 * s}px`,
            height: `${3 * s}px`,
            top: `${3 * s}px`,
            right: `${1 * s}px`,
            backgroundColor: eyeWhite,
            animation: idleEyes,
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${1.5 * s}px`,
              height: `${1.5 * s}px`,
              top: `${0.75 * s}px`,
              left: `${0.75 * s}px`,
              backgroundColor: pupilColor,
              animation: idlePupils,
            }}
          />
        </div>
        {/* Mouth */}
        <div
          className="absolute"
          style={{
            width: `${4 * s}px`,
            height: `${1 * s}px`,
            bottom: `${1 * s}px`,
            left: `${4 * s}px`,
            backgroundColor: "#92400E",
          }}
        />
      </div>

      {/* ========= ACCESSORIES (HEAD) ========= */}
      {/* Chef hat */}
      {isChef && (
        <>
          <div
            className="absolute"
            style={{
              width: `${10 * s}px`,
              height: `${4 * s}px`,
              top: `${-4 * s}px`,
              left: `${5 * s}px`,
              backgroundColor: "#FFFFFF",
              boxShadow: `0 ${-1 * s}px 0 #F3F4F6`,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${14 * s}px`,
              height: `${2 * s}px`,
              top: `${-1 * s}px`,
              left: `${3 * s}px`,
              backgroundColor: "#FFFFFF",
            }}
          />
        </>
      )}
      {/* Hacker VR visor */}
      {isHacker && (
        <div
          className="absolute"
          style={{
            width: `${14 * s}px`,
            height: `${3 * s}px`,
            top: `${6 * s}px`,
            left: `${3 * s}px`,
            backgroundColor: "#06B6D4",
            opacity: 0.85,
            animation: "pixelVisorGlow 2s ease-in-out infinite",
          }}
        />
      )}
      {/* Lab stethoscope */}
      {isLab && (
        <>
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${6 * s}px`,
              top: `${12 * s}px`,
              left: `${2 * s}px`,
              backgroundColor: "#10B981",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${6 * s}px`,
              height: `${2 * s}px`,
              top: `${16 * s}px`,
              left: `${2 * s}px`,
              backgroundColor: "#10B981",
            }}
          />
          {/* Stethoscope disc */}
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${3 * s}px`,
              top: `${17 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: "#D1D5DB",
            }}
          />
        </>
      )}
      {/* Hero cape */}
      {isHero && (
        <div
          className="absolute"
          style={{
            width: `${6 * s}px`,
            height: `${16 * s}px`,
            top: `${14 * s}px`,
            left: `${-3 * s}px`,
            backgroundColor: "#DC2626",
            transformOrigin: "top center",
            animation: walking
              ? "pixelCapeFlow 0.8s ease-in-out infinite"
              : "pixelCapeIdle 3s ease-in-out infinite",
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${8 * s}px`,
              height: `${3 * s}px`,
              bottom: 0,
              left: `${-1 * s}px`,
              backgroundColor: "#B91C1C",
              animation: walking
                ? "pixelCapeFlutter 0.6s ease-in-out infinite"
                : undefined,
            }}
          />
        </div>
      )}

      {/* ========= BODY / SHIRT ========= */}
      <div
        className="absolute"
        style={{
          width: `${12 * s}px`,
          height: `${10 * s}px`,
          top: `${13 * s}px`,
          left: `${4 * s}px`,
          backgroundColor: shirtColor,
          border:
            isChef || isLab ? `${1 * s}px solid #E5E7EB` : "none",
          animation: idleBody,
          transformOrigin: "bottom center",
        }}
      />

      {/* Backpack (normal / sitting) */}
      {(variant === "normal" || variant === "sitting") && (
        <div
          className="absolute"
          style={{
            width: `${5 * s}px`,
            height: `${7 * s}px`,
            top: `${14 * s}px`,
            left: `${-2 * s}px`,
            backgroundColor: "#92400E",
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${1 * s}px`,
              top: `${1 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: "#78350F",
            }}
          />
        </div>
      )}

      {/* Chef apron */}
      {isChef && (
        <div
          className="absolute"
          style={{
            width: `${10 * s}px`,
            height: `${8 * s}px`,
            top: `${15 * s}px`,
            left: `${5 * s}px`,
            backgroundColor: "#FAFAFA",
            borderTop: `${1 * s}px solid #E5E7EB`,
          }}
        />
      )}

      {/* Climbing rope coil */}
      {isClimbing && (
        <>
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${12 * s}px`,
              top: `${14 * s}px`,
              left: `${-2 * s}px`,
              backgroundColor: "#D97706",
              animation: "pixelRopeTrail 1s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${4 * s}px`,
              top: `${13 * s}px`,
              left: `${-3 * s}px`,
              backgroundColor: "#B45309",
              border: `${1 * s}px solid #92400E`,
            }}
          />
        </>
      )}

      {/* ========= ARMS ========= */}
      {isSitting ? (
        /* Typing arms — hands move on imaginary keyboard */
        <>
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${7 * s}px`,
              top: `${15 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "top center",
              animation:
                "pixelTypingL 0.3s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${22 * s}px`,
              left: 0,
              backgroundColor: skinColor,
              animation:
                "pixelTypingHandL 0.3s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${7 * s}px`,
              top: `${15 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "top center",
              animation:
                "pixelTypingR 0.3s ease-in-out 0.15s infinite alternate",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${22 * s}px`,
              right: 0,
              backgroundColor: skinColor,
              animation:
                "pixelTypingHandR 0.3s ease-in-out 0.15s infinite alternate",
            }}
          />
        </>
      ) : isClimbing ? (
        /* Climbing arms — reach up alternately */
        <>
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${8 * s}px`,
              top: `${13 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "bottom center",
              animation:
                "pixelClimbArmL 0.8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${11 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: skinColor,
              animation:
                "pixelClimbHandL 0.8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${8 * s}px`,
              top: `${13 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "bottom center",
              animation:
                "pixelClimbArmR 0.8s ease-in-out 0.4s infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${11 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: skinColor,
              animation:
                "pixelClimbHandR 0.8s ease-in-out 0.4s infinite",
            }}
          />
        </>
      ) : isHero && !walking ? (
        /* Hero pose — arms on hips */
        <>
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${7 * s}px`,
              top: `${14 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: shirtColor,
              transform: "rotate(25deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${20 * s}px`,
              left: `${3 * s}px`,
              backgroundColor: skinColor,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${7 * s}px`,
              top: `${14 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: shirtColor,
              transform: "rotate(-25deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${20 * s}px`,
              right: `${3 * s}px`,
              backgroundColor: skinColor,
            }}
          />
        </>
      ) : (
        /* Normal / walking arms with hands */
        <>
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${8 * s}px`,
              top: `${14 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "top center",
              animation: walking
                ? "pixelArmSwing 0.35s ease-in-out infinite alternate"
                : undefined,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${22 * s}px`,
              left: `${1 * s}px`,
              backgroundColor: skinColor,
              animation: walking
                ? "pixelArmSwing 0.35s ease-in-out infinite alternate"
                : undefined,
              transformOrigin: `0px ${-6 * s}px`,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${3 * s}px`,
              height: `${8 * s}px`,
              top: `${14 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: shirtColor,
              transformOrigin: "top center",
              animation: walking
                ? "pixelArmSwing 0.35s ease-in-out 0.175s infinite alternate"
                : undefined,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${2 * s}px`,
              height: `${2 * s}px`,
              top: `${22 * s}px`,
              right: `${1 * s}px`,
              backgroundColor: skinColor,
              animation: walking
                ? "pixelArmSwing 0.35s ease-in-out 0.175s infinite alternate"
                : undefined,
              transformOrigin: `0px ${-6 * s}px`,
            }}
          />
        </>
      )}

      {/* ========= LEGS ========= */}
      {isSitting ? (
        <>
          {/* Thigh section horizontal */}
          <div
            className="absolute"
            style={{
              width: `${10 * s}px`,
              height: `${3 * s}px`,
              top: `${23 * s}px`,
              left: `${5 * s}px`,
              backgroundColor: pantsColor,
            }}
          />
          {/* Calves */}
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${5 * s}px`,
              top: `${26 * s}px`,
              left: `${5 * s}px`,
              backgroundColor: pantsColor,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${5 * s}px`,
              top: `${26 * s}px`,
              right: `${5 * s}px`,
              backgroundColor: pantsColor,
            }}
          />
          {/* Shoes */}
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${31 * s}px`,
              left: `${4 * s}px`,
              backgroundColor: shoeColor,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${31 * s}px`,
              right: `${4 * s}px`,
              backgroundColor: shoeColor,
            }}
          />
        </>
      ) : isClimbing ? (
        <>
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${10 * s}px`,
              top: `${23 * s}px`,
              left: `${5 * s}px`,
              backgroundColor: pantsColor,
              transformOrigin: "top center",
              animation:
                "pixelClimbLegL 0.8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${10 * s}px`,
              top: `${23 * s}px`,
              right: `${5 * s}px`,
              backgroundColor: pantsColor,
              transformOrigin: "top center",
              animation:
                "pixelClimbLegR 0.8s ease-in-out 0.4s infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${33 * s}px`,
              left: `${4 * s}px`,
              backgroundColor: shoeColor,
              animation:
                "pixelClimbLegL 0.8s ease-in-out infinite",
              transformOrigin: `0px ${-8 * s}px`,
            }}
          />
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${33 * s}px`,
              right: `${4 * s}px`,
              backgroundColor: shoeColor,
              animation:
                "pixelClimbLegR 0.8s ease-in-out 0.4s infinite",
              transformOrigin: `0px ${-8 * s}px`,
            }}
          />
        </>
      ) : (
        <>
          {/* Left leg */}
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${10 * s}px`,
              top: `${23 * s}px`,
              left: `${5 * s}px`,
              backgroundColor: pantsColor,
              transformOrigin: "top center",
              animation: walking
                ? "pixelLegWalk 0.35s ease-in-out infinite alternate"
                : undefined,
            }}
          />
          {/* Right leg */}
          <div
            className="absolute"
            style={{
              width: `${4 * s}px`,
              height: `${10 * s}px`,
              top: `${23 * s}px`,
              right: `${5 * s}px`,
              backgroundColor: pantsColor,
              transformOrigin: "top center",
              animation: walking
                ? "pixelLegWalk 0.35s ease-in-out 0.175s infinite alternate"
                : undefined,
            }}
          />
          {/* Left shoe */}
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${33 * s}px`,
              left: `${4 * s}px`,
              backgroundColor: shoeColor,
              animation: walking
                ? "pixelLegWalk 0.35s ease-in-out infinite alternate"
                : undefined,
              transformOrigin: `0px ${-8 * s}px`,
            }}
          />
          {/* Right shoe */}
          <div
            className="absolute"
            style={{
              width: `${5 * s}px`,
              height: `${2 * s}px`,
              top: `${33 * s}px`,
              right: `${4 * s}px`,
              backgroundColor: shoeColor,
              animation: walking
                ? "pixelLegWalk 0.35s ease-in-out 0.175s infinite alternate"
                : undefined,
              transformOrigin: `0px ${-8 * s}px`,
            }}
          />
        </>
      )}

      {/* ========= CHAPTER-SPECIFIC HELD ITEMS ========= */}

      {/* Chef pan with tossing */}
      {isChef && (
        <div
          className="absolute"
          style={{
            top: `${10 * s}px`,
            right: `${-6 * s}px`,
            animation: "pixelPanToss 1.2s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: `${6 * s}px`,
              height: `${2 * s}px`,
              backgroundColor: "#78716C",
            }}
          />
          <div
            style={{
              width: `${5 * s}px`,
              height: `${3 * s}px`,
              backgroundColor: "#57534E",
              marginTop: `${-1 * s}px`,
            }}
          />
        </div>
      )}

      {/* Lab clipboard */}
      {isLab && (
        <div
          className="absolute"
          style={{
            top: `${16 * s}px`,
            right: `${-5 * s}px`,
            animation: "pixelClipboardNod 2s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: `${5 * s}px`,
              height: `${7 * s}px`,
              backgroundColor: "#FDE68A",
              border: `${0.5 * s}px solid #D97706`,
            }}
          />
          <div
            style={{
              width: `${3 * s}px`,
              height: `${1 * s}px`,
              backgroundColor: "#9CA3AF",
              marginLeft: `${1 * s}px`,
              marginTop: `${-7.5 * s}px`,
            }}
          />
        </div>
      )}

      {/* Hacker fist pump */}
      {isHacker && (
        <div
          className="absolute"
          style={{
            width: `${2 * s}px`,
            height: `${2 * s}px`,
            top: `${8 * s}px`,
            right: `${-1 * s}px`,
            backgroundColor: skinColor,
            opacity: 0,
            animation: "pixelFistPump 4s ease-in-out infinite",
          }}
        />
      )}

      {/* Chef steam particles */}
      {isChef &&
        [0, 1, 2].map((i) => (
          <div
            key={`steam-${i}`}
            className="absolute"
            style={{
              width: `${1.5 * s}px`,
              height: `${1.5 * s}px`,
              top: `${6 * s}px`,
              right: `${(-4 + i * 2) * s}px`,
              backgroundColor: "rgba(255,255,255,0.5)",
              animation: `pixelSteam 1.5s ease-out ${i * 0.4}s infinite`,
            }}
          />
        ))}

      {/* Hero wind hair */}
      {isHero && (
        <div
          className="absolute"
          style={{
            width: `${3 * s}px`,
            height: `${2 * s}px`,
            top: `${1 * s}px`,
            left: `${1 * s}px`,
            backgroundColor: hairColor,
            animation:
              "pixelHeroHairWind 2s ease-in-out infinite",
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
   MINI-GAME: RECIPE MEMORY (Ch3 - Vila dos Sabores)
   ============================================================================= */

const MEMORY_DISHES: { emoji: string; name: string }[] = [
  { emoji: "\u{1F356}", name: "Carne" },
  { emoji: "\u{1F41F}", name: "Peixe" },
  { emoji: "\u{1F372}", name: "Cozido" },
  { emoji: "\u{1F9C1}", name: "Bolo" },
  { emoji: "\u{1F377}", name: "Vinho" },
  { emoji: "\u{1F957}", name: "Salada" },
];

interface MemoryCard {
  id: number;
  pairId: number;
  emoji: string;
  name: string;
  flipped: boolean;
  matched: boolean;
}

const MiniGameMemory = memo(function MiniGameMemory() {
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const memTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rpg-chronicle-minigames");
      if (saved) { const data = JSON.parse(saved); if (data.memory) setBadgeEarned(true); }
    } catch { /* noop */ }
  }, []);

  const initGame = useCallback(() => {
    const pairs: MemoryCard[] = [];
    MEMORY_DISHES.forEach((dish, i) => {
      pairs.push({ id: i * 2, pairId: i, emoji: dish.emoji, name: dish.name, flipped: false, matched: false });
      pairs.push({ id: i * 2 + 1, pairId: i, emoji: dish.emoji, name: dish.name, flipped: false, matched: false });
    });
    for (let k = pairs.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pairs[k], pairs[j]] = [pairs[j], pairs[k]]; }
    setCards(pairs); setSelected([]); setMoves(0); setMatchedCount(0); setTimer(0); setCompleted(false); setStarted(true);
    if (memTimerRef.current) clearInterval(memTimerRef.current);
    memTimerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
  }, []);

  useEffect(() => { return () => { if (memTimerRef.current) clearInterval(memTimerRef.current); }; }, []);

  const handleCardClick = useCallback((idx: number) => {
    if (completed) return;
    setCards((prev) => { const c = [...prev]; if (c[idx].flipped || c[idx].matched) return c; c[idx] = { ...c[idx], flipped: true }; return c; });
    setSelected((prev) => {
      const next = [...prev, idx];
      if (next.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = next;
        setTimeout(() => {
          setCards((prev2) => {
            const c2 = [...prev2];
            if (c2[a].pairId === c2[b].pairId) {
              c2[a] = { ...c2[a], matched: true }; c2[b] = { ...c2[b], matched: true };
              setMatchedCount((mc) => {
                const newMc = mc + 1;
                if (newMc === 6) { setCompleted(true); if (memTimerRef.current) clearInterval(memTimerRef.current);
                  try { const saved = localStorage.getItem("rpg-chronicle-minigames"); const data = saved ? JSON.parse(saved) : {}; data.memory = true; localStorage.setItem("rpg-chronicle-minigames", JSON.stringify(data)); setBadgeEarned(true); } catch { /* noop */ }
                } return newMc;
              });
            } else { c2[a] = { ...c2[a], flipped: false }; c2[b] = { ...c2[b], flipped: false }; }
            return c2;
          });
        }, 700);
        return [];
      }
      return next;
    });
  }, [completed]);

  return (
    <div className="relative w-full max-w-md mx-auto my-6" aria-label="Mini-jogo: Memória de receitas">
      <div className="rounded-2xl overflow-hidden border-2 shadow-lg" style={{ borderColor: "#D97706", background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)" }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: "linear-gradient(90deg, #D97706, #B45309)" }}>
          <span className="text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">{"\u{1F9E0}"} Memória de Sabores{badgeEarned && <span title="Concluido">{"\u2B50"}</span>}</span>
          <span className="text-white/70 text-[10px]">Mini-jogo</span>
        </div>
        <div className="p-4" style={{ minHeight: "280px" }}>
          {!started ? (
            <div className="flex flex-col items-center justify-center h-[260px] gap-3">
              <p className="text-gray-600 text-sm text-center">Encontra os pares de pratos portugueses!</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md" style={{ background: "linear-gradient(135deg, #D97706, #B45309)" }} aria-label="Começar jogo de memória">Jogar</motion.button>
            </div>
          ) : completed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[260px] gap-3">
              <span className="text-4xl">{"\u{1F389}"}</span>
              <p className="text-gray-800 font-bold text-lg" style={{ fontFamily: "var(--font-sora), sans-serif" }}>Parabéns!</p>
              <div className="flex gap-4 text-sm text-gray-600"><span>{moves} jogadas</span><span>{timer}s</span></div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-4 py-1.5 rounded-full text-white text-xs font-medium mt-2" style={{ background: "#D97706" }}>Jogar outra vez</motion.button>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3 text-xs text-gray-500"><span>Jogadas: {moves}</span><span>Pares: {matchedCount}/6</span><span>Tempo: {timer}s</span></div>
              <div className="grid grid-cols-4 gap-2">
                {cards.map((card, idx) => (
                  <motion.button key={card.id} onClick={() => handleCardClick(idx)} whileTap={{ scale: 0.95 }} className="relative aspect-square rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400" style={{ perspective: "600px" }} aria-label={card.flipped || card.matched ? card.name : "Carta virada"}>
                    <motion.div className="absolute inset-0 rounded-lg" animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }} transition={{ duration: 0.4, type: "spring", stiffness: 300 }} style={{ transformStyle: "preserve-3d" }}>
                      <div className="absolute inset-0 rounded-lg flex items-center justify-center border-2" style={{ backfaceVisibility: "hidden", backgroundColor: "#F59E0B", borderColor: "#D97706" }}><span className="text-white/60 text-lg">?</span></div>
                      <div className="absolute inset-0 rounded-lg flex items-center justify-center border-2" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: card.matched ? "#D1FAE5" : "#FFFBEB", borderColor: card.matched ? "#10B981" : "#D97706", boxShadow: card.matched ? "0 0 12px rgba(16,185,129,0.3)" : "none" }}><span className="text-2xl sm:text-3xl">{card.emoji}</span></div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
   MINI-GAME: DIAGNOSIS PUZZLE (Ch4 - Distrito da Saude)
   ============================================================================= */

const DIAGNOSIS_PAIRS = [
  { symptom: "Site Lento", solution: "Otimizar Imagens", id: 0 },
  { symptom: "Sem Clientes", solution: "SEO + Google Ads", id: 1 },
  { symptom: "Design Feio", solution: "Redesign UI/UX", id: 2 },
  { symptom: "Sem Mobile", solution: "Design Responsivo", id: 3 },
];

const MiniGameDiagnosis = memo(function MiniGameDiagnosis() {
  const [started, setStarted] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, boolean>>({});
  const [shaking, setShaking] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [shuffledSolutions, setShuffledSolutions] = useState<typeof DIAGNOSIS_PAIRS>([]);

  useEffect(() => {
    try { const saved = localStorage.getItem("rpg-chronicle-minigames"); if (saved) { const data = JSON.parse(saved); if (data.diagnosis) setBadgeEarned(true); } } catch { /* noop */ }
  }, []);

  const initGame = useCallback(() => {
    const shuffled = [...DIAGNOSIS_PAIRS];
    for (let k = shuffled.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [shuffled[k], shuffled[j]] = [shuffled[j], shuffled[k]]; }
    setShuffledSolutions(shuffled); setSelectedSymptom(null); setMatches({}); setCompleted(false); setShaking(null); setStarted(true);
  }, []);

  const handleSymptomClick = useCallback((id: number) => { if (matches[id]) return; setSelectedSymptom(id); }, [matches]);

  const handleSolutionClick = useCallback((solutionId: number) => {
    if (selectedSymptom === null) return;
    if (selectedSymptom === solutionId) {
      setMatches((prev) => {
        const next = { ...prev, [solutionId]: true };
        if (Object.keys(next).length === 4) { setCompleted(true);
          try { const saved = localStorage.getItem("rpg-chronicle-minigames"); const data = saved ? JSON.parse(saved) : {}; data.diagnosis = true; localStorage.setItem("rpg-chronicle-minigames", JSON.stringify(data)); setBadgeEarned(true); } catch { /* noop */ }
        } return next;
      }); setSelectedSymptom(null);
    } else { setShaking(solutionId); setTimeout(() => setShaking(null), 500); }
  }, [selectedSymptom]);

  return (
    <div className="relative w-full max-w-md mx-auto my-6" aria-label="Mini-jogo: Diagnóstico de problemas">
      <div className="rounded-2xl overflow-hidden border-2 shadow-lg" style={{ borderColor: "#93C5FD", background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" }}>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: "linear-gradient(90deg, #3B82F6, #2563EB)" }}>
          <span className="text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">{"\u{1FA7A}"} Diagnostico Digital{badgeEarned && <span title="Concluido">{"\u2B50"}</span>}</span>
          <span className="text-white/70 text-[10px]">Mini-jogo</span>
        </div>
        <div className="p-4" style={{ minHeight: "280px" }}>
          {!started ? (
            <div className="flex flex-col items-center justify-center h-[260px] gap-3">
              <p className="text-gray-600 text-sm text-center">Liga o sintoma à solução correta!</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md" style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)" }} aria-label="Começar jogo de diagnóstico">Jogar</motion.button>
            </div>
          ) : completed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[260px] gap-3">
              <span className="text-4xl">{"\u{1F389}"}</span>
              <p className="text-gray-800 font-bold text-lg" style={{ fontFamily: "var(--font-sora), sans-serif" }}>Diagnóstico completo!</p>
              <p className="text-gray-500 text-sm">Todos os problemas resolvidos</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-4 py-1.5 rounded-full text-white text-xs font-medium mt-2" style={{ background: "#3B82F6" }}>Jogar outra vez</motion.button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-400 text-center mb-2">Seleciona um sintoma, depois clica na solução</p>
              {DIAGNOSIS_PAIRS.map((pair) => (
                <div key={pair.id} className="flex items-center gap-2">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleSymptomClick(pair.id)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border-2 ${matches[pair.id] ? "bg-green-50 border-green-400 text-green-700" : selectedSymptom === pair.id ? "bg-blue-50 border-blue-400 text-blue-700 ring-2 ring-blue-300" : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"}`} disabled={!!matches[pair.id]} aria-label={`Sintoma: ${pair.symptom}`}>{pair.symptom}</motion.button>
                  <span className={`text-xs ${matches[pair.id] ? "text-green-500" : "text-gray-300"}`}>{matches[pair.id] ? "\u2713" : "\u2192"}</span>
                  <motion.button whileTap={{ scale: 0.97 }} animate={shaking === shuffledSolutions[pair.id]?.id ? { x: [0, -4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.4 }} onClick={() => handleSolutionClick(shuffledSolutions[pair.id]?.id ?? -1)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border-2 ${matches[shuffledSolutions[pair.id]?.id] ? "bg-green-50 border-green-400 text-green-700" : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"}`} disabled={!!matches[shuffledSolutions[pair.id]?.id]} aria-label={`Solucao: ${shuffledSolutions[pair.id]?.solution}`}>{shuffledSolutions[pair.id]?.solution}</motion.button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/* =============================================================================
   MINI-GAME: CODE CHALLENGE (Ch5 - Laboratorio)
   ============================================================================= */

const CODE_SNIPPETS = [
  `const x = "Ola";`,
  "let total = a + b;",
  "return <App />;",
  `import React from "react";`,
  "console.log(42);",
];

const MiniGameCode = memo(function MiniGameCode() {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const codeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { try { const saved = localStorage.getItem("rpg-chronicle-minigames"); if (saved) { const data = JSON.parse(saved); if (data.code) setBadgeEarned(true); } } catch { /* noop */ } }, []);

  const currentSnippet = CODE_SNIPPETS[currentIdx] || "";

  const initGame = useCallback(() => {
    setCurrentIdx(0); setTyped(""); setErrors(0); setTotalChars(0); setElapsed(0); setCompleted(false); setWpm(0); setAccuracy(100); setStarted(true); setStartTime(Date.now());
    if (codeTimerRef.current) clearInterval(codeTimerRef.current);
    codeTimerRef.current = setInterval(() => { setElapsed((e) => e + 0.1); }, 100);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => { return () => { if (codeTimerRef.current) clearInterval(codeTimerRef.current); }; }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; const snippet = CODE_SNIPPETS[currentIdx]; if (!snippet) return;
    setTyped(val);
    let errCount = 0; for (let i = 0; i < val.length; i++) { if (val[i] !== snippet[i]) errCount++; }
    if (val.length === snippet.length) {
      const newTotalChars = totalChars + snippet.length; const newErrors = errors + errCount;
      setTotalChars(newTotalChars); setErrors(newErrors);
      const nextIdx = currentIdx + 1;
      if (nextIdx >= CODE_SNIPPETS.length) {
        if (codeTimerRef.current) clearInterval(codeTimerRef.current);
        const totalTime = startTime ? (Date.now() - startTime) / 1000 : 1;
        setWpm(Math.round((newTotalChars / 5) / (totalTime / 60)));
        setAccuracy(Math.round(((newTotalChars - newErrors) / newTotalChars) * 100));
        setElapsed(Math.round(totalTime * 10) / 10); setCompleted(true);
        try { const saved = localStorage.getItem("rpg-chronicle-minigames"); const data = saved ? JSON.parse(saved) : {}; data.code = true; localStorage.setItem("rpg-chronicle-minigames", JSON.stringify(data)); setBadgeEarned(true); } catch { /* noop */ }
      } else { setCurrentIdx(nextIdx); setTyped(""); setTimeout(() => inputRef.current?.focus(), 50); }
    }
  }, [currentIdx, totalChars, errors, startTime]);

  const progressPct = ((currentIdx + (typed.length / (currentSnippet.length || 1))) / CODE_SNIPPETS.length) * 100;

  return (
    <div className="relative w-full max-w-md mx-auto my-6" aria-label="Mini-jogo: Desafio de código">
      <div className="rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: "#06B6D4", background: "#0F172A" }}>
        <div className="px-4 py-2 flex items-center justify-between bg-[#1E293B] border-b border-white/10">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
          <span className="text-cyan-400 text-xs font-mono flex items-center gap-1.5">code-challenge.ts{badgeEarned && <span title="Concluido">{"\u2B50"}</span>}</span>
          <span className="text-gray-500 text-[10px]">Mini-jogo</span>
        </div>
        <div className="p-4 font-mono" style={{ minHeight: "280px" }}>
          {!started ? (
            <div className="flex flex-col items-center justify-center h-[260px] gap-3">
              <p className="text-gray-400 text-sm text-center font-sans">Escreve o código o mais rápido possível!</p>
              <p className="text-gray-600 text-xs text-center font-sans">5 snippets curtos</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md font-sans" style={{ background: "linear-gradient(135deg, #06B6D4, #0891B2)" }} aria-label="Começar desafio de código">Jogar</motion.button>
            </div>
          ) : completed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[260px] gap-3">
              <span className="text-4xl">{"\u{1F389}"}</span>
              <p className="text-cyan-300 font-bold text-lg font-sans" style={{ fontFamily: "var(--font-sora), sans-serif" }}>Concluído!</p>
              <div className="flex gap-4 text-sm text-gray-400 font-sans"><span>WPM: {wpm}</span><span>Precisao: {accuracy}%</span><span>Tempo: {elapsed}s</span></div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-4 py-1.5 rounded-full text-white text-xs font-medium mt-2 font-sans" style={{ background: "#06B6D4" }}>Jogar outra vez</motion.button>
            </motion.div>
          ) : (
            <>
              <div className="text-gray-500 text-xs mb-2">{">"} Escreve este código: ({currentIdx + 1}/{CODE_SNIPPETS.length})</div>
              <div className="bg-black/40 rounded-lg p-3 mb-3 text-sm overflow-x-auto">
                {currentSnippet.split("").map((ch, i) => {
                  let color = "text-gray-500"; if (i < typed.length) { color = typed[i] === ch ? "text-green-400" : "text-red-400"; }
                  return <span key={i} className={color}>{ch}</span>;
                })}
                <span className="animate-pulse text-cyan-400">|</span>
              </div>
              <input ref={inputRef} type="text" value={typed} onChange={handleInput} className="sr-only" aria-label="Escreve o código aqui" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} />
              <button onClick={() => inputRef.current?.focus()} className="text-xs text-gray-600 mb-3 cursor-pointer hover:text-cyan-400 transition-colors font-sans w-full text-left">Clica aqui para escrever...</button>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2"><motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #06B6D4, #22D3EE)" }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.3 }} /></div>
              <div className="flex justify-between text-[10px] text-gray-500 font-sans"><span>Progresso: {Math.round(progressPct)}%</span><span>Tempo: {elapsed.toFixed(1)}s</span></div>
            </>
          )}
        </div>
      </div>
    </div>
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
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
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
   EASTER EGG COMPONENT
   ============================================================================= */

const EasterEgg = memo(function EasterEgg({
  children,
  message,
  className = "",
  style,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`relative ${className}`} style={style}>
      <motion.button
        onClick={() => setRevealed(!revealed)}
        className="cursor-pointer select-none"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Easter egg"
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-xl bg-white text-gray-800 text-xs font-medium shadow-xl whitespace-nowrap z-50 max-w-[250px] text-center"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {message}
            <div
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid white",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* =============================================================================
   MINI FAKE TERMINAL (Ch5 easter egg)
   ============================================================================= */

const MiniTerminal = memo(function MiniTerminal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([
    "Descomplicai Terminal v1.0",
    'Escreve "help" para ver os comandos.',
    "",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      let response = "";
      switch (trimmed) {
        case "ls":
          response = "projetos/  ferramentas/  musica/  jogos/  README.md";
          break;
        case "whoami":
          response = "jaime@descomplicai ~ explorador de código";
          break;
        case "help":
          response = "Comandos: ls, whoami, help, clear, exit, date, motto";
          break;
        case "clear":
          setLines([]);
          setInput("");
          return;
        case "exit":
          onClose();
          return;
        case "date":
          response = new Date().toLocaleString("pt-PT");
          break;
        case "motto":
          response = "O futuro é humano. Keep building. Share love.";
          break;
        default:
          response = "comando não encontrado: " + trimmed;
      }
      setLines((prev) => [...prev, "$ " + cmd, response, ""]);
      setInput("");
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-gray-900 rounded-xl border border-green-500/30 shadow-2xl w-[90%] max-w-md overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(34,197,94,0.15)" }}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[10px] text-gray-400 ml-2 font-mono">
            descomplicai@terminal
          </span>
        </div>
        <div className="p-3 h-48 overflow-y-auto font-mono text-xs text-green-400">
          {lines.map((line, i) => (
            <div key={i}>{line || "\u00A0"}</div>
          ))}
          <div className="flex items-center">
            <span className="text-green-500 mr-1">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) handleCommand(input);
              }}
              className="flex-1 bg-transparent text-green-400 outline-none font-mono text-xs"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* =============================================================================
   INTERACTIVE PIXEL CHARACTER (click reactions + quotes)
   ============================================================================= */

const PORTUGUESE_QUOTES = [
  "Quem não arrisca, não petisca!",
  "A pressa é inimiga da perfeição.",
  "Água mole em pedra dura, tanto bate até que fura.",
  "De grão em grão, enche a galinha o papo.",
  "Mais vale um pássaro na mão do que dois a voar.",
  "O saber não ocupa lugar.",
  "Cada cabeça, sua sentença.",
  "Devagar se vai ao longe.",
];

const InteractivePixelCharacter = memo(function InteractivePixelCharacter({
  variant = "normal",
  walking = false,
  flipped = false,
  size = 48,
}: {
  variant?: "normal" | "sitting" | "chef" | "lab" | "hacker" | "hero" | "climbing";
  walking?: boolean;
  flipped?: boolean;
  size?: number;
}) {
  const [jumped, setJumped] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    setJumped(true);
    setQuote(
      PORTUGUESE_QUOTES[
        Math.floor(Math.random() * PORTUGUESE_QUOTES.length)
      ]
    );
    setTimeout(() => setJumped(false), 600);
    setTimeout(() => setQuote(null), 3000);
  }, []);

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <AnimatePresence>
        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-50"
          >
            <SpeechBubble text={quote} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={jumped ? { y: [0, -20, 0] } : {}}
        transition={jumped ? { duration: 0.4, ease: "easeOut" } : {}}
      >
        <PixelCharacter
          variant={variant}
          walking={walking}
          flipped={flipped}
          size={size}
        />
      </motion.div>
    </div>
  );
});

/* =============================================================================
   TILT CARD (3D perspective on hover)
   ============================================================================= */

const TiltCard = memo(function TiltCard({
  children,
  className = "",
  glowColor = "#06B6D4",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      setTiltStyle({
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: `0 0 20px ${glowColor}30, 0 0 40px ${glowColor}15`,
      });
    },
    [glowColor]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
      boxShadow: "none",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-200 ease-out ${className}`}
      style={{ ...tiltStyle, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
});

/* =============================================================================
   EXPAND MODAL (card click-to-expand)
   ============================================================================= */

const ExpandModal = memo(function ExpandModal({
  open,
  onClose,
  title,
  emoji,
  desc,
  slug,
  color,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  emoji: string;
  desc: string;
  slug: string;
  color: string;
}) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-[90%] shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
        >
          {"\u2715"}
        </button>
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          {emoji}
        </div>
        <h3
          className="text-xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{desc}</p>
        <Link
          href={`/projetos/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: color }}
        >
          Ver projeto {"\u2192"}
        </Link>
      </motion.div>
    </motion.div>
  );
});

/* =============================================================================
   SOUND TOGGLE BUTTON
   ============================================================================= */

const SoundToggle = memo(function SoundToggle() {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-gray-800/80 transition-all"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip((v) => !v)}
        aria-label="Toggle som"
      >
        {"\uD83D\uDD07"}
      </button>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-gray-900/90 backdrop-blur-sm text-white text-xs whitespace-nowrap border border-white/10"
          >
            Em breve: Experiência com som {"\uD83C\uDFB5"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* =============================================================================
   COMPLETION BADGE
   ============================================================================= */

const CompletionBadge = memo(function CompletionBadge({
  allCompleted,
}: {
  allCompleted: boolean;
}) {
  if (!allCompleted) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-md rounded-full px-6 py-3 border border-amber-500/30 flex items-center gap-2">
        <span className="text-lg">{"\uD83C\uDFC6"}</span>
        <span
          className="text-sm font-bold text-amber-300"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          Exploração Completa!
        </span>
      </div>
    </motion.div>
  );
});

/* =============================================================================
   KEYBOARD SHORTCUTS OVERLAY
   ============================================================================= */

const KeyboardShortcuts = memo(function KeyboardShortcuts({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  const shortcuts = [
    { key: "1-8", desc: "Saltar para o capítulo" },
    { key: "\u2191 / \u2193", desc: "Scroll 200px" },
    { key: "Home", desc: "Ir para o topo" },
    { key: "End", desc: "Ir para o fim" },
    { key: "?", desc: "Mostrar atalhos" },
    { key: "Esc", desc: "Fechar diálogo" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-900 rounded-2xl p-6 max-w-sm w-[90%] border border-white/10 shadow-2xl"
      >
        <h3
          className="text-lg font-bold text-white mb-4 text-center"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {"\u2328\uFE0F"} Atalhos de Teclado
        </h3>
        <div className="flex flex-col gap-2">
          {shortcuts.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
            >
              <kbd className="px-2 py-1 rounded bg-white/10 text-white text-xs font-mono">
                {s.key}
              </kbd>
              <span className="text-sm text-white/60">{s.desc}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
});

/* =============================================================================
   ENHANCED NAVIGATION DOTS (with completion)
   ============================================================================= */

const EnhancedNavigationDots = memo(function EnhancedNavigationDots({
  activeChapter,
  completedChapters,
}: {
  activeChapter: number;
  completedChapters: Set<number>;
}) {
  const scrollToChapter = useCallback((index: number) => {
    const range = CHAPTER_RANGES[index];
    const targetY = range.start + (range.end - range.start) * 0.1;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
      <div className="absolute top-0 bottom-0 w-px bg-white/10" />
      {CHAPTER_RANGES.map((ch, i) => {
        const isCompleted = completedChapters.has(i);
        const isActive = activeChapter === i;
        return (
          <div key={i} className="relative group">
            <button
              onClick={() => scrollToChapter(i)}
              className="relative z-10 p-2 transition-all duration-300"
              aria-label={`Ir para ${ch.label}`}
            >
              <div
                className="rounded-full transition-all duration-300 relative"
                style={{
                  width: isActive ? "14px" : "8px",
                  height: isActive ? "14px" : "8px",
                  backgroundColor: isActive
                    ? "#06B6D4"
                    : isCompleted
                      ? "#10B981"
                      : "rgba(255,255,255,0.3)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(6,182,212,0.5)"
                    : isCompleted
                      ? "0 0 8px rgba(16,185,129,0.3)"
                      : "none",
                }}
              >
                {isCompleted && !isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 rounded-full border border-emerald-400/50"
                  />
                )}
              </div>
            </button>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1 rounded-lg bg-gray-900/90 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
              {isCompleted && (
                <span className="text-emerald-400">{"\u2713"}</span>
              )}
              {ch.label}
            </div>
          </div>
        );
      })}
    </div>
  );
});

/* =============================================================================
   HEARTBEAT EASTER EGG (Ch4)
   ============================================================================= */

const HeartbeatEasterEgg = memo(function HeartbeatEasterEgg() {
  const [active, setActive] = useState(false);
  return (
    <div className="relative">
      <motion.button
        onClick={() => setActive(!active)}
        className="cursor-pointer select-none opacity-30 hover:opacity-60 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="30" height="20" viewBox="0 0 60 20">
          <path
            d="M0,10 L15,10 L18,3 L22,17 L26,3 L30,17 L33,10 L60,10"
            fill="none"
            stroke="#EC4899"
            strokeWidth="2"
          />
        </svg>
      </motion.button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-white rounded-xl px-3 py-2 shadow-xl text-xs text-gray-800 font-medium whitespace-nowrap">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block mr-1"
              >
                {"\uD83D\uDC93"}
              </motion.span>
              O código está vivo!
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid white",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});


/* =============================================================================
   CHAPTER 0: PORTAL
   ============================================================================= */

const ChapterPortal = memo(function ChapterPortal({
  chapterProgress,
  reducedMotion,
}: {
  chapterProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const { layer2X, layer2Y, layer3X, layer3Y } = useMouseParallax();

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

  // 5-layer parallax speeds
  const starsY = useTransform(chapterProgress, [0, 1], ["0%", "-3%"]); // Layer 1: 0.05x
  const nebulaY = useTransform(chapterProgress, [0, 1], ["0%", "-12%"]); // Layer 2: 0.2x
  const orbsY = useTransform(chapterProgress, [0, 1], ["0%", "-25%"]); // Layer 3: 0.4x
  const dustY = useTransform(chapterProgress, [0, 1], ["0%", "-45%"]); // Layer 4: 0.7x
  const textY = useTransform(chapterProgress, [0, 1], ["0%", "-50%"]); // Layer 5: 1.0x
  const portalY = useTransform(chapterProgress, [0, 1], ["0%", "-30%"]);

  // 3D perspective rotation for stars
  const starsRotateX = useTransform(chapterProgress, [0, 1], [0, 3]);

  const [titleActive, setTitleActive] = useState(false);
  const [subtitleActive, setSubtitleActive] = useState(false);

  useMotionValueEvent(chapterProgress, "change", (v) => {
    setTitleActive(v > 0.15);
    setSubtitleActive(v > 0.3);
  });

  const portalStats = [
    { label: "109 Páginas", delay: 0 },
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

        {/* Layer 1 (0.05x): Far stars with 3D perspective */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : starsY,
            rotateX: reducedMotion ? 0 : starsRotateX,
            perspective: "1000px",
            willChange: "transform",
          }}
        >
          <StarField />
        </motion.div>

        {/* Layer 2 (0.2x): Nebulae with mouse parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : nebulaY,
            x: reducedMotion ? 0 : layer2X,
            willChange: "transform",
          }}
        >
          <NebulaBlobs />
        </motion.div>

        {/* Layer 3 (0.4x): Floating orbs with mouse parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : orbsY,
            x: reducedMotion ? 0 : layer3X,
            willChange: "transform",
          }}
        >
          {!reducedMotion && (
            <FloatingOrbs count={4} baseColor="#8B5CF6" sizeRange={[80, 200]} />
          )}
        </motion.div>

        {/* Layer 4 (0.7x): Stardust ambient particles */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reducedMotion ? 0 : dustY,
            willChange: "transform",
          }}
        >
          {!reducedMotion && <AmbientParticles type="stars" count={35} />}
        </motion.div>

        {/* 3 Shooting stars at different positions */}
        {!reducedMotion && <ShootingStar />}

        {/* Easter Egg: Clickable star */}
        <EasterEgg
          message="Esta estrela foi nomeada por ti &#x1F31F;"
          className="absolute z-20"
          style={{ top: "25%", right: "20%" }}
        >
          <div className="w-3 h-3 bg-white rounded-full opacity-40 hover:opacity-90 transition-opacity" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.5)" }} />
        </EasterEgg>
        {!reducedMotion && (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: "80px",
                  height: "1.5px",
                  background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
                  top: "35%",
                  left: "-80px",
                  transform: "rotate(-25deg)",
                  animation: "shootingStar2 11s linear 3s infinite",
                  willChange: "transform",
                }}
              />
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute"
                style={{
                  width: "60px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.7), transparent)",
                  top: "55%",
                  left: "-60px",
                  transform: "rotate(-10deg)",
                  animation: "shootingStar3 15s linear 7s infinite",
                  willChange: "transform",
                }}
              />
            </div>
          </>
        )}

        {/* Chapter transition to next */}
        <ChapterTransition
          fromColor="#030014"
          toColor="#1e1b4b"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

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
                text="Uma jornada pelo código, pela comida e pelas pessoas"
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
              Desce para começar \u2193
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
  chapterProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const { layer2X, layer2Y, layer3X, layer3Y } = useMouseParallax();

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

  // 5-layer parallax
  const skyY = useTransform(chapterProgress, [0, 1], ["0%", "-3%"]); // Layer 1: far sky
  const mountainsY1 = useTransform(chapterProgress, [0, 1], ["0%", "-10%"]); // Layer 2: distant mountains
  const mountainsY2 = useTransform(chapterProgress, [0, 1], ["0%", "-25%"]); // Layer 3: mid mountains
  const hillsY = useTransform(chapterProgress, [0, 1], ["0%", "-50%"]); // Layer 4: hills/near
  const groundY = useTransform(chapterProgress, [0, 1], ["0%", "-80%"]); // Layer 5: ground

  // Sun rise effect (linked to scroll)
  const sunY = useTransform(chapterProgress, [0, 0.5, 1], ["120%", "60%", "30%"]);
  const sunScale = useTransform(chapterProgress, [0, 0.5, 1], [0.5, 1, 1.3]);
  const sunOpacity = useTransform(chapterProgress, [0, 0.2, 0.8, 1], [0, 0.8, 1, 0.6]);

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
      text: "MSc Engenharia \u2014 Instituto Superior Técnico",
    },
    { emoji: "\u{1F4A1}", text: "Fundador da Descomplicai" },
  ];

  const valueCards = [
    {
      emoji: "\u{1F91D}",
      title: "Humanos Primeiro",
      desc: "A tecnologia é o meio, não o fim.",
    },
    {
      emoji: "\u{1F30A}",
      title: "Vida Autêntica",
      desc: "Surf, natureza, código com propósito.",
    },
    {
      emoji: "\u2764\uFE0F",
      title: "Amor no Código",
      desc: "Cada linha escrita com intenção.",
    },
  ];

  return (
    <section className="relative" style={{ height: "1600px" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1 (0.05x): Sky gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: bgGradient,
            y: reducedMotion ? 0 : skyY,
            willChange: "transform",
          }}
        />

        {/* Rising sun (scroll-linked) */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-[1]"
          style={{
            width: "200px",
            height: "200px",
            y: reducedMotion ? "60%" : sunY,
            scale: reducedMotion ? 1 : sunScale,
            opacity: reducedMotion ? 0.8 : sunOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #FBBF24 0%, #F59E0B 30%, rgba(249,115,22,0.4) 60%, transparent 80%)",
              boxShadow: "0 0 80px rgba(251,191,36,0.5), 0 0 160px rgba(245,158,11,0.3)",
            }}
          />
        </motion.div>

        {/* Animated clouds drifting left-to-right */}
        {!reducedMotion && (
          <div className="absolute top-[10%] w-full h-[20%] pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${120 + i * 50}px`,
                  height: `${35 + i * 10}px`,
                  left: `${-10 + i * 28}%`,
                  top: `${i * 25}%`,
                  background: "rgba(255,255,255,0.25)",
                  filter: "blur(8px)",
                  animation: `cloudDriftLR ${25 + i * 8}s linear infinite`,
                  willChange: "transform",
                }}
              />
            ))}
          </div>
        )}

        {/* Layer 2 (0.2x): Mountain layer 1 - distant with mouse parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[60%]"
          style={{
            y: reducedMotion ? 0 : mountainsY1,
            x: reducedMotion ? 0 : layer2X,
            willChange: "transform",
          }}
        >
          <MountainLayer
            color="#1e1b4b"
            pathD="M0,160 C240,80 480,200 720,120 C960,40 1200,180 1440,100 L1440,320 L0,320 Z"
          />
        </motion.div>

        {/* Layer 3 (0.4x): Mountain layer 2 - mid with mouse parallax */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[50%]"
          style={{
            y: reducedMotion ? 0 : mountainsY2,
            x: reducedMotion ? 0 : layer3X,
            willChange: "transform",
          }}
        >
          <MountainLayer
            color="#312e81"
            pathD="M0,200 C180,140 360,240 540,180 C720,120 900,220 1080,160 C1260,100 1350,200 1440,160 L1440,320 L0,320 Z"
          />
        </motion.div>

        {/* Layer 4 (0.7x): Hills layer */}
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

        {/* Layer 5 (1.0x): Ground with waving grass blades */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[20%]"
          style={{
            y: reducedMotion ? 0 : groundY,
            willChange: "transform",
          }}
        >
          <div className="absolute inset-0 bg-[#15803d]" />
          {!reducedMotion && (
            <div className="absolute top-0 left-0 w-full h-6 overflow-hidden">
              {Array.from({ length: 40 }, (_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{
                    left: `${i * 2.5}%`,
                    width: "3px",
                    height: `${12 + seededRandom(i * 71) * 12}px`,
                    backgroundColor: `hsl(${130 + seededRandom(i * 71 + 1) * 20}, 70%, ${30 + seededRandom(i * 71 + 2) * 15}%)`,
                    transformOrigin: "bottom center",
                    animation: `grassWave ${1.5 + seededRandom(i * 71 + 3) * 1.5}s ease-in-out ${seededRandom(i * 71 + 4) * 1}s infinite`,
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Ambient leaves particles */}
        {!reducedMotion && (
          <AmbientParticles type="leaves" count={25} />
        )}

        {/* Easter Egg: Clickable tree */}
        <EasterEgg
          message="Esta árvore plantada representa cada projeto concluído &#x1F333;"
          className="absolute z-20"
          style={{ bottom: "22%", left: "15%" }}
        >
          <div className="text-2xl opacity-40 hover:opacity-80 transition-opacity">{"\uD83C\uDF33"}</div>
        </EasterEgg>

        {/* Chapter transition to Oficina */}
        <ChapterTransition
          fromColor="#60a5fa"
          toColor="#fef3c7"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

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
                      ? "O futuro é humano."
                      : "Olá! Sou o Jaime."
                  }
                />
              </div>
            )}
            <InteractivePixelCharacter
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
  chapterProgress: MotionValue<number>;
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
    { value: 109, suffix: "", label: "Páginas criadas" },
    { value: 55, suffix: "+", label: "Projetos completos" },
    { value: 52, suffix: "K+", label: "Linhas de código" },
    { value: 1, suffix: "", label: "Noite para criar tudo" },
  ];

  const processSteps = [
    { step: 1, label: "Conversa", icon: "\u{1F4AC}" },
    { step: 2, label: "Pesquisa", icon: "\u{1F50D}" },
    { step: 3, label: "Design", icon: "\u{1F3A8}" },
    { step: 4, label: "Construir", icon: "\u{1F528}" },
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

        {/* Easter Egg: Book on shelf */}
        <EasterEgg
          message="Manual secreto: Ctrl+C, Ctrl+V salvou o mundo \uD83D\uDCDA"
          className="absolute z-20"
          style={{ top: "8%", left: "30%" }}
        >
          <div className="text-xl opacity-30 hover:opacity-70 transition-opacity">{"\uD83D\uDCDA"}</div>
        </EasterEgg>

        {/* Back wall with shelves */}
        <div
          className="absolute top-0 left-0 w-full h-[30%]"
          style={{ backgroundColor: "#92400E", opacity: 0.15 }}
        />

        {/* Floating tool icons orbiting */}
        {!reducedMotion && <FloatingToolIcons />}

        {/* Ambient sparks/embers floating upward */}
        {!reducedMotion && (
          <AmbientParticles type="sparks" count={20} />
        )}

        {/* Chapter transition to Vila */}
        <ChapterTransition
          fromColor="#fef3c7"
          toColor="#7DD3FC"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

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
              {"\u{1F4BB}"} Competências Técnicas
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
              {"\u{1F3A8}"} Competências Criativas
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
                  <SpeechBubble text="Estas são as ferramentas. Agora vou mostrar-te o que construí com elas." />
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
                    Outras competências
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
                    Satisfação dos clientes
                  </h4>
                  <div className="flex gap-6 justify-center">
                    <ProgressRing
                      percentage={98}
                      color="#10B981"
                      label="Satisfação"
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
                      label="Repetição"
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
  chapterProgress: MotionValue<number>;
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

        {/* Steam rising from chimneys */}
        {!reducedMotion && <SteamChimneys />}

        {/* Street lamps with warm glow */}
        {!reducedMotion && <StreetLamps />}

        {/* Fireflies (warm yellow blink) */}
        {!reducedMotion && <Fireflies count={12} />}

        {/* Steam particles */}
        {!reducedMotion && (
          <AmbientParticles type="steam" count={20} />
        )}

        {/* Easter Egg: Restaurant sign */}
        <EasterEgg
          message="O melhor restaurante é aquele que ainda não foi criado &#x1F37D;&#xFE0F;"
          className="absolute z-20"
          style={{ top: "12%", right: "12%" }}
        >
          <div className="text-xl opacity-30 hover:opacity-70 transition-opacity">{"\uD83C\uDF7D\uFE0F"}</div>
        </EasterEgg>

        {/* Chapter transition to Saude */}
        <ChapterTransition
          fromColor="#E0F2FE"
          toColor="#DBEAFE"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

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
          <InteractivePixelCharacter
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

          
          {/* Mini-game: Memória de Sabores */}
          <MiniGameMemory />

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
  chapterProgress: MotionValue<number>;
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

        {/* Medical equipment silhouettes */}
        <div className="absolute bottom-[30%] left-0 w-full h-[20%] pointer-events-none opacity-[0.04]">
          <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
            {/* Stethoscope silhouette */}
            <circle cx="200" cy="100" r="30" fill="#1E40AF" />
            <path d="M200,130 L200,180 Q200,200 220,200 L260,200" stroke="#1E40AF" strokeWidth="4" fill="none" />
            {/* Syringe */}
            <rect x="500" y="80" width="8" height="100" fill="#1E40AF" rx="2" />
            <rect x="494" y="70" width="20" height="15" fill="#1E40AF" rx="2" />
            {/* Heart monitor */}
            <rect x="900" y="60" width="120" height="90" rx="8" fill="#1E40AF" />
            <rect x="1200" y="90" width="80" height="60" rx="4" fill="#1E40AF" />
          </svg>
        </div>

        {/* ECG line */}
        {!reducedMotion && <ECGLine />}

        {/* Clean clinical floating crosses */}
        {!reducedMotion && <MedicalCrosses count={15} />}

        {/* Heartbeat particles (bubbles float up) */}
        {!reducedMotion && (
          <AmbientParticles type="heartbeat" count={12} />
        )}

        {/* Chapter transition to Lab */}
        <ChapterTransition
          fromColor="#F0F9FF"
          toColor="#0f172a"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

        {/* Easter Egg: Heart monitor */}
        <div className="absolute bottom-[35%] right-[8%] z-20">
          <HeartbeatEasterEgg />
        </div>

        {/* Character */}
        <div className="absolute bottom-[25%] left-[10%] z-20">
          <InteractivePixelCharacter variant="lab" size={48} />
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
            8 clínicas digitalizadas
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

          {/* Mini-game: Diagnostico Digital */}
          <MiniGameDiagnosis />
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
  chapterProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const bgOpacity = useTransform(chapterProgress, [0, 0.05], [0, 1]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCards, setVisibleCards] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);

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

        {/* Glowing circuit grid lines */}
        {!reducedMotion && <CircuitGrid />}

        {/* Code rain (Matrix-style) */}
        {!reducedMotion && <CodeRain count={15} />}

        {/* Terminal cursor blink overlay */}
        {!reducedMotion && (
          <div className="absolute top-4 left-4 pointer-events-none z-[2] opacity-20">
            <span className="font-mono text-xs text-green-400">$ descomplicai --build</span>
            <span
              className="inline-block w-2 h-4 ml-1 bg-green-400"
              style={{ animation: "cursorBlink 1s step-end infinite" }}
            />
          </div>
        )}

        {/* Data bits (cyan falling) */}
        {!reducedMotion && (
          <AmbientParticles type="binary" count={25} />
        )}

        {/* Chapter transition to Jornada */}
        <ChapterTransition
          fromColor="#0f172a"
          toColor="#F59E0B"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

        {/* Character with visor */}
        <div className="absolute bottom-8 left-8 z-30">
          <InteractivePixelCharacter variant="hacker" size={48} />
        </div>

        {/* Easter Egg: Terminal */}
        <motion.button
          onClick={() => setTerminalOpen(true)}
          className="absolute bottom-10 left-24 z-30 text-xl opacity-30 hover:opacity-70 transition-opacity cursor-pointer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {"\uD83D\uDCBB"}
        </motion.button>
        <AnimatePresence>
          <MiniTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
        </AnimatePresence>

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
            30+ ferramentas e experiências interativas
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
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.boxShadow = `0 0 25px ${tool.color}40, 0 0 50px ${tool.color}15, inset 0 0 15px ${tool.color}10`;
                      el.style.borderColor = `${tool.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.boxShadow = `0 0 0 0 ${tool.color}00`;
                      el.style.borderColor = `${tool.color}20`;
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

          
          {/* Mini-game: Code Challenge */}
          <div className="flex justify-center">
            <MiniGameCode />
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
  chapterProgress: MotionValue<number>;
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

        {/* Golden dust (amber swirl) */}
        {!reducedMotion && (
          <AmbientParticles type="dust" count={30} />
        )}

        {/* Easter Egg: Timeline dot */}
        <EasterEgg
          message="Cada ponto é uma história. Esta jornada é só o começo."
          className="absolute z-20"
          style={{ top: "15%", right: "15%" }}
        >
          <div className="w-4 h-4 rounded-full bg-amber-400 opacity-30 hover:opacity-80 transition-opacity" style={{ boxShadow: "0 0 12px rgba(245,158,11,0.4)" }} />
        </EasterEgg>

        {/* Chapter transition to Topo */}
        <ChapterTransition
          fromColor="#312e81"
          toColor="#030014"
          progress={chapterProgress}
          reducedMotion={reducedMotion}
        />

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
          <InteractivePixelCharacter
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

                  {/* Center dot with golden particles */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
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
                      {/* Golden particles burst */}
                      <GoldenParticles active={visibleMilestones > i} count={12} />
                    </div>
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
  chapterProgress: MotionValue<number>;
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
    "109 Páginas",
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

          {/* Light rays from top */}
          {!reducedMotion && <LightRays />}

          {/* Snowflakes / Confetti particles (multicolor fall from top) */}
          {!reducedMotion && (
            <AmbientParticles type="snow" count={35} />
          )}

          {/* Easter Egg: Crown triggers confetti */}
          <div className="absolute z-20" style={{ top: "8%", left: "50%", transform: "translateX(-50%)" }}>
            <motion.button
              onClick={() => setShowConfetti(true)}
              className="cursor-pointer select-none opacity-20 hover:opacity-60 transition-opacity text-3xl"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              {"\uD83D\uDC51"}
            </motion.button>
          </div>

          {/* Character at the peak */}
          <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 z-20">
            {showBubble && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <SpeechBubble text="Obrigado por fazeres esta jornada comigo." />
              </div>
            )}
            <InteractivePixelCharacter
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
                  O futuro é humano.
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
                      desc: "O site que mereces — rápido, bonito, e funciona no telemóvel da tua avó.",
                      gradient: "from-blue-500/20 to-cyan-500/20",
                    },
                    {
                      icon: "\u{1F3A8}",
                      title: "Branding",
                      desc: "A tua marca ganha cara, voz e personalidade própria.",
                      gradient: "from-purple-500/20 to-pink-500/20",
                    },
                    {
                      icon: "\u{1F4F1}",
                      title: "Apps Web",
                      desc: "Ferramentas que resolvem problemas reais — tipo as 30+ que já construí.",
                      gradient: "from-green-500/20 to-emerald-500/20",
                    },
                    {
                      icon: "\u{1F916}",
                      title: "Automação",
                      desc: "A IA trata do chato. Tu tratas do que importa.",
                      gradient: "from-amber-500/20 to-orange-500/20",
                    },
                    {
                      icon: "\u{1F4CA}",
                      title: "Consultoria",
                      desc: "Um café, uma conversa, e um plano que faz sentido.",
                      gradient: "from-indigo-500/20 to-violet-500/20",
                    },
                    {
                      icon: "\u{1F91D}",
                      title: "Mentoria",
                      desc: "Já estive onde tu estás. Vamos encurtar o caminho juntos.",
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
                      label="Páginas"
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
                      label="Clínicas"
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
                    Tudo construído com paixão, uma linha de cada vez.
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
                    Voltar ao início {"\u2191"}
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
   ACHIEVEMENT TOAST NOTIFICATION
   ============================================================================= */

const AchievementToast = memo(function AchievementToast({ achievementId, onDismiss }: { achievementId: string; onDismiss: () => void }) {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  useEffect(() => { const timer = setTimeout(onDismiss, 3000); return () => clearTimeout(timer); }, [onDismiss]);
  if (!achievement) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 80, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 80, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
      <div className="px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl border" style={{ background: "linear-gradient(135deg, rgba(30,27,75,0.95), rgba(59,7,100,0.95))", borderColor: "rgba(234,179,8,0.4)", boxShadow: "0 0 30px rgba(234,179,8,0.3), 0 0 60px rgba(234,179,8,0.1)" }}>
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider" style={{ fontFamily: "var(--font-sora), sans-serif" }}>Conquista Desbloqueada!</div>
          <div className="text-sm text-white font-medium">{achievement.name}</div>
        </div>
      </div>
    </motion.div>
  );
});

/* =============================================================================
   ACHIEVEMENT PANEL (with Stats tab)
   ============================================================================= */

const AchievementPanel = memo(function AchievementPanel({ isOpen, onClose, achievements, activeTab, onTabChange, getLiveStats }: { isOpen: boolean; onClose: () => void; achievements: AchievementState; activeTab: "achievements" | "stats"; onTabChange: (tab: "achievements" | "stats") => void; getLiveStats: () => StatsState }) {
  const [liveStats, setLiveStats] = useState<StatsState>(DEFAULT_STATS_STATE);
  useEffect(() => { if (isOpen) setLiveStats(getLiveStats()); }, [isOpen, activeTab, getLiveStats]);
  const unlockedCount = Object.values(achievements.unlocked).filter(Boolean).length;
  const fmtTime = (seconds: number) => `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  const chCompCount = Object.values(liveStats.chaptersCompleted).filter(Boolean).length;
  const favIdx = Object.entries(liveStats.chapterTimes).reduce((best, [ch, time]) => (time > (best.time || 0) ? { ch: Number(ch), time } : best), { ch: -1, time: 0 }).ch;
  const favName = favIdx >= 0 && favIdx < CHAPTER_RANGES.length ? CHAPTER_RANGES[favIdx].label : "---";
  const sComp = () => { const e = (liveStats.totalScroll / 324000).toFixed(1); return Number(e) >= 1 ? `Equivalente a ${e} Torres Eiffel! \u{1F5FC}` : `${(liveStats.totalScroll / 1000).toFixed(0)} metros scrollados! \u{1F4CF}`; };
  const tComp = () => { const c = Math.floor(liveStats.timeSpent / 180); return c >= 1 ? `Nesse tempo podias ter feito ${c} cafe${c > 1 ? "s" : ""} \u2615` : `Recém chegaste! \u{1F44B}`; };
  const vComp = () => { if (liveStats.returnVisits > 5) return `Voltaste ${liveStats.returnVisits} vezes \u2014 já somos amigos! \u{1F91D}`; return liveStats.returnVisits > 1 ? `Bem-vindo de volta! \u{1F44B}` : `Primeira visita! \u{1F31F}`; };
  const sCards = [
    { icon: "\u{1F4CF}", name: "Distância Scrollada", value: `${Math.floor(liveStats.totalScroll).toLocaleString("pt-PT")}px`, comp: sComp() },
    { icon: "\u23F1\u{FE0F}", name: "Tempo de Exploração", value: fmtTime(liveStats.timeSpent), comp: tComp() },
    { icon: "\u{1F4D6}", name: "Capítulos Explorados", value: `${chCompCount}/8`, comp: chCompCount === 8 ? "Todos explorados! \u{1F389}" : "Continua a explorar!" },
    { icon: "\u{1F50D}", name: "Cliques Interativos", value: `${liveStats.interactiveClicks}`, comp: liveStats.interactiveClicks > 10 ? "Explorador nato! \u{1F9ED}" : "Clica em mais coisas!" },
    { icon: "\u{1F3AE}", name: "Personagem Clicado", value: `${liveStats.characterClicks}x`, comp: liveStats.characterClicks > 5 ? "O Jaime agradece! \u{1F60A}" : "Tenta clicar no Jaime!" },
    { icon: "\u{1F504}", name: "Visitas", value: `${liveStats.returnVisits}`, comp: vComp() },
    { icon: "\u2764\u{FE0F}", name: "Capitulo Favorito", value: favName, comp: "Onde passaste mais tempo!" },
    { icon: "\u{1F3C6}", name: "Conquistas", value: `${unlockedCount}/10`, comp: unlockedCount === 10 ? "100% Completista! \u{1F451}" : `Faltam ${10 - unlockedCount}!` },
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55] flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative w-full max-w-lg max-h-[80vh] overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(15,10,40,0.97), rgba(30,15,60,0.97))", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 60px rgba(139,92,246,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-sora), sans-serif" }}>{"\u{1F3C6}"} Conquistas & Stats</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm">{"\u2715"}</button>
            </div>
            <div className="flex gap-1 mx-5 mb-4 p-1 rounded-lg bg-white/5">
              <button onClick={() => onTabChange("achievements")} className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors ${activeTab === "achievements" ? "bg-amber-500/20 text-amber-300" : "text-white/50 hover:text-white/70"}`}>{"\u{1F3C6}"} Conquistas ({unlockedCount}/10)</button>
              <button onClick={() => onTabChange("stats")} className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-colors ${activeTab === "stats" ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white/70"}`}>{"\u{1F4CA}"} Estatisticas</button>
            </div>
            <div className="px-5 pb-5 overflow-y-auto max-h-[55vh]">
              {activeTab === "achievements" ? (
                <div className="grid grid-cols-1 gap-2">
                  {ACHIEVEMENTS.map((ach, i) => { const isUnlocked = achievements.unlocked[ach.id]; return (
                    <motion.div key={ach.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: isUnlocked ? "rgba(234,179,8,0.08)" : "rgba(255,255,255,0.02)", borderColor: isUnlocked ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.05)", boxShadow: isUnlocked ? "0 0 15px rgba(234,179,8,0.1)" : "none" }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: isUnlocked ? "rgba(234,179,8,0.15)" : "rgba(255,255,255,0.05)", filter: isUnlocked ? "none" : "grayscale(1)", opacity: isUnlocked ? 1 : 0.4 }}>{isUnlocked ? ach.icon : "\u{1F512}"}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium" style={{ color: isUnlocked ? "#EAB308" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-sora), sans-serif" }}>{isUnlocked ? ach.name : "???"}</div>
                        <div className="text-xs text-white/40 mt-0.5">{isUnlocked ? ach.description : ach.hiddenDescription}</div>
                      </div>
                      {isUnlocked && <div className="text-xs text-amber-500/60">{"\u2713"}</div>}
                    </motion.div>
                  ); })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sCards.map((card, i) => (
                    <motion.div key={card.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="p-3 rounded-xl border border-white/5 bg-white/[0.03]">
                      <div className="flex items-center gap-2 mb-1"><span className="text-lg">{card.icon}</span><span className="text-xs text-white/50">{card.name}</span></div>
                      <div className="text-lg font-bold text-cyan-300 mb-1" style={{ fontFamily: "var(--font-sora), sans-serif" }}>{card.value}</div>
                      <div className="text-[10px] text-white/30">{card.comp}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/* =============================================================================
   ACHIEVEMENT BUTTON (FIXED BOTTOM-LEFT)
   ============================================================================= */

const AchievementButton = memo(function AchievementButton({ unlockedCount, onClick }: { unlockedCount: number; onClick: () => void }) {
  return (
    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring" }} onClick={onClick} className="fixed left-4 bottom-20 z-[52] lg:bottom-20 px-3 py-2 rounded-full border transition-colors hover:bg-white/10" style={{ background: "rgba(15,10,40,0.85)", backdropFilter: "blur(8px)", borderColor: unlockedCount > 0 ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.1)", boxShadow: unlockedCount > 0 ? "0 0 15px rgba(234,179,8,0.15)" : "none" }} aria-label={`Conquistas: ${unlockedCount} de 10`}>
      <span className="text-sm font-medium" style={{ fontFamily: "var(--font-sora), sans-serif" }}>{"\u{1F3C6}"}{" "}<span style={{ color: unlockedCount > 0 ? "#EAB308" : "rgba(255,255,255,0.5)" }}>{unlockedCount}/10</span></span>
    </motion.button>
  );
});

/* =============================================================================
   END-OF-PAGE JOURNEY SUMMARY
   ============================================================================= */

const JourneySummary = memo(function JourneySummary({ visible, getLiveStats, unlockedCount, onShare, onRestart }: { visible: boolean; getLiveStats: () => StatsState; unlockedCount: number; onShare: () => void; onRestart: () => void }) {
  const [jStats, setJStats] = useState<StatsState | null>(null);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => { if (visible && !showCard) { setJStats(getLiveStats()); const t = setTimeout(() => setShowCard(true), 300); return () => clearTimeout(t); } if (!visible) setShowCard(false); }, [visible, getLiveStats, showCard]);
  if (!jStats) return null;
  const fTime = (s: number) => `${Math.floor(s / 60)}m ${Math.floor(s % 60)}s`;
  const chDone = Object.values(jStats.chaptersCompleted).filter(Boolean).length;
  const fIdx = Object.entries(jStats.chapterTimes).reduce((b, [c, t]) => (t > (b.time || 0) ? { ch: Number(c), time: t } : b), { ch: -1, time: 0 }).ch;
  const fName = fIdx >= 0 && fIdx < CHAPTER_RANGES.length ? CHAPTER_RANGES[fIdx].label : "---";
  const sLines = [
    { icon: "\u{1F4DC}", text: `${chDone}/8 Capítulos explorados` },
    { icon: "\u23F1\u{FE0F}", text: `${fTime(jStats.timeSpent)} de exploração` },
    { icon: "\u{1F4CF}", text: `${Math.floor(jStats.totalScroll).toLocaleString("pt-PT")}px scrollados` },
    { icon: "\u{1F3C5}", text: `${unlockedCount}/10 conquistas` },
    { icon: "\u2764\u{FE0F}", text: `Capítulo favorito: ${fName}` },
  ];
  return (
    <AnimatePresence>
      {showCard && (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-full max-w-sm mx-auto mt-6 mb-4">
          <div className="rounded-2xl overflow-hidden border" style={{ background: "linear-gradient(135deg, rgba(15,10,40,0.95), rgba(30,15,60,0.95))", borderColor: "rgba(234,179,8,0.3)", boxShadow: "0 0 40px rgba(234,179,8,0.15), 0 0 80px rgba(139,92,246,0.1)" }}>
            <div className="text-center pt-5 pb-3 border-b border-white/10"><h4 className="text-base font-bold text-amber-300" style={{ fontFamily: "var(--font-sora), sans-serif" }}>{"\u{1F3C6}"} A TUA JORNADA EM NÚMEROS</h4></div>
            <div className="px-5 py-4 space-y-2">{sLines.map((l, i) => (<motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.2, type: "spring" }} className="flex items-center gap-3 text-sm text-white/80"><span className="text-base w-6 text-center">{l.icon}</span><span>{l.text}</span></motion.div>))}</div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex gap-2 px-5 pb-5">
              <button onClick={onShare} className="flex-1 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium transition-colors border border-amber-500/20">Partilhar {"\u{1F4E4}"}</button>
              <button onClick={onRestart} className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium transition-colors border border-white/5">Recomeçar {"\u{1F504}"}</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(new Set());
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Achievement & Statistics system
  const achSystem = useAchievements();
  const [showJourneySummary, setShowJourneySummary] = useState(false);

  // Achievement checks
  useEffect(() => {
    if (!achSystem.mounted) return;

    // Noctambulo: visit between 22:00 and 06:00
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) achSystem.unlock("noctambulo");

    // Mobile Explorer: viewport width < 768
    if (typeof window !== "undefined" && window.innerWidth < 768) achSystem.unlock("mobile-explorer");
  }, [achSystem.mounted, achSystem.unlock]);

  // Track chapter-based achievements
  useEffect(() => {
    if (!achSystem.mounted) return;

    // Primeiro Capitulo: scroll past chapter 0
    if (activeChapter >= 1) achSystem.unlock("primeiro-capitulo");

    // Leitor Avido: visit all 8 chapters
    const visited = achSystem.scrollTracker.chaptersVisited.current;
    const allVisited = CHAPTER_RANGES.every((_, i) => visited[i]);
    if (allVisited) achSystem.unlock("leitor-avido");

    // Speed Reader: all chapters in under 2 minutes
    if (allVisited) {
      const elapsed = (Date.now() - achSystem.startTimeRef.current) / 1000;
      if (elapsed < 120) achSystem.unlock("speed-reader");
    }

    // Show journey summary at the end
    if (progress > 0.95) setShowJourneySummary(true);
    else setShowJourneySummary(false);
  }, [activeChapter, progress, achSystem]);

  // Apreciador: 10+ minutes
  useEffect(() => {
    if (!achSystem.mounted) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - achSystem.startTimeRef.current) / 1000;
      if (achSystem.stats.timeSpent + elapsed > 600) {
        achSystem.unlock("apreciador");
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [achSystem]);

  // Observador: 5+ interactive clicks
  useEffect(() => {
    if (!achSystem.mounted) return;
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role=button]")) {
        achSystem.registerInteractiveClick();
      }
    };
    container.addEventListener("click", handler, { passive: true });
    return () => container.removeEventListener("click", handler);
  }, [achSystem]);

  // Check interactive clicks threshold
  useEffect(() => {
    if (!achSystem.mounted) return;
    const ls = achSystem.getLiveStats();
    if (ls.interactiveClicks >= 5) achSystem.unlock("observador");
  }, [achSystem]);

  // Completista: check if all other 9 are unlocked
  useEffect(() => {
    if (!achSystem.mounted) return;
    const otherIds = ACHIEVEMENTS.filter((a) => a.id !== "completista").map((a) => a.id);
    const allUnlocked = otherIds.every((id) => achSystem.achievements.unlocked[id]);
    if (allUnlocked) achSystem.unlock("completista");
  }, [achSystem]);

  // Share handler for journey summary
  const handleShareJourney = useCallback(() => {
    const ls = achSystem.getLiveStats();
    const chapsDone = Object.values(ls.chaptersCompleted).filter(Boolean).length;
    const fmtT = (s: number) => `${Math.floor(s / 60)}m ${Math.floor(s % 60)}s`;
    const text = `A minha jornada no RPG Chronicle da Descomplicai:\n${chapsDone}/8 capitulos\n${fmtT(ls.timeSpent)} de exploração\n${Math.floor(ls.totalScroll).toLocaleString("pt-PT")}px scrollados\n${achSystem.unlockedCount}/10 conquistas\n\nDescobre em descomplicai.pt`;
    navigator.clipboard.writeText(text).catch(() => {});
  }, [achSystem]);

  // Volta ao inicio achievement: detect when user scrolls back to top after reaching far
  useEffect(() => {
    if (!achSystem.mounted) return;
    let wasDeep = false;
    const handler = () => {
      if (window.scrollY > TOTAL_HEIGHT * 0.7) wasDeep = true;
      if (wasDeep && window.scrollY < 100) {
        achSystem.unlock("volta-ao-inicio");
        achSystem.markBackToTop();
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [achSystem]);

  // Restart handler
  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Chapter completion tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = window.scrollY;
      const newCompleted = new Set(completedChapters);
      for (let i = 0; i < CHAPTER_RANGES.length; i++) {
        if (scrollPx >= CHAPTER_RANGES[i].end - 100) {
          newCompleted.add(i);
        }
      }
      if (newCompleted.size !== completedChapters.size) {
        setCompletedChapters(newCompleted);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [completedChapters]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "1": case "2": case "3": case "4":
        case "5": case "6": case "7": case "8": {
          const idx = parseInt(e.key) - 1;
          if (idx >= 0 && idx < CHAPTER_RANGES.length) {
            const range = CHAPTER_RANGES[idx];
            window.scrollTo({ top: range.start + (range.end - range.start) * 0.1, behavior: "smooth" });
          }
          break;
        }
        case "ArrowUp":
          e.preventDefault();
          window.scrollBy({ top: -200, behavior: "smooth" });
          break;
        case "ArrowDown":
          e.preventDefault();
          window.scrollBy({ top: 200, behavior: "smooth" });
          break;
        case "Home":
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "End":
          e.preventDefault();
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          break;
        case "?":
          setShowShortcuts((v) => !v);
          break;
        case "Escape":
          setShowShortcuts(false);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

        /* === PIXEL CHARACTER ANIMATIONS === */

        /* Walking */
        @keyframes pixelLegWalk {
          0% { transform: rotate(-18deg); }
          100% { transform: rotate(18deg); }
        }
        @keyframes pixelArmSwing {
          0% { transform: rotate(-12deg); }
          100% { transform: rotate(12deg); }
        }
        @keyframes pixelWalkBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pixelHairBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1px); }
        }

        /* Idle */
        @keyframes pixelBreathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.02); }
        }
        @keyframes pixelBlink {
          0%, 92% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
          97% { transform: scaleY(1); }
        }
        @keyframes pixelLookAround {
          0%, 40% { transform: translateX(0); }
          45%, 55% { transform: translateX(-1px); }
          60%, 80% { transform: translateX(1px); }
          85%, 100% { transform: translateX(0); }
        }

        /* Typing (sitting) */
        @keyframes pixelTypingL {
          0% { transform: rotate(25deg) translateY(0); }
          100% { transform: rotate(30deg) translateY(-1px); }
        }
        @keyframes pixelTypingR {
          0% { transform: rotate(-25deg) translateY(0); }
          100% { transform: rotate(-30deg) translateY(-1px); }
        }
        @keyframes pixelTypingHandL {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }
        @keyframes pixelTypingHandR {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }

        /* Chef cooking */
        @keyframes pixelPanToss {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          30% { transform: rotate(-5deg) translateY(-4px); }
          50% { transform: rotate(5deg) translateY(-8px); }
          70% { transform: rotate(-3deg) translateY(-3px); }
        }
        @keyframes pixelSteam {
          0% { transform: translateY(0); opacity: 0.5; }
          100% { transform: translateY(-12px); opacity: 0; }
        }

        /* Lab examining */
        @keyframes pixelClipboardNod {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(3deg); }
          60% { transform: rotate(-2deg); }
        }

        /* Hacker */
        @keyframes pixelVisorGlow {
          0%, 100% { opacity: 0.85; box-shadow: 0 0 4px rgba(6,182,212,0.3); }
          50% { opacity: 1; box-shadow: 0 0 8px rgba(6,182,212,0.6); }
        }
        @keyframes pixelFistPump {
          0%, 85%, 100% { opacity: 0; transform: translateY(0); }
          88% { opacity: 1; transform: translateY(-6px); }
          92% { opacity: 1; transform: translateY(-2px); }
          95% { opacity: 0; transform: translateY(-4px); }
        }

        /* Climbing */
        @keyframes pixelClimbArmL {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pixelClimbArmR {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pixelClimbHandL {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pixelClimbHandR {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pixelClimbLegL {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes pixelClimbLegR {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes pixelRopeTrail {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(2px) rotate(3deg); }
        }

        /* Hero */
        @keyframes pixelCapeFlow {
          0%, 100% { transform: rotate(0deg) skewX(0deg); }
          25% { transform: rotate(8deg) skewX(5deg); }
          75% { transform: rotate(-4deg) skewX(-3deg); }
        }
        @keyframes pixelCapeIdle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes pixelCapeFlutter {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes pixelHeroHairWind {
          0%, 100% { transform: translateX(0) scaleX(1); }
          50% { transform: translateX(-2px) scaleX(1.3); }
        }

        /* === ENHANCED PARALLAX KEYFRAMES === */

        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes shootingStar2 {
          0% { transform: translateX(-80px) rotate(-25deg); opacity: 0; }
          3% { opacity: 1; }
          12% { transform: translateX(120vw) rotate(-25deg); opacity: 0; }
          100% { transform: translateX(120vw) rotate(-25deg); opacity: 0; }
        }

        @keyframes shootingStar3 {
          0% { transform: translateX(-60px) rotate(-10deg); opacity: 0; }
          4% { opacity: 0.8; }
          14% { transform: translateX(120vw) rotate(-10deg); opacity: 0; }
          100% { transform: translateX(120vw) rotate(-10deg); opacity: 0; }
        }

        @keyframes cloudDriftLR {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120vw); }
        }

        @keyframes grassWave {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes orbitFloat {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        @keyframes steamRise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.1; }
          100% { transform: translateY(-80px) scale(2); opacity: 0; }
        }

        @keyframes lampGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes fireflyBlink {
          0%, 100% { opacity: 0; }
          20% { opacity: 1; }
          40% { opacity: 0.3; }
          60% { opacity: 0.9; }
          80% { opacity: 0.1; }
        }

        @keyframes fireflyDrift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(15px, -20px); }
          50% { transform: translate(-10px, -10px); }
          75% { transform: translate(20px, 10px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes medicalFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.04; }
          25% { transform: translateY(-15px) rotate(10deg); opacity: 0.08; }
          50% { transform: translateY(-5px) rotate(-5deg); opacity: 0.04; }
          75% { transform: translateY(-20px) rotate(5deg); opacity: 0.06; }
        }

        @keyframes codeRainFall {
          0% { transform: translateY(-20%); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }

        @keyframes circuitDraw {
          0% { stroke-dashoffset: 200; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes goldenBurst {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx, 20px), var(--ty, -20px)) scale(0); opacity: 0; }
        }

        @keyframes lightRayPulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }

        @keyframes pendulumSwing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes waveHand {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }

        @keyframes easterEggPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
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
        {/* Achievement System UI */}
        {achSystem.mounted && (
          <>
            <AchievementButton unlockedCount={achSystem.unlockedCount} onClick={() => achSystem.setPanelOpen(true)} />
            <AchievementPanel isOpen={achSystem.panelOpen} onClose={() => achSystem.setPanelOpen(false)} achievements={achSystem.achievements} activeTab={achSystem.panelTab} onTabChange={achSystem.setPanelTab} getLiveStats={achSystem.getLiveStats} />
            <AnimatePresence>
              {achSystem.toastQueue.length > 0 && (
                <AchievementToast achievementId={achSystem.toastQueue[0]} onDismiss={achSystem.dismissToast} />
              )}
            </AnimatePresence>
          </>
        )}

        {/* Persistent UI */}
        <SoundToggle />
        <ProgressBar progress={progress} />
        <EnhancedNavigationDots activeChapter={activeChapter} completedChapters={completedChapters} />
        <MiniMap activeChapter={activeChapter} progress={progress} />
        <ScrollIndicator visible={progress < 0.05} />
        <CompletionBadge allCompleted={completedChapters.size >= CHAPTER_RANGES.length} />
        <AnimatePresence>
          <KeyboardShortcuts open={showShortcuts} onClose={() => setShowShortcuts(false)} />
        </AnimatePresence>
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

        {/* End-of-page Journey Summary */}
        {achSystem.mounted && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[51] w-full max-w-sm px-4">
            <JourneySummary visible={showJourneySummary} getLiveStats={achSystem.getLiveStats} unlockedCount={achSystem.unlockedCount} onShare={handleShareJourney} onRestart={handleRestart} />
          </div>
        )}
      </div>
    </>
  );
}
