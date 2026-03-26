"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type VisualizationMode = "barras" | "ondas" | "circulo";

type ColorTheme = {
  name: string;
  label: string;
  from: string;
  mid: string;
  to: string;
  glow: string;
  bg: string;
  accent: string;
};

// ─── Color themes ─────────────────────────────────────────────────────────────

const COLOR_THEMES: ColorTheme[] = [
  {
    name: "neon",
    label: "Neon",
    from: "#06b6d4",
    mid: "#8b5cf6",
    to: "#ec4899",
    glow: "rgba(6,182,212,0.6)",
    bg: "#0f0f23",
    accent: "#06b6d4",
  },
  {
    name: "ocean",
    label: "Oceano",
    from: "#0ea5e9",
    mid: "#06b6d4",
    to: "#10b981",
    glow: "rgba(14,165,233,0.6)",
    bg: "#030f1c",
    accent: "#0ea5e9",
  },
  {
    name: "sunset",
    label: "Pôr do Sol",
    from: "#f59e0b",
    mid: "#f97316",
    to: "#ef4444",
    glow: "rgba(245,158,11,0.6)",
    bg: "#1a0a00",
    accent: "#f59e0b",
  },
  {
    name: "forest",
    label: "Floresta",
    from: "#4ade80",
    mid: "#22c55e",
    to: "#84cc16",
    glow: "rgba(74,222,128,0.6)",
    bg: "#031a03",
    accent: "#4ade80",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpColor(hex1: string, hex2: string, t: number): string {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

function getBarColor(theme: ColorTheme, t: number): string {
  if (t < 0.5) return lerpColor(theme.from, theme.mid, t * 2);
  return lerpColor(theme.mid, theme.to, (t - 0.5) * 2);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MusicVisualizerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const playingRef = useRef<boolean>(true);

  const [mode, setMode] = useState<VisualizationMode>("barras");
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [themeIndex, setThemeIndex] = useState(0);
  const [bpm, setBpm] = useState(128);
  const [isMobile, setIsMobile] = useState(false);

  const modeRef = useRef<VisualizationMode>("barras");
  const speedRef = useRef<number>(1.0);
  const themeRef = useRef<number>(0);

  // Sync refs so rAF loop always reads latest values
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { themeRef.current = themeIndex; }, [themeIndex]);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // BPM updates based on speed
  useEffect(() => {
    setBpm(Math.round(80 + speed * 60));
  }, [speed]);

  // ─── Drawing functions ───────────────────────────────────────────────────

  const drawBars = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      W: number,
      H: number,
      heights: number[],
      theme: ColorTheme,
      barCount: number
    ) => {
      const barW = Math.floor(W / barCount);
      const gap = Math.max(2, Math.floor(barW * 0.15));
      const bw = barW - gap;
      const maxH = H * 0.45;

      for (let i = 0; i < barCount; i++) {
        const h = heights[i] * maxH;
        const x = i * barW + gap / 2;
        const t = heights[i]; // 0..1 for color interpolation

        // Gradient fill
        const grad = ctx.createLinearGradient(0, H / 2 - h, 0, H / 2);
        grad.addColorStop(0, getBarColor(theme, t));
        grad.addColorStop(1, theme.from);
        ctx.fillStyle = grad;

        // Glow
        ctx.shadowColor = getBarColor(theme, t);
        ctx.shadowBlur = 8 + h * 0.08;

        // Main bar (above center)
        ctx.beginPath();
        ctx.roundRect(x, H / 2 - h, bw, h, [3, 3, 0, 0]);
        ctx.fill();

        // Mirror bar (below center, lower opacity)
        ctx.globalAlpha = 0.3;
        const mirrorGrad = ctx.createLinearGradient(0, H / 2, 0, H / 2 + h);
        mirrorGrad.addColorStop(0, theme.from);
        mirrorGrad.addColorStop(1, "transparent");
        ctx.fillStyle = mirrorGrad;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.roundRect(x, H / 2, bw, h, [0, 0, 3, 3]);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.shadowBlur = 0;
    },
    []
  );

  const drawWave = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      W: number,
      H: number,
      heights: number[],
      theme: ColorTheme,
      barCount: number
    ) => {
      const maxAmp = H * 0.38;
      const step = W / (barCount - 1);

      // Build points
      const pts: { x: number; y: number }[] = heights.map((h, i) => ({
        x: i * step,
        y: H / 2 - (h - 0.5) * 2 * maxAmp,
      }));

      // Upper wave path (smooth catmull-rom via quadratic bezier)
      const drawSmoothPath = (points: { x: number; y: number }[]) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const mx = (points[i].x + points[i + 1].x) / 2;
          const my = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      };

      // Filled area
      const areaGrad = ctx.createLinearGradient(0, H / 2 - maxAmp, 0, H / 2 + maxAmp);
      areaGrad.addColorStop(0, theme.to + "66");
      areaGrad.addColorStop(0.5, theme.from + "33");
      areaGrad.addColorStop(1, "transparent");

      ctx.save();
      drawSmoothPath(pts);
      ctx.lineTo(W, H / 2);
      ctx.lineTo(0, H / 2);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();
      ctx.restore();

      // Mirror area
      const mirrorPts = pts.map((p) => ({ x: p.x, y: H - p.y + H / 2 - H / 2 }));
      ctx.save();
      ctx.globalAlpha = 0.25;
      drawSmoothPath(mirrorPts);
      ctx.lineTo(W, H / 2);
      ctx.lineTo(0, H / 2);
      ctx.closePath();
      ctx.fillStyle = areaGrad;
      ctx.fill();
      ctx.restore();

      // Line stroke
      ctx.save();
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 16;
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, theme.from);
      lineGrad.addColorStop(0.5, theme.mid);
      lineGrad.addColorStop(1, theme.to);
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      drawSmoothPath(pts);
      ctx.stroke();
      ctx.restore();

      // Mirror line
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      drawSmoothPath(mirrorPts);
      ctx.stroke();
      ctx.restore();
    },
    []
  );

  const drawCircle = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      W: number,
      H: number,
      heights: number[],
      theme: ColorTheme,
      barCount: number
    ) => {
      const cx = W / 2;
      const cy = H / 2;
      const minDim = Math.min(W, H);
      const baseR = minDim * 0.22;
      const maxExtra = minDim * 0.22;

      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
        const barH = heights[i] * maxExtra;
        const t = heights[i];

        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * (baseR + barH);
        const y2 = cy + Math.sin(angle) * (baseR + barH);

        const col = getBarColor(theme, t);

        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur = 10 + barH * 0.1;
        ctx.strokeStyle = col;
        ctx.lineWidth = Math.max(2, (2 * Math.PI * baseR) / barCount - 1.5);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }

      // Inner glowing circle
      ctx.save();
      const circGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
      circGrad.addColorStop(0, theme.from + "33");
      circGrad.addColorStop(1, theme.from + "00");
      ctx.fillStyle = circGrad;
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
    []
  );

  // ─── Animation loop ──────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTs = 0;

    const loop = (ts: number) => {
      rafRef.current = requestAnimationFrame(loop);

      const dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;

      if (playingRef.current) {
        timeRef.current += dt * speedRef.current;
      }

      const W = canvas.width;
      const H = canvas.height;
      const t = timeRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      const currentMode = modeRef.current;
      const barCount = W < 640 ? 32 : 64;

      // Build heights array
      const heights: number[] = Array.from({ length: barCount }, (_, i) => {
        const phase = i / barCount;
        // Multiple sine waves layered for organic movement
        const v =
          0.5 +
          0.25 * Math.sin(phase * Math.PI * 4 + t * 2.1) +
          0.15 * Math.sin(phase * Math.PI * 8 + t * 3.7) +
          0.07 * Math.sin(phase * Math.PI * 16 + t * 5.3) +
          0.03 * Math.sin(phase * Math.PI * 2 + t * 1.1);
        return Math.max(0.03, Math.min(1, v));
      });

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // Draw based on mode
      if (currentMode === "barras") {
        drawBars(ctx, W, H, heights, theme, barCount);
      } else if (currentMode === "ondas") {
        drawWave(ctx, W, H, heights, theme, barCount);
      } else {
        drawCircle(ctx, W, H, heights, theme, barCount);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawBars, drawWave, drawCircle]);

  // ─── Canvas resize ───────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  const theme = COLOR_THEMES[themeIndex];

  // ─── UI ──────────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ background: theme.bg, transition: "background 0.6s ease" }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Floating header */}
      <div className="relative z-10 flex justify-center pt-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${theme.glow}`,
          }}
          className="rounded-2xl px-6 py-3 flex items-center gap-4"
        >
          {/* Animated icon */}
          <div className="flex items-end gap-[3px] h-6">
            {[0.6, 1, 0.75, 1, 0.5].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: theme.accent }}
                animate={playing ? { scaleY: [h, 1, h * 0.4, 1, h] } : { scaleY: h * 0.4 }}
                transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
              />
            ))}
          </div>

          <h1 className="text-white font-semibold text-lg sm:text-xl tracking-tight">
            Visualizador Musical
          </h1>

          {/* BPM badge */}
          <div
            className="rounded-full px-3 py-1 text-xs font-mono font-bold"
            style={{ background: theme.accent + "22", color: theme.accent, border: `1px solid ${theme.accent}44` }}
          >
            {bpm} BPM
          </div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Controls panel */}
      <div className="relative z-10 flex justify-center pb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
          className="rounded-2xl p-4 sm:p-5 w-full max-w-2xl flex flex-col gap-4"
        >
          {/* Row 1: Mode + Play/Pause */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode buttons */}
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {(["barras", "ondas", "circulo"] as VisualizationMode[]).map((m) => {
                const labels: Record<VisualizationMode, string> = {
                  barras: "Barras",
                  ondas: "Ondas",
                  circulo: "Círculo",
                };
                const active = mode === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={{
                      background: active ? theme.accent + "33" : "transparent",
                      color: active ? theme.accent : "rgba(255,255,255,0.5)",
                      borderRight: m !== "circulo" ? "1px solid rgba(255,255,255,0.1)" : "none",
                    }}
                  >
                    {labels[m]}
                  </button>
                );
              })}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setPlaying((p) => !p)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: theme.accent + "22",
                color: theme.accent,
                border: `1px solid ${theme.accent}44`,
                boxShadow: playing ? `0 0 16px ${theme.glow}` : "none",
              }}
            >
              {playing ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="4" height="12" rx="1" />
                    <rect x="8" y="1" width="4" height="12" rx="1" />
                  </svg>
                  Pausar
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3 1.5l10 5.5-10 5.5V1.5z" />
                  </svg>
                  Reproduzir
                </>
              )}
            </button>
          </div>

          {/* Row 2: Speed + Color themes */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Speed slider */}
            <div className="flex items-center gap-3 flex-1 min-w-40">
              <span className="text-xs text-white/50 whitespace-nowrap">Velocidade</span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${((speed - 0.2) / 2.8) * 100}%, rgba(255,255,255,0.15) ${((speed - 0.2) / 2.8) * 100}%, rgba(255,255,255,0.15) 100%)`,
                  accentColor: theme.accent,
                }}
              />
              <span className="text-xs font-mono" style={{ color: theme.accent, minWidth: "2.5rem" }}>
                {speed.toFixed(1)}x
              </span>
            </div>

            {/* Color theme pills */}
            <div className="flex gap-2">
              {COLOR_THEMES.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setThemeIndex(i)}
                  title={t.label}
                  className="w-6 h-6 rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    boxShadow: themeIndex === i
                      ? `0 0 0 2px ${t.accent}, 0 0 12px ${t.glow}`
                      : "none",
                    transform: themeIndex === i ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            {/* Theme label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={theme.name}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                className="text-xs font-medium hidden sm:block"
                style={{ color: theme.accent }}
              >
                {theme.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Global slider thumb style */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
