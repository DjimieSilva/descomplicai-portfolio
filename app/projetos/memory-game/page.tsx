"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Difficulty = "facil" | "medio" | "dificil";

interface DifficultyConfig {
  label: string;
  cols: number;
  rows: number;
  total: number;
  starThresholds: [number, number]; // [3-star max, 2-star max]
}

interface CardData {
  id: number;
  emoji: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ALL_EMOJIS = ["🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🦁", "🐸", "🐯", "🦋"];

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  facil: {
    label: "Fácil",
    cols: 3,
    rows: 4,
    total: 12,
    starThresholds: [14, 20],
  },
  medio: {
    label: "Médio",
    cols: 4,
    rows: 4,
    total: 16,
    starThresholds: [16, 24],
  },
  dificil: {
    label: "Difícil",
    cols: 5,
    rows: 4,
    total: 20,
    starThresholds: [22, 32],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(difficulty: Difficulty): CardData[] {
  const { total } = DIFFICULTY_CONFIG[difficulty];
  const pairs = total / 2;
  const emojis = ALL_EMOJIS.slice(0, pairs);
  const doubled = [...emojis, ...emojis];
  const shuffled = shuffle(doubled);
  return shuffled.map((emoji, idx) => ({
    id: idx,
    emoji,
    pairId: emojis.indexOf(emoji),
    isFlipped: false,
    isMatched: false,
  }));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getStars(moves: number, thresholds: [number, number]): number {
  if (moves <= thresholds[0]) return 3;
  if (moves <= thresholds[1]) return 2;
  return 1;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Card({
  card,
  onClick,
  disabled,
}: {
  card: CardData;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className="card-scene"
      onClick={disabled || card.isMatched || card.isFlipped ? undefined : onClick}
      role="button"
      aria-label={card.isFlipped || card.isMatched ? card.emoji : "Carta virada"}
      tabIndex={disabled || card.isMatched || card.isFlipped ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (!disabled && !card.isMatched && !card.isFlipped) onClick();
        }
      }}
    >
      <div
        className={`card-inner ${card.isFlipped || card.isMatched ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
      >
        {/* Back face */}
        <div className="card-face card-back">
          <span className="card-back-pattern">✦</span>
        </div>
        {/* Front face */}
        <div className="card-face card-front">
          <span className="card-emoji">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
}

function StarDisplay({ stars }: { stars: number }) {
  return (
    <span className="star-display">
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= stars ? "star filled" : "star empty"}>
          ⭐
        </span>
      ))}
    </span>
  );
}

// ─── Win Screen ──────────────────────────────────────────────────────────────

function WinScreen({
  moves,
  time,
  stars,
  difficulty,
  onNewGame,
  onChangeDifficulty,
}: {
  moves: number;
  time: number;
  stars: number;
  difficulty: Difficulty;
  onNewGame: () => void;
  onChangeDifficulty: (d: Difficulty) => void;
}) {
  return (
    <motion.div
      className="win-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="win-card"
        initial={{ scale: 0.5, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.5, y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 18, stiffness: 200 }}
      >
        <motion.div
          className="win-confetti"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          🎉
        </motion.div>

        <h2 className="win-title">Parabéns!</h2>
        <p className="win-subtitle">
          Encontraste todos os pares no modo{" "}
          <strong>{DIFFICULTY_CONFIG[difficulty].label}</strong>!
        </p>

        <div className="win-stars">
          {[1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className={`win-star ${i <= stars ? "active" : "inactive"}`}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 300 }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <div className="win-stats">
          <div className="win-stat">
            <span className="win-stat-value">{moves}</span>
            <span className="win-stat-label">jogadas</span>
          </div>
          <div className="win-stat-divider" />
          <div className="win-stat">
            <span className="win-stat-value">{formatTime(time)}</span>
            <span className="win-stat-label">tempo</span>
          </div>
        </div>

        <div className="win-actions">
          <button className="btn btn-primary" onClick={onNewGame}>
            Jogar de novo
          </button>
          <div className="difficulty-row">
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
              <button
                key={d}
                className={`btn btn-diff ${d === difficulty ? "active" : ""}`}
                onClick={() => onChangeDifficulty(d)}
              >
                {DIFFICULTY_CONFIG[d].label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MemoryGamePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medio");
  const [cards, setCards] = useState<CardData[]>(() => buildDeck("medio"));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer ──
  useEffect(() => {
    if (gameStarted && !hasWon) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, hasWon]);

  // ── Win check ──
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setHasWon(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [cards]);

  const startNewGame = useCallback(
    (diff?: Difficulty) => {
      const d = diff ?? difficulty;
      if (timerRef.current) clearInterval(timerRef.current);
      setDifficulty(d);
      setCards(buildDeck(d));
      setFlippedIds([]);
      setMoves(0);
      setTime(0);
      setGameStarted(false);
      setIsChecking(false);
      setHasWon(false);
    },
    [difficulty]
  );

  const handleChangeDifficulty = (d: Difficulty) => {
    startNewGame(d);
  };

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking) return;
      if (flippedIds.includes(id)) return;
      if (flippedIds.length >= 2) return;

      if (!gameStarted) setGameStarted(true);

      const newFlipped = [...flippedIds, id];

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
      setFlippedIds(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);

        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        if (first.pairId === second.pairId) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isMatched: true, isFlipped: true }
                  : c
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 500);
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, isFlipped: false }
                  : c
              )
            );
            setFlippedIds([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    },
    [cards, flippedIds, isChecking, gameStarted]
  );

  const config = DIFFICULTY_CONFIG[difficulty];
  const matchedCount = cards.filter((c) => c.isMatched).length / 2;
  const totalPairs = config.total / 2;
  const stars = getStars(moves, config.starThresholds);
  const currentStars = moves > 0 ? getStars(moves, config.starThresholds) : 3;

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          background: #eff6ff;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 4rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
        }

        /* ── Header ── */
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 800;
          color: #1e3a8a;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .subtitle {
          margin-top: 0.3rem;
          color: #3b82f6;
          font-size: 0.95rem;
          font-weight: 500;
        }

        /* ── Difficulty selector ── */
        .diff-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          background: #dbeafe;
          border-radius: 999px;
          padding: 0.25rem;
        }
        .diff-btn {
          border: none;
          background: transparent;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.2s;
        }
        .diff-btn:hover { background: #bfdbfe; }
        .diff-btn.active {
          background: #3b82f6;
          color: white;
          box-shadow: 0 2px 8px rgba(59,130,246,0.4);
        }

        /* ── Stats bar ── */
        .stats-bar {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 1.5rem;
          background: white;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          box-shadow: 0 2px 12px rgba(59,130,246,0.12);
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.05rem;
        }
        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e3a8a;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.65rem;
          color: #93c5fd;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-divider {
          width: 1px;
          height: 2rem;
          background: #dbeafe;
        }
        .star-display { font-size: 0.9rem; letter-spacing: -0.1em; }
        .star.empty { opacity: 0.25; filter: grayscale(1); }

        /* ── Progress bar ── */
        .progress-wrap {
          width: 100%;
          max-width: 440px;
          margin-bottom: 1.25rem;
        }
        .progress-bar-bg {
          height: 6px;
          border-radius: 999px;
          background: #dbeafe;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          transition: width 0.4s ease;
        }
        .progress-label {
          font-size: 0.7rem;
          color: #93c5fd;
          font-weight: 600;
          text-align: right;
          margin-top: 0.25rem;
        }

        /* ── Card grid ── */
        .grid {
          display: grid;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        /* ── Card 3D ── */
        .card-scene {
          perspective: 600px;
          cursor: pointer;
          outline: none;
        }
        .card-scene:focus-visible .card-inner {
          box-shadow: 0 0 0 3px #3b82f6, 0 4px 16px rgba(59,130,246,0.25);
        }
        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-inner.matched {
          transform: rotateY(180deg);
          animation: matchBounce 0.5s ease 0.1s both;
        }
        @keyframes matchBounce {
          0%   { transform: rotateY(180deg) scale(1); }
          40%  { transform: rotateY(180deg) scale(1.12); }
          70%  { transform: rotateY(180deg) scale(0.95); }
          100% { transform: rotateY(180deg) scale(1); }
        }
        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .card-back {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 0 4px 12px rgba(59,130,246,0.3);
          transition: box-shadow 0.2s;
        }
        .card-scene:hover:not([tabindex="-1"]) .card-back {
          box-shadow: 0 6px 20px rgba(59,130,246,0.45);
        }
        .card-back-pattern {
          font-size: 1.4rem;
          color: rgba(255,255,255,0.35);
          user-select: none;
        }
        .card-front {
          background: white;
          transform: rotateY(180deg);
          box-shadow: 0 4px 12px rgba(59,130,246,0.15);
        }
        .card-inner.matched .card-front {
          background: #f0fdf4;
          box-shadow: 0 4px 16px rgba(34,197,94,0.25), 0 0 0 2px #86efac;
        }
        .card-emoji {
          font-size: 2rem;
          line-height: 1;
          user-select: none;
        }

        /* ── Card size by difficulty ── */
        .grid-facil   .card-scene { width: 80px; height: 80px; }
        .grid-medio   .card-scene { width: 72px; height: 72px; }
        .grid-dificil .card-scene { width: 64px; height: 64px; }

        @media (max-width: 480px) {
          .grid-facil   .card-scene { width: 68px; height: 68px; }
          .grid-medio   .card-scene { width: 60px; height: 60px; }
          .grid-dificil .card-scene { width: 52px; height: 52px; }
          .card-emoji { font-size: 1.5rem; }
        }
        @media (max-width: 360px) {
          .grid-facil   .card-scene { width: 58px; height: 58px; }
          .grid-medio   .card-scene { width: 52px; height: 52px; }
          .grid-dificil .card-scene { width: 46px; height: 46px; }
        }

        /* ── New game button ── */
        .btn-new-game {
          border: none;
          background: #3b82f6;
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.6rem 1.8rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(59,130,246,0.35);
        }
        .btn-new-game:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(59,130,246,0.45);
        }
        .btn-new-game:active { transform: translateY(0); }

        /* ── Win overlay ── */
        .win-overlay {
          position: fixed;
          inset: 0;
          background: rgba(239,246,255,0.85);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .win-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          max-width: 360px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 60px rgba(59,130,246,0.2), 0 8px 24px rgba(0,0,0,0.08);
        }
        .win-confetti { font-size: 3.5rem; line-height: 1; margin-bottom: 0.5rem; }
        .win-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 0.35rem;
        }
        .win-subtitle {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .win-stars {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        .win-star { font-size: 2.2rem; line-height: 1; }
        .win-star.inactive { filter: grayscale(1); opacity: 0.25; }

        .win-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          background: #eff6ff;
          border-radius: 16px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .win-stat { display: flex; flex-direction: column; align-items: center; }
        .win-stat-value { font-size: 1.6rem; font-weight: 800; color: #1e3a8a; }
        .win-stat-label { font-size: 0.7rem; color: #93c5fd; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .win-stat-divider { width: 1px; height: 2.5rem; background: #bfdbfe; }

        .win-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .btn {
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          padding: 0.7rem 2rem;
          font-size: 1rem;
          box-shadow: 0 4px 14px rgba(59,130,246,0.35);
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(59,130,246,0.45);
        }
        .difficulty-row { display: flex; gap: 0.4rem; justify-content: center; }
        .btn-diff {
          background: #eff6ff;
          color: #3b82f6;
          padding: 0.4rem 0.9rem;
          font-size: 0.8rem;
          border: 2px solid transparent;
        }
        .btn-diff:hover { background: #dbeafe; }
        .btn-diff.active {
          background: #dbeafe;
          border-color: #3b82f6;
          color: #1d4ed8;
        }
      `}</style>

      <div className="page">
        {/* Header */}
        <header className="header">
          <h1 className="title">Jogo da Memória 🧠</h1>
          <p className="subtitle">Encontra todos os pares de cartas!</p>
        </header>

        {/* Difficulty selector */}
        <div className="diff-selector">
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
            <button
              key={d}
              className={`diff-btn ${difficulty === d ? "active" : ""}`}
              onClick={() => handleChangeDifficulty(d)}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">{moves}</span>
            <span className="stat-label">Jogadas</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{formatTime(time)}</span>
            <span className="stat-label">Tempo</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <StarDisplay stars={moves === 0 ? 3 : currentStars} />
            <span className="stat-label">Estrelas</span>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${(matchedCount / totalPairs) * 100}%` }}
            />
          </div>
          <div className="progress-label">
            {matchedCount}/{totalPairs} pares
          </div>
        </div>

        {/* Card grid */}
        <div
          className={`grid grid-${difficulty}`}
          style={{
            gridTemplateColumns: `repeat(${config.cols}, auto)`,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card.id)}
              disabled={isChecking}
            />
          ))}
        </div>

        {/* New game button */}
        <button className="btn-new-game" onClick={() => startNewGame()}>
          Novo Jogo 🔀
        </button>

        {/* Win screen */}
        <AnimatePresence>
          {hasWon && (
            <WinScreen
              moves={moves}
              time={time}
              stars={stars}
              difficulty={difficulty}
              onNewGame={() => startNewGame()}
              onChangeDifficulty={handleChangeDifficulty}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
