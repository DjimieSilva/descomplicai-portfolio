"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Shadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

interface CSSState {
  width: number;
  height: number;
  bgColor: string;
  useGradient: boolean;
  gradientDir: string;
  gradientColor1: string;
  gradientColor2: string;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderTopLeft: number;
  borderTopRight: number;
  borderBottomRight: number;
  borderBottomLeft: number;
  borderAllLinked: boolean;
  shadows: Shadow[];
  opacity: number;
  rotate: number;
  scale: number;
  skewX: number;
  skewY: number;
  translateX: number;
  translateY: number;
  transitionDuration: number;
  textContent: string;
  fontSize: number;
  textColor: string;
  fontWeight: string;
  textAlign: string;
  backdropBlur: number;
  cursor: string;
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Record<string, Partial<CSSState>> = {
  Glassmorphism: {
    width: 240,
    height: 240,
    bgColor: "rgba(255,255,255,0.15)",
    useGradient: false,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255,255,255,0.4)",
    borderTopLeft: 16,
    borderTopRight: 16,
    borderBottomRight: 16,
    borderBottomLeft: 16,
    shadows: [
      { id: "s1", x: 0, y: 8, blur: 32, spread: 0, color: "rgba(0,0,0,0.2)", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 12,
    textContent: "Glass",
    fontSize: 24,
    textColor: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.3,
  },
  Neumorphism: {
    width: 200,
    height: 200,
    bgColor: "#e0e5ec",
    useGradient: false,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "#e0e5ec",
    borderTopLeft: 20,
    borderTopRight: 20,
    borderBottomRight: 20,
    borderBottomLeft: 20,
    shadows: [
      { id: "s1", x: 6, y: 6, blur: 12, spread: 0, color: "#a3b1c6", inset: false },
      { id: "s2", x: -6, y: -6, blur: 12, spread: 0, color: "#ffffff", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "Neu",
    fontSize: 22,
    textColor: "#4a5568",
    fontWeight: "500",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.3,
  },
  Brutalist: {
    width: 220,
    height: 140,
    bgColor: "#ffee00",
    useGradient: false,
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#000000",
    borderTopLeft: 0,
    borderTopRight: 0,
    borderBottomRight: 0,
    borderBottomLeft: 0,
    shadows: [
      { id: "s1", x: 6, y: 6, blur: 0, spread: 0, color: "#000000", inset: false },
    ],
    opacity: 1,
    rotate: -2,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "BRUTAL",
    fontSize: 28,
    textColor: "#000000",
    fontWeight: "900",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.1,
  },
  Neon: {
    width: 200,
    height: 200,
    bgColor: "#0a0a0a",
    useGradient: false,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#8b5cf6",
    borderTopLeft: 8,
    borderTopRight: 8,
    borderBottomRight: 8,
    borderBottomLeft: 8,
    shadows: [
      { id: "s1", x: 0, y: 0, blur: 20, spread: 2, color: "#8b5cf6", inset: false },
      { id: "s2", x: 0, y: 0, blur: 40, spread: 5, color: "rgba(139,92,246,0.4)", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "NEON",
    fontSize: 28,
    textColor: "#8b5cf6",
    fontWeight: "700",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.3,
  },
  Minimal: {
    width: 200,
    height: 200,
    bgColor: "#ffffff",
    useGradient: false,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderTopLeft: 8,
    borderTopRight: 8,
    borderBottomRight: 8,
    borderBottomLeft: 8,
    shadows: [
      { id: "s1", x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.08)", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "Simple",
    fontSize: 20,
    textColor: "#111827",
    fontWeight: "400",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.2,
  },
  Retro: {
    width: 240,
    height: 160,
    bgColor: "#f97316",
    useGradient: true,
    gradientDir: "135deg",
    gradientColor1: "#f97316",
    gradientColor2: "#ec4899",
    borderWidth: 3,
    borderStyle: "double",
    borderColor: "#7c3aed",
    borderTopLeft: 4,
    borderTopRight: 4,
    borderBottomRight: 4,
    borderBottomLeft: 4,
    shadows: [
      { id: "s1", x: 4, y: 4, blur: 0, spread: 0, color: "#7c3aed", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "RETRO",
    fontSize: 26,
    textColor: "#ffffff",
    fontWeight: "800",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.2,
  },
  "Gradient Card": {
    width: 260,
    height: 160,
    bgColor: "#6366f1",
    useGradient: true,
    gradientDir: "135deg",
    gradientColor1: "#6366f1",
    gradientColor2: "#ec4899",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopLeft: 16,
    borderTopRight: 16,
    borderBottomRight: 16,
    borderBottomLeft: 16,
    shadows: [
      { id: "s1", x: 0, y: 20, blur: 40, spread: -10, color: "rgba(99,102,241,0.5)", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: 0,
    backdropBlur: 0,
    textContent: "Card",
    fontSize: 24,
    textColor: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    cursor: "pointer",
    transitionDuration: 0.3,
  },
  Floating: {
    width: 200,
    height: 200,
    bgColor: "#ffffff",
    useGradient: false,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopLeft: 24,
    borderTopRight: 24,
    borderBottomRight: 24,
    borderBottomLeft: 24,
    shadows: [
      { id: "s1", x: 0, y: 10, blur: 15, spread: -3, color: "rgba(0,0,0,0.1)", inset: false },
      { id: "s2", x: 0, y: 4, blur: 6, spread: -4, color: "rgba(0,0,0,0.1)", inset: false },
    ],
    opacity: 1,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    translateX: 0,
    translateY: -8,
    backdropBlur: 0,
    textContent: "Float",
    fontSize: 22,
    textColor: "#374151",
    fontWeight: "500",
    textAlign: "center",
    cursor: "default",
    transitionDuration: 0.4,
  },
};

// ─── Default State ────────────────────────────────────────────────────────────

const DEFAULT_STATE: CSSState = {
  width: 200,
  height: 200,
  bgColor: "#3b82f6",
  useGradient: false,
  gradientDir: "to right",
  gradientColor1: "#3b82f6",
  gradientColor2: "#8b5cf6",
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: "#000000",
  borderTopLeft: 0,
  borderTopRight: 0,
  borderBottomRight: 0,
  borderBottomLeft: 0,
  borderAllLinked: true,
  shadows: [],
  opacity: 1,
  rotate: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0,
  transitionDuration: 0.3,
  textContent: "",
  fontSize: 16,
  textColor: "#ffffff",
  fontWeight: "400",
  textAlign: "center",
  backdropBlur: 0,
  cursor: "default",
};

// ─── Helper Components ────────────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-xs text-zinc-300 font-mono">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-violet-500 bg-zinc-700"
      />
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-zinc-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-300 font-mono">{value}</span>
        <input
          type="color"
          value={value.startsWith("rgba") ? "#888888" : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0"
        />
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-violet-400 pt-3 pb-1 border-t border-zinc-800">
      {children}
    </h3>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CSSPlayground() {
  const [css, setCss] = useState<CSSState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const update = useCallback(<K extends keyof CSSState>(key: K, value: CSSState[K]) => {
    setCss((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  const addShadow = () => {
    const newShadow: Shadow = {
      id: Math.random().toString(36).slice(2),
      x: 0,
      y: 4,
      blur: 8,
      spread: 0,
      color: "rgba(0,0,0,0.3)",
      inset: false,
    };
    update("shadows", [...css.shadows, newShadow]);
  };

  const removeShadow = (id: string) => {
    update("shadows", css.shadows.filter((s) => s.id !== id));
  };

  const updateShadow = (id: string, key: keyof Shadow, value: Shadow[keyof Shadow]) => {
    update(
      "shadows",
      css.shadows.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  const applyPreset = (name: string) => {
    const preset = PRESETS[name];
    setActivePreset(name);
    setCss((prev) => ({ ...prev, ...preset, borderAllLinked: true }));
  };

  // ─── Computed CSS values ────────────────────────────────────────────────────

  const computedBackground = css.useGradient
    ? `linear-gradient(${css.gradientDir}, ${css.gradientColor1}, ${css.gradientColor2})`
    : css.bgColor;

  const computedBorderRadius = `${css.borderTopLeft}% ${css.borderTopRight}% ${css.borderBottomRight}% ${css.borderBottomLeft}%`;

  const computedBoxShadow = css.shadows.length
    ? css.shadows
        .map((s) => `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
        .join(", ")
    : "none";

  const computedTransform = [
    css.rotate !== 0 ? `rotate(${css.rotate}deg)` : "",
    css.scale !== 1 ? `scale(${css.scale})` : "",
    css.skewX !== 0 ? `skewX(${css.skewX}deg)` : "",
    css.skewY !== 0 ? `skewY(${css.skewY}deg)` : "",
    css.translateX !== 0 || css.translateY !== 0 ? `translate(${css.translateX}px, ${css.translateY}px)` : "",
  ]
    .filter(Boolean)
    .join(" ") || "none";

  const computedBackdropFilter = css.backdropBlur > 0 ? `blur(${css.backdropBlur}px)` : "none";

  // ─── CSS Output String ──────────────────────────────────────────────────────

  const cssOutput = useMemo(() => {
    const lines: string[] = [".my-element {"];
    lines.push(`  width: ${css.width}px;`);
    lines.push(`  height: ${css.height}px;`);
    if (css.useGradient) {
      lines.push(`  background: linear-gradient(${css.gradientDir}, ${css.gradientColor1}, ${css.gradientColor2});`);
    } else {
      lines.push(`  background: ${css.bgColor};`);
    }
    if (css.borderWidth > 0) {
      lines.push(`  border: ${css.borderWidth}px ${css.borderStyle} ${css.borderColor};`);
    }
    const br = `${css.borderTopLeft}% ${css.borderTopRight}% ${css.borderBottomRight}% ${css.borderBottomLeft}%`;
    if (br !== "0% 0% 0% 0%") {
      lines.push(`  border-radius: ${br};`);
    }
    if (css.shadows.length > 0) {
      lines.push(`  box-shadow: ${computedBoxShadow};`);
    }
    if (css.opacity < 1) {
      lines.push(`  opacity: ${css.opacity};`);
    }
    if (computedTransform !== "none") {
      lines.push(`  transform: ${computedTransform};`);
    }
    lines.push(`  transition: all ${css.transitionDuration}s ease;`);
    if (css.backdropBlur > 0) {
      lines.push(`  backdrop-filter: blur(${css.backdropBlur}px);`);
      lines.push(`  -webkit-backdrop-filter: blur(${css.backdropBlur}px);`);
    }
    if (css.cursor !== "default") {
      lines.push(`  cursor: ${css.cursor};`);
    }
    if (css.textContent) {
      lines.push(`  font-size: ${css.fontSize}px;`);
      lines.push(`  color: ${css.textColor};`);
      lines.push(`  font-weight: ${css.fontWeight};`);
      lines.push(`  text-align: ${css.textAlign};`);
      lines.push(`  display: flex;`);
      lines.push(`  align-items: center;`);
      lines.push(`  justify-content: center;`);
    }
    lines.push("}");
    return lines.join("\n");
  }, [css, computedBoxShadow, computedTransform]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const divStyle: React.CSSProperties = {
    width: css.width,
    height: css.height,
    background: computedBackground,
    border: css.borderWidth > 0 ? `${css.borderWidth}px ${css.borderStyle} ${css.borderColor}` : "none",
    borderRadius: computedBorderRadius,
    boxShadow: computedBoxShadow,
    opacity: css.opacity,
    transform: computedTransform === "none" ? undefined : computedTransform,
    transition: `all ${css.transitionDuration}s ease`,
    backdropFilter: computedBackdropFilter,
    WebkitBackdropFilter: computedBackdropFilter,
    cursor: css.cursor as React.CSSProperties["cursor"],
    fontSize: css.textContent ? css.fontSize : undefined,
    color: css.textContent ? css.textColor : undefined,
    fontWeight: css.textContent ? css.fontWeight as React.CSSProperties["fontWeight"] : undefined,
    textAlign: css.textContent ? css.textAlign as React.CSSProperties["textAlign"] : undefined,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    flexShrink: 0,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-white">CSS Playground</h1>
          <p className="text-xs text-zinc-500">Experimenta propriedades CSS em tempo real</p>
        </div>
        <span className="text-xs text-zinc-600 hidden sm:block">Descomplicai</span>
      </header>

      {/* Presets Bar */}
      <div className="border-b border-zinc-800 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none">
        {Object.keys(PRESETS).map((name) => (
          <motion.button
            key={name}
            onClick={() => applyPreset(name)}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activePreset === name
                ? "bg-violet-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {name}
          </motion.button>
        ))}
        <button
          onClick={() => { setCss(DEFAULT_STATE); setActivePreset(null); }}
          className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors border border-zinc-800"
        >
          Reset
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Controls Panel */}
        <aside className="w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-zinc-800 overflow-y-auto p-4 flex flex-col gap-3 max-h-[50vh] lg:max-h-none">

          {/* Dimensions */}
          <SectionTitle>Dimensões</SectionTitle>
          <Slider label="Width" value={css.width} min={50} max={500} unit="px" onChange={(v) => update("width", v)} />
          <Slider label="Height" value={css.height} min={50} max={500} unit="px" onChange={(v) => update("height", v)} />

          {/* Background */}
          <SectionTitle>Background</SectionTitle>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Usar gradiente</span>
            <button
              onClick={() => update("useGradient", !css.useGradient)}
              className={`w-10 h-5 rounded-full transition-colors relative ${css.useGradient ? "bg-violet-600" : "bg-zinc-700"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${css.useGradient ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          {css.useGradient ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-400">Direção</span>
                <select
                  value={css.gradientDir}
                  onChange={(e) => update("gradientDir", e.target.value)}
                  className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 border border-zinc-700"
                >
                  {["to right", "to left", "to bottom", "to top", "135deg", "45deg", "225deg", "315deg"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <ColorPicker label="Cor 1" value={css.gradientColor1} onChange={(v) => update("gradientColor1", v)} />
              <ColorPicker label="Cor 2" value={css.gradientColor2} onChange={(v) => update("gradientColor2", v)} />
            </>
          ) : (
            <ColorPicker label="Cor de fundo" value={css.bgColor} onChange={(v) => update("bgColor", v)} />
          )}

          {/* Border */}
          <SectionTitle>Border</SectionTitle>
          <Slider label="Largura" value={css.borderWidth} min={0} max={20} unit="px" onChange={(v) => update("borderWidth", v)} />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-400">Estilo</span>
            <select
              value={css.borderStyle}
              onChange={(e) => update("borderStyle", e.target.value)}
              className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 border border-zinc-700"
            >
              {["solid", "dashed", "dotted", "double", "groove", "ridge"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <ColorPicker label="Cor" value={css.borderColor} onChange={(v) => update("borderColor", v)} />

          {/* Border Radius */}
          <SectionTitle>Border-radius</SectionTitle>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Ligar todos</span>
            <button
              onClick={() => update("borderAllLinked", !css.borderAllLinked)}
              className={`w-10 h-5 rounded-full transition-colors relative ${css.borderAllLinked ? "bg-violet-600" : "bg-zinc-700"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${css.borderAllLinked ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          {css.borderAllLinked ? (
            <Slider
              label="Todos os cantos"
              value={css.borderTopLeft}
              min={0}
              max={50}
              unit="%"
              onChange={(v) => setCss((p) => ({ ...p, borderTopLeft: v, borderTopRight: v, borderBottomRight: v, borderBottomLeft: v }))}
            />
          ) : (
            <>
              <Slider label="Top-left" value={css.borderTopLeft} min={0} max={50} unit="%" onChange={(v) => update("borderTopLeft", v)} />
              <Slider label="Top-right" value={css.borderTopRight} min={0} max={50} unit="%" onChange={(v) => update("borderTopRight", v)} />
              <Slider label="Bottom-right" value={css.borderBottomRight} min={0} max={50} unit="%" onChange={(v) => update("borderBottomRight", v)} />
              <Slider label="Bottom-left" value={css.borderBottomLeft} min={0} max={50} unit="%" onChange={(v) => update("borderBottomLeft", v)} />
            </>
          )}

          {/* Box Shadow */}
          <SectionTitle>Box-shadow</SectionTitle>
          {css.shadows.map((shadow, i) => (
            <div key={shadow.id} className="bg-zinc-900 rounded-lg p-3 flex flex-col gap-2 border border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400 font-medium">Sombra {i + 1}</span>
                <button onClick={() => removeShadow(shadow.id)} className="text-zinc-500 hover:text-red-400 text-xs transition-colors">✕</button>
              </div>
              <Slider label="X" value={shadow.x} min={-50} max={50} unit="px" onChange={(v) => updateShadow(shadow.id, "x", v)} />
              <Slider label="Y" value={shadow.y} min={-50} max={50} unit="px" onChange={(v) => updateShadow(shadow.id, "y", v)} />
              <Slider label="Blur" value={shadow.blur} min={0} max={60} unit="px" onChange={(v) => updateShadow(shadow.id, "blur", v)} />
              <Slider label="Spread" value={shadow.spread} min={-20} max={20} unit="px" onChange={(v) => updateShadow(shadow.id, "spread", v)} />
              <ColorPicker label="Cor" value={shadow.color} onChange={(v) => updateShadow(shadow.id, "color", v)} />
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Inset</span>
                <button
                  onClick={() => updateShadow(shadow.id, "inset", !shadow.inset)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${shadow.inset ? "bg-violet-600" : "bg-zinc-700"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${shadow.inset ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addShadow}
            className="text-xs text-violet-400 border border-violet-900 hover:border-violet-600 hover:bg-violet-950 rounded-lg py-2 transition-colors"
          >
            + Adicionar sombra
          </button>

          {/* Opacity */}
          <SectionTitle>Opacidade</SectionTitle>
          <Slider label="Opacity" value={css.opacity} min={0} max={1} step={0.01} onChange={(v) => update("opacity", v)} />

          {/* Transform */}
          <SectionTitle>Transform</SectionTitle>
          <Slider label="Rotate" value={css.rotate} min={0} max={360} unit="°" onChange={(v) => update("rotate", v)} />
          <Slider label="Scale" value={css.scale} min={0.1} max={3} step={0.05} onChange={(v) => update("scale", v)} />
          <Slider label="SkewX" value={css.skewX} min={-45} max={45} unit="°" onChange={(v) => update("skewX", v)} />
          <Slider label="SkewY" value={css.skewY} min={-45} max={45} unit="°" onChange={(v) => update("skewY", v)} />
          <Slider label="TranslateX" value={css.translateX} min={-150} max={150} unit="px" onChange={(v) => update("translateX", v)} />
          <Slider label="TranslateY" value={css.translateY} min={-150} max={150} unit="px" onChange={(v) => update("translateY", v)} />

          {/* Transition */}
          <SectionTitle>Transition</SectionTitle>
          <Slider label="Duration" value={css.transitionDuration} min={0} max={2} step={0.05} unit="s" onChange={(v) => update("transitionDuration", v)} />

          {/* Text */}
          <SectionTitle>Texto</SectionTitle>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-400">Conteúdo</span>
            <input
              type="text"
              value={css.textContent}
              onChange={(e) => update("textContent", e.target.value)}
              placeholder="Texto no div..."
              className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 border border-zinc-700 outline-none focus:border-violet-500"
            />
          </div>
          <Slider label="Font-size" value={css.fontSize} min={8} max={72} unit="px" onChange={(v) => update("fontSize", v)} />
          <ColorPicker label="Cor do texto" value={css.textColor} onChange={(v) => update("textColor", v)} />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-400">Font-weight</span>
            <select
              value={css.fontWeight}
              onChange={(e) => update("fontWeight", e.target.value)}
              className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 border border-zinc-700"
            >
              {["100", "200", "300", "400", "500", "600", "700", "800", "900"].map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-400">Text-align</span>
            <div className="flex gap-1">
              {["left", "center", "right"].map((a) => (
                <button
                  key={a}
                  onClick={() => update("textAlign", a)}
                  className={`flex-1 py-1 rounded text-xs transition-colors ${css.textAlign === a ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Effects */}
          <SectionTitle>Efeitos</SectionTitle>
          <Slider label="Backdrop-blur" value={css.backdropBlur} min={0} max={40} unit="px" onChange={(v) => update("backdropBlur", v)} />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-400">Cursor</span>
            <select
              value={css.cursor}
              onChange={(e) => update("cursor", e.target.value)}
              className="bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 border border-zinc-700"
            >
              {[
                "default", "pointer", "crosshair", "move", "grab", "grabbing",
                "not-allowed", "zoom-in", "zoom-out", "text", "wait", "progress",
              ].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="h-4" />
        </aside>

        {/* Preview + Output */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Live Preview */}
          <div className="flex-1 flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,_#1a1a2e_0%,_#0a0a0a_100%)] min-h-[300px] relative overflow-hidden">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activePreset ?? "custom"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={divStyle}
              >
                {css.textContent}
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-3 right-3 text-xs text-zinc-700 font-mono">
              {css.width} × {css.height}
            </span>
          </div>

          {/* CSS Output */}
          <div className="border-t border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">CSS gerado</span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  copied
                    ? "bg-green-700 text-green-100"
                    : "bg-violet-700 hover:bg-violet-600 text-white"
                }`}
              >
                {copied ? "✓ Copiado!" : "Copiar CSS"}
              </button>
            </div>
            <textarea
              readOnly
              value={cssOutput}
              className="w-full h-40 bg-zinc-950 text-zinc-300 text-xs font-mono p-4 resize-none outline-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
