"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SENTENCES = [
  "A simplicidade é a sofisticação máxima.",
  "Quem não arrisca não petisca, mas quem arrisca demais também não.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Não esperes o momento perfeito — pega no momento e torna-o perfeito.",
  "A criatividade é a inteligência a divertir-se.",
  "Começa onde estás, usa o que tens, faz o que podes.",
  "As grandes realizações começam com pequenas decisões corajosas.",
  "O único modo de fazer um grande trabalho é amar o que fazes.",
  "Aprende como se fosses viver para sempre, vive como se fosses morrer amanhã.",
  "A persistência realiza o impossível.",
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CharState = "upcoming" | "current" | "correct" | "incorrect";
type Phase = "idle" | "typing" | "finished";

interface CharData {
  char: string;
  state: CharState;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRandomSentence(exclude?: string): string {
  const pool = SENTENCES.filter((s) => s !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildChars(sentence: string): CharData[] {
  return sentence.split("").map((char, i) => ({
    char,
    state: i === 0 ? "current" : "upcoming",
  }));
}

function calcWPM(correctChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds === 0) return 0;
  const words = correctChars / 5;
  const minutes = elapsedSeconds / 60;
  return Math.round(words / minutes);
}

function ratingFromWPM(wpm: number): { emoji: string; label: string; color: string } {
  if (wpm < 30) return { emoji: "🐌", label: "Devagar mas seguro!", color: "#94a3b8" };
  if (wpm < 50) return { emoji: "🚶", label: "Bom ritmo!", color: "#f59e0b" };
  if (wpm < 70) return { emoji: "🏃", label: "Ótima velocidade!", color: "#10b981" };
  if (wpm < 90) return { emoji: "🚀", label: "Impressionante!", color: "#3b82f6" };
  return { emoji: "⚡", label: "Lendário!", color: "#a855f7" };
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TypingSpeedTest() {
  const [sentence, setSentence] = useState<string>(() => getRandomSentence());
  const [chars, setChars] = useState<CharData[]>(() => buildChars(getRandomSentence()));
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorIndex, setCursorIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [keystrokeFlash, setKeystrokeFlash] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derived
  const wpm = calcWPM(correctCount, elapsed);
  const accuracy = totalTyped === 0 ? 100 : Math.round((correctCount / totalTyped) * 100);
  const progress = Math.round((cursorIndex / chars.length) * 100);
  const rating = ratingFromWPM(wpm);

  // Focus input whenever phase is typing
  useEffect(() => {
    if (phase === "typing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  // Timer
  useEffect(() => {
    if (phase === "typing") {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  // ---------------------------------------------------------------------------
  // Reset
  // ---------------------------------------------------------------------------

  const reset = useCallback(() => {
    const next = getRandomSentence(sentence);
    setSentence(next);
    setChars(buildChars(next));
    setPhase("idle");
    setCursorIndex(0);
    setCorrectCount(0);
    setTotalTyped(0);
    setElapsed(0);
    setKeystrokeFlash(false);
  }, [sentence]);

  // ---------------------------------------------------------------------------
  // Keystroke handler
  // ---------------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (phase === "finished") return;

      // Ignore modifier-only keys
      if (e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta") return;

      // Prevent default to avoid cursor moves in hidden input
      e.preventDefault();

      // Flash
      setKeystrokeFlash(true);
      setTimeout(() => setKeystrokeFlash(false), 80);

      if (e.key === "Backspace") {
        if (cursorIndex === 0) return;
        const newIndex = cursorIndex - 1;
        setChars((prev) => {
          const updated = [...prev];
          updated[newIndex] = { ...updated[newIndex], state: newIndex === 0 ? "current" : "upcoming" };
          // Make old current → upcoming
          if (cursorIndex < updated.length) {
            updated[cursorIndex] = { ...updated[cursorIndex], state: "upcoming" };
          }
          // New current
          updated[newIndex] = { ...updated[newIndex], state: "current" };
          return updated;
        });
        setCursorIndex(newIndex);
        return;
      }

      if (e.key.length !== 1) return; // non-printable

      // Start timer on first keystroke
      if (phase === "idle") {
        setPhase("typing");
      }

      const expected = chars[cursorIndex]?.char;
      const isCorrect = e.key === expected;

      setTotalTyped((prev) => prev + 1);
      if (isCorrect) setCorrectCount((prev) => prev + 1);

      setChars((prev) => {
        const updated = [...prev];
        updated[cursorIndex] = {
          ...updated[cursorIndex],
          state: isCorrect ? "correct" : "incorrect",
        };
        const nextIndex = cursorIndex + 1;
        if (nextIndex < updated.length) {
          updated[nextIndex] = { ...updated[nextIndex], state: "current" };
        }
        return updated;
      });

      const nextIndex = cursorIndex + 1;
      setCursorIndex(nextIndex);

      if (nextIndex === chars.length) {
        setPhase("finished");
      }
    },
    [phase, cursorIndex, chars]
  );

  // ---------------------------------------------------------------------------
  // Char color map
  // ---------------------------------------------------------------------------

  const charColors: Record<CharState, string> = {
    upcoming: "#9ca3af",
    current: "#1f2937",
    correct: "#16a34a",
    incorrect: "#dc2626",
  };

  const charBg: Record<CharState, string> = {
    upcoming: "transparent",
    current: "#dbeafe",
    correct: "transparent",
    incorrect: "#fee2e2",
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#fefce8" }}
      onClick={() => {
        if (phase !== "finished" && inputRef.current) inputRef.current.focus();
      }}
    >
      {/* Hidden input that captures all keystrokes */}
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        readOnly
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: "#1f2937" }}>
            Teste de{" "}
            <span style={{ color: "#3b82f6" }}>Digitação</span>
          </h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>
            Clica em qualquer lugar e começa a escrever
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase !== "finished" ? (
            <motion.div
              key="typing-area"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats bar */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex gap-6">
                  <Stat label="WPM" value={phase === "idle" ? "—" : String(wpm)} color="#3b82f6" />
                  <Stat label="Precisão" value={phase === "idle" ? "—" : `${accuracy}%`} color="#10b981" />
                  <Stat label="Tempo" value={formatTime(elapsed)} color="#f59e0b" />
                </div>
                <div
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
                >
                  {progress}%
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="h-1.5 rounded-full mb-6 overflow-hidden"
                style={{ backgroundColor: "#e5e7eb" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#3b82f6" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Text display */}
              <motion.div
                className="rounded-2xl p-6 md:p-8 mb-6 cursor-text select-none relative overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid",
                  borderColor: keystrokeFlash ? "#93c5fd" : "#e5e7eb",
                  boxShadow: keystrokeFlash
                    ? "0 0 0 4px rgba(59,130,246,0.12)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "border-color 0.08s, box-shadow 0.08s",
                }}
              >
                {/* Keystroke flash overlay */}
                <AnimatePresence>
                  {keystrokeFlash && (
                    <motion.div
                      key="flash"
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ backgroundColor: "rgba(59,130,246,0.04)" }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.08 }}
                    />
                  )}
                </AnimatePresence>

                <p className="text-xl md:text-2xl leading-relaxed font-mono tracking-wide break-words">
                  {chars.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        color: charColors[c.state],
                        backgroundColor: charBg[c.state],
                        borderRadius: "2px",
                        transition: "color 0.05s",
                        position: "relative",
                      }}
                    >
                      {c.char === " " && c.state === "current" ? "\u00a0" : c.char}
                      {c.state === "current" && (
                        <motion.span
                          className="absolute bottom-0 left-0 w-full"
                          style={{
                            height: "2px",
                            backgroundColor: "#3b82f6",
                            borderRadius: "1px",
                          }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </span>
                  ))}
                </p>

                {phase === "idle" && (
                  <p
                    className="text-xs mt-4 text-center"
                    style={{ color: "#9ca3af" }}
                  >
                    ↑ começa a escrever o texto acima
                  </p>
                )}
              </motion.div>

              {/* Keyboard hint */}
              <p className="text-center text-xs" style={{ color: "#9ca3af" }}>
                <kbd
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #d1d5db",
                    color: "#6b7280",
                    fontFamily: "monospace",
                  }}
                >
                  Backspace
                </kbd>{" "}
                para corrigir
              </p>
            </motion.div>
          ) : (
            /* Results screen */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className="rounded-3xl p-8 md:p-12 text-center"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #e5e7eb",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Emoji rating */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="text-7xl mb-4"
                  role="img"
                  aria-label={rating.label}
                >
                  {rating.emoji}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl font-bold mb-1"
                  style={{ color: rating.color }}
                >
                  {rating.label}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-sm mb-8"
                  style={{ color: "#6b7280" }}
                >
                  Aqui estão os teus resultados
                </motion.p>

                {/* Results grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-3 gap-4 mb-8"
                >
                  <ResultCard label="WPM" value={String(wpm)} color="#3b82f6" />
                  <ResultCard label="Precisão" value={`${accuracy}%`} color="#10b981" />
                  <ResultCard label="Tempo" value={formatTime(elapsed)} color="#f59e0b" />
                </motion.div>

                {/* Rating scale */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex justify-center gap-3 flex-wrap mb-8"
                >
                  {[
                    { emoji: "🐌", range: "<30" },
                    { emoji: "🚶", range: "30-50" },
                    { emoji: "🏃", range: "50-70" },
                    { emoji: "🚀", range: "70-90" },
                    { emoji: "⚡", range: "90+" },
                  ].map(({ emoji, range }) => (
                    <span
                      key={range}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{
                        backgroundColor:
                          rating.emoji === emoji ? "#eff6ff" : "#f9fafb",
                        color: rating.emoji === emoji ? "#3b82f6" : "#9ca3af",
                        border: `1px solid ${rating.emoji === emoji ? "#bfdbfe" : "#e5e7eb"}`,
                        fontWeight: rating.emoji === emoji ? 600 : 400,
                      }}
                    >
                      {emoji} {range} WPM
                    </span>
                  ))}
                </motion.div>

                {/* Retry button */}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  onClick={reset}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white text-sm transition-shadow"
                  style={{
                    backgroundColor: "#3b82f6",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                  }}
                >
                  Tentar Novamente
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
        {label}
      </span>
      <span className="text-lg font-bold leading-tight" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-2xl py-5 px-3 flex flex-col items-center gap-1"
      style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
    >
      <span className="text-2xl md:text-3xl font-bold" style={{ color }}>
        {value}
      </span>
      <span className="text-xs font-medium" style={{ color: "#6b7280" }}>
        {label}
      </span>
    </div>
  );
}
