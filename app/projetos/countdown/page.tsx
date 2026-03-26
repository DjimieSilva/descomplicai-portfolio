"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Countdown {
  id: string;
  name: string;
  targetDate: string; // ISO string
  createdAt: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "countdown_timers_v1";

const ACCENT = "#6366f1";
const ACCENT_LIGHT = "#a5b4fc";
const ACCENT_DARK = "#4338ca";

const CONFETTI_COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6",
  "#f97316", "#8b5cf6", "#14b8a6", "#ef4444", "#84cc16",
];

const PARTICLE_COUNT = 18;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNextSaturday(): Date {
  const d = new Date();
  const day = d.getDay(); // 0=Sun … 6=Sat
  const daysUntil = day === 6 ? 7 : 6 - day;
  d.setDate(d.getDate() + daysUntil);
  d.setHours(18, 0, 0, 0);
  return d;
}

function getPresets(): { label: string; date: Date }[] {
  const now = new Date();
  const year = now.getFullYear();
  // Ano Novo: if Jan 1 is in the past, use next year
  const nextYear = new Date(year + 1, 0, 1, 0, 0, 0);
  // Verão: Jun 21
  let verao = new Date(year, 5, 21, 6, 0, 0);
  if (verao < now) verao = new Date(year + 1, 5, 21, 6, 0, 0);
  // Natal
  let natal = new Date(year, 11, 25, 0, 0, 0);
  if (natal < now) natal = new Date(year + 1, 11, 25, 0, 0, 0);

  return [
    { label: "Ano Novo 🎆", date: nextYear },
    { label: "Verão ☀️", date: verao },
    { label: "Natal 🎄", date: natal },
    { label: "Próximo Fim de Semana 🎉", date: getNextSaturday() },
  ];
}

function toDatetimeLocal(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: diff };
  return {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function loadCountdowns(): Countdown[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveCountdowns(list: Countdown[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.8,
    duration: Math.random() * 2 + 2,
    rotation: Math.random() * 720 - 360,
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FlipCard({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  const prevRef = useRef(display);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== display) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 300);
      prevRef.current = display;
      return () => clearTimeout(t);
    }
  }, [display]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{
          perspective: "400px",
        }}
      >
        <motion.div
          animate={flipping ? { rotateX: [0, -90, 0] } : { rotateX: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)`,
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          {/* Divider line in middle */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-px h-px"
            style={{ background: "rgba(0,0,0,0.12)" }}
          />
          <span
            className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight"
            style={{ color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            {display}
          </span>
        </motion.div>
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ConfettiExplosion() {
  const pieces = useRef(generateConfetti()).current;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: "-5vh",
            rotate: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: "110vh",
            rotate: p.rotation,
            opacity: [1, 1, 0],
            scale: [1, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size * 0.5,
            borderRadius: 2,
            backgroundColor: p.color,
            top: 0,
          }}
        />
      ))}
    </div>
  );
}

function Particle({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={style}
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [eventName, setEventName] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebratedIds, setCelebratedIds] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [mounted, setMounted] = useState(false);
  const confettiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mount & URL param ──
  useEffect(() => {
    setMounted(true);
    const saved = loadCountdowns();
    setCountdowns(saved);

    // Read query param ?date=ISO&name=xxx
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    const nameParam = params.get("name");
    if (dateParam) {
      const d = new Date(dateParam);
      if (!isNaN(d.getTime())) {
        const cd: Countdown = {
          id: "url-" + Date.now(),
          name: nameParam || "Evento partilhado",
          targetDate: d.toISOString(),
          createdAt: new Date().toISOString(),
        };
        const merged = [cd, ...saved.filter((c) => c.id !== cd.id)];
        setCountdowns(merged);
        saveCountdowns(merged);
        setActiveId(cd.id);
      }
    } else if (saved.length > 0) {
      setActiveId(saved[0].id);
    }
  }, []);

  // ── Ticker ──
  useEffect(() => {
    if (!activeId) return;
    const active = countdowns.find((c) => c.id === activeId);
    if (!active) return;

    const tick = () => {
      const tl = calcTimeLeft(active.targetDate);
      setTimeLeft(tl);

      if (tl.total <= 0 && !celebratedIds.has(activeId)) {
        setCelebratedIds((prev) => new Set([...prev, activeId]));
        setShowConfetti(true);
        if (confettiTimeout.current) clearTimeout(confettiTimeout.current);
        confettiTimeout.current = setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeId, countdowns, celebratedIds]);

  // ── Handlers ──
  const handleCreate = useCallback(() => {
    const name = eventName.trim() || "O Meu Evento";
    if (!targetInput) return;
    const target = new Date(targetInput);
    if (isNaN(target.getTime())) return;

    const cd: Countdown = {
      id: Date.now().toString(),
      name,
      targetDate: target.toISOString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [cd, ...countdowns];
    setCountdowns(updated);
    saveCountdowns(updated);
    setActiveId(cd.id);
    setEventName("");
    setTargetInput("");
  }, [eventName, targetInput, countdowns]);

  const handlePreset = useCallback(
    (label: string, date: Date) => {
      const cd: Countdown = {
        id: Date.now().toString(),
        name: label,
        targetDate: date.toISOString(),
        createdAt: new Date().toISOString(),
      };
      const updated = [cd, ...countdowns];
      setCountdowns(updated);
      saveCountdowns(updated);
      setActiveId(cd.id);
    },
    [countdowns]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updated = countdowns.filter((c) => c.id !== id);
      setCountdowns(updated);
      saveCountdowns(updated);
      if (activeId === id) {
        setActiveId(updated[0]?.id ?? null);
      }
    },
    [countdowns, activeId]
  );

  const handleShare = useCallback(() => {
    const active = countdowns.find((c) => c.id === activeId);
    if (!active) return;
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("date", active.targetDate);
    url.searchParams.set("name", active.name);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, [activeId, countdowns]);

  const activeCountdown = countdowns.find((c) => c.id === activeId);
  const isFinished = timeLeft !== null && timeLeft.total <= 0;
  const presets = getPresets();

  // ── Particles (stable, generated once) ──
  const particles = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      size: Math.random() * 14 + 6,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.15 + 0.04,
    }))
  ).current;

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans"
      style={{
        background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4338ca 50%, #6366f1 75%, #818cf8 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 18s ease infinite",
      }}
    >
      {/* ── Global animations ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0px) scale(1); opacity: var(--op); }
          50%  { transform: translateY(-30px) scale(1.08); opacity: calc(var(--op) * 1.4); }
          100% { transform: translateY(0px) scale(1); opacity: var(--op); }
        }
      `}</style>

      {/* ── Floating particles ────────────────────────────────────────────────── */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: "rgba(255,255,255,0.9)",
            ["--op" as string]: p.opacity,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* ── Confetti ──────────────────────────────────────────────────────────── */}
      {showConfetti && <ConfettiExplosion />}

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ color: "white", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            Contagem Decrescente ⏳
          </h1>
          <p
            className="mt-2 text-base"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Acompanha os momentos que mais importam
          </p>
        </motion.div>

        {/* ── Active Countdown Display ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeCountdown && mounted ? (
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              {/* Event name */}
              <div className="text-center">
                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "white" }}
                >
                  {activeCountdown.name}
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {new Date(activeCountdown.targetDate).toLocaleDateString(
                    "pt-PT",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>

              {/* Flip clock display */}
              {isFinished ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="text-center py-4"
                >
                  <div
                    className="text-5xl sm:text-7xl font-black"
                    style={{ color: "white" }}
                  >
                    🎉 É AGORA! 🎉
                  </div>
                  <p
                    className="mt-3 text-lg font-semibold"
                    style={{ color: ACCENT_LIGHT }}
                  >
                    O momento chegou!
                  </p>
                </motion.div>
              ) : (
                <div className="flex items-start gap-3 sm:gap-5">
                  <FlipCard value={timeLeft?.days ?? 0} label="Dias" />
                  <span
                    className="text-3xl sm:text-4xl font-black mt-5 sm:mt-7"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    :
                  </span>
                  <FlipCard value={timeLeft?.hours ?? 0} label="Horas" />
                  <span
                    className="text-3xl sm:text-4xl font-black mt-5 sm:mt-7"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    :
                  </span>
                  <FlipCard value={timeLeft?.minutes ?? 0} label="Minutos" />
                  <span
                    className="text-3xl sm:text-4xl font-black mt-5 sm:mt-7"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    :
                  </span>
                  <FlipCard value={timeLeft?.seconds ?? 0} label="Segundos" />
                </div>
              )}

              {/* Share button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: copyFeedback
                    ? "rgba(16,185,129,0.9)"
                    : "rgba(255,255,255,0.18)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {copyFeedback ? "✓ Link copiado!" : "🔗 Partilhar countdown"}
              </motion.button>
            </motion.div>
          ) : mounted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl p-10 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <p
                className="text-xl font-semibold"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Cria um countdown abaixo ↓
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* ── Preset Events ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Eventos rápidos
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presets.map((preset) => (
              <motion.button
                key={preset.label}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handlePreset(preset.label, preset.date)}
                className="rounded-2xl px-3 py-4 text-center text-sm font-semibold transition-all"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                <div className="text-xl mb-1">
                  {preset.label.split(" ").pop()}
                </div>
                <div className="text-xs leading-tight opacity-90">
                  {preset.label.split(" ").slice(0, -1).join(" ")}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Custom Countdown Form ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-3xl p-6 flex flex-col gap-4"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Criar countdown personalizado
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Nome do evento..."
              className="flex-1 rounded-xl px-4 py-3 text-sm font-medium outline-none"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <input
              type="datetime-local"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-medium outline-none"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                colorScheme: "dark",
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            disabled={!targetInput}
            className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all disabled:opacity-40"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
              boxShadow: `0 4px 20px rgba(99,102,241,0.5)`,
            }}
          >
            ⏱ Criar Countdown
          </motion.button>
        </motion.div>

        {/* ── Saved Countdowns List ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {countdowns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Os meus countdowns ({countdowns.length})
              </p>
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {countdowns.map((cd) => {
                    const tl = calcTimeLeft(cd.targetDate);
                    const done = tl.total <= 0;
                    const isActive = cd.id === activeId;

                    return (
                      <motion.div
                        key={cd.id}
                        layout
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setActiveId(cd.id)}
                        className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 cursor-pointer transition-all"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.22)"
                            : "rgba(255,255,255,0.08)",
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.4)"
                            : "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span
                            className="text-sm font-semibold truncate"
                            style={{ color: "white" }}
                          >
                            {cd.name}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {done
                              ? "🎉 Chegou!"
                              : `${tl.days}d ${tl.hours}h ${tl.minutes}m`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: ACCENT,
                                color: "white",
                              }}
                            >
                              ativo
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(cd.id);
                            }}
                            className="text-sm transition-colors rounded-full w-7 h-7 flex items-center justify-center"
                            style={{
                              color: "rgba(255,255,255,0.4)",
                              background: "rgba(255,255,255,0.05)",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.color = "#ef4444")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.color =
                                "rgba(255,255,255,0.4)")
                            }
                          >
                            ×
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p
          className="text-center text-xs pb-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Feito com{" "}
          <span style={{ color: ACCENT_LIGHT }}>♥</span> por{" "}
          <a
            href="https://descomplicai.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Descomplicai
          </a>
        </p>
      </div>
    </div>
  );
}
