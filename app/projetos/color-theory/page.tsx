"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Color Math ──────────────────────────────────────────────────────────────

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const rp = r / 255, gp = g / 255, bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  const c = (1 - rp - k) / (1 - k);
  const m = (1 - gp - k) / (1 - k);
  const y = (1 - bp - k) / (1 - k);
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function hueToHex(hue: number): string {
  const [r, g, b] = hslToRgb(hue, 100, 50);
  return rgbToHex(r, g, b);
}

function mixWithWhite(r: number, g: number, b: number, t: number): string {
  return rgbToHex(
    Math.round(r + (255 - r) * t),
    Math.round(g + (255 - g) * t),
    Math.round(b + (255 - b) * t)
  );
}

function mixWithBlack(r: number, g: number, b: number, t: number): string {
  return rgbToHex(Math.round(r * (1 - t)), Math.round(g * (1 - t)), Math.round(b * (1 - t)));
}

function getLuminance(r: number, g: number, b: number): number {
  const toLinear = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Simulate color blindness (Brettel algorithm approximation)
function simulateProtanopia(r: number, g: number, b: number): [number, number, number] {
  const rr = 0.567 * r + 0.433 * g;
  const gr = 0.558 * r + 0.442 * g;
  const br = 0.242 * g + 0.758 * b;
  return [Math.round(Math.min(255, rr)), Math.round(Math.min(255, gr)), Math.round(Math.min(255, br))];
}

function simulateDeuteranopia(r: number, g: number, b: number): [number, number, number] {
  const rr = 0.625 * r + 0.375 * g;
  const gr = 0.7 * r + 0.3 * g;
  const br = 0.3 * g + 0.7 * b;
  return [Math.round(Math.min(255, rr)), Math.round(Math.min(255, gr)), Math.round(Math.min(255, br))];
}

function simulateTritanopia(r: number, g: number, b: number): [number, number, number] {
  const rr = 0.95 * r + 0.05 * g;
  const gr = 0.433 * g + 0.567 * b;
  const br = 0.475 * g + 0.525 * b;
  return [Math.round(Math.min(255, rr)), Math.round(Math.min(255, gr)), Math.round(Math.min(255, br))];
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ColorInfo {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
  cmyk: [number, number, number, number];
}

interface Harmony {
  name: string;
  colors: string[];
  description: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WHEEL_SIZE = 280;
const WHEEL_CENTER = WHEEL_SIZE / 2;
const WHEEL_RADIUS = WHEEL_SIZE / 2 - 4;
const INNER_RADIUS = WHEEL_SIZE / 2 - 36;
const DOT_RADIUS = 10;

// ─── Components ───────────────────────────────────────────────────────────────

function ColorWheel({
  selectedHue,
  harmonies,
  onSelect,
}: {
  selectedHue: number;
  harmonies: Harmony[];
  onSelect: (hue: number) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxR = (rect.width / 2) * (WHEEL_RADIUS / WHEEL_CENTER);
      const minR = (rect.width / 2) * (INNER_RADIUS / WHEEL_CENTER);
      if (dist < minR * 0.6 || dist > maxR * 1.15) return;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;
      onSelect(Math.round(angle) % 360);
    },
    [onSelect]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons !== 1) return;
      handleInteraction(e.clientX, e.clientY);
    },
    [handleInteraction]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    },
    [handleInteraction]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    },
    [handleInteraction]
  );

  // Build wheel segments
  const segments: React.ReactNode[] = [];
  const SEG = 360;
  for (let i = 0; i < SEG; i++) {
    const angle1 = (i / SEG) * 2 * Math.PI - Math.PI / 2;
    const angle2 = ((i + 1.2) / SEG) * 2 * Math.PI - Math.PI / 2;
    const x1 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(angle1);
    const y1 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(angle1);
    const x2 = WHEEL_CENTER + INNER_RADIUS * Math.cos(angle1);
    const y2 = WHEEL_CENTER + INNER_RADIUS * Math.sin(angle1);
    const x3 = WHEEL_CENTER + INNER_RADIUS * Math.cos(angle2);
    const y3 = WHEEL_CENTER + INNER_RADIUS * Math.sin(angle2);
    const x4 = WHEEL_CENTER + WHEEL_RADIUS * Math.cos(angle2);
    const y4 = WHEEL_CENTER + WHEEL_RADIUS * Math.sin(angle2);
    segments.push(
      <path
        key={i}
        d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4}Z`}
        fill={`hsl(${i}, 100%, 50%)`}
      />
    );
  }

  // Harmony dots with connecting lines
  const allHarmonyHues = harmonies.flatMap((h) =>
    h.colors.map((hex) => {
      const [r, g, b] = hexToRgb(hex);
      const [hue] = rgbToHsl(r, g, b);
      return hue;
    })
  );

  const dotPos = (hue: number, r = (WHEEL_RADIUS + INNER_RADIUS) / 2) => {
    const angle = (hue / 360) * 2 * Math.PI - Math.PI / 2;
    return {
      x: WHEEL_CENTER + r * Math.cos(angle),
      y: WHEEL_CENTER + r * Math.sin(angle),
    };
  };

  const selectedPos = dotPos(selectedHue);

  return (
    <svg
      ref={svgRef}
      width={WHEEL_SIZE}
      height={WHEEL_SIZE}
      viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
      className="cursor-crosshair select-none touch-none"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Wheel ring */}
      {segments}

      {/* Inner white circle */}
      <circle
        cx={WHEEL_CENTER}
        cy={WHEEL_CENTER}
        r={INNER_RADIUS - 2}
        fill="white"
        stroke="#f0f0f0"
        strokeWidth={1}
      />

      {/* Selected color in center */}
      <circle
        cx={WHEEL_CENTER}
        cy={WHEEL_CENTER}
        r={INNER_RADIUS - 14}
        fill={hueToHex(selectedHue)}
      />

      {/* Harmony connecting lines */}
      {harmonies.slice(0, 1).map((harmony) => {
        const positions = harmony.colors.map((hex) => {
          const [r, g, b] = hexToRgb(hex);
          const [hue] = rgbToHsl(r, g, b);
          return dotPos(hue);
        });
        const allPos = [selectedPos, ...positions];
        return allPos.map((p, i) => {
          if (i === 0) return null;
          return (
            <line
              key={`line-${i}`}
              x1={allPos[0].x}
              y1={allPos[0].y}
              x2={p.x}
              y2={p.y}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={1.5}
              strokeDasharray="4,3"
            />
          );
        });
      })}

      {/* Harmony dots */}
      {allHarmonyHues.map((hue, i) => {
        const pos = dotPos(hue);
        return (
          <circle
            key={`hdot-${i}`}
            cx={pos.x}
            cy={pos.y}
            r={DOT_RADIUS - 3}
            fill={hueToHex(hue)}
            stroke="white"
            strokeWidth={2}
          />
        );
      })}

      {/* Selected dot */}
      <circle
        cx={selectedPos.x}
        cy={selectedPos.y}
        r={DOT_RADIUS}
        fill={hueToHex(selectedHue)}
        stroke="white"
        strokeWidth={3}
      />
      <circle
        cx={selectedPos.x}
        cy={selectedPos.y}
        r={DOT_RADIUS + 3}
        fill="none"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
    }
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-mono text-gray-700 group"
      title={`Copiar ${label}`}
    >
      <span className="text-gray-500 text-xs uppercase tracking-wider font-sans font-semibold w-12 shrink-0">
        {label}
      </span>
      <span className="truncate">{value}</span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-green-500 shrink-0"
          >
            ✓
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="shrink-0"
          >
            ⧉
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function ColorSwatch({
  hex,
  label,
  small,
  onClick,
  active,
}: {
  hex: string;
  label?: string;
  small?: boolean;
  onClick?: () => void;
  active?: boolean;
}) {
  const size = small ? "w-9 h-9" : "w-12 h-12";
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${size} rounded-xl shadow-sm cursor-pointer border-2 transition-all ${
          active ? "border-gray-800 shadow-md" : "border-white"
        }`}
        style={{ backgroundColor: hex }}
        onClick={onClick}
        title={hex}
      />
      {label && (
        <span className="text-[10px] text-gray-500 font-mono uppercase">{label}</span>
      )}
    </div>
  );
}

function Section({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        {accent && (
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
        )}
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ColorTheoryPage() {
  const [selectedHue, setSelectedHue] = useState(220);
  const [selectedSaturation, setSelectedSaturation] = useState(80);
  const [selectedLightness, setSelectedLightness] = useState(55);
  const [history, setHistory] = useState<string[]>([]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const [activeHarmony, setActiveHarmony] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  // Derived color info
  const [r, g, b] = hslToRgb(selectedHue, selectedSaturation, selectedLightness);
  const hex = rgbToHex(r, g, b);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);

  const colorInfo: ColorInfo = {
    hex,
    rgb: [r, g, b],
    hsl: [h, s, l],
    cmyk: [c, m, y, k],
  };

  // Update history when color changes
  useEffect(() => {
    setHistory((prev) => {
      if (prev[0] === hex) return prev;
      return [hex, ...prev.filter((c) => c !== hex)].slice(0, 10);
    });
  }, [hex]);

  // Harmonies
  const harmonies: Harmony[] = [
    {
      name: "Complementar",
      description: "Oposto na roda — máximo contraste",
      colors: [hueToHex((selectedHue + 180) % 360)],
    },
    {
      name: "Análogas",
      description: "±30° — harmonia natural",
      colors: [
        hueToHex((selectedHue + 30) % 360),
        hueToHex((selectedHue - 30 + 360) % 360),
      ],
    },
    {
      name: "Triádica",
      description: "120° de distância — vibração equilibrada",
      colors: [
        hueToHex((selectedHue + 120) % 360),
        hueToHex((selectedHue + 240) % 360),
      ],
    },
    {
      name: "Tetrádica",
      description: "Retângulo — 4 cores ricas",
      colors: [
        hueToHex((selectedHue + 90) % 360),
        hueToHex((selectedHue + 180) % 360),
        hueToHex((selectedHue + 270) % 360),
      ],
    },
    {
      name: "Split-Complementar",
      description: "Complementar dividido — mais suave",
      colors: [
        hueToHex((selectedHue + 150) % 360),
        hueToHex((selectedHue + 210) % 360),
      ],
    },
  ];

  // Tints & Shades
  const tints = Array.from({ length: 10 }, (_, i) =>
    mixWithWhite(r, g, b, i / 9)
  );
  const shades = Array.from({ length: 10 }, (_, i) =>
    mixWithBlack(r, g, b, i / 9)
  );

  // Contrast
  const contrastRatio = getContrastRatio(textColor, bgColor);
  const passAA = contrastRatio >= 4.5;
  const passAAA = contrastRatio >= 7;
  const passAALarge = contrastRatio >= 3;

  // Color blindness
  const [pr, pg, pb] = simulateProtanopia(r, g, b);
  const [dr, dg, db] = simulateDeuteranopia(r, g, b);
  const [tr, tg, tb] = simulateTritanopia(r, g, b);

  const handleWheelSelect = useCallback((hue: number) => {
    setSelectedHue(hue);
  }, []);

  const handleHistorySelect = useCallback((histHex: string) => {
    const [hr, hg, hb] = hexToRgb(histHex);
    const [hh, hs, hl] = rgbToHsl(hr, hg, hb);
    setSelectedHue(hh);
    setSelectedSaturation(hs);
    setSelectedLightness(hl);
  }, []);

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      //
    }
  }, []);

  const textIsDark = getLuminance(...hexToRgb(hex)) > 0.4;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full shadow-sm transition-colors duration-300"
              style={{ backgroundColor: hex }}
            />
            <h1 className="font-semibold text-gray-800 text-base">
              Teoria da Cor
            </h1>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-400">Descomplicai</span>
          </div>
          <span
            className="text-sm font-mono font-semibold px-3 py-1 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: hex, color: textIsDark ? "#1a1a1a" : "#ffffff" }}
          >
            {hex}
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Top row: Wheel + Color Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color Wheel */}
          <Section title="Roda Cromática" accent={hex}>
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ColorWheel
                  selectedHue={selectedHue}
                  harmonies={[harmonies[activeHarmony]]}
                  onSelect={handleWheelSelect}
                />
              </motion.div>
              {/* Saturation + Lightness sliders */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 shrink-0">Saturação</span>
                  <div className="relative flex-1">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to right, hsl(${selectedHue},0%,${selectedLightness}%), hsl(${selectedHue},100%,${selectedLightness}%))`,
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={selectedSaturation}
                      onChange={(e) => setSelectedSaturation(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer h-4"
                    />
                    <div
                      className="absolute top-0 bottom-0 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
                      style={{
                        left: `calc(${selectedSaturation}% - 8px)`,
                        backgroundColor: `hsl(${selectedHue},${selectedSaturation}%,${selectedLightness}%)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-600 w-8 text-right">{selectedSaturation}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 shrink-0">Luminosidade</span>
                  <div className="relative flex-1">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to right, #000, hsl(${selectedHue},${selectedSaturation}%,50%), #fff)`,
                      }}
                    />
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={selectedLightness}
                      onChange={(e) => setSelectedLightness(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer h-4"
                    />
                    <div
                      className="absolute top-0 bottom-0 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
                      style={{
                        left: `calc(${((selectedLightness - 5) / 90) * 100}% - 8px)`,
                        backgroundColor: `hsl(${selectedHue},${selectedSaturation}%,${selectedLightness}%)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-600 w-8 text-right">{selectedLightness}%</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Color Info */}
          <Section title="Informações da Cor" accent={hex}>
            {/* Large swatch */}
            <motion.div
              className="w-full h-28 rounded-xl mb-4 shadow-inner flex items-end p-3"
              animate={{ backgroundColor: hex }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="text-2xl font-bold font-mono tracking-wider"
                style={{ color: textIsDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)" }}
              >
                {hex}
              </span>
            </motion.div>

            {/* Values */}
            <div className="space-y-2">
              <CopyButton value={colorInfo.hex} label="HEX" />
              <CopyButton
                value={`rgb(${r}, ${g}, ${b})`}
                label="RGB"
              />
              <CopyButton
                value={`hsl(${h}, ${s}%, ${l}%)`}
                label="HSL"
              />
              <CopyButton
                value={`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`}
                label="CMYK"
              />
            </div>

            {/* HSL manual input */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Inserir matiz (0–360)</p>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={0}
                  max={359}
                  value={selectedHue}
                  onChange={(e) => setSelectedHue(Math.min(359, Math.max(0, Number(e.target.value))))}
                  className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div
                  className="flex-1 h-8 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, ${Array.from({ length: 7 }, (_, i) => `hsl(${i * 60}, 100%, 50%)`).join(",")})`,
                  }}
                />
              </div>
            </div>
          </Section>
        </div>

        {/* Harmonies */}
        <Section title="Harmonias" accent={hex}>
          {/* Harmony tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {harmonies.map((h, i) => (
              <button
                key={i}
                onClick={() => setActiveHarmony(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeHarmony === i
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  activeHarmony === i
                    ? { backgroundColor: hex }
                    : {}
                }
              >
                {h.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeHarmony}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-gray-500 mb-4">
                {harmonies[activeHarmony].description}
              </p>
              <div className="flex flex-wrap gap-4 items-end">
                <ColorSwatch hex={hex} label="Base" active />
                {harmonies[activeHarmony].colors.map((c, i) => (
                  <ColorSwatch
                    key={i}
                    hex={c}
                    label={`H${i + 1}`}
                    onClick={() => {
                      const [hr, hg, hb] = hexToRgb(c);
                      const [hh, hs, hl] = rgbToHsl(hr, hg, hb);
                      setSelectedHue(hh);
                      setSelectedSaturation(hs);
                      setSelectedLightness(hl);
                    }}
                  />
                ))}
              </div>
              {/* Color codes for harmony colors */}
              <div className="mt-4 flex flex-wrap gap-2">
                {harmonies[activeHarmony].colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(c, `harmony-${i}`)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-mono text-gray-600"
                  >
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
                    {c}
                    {copied === `harmony-${i}` && (
                      <span className="text-green-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Section>

        {/* Tints & Shades */}
        <Section title="Tints & Shades" accent={hex}>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                Tints (para branco)
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {tints.map((t, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: t }}
                    onClick={() => copyToClipboard(t, `tint-${i}`)}
                    title={t}
                  >
                    {copied === `tint-${i}` && (
                      <span className="text-[9px] font-bold" style={{ color: "#333" }}>✓</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                Shades (para preto)
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {shades.map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: s }}
                    onClick={() => copyToClipboard(s, `shade-${i}`)}
                    title={s}
                  >
                    {copied === `shade-${i}` && (
                      <span className="text-[9px] font-bold text-white">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Contrast Checker */}
        <Section title="Verificador de Contraste WCAG" accent={hex}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5">
                  Cor do Texto
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value.toUpperCase())}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value.toUpperCase())}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="#000000"
                  />
                  <button
                    className="px-2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 transition-colors"
                    onClick={() => setTextColor(hex)}
                  >
                    Usar
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5">
                  Cor de Fundo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="#FFFFFF"
                  />
                  <button
                    className="px-2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 transition-colors"
                    onClick={() => setBgColor(hex)}
                  >
                    Usar
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Preview */}
              <div
                className="rounded-xl p-4 transition-colors duration-300"
                style={{ backgroundColor: bgColor }}
              >
                <p className="text-lg font-bold mb-1" style={{ color: textColor }}>
                  Texto Grande (18pt+)
                </p>
                <p className="text-sm" style={{ color: textColor }}>
                  Texto normal de amostra para verificar legibilidade.
                </p>
              </div>

              {/* WCAG results */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "AA Normal", pass: passAA, req: "4.5:1" },
                  { label: "AAA Normal", pass: passAAA, req: "7:1" },
                  { label: "AA Grande", pass: passAALarge, req: "3:1" },
                ].map(({ label, pass, req }) => (
                  <div
                    key={label}
                    className={`rounded-xl p-2.5 text-center border-2 transition-all ${
                      pass
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-600"
                    }`}
                  >
                    <div className="text-lg font-bold">{pass ? "✓" : "✗"}</div>
                    <div className="text-xs font-semibold">{label}</div>
                    <div className="text-xs opacity-70">{req}</div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <span className="text-2xl font-bold font-mono" style={{ color: hex }}>
                  {contrastRatio.toFixed(2)}
                </span>
                <span className="text-gray-400 text-sm">:1 rácio de contraste</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Color Blindness Preview */}
        <Section title="Simulação de Daltonismo" accent={hex}>
          <p className="text-sm text-gray-500 mb-4">
            Como a cor selecionada é percebida por diferentes tipos de visão.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Normal", r, g, b, note: "Visão completa" },
              {
                label: "Protanopia",
                r: pr,
                g: pg,
                b: pb,
                note: "Sem vermelho",
              },
              {
                label: "Deuteranopia",
                r: dr,
                g: dg,
                b: db,
                note: "Sem verde",
              },
              {
                label: "Tritanopia",
                r: tr,
                g: tg,
                b: tb,
                note: "Sem azul",
              },
            ].map(({ label, r: cr, g: cg, b: cb, note }) => {
              const simHex = rgbToHex(cr, cg, cb);
              return (
                <motion.div
                  key={label}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    className="w-full h-20 rounded-xl shadow-sm border border-gray-100"
                    animate={{ backgroundColor: simHex }}
                    transition={{ duration: 0.3 }}
                  />
                  <p className="text-sm font-semibold text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400 text-center">{note}</p>
                  <p className="text-xs font-mono text-gray-500">{simHex}</p>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* History */}
        <Section title="Histórico" accent={hex}>
          {history.length === 0 ? (
            <p className="text-sm text-gray-400">
              Ainda não há cores no histórico. Clique na roda para selecionar!
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {history.map((histHex) => (
                  <motion.div
                    key={histHex}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl border-2 shadow-sm transition-all ${
                        histHex === hex ? "border-gray-800 shadow-md" : "border-white"
                      }`}
                      style={{ backgroundColor: histHex }}
                      onClick={() => handleHistorySelect(histHex)}
                      title={histHex}
                    />
                    <span className="text-[9px] font-mono text-gray-400 uppercase">
                      {histHex}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </Section>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-gray-400">
          Descomplicai — Teoria da Cor · Clique na roda para explorar
        </div>
      </main>
    </div>
  );
}
