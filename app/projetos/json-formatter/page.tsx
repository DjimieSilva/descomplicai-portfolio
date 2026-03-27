"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type IndentStyle = "2" | "4" | "tab";
type Theme = "dark" | "light";

interface JsonStats {
  keys: number;
  depth: number;
  arrays: number;
  objects: number;
  size: number;
}

interface ValidationError {
  message: string;
  line?: number;
}

// ─── Sample Presets ───────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  simple: JSON.stringify(
    {
      name: "João Silva",
      age: 28,
      active: true,
      score: null,
      tags: ["developer", "designer"],
    },
    null,
    2
  ),
  nested: JSON.stringify(
    {
      company: "Descomplicai",
      founded: 2023,
      team: [
        { id: 1, name: "Ana Costa", role: "CEO", skills: ["strategy", "design"] },
        { id: 2, name: "Bruno Matos", role: "Dev", skills: ["react", "node"] },
      ],
      offices: {
        main: { city: "Coimbra", country: "Portugal" },
        remote: true,
      },
    },
    null,
    2
  ),
  api: JSON.stringify(
    {
      status: 200,
      message: "OK",
      data: {
        users: [
          {
            id: "u_001",
            username: "joao_dev",
            email: "joao@exemplo.pt",
            profile: {
              avatar: "https://api.exemplo.pt/avatars/001.jpg",
              bio: "Full-stack developer",
              location: "Porto, Portugal",
              verified: true,
            },
            stats: { posts: 142, followers: 3820, following: 215 },
            createdAt: "2023-01-15T09:30:00Z",
          },
          {
            id: "u_002",
            username: "maria_ux",
            email: "maria@exemplo.pt",
            profile: {
              avatar: null,
              bio: "UX/UI Designer",
              location: "Lisboa, Portugal",
              verified: false,
            },
            stats: { posts: 87, followers: 1240, following: 380 },
            createdAt: "2023-03-22T14:15:00Z",
          },
        ],
        pagination: { page: 1, perPage: 10, total: 2, totalPages: 1 },
        meta: { requestId: "req_abc123", duration: 42, cached: false },
      },
    },
    null,
    2
  ),
};

// ─── Utility Functions ────────────────────────────────────────────────────────

function getIndent(style: IndentStyle): string | number {
  if (style === "tab") return "\t";
  return parseInt(style, 10);
}

function computeStats(obj: unknown, depth = 0): JsonStats {
  let keys = 0;
  let maxDepth = depth;
  let arrays = 0;
  let objects = 0;

  if (Array.isArray(obj)) {
    arrays++;
    for (const item of obj) {
      const sub = computeStats(item, depth + 1);
      keys += sub.keys;
      arrays += sub.arrays;
      objects += sub.objects;
      if (sub.depth > maxDepth) maxDepth = sub.depth;
    }
  } else if (obj !== null && typeof obj === "object") {
    objects++;
    const entries = Object.entries(obj as Record<string, unknown>);
    keys += entries.length;
    for (const [, v] of entries) {
      const sub = computeStats(v, depth + 1);
      keys += sub.keys;
      arrays += sub.arrays;
      objects += sub.objects;
      if (sub.depth > maxDepth) maxDepth = sub.depth;
    }
  }

  return { keys, depth: maxDepth, arrays, objects, size: 0 };
}

function parseJsonSafe(text: string): {
  parsed: unknown;
  error: ValidationError | null;
} {
  if (!text.trim()) return { parsed: null, error: null };
  try {
    return { parsed: JSON.parse(text), error: null };
  } catch (e) {
    const msg = (e as SyntaxError).message;
    const lineMatch = msg.match(/line (\d+)/);
    const line = lineMatch ? parseInt(lineMatch[1]) : undefined;
    return { parsed: null, error: { message: msg, line } };
  }
}

function getJsonPath(path: (string | number)[]): string {
  if (path.length === 0) return "$";
  return (
    "$" +
    path
      .map((p) =>
        typeof p === "number" ? `[${p}]` : /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p) ? `.${p}` : `["${p}"]`
      )
      .join("")
  );
}

function searchInJson(obj: unknown, query: string, path: (string | number)[] = []): string[] {
  const results: string[] = [];
  if (!query) return results;
  const q = query.toLowerCase();

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...searchInJson(item, query, [...path, i]));
    });
  } else if (obj !== null && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (k.toLowerCase().includes(q)) results.push(getJsonPath([...path, k]));
      results.push(...searchInJson(v, query, [...path, k]));
    }
  } else {
    const strVal = String(obj ?? "null").toLowerCase();
    if (strVal.includes(q)) results.push(getJsonPath(path));
  }

  return [...new Set(results)];
}

// ─── Tree Node Component ──────────────────────────────────────────────────────

interface TreeNodeProps {
  keyName?: string | number;
  value: unknown;
  path: (string | number)[];
  depth: number;
  searchPaths: string[];
  theme: Theme;
  onHover: (path: string | null) => void;
}

function TreeNode({ keyName, value, path, depth, searchPaths, theme, onHover }: TreeNodeProps) {
  const [collapsed, setCollapsed] = useState(depth > 2);
  const currentPath = keyName !== undefined ? [...path, keyName] : path;
  const jsonPath = getJsonPath(currentPath);
  const isSearchMatch = searchPaths.includes(jsonPath);

  const T = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const isArray = Array.isArray(value);
  const isObject = !isArray && value !== null && typeof value === "object";
  const isCollapsible = isArray || isObject;
  const childCount = isCollapsible
    ? isArray
      ? (value as unknown[]).length
      : Object.keys(value as object).length
    : 0;

  const renderKey = () =>
    keyName !== undefined ? (
      <span style={{ color: T.key }}>
        {typeof keyName === "number" ? (
          <span style={{ color: T.number }}>{keyName}</span>
        ) : (
          `"${keyName}"`
        )}
        <span style={{ color: T.punctuation }}>: </span>
      </span>
    ) : null;

  const renderPrimitive = () => {
    if (value === null) return <span style={{ color: T.null }}>null</span>;
    if (typeof value === "boolean")
      return <span style={{ color: T.boolean }}>{String(value)}</span>;
    if (typeof value === "number")
      return <span style={{ color: T.number }}>{value}</span>;
    if (typeof value === "string")
      return <span style={{ color: T.string }}>{`"${value}"`}</span>;
    return <span style={{ color: T.punctuation }}>{String(value)}</span>;
  };

  const entries = isObject
    ? Object.entries(value as Record<string, unknown>)
    : isArray
    ? (value as unknown[]).map((v, i) => [i, v] as [number, unknown])
    : [];

  return (
    <div
      style={{
        paddingLeft: depth > 0 ? "1.25rem" : 0,
        borderLeft: depth > 0 ? `1px solid ${T.indent}` : "none",
        marginLeft: depth > 0 ? "0.25rem" : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.25rem",
          padding: "1px 4px",
          borderRadius: "3px",
          cursor: isCollapsible ? "pointer" : "default",
          background: isSearchMatch ? T.searchHighlight : "transparent",
          transition: "background 0.15s",
        }}
        onMouseEnter={() => onHover(jsonPath)}
        onMouseLeave={() => onHover(null)}
        onClick={isCollapsible ? () => setCollapsed((c) => !c) : undefined}
      >
        {isCollapsible && (
          <motion.span
            animate={{ rotate: collapsed ? -90 : 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "inline-block",
              color: T.chevron,
              fontSize: "0.75rem",
              lineHeight: "1.6",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            ▾
          </motion.span>
        )}
        {!isCollapsible && <span style={{ width: "0.85rem", flexShrink: 0 }} />}

        <span style={{ fontFamily: "inherit", lineHeight: "1.6" }}>
          {renderKey()}
          {isCollapsible ? (
            <>
              <span style={{ color: T.bracket }}>{isArray ? "[" : "{"}</span>
              {collapsed && (
                <span style={{ color: T.collapsed }}>
                  {" "}
                  {childCount} {childCount === 1 ? "item" : "items"}{" "}
                </span>
              )}
              {collapsed && (
                <span style={{ color: T.bracket }}>{isArray ? "]" : "}"}</span>
              )}
            </>
          ) : (
            renderPrimitive()
          )}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isCollapsible && !collapsed && (
          <motion.div
            key="children"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            style={{ overflow: "hidden" }}
          >
            {(entries as [string | number, unknown][]).map(([k, v]) => (
              <TreeNode
                key={String(k)}
                keyName={k}
                value={v}
                path={currentPath}
                depth={depth + 1}
                searchPaths={searchPaths}
                theme={theme}
                onHover={onHover}
              />
            ))}
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: T.bracket }}>{isArray ? "]" : "}"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Syntax Highlighted Output ────────────────────────────────────────────────

function SyntaxHighlight({
  json,
  theme,
  search,
}: {
  json: string;
  theme: Theme;
  search: string;
}) {
  const T = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const highlighted = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let color = T.number;
      let extraStyle = "";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          color = T.key;
          const keyText = match.slice(0, -1);
          return `<span style="color:${color}">${escHtml(keyText)}</span><span style="color:${T.punctuation}">:</span>`;
        } else {
          color = T.string;
        }
      } else if (/true|false/.test(match)) {
        color = T.boolean;
      } else if (/null/.test(match)) {
        color = T.null;
      }

      const escaped = escHtml(match);
      const highlighted =
        search && match.toLowerCase().includes(search.toLowerCase())
          ? `<mark style="background:${T.searchHighlight};color:inherit;border-radius:2px">${escaped}</mark>`
          : escaped;

      return `<span style="color:${color}${extraStyle}">${highlighted}</span>`;
    }
  );

  const withBrackets = highlighted.replace(
    /([{}\[\],])/g,
    (m) => `<span style="color:${T.bracket}">${m}</span>`
  );

  return (
    <pre
      style={{
        margin: 0,
        fontFamily: "inherit",
        fontSize: "0.85rem",
        lineHeight: "1.65",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        color: T.text,
      }}
      dangerouslySetInnerHTML={{ __html: withBrackets }}
    />
  );
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Color Palettes ───────────────────────────────────────────────────────────

const DARK_COLORS = {
  bg: "#1e1e2e",
  surface: "#181825",
  surfaceAlt: "#1e1e2e",
  border: "#313244",
  text: "#cdd6f4",
  textMuted: "#6c7086",
  textDim: "#45475a",
  key: "#89dceb",
  string: "#a6e3a1",
  number: "#fab387",
  boolean: "#89b4fa",
  null: "#9399b2",
  bracket: "#cdd6f4",
  punctuation: "#6c7086",
  indent: "#313244",
  chevron: "#6c7086",
  collapsed: "#585b70",
  searchHighlight: "rgba(249,226,175,0.18)",
  errorBg: "rgba(243,139,168,0.1)",
  errorBorder: "#f38ba8",
  errorText: "#f38ba8",
  btnPrimary: "#89b4fa",
  btnPrimaryText: "#1e1e2e",
  btnSecondary: "#313244",
  btnSecondaryText: "#cdd6f4",
  inputBg: "#11111b",
  inputBorder: "#313244",
  inputFocus: "#89b4fa",
  statBg: "#181825",
  statBorder: "#313244",
};

const LIGHT_COLORS = {
  bg: "#f8f9fa",
  surface: "#ffffff",
  surfaceAlt: "#f1f3f5",
  border: "#dee2e6",
  text: "#212529",
  textMuted: "#6c757d",
  textDim: "#adb5bd",
  key: "#0077aa",
  string: "#22863a",
  number: "#e36209",
  boolean: "#005cc5",
  null: "#999999",
  bracket: "#212529",
  punctuation: "#6c757d",
  indent: "#dee2e6",
  chevron: "#6c757d",
  collapsed: "#adb5bd",
  searchHighlight: "rgba(255,220,0,0.35)",
  errorBg: "rgba(220,53,69,0.08)",
  errorBorder: "#dc3545",
  errorText: "#dc3545",
  btnPrimary: "#0d6efd",
  btnPrimaryText: "#ffffff",
  btnSecondary: "#e9ecef",
  btnSecondaryText: "#212529",
  inputBg: "#ffffff",
  inputBorder: "#ced4da",
  inputFocus: "#0d6efd",
  statBg: "#f8f9fa",
  statBorder: "#dee2e6",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JsonFormatter() {
  const [input, setInput] = useState(PRESETS.nested);
  const [indent, setIndent] = useState<IndentStyle>("2");
  const [viewMode, setViewMode] = useState<"formatted" | "tree">("formatted");
  const [theme, setTheme] = useState<Theme>("dark");
  const [search, setSearch] = useState("");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [copied, setCopied] = useState<"formatted" | "minified" | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const T = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const { parsed, error } = parseJsonSafe(input);

  const formatted = parsed !== null ? JSON.stringify(parsed, null, getIndent(indent)) : "";
  const minified = parsed !== null ? JSON.stringify(parsed) : "";

  const stats: JsonStats | null = parsed !== null
    ? { ...computeStats(parsed), size: new Blob([minified]).size }
    : null;

  const searchPaths = parsed !== null && search ? searchInJson(parsed, search) : [];

  const handleFormat = useCallback(() => {
    if (parsed !== null) setInput(formatted);
  }, [parsed, formatted]);

  const handleMinify = useCallback(() => {
    if (parsed !== null) setInput(minified);
  }, [parsed, minified]);

  const handleCopy = useCallback(
    async (type: "formatted" | "minified") => {
      const text = type === "formatted" ? formatted : minified;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    },
    [formatted, minified]
  );

  const handlePreset = useCallback((key: string) => {
    setInput(PRESETS[key]);
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.max(300, ta.scrollHeight) + "px";
  }, [input]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        fontSize: "14px",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: `1px solid ${T.border}`,
          background: T.surface,
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: T.key,
              letterSpacing: "-0.03em",
            }}
          >
            {"{ }"}
          </span>
          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>JSON Formatter</span>
          <span
            style={{
              fontSize: "0.7rem",
              color: T.textMuted,
              background: T.surfaceAlt,
              border: `1px solid ${T.border}`,
              borderRadius: "4px",
              padding: "1px 6px",
            }}
          >
            Descomplicai
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Presets */}
          {(["simple", "nested", "api"] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePreset(p)}
              style={btnStyle(T, "secondary")}
            >
              {p === "simple" ? "Simple" : p === "nested" ? "Nested" : "API"}
            </button>
          ))}

          <div style={{ width: "1px", height: "1.2rem", background: T.border }} />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            style={btnStyle(T, "secondary")}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "1rem" }}>
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "0.75rem",
            alignItems: "center",
          }}
        >
          {/* Indent */}
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value as IndentStyle)}
            style={{
              ...selectStyle(T),
              minWidth: "7rem",
            }}
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tabs</option>
          </select>

          {/* View mode */}
          <div
            style={{
              display: "flex",
              border: `1px solid ${T.border}`,
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            {(["formatted", "tree"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.78rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: viewMode === mode ? T.btnPrimary : T.surface,
                  color: viewMode === mode ? T.btnPrimaryText : T.text,
                  transition: "all 0.15s",
                }}
              >
                {mode === "formatted" ? "Formatted" : "Tree"}
              </button>
            ))}
          </div>

          <button onClick={handleFormat} style={btnStyle(T, "primary")} disabled={!parsed}>
            Beautify
          </button>
          <button onClick={handleMinify} style={btnStyle(T, "secondary")} disabled={!parsed}>
            Minify
          </button>
          <button
            onClick={() => handleCopy("formatted")}
            style={btnStyle(T, "secondary")}
            disabled={!formatted}
          >
            {copied === "formatted" ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => handleCopy("minified")}
            style={btnStyle(T, "secondary")}
            disabled={!minified}
          >
            {copied === "minified" ? "Copied!" : "Copy Min"}
          </button>
          <button onClick={handleClear} style={btnStyle(T, "secondary")}>
            Clear
          </button>

          <div style={{ flex: 1, minWidth: "8rem" }}>
            <input
              type="text"
              placeholder="Search keys/values…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                ...inputStyle(T),
                width: "100%",
                padding: "0.35rem 0.6rem",
                fontSize: "0.8rem",
              }}
            />
          </div>

          {search && searchPaths.length > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                color: T.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              {searchPaths.length} match{searchPaths.length !== 1 ? "es" : ""}
            </span>
          )}
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            alignItems: "start",
          }}
          className="json-grid"
        >
          {/* Input Panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "0.72rem", color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Input
              </span>
              {error && (
                <span style={{ fontSize: "0.72rem", color: T.errorText }}>
                  Error{error.line ? ` on line ${error.line}` : ""}
                </span>
              )}
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON here…"
              spellCheck={false}
              style={{
                ...inputStyle(T),
                width: "100%",
                resize: "vertical",
                minHeight: "340px",
                padding: "0.85rem",
                fontSize: "0.83rem",
                lineHeight: "1.65",
                border: error
                  ? `1px solid ${T.errorBorder}`
                  : `1px solid ${T.inputBorder}`,
                background: error ? T.errorBg : T.inputBg,
                boxSizing: "border-box",
                tabSize: 2,
              }}
            />

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{
                    background: T.errorBg,
                    border: `1px solid ${T.errorBorder}`,
                    borderRadius: "6px",
                    padding: "0.6rem 0.8rem",
                    fontSize: "0.78rem",
                    color: T.errorText,
                    lineHeight: "1.5",
                  }}
                >
                  <strong>Invalid JSON</strong>
                  {error.line && <span style={{ marginLeft: "0.5rem", opacity: 0.75 }}>Line {error.line}</span>}
                  <br />
                  <span style={{ opacity: 0.85 }}>{error.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            {stats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "0.4rem",
                }}
              >
                {[
                  { label: "Keys", value: stats.keys },
                  { label: "Depth", value: stats.depth },
                  { label: "Arrays", value: stats.arrays },
                  { label: "Objects", value: stats.objects },
                  { label: "Size", value: formatSize(stats.size) },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      background: T.statBg,
                      border: `1px solid ${T.statBorder}`,
                      borderRadius: "6px",
                      padding: "0.4rem 0.5rem",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.key }}>
                      {value}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Output Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "0.72rem", color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {viewMode === "formatted" ? "Output" : "Tree View"}
              </span>
              {hoveredPath && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    fontSize: "0.72rem",
                    color: T.key,
                    background: T.surfaceAlt,
                    border: `1px solid ${T.border}`,
                    borderRadius: "4px",
                    padding: "1px 6px",
                    maxWidth: "20rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {hoveredPath}
                </motion.span>
              )}
            </div>

            <div
              style={{
                background: T.inputBg,
                border: `1px solid ${T.inputBorder}`,
                borderRadius: "8px",
                padding: "0.85rem",
                minHeight: "340px",
                overflowX: "auto",
                position: "relative",
              }}
            >
              {!input.trim() ? (
                <div
                  style={{
                    color: T.textDim,
                    fontSize: "0.83rem",
                    marginTop: "2rem",
                    textAlign: "center",
                  }}
                >
                  Output will appear here
                </div>
              ) : error ? (
                <div style={{ color: T.errorText, fontSize: "0.83rem" }}>
                  Fix the JSON to see output
                </div>
              ) : viewMode === "formatted" ? (
                <SyntaxHighlight json={formatted} theme={theme} search={search} />
              ) : (
                parsed !== null && (
                  <TreeNode
                    value={parsed}
                    path={[]}
                    depth={0}
                    searchPaths={searchPaths}
                    theme={theme}
                    onHover={setHoveredPath}
                  />
                )
              )}
            </div>

            {/* Search results list (tree mode) */}
            {viewMode === "tree" && search && searchPaths.length > 0 && (
              <div
                style={{
                  background: T.statBg,
                  border: `1px solid ${T.statBorder}`,
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  maxHeight: "10rem",
                  overflowY: "auto",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: T.textMuted, marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Matches
                </div>
                {searchPaths.map((p) => (
                  <div
                    key={p}
                    style={{ fontSize: "0.78rem", color: T.key, padding: "1px 0" }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive styles via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .json-grid {
            grid-template-columns: 1fr !important;
          }
        }
        textarea:focus {
          outline: none;
          border-color: ${T.inputFocus} !important;
          box-shadow: 0 0 0 2px ${T.inputFocus}33;
        }
        input:focus {
          outline: none;
          border-color: ${T.inputFocus} !important;
          box-shadow: 0 0 0 2px ${T.inputFocus}33;
        }
        select:focus {
          outline: none;
          border-color: ${T.inputFocus} !important;
        }
        * {
          box-sizing: border-box;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${T.surface};
        }
        ::-webkit-scrollbar-thumb {
          background: ${T.border};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${T.textDim};
        }
      `}</style>
    </div>
  );
}

// ─── Style Helpers ────────────────────────────────────────────────────────────

function btnStyle(T: typeof DARK_COLORS, variant: "primary" | "secondary") {
  const isPrimary = variant === "primary";
  return {
    padding: "0.35rem 0.7rem",
    fontSize: "0.78rem",
    fontFamily: "inherit",
    border: `1px solid ${isPrimary ? T.btnPrimary : T.border}`,
    borderRadius: "6px",
    cursor: "pointer",
    background: isPrimary ? T.btnPrimary : T.btnSecondary,
    color: isPrimary ? T.btnPrimaryText : T.btnSecondaryText,
    whiteSpace: "nowrap" as const,
    transition: "opacity 0.15s",
    opacity: 1,
  } as React.CSSProperties;
}

function inputStyle(T: typeof DARK_COLORS): React.CSSProperties {
  return {
    fontFamily: "inherit",
    fontSize: "0.83rem",
    background: T.inputBg,
    color: T.text,
    border: `1px solid ${T.inputBorder}`,
    borderRadius: "8px",
    transition: "border-color 0.15s",
  };
}

function selectStyle(T: typeof DARK_COLORS): React.CSSProperties {
  return {
    fontFamily: "inherit",
    fontSize: "0.78rem",
    background: T.btnSecondary,
    color: T.btnSecondaryText,
    border: `1px solid ${T.border}`,
    borderRadius: "6px",
    padding: "0.35rem 0.55rem",
    cursor: "pointer",
  };
}
