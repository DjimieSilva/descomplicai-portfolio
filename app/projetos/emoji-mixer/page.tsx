"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Emoji Data ───────────────────────────────────────────────────────────────

const SLOT_DATA = {
  personagem: {
    label: "Personagem",
    emojis: ["👨‍🍳", "👩‍🚀", "🧙‍♂️", "🦸‍♀️", "🤖", "👻", "🧜‍♀️", "🤠", "👽", "🎅"],
    names: [
      "cozinheiro",
      "astronauta",
      "feiticeiro",
      "super-heroína",
      "robô",
      "fantasma",
      "sereia",
      "cowboy",
      "alienígena",
      "Pai Natal",
    ],
  },
  acao: {
    label: "Ação",
    emojis: ["🏃", "💃", "🎸", "🧪", "🎯", "🏄", "🎨", "🧘", "🚀", "🎭"],
    names: [
      "correu muito",
      "dançou",
      "tocou guitarra",
      "fez experiências",
      "acertou no alvo",
      "fez surf",
      "pintou um quadro",
      "meditou",
      "foi ao espaço",
      "fez teatro",
    ],
  },
  local: {
    label: "Local",
    emojis: ["🏝️", "🏰", "🌋", "🎪", "🌙", "🏔️", "🎡", "🌊", "🏜️", "🌌"],
    names: [
      "numa ilha paradisíaca",
      "num castelo encantado",
      "perto de um vulcão",
      "num circo mágico",
      "à luz da lua",
      "no topo de uma montanha",
      "numa feira de diversões",
      "no meio do oceano",
      "no deserto",
      "numa galáxia distante",
    ],
  },
} as const;

// ─── Story Templates ──────────────────────────────────────────────────────────

const STORY_TEMPLATES = [
  "Um dia, o {personagem} {acao} {local}. Ninguém conseguia acreditar no que estava a ver!",
  "Era uma vez um {personagem} que sempre sonhou {acao} {local}. Hoje esse sonho tornou-se realidade.",
  "Às 3 da manhã, um {personagem} misterioso {acao} {local}. A história ficou famosa em todo o mundo.",
  "O {personagem} acordou com uma ideia maluca: {acao} {local}! Os vizinhos ficaram completamente boquiabertos.",
  "Ninguém esperava que o {personagem} fosse capaz de {acao} {local}. Mas aconteceu mesmo.",
  "A lenda conta que certo {personagem} {acao} {local} durante 7 dias e 7 noites sem parar.",
  "O {personagem} recebeu uma missão impossível: {acao} {local}. Aceitou sem pensar duas vezes.",
  "Toda a gente riu quando o {personagem} disse que ia {acao} {local}. Hoje ninguém ri.",
  "Foi numa sexta-feira 13 que o {personagem} decidiu {acao} {local}. Que aventura incrível foi essa!",
  "O {personagem} tinha um segredo: adorava {acao} {local} enquanto ninguém estava a olhar.",
  "A notícia espalhou-se rapidamente — o {personagem} estava a {acao} {local} e ninguém sabia porquê.",
  "O {personagem} fez uma aposta: se conseguisse {acao} {local}, ganharia uma pizza gigante. Conseguiu.",
  "Dizem que ainda hoje, em noites de tempestade, o {personagem} continua a {acao} {local}.",
  "O {personagem} foi o primeiro da história a {acao} {local}. Já tem museu em sua homenagem.",
  "Por culpa de um feitiço, o {personagem} só conseguia {acao} {local}. Mas acabou por gostar.",
  "O {personagem} acordou uma manhã e descobriu que só conseguia {acao} {local}. Podia ser pior.",
  "Quando o {personagem} {acao} {local}, as estrelas alinharam-se de um jeito muito especial.",
  "O documentário sobre o {personagem} que {acao} {local} ganhou todos os prémios possíveis.",
  "Há quem diga que o {personagem} aprendeu a {acao} {local} com um velho sábio muito misterioso.",
  "O {personagem} tinha um plano: {acao} {local} antes do pôr do sol. O plano resultou na perfeição.",
  "Contra todas as probabilidades, o {personagem} conseguiu {acao} {local}. A multidão enlouqueceu.",
  "Certa vez, um {personagem} perdeu-se e acabou a {acao} {local}. Foi a melhor coisa que lhe aconteceu.",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Combo {
  id: string;
  personagem: number;
  acao: number;
  local: number;
  story: string;
  timestamp: number;
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#f472b6",
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#fb923c",
];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = `${Math.random() * 100}%`;
  const delay = Math.random() * 0.5;
  const duration = 1.5 + Math.random() * 1;
  const size = 8 + Math.random() * 10;
  const rotate = Math.random() * 720 - 360;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "-20px",
        left,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 40 : 900,
        opacity: [1, 1, 0],
        rotate,
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{ duration, delay, ease: "easeIn" }}
    />
  );
}

function Confetti() {
  return (
    <>
      {Array.from({ length: 60 }, (_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </>
  );
}

// ─── Slot Column ──────────────────────────────────────────────────────────────

interface SlotColumnProps {
  label: string;
  emojis: readonly string[];
  currentIndex: number;
  spinning: boolean;
  spinEmoji: string;
  won: boolean;
}

function SlotColumn({
  label,
  emojis,
  currentIndex,
  spinning,
  spinEmoji,
  won,
}: SlotColumnProps) {
  return (
    <div className="slot-column">
      <div className="slot-label">{label}</div>
      <div className={`slot-window${won ? " slot-win" : ""}`}>
        <AnimatePresence mode="wait">
          {spinning ? (
            <motion.div
              key="spinning"
              className="slot-emoji"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.08 }}
            >
              {spinEmoji}
            </motion.div>
          ) : (
            <motion.div
              key={`result-${currentIndex}`}
              className="slot-emoji"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {emojis[currentIndex]}
            </motion.div>
          )}
        </AnimatePresence>
        {won && (
          <motion.div
            className="slot-win-ring"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EmojiMixerPage() {
  const [indices, setIndices] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [spinEmojis, setSpinEmojis] = useState(["🎰", "🎰", "🎰"]);
  const [story, setStory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Combo[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonSlots, setWonSlots] = useState([false, false, false]);
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("emoji-mixer-favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  const saveFavorites = useCallback((combos: Combo[]) => {
    try {
      localStorage.setItem("emoji-mixer-favorites", JSON.stringify(combos));
    } catch {}
  }, []);

  const buildStory = useCallback((pIdx: number, aIdx: number, lIdx: number) => {
    const template =
      STORY_TEMPLATES[Math.floor(Math.random() * STORY_TEMPLATES.length)];
    return template
      .replace("{personagem}", SLOT_DATA.personagem.names[pIdx])
      .replace("{acao}", SLOT_DATA.acao.names[aIdx])
      .replace("{local}", SLOT_DATA.local.names[lIdx]);
  }, []);

  const checkTripleMatch = useCallback(
    (pIdx: number, aIdx: number, lIdx: number) => {
      // Triple match = all three indexes are the same
      return pIdx === aIdx && aIdx === lIdx;
    },
    []
  );

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setStory(null);
    setShowConfetti(false);
    setWonSlots([false, false, false]);

    const spinDuration = 1800; // ms total spin time
    const intervalSpeed = 80; // ms per emoji swap

    const allEmojis = [
      ...SLOT_DATA.personagem.emojis,
      ...SLOT_DATA.acao.emojis,
      ...SLOT_DATA.local.emojis,
    ];

    // Rapid cycling for all 3 slots
    const spinInterval = setInterval(() => {
      setSpinEmojis([
        allEmojis[Math.floor(Math.random() * allEmojis.length)],
        allEmojis[Math.floor(Math.random() * allEmojis.length)],
        allEmojis[Math.floor(Math.random() * allEmojis.length)],
      ]);
    }, intervalSpeed);

    // Pick final random indices
    const finalP = Math.floor(Math.random() * SLOT_DATA.personagem.emojis.length);
    const finalA = Math.floor(Math.random() * SLOT_DATA.acao.emojis.length);
    const finalL = Math.floor(Math.random() * SLOT_DATA.local.emojis.length);

    // Stop slot 1 first, then 2, then 3 — staggered
    setTimeout(() => {
      setIndices((prev) => [finalP, prev[1], prev[2]]);
    }, spinDuration * 0.5);

    setTimeout(() => {
      setIndices((prev) => [prev[0], finalA, prev[2]]);
    }, spinDuration * 0.75);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIndices([finalP, finalA, finalL]);
      setSpinning(false);
      setHasSpun(true);

      const generated = buildStory(finalP, finalA, finalL);
      setStory(generated);

      const triple = checkTripleMatch(finalP, finalA, finalL);
      if (triple) {
        setWonSlots([true, true, true]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, spinDuration);
  }, [spinning, buildStory, checkTripleMatch]);

  const saveFavorite = useCallback(() => {
    if (!story) return;
    const combo: Combo = {
      id: `${Date.now()}-${Math.random()}`,
      personagem: indices[0],
      acao: indices[1],
      local: indices[2],
      story,
      timestamp: Date.now(),
    };
    const updated = [combo, ...favorites].slice(0, 20);
    setFavorites(updated);
    saveFavorites(updated);
  }, [story, indices, favorites, saveFavorites]);

  const removeFavorite = useCallback(
    (id: string) => {
      const updated = favorites.filter((f) => f.id !== id);
      setFavorites(updated);
      saveFavorites(updated);
    },
    [favorites, saveFavorites]
  );

  const copyStory = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const currentEmojis = [
    SLOT_DATA.personagem.emojis[indices[0]],
    SLOT_DATA.acao.emojis[indices[1]],
    SLOT_DATA.local.emojis[indices[2]],
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .page-wrap {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fef9c3 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 4rem;
        }

        .header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: #1f1f2e;
          letter-spacing: -1px;
        }

        .subtitle {
          font-size: 1.05rem;
          color: #6b7280;
          margin-top: 0.4rem;
          font-weight: 500;
        }

        /* Machine */
        .machine {
          background: white;
          border-radius: 28px;
          padding: 2rem 2.5rem;
          box-shadow:
            0 4px 6px -1px rgba(0,0,0,0.07),
            0 20px 60px -10px rgba(236,72,153,0.12),
            inset 0 1px 0 rgba(255,255,255,0.9);
          border: 2px solid rgba(236,72,153,0.12);
          width: 100%;
          max-width: 540px;
        }

        .slots-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: flex-start;
          margin-bottom: 1.75rem;
        }

        .slot-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .slot-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
        }

        .slot-window {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(145deg, #fdf4ff, #fef9c3);
          border-radius: 18px;
          border: 2px solid #f3e8ff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .slot-window.slot-win {
          border-color: #fbbf24;
          box-shadow: 0 0 0 3px #fef08a, 0 0 20px rgba(251,191,36,0.3);
        }

        .slot-emoji {
          font-size: clamp(3rem, 10vw, 5rem);
          line-height: 1;
          user-select: none;
        }

        .slot-win-ring {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 3px solid #fbbf24;
          pointer-events: none;
        }

        /* Divider between slots */
        .slot-sep {
          font-size: 1.5rem;
          color: #d1d5db;
          margin-top: 1.8rem;
          flex-shrink: 0;
          align-self: center;
        }

        /* Spin button */
        .btn-spin {
          width: 100%;
          padding: 1rem;
          font-size: 1.2rem;
          font-weight: 800;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          background: linear-gradient(135deg, #ec4899, #f59e0b);
          color: white;
          box-shadow: 0 4px 15px rgba(236,72,153,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          letter-spacing: 0.02em;
        }

        .btn-spin:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(236,72,153,0.45);
        }

        .btn-spin:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-spin:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Story box */
        .story-wrap {
          width: 100%;
          max-width: 540px;
          margin-top: 1.5rem;
        }

        .story-box {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          border: 2px solid #f3e8ff;
          box-shadow: 0 4px 20px rgba(236,72,153,0.08);
        }

        .story-emoji-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .story-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #374151;
          text-align: center;
          font-weight: 500;
        }

        .story-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .btn-action {
          flex: 1;
          padding: 0.65rem 1rem;
          border-radius: 12px;
          border: 2px solid;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .btn-fav {
          border-color: #fbbf24;
          background: #fffbeb;
          color: #92400e;
        }

        .btn-fav:hover {
          background: #fef3c7;
        }

        .btn-copy {
          border-color: #a78bfa;
          background: #f5f3ff;
          color: #4c1d95;
        }

        .btn-copy:hover {
          background: #ede9fe;
        }

        /* Triple match banner */
        .triple-banner {
          text-align: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #92400e;
          background: linear-gradient(135deg, #fef9c3, #fde68a);
          border: 2px solid #fbbf24;
          border-radius: 14px;
          padding: 0.75rem 1.25rem;
          margin-bottom: 1rem;
        }

        /* Favorites */
        .favorites-section {
          width: 100%;
          max-width: 540px;
          margin-top: 2.5rem;
        }

        .favorites-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1f1f2e;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fav-count {
          background: #f3e8ff;
          color: #7c3aed;
          border-radius: 999px;
          font-size: 0.78rem;
          padding: 0.15rem 0.55rem;
          font-weight: 700;
        }

        .fav-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fav-card {
          background: white;
          border-radius: 16px;
          padding: 1rem 1.25rem;
          border: 2px solid #f3e8ff;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .fav-emojis {
          font-size: 1.4rem;
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1.3;
        }

        .fav-body {
          flex: 1;
          min-width: 0;
        }

        .fav-story {
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.5;
        }

        .fav-actions {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.6rem;
          flex-wrap: wrap;
        }

        .btn-fav-action {
          padding: 0.3rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 8px;
          border: 1.5px solid;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-fav-copy {
          border-color: #c4b5fd;
          background: #f5f3ff;
          color: #5b21b6;
        }

        .btn-fav-remove {
          border-color: #fca5a5;
          background: #fff1f2;
          color: #991b1b;
        }

        .btn-fav-copy:hover { background: #ede9fe; }
        .btn-fav-remove:hover { background: #fee2e2; }

        .empty-fav {
          text-align: center;
          color: #9ca3af;
          font-size: 0.9rem;
          padding: 2rem;
          background: white;
          border-radius: 16px;
          border: 2px dashed #e5e7eb;
        }

        /* Responsive */
        @media (max-width: 400px) {
          .machine { padding: 1.25rem 1rem; }
          .slot-sep { font-size: 1rem; }
        }
      `}</style>

      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      <div className="page-wrap">
        {/* Header */}
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="title">Emoji Mixer 🎰</h1>
          <p className="subtitle">Mistura emojis e cria histórias!</p>
        </motion.div>

        {/* Slot Machine */}
        <motion.div
          className="machine"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="slots-row">
            <SlotColumn
              label={SLOT_DATA.personagem.label}
              emojis={SLOT_DATA.personagem.emojis}
              currentIndex={indices[0]}
              spinning={spinning}
              spinEmoji={spinEmojis[0]}
              won={wonSlots[0]}
            />
            <div className="slot-sep">+</div>
            <SlotColumn
              label={SLOT_DATA.acao.label}
              emojis={SLOT_DATA.acao.emojis}
              currentIndex={indices[1]}
              spinning={spinning}
              spinEmoji={spinEmojis[1]}
              won={wonSlots[1]}
            />
            <div className="slot-sep">+</div>
            <SlotColumn
              label={SLOT_DATA.local.label}
              emojis={SLOT_DATA.local.emojis}
              currentIndex={indices[2]}
              spinning={spinning}
              spinEmoji={spinEmojis[2]}
              won={wonSlots[2]}
            />
          </div>

          <motion.button
            className="btn-spin"
            onClick={spin}
            disabled={spinning}
            whileTap={{ scale: 0.97 }}
          >
            {spinning ? "A misturar... 🌀" : "Misturar! 🎲"}
          </motion.button>
        </motion.div>

        {/* Story */}
        <AnimatePresence mode="wait">
          {story && !spinning && (
            <motion.div
              className="story-wrap"
              key={story}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="story-box">
                {wonSlots[0] && (
                  <motion.div
                    className="triple-banner"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    🎉 TRIPLE MATCH! Combinação épica! 🎉
                  </motion.div>
                )}

                <div className="story-emoji-row">
                  <span>{currentEmojis[0]}</span>
                  <span style={{ fontSize: "1.2rem", color: "#d1d5db" }}>→</span>
                  <span>{currentEmojis[1]}</span>
                  <span style={{ fontSize: "1.2rem", color: "#d1d5db" }}>→</span>
                  <span>{currentEmojis[2]}</span>
                </div>

                <p className="story-text">{story}</p>

                <div className="story-actions">
                  <button className="btn-action btn-fav" onClick={saveFavorite}>
                    Guardar Favorito ⭐
                  </button>
                  <button
                    className="btn-action btn-copy"
                    onClick={() =>
                      copyStory(
                        `${currentEmojis[0]} ${currentEmojis[1]} ${currentEmojis[2]}\n\n${story}\n\n— Gerado no Emoji Mixer 🎰`
                      )
                    }
                  >
                    {copied ? "Copiado! ✓" : "Copiar 📋"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorites */}
        <AnimatePresence>
          {favorites.length > 0 && (
            <motion.section
              className="favorites-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="favorites-title">
                <span>⭐ Os teus favoritos</span>
                <span className="fav-count">{favorites.length}</span>
              </div>
              <div className="fav-list">
                <AnimatePresence>
                  {favorites.map((fav) => {
                    const emojis = [
                      SLOT_DATA.personagem.emojis[fav.personagem],
                      SLOT_DATA.acao.emojis[fav.acao],
                      SLOT_DATA.local.emojis[fav.local],
                    ];
                    const shareText = `${emojis[0]} ${emojis[1]} ${emojis[2]}\n\n${fav.story}\n\n— Gerado no Emoji Mixer 🎰`;

                    return (
                      <motion.div
                        key={fav.id}
                        className="fav-card"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        layout
                      >
                        <div className="fav-emojis">
                          {emojis[0]}
                          <br />
                          {emojis[1]}
                          <br />
                          {emojis[2]}
                        </div>
                        <div className="fav-body">
                          <p className="fav-story">{fav.story}</p>
                          <div className="fav-actions">
                            <button
                              className="btn-fav-action btn-fav-copy"
                              onClick={() => copyStory(shareText)}
                            >
                              Copiar 📋
                            </button>
                            <button
                              className="btn-fav-action btn-fav-remove"
                              onClick={() => removeFavorite(fav.id)}
                            >
                              Remover ✕
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state hint */}
        {!hasSpun && (
          <motion.p
            style={{
              marginTop: "1.5rem",
              color: "#9ca3af",
              fontSize: "0.88rem",
              textAlign: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Carrega em <strong>Misturar!</strong> para gerar a tua primeira história ✨
          </motion.p>
        )}
      </div>
    </>
  );
}
