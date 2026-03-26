"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CategoryKey =
  | "comprimento"
  | "peso"
  | "temperatura"
  | "velocidade"
  | "volume"
  | "area";

interface Unit {
  label: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

interface Category {
  label: string;
  icon: string;
  units: Unit[];
  commonConversions: { from: string; to: string; value: string; result: string }[];
}

interface HistoryEntry {
  id: number;
  category: string;
  from: string;
  to: string;
  input: string;
  output: string;
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Unit Definitions
// ---------------------------------------------------------------------------

const CATEGORIES: Record<CategoryKey, Category> = {
  comprimento: {
    label: "Comprimento",
    icon: "📏",
    units: [
      { label: "Milímetros", symbol: "mm",      toBase: (v) => v / 1000,         fromBase: (v) => v * 1000 },
      { label: "Centímetros", symbol: "cm",     toBase: (v) => v / 100,          fromBase: (v) => v * 100 },
      { label: "Metros",      symbol: "m",       toBase: (v) => v,                fromBase: (v) => v },
      { label: "Quilómetros", symbol: "km",      toBase: (v) => v * 1000,         fromBase: (v) => v / 1000 },
      { label: "Polegadas",   symbol: "in",      toBase: (v) => v * 0.0254,       fromBase: (v) => v / 0.0254 },
      { label: "Pés",         symbol: "ft",      toBase: (v) => v * 0.3048,       fromBase: (v) => v / 0.3048 },
      { label: "Milhas",      symbol: "mi",      toBase: (v) => v * 1609.344,     fromBase: (v) => v / 1609.344 },
    ],
    commonConversions: [
      { from: "1 km", to: "mi", value: "1", result: "0.6214 milhas" },
      { from: "1 m",  to: "ft", value: "1", result: "3.2808 pés" },
      { from: "1 ft", to: "cm", value: "1", result: "30.48 cm" },
      { from: "1 in", to: "cm", value: "1", result: "2.54 cm" },
    ],
  },
  peso: {
    label: "Peso",
    icon: "⚖️",
    units: [
      { label: "Miligramas",  symbol: "mg",  toBase: (v) => v / 1_000_000,    fromBase: (v) => v * 1_000_000 },
      { label: "Gramas",      symbol: "g",   toBase: (v) => v / 1000,          fromBase: (v) => v * 1000 },
      { label: "Quilogramas", symbol: "kg",  toBase: (v) => v,                 fromBase: (v) => v },
      { label: "Toneladas",   symbol: "ton", toBase: (v) => v * 1000,          fromBase: (v) => v / 1000 },
      { label: "Libras",      symbol: "lb",  toBase: (v) => v * 0.453592,      fromBase: (v) => v / 0.453592 },
      { label: "Onças",       symbol: "oz",  toBase: (v) => v * 0.0283495,     fromBase: (v) => v / 0.0283495 },
    ],
    commonConversions: [
      { from: "1 kg",  to: "lb",  value: "1", result: "2.2046 libras" },
      { from: "1 lb",  to: "g",   value: "1", result: "453.59 g" },
      { from: "1 ton", to: "kg",  value: "1", result: "1000 kg" },
      { from: "1 oz",  to: "g",   value: "1", result: "28.35 g" },
    ],
  },
  temperatura: {
    label: "Temperatura",
    icon: "🌡️",
    units: [
      {
        label: "Celsius",    symbol: "°C",
        toBase:   (v) => v,
        fromBase: (v) => v,
      },
      {
        label: "Fahrenheit", symbol: "°F",
        toBase:   (v) => (v - 32) * (5 / 9),
        fromBase: (v) => v * (9 / 5) + 32,
      },
      {
        label: "Kelvin",     symbol: "K",
        toBase:   (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
    commonConversions: [
      { from: "0 °C",   to: "°F", value: "0",   result: "32 °F" },
      { from: "100 °C", to: "°F", value: "100",  result: "212 °F" },
      { from: "0 K",    to: "°C", value: "0",    result: "-273.15 °C" },
      { from: "37 °C",  to: "°F", value: "37",   result: "98.6 °F" },
    ],
  },
  velocidade: {
    label: "Velocidade",
    icon: "💨",
    units: [
      { label: "km/h",   symbol: "km/h",  toBase: (v) => v / 3.6,         fromBase: (v) => v * 3.6 },
      { label: "m/s",    symbol: "m/s",   toBase: (v) => v,                fromBase: (v) => v },
      { label: "mph",    symbol: "mph",   toBase: (v) => v * 0.44704,      fromBase: (v) => v / 0.44704 },
      { label: "Nós",    symbol: "kn",    toBase: (v) => v * 0.514444,     fromBase: (v) => v / 0.514444 },
    ],
    commonConversions: [
      { from: "100 km/h", to: "mph", value: "100", result: "62.14 mph" },
      { from: "1 m/s",    to: "km/h", value: "1",  result: "3.6 km/h" },
      { from: "1 kn",     to: "km/h", value: "1",  result: "1.852 km/h" },
      { from: "120 km/h", to: "m/s",  value: "120", result: "33.33 m/s" },
    ],
  },
  volume: {
    label: "Volume",
    icon: "🧪",
    units: [
      { label: "Mililitros",   symbol: "ml",   toBase: (v) => v / 1000,         fromBase: (v) => v * 1000 },
      { label: "Litros",       symbol: "L",    toBase: (v) => v,                 fromBase: (v) => v },
      { label: "Galões (US)",  symbol: "gal",  toBase: (v) => v * 3.78541,       fromBase: (v) => v / 3.78541 },
      { label: "Copos (US)",   symbol: "cup",  toBase: (v) => v * 0.236588,      fromBase: (v) => v / 0.236588 },
    ],
    commonConversions: [
      { from: "1 L",    to: "ml",  value: "1",   result: "1000 ml" },
      { from: "1 gal",  to: "L",   value: "1",   result: "3.785 L" },
      { from: "1 cup",  to: "ml",  value: "1",   result: "236.59 ml" },
      { from: "500 ml", to: "cup", value: "500",  result: "2.113 copos" },
    ],
  },
  area: {
    label: "Área",
    icon: "⬛",
    units: [
      { label: "m²",       symbol: "m²",  toBase: (v) => v,                  fromBase: (v) => v },
      { label: "km²",      symbol: "km²", toBase: (v) => v * 1_000_000,      fromBase: (v) => v / 1_000_000 },
      { label: "Hectares", symbol: "ha",  toBase: (v) => v * 10_000,         fromBase: (v) => v / 10_000 },
      { label: "Acres",    symbol: "ac",  toBase: (v) => v * 4046.86,        fromBase: (v) => v / 4046.86 },
    ],
    commonConversions: [
      { from: "1 km²",  to: "ha",  value: "1",   result: "100 ha" },
      { from: "1 ha",   to: "m²",  value: "1",   result: "10.000 m²" },
      { from: "1 acre", to: "m²",  value: "1",   result: "4046.86 m²" },
      { from: "1 ha",   to: "ac",  value: "1",   result: "2.471 acres" },
    ],
  },
};

const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
  const base = fromUnit.toBase(value);
  return toUnit.fromBase(base);
}

function formatNumber(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "—";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) {
    return n.toExponential(4);
  }
  // Up to 6 significant digits, trim trailing zeros
  const s = parseFloat(n.toPrecision(6)).toString();
  return s;
}

function buildFormulaText(
  inputStr: string,
  fromUnit: Unit,
  toUnit: Unit,
  result: string
): string {
  if (!inputStr || inputStr === "" || inputStr === "-") return "";
  const val = parseFloat(inputStr);
  if (isNaN(val)) return "";
  if (fromUnit.symbol === toUnit.symbol) return `${val} ${fromUnit.symbol} = ${val} ${toUnit.symbol}`;
  return `${val} ${fromUnit.symbol} → ${result} ${toUnit.symbol}`;
}

let historyCounter = 0;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryTab({
  catKey,
  active,
  onClick,
}: {
  catKey: CategoryKey;
  active: boolean;
  onClick: () => void;
}) {
  const cat = CATEGORIES[catKey];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-orange-500 text-white shadow-md shadow-orange-200"
          : "bg-white text-stone-600 hover:bg-orange-50 hover:text-orange-600 border border-stone-200"
      }`}
    >
      <span>{cat.icon}</span>
      <span>{cat.label}</span>
    </button>
  );
}

function UnitSelect({
  units,
  value,
  onChange,
  label,
}: {
  units: Unit[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: "36px",
        }}
      >
        {units.map((u) => (
          <option key={u.symbol} value={u.symbol}>
            {u.label} ({u.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function UnitConverterPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("comprimento");
  const [inputValue, setInputValue] = useState<string>("");
  const [fromSymbol, setFromSymbol] = useState<string>("m");
  const [toSymbol, setToSymbol] = useState<string>("cm");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const cat = CATEGORIES[activeCategory];

  // Find unit objects
  const fromUnit = cat.units.find((u) => u.symbol === fromSymbol) ?? cat.units[0];
  const toUnit   = cat.units.find((u) => u.symbol === toSymbol)   ?? cat.units[1];

  // Compute result
  const numericInput = parseFloat(inputValue);
  const resultNum =
    inputValue !== "" && !isNaN(numericInput)
      ? convert(numericInput, fromUnit, toUnit)
      : null;
  const resultStr = resultNum !== null ? formatNumber(resultNum) : "";
  const formulaText = buildFormulaText(inputValue, fromUnit, toUnit, resultStr);

  // Reset units when category changes
  useEffect(() => {
    const units = CATEGORIES[activeCategory].units;
    setFromSymbol(units[0].symbol);
    setToSymbol(units[1].symbol);
    setInputValue("");
  }, [activeCategory]);

  // Add to history when a valid conversion happens
  const pushHistory = useCallback(() => {
    if (inputValue === "" || isNaN(numericInput) || resultStr === "") return;
    const entry: HistoryEntry = {
      id: ++historyCounter,
      category: cat.label,
      from: fromUnit.symbol,
      to: toUnit.symbol,
      input: `${inputValue} ${fromUnit.symbol}`,
      output: `${resultStr} ${toUnit.symbol}`,
      timestamp: new Date(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, 5));
  }, [inputValue, numericInput, resultStr, cat.label, fromUnit, toUnit]);

  const handleSwap = () => {
    const prevFrom = fromSymbol;
    const prevTo   = toSymbol;
    setFromSymbol(prevTo);
    setToSymbol(prevFrom);
    // If there's a result, set input to that result
    if (resultStr !== "") {
      setInputValue(resultStr);
    }
  };

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveCategory(key);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f5f5f4" }}>
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">
            📐 Conversor de Unidades
          </h1>
          <p className="text-stone-500 text-sm">
            Converte qualquer medida em tempo real, sem complicações.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORY_KEYS.map((key) => (
            <CategoryTab
              key={key}
              catKey={key}
              active={activeCategory === key}
              onClick={() => handleCategoryChange(key)}
            />
          ))}
        </div>

        {/* Converter Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 mb-4"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-lg font-semibold text-stone-700">{cat.label}</h2>
            </div>

            {/* From row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <UnitSelect
                units={cat.units}
                value={fromSymbol}
                onChange={setFromSymbol}
                label="De"
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                  Valor
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={pushHistory}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center my-3">
              <button
                onClick={handleSwap}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium text-sm border border-orange-200 transition-all active:scale-95"
              >
                <span className="text-lg leading-none">↔</span>
                <span>Inverter</span>
              </button>
            </div>

            {/* To row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <UnitSelect
                units={cat.units}
                value={toSymbol}
                onChange={setToSymbol}
                label="Para"
              />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                  Resultado
                </label>
                <div className="w-full px-3 py-2.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 font-bold text-lg min-h-[44px] flex items-center">
                  {resultStr !== "" ? (
                    <span>
                      {resultStr}{" "}
                      <span className="text-orange-400 font-medium text-base">
                        {toUnit.symbol}
                      </span>
                    </span>
                  ) : (
                    <span className="text-stone-300 font-normal text-base">—</span>
                  )}
                </div>
              </div>
            </div>

            {/* Formula display */}
            <AnimatePresence>
              {formulaText && (
                <motion.div
                  key="formula"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 text-sm">🧮</span>
                    <p className="text-stone-600 text-sm font-mono">{formulaText}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Quick Reference Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ref-${activeCategory}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 mb-4"
          >
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Referências rápidas — {cat.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.commonConversions.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-100"
                >
                  <span className="text-stone-600 text-sm font-medium">{c.from}</span>
                  <span className="text-stone-400 text-xs mx-2">→</span>
                  <span className="text-orange-600 text-sm font-semibold">{c.result}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* History */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
                  Últimas conversões
                </h3>
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Limpar
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {history.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-between px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-400 bg-stone-200 px-2 py-0.5 rounded-full">
                          {entry.category}
                        </span>
                        <span className="text-stone-700 text-sm font-medium">
                          {entry.input}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-stone-400 text-xs">→</span>
                        <span className="text-orange-600 text-sm font-semibold">
                          {entry.output}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
