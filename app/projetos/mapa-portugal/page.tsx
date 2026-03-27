"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorMode = "regioes" | "populacao" | "gastronomia";

type Region = "Norte" | "Centro" | "Lisboa" | "Alentejo" | "Algarve" | "Ilhas";

type FoodCategory =
  | "peixe"
  | "carne"
  | "enchidos"
  | "doce"
  | "marisco"
  | "legumes";

interface District {
  id: string;
  name: string;
  capital: string;
  population: number; // approximate
  area: number; // km²
  density: number; // hab/km²
  region: Region;
  food: string;
  foodCategory: FoodCategory;
  landmark: string;
  funFact: string;
  path: string; // SVG path data
  labelX: number;
  labelY: number;
}

// ─── District Data ─────────────────────────────────────────────────────────────
// SVG viewBox: 0 0 400 550
// Coordinates approximate the real shape of Portugal (mainland + islands)

const DISTRICTS: District[] = [
  {
    id: "viana-castelo",
    name: "Viana do Castelo",
    capital: "Viana do Castelo",
    population: 244836,
    area: 2255,
    density: 109,
    region: "Norte",
    food: "Bacalhau à Lagareiro",
    foodCategory: "peixe",
    landmark: "Santuário de Santa Luzia",
    funFact:
      "É conhecida como a 'Capital do Folclore' e tem o traje típico mais fotografado de Portugal.",
    path: "M 60 25 L 105 22 L 115 35 L 108 55 L 95 65 L 70 68 L 55 58 L 50 40 Z",
    labelX: 82,
    labelY: 46,
  },
  {
    id: "braga",
    name: "Braga",
    capital: "Braga",
    population: 848185,
    area: 2673,
    density: 317,
    region: "Norte",
    food: "Bacalhau com Broa",
    foodCategory: "peixe",
    landmark: "Bom Jesus do Monte",
    funFact:
      "Braga é uma das cidades mais antigas da Península Ibérica, fundada pelos Romanos como Bracara Augusta.",
    path: "M 105 22 L 148 18 L 158 30 L 155 52 L 140 62 L 115 60 L 108 55 L 115 35 Z",
    labelX: 132,
    labelY: 40,
  },
  {
    id: "porto",
    name: "Porto",
    capital: "Porto",
    population: 1737395,
    area: 2395,
    density: 726,
    region: "Norte",
    food: "Francesinha",
    foodCategory: "carne",
    landmark: "Ribeira do Porto",
    funFact:
      "O Porto deu o nome a Portugal e ao vinho do Porto. A Ribeira é Património Mundial da UNESCO desde 1996.",
    path: "M 70 68 L 95 65 L 115 60 L 118 80 L 108 95 L 88 100 L 68 90 L 62 78 Z",
    labelX: 91,
    labelY: 82,
  },
  {
    id: "vila-real",
    name: "Vila Real",
    capital: "Vila Real",
    population: 196055,
    area: 4328,
    density: 45,
    region: "Norte",
    food: "Posta Mirandesa",
    foodCategory: "carne",
    landmark: "Solar de Mateus",
    funFact:
      "O Solar de Mateus aparece no rótulo clássico do Mateus Rosé, o vinho português mais vendido no mundo.",
    path: "M 115 35 L 158 30 L 190 28 L 195 55 L 180 75 L 155 78 L 140 62 L 155 52 Z",
    labelX: 158,
    labelY: 53,
  },
  {
    id: "braganca",
    name: "Bragança",
    capital: "Bragança",
    population: 113403,
    area: 6608,
    density: 17,
    region: "Norte",
    food: "Alheira de Mirandela",
    foodCategory: "enchidos",
    landmark: "Castelo de Bragança",
    funFact:
      "A alheira foi inventada pelos judeus portugueses no séc. XV para disfarçar que não comiam porco durante a Inquisição.",
    path: "M 158 30 L 210 22 L 225 28 L 228 60 L 210 72 L 195 75 L 195 55 L 190 28 Z",
    labelX: 195,
    labelY: 46,
  },
  {
    id: "aveiro",
    name: "Aveiro",
    capital: "Aveiro",
    population: 387726,
    area: 2808,
    density: 138,
    region: "Centro",
    food: "Ovos Moles de Aveiro",
    foodCategory: "doce",
    landmark: "Ria de Aveiro",
    funFact:
      "Aveiro é conhecida como a 'Veneza Portuguesa' pelos seus canais e moliceiros coloridos.",
    path: "M 68 90 L 108 95 L 112 118 L 100 132 L 78 130 L 62 115 L 60 100 Z",
    labelX: 86,
    labelY: 112,
  },
  {
    id: "viseu",
    name: "Viseu",
    capital: "Viseu",
    population: 371037,
    area: 5009,
    density: 74,
    region: "Centro",
    food: "Leitão da Bairrada",
    foodCategory: "carne",
    landmark: "Cava de Viriato",
    funFact:
      "Viseu foi o local de resistência do herói lusitano Viriato contra os Romanos no séc. II a.C.",
    path: "M 118 80 L 155 78 L 168 88 L 162 118 L 145 130 L 122 128 L 112 118 L 108 95 Z",
    labelX: 140,
    labelY: 105,
  },
  {
    id: "guarda",
    name: "Guarda",
    capital: "Guarda",
    population: 154531,
    area: 5518,
    density: 28,
    region: "Centro",
    food: "Bucho Recheado",
    foodCategory: "carne",
    landmark: "Serra da Estrela",
    funFact:
      "Guarda é a cidade mais alta de Portugal (1056m) e uma das mais frias. A Serra da Estrela tem o único ski resort do país.",
    path: "M 155 78 L 210 72 L 228 60 L 232 88 L 218 108 L 195 115 L 168 108 L 162 88 Z",
    labelX: 196,
    labelY: 93,
  },
  {
    id: "coimbra",
    name: "Coimbra",
    capital: "Coimbra",
    population: 420219,
    area: 3947,
    density: 106,
    region: "Centro",
    food: "Chanfana",
    foodCategory: "carne",
    landmark: "Universidade de Coimbra",
    funFact:
      "A Universidade de Coimbra, fundada em 1290, é uma das mais antigas do mundo e Património Mundial da UNESCO.",
    path: "M 100 132 L 122 128 L 145 130 L 148 152 L 132 168 L 110 165 L 95 150 L 92 138 Z",
    labelX: 121,
    labelY: 150,
  },
  {
    id: "castelo-branco",
    name: "Castelo Branco",
    capital: "Castelo Branco",
    population: 183080,
    area: 6675,
    density: 27,
    region: "Centro",
    food: "Ensopado de Borrego",
    foodCategory: "carne",
    landmark: "Jardim do Paço Episcopal",
    funFact:
      "As colchas bordadas de Castelo Branco são consideradas a mais sofisticada arte têxtil portuguesa, levando anos a produzir.",
    path: "M 162 118 L 195 115 L 218 108 L 228 128 L 222 155 L 198 168 L 172 165 L 155 148 L 148 130 L 162 118 Z",
    labelX: 192,
    labelY: 140,
  },
  {
    id: "leiria",
    name: "Leiria",
    capital: "Leiria",
    population: 470930,
    area: 3517,
    density: 134,
    region: "Centro",
    food: "Caldeirada de Peixe",
    foodCategory: "peixe",
    landmark: "Castelo de Leiria",
    funFact:
      "A floresta de pinheiros de Leiria (Pinhal do Rei) foi plantada no séc. XIII pelo Rei D. Dinis para proteger as terras agrícolas.",
    path: "M 78 130 L 100 132 L 92 138 L 95 150 L 85 168 L 65 170 L 50 155 L 48 138 L 60 128 Z",
    labelX: 72,
    labelY: 152,
  },
  {
    id: "santarem",
    name: "Santarém",
    capital: "Santarém",
    population: 436812,
    area: 6747,
    density: 65,
    region: "Centro",
    food: "Sopa da Pedra",
    foodCategory: "legumes",
    landmark: "Igreja de Santa Maria de Marvila",
    funFact:
      "Santarém é a 'Capital Nacional da Gastronomia' e acolhe anualmente a maior feira gastronómica de Portugal.",
    path: "M 85 168 L 95 150 L 110 165 L 132 168 L 148 152 L 155 148 L 158 172 L 145 192 L 118 198 L 95 190 L 80 178 Z",
    labelX: 118,
    labelY: 178,
  },
  {
    id: "lisboa",
    name: "Lisboa",
    capital: "Lisboa",
    population: 2821876,
    area: 2761,
    density: 1021,
    region: "Lisboa",
    food: "Pastéis de Belém",
    foodCategory: "doce",
    landmark: "Torre de Belém",
    funFact:
      "A receita original dos Pastéis de Belém é um segredo guardado desde 1837. Apenas 3 pessoas no mundo a conhecem por completo.",
    path: "M 50 155 L 65 170 L 85 168 L 80 178 L 72 195 L 52 198 L 38 185 L 35 168 Z",
    labelX: 59,
    labelY: 178,
  },
  {
    id: "portalegre",
    name: "Portalegre",
    capital: "Portalegre",
    population: 113410,
    area: 6065,
    density: 19,
    region: "Alentejo",
    food: "Ensopado de Cabeça de Borrego",
    foodCategory: "carne",
    landmark: "Castelo de Marvão",
    funFact:
      "Marvão, com apenas 800 habitantes, tem uma das melhores vistas de toda a Península Ibérica e foi classificada como aldeia histórica.",
    path: "M 155 148 L 172 165 L 198 168 L 222 155 L 225 175 L 210 195 L 185 200 L 158 198 L 158 172 Z",
    labelX: 192,
    labelY: 178,
  },
  {
    id: "evora",
    name: "Évora",
    capital: "Évora",
    population: 163978,
    area: 7393,
    density: 22,
    region: "Alentejo",
    food: "Açorda Alentejana",
    foodCategory: "legumes",
    landmark: "Templo Romano de Évora",
    funFact:
      "A Igreja dos Ossos em Évora tem paredes decoradas com ossos de 5000 monges. Na entrada lê-se: 'Nós ossos que aqui estamos, pelos vossos esperamos.'",
    path: "M 95 190 L 118 198 L 145 192 L 158 198 L 185 200 L 192 222 L 178 248 L 148 255 L 120 248 L 98 235 L 88 215 Z",
    labelX: 142,
    labelY: 225,
  },
  {
    id: "setubal",
    name: "Setúbal",
    capital: "Setúbal",
    population: 951658,
    area: 5064,
    density: 188,
    region: "Lisboa",
    food: "Choco Frito",
    foodCategory: "marisco",
    landmark: "Parque Natural da Arrábida",
    funFact:
      "A Arrábida tem águas tão transparentes que parece o Mediterrâneo. É um dos segredos mais bem guardados de Portugal.",
    path: "M 38 185 L 52 198 L 72 195 L 88 215 L 80 232 L 60 240 L 40 228 L 28 210 L 30 195 Z",
    labelX: 57,
    labelY: 215,
  },
  {
    id: "beja",
    name: "Beja",
    capital: "Beja",
    population: 148025,
    area: 10225,
    density: 14,
    region: "Alentejo",
    food: "Migas Alentejanas",
    foodCategory: "legumes",
    landmark: "Castelo de Beja",
    funFact:
      "Beja é o distrito menos populoso do continente e tem os verões mais quentes de Portugal, chegando regularmente a 45°C.",
    path: "M 88 215 L 98 235 L 120 248 L 148 255 L 178 248 L 185 272 L 165 295 L 138 300 L 108 295 L 85 275 L 75 252 L 80 232 Z",
    labelX: 130,
    labelY: 262,
  },
  {
    id: "faro",
    name: "Faro",
    capital: "Faro",
    population: 451006,
    area: 4960,
    density: 91,
    region: "Algarve",
    food: "Cataplana de Marisco",
    foodCategory: "marisco",
    landmark: "Ria Formosa",
    funFact:
      "O Algarve tem mais de 300 dias de sol por ano. A Ria Formosa é um dos sistemas lagunares mais importantes da Europa para aves migratórias.",
    path: "M 75 252 L 85 275 L 108 295 L 138 300 L 165 295 L 185 272 L 192 285 L 182 308 L 150 318 L 118 320 L 85 312 L 68 295 L 65 275 Z",
    labelX: 128,
    labelY: 302,
  },
  {
    id: "acores",
    name: "Açores",
    capital: "Ponta Delgada",
    population: 236627,
    area: 2333,
    density: 101,
    region: "Ilhas",
    food: "Cozido das Furnas",
    foodCategory: "carne",
    landmark: "Caldeira das Furnas",
    funFact:
      "O Cozido das Furnas é cozinhado pelo calor vulcânico da terra. A panela é enterrada perto de fontes geotérmicas durante 6-7 horas.",
    path: "M 22 410 L 60 405 L 78 418 L 72 438 L 50 448 L 22 445 L 10 432 Z",
    labelX: 44,
    labelY: 428,
  },
  {
    id: "madeira",
    name: "Madeira",
    capital: "Funchal",
    population: 251060,
    area: 801,
    density: 313,
    region: "Ilhas",
    food: "Espetada Madeirense",
    foodCategory: "carne",
    landmark: "Levadas da Madeira",
    funFact:
      "As levadas da Madeira têm mais de 2.000 km de extensão e foram construídas pelos portugueses no séc. XVI para transportar água das montanhas.",
    path: "M 285 460 L 348 452 L 368 465 L 362 482 L 330 492 L 292 488 L 278 475 Z",
    labelX: 323,
    labelY: 472,
  },
];

// ─── Color Palettes ─────────────────────────────────────────────────────────────

const REGION_COLORS: Record<Region, string> = {
  Norte: "#3b82f6",
  Centro: "#22c55e",
  Lisboa: "#ef4444",
  Alentejo: "#eab308",
  Algarve: "#f97316",
  Ilhas: "#a855f7",
};

const REGION_HOVER_COLORS: Record<Region, string> = {
  Norte: "#60a5fa",
  Centro: "#4ade80",
  Lisboa: "#f87171",
  Alentejo: "#fde047",
  Algarve: "#fb923c",
  Ilhas: "#c084fc",
};

function getDensityColor(density: number): string {
  if (density < 20) return "#1e3a5f";
  if (density < 50) return "#1d4ed8";
  if (density < 100) return "#3b82f6";
  if (density < 200) return "#60a5fa";
  if (density < 400) return "#93c5fd";
  if (density < 700) return "#bfdbfe";
  return "#dbeafe";
}

function getDensityHoverColor(density: number): string {
  if (density < 20) return "#2563eb";
  if (density < 50) return "#3b82f6";
  if (density < 100) return "#60a5fa";
  if (density < 200) return "#93c5fd";
  if (density < 400) return "#bfdbfe";
  if (density < 700) return "#dbeafe";
  return "#eff6ff";
}

const FOOD_COLORS: Record<FoodCategory, string> = {
  peixe: "#0ea5e9",
  carne: "#dc2626",
  enchidos: "#92400e",
  doce: "#ec4899",
  marisco: "#0d9488",
  legumes: "#65a30d",
};

const FOOD_HOVER_COLORS: Record<FoodCategory, string> = {
  peixe: "#38bdf8",
  carne: "#f87171",
  enchidos: "#b45309",
  doce: "#f472b6",
  marisco: "#14b8a6",
  legumes: "#84cc16",
};

const FOOD_LABELS: Record<FoodCategory, string> = {
  peixe: "Peixe",
  carne: "Carne",
  enchidos: "Enchidos",
  doce: "Doce",
  marisco: "Marisco",
  legumes: "Legumes/Sopas",
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function MapaPortugal() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [colorMode, setColorMode] = useState<ColorMode>("regioes");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPopulation = DISTRICTS.reduce((s, d) => s + d.population, 0);
  const largest = [...DISTRICTS].sort((a, b) => b.area - a.area)[0];
  const smallest = DISTRICTS.filter(
    (d) => d.id !== "acores" && d.id !== "madeira"
  ).sort((a, b) => a.area - b.area)[0];
  const mostDense = [...DISTRICTS].sort((a, b) => b.density - a.density)[0];

  const getDistrictColor = useCallback(
    (d: District, isHovered: boolean) => {
      if (isHovered) {
        if (colorMode === "regioes") return REGION_HOVER_COLORS[d.region];
        if (colorMode === "populacao") return getDensityHoverColor(d.density);
        return FOOD_HOVER_COLORS[d.foodCategory];
      }
      if (colorMode === "regioes") return REGION_COLORS[d.region];
      if (colorMode === "populacao") return getDensityColor(d.density);
      return FOOD_COLORS[d.foodCategory];
    },
    [colorMode]
  );

  // Search handling
  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightedId(null);
      return;
    }
    const q = searchQuery.toLowerCase();
    const found = DISTRICTS.find(
      (d) =>
        d.name.toLowerCase().includes(q) || d.capital.toLowerCase().includes(q)
    );
    setHighlightedId(found ? found.id : null);
  }, [searchQuery]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  const handleDistrictClick = (d: District) => {
    setSelectedDistrict((prev) => (prev?.id === d.id ? null : d));
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGPathElement>,
    name: string
  ) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name,
    });
  };

  // Legend content per mode
  const legendItems =
    colorMode === "regioes"
      ? Object.entries(REGION_COLORS).map(([k, v]) => ({
          label: k,
          color: v,
        }))
      : colorMode === "gastronomia"
      ? Object.entries(FOOD_COLORS).map(([k, v]) => ({
          label: FOOD_LABELS[k as FoodCategory],
          color: v,
        }))
      : [
          { label: "< 20 hab/km²", color: "#1e3a5f" },
          { label: "20–50", color: "#1d4ed8" },
          { label: "50–100", color: "#3b82f6" },
          { label: "100–200", color: "#60a5fa" },
          { label: "200–400", color: "#93c5fd" },
          { label: "400–700", color: "#bfdbfe" },
          { label: "> 700 hab/km²", color: "#dbeafe" },
        ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
        fontFamily:
          "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <header
        style={{
          borderBottom: "1px solid #1e293b",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          background: "#0f172a",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(18px, 3vw, 24px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            🗺️ Mapa de Portugal
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
            18 distritos + 2 regiões autónomas · Clica para explorar
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Pesquisar distrito..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "8px 36px 8px 12px",
              color: "#f8fafc",
              fontSize: "14px",
              outline: "none",
              width: "200px",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#334155")}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              fontSize: "14px",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          {searchQuery && !highlightedId && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                background: "#1e293b",
                border: "1px solid #ef4444",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "12px",
                color: "#f87171",
                whiteSpace: "nowrap",
              }}
            >
              Distrito não encontrado
            </div>
          )}
        </div>
      </header>

      {/* ── Color Mode Toggle ── */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "12px 24px",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          flexWrap: "wrap",
        }}
      >
        {(
          [
            { key: "regioes", label: "🏔️ Regiões" },
            { key: "populacao", label: "👥 População" },
            { key: "gastronomia", label: "🍽️ Gastronomia" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setColorMode(key)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid",
              borderColor: colorMode === key ? "#3b82f6" : "#334155",
              background: colorMode === key ? "#1e40af" : "#1e293b",
              color: colorMode === key ? "#bfdbfe" : "#94a3b8",
              fontSize: "13px",
              fontWeight: colorMode === key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}

        {/* Zoom controls */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          {[
            { label: "−", action: handleZoomOut, title: "Zoom out" },
            { label: "⊙", action: handleZoomReset, title: "Reset zoom" },
            { label: "+", action: handleZoomIn, title: "Zoom in" },
          ].map(({ label, action, title }) => (
            <button
              key={label}
              onClick={action}
              title={title}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                border: "1px solid #334155",
                background: "#1e293b",
                color: "#94a3b8",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#3b82f6";
                (e.currentTarget as HTMLButtonElement).style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#334155";
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
              }}
            >
              {label}
            </button>
          ))}
          <span
            style={{
              fontSize: "12px",
              color: "#64748b",
              alignSelf: "center",
              minWidth: "36px",
            }}
          >
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          gap: 0,
          minHeight: 0,
        }}
      >
        {/* ── Map Container ── */}
        <div
          ref={containerRef}
          style={{
            flex: "1 1 320px",
            position: "relative",
            overflow: "hidden",
            minHeight: "520px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172a",
          }}
        >
          {/* Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "absolute",
                left: tooltip.x + 12,
                top: tooltip.y - 32,
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#f8fafc",
                pointerEvents: "none",
                zIndex: 50,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              {tooltip.name}
            </div>
          )}

          <svg
            ref={svgRef}
            viewBox="0 0 400 550"
            style={{
              width: "100%",
              maxWidth: "460px",
              height: "auto",
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease",
              userSelect: "none",
            }}
          >
            {/* Ocean background hint */}
            <rect
              x="0"
              y="0"
              width="400"
              height="550"
              fill="#0c1a2e"
              rx="8"
            />

            {/* Grid lines (subtle) */}
            {[100, 200, 300].map((x) => (
              <line
                key={`vl-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="550"
                stroke="#1e293b"
                strokeWidth="0.5"
              />
            ))}
            {[100, 200, 300, 400, 500].map((y) => (
              <line
                key={`hl-${y}`}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="#1e293b"
                strokeWidth="0.5"
              />
            ))}

            {/* Islands separator label */}
            <text
              x="10"
              y="398"
              fill="#334155"
              fontSize="9"
              fontStyle="italic"
            >
              Regiões Autónomas
            </text>
            <line
              x1="10"
              y1="400"
              x2="390"
              y2="400"
              stroke="#334155"
              strokeWidth="0.8"
              strokeDasharray="4 3"
            />

            {/* Districts */}
            {DISTRICTS.map((d) => {
              const isHovered = hoveredId === d.id;
              const isSelected = selectedDistrict?.id === d.id;
              const isHighlighted = highlightedId === d.id;
              const fill = getDistrictColor(d, isHovered || isSelected);
              const strokeColor = isSelected
                ? "#ffffff"
                : isHighlighted
                ? "#fde047"
                : "#0f172a";
              const strokeWidth = isSelected ? 2.5 : isHighlighted ? 2 : 1;

              return (
                <g key={d.id}>
                  <path
                    d={d.path}
                    fill={fill}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    style={{
                      cursor: "pointer",
                      transition: "fill 0.2s ease",
                      filter:
                        isSelected || isHighlighted
                          ? "drop-shadow(0 0 6px rgba(255,255,255,0.3))"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredId(d.id);
                      handleMouseMove(e, d.name);
                    }}
                    onMouseMove={(e) => handleMouseMove(e, d.name)}
                    onMouseLeave={() => {
                      setHoveredId(null);
                      setTooltip(null);
                    }}
                    onClick={() => handleDistrictClick(d)}
                  />
                  {/* District label */}
                  <text
                    x={d.labelX}
                    y={d.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered || isSelected ? "#ffffff" : "#e2e8f0"}
                    fontSize={d.id === "madeira" || d.id === "acores" ? "7.5" : "7"}
                    fontWeight={isSelected ? "700" : "500"}
                    style={{
                      pointerEvents: "none",
                      textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    }}
                  >
                    {d.name.length > 12 ? d.name.split(" ")[0] : d.name}
                  </text>
                </g>
              );
            })}

            {/* Compass rose */}
            <g transform="translate(370, 30)">
              <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="0" y="-6" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="bold">N</text>
              <text x="0" y="10" textAnchor="middle" fill="#64748b" fontSize="5.5">S</text>
              <text x="-9" y="2" textAnchor="middle" fill="#64748b" fontSize="5.5">O</text>
              <text x="9" y="2" textAnchor="middle" fill="#64748b" fontSize="5.5">E</text>
              <polygon points="0,-5 -2,0 0,-1 2,0" fill="#3b82f6" />
              <polygon points="0,5 -2,0 0,1 2,0" fill="#475569" />
            </g>
          </svg>
        </div>

        {/* ── Right Panel ── */}
        <div
          style={{
            width: "clamp(280px, 30vw, 360px)",
            background: "#0f172a",
            borderLeft: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Stats */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #1e293b",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#64748b",
              }}
            >
              Estatísticas
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <StatRow
                label="População total"
                value={totalPopulation.toLocaleString("pt-PT")}
                icon="🇵🇹"
              />
              <StatRow
                label="Maior distrito"
                value={`${largest.name} (${largest.area.toLocaleString()} km²)`}
                icon="📐"
              />
              <StatRow
                label="Menor distrito"
                value={`${smallest.name} (${smallest.area.toLocaleString()} km²)`}
                icon="📏"
              />
              <StatRow
                label="Mais denso"
                value={`${mostDense.name} (${mostDense.density} hab/km²)`}
                icon="🏙️"
              />
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #1e293b",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#64748b",
              }}
            >
              Legenda —{" "}
              {colorMode === "regioes"
                ? "Regiões"
                : colorMode === "populacao"
                ? "Densidade Populacional"
                : "Gastronomia"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px",
              }}
            >
              {legendItems.map(({ label, color }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "3px",
                      background: color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* District Info Panel */}
          <div style={{ flex: 1, overflow: "auto" }}>
            <AnimatePresence mode="wait">
              {selectedDistrict ? (
                <motion.div
                  key={selectedDistrict.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ padding: "16px" }}
                >
                  {/* District header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: 0,
                          fontSize: "20px",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {selectedDistrict.name}
                      </h2>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: "4px",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background:
                            REGION_COLORS[selectedDistrict.region] + "33",
                          color: REGION_COLORS[selectedDistrict.region],
                          border: `1px solid ${
                            REGION_COLORS[selectedDistrict.region]
                          }55`,
                        }}
                      >
                        {selectedDistrict.region}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedDistrict(null)}
                      style={{
                        background: "transparent",
                        border: "1px solid #334155",
                        borderRadius: "6px",
                        color: "#64748b",
                        cursor: "pointer",
                        fontSize: "14px",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Key stats grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      marginBottom: "14px",
                    }}
                  >
                    <InfoCard
                      label="Capital"
                      value={selectedDistrict.capital}
                      icon="🏛️"
                    />
                    <InfoCard
                      label="População"
                      value={selectedDistrict.population.toLocaleString(
                        "pt-PT"
                      )}
                      icon="👥"
                    />
                    <InfoCard
                      label="Área"
                      value={`${selectedDistrict.area.toLocaleString()} km²`}
                      icon="📐"
                    />
                    <InfoCard
                      label="Densidade"
                      value={`${selectedDistrict.density} hab/km²`}
                      icon="📊"
                    />
                  </div>

                  {/* Food */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      background: "#1e293b",
                      borderRadius: "10px",
                      padding: "12px",
                      marginBottom: "10px",
                      borderLeft: `3px solid ${
                        FOOD_COLORS[selectedDistrict.foodCategory]
                      }`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}
                    >
                      🍽️ Prato típico
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: FOOD_COLORS[selectedDistrict.foodCategory],
                      }}
                    >
                      {selectedDistrict.food}
                    </div>
                  </motion.div>

                  {/* Landmark */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      background: "#1e293b",
                      borderRadius: "10px",
                      padding: "12px",
                      marginBottom: "10px",
                      borderLeft: "3px solid #a855f7",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}
                    >
                      🏛️ Monumento / Paisagem
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#c084fc",
                      }}
                    >
                      {selectedDistrict.landmark}
                    </div>
                  </motion.div>

                  {/* Fun fact */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      background: "#1e293b",
                      borderRadius: "10px",
                      padding: "12px",
                      borderLeft: "3px solid #f59e0b",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "6px",
                      }}
                    >
                      💡 Sabia que...
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#cbd5e1",
                        lineHeight: "1.6",
                      }}
                    >
                      {selectedDistrict.funFact}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: "32px 16px",
                    textAlign: "center",
                    color: "#475569",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                    🗺️
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    Clica num distrito
                  </div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    para ver os detalhes
                  </div>

                  {/* Quick district list */}
                  <div
                    style={{
                      marginTop: "24px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "8px",
                        paddingLeft: "4px",
                      }}
                    >
                      Todos os distritos
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      {DISTRICTS.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleDistrictClick(d)}
                          style={{
                            background:
                              highlightedId === d.id ? "#1e3a5f" : "transparent",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            if (highlightedId !== d.id)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "#1e293b";
                          }}
                          onMouseLeave={(e) => {
                            if (highlightedId !== d.id)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "transparent";
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "2px",
                              background: REGION_COLORS[d.region],
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              color:
                                highlightedId === d.id ? "#93c5fd" : "#94a3b8",
                              fontWeight: highlightedId === d.id ? 600 : 400,
                            }}
                          >
                            {d.name}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#475569",
                              marginLeft: "auto",
                            }}
                          >
                            {d.region}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid #1e293b",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          fontSize: "12px",
          color: "#475569",
        }}
      >
        <span>
          Dados aproximados · Fonte: INE Portugal
        </span>
        <span>
          Feito com ❤️ pela{" "}
          <a
            href="/"
            style={{ color: "#3b82f6", textDecoration: "none" }}
          >
            Descomplicai
          </a>
        </span>
      </footer>
    </main>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
      <span style={{ fontSize: "13px" }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "11px", color: "#475569" }}>{label}</div>
        <div
          style={{
            fontSize: "13px",
            color: "#e2e8f0",
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "8px",
        padding: "10px",
        border: "1px solid #334155",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "4px",
        }}
      >
        {icon} {label}
      </div>
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#f1f5f9",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}
