"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Morse alphabet ───────────────────────────────────────────────────────────
const TEXT_TO_MORSE: Record<string, string> = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",
  F: "..-.",  G: "--.",   H: "....",  I: "..",    J: ".---",
  K: "-.-",   L: ".-..",  M: "--",    N: "-.",    O: "---",
  P: ".--.",  Q: "--.-",  R: ".-.",   S: "...",   T: "-",
  U: "..-",   V: "...-",  W: ".--",   X: "-..-",  Y: "-.--",
  Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
  "/": "-..-.", "@": ".--.-.", "&": ".-...",  ":": "---...",
};

const MORSE_TO_TEXT: Record<string, string> = Object.fromEntries(
  Object.entries(TEXT_TO_MORSE).map(([k, v]) => [v, k])
);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") return "/";
      return TEXT_TO_MORSE[char] ?? "?";
    })
    .join(" ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(" / ")
    .map((word) =>
      word
        .split(" ")
        .map((code) => MORSE_TO_TEXT[code] ?? (code === "" ? "" : "?"))
        .join("")
    )
    .join(" ");
}

// ─── Visual morse display ─────────────────────────────────────────────────────
function MorseSymbols({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center gap-[3px]">
      {code.split("").map((ch, i) => {
        if (ch === ".") return (
          <span key={i} className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
        );
        if (ch === "-") return (
          <span key={i} className="inline-block w-5 h-2 rounded-sm bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
        );
        return null;
      })}
    </span>
  );
}

// ─── Alphabet reference ───────────────────────────────────────────────────────
const ALPHABET_GROUPS = [
  Object.entries(TEXT_TO_MORSE).filter(([k]) => /[A-Z]/.test(k)),
  Object.entries(TEXT_TO_MORSE).filter(([k]) => /[0-9]/.test(k)),
  Object.entries(TEXT_TO_MORSE).filter(([k]) => /[^A-Z0-9]/.test(k)),
];
const GROUP_LABELS = ["Letras", "Números", "Pontuação"];

// ─── WPM options ──────────────────────────────────────────────────────────────
const WPM_OPTIONS = [5, 10, 15, 20];
// Dot duration in ms at given WPM (PARIS standard: 50 units per word)
function dotDuration(wpm: number) {
  return Math.round(1200 / wpm);
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MorseCodePage() {
  const [direction, setDirection] = useState<"text-to-morse" | "morse-to-text">(
    "text-to-morse"
  );
  const [inputText, setInputText] = useState("SOS");
  const [outputText, setOutputText] = useState("... --- ...");
  const [wpm, setWpm] = useState(10);
  const [transmitting, setTransmitting] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [blink, setBlink] = useState(true);
  const [activeRefGroup, setActiveRefGroup] = useState(0);

  const transmitAbort = useRef<AbortController | null>(null);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Translation
  useEffect(() => {
    if (direction === "text-to-morse") {
      setOutputText(textToMorse(inputText));
    } else {
      setOutputText(morseToText(inputText));
    }
  }, [inputText, direction]);

  // Derived morse string for transmission
  const morseForTransmit =
    direction === "text-to-morse" ? outputText : textToMorse(outputText);

  // ─── Transmit ────────────────────────────────────────────────────────────────
  const transmit = useCallback(async () => {
    if (transmitting) {
      transmitAbort.current?.abort();
      setTransmitting(false);
      setLampOn(false);
      return;
    }

    const controller = new AbortController();
    transmitAbort.current = controller;
    setTransmitting(true);

    const dot = dotDuration(wpm);
    const dash = dot * 3;
    const symbolGap = dot;
    const charGap = dot * 3;
    const wordGap = dot * 7;

    const delay = (ms: number) =>
      new Promise<void>((res, rej) => {
        const id = setTimeout(res, ms);
        controller.signal.addEventListener("abort", () => {
          clearTimeout(id);
          rej(new DOMException("Aborted"));
        });
      });

    const morse = morseForTransmit;

    try {
      const tokens = morse.split(" ");
      for (let t = 0; t < tokens.length; t++) {
        const token = tokens[t];
        if (token === "/") {
          await delay(wordGap);
          continue;
        }
        for (let s = 0; s < token.length; s++) {
          const sym = token[s];
          setLampOn(true);
          await delay(sym === "." ? dot : dash);
          setLampOn(false);
          if (s < token.length - 1) await delay(symbolGap);
        }
        if (t < tokens.length - 1 && tokens[t + 1] !== "/") await delay(charGap);
      }
    } catch {
      // aborted
    } finally {
      setLampOn(false);
      setTransmitting(false);
    }
  }, [transmitting, morseForTransmit, wpm]);

  // ─── Copy ────────────────────────────────────────────────────────────────────
  const copyMorse = () => {
    const morse = direction === "text-to-morse" ? outputText : inputText;
    navigator.clipboard.writeText(morse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // ─── Share ───────────────────────────────────────────────────────────────────
  const shareTranslation = () => {
    const text =
      direction === "text-to-morse"
        ? `"${inputText}" em Morse: ${outputText}`
        : `Morse "${inputText}" = "${outputText}"`;
    if (navigator.share) {
      navigator.share({ title: "Código Morse — Descomplicai", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShared(true);
        setTimeout(() => setShared(false), 1800);
      });
    }
  };

  // ─── Swap ────────────────────────────────────────────────────────────────────
  const swap = () => {
    setDirection((d) =>
      d === "text-to-morse" ? "morse-to-text" : "text-to-morse"
    );
    setInputText(outputText);
  };

  const morseOutput = direction === "text-to-morse" ? outputText : "";
  const morseInput = direction === "morse-to-text" ? inputText : "";
  const displayMorse = direction === "text-to-morse" ? outputText : inputText;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "#1a1a2e",
        fontFamily: "'Courier New', 'Courier', monospace",
        color: "#fbbf24",
      }}
    >
      {/* Scan lines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* CRT vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* ─── Header ─────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-widest"
            style={{
              textShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b",
              letterSpacing: "0.15em",
            }}
          >
            Tradutor de Código Morse 📡
            <span
              className="ml-1"
              style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
            >
              ▌
            </span>
          </h1>
          <p className="mt-2 text-amber-400/60 text-sm tracking-widest uppercase">
            ·−· · ·−·· − · −·−· − −−− ·−· ·
          </p>
        </div>

        {/* ─── Lamp / Transmission ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={
              lampOn
                ? {
                    boxShadow: [
                      "0 0 24px 8px #fbbf24, 0 0 60px 20px #f59e0b88",
                      "0 0 32px 12px #fde68a, 0 0 80px 30px #fbbf2488",
                    ],
                    backgroundColor: "#fde68a",
                  }
                : {
                    boxShadow: "0 0 6px 2px #78350f44",
                    backgroundColor: "#451a03",
                  }
            }
            transition={{ duration: 0.05 }}
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl"
            style={{ borderColor: lampOn ? "#fde68a" : "#92400e" }}
          >
            {lampOn ? "💡" : "🔌"}
          </motion.div>

          {/* Speed control */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-amber-400/70 tracking-wider">VEL:</span>
            {WPM_OPTIONS.map((w) => (
              <button
                key={w}
                onClick={() => setWpm(w)}
                className="px-2 py-1 rounded text-xs tracking-widest transition-all"
                style={{
                  background: wpm === w ? "#fbbf24" : "transparent",
                  color: wpm === w ? "#1a1a2e" : "#fbbf24",
                  border: "1px solid #fbbf2466",
                }}
              >
                {w} WPM
              </button>
            ))}
          </div>

          <button
            onClick={transmit}
            className="px-8 py-2 rounded font-bold tracking-widest text-sm uppercase transition-all"
            style={{
              background: transmitting
                ? "#7f1d1d"
                : "linear-gradient(135deg, #b45309, #d97706)",
              color: transmitting ? "#fca5a5" : "#1a1a2e",
              border: transmitting ? "1px solid #f87171" : "1px solid #fbbf24",
              boxShadow: transmitting
                ? "0 0 12px #ef4444"
                : "0 0 8px #f59e0b88",
              letterSpacing: "0.2em",
            }}
          >
            {transmitting ? "■ PARAR" : "▶ TRANSMITIR"}
          </button>
        </div>

        {/* ─── Translation panels ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {/* Input */}
          <motion.div
            layout
            className="flex flex-col gap-2"
          >
            <label
              className="text-xs tracking-widest uppercase"
              style={{ color: "#fbbf2499" }}
            >
              {direction === "text-to-morse" ? "Texto →" : "Morse →"}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              placeholder={
                direction === "text-to-morse"
                  ? "Escreve aqui..."
                  : "... --- ..."
              }
              className="w-full rounded p-3 resize-none text-base leading-relaxed outline-none transition-all"
              style={{
                background: "#0f0f1e",
                color: "#fbbf24",
                border: "1px solid #fbbf2440",
                boxShadow: "inset 0 0 12px #fbbf2408",
                caretColor: "#fbbf24",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #fbbf24";
                e.target.style.boxShadow = "inset 0 0 16px #fbbf2418, 0 0 8px #fbbf2430";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #fbbf2440";
                e.target.style.boxShadow = "inset 0 0 12px #fbbf2408";
              }}
            />
          </motion.div>

          {/* Swap button */}
          <div className="flex sm:flex-col items-center justify-center gap-2 sm:pt-8">
            <button
              onClick={swap}
              title="Inverter direção"
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all"
              style={{
                background: "#0f0f1e",
                border: "1px solid #fbbf2440",
                color: "#fbbf24",
                boxShadow: "0 0 8px #fbbf2420",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 16px #fbbf24";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 8px #fbbf2420";
              }}
            >
              ↔
            </button>
          </div>

          {/* Output */}
          <motion.div layout className="flex flex-col gap-2">
            <label
              className="text-xs tracking-widest uppercase"
              style={{ color: "#fbbf2499" }}
            >
              {direction === "text-to-morse" ? "Morse" : "Texto"}
            </label>
            <div
              className="w-full rounded p-3 min-h-[144px] text-base leading-relaxed break-all select-all"
              style={{
                background: "#0f0f1e",
                border: "1px solid #fbbf2440",
                boxShadow: "inset 0 0 12px #fbbf2408",
                color: "#fbbf24",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {outputText || (
                <span style={{ color: "#fbbf2440" }}>tradução aparece aqui…</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* ─── Visual morse display ─────────────────────────────────────────────── */}
        {displayMorse && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded p-4"
            style={{
              background: "#0f0f1e",
              border: "1px solid #fbbf2430",
            }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "#fbbf2466" }}
            >
              Visualização
            </p>
            <div className="flex flex-wrap gap-3">
              {displayMorse.split(" ").map((token, i) => {
                if (token === "/")
                  return (
                    <span
                      key={i}
                      className="self-center text-amber-400/30 text-xs"
                    >
                      ·
                    </span>
                  );
                return (
                  <div key={i} className="flex items-center gap-1">
                    <MorseSymbols code={token} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Action buttons ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={copyMorse}
            className="px-4 py-2 rounded text-sm tracking-widest uppercase transition-all"
            style={{
              background: "transparent",
              color: copied ? "#4ade80" : "#fbbf24",
              border: `1px solid ${copied ? "#4ade80" : "#fbbf2466"}`,
              boxShadow: copied ? "0 0 12px #4ade8066" : "none",
            }}
          >
            {copied ? "✓ Copiado!" : "📋 Copiar Morse"}
          </button>
          <button
            onClick={shareTranslation}
            className="px-4 py-2 rounded text-sm tracking-widest uppercase transition-all"
            style={{
              background: "transparent",
              color: shared ? "#4ade80" : "#fbbf24",
              border: `1px solid ${shared ? "#4ade80" : "#fbbf2466"}`,
              boxShadow: shared ? "0 0 12px #4ade8066" : "none",
            }}
          >
            {shared ? "✓ Partilhado!" : "🔗 Partilhar"}
          </button>
        </div>

        {/* ─── Fun fact ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded p-4 text-center text-sm"
          style={{
            background: "#0f0f1e",
            border: "1px dashed #fbbf2430",
            color: "#fbbf2480",
          }}
        >
          <span className="text-amber-400/40 mr-2">📻</span>
          <strong className="text-amber-400">SOS</strong>
          <span className="text-amber-300/60">
            {" "}(··· ─── ···) foi o primeiro sinal de socorro internacional,
            adoptado em 1906 — não significa "Save Our Souls", mas foi escolhido
            por ser simples e inconfundível.
          </span>
        </motion.div>

        {/* ─── Alphabet reference ───────────────────────────────────────────────── */}
        <div
          className="rounded overflow-hidden"
          style={{ border: "1px solid #fbbf2430" }}
        >
          <button
            onClick={() => setShowRef((s) => !s)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm tracking-widest uppercase transition-all"
            style={{
              background: showRef ? "#fbbf2410" : "#0f0f1e",
              color: "#fbbf24",
            }}
          >
            <span>📖 Tabela de Referência</span>
            <motion.span
              animate={{ rotate: showRef ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showRef && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden", background: "#0f0f1e" }}
              >
                <div className="p-4 flex flex-col gap-4">
                  {/* Group tabs */}
                  <div className="flex gap-2">
                    {GROUP_LABELS.map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveRefGroup(i)}
                        className="px-3 py-1 rounded text-xs tracking-widest uppercase transition-all"
                        style={{
                          background:
                            activeRefGroup === i ? "#fbbf24" : "transparent",
                          color:
                            activeRefGroup === i ? "#1a1a2e" : "#fbbf2480",
                          border: "1px solid #fbbf2440",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {ALPHABET_GROUPS[activeRefGroup].map(([char, code]) => (
                      <div
                        key={char}
                        className="rounded p-2 flex flex-col items-center gap-1 transition-all cursor-default"
                        style={{
                          background: "#16162a",
                          border: "1px solid #fbbf2420",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.border =
                            "1px solid #fbbf2466";
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            "0 0 8px #fbbf2420";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.border =
                            "1px solid #fbbf2420";
                          (e.currentTarget as HTMLDivElement).style.boxShadow =
                            "none";
                        }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ color: "#fbbf24" }}
                        >
                          {char}
                        </span>
                        <span
                          className="text-xs tracking-wider"
                          style={{ color: "#fbbf2466" }}
                        >
                          {code}
                        </span>
                        <MorseSymbols code={code} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs tracking-widest"
          style={{ color: "#fbbf2430" }}
        >
          DESCOMPLICAI · CÓDIGO MORSE · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
