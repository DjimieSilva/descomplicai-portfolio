"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

type AngleMode = "DEG" | "RAD";
type CalcMode = "standard" | "scientific";

interface HistoryEntry {
  expression: string;
  result: string;
}

// ─── Safe Evaluator ──────────────────────────────────────────────────────────

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function evaluateExpression(expr: string, angleMode: AngleMode): number {
  // Replace display symbols with JS-evaluable forms
  let e = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/π/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/(\d+(?:\.\d+)?)!/g, (_, n) => String(factorial(Number(n))))
    .replace(/abs\(/g, "Math.abs(")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/√(\d+(?:\.\d+)?)/g, (_, n) => String(Math.sqrt(Number(n))));

  // Trig functions — respect angle mode
  if (angleMode === "DEG") {
    e = e
      .replace(/sin\(/g, "Math.__sin(")
      .replace(/cos\(/g, "Math.__cos(")
      .replace(/tan\(/g, "Math.__tan(");
  } else {
    e = e
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(");
  }

  e = e
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(");

  // Inject degree-aware trig helpers onto Math temporarily
  const mathWithDeg = Object.assign(Object.create(Math), {
    __sin: (x: number) => Math.sin(toRad(x)),
    __cos: (x: number) => Math.cos(toRad(x)),
    __tan: (x: number) => Math.tan(toRad(x)),
  });

  // eslint-disable-next-line no-new-func
  const fn = new Function("Math", `"use strict"; return (${e});`);
  return fn(mathWithDeg);
}

// ─── Button definitions ───────────────────────────────────────────────────────

type ButtonDef = {
  label: string;
  value: string;
  type:
    | "number"
    | "operator"
    | "function"
    | "action"
    | "memory"
    | "constant"
    | "paren"
    | "special";
  wide?: boolean;
};

const STANDARD_ROWS: ButtonDef[][] = [
  [
    { label: "MC", value: "MC", type: "memory" },
    { label: "MR", value: "MR", type: "memory" },
    { label: "M+", value: "M+", type: "memory" },
    { label: "M-", value: "M-", type: "memory" },
  ],
  [
    { label: "C", value: "C", type: "action" },
    { label: "CE", value: "CE", type: "action" },
    { label: "⌫", value: "BACKSPACE", type: "action" },
    { label: "÷", value: "÷", type: "operator" },
  ],
  [
    { label: "7", value: "7", type: "number" },
    { label: "8", value: "8", type: "number" },
    { label: "9", value: "9", type: "number" },
    { label: "×", value: "×", type: "operator" },
  ],
  [
    { label: "4", value: "4", type: "number" },
    { label: "5", value: "5", type: "number" },
    { label: "6", value: "6", type: "number" },
    { label: "-", value: "-", type: "operator" },
  ],
  [
    { label: "1", value: "1", type: "number" },
    { label: "2", value: "2", type: "number" },
    { label: "3", value: "3", type: "number" },
    { label: "+", value: "+", type: "operator" },
  ],
  [
    { label: "±", value: "NEGATE", type: "action" },
    { label: "0", value: "0", type: "number" },
    { label: ".", value: ".", type: "number" },
    { label: "=", value: "=", type: "special" },
  ],
];

const SCIENTIFIC_EXTRA_ROWS: ButtonDef[][] = [
  [
    { label: "sin", value: "sin(", type: "function" },
    { label: "cos", value: "cos(", type: "function" },
    { label: "tan", value: "tan(", type: "function" },
    { label: "π", value: "π", type: "constant" },
    { label: "e", value: "e", type: "constant" },
  ],
  [
    { label: "log", value: "log(", type: "function" },
    { label: "ln", value: "ln(", type: "function" },
    { label: "√", value: "√(", type: "function" },
    { label: "x²", value: "²", type: "function" },
    { label: "xⁿ", value: "^", type: "operator" },
  ],
  [
    { label: "abs", value: "abs(", type: "function" },
    { label: "!", value: "!", type: "operator" },
    { label: "(", value: "(", type: "paren" },
    { label: ")", value: ")", type: "paren" },
    { label: "%", value: "%", type: "operator" },
  ],
];

// ─── Color helpers ────────────────────────────────────────────────────────────

function buttonBg(type: ButtonDef["type"]): string {
  switch (type) {
    case "operator":
      return "#f97316";
    case "special":
      return "#f97316";
    case "action":
      return "#374151";
    case "memory":
      return "#1f2937";
    case "function":
      return "#1d4ed8";
    case "constant":
      return "#065f46";
    case "paren":
      return "#1f2937";
    case "number":
    default:
      return "#2d2d3d";
  }
}

function buttonHover(type: ButtonDef["type"]): string {
  switch (type) {
    case "operator":
    case "special":
      return "#ea6c00";
    case "action":
      return "#4b5563";
    case "memory":
      return "#374151";
    case "function":
      return "#1e40af";
    case "constant":
      return "#047857";
    case "paren":
      return "#374151";
    case "number":
    default:
      return "#3d3d50";
  }
}

// ─── Single Button Component ──────────────────────────────────────────────────

function CalcButton({
  btn,
  onPress,
  wide,
}: {
  btn: ButtonDef;
  onPress: (val: string) => void;
  wide?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const bg = buttonBg(btn.type);
  const hover = buttonHover(btn.type);

  function handlePress() {
    setPressed(true);
    onPress(btn.value);
    setTimeout(() => setPressed(false), 120);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={handlePress}
      style={{
        background: pressed ? hover : bg,
        gridColumn: wide ? "span 2" : undefined,
        transition: "background 0.12s ease",
      }}
      className={`
        flex items-center justify-center
        rounded-xl text-white font-semibold
        select-none cursor-pointer
        text-base sm:text-lg
        h-12 sm:h-14
        ${wide ? "col-span-2" : ""}
        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:ring-offset-[#1e1e2e]
        active:brightness-110
      `}
      aria-label={btn.label}
    >
      {btn.label}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScientificCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [display, setDisplay] = useState<string>("0");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mode, setMode] = useState<CalcMode>("standard");
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [justEvaluated, setJustEvaluated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // ── Core logic ──────────────────────────────────────────────────────────────

  const currentDisplay = result !== null ? result : display === "" ? "0" : display;

  function appendToExpression(val: string) {
    setError(false);
    setResult(null);

    if (justEvaluated) {
      // After = pressed, start fresh unless it's an operator
      const ops = ["+", "-", "×", "÷", "^", "%"];
      if (ops.includes(val)) {
        setExpression((lastResult ?? "0") + val);
        setDisplay((lastResult ?? "0") + val);
      } else {
        setExpression(val);
        setDisplay(val);
      }
      setJustEvaluated(false);
      return;
    }

    const next = expression + val;
    setExpression(next);
    setDisplay(next);
  }

  function handleBackspace() {
    setError(false);
    setResult(null);
    setJustEvaluated(false);
    if (expression.length <= 1) {
      setExpression("");
      setDisplay("0");
    } else {
      const next = expression.slice(0, -1);
      setExpression(next);
      setDisplay(next);
    }
  }

  function handleClear() {
    setExpression("");
    setDisplay("0");
    setResult(null);
    setError(false);
    setJustEvaluated(false);
  }

  function handleCE() {
    // CE clears current entry (last number/token only)
    setError(false);
    setResult(null);
    setJustEvaluated(false);
    // Remove last complete token
    const match = expression.match(/^(.*?)(\d+\.?\d*|[+\-×÷^%!()])$/);
    if (match) {
      const next = match[1];
      setExpression(next);
      setDisplay(next === "" ? "0" : next);
    } else {
      setExpression("");
      setDisplay("0");
    }
  }

  function handleNegate() {
    setError(false);
    setResult(null);
    setJustEvaluated(false);
    // Try to negate the last number in expression
    const match = expression.match(/^(.*?)(-?\d+\.?\d*)$/);
    if (match) {
      const before = match[1];
      const num = match[2];
      const negated = num.startsWith("-") ? num.slice(1) : "-" + num;
      const next = before + negated;
      setExpression(next);
      setDisplay(next);
    } else if (display !== "0") {
      const neg = display.startsWith("-") ? display.slice(1) : "-" + display;
      setExpression(neg);
      setDisplay(neg);
    }
  }

  function handleSquare() {
    setError(false);
    setResult(null);
    setJustEvaluated(false);
    const next = expression + "²";
    // We'll handle ² in evaluation
    setExpression(next);
    setDisplay(next);
  }

  function handlePercent() {
    setError(false);
    setResult(null);
    setJustEvaluated(false);
    // Append % — handle in eval
    const next = expression + "%";
    setExpression(next);
    setDisplay(next);
  }

  function evaluate() {
    if (!expression || expression.trim() === "") return;
    try {
      // Pre-process ² and %
      let expr = expression
        .replace(/(\d+(?:\.\d+)?)²/g, "(($1)*($1))")
        .replace(/(\d+(?:\.\d+)?)%/g, "(($1)/100)")
        .replace(/\^/g, "**");

      const val = evaluateExpression(expr, angleMode);
      if (!isFinite(val) || isNaN(val)) {
        setResult("Erro");
        setError(true);
        return;
      }
      // Format: avoid floating point noise
      const formatted =
        Number.isInteger(val) && Math.abs(val) < 1e15
          ? String(val)
          : parseFloat(val.toPrecision(12)).toString();

      const entry: HistoryEntry = {
        expression,
        result: formatted,
      };
      setHistory((prev) => {
        const next = [...prev, entry];
        return next.slice(-10);
      });
      setLastResult(formatted);
      setResult(formatted);
      setExpression(formatted);
      setDisplay(formatted);
      setJustEvaluated(true);
    } catch {
      setResult("Erro");
      setError(true);
    }
  }

  // ── Memory ──────────────────────────────────────────────────────────────────

  function handleMemory(op: string) {
    const current = parseFloat(currentDisplay.replace(",", "."));
    switch (op) {
      case "MC":
        setMemory(0);
        setHasMemory(false);
        break;
      case "MR":
        if (hasMemory) {
          const val = String(memory);
          if (justEvaluated) {
            setExpression(val);
            setDisplay(val);
            setJustEvaluated(false);
          } else {
            const next = expression + val;
            setExpression(next);
            setDisplay(next);
          }
          setResult(null);
        }
        break;
      case "M+":
        if (!isNaN(current)) {
          setMemory((m) => m + current);
          setHasMemory(true);
        }
        break;
      case "M-":
        if (!isNaN(current)) {
          setMemory((m) => m - current);
          setHasMemory(true);
        }
        break;
    }
  }

  // ── Ans ─────────────────────────────────────────────────────────────────────

  function handleAns() {
    if (!lastResult) return;
    const next = expression + lastResult;
    setExpression(next);
    setDisplay(next);
    setResult(null);
    setJustEvaluated(false);
  }

  // ── Copy ─────────────────────────────────────────────────────────────────────

  async function handleCopy() {
    const val = result ?? display;
    try {
      await navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  // ── Button press router ──────────────────────────────────────────────────────

  const handleButtonPress = useCallback(
    (val: string) => {
      if (val === "C") return handleClear();
      if (val === "CE") return handleCE();
      if (val === "BACKSPACE") return handleBackspace();
      if (val === "NEGATE") return handleNegate();
      if (val === "=") return evaluate();
      if (val === "²") return handleSquare();
      if (["MC", "MR", "M+", "M-"].includes(val)) return handleMemory(val);
      if (val === "%") return handlePercent();
      appendToExpression(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [expression, angleMode, justEvaluated, lastResult, memory, hasMemory, display, result]
  );

  // ── Keyboard support ─────────────────────────────────────────────────────────

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore if focused on an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const k = e.key;
      if (k >= "0" && k <= "9") { e.preventDefault(); handleButtonPress(k); return; }
      if (k === "+") { e.preventDefault(); handleButtonPress("+"); return; }
      if (k === "-") { e.preventDefault(); handleButtonPress("-"); return; }
      if (k === "*") { e.preventDefault(); handleButtonPress("×"); return; }
      if (k === "/") { e.preventDefault(); handleButtonPress("÷"); return; }
      if (k === ".") { e.preventDefault(); handleButtonPress("."); return; }
      if (k === "(" ) { e.preventDefault(); handleButtonPress("("); return; }
      if (k === ")") { e.preventDefault(); handleButtonPress(")"); return; }
      if (k === "^") { e.preventDefault(); handleButtonPress("^"); return; }
      if (k === "%") { e.preventDefault(); handleButtonPress("%"); return; }
      if (k === "!" ) { e.preventDefault(); handleButtonPress("!"); return; }
      if (k === "Enter" || k === "=") { e.preventDefault(); handleButtonPress("="); return; }
      if (k === "Backspace") { e.preventDefault(); handleButtonPress("BACKSPACE"); return; }
      if (k === "Delete" || k === "Escape") { e.preventDefault(); handleButtonPress("C"); return; }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleButtonPress]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4"
      style={{ background: "#0f0f1a" }}
    >
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Calculadora <span style={{ color: "#f97316" }}>Científica</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Descomplicai — teclado suportado
        </p>
      </div>

      {/* Calculator body */}
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#1e1e2e", border: "1px solid #2d2d3d" }}
      >
        {/* ── Display ─────────────────────────────────────────────────────── */}
        <div className="p-4 pb-2" style={{ background: "#13131f" }}>
          {/* History */}
          <div
            className="mb-2 h-24 overflow-y-auto rounded-lg px-3 py-2 text-right"
            style={{ background: "#0d0d18" }}
          >
            {history.length === 0 ? (
              <p className="text-gray-600 text-xs italic">
                O histórico aparece aqui
              </p>
            ) : (
              history.map((h, i) => (
                <div
                  key={i}
                  className="text-xs mb-1 leading-tight"
                  style={{ color: "#6b7280" }}
                >
                  <span className="text-gray-500">{h.expression}</span>
                  <span className="ml-2 font-semibold" style={{ color: "#9ca3af" }}>
                    = {h.result}
                  </span>
                </div>
              ))
            )}
            <div ref={historyEndRef} />
          </div>

          {/* Current expression */}
          <div className="text-right px-2">
            <div
              className="text-sm font-mono mb-1 truncate"
              style={{ color: "#6b7280", minHeight: "20px" }}
            >
              {expression || " "}
            </div>
            {/* Main result display */}
            <div
              className="font-mono font-bold tracking-tight"
              style={{
                color: error ? "#ef4444" : result ? "#f97316" : "#ffffff",
                fontSize:
                  currentDisplay.length > 14
                    ? "1.4rem"
                    : currentDisplay.length > 10
                    ? "1.8rem"
                    : "2.4rem",
                lineHeight: 1.1,
                minHeight: "2.6rem",
                wordBreak: "break-all",
              }}
            >
              {currentDisplay}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex gap-2">
              {/* Mode toggle */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() =>
                  setMode((m) => (m === "standard" ? "scientific" : "standard"))
                }
                className="text-xs font-semibold px-3 py-1 rounded-full transition-colors"
                style={{
                  background: mode === "scientific" ? "#f97316" : "#2d2d3d",
                  color: "#fff",
                }}
              >
                {mode === "scientific" ? "Cient." : "Padrão"}
              </motion.button>

              {/* DEG/RAD toggle */}
              <AnimatePresence>
                {mode === "scientific" && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() =>
                      setAngleMode((m) => (m === "DEG" ? "RAD" : "DEG"))
                    }
                    className="text-xs font-semibold px-3 py-1 rounded-full transition-colors"
                    style={{
                      background: angleMode === "RAD" ? "#1d4ed8" : "#374151",
                      color: "#fff",
                    }}
                  >
                    {angleMode}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 items-center">
              {/* Ans button */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleAns}
                disabled={!lastResult}
                className="text-xs font-semibold px-3 py-1 rounded-full transition-colors disabled:opacity-30"
                style={{ background: "#065f46", color: "#fff" }}
              >
                Ans
              </motion.button>

              {/* Memory indicator */}
              {hasMemory && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: "#1d4ed8", color: "#fff" }}
                >
                  M
                </span>
              )}

              {/* Copy button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{
                  background: copied ? "#065f46" : "#2d2d3d",
                  color: copied ? "#34d399" : "#9ca3af",
                }}
              >
                {copied ? "Copiado!" : "Copiar"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Scientific Buttons (animated) ───────────────────────────────── */}
        <AnimatePresence>
          {mode === "scientific" && (
            <motion.div
              key="sci-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ overflow: "hidden", background: "#18182a" }}
            >
              <div className="p-3 pb-1">
                {SCIENTIFIC_EXTRA_ROWS.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid gap-2 mb-2"
                    style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
                  >
                    {row.map((btn) => (
                      <CalcButton
                        key={btn.value}
                        btn={btn}
                        onPress={handleButtonPress}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Standard Buttons ────────────────────────────────────────────── */}
        <div className="p-3 pt-2">
          {STANDARD_ROWS.map((row, ri) => {
            // Last row: we want ± and . to be normal, 0 to be wide, = to be normal
            // Actually keep uniform 4-col grid; 0 can be double-wide in last row
            const isLastRow = ri === STANDARD_ROWS.length - 1;
            if (isLastRow) {
              // [±, 0(wide), ., =]  → 4 cols but 0 spans 2
              return (
                <div
                  key={ri}
                  className="grid gap-2 mb-2"
                  style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
                >
                  {row.map((btn) => (
                    <CalcButton
                      key={btn.value}
                      btn={btn}
                      onPress={handleButtonPress}
                      wide={btn.value === "0"}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div
                key={ri}
                className="grid gap-2 mb-2"
                style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
              >
                {row.map((btn) => (
                  <CalcButton
                    key={btn.value}
                    btn={btn}
                    onPress={handleButtonPress}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Keyboard cheat sheet ─────────────────────────────────────────── */}
      <div
        className="mt-4 text-center max-w-md w-full text-xs text-gray-600 px-2"
      >
        Teclado: <kbd className="bg-gray-800 text-gray-400 px-1 rounded">0-9</kbd>{" "}
        <kbd className="bg-gray-800 text-gray-400 px-1 rounded">+ - * /</kbd>{" "}
        <kbd className="bg-gray-800 text-gray-400 px-1 rounded">Enter</kbd>{" "}
        <kbd className="bg-gray-800 text-gray-400 px-1 rounded">Backspace</kbd>{" "}
        <kbd className="bg-gray-800 text-gray-400 px-1 rounded">Esc</kbd>
      </div>
    </main>
  );
}
