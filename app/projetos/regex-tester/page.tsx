"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatchResult {
  index: number;
  value: string;
  groups: Record<string, string> | null;
  captureGroups: string[];
  start: number;
  end: number;
}

interface Preset {
  label: string;
  description: string;
  pattern: string;
  flags: string;
  sample: string;
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Preset[] = [
  {
    label: "Email",
    description: "Valida endereços de email",
    pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
    flags: "gi",
    sample:
      "Contacta-nos em info@descomplicai.pt ou suporte@empresa.com.pt para mais informações. Email inválido: @invalido ou sem-arroba.pt",
  },
  {
    label: "Telefone PT",
    description: "Números de telefone portugueses (fixo e móvel)",
    pattern: "(?:\\+351|00351|351)?[\\s\\-]?(?:2\\d{1}|9[1236])\\d{7}",
    flags: "g",
    sample:
      "Ligue para 912 345 678 ou +351 21 234 5678. Também pode ligar para 00351 93 456 7890 ou 261 234 567.",
  },
  {
    label: "URL",
    description: "Endereços web completos",
    pattern:
      "https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)",
    flags: "gi",
    sample:
      "Visita https://descomplicai.pt ou http://www.exemplo.com/pagina?q=teste&id=1. Não é URL: www.incompleto.pt",
  },
  {
    label: "Data DD/MM/YYYY",
    description: "Datas no formato português",
    pattern:
      "(?:0?[1-9]|[12]\\d|3[01])\\/(?:0?[1-9]|1[0-2])\\/(?:19|20)\\d{2}",
    flags: "g",
    sample:
      "O evento é dia 25/12/2025. Nasceu em 1/4/1990. Data inválida: 32/13/2025. Outro evento: 01/01/2026.",
  },
  {
    label: "Código Postal PT",
    description: "Códigos postais portugueses (XXXX-XXX)",
    pattern: "\\d{4}-\\d{3}",
    flags: "g",
    sample:
      "Morada: Rua Principal, 1200-001 Lisboa. Também em 4000-007 Porto ou 3000-300 Coimbra.",
  },
  {
    label: "NIF",
    description: "Número de Identificação Fiscal português",
    pattern: "\\b[123568]\\d{8}\\b",
    flags: "g",
    sample:
      "O NIF da empresa é 501234567. O meu NIF pessoal é 123456789. NIF inválido: 012345678 ou 9999.",
  },
  {
    label: "IP Address",
    description: "Endereços IPv4",
    pattern:
      "\\b(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b",
    flags: "g",
    sample:
      "Servidor em 192.168.1.1, gateway 10.0.0.1, DNS 8.8.8.8. IP inválido: 999.999.999.999 ou 256.1.1.1.",
  },
  {
    label: "Hex Color",
    description: "Cores em formato hexadecimal CSS",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    flags: "gi",
    sample:
      "Paleta de cores: #1e1e2e (fundo), #cdd6f4 (texto), #f38ba8 (vermelho), #a6e3a1 (verde), #fab387 (pêssego). Inválido: #GGGGGG",
  },
  {
    label: "Password Forte",
    description: "Mínimo 8 chars, maiúscula, minúscula, número e especial",
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^()\\-_=+])[A-Za-z\\d@$!%*?&#^()\\-_=+]{8,}$",
    flags: "m",
    sample:
      "Senhas testadas:\nMinhaSenha1!\nfraca123\nSemNumero!\nForte@2025#\noutrafracasemnum\nMuitoForte$99",
  },
  {
    label: "Matrícula PT",
    description: "Matrículas portuguesas (novo e antigo formato)",
    pattern: "\\b(?:[A-Z]{2}[\\s\\-]?\\d{2}[\\s\\-]?[A-Z]{2}|\\d{2}[\\s\\-]?[A-Z]{2}[\\s\\-]?\\d{2}|\\d{2}[\\s\\-]?\\d{2}[\\s\\-]?[A-Z]{2})\\b",
    flags: "gi",
    sample:
      "Vi o carro AA-00-AA e também o 00-AA-00 estacionado. Matrícula antiga: 00-00-AA. Placa inválida: ABCDEF.",
  },
];

// ─── Regex Explanation ────────────────────────────────────────────────────────

const TOKEN_MAP: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /^\^/, label: "início da linha" },
  { pattern: /^\$/, label: "fim da linha" },
  { pattern: /^\\.d/, label: "dígito (0-9)" },
  { pattern: /^\\.D/, label: "não-dígito" },
  { pattern: /^\\.w/, label: "alfanumérico ou _" },
  { pattern: /^\\.W/, label: "não-alfanumérico" },
  { pattern: /^\\.s/, label: "espaço em branco" },
  { pattern: /^\\.S/, label: "não-espaço" },
  { pattern: /^\\.b/, label: "fronteira de palavra" },
  { pattern: /^\\.B/, label: "não-fronteira de palavra" },
  { pattern: /^\\.n/, label: "nova linha" },
  { pattern: /^\\.t/, label: "tabulação" },
  { pattern: /^\\.r/, label: "retorno de carro" },
  { pattern: /^\\.\./, label: "ponto literal" },
  { pattern: /^\./, label: "qualquer caracter (exceto nova linha)" },
  { pattern: /^\*/, label: "0 ou mais vezes" },
  { pattern: /^\+/, label: "1 ou mais vezes" },
  { pattern: /^\?/, label: "0 ou 1 vez (opcional)" },
  { pattern: /^\{\d+\}/, label: "exatamente N vezes" },
  { pattern: /^\{\d+,\d*\}/, label: "entre N e M vezes" },
  { pattern: /^\|/, label: "ou (alternativa)" },
  { pattern: /^\[.*?\]/, label: "conjunto de caracteres" },
  { pattern: /^\((?:\?:)?.*?\)/, label: "grupo de captura" },
  { pattern: /^\(\?=.*?\)/, label: "lookahead positivo" },
  { pattern: /^\(\?!.*?\)/, label: "lookahead negativo" },
  { pattern: /^\(\?<=.*?\)/, label: "lookbehind positivo" },
  { pattern: /^\(\?<!.*?\)/, label: "lookbehind negativo" },
];

function explainRegex(pattern: string): string[] {
  const explanations: string[] = [];
  let remaining = pattern;
  let i = 0;
  const maxTokens = 20;

  while (remaining.length > 0 && i < maxTokens) {
    i++;
    let matched = false;

    for (const { pattern: tokenPattern, label } of TOKEN_MAP) {
      const m = remaining.match(tokenPattern);
      if (m) {
        explanations.push(`\`${m[0]}\` → ${label}`);
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const char = remaining[0];
      if (char !== undefined) {
        explanations.push(`\`${char}\` → caracter literal "${char}"`);
        remaining = remaining.slice(1);
      } else {
        break;
      }
    }
  }

  if (remaining.length > 0) {
    explanations.push(`… (mais ${remaining.length} caracteres)`);
  }

  return explanations;
}

// ─── Cheat Sheet Data ─────────────────────────────────────────────────────────

const CHEAT_SHEET = [
  {
    category: "Âncoras",
    items: [
      { token: "^", desc: "Início de linha/string" },
      { token: "$", desc: "Fim de linha/string" },
      { token: "\\b", desc: "Fronteira de palavra" },
      { token: "\\B", desc: "Não-fronteira de palavra" },
    ],
  },
  {
    category: "Classes de Caracteres",
    items: [
      { token: "\\d", desc: "Dígito [0-9]" },
      { token: "\\D", desc: "Não-dígito" },
      { token: "\\w", desc: "Alfanumérico + _" },
      { token: "\\W", desc: "Não-alfanumérico" },
      { token: "\\s", desc: "Espaço, tab, nova linha" },
      { token: "\\S", desc: "Não-espaço" },
      { token: ".", desc: "Qualquer caracter" },
    ],
  },
  {
    category: "Quantificadores",
    items: [
      { token: "*", desc: "0 ou mais (greedy)" },
      { token: "+", desc: "1 ou mais (greedy)" },
      { token: "?", desc: "0 ou 1 (opcional)" },
      { token: "{n}", desc: "Exatamente n vezes" },
      { token: "{n,}", desc: "n ou mais vezes" },
      { token: "{n,m}", desc: "Entre n e m vezes" },
      { token: "*?", desc: "0 ou mais (lazy)" },
      { token: "+?", desc: "1 ou mais (lazy)" },
    ],
  },
  {
    category: "Grupos",
    items: [
      { token: "(abc)", desc: "Grupo de captura" },
      { token: "(?:abc)", desc: "Grupo sem captura" },
      { token: "(?<name>abc)", desc: "Grupo nomeado" },
      { token: "a|b", desc: "Alternativa (a ou b)" },
    ],
  },
  {
    category: "Lookahead / Lookbehind",
    items: [
      { token: "(?=abc)", desc: "Seguido de abc" },
      { token: "(?!abc)", desc: "Não seguido de abc" },
      { token: "(?<=abc)", desc: "Precedido de abc" },
      { token: "(?<!abc)", desc: "Não precedido de abc" },
    ],
  },
  {
    category: "Flags",
    items: [
      { token: "g", desc: "Global — encontra todos os matches" },
      { token: "i", desc: "Case-insensitive" },
      { token: "m", desc: "Multiline — ^ e $ por linha" },
      { token: "s", desc: "Dotall — . inclui nova linha" },
    ],
  },
];

// ─── Highlight Logic ──────────────────────────────────────────────────────────

interface Segment {
  text: string;
  isMatch: boolean;
  matchIndex: number;
}

function buildSegments(text: string, matches: MatchResult[]): Segment[] {
  if (matches.length === 0) return [{ text, isMatch: false, matchIndex: -1 }];

  const segments: Segment[] = [];
  let cursor = 0;

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    if (m.start > cursor) {
      segments.push({
        text: text.slice(cursor, m.start),
        isMatch: false,
        matchIndex: -1,
      });
    }
    if (m.start >= cursor) {
      segments.push({
        text: text.slice(m.start, m.end),
        isMatch: true,
        matchIndex: i,
      });
      cursor = m.end;
    }
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), isMatch: false, matchIndex: -1 });
  }

  return segments;
}

// ─── Match Colors ─────────────────────────────────────────────────────────────

const MATCH_COLORS = [
  { bg: "rgba(243,139,168,0.35)", border: "#f38ba8" },
  { bg: "rgba(166,227,161,0.35)", border: "#a6e3a1" },
  { bg: "rgba(137,180,250,0.35)", border: "#89b4fa" },
  { bg: "rgba(250,179,135,0.35)", border: "#fab387" },
  { bg: "rgba(203,166,247,0.35)", border: "#cba6f7" },
  { bg: "rgba(249,226,175,0.35)", border: "#f9e2af" },
  { bg: "rgba(148,226,213,0.35)", border: "#94e2d5" },
];

function getMatchColor(index: number) {
  return MATCH_COLORS[index % MATCH_COLORS.length];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    g: true,
    i: false,
    m: false,
    s: false,
  });
  const [testString, setTestString] = useState(
    "Escreve o teu texto aqui para testar a expressão regular.\nPode usar múltiplas linhas!"
  );
  const [replaceWith, setReplaceWith] = useState("");
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [hoveredMatch, setHoveredMatch] = useState<number | null>(null);

  const patternInputRef = useRef<HTMLInputElement>(null);

  // ─── Active flags string ────────────────────────────────────────────────────
  const flagString = useMemo(
    () => Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join(""),
    [flags]
  );

  // ─── Regex compilation ──────────────────────────────────────────────────────
  const { regex, error } = useMemo(() => {
    if (!pattern) return { regex: null, error: null };
    try {
      const r = new RegExp(pattern, flagString);
      return { regex: r, error: null };
    } catch (e) {
      return { regex: null, error: (e as Error).message };
    }
  }, [pattern, flagString]);

  // ─── Matches ────────────────────────────────────────────────────────────────
  const matches: MatchResult[] = useMemo(() => {
    if (!regex || !testString) return [];
    const results: MatchResult[] = [];
    const safeFlags = flagString.includes("g") ? flagString : flagString + "g";
    let r: RegExp;
    try {
      r = new RegExp(pattern, safeFlags);
    } catch {
      return [];
    }

    let m: RegExpExecArray | null;
    let guard = 0;
    while ((m = r.exec(testString)) !== null && guard < 1000) {
      guard++;
      results.push({
        index: results.length,
        value: m[0],
        groups: m.groups ?? null,
        captureGroups: Array.from(m).slice(1),
        start: m.index,
        end: m.index + m[0].length,
      });
      if (!safeFlags.includes("g")) break;
      if (m[0].length === 0) r.lastIndex++;
    }
    return results;
  }, [regex, testString, pattern, flagString]);

  // ─── Segments for highlighting ──────────────────────────────────────────────
  const segments = useMemo(
    () => buildSegments(testString, matches),
    [testString, matches]
  );

  // ─── Replace preview ────────────────────────────────────────────────────────
  const replacePreview = useMemo(() => {
    if (!regex || !replaceWith && replaceWith !== "") return "";
    try {
      const r = new RegExp(
        pattern,
        flagString.includes("g") ? flagString : flagString + "g"
      );
      return testString.replace(r, replaceWith);
    } catch {
      return "";
    }
  }, [regex, testString, replaceWith, pattern, flagString]);

  // ─── Explanation ────────────────────────────────────────────────────────────
  const explanation = useMemo(
    () => (pattern ? explainRegex(pattern) : []),
    [pattern]
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handlePreset = useCallback((idx: number) => {
    const p = PRESETS[idx];
    setPattern(p.pattern);
    setTestString(p.sample);
    setActivePreset(idx);
    const newFlags: Record<string, boolean> = { g: false, i: false, m: false, s: false };
    for (const f of p.flags) {
      if (f in newFlags) newFlags[f] = true;
    }
    setFlags(newFlags);
    setReplaceWith("");
  }, []);

  const handleCopy = useCallback(() => {
    if (!pattern) return;
    const full = `/${pattern}/${flagString}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [pattern, flagString]);

  const toggleFlag = useCallback((f: string) => {
    setFlags((prev) => ({ ...prev, [f]: !prev[f] }));
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1e1e2e",
        color: "#cdd6f4",
        fontFamily:
          "'Inter', system-ui, -apple-system, sans-serif",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #313244",
          padding: "20px 24px 16px",
          background: "#181825",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 24 }}>🔍</span>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(18px, 3vw, 24px)",
                fontWeight: 700,
                color: "#cdd6f4",
              }}
            >
              Regex Tester
            </h1>
            {matches.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  background: "#a6e3a1",
                  color: "#1e1e2e",
                  borderRadius: 20,
                  padding: "2px 10px",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {matches.length} {matches.length === 1 ? "match" : "matches"}
              </motion.span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#6c7086" }}>
            Testa expressões regulares em tempo real com destaque de
            correspondências
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 16px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
          gap: 20,
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Regex Input */}
          <div
            style={{
              background: "#181825",
              border: `1px solid ${error ? "#f38ba8" : "#313244"}`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 8px",
                borderBottom: "1px solid #313244",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Expressão Regular
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {["g", "i", "m", "s"].map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFlag(f)}
                    style={{
                      background: flags[f] ? "#89b4fa" : "#313244",
                      color: flags[f] ? "#1e1e2e" : "#6c7086",
                      border: "none",
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "monospace",
                      transition: "all 0.15s",
                    }}
                    title={
                      f === "g" ? "Global — todos os matches" :
                      f === "i" ? "Case-insensitive" :
                      f === "m" ? "Multiline" :
                      "Dotall (. inclui nova linha)"
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  padding: "0 0 0 14px",
                  color: "#6c7086",
                  fontFamily: "monospace",
                  fontSize: 18,
                  userSelect: "none",
                }}
              >
                /
              </span>
              <input
                ref={patternInputRef}
                value={pattern}
                onChange={(e) => {
                  setPattern(e.target.value);
                  setActivePreset(null);
                }}
                placeholder="padrão regex aqui…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: error ? "#f38ba8" : "#cba6f7",
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                  fontSize: 15,
                  padding: "12px 4px",
                  caretColor: "#cba6f7",
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
              />
              <span
                style={{
                  padding: "0 4px",
                  color: "#6c7086",
                  fontFamily: "monospace",
                  fontSize: 18,
                }}
              >
                /{flagString}
              </span>
              <button
                onClick={handleCopy}
                disabled={!pattern}
                style={{
                  background: copied ? "#a6e3a1" : "#313244",
                  color: copied ? "#1e1e2e" : "#cdd6f4",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 12px",
                  margin: "6px 10px",
                  fontSize: 12,
                  cursor: pattern ? "pointer" : "not-allowed",
                  opacity: pattern ? 1 : 0.4,
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {copied ? "✓ Copiado" : "Copiar"}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    borderTop: "1px solid #f38ba8",
                    padding: "8px 14px",
                    background: "rgba(243,139,168,0.1)",
                    fontSize: 12,
                    color: "#f38ba8",
                    fontFamily: "monospace",
                  }}
                >
                  ✗ {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Test String */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 8px",
                borderBottom: "1px solid #313244",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Texto de Teste
              </span>
              {matches.length > 0 && (
                <span style={{ fontSize: 12, color: "#a6e3a1" }}>
                  {matches.length} correspondência{matches.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              rows={6}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#cdd6f4",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 13,
                padding: "12px 14px",
                resize: "vertical",
                boxSizing: "border-box",
                caretColor: "#cdd6f4",
                lineHeight: 1.6,
              }}
              spellCheck={false}
              placeholder="Escreve o texto a testar aqui…"
            />

            {/* Highlighted preview */}
            {matches.length > 0 && (
              <>
                <div style={{ borderTop: "1px solid #313244", padding: "6px 14px 4px" }}>
                  <span style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                    Visualização com Destaque
                  </span>
                </div>
                <div
                  style={{
                    padding: "10px 14px 12px",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    background: "#11111b",
                    margin: "0 0 0 0",
                  }}
                >
                  {segments.map((seg, i) => {
                    if (!seg.isMatch) {
                      return (
                        <span key={i} style={{ color: "#cdd6f4" }}>
                          {seg.text}
                        </span>
                      );
                    }
                    const color = getMatchColor(seg.matchIndex);
                    const isHovered = hoveredMatch === seg.matchIndex;
                    return (
                      <span
                        key={i}
                        onMouseEnter={() => setHoveredMatch(seg.matchIndex)}
                        onMouseLeave={() => setHoveredMatch(null)}
                        style={{
                          background: isHovered ? color.border + "55" : color.bg,
                          borderBottom: `2px solid ${color.border}`,
                          borderRadius: 3,
                          cursor: "pointer",
                          color: "#cdd6f4",
                          padding: "1px 0",
                          transition: "background 0.1s",
                        }}
                        title={`Match #${seg.matchIndex + 1}: "${seg.text}"`}
                      >
                        {seg.text}
                      </span>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Replace */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 8px",
                borderBottom: "1px solid #313244",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Substituição
              </span>
            </div>
            <div style={{ padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#6c7086", fontFamily: "monospace", fontSize: 13 }}>
                  Substituir por:
                </span>
                <input
                  value={replaceWith}
                  onChange={(e) => setReplaceWith(e.target.value)}
                  placeholder="$1, $2 para grupos…"
                  style={{
                    flex: 1,
                    background: "#11111b",
                    border: "1px solid #313244",
                    borderRadius: 6,
                    outline: "none",
                    color: "#fab387",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: 13,
                    padding: "6px 10px",
                    caretColor: "#fab387",
                  }}
                  spellCheck={false}
                />
              </div>
              {regex && replacePreview !== "" && (
                <div>
                  <div style={{ fontSize: 11, color: "#6c7086", marginBottom: 4 }}>
                    Preview:
                  </div>
                  <div
                    style={{
                      background: "#11111b",
                      border: "1px solid #313244",
                      borderRadius: 6,
                      padding: "8px 10px",
                      fontFamily: "monospace",
                      fontSize: 13,
                      color: "#fab387",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                      maxHeight: 120,
                      overflow: "auto",
                    }}
                  >
                    {replacePreview}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Regex Explanation */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setShowExplanation((p) => !p)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                color: "#cdd6f4",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Explicação do Padrão
              </span>
              <span style={{ color: "#6c7086", fontSize: 12 }}>
                {showExplanation ? "▲" : "▼"}
              </span>
            </button>
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      borderTop: "1px solid #313244",
                      padding: "10px 14px 12px",
                    }}
                  >
                    {!pattern ? (
                      <p style={{ margin: 0, color: "#6c7086", fontSize: 13, fontStyle: "italic" }}>
                        Escreve um padrão para ver a explicação…
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {explanation.map((line, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 8,
                              fontSize: 13,
                            }}
                          >
                            <span
                              style={{
                                background: "#313244",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontFamily: "monospace",
                                color: "#cba6f7",
                                fontSize: 12,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {line.split(" → ")[0].replace(/`/g, "")}
                            </span>
                            <span style={{ color: "#a6adc8" }}>
                              {line.split(" → ")[1]}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Presets */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 8px",
                borderBottom: "1px solid #313244",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Padrões Predefinidos
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 8,
                padding: "10px 14px 12px",
              }}
            >
              {PRESETS.map((p, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePreset(i)}
                  title={p.description}
                  style={{
                    background: activePreset === i ? "#313244" : "#11111b",
                    border: `1px solid ${activePreset === i ? "#89b4fa" : "#313244"}`,
                    borderRadius: 8,
                    padding: "8px 10px",
                    cursor: "pointer",
                    color: activePreset === i ? "#89b4fa" : "#a6adc8",
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: "left",
                    transition: "all 0.15s",
                    lineHeight: 1.3,
                  }}
                >
                  {p.label}
                  <div
                    style={{
                      fontSize: 10,
                      color: "#6c7086",
                      fontWeight: 400,
                      marginTop: 2,
                      whiteSpace: "normal",
                    }}
                  >
                    {p.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Match Results */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 8px",
                borderBottom: "1px solid #313244",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Resultados
              </span>
              {matches.length > 0 && (
                <span
                  style={{
                    background: "#a6e3a1",
                    color: "#1e1e2e",
                    borderRadius: 12,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {matches.length}
                </span>
              )}
            </div>

            <div
              style={{
                maxHeight: 320,
                overflow: "auto",
                padding: "8px 14px 12px",
              }}
            >
              {!pattern || error ? (
                <p style={{ margin: 0, color: "#6c7086", fontSize: 13, fontStyle: "italic", padding: "4px 0" }}>
                  {error
                    ? "Erro na expressão regular"
                    : "Insere um padrão para ver os resultados…"}
                </p>
              ) : matches.length === 0 ? (
                <p style={{ margin: 0, color: "#6c7086", fontSize: 13, fontStyle: "italic", padding: "4px 0" }}>
                  Nenhuma correspondência encontrada
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <AnimatePresence>
                    {matches.map((m, i) => {
                      const color = getMatchColor(i);
                      const isHovered = hoveredMatch === i;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onMouseEnter={() => setHoveredMatch(i)}
                          onMouseLeave={() => setHoveredMatch(null)}
                          style={{
                            background: isHovered ? color.bg : "#11111b",
                            border: `1px solid ${isHovered ? color.border : "#313244"}`,
                            borderLeft: `3px solid ${color.border}`,
                            borderRadius: 8,
                            padding: "8px 10px",
                            cursor: "default",
                            transition: "all 0.15s",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                color: "#6c7086",
                                background: "#1e1e2e",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontWeight: 600,
                              }}
                            >
                              #{i + 1}
                            </span>
                            <span
                              style={{
                                background: "#1e1e2e",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontSize: 10,
                                color: "#6c7086",
                              }}
                            >
                              pos {m.start}–{m.end}
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "monospace",
                              fontSize: 13,
                              color: "#cdd6f4",
                              wordBreak: "break-all",
                              background: "#1e1e2e",
                              borderRadius: 4,
                              padding: "4px 8px",
                              marginBottom: m.captureGroups.some(Boolean) ? 6 : 0,
                            }}
                          >
                            {m.value || <em style={{ color: "#6c7086" }}>(string vazia)</em>}
                          </div>
                          {m.captureGroups.filter((g) => g !== undefined).length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                marginTop: 4,
                              }}
                            >
                              {m.captureGroups.map(
                                (g, gi) =>
                                  g !== undefined && (
                                    <div
                                      key={gi}
                                      style={{
                                        display: "flex",
                                        gap: 6,
                                        alignItems: "center",
                                      }}
                                    >
                                      <span style={{ fontSize: 10, color: "#6c7086" }}>
                                        grupo {gi + 1}:
                                      </span>
                                      <span
                                        style={{
                                          fontFamily: "monospace",
                                          fontSize: 12,
                                          color: "#fab387",
                                          background: "#1e1e2e",
                                          borderRadius: 3,
                                          padding: "1px 5px",
                                        }}
                                      >
                                        {g ?? <em style={{ color: "#6c7086" }}>undefined</em>}
                                      </span>
                                    </div>
                                  )
                              )}
                              {m.groups &&
                                Object.entries(m.groups).map(([name, val]) => (
                                  <div
                                    key={name}
                                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                                  >
                                    <span style={{ fontSize: 10, color: "#6c7086" }}>
                                      {name}:
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "monospace",
                                        fontSize: 12,
                                        color: "#a6e3a1",
                                        background: "#1e1e2e",
                                        borderRadius: 3,
                                        padding: "1px 5px",
                                      }}
                                    >
                                      {val}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Cheat Sheet */}
          <div
            style={{
              background: "#181825",
              border: "1px solid #313244",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setShowCheatSheet((p) => !p)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                color: "#cdd6f4",
              }}
            >
              <span
                style={{ fontSize: 11, color: "#6c7086", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Cheat Sheet — Referência Rápida
              </span>
              <span style={{ color: "#6c7086", fontSize: 12 }}>
                {showCheatSheet ? "▲" : "▼"}
              </span>
            </button>

            <AnimatePresence>
              {showCheatSheet && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      borderTop: "1px solid #313244",
                      padding: "12px 14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {CHEAT_SHEET.map((section) => (
                      <div key={section.category}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#89b4fa",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginBottom: 8,
                          }}
                        >
                          {section.category}
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: 4,
                          }}
                        >
                          {section.items.map((item) => (
                            <div
                              key={item.token}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "4px 6px",
                                borderRadius: 5,
                                background: "#11111b",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: 12,
                                  color: "#cba6f7",
                                  background: "#313244",
                                  borderRadius: 4,
                                  padding: "1px 6px",
                                  minWidth: 40,
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.token}
                              </span>
                              <span style={{ fontSize: 12, color: "#a6adc8" }}>
                                {item.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
