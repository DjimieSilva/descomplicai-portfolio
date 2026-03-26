"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WheelOption {
  id: string;
  label: string;
  color: string;
}

interface SpinRecord {
  id: string;
  result: string;
  color: string;
  timestamp: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PALETTE = [
  "#FF6B6B",
  "#FF9F43",
  "#FECA57",
  "#1DD1A1",
  "#48DBFB",
  "#54A0FF",
  "#5F27CD",
  "#FF9FF3",
  "#00D2D3",
  "#FF6348",
  "#2ED573",
  "#FFA502",
];

const PRESETS: Record<string, { label: string; options: string[] }> = {
  jantar: {
    label: "Onde Jantar 🍽️",
    options: [
      "Pizza 🍕",
      "Sushi 🍣",
      "Hambúrguer 🍔",
      "Pasta 🍝",
      "Salada 🥗",
      "Tacos 🌮",
    ],
  },
  filmes: {
    label: "Shuffle de Filme 🎬",
    options: [
      "Ação 💥",
      "Comédia 😂",
      "Drama 🎭",
      "Terror 👻",
      "Sci-Fi 🚀",
      "Romance 💕",
      "Animação 🎨",
      "Thriller 🔪",
    ],
  },
};

function buildOptions(labels: string[]): WheelOption[] {
  return labels.map((label, i) => ({
    id: `${Date.now()}-${i}`,
    label,
    color: PALETTE[i % PALETTE.length],
  }));
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function buildSegmentPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

// ─── Confetti Component ───────────────────────────────────────────────────────

function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = Array.from({ length: 30 }, (_, i) => i);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const color = PALETTE[i % PALETTE.length];
        const size = 6 + Math.random() * 8;
        const duration = 1.2 + Math.random() * 0.8;
        return (
          <motion.div
            key={i}
            initial={{ x: `${x}vw`, y: -20, rotate: 0, opacity: 1 }}
            animate={{
              y: "110vh",
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
              opacity: 0,
            }}
            transition={{ duration, delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Wheel SVG ────────────────────────────────────────────────────────────────

function WheelSVG({
  options,
  rotation,
}: {
  options: WheelOption[];
  rotation: number;
}) {
  const cx = 200;
  const cy = 200;
  const r = 180;
  const segmentAngle = 360 / options.length;

  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      style={{ transform: `rotate(${rotation}deg)`, transition: "none" }}
    >
      {/* Drop shadow filter */}
      <defs>
        <filter id="wheel-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="8"
            floodOpacity="0.25"
            floodColor="#000"
          />
        </filter>
        <filter id="text-shadow">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="1"
            floodOpacity="0.4"
            floodColor="#000"
          />
        </filter>
      </defs>

      <g filter="url(#wheel-shadow)">
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={r + 6} fill="white" opacity="0.15" />

        {options.map((opt, i) => {
          const startAngle = i * segmentAngle;
          const endAngle = startAngle + segmentAngle;
          const midAngle = startAngle + segmentAngle / 2;
          const textR = r * 0.65;
          const textPos = polarToCartesian(cx, cy, textR, midAngle);
          const path = buildSegmentPath(cx, cy, r, startAngle, endAngle);

          // Clamp label length
          const maxLen = options.length <= 4 ? 18 : options.length <= 6 ? 14 : 10;
          const displayLabel =
            opt.label.length > maxLen
              ? opt.label.slice(0, maxLen - 1) + "…"
              : opt.label;

          const fontSize =
            options.length <= 4 ? 14 : options.length <= 6 ? 12 : 10;

          return (
            <g key={opt.id}>
              <path d={path} fill={opt.color} stroke="white" strokeWidth="2" />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={fontSize}
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
                filter="url(#text-shadow)"
                transform={`rotate(${midAngle - 90}, ${textPos.x}, ${textPos.y})`}
              >
                {displayLabel}
              </text>
            </g>
          );
        })}

        {/* Center circle */}
        <circle cx={cx} cy={cy} r={22} fill="white" />
        <circle cx={cx} cy={cy} r={16} fill="#f1f5f9" />
      </g>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DecisionWheelPage() {
  const [options, setOptions] = useState<WheelOption[]>(() =>
    buildOptions(PRESETS.jantar.options)
  );
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [cssRotation, setCssRotation] = useState(0);
  const [winner, setWinner] = useState<WheelOption | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState<SpinRecord[]>([]);
  const [activePreset, setActivePreset] = useState<string | null>("jantar");

  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<number>(0);
  const lastTickSegmentRef = useRef<number>(-1);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || options.length < 2) return;

    setWinner(null);
    setShowConfetti(false);

    // Random: 3-8 full rotations + random angle
    const extraSpins = (3 + Math.random() * 5) * 360;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins + randomAngle;

    setIsSpinning(true);

    // Animate via CSS transition on the div wrapper
    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Simulate tick sound visually during spin
    tickRef.current = 0;
    lastTickSegmentRef.current = -1;

    // After spin completes
    spinTimeoutRef.current = setTimeout(() => {
      setRotation(totalRotation);

      // Calculate winner — pointer is at top (0°), wheel rotates clockwise
      // Effective angle = totalRotation mod 360, pointer at top means segment at top wins
      const effectiveAngle = ((totalRotation % 360) + 360) % 360;
      // Pointer at 270° in standard math (top = 270°)
      // Since we rotate clockwise, segment that lands at top:
      const segmentAngle = 360 / options.length;
      // The pointer is at the top. After rotation, the segment at top is:
      // pointedAngle = (360 - effectiveAngle) % 360 — where in the wheel is at the top
      const pointedAngle = (360 - effectiveAngle + 360) % 360;
      const winnerIndex = Math.floor(pointedAngle / segmentAngle) % options.length;
      const winnerOption = options[winnerIndex];

      setWinner(winnerOption);
      setIsSpinning(false);
      setShowConfetti(true);

      const record: SpinRecord = {
        id: Date.now().toString(),
        result: winnerOption.label,
        color: winnerOption.color,
        timestamp: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setHistory((prev) => [record, ...prev].slice(0, 10));

      setTimeout(() => setShowConfetti(false), 3000);
    }, 5100);
  }, [isSpinning, options, rotation]);

  function addOption() {
    const trimmed = newOption.trim();
    if (!trimmed || options.length >= 12) return;
    const newIndex = options.length;
    const newOpt: WheelOption = {
      id: Date.now().toString(),
      label: trimmed,
      color: PALETTE[newIndex % PALETTE.length],
    };
    setOptions((prev) => [...prev, newOpt]);
    setNewOption("");
    setActivePreset(null);
    setWinner(null);
  }

  function removeOption(id: string) {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((o) => o.id !== id));
    setActivePreset(null);
    setWinner(null);
  }

  function applyPreset(key: string) {
    if (isSpinning) return;
    const preset = PRESETS[key];
    if (!preset) return;
    // Reset wheel rotation
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
    setRotation(0);
    setCssRotation(0);
    setOptions(buildOptions(preset.options));
    setActivePreset(key);
    setWinner(null);
  }

  return (
    <div
      className="min-h-screen font-sans relative overflow-hidden"
      style={{ backgroundColor: "#fafbff" }}
    >
      {/* Subtle confetti-like background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, #FF6B6B22 0%, transparent 30%),
            radial-gradient(circle at 85% 10%, #54A0FF22 0%, transparent 25%),
            radial-gradient(circle at 70% 80%, #1DD1A122 0%, transparent 30%),
            radial-gradient(circle at 10% 75%, #FF9F4322 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, #FECA5711 0%, transparent 40%)
          `,
        }}
      />
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <ConfettiBurst active={showConfetti} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Roda da Decisão 🎡
          </h1>
          <p className="text-gray-500 mt-1 text-base">
            Deixa a roda decidir por ti!
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex gap-2 justify-center flex-wrap">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              disabled={isSpinning}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 disabled:opacity-50 ${
                activePreset === key
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-md scale-105"
                  : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Main area: wheel + controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Wheel container */}
          <div className="flex-1 flex flex-col items-center gap-4 w-full">
            {/* Pointer + wheel */}
            <div className="relative w-full max-w-sm mx-auto aspect-square">
              {/* Pointer arrow at top */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-20"
                style={{ top: -2 }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderTop: "30px solid #1e293b",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                />
              </div>

              {/* Spinning wheel div (CSS transition applied here) */}
              <div
                ref={wheelRef}
                style={{
                  width: "100%",
                  height: "100%",
                  transformOrigin: "center center",
                }}
              >
                <WheelSVG options={options} rotation={0} />
              </div>
            </div>

            {/* GIRAR button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: isSpinning ? 1 : 1.04 }}
              onClick={spin}
              disabled={isSpinning || options.length < 2}
              className="px-12 py-4 rounded-2xl text-white font-extrabold text-xl shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              style={{
                background: isSpinning
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: isSpinning
                  ? "none"
                  : "0 8px 30px rgba(99,102,241,0.45)",
              }}
            >
              {isSpinning ? "A girar…" : "GIRAR! 🎡"}
            </motion.button>
          </div>

          {/* Side panel: options list + add */}
          <div className="w-full lg:w-64 flex flex-col gap-4">
            {/* Options list */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border border-white">
              <p className="text-sm font-bold text-gray-700 mb-3">
                Opções ({options.length}/12)
              </p>
              <ul className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
                <AnimatePresence>
                  {options.map((opt) => (
                    <motion.li
                      key={opt.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="flex items-center gap-2 py-1"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: opt.color }}
                      />
                      <span className="flex-1 text-sm text-gray-700 truncate">
                        {opt.label}
                      </span>
                      <button
                        onClick={() => removeOption(opt.id)}
                        disabled={options.length <= 2 || isSpinning}
                        className="text-gray-300 hover:text-red-400 transition-colors text-base disabled:opacity-30 disabled:cursor-not-allowed leading-none"
                        title="Remover opção"
                      >
                        ×
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Add option */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addOption();
                  }}
                  placeholder="Nova opção…"
                  maxLength={30}
                  disabled={options.length >= 12 || isSpinning}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  onClick={addOption}
                  disabled={
                    !newOption.trim() || options.length >= 12 || isSpinning
                  }
                  className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  +
                </button>
              </div>
              {options.length >= 12 && (
                <p className="text-xs text-amber-500 mt-1.5">
                  Máximo de 12 opções atingido.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Winner reveal */}
        <AnimatePresence>
          {winner && (
            <motion.div
              key={winner.id + winner.label}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="rounded-3xl p-8 text-center shadow-2xl border-4 border-white"
              style={{ backgroundColor: winner.color + "22" }}
            >
              <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-widest">
                A roda decidiu!
              </p>
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.1 }}
                className="text-4xl font-extrabold"
                style={{ color: winner.color }}
              >
                {winner.label}
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 mx-auto mt-4 rounded-full"
                style={{ backgroundColor: winner.color }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spin history */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-white"
            >
              <p className="text-sm font-bold text-gray-700 mb-3">
                🕐 Últimas rodadas
              </p>
              <ul className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {history.map((record, idx) => (
                    <motion.li
                      key={record.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 py-1"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: record.color }}
                      />
                      <span
                        className={`flex-1 text-sm font-semibold ${
                          idx === 0 ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {record.result}
                      </span>
                      <span className="text-xs text-gray-400">
                        {record.timestamp}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Feito com diversão por{" "}
          <a
            href="https://descomplicai.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition-colors"
          >
            Descomplicai
          </a>
        </p>
      </div>
    </div>
  );
}
