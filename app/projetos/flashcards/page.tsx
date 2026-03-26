"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
}

type CardStatus = "unseen" | "known" | "review";

interface Progress {
  [cardId: string]: CardStatus;
}

interface SavedState {
  activeDeckId: string | null;
  currentIndex: number;
  progress: Progress;
  customDecks: Deck[];
}

// ─── Preset Decks ─────────────────────────────────────────────────────────────

const PRESET_DECKS: Deck[] = [
  {
    id: "capitais-europa",
    name: "Capitais da Europa 🌍",
    cards: [
      { id: "ce01", front: "Portugal", back: "Lisboa" },
      { id: "ce02", front: "Espanha", back: "Madrid" },
      { id: "ce03", front: "França", back: "Paris" },
      { id: "ce04", front: "Alemanha", back: "Berlim" },
      { id: "ce05", front: "Itália", back: "Roma" },
      { id: "ce06", front: "Reino Unido", back: "Londres" },
      { id: "ce07", front: "Países Baixos", back: "Amesterdão" },
      { id: "ce08", front: "Bélgica", back: "Bruxelas" },
      { id: "ce09", front: "Suíça", back: "Berna" },
      { id: "ce10", front: "Áustria", back: "Viena" },
      { id: "ce11", front: "Suécia", back: "Estocolmo" },
      { id: "ce12", front: "Noruega", back: "Oslo" },
      { id: "ce13", front: "Polónia", back: "Varsóvia" },
      { id: "ce14", front: "Grécia", back: "Atenas" },
      { id: "ce15", front: "República Checa", back: "Praga" },
    ],
  },
  {
    id: "ingles-basico",
    name: "Inglês Básico 🇬🇧",
    cards: [
      { id: "ib01", front: "Obrigado / Obrigada", back: "Thank you" },
      { id: "ib02", front: "Por favor", back: "Please" },
      { id: "ib03", front: "Desculpe", back: "Sorry / Excuse me" },
      { id: "ib04", front: "Bom dia", back: "Good morning" },
      { id: "ib05", front: "Boa noite", back: "Good night" },
      { id: "ib06", front: "Como te chamas?", back: "What's your name?" },
      { id: "ib07", front: "Onde fica o hotel?", back: "Where is the hotel?" },
      { id: "ib08", front: "Quanto custa?", back: "How much does it cost?" },
      { id: "ib09", front: "Não percebo", back: "I don't understand" },
      { id: "ib10", front: "Fala mais devagar", back: "Please speak slowly" },
      { id: "ib11", front: "Preciso de ajuda", back: "I need help" },
      { id: "ib12", front: "Tudo bem", back: "I'm fine / All good" },
      { id: "ib13", front: "Que horas são?", back: "What time is it?" },
      { id: "ib14", front: "Pode repetir?", back: "Can you repeat that?" },
      { id: "ib15", front: "Até logo", back: "See you later / Goodbye" },
    ],
  },
  {
    id: "ciencia",
    name: "Ciência 🔬",
    cards: [
      { id: "sc01", front: "Qual é o elemento mais abundante no universo?", back: "Hidrogénio (H)" },
      { id: "sc02", front: "Quantos ossos tem o corpo humano adulto?", back: "206 ossos" },
      { id: "sc03", front: "Qual a velocidade da luz no vácuo?", back: "≈ 299 792 km/s" },
      { id: "sc04", front: "Qual o planeta mais quente do sistema solar?", back: "Vénus (≈ 465°C)" },
      { id: "sc05", front: "De que é composta a água?", back: "2 átomos de hidrogénio + 1 de oxigénio (H₂O)" },
      { id: "sc06", front: "O que estuda a sismologia?", back: "Os sismos e a estrutura interna da Terra" },
      { id: "sc07", front: "Quantos cromossomas tem uma célula humana normal?", back: "46 (23 pares)" },
      { id: "sc08", front: "O que é a fotossíntese?", back: "Processo pelo qual as plantas convertem luz solar em energia (glicose)" },
      { id: "sc09", front: "Qual é o metal mais condutor de eletricidade?", back: "Prata (Ag)" },
      { id: "sc10", front: "Qual o maior órgão do corpo humano?", back: "A pele" },
      { id: "sc11", front: "O que é um ano-luz?", back: "A distância que a luz percorre num ano (≈ 9,46 × 10¹² km)" },
      { id: "sc12", front: "Qual a fórmula de Einstein mais famosa?", back: "E = mc²" },
      { id: "sc13", front: "O que é o ADN?", back: "Ácido desoxirribonucleico — molécula que contém a informação genética" },
      { id: "sc14", front: "Qual o gás mais abundante na atmosfera terrestre?", back: "Azoto / Nitrogénio (N₂) — cerca de 78%" },
      { id: "sc15", front: "Quantas luas tem Saturno?", back: "146 luas confirmadas (2024)" },
    ],
  },
];

const STORAGE_KEY = "flashcards-app-state";
const AMBER = "#f59e0b";
const AMBER_LIGHT = "#fef3c7";
const AMBER_DARK = "#d97706";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ known, review, total }: { known: number; review: number; total: number }) {
  const knownPct = total > 0 ? (known / total) * 100 : 0;
  const reviewPct = total > 0 ? (review / total) * 100 : 0;
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          fontWeight: 600,
          color: "#78716c",
          marginBottom: 8,
        }}
      >
        <span style={{ color: "#16a34a" }}>✅ {known} sei</span>
        <span style={{ color: "#92400e" }}>{total - known - review} por ver</span>
        <span style={{ color: "#b45309" }}>🔄 {review} rever</span>
      </div>
      <div
        style={{
          height: 10,
          background: "#e7e5e4",
          borderRadius: 999,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            width: `${knownPct}%`,
            background: "#22c55e",
            transition: "width 0.5s ease",
          }}
        />
        <div
          style={{
            width: `${reviewPct}%`,
            background: AMBER,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

function KeyboardHint({ items }: { items: { key: string; label: string }[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        marginTop: 16,
      }}
    >
      {items.map(({ key, label }) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#a8a29e",
          }}
        >
          <kbd
            style={{
              background: "#f5f5f4",
              border: "1px solid #d6d3d1",
              borderRadius: 5,
              padding: "2px 7px",
              fontSize: 11,
              fontFamily: "monospace",
              color: "#57534e",
              boxShadow: "0 1px 0 #d6d3d1",
            }}
          >
            {key}
          </kbd>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FlashcardsPage() {
  // ── State ──────────────────────────────────────────────────────────────────

  const [hydrated, setHydrated] = useState(false);
  const [customDecks, setCustomDecks] = useState<Deck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [cardOrder, setCardOrder] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [activeTab, setActiveTab] = useState<"study" | "decks" | "create">("decks");

  // Create custom deck form
  const [newDeckName, setNewDeckName] = useState("");
  const [newCards, setNewCards] = useState<{ front: string; back: string }[]>([
    { front: "", back: "" },
    { front: "", back: "" },
  ]);

  // Touch / swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const allDecks = [...PRESET_DECKS, ...customDecks];
  const activeDeck = allDecks.find((d) => d.id === activeDeckId) ?? null;
  const currentCard = cardOrder[currentIndex] ?? null;
  const cardStatus: CardStatus = currentCard ? (progress[currentCard.id] ?? "unseen") : "unseen";

  const knownCount = activeDeck
    ? activeDeck.cards.filter((c) => progress[c.id] === "known").length
    : 0;
  const reviewCount = activeDeck
    ? activeDeck.cards.filter((c) => progress[c.id] === "review").length
    : 0;

  // ── Persistence ────────────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        setCustomDecks(saved.customDecks ?? []);
        setProgress(saved.progress ?? {});
        if (saved.activeDeckId) {
          setActiveDeckId(saved.activeDeckId);
          setActiveTab("study");
        }
        if (typeof saved.currentIndex === "number") {
          setCurrentIndex(saved.currentIndex);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const state: SavedState = {
        activeDeckId,
        currentIndex,
        progress,
        customDecks,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [hydrated, activeDeckId, currentIndex, progress, customDecks]);

  // Rebuild card order when deck changes
  useEffect(() => {
    if (activeDeck) {
      setCardOrder([...activeDeck.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [activeDeckId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keyboard ──────────────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (!cardOrder.length) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % cardOrder.length);
    }, 150);
  }, [cardOrder.length]);

  const goPrev = useCallback(() => {
    if (!cardOrder.length) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i - 1 + cardOrder.length) % cardOrder.length);
    }, 150);
  }, [cardOrder.length]);

  const markCard = useCallback(
    (status: "known" | "review") => {
      if (!currentCard) return;
      setProgress((p) => ({ ...p, [currentCard.id]: status }));
      goNext();
    },
    [currentCard, goNext]
  );

  useEffect(() => {
    if (activeTab !== "study") return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === "ArrowRight") {
        goNext();
      } else if (e.code === "ArrowLeft") {
        goPrev();
      } else if (e.key === "1") {
        markCard("known");
      } else if (e.key === "2") {
        markCard("review");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeTab, goNext, goPrev, markCard]);

  // ── Touch / Swipe ─────────────────────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    } else if (Math.abs(dy) < 10 && Math.abs(dx) < 10) {
      // tap — handled by onClick
    }
  };

  // ── Shuffle ───────────────────────────────────────────────────────────────

  const handleShuffle = () => {
    setCardOrder((prev) => shuffleArray(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // ── Select deck ───────────────────────────────────────────────────────────

  const selectDeck = (id: string) => {
    setActiveDeckId(id);
    setIsFlipped(false);
    setActiveTab("study");
  };

  // ── Reset progress ────────────────────────────────────────────────────────

  const resetDeckProgress = () => {
    if (!activeDeck) return;
    const newProgress = { ...progress };
    activeDeck.cards.forEach((c) => delete newProgress[c.id]);
    setProgress(newProgress);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardOrder([...activeDeck.cards]);
  };

  // ── Create deck ───────────────────────────────────────────────────────────

  const addCardRow = () => {
    setNewCards((prev) => [...prev, { front: "", back: "" }]);
  };

  const removeCardRow = (i: number) => {
    setNewCards((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateCard = (i: number, field: "front" | "back", value: string) => {
    setNewCards((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  };

  const handleCreateDeck = () => {
    const name = newDeckName.trim();
    if (!name) return;
    const validCards = newCards.filter((c) => c.front.trim() && c.back.trim());
    if (validCards.length < 1) return;
    const deck: Deck = {
      id: uid(),
      name,
      cards: validCards.map((c) => ({
        id: uid(),
        front: c.front.trim(),
        back: c.back.trim(),
      })),
    };
    setCustomDecks((prev) => [...prev, deck]);
    setNewDeckName("");
    setNewCards([{ front: "", back: "" }, { front: "", back: "" }]);
    selectDeck(deck.id);
  };

  const deleteCustomDeck = (id: string) => {
    setCustomDecks((prev) => prev.filter((d) => d.id !== id));
    if (activeDeckId === id) {
      setActiveDeckId(null);
      setActiveTab("decks");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffbeb",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        paddingBottom: 80,
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: "center", padding: "40px 24px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ fontSize: 44, marginBottom: 10 }}>📚</div>
          <h1
            style={{
              fontSize: "clamp(22px, 5vw, 34px)",
              fontWeight: 800,
              color: "#1c1917",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Flashcards de Estudo
          </h1>
          <p style={{ color: "#78716c", marginTop: 8, fontSize: 15 }}>
            Estuda, vira, aprende. Simples assim.
          </p>
        </motion.div>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "0 20px 28px",
          flexWrap: "wrap",
        }}
      >
        {(["study", "decks", "create"] as const).map((tab) => {
          const labels = { study: "Estudar", decks: "Baralhos", create: "Criar Baralho" };
          const icons = { study: "🎓", decks: "🗂️", create: "✏️" };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
                background: isActive ? AMBER : "rgba(255,255,255,0.8)",
                color: isActive ? "#fff" : "#78716c",
                boxShadow: isActive ? `0 4px 16px ${AMBER}55` : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              {icons[tab]} {labels[tab]}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px" }}>
        <AnimatePresence mode="wait">

          {/* ══════════════════════════════════════════════════
              STUDY TAB
          ══════════════════════════════════════════════════ */}
          {activeTab === "study" && (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {!activeDeck ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 24px",
                    background: "white",
                    borderRadius: 24,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: 52, marginBottom: 16 }}>🗂️</div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1c1917",
                      margin: "0 0 8px",
                    }}
                  >
                    Nenhum baralho selecionado
                  </p>
                  <p style={{ color: "#78716c", margin: "0 0 24px", fontSize: 14 }}>
                    Escolhe um baralho no separador "Baralhos" para começar.
                  </p>
                  <button
                    onClick={() => setActiveTab("decks")}
                    style={{
                      background: AMBER,
                      color: "#fff",
                      border: "none",
                      borderRadius: 14,
                      padding: "12px 28px",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    Ver baralhos →
                  </button>
                </div>
              ) : (
                <>
                  {/* Deck info bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#1c1917",
                          fontSize: 16,
                        }}
                      >
                        {activeDeck.name}
                      </span>
                      <span
                        style={{
                          marginLeft: 10,
                          background: AMBER_LIGHT,
                          color: AMBER_DARK,
                          borderRadius: 50,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {currentIndex + 1} de {cardOrder.length}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={handleShuffle}
                        title="Baralhar"
                        style={{
                          background: "white",
                          border: "1px solid #e7e5e4",
                          borderRadius: 10,
                          padding: "7px 12px",
                          cursor: "pointer",
                          fontSize: 16,
                          transition: "all 0.15s",
                          color: "#57534e",
                        }}
                      >
                        🔀
                      </button>
                      <button
                        onClick={resetDeckProgress}
                        title="Reiniciar progresso"
                        style={{
                          background: "white",
                          border: "1px solid #e7e5e4",
                          borderRadius: 10,
                          padding: "7px 12px",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#78716c",
                          transition: "all 0.15s",
                        }}
                      >
                        ↺ Reiniciar
                      </button>
                      <button
                        onClick={() => setActiveTab("decks")}
                        title="Mudar baralho"
                        style={{
                          background: "white",
                          border: "1px solid #e7e5e4",
                          borderRadius: 10,
                          padding: "7px 12px",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#78716c",
                        }}
                      >
                        🗂️ Trocar
                      </button>
                    </div>
                  </div>

                  {/* Progress tracker */}
                  <div
                    style={{
                      background: "white",
                      borderRadius: 18,
                      padding: "16px 20px",
                      marginBottom: 24,
                      boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <ProgressBar
                      known={knownCount}
                      review={reviewCount}
                      total={activeDeck.cards.length}
                    />
                  </div>

                  {/* ── The Card ── */}
                  <div
                    style={{
                      perspective: "1200px",
                      cursor: "pointer",
                      userSelect: "none",
                      marginBottom: 24,
                    }}
                    onClick={() => setIsFlipped((f) => !f)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <motion.div
                      style={{
                        position: "relative",
                        width: "100%",
                        minHeight: 220,
                        transformStyle: "preserve-3d",
                      }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Front */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: "white",
                          borderRadius: 24,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "36px 32px",
                          border: `2px solid ${
                            cardStatus === "known"
                              ? "#bbf7d0"
                              : cardStatus === "review"
                              ? AMBER_LIGHT
                              : "#f5f5f4"
                          }`,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 14,
                            right: 18,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#a8a29e",
                          }}
                        >
                          Pergunta
                        </div>
                        {cardStatus === "known" && (
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 16,
                              fontSize: 18,
                            }}
                          >
                            ✅
                          </div>
                        )}
                        {cardStatus === "review" && (
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 16,
                              fontSize: 18,
                            }}
                          >
                            🔄
                          </div>
                        )}
                        <p
                          style={{
                            fontSize: "clamp(20px, 5vw, 32px)",
                            fontWeight: 700,
                            color: "#1c1917",
                            textAlign: "center",
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {currentCard?.front ?? "—"}
                        </p>
                        <p
                          style={{
                            marginTop: 20,
                            fontSize: 13,
                            color: "#c4b5a0",
                            fontWeight: 500,
                          }}
                        >
                          Clica para ver a resposta
                        </p>
                      </div>

                      {/* Back */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          background: `linear-gradient(135deg, ${AMBER_LIGHT} 0%, #fef9ec 100%)`,
                          borderRadius: 24,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "36px 32px",
                          border: `2px solid ${AMBER}44`,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 14,
                            right: 18,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: AMBER_DARK,
                          }}
                        >
                          Resposta
                        </div>
                        <p
                          style={{
                            fontSize: "clamp(22px, 5.5vw, 34px)",
                            fontWeight: 800,
                            color: AMBER_DARK,
                            textAlign: "center",
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {currentCard?.back ?? "—"}
                        </p>
                        <p
                          style={{
                            marginTop: 20,
                            fontSize: 13,
                            color: "#92400e",
                            fontWeight: 500,
                            opacity: 0.7,
                          }}
                        >
                          Clica novamente para a pergunta
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Action buttons (Sei / Rever) ── */}
                  <AnimatePresence>
                    {isFlipped && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: "flex",
                          gap: 12,
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <motion.button
                          onClick={() => markCard("review")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            flex: 1,
                            maxWidth: 200,
                            padding: "14px 0",
                            borderRadius: 16,
                            border: "2px solid #fde68a",
                            background: "white",
                            color: "#b45309",
                            fontWeight: 700,
                            fontSize: 16,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          🔄 Rever
                        </motion.button>
                        <motion.button
                          onClick={() => markCard("known")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            flex: 1,
                            maxWidth: 200,
                            padding: "14px 0",
                            borderRadius: 16,
                            border: "none",
                            background: "#22c55e",
                            color: "white",
                            fontWeight: 700,
                            fontSize: 16,
                            cursor: "pointer",
                            boxShadow: "0 4px 16px #22c55e44",
                            transition: "all 0.2s",
                          }}
                        >
                          ✅ Sei
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Navigation arrows ── */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 20,
                      marginBottom: 8,
                    }}
                  >
                    <motion.button
                      onClick={goPrev}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: "2px solid #e7e5e4",
                        background: "white",
                        fontSize: 22,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                      }}
                    >
                      ←
                    </motion.button>

                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#78716c",
                        minWidth: 80,
                        textAlign: "center",
                      }}
                    >
                      {currentIndex + 1} de {cardOrder.length}
                    </span>

                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: "none",
                        background: AMBER,
                        color: "white",
                        fontSize: 22,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 14px ${AMBER}55`,
                      }}
                    >
                      →
                    </motion.button>
                  </div>

                  {/* Keyboard hints */}
                  <KeyboardHint
                    items={[
                      { key: "Space", label: "virar" },
                      { key: "←", label: "anterior" },
                      { key: "→", label: "próximo" },
                      { key: "1", label: "sei" },
                      { key: "2", label: "rever" },
                    ]}
                  />

                  {/* Completion banner */}
                  <AnimatePresence>
                    {activeDeck.cards.length > 0 &&
                      knownCount + reviewCount === activeDeck.cards.length && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            marginTop: 24,
                            background: "linear-gradient(135deg, #dcfce7, #d1fae5)",
                            border: "1.5px solid #86efac",
                            borderRadius: 18,
                            padding: "18px 24px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
                          <p
                            style={{
                              fontWeight: 700,
                              color: "#15803d",
                              margin: "0 0 4px",
                              fontSize: 16,
                            }}
                          >
                            Baralho completo!
                          </p>
                          <p style={{ color: "#16a34a", margin: 0, fontSize: 13 }}>
                            {knownCount} de {activeDeck.cards.length} cartões dominados.
                          </p>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════
              DECKS TAB
          ══════════════════════════════════════════════════ */}
          {activeTab === "decks" && (
            <motion.div
              key="decks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p
                style={{
                  color: "#78716c",
                  fontSize: 14,
                  marginBottom: 18,
                  fontWeight: 500,
                }}
              >
                Escolhe um baralho para estudar:
              </p>

              {/* Preset decks */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#a8a29e",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                Baralhos incluídos
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {PRESET_DECKS.map((deck) => {
                  const isActive = activeDeckId === deck.id;
                  const known = deck.cards.filter((c) => progress[c.id] === "known").length;
                  const pct = Math.round((known / deck.cards.length) * 100);
                  return (
                    <motion.button
                      key={deck.id}
                      onClick={() => selectDeck(deck.id)}
                      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        background: isActive
                          ? `linear-gradient(135deg, ${AMBER_LIGHT}, #fef9ec)`
                          : "white",
                        border: isActive ? `2px solid ${AMBER}` : "2px solid #f5f5f4",
                        borderRadius: 18,
                        padding: "18px 22px",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                        boxShadow: isActive
                          ? `0 4px 20px ${AMBER}33`
                          : "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 10,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#1c1917",
                          }}
                        >
                          {deck.name}
                        </span>
                        <span
                          style={{
                            background: isActive ? AMBER : "#f5f5f4",
                            color: isActive ? "white" : "#78716c",
                            borderRadius: 50,
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0,
                            marginLeft: 10,
                          }}
                        >
                          {deck.cards.length} cartões
                        </span>
                      </div>
                      {/* Mini progress bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            background: "#e7e5e4",
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              background: "#22c55e",
                              borderRadius: 999,
                              transition: "width 0.4s ease",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 12, color: "#a8a29e", fontWeight: 600 }}>
                          {pct}%
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom decks */}
              {customDecks.length > 0 && (
                <>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#a8a29e",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 10,
                    }}
                  >
                    Os meus baralhos
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {customDecks.map((deck) => {
                      const isActive = activeDeckId === deck.id;
                      const known = deck.cards.filter((c) => progress[c.id] === "known").length;
                      const pct = deck.cards.length > 0 ? Math.round((known / deck.cards.length) * 100) : 0;
                      return (
                        <motion.div
                          key={deck.id}
                          whileHover={{ y: -2 }}
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${AMBER_LIGHT}, #fef9ec)`
                              : "white",
                            border: isActive ? `2px solid ${AMBER}` : "2px solid #f5f5f4",
                            borderRadius: 18,
                            padding: "18px 22px",
                            boxShadow: isActive
                              ? `0 4px 20px ${AMBER}33`
                              : "0 2px 8px rgba(0,0,0,0.05)",
                            transition: "all 0.2s",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 10,
                            }}
                          >
                            <button
                              onClick={() => selectDeck(deck.id)}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                fontWeight: 700,
                                fontSize: 16,
                                color: "#1c1917",
                                textAlign: "left",
                                flex: 1,
                              }}
                            >
                              {deck.name}
                            </button>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                              <span
                                style={{
                                  background: isActive ? AMBER : "#f5f5f4",
                                  color: isActive ? "white" : "#78716c",
                                  borderRadius: 50,
                                  padding: "3px 10px",
                                  fontSize: 12,
                                  fontWeight: 700,
                                }}
                              >
                                {deck.cards.length} cartões
                              </span>
                              <button
                                onClick={() => deleteCustomDeck(deck.id)}
                                title="Eliminar baralho"
                                style={{
                                  background: "none",
                                  border: "1px solid #fca5a5",
                                  borderRadius: 8,
                                  padding: "3px 8px",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                  fontSize: 12,
                                  fontWeight: 600,
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                              style={{
                                flex: 1,
                                height: 6,
                                background: "#e7e5e4",
                                borderRadius: 999,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${pct}%`,
                                  background: "#22c55e",
                                  borderRadius: 999,
                                  transition: "width 0.4s ease",
                                }}
                              />
                            </div>
                            <span style={{ fontSize: 12, color: "#a8a29e", fontWeight: 600 }}>
                              {pct}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}

              <button
                onClick={() => setActiveTab("create")}
                style={{
                  width: "100%",
                  background: "white",
                  border: `2px dashed ${AMBER}`,
                  borderRadius: 18,
                  padding: "18px",
                  cursor: "pointer",
                  color: AMBER_DARK,
                  fontWeight: 700,
                  fontSize: 15,
                  transition: "all 0.2s",
                }}
              >
                + Criar novo baralho
              </button>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════
              CREATE TAB
          ══════════════════════════════════════════════════ */}
          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 24,
                  padding: "28px 24px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <h2
                  style={{
                    fontWeight: 800,
                    color: "#1c1917",
                    margin: "0 0 20px",
                    fontSize: 20,
                  }}
                >
                  ✏️ Criar novo baralho
                </h2>

                {/* Deck name */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#57534e",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    Nome do baralho
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Vocabulário de Biologia"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: "2px solid #e7e5e4",
                      padding: "11px 14px",
                      fontSize: 15,
                      fontFamily: "inherit",
                      color: "#1c1917",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = AMBER)}
                    onBlur={(e) => (e.target.style.borderColor = "#e7e5e4")}
                  />
                </div>

                {/* Cards */}
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#57534e",
                    marginBottom: 12,
                  }}
                >
                  Cartões ({newCards.filter((c) => c.front.trim() && c.back.trim()).length} válidos)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  {newCards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr auto",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder={`Frente ${i + 1}`}
                        value={card.front}
                        onChange={(e) => updateCard(i, "front", e.target.value)}
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #e7e5e4",
                          padding: "9px 12px",
                          fontSize: 14,
                          fontFamily: "inherit",
                          color: "#1c1917",
                          outline: "none",
                          transition: "border-color 0.2s",
                          minWidth: 0,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = AMBER)}
                        onBlur={(e) => (e.target.style.borderColor = "#e7e5e4")}
                      />
                      <input
                        type="text"
                        placeholder={`Verso ${i + 1}`}
                        value={card.back}
                        onChange={(e) => updateCard(i, "back", e.target.value)}
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #e7e5e4",
                          padding: "9px 12px",
                          fontSize: 14,
                          fontFamily: "inherit",
                          color: "#1c1917",
                          outline: "none",
                          transition: "border-color 0.2s",
                          minWidth: 0,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = AMBER)}
                        onBlur={(e) => (e.target.style.borderColor = "#e7e5e4")}
                      />
                      <button
                        onClick={() => removeCardRow(i)}
                        disabled={newCards.length <= 1}
                        style={{
                          background: "none",
                          border: "1px solid #fca5a5",
                          borderRadius: 8,
                          width: 34,
                          height: 34,
                          cursor: newCards.length <= 1 ? "not-allowed" : "pointer",
                          color: newCards.length <= 1 ? "#d6d3d1" : "#ef4444",
                          borderColor: newCards.length <= 1 ? "#e7e5e4" : "#fca5a5",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={addCardRow}
                  style={{
                    width: "100%",
                    background: "#fffbeb",
                    border: `1.5px dashed ${AMBER}`,
                    borderRadius: 10,
                    padding: "10px",
                    cursor: "pointer",
                    color: AMBER_DARK,
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 20,
                    transition: "background 0.2s",
                  }}
                >
                  + Adicionar cartão
                </button>

                <motion.button
                  onClick={handleCreateDeck}
                  disabled={
                    !newDeckName.trim() ||
                    newCards.filter((c) => c.front.trim() && c.back.trim()).length < 1
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: 16,
                    border: "none",
                    background:
                      !newDeckName.trim() ||
                      newCards.filter((c) => c.front.trim() && c.back.trim()).length < 1
                        ? "#e7e5e4"
                        : AMBER,
                    color:
                      !newDeckName.trim() ||
                      newCards.filter((c) => c.front.trim() && c.back.trim()).length < 1
                        ? "#a8a29e"
                        : "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor:
                      !newDeckName.trim() ||
                      newCards.filter((c) => c.front.trim() && c.back.trim()).length < 1
                        ? "not-allowed"
                        : "pointer",
                    boxShadow:
                      !newDeckName.trim() ||
                      newCards.filter((c) => c.front.trim() && c.back.trim()).length < 1
                        ? "none"
                        : `0 6px 20px ${AMBER}50`,
                    transition: "all 0.2s",
                  }}
                >
                  Criar e estudar →
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
