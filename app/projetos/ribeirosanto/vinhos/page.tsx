"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Wine,
  Filter,
  ChevronDown,
  Award,
  Grape,
  UtensilsCrossed,
  ArrowUpDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   WINE DATA
   ═══════════════════════════════════════════════ */

type WineCategory = "branco" | "tinto" | "espumante";

interface WineRating {
  source: string;
  score: string;
}

interface WineData {
  id: number;
  name: string;
  vintage: string;
  category: WineCategory;
  price: number;
  grapes: string[];
  alcohol?: string;
  vivino?: { score: number; votes: string };
  ratings: WineRating[];
  badges: string[];
  tastingShort: string;
  tastingFull: string;
  vinification?: string;
  aging?: string;
  altitude?: string;
  pairings?: string[];
  quotes?: string[];
}

const WINES: WineData[] = [
  {
    id: 1,
    name: "Encruzado",
    vintage: "2024",
    category: "branco",
    price: 9.9,
    grapes: ["100% Encruzado"],
    altitude: "400-600m, solos graníticos",
    vinification:
      "Vindima manual, fermentação controlada ~15\u00b0C durante 20 dias. 50% do lote estagiou em barrica nova de carvalho francês.",
    vivino: { score: 3.9, votes: "5.800" },
    ratings: [
      { source: "Wine Enthusiast", score: "91/100" },
      { source: "Robert Parker", score: "89/100" },
      { source: "Revista de Vinhos", score: "17/20" },
      { source: "Berliner Wine Trophy", score: "Ouro 2013" },
    ],
    badges: ["Top 2% Global", "Top 3% Dão"],
    tastingShort:
      "Cor cristalina com nuances verdes. Aromas de pera e flores brancas. Acidez cítrica, boa estrutura.",
    tastingFull:
      "Cor cristalina com nuances verdes. No nariz, aromas elegantes de pera e flores brancas. Na boca, acidez cítrica bem integrada, boa estrutura e um final persistente e mineral.",
    pairings: ["Saladas", "Carnes brancas", "Sushi", "Peixe grelhado"],
  },
  {
    id: 2,
    name: "Malvasia Fina & Encruzado",
    vintage: "2024",
    category: "branco",
    price: 5.6,
    grapes: ["Malvasia Fina", "Encruzado"],
    vivino: { score: 3.7, votes: "1.274" },
    ratings: [
      { source: "Wine Spectator", score: "89/100" },
      { source: "International Wine Challenge", score: "Prata" },
      { source: "Mundus Vini", score: "Prata" },
    ],
    badges: [],
    tastingShort:
      "Aroma fino, mineral, fresco com acidez cítrica e final elegante.",
    tastingFull:
      "Aroma fino e complexo, com notas minerais evidentes. Na boca é fresco, com acidez cítrica equilibrada e um final elegante e persistente.",
    pairings: ["Saladas", "Carnes brancas", "Sushi", "Peixe grelhado"],
  },
  {
    id: 3,
    name: "Vinha da Neve",
    vintage: "Branco",
    category: "branco",
    price: 30.42,
    grapes: ["Encruzado"],
    aging: "12 meses em barrica nova de carvalho francês",
    vivino: { score: 4.1, votes: "117" },
    ratings: [],
    badges: ["Top 3% Global", "Top 4% Dão"],
    tastingShort:
      "Notas de carvalho, baunilha e tabaco. Frutos vermelhos, cereja. Terroso, couro.",
    tastingFull:
      "Complexo e envolvente, com notas de carvalho, baunilha e tabaco no nariz. Na boca revela frutos vermelhos, cereja, com nuances terrosas e de couro. Estágio de 12 meses em barrica nova confere grande profundidade e elegância.",
    pairings: ["Pratos elaborados", "Queijos curados", "Bacalhau assado"],
  },
  {
    id: 4,
    name: "Tinto",
    vintage: "2021",
    category: "tinto",
    price: 5.2,
    grapes: ["Touriga Nacional", "Tinta Roriz", "Alfrocheiro Preto"],
    alcohol: "13%",
    vivino: { score: 3.8, votes: "140" },
    ratings: [],
    badges: ["Top 8% Global", "Top 14% Dão"],
    tastingShort:
      "Notas de carvalho, baunilha, tabaco. Frutos vermelhos, cereja, especiarias.",
    tastingFull:
      "Aromas de carvalho, baunilha e tabaco que se fundem com frutos vermelhos, cereja e especiarias. Na boca é equilibrado, com taninos macios e um final agradável. Excelente relação qualidade-preço.",
    quotes: [
      "\u201cExcelente vinho do dia-a-dia\u201d",
      "\u201cValor extraordinário\u201d",
    ],
    pairings: ["Carnes vermelhas", "Massas", "Queijos", "Churrasco"],
  },
  {
    id: 5,
    name: "Grande Escolha",
    vintage: "Tinto 2020",
    category: "tinto",
    price: 23.49,
    grapes: [
      "Alfrocheiro",
      "Tinta Roriz",
      "Tinto Cão",
      "Touriga Nacional",
    ],
    alcohol: "14%",
    vinification:
      "Vindima manual no final de setembro, maceração a frio 24h, fermentação ~15 dias. Estágio de 14 meses em barrica nova de carvalho francês, mínimo 6 meses em garrafa.",
    ratings: [],
    badges: [],
    tastingShort:
      "Aroma imponente, notas minerais, fruta selvagem, discretos fumados. Excelente frescura.",
    tastingFull:
      "Aroma imponente com notas minerais, fruta selvagem e discretos apontamentos fumados. Na boca, excelente frescura, carácter e elegância. Um vinho de grande complexidade que revela a maestria do terroir do Dão.",
    pairings: [
      "Carnes de caça",
      "Cordeiro assado",
      "Queijos curados",
      "Pratos com trufa",
    ],
  },
  {
    id: 6,
    name: "Vinha da Neve",
    vintage: "Tinto 2021",
    category: "tinto",
    price: 30.42,
    grapes: ["Touriga Nacional", "Tinto Cão", "Alfrocheiro"],
    aging: "12 meses em barrica nova de carvalho francês",
    vivino: { score: 4.1, votes: "117" },
    ratings: [],
    badges: ["Top 3% Global", "Top 4% Dão"],
    tastingShort:
      "Amora, ameixa preta, amoreira. Baunilha, especiarias doces. Taninos firmes, acidez fresca.",
    tastingFull:
      "No nariz, amora intensa, ameixa preta e amoreira. Notas de baunilha, especiarias doces de pastelaria, folha de tabaco, alecrim e tomilho seco. Na boca, taninos firmes, acidez fresca e mineralidade de pederneira. Encorpado e persistente.",
    pairings: [
      "Carnes de caça grossa",
      "Estufados",
      "Queijos de pasta dura",
    ],
  },
  {
    id: 7,
    name: "Encruzado E.T.",
    vintage: "2014",
    category: "tinto",
    price: 42.0,
    grapes: ["Touriga Nacional", "Encruzado"],
    alcohol: "14%",
    ratings: [
      { source: "Robert Parker", score: "89 pts" },
      {
        source: "Grandes Escolhas",
        score: "18.5 pts \u2014 Top 30 Vinhos de Portugal",
      },
      { source: "Revista de Vinhos", score: "Os Melhores de Portugal" },
    ],
    badges: ["Premium", "Top 30 Portugal"],
    tastingShort:
      "Aroma delicado combinando frutos vermelhos com nuances de chá e especiarias. Elegante.",
    tastingFull:
      "Aroma delicado que combina frutos vermelhos com nuances de chá e especiarias. Na boca é elegante, com acidez marcada, taninos polidos e um longo final mineral. Vinho ícone da casa, representando o melhor do Dão.",
    pairings: [
      "Pratos de alta gastronomia",
      "Carnes nobres",
      "Queijos afinados",
    ],
  },
  {
    id: 8,
    name: "Blanc de Noirs",
    vintage: "NV",
    category: "espumante",
    price: 0,
    grapes: ["Touriga Nacional", "Pinheira"],
    ratings: [],
    badges: ["Método Tradicional"],
    tastingShort:
      "Sabores de citrinos e maçã verde. Método tradicional, bolha fina e persistente.",
    tastingFull:
      "Elaborado pelo método tradicional com as castas Touriga Nacional e Pinheira. Sabores vibrantes de citrinos e maçã verde, bolha fina e persistente. Um espumante de carácter que surpreende pela frescura e elegância.",
    pairings: ["Aperitivos", "Marisco", "Celebrações", "Sushi"],
  },
];

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

const CATEGORY_LABELS: Record<WineCategory, string> = {
  branco: "Branco",
  tinto: "Tinto",
  espumante: "Espumante",
};

const CATEGORY_COLORS: Record<WineCategory, { bg: string; text: string; border: string }> = {
  branco: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  tinto: {
    bg: "bg-red-50",
    text: "text-red-900",
    border: "border-red-200",
  },
  espumante: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
};

type FilterType = "todos" | WineCategory;

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "branco", label: "Brancos" },
  { key: "tinto", label: "Tintos" },
  { key: "espumante", label: "Espumante" },
];

function renderStars(score: number) {
  const full = Math.floor(score);
  const hasHalf = score - full >= 0.3;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <Star
          key={i}
          size={14}
          className="fill-amber-400 text-amber-400"
        />
      );
    } else if (i === full && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block" style={{ width: 14, height: 14 }}>
          <Star size={14} className="text-stone-300 absolute inset-0" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star size={14} className="fill-amber-400 text-amber-400" />
          </span>
        </span>
      );
    } else {
      stars.push(
        <Star key={i} size={14} className="text-stone-300" />
      );
    }
  }
  return stars;
}

/* ═══════════════════════════════════════════════
   FOOD PAIRING DATA
   ═══════════════════════════════════════════════ */

const PAIRINGS = [
  {
    type: "Brancos",
    icon: "bg-amber-100 text-amber-700",
    foods: ["Saladas frescas", "Carnes brancas", "Sushi & Sashimi", "Peixe grelhado"],
    description: "Os brancos Ribeiro Santo, com a sua acidez cítrica e frescura mineral, são companheiros ideais para pratos leves e delicados.",
  },
  {
    type: "Tintos",
    icon: "bg-red-100 text-red-800",
    foods: ["Carnes vermelhas", "Caça", "Queijos curados", "Estufados"],
    description: "Os tintos encorpados do Dão, com taninos firmes e notas de fruta madura, pedem pratos robustos e de sabor intenso.",
  },
  {
    type: "Espumante",
    icon: "bg-emerald-100 text-emerald-700",
    foods: ["Aperitivos", "Marisco", "Celebrações", "Sobremesas leves"],
    description: "O Blanc de Noirs, com a sua bolha fina e sabores cítricos, é versátil: do aperitivo à celebração.",
  },
];

/* ═══════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════ */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const expandVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function VinhosPage() {
  const [filter, setFilter] = useState<FilterType>("todos");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | null>(null);

  const filtered =
    filter === "todos"
      ? WINES
      : WINES.filter((w) => w.category === filter);

  const sorted = sortByPrice
    ? [...filtered].sort((a, b) =>
        sortByPrice === "asc" ? a.price - b.price : b.price - a.price
      )
    : filtered;

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{
          background:
            "linear-gradient(135deg, #1a0a0a 0%, #2d1118 40%, #1a0f0a 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, #8b2252 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="inline-flex items-center gap-2 text-amber-400/80 text-sm tracking-[0.2em] uppercase mb-6">
              <Wine size={16} />
              Catálogo
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              Os Nossos Vinhos
            </h1>
            <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Cada garrafa conta a história do Dão
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FILTER TABS ═══════════════ */}
      <section className="sticky top-16 z-30 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 overflow-x-auto">
            <Filter size={16} className="text-stone-400 mr-2 hidden md:block" />
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key);
                  setExpandedId(null);
                }}
                className={`relative px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? "text-white"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-100"
                }`}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="wine-filter-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, #8b2252, #6b1a3a)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>

          <span className="text-sm text-stone-400 whitespace-nowrap flex-shrink-0">
            {sorted.length} vinho{sorted.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ═══════════════ WINE GRID ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {sorted.map((wine, i) => {
              const isExpanded = expandedId === wine.id;
              const catColors = CATEGORY_COLORS[wine.category];

              return (
                <motion.div
                  key={wine.id}
                  custom={i}
                  variants={cardVariants}
                  layout
                  className={`group rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isExpanded
                      ? "md:col-span-2 border-[#8b2252]/40 shadow-lg shadow-[#8b2252]/10"
                      : "border-stone-200 hover:border-[#8b2252]/30 hover:shadow-md hover:-translate-y-1"
                  } bg-[#faf8f5]`}
                  onClick={() => toggleExpand(wine.id)}
                >
                  {/* ── Card Header ── */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      {/* Category badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${catColors.bg} ${catColors.text} ${catColors.border}`}
                      >
                        <Grape size={12} />
                        {CATEGORY_LABELS[wine.category]}
                      </span>

                      {/* Price */}
                      {wine.price > 0 ? (
                        <span className="text-lg font-semibold text-stone-800">
                          {wine.price.toFixed(2).replace(".", ",")}
                          <span className="text-sm text-stone-400 ml-0.5">&euro;</span>
                        </span>
                      ) : (
                        <span className="text-sm text-stone-400 italic">
                          Consultar
                        </span>
                      )}
                    </div>

                    {/* Wine name */}
                    <h3
                      className="text-xl md:text-2xl font-light text-stone-900 mb-1"
                      style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                    >
                      {wine.name}{" "}
                      <span className="text-stone-400 text-lg">{wine.vintage}</span>
                    </h3>

                    {/* Grapes */}
                    <p className="text-sm text-stone-500 mb-4">
                      {wine.grapes.join(" \u00b7 ")}
                    </p>

                    {/* Vivino score */}
                    {wine.vivino && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                          {renderStars(wine.vivino.score)}
                        </div>
                        <span className="text-sm font-medium text-stone-700">
                          {wine.vivino.score.toFixed(1)}
                        </span>
                        <span className="text-xs text-stone-400">
                          ({wine.vivino.votes} votos)
                        </span>
                      </div>
                    )}

                    {/* Tasting short */}
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      {wine.tastingShort}
                    </p>

                    {/* Badges */}
                    {wine.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {wine.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
                            style={{
                              background: "linear-gradient(135deg, #c9a84c20, #d4af3720)",
                              color: "#8b6914",
                              border: "1px solid #d4af3740",
                            }}
                          >
                            <Award size={10} />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Ratings pills */}
                    {wine.ratings.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {wine.ratings.slice(0, isExpanded ? undefined : 2).map((r) => (
                          <span
                            key={r.source}
                            className="text-[11px] text-stone-500 bg-stone-100 border border-stone-200 rounded-full px-2.5 py-0.5"
                          >
                            <span className="font-medium text-stone-700">{r.source}</span>{" "}
                            {r.score}
                          </span>
                        ))}
                        {!isExpanded && wine.ratings.length > 2 && (
                          <span className="text-[11px] text-stone-400 px-1 py-0.5">
                            +{wine.ratings.length - 2} mais
                          </span>
                        )}
                      </div>
                    )}

                    {/* Expand indicator */}
                    <div
                      className={`flex items-center gap-1 mt-3 text-xs font-medium transition-all duration-300 ${
                        isExpanded
                          ? "text-[#8b2252]"
                          : "text-stone-400 group-hover:text-[#8b2252]"
                      }`}
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                      {isExpanded ? "Ver menos" : "Ver mais"}
                    </div>
                  </div>

                  {/* ── Expanded Details ── */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        variants={expandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-stone-200/60">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left column */}
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                  Notas de Prova
                                </h4>
                                <p className="text-sm text-stone-700 leading-relaxed">
                                  {wine.tastingFull}
                                </p>
                              </div>

                              {wine.vinification && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                    Vinificação
                                  </h4>
                                  <p className="text-sm text-stone-700 leading-relaxed">
                                    {wine.vinification}
                                  </p>
                                </div>
                              )}

                              {wine.aging && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                    Estágio
                                  </h4>
                                  <p className="text-sm text-stone-700 leading-relaxed">
                                    {wine.aging}
                                  </p>
                                </div>
                              )}

                              {wine.quotes && wine.quotes.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                    O que Dizem
                                  </h4>
                                  {wine.quotes.map((q) => (
                                    <p
                                      key={q}
                                      className="text-sm text-stone-600 italic mb-1"
                                    >
                                      {q}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Right column */}
                            <div className="space-y-4">
                              {/* Technical info */}
                              <div className="bg-stone-100/60 rounded-xl p-4 space-y-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                                  Ficha Técnica
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <span className="text-stone-500">Castas</span>
                                  <span className="text-stone-800 font-medium">
                                    {wine.grapes.join(", ")}
                                  </span>

                                  {wine.alcohol && (
                                    <>
                                      <span className="text-stone-500">Álcool</span>
                                      <span className="text-stone-800 font-medium">
                                        {wine.alcohol}
                                      </span>
                                    </>
                                  )}

                                  {wine.altitude && (
                                    <>
                                      <span className="text-stone-500">Altitude</span>
                                      <span className="text-stone-800 font-medium">
                                        {wine.altitude}
                                      </span>
                                    </>
                                  )}

                                  <span className="text-stone-500">Região</span>
                                  <span className="text-stone-800 font-medium">
                                    Dão DOC
                                  </span>

                                  {wine.price > 0 && (
                                    <>
                                      <span className="text-stone-500">PVP</span>
                                      <span className="text-stone-800 font-medium">
                                        {wine.price.toFixed(2).replace(".", ",")} &euro;
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* All ratings */}
                              {wine.ratings.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                    Prémios e Classificações
                                  </h4>
                                  <div className="space-y-1.5">
                                    {wine.ratings.map((r) => (
                                      <div
                                        key={r.source}
                                        className="flex items-center gap-2 text-sm"
                                      >
                                        <Award
                                          size={12}
                                          className="text-amber-500 shrink-0"
                                        />
                                        <span className="text-stone-700">
                                          <span className="font-medium">
                                            {r.source}
                                          </span>{" "}
                                          &mdash; {r.score}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Pairings */}
                              {wine.pairings && wine.pairings.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                                    Harmonização
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {wine.pairings.map((p) => (
                                      <span
                                        key={p}
                                        className="inline-flex items-center gap-1 text-xs text-stone-600 bg-white border border-stone-200 rounded-full px-3 py-1"
                                      >
                                        <UtensilsCrossed size={10} />
                                        {p}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h2
            className="text-2xl md:text-3xl font-light text-stone-900 mb-2"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
          >
            Comparação Rápida
          </h2>
          <p className="text-stone-500 text-sm">
            Todos os vinhos Ribeiro Santo numa vista panorâmica
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100 text-left">
                <th className="px-4 py-3 font-medium text-stone-600">Vinho</th>
                <th className="px-4 py-3 font-medium text-stone-600">Tipo</th>
                <th
                  className="px-4 py-3 font-medium text-stone-600 cursor-pointer select-none hover:text-stone-900 transition-colors"
                  onClick={() =>
                    setSortByPrice((prev) =>
                      prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
                    )
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    Preço
                    <ArrowUpDown size={12} className="text-stone-400" />
                  </span>
                </th>
                <th className="px-4 py-3 font-medium text-stone-600">Vivino</th>
                <th className="px-4 py-3 font-medium text-stone-600 hidden md:table-cell">
                  Destaque
                </th>
              </tr>
            </thead>
            <tbody>
              {WINES.map((wine, i) => {
                const topRating =
                  wine.ratings.length > 0
                    ? `${wine.ratings[0].source} ${wine.ratings[0].score}`
                    : wine.badges.length > 0
                    ? wine.badges[0]
                    : "\u2014";

                return (
                  <tr
                    key={wine.id}
                    className={`border-t border-stone-100 transition-colors hover:bg-amber-50/40 ${
                      i % 2 === 0 ? "bg-white" : "bg-stone-50/50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="font-medium text-stone-800"
                        style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                      >
                        {wine.name}
                      </span>
                      <span className="text-stone-400 ml-1 text-xs">
                        {wine.vintage}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          CATEGORY_COLORS[wine.category].bg
                        } ${CATEGORY_COLORS[wine.category].text}`}
                      >
                        {CATEGORY_LABELS[wine.category]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-700 font-medium">
                      {wine.price > 0
                        ? `${wine.price.toFixed(2).replace(".", ",")} \u20ac`
                        : "\u2014"}
                    </td>
                    <td className="px-4 py-3">
                      {wine.vivino ? (
                        <span className="inline-flex items-center gap-1">
                          <Star
                            size={12}
                            className="fill-amber-400 text-amber-400"
                          />
                          <span className="text-stone-700 font-medium">
                            {wine.vivino.score.toFixed(1)}
                          </span>
                        </span>
                      ) : (
                        <span className="text-stone-400">\u2014</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-stone-500 text-xs max-w-[200px] truncate">
                      {topRating}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════ FOOD PAIRING GUIDE ═══════════════ */}
      <section
        className="py-16 md:py-24"
        style={{ background: "linear-gradient(180deg, #f5f3ef 0%, #faf8f5 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-amber-700/70 text-sm tracking-[0.2em] uppercase mb-4">
                <UtensilsCrossed size={16} />
                Sugestões
              </span>
              <h2
                className="text-2xl md:text-4xl font-light text-stone-900 mb-3"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
              >
                Harmonizações
              </h2>
              <p className="text-stone-500 max-w-xl mx-auto">
                O vinho certo para cada momento e cada prato
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIRINGS.map((pairing, i) => (
              <motion.div
                key={pairing.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 ${pairing.icon}`}
                >
                  <Wine size={18} />
                </div>

                <h3
                  className="text-lg font-medium text-stone-900 mb-2"
                  style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                >
                  {pairing.type}
                </h3>

                <p className="text-sm text-stone-500 mb-4 leading-relaxed">
                  {pairing.description}
                </p>

                <div className="space-y-2">
                  {pairing.foods.map((food) => (
                    <div
                      key={food}
                      className="flex items-center gap-2 text-sm text-stone-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {food}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-16 md:py-20 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-3xl font-light text-stone-900 mb-4"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              Prove o Dão na sua melhor expressão
            </h2>
            <p className="text-stone-500 mb-8 max-w-lg mx-auto">
              Visite-nos em Carregal do Sal para uma experiência de enoturismo
              completa, ou contacte-nos para encomendar os seus vinhos favoritos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/projetos/ribeirosanto/enoturismo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8b2252, #6b1a3a)",
                }}
              >
                <Wine size={16} />
                Enoturismo
              </a>
              <a
                href="/projetos/ribeirosanto/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-stone-700 border border-stone-300 bg-white hover:border-[#8b2252]/40 hover:text-[#8b2252] transition-all duration-300"
              >
                Contacto
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
