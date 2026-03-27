"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "escalas" | "acordes" | "circulo";
type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
type ScaleId = "maior" | "menor_natural" | "menor_harmonica" | "pent_maior" | "pent_menor" | "blues" | "cromatica";
type ChordId = "maior" | "menor" | "dom7" | "min7" | "dim" | "aug";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_NOTES: NoteName[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const NOTE_LABELS_PT: Record<NoteName, string> = {
  C: "Dó", "C#": "Dó#", D: "Ré", "D#": "Ré#", E: "Mi",
  F: "Fá", "F#": "Fá#", G: "Sol", "G#": "Sol#", A: "Lá", "A#": "Lá#", B: "Si",
};

const BASE_FREQUENCIES: Record<NoteName, number> = {
  C: 261.63, "C#": 277.18, D: 293.66, "D#": 311.13, E: 329.63,
  F: 349.23, "F#": 369.99, G: 392.0, "G#": 415.3, A: 440.0, "A#": 466.16, B: 493.88,
};

const SCALES: Record<ScaleId, { name: string; intervals: number[]; formula: string; description: string }> = {
  maior: {
    name: "Maior",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: "T – T – S – T – T – T – S",
    description: "Som alegre e brilhante. Base da música ocidental.",
  },
  menor_natural: {
    name: "Menor Natural",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: "T – S – T – T – S – T – T",
    description: "Tom melancólico e expressivo. Muito usada em pop e rock.",
  },
  menor_harmonica: {
    name: "Menor Harmónica",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: "T – S – T – T – S – T½ – S",
    description: "Tensão exótica pelo intervalo aumentado. Presente no flamenco.",
  },
  pent_maior: {
    name: "Pentatónica Maior",
    intervals: [0, 2, 4, 7, 9],
    formula: "T – T – T½ – T – T½",
    description: "5 notas, soa sempre bem. Ideal para improvisar.",
  },
  pent_menor: {
    name: "Pentatónica Menor",
    intervals: [0, 3, 5, 7, 10],
    formula: "T½ – T – T – T½ – T",
    description: "Base do blues e do rock. Nunca soa errado.",
  },
  blues: {
    name: "Blues",
    intervals: [0, 3, 5, 6, 7, 10],
    formula: "T½ – T – S – S – T½ – T",
    description: "Pentatónica menor + nota blue. O coração do blues.",
  },
  cromatica: {
    name: "Cromática",
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    formula: "S – S – S – S – S – S – S – S – S – S – S – S",
    description: "Todas as 12 notas em meios-tons consecutivos.",
  },
};

const CHORDS: Record<ChordId, { name: string; intervals: number[]; quality: string; symbol: string }> = {
  maior: { name: "Maior", intervals: [0, 4, 7], quality: "Estável e alegre", symbol: "" },
  menor: { name: "Menor", intervals: [0, 3, 7], quality: "Sombrio e expressivo", symbol: "m" },
  dom7: { name: "Sétima Dominante", intervals: [0, 4, 7, 10], quality: "Tensão, pede resolução", symbol: "7" },
  min7: { name: "Menor Sétima", intervals: [0, 3, 7, 10], quality: "Suave e jazzístico", symbol: "m7" },
  dim: { name: "Diminuto", intervals: [0, 3, 6], quality: "Muito tenso, instável", symbol: "dim" },
  aug: { name: "Aumentado", intervals: [0, 4, 8], quality: "Misterioso e suspenso", symbol: "aug" },
};

const CHORD_NOTE_COLORS = ["#f59e0b", "#34d399", "#60a5fa", "#f472b6"];

const CIRCLE_OF_FIFTHS_MAJOR: NoteName[] = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
const CIRCLE_OF_FIFTHS_MINOR: NoteName[] = ["A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F", "C", "G", "D"];

const SEGMENT_COLORS = [
  "#b45309", "#92400e", "#78350f",
  "#7c3aed", "#6d28d9", "#5b21b6",
  "#1d4ed8", "#1e40af", "#1e3a8a",
  "#065f46", "#064e3b", "#713f12",
];

const WHITE_KEY_INDICES = [0, 2, 4, 5, 7, 9, 11];

// ─── Audio Engine ─────────────────────────────────────────────────────────────

function useAudioEngine(volume: number, sustain: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playNote = useCallback(
    (frequency: number, startTime: number, duration: number) => {
      const ctx = getCtx();
      const gainNode = ctx.createGain();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.value = frequency;
      osc2.frequency.value = frequency * 2;

      const masterGain = ctx.createGain();
      masterGain.gain.value = volume * 0.015;

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(masterGain);
      masterGain.connect(ctx.destination);

      const attack = 0.01;
      const decay = 0.1;
      const sustainLevel = sustain ? 0.6 : 0.3;
      const release = sustain ? 1.2 : 0.4;

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(1, startTime + attack);
      gainNode.gain.exponentialRampToValueAtTime(sustainLevel, startTime + attack + decay);
      gainNode.gain.setValueAtTime(sustainLevel, startTime + duration);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration + release);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + release + 0.1);
      osc2.stop(startTime + duration + release + 0.1);
    },
    [getCtx, volume, sustain]
  );

  const playScale = useCallback(
    (notes: number[], rootFreq: number) => {
      const ctx = getCtx();
      const now = ctx.currentTime;
      notes.forEach((semitones, i) => {
        const freq = rootFreq * Math.pow(2, semitones / 12);
        playNote(freq, now + i * 0.32, 0.28);
      });
    },
    [getCtx, playNote]
  );

  const playChord = useCallback(
    (notes: number[], rootFreq: number) => {
      const ctx = getCtx();
      const now = ctx.currentTime;
      notes.forEach((semitones) => {
        const freq = rootFreq * Math.pow(2, semitones / 12);
        playNote(freq, now, 1.2);
      });
    },
    [getCtx, playNote]
  );

  const playTonic = useCallback(
    (rootFreq: number) => {
      const ctx = getCtx();
      const now = ctx.currentTime;
      [0, 4, 7].forEach((semitones) => {
        const freq = rootFreq * Math.pow(2, semitones / 12);
        playNote(freq, now, 0.8);
      });
    },
    [getCtx, playNote]
  );

  return { playScale, playChord, playTonic };
}

// ─── Piano Keyboard Component ─────────────────────────────────────────────────

interface PianoProps {
  highlightedNotes: number[];
  noteColors?: Record<number, string>;
  activeNote?: number | null;
  onNoteClick?: (semitone: number) => void;
}

function PianoKeyboard({ highlightedNotes, noteColors, activeNote, onNoteClick }: PianoProps) {
  const whiteKeys = WHITE_KEY_INDICES;

  return (
    <div style={{ position: "relative", display: "flex", gap: 3, userSelect: "none" }}>
      {/* White keys */}
      {whiteKeys.map((semitone, i) => {
        const isHighlighted = highlightedNotes.includes(semitone);
        const isActive = activeNote === semitone;
        const color = noteColors?.[semitone] ?? "#f59e0b";
        return (
          <div
            key={semitone}
            onClick={() => onNoteClick?.(semitone)}
            style={{
              width: 44,
              height: 140,
              borderRadius: "0 0 6px 6px",
              border: "1.5px solid #44403c",
              background: isActive
                ? color
                : isHighlighted
                ? `${color}55`
                : "#e7e5e4",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: "background 0.12s",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 8,
              boxShadow: isHighlighted
                ? `0 0 12px ${color}88`
                : "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            {isHighlighted && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isActive ? "#1c1917" : color,
                  textShadow: isActive ? "none" : "0 0 6px " + color,
                }}
              >
                {NOTE_LABELS_PT[ALL_NOTES[semitone]]}
              </span>
            )}
          </div>
        );
      })}

      {/* Black keys overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          pointerEvents: "none",
        }}
      >
        {[1, 3, -1, 6, 8, 10].map((semitone, rawIdx) => {
          if (semitone === -1) return null;
          // Calculate x position: after white key i → left = i * 47 + 30
          const whiteKeyWidth = 47;
          const xPos = (rawIdx <= 1 ? rawIdx : rawIdx <= 3 ? rawIdx + 1 : rawIdx + 2) * whiteKeyWidth + 29;
          const isHighlighted = highlightedNotes.includes(semitone);
          const isAct = activeNote === semitone;
          const color = noteColors?.[semitone] ?? "#f59e0b";

          return (
            <div
              key={semitone}
              onClick={(e) => {
                e.stopPropagation();
                onNoteClick?.(semitone);
              }}
              style={{
                position: "absolute",
                left: xPos,
                top: 0,
                width: 28,
                height: 88,
                background: isAct
                  ? color
                  : isHighlighted
                  ? `${color}99`
                  : "#1c1917",
                borderRadius: "0 0 4px 4px",
                border: "1px solid #57534e",
                zIndex: 3,
                cursor: "pointer",
                pointerEvents: "auto",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 6,
                boxShadow: isHighlighted
                  ? `0 0 14px ${color}aa`
                  : "0 3px 6px rgba(0,0,0,0.6)",
                transition: "background 0.12s",
              }}
            >
              {isHighlighted && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: isAct ? "#1c1917" : color,
                    writingMode: "vertical-rl",
                    textShadow: isAct ? "none" : `0 0 6px ${color}`,
                  }}
                >
                  {NOTE_LABELS_PT[ALL_NOTES[semitone]]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Circle of Fifths Component ───────────────────────────────────────────────

interface CircleProps {
  selectedKey: NoteName | null;
  onKeySelect: (key: NoteName) => void;
}

function CircleOfFifths({ selectedKey, onKeySelect }: CircleProps) {
  const cx = 200;
  const cy = 200;
  const outerR = 170;
  const innerR = 110;
  const labelOuterR = 148;
  const labelInnerR = 88;
  const total = 12;

  const segments = CIRCLE_OF_FIFTHS_MAJOR.map((note, i) => {
    const startAngle = (i / total) * 2 * Math.PI - Math.PI / 2 - Math.PI / total;
    const endAngle = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2 - Math.PI / total;
    const midAngle = (startAngle + endAngle) / 2;

    const outerStart = {
      x: cx + outerR * Math.cos(startAngle),
      y: cy + outerR * Math.sin(startAngle),
    };
    const outerEnd = {
      x: cx + outerR * Math.cos(endAngle),
      y: cy + outerR * Math.sin(endAngle),
    };
    const innerStart = {
      x: cx + innerR * Math.cos(startAngle),
      y: cy + innerR * Math.sin(startAngle),
    };
    const innerEnd = {
      x: cx + innerR * Math.cos(endAngle),
      y: cy + innerR * Math.sin(endAngle),
    };

    const path = `
      M ${outerStart.x} ${outerStart.y}
      A ${outerR} ${outerR} 0 0 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      A ${innerR} ${innerR} 0 0 0 ${innerStart.x} ${innerStart.y}
      Z
    `;

    const labelOuter = {
      x: cx + labelOuterR * Math.cos(midAngle),
      y: cy + labelOuterR * Math.sin(midAngle),
    };

    const isSelected = note === selectedKey;
    const relMinor = CIRCLE_OF_FIFTHS_MINOR[i];
    const isRelMinorSelected = relMinor === selectedKey;

    const innerSegStart = {
      x: cx + innerR * Math.cos(startAngle),
      y: cy + innerR * Math.sin(startAngle),
    };
    const innerSegEnd = {
      x: cx + innerR * Math.cos(endAngle),
      y: cy + innerR * Math.sin(endAngle),
    };
    const innerInnerR = 62;
    const innerSegInnerStart = {
      x: cx + innerInnerR * Math.cos(startAngle),
      y: cy + innerInnerR * Math.sin(startAngle),
    };
    const innerSegInnerEnd = {
      x: cx + innerInnerR * Math.cos(endAngle),
      y: cy + innerInnerR * Math.sin(endAngle),
    };
    const innerSegPath = `
      M ${innerSegStart.x} ${innerSegStart.y}
      A ${innerR} ${innerR} 0 0 1 ${innerSegEnd.x} ${innerSegEnd.y}
      L ${innerSegInnerEnd.x} ${innerSegInnerEnd.y}
      A ${innerInnerR} ${innerInnerR} 0 0 0 ${innerSegInnerStart.x} ${innerSegInnerStart.y}
      Z
    `;
    const labelInner = {
      x: cx + labelInnerR * Math.cos(midAngle),
      y: cy + labelInnerR * Math.sin(midAngle),
    };

    return {
      note,
      relMinor,
      path,
      innerSegPath,
      labelOuter,
      labelInner,
      isSelected,
      isRelMinorSelected,
      color: SEGMENT_COLORS[i],
      midAngle,
    };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      style={{ width: "100%", maxWidth: 400, filter: "drop-shadow(0 0 24px rgba(0,0,0,0.5))" }}
    >
      {segments.map((seg) => (
        <g key={seg.note}>
          {/* Outer segment — Major */}
          <path
            d={seg.path}
            fill={seg.isSelected ? "#f59e0b" : seg.color}
            stroke="#1c1917"
            strokeWidth={2}
            style={{ cursor: "pointer", transition: "fill 0.2s" }}
            onClick={() => onKeySelect(seg.note)}
          />
          <text
            x={seg.labelOuter.x}
            y={seg.labelOuter.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={seg.isSelected ? "#1c1917" : "#fff"}
            fontSize={seg.isSelected ? 15 : 13}
            fontWeight={seg.isSelected ? "800" : "600"}
            style={{ cursor: "pointer", pointerEvents: "none", fontFamily: "monospace" }}
          >
            {seg.note}
          </text>

          {/* Inner segment — Relative Minor */}
          <path
            d={seg.innerSegPath}
            fill={seg.isRelMinorSelected ? "#34d399" : "#292524"}
            stroke="#1c1917"
            strokeWidth={2}
            style={{ cursor: "pointer", transition: "fill 0.2s" }}
            onClick={() => onKeySelect(seg.relMinor)}
          />
          <text
            x={seg.labelInner.x}
            y={seg.labelInner.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={seg.isRelMinorSelected ? "#1c1917" : "#a8a29e"}
            fontSize={10}
            fontWeight="600"
            style={{ cursor: "pointer", pointerEvents: "none", fontFamily: "monospace" }}
          >
            {seg.relMinor}m
          </text>
        </g>
      ))}

      {/* Center label */}
      <circle cx={cx} cy={cy} r={58} fill="#1c1917" stroke="#44403c" strokeWidth={2} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#a8a29e" fontSize={10} fontFamily="monospace">
        Círculo de
      </text>
      <text x={cx} y={cy + 6} textAnchor="middle" fill="#f5f5f4" fontSize={12} fontWeight="700" fontFamily="monospace">
        Quintas
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fill="#78716c" fontSize={9} fontFamily="monospace">
        {selectedKey ? `Tonalidade: ${selectedKey}` : "Clica uma nota"}
      </text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function MusicTheoryPage() {
  const [activeTab, setActiveTab] = useState<TabId>("escalas");
  const [volume, setVolume] = useState(60);
  const [sustain, setSustain] = useState(false);

  // Escalas state
  const [scaleRoot, setScaleRoot] = useState<NoteName>("C");
  const [scaleId, setScaleId] = useState<ScaleId>("maior");
  const [playingNote, setPlayingNote] = useState<number | null>(null);
  const [isPlayingScale, setIsPlayingScale] = useState(false);

  // Acordes state
  const [chordRoot, setChordRoot] = useState<NoteName>("C");
  const [chordId, setChordId] = useState<ChordId>("maior");
  const [isPlayingChord, setIsPlayingChord] = useState(false);

  // Círculo state
  const [circleKey, setCircleKey] = useState<NoteName | null>(null);

  const { playScale, playChord, playTonic } = useAudioEngine(volume, sustain);

  // Computed values
  const currentScale = SCALES[scaleId];
  const scaleNotes = currentScale.intervals;
  const rootFreq = BASE_FREQUENCIES[scaleRoot];

  const currentChord = CHORDS[chordId];
  const chordNotes = currentChord.intervals;
  const chordRootFreq = BASE_FREQUENCIES[chordRoot];

  const chordNoteNames = chordNotes.map((semitones) => {
    const noteIdx = (ALL_NOTES.indexOf(chordRoot) + semitones) % 12;
    return ALL_NOTES[noteIdx];
  });

  const chordNoteColors: Record<number, string> = {};
  chordNotes.forEach((semitone, i) => {
    chordNoteColors[semitone] = CHORD_NOTE_COLORS[i];
  });

  const scaleNoteNames = scaleNotes.map((s) => {
    const idx = (ALL_NOTES.indexOf(scaleRoot) + s) % 12;
    return NOTE_LABELS_PT[ALL_NOTES[idx]];
  });

  // Circle key selected
  const handleCircleKeySelect = useCallback(
    (key: NoteName) => {
      setCircleKey(key);
      playTonic(BASE_FREQUENCIES[key]);
    },
    [playTonic]
  );

  const circleHighlightedNotes = circleKey
    ? SCALES.maior.intervals.map((s) => (ALL_NOTES.indexOf(circleKey) + s) % 12)
    : [];

  // Relative root-shifted scale notes for piano highlight
  const shiftedScaleNotes = scaleNotes.map((s) => (ALL_NOTES.indexOf(scaleRoot) + s) % 12);

  const handlePlayScale = useCallback(() => {
    if (isPlayingScale) return;
    setIsPlayingScale(true);
    playScale(scaleNotes, rootFreq);
    scaleNotes.forEach((_, i) => {
      setTimeout(() => {
        setPlayingNote(shiftedScaleNotes[i]);
        if (i === scaleNotes.length - 1) {
          setTimeout(() => {
            setPlayingNote(null);
            setIsPlayingScale(false);
          }, 400);
        }
      }, i * 320);
    });
  }, [isPlayingScale, playScale, scaleNotes, rootFreq, shiftedScaleNotes]);

  const handlePlayChord = useCallback(() => {
    if (isPlayingChord) return;
    setIsPlayingChord(true);
    playChord(chordNotes, chordRootFreq);
    setTimeout(() => setIsPlayingChord(false), 1400);
  }, [isPlayingChord, playChord, chordNotes, chordRootFreq]);

  const INTERVAL_NAMES: Record<number, string> = {
    0: "Tónica (uníssono)",
    1: "2ª menor",
    2: "2ª maior",
    3: "3ª menor",
    4: "3ª maior",
    5: "4ª perfeita",
    6: "4ª aumentada / 5ª dim.",
    7: "5ª perfeita",
    8: "5ª aumentada / 6ª menor",
    9: "6ª maior",
    10: "7ª menor",
    11: "7ª maior",
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1c1917",
        color: "#f5f5f4",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "0 0 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #292524 0%, #1c1917 100%)",
          borderBottom: "1px solid #44403c",
          padding: "28px 24px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 6 }}>🎵</div>
        <h1
          style={{
            fontSize: "clamp(22px, 5vw, 32px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            background: "linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Teoria Musical
        </h1>
        <p style={{ color: "#a8a29e", fontSize: 14, margin: "6px 0 0", letterSpacing: "0.02em" }}>
          Escalas · Acordes · Círculo de Quintas
        </p>
      </div>

      {/* Global Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          justifyContent: "center",
          padding: "14px 24px",
          borderBottom: "1px solid #292524",
          flexWrap: "wrap",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#a8a29e" }}>
          <span>🔊</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: 100, accentColor: "#f59e0b" }}
          />
          <span style={{ color: "#f5f5f4", fontWeight: 600, minWidth: 28 }}>{volume}</span>
        </label>
        <button
          onClick={() => setSustain((s) => !s)}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: `1.5px solid ${sustain ? "#f59e0b" : "#44403c"}`,
            background: sustain ? "#f59e0b22" : "transparent",
            color: sustain ? "#f59e0b" : "#78716c",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          SUSTAIN {sustain ? "ON" : "OFF"}
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          padding: "16px 24px 0",
        }}
      >
        {(["escalas", "acordes", "circulo"] as TabId[]).map((tab) => {
          const labels: Record<TabId, string> = {
            escalas: "Escalas",
            acordes: "Acordes",
            circulo: "Círculo de Quintas",
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px 8px 0 0",
                border: "1.5px solid",
                borderBottom: "none",
                borderColor: activeTab === tab ? "#f59e0b" : "#44403c",
                background: activeTab === tab ? "#292524" : "transparent",
                color: activeTab === tab ? "#f59e0b" : "#78716c",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.18s",
                letterSpacing: "0.02em",
              }}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        style={{
          border: "1.5px solid #44403c",
          borderRadius: "0 8px 8px 8px",
          margin: "0 24px",
          padding: "28px 24px",
          background: "#292524",
          minHeight: 480,
        }}
      >
        {/* ── TAB 1: ESCALAS ── */}
        {activeTab === "escalas" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 28,
                alignItems: "flex-end",
              }}
            >
              {/* Root note */}
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#78716c", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Nota raiz
                </label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {ALL_NOTES.map((note) => (
                    <button
                      key={note}
                      onClick={() => setScaleRoot(note)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        border: `1.5px solid ${scaleRoot === note ? "#f59e0b" : "#44403c"}`,
                        background: scaleRoot === note ? "#f59e0b" : "#1c1917",
                        color: scaleRoot === note ? "#1c1917" : "#a8a29e",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "monospace",
                      }}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale selector */}
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#78716c", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Escala
                </label>
                <select
                  value={scaleId}
                  onChange={(e) => setScaleId(e.target.value as ScaleId)}
                  style={{
                    padding: "9px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #44403c",
                    background: "#1c1917",
                    color: "#f5f5f4",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                    minWidth: 200,
                  }}
                >
                  {Object.entries(SCALES).map(([id, scale]) => (
                    <option key={id} value={id}>
                      {scale.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Play button */}
              <button
                onClick={handlePlayScale}
                disabled={isPlayingScale}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: isPlayingScale ? "#44403c" : "#f59e0b",
                  color: isPlayingScale ? "#78716c" : "#1c1917",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isPlayingScale ? "not-allowed" : "pointer",
                  transition: "all 0.18s",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {isPlayingScale ? "▶ A tocar…" : "▶ Tocar Escala"}
              </button>
            </div>

            {/* Scale info card */}
            <div
              style={{
                background: "#1c1917",
                border: "1px solid #44403c",
                borderRadius: 10,
                padding: "16px 20px",
                marginBottom: 28,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                  Fórmula de tons
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    color: "#f59e0b",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {currentScale.formula}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                  Notas
                </div>
                <div style={{ fontSize: 14, color: "#fcd34d", fontWeight: 600, fontFamily: "monospace" }}>
                  {scaleNoteNames.join(" – ")}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                  Sobre esta escala
                </div>
                <div style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.6 }}>
                  {currentScale.description}
                </div>
              </div>
            </div>

            {/* Piano */}
            <div style={{ overflowX: "auto", paddingBottom: 8 }}>
              <PianoKeyboard
                highlightedNotes={shiftedScaleNotes}
                activeNote={playingNote}
              />
            </div>

            {/* Intervals legend */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Intervalos da escala
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {scaleNotes.map((semitone, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#1c1917",
                      border: "1px solid #44403c",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: "#f5f5f4",
                    }}
                  >
                    <span style={{ color: "#f59e0b", fontWeight: 700, fontFamily: "monospace" }}>
                      {scaleNoteNames[i]}
                    </span>
                    <span style={{ color: "#78716c", marginLeft: 6 }}>
                      {INTERVAL_NAMES[semitone] ?? `+${semitone} st`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: ACORDES ── */}
        {activeTab === "acordes" && (
          <div>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 28,
                alignItems: "flex-end",
              }}
            >
              {/* Root note */}
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#78716c", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Nota raiz
                </label>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {ALL_NOTES.map((note) => (
                    <button
                      key={note}
                      onClick={() => setChordRoot(note)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 6,
                        border: `1.5px solid ${chordRoot === note ? "#f59e0b" : "#44403c"}`,
                        background: chordRoot === note ? "#f59e0b" : "#1c1917",
                        color: chordRoot === note ? "#1c1917" : "#a8a29e",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "monospace",
                      }}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chord type */}
              <div>
                <label style={{ display: "block", fontSize: 11, color: "#78716c", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Tipo de Acorde
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {Object.entries(CHORDS).map(([id, chord]) => (
                    <button
                      key={id}
                      onClick={() => setChordId(id as ChordId)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 7,
                        border: `1.5px solid ${chordId === id ? "#f59e0b" : "#44403c"}`,
                        background: chordId === id ? "#f59e0b22" : "#1c1917",
                        color: chordId === id ? "#f59e0b" : "#a8a29e",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {chord.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Play */}
              <button
                onClick={handlePlayChord}
                disabled={isPlayingChord}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: isPlayingChord ? "#44403c" : "#f59e0b",
                  color: isPlayingChord ? "#78716c" : "#1c1917",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isPlayingChord ? "not-allowed" : "pointer",
                  transition: "all 0.18s",
                  letterSpacing: "0.04em",
                }}
              >
                {isPlayingChord ? "▶ A tocar…" : "▶ Tocar Acorde"}
              </button>
            </div>

            {/* Chord info */}
            <div
              style={{
                background: "#1c1917",
                border: "1px solid #44403c",
                borderRadius: 10,
                padding: "16px 20px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "monospace",
                    color: "#f59e0b",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {NOTE_LABELS_PT[chordRoot]}
                  {currentChord.symbol && (
                    <sup style={{ fontSize: 14, color: "#fcd34d" }}>{currentChord.symbol}</sup>
                  )}
                </span>
                <span style={{ color: "#78716c", fontSize: 13 }}>({currentChord.name})</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 12,
                    color: "#a8a29e",
                    fontStyle: "italic",
                  }}
                >
                  {currentChord.quality}
                </span>
              </div>

              {/* Note pills */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {chordNotes.map((semitone, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        background: CHORD_NOTE_COLORS[i] + "22",
                        border: `2px solid ${CHORD_NOTE_COLORS[i]}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 800,
                        color: CHORD_NOTE_COLORS[i],
                        fontFamily: "monospace",
                        boxShadow: `0 0 12px ${CHORD_NOTE_COLORS[i]}44`,
                      }}
                    >
                      {NOTE_LABELS_PT[chordNoteNames[i]]}
                    </div>
                    <span style={{ fontSize: 10, color: "#78716c" }}>
                      {INTERVAL_NAMES[semitone]?.split(" ")[0] ?? `+${semitone}`}
                    </span>
                  </div>
                ))}

                <div style={{ marginLeft: 8, fontSize: 13, color: "#78716c", fontFamily: "monospace" }}>
                  = {chordNoteNames.map((n) => NOTE_LABELS_PT[n]).join(" – ")}
                </div>
              </div>
            </div>

            {/* Piano with chord */}
            <div style={{ overflowX: "auto", paddingBottom: 8 }}>
              <PianoKeyboard
                highlightedNotes={chordNotes.map((s) => (ALL_NOTES.indexOf(chordRoot) + s) % 12)}
                noteColors={Object.fromEntries(
                  chordNotes.map((s, i) => [(ALL_NOTES.indexOf(chordRoot) + s) % 12, CHORD_NOTE_COLORS[i]])
                )}
                activeNote={isPlayingChord ? (ALL_NOTES.indexOf(chordRoot) % 12) : null}
              />
            </div>

            {/* Interval breakdown */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Estrutura do acorde
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {chordNotes.map((semitone, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#1c1917",
                      border: `1px solid ${CHORD_NOTE_COLORS[i]}55`,
                      borderRadius: 6,
                      padding: "8px 14px",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: CHORD_NOTE_COLORS[i], fontWeight: 700, fontFamily: "monospace" }}>
                      {NOTE_LABELS_PT[chordNoteNames[i]]}
                    </span>
                    <span style={{ color: "#78716c", marginLeft: 8 }}>
                      {INTERVAL_NAMES[semitone] ?? `+${semitone} st`}
                    </span>
                    <span style={{ color: "#57534e", marginLeft: 8, fontSize: 11 }}>
                      (+{semitone} st)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: CÍRCULO DE QUINTAS ── */}
        {activeTab === "circulo" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(300px, 420px) 1fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              {/* SVG Circle */}
              <div>
                <CircleOfFifths
                  selectedKey={circleKey}
                  onKeySelect={handleCircleKeySelect}
                />
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 11, color: "#78716c" }}>
                    <span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          background: "#b45309",
                          marginRight: 5,
                          verticalAlign: "middle",
                        }}
                      />
                      Tonalidades maiores
                    </span>
                    <span>
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          background: "#292524",
                          border: "1px solid #57534e",
                          marginRight: 5,
                          verticalAlign: "middle",
                        }}
                      />
                      Relativas menores
                    </span>
                  </div>
                </div>
              </div>

              {/* Info panel */}
              <div>
                {circleKey ? (
                  <div>
                    <div
                      style={{
                        background: "#1c1917",
                        border: "1px solid #44403c",
                        borderRadius: 10,
                        padding: "20px",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                        Tonalidade selecionada
                      </div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace", marginBottom: 4 }}>
                        {circleKey} Maior
                      </div>
                      <div style={{ fontSize: 13, color: "#a8a29e" }}>
                        Relativa menor:{" "}
                        <span style={{ color: "#34d399", fontWeight: 600, fontFamily: "monospace" }}>
                          {CIRCLE_OF_FIFTHS_MINOR[CIRCLE_OF_FIFTHS_MAJOR.indexOf(circleKey)]}m
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        background: "#1c1917",
                        border: "1px solid #44403c",
                        borderRadius: 10,
                        padding: "16px 20px",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                        Escala de {circleKey} Maior
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {circleHighlightedNotes.map((noteIdx, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              background: "#f59e0b22",
                              border: "1px solid #f59e0b55",
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#f59e0b",
                              fontFamily: "monospace",
                            }}
                          >
                            {NOTE_LABELS_PT[ALL_NOTES[noteIdx]]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Neighbours */}
                    <div
                      style={{
                        background: "#1c1917",
                        border: "1px solid #44403c",
                        borderRadius: 10,
                        padding: "16px 20px",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                        Vizinhos no círculo
                      </div>
                      {(() => {
                        const idx = CIRCLE_OF_FIFTHS_MAJOR.indexOf(circleKey);
                        const prev = CIRCLE_OF_FIFTHS_MAJOR[(idx - 1 + 12) % 12];
                        const next = CIRCLE_OF_FIFTHS_MAJOR[(idx + 1) % 12];
                        return (
                          <div style={{ display: "flex", gap: 12 }}>
                            <div
                              style={{
                                flex: 1,
                                textAlign: "center",
                                padding: "10px",
                                background: "#292524",
                                borderRadius: 8,
                                cursor: "pointer",
                                border: "1px solid #44403c",
                              }}
                              onClick={() => handleCircleKeySelect(prev)}
                            >
                              <div style={{ fontSize: 10, color: "#78716c", marginBottom: 4 }}>← 4ª Perfeita</div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f4", fontFamily: "monospace" }}>
                                {prev}
                              </div>
                            </div>
                            <div
                              style={{
                                flex: 1,
                                textAlign: "center",
                                padding: "10px",
                                background: "#292524",
                                borderRadius: 8,
                                cursor: "pointer",
                                border: "1px solid #44403c",
                              }}
                              onClick={() => handleCircleKeySelect(next)}
                            >
                              <div style={{ fontSize: 10, color: "#78716c", marginBottom: 4 }}>5ª Perfeita →</div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f4", fontFamily: "monospace" }}>
                                {next}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Piano */}
                    <div>
                      <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                        Teclado — {circleKey} Maior
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <PianoKeyboard highlightedNotes={circleHighlightedNotes} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 320,
                      color: "#57534e",
                      textAlign: "center",
                      gap: 12,
                    }}
                  >
                    <div style={{ fontSize: 40 }}>🎯</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>
                      Clica qualquer tonalidade
                    </div>
                    <div style={{ fontSize: 13 }}>
                      Externo = tonalidades maiores<br />
                      Interno = relativas menores
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Theory explainer */}
            <div
              style={{
                marginTop: 32,
                background: "#1c1917",
                border: "1px solid #44403c",
                borderRadius: 10,
                padding: "20px",
              }}
            >
              <div style={{ fontSize: 11, color: "#78716c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                Como funciona o Círculo de Quintas?
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: "🔄",
                    title: "Sentido horário",
                    text: "Cada nota é uma 5ª perfeita (+7 semitons) acima da anterior.",
                  },
                  {
                    icon: "🎼",
                    title: "Relativas menores",
                    text: "Cada maior tem uma relativa menor com as mesmas notas (anel interno).",
                  },
                  {
                    icon: "🔑",
                    title: "Armações de clave",
                    text: "Avançar um passo horário adiciona um sustenido; anti-horário, um bemol.",
                  },
                  {
                    icon: "🎸",
                    title: "Progressões",
                    text: "Tonalidades próximas soam bem juntas — a base das progressões I-IV-V.",
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f5f4", marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#78716c", lineHeight: 1.6 }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "32px 24px 0",
          color: "#57534e",
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        Teoria Musical · Web Audio API · Descomplicai
      </div>
    </div>
  );
}
