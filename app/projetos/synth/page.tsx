"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ADSRParams {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

interface FilterParams {
  cutoff: number;
  resonance: number;
}

interface DelayParams {
  time: number;
  feedback: number;
}

interface SynthParams {
  waveform: OscillatorType;
  adsr: ADSRParams;
  filter: FilterParams;
  reverbMix: number;
  delay: DelayParams;
  distortion: number;
  volume: number;
}

interface ActiveNote {
  oscillator: OscillatorNode;
  gainNode: GainNode;
  startTime: number;
}

type PresetName =
  | "Pad Suave"
  | "Lead Agressivo"
  | "Bass Profundo"
  | "Bells"
  | "Strings";

// ─── Note frequencies (3 octaves: C3–B5) ─────────────────────────────────────

const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

function noteFrequency(octave: number, semitone: number): number {
  // A4 = 440 Hz, MIDI note 69
  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Build 3 octaves starting from C3
const KEYS: { note: string; freq: number; isBlack: boolean; octave: number; semitone: number }[] =
  [];
for (let oct = 3; oct <= 5; oct++) {
  for (let s = 0; s < 12; s++) {
    const name = NOTE_NAMES[s];
    KEYS.push({
      note: `${name}${oct}`,
      freq: noteFrequency(oct, s),
      isBlack: name.includes("#"),
      octave: oct,
      semitone: s,
    });
  }
}

// Keyboard shortcut mapping
const BOTTOM_ROW = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
const MIDDLE_ROW = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
const TOP_ROW    = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

// Map key → note index (white keys only per octave)
// White keys per octave: C D E F G A B = indices 0,2,4,5,7,9,11
const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];

function buildShortcutMap(): Record<string, string> {
  const map: Record<string, string> = {};
  // Bottom octave (C3): z x c v b n m , . /  → 10 but 7 white keys
  const rows = [BOTTOM_ROW, MIDDLE_ROW, TOP_ROW];
  [3, 4, 5].forEach((oct, oi) => {
    WHITE_SEMITONES.forEach((s, wi) => {
      const key = rows[oi][wi];
      if (key) {
        const noteName = `${NOTE_NAMES[s]}${oct}`;
        map[key] = noteName;
      }
    });
    // Also map sharps with shift? Skip for simplicity — just white keys.
  });
  return map;
}

const SHORTCUT_MAP = buildShortcutMap();

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Record<PresetName, SynthParams> = {
  "Pad Suave": {
    waveform: "sine",
    adsr: { attack: 0.4, decay: 0.3, sustain: 0.7, release: 1.2 },
    filter: { cutoff: 800, resonance: 2 },
    reverbMix: 0.6,
    delay: { time: 0.3, feedback: 0.3 },
    distortion: 0,
    volume: 0.7,
  },
  "Lead Agressivo": {
    waveform: "sawtooth",
    adsr: { attack: 0.01, decay: 0.1, sustain: 0.8, release: 0.15 },
    filter: { cutoff: 5000, resonance: 12 },
    reverbMix: 0.1,
    delay: { time: 0.12, feedback: 0.4 },
    distortion: 0.6,
    volume: 0.75,
  },
  "Bass Profundo": {
    waveform: "square",
    adsr: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.3 },
    filter: { cutoff: 300, resonance: 5 },
    reverbMix: 0.05,
    delay: { time: 0.0, feedback: 0.0 },
    distortion: 0.3,
    volume: 0.85,
  },
  Bells: {
    waveform: "sine",
    adsr: { attack: 0.005, decay: 0.5, sustain: 0.1, release: 1.5 },
    filter: { cutoff: 8000, resonance: 1 },
    reverbMix: 0.5,
    delay: { time: 0.25, feedback: 0.2 },
    distortion: 0,
    volume: 0.6,
  },
  Strings: {
    waveform: "sawtooth",
    adsr: { attack: 0.3, decay: 0.2, sustain: 0.9, release: 0.8 },
    filter: { cutoff: 2000, resonance: 3 },
    reverbMix: 0.4,
    delay: { time: 0.05, feedback: 0.1 },
    distortion: 0.05,
    volume: 0.65,
  },
};

// ─── Waveform icons ───────────────────────────────────────────────────────────

function SineIcon({ active }: { active: boolean }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
      <path
        d="M2 12 C6 2, 10 2, 14 12 C18 22, 22 22, 26 12 C30 2, 34 2, 34 12"
        stroke={active ? "#06b6d4" : "#4a5568"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SquareIcon({ active }: { active: boolean }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
      <path
        d="M2 18 L2 6 L10 6 L10 18 L18 18 L18 6 L26 6 L26 18 L34 18"
        stroke={active ? "#06b6d4" : "#4a5568"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}

function SawtoothIcon({ active }: { active: boolean }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
      <path
        d="M2 18 L10 6 L10 18 L18 6 L18 18 L26 6 L26 18 L34 6"
        stroke={active ? "#06b6d4" : "#4a5568"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TriangleIcon({ active }: { active: boolean }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
      <path
        d="M2 18 L10 6 L18 18 L26 6 L34 18"
        stroke={active ? "#06b6d4" : "#4a5568"}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Slider component ─────────────────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  displayValue?: string;
  color?: string;
}

function NeonSlider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  displayValue,
  color = "#06b6d4",
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
        <span className="text-[10px] font-mono" style={{ color }}>
          {displayValue ?? value.toFixed(2)}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-800">
        <div
          className="absolute h-full rounded-full transition-none"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}55, ${color})` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 pointer-events-none"
          style={{
            left: `calc(${pct}% - 6px)`,
            borderColor: color,
            background: "#1a1a2e",
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  accent = "#06b6d4",
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}33`,
        boxShadow: `inset 0 0 20px ${accent}0a`,
      }}
    >
      <h3
        className="text-[10px] uppercase tracking-[0.2em] font-bold"
        style={{ color: accent }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SynthPage() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const reverbRef = useRef<ConvolverNode | null>(null);
  const reverbGainRef = useRef<GainNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const delayFeedbackRef = useRef<GainNode | null>(null);
  const delayGainRef = useRef<GainNode | null>(null);
  const distortionRef = useRef<WaveShaperNode | null>(null);
  const activeNotesRef = useRef<Map<string, ActiveNote>>(new Map());
  const oscCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const vuCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const vuAnimFrameRef = useRef<number>(0);
  const pressedKeysRef = useRef<Set<string>>(new Set());

  const [pressedNotes, setPressedNotes] = useState<Set<string>>(new Set());
  const [audioReady, setAudioReady] = useState(false);

  const [params, setParams] = useState<SynthParams>({
    waveform: "sawtooth",
    adsr: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.3 },
    filter: { cutoff: 2000, resonance: 4 },
    reverbMix: 0.2,
    delay: { time: 0.2, feedback: 0.3 },
    distortion: 0.1,
    volume: 0.7,
  });
  const paramsRef = useRef(params);
  useEffect(() => { paramsRef.current = params; }, [params]);

  const [activePreset, setActivePreset] = useState<PresetName | null>(null);

  // ── Audio init ──────────────────────────────────────────────────────────────

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = paramsRef.current.volume;
    masterGainRef.current = masterGain;

    // Analyser
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyserRef.current = analyser;

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = paramsRef.current.filter.cutoff;
    filter.Q.value = paramsRef.current.filter.resonance;
    filterRef.current = filter;

    // Distortion
    const distortion = ctx.createWaveShaper();
    distortion.curve = makeDistortionCurve(paramsRef.current.distortion * 400) as any;
    distortionRef.current = distortion;

    // Reverb
    const reverb = ctx.createConvolver();
    reverb.buffer = generateImpulseResponse(ctx, 2, 3, false);
    reverbRef.current = reverb;

    const reverbGain = ctx.createGain();
    reverbGain.gain.value = paramsRef.current.reverbMix;
    reverbGainRef.current = reverbGain;

    const dryGain = ctx.createGain();
    dryGain.gain.value = 1 - paramsRef.current.reverbMix * 0.5;
    dryGainRef.current = dryGain;

    // Delay
    const delayNode = ctx.createDelay(2);
    delayNode.delayTime.value = paramsRef.current.delay.time;
    delayNodeRef.current = delayNode;

    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = paramsRef.current.delay.feedback;
    delayFeedbackRef.current = delayFeedback;

    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.4;
    delayGainRef.current = delayGain;

    // Routing:
    // oscillator → filter → distortion → dryGain → masterGain → analyser → destination
    //                                             → reverbGain → reverb → masterGain
    //                                             → delayGain → delayNode → delayFeedback → delayNode (loop)
    //                                                                      → masterGain

    distortion.connect(dryGain);
    distortion.connect(reverbGain);
    distortion.connect(delayGain);

    dryGain.connect(masterGain);
    reverbGain.connect(reverb);
    reverb.connect(masterGain);

    delayGain.connect(delayNode);
    delayNode.connect(delayFeedback);
    delayFeedback.connect(delayNode);
    delayNode.connect(masterGain);

    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    setAudioReady(true);
    startOscilloscope();
    startVUMeter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Distortion curve ────────────────────────────────────────────────────────

  function makeDistortionCurve(amount: number): Float32Array {
    const n = 256;
    const curve = new Float32Array(n);
    const deg = Math.PI / 180;
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      if (amount === 0) {
        curve[i] = x;
      } else {
        curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
      }
    }
    return curve;
  }

  // ── Impulse response ────────────────────────────────────────────────────────

  function generateImpulseResponse(
    ctx: AudioContext,
    duration: number,
    decay: number,
    reverse: boolean
  ): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const impulse = ctx.createBuffer(2, length, sampleRate);
    for (let c = 0; c < 2; c++) {
      const channel = impulse.getChannelData(c);
      for (let i = 0; i < length; i++) {
        const n = reverse ? length - i : i;
        channel[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
      }
    }
    return impulse;
  }

  // ── Note on/off ─────────────────────────────────────────────────────────────

  const noteOn = useCallback(
    (noteName: string, freq: number) => {
      if (!audioCtxRef.current || activeNotesRef.current.has(noteName)) return;
      const ctx = audioCtxRef.current;
      const p = paramsRef.current;

      const osc = ctx.createOscillator();
      osc.type = p.waveform;
      osc.frequency.value = freq;

      const envGain = ctx.createGain();
      envGain.gain.setValueAtTime(0, ctx.currentTime);
      envGain.gain.linearRampToValueAtTime(1, ctx.currentTime + p.adsr.attack);
      envGain.gain.linearRampToValueAtTime(
        p.adsr.sustain,
        ctx.currentTime + p.adsr.attack + p.adsr.decay
      );

      osc.connect(envGain);
      envGain.connect(filterRef.current!);
      filterRef.current!.connect(distortionRef.current!);

      osc.start();

      activeNotesRef.current.set(noteName, {
        oscillator: osc,
        gainNode: envGain,
        startTime: ctx.currentTime,
      });

      setPressedNotes((prev) => {
        const next = new Set(prev);
        next.add(noteName);
        return next;
      });
    },
    []
  );

  const noteOff = useCallback((noteName: string) => {
    const note = activeNotesRef.current.get(noteName);
    if (!note || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const p = paramsRef.current;

    note.gainNode.gain.cancelScheduledValues(ctx.currentTime);
    note.gainNode.gain.setValueAtTime(note.gainNode.gain.value, ctx.currentTime);
    note.gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + p.adsr.release);

    note.oscillator.stop(ctx.currentTime + p.adsr.release + 0.05);
    activeNotesRef.current.delete(noteName);

    setPressedNotes((prev) => {
      const next = new Set(prev);
      next.delete(noteName);
      return next;
    });
  }, []);

  // ── Keyboard events ─────────────────────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (pressedKeysRef.current.has(key)) return;
      const noteName = SHORTCUT_MAP[key];
      if (!noteName) return;
      const keyData = KEYS.find((k) => k.note === noteName);
      if (!keyData) return;
      pressedKeysRef.current.add(key);
      initAudio();
      noteOn(noteName, keyData.freq);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      pressedKeysRef.current.delete(key);
      const noteName = SHORTCUT_MAP[key];
      if (!noteName) return;
      noteOff(noteName);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [initAudio, noteOn, noteOff]);

  // ── Param updates ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (!masterGainRef.current) return;
    masterGainRef.current.gain.value = params.volume;
  }, [params.volume]);

  useEffect(() => {
    if (!filterRef.current) return;
    filterRef.current.frequency.value = params.filter.cutoff;
    filterRef.current.Q.value = params.filter.resonance;
  }, [params.filter.cutoff, params.filter.resonance]);

  useEffect(() => {
    if (!reverbGainRef.current || !dryGainRef.current) return;
    reverbGainRef.current.gain.value = params.reverbMix;
    dryGainRef.current.gain.value = 1 - params.reverbMix * 0.5;
  }, [params.reverbMix]);

  useEffect(() => {
    if (!delayNodeRef.current || !delayFeedbackRef.current) return;
    delayNodeRef.current.delayTime.value = params.delay.time;
    delayFeedbackRef.current.gain.value = params.delay.feedback;
  }, [params.delay.time, params.delay.feedback]);

  useEffect(() => {
    if (!distortionRef.current) return;
    distortionRef.current.curve = makeDistortionCurve(params.distortion * 400) as any;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.distortion]);

  // ── Oscilloscope ────────────────────────────────────────────────────────────

  const startOscilloscope = useCallback(() => {
    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      const canvas = oscCanvasRef.current;
      const analyser = analyserRef.current;
      if (!canvas || !analyser) return;

      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) return;

      const W = canvas.width;
      const H = canvas.height;
      const bufLen = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufLen);
      analyser.getByteTimeDomainData(dataArray);

      ctx2d.clearRect(0, 0, W, H);
      ctx2d.fillStyle = "rgba(26,26,46,0.85)";
      ctx2d.fillRect(0, 0, W, H);

      // Grid
      ctx2d.strokeStyle = "rgba(6,182,212,0.08)";
      ctx2d.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        ctx2d.beginPath();
        ctx2d.moveTo(0, (H / 4) * i);
        ctx2d.lineTo(W, (H / 4) * i);
        ctx2d.stroke();
      }
      for (let i = 0; i <= 8; i++) {
        ctx2d.beginPath();
        ctx2d.moveTo((W / 8) * i, 0);
        ctx2d.lineTo((W / 8) * i, H);
        ctx2d.stroke();
      }

      // Waveform
      ctx2d.lineWidth = 2;
      const gradient = ctx2d.createLinearGradient(0, 0, W, 0);
      gradient.addColorStop(0, "#ec4899");
      gradient.addColorStop(0.5, "#06b6d4");
      gradient.addColorStop(1, "#ec4899");
      ctx2d.strokeStyle = gradient;
      ctx2d.shadowBlur = 8;
      ctx2d.shadowColor = "#06b6d4";

      ctx2d.beginPath();
      const sliceWidth = W / bufLen;
      let x = 0;
      for (let i = 0; i < bufLen; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        if (i === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
        x += sliceWidth;
      }
      ctx2d.lineTo(W, H / 2);
      ctx2d.stroke();
      ctx2d.shadowBlur = 0;
    };
    draw();
  }, []);

  // ── VU Meter ────────────────────────────────────────────────────────────────

  const startVUMeter = useCallback(() => {
    const drawVU = () => {
      vuAnimFrameRef.current = requestAnimationFrame(drawVU);
      const canvas = vuCanvasRef.current;
      const analyser = analyserRef.current;
      if (!canvas || !analyser) return;

      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) return;

      const W = canvas.width;
      const H = canvas.height;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      // Compute RMS-ish level
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i] * dataArray[i];
      }
      const rms = Math.sqrt(sum / dataArray.length) / 255;

      ctx2d.clearRect(0, 0, W, H);
      ctx2d.fillStyle = "rgba(26,26,46,0.9)";
      ctx2d.fillRect(0, 0, W, H);

      const bars = 20;
      const barW = Math.floor(W / bars) - 2;
      const level = rms * bars;

      for (let i = 0; i < bars; i++) {
        const active = i < level;
        let color: string;
        if (i < bars * 0.6) color = active ? "#06b6d4" : "#0f3040";
        else if (i < bars * 0.85) color = active ? "#f59e0b" : "#2a1f00";
        else color = active ? "#ec4899" : "#2a0a1a";

        ctx2d.fillStyle = color;
        if (active) {
          ctx2d.shadowBlur = 4;
          ctx2d.shadowColor = color;
        } else {
          ctx2d.shadowBlur = 0;
        }
        ctx2d.fillRect(i * (barW + 2), 2, barW, H - 4);
      }
      ctx2d.shadowBlur = 0;
    };
    drawVU();
  }, []);

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(vuAnimFrameRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  // ── Preset loader ───────────────────────────────────────────────────────────

  const loadPreset = (name: PresetName) => {
    setParams(PRESETS[name]);
    setActivePreset(name);
    initAudio();
  };

  // ── Keyboard rendering ──────────────────────────────────────────────────────

  // Build white-key list and black-key positions
  const whiteKeys = KEYS.filter((k) => !k.isBlack);
  const keyWidth = 100 / whiteKeys.length; // in %

  // For each black key, compute position relative to white keys
  type BlackKeyInfo = { key: typeof KEYS[0]; leftPct: number };
  const blackKeyInfos: BlackKeyInfo[] = [];
  let whiteIndex = 0;
  for (let i = 0; i < KEYS.length; i++) {
    const k = KEYS[i];
    if (!k.isBlack) {
      whiteIndex++;
    } else {
      // Position: between (whiteIndex-1) and whiteIndex white key
      const leftPct = (whiteIndex - 1) * keyWidth + keyWidth * 0.6;
      blackKeyInfos.push({ key: k, leftPct });
    }
  }

  const handleKeyPress = (k: typeof KEYS[0]) => {
    initAudio();
    noteOn(k.note, k.freq);
  };
  const handleKeyRelease = (k: typeof KEYS[0]) => {
    noteOff(k.note);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <main
      style={{ background: "#1a1a2e", minHeight: "100vh", fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
      className="text-white"
    >
      {/* Header */}
      <div
        className="text-center py-6 px-4"
        style={{
          background: "linear-gradient(180deg, rgba(6,182,212,0.08) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #06b6d4, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SYNTH-01
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-xs mt-1 tracking-widest uppercase"
        >
          Web Audio Synthesizer
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">

        {/* Oscilloscope + VU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <div
            className="flex-1 rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(6,182,212,0.2)", boxShadow: "0 0 20px rgba(6,182,212,0.05)" }}
          >
            <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: "rgba(6,182,212,0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-500">Osciloscópio</span>
            </div>
            <canvas
              ref={oscCanvasRef}
              width={800}
              height={120}
              className="w-full block"
              style={{ background: "#0d0d1a" }}
            />
          </div>
          <div
            className="rounded-xl overflow-hidden sm:w-48"
            style={{ border: "1px solid rgba(236,72,153,0.2)", boxShadow: "0 0 20px rgba(236,72,153,0.05)" }}
          >
            <div className="px-3 py-1.5 flex items-center gap-2" style={{ background: "rgba(236,72,153,0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-pink-500">VU Meter</span>
            </div>
            <canvas
              ref={vuCanvasRef}
              width={200}
              height={120}
              className="w-full block"
              style={{ background: "#0d0d1a" }}
            />
          </div>
        </motion.div>

        {/* Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <SectionCard title="Presets" accent="#ec4899">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PRESETS) as PresetName[]).map((name) => (
                <motion.button
                  key={name}
                  onClick={() => loadPreset(name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    background: activePreset === name ? "rgba(236,72,153,0.25)" : "rgba(236,72,153,0.07)",
                    border: `1px solid ${activePreset === name ? "#ec4899" : "rgba(236,72,153,0.25)"}`,
                    color: activePreset === name ? "#ec4899" : "#9ca3af",
                    boxShadow: activePreset === name ? "0 0 10px rgba(236,72,153,0.3)" : "none",
                  }}
                >
                  {name}
                </motion.button>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* Controls grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Waveform */}
          <SectionCard title="Forma de Onda">
            <div className="grid grid-cols-2 gap-2">
              {(["sine", "square", "sawtooth", "triangle"] as OscillatorType[]).map((wf) => {
                const active = params.waveform === wf;
                const labels: Record<OscillatorType, string> = {
                  sine: "Sine",
                  square: "Square",
                  sawtooth: "Sawtooth",
                  triangle: "Triangle",
                  custom: "Custom",
                };
                const icons = {
                  sine: <SineIcon active={active} />,
                  square: <SquareIcon active={active} />,
                  sawtooth: <SawtoothIcon active={active} />,
                  triangle: <TriangleIcon active={active} />,
                };
                return (
                  <motion.button
                    key={wf}
                    onClick={() => {
                      setParams((p) => ({ ...p, waveform: wf }));
                      setActivePreset(null);
                    }}
                    whileTap={{ scale: 0.93 }}
                    className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all"
                    style={{
                      background: active ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: active ? "0 0 8px rgba(6,182,212,0.3)" : "none",
                    }}
                  >
                    {icons[wf as keyof typeof icons]}
                    <span
                      className="text-[9px] uppercase tracking-wider"
                      style={{ color: active ? "#06b6d4" : "#6b7280" }}
                    >
                      {labels[wf]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </SectionCard>

          {/* ADSR */}
          <SectionCard title="ADSR Envelope">
            <NeonSlider
              label="Attack"
              value={params.adsr.attack}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, adsr: { ...p.adsr, attack: v } })); setActivePreset(null); }}
              displayValue={`${params.adsr.attack.toFixed(2)}s`}
            />
            <NeonSlider
              label="Decay"
              value={params.adsr.decay}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, adsr: { ...p.adsr, decay: v } })); setActivePreset(null); }}
              displayValue={`${params.adsr.decay.toFixed(2)}s`}
            />
            <NeonSlider
              label="Sustain"
              value={params.adsr.sustain}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, adsr: { ...p.adsr, sustain: v } })); setActivePreset(null); }}
            />
            <NeonSlider
              label="Release"
              value={params.adsr.release}
              min={0}
              max={2}
              onChange={(v) => { setParams((p) => ({ ...p, adsr: { ...p.adsr, release: v } })); setActivePreset(null); }}
              displayValue={`${params.adsr.release.toFixed(2)}s`}
            />
          </SectionCard>

          {/* Filter */}
          <SectionCard title="Filtro LP" accent="#a78bfa">
            <NeonSlider
              label="Cutoff"
              value={params.filter.cutoff}
              min={100}
              max={10000}
              step={10}
              onChange={(v) => { setParams((p) => ({ ...p, filter: { ...p.filter, cutoff: v } })); setActivePreset(null); }}
              displayValue={`${Math.round(params.filter.cutoff)}Hz`}
              color="#a78bfa"
            />
            <NeonSlider
              label="Resonance"
              value={params.filter.resonance}
              min={0}
              max={20}
              step={0.1}
              onChange={(v) => { setParams((p) => ({ ...p, filter: { ...p.filter, resonance: v } })); setActivePreset(null); }}
              displayValue={params.filter.resonance.toFixed(1)}
              color="#a78bfa"
            />
            <NeonSlider
              label="Volume"
              value={params.volume}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, volume: v })); setActivePreset(null); }}
              color="#a78bfa"
            />
          </SectionCard>

          {/* Effects */}
          <SectionCard title="Efeitos" accent="#f59e0b">
            <NeonSlider
              label="Reverb Mix"
              value={params.reverbMix}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, reverbMix: v })); setActivePreset(null); }}
              color="#f59e0b"
            />
            <NeonSlider
              label="Delay Time"
              value={params.delay.time}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => { setParams((p) => ({ ...p, delay: { ...p.delay, time: v } })); setActivePreset(null); }}
              displayValue={`${params.delay.time.toFixed(2)}s`}
              color="#f59e0b"
            />
            <NeonSlider
              label="Delay Feedback"
              value={params.delay.feedback}
              min={0}
              max={0.95}
              onChange={(v) => { setParams((p) => ({ ...p, delay: { ...p.delay, feedback: v } })); setActivePreset(null); }}
              color="#f59e0b"
            />
            <NeonSlider
              label="Distortion"
              value={params.distortion}
              min={0}
              max={1}
              onChange={(v) => { setParams((p) => ({ ...p, distortion: v })); setActivePreset(null); }}
              color="#f59e0b"
            />
          </SectionCard>
        </motion.div>

        {/* Keyboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionCard title="Teclado — 3 Oitavas (C3–B5)" accent="#06b6d4">
            <div
              className="relative overflow-x-auto"
              style={{ overflowY: "visible" }}
            >
              <div
                className="relative mx-auto"
                style={{
                  height: "140px",
                  minWidth: "600px",
                  width: "100%",
                }}
              >
                {/* White keys */}
                {whiteKeys.map((k, wi) => {
                  const pressed = pressedNotes.has(k.note);
                  return (
                    <motion.div
                      key={k.note}
                      onMouseDown={(e) => { e.preventDefault(); handleKeyPress(k); }}
                      onMouseUp={() => handleKeyRelease(k)}
                      onMouseLeave={() => { if (pressedNotes.has(k.note)) handleKeyRelease(k); }}
                      onTouchStart={(e) => { e.preventDefault(); handleKeyPress(k); }}
                      onTouchEnd={(e) => { e.preventDefault(); handleKeyRelease(k); }}
                      animate={{
                        background: pressed
                          ? "linear-gradient(180deg, #06b6d4 0%, #0284c7 100%)"
                          : "linear-gradient(180deg, #e8e8f0 0%, #c8c8d8 100%)",
                        boxShadow: pressed
                          ? "0 0 15px rgba(6,182,212,0.8), inset 0 2px 4px rgba(0,0,0,0.3)"
                          : "2px 4px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                      transition={{ duration: 0.05 }}
                      style={{
                        position: "absolute",
                        left: `${wi * keyWidth}%`,
                        width: `calc(${keyWidth}% - 1px)`,
                        top: 0,
                        height: "100%",
                        borderRadius: "0 0 6px 6px",
                        cursor: "pointer",
                        userSelect: "none",
                        border: "1px solid rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingBottom: "8px",
                        zIndex: 1,
                      }}
                    >
                      {k.semitone === 0 && (
                        <span
                          className="text-[8px] font-bold select-none"
                          style={{ color: pressed ? "white" : "#666" }}
                        >
                          {k.note}
                        </span>
                      )}
                    </motion.div>
                  );
                })}

                {/* Black keys */}
                {blackKeyInfos.map(({ key: k, leftPct }) => {
                  const pressed = pressedNotes.has(k.note);
                  return (
                    <motion.div
                      key={k.note}
                      onMouseDown={(e) => { e.preventDefault(); handleKeyPress(k); }}
                      onMouseUp={() => handleKeyRelease(k)}
                      onMouseLeave={() => { if (pressedNotes.has(k.note)) handleKeyRelease(k); }}
                      onTouchStart={(e) => { e.preventDefault(); handleKeyPress(k); }}
                      onTouchEnd={(e) => { e.preventDefault(); handleKeyRelease(k); }}
                      animate={{
                        background: pressed
                          ? "linear-gradient(180deg, #ec4899 0%, #be185d 100%)"
                          : "linear-gradient(180deg, #1a1a2e 0%, #0a0a1e 100%)",
                        boxShadow: pressed
                          ? "0 0 15px rgba(236,72,153,0.9)"
                          : "2px 4px 8px rgba(0,0,0,0.8)",
                      }}
                      transition={{ duration: 0.05 }}
                      style={{
                        position: "absolute",
                        left: `${leftPct}%`,
                        width: `calc(${keyWidth * 0.65}%)`,
                        top: 0,
                        height: "62%",
                        borderRadius: "0 0 4px 4px",
                        cursor: "pointer",
                        userSelect: "none",
                        border: `1px solid ${pressed ? "#ec4899" : "rgba(6,182,212,0.2)"}`,
                        zIndex: 2,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Keyboard shortcut hints */}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest text-gray-600">Oitava 3:</span>
                <div className="flex gap-1">
                  {["Z","X","C","V","B","N","M"].map((k) => (
                    <kbd key={k} className="text-[9px] px-1 rounded" style={{ background: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>{k}</kbd>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest text-gray-600">Oitava 4:</span>
                <div className="flex gap-1">
                  {["A","S","D","F","G","H","J"].map((k) => (
                    <kbd key={k} className="text-[9px] px-1 rounded" style={{ background: "rgba(236,72,153,0.1)", color: "#ec4899", border: "1px solid rgba(236,72,153,0.2)" }}>{k}</kbd>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest text-gray-600">Oitava 5:</span>
                <div className="flex gap-1">
                  {["Q","W","E","R","T","Y","U"].map((k) => (
                    <kbd key={k} className="text-[9px] px-1 rounded" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>{k}</kbd>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: audioReady ? "#06b6d4" : "#374151",
                boxShadow: audioReady ? "0 0 8px #06b6d4" : "none",
              }}
            />
            <span className="text-[10px] uppercase tracking-widest text-gray-500">
              {audioReady ? "Audio Engine Ativo" : "Clique ou toque uma tecla para iniciar"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Waveform</span>
              <span className="text-[10px] font-bold uppercase" style={{ color: "#06b6d4" }}>{params.waveform}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Vozes</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={pressedNotes.size}
                  initial={{ scale: 1.4, color: "#ec4899" }}
                  animate={{ scale: 1, color: "#06b6d4" }}
                  className="text-[10px] font-bold"
                >
                  {pressedNotes.size}
                </motion.span>
              </AnimatePresence>
            </div>
            {activePreset && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">Preset</span>
                <span className="text-[10px] font-bold" style={{ color: "#ec4899" }}>{activePreset}</span>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Subtle scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)",
        }}
      />

      <style jsx global>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </main>
  );
}
