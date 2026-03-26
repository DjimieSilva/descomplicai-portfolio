"use client";

import { useState, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type VisionMode = "normal" | "protanopia" | "deuteranopia" | "tritanopia";

interface ModeConfig {
  id: VisionMode;
  label: string;
  description: string;
  icon: string;
  accent: string;
  // SVG feColorMatrix values — row-major, 4×5 (RGBA + bias)
  matrix: string;
}

// ─── Vision Mode Data ─────────────────────────────────────────────────────────
// Matrices sourced from established color-blindness research
// (Brettel, Viénot, Mollon 1997 + Machado 2009 approximations)

const MODES: ModeConfig[] = [
  {
    id: "normal",
    label: "Normal",
    description: "Visão cromática completa — todos os fotorreceptores funcionam",
    icon: "👁️",
    accent: "#6366f1",
    matrix:
      "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0",
  },
  {
    id: "protanopia",
    label: "Protanopia",
    description: "Ausência de fotorreceptores vermelhos (cone L). Afeta ~1% dos homens.",
    icon: "🔴",
    accent: "#ef4444",
    matrix:
      "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0",
  },
  {
    id: "deuteranopia",
    label: "Deuteranopia",
    description: "Ausência de fotorreceptores verdes (cone M). A mais comum — ~6% dos homens.",
    icon: "🟢",
    accent: "#22c55e",
    matrix:
      "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0",
  },
  {
    id: "tritanopia",
    label: "Tritanopia",
    description: "Ausência de fotorreceptores azuis (cone S). Rara — afeta <0.01% da população.",
    icon: "🔵",
    accent: "#3b82f6",
    matrix:
      "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0",
  },
];

// ─── Ishihara Dot Generator ───────────────────────────────────────────────────

interface IshiharaDot {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

function generateIshiharaPlate(digit: string): IshiharaDot[] {
  // Digit "5" pixel map on a 7×9 grid
  const DIGIT_MAPS: Record<string, number[][]> = {
    "5": [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    "8": [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
  };

  const map = DIGIT_MAPS[digit] || DIGIT_MAPS["5"];
  const dots: IshiharaDot[] = [];

  // Background dot colors (greens/browns for protanopia confusion)
  const bgColors = ["#8B7355", "#A0856C", "#9E8060", "#7A6248", "#6B5344", "#C4A882", "#B89A72"];
  // Foreground (digit) colors (reds/oranges that look similar to bg under protanopia)
  const fgColors = ["#E8541A", "#D4440A", "#F06020", "#CC3308", "#E06818", "#F07830", "#DC5010"];

  const cellSize = 18;
  const dotRadius = 7.5;
  const jitter = () => (Math.random() - 0.5) * 4;
  const size = () => dotRadius + (Math.random() - 0.5) * 2.5;

  // Place background dots in a circular area
  const cx = 65, cy = 75, radius = 62;
  for (let attempt = 0; attempt < 800; attempt++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.sqrt(Math.random()) * radius;
    const x = cx + dist * Math.cos(angle);
    const y = cy + dist * Math.sin(angle);
    dots.push({
      cx: x,
      cy: y,
      r: size(),
      fill: bgColors[Math.floor(Math.random() * bgColors.length)],
    });
  }

  // Overlay digit dots
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 1) {
        const baseX = 22 + col * cellSize;
        const baseY = 12 + row * cellSize;
        const count = 3 + Math.floor(Math.random() * 3);
        for (let k = 0; k < count; k++) {
          dots.push({
            cx: baseX + jitter() * 2,
            cy: baseY + jitter() * 2,
            r: size(),
            fill: fgColors[Math.floor(Math.random() * fgColors.length)],
          });
        }
      }
    }
  }

  return dots;
}

// ─── Color Transform Utility ──────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function applyMatrixToColor(
  hex: string,
  matrix: string
): string {
  if (matrix === MODES[0].matrix) return hex;
  const [r, g, b] = hexToRgb(hex);
  const rows = matrix.trim().split(/\s+/).map(Number);
  // 4×5 matrix, we use only RGB rows (rows 0-2), columns 0-2 (ignore alpha & bias for pure color)
  const nr = rows[0] * r + rows[1] * g + rows[2] * b;
  const ng = rows[5] * r + rows[6] * g + rows[7] * b;
  const nb = rows[10] * r + rows[11] * g + rows[12] * b;
  return rgbToHex(nr, ng, nb);
}

// ─── SVG Filter Def ───────────────────────────────────────────────────────────

function SvgFilters() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {MODES.slice(1).map((mode) => (
          <filter key={mode.id} id={`cb-filter-${mode.id}`} colorInterpolationFilters="linearRGB">
            <feColorMatrix type="matrix" values={mode.matrix} />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

function getFilterStyle(mode: VisionMode): React.CSSProperties {
  if (mode === "normal") return {};
  return { filter: `url(#cb-filter-${mode})` };
}

// ─── Colorful Scene ───────────────────────────────────────────────────────────

function ColorScene({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        ...style,
      }}
    >
      {/* Rainbow gradient bar */}
      <div
        style={{
          height: 28,
          background:
            "linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00cc00, #0044ff, #8800cc, #ff00aa)",
        }}
      />

      {/* Main scene */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Color swatches row */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            "#FF3B30", "#FF9500", "#FFCC00", "#34C759",
            "#007AFF", "#5856D6", "#FF2D55", "#00C7BE",
          ].map((color) => (
            <div
              key={color}
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: color,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Text on colored backgrounds */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { bg: "#FF3B30", fg: "#fff", text: "Perigo" },
            { bg: "#34C759", fg: "#fff", text: "Seguro" },
            { bg: "#007AFF", fg: "#fff", text: "Info" },
            { bg: "#FF9500", fg: "#fff", text: "Aviso" },
          ].map(({ bg, fg, text }) => (
            <div
              key={text}
              style={{
                background: bg,
                color: fg,
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.02em",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Gradient blobs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #FF6B6B, #CC1F1F)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #51CF66, #1A8C3E)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #339AF0, #0B5CB5)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 80,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #4facfe 60%, #00f2fe 100%)",
            }}
          />
        </div>

        {/* Color names in their own color */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { color: "#E63946", label: "Vermelho" },
            { color: "#2DC653", label: "Verde" },
            { color: "#1D7EC9", label: "Azul" },
            { color: "#E8A838", label: "Laranja" },
            { color: "#9B5DE5", label: "Roxo" },
            { color: "#E91E8C", label: "Rosa" },
          ].map(({ color, label }) => (
            <span
              key={label}
              style={{
                color,
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Traffic Light ────────────────────────────────────────────────────────────

function TrafficLight() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        background: "#1a1a1a",
        borderRadius: 16,
        padding: "16px 20px",
        width: "fit-content",
      }}
    >
      {[
        { color: "#FF3B30", label: "Parar" },
        { color: "#FFCC00", label: "Atenção" },
        { color: "#34C759", label: "Avançar" },
      ].map(({ color, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 14px ${color}88`,
            }}
          />
          <span style={{ color: "#ccc", fontSize: 12, width: 52 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Ishihara Panel ───────────────────────────────────────────────────────────

function IshiharaPanel() {
  const dots = useMemo(() => generateIshiharaPlate("5"), []);

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 8, fontWeight: 600 }}>
        Placa Ishihara • Que número vês?
      </p>
      <svg
        viewBox="0 0 130 145"
        width={130}
        height={145}
        style={{ display: "block", margin: "0 auto" }}
      >
        <circle cx="65" cy="75" r="63" fill="#f5f5f0" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} />
        ))}
      </svg>
      <p style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
        Visão normal: "5" · Protanopia/Deuteranopia: pode aparecer indistinto
      </p>
    </div>
  );
}

// ─── Color Picker Panel ───────────────────────────────────────────────────────

function ColorPickerPanel() {
  const [pickedColor, setPickedColor] = useState("#E63946");
  const inputId = useId();

  return (
    <div
      style={{
        background: "#f8f8fc",
        borderRadius: 16,
        padding: 20,
        border: "1px solid #e8e8f0",
      }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: "#1a1a2e" }}>
        Escolhe uma cor
      </h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>
        Vê como ela aparece em cada tipo de visão
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <label htmlFor={inputId} style={{ fontSize: 13, color: "#444", fontWeight: 600 }}>
          Cor:
        </label>
        <input
          id={inputId}
          type="color"
          value={pickedColor}
          onChange={(e) => setPickedColor(e.target.value)}
          style={{
            width: 48,
            height: 40,
            borderRadius: 8,
            border: "2px solid #e0e0ee",
            cursor: "pointer",
            padding: 2,
          }}
        />
        <code
          style={{
            fontSize: 13,
            background: "#fff",
            border: "1px solid #e0e0e8",
            borderRadius: 6,
            padding: "4px 8px",
            color: "#444",
          }}
        >
          {pickedColor.toUpperCase()}
        </code>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {MODES.map((mode) => {
          const transformed = applyMatrixToColor(pickedColor, mode.matrix);
          return (
            <div
              key={mode.id}
              style={{
                flex: "1 1 100px",
                minWidth: 100,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: 56,
                  borderRadius: 10,
                  background: transformed,
                  border: "1px solid rgba(0,0,0,0.08)",
                  marginBottom: 6,
                }}
              />
              <div style={{ fontSize: 12, fontWeight: 700, color: "#333" }}>{mode.label}</div>
              <div style={{ fontSize: 11, color: "#888" }}>{transformed.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Test Panel ───────────────────────────────────────────────────────────────

function TestPanel({ mode }: { mode: VisionMode }) {
  const filterStyle = getFilterStyle(mode);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {/* Traffic Light */}
      <div
        style={{
          background: "#fafafa",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #e8e8f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#333", margin: 0 }}>
          Semáforo
        </p>
        <div style={filterStyle}>
          <TrafficLight />
        </div>
      </div>

      {/* Rainbow Bar */}
      <div
        style={{
          background: "#fafafa",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #e8e8f0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#333", margin: 0 }}>
          Arco-íris
        </p>
        <div
          style={{
            ...filterStyle,
            height: 32,
            borderRadius: 8,
            background:
              "linear-gradient(90deg, #FF0000, #FF7700, #FFFF00, #00CC00, #0000FF, #8B00FF)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Vermelho", "Laranja", "Amarelo", "Verde", "Azul", "Violeta"].map((c) => (
            <span key={c} style={{ fontSize: 9, color: "#888", textAlign: "center" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Colored Text on Backgrounds */}
      <div
        style={{
          background: "#fafafa",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #e8e8f0",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "#333", margin: 0 }}>
          Texto colorido
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, ...filterStyle }}>
          {[
            { bg: "#FF3B30", fg: "#fff", text: "Erro crítico" },
            { bg: "#34C759", fg: "#fff", text: "Sucesso!" },
            { bg: "#FF9500", fg: "#fff", text: "Atenção" },
            { bg: "#007AFF", fg: "#fff", text: "Informação" },
          ].map(({ bg, fg, text }) => (
            <div
              key={text}
              style={{
                background: bg,
                color: fg,
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Ishihara */}
      <div
        style={{
          background: "#fafafa",
          borderRadius: 16,
          padding: 16,
          border: "1px solid #e8e8f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={filterStyle}>
          <IshiharaPanel />
        </div>
      </div>
    </div>
  );
}

// ─── Accessibility Tips ───────────────────────────────────────────────────────

const TIPS = [
  {
    icon: "🔷",
    title: "Nunca uses só a cor para transmitir informação",
    desc: "Usa ícones, padrões ou texto como reforço. 'Vermelho = erro' sozinho não chega.",
  },
  {
    icon: "↕️",
    title: "Garante contraste suficiente",
    desc: "Ratio mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande.",
  },
  {
    icon: "🔲",
    title: "Testa com bordas e formas",
    desc: "Gráficos de barras com cores diferentes precisam de rótulos diretos ou padrões de preenchimento.",
  },
  {
    icon: "🧪",
    title: "Usa ferramentas de simulação no teu processo",
    desc: "Verifica os teus designs neste simulador antes de entregar ao cliente.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ColorBlindnessSimPage() {
  const [activeMode, setActiveMode] = useState<VisionMode>("normal");
  const [compareMode, setCompareMode] = useState(false);

  const currentMode = MODES.find((m) => m.id === activeMode)!;
  const filterStyle = getFilterStyle(activeMode);

  return (
    <>
      <SvgFilters />

      <div
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#1a1a2e",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "48px 20px 0",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Simulador de Daltonismo 👁️
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#555",
                marginTop: 12,
                marginBottom: 0,
                fontWeight: 400,
              }}
            >
              Vê o mundo como 8% da população
            </p>
          </motion.div>

          {/* Stat Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "#f0f0ff",
              border: "1px solid #d8d8f8",
              borderRadius: 12,
              padding: "10px 20px",
              fontSize: 14,
              color: "#4444aa",
              fontWeight: 600,
            }}
          >
            💡 Sabia que 1 em cada 12 homens tem algum tipo de daltonismo?
          </motion.div>
        </div>

        {/* ── Mode Selector ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "32px auto 0",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MODES.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  border:
                    activeMode === mode.id
                      ? `2px solid ${mode.accent}`
                      : "2px solid #e0e0ee",
                  background:
                    activeMode === mode.id ? mode.accent : "#fff",
                  color: activeMode === mode.id ? "#fff" : "#444",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  letterSpacing: "0.01em",
                }}
              >
                <span>{mode.icon}</span>
                {mode.label}
              </motion.button>
            ))}
          </div>

          {/* Mode description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeMode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                textAlign: "center",
                fontSize: 14,
                color: "#666",
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              {currentMode.description}
            </motion.p>
          </AnimatePresence>

          {/* Compare Toggle */}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <button
              onClick={() => setCompareMode((v) => !v)}
              style={{
                background: compareMode ? "#1a1a2e" : "#f0f0f8",
                color: compareMode ? "#fff" : "#444",
                border: "none",
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {compareMode ? "✖ Fechar comparação" : "⇔ Comparar lado a lado"}
            </button>
          </div>
        </div>

        {/* ── Main Display ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "24px auto 0",
            padding: "0 20px",
          }}
        >
          <AnimatePresence mode="wait">
            {compareMode ? (
              <motion.div
                key="compare"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#888",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Normal
                  </p>
                  <ColorScene />
                </div>
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: currentMode.accent,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {currentMode.label}
                  </p>
                  <div style={filterStyle}>
                    <ColorScene />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeMode + "-single"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={filterStyle}
              >
                <ColorScene
                  style={{
                    border: "1px solid #e8e8f0",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Color Picker ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "24px auto 0",
            padding: "0 20px",
          }}
        >
          <ColorPickerPanel />
        </div>

        {/* ── Test Panel ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "32px auto 0",
            padding: "0 20px",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 4,
              color: "#1a1a2e",
            }}
          >
            Painel de testes
          </h2>
          <p style={{ fontSize: 13, color: "#777", marginBottom: 16 }}>
            Elementos com filtro de{" "}
            <strong style={{ color: currentMode.accent }}>{currentMode.label}</strong> aplicado
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode + "-tests"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <TestPanel mode={activeMode} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Accessibility Tips ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "40px auto 0",
            padding: "0 20px",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 4,
              color: "#1a1a2e",
            }}
          >
            Dicas para designers
          </h2>
          <p style={{ fontSize: 13, color: "#777", marginBottom: 20 }}>
            Boas práticas para criar interfaces inclusivas para todos
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {TIPS.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  background: "#fafafa",
                  border: "1px solid #e8e8f0",
                  borderRadius: 14,
                  padding: 18,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{tip.icon}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {tip.title}
                </div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
                  {tip.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── About ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "40px auto 0",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #f0f0ff 0%, #fff5f5 100%)",
              border: "1px solid #e0e0f0",
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 800,
                marginBottom: 12,
                color: "#1a1a2e",
              }}
            >
              Como funciona?
            </h2>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
              Esta ferramenta usa <strong>filtros SVG feColorMatrix</strong> para simular como as
              cores são percebidas por diferentes tipos de daltonismo. As matrizes de transformação
              são baseadas em investigação científica de Brettel, Viénot e Mollon (1997).
            </p>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
              O daltonismo afeta maioritariamente homens: cerca de 8% têm alguma forma de
              deficiência na visão das cores, sendo a <strong>deuteranopia</strong> (ausência de
              cones verdes) a mais prevalente. As mulheres são afetadas em cerca de 0.5% dos casos,
              pois o gene é ligado ao cromossoma X.
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            maxWidth: 860,
            margin: "40px auto 0",
            padding: "0 20px 60px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "#aaa" }}>
            Feito com ♥ pela{" "}
            <a
              href="/"
              style={{ color: "#6366f1", textDecoration: "none", fontWeight: 700 }}
            >
              Descomplicai
            </a>{" "}
            · Acessibilidade começa com empatia
          </p>
        </div>
      </div>
    </>
  );
}
