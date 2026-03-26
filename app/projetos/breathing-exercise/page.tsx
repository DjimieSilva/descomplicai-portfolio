"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

type BreathPhase = "inhale" | "hold" | "exhale" | "idle";
type SessionState = "idle" | "running" | "complete";

interface BreathPattern {
  id: string;
  label: string;
  subtitle: string;
  inhale: number;
  hold: number;
  exhale: number;
  emoji: string;
}

interface SessionDuration {
  label: string;
  seconds: number;
}

const PATTERNS: BreathPattern[] = [
  {
    id: "relaxar",
    label: "Relaxar",
    subtitle: "4 · 4 · 4",
    inhale: 4,
    hold: 4,
    exhale: 4,
    emoji: "🌊",
  },
  {
    id: "acalmar",
    label: "Acalmar",
    subtitle: "4 · 7 · 8",
    inhale: 4,
    hold: 7,
    exhale: 8,
    emoji: "🌙",
  },
  {
    id: "energizar",
    label: "Energizar",
    subtitle: "3 · 1 · 3",
    inhale: 3,
    hold: 1,
    exhale: 3,
    emoji: "☀️",
  },
];

const DURATIONS: SessionDuration[] = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

const PHASE_LABELS: Record<BreathPhase, string> = {
  inhale: "Inspira...",
  hold: "Segura...",
  exhale: "Expira...",
  idle: "Pronto",
};

// Background gradient per phase
const PHASE_BG: Record<BreathPhase, string> = {
  inhale: "from-blue-100 via-sky-50 to-indigo-100",
  hold: "from-purple-100 via-violet-50 to-indigo-100",
  exhale: "from-emerald-100 via-teal-50 to-green-100",
  idle: "from-blue-100 via-sky-50 to-purple-100",
};

// Circle gradient per phase
const CIRCLE_GRADIENT: Record<BreathPhase, [string, string]> = {
  inhale: ["#bfdbfe", "#93c5fd"],
  hold: ["#ddd6fe", "#c4b5fd"],
  exhale: ["#a7f3d0", "#6ee7b7"],
  idle: ["#dbeafe", "#e0e7ff"],
};

// Ring colors per phase
const RING_COLOR: Record<BreathPhase, string> = {
  inhale: "rgba(147,197,253,0.25)",
  hold: "rgba(196,181,253,0.25)",
  exhale: "rgba(110,231,183,0.25)",
  idle: "rgba(147,197,253,0.2)",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BreathingExercisePage() {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>(PATTERNS[0]);
  const [selectedDuration, setSelectedDuration] = useState<SessionDuration>(DURATIONS[1]);
  const [sessionState, setSessionState] = useState<SessionState>("idle");

  // Runtime state
  const [phase, setPhase] = useState<BreathPhase>("idle");
  const [phaseCountdown, setPhaseCountdown] = useState(0);
  const [sessionRemaining, setSessionRemaining] = useState(0);
  const [completedBreaths, setCompletedBreaths] = useState(0);
  const [totalSessionTime, setTotalSessionTime] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // We track phase internally via refs to avoid stale closures
  const phaseRef = useRef<BreathPhase>("idle");
  const patternRef = useRef<BreathPattern>(selectedPattern);
  const sessionRunning = useRef(false);

  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    intervalRef.current = null;
    phaseTimerRef.current = null;
    sessionTimerRef.current = null;
  }, []);

  const runPhase = useCallback((p: BreathPhase, durationSecs: number) => {
    phaseRef.current = p;
    setPhase(p);
    setPhaseCountdown(durationSecs);

    // Countdown within phase
    let remaining = durationSecs;
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      setPhaseCountdown(remaining);
      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 1000);

    // Advance to next phase after duration
    phaseTimerRef.current = setTimeout(() => {
      if (!sessionRunning.current) return;
      const pat = patternRef.current;

      if (p === "inhale") {
        runPhase("hold", pat.hold);
      } else if (p === "hold") {
        runPhase("exhale", pat.exhale);
      } else if (p === "exhale") {
        setCompletedBreaths((prev) => prev + 1);
        runPhase("inhale", pat.inhale);
      }
    }, durationSecs * 1000);
  }, []);

  const startSession = useCallback(() => {
    clearAllTimers();
    sessionRunning.current = true;
    patternRef.current = selectedPattern;

    setSessionState("running");
    setCompletedBreaths(0);
    setSessionRemaining(selectedDuration.seconds);
    setTotalSessionTime(selectedDuration.seconds);

    // Session countdown
    let remaining = selectedDuration.seconds;
    sessionTimerRef.current = setInterval(() => {
      remaining -= 1;
      setSessionRemaining(remaining);
      if (remaining <= 0) {
        if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
        sessionRunning.current = false;
        clearAllTimers();
        setPhase("idle");
        setSessionState("complete");
      }
    }, 1000);

    // Start with inhale
    runPhase("inhale", selectedPattern.inhale);
  }, [selectedPattern, selectedDuration, clearAllTimers, runPhase]);

  const stopSession = useCallback(() => {
    sessionRunning.current = false;
    clearAllTimers();
    setSessionState("idle");
    setPhase("idle");
    setPhaseCountdown(0);
    setSessionRemaining(0);
    setCompletedBreaths(0);
  }, [clearAllTimers]);

  const resetToIdle = useCallback(() => {
    stopSession();
  }, [stopSession]);

  // Sync pattern ref when selection changes (only applies before session starts)
  useEffect(() => {
    if (sessionState === "idle") {
      patternRef.current = selectedPattern;
    }
  }, [selectedPattern, sessionState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sessionRunning.current = false;
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // ---------------------------------------------------------------------------
  // Derived visual state
  // ---------------------------------------------------------------------------

  const isExpanded = phase === "inhale" || phase === "hold";
  const circleScale = phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 1;
  const bgPhase = sessionState === "running" ? phase : "idle";
  const [gradA, gradB] = CIRCLE_GRADIENT[bgPhase];
  const ringColor = RING_COLOR[bgPhase];

  const sessionProgress =
    sessionState === "running" && totalSessionTime > 0
      ? 1 - sessionRemaining / totalSessionTime
      : 0;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${PHASE_BG[bgPhase]} transition-all duration-[2000ms] ease-in-out flex flex-col items-center justify-between py-6 px-4 overflow-hidden`}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-1">
          Descomplicai
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">
          Exercício de Respiração
        </h1>
      </motion.div>

      {/* ── Main content area ── */}
      <AnimatePresence mode="wait">
        {sessionState === "complete" ? (
          /* ─── Session complete screen ─── */
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="text-7xl">🧘</div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-700 mb-2">
                Parabéns!
              </h2>
              <p className="text-slate-500 text-lg">Sessão concluída com sucesso.</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 flex flex-col items-center shadow-sm">
                <span className="text-3xl font-bold text-indigo-500">{completedBreaths}</span>
                <span className="text-xs text-slate-500 mt-1 font-medium">respirações</span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 flex flex-col items-center shadow-sm">
                <span className="text-3xl font-bold text-violet-500">
                  {formatTime(totalSessionTime)}
                </span>
                <span className="text-xs text-slate-500 mt-1 font-medium">duração</span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 flex flex-col items-center shadow-sm">
                <span className="text-3xl font-bold text-teal-500">
                  {selectedPattern.emoji}
                </span>
                <span className="text-xs text-slate-500 mt-1 font-medium">
                  {selectedPattern.label}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetToIdle}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-colors"
            >
              Nova Sessão
            </motion.button>
          </motion.div>
        ) : (
          /* ─── Main exercise area ─── */
          <motion.div
            key="exercise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-sm"
          >
            {/* ── Breathing Circle ── */}
            <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
              {/* Concentric pulsing rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 260 + i * 40,
                    height: 260 + i * 40,
                    backgroundColor: ringColor,
                    border: `1px solid ${ringColor}`,
                  }}
                  animate={{
                    scale: isExpanded ? [1, 1.06, 1] : [1, 0.96, 1],
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: isExpanded ? selectedPattern.inhale : selectedPattern.exhale,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Main breathing circle */}
              <motion.div
                className="relative rounded-full flex flex-col items-center justify-center shadow-2xl cursor-default select-none"
                style={{
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle at 35% 35%, ${gradA}, ${gradB})`,
                }}
                animate={{
                  scale: circleScale,
                }}
                transition={{
                  duration:
                    phase === "inhale"
                      ? selectedPattern.inhale
                      : phase === "exhale"
                      ? selectedPattern.exhale
                      : 0.4,
                  ease: phase === "inhale" ? "easeIn" : phase === "exhale" ? "easeOut" : "easeInOut",
                }}
              >
                {/* Phase label */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-600 font-semibold text-lg text-center leading-tight"
                  >
                    {sessionState === "running"
                      ? PHASE_LABELS[phase]
                      : "Pronto"}
                  </motion.span>
                </AnimatePresence>

                {/* Countdown */}
                {sessionState === "running" && phaseCountdown > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${phase}-${phaseCountdown}`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                      className="text-4xl font-bold text-slate-700 mt-1"
                    >
                      {phaseCountdown}
                    </motion.span>
                  </AnimatePresence>
                )}
              </motion.div>
            </div>

            {/* ── Session info bar ── */}
            {sessionState === "running" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-slate-700">{formatTime(sessionRemaining)}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">restante</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-slate-700">{completedBreaths}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">respirações</span>
                </div>
                {/* Progress arc */}
                <div className="ml-1">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="3"
                      strokeDasharray={`${2 * Math.PI * 15}`}
                      strokeDashoffset={`${2 * Math.PI * 15 * (1 - sessionProgress)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Controls ── */}
      {sessionState !== "complete" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-5 w-full max-w-sm"
        >
          {/* Pattern selector */}
          <div className="w-full">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Padrão
            </p>
            <div className="flex gap-2 justify-center">
              {PATTERNS.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: sessionState === "idle" ? 1.05 : 1 }}
                  whileTap={{ scale: sessionState === "idle" ? 0.96 : 1 }}
                  onClick={() => {
                    if (sessionState === "idle") setSelectedPattern(p);
                  }}
                  disabled={sessionState === "running"}
                  className={`flex flex-col items-center px-4 py-2.5 rounded-2xl border transition-all duration-200 flex-1
                    ${
                      selectedPattern.id === p.id
                        ? "bg-indigo-500 border-indigo-500 text-white shadow-md"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:border-indigo-300"
                    }
                    ${sessionState === "running" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className="text-base">{p.emoji}</span>
                  <span className="text-xs font-bold mt-0.5">{p.label}</span>
                  <span className="text-[10px] opacity-70">{p.subtitle}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Duration selector */}
          <div className="w-full">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              Duração
            </p>
            <div className="flex gap-2 justify-center">
              {DURATIONS.map((d) => (
                <motion.button
                  key={d.seconds}
                  whileHover={{ scale: sessionState === "idle" ? 1.05 : 1 }}
                  whileTap={{ scale: sessionState === "idle" ? 0.96 : 1 }}
                  onClick={() => {
                    if (sessionState === "idle") setSelectedDuration(d);
                  }}
                  disabled={sessionState === "running"}
                  className={`px-3 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 flex-1
                    ${
                      selectedDuration.seconds === d.seconds
                        ? "bg-violet-500 border-violet-500 text-white shadow-md"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:border-violet-300"
                    }
                    ${sessionState === "running" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {d.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Start / Stop */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={sessionState === "idle" ? startSession : stopSession}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-colors duration-300
              ${
                sessionState === "running"
                  ? "bg-rose-400 hover:bg-rose-500 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
          >
            {sessionState === "running" ? "Parar Sessão" : "Iniciar Sessão"}
          </motion.button>

          {/* Pattern description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedPattern.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-center text-xs text-slate-500"
            >
              {selectedPattern.label} —{" "}
              {selectedPattern.inhale}s inspira · {selectedPattern.hold}s segura ·{" "}
              {selectedPattern.exhale}s expira
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
