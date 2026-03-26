"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "work" | "break" | "longBreak";

interface Settings {
  work: number;
  break: number;
  longBreak: number;
}

interface Task {
  id: string;
  text: string;
  completedAt: string;
}

interface DayStats {
  date: string;
  totalFocusSeconds: number;
  sessionsCompleted: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSIONS_BEFORE_LONG_BREAK = 4;
const CIRCLE_RADIUS = 110;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const MODE_CONFIG: Record<
  Mode,
  { label: string; emoji: string; bg: string; accent: string; ring: string }
> = {
  work: {
    label: "Foco",
    emoji: "🎯",
    bg: "#fef2f2",
    accent: "#ef4444",
    ring: "#fca5a5",
  },
  break: {
    label: "Pausa",
    emoji: "☕",
    bg: "#f0fdf4",
    accent: "#22c55e",
    ring: "#86efac",
  },
  longBreak: {
    label: "Pausa Longa",
    emoji: "🌴",
    bg: "#eff6ff",
    accent: "#3b82f6",
    ring: "#93c5fd",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadStats(): DayStats {
  if (typeof window === "undefined")
    return { date: todayKey(), totalFocusSeconds: 0, sessionsCompleted: 0 };
  try {
    const raw = localStorage.getItem("pomodoro_stats_" + todayKey());
    if (raw) return JSON.parse(raw);
  } catch {}
  return { date: todayKey(), totalFocusSeconds: 0, sessionsCompleted: 0 };
}

function saveStats(stats: DayStats) {
  if (typeof window === "undefined") return;
  localStorage.setItem("pomodoro_stats_" + stats.date, JSON.stringify(stats));
}

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("pomodoro_tasks_" + todayKey());
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    "pomodoro_tasks_" + todayKey(),
    JSON.stringify(tasks)
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function formatFocusTime(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}min`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PomodoroPage() {
  const [settings, setSettings] = useState<Settings>({
    work: 25,
    break: 5,
    longBreak: 15,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(settings.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workSessionCount, setWorkSessionCount] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DayStats>(loadStats);
  const [flash, setFlash] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalDurationRef = useRef(settings.work * 60);
  const focusAccumulatorRef = useRef(0);

  // Sync totalDuration when mode/settings change
  useEffect(() => {
    const dur =
      mode === "work"
        ? settings.work * 60
        : mode === "break"
        ? settings.break * 60
        : settings.longBreak * 60;
    totalDurationRef.current = dur;
    setTimeLeft(dur);
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  }, [mode, settings]);

  // Load persisted data on mount
  useEffect(() => {
    setCompletedTasks(loadTasks());
    setStats(loadStats());
  }, []);

  const triggerFlash = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  }, []);

  const advanceMode = useCallback(() => {
    triggerFlash();
    setIsRunning(false);
    clearInterval(intervalRef.current!);

    if (mode === "work") {
      const newCount = workSessionCount + 1;
      setWorkSessionCount(newCount);

      // Save focus stats
      const focusSecs = settings.work * 60;
      const updatedStats = {
        ...stats,
        totalFocusSeconds: stats.totalFocusSeconds + focusSecs,
        sessionsCompleted: stats.sessionsCompleted + 1,
      };
      setStats(updatedStats);
      saveStats(updatedStats);

      if (newCount % SESSIONS_BEFORE_LONG_BREAK === 0) {
        setShowSuggestion(true);
        setMode("longBreak");
      } else {
        setMode("break");
      }
    } else {
      setShowSuggestion(false);
      setMode("work");
    }
  }, [mode, workSessionCount, settings.work, stats, triggerFlash]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          advanceMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, advanceMode]);

  // Update document title
  useEffect(() => {
    if (typeof document === "undefined") return;
    const cfg = MODE_CONFIG[mode];
    document.title = isRunning
      ? `${formatTime(timeLeft)} ${cfg.emoji} Pomodoro — Descomplicai`
      : "Pomodoro Timer — Descomplicai";
  }, [timeLeft, isRunning, mode]);

  const cfg = MODE_CONFIG[mode];
  const progress = timeLeft / totalDurationRef.current;
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE * (1 - progress);

  function handleStartPause() {
    setIsRunning((r) => !r);
  }

  function handleReset() {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    const dur =
      mode === "work"
        ? settings.work * 60
        : mode === "break"
        ? settings.break * 60
        : settings.longBreak * 60;
    setTimeLeft(dur);
    totalDurationRef.current = dur;
  }

  function handleSkip() {
    advanceMode();
  }

  function handleCompleteTask() {
    if (!currentTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: currentTask.trim(),
      completedAt: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = [task, ...completedTasks];
    setCompletedTasks(updated);
    saveTasks(updated);
    setCurrentTask("");
  }

  function handleDeleteTask(id: string) {
    const updated = completedTasks.filter((t) => t.id !== id);
    setCompletedTasks(updated);
    saveTasks(updated);
  }

  function handleSettingChange(key: keyof Settings, value: number) {
    if (value < 1 || value > 120) return;
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  const sessionLabel = `Sessão ${workSessionCount + 1} de ${SESSIONS_BEFORE_LONG_BREAK}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: cfg.bg }}
        className="min-h-screen transition-colors duration-500 font-sans"
      >
        {/* Flash overlay */}
        <AnimatePresence>
          {flash && (
            <motion.div
              key="flash"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 pointer-events-none"
              style={{ backgroundColor: cfg.accent }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              Pomodoro
            </h1>
            <button
              onClick={() => setShowSettings((s) => !s)}
              className="text-gray-500 hover:text-gray-800 transition-colors text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-400 bg-white/60"
            >
              {showSettings ? "Fechar" : "⚙️ Definições"}
            </button>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-white">
                  <p className="text-sm font-semibold text-gray-700 mb-4">
                    Duração das sessões (minutos)
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {(
                      [
                        { key: "work", label: "Foco 🎯" },
                        { key: "break", label: "Pausa ☕" },
                        { key: "longBreak", label: "Pausa Longa 🌴" },
                      ] as { key: keyof Settings; label: string }[]
                    ).map(({ key, label }) => (
                      <div key={key} className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500">{label}</label>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              handleSettingChange(key, settings[key] - 1)
                            }
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-800">
                            {settings[key]}
                          </span>
                          <button
                            onClick={() =>
                              handleSettingChange(key, settings[key] + 1)
                            }
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode Tabs */}
          <div className="flex gap-2 justify-center">
            {(["work", "break", "longBreak"] as Mode[]).map((m) => {
              const c = MODE_CONFIG[m];
              return (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setShowSuggestion(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    mode === m
                      ? "shadow-md text-white scale-105"
                      : "bg-white/60 text-gray-500 hover:bg-white/80"
                  }`}
                  style={
                    mode === m ? { backgroundColor: c.accent } : undefined
                  }
                >
                  {c.emoji} {c.label}
                </button>
              );
            })}
          </div>

          {/* Long break suggestion */}
          <AnimatePresence>
            {showSuggestion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center"
              >
                <p className="text-blue-700 font-semibold text-sm">
                  🎉 {SESSIONS_BEFORE_LONG_BREAK} sessões completas! Mereces
                  uma pausa longa.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer Circle */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                className="drop-shadow-lg"
              >
                {/* Background ring */}
                <circle
                  cx="140"
                  cy="140"
                  r={CIRCLE_RADIUS}
                  fill="white"
                  fillOpacity="0.7"
                  stroke={cfg.ring}
                  strokeWidth="12"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="140"
                  cy="140"
                  r={CIRCLE_RADIUS}
                  fill="none"
                  stroke={cfg.accent}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={CIRCLE_CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 140 140)"
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
              </svg>

              {/* Time display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-5xl font-extrabold tabular-nums tracking-tight"
                  style={{ color: cfg.accent }}
                >
                  {formatTime(timeLeft)}
                </span>
                <span className="text-sm font-medium text-gray-500 mt-1">
                  {cfg.emoji} {cfg.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {sessionLabel}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Reset */}
              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all text-lg"
                title="Reiniciar"
              >
                ↺
              </button>

              {/* Start / Pause */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleStartPause}
                className="px-10 py-4 rounded-full text-white font-bold text-lg shadow-lg transition-all"
                style={{ backgroundColor: cfg.accent }}
              >
                {isRunning ? "Pausar" : timeLeft === 0 ? "Reiniciar" : "Iniciar"}
              </motion.button>

              {/* Skip */}
              <button
                onClick={handleSkip}
                className="w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all text-lg"
                title="Saltar para a próxima fase"
              >
                ⏭
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 rounded-2xl p-4 text-center shadow-sm border border-white">
              <p className="text-2xl font-extrabold text-gray-800">
                {stats.sessionsCompleted}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                sessões hoje
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 text-center shadow-sm border border-white">
              <p className="text-2xl font-extrabold text-gray-800">
                {formatFocusTime(stats.totalFocusSeconds)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">foco total hoje</p>
            </div>
          </div>

          {/* Task Input */}
          <div className="bg-white/70 rounded-2xl p-5 shadow-sm border border-white">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              📝 No que estás a trabalhar?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCompleteTask();
                }}
                placeholder="Descreve a tua tarefa..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": cfg.accent } as React.CSSProperties}
              />
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleCompleteTask}
                disabled={!currentTask.trim()}
                className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition-all shadow-sm"
                style={{ backgroundColor: cfg.accent }}
              >
                ✓
              </motion.button>
            </div>
          </div>

          {/* Completed Tasks */}
          <AnimatePresence>
            {completedTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 rounded-2xl p-5 shadow-sm border border-white"
              >
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  ✅ Tarefas concluídas hoje ({completedTasks.length})
                </p>
                <ul className="flex flex-col gap-2">
                  <AnimatePresence>
                    {completedTasks.map((task) => (
                      <motion.li
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between gap-3 py-1.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cfg.accent }}
                          />
                          <span className="text-sm text-gray-700 truncate">
                            {task.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">
                            {task.completedAt}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                          >
                            ×
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 pb-4">
            Feito com foco por{" "}
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
      </motion.div>
    </AnimatePresence>
  );
}
