"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type TuningName = "Standard" | "Drop D" | "Open G" | "DADGAD" | "Half Step Down";

interface StringDef {
  name: string;
  freq: number;
}

interface Tuning {
  label: string;
  strings: StringDef[];
}

interface ChordDef {
  name: string;
  notes: string[];
  // frets: [string1..string6], -1 = muted, 0 = open, 1-5 = fret number
  frets: number[];
  // fingers: which finger on each string (0 = open/muted)
  fingers: number[];
  // barré: fret number (0 = none)
  barre: number;
  startFret: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TUNINGS: Record<TuningName, Tuning> = {
  Standard: {
    label: "Standard (EADGBe)",
    strings: [
      { name: "E2", freq: 82.41 },
      { name: "A2", freq: 110.0 },
      { name: "D3", freq: 146.83 },
      { name: "G3", freq: 196.0 },
      { name: "B3", freq: 246.94 },
      { name: "E4", freq: 329.63 },
    ],
  },
  "Drop D": {
    label: "Drop D (DADGBe)",
    strings: [
      { name: "D2", freq: 73.42 },
      { name: "A2", freq: 110.0 },
      { name: "D3", freq: 146.83 },
      { name: "G3", freq: 196.0 },
      { name: "B3", freq: 246.94 },
      { name: "E4", freq: 329.63 },
    ],
  },
  "Open G": {
    label: "Open G (DGDGBd)",
    strings: [
      { name: "D2", freq: 73.42 },
      { name: "G2", freq: 98.0 },
      { name: "D3", freq: 146.83 },
      { name: "G3", freq: 196.0 },
      { name: "B3", freq: 246.94 },
      { name: "D4", freq: 293.66 },
    ],
  },
  DADGAD: {
    label: "DADGAD",
    strings: [
      { name: "D2", freq: 73.42 },
      { name: "A2", freq: 110.0 },
      { name: "D3", freq: 146.83 },
      { name: "G3", freq: 196.0 },
      { name: "A3", freq: 220.0 },
      { name: "D4", freq: 293.66 },
    ],
  },
  "Half Step Down": {
    label: "Half Step Down (Eb Ab Db Gb Bb Eb)",
    strings: [
      { name: "Eb2", freq: 77.78 },
      { name: "Ab2", freq: 103.83 },
      { name: "Db3", freq: 138.59 },
      { name: "Gb3", freq: 185.0 },
      { name: "Bb3", freq: 233.08 },
      { name: "Eb4", freq: 311.13 },
    ],
  },
};

const STRING_THICKNESS = [4, 3.5, 3, 2.5, 2, 1.5]; // low E to high E (index 0=low)

// Chord library: frets array is [string6(highE), string5(B), string4(G), string3(D), string2(A), string1(lowE)]
// but we display strings as lowE at bottom → we'll reverse for display
// Convention here: index 0 = low E, index 5 = high E
const CHORDS: Record<string, ChordDef> = {
  // ── A ──
  "A-Maior": {
    name: "A Maior",
    notes: ["A", "C#", "E"],
    frets: [0, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    barre: 0,
    startFret: 1,
  },
  "A-Menor": {
    name: "A Menor",
    notes: ["A", "C", "E"],
    frets: [0, 0, 2, 2, 1, 0],
    fingers: [0, 0, 3, 2, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "A-7": {
    name: "A7",
    notes: ["A", "C#", "E", "G"],
    frets: [0, 0, 2, 0, 2, 0],
    fingers: [0, 0, 2, 0, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "A-m7": {
    name: "Am7",
    notes: ["A", "C", "E", "G"],
    frets: [0, 0, 2, 0, 1, 0],
    fingers: [0, 0, 2, 0, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "A-sus4": {
    name: "Asus4",
    notes: ["A", "D", "E"],
    frets: [0, 0, 2, 2, 3, 0],
    fingers: [0, 0, 1, 2, 4, 0],
    barre: 0,
    startFret: 1,
  },
  "A-add9": {
    name: "Aadd9",
    notes: ["A", "B", "C#", "E"],
    frets: [0, 0, 2, 4, 2, 0],
    fingers: [0, 0, 1, 3, 2, 0],
    barre: 0,
    startFret: 1,
  },
  // ── B ──
  "B-Maior": {
    name: "B Maior",
    notes: ["B", "D#", "F#"],
    frets: [-1, 2, 4, 4, 4, 2],
    fingers: [0, 1, 2, 3, 4, 1],
    barre: 2,
    startFret: 1,
  },
  "B-Menor": {
    name: "B Menor",
    notes: ["B", "D", "F#"],
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    barre: 2,
    startFret: 1,
  },
  "B-7": {
    name: "B7",
    notes: ["B", "D#", "F#", "A"],
    frets: [-1, 2, 1, 2, 0, 2],
    fingers: [0, 2, 1, 3, 0, 4],
    barre: 0,
    startFret: 1,
  },
  "B-m7": {
    name: "Bm7",
    notes: ["B", "D", "F#", "A"],
    frets: [-1, 2, 4, 2, 3, 2],
    fingers: [0, 1, 3, 1, 2, 1],
    barre: 2,
    startFret: 1,
  },
  "B-sus4": {
    name: "Bsus4",
    notes: ["B", "E", "F#"],
    frets: [-1, 2, 4, 4, 5, 2],
    fingers: [0, 1, 2, 3, 4, 1],
    barre: 2,
    startFret: 1,
  },
  "B-add9": {
    name: "Badd9",
    notes: ["B", "C#", "D#", "F#"],
    frets: [-1, 2, 4, 3, 4, 2],
    fingers: [0, 1, 3, 2, 4, 1],
    barre: 2,
    startFret: 1,
  },
  // ── C ──
  "C-Maior": {
    name: "C Maior",
    notes: ["C", "E", "G"],
    frets: [0, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "C-Menor": {
    name: "C Menor",
    notes: ["C", "Eb", "G"],
    frets: [-1, 3, 5, 5, 4, 3],
    fingers: [0, 1, 3, 4, 2, 1],
    barre: 3,
    startFret: 3,
  },
  "C-7": {
    name: "C7",
    notes: ["C", "E", "G", "Bb"],
    frets: [0, 3, 2, 3, 1, 0],
    fingers: [0, 3, 2, 4, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "C-m7": {
    name: "Cm7",
    notes: ["C", "Eb", "G", "Bb"],
    frets: [-1, 3, 5, 3, 4, 3],
    fingers: [0, 1, 3, 1, 2, 1],
    barre: 3,
    startFret: 3,
  },
  "C-sus4": {
    name: "Csus4",
    notes: ["C", "F", "G"],
    frets: [0, 3, 3, 0, 1, 0],
    fingers: [0, 3, 4, 0, 1, 0],
    barre: 0,
    startFret: 1,
  },
  "C-add9": {
    name: "Cadd9",
    notes: ["C", "D", "E", "G"],
    frets: [0, 3, 2, 0, 3, 0],
    fingers: [0, 3, 2, 0, 4, 0],
    barre: 0,
    startFret: 1,
  },
  // ── D ──
  "D-Maior": {
    name: "D Maior",
    notes: ["D", "F#", "A"],
    frets: [-1, 0, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    barre: 0,
    startFret: 1,
  },
  "D-Menor": {
    name: "D Menor",
    notes: ["D", "F", "A"],
    frets: [-1, 0, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
    barre: 0,
    startFret: 1,
  },
  "D-7": {
    name: "D7",
    notes: ["D", "F#", "A", "C"],
    frets: [-1, 0, 0, 2, 1, 2],
    fingers: [0, 0, 0, 3, 1, 2],
    barre: 0,
    startFret: 1,
  },
  "D-m7": {
    name: "Dm7",
    notes: ["D", "F", "A", "C"],
    frets: [-1, 0, 0, 2, 1, 1],
    fingers: [0, 0, 0, 3, 1, 1],
    barre: 0,
    startFret: 1,
  },
  "D-sus4": {
    name: "Dsus4",
    notes: ["D", "G", "A"],
    frets: [-1, 0, 0, 2, 3, 3],
    fingers: [0, 0, 0, 1, 3, 4],
    barre: 0,
    startFret: 1,
  },
  "D-add9": {
    name: "Dadd9",
    notes: ["D", "E", "F#", "A"],
    frets: [-1, 0, 0, 2, 3, 0],
    fingers: [0, 0, 0, 1, 3, 0],
    barre: 0,
    startFret: 1,
  },
  // ── E ──
  "E-Maior": {
    name: "E Maior",
    notes: ["E", "G#", "B"],
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 3, 2, 1, 0, 0],
    barre: 0,
    startFret: 1,
  },
  "E-Menor": {
    name: "E Menor",
    notes: ["E", "G", "B"],
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    barre: 0,
    startFret: 1,
  },
  "E-7": {
    name: "E7",
    notes: ["E", "G#", "B", "D"],
    frets: [0, 2, 0, 1, 0, 0],
    fingers: [0, 3, 0, 1, 0, 0],
    barre: 0,
    startFret: 1,
  },
  "E-m7": {
    name: "Em7",
    notes: ["E", "G", "B", "D"],
    frets: [0, 2, 0, 0, 0, 0],
    fingers: [0, 2, 0, 0, 0, 0],
    barre: 0,
    startFret: 1,
  },
  "E-sus4": {
    name: "Esus4",
    notes: ["E", "A", "B"],
    frets: [0, 2, 2, 2, 0, 0],
    fingers: [0, 2, 3, 4, 0, 0],
    barre: 0,
    startFret: 1,
  },
  "E-add9": {
    name: "Eadd9",
    notes: ["E", "F#", "G#", "B"],
    frets: [0, 2, 2, 1, 2, 0],
    fingers: [0, 3, 4, 1, 2, 0],
    barre: 0,
    startFret: 1,
  },
  // ── F ──
  "F-Maior": {
    name: "F Maior",
    notes: ["F", "A", "C"],
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: 1,
    startFret: 1,
  },
  "F-Menor": {
    name: "F Menor",
    notes: ["F", "Ab", "C"],
    frets: [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: 1,
    startFret: 1,
  },
  "F-7": {
    name: "F7",
    notes: ["F", "A", "C", "Eb"],
    frets: [1, 3, 1, 2, 1, 1],
    fingers: [1, 3, 1, 2, 1, 1],
    barre: 1,
    startFret: 1,
  },
  "F-m7": {
    name: "Fm7",
    notes: ["F", "Ab", "C", "Eb"],
    frets: [1, 3, 1, 1, 1, 1],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: 1,
    startFret: 1,
  },
  "F-sus4": {
    name: "Fsus4",
    notes: ["F", "Bb", "C"],
    frets: [1, 3, 3, 3, 1, 1],
    fingers: [1, 2, 3, 4, 1, 1],
    barre: 1,
    startFret: 1,
  },
  "F-add9": {
    name: "Fadd9",
    notes: ["F", "G", "A", "C"],
    frets: [1, 3, 3, 2, 3, 1],
    fingers: [1, 3, 4, 2, 4, 1],
    barre: 1,
    startFret: 1,
  },
  // ── G ──
  "G-Maior": {
    name: "G Maior",
    notes: ["G", "B", "D"],
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    barre: 0,
    startFret: 1,
  },
  "G-Menor": {
    name: "G Menor",
    notes: ["G", "Bb", "D"],
    frets: [3, 5, 5, 3, 3, 3],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: 3,
    startFret: 3,
  },
  "G-7": {
    name: "G7",
    notes: ["G", "B", "D", "F"],
    frets: [3, 2, 0, 0, 0, 1],
    fingers: [3, 2, 0, 0, 0, 1],
    barre: 0,
    startFret: 1,
  },
  "G-m7": {
    name: "Gm7",
    notes: ["G", "Bb", "D", "F"],
    frets: [3, 5, 3, 3, 3, 3],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: 3,
    startFret: 3,
  },
  "G-sus4": {
    name: "Gsus4",
    notes: ["G", "C", "D"],
    frets: [3, 3, 0, 0, 1, 3],
    fingers: [3, 4, 0, 0, 1, 2],
    barre: 0,
    startFret: 1,
  },
  "G-add9": {
    name: "Gadd9",
    notes: ["G", "A", "B", "D"],
    frets: [3, 2, 0, 0, 0, 0],
    fingers: [2, 1, 0, 0, 0, 0],
    barre: 0,
    startFret: 1,
  },
};

const ROOT_NOTES = ["A", "B", "C", "D", "E", "F", "G"];
const CHORD_TYPES = ["Maior", "Menor", "7", "m7", "sus4", "add9"];

// Chromatic scale for frequency calculation
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteToFreq(note: string, octave: number): number {
  const noteIdx = NOTES.indexOf(note.replace("b", "#").replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#").replace("Bb", "A#"));
  if (noteIdx === -1) return 0;
  const midiNote = (octave + 1) * 12 + noteIdx;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Chord note frequencies based on root note
const CHORD_NOTE_FREQS: Record<string, Record<string, number[]>> = {
  A: {
    Maior: [110, 138.59, 164.81],
    Menor: [110, 130.81, 164.81],
    "7": [110, 138.59, 164.81, 196.0],
    m7: [110, 130.81, 164.81, 196.0],
    sus4: [110, 146.83, 164.81],
    add9: [110, 123.47, 138.59, 164.81],
  },
  B: {
    Maior: [123.47, 155.56, 185.0],
    Menor: [123.47, 146.83, 185.0],
    "7": [123.47, 155.56, 185.0, 220.0],
    m7: [123.47, 146.83, 185.0, 220.0],
    sus4: [123.47, 164.81, 185.0],
    add9: [123.47, 138.59, 155.56, 185.0],
  },
  C: {
    Maior: [130.81, 164.81, 196.0],
    Menor: [130.81, 155.56, 196.0],
    "7": [130.81, 164.81, 196.0, 233.08],
    m7: [130.81, 155.56, 196.0, 233.08],
    sus4: [130.81, 174.61, 196.0],
    add9: [130.81, 146.83, 164.81, 196.0],
  },
  D: {
    Maior: [146.83, 185.0, 220.0],
    Menor: [146.83, 174.61, 220.0],
    "7": [146.83, 185.0, 220.0, 261.63],
    m7: [146.83, 174.61, 220.0, 261.63],
    sus4: [146.83, 196.0, 220.0],
    add9: [146.83, 164.81, 185.0, 220.0],
  },
  E: {
    Maior: [164.81, 207.65, 246.94],
    Menor: [164.81, 196.0, 246.94],
    "7": [164.81, 207.65, 246.94, 293.66],
    m7: [164.81, 196.0, 246.94, 293.66],
    sus4: [164.81, 220.0, 246.94],
    add9: [164.81, 185.0, 207.65, 246.94],
  },
  F: {
    Maior: [174.61, 220.0, 261.63],
    Menor: [174.61, 207.65, 261.63],
    "7": [174.61, 220.0, 261.63, 311.13],
    m7: [174.61, 207.65, 261.63, 311.13],
    sus4: [174.61, 233.08, 261.63],
    add9: [174.61, 196.0, 220.0, 261.63],
  },
  G: {
    Maior: [196.0, 246.94, 293.66],
    Menor: [196.0, 233.08, 293.66],
    "7": [196.0, 246.94, 293.66, 349.23],
    m7: [196.0, 233.08, 293.66, 349.23],
    sus4: [196.0, 261.63, 293.66],
    add9: [196.0, 220.0, 246.94, 293.66],
  },
};

// ─── Audio Engine ─────────────────────────────────────────────────────────────

function createAudioContext(): AudioContext {
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
}

function playTone(
  ctx: AudioContext,
  freq: number,
  volume: number,
  sustain: number,
  delay = 0
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

  const attackTime = 0.02;
  const releaseTime = 0.3 + sustain * 1.5;

  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(volume * 0.7, ctx.currentTime + delay + attackTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + attackTime + releaseTime
  );

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + attackTime + releaseTime + 0.05);
}

// ─── Tuner Meter SVG ──────────────────────────────────────────────────────────

function TunerMeter({
  cents,
  inTune,
}: {
  cents: number;
  inTune: boolean;
}) {
  // cents range: -50 to +50
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const angleRange = 90; // total sweep in degrees (±45°)
  const angle = (clampedCents / 50) * (angleRange / 2);

  const cx = 150;
  const cy = 140;
  const r = 110;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const startAngle = -135;
  const endAngle = -45;

  const arcX1 = cx + r * Math.cos(toRad(startAngle));
  const arcY1 = cy + r * Math.sin(toRad(startAngle));
  const arcX2 = cx + r * Math.cos(toRad(endAngle));
  const arcY2 = cy + r * Math.sin(toRad(endAngle));

  const needleAngle = -90 + angle;
  const needleLength = 90;
  const needleX = cx + needleLength * Math.cos(toRad(needleAngle));
  const needleY = cy + needleLength * Math.sin(toRad(needleAngle));

  const inTuneZoneStart = -90 - 4.5;
  const inTuneZoneEnd = -90 + 4.5;
  const izsX1 = cx + r * Math.cos(toRad(inTuneZoneStart));
  const izsY1 = cy + r * Math.sin(toRad(inTuneZoneStart));
  const izsX2 = cx + r * Math.cos(toRad(inTuneZoneEnd));
  const izsY2 = cy + r * Math.sin(toRad(inTuneZoneEnd));

  const needleColor = inTune ? "#4ade80" : Math.abs(clampedCents) > 20 ? "#f87171" : "#fbbf24";

  return (
    <svg
      viewBox="0 0 300 170"
      className="w-full max-w-xs mx-auto"
      aria-label="Medidor de afinação"
    >
      {/* Background arc */}
      <path
        d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 0 1 ${arcX2} ${arcY2}`}
        fill="none"
        stroke="#44403c"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Flat zone (left) */}
      <path
        d={`M ${cx + r * Math.cos(toRad(startAngle))} ${cy + r * Math.sin(toRad(startAngle))}
            A ${r} ${r} 0 0 1 ${cx + r * Math.cos(toRad(-112))} ${cy + r * Math.sin(toRad(-112))}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Sharp zone (right) */}
      <path
        d={`M ${cx + r * Math.cos(toRad(-68))} ${cy + r * Math.sin(toRad(-68))}
            A ${r} ${r} 0 0 1 ${cx + r * Math.cos(toRad(endAngle))} ${cy + r * Math.sin(toRad(endAngle))}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* In-tune zone (center green) */}
      <path
        d={`M ${izsX1} ${izsY1} A ${r} ${r} 0 0 1 ${izsX2} ${izsY2}`}
        fill="none"
        stroke="#4ade80"
        strokeWidth="14"
        strokeLinecap="round"
        opacity={inTune ? 1 : 0.4}
      />

      {/* Scale ticks */}
      {[-40, -20, 0, 20, 40].map((val) => {
        const tickAngle = -90 + (val / 50) * 45;
        const r1 = 98, r2 = 122;
        return (
          <line
            key={val}
            x1={cx + r1 * Math.cos(toRad(tickAngle))}
            y1={cy + r1 * Math.sin(toRad(tickAngle))}
            x2={cx + r2 * Math.cos(toRad(tickAngle))}
            y2={cy + r2 * Math.sin(toRad(tickAngle))}
            stroke={val === 0 ? "#4ade80" : "#78716c"}
            strokeWidth={val === 0 ? 2.5 : 1.5}
          />
        );
      })}

      {/* Labels */}
      <text x="28" y="148" fontSize="10" fill="#78716c" textAnchor="middle">♭</text>
      <text x="272" y="148" fontSize="10" fill="#78716c" textAnchor="middle">♯</text>

      {/* Needle */}
      <motion.line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke={needleColor}
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ x2: needleX, y2: needleY }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />

      {/* Pivot */}
      <circle cx={cx} cy={cy} r="6" fill={needleColor} />
      <circle cx={cx} cy={cy} r="3" fill="#1c1917" />

      {/* In-tune glow */}
      {inTune && (
        <circle
          cx={cx}
          cy={cy}
          r="10"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate attributeName="r" values="10;20;10" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

// ─── Fretboard Diagram ────────────────────────────────────────────────────────

function FretboardDiagram({
  chord,
  strumming,
}: {
  chord: ChordDef;
  strumming: boolean;
}) {
  const W = 220;
  const H = 200;
  const marginLeft = 36;
  const marginTop = 28;
  const marginBottom = 16;
  const fretCount = 5;
  const stringCount = 6;
  const colWidth = (W - marginLeft - 24) / (stringCount - 1);
  const rowHeight = (H - marginTop - marginBottom) / fretCount;

  // Display: string 0 (lowE) on left, string 5 (highE) on right
  // Fret 1 at top

  const dotColors = ["#f59e0b", "#fb923c", "#fbbf24", "#a78bfa"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[240px] mx-auto">
      {/* Nut */}
      <rect
        x={marginLeft}
        y={marginTop - 4}
        width={(stringCount - 1) * colWidth}
        height={chord.startFret === 1 ? 5 : 2}
        fill={chord.startFret === 1 ? "#d4a254" : "#44403c"}
        rx="1"
      />

      {/* Start fret label */}
      {chord.startFret > 1 && (
        <text
          x={marginLeft - 10}
          y={marginTop + rowHeight * 0.6}
          fontSize="10"
          fill="#a78bfa"
          textAnchor="middle"
        >
          {chord.startFret}fr
        </text>
      )}

      {/* Fret lines */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={i}
          x1={marginLeft}
          y1={marginTop + i * rowHeight}
          x2={marginLeft + (stringCount - 1) * colWidth}
          y2={marginTop + i * rowHeight}
          stroke="#44403c"
          strokeWidth={i === 0 ? 0 : 1}
        />
      ))}

      {/* String lines */}
      {Array.from({ length: stringCount }).map((_, i) => (
        <motion.line
          key={i}
          x1={marginLeft + i * colWidth}
          y1={marginTop}
          x2={marginLeft + i * colWidth}
          y2={marginTop + fretCount * rowHeight}
          stroke="#78716c"
          strokeWidth={STRING_THICKNESS[i] * 0.6}
          animate={
            strumming
              ? {
                  x1: [
                    marginLeft + i * colWidth,
                    marginLeft + i * colWidth + (i % 2 === 0 ? 3 : -3),
                    marginLeft + i * colWidth,
                  ],
                  x2: [
                    marginLeft + i * colWidth,
                    marginLeft + i * colWidth + (i % 2 === 0 ? 3 : -3),
                    marginLeft + i * colWidth,
                  ],
                }
              : {}
          }
          transition={
            strumming
              ? {
                  duration: 0.15,
                  delay: i * 0.04,
                  repeat: 2,
                  repeatType: "reverse",
                }
              : {}
          }
        />
      ))}

      {/* Open/Muted string indicators */}
      {chord.frets.map((fret, i) => {
        const x = marginLeft + i * colWidth;
        const y = marginTop - 14;
        if (fret === -1) {
          return (
            <text key={i} x={x} y={y} fontSize="12" fill="#f87171" textAnchor="middle" fontWeight="bold">
              ×
            </text>
          );
        } else if (fret === 0) {
          return (
            <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="#4ade80" strokeWidth="1.5" />
          );
        }
        return null;
      })}

      {/* Finger dots */}
      {chord.frets.map((fret, i) => {
        if (fret <= 0) return null;
        const displayFret = fret - chord.startFret + 1;
        if (displayFret < 1 || displayFret > fretCount) return null;

        const x = marginLeft + i * colWidth;
        const y = marginTop + (displayFret - 0.5) * rowHeight;
        const fingerIdx = (chord.fingers[i] - 1 + 4) % 4;
        const color = dotColors[fingerIdx] || "#f59e0b";

        return (
          <g key={i}>
            <circle cx={x} cy={y} r={rowHeight * 0.38} fill={color} opacity="0.9" />
            <text
              x={x}
              y={y + 4}
              fontSize="10"
              fill="#1c1917"
              textAnchor="middle"
              fontWeight="bold"
            >
              {chord.fingers[i] > 0 ? chord.fingers[i] : ""}
            </text>
          </g>
        );
      })}

      {/* Barré indicator */}
      {chord.barre > 0 && (() => {
        const displayFret = chord.barre - chord.startFret + 1;
        if (displayFret < 1 || displayFret > fretCount) return null;
        const y = marginTop + (displayFret - 0.5) * rowHeight;
        // Find leftmost and rightmost strings with this barre fret
        const barreFrets = chord.frets
          .map((f, i) => ({ f, i }))
          .filter(({ f }) => f === chord.barre);
        if (barreFrets.length < 2) return null;
        const leftX = marginLeft + barreFrets[0].i * colWidth;
        const rightX = marginLeft + barreFrets[barreFrets.length - 1].i * colWidth;
        return (
          <rect
            key="barre"
            x={leftX - 8}
            y={y - rowHeight * 0.38}
            width={rightX - leftX + 16}
            height={rowHeight * 0.76}
            rx={rowHeight * 0.38}
            fill="#f59e0b"
            opacity="0.75"
          />
        );
      })()}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GuitarTunerPage() {
  const [activeTab, setActiveTab] = useState<"tuner" | "chords">("tuner");
  const [volume, setVolume] = useState(0.7);
  const [sustain, setSustain] = useState(0.5);
  const [selectedTuning, setSelectedTuning] = useState<TuningName>("Standard");
  const [activeString, setActiveString] = useState<number | null>(null);
  const [cents, setCents] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const [selectedRoot, setSelectedRoot] = useState("E");
  const [selectedType, setSelectedType] = useState("Maior");
  const [strumming, setStrumming] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTuning = TUNINGS[selectedTuning];
  const chordKey = `${selectedRoot}-${selectedType}`;
  const currentChord = CHORDS[chordKey];

  // Simulated tuner: when a string is played, animate cents needle
  const simulateTuner = useCallback((stringIndex: number) => {
    setActiveString(stringIndex);
    setCents(0);

    // Animate needle approaching zero (simulate finding in-tune)
    let startCents = (Math.random() - 0.5) * 40;
    const step = () => {
      startCents *= 0.85;
      setCents(Math.round(startCents * 10) / 10);
      if (Math.abs(startCents) > 0.5) {
        setTimeout(step, 80);
      } else {
        setCents(0);
      }
    };
    setTimeout(step, 300);
  }, []);

  const playString = useCallback(
    (index: number) => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = createAudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const freq = currentTuning.strings[index].freq;
      playTone(ctx, freq, volume, sustain);
      simulateTuner(index);
    },
    [currentTuning, volume, sustain, simulateTuner]
  );

  // Auto mode
  useEffect(() => {
    if (!autoMode) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      return;
    }
    playString(autoIndex);
    autoTimerRef.current = setInterval(() => {
      setAutoIndex((prev) => {
        const next = (prev + 1) % 6;
        playString(next);
        return next;
      });
    }, 3000);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMode]);

  const playChord = useCallback(() => {
    if (!currentChord) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const freqs = CHORD_NOTE_FREQS[selectedRoot]?.[selectedType] ?? [];
    freqs.forEach((freq, i) => {
      playTone(ctx, freq, volume * 0.6, sustain, i * 0.04);
    });

    setStrumming(true);
    setTimeout(() => setStrumming(false), 800);
  }, [currentChord, selectedRoot, selectedType, volume, sustain]);

  const inTune = Math.abs(cents) <= 5;

  const tuningOptions = Object.entries(TUNINGS) as [TuningName, Tuning][];

  return (
    <div
      className="min-h-screen"
      style={{ background: "#1c1917", color: "#e7e5e4", fontFamily: "system-ui, sans-serif" }}
    >
      {/* Header */}
      <header
        className="text-center py-8 px-4"
        style={{ borderBottom: "1px solid #44403c" }}
      >
        <h1
          className="text-3xl font-bold tracking-tight mb-1"
          style={{ color: "#fbbf24", letterSpacing: "-0.02em" }}
        >
          Afinador de Guitarra
        </h1>
        <p style={{ color: "#a8a29e", fontSize: "0.9rem" }}>
          Biblioteca de acordes com Web Audio API
        </p>
      </header>

      {/* Global Controls */}
      <div
        className="flex flex-wrap gap-6 justify-center items-center px-6 py-4"
        style={{ borderBottom: "1px solid #2d2926" }}
      >
        <div className="flex items-center gap-3">
          <label style={{ color: "#a8a29e", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-28"
            style={{ accentColor: "#f59e0b" }}
          />
          <span style={{ color: "#78716c", fontSize: "0.8rem", minWidth: "2rem" }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label style={{ color: "#a8a29e", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Sustain
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={(e) => setSustain(parseFloat(e.target.value))}
            className="w-28"
            style={{ accentColor: "#f59e0b" }}
          />
          <span style={{ color: "#78716c", fontSize: "0.8rem", minWidth: "2rem" }}>
            {Math.round(sustain * 100)}%
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-0 px-4 pt-6">
        {(["tuner", "chords"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-8 py-3 font-semibold text-sm transition-all"
            style={{
              background: activeTab === tab ? "#292524" : "transparent",
              color: activeTab === tab ? "#fbbf24" : "#78716c",
              borderBottom: activeTab === tab ? "2px solid #f59e0b" : "2px solid transparent",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {tab === "tuner" ? "Afinador" : "Acordes"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "tuner" ? (
          <motion.div
            key="tuner"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-4 py-8"
          >
            {/* Tuning selector */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <label style={{ color: "#a8a29e", fontSize: "0.85rem", alignSelf: "center" }}>
                Afinação:
              </label>
              <select
                value={selectedTuning}
                onChange={(e) => setSelectedTuning(e.target.value as TuningName)}
                className="px-3 py-2 rounded-lg text-sm"
                style={{
                  background: "#292524",
                  border: "1px solid #57534e",
                  color: "#e7e5e4",
                  outline: "none",
                }}
              >
                {tuningOptions.map(([key, t]) => (
                  <option key={key} value={key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Strings */}
            <div className="flex flex-col gap-3 mb-8">
              {currentTuning.strings.map((s, i) => {
                const isActive = activeString === i;
                const thickness = STRING_THICKNESS[i];
                return (
                  <motion.button
                    key={i}
                    onClick={() => playString(i)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all"
                    style={{
                      background: isActive ? "#292524" : "#1f1d1b",
                      border: isActive ? "1px solid #f59e0b" : "1px solid #292524",
                      boxShadow: isActive ? "0 0 16px #f59e0b44" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {/* String number */}
                    <span
                      className="font-mono text-xs"
                      style={{ color: "#57534e", minWidth: "1.2rem" }}
                    >
                      {i + 1}
                    </span>

                    {/* String visual */}
                    <div
                      style={{
                        flex: 1,
                        height: `${thickness}px`,
                        background: isActive
                          ? "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)"
                          : "linear-gradient(90deg, #57534e, #a8a29e, #57534e)",
                        borderRadius: "999px",
                        transition: "all 0.2s",
                        boxShadow: isActive ? `0 0 8px #f59e0b88` : "none",
                      }}
                    />

                    {/* String info */}
                    <div className="flex flex-col items-end" style={{ minWidth: "4rem" }}>
                      <span
                        className="font-bold text-base"
                        style={{ color: isActive ? "#fbbf24" : "#e7e5e4" }}
                      >
                        {s.name}
                      </span>
                      <span className="text-xs" style={{ color: "#78716c" }}>
                        {s.freq} Hz
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Tuner display */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{
                background: "#292524",
                border: "1px solid #44403c",
              }}
            >
              {/* Note display */}
              <div className="mb-2">
                <span
                  className="text-6xl font-bold tracking-tight"
                  style={{
                    color: inTune && activeString !== null ? "#4ade80" : "#fbbf24",
                    textShadow:
                      inTune && activeString !== null ? "0 0 30px #4ade8088" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {activeString !== null
                    ? currentTuning.strings[activeString].name
                    : "—"}
                </span>
              </div>

              {/* Frequency */}
              <div
                className="text-sm mb-1"
                style={{ color: "#78716c" }}
              >
                {activeString !== null
                  ? `${currentTuning.strings[activeString].freq} Hz`
                  : "Clica numa corda para afinar"}
              </div>

              {/* Cents offset */}
              {activeString !== null && (
                <div
                  className="text-sm mb-4 font-mono"
                  style={{
                    color: inTune ? "#4ade80" : cents < 0 ? "#60a5fa" : "#f87171",
                  }}
                >
                  {inTune
                    ? "✓ Afinado"
                    : cents < 0
                    ? `${cents.toFixed(1)} cents (bemol)`
                    : `+${cents.toFixed(1)} cents (sustenido)`}
                </div>
              )}

              {/* SVG Meter */}
              <TunerMeter cents={cents} inTune={inTune && activeString !== null} />

              {/* In-tune badge */}
              <AnimatePresence>
                {inTune && activeString !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
                    style={{
                      background: "#14532d",
                      color: "#4ade80",
                      border: "1px solid #4ade8066",
                      boxShadow: "0 0 20px #4ade8033",
                    }}
                  >
                    Em afinação
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auto mode */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  setAutoMode((v) => !v);
                  if (!autoMode) setAutoIndex(0);
                }}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: autoMode ? "#92400e" : "#292524",
                  color: autoMode ? "#fcd34d" : "#a8a29e",
                  border: autoMode ? "1px solid #f59e0b" : "1px solid #44403c",
                  boxShadow: autoMode ? "0 0 16px #f59e0b44" : "none",
                }}
              >
                {autoMode ? "⏹ Parar Auto" : "▶ Modo Auto — percorrer cordas"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chords"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto px-4 py-8"
          >
            {/* Chord Selector */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {/* Root note */}
              <div className="flex flex-col gap-2">
                <label
                  style={{
                    color: "#a8a29e",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Nota raiz
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ROOT_NOTES.map((n) => (
                    <button
                      key={n}
                      onClick={() => setSelectedRoot(n)}
                      className="w-9 h-9 rounded-lg font-bold text-sm transition-all"
                      style={{
                        background: selectedRoot === n ? "#f59e0b" : "#292524",
                        color: selectedRoot === n ? "#1c1917" : "#e7e5e4",
                        border:
                          selectedRoot === n
                            ? "1px solid #f59e0b"
                            : "1px solid #44403c",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chord type */}
              <div className="flex flex-col gap-2">
                <label
                  style={{
                    color: "#a8a29e",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Tipo
                </label>
                <div className="flex gap-2 flex-wrap">
                  {CHORD_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className="px-3 h-9 rounded-lg font-semibold text-sm transition-all"
                      style={{
                        background: selectedType === t ? "#7c3aed" : "#292524",
                        color: selectedType === t ? "#ede9fe" : "#e7e5e4",
                        border:
                          selectedType === t
                            ? "1px solid #a78bfa"
                            : "1px solid #44403c",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chord Display */}
            {currentChord ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Fretboard */}
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "#292524",
                    border: "1px solid #44403c",
                  }}
                >
                  <h2
                    className="text-2xl font-bold text-center mb-1"
                    style={{ color: "#fbbf24" }}
                  >
                    {currentChord.name}
                  </h2>
                  <p
                    className="text-center text-sm mb-6"
                    style={{ color: "#78716c" }}
                  >
                    {currentChord.notes.join(" · ")}
                  </p>

                  {/* String labels at top */}
                  <div className="flex justify-center mb-1">
                    <div
                      className="flex justify-between"
                      style={{ width: "220px", paddingLeft: "36px", paddingRight: "24px" }}
                    >
                      {["E", "A", "D", "G", "B", "e"].map((n, i) => (
                        <span
                          key={i}
                          style={{
                            color: "#57534e",
                            fontSize: "0.7rem",
                            textAlign: "center",
                            width: "20px",
                            marginLeft: i === 0 ? 0 : undefined,
                          }}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <FretboardDiagram chord={currentChord} strumming={strumming} />

                  {/* Finger legend */}
                  <div className="flex justify-center gap-3 mt-4 flex-wrap">
                    {[1, 2, 3, 4].map((f, idx) => {
                      const colors = ["#f59e0b", "#fb923c", "#fbbf24", "#a78bfa"];
                      const labels = ["Indicador", "Médio", "Anelar", "Mínimo"];
                      return (
                        <div key={f} className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: colors[idx], color: "#1c1917" }}
                          >
                            {f}
                          </div>
                          <span style={{ color: "#78716c", fontSize: "0.7rem" }}>
                            {labels[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chord info & play */}
                <div className="flex flex-col gap-5">
                  {/* Notes grid */}
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "#292524",
                      border: "1px solid #44403c",
                    }}
                  >
                    <h3
                      className="text-xs font-semibold mb-3"
                      style={{
                        color: "#a8a29e",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      Notas do acorde
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {currentChord.notes.map((note, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg font-bold text-sm"
                          style={{
                            background: "#1c1917",
                            color: "#fbbf24",
                            border: "1px solid #44403c",
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* String-by-string */}
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "#292524",
                      border: "1px solid #44403c",
                    }}
                  >
                    <h3
                      className="text-xs font-semibold mb-3"
                      style={{
                        color: "#a8a29e",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      Corda por corda
                    </h3>
                    <div className="flex flex-col gap-2">
                      {["E (grave)", "A", "D", "G", "B", "e (aguda)"].map((name, i) => {
                        const fret = currentChord.frets[i];
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between text-sm"
                          >
                            <span style={{ color: "#78716c", minWidth: "6rem" }}>
                              {name}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded font-mono text-xs"
                              style={{
                                background:
                                  fret === -1
                                    ? "#3b0f0f"
                                    : fret === 0
                                    ? "#0f2b1b"
                                    : "#1c1510",
                                color:
                                  fret === -1
                                    ? "#f87171"
                                    : fret === 0
                                    ? "#4ade80"
                                    : "#fbbf24",
                              }}
                            >
                              {fret === -1 ? "× mudo" : fret === 0 ? "○ solto" : `traste ${fret}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Play button */}
                  <motion.button
                    onClick={playChord}
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-4 rounded-2xl font-bold text-base transition-all"
                    style={{
                      background: strumming
                        ? "linear-gradient(135deg, #92400e, #78350f)"
                        : "linear-gradient(135deg, #b45309, #92400e)",
                      color: "#fef3c7",
                      border: "1px solid #f59e0b66",
                      boxShadow: strumming
                        ? "0 0 30px #f59e0b66, 0 4px 16px #00000088"
                        : "0 4px 16px #00000088",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {strumming ? "♪ A tocar..." : "▶ Tocar Acorde"}
                  </motion.button>
                </div>
              </div>
            ) : (
              <div
                className="text-center py-16 rounded-2xl"
                style={{
                  background: "#292524",
                  border: "1px solid #44403c",
                  color: "#78716c",
                }}
              >
                <p className="text-2xl mb-2">🎸</p>
                <p>Acorde não encontrado para esta combinação.</p>
                <p className="text-sm mt-1">Tenta uma combinação diferente.</p>
              </div>
            )}

            {/* Quick chord grid */}
            <div className="mt-10">
              <h3
                className="text-xs font-semibold mb-4 text-center"
                style={{
                  color: "#a8a29e",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Acordes disponíveis para {selectedRoot}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {CHORD_TYPES.map((type) => {
                  const key = `${selectedRoot}-${type}`;
                  const exists = !!CHORDS[key];
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => exists && setSelectedType(type)}
                      disabled={!exists}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: isSelected
                          ? "#7c3aed"
                          : exists
                          ? "#292524"
                          : "#1c1917",
                        color: isSelected
                          ? "#ede9fe"
                          : exists
                          ? "#e7e5e4"
                          : "#3f3a36",
                        border: isSelected
                          ? "1px solid #a78bfa"
                          : exists
                          ? "1px solid #44403c"
                          : "1px solid #2d2926",
                        cursor: exists ? "pointer" : "not-allowed",
                      }}
                    >
                      {selectedRoot}{type}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="text-center py-6 mt-8"
        style={{ borderTop: "1px solid #2d2926", color: "#57534e", fontSize: "0.8rem" }}
      >
        Descomplicai · Web Audio API · Sem backend
      </footer>
    </div>
  );
}
