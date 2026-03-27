"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DrumRow {
  name: string;
  color: string;
  steps: boolean[];
  volume: number;
}

type PresetName = "Rock" | "Funk" | "Hip-Hop" | "Bossa Nova";

// ─── Constants ────────────────────────────────────────────────────────────────

const NUM_STEPS = 16;
const NUM_ROWS = 8;

const ROW_DEFS: { name: string; color: string }[] = [
  { name: "Kick",    color: "#ff6b6b" },
  { name: "Snare",   color: "#ffd93d" },
  { name: "Hi-Hat ×", color: "#6bcb77" },
  { name: "Hi-Hat ○", color: "#4d96ff" },
  { name: "Clap",    color: "#ff922b" },
  { name: "Tom Hi",  color: "#cc5de8" },
  { name: "Tom Lo",  color: "#f06595" },
  { name: "Rim",     color: "#74c0fc" },
];

const PRESETS: Record<PresetName, boolean[][]> = {
  Rock: [
    [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], // Kick
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], // Snare
    [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0], // HH closed
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1], // HH open
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // Clap
    [0,0,0,0, 0,0,1,0, 0,0,0,0, 0,0,0,0], // Tom Hi
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 1,0,0,0], // Tom Lo
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // Rim
  ].map(r => r.map(Boolean)),
  Funk: [
    [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,0,0], // Kick
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,1], // Snare
    [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1], // HH closed
    [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0], // HH open
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], // Clap
    [0,0,1,0, 0,0,0,0, 0,0,1,0, 0,0,0,0], // Tom Hi
    [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], // Tom Lo
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // Rim
  ].map(r => r.map(Boolean)),
  "Hip-Hop": [
    [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,1,0], // Kick
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0], // Snare
    [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0], // HH closed
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1], // HH open
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,0,0], // Clap
    [0,0,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0], // Tom Hi
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // Tom Lo
    [0,1,0,0, 0,0,0,0, 0,1,0,0, 0,0,0,0], // Rim
  ].map(r => r.map(Boolean)),
  "Bossa Nova": [
    [1,0,0,0, 0,0,1,0, 0,0,0,0, 1,0,0,0], // Kick
    [0,0,0,1, 0,0,0,0, 0,1,0,0, 0,0,0,0], // Snare
    [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0], // HH closed
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], // HH open
    [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0], // Clap
    [0,1,0,0, 0,0,0,1, 0,1,0,0, 0,0,0,0], // Tom Hi
    [0,0,0,0, 1,0,0,0, 0,0,0,0, 0,0,1,0], // Tom Lo
    [1,0,0,1, 0,0,0,0, 1,0,0,0, 0,1,0,0], // Rim
  ].map(r => r.map(Boolean)),
};

// ─── Web Audio synthesis ──────────────────────────────────────────────────────

function playKick(ctx: AudioContext, time: number, vol: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
  osc.start(time);
  osc.stop(time + 0.5);
}

function playSnare(ctx: AudioContext, time: number, vol: number) {
  // Noise component
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1000;
  const noiseGain = ctx.createGain();
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseGain.gain.setValueAtTime(vol * 0.7, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
  noise.start(time);
  noise.stop(time + 0.2);
  // Tone component
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.frequency.setValueAtTime(180, time);
  oscGain.gain.setValueAtTime(vol * 0.3, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
  osc.start(time);
  osc.stop(time + 0.1);
}

function playHiHatClosed(ctx: AudioContext, time: number, vol: number) {
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 8000;
  const gain = ctx.createGain();
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(vol * 0.6, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  noise.start(time);
  noise.stop(time + 0.06);
}

function playHiHatOpen(ctx: AudioContext, time: number, vol: number) {
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 7000;
  const gain = ctx.createGain();
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(vol * 0.5, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);
  noise.start(time);
  noise.stop(time + 0.4);
}

function playClap(ctx: AudioContext, time: number, vol: number) {
  const offsets = [0, 0.008, 0.016];
  offsets.forEach(offset => {
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(vol * 0.8, time + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, time + offset + 0.1);
    noise.start(time + offset);
    noise.stop(time + offset + 0.12);
  });
}

function playTomHigh(ctx: AudioContext, time: number, vol: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(300, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.35);
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
  osc.start(time);
  osc.stop(time + 0.35);
}

function playTomLow(ctx: AudioContext, time: number, vol: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(120, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.4);
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  osc.start(time);
  osc.stop(time + 0.4);
}

function playRim(ctx: AudioContext, time: number, vol: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1600, time);
  osc.frequency.exponentialRampToValueAtTime(800, time + 0.03);
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
  osc.start(time);
  osc.stop(time + 0.04);
}

const SOUND_FNS = [
  playKick, playSnare, playHiHatClosed, playHiHatOpen,
  playClap, playTomHigh, playTomLow, playRim,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyGrid(): boolean[][] {
  return Array.from({ length: NUM_ROWS }, () => Array(NUM_STEPS).fill(false));
}

function defaultRows(): DrumRow[] {
  return ROW_DEFS.map(def => ({
    name: def.name,
    color: def.color,
    steps: Array(NUM_STEPS).fill(false),
    volume: 0.8,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DrumMachine() {
  const [rows, setRows] = useState<DrumRow[]>(defaultRows);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const [swing, setSwing] = useState(0);
  const [activePreset, setActivePreset] = useState<PresetName | null>(null);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [exportMsg, setExportMsg] = useState("");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stepRef = useRef(0);
  const schedulerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const rowsRef = useRef(rows);
  const bpmRef = useRef(bpm);
  const swingRef = useRef(swing);
  const isPlayingRef = useRef(isPlaying);

  // Keep refs in sync
  useEffect(() => { rowsRef.current = rows; }, [rows]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { swingRef.current = swing; }, [swing]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const scheduleNote = useCallback((step: number, time: number) => {
    const ctx = getAudioCtx();
    rowsRef.current.forEach((row, rowIdx) => {
      if (row.steps[step]) {
        SOUND_FNS[rowIdx](ctx, time, row.volume);
      }
    });
  }, [getAudioCtx]);

  const scheduler = useCallback(() => {
    const ctx = getAudioCtx();
    const secondsPerBeat = 60.0 / bpmRef.current;
    const secondsPerStep = secondsPerBeat / 4;
    const lookAhead = 0.1;

    while (nextNoteTimeRef.current < ctx.currentTime + lookAhead) {
      const step = stepRef.current;
      // Swing: odd steps are delayed
      const swingOffset = step % 2 === 1
        ? (swingRef.current / 100) * (secondsPerStep * 0.67)
        : 0;
      scheduleNote(step, nextNoteTimeRef.current + swingOffset);
      setCurrentStep(step);
      stepRef.current = (step + 1) % NUM_STEPS;
      nextNoteTimeRef.current += secondsPerStep;
    }

    schedulerRef.current = window.setTimeout(scheduler, 25);
  }, [getAudioCtx, scheduleNote]);

  const startPlayback = useCallback(() => {
    const ctx = getAudioCtx();
    stepRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    schedulerRef.current = window.setTimeout(scheduler, 0);
  }, [getAudioCtx, scheduler]);

  const stopPlayback = useCallback(() => {
    if (schedulerRef.current !== null) {
      clearTimeout(schedulerRef.current);
      schedulerRef.current = null;
    }
    setCurrentStep(-1);
  }, []);

  const handlePlayStop = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
      setIsPlaying(false);
    } else {
      startPlayback();
      setIsPlaying(true);
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlayback();
      audioCtxRef.current?.close();
    };
  }, [stopPlayback]);

  const toggleStep = (rowIdx: number, stepIdx: number) => {
    setRows(prev => prev.map((row, ri) => {
      if (ri !== rowIdx) return row;
      const newSteps = [...row.steps];
      newSteps[stepIdx] = !newSteps[stepIdx];
      return { ...row, steps: newSteps };
    }));
  };

  const setRowVolume = (rowIdx: number, vol: number) => {
    setRows(prev => prev.map((row, ri) =>
      ri === rowIdx ? { ...row, volume: vol } : row
    ));
  };

  const loadPreset = (name: PresetName) => {
    const pattern = PRESETS[name];
    setRows(prev => prev.map((row, ri) => ({
      ...row,
      steps: pattern[ri],
    })));
    setActivePreset(name);
  };

  const clearAll = () => {
    setRows(prev => prev.map(row => ({ ...row, steps: Array(NUM_STEPS).fill(false) })));
    setActivePreset(null);
  };

  const handleTapTempo = () => {
    const now = Date.now();
    const newTaps = [...tapTimes, now].filter(t => now - t < 3000).slice(-6);
    setTapTimes(newTaps);
    if (newTaps.length >= 2) {
      const intervals = newTaps.slice(1).map((t, i) => t - newTaps[i]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avg);
      setBpm(Math.min(200, Math.max(60, newBpm)));
    }
  };

  const exportPattern = () => {
    const data = {
      bpm,
      swing,
      rows: rows.map(r => ({ name: r.name, volume: r.volume, steps: r.steps })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drum-pattern.json";
    a.click();
    URL.revokeObjectURL(url);
    setExportMsg("Pattern exported!");
    setTimeout(() => setExportMsg(""), 2000);
  };

  // Preview a single sound on row label click
  const previewSound = (rowIdx: number) => {
    const ctx = getAudioCtx();
    SOUND_FNS[rowIdx](ctx, ctx.currentTime, rows[rowIdx].volume);
  };

  return (
    <div className="drum-machine-root">
      {/* ── Header ── */}
      <div className="dm-header">
        <div className="dm-title-block">
          <div className="dm-led" style={{ background: isPlaying ? "#6bcb77" : "#444" }} />
          <h1 className="dm-title">DRUM MACHINE</h1>
          <span className="dm-sub">Descomplicai</span>
        </div>

        {/* Transport */}
        <div className="dm-transport">
          <motion.button
            className={`dm-btn dm-play ${isPlaying ? "dm-btn-stop" : "dm-btn-play"}`}
            onClick={handlePlayStop}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
          >
            {isPlaying ? "■ STOP" : "▶ PLAY"}
          </motion.button>

          <motion.button
            className="dm-btn dm-btn-clear"
            onClick={clearAll}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
          >
            CLR
          </motion.button>
        </div>

        {/* BPM + Swing + Tap */}
        <div className="dm-controls">
          <label className="dm-control-group">
            <span className="dm-label">BPM <strong>{bpm}</strong></span>
            <input
              type="range" min={60} max={200} value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="dm-slider dm-slider-bpm"
            />
          </label>
          <label className="dm-control-group">
            <span className="dm-label">SWING <strong>{swing}%</strong></span>
            <input
              type="range" min={0} max={100} value={swing}
              onChange={e => setSwing(Number(e.target.value))}
              className="dm-slider dm-slider-swing"
            />
          </label>
          <motion.button
            className="dm-btn dm-btn-tap"
            onClick={handleTapTempo}
            whileTap={{ scale: 0.88 }}
          >
            TAP
          </motion.button>
        </div>
      </div>

      {/* ── Presets ── */}
      <div className="dm-presets">
        <span className="dm-label">PRESETS:</span>
        {(Object.keys(PRESETS) as PresetName[]).map(name => (
          <motion.button
            key={name}
            className={`dm-btn dm-btn-preset ${activePreset === name ? "dm-btn-preset-active" : ""}`}
            onClick={() => loadPreset(name)}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
          >
            {name}
          </motion.button>
        ))}
        <motion.button
          className="dm-btn dm-btn-export"
          onClick={exportPattern}
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.04 }}
        >
          EXPORT JSON
        </motion.button>
        <AnimatePresence>
          {exportMsg && (
            <motion.span
              key="exportmsg"
              className="dm-export-msg"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {exportMsg}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Step number ruler ── */}
      <div className="dm-grid-wrap">
        <div className="dm-step-ruler">
          <div className="dm-row-meta" />
          <div className="dm-steps-row">
            {Array.from({ length: NUM_STEPS }, (_, i) => (
              <div
                key={i}
                className={`dm-step-num ${currentStep === i ? "dm-step-num-active" : ""}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="dm-vol-label">VOL</div>
        </div>

        {/* ── Grid rows ── */}
        {rows.map((row, ri) => (
          <div key={ri} className="dm-row">
            {/* Row label */}
            <motion.button
              className="dm-row-meta dm-row-label"
              style={{ color: row.color }}
              onClick={() => previewSound(ri)}
              title={`Preview ${row.name}`}
              whileTap={{ scale: 0.95 }}
            >
              {row.name}
            </motion.button>

            {/* Steps */}
            <div className="dm-steps-row">
              {row.steps.map((active, si) => {
                const isCurrentCol = currentStep === si;
                const isGroup4Start = si % 4 === 0;
                return (
                  <motion.button
                    key={si}
                    className={[
                      "dm-step",
                      active ? "dm-step-on" : "dm-step-off",
                      isCurrentCol ? "dm-step-cursor" : "",
                      isGroup4Start ? "dm-step-group-start" : "",
                    ].join(" ")}
                    style={active ? {
                      background: row.color,
                      boxShadow: `0 0 8px ${row.color}, 0 0 16px ${row.color}66`,
                    } : isCurrentCol ? {
                      background: "#ffffff18",
                      borderColor: "#ffffff44",
                    } : {}}
                    onClick={() => toggleStep(ri, si)}
                    whileTap={{ scale: 0.85 }}
                    animate={active && isCurrentCol && isPlaying ? {
                      scale: [1, 1.15, 1],
                      transition: { duration: 0.1 }
                    } : {}}
                  />
                );
              })}
            </div>

            {/* Volume */}
            <div className="dm-vol-wrap">
              <input
                type="range" min={0} max={1} step={0.01}
                value={row.volume}
                onChange={e => setRowVolume(ri, Number(e.target.value))}
                className="dm-vol-slider"
                style={{ accentColor: row.color }}
                title={`Volume ${row.name}`}
              />
            </div>
          </div>
        ))}

        {/* ── Beat group labels ── */}
        <div className="dm-beat-labels">
          <div className="dm-row-meta" />
          <div className="dm-steps-row">
            {[1, 2, 3, 4].map(beat => (
              <div key={beat} className="dm-beat-label" style={{ width: `calc(4 * (var(--step-size) + 4px))` }}>
                {beat}
              </div>
            ))}
          </div>
          <div className="dm-vol-label" />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="dm-footer">
        <span>Web Audio API · 16-step sequencer · 8 sintetizadores</span>
      </div>

      {/* ── Styles ── */}
      <style>{`
        :root {
          --bg: #1a1a2e;
          --bg2: #16213e;
          --bg3: #0f3460;
          --neon-grid: #ffffff0a;
          --neon-border: #ffffff18;
          --step-size: 36px;
          --row-label-w: 80px;
          --vol-w: 72px;
        }

        .drum-machine-root {
          min-height: 100vh;
          background: var(--bg);
          background-image:
            linear-gradient(var(--neon-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-grid) 1px, transparent 1px);
          background-size: 40px 40px;
          color: #e0e0e0;
          font-family: 'Courier New', Courier, monospace;
          padding: 24px 16px 48px;
          box-sizing: border-box;
          user-select: none;
        }

        /* Header */
        .dm-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px 24px;
          margin-bottom: 16px;
          background: var(--bg2);
          border: 1px solid var(--neon-border);
          border-radius: 12px;
          padding: 14px 20px;
        }

        .dm-title-block {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dm-led {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .dm-title {
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          color: #fff;
          margin: 0;
          text-shadow: 0 0 12px #4d96ff88;
        }

        .dm-sub {
          font-size: 0.65rem;
          color: #666;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .dm-transport {
          display: flex;
          gap: 8px;
        }

        .dm-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 20px;
          flex: 1;
        }

        .dm-control-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: default;
        }

        .dm-label {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #888;
          text-transform: uppercase;
        }

        .dm-label strong {
          color: #ddd;
          font-weight: 700;
        }

        .dm-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          background: #333;
          outline: none;
          cursor: pointer;
        }

        .dm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #4d96ff;
          box-shadow: 0 0 6px #4d96ff;
          cursor: pointer;
        }

        .dm-slider-bpm { width: 120px; }
        .dm-slider-swing { width: 100px; }

        /* Buttons */
        .dm-btn {
          padding: 8px 14px;
          border: 1px solid var(--neon-border);
          border-radius: 6px;
          background: var(--bg3);
          color: #ddd;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }

        .dm-btn:hover {
          border-color: #4d96ff66;
          box-shadow: 0 0 8px #4d96ff33;
        }

        .dm-btn-play {
          background: #0d4f1c;
          border-color: #6bcb77;
          color: #6bcb77;
          box-shadow: 0 0 8px #6bcb7733;
          min-width: 90px;
        }

        .dm-btn-stop {
          background: #4f0d0d;
          border-color: #ff6b6b;
          color: #ff6b6b;
          box-shadow: 0 0 8px #ff6b6b33;
          min-width: 90px;
        }

        .dm-btn-clear {
          border-color: #ff922b66;
          color: #ff922b;
        }

        .dm-btn-tap {
          border-color: #ffd93d66;
          color: #ffd93d;
          padding: 8px 16px;
        }

        .dm-btn-preset {
          font-size: 0.68rem;
        }

        .dm-btn-preset-active {
          border-color: #cc5de8;
          color: #cc5de8;
          background: #2a0a40;
          box-shadow: 0 0 8px #cc5de833;
        }

        .dm-btn-export {
          border-color: #74c0fc66;
          color: #74c0fc;
          font-size: 0.68rem;
          margin-left: 8px;
        }

        .dm-export-msg {
          font-size: 0.68rem;
          color: #6bcb77;
          align-self: center;
        }

        /* Presets bar */
        .dm-presets {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 0 4px;
        }

        /* Grid */
        .dm-grid-wrap {
          overflow-x: auto;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .dm-step-ruler,
        .dm-row,
        .dm-beat-labels {
          display: flex;
          align-items: center;
          gap: 0;
          min-width: max-content;
        }

        .dm-step-ruler {
          margin-bottom: 6px;
        }

        .dm-row {
          margin-bottom: 5px;
        }

        .dm-row-meta {
          width: var(--row-label-w);
          flex-shrink: 0;
        }

        .dm-row-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: right;
          padding-right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .dm-row-label:hover {
          opacity: 0.75;
        }

        .dm-steps-row {
          display: flex;
          gap: 4px;
        }

        /* Step button */
        .dm-step {
          width: var(--step-size);
          height: var(--step-size);
          border-radius: 4px;
          border: 1px solid var(--neon-border);
          background: #ffffff06;
          cursor: pointer;
          padding: 0;
          transition: background 0.08s, box-shadow 0.08s, border-color 0.08s;
          flex-shrink: 0;
        }

        .dm-step-off:hover {
          background: #ffffff14;
          border-color: #ffffff33;
        }

        .dm-step-group-start {
          margin-left: 6px;
        }

        .dm-step-num {
          width: var(--step-size);
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          color: #444;
          flex-shrink: 0;
          transition: color 0.1s;
        }

        .dm-step-num:nth-child(4n+1) {
          color: #666;
        }

        .dm-step-num-active {
          color: #fff !important;
        }

        .dm-step-group-start {
          margin-left: 6px;
        }

        /* Fix: apply group-start margin to step-num too */
        .dm-steps-row > .dm-step-num:nth-child(4n+1),
        .dm-steps-row > .dm-step:nth-child(4n+1) {
          margin-left: 6px;
        }

        .dm-steps-row > .dm-step-num:first-child,
        .dm-steps-row > .dm-step:first-child {
          margin-left: 0;
        }

        /* Vol column */
        .dm-vol-wrap {
          width: var(--vol-w);
          padding-left: 10px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .dm-vol-label {
          width: var(--vol-w);
          padding-left: 10px;
          font-size: 0.6rem;
          color: #555;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        .dm-vol-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 60px;
          height: 3px;
          border-radius: 2px;
          background: #333;
          outline: none;
          cursor: pointer;
        }

        .dm-vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          cursor: pointer;
        }

        /* Beat labels */
        .dm-beat-labels {
          margin-top: 4px;
        }

        .dm-beat-label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          color: #444;
          letter-spacing: 0.1em;
          flex-shrink: 0;
          margin-left: 6px;
        }

        .dm-beat-label:first-child {
          margin-left: 0;
        }

        /* Footer */
        .dm-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 0.65rem;
          color: #333;
          letter-spacing: 0.08em;
        }

        /* Scrollbar */
        .dm-grid-wrap::-webkit-scrollbar {
          height: 6px;
        }
        .dm-grid-wrap::-webkit-scrollbar-track {
          background: var(--bg2);
          border-radius: 3px;
        }
        .dm-grid-wrap::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }

        /* Mobile */
        @media (max-width: 600px) {
          :root {
            --step-size: 28px;
            --row-label-w: 66px;
            --vol-w: 56px;
          }

          .dm-title { font-size: 1.1rem; }

          .dm-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .dm-controls {
            width: 100%;
          }

          .dm-slider-bpm { width: 100px; }
          .dm-slider-swing { width: 85px; }

          .dm-step { border-radius: 3px; }

          .dm-btn { padding: 6px 10px; font-size: 0.7rem; }

          .dm-presets { gap: 6px; }
        }
      `}</style>
    </div>
  );
}
