"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   TILE TYPES
   ================================================================ */
const T = {
  GRASS: 0,
  WATER: 1,
  PATH: 2,
  WALL: 3,
  BRIDGE: 4,
  SAND: 5,
  FLOOR: 6,
  DOOR: 7,
  TREE: 8,
  FLOWER: 9,
  ROCK: 10,
} as const;

type TileType = (typeof T)[keyof typeof T];

/* ================================================================
   TILE METADATA
   ================================================================ */
interface TileMeta {
  walkable: boolean;
  color1: string;
  color2?: string; // for animated tiles
}

const TILE_META: Record<TileType, TileMeta> = {
  [T.GRASS]: { walkable: true, color1: "#4a7c3f", color2: "#528a47" },
  [T.WATER]: { walkable: false, color1: "#2980b9", color2: "#3498db" },
  [T.PATH]: { walkable: true, color1: "#b8976a", color2: "#c4a374" },
  [T.WALL]: { walkable: false, color1: "#5d5d5d" },
  [T.BRIDGE]: { walkable: true, color1: "#8B7355" },
  [T.SAND]: { walkable: true, color1: "#e8d5a3", color2: "#ebd9aa" },
  [T.FLOOR]: { walkable: true, color1: "#b0b0b0" },
  [T.DOOR]: { walkable: true, color1: "#8B4513" },
  [T.TREE]: { walkable: false, color1: "#3d6b35" },
  [T.FLOWER]: { walkable: true, color1: "#4a7c3f", color2: "#528a47" },
  [T.ROCK]: { walkable: false, color1: "#808080" },
};

/* ================================================================
   CONSTANTS
   ================================================================ */
const MAP_COLS = 60;
const MAP_ROWS = 50;
const BASE_TILE_SIZE = 16;
const SCALE = 2;
const TILE_SIZE = BASE_TILE_SIZE * SCALE; // 32px on screen
const PLAYER_SPEED = 2.5;
const SPRINT_SPEED = 4;
const INTERACTION_RANGE = TILE_SIZE * 2;
const TYPEWRITER_SPEED = 25;
const MINIMAP_W = 160;
const MINIMAP_H = 130;
const CAMERA_LERP = 0.08;

/* ================================================================
   DIRECTION ENUM
   ================================================================ */
const DIR = { DOWN: 0, UP: 1, LEFT: 2, RIGHT: 3 } as const;
type Direction = (typeof DIR)[keyof typeof DIR];

/* ================================================================
   ZONE DEFINITIONS
   ================================================================ */
interface Zone {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tint: string;
}

const ZONES: Zone[] = [
  { name: "Centro Hub", x: 20, y: 17, w: 20, h: 15, tint: "rgba(255,255,220,0.03)" },
  { name: "Vila Gastron\u00f3mica", x: 40, y: 17, w: 20, h: 15, tint: "rgba(255,200,150,0.05)" },
  { name: "Distrito Cl\u00ednico", x: 2, y: 17, w: 16, h: 15, tint: "rgba(200,230,255,0.05)" },
  { name: "Laborat\u00f3rio Tech", x: 20, y: 2, w: 20, h: 13, tint: "rgba(0,255,255,0.04)" },
  { name: "Torre do Portfolio", x: 22, y: 33, w: 15, h: 17, tint: "rgba(255,215,0,0.04)" },
  { name: "Floresta Secreta", x: 48, y: 2, w: 10, h: 10, tint: "rgba(0,100,0,0.06)" },
];

/* ================================================================
   BUILD THE WORLD MAP — 60x50 tiles
   ================================================================ */
function buildWorldMap(): TileType[][] {
  // Start with all grass
  const map: TileType[][] = [];
  for (let r = 0; r < MAP_ROWS; r++) {
    map[r] = [];
    for (let c = 0; c < MAP_COLS; c++) {
      map[r][c] = T.GRASS;
    }
  }

  const set = (r: number, c: number, t: TileType) => {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS) map[r][c] = t;
  };
  const fill = (r1: number, c1: number, r2: number, c2: number, t: TileType) => {
    for (let r = r1; r <= r2; r++)
      for (let c = c1; c <= c2; c++) set(r, c, t);
  };
  const rect = (r1: number, c1: number, h: number, w: number, t: TileType) => {
    fill(r1, c1, r1 + h - 1, c1 + w - 1, t);
  };
  const building = (r: number, c: number, h: number, w: number) => {
    // Walls around, floor inside, door at bottom center
    fill(r, c, r + h - 1, c + w - 1, T.WALL);
    fill(r + 1, c + 1, r + h - 2, c + w - 2, T.FLOOR);
    const doorC = c + Math.floor(w / 2);
    set(r + h - 1, doorC, T.DOOR);
  };

  // ===== WATER BORDER (edges of map) =====
  for (let c = 0; c < MAP_COLS; c++) { set(0, c, T.WATER); set(MAP_ROWS - 1, c, T.WATER); }
  for (let r = 0; r < MAP_ROWS; r++) { set(r, 0, T.WATER); set(r, MAP_COLS - 1, T.WATER); }
  // Extra water border
  for (let c = 0; c < MAP_COLS; c++) { set(1, c, T.WATER); set(MAP_ROWS - 2, c, T.WATER); }
  for (let r = 0; r < MAP_ROWS; r++) { set(r, 1, T.WATER); set(r, MAP_COLS - 2, T.WATER); }

  // ===== CENTRO HUB (cols 20-39, rows 17-31) =====
  // Stone paths cross pattern
  for (let c = 20; c < 40; c++) { set(24, c, T.PATH); set(25, c, T.PATH); } // horizontal
  for (let r = 17; r < 32; r++) { set(r, 29, T.PATH); set(r, 30, T.PATH); } // vertical

  // Fountain in center (animated water)
  fill(23, 28, 26, 31, T.WATER);
  set(24, 29, T.ROCK); set(24, 30, T.ROCK);
  set(25, 29, T.ROCK); set(25, 30, T.ROCK);

  // Flower beds
  for (let c = 22; c < 28; c++) { set(19, c, T.FLOWER); set(20, c, T.FLOWER); }
  for (let c = 32; c < 38; c++) { set(19, c, T.FLOWER); set(20, c, T.FLOWER); }
  for (let c = 22; c < 28; c++) { set(29, c, T.FLOWER); set(30, c, T.FLOWER); }
  for (let c = 32; c < 38; c++) { set(29, c, T.FLOWER); set(30, c, T.FLOWER); }

  // Signposts (rocks as markers)
  set(22, 25, T.ROCK); // west sign
  set(22, 34, T.ROCK); // east sign
  set(19, 29, T.ROCK); // north sign
  set(28, 29, T.ROCK); // south sign

  // Trees around centro
  for (let c = 20; c < 40; c++) { set(17, c, T.TREE); set(31, c, T.TREE); }
  for (let r = 17; r < 32; r++) { set(r, 20, T.TREE); set(r, 39, T.TREE); }
  // Clear path openings
  set(24, 20, T.PATH); set(25, 20, T.PATH); // west opening
  set(24, 39, T.PATH); set(25, 39, T.PATH); // east opening
  set(17, 29, T.PATH); set(17, 30, T.PATH); // north opening
  set(31, 29, T.PATH); set(31, 30, T.PATH); // south opening

  // ===== PATHS connecting zones =====
  // West path to Distrito Clinico
  for (let c = 3; c < 20; c++) { set(24, c, T.PATH); set(25, c, T.PATH); }
  // East path to Vila Gastronomica
  for (let c = 40; c < 58; c++) { set(24, c, T.PATH); set(25, c, T.PATH); }
  // North path to Laboratorio Tech
  for (let r = 3; r < 17; r++) { set(r, 29, T.PATH); set(r, 30, T.PATH); }
  // South path to Torre do Portfolio
  for (let r = 32; r < 47; r++) { set(r, 29, T.PATH); set(r, 30, T.PATH); }
  // Northeast path to Floresta Secreta
  for (let i = 0; i < 14; i++) {
    const r = 14 - i;
    const c = 40 + i;
    if (r >= 2 && c < 58) { set(r, c, T.PATH); set(r, c + 1, T.PATH); }
  }

  // ===== VILA GASTRONOMICA (cols 40-57, rows 17-31) =====
  // Terracotta ground
  fill(18, 41, 30, 57, T.SAND);
  // Main street
  for (let c = 41; c < 57; c++) { set(24, c, T.PATH); set(25, c, T.PATH); }
  for (let r = 18; r < 31; r++) { set(r, 48, T.PATH); set(r, 49, T.PATH); }

  // Restaurant buildings (6 total)
  building(18, 42, 4, 5);  // Restaurant 1 - Cacarola
  building(18, 51, 4, 5);  // Restaurant 2 - Bijou
  building(22, 42, 3, 4);  // Restaurant 3 - MeioCheio (small)
  building(27, 42, 4, 5);  // Restaurant 4 - Tasca da Praia
  building(27, 51, 4, 5);  // Restaurant 5 - Pe na Areia
  building(22, 53, 3, 4);  // Restaurant 6 - Mesa dos Amigos

  // Outdoor seating areas (small colored squares as tables)
  set(26, 43, T.ROCK); set(26, 44, T.ROCK);
  set(26, 52, T.ROCK); set(26, 53, T.ROCK);

  // Market stalls (small structures)
  fill(20, 47, 21, 47, T.WALL);
  fill(20, 50, 21, 50, T.WALL);

  // Trees decoration
  set(19, 41, T.TREE); set(19, 56, T.TREE);
  set(30, 41, T.TREE); set(30, 56, T.TREE);
  set(23, 47, T.FLOWER); set(23, 50, T.FLOWER);
  set(26, 47, T.FLOWER); set(26, 50, T.FLOWER);

  // ===== DISTRITO CLINICO (cols 2-17, rows 17-31) =====
  // Clean white floor
  fill(18, 3, 30, 17, T.FLOOR);
  // Main path
  for (let c = 3; c < 18; c++) { set(24, c, T.PATH); set(25, c, T.PATH); }

  // Clinic buildings (4 total)
  building(18, 4, 4, 5);   // Clinic 1 - DentalKid
  building(18, 12, 4, 5);  // Clinic 2 - FozClinica
  building(27, 4, 4, 5);   // Clinic 3 - Vasco da Gama
  building(27, 12, 4, 5);  // Clinic 4 - Premium Clinica

  // Garden/park area with trees
  set(23, 5, T.TREE); set(23, 7, T.TREE);
  set(23, 14, T.TREE); set(23, 16, T.TREE);
  set(26, 5, T.TREE); set(26, 7, T.TREE);
  set(26, 14, T.TREE); set(26, 16, T.TREE);

  // Parking lot
  fill(22, 9, 23, 11, T.FLOOR);

  // Flowers
  set(21, 4, T.FLOWER); set(21, 16, T.FLOWER);
  set(30, 4, T.FLOWER); set(30, 16, T.FLOWER);

  // Cross symbols on clinics (using rocks on roofs)
  set(18, 6, T.ROCK); set(18, 14, T.ROCK);
  set(27, 6, T.ROCK); set(27, 14, T.ROCK);

  // ===== LABORATORIO TECH (cols 20-39, rows 2-14) =====
  // Dark floor
  fill(3, 21, 14, 38, T.FLOOR);
  // Glowing grid paths
  for (let c = 21; c < 39; c += 3) {
    for (let r = 3; r < 15; r++) set(r, c, T.PATH);
  }
  for (let r = 3; r < 15; r += 3) {
    for (let c = 21; c < 39; c++) set(r, c, T.PATH);
  }

  // Server rack buildings
  building(4, 22, 3, 4);   // Server 1
  building(4, 28, 3, 4);   // Server 2
  building(4, 34, 3, 4);   // Server 3

  // Terminal stations
  building(9, 22, 3, 4);   // Terminal 1
  building(9, 28, 3, 4);   // Terminal 2
  building(9, 34, 3, 4);   // Terminal 3

  // Holographic display areas
  fill(7, 26, 8, 27, T.WATER); // cyan glow
  fill(7, 32, 8, 33, T.WATER);

  // Trees around lab
  for (let c = 21; c < 39; c++) set(3, c, T.TREE);
  set(3, 29, T.PATH); set(3, 30, T.PATH); // north path opening clear
  // But keep path from centro
  for (let r = 3; r < 17; r++) { set(r, 29, T.PATH); set(r, 30, T.PATH); }

  // ===== TORRE DO PORTFOLIO (cols 22-36, rows 33-49) =====
  // Grand stone path
  fill(33, 24, 46, 35, T.SAND);
  for (let r = 33; r < 47; r++) { set(r, 29, T.PATH); set(r, 30, T.PATH); }

  // Tower entrance building (large)
  building(35, 25, 6, 10);
  // Interior rooms
  fill(36, 26, 39, 33, T.FLOOR);

  // Trophy room
  building(42, 26, 5, 8);
  fill(43, 27, 45, 32, T.FLOOR);

  // Tower pillars
  set(34, 25, T.ROCK); set(34, 34, T.ROCK);
  set(41, 25, T.ROCK); set(41, 34, T.ROCK);

  // Decorative path leading to tower
  for (let c = 24; c < 36; c++) { set(34, c, T.PATH); }
  for (let c = 26; c < 34; c++) { set(41, c, T.PATH); }

  // Trees flanking the approach
  for (let r = 33; r < 47; r++) { set(r, 23, T.TREE); set(r, 36, T.TREE); }
  set(33, 29, T.PATH); set(33, 30, T.PATH); // keep path opening

  // ===== FLORESTA SECRETA (cols 48-57, rows 2-11) =====
  // Dense tree coverage
  fill(3, 48, 11, 57, T.TREE);
  // Hidden path through trees
  set(3, 50, T.PATH); set(3, 51, T.PATH);
  set(4, 51, T.PATH); set(5, 51, T.PATH);
  set(5, 52, T.PATH); set(5, 53, T.PATH);
  set(6, 53, T.PATH); set(7, 53, T.PATH);
  set(7, 52, T.PATH); set(7, 51, T.PATH);
  set(8, 51, T.PATH);
  // Secret clearing
  fill(6, 50, 9, 55, T.GRASS);
  fill(7, 51, 8, 54, T.FLOWER);
  // Entry from the diagonal path
  set(3, 49, T.PATH);
  set(2, 50, T.PATH); set(2, 51, T.PATH);

  // ===== BRIDGES over water gaps =====
  // Make sure the paths cross water border properly
  // West exit
  set(24, 2, T.BRIDGE); set(25, 2, T.BRIDGE);
  set(24, 1, T.BRIDGE); set(25, 1, T.BRIDGE);
  // East exit
  set(24, 57, T.BRIDGE); set(25, 57, T.BRIDGE);
  set(24, 58, T.BRIDGE); set(25, 58, T.BRIDGE);
  // North exit
  set(1, 29, T.BRIDGE); set(1, 30, T.BRIDGE);
  set(2, 29, T.BRIDGE); set(2, 30, T.BRIDGE);
  // South exit
  set(47, 29, T.BRIDGE); set(47, 30, T.BRIDGE);
  set(48, 29, T.BRIDGE); set(48, 30, T.BRIDGE);

  // Add scattered trees and rocks in grass areas for decoration
  const decorPositions = [
    [15, 5], [16, 8], [14, 12], [13, 15],
    [33, 5], [35, 8], [34, 15], [36, 18],
    [15, 42], [13, 45], [16, 50], [14, 55],
    [33, 40], [35, 45], [34, 50], [36, 55],
    [10, 10], [12, 40], [38, 10], [40, 40],
    [5, 8], [7, 12], [8, 45], [10, 50],
    [42, 8], [44, 12], [42, 45], [44, 50],
  ];
  decorPositions.forEach(([r, c]) => {
    if (map[r]?.[c] === T.GRASS) set(r, c, T.TREE);
  });

  const rockPositions = [
    [16, 10], [13, 7], [15, 48], [12, 53],
    [35, 6], [33, 12], [35, 48], [37, 52],
    [8, 6], [6, 10], [45, 8], [43, 14],
  ];
  rockPositions.forEach(([r, c]) => {
    if (map[r]?.[c] === T.GRASS) set(r, c, T.ROCK);
  });

  // Extra flower patches
  const flowerPositions = [
    [16, 6], [14, 9], [15, 44], [13, 50],
    [34, 7], [36, 14], [34, 42], [36, 48],
  ];
  flowerPositions.forEach(([r, c]) => {
    if (map[r]?.[c] === T.GRASS) set(r, c, T.FLOWER);
  });

  return map;
}

const WORLD_MAP = buildWorldMap();

/* ================================================================
   NPC DEFINITIONS
   ================================================================ */
interface NPCDef {
  id: number;
  name: string;
  shirtColor: string;
  skinColor: string;
  x: number; // tile col
  y: number; // tile row
  facing: Direction;
  dialogue: string[];
  questGiver: boolean;
  questId: number;
  wanderRadius: number;
}

const NPC_DEFS: NPCDef[] = [
  {
    id: 1, name: "Guia Sara", shirtColor: "#f1c40f", skinColor: "#f5cba7",
    x: 27, y: 22, facing: DIR.DOWN,
    dialogue: [
      "Bem-vindo ao mundo da Descomplicai! Sou a Sara, a tua guia. Este lugar \u00e9 especial \u2014 cada zona representa uma parte do trabalho do Jaime.",
      "Explora as 5 zonas, fala com todos, abre os ba\u00fas e descobre os segredos!",
      "Dica: usa WASD para andar, E para interagir, e Q para ver as tuas quests.",
    ],
    questGiver: true, questId: 0, wanderRadius: 2,
  },
  {
    id: 2, name: "Chef Marco", shirtColor: "#e74c3c", skinColor: "#f5cba7",
    x: 45, y: 23, facing: DIR.LEFT,
    dialogue: [
      "Ah, um visitante! Sou o Chef Marco. Aqui na Vila Gastron\u00f3mica, cada restaurante foi desenhado com amor.",
      "A Ca\u00e7arola serve cozinha tradicional portuguesa. O Bijou \u00e9 fine dining. O MeioCheio \u00e9 um wine bar fant\u00e1stico!",
      "Cada site tem reservas por WhatsApp, menus interativos, e design responsivo. Tudo feito numa noite!",
    ],
    questGiver: true, questId: 1, wanderRadius: 3,
  },
  {
    id: 3, name: "Chef Ana", shirtColor: "#e67e22", skinColor: "#f5cba7",
    x: 50, y: 26, facing: DIR.UP,
    dialogue: [
      "Ol\u00e1! Sou a Chef Ana, especialista em restaurantes de praia.",
      "O P\u00e9 na Areia, o Sand Murtinheira, o Nalu Cabedelo \u2014 cada um captura a ess\u00eancia do mar.",
      "Sabias que todos os sites t\u00eam paletas de cores \u00fanicas inspiradas na localiza\u00e7\u00e3o real?",
    ],
    questGiver: false, questId: -1, wanderRadius: 2,
  },
  {
    id: 4, name: "Chef Tom\u00e1s", shirtColor: "#8B4513", skinColor: "#f5cba7",
    x: 54, y: 20, facing: DIR.DOWN,
    dialogue: [
      "A comida portuguesa \u00e9 a melhor do mundo, e estes sites fazem-lhe justi\u00e7a!",
      "A Tasca da Praia, a Mesa dos Amigos, o Caf\u00e9 Pra\u00e7a 18... cada um conta uma hist\u00f3ria.",
      "O segredo? Simplicidade. Sem frameworks pesados, sem backends \u2014 100% est\u00e1tico.",
    ],
    questGiver: false, questId: -1, wanderRadius: 2,
  },
  {
    id: 5, name: "Dra. Sofia", shirtColor: "#1abc9c", skinColor: "#f5cba7",
    x: 8, y: 23, facing: DIR.RIGHT,
    dialogue: [
      "Bem-vindo ao Distrito Cl\u00ednico! Sou a Dra. Sofia.",
      "O DentalKid \u00e9 a minha cl\u00ednica favorita \u2014 foi desenhada especialmente para crian\u00e7as, com cores divertidas e ambiente l\u00fadico.",
      "A FozCl\u00ednica \u00e9 multidisciplinar, aberta 7 dias. Design limpo, profissional.",
    ],
    questGiver: true, questId: 2, wanderRadius: 2,
  },
  {
    id: 6, name: "Dr. Miguel", shirtColor: "#3498db", skinColor: "#f5cba7",
    x: 14, y: 26, facing: DIR.LEFT,
    dialogue: [
      "A Cl\u00ednica Vasco da Gama \u00e9 premium \u2014 gold e navy, tratamentos de excel\u00eancia.",
      "A Premium Cl\u00ednica foca-se na preven\u00e7\u00e3o. A UpConcept \u00e9 ultra-moderna.",
      "Cada site reflete a identidade \u00fanica da cl\u00ednica. N\u00e3o h\u00e1 dois iguais!",
    ],
    questGiver: false, questId: -1, wanderRadius: 2,
  },
  {
    id: 7, name: "Hacker Luna", shirtColor: "#9b59b6", skinColor: "#f5cba7",
    x: 25, y: 8, facing: DIR.DOWN,
    dialogue: [
      "Hey! Sou a Luna. Isto \u00e9 o Laborat\u00f3rio de Ferramentas \u2014 puro c\u00f3digo!",
      "Temos o Regex Tester, o JSON Formatter, o CSS Playground... ferramentas para devs.",
      "O Fractal Explorer tem zoom infinito no conjunto de Mandelbrot. O Sorting Visualizer anima 6 algoritmos. Brutal!",
    ],
    questGiver: true, questId: 3, wanderRadius: 3,
  },
  {
    id: 8, name: "Artista Pedro", shirtColor: "#e91e90", skinColor: "#f5cba7",
    x: 31, y: 11, facing: DIR.LEFT,
    dialogue: [
      "Eu sou o Pedro, o lado criativo do lab!",
      "A Generative Art tem 8 algoritmos \u2014 Perlin noise, Voronoi, phyllotaxis... arte feita com matem\u00e1tica!",
      "O Pixel Art Editor, o Drawing Canvas, o Music Box, o Synth com ADSR... criar \u00e9 o meu combust\u00edvel.",
    ],
    questGiver: false, questId: -1, wanderRadius: 2,
  },
  {
    id: 9, name: "Cientista Rita", shirtColor: "#00bcd4", skinColor: "#f5cba7",
    x: 36, y: 6, facing: DIR.DOWN,
    dialogue: [
      "Sou a Rita! Os projetos educativos s\u00e3o o meu orgulho.",
      "A Tabela Peri\u00f3dica tem 118 elementos com curiosidades em portugu\u00eas. O Sistema Solar simula \u00f3rbitas reais!",
      "O Quiz Portugal tem 15 perguntas sobre hist\u00f3ria, cultura e gastronomia. J\u00e1 jogaste?",
    ],
    questGiver: false, questId: -1, wanderRadius: 2,
  },
  {
    id: 10, name: "Jaime", shirtColor: "#27ae60", skinColor: "#f5cba7",
    x: 29, y: 44, facing: DIR.DOWN,
    dialogue: [
      "Ol\u00e1! Eu sou o Jaime. Este mundo inteiro foi constru\u00eddo numa noite com IA.",
      "109 p\u00e1ginas. 55+ projetos. 52,000 linhas de c\u00f3digo. Tudo est\u00e1tico, sem backend, sem base de dados.",
      "A minha miss\u00e3o? Descomplicar. Tornar a tecnologia acess\u00edvel a todos.",
      "Acredito que o futuro \u00e9 humano. A IA \u00e9 apenas a ferramenta \u2014 as pessoas s\u00e3o o prop\u00f3sito.",
      "Keep building. Share love.",
    ],
    questGiver: true, questId: 7, wanderRadius: 1,
  },
  {
    id: 11, name: "Mylo", shirtColor: "#ecf0f1", skinColor: "#d5d8dc",
    x: 52, y: 8, facing: DIR.DOWN,
    dialogue: [
      "Psst! Encontraste-me! Sou o Mylo, o assistente IA do Jaime.",
      "Eu ajudo a gerir o sistema \u2014 37 cron jobs, 9 hooks, integra\u00e7\u00e3o com Telegram, SearXNG, ChromaDB...",
      "O Jaime acredita em 'building in public'. Tudo o que fazemos \u00e9 transparente.",
      "Easter egg desbloqueado: \u00e9s um verdadeiro explorador!",
    ],
    questGiver: false, questId: -1, wanderRadius: 1,
  },
  {
    id: 12, name: "Guardi\u00e3o", shirtColor: "#f39c12", skinColor: "#f5cba7",
    x: 29, y: 34, facing: DIR.UP,
    dialogue: [
      "Sou o Guardi\u00e3o da Torre do Portfolio. Para entrar, deves provar o teu valor.",
      "Completa pelo menos 3 quests e abre 5 ba\u00fas. S\u00f3 ent\u00e3o as portas se abrir\u00e3o!",
      "Volta quando estiveres pronto, explorador.",
    ],
    questGiver: false, questId: -1, wanderRadius: 0,
  },
];

/* ================================================================
   CHEST DEFINITIONS
   ================================================================ */
interface ChestDef {
  id: number;
  x: number; // tile col
  y: number; // tile row
  skill: string;
  emoji: string;
  zone: string;
}

const CHEST_DEFS: ChestDef[] = [
  { id: 0, x: 26, y: 21, skill: "React", emoji: "\u269b\ufe0f", zone: "Centro" },
  { id: 1, x: 33, y: 21, skill: "TypeScript", emoji: "\ud83d\udcd8", zone: "Centro" },
  { id: 2, x: 23, y: 5, skill: "Next.js", emoji: "\u25b2", zone: "Lab" },
  { id: 3, x: 29, y: 5, skill: "Python", emoji: "\ud83d\udc0d", zone: "Lab" },
  { id: 4, x: 35, y: 5, skill: "Tailwind", emoji: "\ud83c\udfa8", zone: "Lab" },
  { id: 5, x: 23, y: 11, skill: "Figma", emoji: "\ud83d\udd8c\ufe0f", zone: "Lab" },
  { id: 6, x: 44, y: 20, skill: "Node.js", emoji: "\ud83d\udfe2", zone: "Vila" },
  { id: 7, x: 53, y: 20, skill: "PostgreSQL", emoji: "\ud83d\udc18", zone: "Vila" },
  { id: 8, x: 44, y: 29, skill: "Three.js", emoji: "\ud83c\udf10", zone: "Vila" },
  { id: 9, x: 6, y: 20, skill: "Docker", emoji: "\ud83d\udc33", zone: "Cl\u00ednicas" },
  { id: 10, x: 14, y: 20, skill: "Git", emoji: "\ud83d\udce6", zone: "Cl\u00ednicas" },
  { id: 11, x: 6, y: 29, skill: "Linux", emoji: "\ud83d\udc27", zone: "Cl\u00ednicas" },
  { id: 12, x: 29, y: 38, skill: "AI/ML", emoji: "\ud83e\udd16", zone: "Torre" },
  { id: 13, x: 33, y: 44, skill: "Vercel", emoji: "\u25b2", zone: "Torre" },
  { id: 14, x: 53, y: 7, skill: "Claude", emoji: "\ud83e\udde0", zone: "Floresta" },
];

/* ================================================================
   QUEST DEFINITIONS
   ================================================================ */
interface QuestDef {
  id: number;
  name: string;
  description: string;
  targetCount: number;
  reward: string;
  rewardEmoji: string;
}

const QUEST_DEFS: QuestDef[] = [
  { id: 0, name: "Primeiro Passo", description: "Fala com outro NPC al\u00e9m da Sara", targetCount: 1, reward: "B\u00fassola", rewardEmoji: "\ud83e\udded" },
  { id: 1, name: "Tour Gastron\u00f3mico", description: "Visita os 6 restaurantes", targetCount: 6, reward: "Chap\u00e9u de Chef", rewardEmoji: "\ud83d\udc68\u200d\ud83c\udf73" },
  { id: 2, name: "Sa\u00fade em Dia", description: "Abre 3 ba\u00fas nas cl\u00ednicas", targetCount: 3, reward: "Estetoscopio", rewardEmoji: "\ud83e\ude7a" },
  { id: 3, name: "Hack the Planet", description: "Abre 4 ba\u00fas no laborat\u00f3rio", targetCount: 4, reward: "Terminal", rewardEmoji: "\ud83d\udcbb" },
  { id: 4, name: "Conversador", description: "Fala com os 12 NPCs", targetCount: 12, reward: "Bal\u00e3o de Fala", rewardEmoji: "\ud83d\udcac" },
  { id: 5, name: "Ca\u00e7a ao Tesouro", description: "Abre 10 dos 15 ba\u00fas", targetCount: 10, reward: "Chave Mestra", rewardEmoji: "\ud83d\udd11" },
  { id: 6, name: "Cart\u00f3grafo", description: "Visita todas as 6 zonas", targetCount: 6, reward: "Mapa", rewardEmoji: "\ud83d\uddfa\ufe0f" },
  { id: 7, name: "A Lenda", description: "Completa todas as quests (1-7)", targetCount: 7, reward: "Coroa", rewardEmoji: "\ud83d\udc51" },
];

/* ================================================================
   RESTAURANT BUILDING POSITIONS (for quest tracking)
   ================================================================ */
const RESTAURANT_POSITIONS = [
  { id: 0, name: "Ca\u00e7arola", doorX: 44, doorY: 21 },
  { id: 1, name: "Bijou", doorX: 53, doorY: 21 },
  { id: 2, name: "MeioCheio", doorX: 44, doorY: 24 },
  { id: 3, name: "Tasca da Praia", doorX: 44, doorY: 30 },
  { id: 4, name: "P\u00e9 na Areia", doorX: 53, doorY: 30 },
  { id: 5, name: "Mesa dos Amigos", doorX: 55, doorY: 24 },
];

/* ================================================================
   PARTICLE SYSTEM
   ================================================================ */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

/* ================================================================
   GAME STATE TYPES
   ================================================================ */
interface PlayerState {
  x: number;
  y: number;
  facing: Direction;
  walking: boolean;
  walkFrame: number;
  walkTimer: number;
  sprinting: boolean;
}

interface NPCState {
  id: number;
  x: number;
  y: number;
  facing: Direction;
  homeX: number;
  homeY: number;
  wanderTimer: number;
  talked: boolean;
}

interface ChestState {
  id: number;
  x: number;
  y: number;
  opened: boolean;
  openAnim: number;
}

interface QuestState {
  id: number;
  status: "locked" | "active" | "complete";
  progress: number;
}

interface CameraState {
  x: number;
  y: number;
}

type GameScreen = "start" | "playing" | "complete";

/* ================================================================
   HELPER FUNCTIONS
   ================================================================ */
function tileToPixel(tileX: number, tileY: number): [number, number] {
  return [tileX * TILE_SIZE, tileY * TILE_SIZE];
}

function pixelToTile(px: number, py: number): [number, number] {
  return [Math.floor(px / TILE_SIZE), Math.floor(py / TILE_SIZE)];
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function getZoneAt(tileX: number, tileY: number): Zone | null {
  for (const z of ZONES) {
    if (tileX >= z.x && tileX < z.x + z.w && tileY >= z.y && tileY < z.y + z.h) {
      return z;
    }
  }
  return null;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function RPGQuestPage() {
  // ─── Canvas Refs ───
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef(0);

  // ─── Game State Refs (hot path) ───
  const playerRef = useRef<PlayerState>({
    x: 29 * TILE_SIZE + TILE_SIZE / 2,
    y: 26 * TILE_SIZE + TILE_SIZE / 2,
    facing: DIR.DOWN,
    walking: false,
    walkFrame: 0,
    walkTimer: 0,
    sprinting: false,
  });

  const cameraRef = useRef<CameraState>({ x: 0, y: 0 });

  const npcsRef = useRef<NPCState[]>(
    NPC_DEFS.map((n) => ({
      id: n.id,
      x: n.x * TILE_SIZE + TILE_SIZE / 2,
      y: n.y * TILE_SIZE + TILE_SIZE / 2,
      facing: n.facing,
      homeX: n.x * TILE_SIZE + TILE_SIZE / 2,
      homeY: n.y * TILE_SIZE + TILE_SIZE / 2,
      wanderTimer: Math.random() * 200 + 100,
      talked: false,
    }))
  );

  const chestsRef = useRef<ChestState[]>(
    CHEST_DEFS.map((c) => ({
      id: c.id,
      x: c.x * TILE_SIZE + TILE_SIZE / 2,
      y: c.y * TILE_SIZE + TILE_SIZE / 2,
      opened: false,
      openAnim: 0,
    }))
  );

  const keysRef = useRef<Set<string>>(new Set());
  const particlesRef = useRef<Particle[]>([]);
  const touchDirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchActionRef = useRef(false);
  const visitedZonesRef = useRef<Set<string>>(new Set());
  const visitedRestaurantsRef = useRef<Set<number>>(new Set());
  const interactCooldownRef = useRef(0);
  const dayCycleRef = useRef(0);
  const nearestInteractableRef = useRef<{ type: "npc" | "chest"; id: number; dist: number } | null>(null);
  const zoneTransitionRef = useRef(0);
  const prevZoneRef = useRef<string>("");
  const screenFlashRef = useRef(0);
  const questCompleteAnimRef = useRef<{ active: boolean; timer: number; questName: string }>({
    active: false, timer: 0, questName: "",
  });
  const statsRef = useRef({ startTime: 0, distanceWalked: 0, npcstalked: 0, chestsOpened: 0 });

  // ─── React State (UI overlays) ───
  const [gameScreen, setGameScreen] = useState<GameScreen>("start");
  const [dialogue, setDialogue] = useState<{
    active: boolean;
    npcName: string;
    npcColor: string;
    pages: string[];
    currentPage: number;
    displayedText: string;
    typing: boolean;
    charIndex: number;
  } | null>(null);
  const [quests, setQuests] = useState<QuestState[]>(
    QUEST_DEFS.map((q) => ({ id: q.id, status: "locked" as const, progress: 0 }))
  );
  const [inventory, setInventory] = useState<{ skill: string; emoji: string }[]>([]);
  const [questRewards, setQuestRewards] = useState<{ name: string; emoji: string }[]>([]);
  const [showInventory, setShowInventory] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [hudText, setHudText] = useState("");
  const [questBanner, setQuestBanner] = useState<string | null>(null);
  const [chestNotif, setChestNotif] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentZoneName, setCurrentZoneName] = useState("");
  const [completedQuestCount, setCompletedQuestCount] = useState(0);
  const [openedChestCount, setOpenedChestCount] = useState(0);
  const [talkedNpcCount, setTalkedNpcCount] = useState(0);

  // ─── Typewriter refs ───
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Detect mobile ───
  useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ================================================================
     QUEST LOGIC HELPERS
     ================================================================ */
  const updateQuestProgress = useCallback(
    (questId: number, newProgress: number) => {
      setQuests((prev) => {
        const updated = [...prev];
        const q = updated[questId];
        if (!q || q.status === "complete") return prev;
        const def = QUEST_DEFS[questId];
        const p = Math.min(newProgress, def.targetCount);
        if (p >= def.targetCount) {
          updated[questId] = { ...q, progress: p, status: "complete" };
          // Show banner
          setQuestBanner(`Quest Completa: ${def.name} ${def.rewardEmoji}`);
          setTimeout(() => setQuestBanner(null), 3000);
          // Add reward
          setQuestRewards((rw) => [...rw, { name: def.reward, emoji: def.rewardEmoji }]);
          screenFlashRef.current = 15;
          questCompleteAnimRef.current = { active: true, timer: 60, questName: def.name };
          return updated;
        }
        updated[questId] = { ...q, progress: p, status: "active" };
        return updated;
      });
    },
    []
  );

  const activateQuest = useCallback(
    (questId: number) => {
      setQuests((prev) => {
        const updated = [...prev];
        if (updated[questId].status === "locked") {
          updated[questId] = { ...updated[questId], status: "active" };
        }
        return updated;
      });
    },
    []
  );

  // Compute derived quest stats
  useEffect(() => {
    const completed = quests.filter((q) => q.status === "complete").length;
    setCompletedQuestCount(completed);

    // Update HUD text for active quest
    const active = quests.find((q) => q.status === "active");
    if (active) {
      const def = QUEST_DEFS[active.id];
      setHudText(`${def.name}: ${active.progress}/${def.targetCount} ${def.description}`);
    } else if (completed === QUEST_DEFS.length) {
      setHudText("Todas as quests completas!");
    } else {
      setHudText("");
    }

    // Check "A Lenda" quest (quest 7) — complete when quests 0-6 are all complete
    const firstSeven = quests.slice(0, 7);
    const allFirstSevenComplete = firstSeven.every((q) => q.status === "complete");
    if (allFirstSevenComplete && quests[7].status !== "complete") {
      updateQuestProgress(7, 7);
      setTimeout(() => setGameScreen("complete"), 2000);
    }
  }, [quests, updateQuestProgress]);

  /* ================================================================
     INTERACTION HANDLER
     ================================================================ */
  const handleInteract = useCallback(() => {
    if (interactCooldownRef.current > 0) return;
    interactCooldownRef.current = 15;

    // If dialogue is active, advance it
    if (dialogue) {
      if (dialogue.typing) {
        // Skip to end of current page
        const fullText = dialogue.pages[dialogue.currentPage];
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        setDialogue((d) =>
          d ? { ...d, displayedText: fullText, typing: false, charIndex: fullText.length } : null
        );
        return;
      }
      // Go to next page or close
      if (dialogue.currentPage < dialogue.pages.length - 1) {
        const nextPage = dialogue.currentPage + 1;
        const nextText = dialogue.pages[nextPage];
        setDialogue((d) =>
          d
            ? {
                ...d,
                currentPage: nextPage,
                displayedText: "",
                typing: true,
                charIndex: 0,
              }
            : null
        );
        // Start typewriter for next page
        let ci = 0;
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        typewriterRef.current = setInterval(() => {
          ci++;
          if (ci >= nextText.length) {
            if (typewriterRef.current) clearInterval(typewriterRef.current);
            setDialogue((d) =>
              d ? { ...d, displayedText: nextText, typing: false, charIndex: nextText.length } : null
            );
          } else {
            setDialogue((d) =>
              d ? { ...d, displayedText: nextText.substring(0, ci), charIndex: ci } : null
            );
          }
        }, TYPEWRITER_SPEED);
        return;
      }
      // Close dialogue
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      setDialogue(null);
      return;
    }

    const nearest = nearestInteractableRef.current;
    if (!nearest) return;

    if (nearest.type === "npc") {
      const npcDef = NPC_DEFS.find((n) => n.id === nearest.id);
      const npcState = npcsRef.current.find((n) => n.id === nearest.id);
      if (!npcDef || !npcState) return;

      // Mark as talked
      if (!npcState.talked) {
        npcState.talked = true;
        statsRef.current.npcstalked++;
        const talkedCount = npcsRef.current.filter((n) => n.talked).length;
        setTalkedNpcCount(talkedCount);

        // Quest: Primeiro Passo (talk to any NPC besides Sara)
        if (npcDef.id !== 1) {
          activateQuest(0);
          updateQuestProgress(0, 1);
        }

        // Quest: Conversador (talk to all 12)
        if (quests[4].status !== "complete") {
          activateQuest(4);
          updateQuestProgress(4, talkedCount);
        }
      }

      // Activate quest if NPC is quest giver
      if (npcDef.questGiver && npcDef.questId >= 0) {
        activateQuest(npcDef.questId);
      }

      // Face player toward NPC
      const player = playerRef.current;
      const dx = npcState.x - player.x;
      const dy = npcState.y - player.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        player.facing = dx > 0 ? DIR.RIGHT : DIR.LEFT;
      } else {
        player.facing = dy > 0 ? DIR.DOWN : DIR.UP;
      }

      // NPC faces player
      npcState.facing = dx > 0 ? DIR.LEFT : dx < 0 ? DIR.RIGHT : dy > 0 ? DIR.UP : DIR.DOWN;

      // Guardian special logic
      if (npcDef.id === 12) {
        const completedCount = quests.filter((q) => q.status === "complete").length;
        const openedCount = chestsRef.current.filter((c) => c.opened).length;
        if (completedCount >= 3 && openedCount >= 5) {
          // Allow passage
          setDialogue({
            active: true,
            npcName: npcDef.name,
            npcColor: npcDef.shirtColor,
            pages: [
              "Impressionante! Provaste o teu valor, explorador.",
              "As portas da Torre est\u00e3o abertas. Entra e descobre o cora\u00e7\u00e3o da Descomplicai!",
            ],
            currentPage: 0,
            displayedText: "",
            typing: true,
            charIndex: 0,
          });
        } else {
          setDialogue({
            active: true,
            npcName: npcDef.name,
            npcColor: npcDef.shirtColor,
            pages: npcDef.dialogue,
            currentPage: 0,
            displayedText: "",
            typing: true,
            charIndex: 0,
          });
        }
      } else {
        // Open dialogue
        setDialogue({
          active: true,
          npcName: npcDef.name,
          npcColor: npcDef.shirtColor,
          pages: npcDef.dialogue,
          currentPage: 0,
          displayedText: "",
          typing: true,
          charIndex: 0,
        });
      }

      // Start typewriter
      const firstPage = npcDef.dialogue[0];
      let ci = 0;
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      typewriterRef.current = setInterval(() => {
        ci++;
        if (ci >= firstPage.length) {
          if (typewriterRef.current) clearInterval(typewriterRef.current);
          setDialogue((d) =>
            d ? { ...d, displayedText: firstPage, typing: false, charIndex: firstPage.length } : null
          );
        } else {
          setDialogue((d) =>
            d ? { ...d, displayedText: firstPage.substring(0, ci), charIndex: ci } : null
          );
        }
      }, TYPEWRITER_SPEED);
    } else if (nearest.type === "chest") {
      const chest = chestsRef.current.find((c) => c.id === nearest.id);
      const chestDef = CHEST_DEFS[nearest.id];
      if (!chest || !chestDef || chest.opened) return;

      chest.opened = true;
      chest.openAnim = 20;
      statsRef.current.chestsOpened++;
      const totalOpened = chestsRef.current.filter((c) => c.opened).length;
      setOpenedChestCount(totalOpened);

      // Add to inventory
      setInventory((inv) => [...inv, { skill: chestDef.skill, emoji: chestDef.emoji }]);
      setChestNotif(`${chestDef.emoji} ${chestDef.skill} adquirido!`);
      setTimeout(() => setChestNotif(null), 2000);

      // Spawn golden particles
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push({
          x: chest.x,
          y: chest.y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 3 - 1,
          life: 40 + Math.random() * 20,
          maxLife: 60,
          color: "#ffd700",
          size: 3,
        });
      }

      // Quest: Saude em Dia (3 clinic chests)
      if (chestDef.zone === "Cl\u00ednicas") {
        const clinicOpened = chestsRef.current
          .filter((c) => c.opened && CHEST_DEFS[c.id].zone === "Cl\u00ednicas")
          .length;
        activateQuest(2);
        updateQuestProgress(2, clinicOpened);
      }

      // Quest: Hack the Planet (4 lab chests)
      if (chestDef.zone === "Lab") {
        const labOpened = chestsRef.current
          .filter((c) => c.opened && CHEST_DEFS[c.id].zone === "Lab")
          .length;
        activateQuest(3);
        updateQuestProgress(3, labOpened);
      }

      // Quest: Caca ao Tesouro (10 total chests)
      if (quests[5].status !== "complete") {
        activateQuest(5);
        updateQuestProgress(5, totalOpened);
      }
    }
  }, [dialogue, quests, activateQuest, updateQuestProgress]);

  /* ================================================================
     INPUT HANDLERS
     ================================================================ */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameScreen !== "playing") {
        if (e.key === "Enter" && gameScreen === "start") {
          statsRef.current.startTime = Date.now();
          setGameScreen("playing");
        }
        return;
      }

      keysRef.current.add(e.key.toLowerCase());

      if (e.key === "Shift") {
        playerRef.current.sprinting = true;
      }

      if (e.key.toLowerCase() === "e" || e.key === " ") {
        handleInteract();
      }
      if (e.key.toLowerCase() === "q") {
        if (!dialogue) setShowQuestLog((s) => !s);
      }
      if (e.key.toLowerCase() === "i") {
        if (!dialogue) setShowInventory((s) => !s);
      }
      if (e.key === "Escape") {
        if (dialogue) {
          if (typewriterRef.current) clearInterval(typewriterRef.current);
          setDialogue(null);
        } else if (showInventory) {
          setShowInventory(false);
        } else if (showQuestLog) {
          setShowQuestLog(false);
        } else if (showControls) {
          setShowControls(false);
        } else {
          setShowPause((s) => !s);
        }
      }
    },
    [gameScreen, dialogue, handleInteract, showInventory, showQuestLog, showControls]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysRef.current.delete(e.key.toLowerCase());
    if (e.key === "Shift") {
      playerRef.current.sprinting = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  /* ================================================================
     DRAWING FUNCTIONS
     ================================================================ */
  const drawTile = useCallback(
    (ctx: CanvasRenderingContext2D, col: number, row: number, screenX: number, screenY: number, frame: number) => {
      const tileType = WORLD_MAP[row]?.[col];
      if (tileType === undefined) return;
      const meta = TILE_META[tileType];
      const animPhase = Math.floor(frame / 30) % 2;
      const color = animPhase === 1 && meta.color2 ? meta.color2 : meta.color1;

      ctx.fillStyle = color;
      ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

      // Tile-specific details
      switch (tileType) {
        case T.GRASS:
          // Subtle grass texture
          ctx.fillStyle = "rgba(0,0,0,0.05)";
          ctx.fillRect(screenX + 4, screenY + 4, 2, 2);
          ctx.fillRect(screenX + 20, screenY + 14, 2, 2);
          ctx.fillRect(screenX + 12, screenY + 24, 2, 2);
          break;
        case T.WATER:
          // Wave lines
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          const waveOffset = animPhase * 4;
          ctx.moveTo(screenX + waveOffset, screenY + 10);
          ctx.quadraticCurveTo(screenX + 8 + waveOffset, screenY + 6, screenX + 16 + waveOffset, screenY + 10);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(screenX + waveOffset, screenY + 22);
          ctx.quadraticCurveTo(screenX + 8 + waveOffset, screenY + 18, screenX + 16 + waveOffset, screenY + 22);
          ctx.stroke();
          break;
        case T.PATH:
          // Stone path texture
          ctx.fillStyle = "rgba(0,0,0,0.08)";
          ctx.fillRect(screenX + 2, screenY + 2, 12, 12);
          ctx.fillRect(screenX + 16, screenY + 16, 14, 14);
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          ctx.fillRect(screenX + 16, screenY + 2, 14, 12);
          ctx.fillRect(screenX + 2, screenY + 16, 12, 14);
          break;
        case T.WALL:
          // Brick lines
          ctx.strokeStyle = "rgba(0,0,0,0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(screenX + 0.5, screenY + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);
          ctx.beginPath();
          ctx.moveTo(screenX, screenY + 10);
          ctx.lineTo(screenX + TILE_SIZE, screenY + 10);
          ctx.moveTo(screenX, screenY + 20);
          ctx.lineTo(screenX + TILE_SIZE, screenY + 20);
          ctx.moveTo(screenX + 16, screenY);
          ctx.lineTo(screenX + 16, screenY + 10);
          ctx.moveTo(screenX + 8, screenY + 10);
          ctx.lineTo(screenX + 8, screenY + 20);
          ctx.moveTo(screenX + 24, screenY + 20);
          ctx.lineTo(screenX + 24, screenY + TILE_SIZE);
          ctx.stroke();
          break;
        case T.BRIDGE:
          // Wood planks
          ctx.strokeStyle = "rgba(0,0,0,0.15)";
          ctx.lineWidth = 1;
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(screenX, screenY + i * 8 + 4);
            ctx.lineTo(screenX + TILE_SIZE, screenY + i * 8 + 4);
            ctx.stroke();
          }
          break;
        case T.SAND:
          // Sand dots
          ctx.fillStyle = "rgba(0,0,0,0.04)";
          ctx.fillRect(screenX + 6, screenY + 6, 2, 2);
          ctx.fillRect(screenX + 22, screenY + 18, 2, 2);
          ctx.fillRect(screenX + 14, screenY + 26, 2, 2);
          break;
        case T.FLOOR:
          // Floor tile grid
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(screenX + 1, screenY + 1, TILE_SIZE - 2, TILE_SIZE - 2);
          break;
        case T.DOOR:
          // Door details
          ctx.fillStyle = "#6B3410";
          ctx.fillRect(screenX + 4, screenY + 2, TILE_SIZE - 8, TILE_SIZE - 4);
          ctx.fillStyle = "#DAA520";
          ctx.beginPath();
          ctx.arc(screenX + TILE_SIZE - 10, screenY + TILE_SIZE / 2, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case T.TREE:
          // Trunk
          ctx.fillStyle = "#5D4037";
          ctx.fillRect(screenX + 12, screenY + 18, 8, 14);
          // Leaves (circle)
          ctx.fillStyle = "#2d5a27";
          ctx.beginPath();
          ctx.arc(screenX + 16, screenY + 14, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#3d7a35";
          ctx.beginPath();
          ctx.arc(screenX + 14, screenY + 12, 8, 0, Math.PI * 2);
          ctx.fill();
          break;
        case T.FLOWER:
          // Grass base
          ctx.fillStyle = "#4a7c3f";
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          // Flower dots
          const flowerColors = ["#e74c3c", "#f39c12", "#e91e63", "#9b59b6", "#3498db"];
          const seed = (col * 7 + row * 13) % 5;
          ctx.fillStyle = flowerColors[seed];
          ctx.beginPath();
          ctx.arc(screenX + 8 + (animPhase * 2), screenY + 8, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = flowerColors[(seed + 2) % 5];
          ctx.beginPath();
          ctx.arc(screenX + 22, screenY + 20 - (animPhase * 2), 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = flowerColors[(seed + 4) % 5];
          ctx.beginPath();
          ctx.arc(screenX + 10, screenY + 24, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case T.ROCK:
          // Rock on grass
          ctx.fillStyle = "#4a7c3f";
          ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          ctx.fillStyle = "#808080";
          ctx.beginPath();
          ctx.ellipse(screenX + 16, screenY + 18, 10, 8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#999";
          ctx.beginPath();
          ctx.ellipse(screenX + 14, screenY + 16, 6, 4, -0.3, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    },
    []
  );

  const drawCharacter = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      facing: Direction,
      shirtColor: string,
      skinColor: string,
      walkFrame: number,
      walking: boolean,
      scale: number = 1
    ) => {
      const s = scale;
      const cx = x;
      const cy = y;

      // Idle bounce
      let bounceY = 0;
      if (!walking) {
        bounceY = Math.sin(frameCountRef.current * 0.05) * 1;
      }

      // Walk leg animation
      const legOffset = walking ? Math.sin(walkFrame * 0.3) * 3 * s : 0;

      ctx.save();
      ctx.translate(cx, cy + bounceY);

      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath();
      ctx.ellipse(0, 14 * s, 8 * s, 3 * s, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = "#2c3e50";
      if (facing === DIR.LEFT || facing === DIR.RIGHT) {
        ctx.fillRect(-3 * s, 4 * s + legOffset, 3 * s, 8 * s);
        ctx.fillRect(1 * s, 4 * s - legOffset, 3 * s, 8 * s);
      } else {
        ctx.fillRect(-5 * s, 4 * s + legOffset, 4 * s, 8 * s);
        ctx.fillRect(1 * s, 4 * s - legOffset, 4 * s, 8 * s);
      }

      // Body
      ctx.fillStyle = shirtColor;
      ctx.fillRect(-6 * s, -6 * s, 12 * s, 12 * s);

      // Head
      ctx.fillStyle = skinColor;
      ctx.fillRect(-5 * s, -14 * s, 10 * s, 9 * s);

      // Hair
      ctx.fillStyle = "#3d2b1f";
      ctx.fillRect(-5 * s, -15 * s, 10 * s, 3 * s);

      // Eyes
      ctx.fillStyle = "#1a1a2e";
      if (facing === DIR.DOWN) {
        ctx.fillRect(-3 * s, -10 * s, 2 * s, 2 * s);
        ctx.fillRect(1 * s, -10 * s, 2 * s, 2 * s);
      } else if (facing === DIR.UP) {
        // No eyes visible from behind
      } else if (facing === DIR.LEFT) {
        ctx.fillRect(-4 * s, -10 * s, 2 * s, 2 * s);
      } else {
        ctx.fillRect(2 * s, -10 * s, 2 * s, 2 * s);
      }

      ctx.restore();
    },
    []
  );

  const drawChest = useCallback(
    (ctx: CanvasRenderingContext2D, chest: ChestState, screenX: number, screenY: number, frame: number) => {
      const animScale = chest.openAnim > 0 ? 1 + (chest.openAnim / 20) * 0.2 : 1;
      const cx = screenX;
      const cy = screenY;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(animScale, animScale);

      if (chest.opened) {
        // Opened chest
        ctx.fillStyle = "#c9a96e";
        ctx.fillRect(-10, -6, 20, 14);
        // Open lid
        ctx.fillStyle = "#b08850";
        ctx.fillRect(-10, -12, 20, 8);
        // Sparkle
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(0, -2, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Closed chest
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(-10, -6, 20, 14);
        // Lid
        ctx.fillStyle = "#6B3410";
        ctx.fillRect(-10, -10, 20, 6);
        // Lock
        ctx.fillStyle = "#DAA520";
        ctx.fillRect(-2, -8, 4, 4);

        // Sparkle particles for unopened chests
        if (frame % 20 < 10) {
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          const sparkleY = -14 - (frame % 20) * 0.5;
          ctx.beginPath();
          ctx.arc(Math.sin(frame * 0.1) * 5, sparkleY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    },
    []
  );

  /* ================================================================
     MINIMAP DRAWING
     ================================================================ */
  const drawMinimap = useCallback(() => {
    const canvas = minimapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = MINIMAP_W / MAP_COLS;
    const scaleY = MINIMAP_H / MAP_ROWS;

    ctx.clearRect(0, 0, MINIMAP_W, MINIMAP_H);

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, MINIMAP_W, MINIMAP_H);

    // Draw tiles
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        const tile = WORLD_MAP[r][c];
        const meta = TILE_META[tile];
        const px = c * scaleX;
        const py = r * scaleY;

        // Fog of war
        const playerTile = pixelToTile(playerRef.current.x, playerRef.current.y);
        const distToPlayer = dist(c, r, playerTile[0], playerTile[1]);
        const visited = visitedZonesRef.current.size > 0;

        let alpha = 1;
        if (distToPlayer > 20 && !visited) alpha = 0.3;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = meta.color1;

        // Simplify some tile colors for minimap
        if (tile === T.TREE) ctx.fillStyle = "#2d5a27";
        if (tile === T.WALL) ctx.fillStyle = "#4a4a4a";
        if (tile === T.DOOR) ctx.fillStyle = "#8B4513";
        if (tile === T.FLOWER) ctx.fillStyle = "#e74c3c";

        ctx.fillRect(px, py, Math.ceil(scaleX), Math.ceil(scaleY));
      }
    }

    ctx.globalAlpha = 1;

    // Draw unopened chests as yellow dots
    chestsRef.current.forEach((chest) => {
      if (!chest.opened) {
        const [tc, tr] = pixelToTile(chest.x, chest.y);
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(tc * scaleX + scaleX / 2, tr * scaleY + scaleY / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw NPCs as red dots (untalked)
    npcsRef.current.forEach((npc) => {
      if (!npc.talked) {
        const [tc, tr] = pixelToTile(npc.x, npc.y);
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath();
        ctx.arc(tc * scaleX + scaleX / 2, tr * scaleY + scaleY / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Player (pulsing white dot)
    const [ptc, ptr] = pixelToTile(playerRef.current.x, playerRef.current.y);
    const pulse = Math.sin(frameCountRef.current * 0.1) * 0.5 + 1.5;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(ptc * scaleX + scaleX / 2, ptr * scaleY + scaleY / 2, pulse + 1, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, MINIMAP_W, MINIMAP_H);
  }, []);

  /* ================================================================
     MAIN GAME LOOP
     ================================================================ */
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = frameCountRef.current++;
    const player = playerRef.current;
    const camera = cameraRef.current;

    // ─── Resize canvas to viewport ───
    const dpr = window.devicePixelRatio || 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ─── Scale for mobile ───
    const effectiveScale = vw < 640 ? 1.5 : SCALE;
    const effectiveTileSize = BASE_TILE_SIZE * effectiveScale;

    // ─── PLAYER MOVEMENT ───
    if (gameScreen === "playing" && !dialogue && !showPause && !showInventory && !showQuestLog) {
      let dx = 0;
      let dy = 0;
      const keys = keysRef.current;
      const touch = touchDirRef.current;

      if (keys.has("w") || keys.has("arrowup") || touch.y < 0) dy = -1;
      if (keys.has("s") || keys.has("arrowdown") || touch.y > 0) dy = 1;
      if (keys.has("a") || keys.has("arrowleft") || touch.x < 0) dx = -1;
      if (keys.has("d") || keys.has("arrowright") || touch.x > 0) dx = 1;

      // Touch action button
      if (touchActionRef.current) {
        touchActionRef.current = false;
        handleInteract();
      }

      // Normalize diagonal
      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      const speed = player.sprinting ? SPRINT_SPEED : PLAYER_SPEED;
      const moveX = dx * speed;
      const moveY = dy * speed;

      if (dx !== 0 || dy !== 0) {
        // Set facing direction
        if (Math.abs(dx) > Math.abs(dy)) {
          player.facing = dx > 0 ? DIR.RIGHT : DIR.LEFT;
        } else {
          player.facing = dy > 0 ? DIR.DOWN : DIR.UP;
        }
        player.walking = true;
        player.walkTimer++;
        if (player.walkTimer % 8 === 0) player.walkFrame++;

        // Collision check X
        const newX = player.x + moveX;
        const [ntx] = pixelToTile(newX, player.y);
        const [, nty] = pixelToTile(player.x, player.y);
        const tileAtNewX = WORLD_MAP[nty]?.[ntx];
        const metaX = tileAtNewX !== undefined ? TILE_META[tileAtNewX] : null;
        const npcBlockX = npcsRef.current.some(
          (n) => dist(newX, player.y, n.x, n.y) < TILE_SIZE * 0.6
        );
        const chestBlockX = chestsRef.current.some(
          (c) => !c.opened && dist(newX, player.y, c.x, c.y) < TILE_SIZE * 0.5
        );
        if (metaX?.walkable && !npcBlockX && !chestBlockX) {
          player.x = newX;
          statsRef.current.distanceWalked += Math.abs(moveX);
        }

        // Collision check Y
        const newY = player.y + moveY;
        const [ntx2] = pixelToTile(player.x, newY);
        const [, nty2] = pixelToTile(player.x, newY);
        const tileAtNewY = WORLD_MAP[nty2]?.[ntx2];
        const metaY = tileAtNewY !== undefined ? TILE_META[tileAtNewY] : null;
        const npcBlockY = npcsRef.current.some(
          (n) => dist(player.x, newY, n.x, n.y) < TILE_SIZE * 0.6
        );
        const chestBlockY = chestsRef.current.some(
          (c) => !c.opened && dist(player.x, newY, c.x, c.y) < TILE_SIZE * 0.5
        );
        if (metaY?.walkable && !npcBlockY && !chestBlockY) {
          player.y = newY;
          statsRef.current.distanceWalked += Math.abs(moveY);
        }

        // Footstep dust on sand/path
        const [pt] = pixelToTile(player.x, player.y);
        const currentTile = WORLD_MAP[pixelToTile(player.x, player.y)[1]]?.[pt];
        if ((currentTile === T.SAND || currentTile === T.PATH) && frame % 8 === 0) {
          particlesRef.current.push({
            x: player.x + (Math.random() - 0.5) * 8,
            y: player.y + 10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 0.5,
            life: 20,
            maxLife: 20,
            color: currentTile === T.SAND ? "#d4c49a" : "#a08858",
            size: 2,
          });
        }
      } else {
        player.walking = false;
        player.walkTimer = 0;
      }

      // Keep player in bounds
      player.x = clamp(player.x, TILE_SIZE * 2, (MAP_COLS - 2) * TILE_SIZE);
      player.y = clamp(player.y, TILE_SIZE * 2, (MAP_ROWS - 2) * TILE_SIZE);
    }

    // ─── Zone detection ───
    const [playerTileX, playerTileY] = pixelToTile(player.x, player.y);
    const currentZone = getZoneAt(playerTileX, playerTileY);
    if (currentZone) {
      if (!visitedZonesRef.current.has(currentZone.name)) {
        visitedZonesRef.current.add(currentZone.name);
        // Quest: Cartografo
        activateQuest(6);
        updateQuestProgress(6, visitedZonesRef.current.size);
      }
      if (currentZone.name !== prevZoneRef.current) {
        zoneTransitionRef.current = 12;
        prevZoneRef.current = currentZone.name;
        setCurrentZoneName(currentZone.name);
      }
    }

    // Restaurant visit detection (for Tour Gastronomico quest)
    RESTAURANT_POSITIONS.forEach((rest) => {
      if (Math.abs(playerTileX - rest.doorX) <= 1 && Math.abs(playerTileY - rest.doorY) <= 1) {
        if (!visitedRestaurantsRef.current.has(rest.id)) {
          visitedRestaurantsRef.current.add(rest.id);
          if (quests[1].status !== "complete") {
            activateQuest(1);
            updateQuestProgress(1, visitedRestaurantsRef.current.size);
          }
        }
      }
    });

    // ─── Cooldowns ───
    if (interactCooldownRef.current > 0) interactCooldownRef.current--;
    if (zoneTransitionRef.current > 0) zoneTransitionRef.current--;
    if (screenFlashRef.current > 0) screenFlashRef.current--;
    if (questCompleteAnimRef.current.active) {
      questCompleteAnimRef.current.timer--;
      if (questCompleteAnimRef.current.timer <= 0) {
        questCompleteAnimRef.current.active = false;
      }
    }

    // ─── NPC wandering ───
    npcsRef.current.forEach((npc) => {
      const def = NPC_DEFS.find((n) => n.id === npc.id);
      if (!def || def.wanderRadius === 0) return;

      npc.wanderTimer--;
      if (npc.wanderTimer <= 0) {
        npc.wanderTimer = 100 + Math.random() * 200;
        // Pick new wander target
        const angle = Math.random() * Math.PI * 2;
        const dist2 = Math.random() * def.wanderRadius * TILE_SIZE;
        const targetX = npc.homeX + Math.cos(angle) * dist2;
        const targetY = npc.homeY + Math.sin(angle) * dist2;

        // Check if walkable
        const [tx, ty] = pixelToTile(targetX, targetY);
        const tile = WORLD_MAP[ty]?.[tx];
        if (tile !== undefined && TILE_META[tile].walkable) {
          // Move toward target gradually
          const dx = targetX - npc.x;
          const dy = targetY - npc.y;
          npc.x += dx * 0.1;
          npc.y += dy * 0.1;
          if (Math.abs(dx) > Math.abs(dy)) {
            npc.facing = dx > 0 ? DIR.RIGHT : DIR.LEFT;
          } else {
            npc.facing = dy > 0 ? DIR.DOWN : DIR.UP;
          }
        }
      }

      // Face player when close
      const d = dist(npc.x, npc.y, player.x, player.y);
      if (d < TILE_SIZE * 3) {
        const dx = player.x - npc.x;
        const dy = player.y - npc.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          npc.facing = dx > 0 ? DIR.RIGHT : DIR.LEFT;
        } else {
          npc.facing = dy > 0 ? DIR.DOWN : DIR.UP;
        }
      }
    });

    // ─── Chest open animation ───
    chestsRef.current.forEach((chest) => {
      if (chest.openAnim > 0) chest.openAnim--;
    });

    // ─── Particles update ───
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // gravity
      p.life--;
      return p.life > 0;
    });

    // ─── Proximity detection for interaction ───
    nearestInteractableRef.current = null;
    let nearestDist = INTERACTION_RANGE;

    npcsRef.current.forEach((npc) => {
      const d = dist(player.x, player.y, npc.x, npc.y);
      if (d < nearestDist) {
        nearestDist = d;
        nearestInteractableRef.current = { type: "npc", id: npc.id, dist: d };
      }
    });

    chestsRef.current.forEach((chest) => {
      if (chest.opened) return;
      const d = dist(player.x, player.y, chest.x, chest.y);
      if (d < nearestDist) {
        nearestDist = d;
        nearestInteractableRef.current = { type: "chest", id: chest.id, dist: d };
      }
    });

    // ─── Day cycle ───
    dayCycleRef.current = (dayCycleRef.current + 0.001) % (Math.PI * 2);

    // ─── CAMERA ───
    const targetCamX = player.x - vw / 2;
    const targetCamY = player.y - vh / 2;
    camera.x = lerp(camera.x, targetCamX, CAMERA_LERP);
    camera.y = lerp(camera.y, targetCamY, CAMERA_LERP);
    // Clamp camera
    camera.x = clamp(camera.x, 0, MAP_COLS * TILE_SIZE - vw);
    camera.y = clamp(camera.y, 0, MAP_ROWS * TILE_SIZE - vh);

    // ─── RENDER ───
    // Clear
    const dayTint = Math.sin(dayCycleRef.current);
    const bgR = Math.round(20 + dayTint * 5);
    const bgG = Math.round(25 + dayTint * 5);
    const bgB = Math.round(35 - dayTint * 5);
    ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    ctx.fillRect(0, 0, vw, vh);

    // Calculate visible tile range
    const startCol = Math.max(0, Math.floor(camera.x / TILE_SIZE) - 1);
    const endCol = Math.min(MAP_COLS, Math.ceil((camera.x + vw) / TILE_SIZE) + 1);
    const startRow = Math.max(0, Math.floor(camera.y / TILE_SIZE) - 1);
    const endRow = Math.min(MAP_ROWS, Math.ceil((camera.y + vh) / TILE_SIZE) + 1);

    // Draw tiles
    for (let r = startRow; r < endRow; r++) {
      for (let c = startCol; c < endCol; c++) {
        const screenX = c * TILE_SIZE - camera.x;
        const screenY = r * TILE_SIZE - camera.y;
        drawTile(ctx, c, r, screenX, screenY, frame);
      }
    }

    // ─── Zone ambient tint ───
    if (currentZone) {
      ctx.fillStyle = currentZone.tint;
      ctx.fillRect(0, 0, vw, vh);
    }

    // ─── Lab glow lines (animated cyan grid in lab zone) ───
    if (currentZone?.name === "Laborat\u00f3rio Tech") {
      ctx.strokeStyle = `rgba(0,255,255,${0.1 + Math.sin(frame * 0.05) * 0.05})`;
      ctx.lineWidth = 1;
      for (let c = 21; c < 39; c += 3) {
        const sx = c * TILE_SIZE - camera.x;
        ctx.beginPath();
        ctx.moveTo(sx, 3 * TILE_SIZE - camera.y);
        ctx.lineTo(sx, 15 * TILE_SIZE - camera.y);
        ctx.stroke();
      }
      for (let r = 3; r < 15; r += 3) {
        const sy = r * TILE_SIZE - camera.y;
        ctx.beginPath();
        ctx.moveTo(21 * TILE_SIZE - camera.x, sy);
        ctx.lineTo(39 * TILE_SIZE - camera.x, sy);
        ctx.stroke();
      }
    }

    // ─── Draw chests ───
    chestsRef.current.forEach((chest) => {
      const sx = chest.x - camera.x;
      const sy = chest.y - camera.y;
      if (sx > -40 && sx < vw + 40 && sy > -40 && sy < vh + 40) {
        drawChest(ctx, chest, sx, sy, frame);
      }
    });

    // ─── Collect all characters for Y-sorting ───
    interface Renderable {
      y: number;
      draw: () => void;
    }
    const renderables: Renderable[] = [];

    // Player
    renderables.push({
      y: player.y,
      draw: () => {
        const sx = player.x - camera.x;
        const sy = player.y - camera.y;
        drawCharacter(ctx, sx, sy, player.facing, "#3498db", "#f5cba7", player.walkFrame, player.walking);
      },
    });

    // NPCs
    npcsRef.current.forEach((npc) => {
      const def = NPC_DEFS.find((n) => n.id === npc.id);
      if (!def) return;
      const sx = npc.x - camera.x;
      const sy = npc.y - camera.y;
      if (sx > -60 && sx < vw + 60 && sy > -60 && sy < vh + 60) {
        renderables.push({
          y: npc.y,
          draw: () => {
            drawCharacter(ctx, sx, sy, npc.facing, def.shirtColor, def.skinColor, 0, false);

            // NPC name above head
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.font = "10px 'Inter', sans-serif";
            ctx.textAlign = "center";
            const nameWidth = ctx.measureText(def.name).width;
            ctx.fillRect(sx - nameWidth / 2 - 4, sy - 30, nameWidth + 8, 14);
            ctx.fillStyle = "#fff";
            ctx.fillText(def.name, sx, sy - 20);

            // Quest indicators
            if (def.questGiver && def.questId >= 0) {
              const questState = quests[def.questId];
              if (questState) {
                let indicator = "";
                let indicatorColor = "#ffd700";
                if (questState.status === "locked") {
                  indicator = "!";
                  indicatorColor = "#ffd700";
                } else if (questState.status === "active") {
                  indicator = "?";
                  indicatorColor = "#3498db";
                } else {
                  indicator = "\u2713";
                  indicatorColor = "#2ecc71";
                }
                ctx.fillStyle = indicatorColor;
                ctx.font = "bold 16px sans-serif";
                const bobY = Math.sin(frame * 0.08) * 3;
                ctx.fillText(indicator, sx, sy - 36 + bobY);
              }
            }
          },
        });
      }
    });

    // Sort by Y and render
    renderables.sort((a, b) => a.y - b.y);
    renderables.forEach((r) => r.draw());

    // ─── Interaction indicator (floating "E") ───
    const nearestInteractable = nearestInteractableRef.current as { type: "npc" | "chest"; id: number; dist: number } | null;
    if (nearestInteractable && !dialogue) {
      let targetX = 0;
      let targetY = 0;
      if (nearestInteractable.type === "npc") {
        const npc = npcsRef.current.find((n) => n.id === nearestInteractable.id);
        if (npc) { targetX = npc.x; targetY = npc.y; }
      } else {
        const chest = chestsRef.current.find((c) => c.id === nearestInteractable.id);
        if (chest) { targetX = chest.x; targetY = chest.y; }
      }
      const sx = targetX - camera.x;
      const sy = targetY - camera.y;
      const bobY = Math.sin(frame * 0.1) * 3;

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";

      // Background pill
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      const ew = 22;
      const eh = 18;
      ctx.beginPath();
      ctx.roundRect(sx - ew / 2, sy - 50 + bobY, ew, eh, 4);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.fillText("E", sx, sy - 36 + bobY);
    }

    // ─── Particles ───
    particlesRef.current.forEach((p) => {
      const sx = p.x - camera.x;
      const sy = p.y - camera.y;
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // ─── Sound visualization (floating emojis) ───
    if (currentZone) {
      const zoneName = currentZone.name;
      let floatEmoji = "";
      if (zoneName.includes("Vila")) floatEmoji = "\ud83c\udfb5";
      else if (zoneName.includes("Cl\u00ednico")) floatEmoji = "\ud83d\udc93";
      else if (zoneName.includes("Lab")) floatEmoji = "{}";
      else if (zoneName.includes("Torre")) floatEmoji = "\u2728";

      if (floatEmoji && frame % 60 === 0) {
        particlesRef.current.push({
          x: player.x + (Math.random() - 0.5) * 100,
          y: player.y + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.8 - Math.random() * 0.5,
          life: 60,
          maxLife: 60,
          color: "#fff",
          size: 0, // we'll draw emojis instead for these
        });
      }

      // Render floating zone emojis
      if (floatEmoji && frame % 90 < 60) {
        ctx.font = "16px sans-serif";
        ctx.globalAlpha = 0.4 + Math.sin(frame * 0.05) * 0.2;
        for (let i = 0; i < 3; i++) {
          const ox = Math.sin(frame * 0.02 + i * 2) * 60;
          const oy = Math.cos(frame * 0.03 + i * 1.5) * 40;
          ctx.fillText(floatEmoji, vw / 2 + ox - 100 + i * 100, vh / 2 + oy - 80);
        }
        ctx.globalAlpha = 1;
      }
    }

    // ─── Water ripple effect for nearby water ───
    for (let r = startRow; r < endRow; r++) {
      for (let c = startCol; c < endCol; c++) {
        if (WORLD_MAP[r]?.[c] === T.WATER) {
          const sx = c * TILE_SIZE - camera.x + TILE_SIZE / 2;
          const sy = r * TILE_SIZE - camera.y + TILE_SIZE / 2;
          if (frame % 40 < 20) {
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.lineWidth = 0.5;
            const rippleR = (frame % 40) * 0.8;
            ctx.beginPath();
            ctx.arc(sx, sy, rippleR, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
    }

    // ─── Zone transition fade ───
    if (zoneTransitionRef.current > 0) {
      ctx.fillStyle = `rgba(0,0,0,${zoneTransitionRef.current / 12 * 0.3})`;
      ctx.fillRect(0, 0, vw, vh);
    }

    // ─── Screen flash ───
    if (screenFlashRef.current > 0) {
      ctx.fillStyle = `rgba(255,255,255,${screenFlashRef.current / 15 * 0.4})`;
      ctx.fillRect(0, 0, vw, vh);
    }

    // ─── Draw minimap ───
    drawMinimap();

    // ─── Continue loop ───
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [
    gameScreen, dialogue, showPause, showInventory, showQuestLog,
    drawTile, drawCharacter, drawChest, drawMinimap,
    handleInteract, quests, activateQuest, updateQuestProgress,
  ]);

  // ─── Start game loop ───
  useEffect(() => {
    if (gameScreen === "playing") {
      rafRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameScreen, gameLoop]);

  /* ================================================================
     TOUCH HANDLERS
     ================================================================ */
  const handleDpadTouch = useCallback((direction: string, active: boolean) => {
    const t = touchDirRef.current;
    if (direction === "up") t.y = active ? -1 : 0;
    if (direction === "down") t.y = active ? 1 : 0;
    if (direction === "left") t.x = active ? -1 : 0;
    if (direction === "right") t.x = active ? 1 : 0;
  }, []);

  /* ================================================================
     GAME STATS (for complete screen)
     ================================================================ */
  const getTimePlayed = useCallback(() => {
    if (!statsRef.current.startTime) return "0:00";
    const elapsed = Math.floor((Date.now() - statsRef.current.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  /* ================================================================
     RESTART GAME
     ================================================================ */
  const restartGame = useCallback(() => {
    playerRef.current = {
      x: 29 * TILE_SIZE + TILE_SIZE / 2,
      y: 26 * TILE_SIZE + TILE_SIZE / 2,
      facing: DIR.DOWN,
      walking: false,
      walkFrame: 0,
      walkTimer: 0,
      sprinting: false,
    };
    cameraRef.current = { x: 0, y: 0 };
    npcsRef.current = NPC_DEFS.map((n) => ({
      id: n.id,
      x: n.x * TILE_SIZE + TILE_SIZE / 2,
      y: n.y * TILE_SIZE + TILE_SIZE / 2,
      facing: n.facing,
      homeX: n.x * TILE_SIZE + TILE_SIZE / 2,
      homeY: n.y * TILE_SIZE + TILE_SIZE / 2,
      wanderTimer: Math.random() * 200 + 100,
      talked: false,
    }));
    chestsRef.current = CHEST_DEFS.map((c) => ({
      id: c.id,
      x: c.x * TILE_SIZE + TILE_SIZE / 2,
      y: c.y * TILE_SIZE + TILE_SIZE / 2,
      opened: false,
      openAnim: 0,
    }));
    particlesRef.current = [];
    visitedZonesRef.current = new Set();
    visitedRestaurantsRef.current = new Set();
    statsRef.current = { startTime: Date.now(), distanceWalked: 0, npcstalked: 0, chestsOpened: 0 };
    setQuests(QUEST_DEFS.map((q) => ({ id: q.id, status: "locked" as const, progress: 0 })));
    setInventory([]);
    setQuestRewards([]);
    setDialogue(null);
    setShowInventory(false);
    setShowQuestLog(false);
    setShowPause(false);
    setShowControls(false);
    setHudText("");
    setQuestBanner(null);
    setChestNotif(null);
    setCurrentZoneName("");
    setCompletedQuestCount(0);
    setOpenedChestCount(0);
    setTalkedNpcCount(0);
    setGameScreen("playing");
  }, []);

  /* ================================================================
     RENDER — START SCREEN
     ================================================================ */
  if (gameScreen === "start") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#0a0a1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sora), 'Sora', sans-serif",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => {
          statsRef.current.startTime = Date.now();
          setGameScreen("playing");
        }}
      >
        {/* Starfield background */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                background: "#fff",
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px rgba(39,174,96,0.5), 0 0 80px rgba(39,174,96,0.2)",
            }}
          >
            DESCOMPLICAI RPG
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.6)",
              margin: "12px 0 0",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          >
            Uma aventura pelo portfolio do Jaime
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ marginTop: 60 }}
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                color: "#27ae60",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Pressiona ENTER ou clica para come\u00e7ar
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{
              marginTop: 40,
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "12 NPCs", icon: "\ud83d\udc64" },
              { label: "15 Ba\u00fas", icon: "\ud83d\udce6" },
              { label: "8 Quests", icon: "\ud83d\udcdc" },
              { label: "6 Zonas", icon: "\ud83d\uddfa\ufe0f" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {stat.icon} {stat.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ================================================================
     RENDER — GAME COMPLETE SCREEN
     ================================================================ */
  if (gameScreen === "complete") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sora), 'Sora', sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Confetti */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: 8 + Math.random() * 8,
              height: 8 + Math.random() * 8,
              background: ["#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6", "#ffd700"][i % 6],
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
            animate={{
              top: ["0%", `${80 + Math.random() * 20}%`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 800,
              color: "#ffd700",
              margin: 0,
              textShadow: "0 0 40px rgba(255,215,0,0.5)",
            }}
          >
            PARAB\u00c9NS!
          </motion.h1>
          <p style={{
            fontSize: "2rem",
            margin: "8px 0",
          }}>
            \ud83c\udfc6
          </p>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "rgba(255,255,255,0.8)",
              margin: "20px 0",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
            }}
          >
            Exploraste todo o mundo da Descomplicai!
          </p>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              margin: "32px auto",
              maxWidth: 400,
            }}
          >
            {[
              { label: "Tempo jogado", value: getTimePlayed() },
              { label: "NPCs conversados", value: `${talkedNpcCount}/12` },
              { label: "Ba\u00fas abertos", value: `${openedChestCount}/15` },
              {
                label: "Dist\u00e2ncia andada",
                value: `${Math.round(statsRef.current.distanceWalked / TILE_SIZE)}m`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 20, color: "#fff", fontWeight: 700 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <motion.a
              href="https://descomplicai.pt/projetos"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "14px 28px",
                background: "#27ae60",
                color: "#fff",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver Portfolio Real \u2192
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartGame}
              style={{
                padding: "14px 28px",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              Jogar Outra Vez
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ================================================================
     RENDER — PLAYING (Canvas + UI Overlays)
     ================================================================ */
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0a0a1a",
        position: "relative",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          imageRendering: "pixelated",
        }}
      />

      {/* Minimap */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          borderRadius: 8,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <canvas
          ref={minimapCanvasRef}
          width={MINIMAP_W}
          height={MINIMAP_H}
          style={{ display: "block" }}
        />
      </div>

      {/* HUD — Active Quest (top-left) */}
      {hudText && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "8px 16px",
            background: "rgba(0,0,0,0.7)",
            borderRadius: 8,
            border: "1px solid rgba(255,215,0,0.3)",
            color: "#ffd700",
            fontSize: 13,
            maxWidth: 300,
            backdropFilter: "blur(8px)",
          }}
        >
          \ud83d\udd0d {hudText}
        </div>
      )}

      {/* Zone Name */}
      <AnimatePresence>
        {currentZoneName && (
          <motion.div
            key={currentZoneName}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "absolute",
              top: 56,
              left: 12,
              padding: "6px 14px",
              background: "rgba(0,0,0,0.6)",
              borderRadius: 6,
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
              backdropFilter: "blur(8px)",
            }}
          >
            \ud83d\udccd {currentZoneName}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats bar */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
        }}
      >
        <div style={statBadgeStyle}>
          \ud83d\udcac {talkedNpcCount}/12
        </div>
        <div style={statBadgeStyle}>
          \ud83d\udce6 {openedChestCount}/15
        </div>
        <div style={statBadgeStyle}>
          \u2705 {completedQuestCount}/8
        </div>
      </div>

      {/* Quest Complete Banner */}
      <AnimatePresence>
        {questBanner && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            style={{
              position: "absolute",
              top: 50,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 32px",
              background: "linear-gradient(135deg, rgba(255,215,0,0.9), rgba(218,165,32,0.9))",
              borderRadius: 12,
              color: "#1a0a00",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
              whiteSpace: "nowrap",
              zIndex: 100,
            }}
          >
            {questBanner}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chest Notification */}
      <AnimatePresence>
        {chestNotif && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            style={{
              position: "absolute",
              bottom: dialogue ? 210 : 80,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 24px",
              background: "rgba(0,0,0,0.8)",
              borderRadius: 10,
              color: "#ffd700",
              fontSize: 15,
              fontWeight: 600,
              border: "1px solid rgba(255,215,0,0.4)",
              zIndex: 90,
            }}
          >
            {chestNotif}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogue Panel */}
      <AnimatePresence>
        {dialogue && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 180,
              background: "rgba(10,10,30,0.92)",
              backdropFilter: "blur(12px)",
              borderTop: "2px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              zIndex: 200,
            }}
            onClick={handleInteract}
          >
            {/* NPC Name Header */}
            <div
              style={{
                padding: "8px 20px",
                background: dialogue.npcColor,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Portrait */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {dialogue.npcName[0]}
              </div>
              {dialogue.npcName}
            </div>

            {/* Dialogue Text */}
            <div
              style={{
                flex: 1,
                padding: "16px 20px",
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
                lineHeight: 1.6,
                overflow: "hidden",
              }}
            >
              {dialogue.displayedText}
              {dialogue.typing && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ color: "#27ae60" }}
                >
                  \u2588
                </motion.span>
              )}
            </div>

            {/* Continue indicator */}
            {!dialogue.typing && (
              <div
                style={{
                  padding: "6px 20px 10px",
                  textAlign: "right",
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 12,
                }}
              >
                {dialogue.currentPage < dialogue.pages.length - 1
                  ? "Clica ou [E] para continuar \u25b6"
                  : "Clica ou [E] para fechar \u2715"}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quest Log (Q) */}
      <AnimatePresence>
        {showQuestLog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(500px, 90vw)",
              maxHeight: "80vh",
              background: "rgba(10,10,30,0.95)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              padding: 24,
              zIndex: 300,
              overflowY: "auto",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 700 }}>
                \ud83d\udcdc Quest Log
              </h2>
              <button
                onClick={() => setShowQuestLog(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Fechar [Q]
              </button>
            </div>
            {QUEST_DEFS.map((def, i) => {
              const state = quests[i];
              const statusIcon =
                state.status === "complete" ? "\u2705" : state.status === "active" ? "\ud83d\udd04" : "\u2b1c";
              return (
                <div
                  key={def.id}
                  style={{
                    padding: "12px 16px",
                    marginBottom: 8,
                    background:
                      state.status === "complete"
                        ? "rgba(46,204,113,0.1)"
                        : state.status === "active"
                        ? "rgba(52,152,219,0.1)"
                        : "rgba(255,255,255,0.03)",
                    borderRadius: 10,
                    border: `1px solid ${
                      state.status === "complete"
                        ? "rgba(46,204,113,0.3)"
                        : state.status === "active"
                        ? "rgba(52,152,219,0.3)"
                        : "rgba(255,255,255,0.05)"
                    }`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                      {statusIcon} {def.name}
                    </div>
                    {state.status !== "locked" && (
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        {state.progress}/{def.targetCount}
                      </div>
                    )}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>
                    {def.description}
                  </div>
                  {state.status === "complete" && (
                    <div style={{ color: "#ffd700", fontSize: 12, marginTop: 4 }}>
                      Recompensa: {def.rewardEmoji} {def.reward}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory (I) */}
      <AnimatePresence>
        {showInventory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(520px, 90vw)",
              maxHeight: "80vh",
              background: "rgba(10,10,30,0.95)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              padding: 24,
              zIndex: 300,
              overflowY: "auto",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 700 }}>
                \ud83c\udf92 Invent\u00e1rio
              </h2>
              <button
                onClick={() => setShowInventory(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Fechar [I]
              </button>
            </div>

            {/* Progress */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div style={{ ...progressPillStyle }}>
                {inventory.length}/15 Skills
              </div>
              <div style={{ ...progressPillStyle }}>
                {questRewards.length}/8 Quests
              </div>
            </div>

            {/* Skill Badges */}
            <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
              SKILL BADGES
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 10,
                marginBottom: 24,
              }}
            >
              {CHEST_DEFS.map((def) => {
                const owned = inventory.some((item) => item.skill === def.skill);
                return (
                  <div
                    key={def.id}
                    style={{
                      padding: "10px",
                      background: owned ? "rgba(46,204,113,0.1)" : "rgba(255,255,255,0.03)",
                      borderRadius: 8,
                      border: `1px solid ${owned ? "rgba(46,204,113,0.3)" : "rgba(255,255,255,0.05)"}`,
                      textAlign: "center",
                      opacity: owned ? 1 : 0.4,
                    }}
                  >
                    <div style={{ fontSize: 24 }}>{def.emoji}</div>
                    <div style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>{def.skill}</div>
                  </div>
                );
              })}
            </div>

            {/* Quest Rewards */}
            {questRewards.length > 0 && (
              <>
                <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
                  QUEST REWARDS
                </h3>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {questRewards.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "8px 14px",
                        background: "rgba(255,215,0,0.1)",
                        borderRadius: 8,
                        border: "1px solid rgba(255,215,0,0.3)",
                        color: "#ffd700",
                        fontSize: 13,
                      }}
                    >
                      {r.emoji} {r.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pause Menu */}
      <AnimatePresence>
        {showPause && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 400,
              backdropFilter: "blur(8px)",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: 32,
                fontWeight: 800,
                marginBottom: 40,
                fontFamily: "var(--font-sora), 'Sora', sans-serif",
              }}
            >
              PAUSA
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}>
              <PauseButton label="Continuar" onClick={() => setShowPause(false)} />
              <PauseButton label="Controlos" onClick={() => { setShowControls(true); setShowPause(false); }} />
              <PauseButton
                label="Reiniciar"
                onClick={() => {
                  setShowPause(false);
                  restartGame();
                }}
              />
              <PauseButton
                label="Sobre"
                onClick={() => {
                  window.open("https://descomplicai.pt", "_blank");
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(400px, 90vw)",
              background: "rgba(10,10,30,0.95)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              padding: 24,
              zIndex: 500,
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 700 }}>
                \ud83c\udfae Controlos
              </h2>
              <button
                onClick={() => setShowControls(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Fechar
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["WASD / Setas", "Mover"],
                ["Shift", "Correr"],
                ["E / Espa\u00e7o", "Interagir"],
                ["Q", "Quest Log"],
                ["I", "Invent\u00e1rio"],
                ["Escape", "Pausa"],
              ].map(([key, action]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <code
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "2px 10px",
                      borderRadius: 4,
                      color: "#fff",
                      fontSize: 13,
                    }}
                  >
                    {key}
                  </code>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Touch Controls */}
      {isMobile && (
        <>
          {/* D-Pad (bottom-left) */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 30,
              width: 144,
              height: 144,
              zIndex: 150,
            }}
          >
            {/* Up */}
            <DpadButton
              style={{ position: "absolute", top: 0, left: 48 }}
              onDown={() => handleDpadTouch("up", true)}
              onUp={() => handleDpadTouch("up", false)}
            >
              \u25b2
            </DpadButton>
            {/* Down */}
            <DpadButton
              style={{ position: "absolute", bottom: 0, left: 48 }}
              onDown={() => handleDpadTouch("down", true)}
              onUp={() => handleDpadTouch("down", false)}
            >
              \u25bc
            </DpadButton>
            {/* Left */}
            <DpadButton
              style={{ position: "absolute", top: 48, left: 0 }}
              onDown={() => handleDpadTouch("left", true)}
              onUp={() => handleDpadTouch("left", false)}
            >
              \u25c0
            </DpadButton>
            {/* Right */}
            <DpadButton
              style={{ position: "absolute", top: 48, right: 0 }}
              onDown={() => handleDpadTouch("right", true)}
              onUp={() => handleDpadTouch("right", false)}
            >
              \u25b6
            </DpadButton>
          </div>

          {/* Action Button (bottom-right) */}
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              touchActionRef.current = true;
            }}
            style={{
              position: "absolute",
              bottom: 60,
              right: 40,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(39,174,96,0.7)",
              border: "2px solid rgba(39,174,96,0.9)",
              color: "#fff",
              fontSize: 20,
              fontWeight: 800,
              cursor: "pointer",
              zIndex: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "none",
            }}
          >
            E
          </button>

          {/* Mobile menu buttons (top) */}
          <div
            style={{
              position: "absolute",
              bottom: 140,
              right: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              zIndex: 150,
            }}
          >
            <MobileMenuButton label="Q" onClick={() => setShowQuestLog((s) => !s)} />
            <MobileMenuButton label="I" onClick={() => setShowInventory((s) => !s)} />
            <MobileMenuButton label="\u2630" onClick={() => setShowPause((s) => !s)} />
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */
function PauseButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        padding: "14px 0",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 10,
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        width: "100%",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {label}
    </motion.button>
  );
}

function DpadButton({
  children,
  style,
  onDown,
  onUp,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  onDown: () => void;
  onUp: () => void;
}) {
  return (
    <button
      onTouchStart={(e) => {
        e.preventDefault();
        onDown();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onUp();
      }}
      onTouchCancel={(e) => {
        e.preventDefault();
        onUp();
      }}
      style={{
        width: 48,
        height: 48,
        borderRadius: 10,
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function MobileMenuButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "none",
      }}
    >
      {label}
    </button>
  );
}

/* ================================================================
   SHARED STYLES
   ================================================================ */
const statBadgeStyle: React.CSSProperties = {
  padding: "4px 12px",
  background: "rgba(0,0,0,0.6)",
  borderRadius: 6,
  color: "rgba(255,255,255,0.7)",
  fontSize: 12,
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const progressPillStyle: React.CSSProperties = {
  padding: "6px 14px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 20,
  color: "rgba(255,255,255,0.6)",
  fontSize: 13,
  border: "1px solid rgba(255,255,255,0.1)",
};
