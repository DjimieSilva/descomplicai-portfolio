"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Sample text ────────────────────────────────────────────────────────────
const SAMPLE_TEXT = `Portugal é um país com uma história rica e uma cultura vibrante, localizado na Península Ibérica, no sudoeste da Europa. Com uma população de cerca de dez milhões de habitantes, o país é conhecido pela sua língua, a mais falada no hemisfério sul, e por ter sido uma das maiores potências marítimas do mundo.

A gastronomia portuguesa é uma das mais apreciadas da Europa. O bacalhau, considerado o "fiel amigo" dos portugueses, pode ser preparado de centenas de formas diferentes. O pastel de nata, criado pelos monges do Mosteiro dos Jerónimos em Lisboa, tornou-se um símbolo doce da identidade nacional.

Lisboa, a capital, é uma cidade de sete colinas, onde elétricos históricos sobem ruas íngremes entre casas revestidas de azulejos. O Porto, a segunda maior cidade, é famosa pelo vinho do Porto e pela Ribeira, classificada como Património da Humanidade pela UNESCO.

A música tradicional portuguesa, o fado, é reconhecida como Património Imaterial da Humanidade. Com letras que falam de saudade, destino e amor, o fado é uma expressão profunda da alma portuguesa.`;

// ─── Types ───────────────────────────────────────────────────────────────────
interface TextStats {
  chars: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  avgWordLength: number;
  readingTime: number;
  speakingTime: number;
  uniqueWords: number;
  longestWord: string;
  topWords: [string, number][];
  fleschScore: number;
  gradeLevel: number;
  difficultyLabel: string;
  charFreq: [string, number][];
  keywordDensity: [string, number][];
}

// ─── Portuguese stopwords ─────────────────────────────────────────────────────
const STOPWORDS = new Set([
  "a","ao","aos","as","até","com","como","da","das","de","del","do","dos",
  "e","é","em","entre","era","essa","esse","esta","este","eu","foi","for",
  "há","isso","isto","já","lhe","lhes","mais","mas","me","mesmo","meu","minha",
  "muito","na","nas","não","nem","no","nos","o","os","ou","para","pela","pelas",
  "pelo","pelos","por","qual","quando","que","quem","se","seu","seus","sua",
  "suas","são","também","te","tem","ter","teu","teus","tua","tuas","um","uma",
  "umas","uns","você","vos","às","à","pelo","pelos","pela","pelas","numa","num",
  "numas","nuns","duma","dum","dumas","duns","todo","toda","todos","todas",
  "ser","estar","foi","era","eram","será","seria","sendo","sido","tenho","tens",
  "temos","têm","tinha","tinham","tive","teve","temos","ter","teve","tiveram",
  "este","esta","estes","estas","esse","essa","esses","essas","aquele","aquela",
  "aqueles","aquelas","nos","nas","me","te","lhe","lhes","nós","vós","eles","elas",
  "mim","ti","si","ele","ela","depois","antes","sobre","entre","desde","até",
  "ainda","só","talvez","muito","pouco","bem","mal","sempre","nunca","aqui","ali"
]);

// ─── Stats calculation ────────────────────────────────────────────────────────
function calculateStats(text: string): TextStats {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;

  const wordMatches = text.match(/\b[\wÀ-ÿ]+\b/gu) || [];
  const words = wordMatches.length;

  const sentenceMatches = text.match(/[^.!?]+[.!?]+/g) || [];
  const sentences = sentenceMatches.length || (text.trim().length > 0 ? 1 : 0);

  const paragraphs = text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length;

  const totalWordLen = wordMatches.reduce((acc, w) => acc + w.length, 0);
  const avgWordLength = words > 0 ? totalWordLen / words : 0;

  const readingTime = words / 200; // minutes
  const speakingTime = words / 130; // minutes

  const lowerWords = wordMatches.map((w) => w.toLowerCase());
  const uniqueWords = new Set(lowerWords).size;

  const longestWord = wordMatches.reduce(
    (a, b) => (b.length > a.length ? b : a),
    ""
  );

  // Word frequency
  const freq: Record<string, number> = {};
  for (const w of lowerWords) {
    if (w.length > 1) freq[w] = (freq[w] || 0) + 1;
  }
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) as [string, number][];

  // Keyword density (non-stopwords, top 10)
  const contentFreq: Record<string, number> = {};
  for (const w of lowerWords) {
    if (w.length > 2 && !STOPWORDS.has(w))
      contentFreq[w] = (contentFreq[w] || 0) + 1;
  }
  const keywordDensity = Object.entries(contentFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => [word, words > 0 ? (count / words) * 100 : 0]) as [
    string,
    number
  ][];

  // Flesch Reading Ease (PT-adapted)
  const syllables = wordMatches.reduce((acc, w) => acc + countSyllables(w), 0);
  const avgSyllablesPerWord = words > 0 ? syllables / words : 0;
  const avgSentenceLen = sentences > 0 ? words / sentences : 0;
  const fleschScore = Math.max(
    0,
    Math.min(
      100,
      206.835 - 1.015 * avgSentenceLen - 84.6 * avgSyllablesPerWord
    )
  );

  // Grade level (Flesch-Kincaid)
  const gradeLevel = Math.max(
    0,
    Math.round(0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59)
  );

  let difficultyLabel = "Muito Fácil";
  if (fleschScore < 30) difficultyLabel = "Muito Difícil";
  else if (fleschScore < 50) difficultyLabel = "Difícil";
  else if (fleschScore < 60) difficultyLabel = "Médio-Difícil";
  else if (fleschScore < 70) difficultyLabel = "Médio";
  else if (fleschScore < 80) difficultyLabel = "Fácil";
  else if (fleschScore < 90) difficultyLabel = "Muito Fácil";
  else difficultyLabel = "Extremamente Fácil";

  // Character frequency (letters only)
  const letterFreq: Record<string, number> = {};
  for (const ch of text.toLowerCase()) {
    if (/[a-záàâãéêíóôõúüç]/i.test(ch)) {
      letterFreq[ch] = (letterFreq[ch] || 0) + 1;
    }
  }
  const charFreq = Object.entries(letterFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20) as [string, number][];

  return {
    chars,
    charsNoSpaces,
    words,
    sentences,
    paragraphs,
    avgWordLength,
    readingTime,
    speakingTime,
    uniqueWords,
    longestWord,
    topWords,
    fleschScore,
    gradeLevel,
    difficultyLabel,
    charFreq,
    keywordDensity,
  };
}

function countSyllables(word: string): number {
  const w = word
    .toLowerCase()
    .replace(/[^a-záàâãéêíóôõúüç]/gi, "");
  const vowels = w.match(/[aeiouáàâãéêíóôõúü]/gi);
  return Math.max(1, vowels ? vowels.length : 1);
}

function formatTime(minutes: number): string {
  if (minutes < 1) {
    const secs = Math.round(minutes * 60);
    return `${secs}s`;
  }
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  index,
}: {
  label: string;
  value: string | number;
  sub?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col gap-1 shadow-sm"
    >
      <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold text-stone-800 leading-none">
        {value}
      </span>
      {sub && <span className="text-xs text-stone-400">{sub}</span>}
    </motion.div>
  );
}

// ─── Horizontal bar ───────────────────────────────────────────────────────────
function HBar({
  label,
  value,
  max,
  suffix = "",
  index,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  index: number;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      className="flex items-center gap-3"
    >
      <span className="w-28 text-sm text-stone-600 truncate text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 bg-stone-100 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: index * 0.04 + 0.1, duration: 0.5, ease: "easeOut" }}
          className="h-4 rounded-full bg-teal-500"
        />
      </div>
      <span className="w-16 text-sm text-stone-500 tabular-nums">
        {typeof value === "number" && !Number.isInteger(value)
          ? value.toFixed(2)
          : value}
        {suffix}
      </span>
    </motion.div>
  );
}

// ─── Flesch gauge ─────────────────────────────────────────────────────────────
function FleschGauge({ score }: { score: number }) {
  const color =
    score >= 70
      ? "#14b8a6"
      : score >= 50
      ? "#f59e0b"
      : score >= 30
      ? "#f97316"
      : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-16 overflow-hidden">
        <svg viewBox="0 0 120 60" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M10,60 A50,50 0 0,1 110,60"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <motion.path
            d="M10,60 A50,50 0 0,1 110,60"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 157} 157`}
            initial={{ strokeDasharray: "0 157" }}
            animate={{ strokeDasharray: `${(score / 100) * 157} 157` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-2xl font-bold" style={{ color }}>
            {Math.round(score)}
          </span>
        </div>
      </div>
      <span className="text-xs text-stone-400">/ 100</span>
    </div>
  );
}

// ─── Section title ────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className="w-3 h-0.5 bg-teal-500 inline-block" />
      {children}
    </h2>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TextAnalyzer() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [monospace, setMonospace] = useState(false);
  const [transformed, setTransformed] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "readability" | "freq" | "chars" | "keywords">("stats");

  const stats = useMemo(() => calculateStats(text), [text]);

  // ── Transformations ─────────────────────────────────────────────────────────
  const applyTransform = useCallback(
    (fn: (t: string) => string) => {
      setTransformed(fn(text));
    },
    [text]
  );

  const transforms = [
    {
      label: "MAIÚSCULAS",
      fn: (t: string) => t.toUpperCase(),
    },
    {
      label: "minúsculas",
      fn: (t: string) => t.toLowerCase(),
    },
    {
      label: "Capitalizar Palavras",
      fn: (t: string) =>
        t.replace(/\b[\wÀ-ÿ]/gu, (c) => c.toUpperCase()),
    },
    {
      label: "Remover espaços extra",
      fn: (t: string) => t.replace(/[ \t]+/g, " ").replace(/\n +/g, "\n").trim(),
    },
    {
      label: "Remover quebras de linha",
      fn: (t: string) => t.replace(/\n+/g, " ").trim(),
    },
    {
      label: "Inverter texto",
      fn: (t: string) => [...t].reverse().join(""),
    },
  ];

  const handleCopy = () => {
    if (!transformed) return;
    navigator.clipboard.writeText(transformed).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── Export ───────────────────────────────────────────────────────────────────
  const handleExport = () => {
    const lines = [
      "ANÁLISE DE TEXTO — Descomplicai",
      "================================",
      "",
      `Caracteres (com espaços): ${stats.chars}`,
      `Caracteres (sem espaços): ${stats.charsNoSpaces}`,
      `Palavras: ${stats.words}`,
      `Frases: ${stats.sentences}`,
      `Parágrafos: ${stats.paragraphs}`,
      `Palavras únicas: ${stats.uniqueWords}`,
      `Palavra mais longa: ${stats.longestWord}`,
      `Comprimento médio das palavras: ${stats.avgWordLength.toFixed(2)}`,
      `Tempo de leitura (200 ppm): ${formatTime(stats.readingTime)}`,
      `Tempo de fala (130 ppm): ${formatTime(stats.speakingTime)}`,
      "",
      "LEGIBILIDADE",
      "------------",
      `Flesch Reading Ease: ${Math.round(stats.fleschScore)} / 100`,
      `Nível escolar: ${stats.gradeLevel}º ano`,
      `Dificuldade: ${stats.difficultyLabel}`,
      "",
      "TOP 10 PALAVRAS",
      "---------------",
      ...stats.topWords.map(([w, c], i) => `${i + 1}. ${w}: ${c}`),
      "",
      "DENSIDADE DE PALAVRAS-CHAVE",
      "---------------------------",
      ...stats.keywordDensity.map(([w, d]) => `${w}: ${(d as number).toFixed(2)}%`),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analise-texto.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "stats", label: "Estatísticas" },
    { id: "readability", label: "Legibilidade" },
    { id: "freq", label: "Frequência" },
    { id: "chars", label: "Letras" },
    { id: "keywords", label: "Palavras-chave" },
  ] as const;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      {/* ── Header ── */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <span className="text-teal-500">✦</span>
              Analisador de Texto
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Estatísticas em tempo real enquanto escreves
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: textarea + transformations ── */}
        <div className="flex flex-col gap-4">
          {/* Textarea controls */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600">Texto</span>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs text-stone-500">Monoespaçado</span>
              <button
                onClick={() => setMonospace((v) => !v)}
                className={`w-9 h-5 rounded-full transition-colors ${
                  monospace ? "bg-teal-500" : "bg-stone-300"
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                    monospace ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreve ou cola o teu texto aqui..."
            className={`w-full h-72 p-4 rounded-xl border border-stone-200 bg-white shadow-sm text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${
              monospace ? "font-mono" : "font-sans"
            }`}
          />

          <div className="text-xs text-stone-400 text-right -mt-2">
            {stats.chars} caracteres · {stats.words} palavras
          </div>

          {/* ── Quick stats inline ── */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Palavras", value: stats.words },
              { label: "Frases", value: stats.sentences },
              { label: "Parágrafos", value: stats.paragraphs },
              { label: "Únicas", value: stats.uniqueWords },
              { label: "Leitura", value: formatTime(stats.readingTime) },
              { label: "Fala", value: formatTime(stats.speakingTime) },
            ].map((s, i) => (
              <StatCard key={s.label} label={s.label} value={s.value} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatCard
              label="Comprimento médio"
              value={stats.avgWordLength.toFixed(2)}
              sub="caracteres por palavra"
              index={6}
            />
            <StatCard
              label="Palavra mais longa"
              value={stats.longestWord || "—"}
              sub={stats.longestWord ? `${stats.longestWord.length} letras` : ""}
              index={7}
            />
          </div>

          {/* ── Transformations ── */}
          <div>
            <SectionTitle>Transformações</SectionTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              {transforms.map((t) => (
                <button
                  key={t.label}
                  onClick={() => applyTransform(t.fn)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:border-teal-400 hover:text-teal-600 transition-colors shadow-sm"
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {transformed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <textarea
                    readOnly
                    value={transformed}
                    className={`w-full h-36 p-4 rounded-xl border border-teal-200 bg-teal-50 text-sm leading-relaxed resize-none focus:outline-none font-mono`}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-stone-400">
                      Texto transformado
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                        copied
                          ? "bg-teal-500 text-white"
                          : "bg-white border border-stone-200 hover:border-teal-400 hover:text-teal-600"
                      }`}
                    >
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: analysis panels ── */}
        <div className="flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-stone-100 p-1 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── Stats tab ── */}
            {activeTab === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
              >
                <SectionTitle>Estatísticas Detalhadas</SectionTitle>
                <div className="space-y-3 text-sm">
                  {[
                    ["Caracteres (com espaços)", stats.chars],
                    ["Caracteres (sem espaços)", stats.charsNoSpaces],
                    ["Palavras", stats.words],
                    ["Frases", stats.sentences],
                    ["Parágrafos", stats.paragraphs],
                    ["Palavras únicas", stats.uniqueWords],
                    ["Comprimento médio das palavras", stats.avgWordLength.toFixed(2)],
                    ["Palavra mais longa", stats.longestWord || "—"],
                    ["Tempo de leitura (200 ppm)", formatTime(stats.readingTime)],
                    ["Tempo de fala (130 ppm)", formatTime(stats.speakingTime)],
                  ].map(([label, value]) => (
                    <div
                      key={label as string}
                      className="flex justify-between items-center py-1.5 border-b border-stone-50"
                    >
                      <span className="text-stone-500">{label}</span>
                      <span className="font-semibold text-stone-800 tabular-nums">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Readability tab ── */}
            {activeTab === "readability" && (
              <motion.div
                key="readability"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
              >
                <SectionTitle>Legibilidade</SectionTitle>

                <div className="flex flex-col items-center gap-4 mb-6">
                  <FleschGauge score={stats.fleschScore} />
                  <div className="text-center">
                    <span
                      className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full"
                      style={{
                        background:
                          stats.fleschScore >= 70
                            ? "#ccfbf1"
                            : stats.fleschScore >= 50
                            ? "#fef3c7"
                            : stats.fleschScore >= 30
                            ? "#ffedd5"
                            : "#fee2e2",
                        color:
                          stats.fleschScore >= 70
                            ? "#0f766e"
                            : stats.fleschScore >= 50
                            ? "#92400e"
                            : stats.fleschScore >= 30
                            ? "#9a3412"
                            : "#991b1b",
                      }}
                    >
                      {stats.difficultyLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  {[
                    ["Flesch Reading Ease", `${Math.round(stats.fleschScore)} / 100`],
                    ["Nível escolar estimado", `${stats.gradeLevel}º ano`],
                    ["Dificuldade", stats.difficultyLabel],
                    ["Palavras por frase", stats.sentences > 0 ? (stats.words / stats.sentences).toFixed(1) : "—"],
                  ].map(([label, value]) => (
                    <div
                      key={label as string}
                      className="flex justify-between items-center py-1.5 border-b border-stone-50"
                    >
                      <span className="text-stone-500">{label}</span>
                      <span className="font-semibold text-stone-800">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-xs text-stone-400 leading-relaxed bg-stone-50 rounded-lg p-3">
                  <strong className="text-stone-500">Escala Flesch:</strong>{" "}
                  90–100 Extremamente Fácil · 80–90 Muito Fácil · 70–80 Fácil ·
                  60–70 Médio · 50–60 Médio-Difícil · 30–50 Difícil · 0–30 Muito Difícil
                </div>
              </motion.div>
            )}

            {/* ── Frequency tab ── */}
            {activeTab === "freq" && (
              <motion.div
                key="freq"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
              >
                <SectionTitle>Top 10 Palavras</SectionTitle>
                {stats.topWords.length === 0 ? (
                  <p className="text-sm text-stone-400 text-center py-8">
                    Escreve algum texto para ver as palavras mais frequentes.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {stats.topWords.map(([word, count], i) => (
                      <HBar
                        key={word}
                        label={word}
                        value={count}
                        max={stats.topWords[0][1]}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Chars tab ── */}
            {activeTab === "chars" && (
              <motion.div
                key="chars"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
              >
                <SectionTitle>Frequência de Letras</SectionTitle>
                {stats.charFreq.length === 0 ? (
                  <p className="text-sm text-stone-400 text-center py-8">
                    Escreve algum texto para ver a frequência de letras.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.charFreq.map(([ch, count], i) => (
                      <HBar
                        key={ch}
                        label={ch.toUpperCase()}
                        value={count}
                        max={stats.charFreq[0][1]}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Keywords tab ── */}
            {activeTab === "keywords" && (
              <motion.div
                key="keywords"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm"
              >
                <SectionTitle>Densidade de Palavras-Chave</SectionTitle>
                <p className="text-xs text-stone-400 mb-4">
                  Palavras com conteúdo semântico (exclui palavras funcionais)
                </p>
                {stats.keywordDensity.length === 0 ? (
                  <p className="text-sm text-stone-400 text-center py-8">
                    Escreve algum texto para ver a densidade de palavras-chave.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {stats.keywordDensity.map(([word, density], i) => (
                      <HBar
                        key={word}
                        label={word}
                        value={density as number}
                        max={(stats.keywordDensity[0][1] as number)}
                        suffix="%"
                        index={i}
                      />
                    ))}
                  </div>
                )}

                {/* Table view */}
                <div className="mt-5 border border-stone-100 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="text-left px-3 py-2 text-stone-500 font-medium">#</th>
                        <th className="text-left px-3 py-2 text-stone-500 font-medium">Palavra</th>
                        <th className="text-right px-3 py-2 text-stone-500 font-medium">Densidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.keywordDensity.map(([word, density], i) => (
                        <tr key={word} className="border-t border-stone-50 hover:bg-stone-50">
                          <td className="px-3 py-2 text-stone-400">{i + 1}</td>
                          <td className="px-3 py-2 font-medium text-stone-700">{word}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-teal-600 font-semibold">
                            {(density as number).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-200 mt-8 py-6">
        <p className="text-center text-xs text-stone-400">
          Descomplicai · Analisador de Texto · 100% no browser, sem servidor
        </p>
      </footer>
    </main>
  );
}
