"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tool = "draw" | "erase" | "fill" | "eyedropper";
type GridSize = 8 | 16 | 32;

// ─── Constants ────────────────────────────────────────────────────────────────

const PALETTE: string[] = [
  "#000000", // black
  "#ffffff", // white
  "#9ca3af", // light gray
  "#4b5563", // dark gray
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#78350f", // brown
  "#fde68a", // light yellow / skin
  "#fca5a5", // skin / light red
  "#a7f3d0", // mint
  "#bfdbfe", // light blue
];

const MAX_HISTORY = 20;
const ACCENT = "#ec4899";

// ─── Templates ────────────────────────────────────────────────────────────────

function makeEmpty(size: GridSize): string[] {
  return Array(size * size).fill("#ffffff");
}

// Encode a template as [row, col, color] triples on a 16x16 base grid
// We only define templates for 16x16; they scale or crop for other sizes.
const HEART_16: Array<[number, number, string]> = [
  [1, 2, "#ef4444"], [1, 3, "#ef4444"], [1, 6, "#ef4444"], [1, 7, "#ef4444"],
  [2, 1, "#ef4444"], [2, 2, "#ef4444"], [2, 3, "#ef4444"], [2, 4, "#ef4444"],
  [2, 5, "#ef4444"], [2, 6, "#ef4444"], [2, 7, "#ef4444"], [2, 8, "#ef4444"],
  [3, 0, "#ef4444"], [3, 1, "#ef4444"], [3, 2, "#ef4444"], [3, 3, "#ef4444"],
  [3, 4, "#ef4444"], [3, 5, "#ef4444"], [3, 6, "#ef4444"], [3, 7, "#ef4444"],
  [3, 8, "#ef4444"], [3, 9, "#ef4444"],
  [4, 0, "#ef4444"], [4, 1, "#ef4444"], [4, 2, "#ef4444"], [4, 3, "#ef4444"],
  [4, 4, "#ef4444"], [4, 5, "#ef4444"], [4, 6, "#ef4444"], [4, 7, "#ef4444"],
  [4, 8, "#ef4444"], [4, 9, "#ef4444"],
  [5, 1, "#ef4444"], [5, 2, "#ef4444"], [5, 3, "#ef4444"], [5, 4, "#ef4444"],
  [5, 5, "#ef4444"], [5, 6, "#ef4444"], [5, 7, "#ef4444"], [5, 8, "#ef4444"],
  [6, 2, "#ef4444"], [6, 3, "#ef4444"], [6, 4, "#ef4444"], [6, 5, "#ef4444"],
  [6, 6, "#ef4444"], [6, 7, "#ef4444"],
  [7, 3, "#ef4444"], [7, 4, "#ef4444"], [7, 5, "#ef4444"], [7, 6, "#ef4444"],
  [8, 4, "#ef4444"], [8, 5, "#ef4444"],
].map(([r, c, col]) => [r, (c as number) + 3, col] as [number, number, string]);

const STAR_16: Array<[number, number, string]> = (() => {
  const Y = "#eab308";
  return [
    [1, 7, Y], [1, 8, Y],
    [2, 6, Y], [2, 7, Y], [2, 8, Y], [2, 9, Y],
    [3, 4, Y], [3, 5, Y], [3, 6, Y], [3, 7, Y], [3, 8, Y], [3, 9, Y], [3, 10, Y], [3, 11, Y],
    [4, 0, Y], [4, 1, Y], [4, 2, Y], [4, 3, Y], [4, 4, Y], [4, 5, Y], [4, 6, Y], [4, 7, Y],
    [4, 8, Y], [4, 9, Y], [4, 10, Y], [4, 11, Y], [4, 12, Y], [4, 13, Y], [4, 14, Y], [4, 15, Y],
    [5, 1, Y], [5, 2, Y], [5, 3, Y], [5, 4, Y], [5, 5, Y], [5, 6, Y], [5, 7, Y], [5, 8, Y],
    [5, 9, Y], [5, 10, Y], [5, 11, Y], [5, 12, Y], [5, 13, Y], [5, 14, Y],
    [6, 3, Y], [6, 4, Y], [6, 5, Y], [6, 6, Y], [6, 7, Y], [6, 8, Y], [6, 9, Y], [6, 10, Y], [6, 11, Y], [6, 12, Y],
    [7, 5, Y], [7, 6, Y], [7, 7, Y], [7, 8, Y], [7, 9, Y], [7, 10, Y],
    [8, 4, Y], [8, 5, Y], [8, 6, Y], [8, 7, Y], [8, 8, Y], [8, 9, Y], [8, 10, Y], [8, 11, Y],
    [9, 4, Y], [9, 5, Y], [9, 6, Y], [9, 7, Y], [9, 8, Y], [9, 9, Y], [9, 10, Y], [9, 11, Y],
    [10, 3, Y], [10, 4, Y], [10, 5, Y], [10, 6, Y], [10, 7, Y], [10, 8, Y], [10, 9, Y], [10, 10, Y], [10, 11, Y], [10, 12, Y],
    [11, 3, Y], [11, 4, Y], [11, 11, Y], [11, 12, Y],
    [12, 2, Y], [12, 3, Y], [12, 12, Y], [12, 13, Y],
  ] as Array<[number, number, string]>;
})();

const SMILEY_16: Array<[number, number, string]> = (() => {
  const Y = "#eab308";
  const B = "#000000";
  const W = "#ffffff";
  return [
    // Face circle
    [2, 5, Y], [2, 6, Y], [2, 7, Y], [2, 8, Y], [2, 9, Y], [2, 10, Y],
    [3, 4, Y], [3, 5, Y], [3, 6, Y], [3, 7, Y], [3, 8, Y], [3, 9, Y], [3, 10, Y], [3, 11, Y],
    [4, 3, Y], [4, 4, Y], [4, 5, Y], [4, 6, Y], [4, 7, Y], [4, 8, Y], [4, 9, Y], [4, 10, Y], [4, 11, Y], [4, 12, Y],
    [5, 3, Y], [5, 4, Y], [5, 5, Y], [5, 6, Y], [5, 7, Y], [5, 8, Y], [5, 9, Y], [5, 10, Y], [5, 11, Y], [5, 12, Y],
    [6, 2, Y], [6, 3, Y], [6, 4, Y], [6, 5, Y], [6, 6, Y], [6, 7, Y], [6, 8, Y], [6, 9, Y], [6, 10, Y], [6, 11, Y], [6, 12, Y], [6, 13, Y],
    [7, 2, Y], [7, 3, Y], [7, 4, Y], [7, 5, Y], [7, 6, Y], [7, 7, Y], [7, 8, Y], [7, 9, Y], [7, 10, Y], [7, 11, Y], [7, 12, Y], [7, 13, Y],
    [8, 2, Y], [8, 3, Y], [8, 4, Y], [8, 5, Y], [8, 6, Y], [8, 7, Y], [8, 8, Y], [8, 9, Y], [8, 10, Y], [8, 11, Y], [8, 12, Y], [8, 13, Y],
    [9, 2, Y], [9, 3, Y], [9, 4, Y], [9, 5, Y], [9, 6, Y], [9, 7, Y], [9, 8, Y], [9, 9, Y], [9, 10, Y], [9, 11, Y], [9, 12, Y], [9, 13, Y],
    [10, 3, Y], [10, 4, Y], [10, 5, Y], [10, 6, Y], [10, 7, Y], [10, 8, Y], [10, 9, Y], [10, 10, Y], [10, 11, Y], [10, 12, Y],
    [11, 3, Y], [11, 4, Y], [11, 5, Y], [11, 6, Y], [11, 7, Y], [11, 8, Y], [11, 9, Y], [11, 10, Y], [11, 11, Y], [11, 12, Y],
    [12, 4, Y], [12, 5, Y], [12, 6, Y], [12, 7, Y], [12, 8, Y], [12, 9, Y], [12, 10, Y], [12, 11, Y],
    [13, 5, Y], [13, 6, Y], [13, 7, Y], [13, 8, Y], [13, 9, Y], [13, 10, Y],
    // Eyes
    [5, 5, B], [5, 6, B], [5, 10, B], [5, 11, B],
    [6, 5, B], [6, 6, B], [6, 10, B], [6, 11, B],
    // Smile
    [10, 5, B], [10, 10, B],
    [11, 6, B], [11, 7, B], [11, 8, B], [11, 9, B],
  ] as Array<[number, number, string]>;
})();

function buildGrid(
  size: GridSize,
  triples: Array<[number, number, string]>
): string[] {
  const grid = makeEmpty(size);
  for (const [r, c, color] of triples) {
    if (r < size && c < size) {
      grid[r * size + c] = color;
    }
  }
  return grid;
}

// ─── Flood Fill ───────────────────────────────────────────────────────────────

function floodFill(
  pixels: string[],
  index: number,
  targetColor: string,
  fillColor: string,
  size: GridSize
): string[] {
  if (targetColor === fillColor) return pixels;
  if (pixels[index] !== targetColor) return pixels;

  const result = [...pixels];
  const stack = [index];

  while (stack.length > 0) {
    const i = stack.pop()!;
    if (i < 0 || i >= size * size) continue;
    if (result[i] !== targetColor) continue;

    result[i] = fillColor;

    const row = Math.floor(i / size);
    const col = i % size;

    if (col > 0) stack.push(i - 1);
    if (col < size - 1) stack.push(i + 1);
    if (row > 0) stack.push(i - size);
    if (row < size - 1) stack.push(i + size);
  }

  return result;
}

// ─── Tool button ──────────────────────────────────────────────────────────────

interface ToolButtonProps {
  label: string;
  icon: string;
  toolId: Tool;
  active: boolean;
  onClick: (t: Tool) => void;
}

function ToolButton({ label, icon, toolId, active, onClick }: ToolButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onClick(toolId)}
      title={label}
      aria-label={label}
      className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors duration-150 select-none"
      style={{
        background: active ? ACCENT : "#ffffff",
        color: active ? "#ffffff" : "#374151",
        boxShadow: active
          ? `0 2px 12px 0 ${ACCENT}55`
          : "0 1px 3px 0 #0000000d",
        border: `2px solid ${active ? ACCENT : "#e5e7eb"}`,
      }}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="hidden sm:block leading-none">{label}</span>
    </motion.button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PixelArtEditor() {
  const [gridSize, setGridSize] = useState<GridSize>(16);
  const [pixels, setPixels] = useState<string[]>(() => makeEmpty(16));
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [tool, setTool] = useState<Tool>("draw");
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<string[][]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({
    msg: "",
    visible: false,
  });

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ── Toast helper
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      1800
    );
  }, []);

  // ── Push to undo history
  const pushHistory = useCallback((prev: string[]) => {
    setHistory((h) => [...h, prev].slice(-MAX_HISTORY));
  }, []);

  // ── Undo
  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setPixels(prev);
      return h.slice(0, -1);
    });
  }, []);

  // ── Paint a single pixel
  const paintPixel = useCallback(
    (index: number, currentPixels: string[]): string[] | null => {
      if (tool === "draw") {
        if (currentPixels[index] === selectedColor) return null;
        const next = [...currentPixels];
        next[index] = selectedColor;
        return next;
      }
      if (tool === "erase") {
        if (currentPixels[index] === "#ffffff") return null;
        const next = [...currentPixels];
        next[index] = "#ffffff";
        return next;
      }
      if (tool === "fill") {
        const target = currentPixels[index];
        return floodFill(currentPixels, index, target, selectedColor, gridSize);
      }
      if (tool === "eyedropper") {
        setSelectedColor(currentPixels[index]);
        setTool("draw");
        return null;
      }
      return null;
    },
    [tool, selectedColor, gridSize]
  );

  // ── Handle pixel interaction
  const handlePixelInteraction = useCallback(
    (index: number, isStart: boolean) => {
      setPixels((prev) => {
        const result = paintPixel(index, prev);
        if (result === null) return prev;
        if (isStart) pushHistory(prev);
        return result;
      });
    },
    [paintPixel, pushHistory]
  );

  // ── Mouse events on pixel
  const handleMouseDown = useCallback(
    (index: number) => {
      setIsMouseDown(true);
      handlePixelInteraction(index, true);
    },
    [handlePixelInteraction]
  );

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (!isMouseDown) return;
      if (tool === "fill" || tool === "eyedropper") return;
      handlePixelInteraction(index, false);
    },
    [isMouseDown, tool, handlePixelInteraction]
  );

  // ── Global mouse-up
  useEffect(() => {
    const up = () => setIsMouseDown(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  // ── Touch support
  const getIndexFromTouch = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const attr = el?.getAttribute("data-idx");
      return attr !== null && attr !== undefined ? parseInt(attr, 10) : -1;
    },
    []
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const idx = getIndexFromTouch(e);
      if (idx >= 0) handlePixelInteraction(idx, true);
    },
    [getIndexFromTouch, handlePixelInteraction]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (tool === "fill" || tool === "eyedropper") return;
      const idx = getIndexFromTouch(e);
      if (idx >= 0) handlePixelInteraction(idx, false);
    },
    [getIndexFromTouch, tool, handlePixelInteraction]
  );

  // ── Clear grid
  const clearGrid = useCallback(() => {
    pushHistory(pixels);
    setPixels(makeEmpty(gridSize));
  }, [pixels, gridSize, pushHistory]);

  // ── Change grid size
  const changeGridSize = useCallback(
    (newSize: GridSize) => {
      pushHistory(pixels);
      setGridSize(newSize);
      setPixels(makeEmpty(newSize));
    },
    [pixels, pushHistory]
  );

  // ── Load template
  const loadTemplate = useCallback(
    (name: "heart" | "star" | "smiley") => {
      pushHistory(pixels);
      const map = {
        heart: HEART_16,
        star: STAR_16,
        smiley: SMILEY_16,
      };
      setGridSize(16);
      setPixels(buildGrid(16, map[name]));
    },
    [pixels, pushHistory]
  );

  // ── Export PNG
  const exportPng = useCallback(() => {
    const scale = Math.max(1, Math.floor(512 / gridSize));
    const size = gridSize * scale;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < pixels.length; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      ctx.fillStyle = pixels[i];
      ctx.fillRect(col * scale, row * scale, scale, scale);
    }

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "pixel-art.png";
    a.click();
    showToast("Imagem exportada!");
  }, [pixels, gridSize, showToast]);

  // ── Keyboard shortcut: Ctrl+Z undo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo]);

  // ── Cell pixel size for grid display
  const cellPx = gridSize === 8 ? 52 : gridSize === 16 ? 28 : 14;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f3f4f6" }}
    >
      {/* ── Header */}
      <header className="px-4 pt-8 pb-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          Editor de Pixel Art 🎨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-2 text-gray-500 text-sm sm:text-base"
        >
          Clica, arrasta e cria. Exporta em PNG.
        </motion.p>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 px-3 sm:px-6 pb-10 max-w-6xl mx-auto w-full">
        {/* ── Left panel: grid */}
        <div className="flex-1 flex flex-col items-center gap-3">
          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            <ToolButton
              toolId="draw"
              icon="🖌️"
              label="Pincel"
              active={tool === "draw"}
              onClick={setTool}
            />
            <ToolButton
              toolId="erase"
              icon="🧹"
              label="Borracha"
              active={tool === "erase"}
              onClick={setTool}
            />
            <ToolButton
              toolId="fill"
              icon="🪣"
              label="Balde"
              active={tool === "fill"}
              onClick={setTool}
            />
            <ToolButton
              toolId="eyedropper"
              icon="🎨"
              label="Conta-gotas"
              active={tool === "eyedropper"}
              onClick={setTool}
            />

            {/* Separator */}
            <div className="w-px bg-gray-300 self-stretch mx-1 hidden sm:block" />

            {/* Undo */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={undo}
              disabled={history.length === 0}
              title="Desfazer (Ctrl+Z)"
              aria-label="Desfazer"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-colors duration-150 select-none"
              style={{
                background: "#ffffff",
                color: history.length === 0 ? "#d1d5db" : "#374151",
                borderColor: history.length === 0 ? "#f3f4f6" : "#e5e7eb",
                boxShadow: "0 1px 3px 0 #0000000d",
              }}
            >
              <span className="text-lg leading-none">↩️</span>
              <span className="hidden sm:block leading-none">Desfazer</span>
            </motion.button>

            {/* Clear */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={clearGrid}
              title="Limpar tudo"
              aria-label="Limpar tudo"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 border-gray-200 bg-white text-gray-700 transition-colors duration-150 select-none"
              style={{ boxShadow: "0 1px 3px 0 #0000000d" }}
            >
              <span className="text-lg leading-none">🗑️</span>
              <span className="hidden sm:block leading-none">Limpar</span>
            </motion.button>

            {/* Export */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={exportPng}
              title="Exportar como PNG"
              aria-label="Exportar como PNG"
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-colors duration-150 select-none"
              style={{
                background: "#1e293b",
                color: "#ffffff",
                borderColor: "#1e293b",
                boxShadow: "0 2px 8px 0 #1e293b33",
              }}
            >
              <span className="text-lg leading-none">💾</span>
              <span className="hidden sm:block leading-none">Exportar</span>
            </motion.button>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            ref={gridRef}
            className="touch-none select-none rounded-2xl overflow-hidden shadow-lg"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, ${cellPx}px)`,
              gridTemplateRows: `repeat(${gridSize}, ${cellPx}px)`,
              border: "2px solid #d1d5db",
              background: "#ffffff",
              cursor:
                tool === "eyedropper"
                  ? "crosshair"
                  : tool === "fill"
                  ? "cell"
                  : tool === "erase"
                  ? "not-allowed"
                  : "crosshair",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {pixels.map((color, idx) => (
              <div
                key={idx}
                data-idx={idx}
                onMouseDown={() => handleMouseDown(idx)}
                onMouseEnter={() => handleMouseEnter(idx)}
                style={{
                  backgroundColor: color,
                  width: cellPx,
                  height: cellPx,
                  boxSizing: "border-box",
                  border: showGrid ? "1px solid #e5e7eb" : "none",
                  transition: "background-color 0.04s",
                }}
              />
            ))}
          </motion.div>

          {/* Grid size + grid lines toggles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex flex-wrap gap-3 items-center justify-center"
          >
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
              Tamanho:
            </span>
            {([8, 16, 32] as GridSize[]).map((s) => (
              <button
                key={s}
                onClick={() => changeGridSize(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150"
                style={{
                  background: gridSize === s ? ACCENT : "#ffffff",
                  color: gridSize === s ? "#ffffff" : "#374151",
                  borderColor: gridSize === s ? ACCENT : "#e5e7eb",
                }}
              >
                {s}×{s}
              </button>
            ))}

            <button
              onClick={() => setShowGrid((v) => !v)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150"
              style={{
                background: showGrid ? "#f0fdf4" : "#ffffff",
                color: showGrid ? "#15803d" : "#374151",
                borderColor: showGrid ? "#86efac" : "#e5e7eb",
              }}
            >
              {showGrid ? "Linhas ON" : "Linhas OFF"}
            </button>
          </motion.div>
        </div>

        {/* ── Right panel: palette + templates */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className="flex flex-col gap-5 w-full lg:w-52 xl:w-60 shrink-0"
        >
          {/* Color palette */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Paleta
            </p>
            <div className="grid grid-cols-8 lg:grid-cols-4 gap-1.5">
              {PALETTE.map((color) => (
                <motion.button
                  key={color}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => {
                    setSelectedColor(color);
                    if (tool === "erase") setTool("draw");
                  }}
                  aria-label={`Selecionar cor ${color}`}
                  className="rounded-lg transition-transform duration-100"
                  style={{
                    backgroundColor: color,
                    width: "100%",
                    aspectRatio: "1",
                    border:
                      selectedColor === color
                        ? `3px solid ${ACCENT}`
                        : "2px solid #e5e7eb",
                    boxShadow:
                      selectedColor === color
                        ? `0 0 0 2px #ffffff, 0 0 0 4px ${ACCENT}`
                        : "none",
                  }}
                />
              ))}
            </div>

            {/* Custom color picker */}
            <div className="mt-3 flex items-center gap-2">
              <label className="text-xs text-gray-500 font-medium shrink-0">
                Personalizada:
              </label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  if (tool === "erase") setTool("draw");
                }}
                className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-200"
                aria-label="Cor personalizada"
              />
              <span className="text-xs font-mono text-gray-400 uppercase">
                {selectedColor}
              </span>
            </div>

            {/* Current color preview */}
            <div className="mt-3 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg border-2 border-gray-200 shrink-0"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-xs text-gray-600 font-medium">
                Cor activa
              </span>
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Templates (16×16)
            </p>
            <div className="flex flex-col gap-2">
              {(
                [
                  { name: "heart", label: "Coração ❤️" },
                  { name: "star", label: "Estrela ⭐" },
                  { name: "smiley", label: "Sorriso 😊" },
                ] as const
              ).map(({ name, label }) => (
                <motion.button
                  key={name}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => loadTemplate(name)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all duration-150 border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50"
                  style={{ color: "#374151" }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Dicas
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 leading-relaxed">
              <li>🖱️ Clica e arrasta para pintar</li>
              <li>↩️ Ctrl+Z para desfazer</li>
              <li>🎨 Conta-gotas para copiar uma cor</li>
              <li>💾 Exporta como PNG (512px)</li>
            </ul>
          </div>
        </motion.aside>
      </main>

      {/* ── Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl pointer-events-none"
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
