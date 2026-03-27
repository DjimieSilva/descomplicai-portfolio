"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// ─────────────────────────────────────────────
// KNOWLEDGE BASE — pure local, zero API
// ─────────────────────────────────────────────

const GREETINGS = [
  "Olá! Tudo bem? Sou o assistente simulado da **Descomplicai**. Como posso ajudar hoje?",
  "Oi! Que bom falar contigo! Em que posso ser útil?",
  "Bom dia! Estou aqui para ajudar. Sobre o que queres conversar?",
  "Olá, olá! Pronto para uma boa conversa. O que precisas?",
  "Ei! Que alegria receber a tua mensagem. Como posso ajudar?",
];

const ABOUT = [
  "Sou um **assistente simulado** criado pela Descomplicai. Funciono completamente offline — uso reconhecimento de padrões local, sem qualquer API de IA real. É um projeto de demonstração! Posso conversar sobre curiosidades, contar piadas ou responder perguntas sobre vários temas.",
  "Sou o **Chat IA Simulado** da Descomplicai. Não sou uma IA real — sou um sistema de correspondência de palavras-chave criado em JavaScript puro. Mas faço o meu melhor para ser útil! Experimenta perguntar sobre piadas, curiosidades ou pede ajuda.",
];

const WEATHER_RESPONSES = [
  "Sabia que **Portugal tem em média 300 dias de sol por ano** no sul do país? É um dos países mais ensolarados da Europa!",
  "Curiosidade meteorológica: o **vento Nortada** é um vento fresco que sopra ao longo da costa atlântica portuguesa nos meses de verão. Os surfistas adoram-no!",
  "Em termos de clima, **Sintra é um microclima único** — pode estar a chover na vila enquanto Lisboa, a 30km, tem sol pleno!",
  "O **Açores** tem um dos climas mais amenos do mundo, com temperaturas que raramente saem dos 14-24°C durante todo o ano.",
  "Curiosidade: a **Serra da Estrela** é o único local de Portugal Continental onde neva regularmente. A altitude máxima é 1993 metros!",
];

const JOKES = [
  "Porque é que o espantalho ganhou um prémio?\nPorque era **outstanding in his field**! (Destacado no seu campo) 😄",
  "— Pai, tenho fome!\n— Olá, Fome! Eu sou o Pai! 😂",
  "O que é que o zero disse ao oito?\n— **Bonito cinto!** 😄",
  "Porque é que os mergulhadores mergulham sempre para trás e nunca para a frente?\nPorque **se mergulhassem para a frente cairiam dentro do barco!** 😂",
  "O que é que o açúcar disse para o café?\n— **Mexe comigo!** 😄",
  "Porque é que o livro de matemática estava triste?\nPorque tinha **demasiados problemas!** 😂",
  "— Qual é o animal mais antigo?\n— A **zebra**, porque ainda está a preto e branco! 😄",
  "O que é que um peixe disse quando bateu na parede?\n— **Dam!** (Droga!) 😂",
  "Porque é que o computador foi ao médico?\nPorque tinha **vírus!** 😄",
  "O que acontece quando uma rã estaciona mal?\n— Recebe uma **multa de parque!** 😂",
];

const FACTS = [
  "**Portugal foi o primeiro país europeu** a abolir a pena de morte, em 1867.",
  "O **pastel de nata** foi inventado pelos monges do Mosteiro dos Jerónimos em Lisboa, no século XVIII.",
  "**Lisboa é mais antiga que Roma** — tem cerca de 3.000 anos de história comprovada.",
  "Portugal foi o **primeiro país a classificar o Wi-Fi** como um serviço básico (junto com água, eletricidade e gás).",
  "A **língua portuguesa** é falada por mais de 270 milhões de pessoas em todo o mundo — é a 5ª língua mais falada.",
  "O **Vinho do Porto** só pode ser produzido no Douro — é uma denominação de origem controlada desde 1756, tornando-se numa das primeiras do mundo.",
  "Portugal é o **maior produtor mundial de cortiça**, responsável por mais de 50% da produção global.",
  "O **Fado** foi reconhecido pela UNESCO como Património Cultural Imaterial da Humanidade em 2011.",
  "A **Torre de Belém** nunca foi uma prisão — foi sempre uma torre defensiva e símbolo do poder marítimo português.",
  "Os **Descobrimentos Portugueses** abriram mais de 80% das rotas marítimas ainda utilizadas hoje.",
  "Portugal tem **17 patrimónios mundiais** da UNESCO — dos mais por km² na Europa.",
  "A **sardinha assada** consumida na Festa de Santo António de Lisboa originou-se como prato dos pobres — peixe barato que se tornou símbolo cultural.",
  "O **Douro** é um dos vales vitícolas mais antigos do mundo, com vinhas plantadas há mais de 2.000 anos.",
  "Portugal foi o **último país da Europa Ocidental** a ter um regime colonial, tendo concedido independência às suas colónias em 1975.",
  "O **azulejo português** tem raízes mouriscas — a palavra vem do árabe *az-zulayj* que significa \"pedra polida\".",
];

const HELP_RESPONSE = `Podes falar comigo sobre vários temas! Aqui estão algumas sugestões:

**Saudações**
Experimenta: "olá", "oi", "bom dia"

**Sobre mim**
Experimenta: "quem és?", "o que fazes?"

**Meteorologia**
Experimenta: "fala-me do tempo", "curiosidade sobre clima"

**Piadas**
Experimenta: "conta uma piada", "diz uma anedota"

**Curiosidades**
Experimenta: "diz-me um facto", "tens uma curiosidade?"

**Ajuda**
Experimenta: "ajuda", "help", "o que podes fazer?"

Estou aqui para tornar a conversa mais divertida! 😊`;

const DEFAULT_RESPONSES = [
  "Interessante! Conta-me mais sobre isso.",
  "Hmm, não tenho a certeza que entendi completamente. Podes reformular?",
  "Que tema fascinante! Infelizmente não tenho informação específica sobre isso, mas adoro a pergunta.",
  "Boa observação! Para já, o meu conhecimento está limitado a alguns tópicos. Tenta perguntar sobre curiosidades, piadas ou falar sobre o tempo!",
  "Ainda estou a aprender! Experimenta perguntar por uma piada ou uma curiosidade sobre Portugal.",
];

// ─────────────────────────────────────────────
// AI ENGINE — pattern matching, local only
// ─────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Greetings
  if (/\b(olá|ola|oi|bom\s?dia|boa\s?tarde|boa\s?noite|hey|hello|hi)\b/.test(lower)) {
    return pickRandom(GREETINGS);
  }

  // About
  if (/\b(quem\s+[eé]s|o\s+que\s+[eé]s|o\s+que\s+fazes|quem\s+[eé]\s+voc[eê]|descreve.te|apresenta.te)\b/.test(lower)) {
    return pickRandom(ABOUT);
  }

  // Weather
  if (/\b(tempo|clima|meteorolog|chuva|sol|temperatura|vento|neva|neve)\b/.test(lower)) {
    return pickRandom(WEATHER_RESPONSES);
  }

  // Jokes
  if (/\b(piada|anedota|rir|engraçad|engraçado|humor|conta.me|divert)\b/.test(lower)) {
    return pickRandom(JOKES);
  }

  // Facts / curiosities
  if (/\b(facto|fato|curiosidade|sabia|interessante|informa[çc][aã]o|diz.me algo|conta.me algo)\b/.test(lower)) {
    return pickRandom(FACTS);
  }

  // Help
  if (/\b(ajuda|help|o\s+que\s+podes|como\s+funciona|instru[çc][õo]es|comandos|temas)\b/.test(lower)) {
    return HELP_RESPONSE;
  }

  // Numbers / math (simple)
  if (/\b(\d+\s*[\+\-\*\/]\s*\d+)\b/.test(lower)) {
    try {
      const expr = lower.match(/(\d+\s*[\+\-\*\/]\s*\d+)/)?.[1];
      if (expr) {
        // safe eval-free math for simple 2-operand expressions
        const parts = expr.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
        if (parts) {
          const a = parseFloat(parts[1]);
          const op = parts[2];
          const b = parseFloat(parts[3]);
          let result: number;
          if (op === "+") result = a + b;
          else if (op === "-") result = a - b;
          else if (op === "*") result = a * b;
          else if (op === "/") result = b !== 0 ? a / b : NaN;
          else result = NaN;
          if (!isNaN(result)) {
            return `O resultado de **${expr.trim()}** é **${result}**! Posso ajudar com mais algum cálculo? 😊`;
          }
        }
      }
    } catch {
      // fall through to default
    }
  }

  // Portugal / history
  if (/\b(portugal|portugu[eê]s|portugu[eê]sa|lisboa|porto|fado|pastel|nata|vinho)\b/.test(lower)) {
    return pickRandom(FACTS);
  }

  // Thanks
  if (/\b(obrigad[ao]|valeu|thanks|thx|brigad[ao])\b/.test(lower)) {
    return "De nada! Fico feliz em poder ajudar. Tens mais alguma pergunta? 😊";
  }

  // Goodbye
  if (/\b(adeus|tchau|xau|até\s+logo|at[eé]\s+j[aá]|boa\s+noite|ciao|bye)\b/.test(lower)) {
    return "Até à próxima! Foi um prazer conversar contigo. 👋";
  }

  // Code request
  if (/\b(c[oó]digo|code|programa|script|fun[çc][aã]o|class|html|css|javascript|python)\b/.test(lower)) {
    return "Aqui vai um exemplo simples em JavaScript:\n\n```javascript\nfunction saudacao(nome) {\n  return `Olá, ${nome}! Bem-vindo à Descomplicai.`;\n}\n\nconsole.log(saudacao('Mundo'));\n// Output: Olá, Mundo! Bem-vindo à Descomplicai.\n```\n\nEstes são apenas exemplos simulados — não executo código real!";
  }

  return pickRandom(DEFAULT_RESPONSES);
}

// ─────────────────────────────────────────────
// MARKDOWN-LITE RENDERER
// ─────────────────────────────────────────────

function renderText(text: string): React.ReactNode[] {
  const blocks = text.split(/(```[\s\S]*?```)/g);
  return blocks.map((block, blockIdx) => {
    if (block.startsWith("```")) {
      const inner = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
      return (
        <pre
          key={blockIdx}
          className="code-block"
        >
          <code>{inner}</code>
        </pre>
      );
    }

    const lines = block.split("\n");
    return (
      <span key={blockIdx}>
        {lines.map((line, lineIdx) => {
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <span key={lineIdx}>
              {parts.map((part, partIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                }
                return <span key={partIdx}>{part}</span>;
              })}
              {lineIdx < lines.length - 1 && <br />}
            </span>
          );
        })}
      </span>
    );
  });
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
  });
}

function deriveTitle(messages: Message[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "Nova conversa";
  const t = first.text.trim().slice(0, 40);
  return t.length < first.text.trim().length ? t + "…" : t;
}

// ─────────────────────────────────────────────
// LOCALSTORAGE PERSISTENCE
// ─────────────────────────────────────────────

const LS_KEY = "descomplicai_chat_conversations";
const LS_THEME_KEY = "descomplicai_chat_dark";

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConversations(convs: Conversation[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(convs));
  } catch {
    // storage full — silently fail
  }
}

// ─────────────────────────────────────────────
// EXPORT UTILITY
// ─────────────────────────────────────────────

function exportConversation(conv: Conversation) {
  const lines = [
    `Chat IA Simulado — Descomplicai`,
    `Conversa: ${conv.title}`,
    `Data: ${new Date(conv.createdAt).toLocaleString("pt-PT")}`,
    `${"─".repeat(40)}`,
    "",
    ...conv.messages.map((m) => {
      const who = m.role === "user" ? "Você" : "IA";
      const time = formatTime(m.timestamp);
      return `[${time}] ${who}: ${m.text}`;
    }),
    "",
    `${"─".repeat(40)}`,
    `Exportado em ${new Date().toLocaleString("pt-PT")}`,
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chat-${conv.id.slice(0, 8)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// TYPING INDICATOR COMPONENT
// ─────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="typing-indicator">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}

// ─────────────────────────────────────────────
// MESSAGE BUBBLE COMPONENT
// ─────────────────────────────────────────────

function MessageBubble({
  msg,
  dark,
}: {
  msg: Message;
  dark: boolean;
}) {
  const isUser = msg.role === "user";
  return (
    <div className={`message-row ${isUser ? "user-row" : "ai-row"}`}>
      {!isUser && (
        <div className="avatar ai-avatar" aria-hidden>
          ✦
        </div>
      )}
      <div
        className={`bubble ${isUser ? "user-bubble" : `ai-bubble ${dark ? "ai-bubble-dark" : ""}`}`}
      >
        <div className="bubble-text">{renderText(msg.text)}</div>
        <div className="bubble-time">{formatTime(msg.timestamp)}</div>
      </div>
      {isUser && (
        <div className="avatar user-avatar" aria-hidden>
          U
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function AiChatSim() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [mounted, setMounted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const convs = loadConversations();
    setConversations(convs);
    if (convs.length > 0) {
      setActiveId(convs[0].id);
    }
    const savedDark = localStorage.getItem(LS_THEME_KEY);
    if (savedDark === "true") setDark(true);
    setMounted(true);
  }, []);

  // Persist whenever conversations change
  useEffect(() => {
    if (mounted) saveConversations(conversations);
  }, [conversations, mounted]);

  // Persist dark preference
  useEffect(() => {
    if (mounted) localStorage.setItem(LS_THEME_KEY, String(dark));
  }, [dark, mounted]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, isTyping, activeId]);

  const activeConv = conversations.find((c) => c.id === activeId) ?? null;

  // ── Actions ──────────────────────────────────

  const createConversation = useCallback(() => {
    const id = genId();
    const now = Date.now();
    const newConv: Conversation = {
      id,
      title: "Nova conversa",
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) {
        setConversations((prev) => {
          const remaining = prev.filter((c) => c.id !== id);
          setActiveId(remaining.length > 0 ? remaining[0].id : null);
          return remaining;
        });
      }
    },
    [activeId]
  );

  const clearMessages = useCallback(() => {
    if (!activeId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [], title: "Nova conversa", updatedAt: Date.now() }
          : c
      )
    );
  }, [activeId]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    let targetId = activeId;

    // Auto-create conversation if none active
    if (!targetId) {
      const id = genId();
      const now = Date.now();
      const newConv: Conversation = {
        id,
        title: "Nova conversa",
        messages: [],
        createdAt: now,
        updatedAt: now,
      };
      setConversations((prev) => [newConv, ...prev]);
      targetId = id;
      setActiveId(id);
    }

    const userMsg: Message = {
      id: genId(),
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== targetId) return c;
        const updated = [...c.messages, userMsg];
        return {
          ...c,
          messages: updated,
          title: deriveTitle(updated),
          updatedAt: Date.now(),
        };
      })
    );
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay: 800ms–1800ms
    const delay = 800 + Math.random() * 1000;
    await new Promise((r) => setTimeout(r, delay));

    const aiText = getAIResponse(text);
    const aiMsg: Message = {
      id: genId(),
      role: "ai",
      text: aiText,
      timestamp: Date.now(),
    };

    setIsTyping(false);
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== targetId) return c;
        return {
          ...c,
          messages: [...c.messages, aiMsg],
          updatedAt: Date.now(),
        };
      })
    );

    // Visual pulse on new AI message
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  }, [input, activeId, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  if (!mounted) return null;

  // ── RENDER ────────────────────────────────────

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-root {
          display: flex;
          height: 100dvh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 15px;
          overflow: hidden;
          background: ${dark ? "#0f1117" : "#f5f5f5"};
          color: ${dark ? "#e8e8e8" : "#1a1a1a"};
          transition: background 0.25s, color 0.25s;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 260px;
          min-width: 260px;
          background: ${dark ? "#1a1a2e" : "#1e1e2e"};
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.25s ease, width 0.25s ease;
          overflow: hidden;
          z-index: 10;
          flex-shrink: 0;
        }
        .sidebar.collapsed {
          width: 0;
          min-width: 0;
        }

        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .sidebar-logo {
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.9;
          margin-bottom: 12px;
        }
        .btn-new {
          width: 100%;
          padding: 9px 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          color: #fff;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .btn-new:hover { background: rgba(255,255,255,0.18); }

        .conv-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .conv-list::-webkit-scrollbar { width: 4px; }
        .conv-list::-webkit-scrollbar-track { background: transparent; }
        .conv-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        .conv-item {
          padding: 9px 10px;
          border-radius: 7px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.12s;
          border: 1px solid transparent;
          margin-bottom: 2px;
        }
        .conv-item:hover { background: rgba(255,255,255,0.07); }
        .conv-item.active {
          background: rgba(99,102,241,0.3);
          border-color: rgba(99,102,241,0.5);
        }
        .conv-title {
          flex: 1;
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        .conv-meta {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .conv-delete {
          width: 20px;
          height: 20px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.25);
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.15s, color 0.15s;
          flex-shrink: 0;
          padding: 0;
        }
        .conv-item:hover .conv-delete { opacity: 1; }
        .conv-delete:hover { color: #f87171; }

        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .msg-count-total {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
        }

        /* ── Main chat area ── */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
          background: ${dark ? "#0f1117" : "#ffffff"};
          transition: background 0.25s;
        }

        /* ── Top bar ── */
        .topbar {
          height: 56px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          border-bottom: 1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"};
          flex-shrink: 0;
          background: ${dark ? "#0f1117" : "#ffffff"};
        }
        .btn-icon {
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"};
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.15s, border-color 0.15s;
          color: ${dark ? "#e8e8e8" : "#1a1a1a"};
          flex-shrink: 0;
        }
        .btn-icon:hover { background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}; }

        .topbar-title {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          color: ${dark ? "#e8e8e8" : "#1a1a1a"};
        }
        .topbar-right {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        /* ── Messages ── */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} transparent;
        }
        .messages-area::-webkit-scrollbar { width: 5px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb {
          background: ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"};
          border-radius: 5px;
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0.4;
          text-align: center;
          padding: 40px;
        }
        .empty-icon {
          font-size: 48px;
          line-height: 1;
        }
        .empty-title {
          font-weight: 600;
          font-size: 18px;
        }
        .empty-sub {
          font-size: 14px;
          max-width: 300px;
          line-height: 1.5;
          opacity: 0.7;
        }

        /* ── Message rows ── */
        .message-row {
          display: flex;
          gap: 10px;
          max-width: 720px;
          width: 100%;
        }
        .user-row {
          flex-direction: row-reverse;
          margin-left: auto;
        }
        .ai-row {
          margin-right: auto;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .ai-avatar {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-size: 14px;
        }
        .user-avatar {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
        }

        .bubble {
          padding: 10px 14px;
          border-radius: 18px;
          max-width: calc(100% - 50px);
          line-height: 1.6;
          position: relative;
        }
        .user-bubble {
          background: #3b82f6;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .ai-bubble {
          background: #f1f1f1;
          color: #1a1a1a;
          border-bottom-left-radius: 4px;
        }
        .ai-bubble-dark {
          background: #1e2030;
          color: #e8e8e8;
        }
        .bubble-text {
          word-break: break-word;
        }
        .bubble-time {
          font-size: 10px;
          opacity: 0.5;
          margin-top: 4px;
          text-align: right;
        }

        /* ── Code blocks ── */
        .code-block {
          background: ${dark ? "#0d0d14" : "#1e1e2e"};
          color: #a8e6cf;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
          overflow-x: auto;
          margin: 8px 0;
          white-space: pre;
          display: block;
          border: 1px solid rgba(255,255,255,0.06);
          line-height: 1.5;
        }

        /* ── Typing indicator ── */
        .typing-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .typing-bubble {
          background: ${dark ? "#1e2030" : "#f1f1f1"};
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          padding: 12px 16px;
        }
        .typing-indicator {
          display: flex;
          gap: 5px;
          align-items: center;
          height: 18px;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${dark ? "#6366f1" : "#9ca3af"};
          animation: bounce 1.2s infinite ease-in-out;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-7px); }
        }

        /* ── Pulse on new message ── */
        .pulse-ring {
          animation: pulseRing 0.5s ease-out;
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        /* ── Input area ── */
        .input-area {
          padding: 14px 16px;
          border-top: 1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"};
          flex-shrink: 0;
          background: ${dark ? "#0f1117" : "#ffffff"};
        }
        .input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          background: ${dark ? "#1e2030" : "#f5f5f7"};
          border: 1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          border-radius: 14px;
          padding: 10px 12px 10px 16px;
          transition: border-color 0.2s;
        }
        .input-wrapper:focus-within {
          border-color: #6366f1;
        }
        .chat-textarea {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          resize: none;
          font-size: 14px;
          line-height: 1.5;
          color: ${dark ? "#e8e8e8" : "#1a1a1a"};
          min-height: 22px;
          max-height: 160px;
          font-family: inherit;
          overflow-y: auto;
        }
        .chat-textarea::placeholder { color: ${dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)"}; }
        .btn-send {
          width: 36px;
          height: 36px;
          background: #6366f1;
          border: none;
          border-radius: 9px;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.15s, opacity 0.15s;
          flex-shrink: 0;
        }
        .btn-send:hover:not(:disabled) { background: #4f46e5; }
        .btn-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .input-hint {
          font-size: 11px;
          color: ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)"};
          margin-top: 6px;
          text-align: center;
        }

        /* ── Sidebar overlay on mobile ── */
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 9;
        }

        /* ── Mobile responsive ── */
        @media (max-width: 640px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(0);
            width: 260px;
            min-width: 260px;
          }
          .sidebar.collapsed {
            transform: translateX(-100%);
            width: 260px;
            min-width: 260px;
          }
          .sidebar-overlay.visible { display: block; }
          .chat-area { width: 100%; }
        }

        /* ── Small utils ── */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }
      `}</style>

      <div className="chat-root">
        {/* Sidebar overlay for mobile */}
        <div
          className={`sidebar-overlay ${!sidebarOpen ? "" : "visible"}`}
          style={{ display: sidebarOpen ? undefined : "none" }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />

        {/* ── SIDEBAR ──────────────────────────────── */}
        <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`} aria-label="Lista de conversas">
          <div className="sidebar-header">
            <div className="sidebar-logo">✦ Descomplicai Chat</div>
            <button className="btn-new" onClick={createConversation} aria-label="Nova conversa">
              <span aria-hidden>＋</span> Nova conversa
            </button>
          </div>

          <div className="conv-list" role="list">
            {conversations.length === 0 && (
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", padding: "12px 6px" }}>
                Sem conversas ainda.
              </p>
            )}
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conv-item ${conv.id === activeId ? "active" : ""}`}
                role="listitem"
                onClick={() => {
                  setActiveId(conv.id);
                  if (window.innerWidth <= 640) setSidebarOpen(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && setActiveId(conv.id)}
                tabIndex={0}
                aria-current={conv.id === activeId ? "true" : undefined}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }} aria-hidden>💬</span>
                <span className="conv-title" title={conv.title}>{conv.title}</span>
                <span className="conv-meta">{conv.messages.length}</span>
                <button
                  className="conv-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  aria-label={`Apagar conversa "${conv.title}"`}
                  title="Apagar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <p className="msg-count-total">
              {conversations.reduce((s, c) => s + c.messages.length, 0)} mensagens no total
            </p>
          </div>
        </aside>

        {/* ── CHAT AREA ─────────────────────────────── */}
        <main className="chat-area">
          {/* Top bar */}
          <div className="topbar">
            <button
              className="btn-icon"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
              title="Alternar sidebar"
            >
              ☰
            </button>

            <span className="topbar-title">
              {activeConv ? activeConv.title : "Chat IA Simulado"}
            </span>

            <div className="topbar-right">
              {/* Dark mode toggle */}
              <button
                className="btn-icon"
                onClick={() => setDark((d) => !d)}
                title={dark ? "Modo claro" : "Modo escuro"}
                aria-label={dark ? "Activar modo claro" : "Activar modo escuro"}
              >
                {dark ? "☀️" : "🌙"}
              </button>

              {/* Clear conversation */}
              {activeConv && activeConv.messages.length > 0 && (
                <button
                  className="btn-icon"
                  onClick={clearMessages}
                  title="Limpar conversa"
                  aria-label="Limpar todas as mensagens"
                >
                  🗑
                </button>
              )}

              {/* Export */}
              {activeConv && activeConv.messages.length > 0 && (
                <button
                  className="btn-icon"
                  onClick={() => exportConversation(activeConv)}
                  title="Exportar conversa como .txt"
                  aria-label="Exportar conversa"
                >
                  ⬇
                </button>
              )}

              {/* Message count badge */}
              {activeConv && activeConv.messages.length > 0 && (
                <div
                  style={{
                    padding: "4px 10px",
                    background: dark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: 20,
                    fontSize: 12,
                    color: "#6366f1",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                  aria-label={`${activeConv.messages.length} mensagens`}
                >
                  {activeConv.messages.length} msg
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="messages-area" role="log" aria-live="polite" aria-label="Mensagens do chat">
            {!activeConv || activeConv.messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✦</div>
                <div className="empty-title">Chat IA Simulado</div>
                <div className="empty-sub">
                  Escreve uma mensagem para começar. Experimenta &quot;olá&quot;, &quot;conta uma piada&quot; ou &quot;diz-me um facto&quot;!
                </div>
              </div>
            ) : (
              activeConv.messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} dark={dark} />
              ))
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className={`typing-wrapper ${pulse ? "pulse-ring" : ""}`}>
                <div className="avatar ai-avatar" aria-hidden>✦</div>
                <div className="typing-bubble" aria-label="IA a escrever">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} aria-hidden />
          </div>

          {/* Input */}
          <div className="input-area">
            <div className={`input-wrapper ${pulse ? "pulse-ring" : ""}`}>
              <textarea
                ref={inputRef}
                className="chat-textarea"
                placeholder="Escreve uma mensagem… (Enter para enviar)"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isTyping}
                aria-label="Campo de mensagem"
                aria-disabled={isTyping}
              />
              <button
                className="btn-send"
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                aria-label="Enviar mensagem"
                title="Enviar"
              >
                ▶
              </button>
            </div>
            <p className="input-hint">
              Enter para enviar · Shift+Enter para nova linha · Sem IA real — padrões locais apenas
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
