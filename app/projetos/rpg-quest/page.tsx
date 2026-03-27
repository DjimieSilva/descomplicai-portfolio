"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/* ================================================================
   DESCOMPLICAI RPG: THE QUEST
   ================================================================
   A full 2D top-down RPG portfolio explorer
   Canvas 2D rendering, 50x40 tile map, 5 zones
   8 NPCs, 6 quests, 8 treasure chests
   All dialogue in Portuguese (PT-PT)
   Pure React + Canvas, zero game engines
   ================================================================ */

// ================================================================
// SECTION 1: CONSTANTS
// ================================================================

const TILE_SIZE = 20;
const MAP_COLS = 50;
const MAP_ROWS = 40;
const CANVAS_W = MAP_COLS * TILE_SIZE; // 1000
const CANVAS_H = MAP_ROWS * TILE_SIZE; // 800

const PLAYER_SPEED = 2.5;
const CAMERA_LERP = 0.08;
const INTERACT_DIST = 24;
const TYPEWRITER_SPEED = 25;

// Directions
const DIR_DOWN = 0;
const DIR_LEFT = 1;
const DIR_RIGHT = 2;
const DIR_UP = 3;

// Tile type constants
const GRASS = 0;
const WATER = 1;
const PATH = 2;
const WALL = 3;
const SAND = 4;
const FLOOR = 5;
const DOOR = 6;
const BRIDGE = 7;
const TREE = 8;
const FLOWER = 9;

// Tile colors
const TILE_COLORS: Record<number, string> = {
  [GRASS]: "#4ade80",
  [WATER]: "#3b82f6",
  [PATH]: "#d4a574",
  [WALL]: "#6b7280",
  [SAND]: "#fbbf24",
  [FLOOR]: "#a3a3a3",
  [DOOR]: "#92400e",
  [BRIDGE]: "#78350f",
  [TREE]: "#166534",
  [FLOWER]: "#f472b6",
};

// Walkable tiles
const WALKABLE = new Set([GRASS, PATH, SAND, FLOOR, DOOR, BRIDGE, FLOWER]);

// ================================================================
// SECTION 2: TYPE DEFINITIONS
// ================================================================

type Direction = 0 | 1 | 2 | 3;

type ZoneId = "centro" | "restaurantes" | "clinicas" | "lab" | "torre";

interface NPC {
  id: string;
  name: string;
  x: number;
  y: number;
  bodyColor: string;
  headColor: string;
  dialogue: string[];
  questId?: string;
}

interface Chest {
  id: string;
  x: number;
  y: number;
  opened: boolean;
  badge: string;
  badgeEmoji: string;
}

interface Quest {
  id: string;
  name: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
}

interface PlayerState {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
  walkFrame: number;
  walkTimer: number;
}

interface CameraState {
  x: number;
  y: number;
}

interface GameState {
  player: PlayerState;
  camera: CameraState;
  npcsSpoken: Set<string>;
  chestsOpened: Set<string>;
  zonesVisited: Set<ZoneId>;
  badges: string[];
  questsCompleted: Set<string>;
  startTime: number;
  totalTime: number;
  currentZone: ZoneId | null;
  explored: boolean[][];
}

// ================================================================
// SECTION 3: ZONE DEFINITIONS
// ================================================================

const ZONE_NAMES: Record<ZoneId, string> = {
  centro: "Centro Hub",
  restaurantes: "Vila dos Restaurantes",
  clinicas: "Distrito das Clinicas",
  lab: "Laboratorio Tech",
  torre: "Torre do Portfolio",
};

const ZONE_COLORS: Record<ZoneId, string> = {
  centro: "#4ade80",
  restaurantes: "#f97316",
  clinicas: "#06b6d4",
  lab: "#a855f7",
  torre: "#eab308",
};

interface ZoneBounds {
  id: ZoneId;
  c0: number;
  c1: number;
  r0: number;
  r1: number;
}

const ZONE_BOUNDS: ZoneBounds[] = [
  { id: "centro", c0: 18, c1: 31, r0: 14, r1: 25 },
  { id: "restaurantes", c0: 34, c1: 48, r0: 12, r1: 27 },
  { id: "clinicas", c0: 1, c1: 15, r0: 12, r1: 27 },
  { id: "lab", c0: 15, c1: 35, r0: 1, r1: 11 },
  { id: "torre", c0: 18, c1: 31, r0: 28, r1: 38 },
];

function getZone(col: number, row: number): ZoneId | null {
  for (const z of ZONE_BOUNDS) {
    if (col >= z.c0 && col <= z.c1 && row >= z.r0 && row <= z.r1) {
      return z.id;
    }
  }
  return null;
}

// ================================================================
// SECTION 4: TILE MAP (50 columns x 40 rows)
// ================================================================
// Legend: G=grass, W=water, P=path, X=wall, S=sand, F=floor,
//         D=door, B=bridge, T=tree, L=flower

const G = GRASS;
const W = WATER;
const P = PATH;
const X = WALL;
const S = SAND;
const F = FLOOR;
const D = DOOR;
const B = BRIDGE;
const T = TREE;
const L = FLOWER;

// prettier-ignore
const GAME_MAP: number[][] = [
  // Row 0 - top border
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 1 - lab top border + trees
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 2 - lab buildings start
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,X,X,X,D,X,X,G,X,X,X,D,X,X,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 3
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 4
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 5
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 6 - lab buildings bottom
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,X,X,X,X,X,X,G,X,X,X,X,X,X,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 7 - lab open area
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 8
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,L,F,F,F,F,L,F,F,F,L,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 9 - lab lower area
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 10 - lab bottom + path to centro
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 11 - transition zone lab->centro
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,P,P,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 12 - water + paths to east/west zones
  [T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T],
  // Row 13 - clinicas top + water + restaurantes top
  [T,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T],
  // Row 14 - clinicas buildings start + centro start + restaurantes start
  [T,G,X,X,X,D,X,X,G,G,L,G,G,G,W,W,W,W,G,P,P,P,P,P,G,P,P,P,P,P,G,W,W,W,W,G,G,G,L,G,G,S,S,S,S,S,S,G,G,T],
  // Row 15
  [T,G,X,F,F,F,F,X,G,G,G,G,P,P,B,B,P,P,P,P,G,G,G,G,G,G,G,G,G,P,P,P,P,B,B,P,P,G,G,G,S,S,X,X,D,X,X,S,G,T],
  // Row 16
  [T,G,X,F,F,F,F,X,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,X,S,G,T],
  // Row 17 - clinicas first building bottom
  [T,G,X,X,X,X,X,X,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,L,G,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,X,S,G,T],
  // Row 18 - centro area middle
  [T,G,G,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,L,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,X,X,X,S,G,T],
  // Row 19 - centro area with fountain
  [T,G,G,P,P,P,P,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,L,L,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,G,G,G,G,S,S,G,T],
  // Row 20 - centro area
  [T,G,X,X,D,X,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,L,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,D,X,S,S,G,T],
  // Row 21
  [T,G,X,F,F,F,X,G,G,G,L,G,P,G,W,W,W,W,G,P,G,G,G,L,G,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,S,S,G,T],
  // Row 22
  [T,G,X,F,F,F,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,S,S,G,T],
  // Row 23 - clinicas second building bottom
  [T,G,X,X,X,X,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,X,X,S,S,G,T],
  // Row 24 - clinicas third building start + centro continues + restaurantes
  [T,G,G,G,G,G,G,G,G,G,G,G,P,P,B,B,P,P,P,P,G,G,G,G,G,G,G,G,G,P,P,P,P,B,B,P,P,G,G,G,S,S,G,G,G,S,S,S,G,T],
  // Row 25
  [T,G,X,X,X,D,X,G,G,G,G,G,G,G,W,W,W,W,G,P,P,P,P,P,G,P,P,P,P,P,G,W,W,W,W,G,G,G,G,G,S,X,X,D,X,X,S,S,G,T],
  // Row 26
  [T,G,X,F,F,F,X,G,G,L,G,G,G,G,W,W,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,W,W,G,G,L,G,G,S,X,F,F,F,X,S,S,G,T],
  // Row 27 - clinicas bottom + water + restaurantes bottom
  [T,G,X,X,X,X,X,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,G,G,G,G,G,G,G,S,X,X,X,X,X,S,S,G,T],
  // Row 28 - transition to torre zone
  [T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,P,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T],
  // Row 29
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,P,P,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 30 - torre zone start
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 31 - torre golden floor
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,S,S,S,P,S,S,S,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 32 - torre building
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,L,S,S,S,S,S,L,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 33
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,X,X,X,X,D,X,X,X,X,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 34
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 35
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 36
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 37 - torre building bottom
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,X,X,X,X,X,X,X,X,X,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 38 - torre bottom area
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,S,S,S,S,S,S,S,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 39 - bottom border
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
];

// ================================================================
// SECTION 5: NPC DEFINITIONS
// ================================================================

const NPCS: NPC[] = [
  {
    id: "guia",
    name: "Guia",
    x: 24 * TILE_SIZE + 4,
    y: 19 * TILE_SIZE + 4,
    bodyColor: "#22c55e",
    headColor: "#fde68a",
    dialogue: [
      "Bem-vindo a Descomplicai! Eu sou o Guia.",
      "Explora o nosso mundo! Tens 5 zonas para descobrir.",
      "Fala com os NPCs, abre baus e completa quests!",
      "Usa WASD ou setas para mover, E para interagir.",
      "Boa aventura, explorador!",
    ],
  },
  {
    id: "chef_marco",
    name: "Chef Marco",
    x: 43 * TILE_SIZE + 4,
    y: 16 * TILE_SIZE + 4,
    bodyColor: "#f97316",
    headColor: "#fde68a",
    dialogue: [
      "Ola! Sou o Chef Marco.",
      "Criamos sites para os melhores restaurantes da Figueira!",
      "O MeioCheio, a Cacarola... todos digitais agora.",
      "A comida e boa, mas o design e ainda melhor!",
    ],
  },
  {
    id: "chef_ana",
    name: "Chef Ana",
    x: 43 * TILE_SIZE + 4,
    y: 22 * TILE_SIZE + 4,
    bodyColor: "#fb923c",
    headColor: "#fde68a",
    dialogue: [
      "Ola! Sou a Chef Ana.",
      "O Bijou, a Cacarola Dois, o Pe no Bairro...",
      "Todos tem presenca digital agora gracas a Descomplicai!",
      "Cada restaurante tem a sua identidade unica.",
    ],
  },
  {
    id: "dra_sofia",
    name: "Dra. Sofia",
    x: 4 * TILE_SIZE + 4,
    y: 16 * TILE_SIZE + 4,
    bodyColor: "#06b6d4",
    headColor: "#fde68a",
    dialogue: [
      "Ola! Sou a Dra. Sofia.",
      "A DentalKid foi o nosso projeto mais divertido!",
      "Um site de dentista para criancas — colorido e amigavel.",
      "A saude digital tambem pode ser divertida!",
    ],
  },
  {
    id: "hacker_luna",
    name: "Hacker Luna",
    x: 22 * TILE_SIZE + 4,
    y: 7 * TILE_SIZE + 4,
    bodyColor: "#a855f7",
    headColor: "#fde68a",
    dialogue: [
      "Psst! Sou a Luna, hacker residente.",
      "Temos 30+ ferramentas: Fractal Explorer, Synth, Chess...",
      "O Jaime adora construir coisas interativas!",
      "Ja experimentaste o Pixel Art Editor?",
    ],
  },
  {
    id: "cientista_pedro",
    name: "Cientista Pedro",
    x: 30 * TILE_SIZE + 4,
    y: 4 * TILE_SIZE + 4,
    bodyColor: "#8b5cf6",
    headColor: "#fde68a",
    dialogue: [
      "Saudacoes! Sou o Cientista Pedro.",
      "A Tabela Periodica Interativa tem todos os 118 elementos!",
      "Cada elemento com dados reais e visualizacoes.",
      "Ciencia e tecnologia andam sempre juntas.",
    ],
  },
  {
    id: "jaime",
    name: "Jaime Silva",
    x: 24 * TILE_SIZE + 4,
    y: 35 * TILE_SIZE + 4,
    bodyColor: "#eab308",
    headColor: "#fde68a",
    dialogue: [
      "Ola! Sou o Jaime Silva, fundador da Descomplicai.",
      "Keep building. Share Love.",
      "O futuro e humano, mas a tecnologia ajuda!",
      "Obrigado por explorares o meu portfolio.",
      "Visita descomplicai.pt para ver tudo ao vivo!",
    ],
  },
  {
    id: "mylo",
    name: "Mylo",
    x: 2 * TILE_SIZE + 4,
    y: 2 * TILE_SIZE + 4,
    bodyColor: "#ec4899",
    headColor: "#fbcfe8",
    dialogue: [
      "Shhh... encontraste-me!",
      "Sou o Mylo, o assistente de IA secreto do Jaime!",
      "Ajudo a responder perguntas no site da Descomplicai.",
      "Poucos sabem que existo... es especial!",
      "Completa todas as quests para seres um verdadeiro mestre!",
    ],
  },
];

// ================================================================
// SECTION 6: TREASURE CHEST DEFINITIONS
// ================================================================

const CHESTS: Chest[] = [
  {
    id: "chest_react",
    x: 26 * TILE_SIZE,
    y: 18 * TILE_SIZE,
    opened: false,
    badge: "React",
    badgeEmoji: "\u269B\uFE0F",
  },
  {
    id: "chest_typescript",
    x: 20 * TILE_SIZE,
    y: 8 * TILE_SIZE,
    opened: false,
    badge: "TypeScript",
    badgeEmoji: "\uD83D\uDCD8",
  },
  {
    id: "chest_nextjs",
    x: 32 * TILE_SIZE,
    y: 7 * TILE_SIZE,
    opened: false,
    badge: "Next.js",
    badgeEmoji: "\u25B2",
  },
  {
    id: "chest_python",
    x: 5 * TILE_SIZE,
    y: 21 * TILE_SIZE,
    opened: false,
    badge: "Python",
    badgeEmoji: "\uD83D\uDC0D",
  },
  {
    id: "chest_tailwind",
    x: 44 * TILE_SIZE,
    y: 19 * TILE_SIZE,
    opened: false,
    badge: "Tailwind",
    badgeEmoji: "\uD83C\uDFA8",
  },
  {
    id: "chest_framer",
    x: 10 * TILE_SIZE,
    y: 26 * TILE_SIZE,
    opened: false,
    badge: "Framer Motion",
    badgeEmoji: "\uD83C\uDF1F",
  },
  {
    id: "chest_canvas",
    x: 25 * TILE_SIZE,
    y: 32 * TILE_SIZE,
    opened: false,
    badge: "Canvas",
    badgeEmoji: "\uD83D\uDD8C\uFE0F",
  },
  {
    id: "chest_ai",
    x: 28 * TILE_SIZE,
    y: 3 * TILE_SIZE,
    opened: false,
    badge: "AI/ML",
    badgeEmoji: "\uD83E\uDD16",
  },
];

// ================================================================
// SECTION 7: QUEST DEFINITIONS
// ================================================================

function createQuests(): Quest[] {
  return [
    {
      id: "primeiro_passo",
      name: "Primeiro Passo",
      description: "Visita todas as 5 zonas",
      target: 5,
      progress: 0,
      completed: false,
    },
    {
      id: "conversador",
      name: "Conversador",
      description: "Fala com todos os 8 NPCs",
      target: 8,
      progress: 0,
      completed: false,
    },
    {
      id: "caca_tesouro",
      name: "Caca ao Tesouro",
      description: "Abre 5 baus",
      target: 5,
      progress: 0,
      completed: false,
    },
    {
      id: "descobridor",
      name: "Descobridor",
      description: "Encontra o Mylo (NPC secreto)",
      target: 1,
      progress: 0,
      completed: false,
    },
    {
      id: "mestre_digital",
      name: "Mestre Digital",
      description: "Completa as quests 1-4",
      target: 4,
      progress: 0,
      completed: false,
    },
    {
      id: "speedrunner",
      name: "Speedrunner",
      description: "Completa tudo em menos de 3 minutos",
      target: 1,
      progress: 0,
      completed: false,
    },
  ];
}

// ================================================================
// SECTION 8: GAME RENDERING FUNCTIONS
// ================================================================

/** Draw a single tile with optional animation */
function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: number,
  screenX: number,
  screenY: number,
  animFrame: number
) {
  const color = TILE_COLORS[tileType] || "#000000";

  // Water animation
  if (tileType === WATER) {
    const wave = Math.sin(animFrame * 0.05 + screenX * 0.1) * 0.15;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const newR = Math.min(255, Math.max(0, Math.round(r + wave * 40)));
    const newG = Math.min(255, Math.max(0, Math.round(g + wave * 40)));
    const newB = Math.min(255, Math.max(0, Math.round(b + wave * 20)));
    ctx.fillStyle = `rgb(${newR},${newG},${newB})`;
    ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
    // Water ripple lines
    ctx.strokeStyle = `rgba(255,255,255,${0.15 + wave * 0.1})`;
    ctx.lineWidth = 0.5;
    const offset = (animFrame * 0.5) % TILE_SIZE;
    ctx.beginPath();
    ctx.moveTo(screenX, screenY + offset);
    ctx.lineTo(screenX + TILE_SIZE, screenY + offset);
    ctx.stroke();
    return;
  }

  ctx.fillStyle = color;
  ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

  // Tree decoration: darker trunk + canopy
  if (tileType === TREE) {
    // Trunk
    ctx.fillStyle = "#78350f";
    ctx.fillRect(screenX + 7, screenY + 12, 6, 8);
    // Canopy layers
    ctx.fillStyle = "#15803d";
    ctx.fillRect(screenX + 3, screenY + 2, 14, 12);
    ctx.fillStyle = "#166534";
    ctx.fillRect(screenX + 5, screenY + 0, 10, 8);
    return;
  }

  // Flower decoration
  if (tileType === FLOWER) {
    ctx.fillStyle = TILE_COLORS[GRASS];
    ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
    // Petals
    const colors = ["#f472b6", "#fb923c", "#a78bfa", "#fbbf24"];
    const cx = screenX + 10;
    const cy = screenY + 10;
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = colors[i % colors.length];
      const angle = (i * Math.PI) / 2 + animFrame * 0.01;
      const px = cx + Math.cos(angle) * 4;
      const py = cy + Math.sin(angle) * 4;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // Center
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // Wall decoration: brick lines
  if (tileType === WALL) {
    ctx.strokeStyle = "#4b5563";
    ctx.lineWidth = 0.5;
    // Horizontal mortar lines
    ctx.beginPath();
    ctx.moveTo(screenX, screenY + 5);
    ctx.lineTo(screenX + TILE_SIZE, screenY + 5);
    ctx.moveTo(screenX, screenY + 10);
    ctx.lineTo(screenX + TILE_SIZE, screenY + 10);
    ctx.moveTo(screenX, screenY + 15);
    ctx.lineTo(screenX + TILE_SIZE, screenY + 15);
    ctx.stroke();
    // Vertical mortar lines (staggered)
    ctx.beginPath();
    ctx.moveTo(screenX + 10, screenY);
    ctx.lineTo(screenX + 10, screenY + 5);
    ctx.moveTo(screenX + 5, screenY + 5);
    ctx.lineTo(screenX + 5, screenY + 10);
    ctx.moveTo(screenX + 15, screenY + 10);
    ctx.lineTo(screenX + 15, screenY + 15);
    ctx.moveTo(screenX + 10, screenY + 15);
    ctx.lineTo(screenX + 10, screenY + 20);
    ctx.stroke();
    return;
  }

  // Door decoration
  if (tileType === DOOR) {
    // Doorframe highlight
    ctx.fillStyle = "#a16207";
    ctx.fillRect(screenX + 2, screenY, TILE_SIZE - 4, TILE_SIZE);
    // Door handle
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(screenX + 14, screenY + 10, 2, 2);
    return;
  }

  // Path: subtle grain
  if (tileType === PATH) {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    for (let i = 0; i < 3; i++) {
      const gx = screenX + ((i * 7 + screenY) % TILE_SIZE);
      const gy = screenY + ((i * 11 + screenX) % TILE_SIZE);
      ctx.fillRect(gx, gy, 2, 2);
    }
    return;
  }

  // Sand: slight texture
  if (tileType === SAND) {
    ctx.fillStyle = "rgba(0,0,0,0.03)";
    for (let i = 0; i < 4; i++) {
      const gx = screenX + ((i * 5 + screenY * 3) % TILE_SIZE);
      const gy = screenY + ((i * 9 + screenX * 2) % TILE_SIZE);
      ctx.fillRect(gx, gy, 1, 1);
    }
    return;
  }
}

/** Draw the player character as pixel art rectangles */
function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: Direction,
  walkFrame: number,
  isMoving: boolean
) {
  const frame = isMoving ? walkFrame : 0;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + 8, y + 19, 6, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head (skin color)
  ctx.fillStyle = "#fbbf24";
  ctx.fillRect(x + 4, y, 8, 8);

  // Hair
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(x + 4, y, 8, 3);

  // Eyes (based on direction)
  ctx.fillStyle = "#1e293b";
  if (direction === DIR_DOWN) {
    ctx.fillRect(x + 5, y + 4, 2, 2);
    ctx.fillRect(x + 9, y + 4, 2, 2);
  } else if (direction === DIR_UP) {
    // Facing away - just hair visible
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(x + 4, y, 8, 5);
  } else if (direction === DIR_LEFT) {
    ctx.fillRect(x + 4, y + 4, 2, 2);
  } else if (direction === DIR_RIGHT) {
    ctx.fillRect(x + 10, y + 4, 2, 2);
  }

  // Body (blue shirt)
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(x + 3, y + 8, 10, 8);

  // Arms
  ctx.fillStyle = "#2563eb";
  if (isMoving && frame % 2 === 0) {
    ctx.fillRect(x + 1, y + 9, 2, 5);
    ctx.fillRect(x + 13, y + 10, 2, 5);
  } else {
    ctx.fillRect(x + 1, y + 9, 2, 6);
    ctx.fillRect(x + 13, y + 9, 2, 6);
  }

  // Legs (alternate on walk)
  ctx.fillStyle = "#1e293b";
  if (isMoving) {
    if (frame % 4 < 2) {
      ctx.fillRect(x + 4, y + 16, 3, 4);
      ctx.fillRect(x + 9, y + 16, 3, 3);
    } else {
      ctx.fillRect(x + 4, y + 16, 3, 3);
      ctx.fillRect(x + 9, y + 16, 3, 4);
    }
  } else {
    ctx.fillRect(x + 4, y + 16, 3, 4);
    ctx.fillRect(x + 9, y + 16, 3, 4);
  }
}

/** Draw an NPC */
function drawNPC(
  ctx: CanvasRenderingContext2D,
  npc: NPC,
  cameraX: number,
  cameraY: number,
  animFrame: number
) {
  const sx = npc.x - cameraX;
  const sy = npc.y - cameraY;

  // Slight bobbing animation
  const bob = Math.sin(animFrame * 0.03 + npc.x) * 1;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath();
  ctx.ellipse(sx + 6, sy + 19, 5, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = npc.bodyColor;
  ctx.fillRect(sx + 2, sy + 8 + bob, 10, 8);

  // Head
  ctx.fillStyle = npc.headColor;
  ctx.fillRect(sx + 3, sy + bob, 8, 8);

  // Eyes
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(sx + 4, sy + 4 + bob, 2, 2);
  ctx.fillRect(sx + 8, sy + 4 + bob, 2, 2);

  // Legs
  ctx.fillStyle = "#374151";
  ctx.fillRect(sx + 3, sy + 16 + bob, 3, 3);
  ctx.fillRect(sx + 8, sy + 16 + bob, 3, 3);

  // Name tag
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  const nameWidth = ctx.measureText(npc.name).width;
  ctx.fillRect(sx + 6 - nameWidth / 2 - 3, sy - 12 + bob, nameWidth + 6, 12);
  ctx.fillStyle = "#ffffff";
  ctx.font = "8px monospace";
  ctx.textAlign = "center";
  ctx.fillText(npc.name, sx + 6, sy - 3 + bob);
  ctx.textAlign = "start";
}

/** Draw a treasure chest */
function drawChest(
  ctx: CanvasRenderingContext2D,
  chest: Chest,
  cameraX: number,
  cameraY: number,
  animFrame: number
) {
  const sx = chest.x - cameraX;
  const sy = chest.y - cameraY;

  if (chest.opened) {
    // Opened chest - lighter body, no lid
    ctx.fillStyle = "#d4a574";
    ctx.fillRect(sx + 2, sy + 6, 16, 10);
    // Inner dark
    ctx.fillStyle = "#78350f";
    ctx.fillRect(sx + 4, sy + 6, 12, 4);
    // Empty sparkle
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(sx + 8, sy + 7, 2, 2);
  } else {
    // Closed chest
    // Body
    ctx.fillStyle = "#92400e";
    ctx.fillRect(sx + 2, sy + 8, 16, 8);
    // Lid
    ctx.fillStyle = "#78350f";
    ctx.fillRect(sx + 1, sy + 4, 18, 6);
    // Lock
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(sx + 8, sy + 7, 4, 4);
    ctx.fillStyle = "#b45309";
    ctx.fillRect(sx + 9, sy + 8, 2, 2);

    // Sparkle animation when nearby
    const sparkle = Math.sin(animFrame * 0.08) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(251,191,36,${sparkle * 0.8})`;
    const sparkX = sx + 10 + Math.cos(animFrame * 0.06) * 8;
    const sparkY = sy + 2 + Math.sin(animFrame * 0.08) * 3;
    ctx.beginPath();
    // Star shape
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const r = i === 0 ? 0 : 3;
      if (i === 0) ctx.moveTo(sparkX, sparkY - 3);
      else {
        ctx.lineTo(
          sparkX + Math.cos(angle) * r,
          sparkY + Math.sin(angle) * r
        );
      }
    }
    ctx.fill();
  }
}

/** Draw the minimap */
function drawMinimap(
  ctx: CanvasRenderingContext2D,
  viewWidth: number,
  playerCol: number,
  playerRow: number,
  npcs: NPC[],
  chests: Chest[],
  explored: boolean[][]
) {
  const mmW = 120;
  const mmH = 96;
  const mmX = viewWidth - mmW - 10;
  const mmY = 10;
  const tileW = mmW / MAP_COLS;
  const tileH = mmH / MAP_ROWS;

  // Background
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);

  // Draw explored tiles
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      if (!explored[r]?.[c]) continue;
      const tile = GAME_MAP[r]?.[c];
      if (tile === undefined) continue;
      const color = TILE_COLORS[tile] || "#000";
      ctx.fillStyle = color;
      ctx.fillRect(mmX + c * tileW, mmY + r * tileH, tileW + 0.5, tileH + 0.5);
    }
  }

  // NPC dots
  for (const npc of npcs) {
    const nc = Math.floor(npc.x / TILE_SIZE);
    const nr = Math.floor(npc.y / TILE_SIZE);
    if (explored[nr]?.[nc]) {
      ctx.fillStyle = npc.bodyColor;
      ctx.fillRect(mmX + nc * tileW - 1, mmY + nr * tileH - 1, 3, 3);
    }
  }

  // Chest dots
  for (const ch of chests) {
    if (ch.opened) continue;
    const cc = Math.floor(ch.x / TILE_SIZE);
    const cr = Math.floor(ch.y / TILE_SIZE);
    if (explored[cr]?.[cc]) {
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(mmX + cc * tileW - 1, mmY + cr * tileH - 1, 3, 3);
    }
  }

  // Player dot (white, blinking)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(mmX + playerCol * tileW - 1, mmY + playerRow * tileH - 1, 3, 3);

  // Border
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);
}

// ================================================================
// SECTION 9: COLLISION DETECTION
// ================================================================

function canWalk(px: number, py: number): boolean {
  // Check all four corners of player hitbox (narrower than visual)
  const hitboxPadding = 4;
  const playerW = 12;
  const playerH = 16;

  const points = [
    { x: px + hitboxPadding, y: py + 8 }, // top-left of body
    { x: px + playerW - hitboxPadding, y: py + 8 }, // top-right
    { x: px + hitboxPadding, y: py + playerH + 2 }, // bottom-left
    { x: px + playerW - hitboxPadding, y: py + playerH + 2 }, // bottom-right
  ];

  for (const pt of points) {
    const col = Math.floor(pt.x / TILE_SIZE);
    const row = Math.floor(pt.y / TILE_SIZE);
    if (col < 0 || col >= MAP_COLS || row < 0 || row >= MAP_ROWS) return false;
    const tile = GAME_MAP[row]?.[col];
    if (tile === undefined || !WALKABLE.has(tile)) return false;
  }
  return true;
}

// ================================================================
// SECTION 10: PARTICLE SYSTEM
// ================================================================

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

function createConfettiParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = [];
  const colors = ["#f472b6", "#fbbf24", "#4ade80", "#3b82f6", "#a855f7", "#ef4444"];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 5 - 2,
      life: 60 + Math.random() * 60,
      maxLife: 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 4,
    });
  }
  return particles;
}

function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.1,
      life: p.life - 1,
    }))
    .filter((p) => p.life > 0);
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

// ================================================================
// SECTION 11: STAR ANIMATION (for start screen)
// ================================================================

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

function createStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }
  return stars;
}

// ================================================================
// SECTION 12: MAIN COMPONENT
// ================================================================

type GameScreen = "start" | "playing" | "paused" | "victory";
type OverlayType =
  | "none"
  | "dialogue"
  | "quest_log"
  | "inventory"
  | "badge_popup"
  | "zone_banner";

export default function RPGQuestPage() {
  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Game screen state (React state for overlays)
  const [screen, setScreen] = useState<GameScreen>("start");
  const [overlay, setOverlay] = useState<OverlayType>("none");

  // Dialogue state
  const [dialogueNPC, setDialogueNPC] = useState<string>("");
  const [dialogueText, setDialogueText] = useState<string>("");
  const [dialoguePage, setDialoguePage] = useState<number>(0);
  const [dialoguePages, setDialoguePages] = useState<string[]>([]);
  const [typewriterDone, setTypewriterDone] = useState<boolean>(false);

  // Badge popup state
  const [popupBadge, setPopupBadge] = useState<string>("");
  const [popupEmoji, setPopupEmoji] = useState<string>("");

  // Zone banner state
  const [zoneBanner, setZoneBanner] = useState<string>("");
  const [zoneBannerVisible, setZoneBannerVisible] = useState<boolean>(false);

  // Quest & inventory UI state
  const [quests, setQuests] = useState<Quest[]>(createQuests);
  const [badges, setBadges] = useState<string[]>([]);
  const [badgeEmojis, setBadgeEmojis] = useState<Record<string, string>>({});

  // Victory stats
  const [victoryStats, setVictoryStats] = useState({
    time: 0,
    npcs: 0,
    chests: 0,
    zones: 0,
    quests: 0,
  });

  // E prompt
  const [showEPrompt, setShowEPrompt] = useState<boolean>(false);
  const [ePromptText, setEPromptText] = useState<string>("");

  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Viewport size
  const [viewSize, setViewSize] = useState({ w: 800, h: 600 });

  // ================================================================
  // SECTION 13: GAME STATE REFS (hot path, no re-renders)
  // ================================================================

  const gameStateRef = useRef<GameState>({
    player: {
      x: 24 * TILE_SIZE,
      y: 20 * TILE_SIZE,
      direction: DIR_DOWN,
      moving: false,
      walkFrame: 0,
      walkTimer: 0,
    },
    camera: { x: 0, y: 0 },
    npcsSpoken: new Set(),
    chestsOpened: new Set(),
    zonesVisited: new Set(),
    badges: [],
    questsCompleted: new Set(),
    startTime: 0,
    totalTime: 0,
    currentZone: null,
    explored: Array.from({ length: MAP_ROWS }, () =>
      Array.from({ length: MAP_COLS }, () => false)
    ),
  });

  const keysRef = useRef<Set<string>>(new Set());
  const animFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);
  const chestsRef = useRef<Chest[]>(
    CHESTS.map((c) => ({ ...c }))
  );
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const lastZoneRef = useRef<ZoneId | null>(null);
  const dialogueActiveRef = useRef<boolean>(false);
  const typewriterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoneBannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactCooldownRef = useRef<boolean>(false);

  // Touch state for mobile d-pad
  const touchDirRef = useRef<{ up: boolean; down: boolean; left: boolean; right: boolean }>({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  // ================================================================
  // SECTION 14: VIEWPORT RESIZE HANDLER
  // ================================================================

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewSize({ w, h });
      setIsMobile(w < 768 || "ontouchstart" in window);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================================================================
  // SECTION 15: TYPEWRITER EFFECT
  // ================================================================

  const startTypewriter = useCallback(
    (text: string) => {
      setTypewriterDone(false);
      setDialogueText("");
      let i = 0;
      function tick() {
        if (i < text.length) {
          setDialogueText(text.slice(0, i + 1));
          i++;
          typewriterTimerRef.current = setTimeout(tick, TYPEWRITER_SPEED);
        } else {
          setTypewriterDone(true);
        }
      }
      tick();
    },
    []
  );

  const skipTypewriter = useCallback(() => {
    if (typewriterTimerRef.current) {
      clearTimeout(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
  }, []);

  // ================================================================
  // SECTION 16: DIALOGUE SYSTEM
  // ================================================================

  const openDialogue = useCallback(
    (npc: NPC) => {
      dialogueActiveRef.current = true;
      setDialogueNPC(npc.name);
      setDialoguePages(npc.dialogue);
      setDialoguePage(0);
      setOverlay("dialogue");
      startTypewriter(npc.dialogue[0]);

      // Track NPC spoken
      const gs = gameStateRef.current;
      gs.npcsSpoken.add(npc.id);
    },
    [startTypewriter]
  );

  const advanceDialogue = useCallback(() => {
    if (!typewriterDone) {
      // Skip to end of current text
      skipTypewriter();
      setDialogueText(dialoguePages[dialoguePage]);
      setTypewriterDone(true);
      return;
    }

    const nextPage = dialoguePage + 1;
    if (nextPage < dialoguePages.length) {
      setDialoguePage(nextPage);
      startTypewriter(dialoguePages[nextPage]);
    } else {
      // Close dialogue
      dialogueActiveRef.current = false;
      setOverlay("none");
      setDialogueText("");
      setDialoguePage(0);
      setDialoguePages([]);
      interactCooldownRef.current = true;
      setTimeout(() => {
        interactCooldownRef.current = false;
      }, 300);
    }
  }, [dialoguePage, dialoguePages, typewriterDone, skipTypewriter, startTypewriter]);

  // ================================================================
  // SECTION 17: CHEST INTERACTION
  // ================================================================

  const openChest = useCallback(
    (chest: Chest) => {
      if (chest.opened) return;

      // Mark opened
      chest.opened = true;
      const gs = gameStateRef.current;
      gs.chestsOpened.add(chest.id);
      gs.badges.push(chest.badge);

      // Update React state
      setBadges((prev) => [...prev, chest.badge]);
      setBadgeEmojis((prev) => ({ ...prev, [chest.badge]: chest.badgeEmoji }));

      // Show badge popup
      setPopupBadge(chest.badge);
      setPopupEmoji(chest.badgeEmoji);
      setOverlay("badge_popup");

      // Confetti
      particlesRef.current = [
        ...particlesRef.current,
        ...createConfettiParticles(
          chest.x - gameStateRef.current.camera.x + 10,
          chest.y - gameStateRef.current.camera.y,
          30
        ),
      ];

      // Auto-close popup after 2 seconds
      setTimeout(() => {
        if (setOverlay) {
          setOverlay((prev) => (prev === "badge_popup" ? "none" : prev));
        }
      }, 2000);
    },
    []
  );

  // ================================================================
  // SECTION 18: INTERACT HANDLER
  // ================================================================

  const handleInteract = useCallback(() => {
    if (interactCooldownRef.current) return;
    if (dialogueActiveRef.current) {
      advanceDialogue();
      return;
    }

    const gs = gameStateRef.current;
    const px = gs.player.x;
    const py = gs.player.y;

    // Check NPCs
    for (const npc of NPCS) {
      const dx = npc.x - px;
      const dy = npc.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < INTERACT_DIST) {
        openDialogue(npc);
        return;
      }
    }

    // Check chests
    for (const chest of chestsRef.current) {
      if (chest.opened) continue;
      const dx = chest.x - px;
      const dy = chest.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < INTERACT_DIST) {
        openChest(chest);
        return;
      }
    }
  }, [advanceDialogue, openDialogue, openChest]);

  // ================================================================
  // SECTION 19: QUEST UPDATE
  // ================================================================

  const updateQuests = useCallback(() => {
    const gs = gameStateRef.current;

    setQuests((prevQuests) => {
      const newQuests = prevQuests.map((q) => ({ ...q }));

      // Quest 1: Visit all zones
      const q1 = newQuests.find((q) => q.id === "primeiro_passo");
      if (q1 && !q1.completed) {
        q1.progress = gs.zonesVisited.size;
        if (q1.progress >= q1.target) {
          q1.completed = true;
          gs.questsCompleted.add(q1.id);
        }
      }

      // Quest 2: Talk to all NPCs
      const q2 = newQuests.find((q) => q.id === "conversador");
      if (q2 && !q2.completed) {
        q2.progress = gs.npcsSpoken.size;
        if (q2.progress >= q2.target) {
          q2.completed = true;
          gs.questsCompleted.add(q2.id);
        }
      }

      // Quest 3: Open 5 chests
      const q3 = newQuests.find((q) => q.id === "caca_tesouro");
      if (q3 && !q3.completed) {
        q3.progress = gs.chestsOpened.size;
        if (q3.progress >= q3.target) {
          q3.completed = true;
          gs.questsCompleted.add(q3.id);
        }
      }

      // Quest 4: Find Mylo
      const q4 = newQuests.find((q) => q.id === "descobridor");
      if (q4 && !q4.completed) {
        q4.progress = gs.npcsSpoken.has("mylo") ? 1 : 0;
        if (q4.progress >= q4.target) {
          q4.completed = true;
          gs.questsCompleted.add(q4.id);
        }
      }

      // Quest 5: Complete quests 1-4
      const q5 = newQuests.find((q) => q.id === "mestre_digital");
      if (q5 && !q5.completed) {
        let count = 0;
        if (gs.questsCompleted.has("primeiro_passo")) count++;
        if (gs.questsCompleted.has("conversador")) count++;
        if (gs.questsCompleted.has("caca_tesouro")) count++;
        if (gs.questsCompleted.has("descobridor")) count++;
        q5.progress = count;
        if (q5.progress >= q5.target) {
          q5.completed = true;
          gs.questsCompleted.add(q5.id);
        }
      }

      // Quest 6: Speedrunner (under 3 minutes)
      const q6 = newQuests.find((q) => q.id === "speedrunner");
      if (q6 && !q6.completed && gs.questsCompleted.has("mestre_digital")) {
        const elapsed = (Date.now() - gs.startTime) / 1000;
        if (elapsed < 180) {
          q6.progress = 1;
          q6.completed = true;
          gs.questsCompleted.add(q6.id);
        }
      }

      return newQuests;
    });

    // Check victory (quests 1-5 completed)
    if (
      gs.questsCompleted.has("primeiro_passo") &&
      gs.questsCompleted.has("conversador") &&
      gs.questsCompleted.has("caca_tesouro") &&
      gs.questsCompleted.has("descobridor") &&
      gs.questsCompleted.has("mestre_digital")
    ) {
      const elapsed = Math.floor((Date.now() - gs.startTime) / 1000);
      setVictoryStats({
        time: elapsed,
        npcs: gs.npcsSpoken.size,
        chests: gs.chestsOpened.size,
        zones: gs.zonesVisited.size,
        quests: gs.questsCompleted.size,
      });
      setScreen("victory");
    }
  }, []);

  // ================================================================
  // SECTION 20: KEYBOARD HANDLERS
  // ================================================================

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      // Prevent default for game keys
      if (
        ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright",
         "e", "q", "i", "escape", "enter", " "].includes(key)
      ) {
        e.preventDefault();
      }

      // Start screen
      if (screen === "start" && (key === "enter" || key === " ")) {
        gameStateRef.current.startTime = Date.now();
        setScreen("playing");
        return;
      }

      // Victory screen
      if (screen === "victory") return;

      // Pause
      if (screen === "playing" && key === "escape") {
        if (overlay !== "none") {
          if (overlay === "dialogue") {
            dialogueActiveRef.current = false;
          }
          setOverlay("none");
        } else {
          setScreen("paused");
        }
        return;
      }

      if (screen === "paused" && key === "escape") {
        setScreen("playing");
        return;
      }

      // Playing interactions
      if (screen === "playing") {
        if (key === "e" || key === " ") {
          handleInteract();
        }
        if (key === "q" && overlay !== "dialogue") {
          setOverlay((prev) => (prev === "quest_log" ? "none" : "quest_log"));
        }
        if (key === "i" && overlay !== "dialogue") {
          setOverlay((prev) => (prev === "inventory" ? "none" : "inventory"));
        }
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      keysRef.current.delete(e.key.toLowerCase());
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [screen, overlay, handleInteract]);

  // ================================================================
  // SECTION 21: MAIN GAME LOOP
  // ================================================================

  useEffect(() => {
    if (screen !== "playing" && screen !== "start") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize stars for start screen
    if (screen === "start" && starsRef.current.length === 0) {
      starsRef.current = createStars(viewSize.w, viewSize.h, 120);
    }

    let running = true;

    function gameLoop() {
      if (!running) return;
      if (!ctx || !canvas) return;

      const gs = gameStateRef.current;
      animFrameRef.current++;
      const frame = animFrameRef.current;

      // Canvas sizing
      canvas.width = viewSize.w;
      canvas.height = viewSize.h;

      if (screen === "start") {
        // ============ START SCREEN RENDER ============
        drawStartScreen(ctx, canvas.width, canvas.height, frame);
        rafIdRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // ============ PLAYING RENDER ============

      // 1. Handle input / movement
      if (overlay === "none" || overlay === "zone_banner") {
        const keys = keysRef.current;
        const touch = touchDirRef.current;
        let dx = 0;
        let dy = 0;

        if (keys.has("w") || keys.has("arrowup") || touch.up) dy -= PLAYER_SPEED;
        if (keys.has("s") || keys.has("arrowdown") || touch.down) dy += PLAYER_SPEED;
        if (keys.has("a") || keys.has("arrowleft") || touch.left) dx -= PLAYER_SPEED;
        if (keys.has("d") || keys.has("arrowright") || touch.right) dx += PLAYER_SPEED;

        // Diagonal normalization
        if (dx !== 0 && dy !== 0) {
          const norm = Math.sqrt(dx * dx + dy * dy);
          dx = (dx / norm) * PLAYER_SPEED;
          dy = (dy / norm) * PLAYER_SPEED;
        }

        const isMoving = dx !== 0 || dy !== 0;
        gs.player.moving = isMoving;

        if (isMoving) {
          // Direction
          if (Math.abs(dx) > Math.abs(dy)) {
            gs.player.direction = dx < 0 ? DIR_LEFT : DIR_RIGHT;
          } else {
            gs.player.direction = dy < 0 ? DIR_UP : DIR_DOWN;
          }

          // Try move X then Y separately for wall sliding
          const newX = gs.player.x + dx;
          const newY = gs.player.y + dy;

          if (canWalk(newX, gs.player.y)) {
            gs.player.x = newX;
          }
          if (canWalk(gs.player.x, newY)) {
            gs.player.y = newY;
          }

          // Walk animation
          gs.player.walkTimer++;
          if (gs.player.walkTimer >= 8) {
            gs.player.walkTimer = 0;
            gs.player.walkFrame++;
          }
        } else {
          gs.player.walkTimer = 0;
        }

        // Clamp to map bounds
        gs.player.x = Math.max(0, Math.min(gs.player.x, CANVAS_W - 16));
        gs.player.y = Math.max(0, Math.min(gs.player.y, CANVAS_H - 20));
      }

      // 2. Update camera with lerp
      const targetCamX = gs.player.x - canvas.width / 2 + 8;
      const targetCamY = gs.player.y - canvas.height / 2 + 10;
      gs.camera.x += (targetCamX - gs.camera.x) * CAMERA_LERP;
      gs.camera.y += (targetCamY - gs.camera.y) * CAMERA_LERP;

      // Clamp camera
      gs.camera.x = Math.max(0, Math.min(gs.camera.x, CANVAS_W - canvas.width));
      gs.camera.y = Math.max(0, Math.min(gs.camera.y, CANVAS_H - canvas.height));

      // 3. Update explored tiles (fog of war reveal)
      const playerCol = Math.floor(gs.player.x / TILE_SIZE);
      const playerRow = Math.floor(gs.player.y / TILE_SIZE);
      const revealRadius = 6;
      for (let dr = -revealRadius; dr <= revealRadius; dr++) {
        for (let dc = -revealRadius; dc <= revealRadius; dc++) {
          const rr = playerRow + dr;
          const cc = playerCol + dc;
          if (rr >= 0 && rr < MAP_ROWS && cc >= 0 && cc < MAP_COLS) {
            if (dr * dr + dc * dc <= revealRadius * revealRadius) {
              gs.explored[rr][cc] = true;
            }
          }
        }
      }

      // 4. Zone detection
      const newZone = getZone(playerCol, playerRow);
      if (newZone && newZone !== lastZoneRef.current) {
        lastZoneRef.current = newZone;
        gs.zonesVisited.add(newZone);
        gs.currentZone = newZone;

        // Show zone banner
        setZoneBanner(ZONE_NAMES[newZone]);
        setZoneBannerVisible(true);
        if (zoneBannerTimerRef.current) clearTimeout(zoneBannerTimerRef.current);
        zoneBannerTimerRef.current = setTimeout(() => {
          setZoneBannerVisible(false);
        }, 2500);
      }

      // 5. Check E-prompt proximity
      let nearInteractive = false;
      let promptText = "";
      for (const npc of NPCS) {
        const ndx = npc.x - gs.player.x;
        const ndy = npc.y - gs.player.y;
        if (Math.sqrt(ndx * ndx + ndy * ndy) < INTERACT_DIST) {
          nearInteractive = true;
          promptText = `[E] Falar com ${npc.name}`;
          break;
        }
      }
      if (!nearInteractive) {
        for (const ch of chestsRef.current) {
          if (ch.opened) continue;
          const cdx = ch.x - gs.player.x;
          const cdy = ch.y - gs.player.y;
          if (Math.sqrt(cdx * cdx + cdy * cdy) < INTERACT_DIST) {
            nearInteractive = true;
            promptText = "[E] Abrir bau";
            break;
          }
        }
      }
      setShowEPrompt(nearInteractive && overlay === "none");
      setEPromptText(promptText);

      // 6. Update quests (throttled)
      if (frame % 30 === 0) {
        updateQuests();
      }

      // 7. Update particles
      particlesRef.current = updateParticles(particlesRef.current);

      // ============ RENDER ============
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Viewport culling bounds
      const startCol = Math.max(0, Math.floor(gs.camera.x / TILE_SIZE) - 1);
      const endCol = Math.min(MAP_COLS, Math.ceil((gs.camera.x + canvas.width) / TILE_SIZE) + 1);
      const startRow = Math.max(0, Math.floor(gs.camera.y / TILE_SIZE) - 1);
      const endRow = Math.min(MAP_ROWS, Math.ceil((gs.camera.y + canvas.height) / TILE_SIZE) + 1);

      // Draw tiles (viewport culled)
      for (let r = startRow; r < endRow; r++) {
        for (let c = startCol; c < endCol; c++) {
          const tile = GAME_MAP[r]?.[c];
          if (tile === undefined) continue;
          const sx = c * TILE_SIZE - gs.camera.x;
          const sy = r * TILE_SIZE - gs.camera.y;
          drawTile(ctx, tile, sx, sy, frame);
        }
      }

      // Fog of war overlay (darkens unexplored areas)
      for (let r = startRow; r < endRow; r++) {
        for (let c = startCol; c < endCol; c++) {
          if (!gs.explored[r]?.[c]) {
            const sx = c * TILE_SIZE - gs.camera.x;
            const sy = r * TILE_SIZE - gs.camera.y;
            ctx.fillStyle = "rgba(10,10,30,0.75)";
            ctx.fillRect(sx, sy, TILE_SIZE, TILE_SIZE);
          }
        }
      }

      // Draw chests
      for (const chest of chestsRef.current) {
        const cc = Math.floor(chest.x / TILE_SIZE);
        const cr = Math.floor(chest.y / TILE_SIZE);
        if (cc >= startCol && cc < endCol && cr >= startRow && cr < endRow) {
          drawChest(ctx, chest, gs.camera.x, gs.camera.y, frame);
        }
      }

      // Draw NPCs
      for (const npc of NPCS) {
        const nc = Math.floor(npc.x / TILE_SIZE);
        const nr = Math.floor(npc.y / TILE_SIZE);
        if (nc >= startCol - 1 && nc < endCol + 1 && nr >= startRow - 1 && nr < endRow + 1) {
          drawNPC(ctx, npc, gs.camera.x, gs.camera.y, frame);
        }
      }

      // Draw player
      const playerScreenX = gs.player.x - gs.camera.x;
      const playerScreenY = gs.player.y - gs.camera.y;
      drawPlayer(
        ctx,
        playerScreenX,
        playerScreenY,
        gs.player.direction,
        gs.player.walkFrame,
        gs.player.moving
      );

      // Draw particles
      drawParticles(ctx, particlesRef.current);

      // Draw minimap
      drawMinimap(
        ctx,
        canvas.width,
        playerCol,
        playerRow,
        NPCS,
        chestsRef.current,
        gs.explored
      );

      // HUD: Badge counter (top right, below minimap)
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(canvas.width - 132, 112, 124, 22);
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "right";
      ctx.fillText(
        `Badges: ${gs.badges.length}/${CHESTS.length}`,
        canvas.width - 16,
        127
      );
      ctx.textAlign = "start";

      // HUD: Active quest tracker (top left)
      const activeQuest = quests.find((q) => !q.completed);
      if (activeQuest) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(8, 8, 200, 36);
        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 10px monospace";
        ctx.fillText(activeQuest.name, 14, 22);
        ctx.fillStyle = "#d4d4d8";
        ctx.font = "9px monospace";
        ctx.fillText(
          `${activeQuest.description} (${activeQuest.progress}/${activeQuest.target})`,
          14,
          36
        );
      }

      // HUD: Zone name (top center)
      if (gs.currentZone) {
        const zoneName = ZONE_NAMES[gs.currentZone];
        ctx.font = "bold 11px monospace";
        const zw = ctx.measureText(zoneName).width;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(canvas.width / 2 - zw / 2 - 8, 8, zw + 16, 20);
        ctx.fillStyle = ZONE_COLORS[gs.currentZone];
        ctx.textAlign = "center";
        ctx.fillText(zoneName, canvas.width / 2, 22);
        ctx.textAlign = "start";
      }

      // HUD: Time elapsed
      if (gs.startTime > 0) {
        const elapsed = Math.floor((Date.now() - gs.startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(canvas.width / 2 - 25, 32, 50, 18);
        ctx.fillStyle = "#d4d4d8";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(timeStr, canvas.width / 2, 44);
        ctx.textAlign = "start";
      }

      // HUD: Controls hint (bottom center, fades after 10s)
      if (gs.startTime > 0 && Date.now() - gs.startTime < 10000) {
        const fadeAlpha = Math.max(0, 1 - (Date.now() - gs.startTime) / 10000);
        ctx.fillStyle = `rgba(0,0,0,${0.5 * fadeAlpha})`;
        const hintText = "WASD/Setas: Mover | E: Interagir | Q: Quests | I: Inventario";
        ctx.font = "9px monospace";
        const hw = ctx.measureText(hintText).width;
        ctx.fillRect(canvas.width / 2 - hw / 2 - 8, canvas.height - 30, hw + 16, 20);
        ctx.fillStyle = `rgba(212,212,216,${fadeAlpha})`;
        ctx.textAlign = "center";
        ctx.fillText(hintText, canvas.width / 2, canvas.height - 17);
        ctx.textAlign = "start";
      }

      rafIdRef.current = requestAnimationFrame(gameLoop);
    }

    rafIdRef.current = requestAnimationFrame(gameLoop);
    return () => {
      running = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [screen, overlay, viewSize, quests, updateQuests]);

  // ================================================================
  // SECTION 22: START SCREEN RENDERER
  // ================================================================

  function drawStartScreen(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    frame: number
  ) {
    // Dark background
    ctx.fillStyle = "#0a0a1e";
    ctx.fillRect(0, 0, width, height);

    // Stars
    for (const star of starsRef.current) {
      const twinkle =
        Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.8 + 0.2})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * twinkle + 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Move star slowly
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }
    }

    // Title
    const titleSize = Math.min(width * 0.06, 48);
    ctx.font = `bold ${titleSize}px monospace`;
    ctx.textAlign = "center";

    // Title glow
    const glow = Math.sin(frame * 0.03) * 0.3 + 0.7;
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 20 * glow;
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("DESCOMPLICAI RPG", width / 2, height * 0.35);
    ctx.shadowBlur = 0;

    // Subtitle
    ctx.font = `bold ${titleSize * 0.5}px monospace`;
    ctx.fillStyle = "#4ade80";
    ctx.fillText("THE QUEST", width / 2, height * 0.35 + titleSize * 0.8);

    // Start prompt (blinking)
    if (frame % 60 < 40) {
      ctx.font = `${Math.min(width * 0.025, 18)}px monospace`;
      ctx.fillStyle = "#d4d4d8";
      ctx.fillText("Pressiona ENTER para comecar", width / 2, height * 0.55);
    }

    // Controls info
    ctx.font = `${Math.min(width * 0.018, 13)}px monospace`;
    ctx.fillStyle = "#71717a";
    const controlsY = height * 0.7;
    const lineHeight = Math.min(width * 0.03, 22);
    ctx.fillText("WASD / Setas — Mover", width / 2, controlsY);
    ctx.fillText("E — Interagir / Falar", width / 2, controlsY + lineHeight);
    ctx.fillText("Q — Quests", width / 2, controlsY + lineHeight * 2);
    ctx.fillText("I — Inventario", width / 2, controlsY + lineHeight * 3);
    ctx.fillText("ESC — Pausa", width / 2, controlsY + lineHeight * 4);

    // Footer
    ctx.font = `${Math.min(width * 0.015, 11)}px monospace`;
    ctx.fillStyle = "#52525b";
    ctx.fillText(
      "descomplicai.pt — Jaime Silva",
      width / 2,
      height - 20
    );
    ctx.textAlign = "start";
  }

  // ================================================================
  // SECTION 23: GAME START / RESTART
  // ================================================================

  const startGame = useCallback(() => {
    gameStateRef.current = {
      player: {
        x: 24 * TILE_SIZE,
        y: 20 * TILE_SIZE,
        direction: DIR_DOWN,
        moving: false,
        walkFrame: 0,
        walkTimer: 0,
      },
      camera: { x: 0, y: 0 },
      npcsSpoken: new Set(),
      chestsOpened: new Set(),
      zonesVisited: new Set(),
      badges: [],
      questsCompleted: new Set(),
      startTime: Date.now(),
      totalTime: 0,
      currentZone: null,
      explored: Array.from({ length: MAP_ROWS }, () =>
        Array.from({ length: MAP_COLS }, () => false)
      ),
    };
    chestsRef.current = CHESTS.map((c) => ({ ...c }));
    particlesRef.current = [];
    lastZoneRef.current = null;
    dialogueActiveRef.current = false;
    setQuests(createQuests());
    setBadges([]);
    setBadgeEmojis({});
    setOverlay("none");
    setScreen("playing");
  }, []);

  // ================================================================
  // SECTION 24: TOUCH / MOBILE CONTROLS
  // ================================================================

  const handleTouchDir = useCallback(
    (dir: "up" | "down" | "left" | "right", pressed: boolean) => {
      touchDirRef.current[dir] = pressed;
    },
    []
  );

  const handleTouchAction = useCallback(() => {
    handleInteract();
  }, [handleInteract]);

  // ================================================================
  // SECTION 25: RENDER
  // ================================================================

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0a0a1e] overflow-hidden select-none"
      style={{ touchAction: "none" }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ imageRendering: "pixelated" }}
        onClick={() => {
          if (screen === "start") {
            gameStateRef.current.startTime = Date.now();
            setScreen("playing");
          } else if (screen === "playing") {
            handleInteract();
          }
        }}
      />

      {/* ============================================ */}
      {/* OVERLAY: Zone Banner */}
      {/* ============================================ */}
      {zoneBannerVisible && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{
            animation: "fadeInOut 2.5s ease-in-out",
          }}
        >
          <div className="bg-black/70 border border-white/20 rounded-lg px-6 py-3">
            <p className="text-white font-bold text-lg tracking-wide font-mono text-center">
              {zoneBanner}
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* OVERLAY: E Prompt */}
      {/* ============================================ */}
      {showEPrompt && screen === "playing" && overlay === "none" && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-black/70 border border-yellow-500/50 rounded-lg px-4 py-2">
            <p className="text-yellow-400 text-sm font-mono">{ePromptText}</p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* OVERLAY: Dialogue Box */}
      {/* ============================================ */}
      {overlay === "dialogue" && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[600px]"
          onClick={advanceDialogue}
        >
          <div className="bg-[#1a1a2e]/95 border-2 border-[#3b82f6]/60 rounded-xl p-5 backdrop-blur-sm shadow-2xl">
            {/* NPC Name */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#3b82f6]/20 rounded px-3 py-1">
                <span className="text-[#3b82f6] font-bold text-sm font-mono">
                  {dialogueNPC}
                </span>
              </div>
            </div>

            {/* Dialogue Text */}
            <p className="text-white text-base leading-relaxed font-mono min-h-[48px]">
              &ldquo;{dialogueText}
              {!typewriterDone && (
                <span className="animate-pulse text-[#3b82f6]">|</span>
              )}
              {typewriterDone && <>&rdquo;</>}
            </p>

            {/* Page indicator + advance hint */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-zinc-500 text-xs font-mono">
                {dialoguePage + 1}/{dialoguePages.length}
              </span>
              <span className="text-zinc-400 text-xs font-mono animate-pulse">
                {typewriterDone
                  ? dialoguePage + 1 < dialoguePages.length
                    ? "Pressiona E para continuar \u25B6"
                    : "Pressiona E para fechar \u25B6"
                  : "Pressiona E para saltar \u25B6"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* OVERLAY: Badge Popup */}
      {/* ============================================ */}
      {overlay === "badge_popup" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div
            className="bg-[#1a1a2e]/95 border-2 border-[#fbbf24]/60 rounded-xl p-6 text-center shadow-2xl"
            style={{
              animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <p className="text-4xl mb-2">{popupEmoji}</p>
            <p className="text-[#fbbf24] font-bold text-lg font-mono">
              Badge Desbloqueado!
            </p>
            <p className="text-white font-mono mt-1">{popupBadge}</p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* OVERLAY: Quest Log */}
      {/* ============================================ */}
      {overlay === "quest_log" && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          onClick={() => setOverlay("none")}
        >
          <div
            className="bg-[#1a1a2e] border-2 border-[#a855f7]/60 rounded-xl p-6 w-[90%] max-w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#a855f7] font-bold text-xl font-mono">
                Quests
              </h2>
              <button
                className="text-zinc-400 hover:text-white text-xl font-mono"
                onClick={() => setOverlay("none")}
              >
                X
              </button>
            </div>

            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`border rounded-lg p-3 ${
                    quest.completed
                      ? "border-green-500/40 bg-green-500/10"
                      : "border-zinc-700 bg-zinc-900/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-bold text-sm font-mono ${
                        quest.completed ? "text-green-400" : "text-white"
                      }`}
                    >
                      {quest.completed ? "\u2713 " : "\u25CB "}
                      {quest.name}
                    </span>
                    <span className="text-zinc-400 text-xs font-mono">
                      {quest.progress}/{quest.target}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs font-mono mt-1">
                    {quest.description}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-2 bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        quest.completed ? "bg-green-500" : "bg-[#a855f7]"
                      }`}
                      style={{
                        width: `${Math.min(100, (quest.progress / quest.target) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-zinc-500 text-xs font-mono mt-4 text-center">
              Pressiona Q ou ESC para fechar
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* OVERLAY: Inventory */}
      {/* ============================================ */}
      {overlay === "inventory" && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          onClick={() => setOverlay("none")}
        >
          <div
            className="bg-[#1a1a2e] border-2 border-[#fbbf24]/60 rounded-xl p-6 w-[90%] max-w-[500px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#fbbf24] font-bold text-xl font-mono">
                Inventario
              </h2>
              <button
                className="text-zinc-400 hover:text-white text-xl font-mono"
                onClick={() => setOverlay("none")}
              >
                X
              </button>
            </div>

            {badges.length === 0 ? (
              <p className="text-zinc-400 text-sm font-mono text-center py-8">
                Ainda nao tens badges. Abre baus para colecionar!
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {badges.map((badge, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-center hover:border-[#fbbf24]/50 transition-colors"
                  >
                    <p className="text-2xl mb-1">{badgeEmojis[badge] || "\uD83C\uDFC6"}</p>
                    <p className="text-white text-xs font-mono">{badge}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Empty slots */}
            {badges.length > 0 && badges.length < CHESTS.length && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {Array.from({ length: CHESTS.length - badges.length }).map(
                  (_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-center"
                    >
                      <p className="text-2xl mb-1 opacity-20">?</p>
                      <p className="text-zinc-600 text-xs font-mono">???</p>
                    </div>
                  )
                )}
              </div>
            )}

            <p className="text-zinc-500 text-xs font-mono mt-4 text-center">
              Pressiona I ou ESC para fechar
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* SCREEN: Pause Menu */}
      {/* ============================================ */}
      {screen === "paused" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1a1a2e] border-2 border-zinc-600 rounded-xl p-8 w-[90%] max-w-[400px] shadow-2xl text-center">
            <h2 className="text-white font-bold text-2xl font-mono mb-6">
              PAUSA
            </h2>

            <div className="space-y-3">
              <button
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono font-bold py-3 rounded-lg transition-colors"
                onClick={() => setScreen("playing")}
              >
                Continuar
              </button>
              <button
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-mono py-3 rounded-lg transition-colors"
                onClick={() => {
                  setScreen("playing");
                  setOverlay("quest_log");
                }}
              >
                Quests
              </button>
              <button
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-mono py-3 rounded-lg transition-colors"
                onClick={() => {
                  setScreen("playing");
                  setOverlay("inventory");
                }}
              >
                Inventario
              </button>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono py-3 rounded-lg transition-colors"
                onClick={startGame}
              >
                Recomeca
              </button>
            </div>

            <p className="text-zinc-500 text-xs font-mono mt-4">
              Pressiona ESC para continuar
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* SCREEN: Victory */}
      {/* ============================================ */}
      {screen === "victory" && (
        <VictoryScreen stats={victoryStats} onRestart={startGame} />
      )}

      {/* ============================================ */}
      {/* MOBILE CONTROLS */}
      {/* ============================================ */}
      {isMobile && screen === "playing" && (
        <MobileControls
          onDir={handleTouchDir}
          onAction={handleTouchAction}
          onQuests={() =>
            setOverlay((prev) =>
              prev === "quest_log" ? "none" : "quest_log"
            )
          }
          onInventory={() =>
            setOverlay((prev) =>
              prev === "inventory" ? "none" : "inventory"
            )
          }
          onPause={() => setScreen("paused")}
        />
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
          15% { opacity: 1; transform: translateY(0) translateX(-50%); }
          80% { opacity: 1; transform: translateY(0) translateX(-50%); }
          100% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ================================================================
// SECTION 26: VICTORY SCREEN COMPONENT
// ================================================================

function VictoryScreen({
  stats,
  onRestart,
}: {
  stats: { time: number; npcs: number; chests: number; zones: number; quests: number };
  onRestart: () => void;
}) {
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate confetti
    const particles: Particle[] = [];
    const colors = ["#f472b6", "#fbbf24", "#4ade80", "#3b82f6", "#a855f7", "#ef4444", "#06b6d4"];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 1,
        life: 200 + Math.random() * 200,
        maxLife: 400,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5,
      });
    }
    setConfetti(particles);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let particles = [...confetti];

    function animate() {
      if (!running || !ctx || !canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx + Math.sin(p.life * 0.05) * 0.5,
          y: p.y + p.vy,
          vy: p.vy + 0.02,
          life: p.life - 1,
          vx: p.vx * 0.99,
        }))
        .filter((p) => p.life > 0 && p.y < canvas.height + 20);

      for (const p of particles) {
        const alpha = Math.min(1, p.life / (p.maxLife * 0.3));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        // Rotate
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 0.05);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      running = false;
    };
  }, [confetti]);

  const mins = Math.floor(stats.time / 60);
  const secs = stats.time % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 bg-[#1a1a2e]/95 border-2 border-[#fbbf24]/60 rounded-xl p-8 w-[90%] max-w-[500px] shadow-2xl text-center">
        <h2 className="text-[#fbbf24] font-bold text-3xl font-mono mb-2">
          VITORIA!
        </h2>
        <p className="text-white font-mono mb-6">
          Parabens, completaste a aventura!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-zinc-900 rounded-lg p-3">
            <p className="text-zinc-400 text-xs font-mono">Tempo</p>
            <p className="text-white font-bold text-lg font-mono">{timeStr}</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-3">
            <p className="text-zinc-400 text-xs font-mono">NPCs</p>
            <p className="text-white font-bold text-lg font-mono">
              {stats.npcs}/8
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-3">
            <p className="text-zinc-400 text-xs font-mono">Baus</p>
            <p className="text-white font-bold text-lg font-mono">
              {stats.chests}/8
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-3">
            <p className="text-zinc-400 text-xs font-mono">Zonas</p>
            <p className="text-white font-bold text-lg font-mono">
              {stats.zones}/5
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-3 col-span-2">
            <p className="text-zinc-400 text-xs font-mono">Quests</p>
            <p className="text-white font-bold text-lg font-mono">
              {stats.quests}/6
            </p>
          </div>
        </div>

        {/* Speedrunner badge */}
        {stats.time < 180 && (
          <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/40 rounded-lg p-3 mb-4">
            <p className="text-[#fbbf24] font-bold font-mono">
              Speedrunner! Completaste em menos de 3 minutos!
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="/projetos"
            className="block w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1a1a2e] font-mono font-bold py-3 rounded-lg transition-colors"
          >
            Explorar Portfolio Real
          </a>
          <button
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-mono py-3 rounded-lg transition-colors"
            onClick={onRestart}
          >
            Jogar Outra Vez
          </button>
        </div>

        <p className="text-zinc-500 text-xs font-mono mt-4">
          descomplicai.pt — Jaime Silva
        </p>
      </div>
    </div>
  );
}

// ================================================================
// SECTION 27: MOBILE CONTROLS COMPONENT
// ================================================================

function MobileControls({
  onDir,
  onAction,
  onQuests,
  onInventory,
  onPause,
}: {
  onDir: (dir: "up" | "down" | "left" | "right", pressed: boolean) => void;
  onAction: () => void;
  onQuests: () => void;
  onInventory: () => void;
  onPause: () => void;
}) {
  // D-pad button helper
  const DPadButton = ({
    dir,
    label,
    className: cn,
  }: {
    dir: "up" | "down" | "left" | "right";
    label: string;
    className?: string;
  }) => (
    <button
      className={`w-14 h-14 bg-white/10 active:bg-white/30 border border-white/20 rounded-xl flex items-center justify-center text-white text-xl font-mono select-none ${cn}`}
      onTouchStart={(e) => {
        e.preventDefault();
        onDir(dir, true);
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onDir(dir, false);
      }}
      onTouchCancel={(e) => {
        e.preventDefault();
        onDir(dir, false);
      }}
      onMouseDown={() => onDir(dir, true)}
      onMouseUp={() => onDir(dir, false)}
      onMouseLeave={() => onDir(dir, false)}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* D-Pad (bottom-left) */}
      <div className="fixed bottom-8 left-4 z-30">
        <div className="grid grid-cols-3 gap-1">
          <div /> {/* empty */}
          <DPadButton dir="up" label="\u25B2" />
          <div /> {/* empty */}
          <DPadButton dir="left" label="\u25C0" />
          <div /> {/* center empty */}
          <DPadButton dir="right" label="\u25B6" />
          <div /> {/* empty */}
          <DPadButton dir="down" label="\u25BC" />
          <div /> {/* empty */}
        </div>
      </div>

      {/* Action Button (bottom-right) */}
      <div className="fixed bottom-12 right-6 z-30">
        <button
          className="w-16 h-16 bg-green-500/30 active:bg-green-500/60 border-2 border-green-500/50 rounded-full flex items-center justify-center text-green-400 text-xl font-bold font-mono select-none"
          onTouchStart={(e) => {
            e.preventDefault();
            onAction();
          }}
          onClick={onAction}
        >
          E
        </button>
      </div>

      {/* Menu buttons (top-left) */}
      <div className="fixed top-12 left-4 z-30 flex gap-2">
        <button
          className="w-10 h-10 bg-white/10 active:bg-white/30 border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-mono select-none"
          onClick={onQuests}
        >
          Q
        </button>
        <button
          className="w-10 h-10 bg-white/10 active:bg-white/30 border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-mono select-none"
          onClick={onInventory}
        >
          I
        </button>
        <button
          className="w-10 h-10 bg-white/10 active:bg-white/30 border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-mono select-none"
          onClick={onPause}
        >
          ||
        </button>
      </div>
    </>
  );
}
