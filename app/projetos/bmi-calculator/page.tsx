"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type UnitMode = "metric" | "imperial";
type Gender = "male" | "female" | null;

interface BMICategory {
  label: string;
  color: string;
  bg: string;
  textColor: string;
  min: number;
  max: number;
  tip: string;
}

interface HistoryEntry {
  id: string;
  bmi: number;
  category: string;
  weight: string;
  height: string;
  date: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES: BMICategory[] = [
  {
    label: "Abaixo do peso",
    color: "#3b82f6",
    bg: "#eff6ff",
    textColor: "#1d4ed8",
    min: 0,
    max: 18.5,
    tip: "Considera consultar um nutricionista para avaliar a tua alimentação.",
  },
  {
    label: "Peso normal",
    color: "#10b981",
    bg: "#f0fdf4",
    textColor: "#047857",
    min: 18.5,
    max: 25,
    tip: "Excelente! Mantém os teus hábitos saudáveis.",
  },
  {
    label: "Excesso de peso",
    color: "#f59e0b",
    bg: "#fffbeb",
    textColor: "#b45309",
    min: 25,
    max: 30,
    tip: "Pequenas mudanças na dieta e exercício regular fazem grande diferença.",
  },
  {
    label: "Obesidade",
    color: "#ef4444",
    bg: "#fef2f2",
    textColor: "#b91c1c",
    min: 30,
    max: Infinity,
    tip: "Recomendamos consultar um médico para um plano personalizado.",
  },
];

const HEALTH_TIPS = [
  {
    icon: "💧",
    tip: "Bebe pelo menos 8 copos de água por dia para manter o corpo hidratado.",
  },
  {
    icon: "🚶",
    tip: "30 minutos de caminhada diária reduzem o risco de doenças cardíacas em até 35%.",
  },
  {
    icon: "🥗",
    tip: "Metade do teu prato deve ser legumes e vegetais coloridos.",
  },
  {
    icon: "😴",
    tip: "7 a 9 horas de sono por noite ajudam a regular o peso corporal.",
  },
  {
    icon: "🧘",
    tip: "O stress crónico pode contribuir para o aumento de peso. Experimenta meditação.",
  },
  {
    icon: "🍎",
    tip: "Prefere snacks naturais como fruta, nozes e iogurte grego.",
  },
];

const HISTORY_KEY = "descomplicai_bmi_history";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBMICategory(bmi: number): BMICategory {
  return (
    CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1]
  );
}

function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

function inchesToCm(inches: number): number {
  return inches * 2.54;
}

function healthyWeightRange(heightCm: number): { min: number; max: number } {
  const h = heightCm / 100;
  return {
    min: Math.round(18.5 * h * h * 10) / 10,
    max: Math.round(24.9 * h * h * 10) / 10,
  };
}

function getGaugeAngle(bmi: number): number {
  // Map BMI 10-45 to degrees 0-180 (left to right)
  const clamped = Math.max(10, Math.min(45, bmi));
  return ((clamped - 10) / 35) * 180;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pickTips(bmi: number): typeof HEALTH_TIPS {
  // Always include the category-specific tip conceptually embedded, then 3 random
  const shuffled = [...HEALTH_TIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  accentColor,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  accentColor: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span
          className="text-lg font-bold tabular-nums"
          style={{ color: accentColor }}
        >
          {value}
          <span className="text-sm font-medium text-slate-400 ml-1">{unit}</span>
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
            accentColor: accentColor,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function BMIGauge({ bmi, category }: { bmi: number; category: BMICategory }) {
  const angle = getGaugeAngle(bmi);
  const cx = 120;
  const cy = 110;
  const r = 90;

  // Arc segments: Abaixo(0–48.9deg), Normal(48.9–77.1deg), Excesso(77.1–102.9deg), Obeso(102.9–180deg)
  // BMI ranges mapped to 0-180: 10→0, 18.5→48.57, 25→85.71, 30→102.86, 45→180
  const segments = [
    { color: "#3b82f6", start: 0, end: 48.57 },
    { color: "#10b981", start: 48.57, end: 85.71 },
    { color: "#f59e0b", start: 85.71, end: 102.86 },
    { color: "#ef4444", start: 102.86, end: 180 },
  ];

  function polarToXY(angleDeg: number, radius: number) {
    const rad = ((angleDeg - 180) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function arcPath(startDeg: number, endDeg: number, outerR: number, innerR: number) {
    const s = polarToXY(startDeg, outerR);
    const e = polarToXY(endDeg, outerR);
    const si = polarToXY(startDeg, innerR);
    const ei = polarToXY(endDeg, innerR);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return [
      `M ${s.x} ${s.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${e.x} ${e.y}`,
      `L ${ei.x} ${ei.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${si.x} ${si.y}`,
      "Z",
    ].join(" ");
  }

  // Needle
  const needleRad = ((angle - 180) * Math.PI) / 180;
  const needleLen = 70;
  const nx = cx + needleLen * Math.cos(needleRad);
  const ny = cy + needleLen * Math.sin(needleRad);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 240 130" className="w-full max-w-xs">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(seg.start, seg.end, r, r - 24)}
            fill={seg.color}
            opacity={0.85}
          />
        ))}

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#1e293b"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ x2: cx, y2: cy }}
          animate={{ x2: nx, y2: ny }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        <circle cx={cx} cy={cy} r="6" fill="#1e293b" />
        <circle cx={cx} cy={cy} r="3" fill="white" />

        {/* BMI labels */}
        <text x="14" y="118" fontSize="9" fill="#64748b">10</text>
        {(() => {
          const p185 = polarToXY(48.57, r + 10);
          return <text x={p185.x - 10} y={p185.y + 4} fontSize="9" fill="#64748b">18.5</text>;
        })()}
        {(() => {
          const p25 = polarToXY(85.71, r + 10);
          return <text x={p25.x - 6} y={p25.y + 4} fontSize="9" fill="#64748b">25</text>;
        })()}
        {(() => {
          const p30 = polarToXY(102.86, r + 10);
          return <text x={p30.x - 4} y={p30.y + 4} fontSize="9" fill="#64748b">30</text>;
        })()}
        <text x="212" y="118" fontSize="9" fill="#64748b">45</text>
      </svg>

      {/* BMI Number */}
      <motion.div
        key={bmi}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="text-center mt-1"
      >
        <p
          className="text-5xl font-black tabular-nums"
          style={{ color: category.color }}
        >
          {bmi.toFixed(1)}
        </p>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">IMC</p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function BMICalculatorPage() {
  const [mode, setMode] = useState<UnitMode>("metric");

  // Metric inputs
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(170);

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightIn, setHeightIn] = useState(67);

  // Optional
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<Gender>(null);

  // Results
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory | null>(null);
  const [tips, setTips] = useState<typeof HEALTH_TIPS>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  // History (localStorage)
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const saveHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 5);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    let wKg: number;
    let hCm: number;
    let weightLabel: string;
    let heightLabel: string;

    if (mode === "metric") {
      wKg = weightKg;
      hCm = heightCm;
      weightLabel = `${weightKg} kg`;
      heightLabel = `${heightCm} cm`;
    } else {
      wKg = lbsToKg(weightLbs);
      hCm = inchesToCm(heightIn);
      weightLabel = `${weightLbs} lbs`;
      heightLabel = `${heightIn}"`;
    }

    const result = calcBMI(wKg, hCm);
    const cat = getBMICategory(result);
    setBmi(result);
    setCategory(cat);
    setTips(pickTips(result));
    setHasCalculated(true);

    const entry: HistoryEntry = {
      id: generateId(),
      bmi: Math.round(result * 10) / 10,
      category: cat.label,
      weight: weightLabel,
      height: heightLabel,
      date: new Date().toISOString(),
    };
    saveHistory(entry);
  }, [mode, weightKg, heightCm, weightLbs, heightIn, saveHistory]);

  const currentWeightKg = mode === "metric" ? weightKg : lbsToKg(weightLbs);
  const currentHeightCm = mode === "metric" ? heightCm : inchesToCm(heightIn);
  const idealRange = healthyWeightRange(currentHeightCm);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8fafb" }}>
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Calculadora de IMC 🏥
          </h1>
          <p className="text-slate-500 text-sm">Índice de Massa Corporal</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
            {(["metric", "imperial"] as UnitMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={
                  mode === m
                    ? { backgroundColor: "#10b981", color: "white" }
                    : { color: "#64748b" }
                }
              >
                {m === "metric" ? "Métrico (kg/cm)" : "Imperial (lbs/in)"}
              </button>
            ))}
          </div>
        </div>

        {/* Input Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4"
          >
            <div className="flex flex-col gap-6">
              {mode === "metric" ? (
                <>
                  <SliderInput
                    label="Peso"
                    value={weightKg}
                    min={40}
                    max={200}
                    step={1}
                    unit="kg"
                    onChange={setWeightKg}
                    accentColor="#10b981"
                  />
                  <SliderInput
                    label="Altura"
                    value={heightCm}
                    min={140}
                    max={220}
                    step={1}
                    unit="cm"
                    onChange={setHeightCm}
                    accentColor="#10b981"
                  />
                </>
              ) : (
                <>
                  <SliderInput
                    label="Peso"
                    value={weightLbs}
                    min={88}
                    max={440}
                    step={1}
                    unit="lbs"
                    onChange={setWeightLbs}
                    accentColor="#10b981"
                  />
                  <SliderInput
                    label="Altura"
                    value={heightIn}
                    min={55}
                    max={87}
                    step={1}
                    unit="in"
                    onChange={setHeightIn}
                    accentColor="#10b981"
                  />
                </>
              )}

              {/* Optional: Age + Gender */}
              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-slate-100">
                {/* Age */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-500">
                    Idade <span className="text-xs text-slate-400">(opcional)</span>
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    placeholder="Ex: 30"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ focusRingColor: "#10b981" } as React.CSSProperties}
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-500">
                    Sexo <span className="text-xs text-slate-400">(opcional)</span>
                  </label>
                  <div className="flex gap-2">
                    {([
                      { value: "male", label: "Masc.", icon: "♂️" },
                      { value: "female", label: "Fem.", icon: "♀️" },
                    ] as { value: Gender; label: string; icon: string }[]).map((g) => (
                      <button
                        key={g.value as string}
                        onClick={() => setGender(gender === g.value ? null : g.value)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-sm font-medium border transition-all"
                        style={
                          gender === g.value
                            ? {
                                backgroundColor: "#f0fdf4",
                                borderColor: "#10b981",
                                color: "#047857",
                              }
                            : {
                                backgroundColor: "#f8fafc",
                                borderColor: "#e2e8f0",
                                color: "#64748b",
                              }
                        }
                      >
                        <span>{g.icon}</span>
                        <span>{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              onClick={handleCalculate}
              className="mt-6 w-full py-4 rounded-2xl text-white font-bold text-lg shadow-md transition-all"
              style={{ backgroundColor: "#10b981", boxShadow: "0 4px 20px #10b98133" }}
            >
              Calcular IMC
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {hasCalculated && bmi !== null && category !== null && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Category Badge + Gauge */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
                <motion.div
                  className="text-center mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: category.bg, color: category.textColor }}
                  >
                    {category.label}
                  </span>
                </motion.div>

                <BMIGauge bmi={bmi} category={category} />

                {/* Healthy weight range */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 rounded-xl p-4"
                  style={{ backgroundColor: "#f0fdf4" }}
                >
                  <p className="text-center text-sm font-medium text-slate-600 mb-1">
                    Peso ideal para a tua altura
                  </p>
                  <p
                    className="text-center text-2xl font-bold"
                    style={{ color: "#10b981" }}
                  >
                    {idealRange.min} – {idealRange.max} kg
                  </p>
                  <p className="text-center text-xs text-slate-400 mt-1">
                    baseado em IMC 18,5 – 24,9
                  </p>
                </motion.div>
              </div>

              {/* Category Scale Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Escala de categorias
                </h3>
                <div className="flex gap-1 mb-3">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.label}
                      className="flex-1 h-3 rounded-full transition-all"
                      style={{
                        backgroundColor: cat.color,
                        opacity: category.label === cat.label ? 1 : 0.3,
                        transform: category.label === cat.label ? "scaleY(1.4)" : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{
                        backgroundColor:
                          category.label === cat.label ? cat.bg : "#f8fafc",
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color:
                              category.label === cat.label
                                ? cat.textColor
                                : "#94a3b8",
                          }}
                        >
                          {cat.label}
                        </p>
                        <p className="text-xs text-slate-400">
                          {cat.max === Infinity
                            ? `≥ ${cat.min}`
                            : `${cat.min} – ${cat.max}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tips */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Dicas de saúde
                </h3>
                <div className="flex flex-col gap-2">
                  {/* Category-specific tip */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: category.bg }}
                  >
                    <span className="text-xl flex-shrink-0">💡</span>
                    <p className="text-sm" style={{ color: category.textColor }}>
                      {category.tip}
                    </p>
                  </motion.div>
                  {tips.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-start gap-3 px-4 py-3 bg-slate-50 rounded-xl"
                    >
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <p className="text-sm text-slate-600">{t.tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                <span className="text-slate-400 flex-shrink-0">⚠️</span>
                <p className="text-xs text-slate-500">
                  Esta calculadora é apenas informativa. O IMC não diferencia massa muscular
                  de gordura e pode não reflectir o estado de saúde real. Consulte um
                  profissional de saúde.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        <AnimatePresence>
          {mounted && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Últimos 5 cálculos
                </h3>
                <button
                  onClick={() => {
                    setHistory([]);
                    try {
                      localStorage.removeItem(HISTORY_KEY);
                    } catch {
                      // ignore
                    }
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Limpar
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {history.map((entry) => {
                    const cat = getBMICategory(entry.bmi);
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-700 tabular-nums">
                              IMC {entry.bmi}
                            </p>
                            <p className="text-xs text-slate-400">
                              {entry.weight} · {entry.height}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-xs font-medium"
                            style={{ color: cat.textColor }}
                          >
                            {entry.category}
                          </p>
                          <p className="text-xs text-slate-400">{formatDate(entry.date)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
