"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════ */

const TOTAL_HEIGHT = 10000;
const CHAPTER_HEIGHT = TOTAL_HEIGHT / 8;
const CHAPTERS_COUNT = 8;

const CHAPTER_NAMES = [
  "O Portal",
  "O Inicio",
  "A Oficina",
  "Vila dos Sabores",
  "Hospital da Saude",
  "Laboratorio",
  "A Torre",
  "O Topo",
];

const CHAPTER_COLORS = [
  "#818cf8",
  "#fb923c",
  "#f59e0b",
  "#d97706",
  "#14b8a6",
  "#06b6d4",
  "#f59e0b",
  "#fbbf24",
];

/* ── Restaurant data ── */
const RESTAURANTS = [
  { name: "Cacarola", emoji: "\u{1F372}", type: "Restaurante", desc: "Cozinha tradicional portuguesa" },
  { name: "Cacarola Dois", emoji: "\u{1F990}", type: "Marisqueira", desc: "Marisco fresco da costa" },
  { name: "Bijou", emoji: "\u{1F37D}\uFE0F", type: "Restaurante", desc: "Gastronomia refinada" },
  { name: "MeioCheio", emoji: "\u{1F377}", type: "Wine Bar", desc: "Vinhos e petiscos" },
  { name: "Tasca-ca Dentro", emoji: "\u{1F377}", type: "Tasca", desc: "Sabores autenticos" },
  { name: "Cafe Praca 18", emoji: "\u2615", type: "Cafe", desc: "O coracao da praca" },
  { name: "Casa dos Papagaios", emoji: "\u{1F99C}", type: "Restaurante", desc: "Tradicao e sabor" },
  { name: "Cataventos", emoji: "\u{1F30A}", type: "Restaurante", desc: "Brisa do mar na mesa" },
  { name: "Maregrafo", emoji: "\u{1F41F}", type: "Marisqueira", desc: "Peixe fresco do dia" },
  { name: "Marisqueira Rosa Amelia", emoji: "\u{1F99E}", type: "Marisqueira", desc: "Marisco premium" },
  { name: "Mesa dos Amigos", emoji: "\u{1F91D}", type: "Restaurante", desc: "Partilha e convivio" },
  { name: "Nalu Cabedelo", emoji: "\u{1F3C4}", type: "Beach Bar", desc: "Surf e gastronomia" },
  { name: "O Picadeiro", emoji: "\u{1F969}", type: "Churrasqueira", desc: "Carnes na brasa" },
  { name: "Pe na Areia", emoji: "\u{1F463}", type: "Beach Bar", desc: "Pes na areia, alma no mar" },
  { name: "Pe no Bairro", emoji: "\u{1F3D8}\uFE0F", type: "Restaurante", desc: "Raizes do bairro" },
  { name: "Quinta da Salmanha", emoji: "\u{1F3E1}", type: "Restaurante", desc: "Sabores da quinta" },
  { name: "Sand Murtinheira", emoji: "\u{1F305}", type: "Beach Bar", desc: "Por do sol perfeito" },
  { name: "Tasca da Praia", emoji: "\u2693", type: "Tasca", desc: "Mar na mesa" },
];

/* ── Clinic data ── */
const CLINICS = [
  { name: "DentalKid", emoji: "\u{1F9D2}", desc: "Odontopediatria especializada" },
  { name: "DentalKid V2", emoji: "\u{1F9B7}", desc: "Segunda versao modernizada" },
  { name: "Clinica Vasco da Gama", emoji: "\u{1F451}", desc: "Excelencia em saude oral" },
  { name: "Clinica Tamargueira", emoji: "\u{1F52C}", desc: "Tecnologia de ponta" },
  { name: "Clinica Dentaria Quiaios", emoji: "\u{1F3E5}", desc: "Cuidado personalizado" },
  { name: "Alba Saude Dentaria", emoji: "\u{1F9B7}", desc: "Sorrisos saudaveis" },
  { name: "FozClinica", emoji: "\u{1F3E8}", desc: "Saude na Foz do Mondego" },
  { name: "Premium Clinica", emoji: "\u{1F33F}", desc: "Servico premium" },
  { name: "UpConcept", emoji: "\u26A1", desc: "Conceito inovador" },
];

/* ── Tools data ── */
const TOOLS = [
  { name: "Fractal Explorer", emoji: "\u{1F300}", desc: "Zoom infinito no Mandelbrot", color: "#06b6d4" },
  { name: "Particle Sim", emoji: "\u269B\uFE0F", desc: "N-body physics com Verlet integration", color: "#ec4899" },
  { name: "Generative Art", emoji: "\u{1F3A8}", desc: "8 algoritmos, Perlin noise, auto-galeria", color: "#22c55e" },
  { name: "Synth", emoji: "\u{1F3B9}", desc: "ADSR, filter, reverb, oscilloscope", color: "#a855f7" },
  { name: "Chess", emoji: "\u265F\uFE0F", desc: "Castling, en passant, promocao, full rules", color: "#f59e0b" },
  { name: "Periodic Table", emoji: "\u2697\uFE0F", desc: "118 elementos, temperature slider", color: "#ef4444" },
];

/* ── Skills data ── */
const SKILLS_FRONTEND = [
  { name: "React", emoji: "\u269B\uFE0F", pct: 95 },
  { name: "TypeScript", emoji: "\u{1F4D8}", pct: 90 },
  { name: "Next.js", emoji: "\u25B2", pct: 92 },
  { name: "Tailwind", emoji: "\u{1F3A8}", pct: 88 },
];
const SKILLS_BACKEND = [
  { name: "Python", emoji: "\u{1F40D}", pct: 85 },
  { name: "Node.js", emoji: "\u{1F7E2}", pct: 80 },
  { name: "PostgreSQL", emoji: "\u{1F418}", pct: 75 },
  { name: "Docker", emoji: "\u{1F433}", pct: 70 },
];
const SKILLS_DESIGN = [
  { name: "Figma", emoji: "\u{1F58C}\uFE0F", pct: 82 },
  { name: "Three.js", emoji: "\u{1F310}", pct: 65 },
  { name: "GSAP", emoji: "\u{1F3AC}", pct: 78 },
  { name: "Framer Motion", emoji: "\u2728", pct: 90 },
];

/* ── Timeline data ── */
const TIMELINE = [
  { year: "2019", text: "Inicio no IST \u2014 Engenharia Informatica", emoji: "\u{1F393}" },
  { year: "2020", text: "Primeiros projetos web \u2014 descoberta do frontend", emoji: "\u{1F4BB}" },
  { year: "2021", text: "Fraqtory \u2014 6 meses a construir produto real", emoji: "\u{1F3ED}" },
  { year: "2022", text: "MSc concluido \u2014 tese sobre IA", emoji: "\u{1F4DA}" },
  { year: "2023", text: "Consultoria freelance \u2014 primeiros clientes", emoji: "\u{1F91D}" },
  { year: "2024", text: "Descomplicai nasce \u2014 IA para todos", emoji: "\u{1F680}" },
  { year: "2025", text: "Building in public \u2014 109 paginas, 55+ projetos", emoji: "\u{1F30D}" },
  { year: "2026", text: "O futuro esta a ser escrito...", emoji: "\u2728" },
];

/* ── All tool names for ticker ── */
const ALL_TOOL_NAMES = [
  "Fractal Explorer", "Particle Sim", "Generative Art", "Synth", "Chess",
  "Periodic Table", "Calculator", "Drawing Canvas", "Drum Machine", "Emoji Mixer",
  "Flashcards", "Gradient Maker", "Guitar Tuner", "Habit Tracker", "JSON Formatter",
  "Markdown Editor", "Maze Solver", "Memory Game", "Mood Journal", "Morse Code",
  "Music Box", "Music Theory", "Music Visualizer", "Password Generator",
  "Photo Filters", "Pixel Art", "Pomodoro", "Quiz Portugal", "Recipe Finder",
  "Regex Tester", "Snake Game", "Solar System", "Sorting Visualizer",
  "Text Analyzer", "Todo Kanban", "Typing Speed", "Unit Converter", "World Clock",
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useReducedMotion() {
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

function useWindowSize() {
  const [size, setSize] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/* ── Animated counter ── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  inView,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STARS BACKGROUND
   ═══════════════════════════════════════════════════════════════ */

function StarsBackground({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const stars = useMemo(() => {
    const arr: { x: number; y: number; size: number; delay: number; dur: number }[] = [];
    for (let i = 0; i < 150; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        dur: Math.random() * 3 + 2,
      });
    }
    return arr;
  }, []);

  const starsY = useTransform(scrollProgress, [0, 1], [0, -500]);
  const opacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.25, 0.65, 0.75, 1],
    [1, 1, 0.1, 0.1, 0.8, 1]
  );

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        y: reducedMotion ? 0 : starsY,
        opacity,
      }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: "#fff",
            animation: reducedMotion
              ? "none"
              : `twinkle ${s.dur}s ${s.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRESS BAR (top)
   ═══════════════════════════════════════════════════════════════ */

function ProgressBar({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const width = useSpring(useTransform(scrollProgress, [0, 1], [0, 100]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "rgba(255,255,255,0.08)",
        zIndex: 100,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          width: useTransform(width, (v) => `${v}%`),
          background: "linear-gradient(90deg, #3b82f6 0%, #22c55e 33%, #f59e0b 66%, #fbbf24 100%)",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION DOTS (right side)
   ═══════════════════════════════════════════════════════════════ */

function NavigationDots({
  activeChapter,
  isMobile,
}: {
  activeChapter: number;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = useCallback((index: number) => {
    const target = index * CHAPTER_HEIGHT;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: isMobile ? 8 : 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 10 : 16,
        alignItems: "flex-end",
      }}
    >
      {CHAPTER_NAMES.map((name, i) => {
        const isActive = activeChapter === i;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => scrollTo(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Label on hover */}
            <AnimatePresence>
              {hovered === i && !isMobile && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 12,
                    color: isActive ? CHAPTER_COLORS[i] : "#9ca3af",
                    whiteSpace: "nowrap",
                    textShadow: isActive
                      ? `0 0 10px ${CHAPTER_COLORS[i]}40`
                      : "none",
                  }}
                >
                  {name}
                </motion.span>
              )}
            </AnimatePresence>
            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? (isMobile ? 8 : 12) : (isMobile ? 4 : 6),
                height: isActive ? (isMobile ? 8 : 12) : (isMobile ? 4 : 6),
                backgroundColor: isActive ? CHAPTER_COLORS[i] : "#4b5563",
                boxShadow: isActive
                  ? `0 0 12px ${CHAPTER_COLORS[i]}, 0 0 24px ${CHAPTER_COLORS[i]}60`
                  : "none",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ borderRadius: "50%", flexShrink: 0 }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PIXEL CHARACTER
   ═══════════════════════════════════════════════════════════════ */

function PixelCharacter({
  scrollProgress,
  activeChapter,
  velocity,
  reducedMotion,
  isMobile,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  activeChapter: number;
  velocity: number;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const scale = isMobile ? 0.6 : 1;
  const isWalking = Math.abs(velocity) > 50;
  const facingRight = velocity >= 0;

  /* X position: walk across screen within each chapter */
  const chapterProgress = useTransform(scrollProgress, (v) => {
    const chapterLocal = (v * CHAPTERS_COUNT) % 1;
    return chapterLocal;
  });

  const xPos = useTransform(chapterProgress, [0, 1], [10, 85]);
  const xSpring = useSpring(xPos, { stiffness: 60, damping: 20 });

  /* In chapter 6 (Tower), character climbs — Y offset */
  const yOffset = useTransform(scrollProgress, (v) => {
    const ch6Start = 6 / 8;
    const ch6End = 7 / 8;
    if (v >= ch6Start && v < ch6End) {
      const local = (v - ch6Start) / (ch6End - ch6Start);
      return -local * 150;
    }
    return 0;
  });

  /* Body color changes per chapter */
  const bodyColor = useMemo(() => {
    if (activeChapter === 4) return "#e0f2fe"; // lab coat white
    if (activeChapter === 5) return "#06b6d4"; // neon cyan
    return "#3b82f6"; // default blue
  }, [activeChapter]);

  /* Cape in final chapter */
  const showCape = activeChapter === 7;

  /* Visibility — not shown in chapter 0 */
  const visible = activeChapter >= 1;

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: "30%",
        left: useTransform(xSpring, (v) => `${v}%`),
        y: yOffset,
        zIndex: 50,
        transform: `scale(${scale}) scaleX(${facingRight ? 1 : -1})`,
        transformOrigin: "bottom center",
        willChange: "transform",
      }}
    >
      <div style={{ position: "relative", width: 24, height: 44 }}>
        {/* Hair */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 6,
            width: 12,
            height: 6,
            backgroundColor: "#1c1917",
            borderRadius: "4px 4px 0 0",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 6,
            width: 12,
            height: 12,
            backgroundColor: "#fbbf24",
            borderRadius: 4,
          }}
        />
        {/* Eyes */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 11,
            width: 2,
            height: 2,
            backgroundColor: "#1c1917",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 15,
            width: 2,
            height: 2,
            backgroundColor: "#1c1917",
            borderRadius: "50%",
          }}
        />
        {/* Body */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 7,
            width: 10,
            height: 14,
            backgroundColor: bodyColor,
            borderRadius: "2px 2px 0 0",
            transition: "background-color 0.5s",
          }}
        />
        {/* Cape (finale) */}
        {showCape && (
          <div
            style={{
              position: "absolute",
              top: 16,
              left: -4,
              width: 8,
              height: 18,
              backgroundColor: "#fbbf24",
              borderRadius: "0 0 4px 4px",
              transformOrigin: "top right",
              animation: reducedMotion ? "none" : "capeWave 2s ease-in-out infinite",
            }}
          />
        )}
        {/* Left Leg */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 8,
            width: 4,
            height: 8,
            backgroundColor: "#1c1917",
            borderRadius: "0 0 2px 2px",
            transformOrigin: "top center",
            animation:
              isWalking && !reducedMotion
                ? "walkLeft 0.4s steps(2) infinite"
                : reducedMotion
                ? "none"
                : "idleBounce 2s ease-in-out infinite",
          }}
        />
        {/* Right Leg */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 12,
            width: 4,
            height: 8,
            backgroundColor: "#292524",
            borderRadius: "0 0 2px 2px",
            transformOrigin: "top center",
            animation:
              isWalking && !reducedMotion
                ? "walkRight 0.4s steps(2) infinite"
                : reducedMotion
                ? "none"
                : "idleBounce 2s ease-in-out infinite 0.5s",
          }}
        />
        {/* Left Arm */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 2,
            width: 4,
            height: 10,
            backgroundColor: bodyColor,
            borderRadius: 2,
            transformOrigin: "top center",
            animation:
              isWalking && !reducedMotion
                ? "armSwingLeft 0.4s steps(2) infinite"
                : "none",
            transition: "background-color 0.5s",
          }}
        />
        {/* Right Arm */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            width: 4,
            height: 10,
            backgroundColor: bodyColor,
            borderRadius: 2,
            transformOrigin: "top center",
            animation:
              isWalking && !reducedMotion
                ? "armSwingRight 0.4s steps(2) infinite"
                : "none",
            transition: "background-color 0.5s",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHOOTING STAR (Chapter 0)
   ═══════════════════════════════════════════════════════════════ */

function ShootingStar({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        left: "70%",
        width: 80,
        height: 2,
        background: "linear-gradient(90deg, transparent, #fff, transparent)",
        borderRadius: 1,
        animation: "shootingStar 8s linear infinite",
        opacity: 0.8,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLASSMORPHISM CARD
   ═══════════════════════════════════════════════════════════════ */

function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "24px 28px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 0: O PORTAL
   ═══════════════════════════════════════════════════════════════ */

function Chapter0({
  progress,
  reducedMotion,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
}) {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [orbsVisible, setOrbsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setTitleVisible(v > 0.05 && v < 0.85);
    setSubtitleVisible(v > 0.2 && v < 0.85);
    setOrbsVisible(v > 0.4 && v < 0.85);
    setCtaVisible(v > 0.6 && v < 0.8);
  });

  const fadeOut = useTransform(progress, [0.8, 1], [1, 0]);

  /* Nebula layer parallax */
  const nebulaY = useTransform(progress, [0, 1], [0, -60]);

  /* Planet parallax */
  const planetY = useTransform(progress, [0, 1], [0, -120]);

  const titleText = "DESCOMPLICAI";

  return (
    <motion.div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* Nebula clouds */}
      <motion.div style={{ position: "absolute", inset: 0, y: reducedMotion ? 0 : nebulaY }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 500,
            height: 500,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "15%",
            width: 400,
            height: 400,
            background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "40%",
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Planet */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "10%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #818cf8, #4c1d95)",
          boxShadow: "0 0 80px rgba(129,140,248,0.3), inset -20px -20px 40px rgba(0,0,0,0.3)",
          y: reducedMotion ? 0 : planetY,
        }}
      />

      {/* Shooting star */}
      <ShootingStar reducedMotion={reducedMotion} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 20px",
        }}
      >
        {/* Title letter by letter */}
        <AnimatePresence>
          {titleVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                gap: 4,
                marginBottom: 24,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {titleText.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.08,
                    type: "spring",
                    stiffness: 200,
                  }}
                  style={{
                    fontFamily: "var(--font-sora), sans-serif",
                    fontSize: "clamp(2rem, 6vw, 5rem)",
                    fontWeight: 800,
                    color: "#fff",
                    textShadow: "0 0 40px rgba(129,140,248,0.6), 0 0 80px rgba(129,140,248,0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence>
          {subtitleVisible && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
                color: "#c7d2fe",
                textAlign: "center",
                maxWidth: 600,
                marginBottom: 48,
                lineHeight: 1.6,
              }}
            >
              Uma jornada pelo universo da inteligencia artificial
            </motion.p>
          )}
        </AnimatePresence>

        {/* Floating orbs */}
        <AnimatePresence>
          {orbsVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                gap: "clamp(20px, 4vw, 48px)",
                marginBottom: 48,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                { emoji: "\u{1F9E0}", label: "Inteligencia", color: "#3b82f6" },
                { emoji: "\u2764\uFE0F", label: "Humanidade", color: "#ef4444" },
                { emoji: "\u26A1", label: "Simplicidade", color: "#fbbf24" },
              ].map((orb, i) => (
                <motion.div
                  key={orb.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      background: `radial-gradient(circle, ${orb.color}30, transparent)`,
                      border: `2px solid ${orb.color}50`,
                      boxShadow: `0 0 30px ${orb.color}30`,
                      animation: reducedMotion
                        ? "none"
                        : `float ${3 + i * 0.5}s ease-in-out infinite`,
                    }}
                  >
                    {orb.emoji}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 14,
                      color: orb.color,
                      fontWeight: 600,
                    }}
                  >
                    {orb.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {ctaVisible && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 16,
                color: "#818cf8",
                animation: reducedMotion ? "none" : "bounce 2s ease-in-out infinite",
              }}
            >
              Desce para comecar a aventura
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 1: O INICIO — Who is Jaime
   ═══════════════════════════════════════════════════════════════ */

function Chapter1({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowIntro(v > 0.05);
    setShowCards(v > 0.35);
    setShowStats(v > 0.6);
  });

  const mountainsY = useTransform(progress, [0, 1], [0, -90]);
  const hillsY = useTransform(progress, [0, 1], [0, -180]);
  const sunY = useTransform(progress, [0, 1], [100, -60]);
  const sunScale = useTransform(progress, [0, 0.5, 1], [0.6, 1, 1.1]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #c2410c 70%, #fb923c 100%)",
      }}
    >
      {/* Sun */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "40%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fbbf24, #f59e0b, #ea580c)",
          boxShadow: "0 0 100px #fbbf24, 0 0 200px #f59e0b80",
          transform: "translateX(-50%)",
          y: reducedMotion ? 0 : sunY,
          scale: reducedMotion ? 1 : sunScale,
        }}
      />

      {/* Mountains (layer 1) */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : mountainsY,
        }}
      >
        <svg viewBox="0 0 1200 300" fill="none" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0 300 L200 80 L400 220 L600 50 L800 180 L1000 100 L1200 250 L1200 300 Z" fill="#1e1b4b" />
          <path d="M0 300 L150 150 L350 250 L550 120 L750 230 L950 160 L1200 280 L1200 300 Z" fill="#312e81" opacity="0.7" />
          <path d="M0 300 L100 200 L300 270 L500 170 L700 260 L900 200 L1100 260 L1200 300 Z" fill="#3730a3" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Hills with trees (layer 2) */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : hillsY,
        }}
      >
        <svg viewBox="0 0 1200 200" fill="none" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0 200 L0 120 Q300 60 600 110 Q900 160 1200 90 L1200 200 Z" fill="#166534" />
          {/* Trees */}
          {[100, 250, 380, 530, 680, 820, 950, 1080].map((x, i) => (
            <React.Fragment key={i}>
              <rect x={x - 3} y={70 + (i % 3) * 15} width={6} height={25} fill="#14532d" />
              <polygon
                points={`${x},${45 + (i % 3) * 15} ${x - 15},${80 + (i % 3) * 15} ${x + 15},${80 + (i % 3) * 15}`}
                fill="#15803d"
              />
              <polygon
                points={`${x},${35 + (i % 3) * 15} ${x - 12},${60 + (i % 3) * 15} ${x + 12},${60 + (i % 3) * 15}`}
                fill="#16a34a"
              />
            </React.Fragment>
          ))}
        </svg>
      </motion.div>

      {/* Grass ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10%",
          background: "linear-gradient(180deg, #166534, #14532d)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 20px",
        }}
      >
        {/* Intro texts */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                marginBottom: 40,
                maxWidth: 600,
              }}
            >
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 16,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                Ola, sou o Jaime.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  color: "#fed7aa",
                  lineHeight: 1.6,
                  marginBottom: 8,
                }}
              >
                24 anos. De Fuzeta, Algarve. A viver na Figueira da Foz.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  color: "#fdba74",
                  lineHeight: 1.6,
                }}
              >
                Engenheiro pelo IST. Builder por vocacao.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Value cards */}
        <AnimatePresence>
          {showCards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                gap: isMobile ? 12 : 20,
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: 40,
                maxWidth: 800,
              }}
            >
              {[
                { emoji: "\u{1F91D}", title: "Humanos Primeiro", desc: "A tecnologia serve pessoas, nao o contrario" },
                { emoji: "\u{1F30A}", title: "Vida Autentica", desc: "Surf, natureza, comunidade" },
                { emoji: "\u2764\uFE0F", title: "Amor no Codigo", desc: "Cada linha escrita com proposito" },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                >
                  <GlassCard
                    style={{
                      width: isMobile ? "100%" : 220,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{card.emoji}</div>
                    <h3
                      style={{
                        fontFamily: "var(--font-sora), sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 6,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 13,
                        color: "#d4d4d8",
                        lineHeight: 1.4,
                      }}
                    >
                      {card.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                gap: isMobile ? 16 : 40,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                { value: 109, label: "paginas online" },
                { value: 55, label: "+ projetos ativos" },
                { value: 52000, label: "linhas de codigo" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: 12,
                    padding: "16px 24px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sora), sans-serif",
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      fontWeight: 800,
                      color: "#fbbf24",
                    }}
                  >
                    <AnimatedCounter target={stat.value} inView={showStats} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 12,
                      color: "#fdba74",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 2: A OFICINA — Skills & Arsenal
   ═══════════════════════════════════════════════════════════════ */

function SkillBar({
  name,
  emoji,
  pct,
  delay,
  inView,
  reducedMotion,
}: {
  name: string;
  emoji: string;
  pct: number;
  delay: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reducedMotion ? 0 : delay, duration: 0.5 }}
      style={{ marginBottom: 14 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 14,
            color: "#fef3c7",
            fontWeight: 600,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 12,
            color: "#d97706",
            marginLeft: "auto",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{
            delay: reducedMotion ? 0 : delay + 0.2,
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
            borderRadius: 3,
          }}
        />
      </div>
    </motion.div>
  );
}

function Chapter2({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowContent(v > 0.1);
  });

  const shelvesY = useTransform(progress, [0, 1], [0, -60]);
  const lightY = useTransform(progress, [0, 1], [0, -30]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #78350f 0%, #92400e 50%, #451a03 100%)",
      }}
    >
      {/* Workshop wall shelves */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reducedMotion ? 0 : shelvesY,
        }}
      >
        {[20, 40, 60, 80].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              top: `${top}%`,
              left: "5%",
              right: "5%",
              height: 3,
              background: "rgba(180,140,80,0.3)",
              borderRadius: 1,
            }}
          />
        ))}
        {/* Tool racks */}
        {[
          { l: "8%", t: "15%", c: "#3b82f6" },
          { l: "18%", t: "12%", c: "#22c55e" },
          { l: "75%", t: "18%", c: "#ef4444" },
          { l: "85%", t: "10%", c: "#a855f7" },
          { l: "30%", t: "14%", c: "#f59e0b" },
          { l: "65%", t: "16%", c: "#06b6d4" },
        ].map((t, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: t.l,
              top: t.t,
              width: 16,
              height: 40,
              background: t.c,
              borderRadius: 3,
              opacity: 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Workbench */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "18%",
          background: "linear-gradient(180deg, #92400e, #78350f)",
          borderTop: "4px solid #a16207",
        }}
      />

      {/* Hanging light */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          y: reducedMotion ? 0 : lightY,
        }}
      >
        <div
          style={{
            width: 2,
            height: 60,
            background: "#a16207",
            margin: "0 auto",
          }}
        />
        <div
          style={{
            width: 30,
            height: 20,
            background: "#fbbf24",
            borderRadius: "0 0 15px 15px",
            margin: "0 auto",
            boxShadow: "0 20px 80px 40px rgba(251,191,36,0.2)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "40px 20px",
        }}
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: "100%", maxWidth: 900 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#fef3c7",
                  textAlign: "center",
                  marginBottom: 40,
                  textShadow: "0 2px 20px rgba(245,158,11,0.4)",
                }}
              >
                {"\u2692\uFE0F"} A Oficina
              </motion.h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? 20 : 30,
                }}
              >
                {/* Frontend shelf */}
                <GlassCard style={{ background: "rgba(0,0,0,0.25)" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sora), sans-serif",
                      fontSize: 16,
                      color: "#3b82f6",
                      fontWeight: 700,
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    Frontend
                  </h3>
                  {SKILLS_FRONTEND.map((s, i) => (
                    <SkillBar
                      key={s.name}
                      {...s}
                      delay={i * 0.1}
                      inView={showContent}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </GlassCard>

                {/* Backend shelf */}
                <GlassCard style={{ background: "rgba(0,0,0,0.25)" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sora), sans-serif",
                      fontSize: 16,
                      color: "#22c55e",
                      fontWeight: 700,
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    Backend
                  </h3>
                  {SKILLS_BACKEND.map((s, i) => (
                    <SkillBar
                      key={s.name}
                      {...s}
                      delay={i * 0.1 + 0.3}
                      inView={showContent}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </GlassCard>

                {/* Design shelf */}
                <GlassCard style={{ background: "rgba(0,0,0,0.25)" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-sora), sans-serif",
                      fontSize: 16,
                      color: "#a855f7",
                      fontWeight: 700,
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    Design & Motion
                  </h3>
                  {SKILLS_DESIGN.map((s, i) => (
                    <SkillBar
                      key={s.name}
                      {...s}
                      delay={i * 0.1 + 0.6}
                      inView={showContent}
                      reducedMotion={reducedMotion}
                    />
                  ))}
                </GlassCard>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#fbbf24",
                  textAlign: "center",
                  marginTop: 30,
                  textShadow: "0 0 20px rgba(251,191,36,0.4)",
                }}
              >
                12 tecnologias dominadas
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 3: VILA DOS SABORES — Restaurants
   ═══════════════════════════════════════════════════════════════ */

function RestaurantCard({
  restaurant,
  index,
  inView,
  reducedMotion,
  isMobile,
}: {
  restaurant: (typeof RESTAURANTS)[number];
  index: number;
  inView: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const fromLeft = index % 2 === 0;
  const gradients = [
    "linear-gradient(135deg, #dc2626, #ea580c)",
    "linear-gradient(135deg, #d97706, #f59e0b)",
    "linear-gradient(135deg, #16a34a, #22c55e)",
    "linear-gradient(135deg, #2563eb, #3b82f6)",
    "linear-gradient(135deg, #9333ea, #a855f7)",
    "linear-gradient(135deg, #0891b2, #06b6d4)",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: reducedMotion ? 0 : index * 0.06,
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      }}
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          height: 4,
          background: gradients[index % gradients.length],
        }}
      />
      <div style={{ padding: isMobile ? "12px 14px" : "14px 18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 22 }}>{restaurant.emoji}</span>
          <div>
            <h4
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                fontSize: isMobile ? 13 : 15,
                fontWeight: 700,
                color: "#fef3c7",
                margin: 0,
              }}
            >
              {restaurant.name}
            </h4>
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 11,
                color: "#d97706",
              }}
            >
              {restaurant.type}
            </span>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: 12,
            color: "#a8a29e",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {restaurant.desc}
        </p>
      </div>
    </motion.div>
  );
}

function Chapter3({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showCards, setShowCards] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowCards(v > 0.05);
  });

  const villageY = useTransform(progress, [0, 1], [0, -40]);
  const buildingsY = useTransform(progress, [0, 1], [0, -100]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #92400e 0%, #78350f 30%, #9a3412 60%, #7c2d12 100%)",
      }}
    >
      {/* Distant village silhouette */}
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : villageY,
        }}
      >
        <svg viewBox="0 0 1200 150" fill="none" style={{ width: "100%", opacity: 0.3 }} preserveAspectRatio="none">
          {/* Church tower */}
          <rect x="500" y="20" width="30" height="100" fill="#451a03" />
          <polygon points="500,20 515,0 530,20" fill="#451a03" />
          {/* Rooftops */}
          <polygon points="200,100 230,60 260,100" fill="#451a03" />
          <rect x="205" y="100" width="50" height="50" fill="#451a03" />
          <polygon points="350,90 380,50 410,90" fill="#451a03" />
          <rect x="355" y="90" width="50" height="60" fill="#451a03" />
          <polygon points="650,85 690,40 730,85" fill="#451a03" />
          <rect x="655" y="85" width="70" height="65" fill="#451a03" />
          <polygon points="850,95 880,55 910,95" fill="#451a03" />
          <rect x="855" y="95" width="50" height="55" fill="#451a03" />
        </svg>
      </motion.div>

      {/* Building facades */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : buildingsY,
        }}
      >
        <svg viewBox="0 0 1200 200" fill="none" style={{ width: "100%", opacity: 0.2 }} preserveAspectRatio="none">
          <rect x="50" y="40" width="120" height="160" rx="4" fill="#fef3c7" />
          <rect x="200" y="60" width="100" height="140" rx="4" fill="#fed7aa" />
          <rect x="350" y="30" width="130" height="170" rx="4" fill="#fef3c7" />
          <rect x="550" y="50" width="110" height="150" rx="4" fill="#fde68a" />
          <rect x="700" y="35" width="140" height="165" rx="4" fill="#fed7aa" />
          <rect x="900" y="55" width="100" height="145" rx="4" fill="#fef3c7" />
          <rect x="1050" y="40" width="120" height="160" rx="4" fill="#fde68a" />
          {/* Windows */}
          {[80, 110, 230, 260, 390, 420, 450, 585, 615, 740, 770, 800, 935, 965, 1085, 1115].map((x, i) => (
            <rect key={i} x={x} y={70 + (i % 3) * 30} width={15} height={18} rx={2} fill="#92400e" opacity={0.5} />
          ))}
          {/* Awnings */}
          {[70, 380, 720, 1070].map((x, i) => (
            <polygon key={i} points={`${x},68 ${x + 50},68 ${x + 55},80 ${x - 5},80`} fill="#dc2626" opacity={0.4} />
          ))}
        </svg>
      </motion.div>

      {/* Hanging flower pots */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-around",
          padding: "0 5%",
        }}
      >
        {["#ef4444", "#ec4899", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"].map((color, i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: 0.5,
              animation: reducedMotion ? "none" : `float ${3 + i * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "40px 20px",
          overflowY: "visible",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={showCards ? { opacity: 1 } : {}}
          style={{ width: "100%", maxWidth: 800 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#fef3c7",
              textAlign: "center",
              marginBottom: 8,
              textShadow: "0 2px 20px rgba(217,119,6,0.4)",
            }}
          >
            Vila dos Sabores
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontWeight: 600,
              color: "#fbbf24",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <AnimatedCounter target={18} inView={showCards} /> restaurantes criados numa noite
          </p>

          {/* Bunting / banners */}
          <div
            style={{
              height: 20,
              marginBottom: 20,
              display: "flex",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: `10px solid ${["#ef4444", "#fbbf24", "#22c55e", "#3b82f6"][i % 4]}`,
                  animation: reducedMotion
                    ? "none"
                    : `buntingWave 2s ${i * 0.1}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Restaurant cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 8 : 12,
            }}
          >
            {RESTAURANTS.map((r, i) => (
              <RestaurantCard
                key={r.name}
                restaurant={r}
                index={i}
                inView={showCards}
                reducedMotion={reducedMotion}
                isMobile={isMobile}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 4: HOSPITAL DA SAUDE — Clinics
   ═══════════════════════════════════════════════════════════════ */

function Chapter4({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowContent(v > 0.08);
  });

  const skylineY = useTransform(progress, [0, 1], [0, -50]);
  const treeY = useTransform(progress, [0, 1], [0, -90]);
  const buildingY = useTransform(progress, [0, 1], [0, -60]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0c4a6e 0%, #164e63 50%, #134e4a 100%)",
      }}
    >
      {/* City skyline */}
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : skylineY,
        }}
      >
        <svg viewBox="0 0 1200 200" fill="none" style={{ width: "100%", opacity: 0.15 }} preserveAspectRatio="none">
          <rect x="50" y="60" width="60" height="140" fill="#fff" />
          <rect x="130" y="30" width="40" height="170" fill="#fff" />
          <rect x="200" y="80" width="80" height="120" fill="#fff" />
          <rect x="320" y="50" width="50" height="150" fill="#fff" />
          <rect x="400" y="70" width="70" height="130" fill="#fff" />
          <rect x="520" y="40" width="90" height="160" fill="#fff" />
          <rect x="650" y="60" width="55" height="140" fill="#fff" />
          <rect x="750" y="80" width="100" height="120" fill="#fff" />
          <rect x="900" y="45" width="60" height="155" fill="#fff" />
          <rect x="1000" y="70" width="80" height="130" fill="#fff" />
          <rect x="1100" y="55" width="70" height="145" fill="#fff" />
        </svg>
      </motion.div>

      {/* Tree row */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : treeY,
        }}
      >
        <svg viewBox="0 0 1200 100" fill="none" style={{ width: "100%", opacity: 0.25 }} preserveAspectRatio="none">
          {[80, 200, 320, 450, 580, 720, 850, 980, 1100].map((x, i) => (
            <React.Fragment key={i}>
              <circle cx={x} cy={50} r={30 + (i % 3) * 5} fill="#16a34a" />
              <rect x={x - 4} y={70} width={8} height={30} fill="#14532d" />
            </React.Fragment>
          ))}
        </svg>
      </motion.div>

      {/* Clinic building */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "30%",
          right: "30%",
          y: reducedMotion ? 0 : buildingY,
        }}
      >
        <div
          style={{
            height: 200,
            background: "rgba(255,255,255,0.08)",
            borderRadius: "12px 12px 0 0",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: "#14b8a6",
              fontWeight: 900,
              textShadow: "0 0 20px rgba(20,184,166,0.5)",
            }}
          >
            +
          </div>
          {/* Windows grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              padding: "0 20px",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 20,
                  backgroundColor: "rgba(20,184,166,0.2)",
                  borderRadius: 2,
                  border: "1px solid rgba(20,184,166,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Garden */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "5%",
          background: "linear-gradient(180deg, #166534, #14532d)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "40px 20px",
        }}
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: "100%", maxWidth: 800 }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#fff",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {"\u{1F3E5}"} Saude & Bem-estar
              </h2>

              {/* Heartbeat line */}
              <div
                style={{
                  margin: "16px auto 30px",
                  maxWidth: 600,
                  height: 40,
                  overflow: "hidden",
                }}
              >
                <svg viewBox="0 0 600 40" fill="none" style={{ width: "100%" }}>
                  <path
                    d="M0 20 L100 20 L120 5 L140 35 L160 10 L180 30 L200 20 L300 20 L320 5 L340 35 L360 10 L380 30 L400 20 L500 20 L520 5 L540 35 L560 10 L580 30 L600 20"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    fill="none"
                    style={{
                      strokeDasharray: 1200,
                      animation: reducedMotion
                        ? "none"
                        : "heartbeat 3s linear infinite",
                    }}
                  />
                </svg>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  fontWeight: 600,
                  color: "#14b8a6",
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                <AnimatedCounter target={9} inView={showContent} /> clinicas digitalizadas
              </p>

              {/* Clinic cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 12,
                }}
              >
                {CLINICS.map((clinic, i) => (
                  <motion.div
                    key={clinic.name}
                    initial={{ opacity: 0, y: 40 }}
                    animate={showContent ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: reducedMotion ? 0 : i * 0.08,
                      type: "spring",
                      stiffness: 150,
                    }}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      padding: isMobile ? "12px 14px" : "16px 20px",
                      border: "1px solid rgba(20,184,166,0.15)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{clinic.emoji}</span>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-sora), sans-serif",
                          fontSize: isMobile ? 13 : 15,
                          fontWeight: 700,
                          color: "#ccfbf1",
                          margin: 0,
                        }}
                      >
                        {clinic.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: 12,
                          color: "#5eead4",
                          margin: 0,
                          opacity: 0.7,
                        }}
                      >
                        {clinic.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 5: LABORATORIO — Tools
   ═══════════════════════════════════════════════════════════════ */

function Chapter5({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowContent(v > 0.08);
  });

  const circuitY = useTransform(progress, [0, 1], [0, -30]);
  const codeY = useTransform(progress, [0, 1], [0, -120]);
  const dataY = useTransform(progress, [0, 1], [0, -200]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Circuit board pattern */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reducedMotion ? 0 : circuitY,
          opacity: 0.06,
          backgroundImage: `
            linear-gradient(0deg, #06b6d4 1px, transparent 1px),
            linear-gradient(90deg, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating code snippets */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reducedMotion ? 0 : codeY,
          overflow: "hidden",
        }}
      >
        {[
          { text: "const ai = new Model()", x: "10%", y: "20%", r: -5 },
          { text: "async function build()", x: "65%", y: "15%", r: 3 },
          { text: "return <Component />", x: "30%", y: "70%", r: -2 },
          { text: "export default app", x: "75%", y: "60%", r: 4 },
          { text: "npm run deploy", x: "15%", y: "50%", r: -3 },
          { text: "git push origin main", x: "55%", y: "85%", r: 2 },
        ].map((snippet, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: snippet.x,
              top: snippet.y,
              fontFamily: "monospace",
              fontSize: 12,
              color: "#06b6d4",
              opacity: 0.12,
              transform: `rotate(${snippet.r}deg)`,
              whiteSpace: "nowrap",
            }}
          >
            {snippet.text}
          </div>
        ))}
      </motion.div>

      {/* Data streams (vertical dots) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: reducedMotion ? 0 : dataY,
        }}
      >
        {[15, 35, 55, 75, 90].map((x, col) => (
          <div key={col} style={{ position: "absolute", left: `${x}%`, top: 0, bottom: 0 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${i * 5}%`,
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  backgroundColor: ["#06b6d4", "#ec4899", "#22c55e"][col % 3],
                  opacity: 0.15,
                  animation: reducedMotion
                    ? "none"
                    : `dataStreamUp ${2 + col * 0.3}s ${i * 0.1}s linear infinite`,
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* Scan lines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.02) 2px, rgba(6,182,212,0.02) 4px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "40px 20px",
        }}
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: "100%", maxWidth: 900 }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#06b6d4",
                  textAlign: "center",
                  marginBottom: 30,
                  textShadow: "0 0 30px rgba(6,182,212,0.5)",
                }}
              >
                {"\u2697\uFE0F"} Laboratorio de Ferramentas
              </h2>

              {/* Holographic tool screens */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: 16,
                  marginBottom: 30,
                }}
              >
                {TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={showContent ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: reducedMotion ? 0 : i * 0.1,
                      type: "spring",
                      stiffness: 150,
                    }}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      borderRadius: 12,
                      padding: isMobile ? "16px" : "20px",
                      border: `1px solid ${tool.color}40`,
                      boxShadow: `0 0 20px ${tool.color}15, inset 0 0 20px ${tool.color}08`,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{tool.emoji}</div>
                    <h4
                      style={{
                        fontFamily: "var(--font-sora), sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: tool.color,
                        marginBottom: 6,
                      }}
                    >
                      {tool.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 12,
                        color: "#94a3b8",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {tool.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Scrolling ticker */}
              <div
                style={{
                  overflow: "hidden",
                  marginBottom: 24,
                  padding: "10px 0",
                  borderTop: "1px solid rgba(6,182,212,0.15)",
                  borderBottom: "1px solid rgba(6,182,212,0.15)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    whiteSpace: "nowrap",
                    animation: reducedMotion ? "none" : "ticker 30s linear infinite",
                    width: "fit-content",
                  }}
                >
                  {[...ALL_TOOL_NAMES, ...ALL_TOOL_NAMES].map((name, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#06b6d4",
                        opacity: 0.6,
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Counter */}
              <p
                style={{
                  fontFamily: "var(--font-sora), sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#06b6d4",
                  textAlign: "center",
                  textShadow: "0 0 20px rgba(6,182,212,0.5)",
                }}
              >
                <AnimatedCounter target={35} suffix="+" inView={showContent} /> ferramentas interativas
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 6: A TORRE — Timeline
   ═══════════════════════════════════════════════════════════════ */

function Chapter6({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [visibleMilestones, setVisibleMilestones] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const count = Math.floor(v * (TIMELINE.length + 1));
    setVisibleMilestones(Math.min(count, TIMELINE.length));
  });

  const moonY = useTransform(progress, [0, 1], [0, -80]);
  const towerHeight = useTransform(progress, [0, 1], [30, 100]);

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #1e293b 100%)",
      }}
    >
      {/* Moon */}
      <motion.div
        style={{
          position: "absolute",
          top: "8%",
          right: "15%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #f1f5f9, #94a3b8)",
          boxShadow: "0 0 40px rgba(241,245,249,0.3), 0 0 80px rgba(241,245,249,0.1)",
          y: reducedMotion ? 0 : moonY,
        }}
      />

      {/* Tower silhouette */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "10%",
          width: isMobile ? 60 : 100,
          background: "rgba(156,163,175,0.15)",
          borderRadius: "8px 8px 0 0",
          height: useTransform(towerHeight, (v) => `${v * 0.6}%`),
        }}
      >
        {/* Tower windows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${15 + i * 14}%`,
              left: "50%",
              transform: "translateX(-50%)",
              width: 12,
              height: 16,
              backgroundColor: "rgba(245,158,11,0.2)",
              borderRadius: "6px 6px 0 0",
            }}
          />
        ))}
        {/* Tower battlement */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: -5,
            right: -5,
            height: 10,
            display: "flex",
            gap: 4,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: i % 2 === 0 ? 10 : 5,
                backgroundColor: "rgba(156,163,175,0.15)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          padding: "40px 20px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "#f59e0b",
            textAlign: "center",
            marginBottom: 40,
            textShadow: "0 0 30px rgba(245,158,11,0.4)",
          }}
        >
          {"\u{1F3F0}"} A Torre {"\u2014"} Cronologia
        </h2>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            maxWidth: 600,
            width: "100%",
          }}
        >
          {/* Connecting line */}
          <motion.div
            style={{
              position: "absolute",
              left: isMobile ? 20 : 30,
              top: 0,
              width: 2,
              backgroundColor: "#f59e0b",
              height: `${(visibleMilestones / TIMELINE.length) * 100}%`,
              transition: "height 0.5s ease-out",
              boxShadow: "0 0 10px rgba(245,158,11,0.4)",
            }}
          />

          {/* Milestones */}
          {TIMELINE.map((milestone, i) => {
            const visible = i < visibleMilestones;
            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: 40 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120,
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? 16 : 24,
                  marginBottom: isMobile ? 24 : 36,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: isMobile ? 40 : 60,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    animate={
                      visible
                        ? {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px #f59e0b",
                              "0 0 20px #f59e0b",
                              "0 0 10px #f59e0b",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: visible ? "#f59e0b" : "#4b5563",
                      border: "3px solid #1e3a5f",
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    padding: isMobile ? "12px 14px" : "16px 20px",
                    border: "1px solid rgba(245,158,11,0.15)",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{milestone.emoji}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sora), sans-serif",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#f59e0b",
                      }}
                    >
                      {milestone.year}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: isMobile ? 13 : 15,
                      color: "#d4d4d8",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {milestone.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 7: O TOPO — Finale
   ═══════════════════════════════════════════════════════════════ */

function ConfettiParticle({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  const colors = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#06b6d4"];
  const style = useMemo(() => {
    const x = Math.random() * 100;
    const delay = Math.random() * 2;
    const dur = 2 + Math.random() * 3;
    const size = 4 + Math.random() * 6;
    const rotation = Math.random() * 360;
    return { x, delay, dur, size, rotation };
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${style.x}%`,
        top: "-5%",
        width: style.size,
        height: style.size * 0.6,
        backgroundColor: colors[index % colors.length],
        borderRadius: 1,
        transform: `rotate(${style.rotation}deg)`,
        animation: `confettiFall ${style.dur}s ${style.delay}s ease-in forwards`,
        opacity: 0,
      }}
    />
  );
}

function Chapter7({
  progress,
  reducedMotion,
  isMobile,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const [showQuote, setShowQuote] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    setShowQuote(v > 0.1);
    setShowContact(v > 0.4);
    setShowConfetti(v > 0.9);
  });

  const cloudsY = useTransform(progress, [0, 1], [0, -100]);
  const raysOpacity = useTransform(progress, [0, 0.3, 1], [0, 0.3, 0.6]);

  const quoteText = "Keep building. Share Love.";

  return (
    <div
      style={{
        position: "relative",
        height: CHAPTER_HEIGHT,
        overflow: "hidden",
        background: "linear-gradient(180deg, #1e3a5f 0%, #fbbf24 30%, #fef3c7 60%, #bfdbfe 100%)",
      }}
    >
      {/* Light rays */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "80%",
          height: "80%",
          opacity: raysOpacity,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "150%",
              height: 3,
              background: "linear-gradient(90deg, transparent, #fbbf24, transparent)",
              transform: `rotate(${20 + i * 8}deg)`,
              transformOrigin: "right top",
              opacity: 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Cloud layer (below character — we are above clouds) */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          y: reducedMotion ? 0 : cloudsY,
        }}
      >
        {[
          { x: "5%", w: 200, h: 40, o: 0.6 },
          { x: "25%", w: 300, h: 50, o: 0.5 },
          { x: "55%", w: 250, h: 35, o: 0.7 },
          { x: "75%", w: 180, h: 45, o: 0.4 },
          { x: "40%", w: 280, h: 38, o: 0.55 },
        ].map((cloud, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cloud.x,
              bottom: `${i * 8}%`,
              width: cloud.w,
              height: cloud.h,
              borderRadius: cloud.h,
              background: `rgba(255,255,255,${cloud.o})`,
              filter: "blur(8px)",
            }}
          />
        ))}
      </motion.div>

      {/* Cloud wisps */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: 0,
          right: 0,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${10 + i * 15}%`,
              bottom: `${5 + i * 4}%`,
              width: 120,
              height: 2,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 1,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
          {Array.from({ length: 80 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} reducedMotion={reducedMotion} />
          ))}
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "40px 20px",
        }}
      >
        {/* Quote letter by letter */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 4,
                  marginBottom: 20,
                }}
              >
                {quoteText.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : i * 0.06,
                      type: "spring",
                      stiffness: 200,
                    }}
                    style={{
                      fontFamily: "var(--font-sora), sans-serif",
                      fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                      fontWeight: 800,
                      color: "#1e3a5f",
                      textShadow: "0 2px 10px rgba(251,191,36,0.3)",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                  color: "#1e3a5f",
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                O futuro e humano.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  color: "#475569",
                  maxWidth: 500,
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                A IA e a ferramenta. As pessoas sao o proposito.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact card */}
        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <GlassCard
                style={{
                  maxWidth: 400,
                  width: "100%",
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-sora), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1e3a5f",
                    marginBottom: 20,
                  }}
                >
                  Vamos conversar
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    textAlign: "left",
                  }}
                >
                  {[
                    { emoji: "\u2709\uFE0F", label: "jdsds.pt@gmail.com", href: "mailto:jdsds.pt@gmail.com" },
                    { emoji: "\u{1F419}", label: "DjimieSilva", href: "https://github.com/DjimieSilva" },
                    { emoji: "\u{1F4BC}", label: "jaimesilva", href: "https://linkedin.com/in/jaimesilva" },
                    { emoji: "\u{1F310}", label: "descomplicai.pt", href: "https://descomplicai.pt" },
                  ].map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 14,
                        color: "#1e3a5f",
                        textDecoration: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.15)",
                        transition: "background 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{contact.emoji}</span>
                      <span>{contact.label}</span>
                    </a>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 20,
                    opacity: 0.7,
                  }}
                >
                  Esta experiencia tem ~4000 linhas de codigo
                </p>
              </GlassCard>

              {/* Back to top */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{
                  display: "block",
                  margin: "24px auto 0",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 14,
                  color: "#1e3a5f",
                  background: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 30,
                  padding: "10px 24px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Voltar ao inicio {"\u2191"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */

const GLOBAL_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #030014; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #030014; }
  ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 3px; }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  @keyframes shootingStar {
    0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
    5% { opacity: 0.8; }
    15% { opacity: 0; }
    100% { transform: translateX(-600px) translateY(300px) rotate(-35deg); opacity: 0; }
  }

  @keyframes walkLeft {
    0% { transform: rotate(-15deg); }
    50% { transform: rotate(15deg); }
    100% { transform: rotate(-15deg); }
  }

  @keyframes walkRight {
    0% { transform: rotate(15deg); }
    50% { transform: rotate(-15deg); }
    100% { transform: rotate(15deg); }
  }

  @keyframes armSwingLeft {
    0% { transform: rotate(20deg); }
    50% { transform: rotate(-20deg); }
    100% { transform: rotate(20deg); }
  }

  @keyframes armSwingRight {
    0% { transform: rotate(-20deg); }
    50% { transform: rotate(20deg); }
    100% { transform: rotate(-20deg); }
  }

  @keyframes idleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  @keyframes capeWave {
    0%, 100% { transform: rotate(-5deg) skewX(0deg); }
    25% { transform: rotate(-15deg) skewX(-5deg); }
    75% { transform: rotate(5deg) skewX(5deg); }
  }

  @keyframes heartbeat {
    0% { stroke-dashoffset: 1200; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes dataStreamUp {
    0% { transform: translateY(0); opacity: 0.15; }
    50% { opacity: 0.4; }
    100% { transform: translateY(-200px); opacity: 0; }
  }

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes buntingWave {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(5deg); }
  }

  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function RPGChroniclePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { w: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;

  /* Master scroll tracking */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Velocity for character walking detection */
  const scrollVelocity = useVelocity(scrollYProgress);
  const [velocityValue, setVelocityValue] = useState(0);
  useMotionValueEvent(scrollVelocity, "change", (v) => {
    setVelocityValue(v * 1000);
  });

  /* Active chapter tracking */
  const [activeChapter, setActiveChapter] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const chapter = Math.min(Math.floor(v * CHAPTERS_COUNT), CHAPTERS_COUNT - 1);
    setActiveChapter(chapter);
  });

  /* Per-chapter progress transforms (0-1 within each chapter) */
  const ch0Progress = useTransform(scrollYProgress, [0, 0.125], [0, 1]);
  const ch1Progress = useTransform(scrollYProgress, [0.125, 0.25], [0, 1]);
  const ch2Progress = useTransform(scrollYProgress, [0.25, 0.375], [0, 1]);
  const ch3Progress = useTransform(scrollYProgress, [0.375, 0.5], [0, 1]);
  const ch4Progress = useTransform(scrollYProgress, [0.5, 0.625], [0, 1]);
  const ch5Progress = useTransform(scrollYProgress, [0.625, 0.75], [0, 1]);
  const ch6Progress = useTransform(scrollYProgress, [0.75, 0.875], [0, 1]);
  const ch7Progress = useTransform(scrollYProgress, [0.875, 1], [0, 1]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = Math.min(activeChapter + 1, CHAPTERS_COUNT - 1);
        window.scrollTo({ top: next * CHAPTER_HEIGHT, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = Math.max(activeChapter - 1, 0);
        window.scrollTo({ top: prev * CHAPTER_HEIGHT, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeChapter]);

  return (
    <>
      {/* Inject global styles */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {/* Fixed UI overlays */}
      <ProgressBar scrollProgress={scrollYProgress} />
      <NavigationDots activeChapter={activeChapter} isMobile={isMobile} />
      <StarsBackground scrollProgress={scrollYProgress} reducedMotion={reducedMotion} />
      <PixelCharacter
        scrollProgress={scrollYProgress}
        activeChapter={activeChapter}
        velocity={velocityValue}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Scrollable container — 10000px tall */}
      <div ref={containerRef} style={{ position: "relative", height: TOTAL_HEIGHT }}>
        {/* Chapter 0: O Portal */}
        <Chapter0 progress={ch0Progress} reducedMotion={reducedMotion} />

        {/* Chapter 1: O Inicio */}
        <Chapter1 progress={ch1Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 2: A Oficina */}
        <Chapter2 progress={ch2Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 3: Vila dos Sabores */}
        <Chapter3 progress={ch3Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 4: Hospital da Saude */}
        <Chapter4 progress={ch4Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 5: Laboratorio */}
        <Chapter5 progress={ch5Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 6: A Torre */}
        <Chapter6 progress={ch6Progress} reducedMotion={reducedMotion} isMobile={isMobile} />

        {/* Chapter 7: O Topo */}
        <Chapter7 progress={ch7Progress} reducedMotion={reducedMotion} isMobile={isMobile} />
      </div>
    </>
  );
}
