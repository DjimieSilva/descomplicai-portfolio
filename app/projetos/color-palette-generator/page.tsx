"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ColorSwatch {
  h: number;
  s: number;
  l: number;
  locked: boolean;
}

interface HistoryEntry {
  id: string;
  colors: ColorSwatch[];
}

// ─── Color utilities ──────────────────────────────────────────────────────────

const GOLDEN_RATIO = 0.618033988749895;

function hslToHex(h: number, s: number, l: number): string {
  const sl = s / 100;
  const ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  const sl = s / 100;
  const ll = l / 100;
  const a = sl * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(
      255 * (ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))
    );
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function luminance(h: number, s: number, l: number): number {
  const { r, g, b } = hslToRgb(h, s, l);
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function textColor(h: number, s: number, l: number): string {
  const lum = luminance(h, s, l);
  return lum > 0.35 ? "#1a1a1a" : "#ffffff";
}

function generateHarmoniousPalette(
  existing: ColorSwatch[],
  count = 5
): ColorSwatch[] {
  // Start from a random hue and walk with golden ratio
  const baseHue = Math.random() * 360;
  const baseSat = 55 + Math.random() * 30; // 55–85%
  const baseLightMin = 35;
  const baseLightMax = 75;

  const result: ColorSwatch[] = [];

  for (let i = 0; i < count; i++) {
    // Keep locked colors unchanged
    if (existing[i]?.locked) {
      result.push(existing[i]);
      continue;
    }

    const hue = (baseHue + i * GOLDEN_RATIO * 360) % 360;
    // Vary lightness across swatches for variety
    const lightVariation = ((i * 137.508) % (baseLightMax - baseLightMin)) + baseLightMin;
    const satVariation = Math.max(30, baseSat - (i % 3) * 10);

    result.push({
      h: Math.round(hue),
      s: Math.round(satVariation),
      l: Math.round(lightVariation),
      locked: false,
    });
  }

  return result;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl pointer-events-none"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Lock icon ────────────────────────────────────────────────────────────────

function LockIcon({ locked }: { locked: boolean }) {
  return locked ? (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 opacity-50"
      aria-hidden="true"
    >
      <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 00-7.5 0v3h.75a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3H15v-3C15 3.85 16.35 1.5 18 1.5z" />
    </svg>
  );
}

// ─── Copy icon ────────────────────────────────────────────────────────────────

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

// ─── Swatch component ─────────────────────────────────────────────────────────

interface SwatchProps {
  swatch: ColorSwatch;
  index: number;
  onCopy: (hex: string) => void;
  onToggleLock: (index: number) => void;
}

function Swatch({ swatch, index, onCopy, onToggleLock }: SwatchProps) {
  const hex = hslToHex(swatch.h, swatch.s, swatch.l);
  const { r, g, b } = hslToRgb(swatch.h, swatch.s, swatch.l);
  const fg = textColor(swatch.h, swatch.s, swatch.l);

  return (
    <motion.div
      key={hex}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="relative flex-1 min-w-0 rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
      style={{ backgroundColor: hex, minHeight: "420px" }}
      onClick={() => onCopy(hex)}
      role="button"
      tabIndex={0}
      aria-label={`Copiar ${hex}`}
      onKeyDown={(e) => e.key === "Enter" && onCopy(hex)}
    >
      {/* Color info at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-5 flex flex-col gap-1"
        style={{ color: fg }}
      >
        <span className="text-xl font-bold tracking-wide font-mono leading-none">
          {hex}
        </span>
        <span className="text-xs font-mono opacity-70">
          rgb({r}, {g}, {b})
        </span>

        {/* Actions row */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(hex);
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor:
                fg === "#ffffff" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              color: fg,
            }}
            aria-label="Copiar hex"
          >
            <CopyIcon />
            Copiar
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(index);
            }}
            className="p-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: swatch.locked
                ? fg === "#ffffff"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.2)"
                : "transparent",
              color: fg,
            }}
            aria-label={swatch.locked ? "Desbloquear cor" : "Bloquear cor"}
            title={swatch.locked ? "Desblocar" : "Bloquear"}
          >
            <LockIcon locked={swatch.locked} />
          </button>
        </div>
      </div>

      {/* Locked badge */}
      {swatch.locked && (
        <div
          className="absolute top-3 right-3 p-1.5 rounded-full"
          style={{
            backgroundColor:
              fg === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)",
            color: fg,
          }}
        >
          <LockIcon locked={true} />
        </div>
      )}
    </motion.div>
  );
}

// ─── History preview ──────────────────────────────────────────────────────────

interface HistoryRowProps {
  history: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
}

function HistoryRow({ history, onRestore }: HistoryRowProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Histórico
      </p>
      <div className="flex flex-wrap gap-3">
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.button
              key={entry.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              onClick={() => onRestore(entry)}
              className="flex rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
              aria-label="Restaurar paleta"
              title="Restaurar esta paleta"
            >
              {entry.colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: hslToHex(c.h, c.s, c.l),
                    width: "28px",
                    height: "36px",
                  }}
                />
              ))}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── CSS Export Modal ─────────────────────────────────────────────────────────

interface CssModalProps {
  colors: ColorSwatch[];
  onClose: () => void;
}

function CssModal({ colors, onClose }: CssModalProps) {
  const cssText = `:root {\n${colors
    .map((c, i) => `  --color-${i + 1}: ${hslToHex(c.h, c.s, c.l)};`)
    .join("\n")}\n}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cssText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Variáveis CSS
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Fechar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <pre className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 overflow-x-auto mb-4 border border-gray-100">
          {cssText}
        </pre>

        <button
          onClick={handleCopy}
          className="w-full py-2.5 rounded-xl font-semibold text-white transition-all duration-200"
          style={{ backgroundColor: copied ? "#16a34a" : "#22c55e" }}
        >
          {copied ? "Copiado!" : "Copiar CSS"}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<ColorSwatch[]>(() =>
    generateHarmoniousPalette([], 5)
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({
    msg: "",
    visible: false,
  });
  const [showCssModal, setShowCssModal] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Show toast helper
  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 1800);
  }, []);

  // ── Generate new palette
  const generate = useCallback(() => {
    setPalette((prev) => {
      // Save current (non-empty) palette to history (max 5)
      const hasContent = prev.some((c) => c.h !== undefined);
      if (hasContent) {
        setHistory((h) =>
          [{ id: generateId(), colors: prev }, ...h].slice(0, 5)
        );
      }
      return generateHarmoniousPalette(prev, 5);
    });
  }, []);

  // ── Spacebar shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.target?.toString().includes("Button")) {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [generate]);

  // ── Copy to clipboard
  const handleCopy = useCallback(
    async (hex: string) => {
      try {
        await navigator.clipboard.writeText(hex);
        showToast(`Copiado! ${hex}`);
      } catch {
        showToast("Erro ao copiar");
      }
    },
    [showToast]
  );

  // ── Toggle lock
  const handleToggleLock = useCallback((index: number) => {
    setPalette((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  }, []);

  // ── Restore from history
  const handleRestore = useCallback((entry: HistoryEntry) => {
    setPalette(entry.colors.map((c) => ({ ...c, locked: false })));
    setHistory((h) => h.filter((e) => e.id !== entry.id));
  }, []);

  const lockedCount = palette.filter((c) => c.locked).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Header */}
      <header className="px-6 pt-10 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          Gerador de Paletas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-gray-500 text-base sm:text-lg"
        >
          Clica em{" "}
          <span className="font-semibold text-gray-700">Gerar</span> ou
          pressiona{" "}
          <kbd className="inline-flex items-center px-2 py-0.5 rounded-md border border-gray-300 bg-white text-xs font-mono text-gray-600 shadow-sm">
            Espaço
          </kbd>
        </motion.p>
      </header>

      {/* ── Palette area */}
      <main className="flex-1 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Swatches */}
        <motion.div
          layout
          className="flex flex-col sm:flex-row gap-3"
        >
          <AnimatePresence mode="popLayout">
            {palette.map((swatch, i) => (
              <Swatch
                key={`${i}-${swatch.h}-${swatch.s}-${swatch.l}`}
                swatch={swatch}
                index={i}
                onCopy={handleCopy}
                onToggleLock={handleToggleLock}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-3 mt-6"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={generate}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              style={{ backgroundColor: "#22c55e" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-5 h-5"
              >
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
              Gerar Nova Paleta
            </button>

            {lockedCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-500"
              >
                {lockedCount} cor{lockedCount > 1 ? "es" : ""} bloqueada
                {lockedCount > 1 ? "s" : ""}
              </motion.span>
            )}
          </div>

          <button
            onClick={() => setShowCssModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Exportar CSS
          </button>
        </motion.div>

        {/* History */}
        <HistoryRow history={history} onRestore={handleRestore} />

        {/* Tip */}
        <p className="text-center text-xs text-gray-400 mt-8 mb-10">
          Clica no cadeado para manter uma cor ao gerar · Clica na cor para
          copiar o hex
        </p>
      </main>

      {/* ── Toast */}
      <Toast message={toast.msg} visible={toast.visible} />

      {/* ── CSS Modal */}
      <AnimatePresence>
        {showCssModal && (
          <CssModal
            colors={palette}
            onClose={() => setShowCssModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
