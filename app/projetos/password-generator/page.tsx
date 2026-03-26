"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Settings {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

interface StrengthInfo {
  score: number; // 0-4
  label: string;
  color: string;
  crackTime: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  ambiguous: "0O1lI",
};

const DEFAULT_SETTINGS: Settings = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCharset(settings: Settings): string {
  let charset = "";
  if (settings.uppercase) charset += CHARS.uppercase;
  if (settings.lowercase) charset += CHARS.lowercase;
  if (settings.numbers) charset += CHARS.numbers;
  if (settings.symbols) charset += CHARS.symbols;
  if (settings.excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((c) => !CHARS.ambiguous.includes(c))
      .join("");
  }
  return charset;
}

function generatePassword(settings: Settings): string {
  const charset = buildCharset(settings);
  if (!charset) return "";

  const array = new Uint32Array(settings.length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((n) => charset[n % charset.length])
    .join("");
}

function calcStrength(password: string, settings: Settings): StrengthInfo {
  if (!password) {
    return { score: 0, label: "—", color: "#e2e8f0", crackTime: "—" };
  }

  const charset = buildCharset(settings);
  const poolSize = charset.length;
  const entropy = password.length * Math.log2(poolSize || 1);

  // entropy → crack time at 1 billion guesses/sec
  const guesses = Math.pow(2, entropy);
  const guessesPerSec = 1e9;
  const seconds = guesses / guessesPerSec;

  function formatTime(s: number): string {
    if (s < 1) return "menos de 1 segundo";
    if (s < 60) return `${Math.round(s)} segundo${Math.round(s) !== 1 ? "s" : ""}`;
    if (s < 3600) return `${Math.round(s / 60)} minuto${Math.round(s / 60) !== 1 ? "s" : ""}`;
    if (s < 86400) return `${Math.round(s / 3600)} hora${Math.round(s / 3600) !== 1 ? "s" : ""}`;
    if (s < 31536000) return `${Math.round(s / 86400)} dia${Math.round(s / 86400) !== 1 ? "s" : ""}`;
    const years = s / 31536000;
    if (years < 1000) return `${Math.round(years)} ano${Math.round(years) !== 1 ? "s" : ""}`;
    if (years < 1e6) return `${(years / 1000).toFixed(1)} mil anos`;
    if (years < 1e9) return `${(years / 1e6).toFixed(1)} milhões de anos`;
    return `${(years / 1e9).toFixed(1)} mil milhões de anos`;
  }

  let score: number;
  let label: string;
  let color: string;

  if (entropy < 28) {
    score = 1; label = "Fraca"; color = "#ef4444";
  } else if (entropy < 50) {
    score = 2; label = "Razoável"; color = "#f97316";
  } else if (entropy < 70) {
    score = 3; label = "Forte"; color = "#eab308";
  } else {
    score = 4; label = "Muito Forte"; color = "#10b981";
  }

  return { score, label, color, crackTime: formatTime(seconds) };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-3 py-2 cursor-pointer select-none ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <span style={{ color: "#334155", fontSize: "0.9rem", fontWeight: 500 }}>
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          border: "none",
          outline: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          background: checked ? "#10b981" : "#cbd5e1",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <motion.span
          layout
          style={{
            display: "block",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 3,
            left: checked ? 23 : 3,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.2s",
          }}
        />
      </button>
    </label>
  );
}

function StrengthBar({ strength }: { strength: StrengthInfo }) {
  const pct = (strength.score / 4) * 100;
  return (
    <div style={{ marginTop: "0.25rem" }}>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "#e2e8f0",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 4,
            background: strength.color,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PasswordGeneratorPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const regen = useCallback(
    (s: Settings) => {
      const pw = generatePassword(s);
      setPassword(pw);
      setHistory((prev) => {
        const next = [pw, ...prev.filter((p) => p !== pw)].slice(0, 5);
        return next;
      });
    },
    []
  );

  // Generate on mount
  useEffect(() => {
    regen(DEFAULT_SETTINGS);
  }, [regen]);

  // Regenerate whenever settings change
  const updateSettings = useCallback(
    (patch: Partial<Settings>) => {
      const next = { ...settings, ...patch };
      // Guard: at least one char type must be on
      const anyOn =
        next.uppercase || next.lowercase || next.numbers || next.symbols;
      if (!anyOn) return;
      setSettings(next);
      regen(next);
    },
    [settings, regen]
  );

  const handleCopy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = password;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  const strength = calcStrength(password, settings);

  const atLeastOneOn = [
    settings.uppercase,
    settings.lowercase,
    settings.numbers,
    settings.symbols,
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2rem 1rem 4rem",
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h1
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            color: "#0f172a",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          🛡️ Gerador de Passwords Seguras
        </h1>
        <p
          style={{
            color: "#64748b",
            marginTop: "0.5rem",
            fontSize: "1rem",
          }}
        >
          Cria passwords fortes, aleatórias e completamente privadas — tudo
          acontece no teu browser.
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Password Display Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{
            background: "#1e293b",
            borderRadius: 16,
            padding: "1.5rem",
            boxShadow: "0 4px 24px rgba(15,23,42,0.18)",
          }}
        >
          {/* Password text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={password}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  flex: 1,
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
                  color: "#f1f5f9",
                  wordBreak: "break-all",
                  lineHeight: 1.6,
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {password || "—"}
              </motion.p>
            </AnimatePresence>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              title="Copiar password"
              style={{
                flexShrink: 0,
                padding: "0.5rem 1rem",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: copied ? "#10b981" : "#334155",
                color: "#f1f5f9",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "background 0.2s, transform 0.1s",
                whiteSpace: "nowrap",
              }}
              onMouseDown={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(0.95)")
              }
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)")
              }
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={copied ? "copiado" : "copiar"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? "Copiado! ✓" : "Copiar"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Strength meter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <StrengthBar strength={strength} />
            </div>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: strength.color,
                minWidth: 72,
                textAlign: "right",
              }}
            >
              {strength.label}
            </span>
          </div>

          {/* Crack time */}
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              color: "#94a3b8",
            }}
          >
            Tempo estimado para quebrar:{" "}
            <span style={{ color: "#cbd5e1", fontWeight: 600 }}>
              {strength.crackTime}
            </span>
          </p>

          {/* Regenerate button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => regen(settings)}
            style={{
              marginTop: "1.25rem",
              width: "100%",
              padding: "0.75rem",
              borderRadius: 12,
              border: "2px solid #10b981",
              cursor: "pointer",
              background: "transparent",
              color: "#10b981",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.01em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "#10b981";
              btn.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "transparent";
              btn.style.color = "#10b981";
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🎲</span> Gerar Nova Password
          </motion.button>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "1.5rem",
            boxShadow: "0 2px 12px rgba(15,23,42,0.07)",
          }}
        >
          <h2
            style={{
              margin: "0 0 1.25rem",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#0f172a",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Configurações
          </h2>

          {/* Length Slider */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{ color: "#334155", fontSize: "0.9rem", fontWeight: 500 }}
              >
                Comprimento
              </span>
              <span
                style={{
                  fontWeight: 800,
                  color: "#10b981",
                  fontSize: "1rem",
                  minWidth: 28,
                  textAlign: "right",
                }}
              >
                {settings.length}
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={settings.length}
              onChange={(e) =>
                updateSettings({ length: Number(e.target.value) })
              }
              style={{
                width: "100%",
                accentColor: "#10b981",
                cursor: "pointer",
                height: 6,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.25rem",
              }}
            >
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>8</span>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>64</span>
            </div>
          </div>

          {/* Toggles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.1rem",
              borderTop: "1px solid #f1f5f9",
              paddingTop: "0.75rem",
            }}
          >
            <Toggle
              label="Maiúsculas (A–Z)"
              checked={settings.uppercase}
              onChange={(v) => updateSettings({ uppercase: v })}
              disabled={
                settings.uppercase &&
                atLeastOneOn.filter(Boolean).length === 1
              }
            />
            <Toggle
              label="Minúsculas (a–z)"
              checked={settings.lowercase}
              onChange={(v) => updateSettings({ lowercase: v })}
              disabled={
                settings.lowercase &&
                atLeastOneOn.filter(Boolean).length === 1
              }
            />
            <Toggle
              label="Números (0–9)"
              checked={settings.numbers}
              onChange={(v) => updateSettings({ numbers: v })}
              disabled={
                settings.numbers &&
                atLeastOneOn.filter(Boolean).length === 1
              }
            />
            <Toggle
              label="Símbolos (!@#$…)"
              checked={settings.symbols}
              onChange={(v) => updateSettings({ symbols: v })}
              disabled={
                settings.symbols &&
                atLeastOneOn.filter(Boolean).length === 1
              }
            />
            <div
              style={{
                borderTop: "1px solid #f1f5f9",
                marginTop: "0.5rem",
                paddingTop: "0.5rem",
              }}
            >
              <Toggle
                label="Excluir caracteres ambíguos (0 O 1 l I)"
                checked={settings.excludeAmbiguous}
                onChange={(v) => updateSettings({ excludeAmbiguous: v })}
              />
            </div>
          </div>
        </motion.div>

        {/* History */}
        <AnimatePresence>
          {history.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "1.5rem",
                boxShadow: "0 2px 12px rgba(15,23,42,0.07)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 1rem",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Histórico (últimas {history.length})
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                {history.map((pw, i) => (
                  <motion.div
                    key={pw + i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.75rem",
                      borderRadius: 10,
                      background: i === 0 ? "#f0fdf4" : "#f8fafc",
                      border: `1px solid ${i === 0 ? "#bbf7d0" : "#e2e8f0"}`,
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        fontSize: "0.82rem",
                        color: i === 0 ? "#065f46" : "#475569",
                        wordBreak: "break-all",
                        lineHeight: 1.5,
                      }}
                    >
                      {pw}
                    </span>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(pw);
                      }}
                      title="Copiar"
                      style={{
                        flexShrink: 0,
                        padding: "0.3rem 0.6rem",
                        borderRadius: 7,
                        border: "1px solid #e2e8f0",
                        cursor: "pointer",
                        background: "#fff",
                        color: "#64748b",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        transition: "border-color 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "#10b981";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#10b981";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "#e2e8f0";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#64748b";
                      }}
                    >
                      Copiar
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.78rem",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Todas as passwords são geradas localmente no teu dispositivo.
          <br />
          Nenhum dado é enviado para servidores.
        </motion.p>
      </div>
    </main>
  );
}
