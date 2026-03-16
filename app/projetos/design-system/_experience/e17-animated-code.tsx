"use client";

import { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Code lines & syntax highlighting                                   */
/* ------------------------------------------------------------------ */

interface Token {
  text: string;
  color: string;
}

const COLORS = {
  keyword: "text-purple-400",
  string: "text-emerald-400",
  component: "text-cyan-400",
  prop: "text-blue-400",
  bracket: "text-slate-400",
  comment: "text-slate-600",
  plain: "text-slate-300",
};

function tok(text: string, color: string): Token {
  return { text, color };
}

const CODE_LINES: Token[][] = [
  // 0
  [
    tok("import", COLORS.keyword),
    tok(" { ", COLORS.bracket),
    tok("GlassCard", COLORS.component),
    tok(" } ", COLORS.bracket),
    tok("from ", COLORS.keyword),
    tok('"@/ui/glass-card"', COLORS.string),
  ],
  // 1
  [
    tok("import", COLORS.keyword),
    tok(" { ", COLORS.bracket),
    tok("Spotlight", COLORS.component),
    tok(" } ", COLORS.bracket),
    tok("from ", COLORS.keyword),
    tok('"@/ui/spotlight"', COLORS.string),
  ],
  // 2
  [
    tok("import", COLORS.keyword),
    tok(" { ", COLORS.bracket),
    tok("BlurText", COLORS.component),
    tok(" } ", COLORS.bracket),
    tok("from ", COLORS.keyword),
    tok('"@/ui/blur-text"', COLORS.string),
  ],
  // 3
  [
    tok("import", COLORS.keyword),
    tok(" { ", COLORS.bracket),
    tok("MagneticButton", COLORS.component),
    tok(" } ", COLORS.bracket),
    tok("from ", COLORS.keyword),
    tok('"@/ui/magnetic-button"', COLORS.string),
  ],
  // 4 – blank
  [],
  // 5
  [
    tok("export", COLORS.keyword),
    tok(" ", COLORS.plain),
    tok("function", COLORS.keyword),
    tok(" ", COLORS.plain),
    tok("Hero", COLORS.component),
    tok("() {", COLORS.bracket),
  ],
  // 6
  [
    tok("  ", COLORS.plain),
    tok("return", COLORS.keyword),
    tok(" (", COLORS.bracket),
  ],
  // 7
  [
    tok("    <", COLORS.bracket),
    tok("GlassCard", COLORS.component),
    tok(" ", COLORS.plain),
    tok("className", COLORS.prop),
    tok("=", COLORS.bracket),
    tok('"p-8"', COLORS.string),
    tok(">", COLORS.bracket),
  ],
  // 8
  [
    tok("      <", COLORS.bracket),
    tok("Spotlight", COLORS.component),
    tok(" ", COLORS.plain),
    tok("size", COLORS.prop),
    tok("={", COLORS.bracket),
    tok("300", COLORS.plain),
    tok("}", COLORS.bracket),
    tok(" />", COLORS.bracket),
  ],
  // 9
  [
    tok("      <", COLORS.bracket),
    tok("BlurText", COLORS.component),
  ],
  // 10
  [
    tok('        ', COLORS.plain),
    tok("text", COLORS.prop),
    tok("=", COLORS.bracket),
    tok('"Futuro Digital"', COLORS.string),
  ],
  // 11
  [
    tok('        ', COLORS.plain),
    tok("gradient", COLORS.prop),
  ],
  // 12
  [
    tok("      />", COLORS.bracket),
  ],
  // 13
  [
    tok("      <", COLORS.bracket),
    tok("MagneticButton", COLORS.component),
    tok(">", COLORS.bracket),
  ],
  // 14
  [
    tok('        Comecar', COLORS.string),
  ],
  // 15
  [
    tok("      </", COLORS.bracket),
    tok("MagneticButton", COLORS.component),
    tok(">", COLORS.bracket),
  ],
  // 16
  [
    tok("    </", COLORS.bracket),
    tok("GlassCard", COLORS.component),
    tok(">", COLORS.bracket),
  ],
  // 17
  [
    tok("  )", COLORS.bracket),
  ],
  // 18
  [
    tok("}", COLORS.bracket),
  ],
];

/* Map line index -> preview stage */
function stageForLine(lineIndex: number): number {
  if (lineIndex <= 6) return 0;   // imports + function open
  if (lineIndex <= 7) return 1;   // GlassCard
  if (lineIndex <= 8) return 2;   // Spotlight
  if (lineIndex <= 12) return 3;  // BlurText
  if (lineIndex <= 15) return 4;  // MagneticButton
  return 5;                       // closing
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AnimatedCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  /* Intersection Observer — trigger when in view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Typewriter: line by line */
  useEffect(() => {
    if (!started) return;
    if (visibleLines >= CODE_LINES.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCharIndex(0);
    }, 800);
    return () => clearTimeout(timer);
  }, [started, visibleLines]);

  /* Typewriter: character by character for current line */
  useEffect(() => {
    if (!started) return;
    if (visibleLines === 0 || visibleLines > CODE_LINES.length) return;

    const currentLine = CODE_LINES[visibleLines - 1];
    const totalChars = currentLine.reduce((s, t) => s + t.text.length, 0);

    if (charIndex >= totalChars) return;

    const timer = setTimeout(() => {
      setCharIndex((c) => c + 1);
    }, 25);
    return () => clearTimeout(timer);
  }, [started, visibleLines, charIndex]);

  /* Blinking cursor */
  useEffect(() => {
    const timer = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);

  const previewStage = visibleLines > 0 ? stageForLine(visibleLines - 1) : 0;

  /* Render tokens for a given line, with optional char limit */
  function renderLine(lineTokens: Token[], maxChars?: number) {
    let remaining = maxChars ?? Infinity;
    return lineTokens.map((token, i) => {
      if (remaining <= 0) return null;
      const slice = token.text.slice(0, remaining);
      remaining -= slice.length;
      return (
        <span key={i} className={token.color}>
          {slice}
        </span>
      );
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-32 px-6 overflow-hidden"
    >
      {/* Subtle bg glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
            Developer Experience
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Escreva menos.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Crie mais.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Componentes prontos que transformam poucas linhas de codigo em
            interfaces extraordinarias.
          </p>
        </div>

        {/* Grid */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* LEFT — Code Editor */}
          <div className="rounded-2xl border border-slate-700/50 bg-[#1e1e2e] shadow-2xl shadow-black/40">
            {/* Top bar */}
            <div className="flex items-center gap-2 border-b border-slate-700/40 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-slate-500">page.tsx</span>
            </div>

            {/* Code body */}
            <div className="overflow-x-auto p-6">
              <pre className="font-mono text-sm leading-relaxed">
                {CODE_LINES.slice(0, visibleLines).map((line, lineIdx) => {
                  const isCurrentLine = lineIdx === visibleLines - 1;
                  return (
                    <div key={lineIdx} className="min-h-[1.5em]">
                      <span className="mr-4 inline-block w-5 text-right text-slate-600 select-none">
                        {lineIdx + 1}
                      </span>
                      {isCurrentLine ? renderLine(line, charIndex) : renderLine(line)}
                      {isCurrentLine && (
                        <span
                          className={`ml-px inline-block h-4 w-[2px] translate-y-[2px] bg-purple-400 transition-opacity duration-100 ${
                            cursorVisible ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
                {/* Cursor on empty next line after all done */}
                {visibleLines >= CODE_LINES.length && (
                  <div className="min-h-[1.5em]">
                    <span className="mr-4 inline-block w-5 text-right text-slate-600 select-none">
                      {CODE_LINES.length + 1}
                    </span>
                    <span
                      className={`ml-px inline-block h-4 w-[2px] translate-y-[2px] bg-purple-400 transition-opacity duration-100 ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                )}
              </pre>
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/10 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
              <span className="ml-3 text-xs text-slate-400">Preview</span>
            </div>

            {/* Preview body */}
            <div className="relative flex min-h-[420px] items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
              {/* Stage 0: empty / waiting */}
              {previewStage === 0 && (
                <p className="text-sm text-slate-300">Aguardando componentes...</p>
              )}

              {/* Stage >= 1: GlassCard container */}
              {previewStage >= 1 && (
                <div
                  className="relative w-full max-w-xs rounded-2xl border border-white/60 bg-white/30 p-8 shadow-lg backdrop-blur-md transition-all duration-700"
                  style={{
                    opacity: previewStage >= 1 ? 1 : 0,
                    transform: previewStage >= 1 ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  {/* Stage >= 2: Spotlight glow */}
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 h-[180px] w-[180px] rounded-full bg-gradient-to-br from-purple-400/40 to-cyan-400/40 blur-3xl transition-opacity duration-700"
                    style={{ opacity: previewStage >= 2 ? 1 : 0 }}
                  />

                  {/* Stage >= 3: BlurText */}
                  <div
                    className="relative mb-6 transition-all duration-700"
                    style={{
                      opacity: previewStage >= 3 ? 1 : 0,
                      filter: previewStage >= 3 ? "blur(0px)" : "blur(8px)",
                      transform: previewStage >= 3 ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    <h3 className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
                      Futuro Digital
                    </h3>
                  </div>

                  {/* Stage >= 4: MagneticButton */}
                  <div
                    className="relative transition-all duration-700"
                    style={{
                      opacity: previewStage >= 4 ? 1 : 0,
                      transform: previewStage >= 4 ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
                    }}
                  >
                    <button className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-transform hover:scale-105">
                      Comecar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
