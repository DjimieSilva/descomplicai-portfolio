"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type InstrumentType = "piano" | "guitarra" | "orgao";

interface NoteTrail {
  id: number;
  x: number;
  color: string;
}

interface RecordedNote {
  note: string;
  time: number;
}

interface MelodyNote {
  note: string;
  duration: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const NOTE_FREQUENCIES: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  "C#3": 138.59, "D#3": 155.56, "F#3": 185.0, "G#3": 207.65, "A#3": 233.08,
  "C#4": 277.18, "D#4": 311.13, "F#4": 369.99, "G#4": 415.3, "A#4": 466.16,
};

const WHITE_KEYS = [
  { note: "C3", label: "Dó", shortcut: "A" },
  { note: "D3", label: "Ré", shortcut: "S" },
  { note: "E3", label: "Mi", shortcut: "D" },
  { note: "F3", label: "Fá", shortcut: "F" },
  { note: "G3", label: "Sol", shortcut: "G" },
  { note: "A3", label: "Lá", shortcut: "H" },
  { note: "B3", label: "Si", shortcut: "J" },
  { note: "C4", label: "Dó", shortcut: "K" },
  { note: "D4", label: "Ré", shortcut: "L" },
  { note: "E4", label: "Mi", shortcut: ";" },
  { note: "F4", label: "Fá", shortcut: "'" },
  { note: "G4", label: "Sol", shortcut: "Z" },
  { note: "A4", label: "Lá", shortcut: "X" },
  { note: "B4", label: "Si", shortcut: "C" },
];

// Black keys: position is the gap index (between white keys)
const BLACK_KEYS = [
  { note: "C#3", shortcut: "W", position: 0 },
  { note: "D#3", shortcut: "E", position: 1 },
  { note: "F#3", shortcut: "T", position: 3 },
  { note: "G#3", shortcut: "Y", position: 4 },
  { note: "A#3", shortcut: "U", position: 5 },
  { note: "C#4", shortcut: "I", position: 7 },
  { note: "D#4", shortcut: "O", position: 8 },
  { note: "F#4", shortcut: "P", position: 10 },
  { note: "G#4", shortcut: "1", position: 11 },
  { note: "A#4", shortcut: "2", position: 12 },
];

const KEY_MAP: Record<string, string> = {
  a: "C3", s: "D3", d: "E3", f: "F3", g: "G3", h: "A3", j: "B3",
  k: "C4", l: "D4", ";": "E4", "'": "F4", z: "G4", x: "A4", c: "B4",
  w: "C#3", e: "D#3", t: "F#3", y: "G#3", u: "A#3",
  i: "C#4", o: "D#4", p: "F#4", "1": "G#4", "2": "A#4",
};

const INSTRUMENTS: { id: InstrumentType; label: string; emoji: string }[] = [
  { id: "piano", label: "Piano", emoji: "🎹" },
  { id: "guitarra", label: "Guitarra", emoji: "🎸" },
  { id: "orgao", label: "Órgão", emoji: "🎵" },
];

const MELODIES: { name: string; notes: MelodyNote[] }[] = [
  {
    name: "Parabéns",
    notes: [
      { note: "C4", duration: 0.3 }, { note: "C4", duration: 0.1 },
      { note: "D4", duration: 0.4 }, { note: "C4", duration: 0.4 },
      { note: "F4", duration: 0.4 }, { note: "E4", duration: 0.8 },
      { note: "C4", duration: 0.3 }, { note: "C4", duration: 0.1 },
      { note: "D4", duration: 0.4 }, { note: "C4", duration: 0.4 },
      { note: "G4", duration: 0.4 }, { note: "F4", duration: 0.8 },
    ],
  },
  {
    name: "Twinkle Twinkle",
    notes: [
      { note: "C4", duration: 0.4 }, { note: "C4", duration: 0.4 },
      { note: "G4", duration: 0.4 }, { note: "G4", duration: 0.4 },
      { note: "A4", duration: 0.4 }, { note: "A4", duration: 0.4 },
      { note: "G4", duration: 0.8 },
      { note: "F4", duration: 0.4 }, { note: "F4", duration: 0.4 },
      { note: "E4", duration: 0.4 }, { note: "E4", duration: 0.4 },
      { note: "D4", duration: 0.4 }, { note: "D4", duration: 0.4 },
      { note: "C4", duration: 0.8 },
    ],
  },
  {
    name: "Ode to Joy",
    notes: [
      { note: "E4", duration: 0.4 }, { note: "E4", duration: 0.4 },
      { note: "F4", duration: 0.4 }, { note: "G4", duration: 0.4 },
      { note: "G4", duration: 0.4 }, { note: "F4", duration: 0.4 },
      { note: "E4", duration: 0.4 }, { note: "D4", duration: 0.4 },
      { note: "C4", duration: 0.4 }, { note: "C4", duration: 0.4 },
      { note: "D4", duration: 0.4 }, { note: "E4", duration: 0.4 },
      { note: "E4", duration: 0.55 }, { note: "D4", duration: 0.25 },
      { note: "D4", duration: 0.8 },
    ],
  },
];

const NOTE_COLORS: Record<string, string> = {
  C3: "#f59e0b", D3: "#f97316", E3: "#ef4444", F3: "#ec4899",
  G3: "#a855f7", A3: "#6366f1", B3: "#3b82f6",
  C4: "#06b6d4", D4: "#10b981", E4: "#84cc16", F4: "#eab308",
  G4: "#f97316", A4: "#ef4444", B4: "#ec4899",
  "C#3": "#fcd34d", "D#3": "#fb923c", "F#3": "#f472b6",
  "G#3": "#c084fc", "A#3": "#818cf8",
  "C#4": "#38bdf8", "D#4": "#34d399", "F#4": "#bef264",
  "G#4": "#fde047", "A#4": "#fb923c",
};

// ─── Audio Engine ─────────────────────────────────────────────────────────────

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playNote(
  ctx: AudioContext,
  frequency: number,
  instrument: InstrumentType,
  volume: number
) {
  const gainNode = ctx.createGain();
  gainNode.connect(ctx.destination);

  const oscillator = ctx.createOscillator();
  oscillator.connect(gainNode);

  const now = ctx.currentTime;
  const masterGain = volume / 100;

  if (instrument === "piano") {
    oscillator.type = "sine";
    // Add harmonics for richer piano sound
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = frequency * 2;
    gain2.gain.value = masterGain * 0.3;
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    gainNode.gain.setValueAtTime(masterGain * 0.8, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.frequency.value = frequency * 2;
    osc2.start(now);
    osc2.stop(now + 0.8);
  } else if (instrument === "guitarra") {
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(masterGain * 0.6, now);
    gainNode.gain.exponentialRampToValueAtTime(masterGain * 0.2, now + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  } else {
    // orgao
    oscillator.type = "square";
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(masterGain * 0.5, now + 0.05);
    gainNode.gain.setValueAtTime(masterGain * 0.5, now + 0.8);
    gainNode.gain.linearRampToValueAtTime(0.001, now + 1.0);
  }

  oscillator.frequency.value = frequency;
  oscillator.start(now);
  oscillator.stop(now + 2);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MusicBoxPage() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [instrument, setInstrument] = useState<InstrumentType>("piano");
  const [volume, setVolume] = useState(70);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<RecordedNote[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trails, setTrails] = useState<NoteTrail[]>([]);
  const [playingMelody, setPlayingMelody] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const recordStartRef = useRef<number>(0);
  const trailCounterRef = useRef(0);
  const keyboardRef = useRef<HTMLDivElement>(null);

  // Lazy-init AudioContext on first interaction
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const triggerNote = useCallback(
    (note: string, keyX?: number) => {
      const ctx = getAudioCtx();
      const freq = NOTE_FREQUENCIES[note];
      if (!ctx || !freq) return;

      playNote(ctx, freq, instrument, volume);

      // Add visual trail
      const id = ++trailCounterRef.current;
      const x = keyX ?? Math.random() * 80 + 10;
      setTrails((prev) => [...prev.slice(-20), { id, x, color: NOTE_COLORS[note] ?? "#f59e0b" }]);
      setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== id)), 1500);

      // Record
      if (isRecording) {
        const elapsed = Date.now() - recordStartRef.current;
        setRecordedNotes((prev) => [...prev, { note, time: elapsed }]);
      }

      // Press visual
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(note);
        return next;
      });
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }, 150);
    },
    [getAudioCtx, instrument, volume, isRecording]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const note = KEY_MAP[e.key.toLowerCase()] ?? KEY_MAP[e.key];
      if (note) {
        e.preventDefault();
        triggerNote(note);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerNote]);

  // Record toggle
  const toggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setRecordedNotes([]);
      recordStartRef.current = Date.now();
      setIsRecording(true);
    }
  };

  // Play recording
  const playRecording = async () => {
    if (recordedNotes.length === 0 || isPlaying) return;
    setIsPlaying(true);
    const ctx = getAudioCtx();
    if (!ctx) { setIsPlaying(false); return; }

    const start = Date.now();
    for (const rec of recordedNotes) {
      const delay = rec.time - (Date.now() - start);
      if (delay > 0) await new Promise((r) => setTimeout(r, delay));
      const freq = NOTE_FREQUENCIES[rec.note];
      if (freq) playNote(ctx, freq, instrument, volume);
      setPressedKeys((prev) => new Set([...prev, rec.note]));
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(rec.note);
          return next;
        });
      }, 150);
    }
    setIsPlaying(false);
  };

  // Play preset melody
  const playMelody = async (melodyName: string) => {
    if (playingMelody) return;
    const melody = MELODIES.find((m) => m.name === melodyName);
    if (!melody) return;
    setPlayingMelody(melodyName);
    const ctx = getAudioCtx();
    if (!ctx) { setPlayingMelody(null); return; }

    for (const { note, duration } of melody.notes) {
      const freq = NOTE_FREQUENCIES[note];
      if (freq) {
        playNote(ctx, freq, instrument, volume);
        const id = ++trailCounterRef.current;
        setTrails((prev) => [...prev.slice(-20), { id, x: Math.random() * 80 + 10, color: NOTE_COLORS[note] ?? "#f59e0b" }]);
        setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== id)), 1500);
        setPressedKeys((prev) => new Set([...prev, note]));
        await new Promise((r) => setTimeout(r, duration * 1000));
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }
    }
    setPlayingMelody(null);
  };

  // White key X position for trail calculation
  const getWhiteKeyXPercent = (index: number) => {
    const total = WHITE_KEYS.length;
    return ((index + 0.5) / total) * 100;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: "#1c1917", fontFamily: "'Georgia', serif" }}
    >
      {/* Note Trails Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {trails.map((trail) => (
            <motion.div
              key={trail.id}
              initial={{ opacity: 1, y: "85vh", scale: 1 }}
              animate={{ opacity: 0, y: "10vh", scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: `${trail.x}%`,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: trail.color,
                boxShadow: `0 0 12px ${trail.color}`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="w-full max-w-5xl px-4 pt-10 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "#fef3c7",
            letterSpacing: "0.03em",
            textShadow: "0 0 40px rgba(251,191,36,0.3)",
          }}
        >
          Caixa de Música 🎹
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ color: "#92400e", fontSize: "0.95rem", marginTop: 8 }}
        >
          Clica nas teclas, usa o teclado (A–J, W–U) ou escolhe uma melodia
        </motion.p>
      </div>

      {/* Controls Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-5xl px-4 flex flex-wrap gap-3 justify-center mb-6"
      >
        {/* Instrument Selector */}
        <div
          className="flex rounded-xl overflow-hidden"
          style={{ border: "1px solid #44403c", background: "#292524" }}
        >
          {INSTRUMENTS.map((inst) => (
            <button
              key={inst.id}
              onClick={() => setInstrument(inst.id)}
              style={{
                padding: "8px 18px",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s",
                background: instrument === inst.id ? "#d97706" : "transparent",
                color: instrument === inst.id ? "#1c1917" : "#d6d3d1",
                fontWeight: instrument === inst.id ? 700 : 400,
                border: "none",
              }}
            >
              {inst.emoji} {inst.label}
            </button>
          ))}
        </div>

        {/* Volume */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: "#292524", border: "1px solid #44403c" }}
        >
          <span style={{ color: "#a8a29e", fontSize: "0.85rem" }}>🔊</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: 80, accentColor: "#d97706" }}
          />
          <span style={{ color: "#d6d3d1", fontSize: "0.8rem", width: 28 }}>
            {volume}%
          </span>
        </div>

        {/* Record */}
        <button
          onClick={toggleRecord}
          style={{
            padding: "8px 18px",
            borderRadius: 12,
            border: "1px solid #44403c",
            background: isRecording ? "#dc2626" : "#292524",
            color: isRecording ? "#fff" : "#d6d3d1",
            fontSize: "0.85rem",
            cursor: "pointer",
            fontWeight: isRecording ? 700 : 400,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {isRecording ? (
            <>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#fff",
                  display: "inline-block",
                  animation: "pulse 1s infinite",
                }}
              />
              Parar
            </>
          ) : (
            "⏺ Gravar"
          )}
        </button>

        {/* Play Recording */}
        <button
          onClick={playRecording}
          disabled={recordedNotes.length === 0 || isPlaying}
          style={{
            padding: "8px 18px",
            borderRadius: 12,
            border: "1px solid #44403c",
            background: recordedNotes.length > 0 && !isPlaying ? "#16a34a" : "#292524",
            color: recordedNotes.length > 0 && !isPlaying ? "#fff" : "#57534e",
            fontSize: "0.85rem",
            cursor: recordedNotes.length > 0 && !isPlaying ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          ▶ Reproduzir {recordedNotes.length > 0 ? `(${recordedNotes.length})` : ""}
        </button>
      </motion.div>

      {/* Melodies Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-5xl px-4 flex flex-wrap gap-3 justify-center mb-8"
      >
        <span style={{ color: "#78716c", fontSize: "0.85rem", alignSelf: "center" }}>
          Melodias:
        </span>
        {MELODIES.map((melody) => (
          <button
            key={melody.name}
            onClick={() => playMelody(melody.name)}
            disabled={!!playingMelody}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: `1px solid ${playingMelody === melody.name ? "#d97706" : "#44403c"}`,
              background: playingMelody === melody.name ? "rgba(217,119,6,0.15)" : "#292524",
              color: playingMelody === melody.name ? "#fcd34d" : "#d6d3d1",
              fontSize: "0.82rem",
              cursor: playingMelody ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {playingMelody === melody.name ? "♪ " : ""}
            {melody.name}
          </button>
        ))}
      </motion.div>

      {/* Piano Keyboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full max-w-5xl px-4 pb-10"
        style={{ overflowX: "auto" }}
      >
        {/* Outer wood frame */}
        <div
          style={{
            background: "linear-gradient(135deg, #78350f 0%, #451a03 40%, #78350f 100%)",
            borderRadius: 20,
            padding: "16px 20px 20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.1)",
            minWidth: 600,
          }}
        >
          {/* Inner piano body */}
          <div
            style={{
              background: "#1c1917",
              borderRadius: 12,
              padding: "12px 12px 0",
              boxShadow: "inset 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            {/* Keys container */}
            <div
              ref={keyboardRef}
              style={{
                position: "relative",
                display: "flex",
                height: 180,
                userSelect: "none",
              }}
            >
              {/* White Keys */}
              {WHITE_KEYS.map((key, i) => {
                const pressed = pressedKeys.has(key.note);
                return (
                  <div
                    key={key.note}
                    onMouseDown={() => triggerNote(key.note, getWhiteKeyXPercent(i))}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      triggerNote(key.note, getWhiteKeyXPercent(i));
                    }}
                    style={{
                      flex: 1,
                      background: pressed ? "#fde68a" : "#fef3c7",
                      border: "1px solid #d6d3d1",
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: 8,
                      position: "relative",
                      transform: pressed ? "translateY(4px)" : "translateY(0)",
                      boxShadow: pressed
                        ? `inset 0 -2px 4px rgba(0,0,0,0.2), 0 0 12px ${NOTE_COLORS[key.note]}80`
                        : "inset 0 -4px 8px rgba(0,0,0,0.15), 2px 4px 8px rgba(0,0,0,0.3)",
                      transition: "transform 0.08s ease, background 0.08s ease, box-shadow 0.08s ease",
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: "#92400e",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {key.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.5rem",
                        color: "#b45309",
                        marginTop: 2,
                      }}
                    >
                      {key.shortcut}
                    </span>
                  </div>
                );
              })}

              {/* Black Keys */}
              {BLACK_KEYS.map((key) => {
                const pressed = pressedKeys.has(key.note);
                // Calculate left position: each white key is 1/14 of the total width
                // Black key sits between white keys at position `key.position`
                const whiteKeyWidth = 100 / WHITE_KEYS.length;
                const leftPercent = (key.position + 1) * whiteKeyWidth - (whiteKeyWidth * 0.3);

                return (
                  <div
                    key={key.note}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      triggerNote(key.note, leftPercent);
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      triggerNote(key.note, leftPercent);
                    }}
                    style={{
                      position: "absolute",
                      left: `${leftPercent}%`,
                      top: 0,
                      width: `${whiteKeyWidth * 0.6}%`,
                      height: "60%",
                      background: pressed
                        ? "#3f3f46"
                        : "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
                      borderRadius: "0 0 6px 6px",
                      cursor: "pointer",
                      zIndex: 2,
                      transform: pressed ? "translateY(3px)" : "translateY(0)",
                      boxShadow: pressed
                        ? `0 0 14px ${NOTE_COLORS[key.note]}90`
                        : "2px 6px 12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
                      transition: "transform 0.08s ease, background 0.08s ease, box-shadow 0.08s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.45rem",
                        color: "#78716c",
                        lineHeight: 1,
                      }}
                    >
                      {key.shortcut}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recording Status */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              background: "#dc2626",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 12,
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
              zIndex: 50,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-block",
              }}
              className="animate-pulse"
            />
            A gravar... {recordedNotes.length} notas
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcut Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-5xl px-4 pb-10"
        style={{ textAlign: "center" }}
      >
        <p style={{ color: "#57534e", fontSize: "0.78rem", lineHeight: 1.8 }}>
          Teclas brancas: <span style={{ color: "#78716c" }}>A S D F G H J K L ; &apos; Z X C</span>
          &nbsp;·&nbsp;
          Teclas pretas: <span style={{ color: "#78716c" }}>W E T Y U I O P 1 2</span>
        </p>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
