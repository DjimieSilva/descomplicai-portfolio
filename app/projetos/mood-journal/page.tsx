"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type MoodLevel = 1 | 2 | 3 | 4 | 5;

interface MoodEntry {
  id: string;
  date: string; // ISO date string "YYYY-MM-DD"
  timestamp: number;
  mood: MoodLevel;
  note: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MOODS: { level: MoodLevel; emoji: string; label: string; color: string; bg: string }[] = [
  { level: 1, emoji: "😢", label: "Triste",   color: "#e05c6a", bg: "#fde8eb" },
  { level: 2, emoji: "😐", label: "Neutro",   color: "#f0a050", bg: "#fef3e2" },
  { level: 3, emoji: "🙂", label: "Ok",       color: "#f0c940", bg: "#fef9e3" },
  { level: 4, emoji: "😊", label: "Feliz",    color: "#6cbe7a", bg: "#e6f7ea" },
  { level: 5, emoji: "🤩", label: "Incrível", color: "#8b6be8", bg: "#ede8fc" },
];

const MOOD_DOT_COLORS: Record<MoodLevel, string> = {
  1: "#e05c6a",
  2: "#f0a050",
  3: "#f0c940",
  4: "#6cbe7a",
  5: "#8b6be8",
};

const STORAGE_KEY = "mood-journal-entries";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function getMoodForDate(entries: MoodEntry[], date: string): MoodLevel | null {
  const dayEntries = entries
    .filter((e) => e.date === date)
    .sort((a, b) => b.timestamp - a.timestamp);
  return dayEntries.length ? dayEntries[0].mood : null;
}

// ─── Confetti ────────────────────────────────────────────────────────────────

function ConfettiParticle({ delay }: { delay: number }) {
  const colors = ["#f9a8d4", "#c4b5fd", "#fde68a", "#a7f3d0", "#bfdbfe", "#fca5a5"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * 100;
  const rotation = Math.random() * 720 - 360;
  const size = Math.random() * 8 + 6;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: -20,
        left: `${x}%`,
        width: size,
        height: size,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        backgroundColor: color,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 40 : 900,
        opacity: [1, 1, 0],
        rotate: rotation,
        x: (Math.random() - 0.5) * 200,
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        delay,
        ease: "easeIn",
      }}
    />
  );
}

function Confetti() {
  const particles = Array.from({ length: 60 }, (_, i) => i);
  return (
    <>
      {particles.map((i) => (
        <ConfettiParticle key={i} delay={i * 0.04} />
      ))}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MoodJournalPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"register" | "calendar" | "history">("register");
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries, hydrated]);

  const handleMoodSelect = (level: MoodLevel) => {
    setSelectedMood(level);
    setSaved(false);
  };

  const handleSubmit = useCallback(() => {
    if (!selectedMood) return;
    const entry: MoodEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      date: todayISO(),
      timestamp: Date.now(),
      mood: selectedMood,
      note: note.trim(),
    };
    setEntries((prev) => [entry, ...prev]);
    setSaved(true);
    if (selectedMood === 5) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setNote("");
    setSelectedMood(null);
    setTimeout(() => setSaved(false), 3000);
  }, [selectedMood, note]);

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // ─── Statistics ────────────────────────────────────────────────────────────

  const last7Entries = (() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return entries.filter((e) => e.timestamp >= cutoff);
  })();

  const avgMoodWeek =
    last7Entries.length > 0
      ? (last7Entries.reduce((s, e) => s + e.mood, 0) / last7Entries.length).toFixed(1)
      : null;

  const happyStreak = (() => {
    let streak = 0;
    const days = getLast30Days().reverse();
    for (const day of days) {
      const mood = getMoodForDate(entries, day);
      if (mood && mood >= 4) streak++;
      else break;
    }
    return streak;
  })();

  const mostCommonMood = (() => {
    if (entries.length === 0) return null;
    const counts: Record<number, number> = {};
    entries.forEach((e) => {
      counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return MOODS.find((m) => m.level === Number(top[0])) ?? null;
  })();

  const moodObj = selectedMood ? MOODS.find((m) => m.level === selectedMood) : null;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef9f0 0%, #f3eeff 50%, #fce8f6 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "0 0 80px",
      }}
    >
      {showConfetti && <Confetti />}

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 24px 32px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: 800,
              color: "#5b3f8e",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Como te sentes hoje?
          </h1>
          <p style={{ color: "#9b7cc0", marginTop: 8, fontSize: 16 }}>
            O teu diário de humor pessoal
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "0 24px 32px",
        }}
      >
        {(["register", "calendar", "history"] as const).map((tab) => {
          const labels = { register: "Registar", calendar: "Calendário", history: "Histórico" };
          const icons = { register: "✏️", calendar: "📅", history: "📖" };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
                background: activeTab === tab ? "#8b6be8" : "rgba(255,255,255,0.7)",
                color: activeTab === tab ? "#fff" : "#7a5aad",
                boxShadow: activeTab === tab ? "0 4px 16px rgba(139,107,232,0.35)" : "none",
              }}
            >
              {icons[tab]} {labels[tab]}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
        <AnimatePresence mode="wait">
          {/* ── Register Tab ── */}
          {activeTab === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Saved banner */}
              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      background: "linear-gradient(135deg, #d4edda, #c3e6cb)",
                      border: "1px solid #b8ddc2",
                      borderRadius: 16,
                      padding: "14px 20px",
                      textAlign: "center",
                      color: "#276b3a",
                      fontWeight: 600,
                      marginBottom: 24,
                      fontSize: 15,
                    }}
                  >
                    ✨ Humor registado com sucesso!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mood buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "clamp(8px, 3vw, 16px)",
                  flexWrap: "wrap",
                  marginBottom: 32,
                }}
              >
                {MOODS.map((m) => (
                  <motion.button
                    key={m.level}
                    onClick={() => handleMoodSelect(m.level)}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      padding: "clamp(12px, 3vw, 20px) clamp(10px, 2vw, 16px)",
                      borderRadius: 20,
                      border: selectedMood === m.level
                        ? `3px solid ${m.color}`
                        : "3px solid transparent",
                      background: selectedMood === m.level ? m.bg : "rgba(255,255,255,0.8)",
                      cursor: "pointer",
                      boxShadow: selectedMood === m.level
                        ? `0 8px 24px ${m.color}40`
                        : "0 2px 12px rgba(0,0,0,0.06)",
                      transition: "all 0.2s",
                      minWidth: "clamp(60px, 16vw, 90px)",
                    }}
                  >
                    <span style={{ fontSize: "clamp(28px, 7vw, 44px)" }}>{m.emoji}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: selectedMood === m.level ? m.color : "#9b7cc0",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {m.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Note input */}
              <AnimatePresence>
                {selectedMood && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.85)",
                        borderRadius: 20,
                        padding: 24,
                        boxShadow: "0 4px 24px rgba(139,107,232,0.1)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <p
                        style={{
                          color: "#7a5aad",
                          fontWeight: 600,
                          marginBottom: 12,
                          fontSize: 15,
                        }}
                      >
                        {moodObj?.emoji} O que te fez sentir assim?
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Escreve aqui... (opcional)"
                        rows={3}
                        style={{
                          width: "100%",
                          borderRadius: 12,
                          border: "2px solid #e8d5f5",
                          padding: "12px 14px",
                          fontSize: 15,
                          fontFamily: "inherit",
                          color: "#4a3566",
                          background: "#faf5ff",
                          outline: "none",
                          resize: "vertical",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#8b6be8")}
                        onBlur={(e) => (e.target.style.borderColor = "#e8d5f5")}
                      />
                      <motion.button
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          marginTop: 16,
                          width: "100%",
                          padding: "14px",
                          borderRadius: 14,
                          border: "none",
                          background: moodObj
                            ? `linear-gradient(135deg, ${moodObj.color}, ${moodObj.color}cc)`
                            : "#8b6be8",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 16,
                          cursor: "pointer",
                          boxShadow: `0 6px 20px ${moodObj?.color ?? "#8b6be8"}50`,
                        }}
                      >
                        Guardar humor {moodObj?.emoji}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats cards */}
              {entries.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 14,
                    marginTop: 32,
                  }}
                >
                  <StatCard
                    icon="📊"
                    label="Média esta semana"
                    value={avgMoodWeek ? `${avgMoodWeek} / 5` : "—"}
                    bg="linear-gradient(135deg, #fce8f6, #f3eeff)"
                  />
                  <StatCard
                    icon="🔥"
                    label="Sequência feliz"
                    value={happyStreak > 0 ? `${happyStreak} dia${happyStreak !== 1 ? "s" : ""}` : "0 dias"}
                    bg="linear-gradient(135deg, #fef3e2, #fef9e3)"
                  />
                  <StatCard
                    icon={mostCommonMood?.emoji ?? "💭"}
                    label="Humor mais frequente"
                    value={mostCommonMood?.label ?? "—"}
                    bg="linear-gradient(135deg, #e6f7ea, #f3eeff)"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Calendar Tab ── */}
          {activeTab === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: 24,
                  padding: "28px 24px",
                  boxShadow: "0 4px 24px rgba(139,107,232,0.1)",
                }}
              >
                <h2
                  style={{
                    color: "#5b3f8e",
                    fontWeight: 800,
                    marginBottom: 8,
                    fontSize: 20,
                  }}
                >
                  Últimos 30 dias
                </h2>
                <p style={{ color: "#9b7cc0", fontSize: 13, marginBottom: 24 }}>
                  Cada ponto representa o teu humor nesse dia
                </p>

                <CalendarHeatmap entries={entries} />

                {/* Legend */}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    marginTop: 24,
                    justifyContent: "center",
                  }}
                >
                  {MOODS.map((m) => (
                    <div
                      key={m.level}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: m.color,
                        }}
                      />
                      <span style={{ color: "#7a5aad" }}>
                        {m.emoji} {m.label}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#e8d5f5",
                        border: "1px solid #d4bde8",
                      }}
                    />
                    <span style={{ color: "#7a5aad" }}>Sem registo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── History Tab ── */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {entries.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 24px",
                    color: "#9b7cc0",
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>📖</div>
                  <p style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>
                    Ainda sem registos
                  </p>
                  <p style={{ fontSize: 14, margin: 0 }}>
                    Começa por registar o teu humor hoje!
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {entries.map((entry, i) => {
                    const mood = MOODS.find((m) => m.level === entry.mood)!;
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ delay: i * 0.04 }}
                        layout
                        style={{
                          background: "rgba(255,255,255,0.88)",
                          borderRadius: 18,
                          padding: "16px 20px",
                          boxShadow: "0 2px 12px rgba(139,107,232,0.08)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 16,
                          borderLeft: `4px solid ${mood.color}`,
                        }}
                      >
                        <span style={{ fontSize: 32, flexShrink: 0 }}>{mood.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 8,
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 700,
                                color: mood.color,
                                fontSize: 15,
                              }}
                            >
                              {mood.label}
                            </span>
                            <span style={{ color: "#c0a8e0", fontSize: 12 }}>
                              {formatDate(entry.date)}
                            </span>
                          </div>
                          {entry.note && (
                            <p
                              style={{
                                color: "#5a4070",
                                fontSize: 14,
                                margin: "6px 0 0",
                                lineHeight: 1.5,
                              }}
                            >
                              {entry.note}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          title="Eliminar"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#d4b8e8",
                            fontSize: 18,
                            padding: "2px 4px",
                            borderRadius: 8,
                            flexShrink: 0,
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = "#e05c6a")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.color = "#d4b8e8")
                          }
                        >
                          ✕
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: string;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      style={{
        background: bg,
        borderRadius: 18,
        padding: "20px 18px",
        boxShadow: "0 2px 12px rgba(139,107,232,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#5b3f8e", marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: "#9b7cc0", fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

function CalendarHeatmap({ entries }: { entries: MoodEntry[] }) {
  const days = getLast30Days();

  // Split into weeks (rows of 7)
  const weeks: string[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {week.map((day) => {
            const mood = getMoodForDate(entries, day);
            const isToday = day === todayISO();
            const [, m, d] = day.split("-");
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.2 }}
                title={`${formatDate(day)}${mood ? `: ${MOODS.find((x) => x.level === mood)?.label}` : " — sem registo"}`}
                style={{
                  width: "clamp(32px, 9vw, 52px)",
                  height: "clamp(32px, 9vw, 52px)",
                  borderRadius: "50%",
                  background: mood
                    ? MOOD_DOT_COLORS[mood]
                    : "#e8d5f5",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "default",
                  boxShadow: isToday
                    ? "0 0 0 3px #8b6be8, 0 4px 12px rgba(139,107,232,0.3)"
                    : mood
                    ? `0 3px 10px ${MOOD_DOT_COLORS[mood]}50`
                    : "none",
                  transition: "all 0.2s",
                  position: "relative",
                }}
              >
                {mood ? (
                  <span style={{ fontSize: "clamp(14px, 4vw, 22px)" }}>
                    {MOODS.find((x) => x.level === mood)?.emoji}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "clamp(9px, 2.2vw, 13px)",
                      color: "#b09ac8",
                      fontWeight: 600,
                    }}
                  >
                    {d}/{m}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
