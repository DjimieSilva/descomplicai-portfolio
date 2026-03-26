"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Direction =
  | "to top"
  | "to top right"
  | "to right"
  | "to bottom right"
  | "to bottom"
  | "to bottom left"
  | "to left"
  | "to top left"
  | "radial";

interface ColorStop {
  id: string;
  color: string;
}

interface Preset {
  name: string;
  stops: string[];
  direction: Direction;
  emoji: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DIRECTION_BUTTONS: { label: string; value: Direction }[] = [
  { label: "↖", value: "to top left" },
  { label: "↑", value: "to top" },
  { label: "↗", value: "to top right" },
  { label: "←", value: "to left" },
  { label: "●", value: "radial" },
  { label: "→", value: "to right" },
  { label: "↙", value: "to bottom left" },
  { label: "↓", value: "to bottom" },
  { label: "↘", value: "to bottom right" },
];

const PRESETS: Preset[] = [
  {
    name: "Pôr do Sol",
    stops: ["#ff6b6b", "#feca57", "#ff9f43"],
    direction: "to bottom right",
    emoji: "🌅",
  },
  {
    name: "Oceano",
    stops: ["#0652DD", "#1289A7", "#c4e538"],
    direction: "to bottom right",
    emoji: "🌊",
  },
  {
    name: "Floresta",
    stops: ["#134e5e", "#71b280"],
    direction: "to top right",
    emoji: "🌿",
  },
  {
    name: "Candy",
    stops: ["#f953c6", "#b91d73"],
    direction: "to bottom right",
    emoji: "🍬",
  },
  {
    name: "Aurora",
    stops: ["#00b09b", "#96c93d"],
    direction: "to right",
    emoji: "🌌",
  },
  {
    name: "Chama",
    stops: ["#f7971e", "#ffd200", "#f97316"],
    direction: "to top",
    emoji: "🔥",
  },
  {
    name: "Lavanda",
    stops: ["#a18cd1", "#fbc2eb"],
    direction: "to bottom right",
    emoji: "💜",
  },
  {
    name: "Menta",
    stops: ["#00b4db", "#0083b0"],
    direction: "to right",
    emoji: "🌱",
  },
  {
    name: "Rosa Neon",
    stops: ["#f953c6", "#43e97b"],
    direction: "radial",
    emoji: "💅",
  },
  {
    name: "Crepúsculo",
    stops: ["#2c3e50", "#fd746c", "#ff9068"],
    direction: "to bottom",
    emoji: "🌆",
  },
  {
    name: "Céu Noturno",
    stops: ["#0f0c29", "#302b63", "#24243e"],
    direction: "to bottom right",
    emoji: "🌙",
  },
  {
    name: "Pêssego",
    stops: ["#ffecd2", "#fcb69f"],
    direction: "to top right",
    emoji: "🍑",
  },
];

const RANDOM_COLORS = [
  "#f97316", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981",
  "#f59e0b", "#ef4444", "#06b6d4", "#84cc16", "#6366f1",
  "#14b8a6", "#e11d48", "#7c3aed", "#0284c7", "#16a34a",
  "#d97706", "#dc2626", "#0891b2", "#65a30d", "#4f46e5",
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function randomColor() {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
}

// ─── CSS builder ─────────────────────────────────────────────────────────────

function buildGradientCSS(stops: ColorStop[], direction: Direction): string {
  const stopsStr = stops.map((s) => s.color).join(", ");
  if (direction === "radial") {
    return `radial-gradient(circle, ${stopsStr})`;
  }
  return `linear-gradient(${direction}, ${stopsStr})`;
}

function buildFullCSS(stops: ColorStop[], direction: Direction): string {
  const gradient = buildGradientCSS(stops, direction);
  return `background: ${gradient};`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GradientMakerPage() {
  const [stops, setStops] = useState<ColorStop[]>([
    { id: uid(), color: "#f97316" },
    { id: uid(), color: "#8b5cf6" },
  ]);
  const [direction, setDirection] = useState<Direction>("to bottom right");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gradientCSS = buildGradientCSS(stops, direction);
  const fullCSS = buildFullCSS(stops, direction);

  const updateStop = useCallback((id: string, color: string) => {
    setActivePreset(null);
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, color } : s))
    );
  }, []);

  const addStop = useCallback(() => {
    if (stops.length >= 4) return;
    setActivePreset(null);
    setStops((prev) => [...prev, { id: uid(), color: randomColor() }]);
  }, [stops.length]);

  const removeStop = useCallback((id: string) => {
    if (stops.length <= 2) return;
    setActivePreset(null);
    setStops((prev) => prev.filter((s) => s.id !== id));
  }, [stops.length]);

  const applyPreset = useCallback((preset: Preset) => {
    setStops(preset.stops.map((c) => ({ id: uid(), color: c })));
    setDirection(preset.direction);
    setActivePreset(preset.name);
  }, []);

  const randomize = useCallback(() => {
    setActivePreset(null);
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    setStops(
      Array.from({ length: count }, () => ({ id: uid(), color: randomColor() }))
    );
    const dirs: Direction[] = [
      "to bottom right",
      "to right",
      "to bottom",
      "to top right",
      "radial",
    ];
    setDirection(dirs[Math.floor(Math.random() * dirs.length)]);
  }, []);

  const copyCSS = useCallback(() => {
    navigator.clipboard.writeText(fullCSS).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [fullCSS]);

  // Close fullscreen on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Gradient Maker
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Cria gradientes CSS com prévia ao vivo
            </p>
          </div>
          <span className="text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            Descomplicai
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Preview */}
        <motion.div
          layout
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{ height: "clamp(220px, 38vw, 420px)" }}
        >
          <motion.div
            key={gradientCSS}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 gradient-animated"
            style={{
              background: gradientCSS,
              backgroundSize: "200% 200%",
            }}
          />
          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-white/30 transition-colors border border-white/30"
            title="Prévia em ecrã inteiro"
          >
            ⛶ Ecrã inteiro
          </button>
        </motion.div>

        {/* Controls grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Color stops */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Cores
            </h2>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {stops.map((stop, index) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <div
                        className="w-10 h-10 rounded-xl shadow-sm border-2 border-white ring-1 ring-gray-200 cursor-pointer overflow-hidden"
                        style={{ backgroundColor: stop.color }}
                      >
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateStop(stop.id, e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          title={`Cor ${index + 1}`}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={stop.color}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                            updateStop(stop.id, v);
                          }
                        }}
                        className="w-full text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        maxLength={7}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-medium w-4 shrink-0">
                      {index + 1}
                    </span>
                    {stops.length > 2 && (
                      <button
                        onClick={() => removeStop(stop.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none shrink-0"
                        title="Remover cor"
                      >
                        ×
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {stops.length < 4 && (
              <button
                onClick={addStop}
                className="w-full py-2 text-sm font-medium text-orange-500 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50 transition-colors"
              >
                + Adicionar cor
              </button>
            )}
          </div>

          {/* Direction */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Direção
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {DIRECTION_BUTTONS.map((btn) => (
                <motion.button
                  key={btn.value}
                  onClick={() => setDirection(btn.value)}
                  whileTap={{ scale: 0.92 }}
                  className={`aspect-square flex items-center justify-center text-lg rounded-xl border transition-all font-medium ${
                    direction === btn.value
                      ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500"
                  }`}
                  title={btn.value}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center">
              {direction === "radial" ? "Radial (círculo)" : direction}
            </p>
          </div>

          {/* CSS output + actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              CSS Gerado
            </h2>

            <div className="flex-1 bg-gray-900 rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto">
              <span className="text-purple-400">background</span>
              <span className="text-gray-400">: </span>
              <span className="text-green-400 break-all">{gradientCSS}</span>
              <span className="text-gray-400">;</span>
            </div>

            <div className="space-y-2">
              <motion.button
                onClick={copyCSS}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 text-sm font-semibold rounded-xl transition-all relative overflow-hidden"
                style={{
                  background: copied ? "#10b981" : "#f97316",
                  color: "white",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      ✓ Copiado!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      Copiar CSS
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={randomize}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                🎲 Gradiente aleatório
              </motion.button>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Presets
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {PRESETS.map((preset) => {
              const previewGrad =
                preset.direction === "radial"
                  ? `radial-gradient(circle, ${preset.stops.join(", ")})`
                  : `linear-gradient(${preset.direction}, ${preset.stops.join(", ")})`;
              const isActive = activePreset === preset.name;
              return (
                <motion.button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                    isActive
                      ? "border-orange-400 bg-orange-50 shadow-md shadow-orange-100"
                      : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                  }`}
                  title={preset.name}
                >
                  <div
                    className="w-full aspect-square rounded-lg shadow-sm"
                    style={{ background: previewGrad }}
                  />
                  <span className="text-xs text-gray-500 group-hover:text-gray-700 font-medium text-center leading-tight">
                    {preset.emoji}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600 text-center leading-tight hidden sm:block">
                    {preset.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 gradient-animated"
            style={{
              background: gradientCSS,
              backgroundSize: "200% 200%",
            }}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-5 right-5 bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-white/30 transition-colors border border-white/30"
            >
              ✕ Fechar
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-xs font-mono border border-white/20">
              {gradientCSS}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated gradient keyframes */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animated {
          animation: gradientShift 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
