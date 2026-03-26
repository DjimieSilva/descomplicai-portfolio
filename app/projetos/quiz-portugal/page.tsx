"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct option
  fact: string; // fun fact shown after answer
}

type GameState = "intro" | "playing" | "results";

// ---------------------------------------------------------------------------
// Questions bank
// ---------------------------------------------------------------------------

const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual é o rio mais longo de Portugal continental?",
    options: ["Douro", "Tejo", "Guadiana", "Mondego"],
    correct: 1,
    fact: "O Tejo é o maior rio da Península Ibérica, com 1 007 km de comprimento total, dos quais 275 km em Portugal.",
  },
  {
    id: 2,
    question: "Em que ano foi a Revolução dos Cravos?",
    options: ["1968", "1970", "1974", "1976"],
    correct: 2,
    fact: "A 25 de abril de 1974, o Movimento das Forças Armadas derrubou o Estado Novo e devolveu a democracia a Portugal.",
  },
  {
    id: 3,
    question: "Qual é o ponto mais alto de Portugal continental?",
    options: ["Pico Ruivo", "Serra do Gerês", "Torre (Serra da Estrela)", "Montejunto"],
    correct: 2,
    fact: "A Torre, na Serra da Estrela, atinge 1 993 m de altitude — o ponto mais alto de Portugal continental.",
  },
  {
    id: 4,
    question: "O Pastel de Nata foi criado originalmente em que local de Lisboa?",
    options: ["Alfama", "Chiado", "Belém", "Intendente"],
    correct: 2,
    fact: "Os Pastéis de Belém foram criados pelos monges do Mosteiro dos Jerónimos no séc. XIX. A receita original é segredo de Estado.",
  },
  {
    id: 5,
    question: "Qual é a capital da Região Autónoma dos Açores?",
    options: ["Horta", "Ponta Delgada", "Angra do Heroísmo", "Velas"],
    correct: 1,
    fact: "Ponta Delgada, na ilha de São Miguel, é a maior cidade e capital administrativa dos Açores desde 1832.",
  },
  {
    id: 6,
    question: "Quem escreveu 'Os Lusíadas'?",
    options: ["Fernando Pessoa", "Eça de Queirós", "Luís de Camões", "José Saramago"],
    correct: 2,
    fact: "Luís Vaz de Camões publicou 'Os Lusíadas' em 1572. É considerado o maior poema épico da literatura portuguesa.",
  },
  {
    id: 7,
    question: "Qual destas cidades NÃO fica no Alentejo?",
    options: ["Évora", "Beja", "Portalegre", "Faro"],
    correct: 3,
    fact: "Faro é a capital do Algarve, a região mais a sul de Portugal continental. Évora, Beja e Portalegre são capitais de distrito alentejanas.",
  },
  {
    id: 8,
    question: "O fado foi classificado como Património Imaterial da UNESCO em que ano?",
    options: ["2005", "2008", "2011", "2015"],
    correct: 2,
    fact: "Em novembro de 2011, a UNESCO inscreveu o Fado na Lista Representativa do Património Cultural Imaterial da Humanidade.",
  },
  {
    id: 9,
    question: "Qual é o prato típico associado à cidade do Porto?",
    options: ["Cozido à Portuguesa", "Tripas à moda do Porto", "Arroz de lampreia", "Bacalhau à Brás"],
    correct: 1,
    fact: "As Tripas à Moda do Porto deram aos portuenses o apelido de 'tripeiros'. A lenda diz que a cidade doou as carnes para abastecer a frota de Ceuta em 1415.",
  },
  {
    id: 10,
    question: "Quantos municípios tem Portugal continental?",
    options: ["218", "278", "308", "350"],
    correct: 2,
    fact: "Portugal continental tem 278 municípios, às quais se somam 19 nos Açores e 11 na Madeira, totalizando 308 municípios.",
  },
  {
    id: 11,
    question: "Qual foi o primeiro clube português a ganhar a Liga dos Campeões da UEFA?",
    options: ["Benfica", "Porto", "Sporting", "Boavista"],
    correct: 0,
    fact: "O Benfica foi o primeiro campeão português, vencendo a Taça dos Clubes Campeões Europeus em 1961 e 1962.",
  },
  {
    id: 12,
    question: "A Torre de Belém foi construída no reinado de que rei?",
    options: ["D. Afonso Henriques", "D. Manuel I", "D. Sebastião", "D. João II"],
    correct: 1,
    fact: "A Torre de Belém foi mandada construir por D. Manuel I no séc. XVI, no estilo Manuelino, para defender a entrada do Tejo.",
  },
  {
    id: 13,
    question: "Qual é a bebida alcoólica típica da Madeira?",
    options: ["Vinho do Porto", "Ginjinha", "Vinho Madeira", "Bagaço"],
    correct: 2,
    fact: "O Vinho Madeira é um vinho fortificado com Denominação de Origem Protegida, conhecido mundialmente desde o séc. XVI.",
  },
  {
    id: 14,
    question: "Em que cidade portuguesa nasceu Cristiano Ronaldo?",
    options: ["Lisboa", "Porto", "Funchal", "Braga"],
    correct: 2,
    fact: "Cristiano Ronaldo dos Santos Aveiro nasceu no Funchal, Madeira, a 5 de fevereiro de 1985. O aeroporto da Madeira tem o seu nome.",
  },
  {
    id: 15,
    question: "Qual é o maior lago natural de Portugal?",
    options: ["Lagoa das Sete Cidades", "Lagoa do Fogo", "Lagoa das Furnas", "Lagoa Comprida"],
    correct: 0,
    fact: "A Lagoa das Sete Cidades, nos Açores, é o maior lago natural de Portugal com 4,4 km². A sua lenda conta a história de um amor impossível entre um príncipe e uma pastora.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getTitle(score: number): { label: string; emoji: string } {
  if (score === 15) return { label: "Camões reencarnado!", emoji: "🏆" };
  if (score >= 11) return { label: "Português de gema", emoji: "🇵🇹" };
  if (score >= 6) return { label: "Conhecedor", emoji: "📚" };
  return { label: "Turista", emoji: "🧳" };
}

// ---------------------------------------------------------------------------
// Confetti component (CSS-only, no external lib needed)
// ---------------------------------------------------------------------------

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => i);
  const colors = ["#16a34a", "#dc2626", "#fbbf24", "#3b82f6", "#a855f7", "#f97316"];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((i) => {
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2.5 + Math.random() * 2;
        const size = 6 + Math.random() * 10;
        const isCircle = i % 3 === 0;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: [1, 1, 0],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
              x: [`${left}vw`, `${left + (Math.random() * 10 - 5)}vw`],
            }}
            transition={{ duration, delay, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              width: size,
              height: isCircle ? size : size * 0.4,
              borderRadius: isCircle ? "50%" : 2,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timer ring
// ---------------------------------------------------------------------------

function TimerRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const progress = seconds / total;
  const dashOffset = circ * (1 - progress);
  const color = seconds <= 5 ? "#dc2626" : seconds <= 10 ? "#f97316" : "#16a34a";

  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      <svg className="absolute inset-0 -rotate-90" width="56" height="56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <span
        className="text-lg font-bold tabular-nums"
        style={{ color }}
      >
        {seconds}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const TIMER_SECONDS = 15;

export default function QuizPortugalPage() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [showFact, setShowFact] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    setQuestions(shuffle(ALL_QUESTIONS));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowFact(false);
    setTimeUp(false);
    setTimer(TIMER_SECONDS);
    setShowConfetti(false);
    setGameState("playing");
  }, []);

  // Start timer when question changes
  useEffect(() => {
    if (gameState !== "playing") return;
    stopTimer();
    setTimer(TIMER_SECONDS);
    setSelected(null);
    setShowFact(false);
    setTimeUp(false);

    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          stopTimer();
          setTimeUp(true);
          setShowFact(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, gameState]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null || timeUp) return;
      stopTimer();
      setSelected(idx);
      setShowFact(true);
      if (idx === questions[current].correct) {
        setScore((s) => s + 1);
      }
    },
    [selected, timeUp, stopTimer, questions, current]
  );

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setGameState("results");
      // Check if perfect score (score already updated)
      // We check in results screen
    } else {
      setCurrent((c) => c + 1);
    }
  }, [current, questions.length]);

  // Show confetti on perfect score
  useEffect(() => {
    if (gameState === "results") {
      const finalScore = score;
      if (finalScore === 15) {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(t);
      }
    }
  }, [gameState, score]);

  const q = questions[current];
  const progress = questions.length > 0 ? ((current) / questions.length) * 100 : 0;

  // ---------------------------------------------------------------------------
  // Intro screen
  // ---------------------------------------------------------------------------
  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg w-full text-center"
        >
          <div className="text-7xl mb-6">🇵🇹</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Quanto sabes sobre Portugal?
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            15 perguntas sobre geografia, história, cultura e gastronomia portuguesa. Tens{" "}
            <span className="text-green-500 font-semibold">15 segundos</span> por pergunta.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: "❓", label: "15 perguntas" },
              { icon: "⏱️", label: "15 seg / pergunta" },
              { icon: "🏆", label: "4 títulos" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-gray-300 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="w-full py-4 px-8 rounded-2xl text-white font-bold text-xl transition-all"
            style={{
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #dc2626 100%)",
            }}
          >
            Começar o Quiz
          </motion.button>

          <p className="mt-6 text-gray-600 text-sm">
            As perguntas são baralhadas em cada jogo.
          </p>
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Results screen
  // ---------------------------------------------------------------------------
  if (gameState === "results") {
    const { label, emoji } = getTitle(score);
    const pct = Math.round((score / 15) * 100);

    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        {showConfetti && <Confetti />}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-lg w-full"
        >
          <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
            {/* Header */}
            <div
              className="p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #052e16 0%, #1c0a0a 100%)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {emoji}
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-1">{label}</h2>
              <p className="text-gray-400">O teu resultado final</p>
            </div>

            {/* Score */}
            <div className="p-8">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <div className="text-6xl font-black text-white tabular-nums">
                    {score}
                    <span className="text-3xl text-gray-500">/15</span>
                  </div>
                  <div className="text-gray-400 mt-1">{pct}% de acertos</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      score === 15
                        ? "linear-gradient(90deg, #16a34a, #4ade80)"
                        : score >= 11
                        ? "linear-gradient(90deg, #16a34a, #86efac)"
                        : score >= 6
                        ? "linear-gradient(90deg, #f97316, #fbbf24)"
                        : "linear-gradient(90deg, #dc2626, #f87171)",
                  }}
                />
              </div>

              {/* Tier breakdown */}
              <div className="grid grid-cols-4 gap-2 mb-8 text-center text-xs">
                {[
                  { range: "0–5", label: "Turista 🧳", min: 0, max: 5 },
                  { range: "6–10", label: "Conhecedor 📚", min: 6, max: 10 },
                  { range: "11–14", label: "Português 🇵🇹", min: 11, max: 14 },
                  { range: "15", label: "Camões 🏆", min: 15, max: 15 },
                ].map((tier) => {
                  const active = score >= tier.min && score <= tier.max;
                  return (
                    <div
                      key={tier.range}
                      className={`rounded-lg p-2 border transition-all ${
                        active
                          ? "border-green-600 bg-green-950 text-green-300"
                          : "border-gray-800 text-gray-600"
                      }`}
                    >
                      <div className="font-bold text-sm">{tier.range}</div>
                      <div className="leading-tight mt-0.5">{tier.label}</div>
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 50%, #dc2626 100%)",
                }}
              >
                🔄 Jogar Novamente
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Playing screen
  // ---------------------------------------------------------------------------
  if (!q) return null;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Score badge */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="text-white font-bold tabular-nums">{score}</span>
            <span className="text-gray-500 text-sm">pts</span>
          </div>

          {/* Question counter */}
          <span className="text-gray-400 text-sm font-medium">
            Pergunta <span className="text-white font-bold">{current + 1}</span> / 15
          </span>

          {/* Timer */}
          <TimerRing seconds={timer} total={TIMER_SECONDS} />
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-6">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #16a34a, #dc2626)" }}
          />
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden"
          >
            {/* Question */}
            <div className="p-6 pb-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Questão {current + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {q.question}
              </h2>
            </div>

            {/* Time up banner */}
            <AnimatePresence>
              {timeUp && !selected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-4 mb-2 bg-red-950 border border-red-800 rounded-xl px-4 py-2 text-red-300 text-sm font-medium text-center"
                >
                  ⏰ Tempo esgotado!
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options */}
            <div className="px-4 pb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correct;
                const isSelected = idx === selected;
                const answered = selected !== null || timeUp;

                let borderColor = "border-gray-700";
                let bgColor = "bg-gray-800 hover:bg-gray-750";
                let textColor = "text-gray-200";
                let icon = "";

                if (answered) {
                  if (isCorrect) {
                    borderColor = "border-green-500";
                    bgColor = "bg-green-950";
                    textColor = "text-green-200";
                    icon = "✓";
                  } else if (isSelected && !isCorrect) {
                    borderColor = "border-red-500";
                    bgColor = "bg-red-950";
                    textColor = "text-red-200";
                    icon = "✗";
                  } else {
                    borderColor = "border-gray-800";
                    bgColor = "bg-gray-900";
                    textColor = "text-gray-500";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`relative text-left px-4 py-3 rounded-xl border transition-all duration-200 ${borderColor} ${bgColor} ${textColor} font-medium text-sm disabled:cursor-default`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 flex-shrink-0 rounded-md border border-current flex items-center justify-center text-xs font-bold opacity-60">
                        {["A", "B", "C", "D"][idx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {icon && (
                        <span className={`font-bold text-base ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                          {icon}
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Fun fact + Next button */}
            <AnimatePresence>
              {showFact && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="mx-4 mb-4 bg-blue-950 border border-blue-800 rounded-xl px-4 py-3">
                    <p className="text-blue-200 text-sm leading-relaxed">
                      <span className="font-semibold text-blue-300">💡 Sabias que… </span>
                      {q.fact}
                    </p>
                  </div>

                  <div className="px-4 pb-5">
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-2xl text-white font-bold text-base"
                      style={{
                        background:
                          current + 1 >= questions.length
                            ? "linear-gradient(135deg, #16a34a, #dc2626)"
                            : "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                      }}
                    >
                      {current + 1 >= questions.length ? "Ver Resultados 🏁" : "Próxima Pergunta →"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-gray-700 text-xs mt-6">
          Quiz Portugal · Descomplicai
        </p>
      </div>
    </div>
  );
}
