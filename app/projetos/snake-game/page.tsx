"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameState = "start" | "playing" | "paused" | "over";
type Difficulty = "facil" | "medio" | "dificil";
type Theme = "classic" | "neon" | "ocean";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_SIZE = 20;
const CELL_SIZE = 24;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 480px

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; baseSpeed: number }> = {
  facil: { label: "Fácil", baseSpeed: 200 },
  medio: { label: "Médio", baseSpeed: 130 },
  dificil: { label: "Difícil", baseSpeed: 75 },
};

const THEME_CONFIG: Record<
  Theme,
  {
    label: string;
    bg: string;
    grid: string;
    snakeHead: [string, string];
    snakeBody: [string, string];
    food: string;
    particle: string[];
    accent: string;
    text: string;
    panelBg: string;
    border: string;
  }
> = {
  classic: {
    label: "Verde Clássico",
    bg: "#0d1117",
    grid: "rgba(255,255,255,0.04)",
    snakeHead: ["#4ade80", "#16a34a"],
    snakeBody: ["#22c55e", "#15803d"],
    food: "#ef4444",
    particle: ["#ef4444", "#f97316", "#fbbf24", "#fb923c"],
    accent: "#4ade80",
    text: "#f0fdf4",
    panelBg: "rgba(13,17,23,0.95)",
    border: "rgba(74,222,128,0.3)",
  },
  neon: {
    label: "Neon",
    bg: "#0a0010",
    grid: "rgba(255,0,255,0.05)",
    snakeHead: ["#f0abfc", "#a855f7"],
    snakeBody: ["#c084fc", "#7c3aed"],
    food: "#00ffff",
    particle: ["#00ffff", "#f0abfc", "#facc15", "#ff6fff"],
    accent: "#f0abfc",
    text: "#fdf4ff",
    panelBg: "rgba(10,0,16,0.95)",
    border: "rgba(240,171,252,0.3)",
  },
  ocean: {
    label: "Oceano",
    bg: "#020c1b",
    grid: "rgba(100,200,255,0.05)",
    snakeHead: ["#38bdf8", "#0369a1"],
    snakeBody: ["#0ea5e9", "#075985"],
    food: "#f97316",
    particle: ["#f97316", "#facc15", "#38bdf8", "#fb923c"],
    accent: "#38bdf8",
    text: "#f0f9ff",
    panelBg: "rgba(2,12,27,0.95)",
    border: "rgba(56,189,248,0.3)",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomFood(snake: Point[]): Point {
  let pos: Point;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

function spawnParticles(
  food: Point,
  theme: Theme,
  particleIdRef: React.MutableRefObject<number>
): Particle[] {
  const colors = THEME_CONFIG[theme].particle;
  const cx = food.x * CELL_SIZE + CELL_SIZE / 2;
  const cy = food.y * CELL_SIZE + CELL_SIZE / 2;
  return Array.from({ length: 16 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3;
    return {
      id: particleIdRef.current++,
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 4,
    };
  });
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleIdRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // ── Game State Refs (mutable, don't trigger re-renders) ──
  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point>({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const showGridRef = useRef(true);
  const wrapAroundRef = useRef(false);
  const lastRenderTimeRef = useRef(0);

  // ── React State (for UI re-renders) ──
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("medio");
  const [theme, setTheme] = useState<Theme>("classic");
  const [showGrid, setShowGrid] = useState(true);
  const [wrapAround, setWrapAround] = useState(false);

  // Keep a ref for gameState so canvas loop can read it without stale closure
  const gameStateForLoop = useRef<GameState>("start");
  const difficultyRef = useRef<Difficulty>("medio");
  const themeRef = useRef<Theme>("classic");

  // ── Load high score ──
  useEffect(() => {
    const stored = localStorage.getItem("snake-high-score");
    if (stored) setHighScore(parseInt(stored, 10));
  }, []);

  // ── Sync refs to state ──
  useEffect(() => {
    gameStateForLoop.current = gameState;
  }, [gameState]);

  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    showGridRef.current = showGrid;
  }, [showGrid]);

  useEffect(() => {
    wrapAroundRef.current = wrapAround;
  }, [wrapAround]);

  // ─── Canvas Draw ───────────────────────────────────────────────────────────

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const t = THEME_CONFIG[themeRef.current];
    const snake = snakeRef.current;
    const food = foodRef.current;
    const particles = particlesRef.current;

    // Background
    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid lines
    if (showGridRef.current) {
      ctx.strokeStyle = t.grid;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
      }
    }

    // Particles
    particlesRef.current = particles
      .map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.08,
        life: p.life - 0.035,
      }))
      .filter((p) => p.life > 0);

    for (const p of particlesRef.current) {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Food — glowing circle with pulse
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const pulse = 0.85 + 0.15 * Math.sin(Date.now() / 300);
    ctx.save();
    // Glow
    ctx.shadowColor = t.food;
    ctx.shadowBlur = 12;
    // Food circle
    const foodGrad = ctx.createRadialGradient(
      foodX - 2, foodY - 2, 1,
      foodX, foodY, CELL_SIZE * 0.42 * pulse
    );
    foodGrad.addColorStop(0, "#ffffff");
    foodGrad.addColorStop(0.3, t.food);
    foodGrad.addColorStop(1, t.food + "aa");
    ctx.fillStyle = foodGrad;
    ctx.beginPath();
    ctx.arc(foodX, foodY, CELL_SIZE * 0.38 * pulse, 0, Math.PI * 2);
    ctx.fill();
    // Highlight
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.beginPath();
    ctx.arc(foodX - 2, foodY - 3, CELL_SIZE * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Snake
    snake.forEach((seg, i) => {
      const x = seg.x * CELL_SIZE;
      const y = seg.y * CELL_SIZE;
      const pad = i === 0 ? 1 : 2;
      const radius = i === 0 ? 6 : 4;

      ctx.save();
      if (i === 0) {
        ctx.shadowColor = t.snakeHead[0];
        ctx.shadowBlur = 10;
      }

      // Segment gradient
      const grad = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
      if (i === 0) {
        grad.addColorStop(0, t.snakeHead[0]);
        grad.addColorStop(1, t.snakeHead[1]);
      } else {
        // Fade body color as it gets older
        const fade = Math.max(0.4, 1 - i / (snake.length * 1.5));
        grad.addColorStop(0, t.snakeBody[0]);
        grad.addColorStop(1, t.snakeBody[1]);
        ctx.globalAlpha = 0.6 + 0.4 * fade;
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x + pad, y + pad, CELL_SIZE - pad * 2, CELL_SIZE - pad * 2, radius);
      ctx.fill();

      // Head eyes
      if (i === 0) {
        ctx.shadowBlur = 0;
        const dir = directionRef.current;
        const eyeOffset = 4;
        const eyeRadius = 2.5;
        let eye1: Point, eye2: Point;

        if (dir === "RIGHT") {
          eye1 = { x: x + CELL_SIZE - eyeOffset - 1, y: y + eyeOffset + 1 };
          eye2 = { x: x + CELL_SIZE - eyeOffset - 1, y: y + CELL_SIZE - eyeOffset - 1 };
        } else if (dir === "LEFT") {
          eye1 = { x: x + eyeOffset + 1, y: y + eyeOffset + 1 };
          eye2 = { x: x + eyeOffset + 1, y: y + CELL_SIZE - eyeOffset - 1 };
        } else if (dir === "UP") {
          eye1 = { x: x + eyeOffset + 1, y: y + eyeOffset + 1 };
          eye2 = { x: x + CELL_SIZE - eyeOffset - 1, y: y + eyeOffset + 1 };
        } else {
          eye1 = { x: x + eyeOffset + 1, y: y + CELL_SIZE - eyeOffset - 1 };
          eye2 = { x: x + CELL_SIZE - eyeOffset - 1, y: y + CELL_SIZE - eyeOffset - 1 };
        }

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(eye1.x, eye1.y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2.x, eye2.y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.arc(eye1.x + 0.5, eye1.y + 0.5, eyeRadius * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2.x + 0.5, eye2.y + 0.5, eyeRadius * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, []);

  // ─── Animation Loop (for particles + food pulse) ──────────────────────────

  const startAnimLoop = useCallback(() => {
    const loop = (time: number) => {
      if (time - lastRenderTimeRef.current > 16) {
        drawGame();
        lastRenderTimeRef.current = time;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
  }, [drawGame]);

  const stopAnimLoop = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // ─── Game Tick ────────────────────────────────────────────────────────────

  const gameTick = useCallback(() => {
    if (gameStateForLoop.current !== "playing") return;

    directionRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const head = snake[0];
    const dir = directionRef.current;

    let newHead: Point = { x: head.x, y: head.y };
    if (dir === "UP") newHead.y -= 1;
    if (dir === "DOWN") newHead.y += 1;
    if (dir === "LEFT") newHead.x -= 1;
    if (dir === "RIGHT") newHead.x += 1;

    // Wall handling
    if (wrapAroundRef.current) {
      if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
      if (newHead.x >= GRID_SIZE) newHead.x = 0;
      if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
      if (newHead.y >= GRID_SIZE) newHead.y = 0;
    } else {
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        endGame();
        return;
      }
    }

    // Self collision (skip tail since it moves)
    if (snake.slice(0, -1).some((s) => s.x === newHead.x && s.y === newHead.y)) {
      endGame();
      return;
    }

    const atFood =
      newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
    const newSnake = [newHead, ...snake];
    if (!atFood) newSnake.pop();

    snakeRef.current = newSnake;

    if (atFood) {
      const newScore = scoreRef.current + 1;
      scoreRef.current = newScore;
      setScore(newScore);

      particlesRef.current = [
        ...particlesRef.current,
        ...spawnParticles(foodRef.current, themeRef.current, particleIdRef),
      ];

      foodRef.current = randomFood(newSnake);

      // Speed increase every 5 points
      scheduleNextTick(newScore);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleNextTick = useCallback(
    (currentScore: number) => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
      const base = DIFFICULTY_CONFIG[difficultyRef.current].baseSpeed;
      const speedups = Math.floor(currentScore / 5);
      const interval = Math.max(50, base - speedups * 8);
      gameLoopRef.current = setTimeout(() => {
        gameTick();
        scheduleNextTick(scoreRef.current);
      }, interval);
    },
    [gameTick]
  );

  const endGame = useCallback(() => {
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    const finalScore = scoreRef.current;
    setScore(finalScore);
    setHighScore((prev) => {
      const newHigh = Math.max(prev, finalScore);
      localStorage.setItem("snake-high-score", String(newHigh));
      return newHigh;
    });
    setGameState("over");
    gameStateForLoop.current = "over";
  }, []);

  // ─── Start / Reset ────────────────────────────────────────────────────────

  const initGame = useCallback(() => {
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);

    const initialSnake: Point[] = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    snakeRef.current = initialSnake;
    directionRef.current = "RIGHT";
    nextDirRef.current = "RIGHT";
    scoreRef.current = 0;
    foodRef.current = randomFood(initialSnake);
    particlesRef.current = [];
    setScore(0);
    setGameState("playing");
    gameStateForLoop.current = "playing";

    scheduleNextTick(0);
  }, [scheduleNextTick]);

  // ─── Keyboard Controls ────────────────────────────────────────────────────

  useEffect(() => {
    const OPPOSITE: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    const handleKey = (e: KeyboardEvent) => {
      const dirMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
        W: "UP",
        S: "DOWN",
        A: "LEFT",
        D: "RIGHT",
      };

      if (e.key === " ") {
        e.preventDefault();
        if (gameStateForLoop.current === "playing") {
          if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
          setGameState("paused");
          gameStateForLoop.current = "paused";
        } else if (gameStateForLoop.current === "paused") {
          setGameState("playing");
          gameStateForLoop.current = "playing";
          scheduleNextTick(scoreRef.current);
        }
        return;
      }

      if (dirMap[e.key]) {
        e.preventDefault();
        const newDir = dirMap[e.key];
        if (newDir !== OPPOSITE[directionRef.current]) {
          nextDirRef.current = newDir;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scheduleNextTick]);

  // ─── Touch / Swipe Controls ───────────────────────────────────────────────

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

    const OPPOSITE: Record<Direction, Direction> = {
      UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
    };

    let swipeDir: Direction;
    if (Math.abs(dx) > Math.abs(dy)) {
      swipeDir = dx > 0 ? "RIGHT" : "LEFT";
    } else {
      swipeDir = dy > 0 ? "DOWN" : "UP";
    }

    if (swipeDir !== OPPOSITE[directionRef.current]) {
      nextDirRef.current = swipeDir;
    }
  }, []);

  const handleDirButton = useCallback(
    (dir: Direction) => {
      const OPPOSITE: Record<Direction, Direction> = {
        UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
      };
      if (gameStateForLoop.current !== "playing") return;
      if (dir !== OPPOSITE[directionRef.current]) {
        nextDirRef.current = dir;
      }
    },
    []
  );

  // ─── Start animation loop once mounted ───────────────────────────────────

  useEffect(() => {
    startAnimLoop();
    return () => {
      stopAnimLoop();
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, [startAnimLoop, stopAnimLoop]);

  // ─── Pause on tab switch ──────────────────────────────────────────────────

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && gameStateForLoop.current === "playing") {
        if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
        setGameState("paused");
        gameStateForLoop.current = "paused";
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // ─── Theme / style helpers ─────────────────────────────────────────────────

  const t = THEME_CONFIG[theme];

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: 0.9, y: -8, transition: { duration: 0.18 } },
  };

  // ─── Dir Button component ─────────────────────────────────────────────────

  const DirBtn = ({
    dir,
    label,
    gridArea,
  }: {
    dir: Direction;
    label: string;
    gridArea: string;
  }) => (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        handleDirButton(dir);
      }}
      className="flex items-center justify-center rounded-xl text-xl font-bold select-none active:scale-90 transition-transform touch-none"
      style={{
        gridArea,
        background: `${t.accent}22`,
        border: `1px solid ${t.border}`,
        color: t.accent,
        width: 56,
        height: 56,
      }}
    >
      {label}
    </button>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 select-none"
      style={{ background: t.bg, color: t.text, fontFamily: "'Inter', sans-serif" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-6 flex-wrap justify-center"
      >
        <h1 className="text-2xl font-black tracking-tight" style={{ color: t.accent }}>
          🐍 Snake
        </h1>
        <div className="flex gap-4 text-sm font-semibold">
          <span>Pontuação: <span style={{ color: t.accent }}>{score}</span></span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>Recorde: <span style={{ color: t.accent }}>{highScore}</span></span>
        </div>
      </motion.div>

      {/* Controls Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3 flex-wrap justify-center"
      >
        {/* Theme */}
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: t.border }}>
          {(Object.keys(THEME_CONFIG) as Theme[]).map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className="px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                background: theme === th ? t.accent + "33" : "transparent",
                color: theme === th ? t.accent : t.text + "99",
                borderRight: th !== "ocean" ? `1px solid ${t.border}` : undefined,
              }}
            >
              {THEME_CONFIG[th].label}
            </button>
          ))}
        </div>

        {/* Grid toggle */}
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors"
          style={{
            background: showGrid ? t.accent + "33" : "transparent",
            border: `1px solid ${t.border}`,
            color: showGrid ? t.accent : t.text + "88",
          }}
        >
          Grade {showGrid ? "✓" : "✗"}
        </button>

        {/* Wrap toggle */}
        <button
          onClick={() => setWrapAround((v) => !v)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors"
          style={{
            background: wrapAround ? t.accent + "33" : "transparent",
            border: `1px solid ${t.border}`,
            color: wrapAround ? t.accent : t.text + "88",
          }}
        >
          Wrap {wrapAround ? "✓" : "✗"}
        </button>
      </motion.div>

      {/* Canvas + Overlay wrapper */}
      <div className="relative" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, maxWidth: "100vw" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block rounded-xl"
          style={{
            border: `2px solid ${t.border}`,
            boxShadow: `0 0 40px ${t.accent}22`,
            maxWidth: "100%",
          }}
        />

        {/* Overlays */}
        <AnimatePresence>
          {/* ── Start Screen ── */}
          {gameState === "start" && (
            <motion.div
              key="start"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-5 px-8 text-center"
              style={{ background: t.panelBg, backdropFilter: "blur(8px)" }}
            >
              <div className="text-6xl mb-2">🐍</div>
              <h2 className="text-3xl font-black tracking-tight" style={{ color: t.accent }}>
                Snake
              </h2>
              <p className="text-sm opacity-70 leading-relaxed max-w-xs">
                Usa as <strong>setas</strong> ou <strong>WASD</strong> para mover a cobra.
                Come a comida para crescer e ganhar pontos.
                Não batas nas paredes nem em ti mesmo!
                <br /><br />
                <strong>Espaço</strong> — pausar / retomar
              </p>

              {/* Difficulty */}
              <div className="w-full max-w-xs">
                <p className="text-xs mb-2 opacity-60 uppercase tracking-wider">Dificuldade</p>
                <div className="flex gap-2 justify-center">
                  {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className="flex-1 py-2 rounded-lg text-sm font-bold transition-all"
                      style={{
                        background: difficulty === d ? t.accent : t.accent + "18",
                        color: difficulty === d ? t.bg : t.accent,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      {DIFFICULTY_CONFIG[d].label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={initGame}
                className="w-full max-w-xs py-3 rounded-xl text-lg font-black"
                style={{ background: t.accent, color: t.bg }}
              >
                Jogar
              </motion.button>
            </motion.div>
          )}

          {/* ── Pause Screen ── */}
          {gameState === "paused" && (
            <motion.div
              key="paused"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-4"
              style={{ background: t.panelBg, backdropFilter: "blur(6px)" }}
            >
              <div className="text-5xl">⏸️</div>
              <h2 className="text-2xl font-black" style={{ color: t.accent }}>Pausado</h2>
              <p className="text-sm opacity-60">Pressiona <strong>Espaço</strong> para continuar</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setGameState("playing");
                  gameStateForLoop.current = "playing";
                  scheduleNextTick(scoreRef.current);
                }}
                className="mt-2 px-8 py-3 rounded-xl text-base font-black"
                style={{ background: t.accent, color: t.bg }}
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {/* ── Game Over Screen ── */}
          {gameState === "over" && (
            <motion.div
              key="over"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center rounded-xl gap-4 px-8 text-center"
              style={{ background: t.panelBg, backdropFilter: "blur(8px)" }}
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="text-6xl"
              >
                💀
              </motion.div>
              <h2 className="text-2xl font-black" style={{ color: t.accent }}>
                Fim de Jogo
              </h2>
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Pontuação</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="text-4xl font-black"
                    style={{ color: t.accent }}
                  >
                    {score}
                  </motion.p>
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Recorde</p>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-4xl font-black"
                    style={{ color: t.accent, opacity: 0.7 }}
                  >
                    {highScore}
                  </motion.p>
                </div>
              </div>
              {score >= highScore && score > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-sm font-semibold"
                  style={{ color: t.accent }}
                >
                  🏆 Novo Recorde!
                </motion.p>
              )}
              <div className="flex gap-3 mt-1 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={initGame}
                  className="flex-1 py-3 rounded-xl text-base font-black"
                  style={{ background: t.accent, color: t.bg }}
                >
                  Jogar Novamente
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setGameState("start");
                    gameStateForLoop.current = "start";
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: "transparent",
                    border: `1px solid ${t.border}`,
                    color: t.text + "cc",
                  }}
                >
                  Menu
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile touch controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-1 md:hidden"
        style={{ touchAction: "none" }}
      >
        <div className="flex justify-center">
          <DirBtn dir="UP" label="▲" gridArea="up" />
        </div>
        <div className="flex gap-1">
          <DirBtn dir="LEFT" label="◀" gridArea="left" />
          <div style={{ width: 56 }} />
          <DirBtn dir="RIGHT" label="▶" gridArea="right" />
        </div>
        <div className="flex justify-center">
          <DirBtn dir="DOWN" label="▼" gridArea="down" />
        </div>
      </motion.div>

      {/* Difficulty selector (in-game) */}
      {(gameState === "playing" || gameState === "paused") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 items-center text-xs"
          style={{ opacity: 0.5 }}
        >
          <span>Dificuldade:</span>
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className="px-2 py-0.5 rounded text-xs font-semibold transition-colors"
              style={{
                background: difficulty === d ? t.accent + "44" : "transparent",
                color: difficulty === d ? t.accent : t.text + "66",
                border: `1px solid ${difficulty === d ? t.border : "transparent"}`,
              }}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs pb-2"
        style={{ opacity: 0.35 }}
      >
        Setas / WASD · Espaço para pausar · Desliza no telemóvel
      </motion.p>
    </main>
  );
}
