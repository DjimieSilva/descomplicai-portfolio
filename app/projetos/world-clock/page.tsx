"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TimezoneConfig {
  id: string;
  city: string;
  country: string;
  flag: string;
  tz: string;
  offsetLabel: string; // e.g. "WET", "GMT", "EST" …
}

// ---------------------------------------------------------------------------
// Default timezones (8 initial)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEZONES: TimezoneConfig[] = [
  { id: "lisbon",    city: "Lisboa",      country: "Portugal",       flag: "🇵🇹", tz: "Europe/Lisbon",             offsetLabel: "WET"  },
  { id: "london",    city: "London",      country: "Reino Unido",    flag: "🇬🇧", tz: "Europe/London",             offsetLabel: "GMT"  },
  { id: "newyork",   city: "New York",    country: "EUA",            flag: "🇺🇸", tz: "America/New_York",          offsetLabel: "EST"  },
  { id: "saopaulo",  city: "São Paulo",   country: "Brasil",         flag: "🇧🇷", tz: "America/Sao_Paulo",         offsetLabel: "BRT"  },
  { id: "tokyo",     city: "Tokyo",       country: "Japão",          flag: "🇯🇵", tz: "Asia/Tokyo",                offsetLabel: "JST"  },
  { id: "dubai",     city: "Dubai",       country: "Emirados Árabes",flag: "🇦🇪", tz: "Asia/Dubai",                offsetLabel: "GST"  },
  { id: "sydney",    city: "Sydney",      country: "Austrália",      flag: "🇦🇺", tz: "Australia/Sydney",          offsetLabel: "AEST" },
  { id: "la",        city: "Los Angeles", country: "EUA",            flag: "🇺🇸", tz: "America/Los_Angeles",       offsetLabel: "PST"  },
];

// ---------------------------------------------------------------------------
// All available timezones for the "add" dropdown (20+)
// ---------------------------------------------------------------------------
const ALL_TIMEZONES: TimezoneConfig[] = [
  ...DEFAULT_TIMEZONES,
  { id: "paris",      city: "Paris",       country: "França",        flag: "🇫🇷", tz: "Europe/Paris",              offsetLabel: "CET"  },
  { id: "berlin",     city: "Berlin",      country: "Alemanha",      flag: "🇩🇪", tz: "Europe/Berlin",             offsetLabel: "CET"  },
  { id: "madrid",     city: "Madrid",      country: "Espanha",       flag: "🇪🇸", tz: "Europe/Madrid",             offsetLabel: "CET"  },
  { id: "moscow",     city: "Moscow",      country: "Rússia",        flag: "🇷🇺", tz: "Europe/Moscow",             offsetLabel: "MSK"  },
  { id: "dubai2",     city: "Abu Dhabi",   country: "Emirados",      flag: "🇦🇪", tz: "Asia/Dubai",                offsetLabel: "GST"  },
  { id: "mumbai",     city: "Mumbai",      country: "Índia",         flag: "🇮🇳", tz: "Asia/Kolkata",              offsetLabel: "IST"  },
  { id: "singapore",  city: "Singapura",   country: "Singapura",     flag: "🇸🇬", tz: "Asia/Singapore",            offsetLabel: "SGT"  },
  { id: "shanghai",   city: "Xangai",      country: "China",         flag: "🇨🇳", tz: "Asia/Shanghai",             offsetLabel: "CST"  },
  { id: "seoul",      city: "Seul",        country: "Coreia do Sul", flag: "🇰🇷", tz: "Asia/Seoul",                offsetLabel: "KST"  },
  { id: "auckland",   city: "Auckland",    country: "Nova Zelândia", flag: "🇳🇿", tz: "Pacific/Auckland",          offsetLabel: "NZST" },
  { id: "chicago",    city: "Chicago",     country: "EUA",           flag: "🇺🇸", tz: "America/Chicago",           offsetLabel: "CST"  },
  { id: "denver",     city: "Denver",      country: "EUA",           flag: "🇺🇸", tz: "America/Denver",            offsetLabel: "MST"  },
  { id: "toronto",    city: "Toronto",     country: "Canadá",        flag: "🇨🇦", tz: "America/Toronto",           offsetLabel: "EST"  },
  { id: "mexico",     city: "Cidade do México", country: "México",   flag: "🇲🇽", tz: "America/Mexico_City",       offsetLabel: "CST"  },
  { id: "buenos",     city: "Buenos Aires",country: "Argentina",     flag: "🇦🇷", tz: "America/Argentina/Buenos_Aires", offsetLabel: "ART" },
  { id: "cairo",      city: "Cairo",       country: "Egito",         flag: "🇪🇬", tz: "Africa/Cairo",              offsetLabel: "EET"  },
  { id: "nairobi",    city: "Nairobi",     country: "Quénia",        flag: "🇰🇪", tz: "Africa/Nairobi",            offsetLabel: "EAT"  },
  { id: "johannesburg", city: "Joanesburgo", country: "África do Sul", flag: "🇿🇦", tz: "Africa/Johannesburg",    offsetLabel: "SAST" },
  { id: "istanbul",   city: "Istambul",    country: "Turquia",       flag: "🇹🇷", tz: "Europe/Istanbul",           offsetLabel: "TRT"  },
  { id: "bangkok",    city: "Banguecoque", country: "Tailândia",     flag: "🇹🇭", tz: "Asia/Bangkok",              offsetLabel: "ICT"  },
  { id: "jakarta",    city: "Jacarta",     country: "Indonésia",     flag: "🇮🇩", tz: "Asia/Jakarta",              offsetLabel: "WIB"  },
  { id: "honolulu",   city: "Honolulu",    country: "EUA",           flag: "🇺🇸", tz: "Pacific/Honolulu",          offsetLabel: "HST"  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getTimeInTz(tz: string): Date {
  // We get the current UTC instant and reinterpret it in the given tz
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0");
  const h = get("hour") % 24;
  const m = get("minute");
  const s = get("second");
  const yr = get("year");
  const mo = get("month");
  const d = get("day");
  return new Date(yr, mo - 1, d, h, m, s, now.getMilliseconds());
}

function formatTime(d: Date): string {
  return [
    String(d.getHours()).padStart(2, "0"),
    String(d.getMinutes()).padStart(2, "0"),
    String(d.getSeconds()).padStart(2, "0"),
  ].join(":");
}

function formatDate(d: Date, tz: string): string {
  return new Intl.DateTimeFormat("pt-PT", {
    timeZone: tz,
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date());
}

function getOffsetHours(tz: string): number {
  const now = new Date();
  const utcStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric", minute: "numeric", hour12: false,
  }).format(now);
  const tzStr = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric", minute: "numeric", hour12: false,
  }).format(now);

  const parseHm = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  return (parseHm(tzStr) - parseHm(utcStr)) / 60;
}

function getLocalOffsetDiff(tz: string): string {
  const local = -new Date().getTimezoneOffset() / 60;
  const remote = getOffsetHours(tz);
  const diff = remote - local;
  if (diff === 0) return "local";
  return diff > 0 ? `+${diff}h` : `${diff}h`;
}

function isDayTime(d: Date): boolean {
  const h = d.getHours();
  return h >= 6 && h < 20;
}

// ---------------------------------------------------------------------------
// Roman numerals for clock face
// ---------------------------------------------------------------------------
const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// ---------------------------------------------------------------------------
// Analog Clock Component
// ---------------------------------------------------------------------------
function AnalogClock({ tz }: { tz: string }) {
  const rafRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;

    const now = getTimeInTz(tz);
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    ctx.clearRect(0, 0, size, size);

    // Outer glow ring
    const grad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r + 8);
    grad.addColorStop(0, "rgba(99,102,241,0.0)");
    grad.addColorStop(1, "rgba(99,102,241,0.35)");
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Face
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.strokeStyle = "rgba(99,102,241,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Minute tick marks
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 5 === 0;
      const inner = r * (isMajor ? 0.82 : 0.88);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * (r - 2), cy + Math.sin(angle) * (r - 2));
      ctx.strokeStyle = isMajor ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)";
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.stroke();
    }

    // Roman numerals
    ctx.font = `bold ${size * 0.065}px serif`;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const tr = r * 0.72;
      ctx.fillText(ROMAN[i], cx + Math.cos(angle) * tr, cy + Math.sin(angle) * tr);
    }

    // Hour hand
    const hourAngle = ((h + m / 60 + s / 3600) / 12) * Math.PI * 2 - Math.PI / 2;
    drawHand(ctx, cx, cy, hourAngle, r * 0.5, 5, "#e2e8f0");

    // Minute hand
    const minAngle = ((m + s / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    drawHand(ctx, cx, cy, minAngle, r * 0.72, 3, "#c7d2fe");

    // Second hand (smooth via ms)
    const secAngle = ((s + ms / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
    drawHand(ctx, cx, cy, secAngle, r * 0.82, 1.5, "#f472b6");
    // Tail
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(secAngle + Math.PI) * r * 0.2,
      cy + Math.sin(secAngle + Math.PI) * r * 0.2
    );
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#f472b6";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    rafRef.current = requestAnimationFrame(draw);
  }, [tz]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={320}
      style={{ width: "100%", maxWidth: 320, height: "auto", display: "block" }}
    />
  );
}

function drawHand(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  angle: number, length: number,
  width: number, color: string
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Digital Clock Card
// ---------------------------------------------------------------------------
interface ClockCardProps {
  config: TimezoneConfig;
  meetingTime: string | null;
  onRemove: (id: string) => void;
  primaryTz: string;
}

function ClockCard({ config, meetingTime, onRemove, primaryTz }: ClockCardProps) {
  const [time, setTime] = useState<Date>(() => getTimeInTz(config.tz));

  useEffect(() => {
    const tick = () => setTime(getTimeInTz(config.tz));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [config.tz]);

  const isDay = isDayTime(time);
  const diffLabel = getLocalOffsetDiff(config.tz);

  // Meeting time conversion
  let meetingDisplay: string | null = null;
  if (meetingTime) {
    const [mh, mm] = meetingTime.split(":").map(Number);
    const now = new Date();
    const baseInPrimary = getTimeInTz(primaryTz);
    // Offset of primary vs UTC
    const primaryOffsetMs = baseInPrimary.getTime() - now.getTime();
    const primaryOffsetH = getOffsetHours(primaryTz);
    const targetOffsetH = getOffsetHours(config.tz);
    const diffH = targetOffsetH - primaryOffsetH;
    let th = (mh + Math.floor(diffH)) % 24;
    const tm = (mm + Math.round((diffH % 1) * 60)) % 60;
    if (th < 0) th += 24;
    meetingDisplay = `${String(th).padStart(2, "0")}:${String(tm).padStart(2, "0")}`;
  }

  const cardBg = isDay
    ? "linear-gradient(135deg, #1e293b 0%, #0f2140 60%, #0c1a2e 100%)"
    : "linear-gradient(135deg, #0f172a 0%, #1a0f2e 60%, #0d0d1a 100%)";

  const accentColor = isDay ? "#fbbf24" : "#818cf8";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        background: cardBg,
        border: `1px solid ${accentColor}33`,
        borderRadius: 16,
        padding: "20px 18px 16px",
        position: "relative",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Subtle shimmer top border */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)`,
        }}
      />

      {/* Remove button */}
      <button
        onClick={() => onRemove(config.id)}
        title="Remover"
        style={{
          position: "absolute",
          top: 10, right: 10,
          background: "rgba(255,255,255,0.07)",
          border: "none",
          borderRadius: 6,
          color: "rgba(255,255,255,0.4)",
          width: 24, height: 24,
          cursor: "pointer",
          fontSize: 14,
          lineHeight: "24px",
          textAlign: "center",
          transition: "all 0.15s",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(248,113,113,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
        }}
      >
        ×
      </button>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 24 }}>{config.flag}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            {config.city}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
            {config.country} · {config.offsetLabel}
          </div>
        </div>
        <div style={{ marginLeft: "auto", marginRight: 28, textAlign: "right" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              background: `${accentColor}22`,
              color: accentColor,
              borderRadius: 6,
              padding: "2px 7px",
              letterSpacing: "0.04em",
            }}
          >
            {diffLabel}
          </span>
        </div>
      </div>

      {/* Digital time */}
      <div
        style={{
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: 28,
          fontWeight: 700,
          color: "#f8fafc",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {formatTime(time)}
      </div>

      {/* Date */}
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
        {formatDate(time, config.tz)}
      </div>

      {/* Day/Night indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 14 }}>{isDay ? "☀️" : "🌙"}</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
          {isDay ? "Dia" : "Noite"}
        </span>
      </div>

      {/* Meeting time display */}
      <AnimatePresence>
        {meetingDisplay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 12,
                paddingTop: 10,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Reunião:</span>
              <span
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#a78bfa",
                }}
              >
                {meetingDisplay}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function WorldClockPage() {
  const [clocks, setClocks] = useState<TimezoneConfig[]>(DEFAULT_TIMEZONES);
  const [primaryTz, setPrimaryTz] = useState("Europe/Lisbon");
  const [primaryLabel, setPrimaryLabel] = useState("Lisboa");
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [meetingTime, setMeetingTime] = useState<string>("");
  const [meetingActive, setMeetingActive] = useState(false);
  const [primaryTime, setPrimaryTime] = useState<Date>(() => getTimeInTz("Europe/Lisbon"));
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update primary time every second
  useEffect(() => {
    const id = setInterval(() => setPrimaryTime(getTimeInTz(primaryTz)), 1000);
    return () => clearInterval(id);
  }, [primaryTz]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowAddDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAdd = (cfg: TimezoneConfig) => {
    if (clocks.find((c) => c.id === cfg.id)) return;
    setClocks((prev) => [...prev, cfg]);
    setShowAddDropdown(false);
  };

  const handleRemove = (id: string) => {
    setClocks((prev) => prev.filter((c) => c.id !== id));
  };

  const alreadyAdded = clocks.map((c) => c.id);
  const available = ALL_TIMEZONES.filter((tz) => !alreadyAdded.includes(tz.id));

  // Primary tz selector
  const setPrimary = (cfg: TimezoneConfig) => {
    setPrimaryTz(cfg.tz);
    setPrimaryLabel(cfg.city);
    setPrimaryTime(getTimeInTz(cfg.tz));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f1f5f9",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "0 0 60px",
      }}
    >
      {/* ---- Header ---- */}
      <div
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, rgba(15,23,42,0.95) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.2)",
          padding: "24px 32px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              margin: 0,
              background: "linear-gradient(135deg, #a78bfa, #818cf8, #c7d2fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Relógio Mundial
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Fusos horários em tempo real · Descomplicai
          </p>
        </div>

        {/* Primary tz selector */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Relógio principal:</span>
          <select
            value={primaryTz}
            onChange={(e) => {
              const cfg = ALL_TIMEZONES.find((t) => t.tz === e.target.value);
              if (cfg) setPrimary(cfg);
            }}
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 8,
              color: "#c7d2fe",
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {ALL_TIMEZONES.map((t) => (
              <option key={t.id} value={t.tz} style={{ background: "#1e293b" }}>
                {t.flag} {t.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ---- Main content ---- */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px 0" }}>

        {/* ---- Analog + Info row ---- */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {/* Analog clock */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: 24,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              minWidth: 280,
              flex: "0 0 auto",
            }}
          >
            <AnalogClock tz={primaryTz} />
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'SF Mono', monospace",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#c7d2fe",
                  letterSpacing: "-0.02em",
                }}
              >
                {formatTime(primaryTime)}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                {primaryLabel} · {formatDate(primaryTime, primaryTz)}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div
              style={{
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: 16,
                padding: "24px 28px",
                marginBottom: 20,
              }}
            >
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#a78bfa",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Planeador de Reuniões
              </h2>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                Seleciona uma hora em {primaryLabel} e vê o equivalente em todos os fusos.
              </p>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  style={{
                    background: "rgba(15,23,42,0.8)",
                    border: "1px solid rgba(99,102,241,0.35)",
                    borderRadius: 8,
                    color: "#e2e8f0",
                    padding: "8px 12px",
                    fontSize: 16,
                    fontFamily: "'SF Mono', monospace",
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
                <button
                  onClick={() => setMeetingActive((v) => !v)}
                  style={{
                    background: meetingActive
                      ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                      : "rgba(99,102,241,0.15)",
                    border: `1px solid ${meetingActive ? "#7c3aed" : "rgba(99,102,241,0.3)"}`,
                    borderRadius: 8,
                    color: meetingActive ? "#fff" : "#a78bfa",
                    padding: "8px 18px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {meetingActive ? "✓ Ativo" : "Mostrar"}
                </button>
                {meetingActive && (
                  <button
                    onClick={() => { setMeetingActive(false); setMeetingTime(""); }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      fontSize: 12,
                      padding: "8px 4px",
                    }}
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Fusos ativos", value: clocks.length },
                { label: "Hora local", value: formatTime(getTimeInTz(primaryTz)).slice(0, 5) },
                { label: "UTC offset", value: `${getOffsetHours(primaryTz) >= 0 ? "+" : ""}${getOffsetHours(primaryTz)}h` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    minWidth: 90,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'SF Mono', monospace",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#c7d2fe",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Toolbar ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#e2e8f0", letterSpacing: "-0.03em" }}>
            Clocks Digitais
            <span
              style={{
                marginLeft: 10,
                fontSize: 12,
                background: "rgba(99,102,241,0.2)",
                color: "#a78bfa",
                borderRadius: 20,
                padding: "2px 10px",
                fontWeight: 500,
              }}
            >
              {clocks.length}
            </span>
          </h2>

          {/* Add timezone button + dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setShowAddDropdown((v) => !v)}
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 10,
                color: "#a78bfa",
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 16 }}>+</span>
              Adicionar fuso
            </button>

            <AnimatePresence>
              {showAddDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    zIndex: 100,
                    background: "#1e293b",
                    border: "1px solid rgba(99,102,241,0.25)",
                    borderRadius: 14,
                    minWidth: 240,
                    maxHeight: 320,
                    overflowY: "auto",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    padding: "8px 0",
                  }}
                >
                  {available.length === 0 ? (
                    <div style={{ padding: "16px 20px", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                      Todos os fusos já adicionados.
                    </div>
                  ) : (
                    available.map((cfg) => (
                      <button
                        key={cfg.id}
                        onClick={() => handleAdd(cfg)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          width: "100%",
                          padding: "10px 18px",
                          background: "none",
                          border: "none",
                          color: "#e2e8f0",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: 13,
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "none";
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{cfg.flag}</span>
                        <span style={{ fontWeight: 600 }}>{cfg.city}</span>
                        <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: "auto", fontSize: 11 }}>
                          {cfg.offsetLabel}
                        </span>
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ---- Clocks Grid ---- */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <AnimatePresence mode="popLayout">
            {clocks.map((cfg) => (
              <ClockCard
                key={cfg.id}
                config={cfg}
                meetingTime={meetingActive && meetingTime ? meetingTime : null}
                onRemove={handleRemove}
                primaryTz={primaryTz}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {clocks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌐</div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Nenhum fuso horário adicionado.</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Clica em "Adicionar fuso" para começar.</div>
          </motion.div>
        )}
      </div>

      {/* ---- Responsive styles ---- */}
      <style>{`
        @media (max-width: 768px) {
          /* grid handled by auto-fill minmax */
        }
        @media (max-width: 480px) {
          /* single column */
        }
        /* Scrollbar styling for dropdown */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
