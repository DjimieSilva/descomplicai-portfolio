"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  completions: Record<string, boolean>; // key: "YYYY-MM-DD"
  createdAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMOJI_OPTIONS = [
  "💧","📚","🏃","🧘","💤","🥗","🎯","✍️",
  "🎵","💪","🌿","🧹","📝","🚴","🙏","☀️",
  "🍎","🧠","💊","🌙",
];

const COLOR_OPTIONS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#ef4444", // red
  "#06b6d4", // cyan
  "#f97316", // orange
];

const DAYS_SHORT = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const DEMO_HABITS: Habit[] = [
  { id: "1", name: "Beber água", emoji: "💧", color: "#3b82f6", completions: {}, createdAt: new Date().toISOString() },
  { id: "2", name: "Ler 30min", emoji: "📚", color: "#f59e0b", completions: {}, createdAt: new Date().toISOString() },
  { id: "3", name: "Exercício", emoji: "🏃", color: "#22c55e", completions: {}, createdAt: new Date().toISOString() },
  { id: "4", name: "Meditar", emoji: "🧘", color: "#8b5cf6", completions: {}, createdAt: new Date().toISOString() },
  { id: "5", name: "Dormir 8h", emoji: "💤", color: "#06b6d4", completions: {}, createdAt: new Date().toISOString() },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(monday: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function calculateStreak(completions: Record<string, boolean>): number {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cursor = new Date(today);
  // if today not done, start from yesterday
  if (!completions[toDateKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (completions[toDateKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getWeekCompletion(habits: Habit[], weekDays: Date[]): number {
  if (habits.length === 0) return 0;
  let done = 0;
  let total = 0;
  habits.forEach((h) => {
    weekDays.forEach((d) => {
      total++;
      if (h.completions[toDateKey(d)]) done++;
    });
  });
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

function getLast4WeeksGrid(): Date[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = getMondayOfWeek(today);
  const weeks: Date[][] = [];
  for (let w = 3; w >= 0; w--) {
    const start = new Date(monday);
    start.setDate(start.getDate() - w * 7);
    weeks.push(getWeekDays(start));
  }
  return weeks;
}

function heatmapColor(ratio: number, baseColor: string): string {
  if (ratio === 0) return "#e5e7eb";
  if (ratio < 0.34) return baseColor + "55";
  if (ratio < 0.67) return baseColor + "99";
  return baseColor;
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function ConfettiPiece({ color, delay, x }: { color: string; delay: number; x: number }) {
  return (
    <motion.div
      className="fixed top-0 pointer-events-none z-50"
      style={{ left: `${x}%`, width: 10, height: 10, backgroundColor: color, borderRadius: 2 }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{ y: "100vh", rotate: 720, opacity: 0 }}
      transition={{ duration: 2.5, delay, ease: "easeIn" }}
    />
  );
}

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: COLOR_OPTIONS[i % COLOR_OPTIONS.length],
    delay: Math.random() * 0.8,
    x: Math.random() * 100,
  }));
  return (
    <>
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} color={p.color} delay={p.delay} x={p.x} />
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Add habit form
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("💧");
  const [newColor, setNewColor] = useState("#22c55e");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiShownRef = useRef<Set<string>>(new Set());

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = getMondayOfWeek(today);
  const weekDays = getWeekDays(monday);
  const last4Weeks = getLast4WeeksGrid();

  // ── Load from localStorage ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem("descomplicai-habits");
      if (raw) {
        setHabits(JSON.parse(raw));
      } else {
        setHabits(DEMO_HABITS);
      }
    } catch {
      setHabits(DEMO_HABITS);
    }
    setLoaded(true);
  }, []);

  // ── Save to localStorage ──
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("descomplicai-habits", JSON.stringify(habits));
  }, [habits, loaded]);

  // ── Check confetti ──
  useEffect(() => {
    if (habits.length === 0) return;
    const todayKey = toDateKey(today);
    const allDone = habits.every((h) => h.completions[todayKey]);
    if (allDone && !confettiShownRef.current.has(todayKey)) {
      confettiShownRef.current.add(todayKey);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [habits]);

  // ── Toggle completion ──
  const toggleDay = useCallback((habitId: string, dateKey: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const next = { ...h.completions };
        if (next[dateKey]) {
          delete next[dateKey];
        } else {
          next[dateKey] = true;
        }
        return { ...h, completions: next };
      })
    );
  }, []);

  // ── Add habit ──
  const addHabit = () => {
    if (!newName.trim()) return;
    const habit: Habit = {
      id: Date.now().toString(),
      name: newName.trim(),
      emoji: newEmoji,
      color: newColor,
      completions: {},
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, habit]);
    setNewName("");
    setNewEmoji("💧");
    setNewColor("#22c55e");
    setShowForm(false);
    setShowEmojiPicker(false);
  };

  // ── Delete habit ──
  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setDeleteTarget(null);
  };

  const weekCompletion = getWeekCompletion(habits, weekDays);
  const todayKey = toDateKey(today);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fafaf5" }}>
        <motion.div
          className="w-8 h-8 rounded-full border-4 border-green-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#fafaf5", fontFamily: "'Inter', sans-serif" }}>
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            <span style={{ color: "#22c55e" }}>Rastreador</span> de Hábitos
          </h1>
          <p className="text-gray-500 text-sm">Pequenas ações, grandes mudanças.</p>
        </motion.div>

        {/* Weekly Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-5 mb-6 shadow-sm border border-green-100"
          style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-0.5">Esta semana</p>
              <p className="text-2xl font-bold text-gray-800">{weekCompletion}% completo</p>
            </div>
            <div className="text-4xl">
              {weekCompletion === 100 ? "🏆" : weekCompletion >= 70 ? "🌟" : weekCompletion >= 40 ? "💪" : "🌱"}
            </div>
          </div>
          <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full"
              style={{ background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
              initial={{ width: 0 }}
              animate={{ width: `${weekCompletion}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Days Header */}
        <div className="mb-3 px-1">
          <div className="flex items-center">
            <div className="w-40 shrink-0" />
            <div className="flex flex-1 gap-1">
              {weekDays.map((d, i) => {
                const isToday = toDateKey(d) === todayKey;
                return (
                  <div
                    key={i}
                    className="flex-1 text-center text-xs font-semibold"
                    style={{ color: isToday ? "#22c55e" : "#9ca3af" }}
                  >
                    {DAYS_SHORT[i]}
                    {isToday && (
                      <div className="w-1 h-1 rounded-full mx-auto mt-0.5" style={{ background: "#22c55e" }} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-24 shrink-0" />
          </div>
        </div>

        {/* Habit Rows */}
        <AnimatePresence>
          {habits.map((habit, idx) => {
            const streak = calculateStreak(habit.completions);
            const weekDone = weekDays.filter((d) => habit.completions[toDateKey(d)]).length;
            const pct = Math.round((weekDone / 7) * 100);

            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="mb-3"
              >
                <div
                  className="rounded-2xl p-4 shadow-sm border"
                  style={{ background: "#ffffff", borderColor: "#f0f0ea" }}
                >
                  <div className="flex items-center gap-2">
                    {/* Emoji + Name */}
                    <div className="w-40 shrink-0 flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{habit.emoji}</span>
                      <span className="text-sm font-medium text-gray-700 truncate">{habit.name}</span>
                    </div>

                    {/* Day cells */}
                    <div className="flex flex-1 gap-1">
                      {weekDays.map((d) => {
                        const key = toDateKey(d);
                        const done = !!habit.completions[key];
                        const isToday = key === todayKey;
                        return (
                          <motion.button
                            key={key}
                            onClick={() => toggleDay(habit.id, key)}
                            whileTap={{ scale: 0.8 }}
                            className="flex-1 aspect-square rounded-lg flex items-center justify-center transition-all cursor-pointer border"
                            style={{
                              background: done ? habit.color : "#f9fafb",
                              borderColor: isToday && !done ? habit.color : "transparent",
                              borderWidth: isToday ? 2 : 1,
                              minWidth: 0,
                            }}
                            title={key}
                          >
                            {done && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-white text-xs font-bold"
                              >
                                ✓
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Streak + Delete */}
                    <div className="w-24 shrink-0 flex items-center justify-end gap-2">
                      <div className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                        <span>🔥</span>
                        <span>{streak}</span>
                      </div>
                      <button
                        onClick={() => setDeleteTarget(deleteTarget === habit.id ? null : habit.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
                        title="Apagar hábito"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Completion bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full"
                        style={{ background: habit.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                  </div>

                  {/* Delete confirmation */}
                  <AnimatePresence>
                    {deleteTarget === habit.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between"
                      >
                        <span className="text-xs text-gray-500">Apagar &quot;{habit.name}&quot;?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDeleteTarget(null)}
                            className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                          >
                            Não
                          </button>
                          <button
                            onClick={() => deleteHabit(habit.id)}
                            className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          >
                            Apagar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {habits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            <div className="text-5xl mb-3">🌱</div>
            <p className="text-sm">Ainda sem hábitos. Adiciona o primeiro!</p>
          </motion.div>
        )}

        {/* Add habit button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full rounded-2xl py-3 text-sm font-medium transition-all border-2 border-dashed"
            style={{
              borderColor: showForm ? "#22c55e" : "#d1d5db",
              color: showForm ? "#22c55e" : "#9ca3af",
              background: showForm ? "#f0fdf4" : "transparent",
            }}
          >
            {showForm ? "✕ Cancelar" : "+ Novo hábito"}
          </button>
        </motion.div>

        {/* Add habit form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Novo hábito</p>

                {/* Name input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Nome do hábito..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHabit()}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                {/* Emoji picker */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Emoji</p>
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-2xl w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {newEmoji}
                  </button>
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-2 p-3 bg-white border border-gray-200 rounded-xl shadow-md grid grid-cols-10 gap-1"
                      >
                        {EMOJI_OPTIONS.map((e) => (
                          <button
                            key={e}
                            onClick={() => { setNewEmoji(e); setShowEmojiPicker(false); }}
                            className="text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {e}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Color selector */}
                <div className="mb-5">
                  <p className="text-xs text-gray-400 mb-2">Cor</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setNewColor(c)}
                        className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                        style={{
                          background: c,
                          outline: newColor === c ? `3px solid ${c}` : "none",
                          outlineOffset: 2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={addHabit}
                  disabled={!newName.trim()}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: newName.trim() ? "#22c55e" : "#d1fae5",
                    cursor: newName.trim() ? "pointer" : "default",
                  }}
                >
                  Adicionar hábito
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heatmap: last 4 weeks */}
        {habits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Últimas 4 semanas
            </p>
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {last4Weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day) => {
                      const key = toDateKey(day);
                      const total = habits.length;
                      const done = habits.filter((h) => h.completions[key]).length;
                      const ratio = total > 0 ? done / total : 0;
                      const isFuture = day > today;
                      return (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.2 }}
                          className="w-7 h-7 rounded-md"
                          style={{
                            background: isFuture ? "#f3f4f6" : heatmapColor(ratio, "#22c55e"),
                            opacity: isFuture ? 0.4 : 1,
                          }}
                          title={`${key}: ${done}/${total} hábitos`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-400">Menos</span>
                {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-sm"
                    style={{ background: heatmapColor(v, "#22c55e") }}
                  />
                ))}
                <span className="text-xs text-gray-400">Mais</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-300 pb-8">
          Feito com 💚 pela <span className="font-medium">Descomplicai</span>
        </div>
      </div>
    </div>
  );
}
