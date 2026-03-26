"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Custom Markdown Parser — zero external dependencies
// ---------------------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseInline(text: string): string {
  // Images before links so ![...](...) is handled first
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]*)\)/g,
    (_m, alt, _src) =>
      `<span class="md-img-placeholder" title="${escapeHtml(alt)}">🖼 ${escapeHtml(alt) || "imagem"}</span>`
  );

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label, href) =>
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`
  );

  // Inline code (before bold/italic so backticks win)
  text = text.replace(
    /`([^`]+)`/g,
    (_m, code) => `<code>${escapeHtml(code)}</code>`
  );

  // Bold + italic (***text***)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Bold (**text**)
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic (*text*)
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

  return text;
}

function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block ```
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      html.push(
        `<pre><code${lang ? ` class="language-${escapeHtml(lang)}"` : ""}>${codeLines.join("\n")}</code></pre>`
      );
      i++;
      continue;
    }

    // Horizontal rule ---
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      html.push("<hr />");
      i++;
      continue;
    }

    // Headings
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) { html.push(`<h3>${parseInline(h3[1])}</h3>`); i++; continue; }
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) { html.push(`<h2>${parseInline(h2[1])}</h2>`); i++; continue; }
    const h1 = line.match(/^#\s+(.+)/);
    if (h1) { html.push(`<h1>${parseInline(h1[1])}</h1>`); i++; continue; }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(parseInline(lines[i].slice(2)));
        i++;
      }
      html.push(`<blockquote><p>${quoteLines.join("<br />")}</p></blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].slice(2))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // Blank line — paragraph break
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !lines[i].startsWith("> ") &&
      !/^[-*+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !lines[i].trimStart().startsWith("```") &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim())
    ) {
      paraLines.push(parseInline(lines[i]));
      i++;
    }
    if (paraLines.length > 0) {
      html.push(`<p>${paraLines.join("<br />")}</p>`);
    }
  }

  return html.join("\n");
}

// ---------------------------------------------------------------------------
// Sample content
// ---------------------------------------------------------------------------

const SAMPLE_MARKDOWN = `# Guia Completo de Markdown

Bem-vindo ao **Editor Markdown** da Descomplicai. Este editor converte *Markdown* em HTML em tempo real, sem bibliotecas externas.

---

## O que é Markdown?

Markdown é uma linguagem de marcação leve criada por **John Gruber** em 2004. O objetivo é simples: escrever texto *formatado* usando uma sintaxe fácil de ler e escrever.

> "A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions."
> — John Gruber

---

## Formatação de Texto

Podes usar **negrito**, *itálico* ou até ***negrito e itálico*** ao mesmo tempo.

Para código \`inline\` usa crases simples. É ideal para mencionar variáveis como \`const nome = "Descomplicai"\`.

---

## Listas

### Lista não ordenada

- Simplicidade acima de tudo
- Sem dependências externas
- Funciona no browser
- 100% estático

### Lista ordenada

1. Escreves o Markdown
2. O editor converte em tempo real
3. Copias o HTML ou descarregas o ficheiro
4. Partilhas com o mundo

---

## Blocos de Código

\`\`\`javascript
// Função para saudar utilizadores
function saudar(nome) {
  const hora = new Date().getHours();
  if (hora < 12) return \`Bom dia, \${nome}!\`;
  if (hora < 18) return \`Boa tarde, \${nome}!\`;
  return \`Boa noite, \${nome}!\`;
}

console.log(saudar("Descomplicai"));
\`\`\`

\`\`\`css
/* Estilos básicos */
body {
  font-family: 'Inter', sans-serif;
  color: #1a1a2e;
  line-height: 1.6;
}
\`\`\`

---

## Links e Imagens

Visita o site [Descomplicai](https://descomplicai.pt) para mais ferramentas gratuitas.

![Logo Descomplicai](https://descomplicai.pt/logo.png)

---

## Regra Horizontal

Usa três ou mais hifens para criar uma linha divisória:

---

## Sumário

Este editor suporta todos os elementos essenciais do Markdown:

- Títulos H1, H2 e H3
- **Negrito**, *itálico* e ***ambos***
- \`Código inline\` e blocos de código
- Listas ordenadas e não ordenadas
- [Links](https://descomplicai.pt) e imagens
- Citações em bloco
- Linhas horizontais

Feito com 💚 pela Descomplicai.
`;

// ---------------------------------------------------------------------------
// Toolbar button definitions
// ---------------------------------------------------------------------------

type ToolbarAction = {
  label: string;
  title: string;
  wrap?: [string, string];
  wrap_line?: string;
  block?: string;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: "B", title: "Negrito", wrap: ["**", "**"] },
  { label: "I", title: "Itálico", wrap: ["*", "*"] },
  { label: "H1", title: "Título 1", wrap_line: "# " },
  { label: "H2", title: "Título 2", wrap_line: "## " },
  { label: "H3", title: "Título 3", wrap_line: "### " },
  { label: "🔗", title: "Link", wrap: ["[", "](url)"] },
  { label: "</>", title: "Código Inline", wrap: ["`", "`"] },
  { label: "```", title: "Bloco de Código", block: "```\n\n```" },
  { label: "—", title: "Linha Horizontal", block: "\n---\n" },
  { label: "≡", title: "Lista", wrap_line: "- " },
  { label: "1.", title: "Lista Numerada", wrap_line: "1. " },
  { label: "❝", title: "Citação", wrap_line: "> " },
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type ViewMode = "split" | "preview";

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [copied, setCopied] = useState<"md" | "html" | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const parsedHtml = parseMarkdown(markdown);

  const wordCount = markdown
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const charCount = markdown.length;

  // -------------------------------------------------------------------------
  // Toolbar insertion
  // -------------------------------------------------------------------------

  const insertAtCursor = useCallback((action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.slice(start, end);
    const before = ta.value.slice(0, start);
    const after = ta.value.slice(end);

    let newText = ta.value;
    let newCursorStart = start;
    let newCursorEnd = end;

    if (action.wrap) {
      const [open, close] = action.wrap;
      if (selected) {
        newText = before + open + selected + close + after;
        newCursorStart = start + open.length;
        newCursorEnd = end + open.length;
      } else {
        newText = before + open + close + after;
        newCursorStart = start + open.length;
        newCursorEnd = start + open.length;
      }
    } else if (action.wrap_line) {
      const prefix = action.wrap_line;
      // Insert prefix at start of current line
      const lineStart = before.lastIndexOf("\n") + 1;
      const beforeLine = ta.value.slice(0, lineStart);
      const restOfLine = ta.value.slice(lineStart);
      newText = beforeLine + prefix + restOfLine;
      newCursorStart = start + prefix.length;
      newCursorEnd = end + prefix.length;
    } else if (action.block) {
      newText = before + action.block + after;
      const insertLen = action.block.indexOf("\n") + 1;
      newCursorStart = start + insertLen;
      newCursorEnd = start + insertLen;
    }

    setMarkdown(newText);

    // Restore focus and selection after state update
    requestAnimationFrame(() => {
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(newCursorStart, newCursorEnd);
    });
  }, []);

  // -------------------------------------------------------------------------
  // Copy helpers
  // -------------------------------------------------------------------------

  const copyMarkdown = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied("md");
    setTimeout(() => setCopied(null), 2000);
  }, [markdown]);

  const copyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(parsedHtml);
    setCopied("html");
    setTimeout(() => setCopied(null), 2000);
  }, [parsedHtml]);

  // -------------------------------------------------------------------------
  // Download
  // -------------------------------------------------------------------------

  const downloadMd = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documento.md";
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown]);

  // -------------------------------------------------------------------------
  // Keyboard shortcut: Tab inserts spaces
  // -------------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal =
          markdown.slice(0, start) + "  " + markdown.slice(end);
        setMarkdown(newVal);
        requestAnimationFrame(() => {
          ta.setSelectionRange(start + 2, start + 2);
        });
      }
    },
    [markdown]
  );

  // -------------------------------------------------------------------------
  // Styles (inline for full self-containment)
  // -------------------------------------------------------------------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f18",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------------------------ */}
      <header
        style={{
          background: "#16162a",
          borderBottom: "1px solid #2a2a45",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              background: "#14b8a6",
              color: "#fff",
              borderRadius: "6px",
              padding: "3px 8px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            MD
          </span>
          <span
            style={{
              color: "#cdd6f4",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            Editor Markdown
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "12px",
            color: "#6272a4",
          }}
        >
          <span>
            <strong style={{ color: "#14b8a6" }}>{wordCount}</strong> palavras
          </span>
          <span>
            <strong style={{ color: "#14b8a6" }}>{charCount}</strong> caracteres
          </span>
        </div>

        {/* View toggle */}
        <div
          style={{
            display: "flex",
            background: "#0f0f18",
            borderRadius: "8px",
            padding: "3px",
            gap: "2px",
          }}
        >
          {(["split", "preview"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: "5px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
                background: viewMode === mode ? "#14b8a6" : "transparent",
                color: viewMode === mode ? "#fff" : "#6272a4",
                transition: "all 0.15s",
              }}
            >
              {mode === "split" ? "Dividido" : "Pré-visualização"}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "6px" }}>
          <ActionButton
            onClick={copyMarkdown}
            active={copied === "md"}
            label={copied === "md" ? "Copiado!" : "Copiar MD"}
          />
          <ActionButton
            onClick={copyHtml}
            active={copied === "html"}
            label={copied === "html" ? "Copiado!" : "Copiar HTML"}
          />
          <ActionButton onClick={downloadMd} label="⬇ .md" />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Toolbar */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          background: "#1a1a30",
          borderBottom: "1px solid #2a2a45",
          padding: "8px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.title}
            title={action.title}
            onClick={() => insertAtCursor(action)}
            style={{
              background: "transparent",
              border: "1px solid #2a2a45",
              borderRadius: "5px",
              color: "#cdd6f4",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              padding: "4px 10px",
              minWidth: "34px",
              transition: "all 0.12s",
              fontFamily: "monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#14b8a620";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#14b8a6";
              (e.currentTarget as HTMLButtonElement).style.color = "#14b8a6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#2a2a45";
              (e.currentTarget as HTMLButtonElement).style.color = "#cdd6f4";
            }}
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main panes */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Editor pane */}
        <AnimatePresence initial={false}>
          {viewMode === "split" && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #2a2a45",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  padding: "6px 16px",
                  background: "#16162a",
                  borderBottom: "1px solid #2a2a45",
                  fontSize: "11px",
                  color: "#6272a4",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                Editor
              </div>
              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{
                  flex: 1,
                  background: "#1e1e2e",
                  color: "#cdd6f4",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  padding: "20px 24px",
                  fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace",
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                  tabSize: 2,
                  overflowY: "auto",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview pane */}
        <motion.div
          key="preview"
          layout
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            background: "#fff",
          }}
        >
          <div
            style={{
              padding: "6px 16px",
              background: "#f8f8fb",
              borderBottom: "1px solid #e2e8f0",
              fontSize: "11px",
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Pré-visualização
          </div>
          <div
            className="md-preview"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "32px 40px",
            }}
          />
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Preview typography + image placeholder styles */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        .md-preview {
          color: #1e293b;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 16px;
          line-height: 1.75;
          max-width: 720px;
        }
        .md-preview h1 {
          font-size: 2em;
          font-weight: 700;
          color: #0f172a;
          margin: 1.2em 0 0.5em;
          line-height: 1.25;
          border-bottom: 2px solid #14b8a620;
          padding-bottom: 0.3em;
        }
        .md-preview h2 {
          font-size: 1.45em;
          font-weight: 700;
          color: #1e293b;
          margin: 1.2em 0 0.5em;
          line-height: 1.3;
        }
        .md-preview h3 {
          font-size: 1.15em;
          font-weight: 700;
          color: #334155;
          margin: 1.1em 0 0.4em;
        }
        .md-preview p {
          margin: 0.75em 0;
        }
        .md-preview strong {
          font-weight: 700;
          color: #0f172a;
        }
        .md-preview em {
          font-style: italic;
          color: #334155;
        }
        .md-preview a {
          color: #14b8a6;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .md-preview a:hover {
          color: #0d9488;
        }
        .md-preview code {
          background: #f1f5f9;
          color: #0f766e;
          border-radius: 4px;
          padding: 1px 6px;
          font-family: 'Fira Code', 'JetBrains Mono', monospace;
          font-size: 0.875em;
          border: 1px solid #e2e8f0;
        }
        .md-preview pre {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 18px 22px;
          overflow-x: auto;
          margin: 1.2em 0;
          border: 1px solid #1e293b;
        }
        .md-preview pre code {
          background: transparent;
          color: #e2e8f0;
          border: none;
          padding: 0;
          font-size: 0.85em;
          line-height: 1.6;
        }
        .md-preview ul, .md-preview ol {
          padding-left: 1.6em;
          margin: 0.75em 0;
        }
        .md-preview li {
          margin: 0.3em 0;
        }
        .md-preview ul li::marker {
          color: #14b8a6;
        }
        .md-preview ol li::marker {
          color: #14b8a6;
          font-weight: 600;
        }
        .md-preview blockquote {
          border-left: 4px solid #14b8a6;
          margin: 1.2em 0;
          padding: 10px 20px;
          background: #f0fdfa;
          border-radius: 0 6px 6px 0;
          color: #334155;
          font-style: italic;
        }
        .md-preview blockquote p {
          margin: 0;
        }
        .md-preview hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 2em 0;
        }
        .md-img-placeholder {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdfa;
          border: 1.5px dashed #14b8a6;
          color: #0d9488;
          border-radius: 6px;
          padding: 6px 14px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.875em;
          font-style: normal;
        }

        /* Responsive: stack on mobile */
        @media (max-width: 640px) {
          .md-split-container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small helper component
// ---------------------------------------------------------------------------

function ActionButton({
  onClick,
  label,
  active = false,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: "6px",
        border: active ? "1px solid #14b8a6" : "1px solid #2a2a45",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: 500,
        background: active ? "#14b8a620" : "transparent",
        color: active ? "#14b8a6" : "#8892b0",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
