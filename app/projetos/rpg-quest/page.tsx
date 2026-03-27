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
const MAP_COLS = 80;
const MAP_ROWS = 60;
const CANVAS_W = MAP_COLS * TILE_SIZE; // 1600
const CANVAS_H = MAP_ROWS * TILE_SIZE; // 1200

const PLAYER_SPEED = 2.5;
const PLAYER_SPRINT_MULT = 1.5;
const CAMERA_LERP = 0.08;
const INTERACT_DIST = 24;
const TYPEWRITER_SPEED = 25;
const NPC_PATROL_SPEED = 0.8;
const NPC_FACE_PLAYER_DIST = 3 * TILE_SIZE;

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

type ZoneId = "centro" | "restaurantes" | "clinicas" | "lab" | "torre" | "floresta" | "praia";

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

type NPCIdleAnim = "bounce" | "look_around" | "wave";
type NPCState = "idle" | "walking" | "talking";

interface NPCRuntime {
  id: string; x: number; y: number; originX: number; originY: number;
  direction: Direction; walkFrame: number; walkTimer: number;
  state: NPCState; idleAnimation: NPCIdleAnim;
  patrolTimer: number; patrolTarget: { x: number; y: number } | null;
  patrolCooldown: number;
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

interface SpecialItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  foundIn: string;
  usable: boolean;
  useDescription?: string;
}

interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
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
  specialItems: Set<string>;
  achievements: Set<string>;
  stepsTaken: number;
  dialoguePagesRead: number;
  dialoguePagesSkipped: number;
  npcTalkCounts: Record<string, number>;
  questsCompletedWithoutInventory: number;
  inventoryOpenedSinceLastQuest: boolean;
  usedKeyboardOnly: boolean;
  usedTouchControls: boolean;
  crystalSpeedEndTime: number;
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
  floresta: "Floresta Encantada",
  praia: "Praia do Sul",
};

const ZONE_COLORS: Record<ZoneId, string> = {
  centro: "#4ade80",
  restaurantes: "#f97316",
  clinicas: "#06b6d4",
  lab: "#a855f7",
  torre: "#eab308",
  floresta: "#059669",
  praia: "#0ea5e9",
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
  { id: "floresta", c0: 55, c1: 79, r0: 1, r1: 28 },
  { id: "praia", c0: 2, c1: 78, r0: 50, r1: 59 },
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
  // Row 0 - top border (80 cols)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 1 - lab top border + forest start
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 2 - lab buildings start + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,X,X,X,D,X,X,G,X,X,X,D,X,X,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 3 - forest begins NE
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 4 - forest NE expanding
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 5 - forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,F,F,F,F,F,X,G,X,F,F,F,F,F,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 6 - lab buildings bottom + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,X,X,X,X,X,X,X,G,X,X,X,X,X,X,X,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 7 - lab open area + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 8 - forest spreading
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,L,F,F,F,F,L,F,F,F,L,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 9 - lab lower area + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 10 - lab bottom + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,F,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 11 - transition zone lab->centro + forest boundary
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,P,P,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 12 - water + paths to east/west zones + forest
  [T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 13 - clinicas top + water + restaurantes top + forest
  [T,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 14 - clinicas buildings start + centro start + restaurantes start + forest
  [T,G,X,X,X,D,X,X,G,G,L,G,G,G,W,W,W,W,G,P,P,P,P,P,G,P,P,P,P,P,G,W,W,W,W,G,G,G,L,G,G,S,S,S,S,S,S,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 15
  [T,G,X,F,F,F,F,X,G,G,G,G,P,P,B,B,P,P,P,P,G,G,G,G,G,G,G,G,G,P,P,P,P,B,B,P,P,G,G,G,S,S,X,X,D,X,X,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 16
  [T,G,X,F,F,F,F,X,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,X,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 17 - clinicas first building bottom
  [T,G,X,X,X,X,X,X,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,L,G,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,X,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 18 - centro area middle
  [T,G,G,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,L,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,X,X,X,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 19 - centro area with fountain
  [T,G,G,P,P,P,P,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,L,L,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,G,G,G,G,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 20 - centro area
  [T,G,X,X,D,X,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,L,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,D,X,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 21
  [T,G,X,F,F,F,X,G,G,G,L,G,P,G,W,W,W,W,G,P,G,G,G,L,G,L,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 22
  [T,G,X,F,F,F,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,F,F,F,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 23 - clinicas second building bottom
  [T,G,X,X,X,X,X,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,G,G,G,G,G,G,P,G,W,W,W,W,G,P,G,G,G,S,S,X,X,X,X,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 24 - clinicas third building + centro + restaurantes
  [T,G,G,G,G,G,G,G,G,G,G,G,P,P,B,B,P,P,P,P,G,G,G,G,G,G,G,G,G,P,P,P,P,B,B,P,P,G,G,G,S,S,G,G,G,S,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 25
  [T,G,X,X,X,D,X,G,G,G,G,G,G,G,W,W,W,W,G,P,P,P,P,P,G,P,P,P,P,P,G,W,W,W,W,G,G,G,G,G,S,X,X,D,X,X,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 26
  [T,G,X,F,F,F,X,G,G,L,G,G,G,G,W,W,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,W,W,G,G,L,G,G,S,X,F,F,F,X,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 27 - clinicas bottom + water + restaurantes bottom + forest
  [T,G,X,X,X,X,X,G,G,G,G,G,G,G,G,G,W,W,W,W,W,W,G,P,G,P,G,W,W,W,W,W,W,G,G,G,G,G,G,G,S,X,X,X,X,X,S,S,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 28 - transition to torre zone + forest boundary
  [T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,P,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 29 - torre approach + forest dense
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,P,P,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 30 - torre zone start + forest
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 31 - torre golden floor
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,S,S,S,P,S,S,S,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 32 - torre building
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,L,S,S,S,S,S,L,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 33 - torre
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,X,X,X,X,D,X,X,X,X,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 34
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 35
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 36
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,F,F,F,F,F,F,F,F,F,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 37 - torre building bottom
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,X,X,X,X,X,X,X,X,X,X,X,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 38 - torre bottom area
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,S,S,S,S,S,S,S,S,S,S,S,S,S,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 39 - bottom of torre, grass transition
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,P,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 40 - forest zone (southeast continues) + diagonal river begins
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 41 - transition grass
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 42 - river row (diagonal: W at col 20-22)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 43 - river diagonal NW->SE (W at col 22-24)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 44 - river diagonal (W at col 24-26)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 45 - river diagonal (W at col 26-28)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 46 - river diagonal (W at col 28-30)
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 47 - river continues + grass
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,G,G,G,G,G,G,G,G,G,G,W,W,W,B,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  // Row 48 - transition to beach
  [G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G],
  // Row 49 - pre-beach grass/sand mix
  [G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G],
  // Row 50 - beach starts (SAND)
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 51 - beach with buildings
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,X,D,X,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,X,D,X,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 52 - beach buildings interior
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,F,F,F,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,F,F,F,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 53 - beach buildings
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,F,F,F,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,F,F,F,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 54 - beach buildings bottom + pier start
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,X,X,X,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,X,X,X,X,X,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 55 - open beach + pier structure
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,B,B,B,B,B,B,B,B,B,B,B,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 56 - beach open walkable
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 57 - beach lower
  [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  // Row 58 - beach meets water
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  // Row 59 - bottom border (ocean)
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
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
// SECTION 7B: SPECIAL ITEM & ACHIEVEMENT DEFINITIONS
// ================================================================

const SPECIAL_ITEMS: SpecialItem[] = [
  { id: "chave_dourada", name: "Chave Dourada", emoji: "\u{1F511}", description: "Uma chave dourada antiga que brilha com luz propria.", foundIn: "Bau na Torre do Portfolio", usable: false },
  { id: "mapa_antigo", name: "Mapa Antigo", emoji: "\u{1F4DC}", description: "Um mapa que revela todos os baus no minimapa.", foundIn: "Dado pelo Guia apos falar com 3 NPCs", usable: false },
  { id: "cristal_magico", name: "Cristal Magico", emoji: "\u{1F52E}", description: "Duplica a velocidade de movimento por 30 segundos!", foundIn: "Canteiro de flores no Centro", usable: true, useDescription: "Duplica velocidade 30s" },
  { id: "flauta_vento", name: "Flauta do Vento", emoji: "\u{1F3B5}", description: "Uma flauta magica encantadora.", foundIn: "Recompensa da quest Conversador", usable: false },
  { id: "escudo_programador", name: "Escudo do Programador", emoji: "\u{1F6E1}\u{FE0F}", description: "Escudo decorativo da Descomplicai.", foundIn: "Bau secreto no Lab", usable: false },
];

interface SpecialItemChest { id: string; itemId: string; x: number; y: number; opened: boolean; }

const SPECIAL_ITEM_CHESTS: SpecialItemChest[] = [
  { id: "si_chest_chave", itemId: "chave_dourada", x: 22 * TILE_SIZE, y: 35 * TILE_SIZE, opened: false },
  { id: "si_chest_cristal", itemId: "cristal_magico", x: 24 * TILE_SIZE, y: 18 * TILE_SIZE + 10, opened: false },
  { id: "si_chest_escudo", itemId: "escudo_programador", x: 17 * TILE_SIZE, y: 8 * TILE_SIZE, opened: false },
];

const CRISTAL_FLOWER_COL = 24;
const CRISTAL_FLOWER_ROW = 17;

function createAchievements(): Achievement[] {
  return [
    { id: "primeiros_passos", name: "Primeiros Passos", emoji: "\u{1F3C3}", description: "Anda 500 tiles", unlocked: false },
    { id: "linguarudo", name: "Linguarudo", emoji: "\u{1F5E3}\u{FE0F}", description: "Fala com todos os NPCs", unlocked: false },
    { id: "colecionador", name: "Colecionador", emoji: "\u{1F4E6}", description: "Abre todos os baus", unlocked: false },
    { id: "cartografo", name: "Cartografo", emoji: "\u{1F5FA}\u{FE0F}", description: "Revela 90% do mapa", unlocked: false },
    { id: "speed_runner", name: "Speed Runner", emoji: "\u26A1", description: "Completa o jogo em <5 min", unlocked: false },
    { id: "focado", name: "Focado", emoji: "\u{1F3AF}", description: "3 quests sem abrir inventario", unlocked: false },
    { id: "observador", name: "Observador", emoji: "\u{1F440}", description: "Encontra todos os itens especiais", unlocked: false },
    { id: "cem_porcento", name: "100%", emoji: "\u{1F3C6}", description: "Todas as outras conquistas", unlocked: false },
    { id: "noctambulo", name: "Noctambulo", emoji: "\u{1F319}", description: "Joga por 10+ minutos", unlocked: false },
    { id: "filosofo", name: "Filosofo", emoji: "\u{1F4AC}", description: "Le todos os dialogos sem saltar", unlocked: false },
    { id: "pro_gamer", name: "Pro Gamer", emoji: "\u{1F3AE}", description: "Usa exclusivamente o teclado", unlocked: false },
    { id: "amigavel", name: "Amigavel", emoji: "\u{1F91D}", description: "Fala com o mesmo NPC 3 vezes", unlocked: false },
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
    // Multiple sine wave lines
    ctx.strokeStyle = `rgba(255,255,255,${0.15 + wave * 0.1})`; ctx.lineWidth = 0.5;
    for (let wl = 0; wl < 3; wl++) { const yBase = screenY + 4 + wl * 6 + ((animFrame * 0.3 + wl * 3) % 4); ctx.beginPath(); for (let wx = 0; wx <= TILE_SIZE; wx += 2) { const wy = yBase + Math.sin((wx + screenX + animFrame * 0.8 + wl * 20) * 0.3) * 1.5; if (wx === 0) ctx.moveTo(screenX + wx, wy); else ctx.lineTo(screenX + wx, wy); } ctx.stroke(); }
    return;
  }

  ctx.fillStyle = color;
  ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

  // Grass blades
  if (tileType === GRASS) {
    ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 0.5;
    const seed = (screenX * 7 + screenY * 13) % 100;
    for (let i = 0; i < 4; i++) { const gx = screenX + ((seed + i * 5) % 16) + 2, gy = screenY + ((seed + i * 7) % 14) + 3; ctx.beginPath(); ctx.moveTo(gx, gy + 4); ctx.lineTo(gx + Math.sin(animFrame * 0.02 + i) * 0.5, gy); ctx.stroke(); }
    return;
  }

  // Tree decoration: trunk + canopy circle
  if (tileType === TREE) {
    ctx.fillStyle = "#78350f"; ctx.fillRect(screenX + 7, screenY + 12, 6, 8);
    ctx.fillStyle = "#92400e"; ctx.fillRect(screenX + 8, screenY + 13, 4, 7);
    const cx = screenX + 10, cy = screenY + 7;
    ctx.fillStyle = "#166534"; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#15803d"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#22c55e"; ctx.beginPath(); ctx.arc(cx - 1, cy - 1, 3, 0, Math.PI * 2); ctx.fill();
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

/** Draw an NPC with AI state and animations */
function drawNPC(ctx: CanvasRenderingContext2D, npc: NPC, nrt: NPCRuntime, cameraX: number, cameraY: number, animFrame: number, playerX: number, playerY: number, npcsSpoken: Set<string>, questsCompleted: Set<string>) {
  const sx = nrt.x - cameraX;
  const sy = nrt.y - cameraY;
  const distP = Math.sqrt((playerX - nrt.x) ** 2 + (playerY - nrt.y) ** 2);
  let bob = 0, headShift = 0, showWave = false;
  if (nrt.state === "idle") {
    if (nrt.idleAnimation === "bounce") bob = Math.sin(animFrame * 0.05 + nrt.originX) * 2;
    else if (nrt.idleAnimation === "look_around") { bob = Math.sin(animFrame * 0.03 + nrt.originX) * 0.5; headShift = Math.sin(animFrame * 0.02 + nrt.originY) * 2; }
    else if (nrt.idleAnimation === "wave") { bob = Math.sin(animFrame * 0.04 + nrt.originX) * 1; if (distP < NPC_FACE_PLAYER_DIST && Math.sin(animFrame * 0.06) > 0.3) showWave = true; }
  } else if (nrt.state === "talking") bob = Math.sin(animFrame * 0.1) * 1;
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(sx + 6, sy + 19, 6, 3, 0, 0, Math.PI * 2); ctx.fill();
  // Legs (walking animation)
  ctx.fillStyle = "#374151";
  if (nrt.state === "walking") { if (nrt.walkFrame % 4 < 2) { ctx.fillRect(sx + 3, sy + 16, 3, 4); ctx.fillRect(sx + 8, sy + 16, 3, 3); } else { ctx.fillRect(sx + 3, sy + 16, 3, 3); ctx.fillRect(sx + 8, sy + 16, 3, 4); } }
  else { ctx.fillRect(sx + 3, sy + 16 + bob, 3, 3); ctx.fillRect(sx + 8, sy + 16 + bob, 3, 3); }
  // Body
  ctx.fillStyle = npc.bodyColor; ctx.fillRect(sx + 2, sy + 8 + bob, 10, 8);
  // Arms
  ctx.fillStyle = npc.bodyColor;
  if (nrt.state === "walking" && nrt.walkFrame % 2 === 0) { ctx.fillRect(sx, sy + 9 + bob, 2, 5); ctx.fillRect(sx + 12, sy + 10 + bob, 2, 5); }
  else { ctx.fillRect(sx, sy + 9 + bob, 2, 6); ctx.fillRect(sx + 12, sy + 9 + bob, 2, 6); }
  // Wave arm
  if (showWave) { ctx.fillStyle = npc.headColor; ctx.fillRect(sx + 13, sy + 6 + bob, 4, 2); ctx.fillRect(sx + 15, sy + 4 + bob, 2, 3); }
  // Head
  ctx.fillStyle = npc.headColor; ctx.fillRect(sx + 3 + headShift, sy + bob, 8, 8);
  // Eyes based on direction
  ctx.fillStyle = "#1e293b";
  if (nrt.direction === DIR_DOWN) { ctx.fillRect(sx + 4 + headShift, sy + 4 + bob, 2, 2); ctx.fillRect(sx + 8 + headShift, sy + 4 + bob, 2, 2); }
  else if (nrt.direction === DIR_UP) ctx.fillRect(sx + 3 + headShift, sy + bob, 8, 5);
  else if (nrt.direction === DIR_LEFT) ctx.fillRect(sx + 3 + headShift, sy + 4 + bob, 2, 2);
  else ctx.fillRect(sx + 9 + headShift, sy + 4 + bob, 2, 2);
  // Name tag
  ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.font = "8px monospace"; const nw = ctx.measureText(npc.name).width;
  ctx.fillRect(sx + 6 - nw / 2 - 3, sy - 14 + bob, nw + 6, 12);
  ctx.fillStyle = "#ffffff"; ctx.textAlign = "center"; ctx.fillText(npc.name, sx + 6, sy - 5 + bob); ctx.textAlign = "start";
  // Quest indicator
  if (npc.questId) { ctx.font = "bold 10px monospace"; ctx.textAlign = "center";
    if (questsCompleted.has(npc.questId)) { ctx.fillStyle = "#4ade80"; ctx.fillText("\u2714", sx + 6, sy - 18 + bob); }
    else if (npcsSpoken.has(npc.id)) { ctx.fillStyle = "#3b82f6"; ctx.fillText("?", sx + 6, sy - 18 + bob); }
    else { ctx.fillStyle = "#fbbf24"; ctx.fillText("!", sx + 6, sy - 18 + bob); }
    ctx.textAlign = "start"; }
  // Talk bubble when player is near
  if (distP < INTERACT_DIST * 1.5 && nrt.state !== "talking") {
    const bx = sx + 14, by = sy - 8 + bob;
    ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + 18, by); ctx.lineTo(bx + 18, by - 10); ctx.lineTo(bx, by - 10); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bx + 2, by); ctx.lineTo(bx - 2, by + 4); ctx.lineTo(bx + 6, by); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#374151"; const db = Math.sin(animFrame * 0.1) * 1;
    ctx.beginPath(); ctx.arc(bx + 5, by - 5 + db, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bx + 9, by - 5 + db * 0.7, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bx + 13, by - 5 + db * 0.4, 1.5, 0, Math.PI * 2); ctx.fill();
  }
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
  explored: boolean[][],
  hasMapItem?: boolean
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
    if (hasMapItem || explored[cr]?.[cc]) {
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

type ParticleType = "dust" | "sparkle" | "confetti" | "bubble" | "leaf";
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; type: ParticleType; }
interface WindState { dirX: number; dirY: number; strength: number; timer: number; changeCooldown: number; }

function createConfettiParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = [];
  const colors = ["#f472b6", "#fbbf24", "#4ade80", "#3b82f6", "#a855f7", "#ef4444"];
  for (let i = 0; i < count; i++) { particles.push({ x: cx, y: cy, vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 5 - 2, life: 60 + Math.random() * 60, maxLife: 120, color: colors[Math.floor(Math.random() * colors.length)], size: 2 + Math.random() * 4, type: "confetti" }); }
  return particles;
}
function createDustParticles(cx: number, cy: number, n: number): Particle[] {
  const p: Particle[] = [];
  for (let i = 0; i < n; i++) p.push({ x: cx + (Math.random() - 0.5) * 6, y: cy + Math.random() * 4, vx: (Math.random() - 0.5) * 1.5, vy: -Math.random() * 0.8 - 0.3, life: 15 + Math.random() * 15, maxLife: 30, color: "#a3836a", size: 1.5 + Math.random() * 2, type: "dust" });
  return p;
}
function createSparkleParticles(cx: number, cy: number, n: number): Particle[] {
  const p: Particle[] = [];
  for (let i = 0; i < n; i++) p.push({ x: cx + (Math.random() - 0.5) * 14, y: cy + Math.random() * 6, vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.6 - 0.2, life: 30 + Math.random() * 40, maxLife: 70, color: "#fbbf24", size: 1 + Math.random() * 2, type: "sparkle" });
  return p;
}
function createBubbleParticle(cx: number, cy: number): Particle {
  return { x: cx + (Math.random() - 0.5) * TILE_SIZE, y: cy, vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.2, life: 60 + Math.random() * 80, maxLife: 140, color: "#93c5fd", size: 1.5 + Math.random() * 2.5, type: "bubble" };
}
function createLeafParticle(cx: number, cy: number, wind: WindState): Particle {
  return { x: cx + (Math.random() - 0.5) * TILE_SIZE * 2, y: cy + (Math.random() - 0.5) * TILE_SIZE, vx: wind.dirX * wind.strength * 0.3 + (Math.random() - 0.5) * 0.2, vy: Math.random() * 0.3 + 0.1, life: 120 + Math.random() * 180, maxLife: 300, color: ["#4ade80", "#22c55e", "#16a34a", "#15803d"][Math.floor(Math.random() * 4)], size: 2 + Math.random() * 2, type: "leaf" };
}
function updateWind(wind: WindState): void { wind.timer++; if (wind.timer >= wind.changeCooldown) { wind.timer = 0; wind.changeCooldown = 1800 + Math.random() * 1800; const a = Math.random() * Math.PI * 2; wind.dirX = Math.cos(a); wind.dirY = Math.sin(a) * 0.3; wind.strength = 0.3 + Math.random() * 0.7; } }

function updateNPCRuntime(npcRts: NPCRuntime[], px: number, py: number, dActive: boolean): void {
  for (const n of npcRts) {
    const dx = px - n.x, dy = py - n.y, d = Math.sqrt(dx * dx + dy * dy);
    if (dActive && d < INTERACT_DIST) { n.state = "talking"; if (Math.abs(dx) > Math.abs(dy)) n.direction = dx < 0 ? DIR_LEFT : DIR_RIGHT; else n.direction = dy < 0 ? DIR_UP : DIR_DOWN; n.patrolTarget = null; continue; }
    if (d < NPC_FACE_PLAYER_DIST) { n.state = "idle"; if (Math.abs(dx) > Math.abs(dy)) n.direction = dx < 0 ? DIR_LEFT : DIR_RIGHT; else n.direction = dy < 0 ? DIR_UP : DIR_DOWN; n.patrolTarget = null; n.patrolCooldown = 60; continue; }
    if (n.patrolCooldown > 0) { n.patrolCooldown--; n.state = "idle"; continue; }
    n.patrolTimer--;
    if (n.patrolTimer <= 0 && !n.patrolTarget) {
      const dd = (2 + Math.random() * 2) * TILE_SIZE, a = Math.random() * Math.PI * 2, mr = 4 * TILE_SIZE;
      const tx = Math.max(n.originX - mr, Math.min(n.originX + mr, n.originX + Math.cos(a) * dd));
      const ty = Math.max(n.originY - mr, Math.min(n.originY + mr, n.originY + Math.sin(a) * dd));
      const tc = Math.floor(tx / TILE_SIZE), tr = Math.floor(ty / TILE_SIZE);
      if (tc >= 0 && tc < MAP_COLS && tr >= 0 && tr < MAP_ROWS) { const t = GAME_MAP[tr]?.[tc]; if (t !== undefined && WALKABLE.has(t)) n.patrolTarget = { x: tx, y: ty }; }
      n.patrolTimer = 180 + Math.random() * 120;
    }
    if (n.patrolTarget) {
      const tdx = n.patrolTarget.x - n.x, tdy = n.patrolTarget.y - n.y, td = Math.sqrt(tdx * tdx + tdy * tdy);
      if (td < 2) { n.patrolTarget = null; n.patrolCooldown = 60 + Math.random() * 120; n.state = "idle"; }
      else {
        const mx = (tdx / td) * NPC_PATROL_SPEED, my = (tdy / td) * NPC_PATROL_SPEED;
        const nc = Math.floor((n.x + mx + 6) / TILE_SIZE), nr = Math.floor((n.y + my + 10) / TILE_SIZE);
        if (nc >= 0 && nc < MAP_COLS && nr >= 0 && nr < MAP_ROWS) {
          const nt = GAME_MAP[nr]?.[nc];
          if (nt !== undefined && WALKABLE.has(nt)) { n.x += mx; n.y += my; n.state = "walking"; if (Math.abs(mx) > Math.abs(my)) n.direction = mx < 0 ? DIR_LEFT : DIR_RIGHT; else n.direction = my < 0 ? DIR_UP : DIR_DOWN; n.walkTimer++; if (n.walkTimer >= 10) { n.walkTimer = 0; n.walkFrame++; } }
          else { n.patrolTarget = null; n.patrolCooldown = 60; n.state = "idle"; }
        } else { n.patrolTarget = null; n.state = "idle"; }
      }
    } else { n.state = "idle"; }
  }
}

function updateParticles(particles: Particle[], wind: WindState): Particle[] {
  return particles.map((p) => { let vx = p.vx, vy = p.vy;
    if (p.type === "confetti") vy += 0.1; else if (p.type === "dust") { vy -= 0.01; vx *= 0.95; } else if (p.type === "sparkle") vx = Math.sin(p.life * 0.2) * 0.2; else if (p.type === "bubble") { vx = Math.sin(p.life * 0.08) * 0.3; vy = Math.min(vy, -0.15); } else if (p.type === "leaf") { vx += wind.dirX * wind.strength * 0.01; vy += 0.005; vx += Math.sin(p.life * 0.04) * 0.05; }
    return { ...p, x: p.x + vx, y: p.y + vy, vx, vy, life: p.life - 1 };
  }).filter((p) => p.life > 0);
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    const alpha = Math.min(1, p.life / (p.maxLife * 0.3));
    ctx.globalAlpha = alpha; ctx.fillStyle = p.color;
    if (p.type === "bubble") { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = alpha * 0.6; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.3, 0, Math.PI * 2); ctx.fill(); }
    else if (p.type === "sparkle") { const tw = Math.sin(p.life * 0.3) * 0.5 + 0.5, s = p.size * tw; ctx.beginPath(); ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x + s * 0.3, p.y); ctx.lineTo(p.x, p.y + s); ctx.lineTo(p.x - s * 0.3, p.y); ctx.closePath(); ctx.fill(); }
    else if (p.type === "leaf") { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * 0.03); ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    else if (p.type === "dust") { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }
    else { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * 0.05); ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.5); ctx.restore(); }
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
  | "zone_banner"
  | "item_popup";

type InventoryTab = "badges" | "itens" | "conquistas";

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

  const [inventoryTab, setInventoryTab] = useState<InventoryTab>("badges");
  const [specialItems, setSpecialItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<SpecialItem | null>(null);
  const [popupItem, setPopupItem] = useState<SpecialItem | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(createAchievements);
  const [achievementBanner, setAchievementBanner] = useState<Achievement | null>(null);
  const [achievementBannerVisible, setAchievementBannerVisible] = useState(false);

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
      specialItems: new Set(),
    achievements: new Set(),
    stepsTaken: 0,
    dialoguePagesRead: 0,
    dialoguePagesSkipped: 0,
    npcTalkCounts: {},
    questsCompletedWithoutInventory: 0,
    inventoryOpenedSinceLastQuest: false,
    usedKeyboardOnly: true,
    usedTouchControls: false,
    crystalSpeedEndTime: 0,
  });

  const keysRef = useRef<Set<string>>(new Set());
  const animFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);
  const chestsRef = useRef<Chest[]>(
    CHESTS.map((c) => ({ ...c }))
  );
  const specialItemChestsRef = useRef<SpecialItemChest[]>(
    SPECIAL_ITEM_CHESTS.map((c) => ({ ...c }))
  );
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const lastZoneRef = useRef<ZoneId | null>(null);
  const dialogueActiveRef = useRef<boolean>(false);
  const typewriterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoneBannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactCooldownRef = useRef<boolean>(false);
  const achievementBannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const achievementQueueRef = useRef<Achievement[]>([]);
  const cristalPickedUpRef = useRef<boolean>(false);

  // NPC AI runtime state
  const npcRuntimeRef = useRef<NPCRuntime[]>(
    NPCS.map((npc) => ({ id: npc.id, x: npc.x, y: npc.y, originX: npc.x, originY: npc.y, direction: DIR_DOWN as Direction, walkFrame: 0, walkTimer: 0, state: "idle" as NPCState, idleAnimation: (["bounce", "look_around", "wave"] as NPCIdleAnim[])[Math.floor(Math.random() * 3)], patrolTimer: Math.random() * 180 + 60, patrolTarget: null, patrolCooldown: 0 }))
  );
  const windRef = useRef<WindState>({ dirX: 1, dirY: 0.2, strength: 0.5, timer: 0, changeCooldown: 1800 + Math.random() * 1800 });
  const sprintingRef = useRef<boolean>(false);
  const interactFlashRef = useRef<number>(0);

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

  
  // ================================================================
  // ACHIEVEMENT & ITEM SYSTEM
  // ================================================================

  const showAchievementBanner = useCallback((achievement: Achievement) => {
    setAchievementBanner(achievement);
    setAchievementBannerVisible(true);
    if (achievementBannerTimerRef.current) clearTimeout(achievementBannerTimerRef.current);
    achievementBannerTimerRef.current = setTimeout(() => {
      setAchievementBannerVisible(false);
      setTimeout(() => {
        if (achievementQueueRef.current.length > 0) {
          const next = achievementQueueRef.current.shift()!;
          // Re-show for queued achievements
          setAchievementBanner(next);
          setAchievementBannerVisible(true);
          if (achievementBannerTimerRef.current) clearTimeout(achievementBannerTimerRef.current);
          achievementBannerTimerRef.current = setTimeout(() => setAchievementBannerVisible(false), 3000);
        }
      }, 300);
    }, 3000);
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    const gs = gameStateRef.current;
    if (gs.achievements.has(achievementId)) return;
    gs.achievements.add(achievementId);
    setAchievements(prev => prev.map(a => a.id === achievementId ? { ...a, unlocked: true } : a));
    const ach = createAchievements().find(a => a.id === achievementId);
    if (ach) {
      const unlocked = { ...ach, unlocked: true };
      if (achievementBannerTimerRef.current) {
        achievementQueueRef.current.push(unlocked);
      } else {
        showAchievementBanner(unlocked);
      }
    }
  }, [showAchievementBanner]);

  const pickupSpecialItem = useCallback((itemId: string) => {
    const gs = gameStateRef.current;
    if (gs.specialItems.has(itemId)) return;
    gs.specialItems.add(itemId);
    setSpecialItems(prev => { const n = new Set(prev); n.add(itemId); return n; });
    const item = SPECIAL_ITEMS.find(i => i.id === itemId);
    if (item) {
      setPopupItem(item);
      setOverlay("item_popup");
      particlesRef.current = [...particlesRef.current, ...createConfettiParticles(gs.player.x - gs.camera.x + 8, gs.player.y - gs.camera.y, 30)];
      setTimeout(() => setOverlay(prev => (prev === "item_popup" ? "none" : prev)), 2500);
    }
  }, []);

  const useSpecialItem = useCallback((itemId: string) => {
    const gs = gameStateRef.current;
    if (!gs.specialItems.has(itemId)) return;
    if (itemId === "cristal_magico") gs.crystalSpeedEndTime = Date.now() + 30000;
  }, []);

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
      gs.npcTalkCounts[npc.id] = (gs.npcTalkCounts[npc.id] || 0) + 1;
      if (gs.npcTalkCounts[npc.id] >= 3) unlockAchievement("amigavel");
      if (npc.id === "guia" && !gs.specialItems.has("mapa_antigo")) {
        const otherNPCs = Array.from(gs.npcsSpoken).filter(id => id !== "guia").length;
        if (otherNPCs >= 3) setTimeout(() => pickupSpecialItem("mapa_antigo"), 500);
      }
    },
    [startTypewriter]
  );

  const advanceDialogue = useCallback(() => {
    if (!typewriterDone) {
      // Skip to end of current text
      skipTypewriter();
      setDialogueText(dialoguePages[dialoguePage]);
      setTypewriterDone(true);
      
      gameStateRef.current.dialoguePagesSkipped++;
      return;
    }

    gameStateRef.current.dialoguePagesRead++;

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

    interactFlashRef.current = 20;
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
  
    // Check special item chests
    for (const sic of specialItemChestsRef.current) {
      if (sic.opened) continue;
      const dx2 = sic.x - px;
      const dy2 = sic.y - py;
      if (Math.sqrt(dx2 * dx2 + dy2 * dy2) < INTERACT_DIST) {
        sic.opened = true;
        pickupSpecialItem(sic.itemId);
        return;
      }
    }
  }, [advanceDialogue, openDialogue, openChest, pickupSpecialItem]);

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

    
    // ============ ACHIEVEMENT CHECKS ============
    if (gs.stepsTaken >= 500) unlockAchievement("primeiros_passos");
    if (gs.npcsSpoken.size >= NPCS.length) unlockAchievement("linguarudo");
    if (gs.chestsOpened.size >= CHESTS.length) unlockAchievement("colecionador");
    let exploredCount = 0; let totalTiles = 0;
    for (let r = 0; r < MAP_ROWS; r++) for (let c = 0; c < MAP_COLS; c++) { const t = GAME_MAP[r]?.[c]; if (t !== undefined && t !== TREE) { totalTiles++; if (gs.explored[r]?.[c]) exploredCount++; } }
    if (totalTiles > 0 && exploredCount / totalTiles >= 0.9) unlockAchievement("cartografo");
    if (gs.questsCompleted.has("mestre_digital") && gs.startTime > 0 && (Date.now() - gs.startTime) / 1000 < 300) unlockAchievement("speed_runner");
    if (!gs.inventoryOpenedSinceLastQuest && gs.questsCompletedWithoutInventory >= 3) unlockAchievement("focado");
    if (gs.specialItems.size >= SPECIAL_ITEMS.length) unlockAchievement("observador");
    if (gs.startTime > 0 && (Date.now() - gs.startTime) / 1000 >= 600) unlockAchievement("noctambulo");
    const totalPages = NPCS.reduce((s, n) => s + n.dialogue.length, 0);
    if (gs.dialoguePagesRead >= totalPages && gs.dialoguePagesSkipped === 0) unlockAchievement("filosofo");
    if (gs.usedKeyboardOnly && !gs.usedTouchControls && gs.questsCompleted.size >= 3) unlockAchievement("pro_gamer");
    if (gs.achievements.size >= 11) unlockAchievement("cem_porcento");

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
  }, [unlockAchievement, pickupSpecialItem]);

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
          setOverlay((prev) => { if (prev === "inventory") return "none"; gameStateRef.current.inventoryOpenedSinceLastQuest = true; return "inventory"; });
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
        const isSprinting = keys.has("shift");
        sprintingRef.current = isSprinting;
        const crystalMult = (gs.crystalSpeedEndTime > Date.now()) ? 2 : 1;
        const currentSpeed = PLAYER_SPEED * (isSprinting ? PLAYER_SPRINT_MULT : 1) * crystalMult;
        let dx = 0;
        let dy = 0;

        if (keys.has("w") || keys.has("arrowup") || touch.up) dy -= currentSpeed;
        if (keys.has("s") || keys.has("arrowdown") || touch.down) dy += currentSpeed;
        if (keys.has("a") || keys.has("arrowleft") || touch.left) dx -= currentSpeed;
        if (keys.has("d") || keys.has("arrowright") || touch.right) dx += currentSpeed;

        // Diagonal normalization
        if (dx !== 0 && dy !== 0) {
          const norm = Math.sqrt(dx * dx + dy * dy);
          dx = (dx / norm) * currentSpeed;
          dy = (dy / norm) * currentSpeed;
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
          const walkSpeed = isSprinting ? 4 : 8;
          gs.player.walkTimer++;
          if (gs.player.walkTimer >= walkSpeed) {
            gs.player.walkTimer = 0;
            gs.player.walkFrame++;
            gs.stepsTaken++;
            const pCol = Math.floor(gs.player.x / TILE_SIZE);
            const pRow = Math.floor(gs.player.y / TILE_SIZE);
            if (pCol === CRISTAL_FLOWER_COL && pRow === CRISTAL_FLOWER_ROW && !cristalPickedUpRef.current && !gs.specialItems.has("cristal_magico")) {
              cristalPickedUpRef.current = true;
              pickupSpecialItem("cristal_magico");
            }
          }
          if (frame % (isSprinting ? 3 : 6) === 0) { const dustX = gs.player.x - gs.camera.x + 8, dustY = gs.player.y - gs.camera.y + 18; particlesRef.current.push(...createDustParticles(dustX, dustY, isSprinting ? 3 : 1)); }
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
            if (!nearInteractive) {
        for (const sic of specialItemChestsRef.current) {
          if (sic.opened) continue;
          const sdx = sic.x - gs.player.x;
          const sdy = sic.y - gs.player.y;
          if (Math.sqrt(sdx * sdx + sdy * sdy) < INTERACT_DIST) {
            nearInteractive = true;
            const item = SPECIAL_ITEMS.find((i: SpecialItem) => i.id === sic.itemId);
            promptText = "[E] Abrir bau " + (item ? item.emoji : "");
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

      // 7. Update NPC AI
      updateNPCRuntime(npcRuntimeRef.current, gs.player.x, gs.player.y, dialogueActiveRef.current);
      for (const nrt of npcRuntimeRef.current) { const npc = NPCS.find(n => n.id === nrt.id); if (npc) { npc.x = nrt.x; npc.y = nrt.y; } }
      updateWind(windRef.current);
      particlesRef.current = updateParticles(particlesRef.current, windRef.current);
      // Ambient particles
      if (frame % 40 === 0) { for (const ch of chestsRef.current) { if (ch.opened) continue; const chsx = ch.x - gs.camera.x + 10, chsy = ch.y - gs.camera.y; if (chsx > -20 && chsx < canvas.width + 20 && chsy > -20 && chsy < canvas.height + 20) particlesRef.current.push(...createSparkleParticles(chsx, chsy, 1)); } }
      if (frame % 60 === 0) { const rc = playerCol + Math.floor((Math.random() - 0.5) * 12), rr = playerRow + Math.floor((Math.random() - 0.5) * 10); if (rc >= 0 && rc < MAP_COLS && rr >= 0 && rr < MAP_ROWS && GAME_MAP[rr]?.[rc] === WATER) particlesRef.current.push(createBubbleParticle(rc * TILE_SIZE - gs.camera.x + TILE_SIZE / 2, rr * TILE_SIZE - gs.camera.y + TILE_SIZE)); }
      if (frame % 90 === 0) { const rc2 = playerCol + Math.floor((Math.random() - 0.5) * 14), rr2 = playerRow + Math.floor((Math.random() - 0.5) * 10); if (rc2 >= 0 && rc2 < MAP_COLS && rr2 >= 0 && rr2 < MAP_ROWS && GAME_MAP[rr2]?.[rc2] === TREE) particlesRef.current.push(createLeafParticle(rc2 * TILE_SIZE - gs.camera.x + TILE_SIZE / 2, rr2 * TILE_SIZE - gs.camera.y, windRef.current)); }
      if (interactFlashRef.current > 0) interactFlashRef.current--;

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

      
      // Draw special item chests (purple)
      for (const sic of specialItemChestsRef.current) {
        if (sic.opened) continue;
        const sc = Math.floor(sic.x / TILE_SIZE);
        const sr = Math.floor(sic.y / TILE_SIZE);
        if (sc >= startCol && sc < endCol && sr >= startRow && sr < endRow) {
          const sx = sic.x - gs.camera.x;
          const sy = sic.y - gs.camera.y;
          ctx.fillStyle = "#7c3aed";
          ctx.fillRect(sx + 2, sy + 8, 16, 8);
          ctx.fillStyle = "#6d28d9";
          ctx.fillRect(sx + 1, sy + 4, 18, 6);
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(sx + 8, sy + 7, 4, 4);
          const sparkle = Math.sin(frame * 0.08) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(167,139,250,${sparkle * 0.8})`;
          ctx.beginPath();
          ctx.arc(sx + 10 + Math.cos(frame * 0.06) * 8, sy + 2 + Math.sin(frame * 0.08) * 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

// Draw NPCs with AI state
      for (let ni = 0; ni < NPCS.length; ni++) {
        const npc = NPCS[ni]; const nrt = npcRuntimeRef.current[ni];
        const nc = Math.floor(nrt.x / TILE_SIZE); const nr = Math.floor(nrt.y / TILE_SIZE);
        if (nc >= startCol - 1 && nc < endCol + 1 && nr >= startRow - 1 && nr < endRow + 1) {
          drawNPC(ctx, npc, nrt, gs.camera.x, gs.camera.y, frame, gs.player.x, gs.player.y, gs.npcsSpoken, gs.questsCompleted);
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

      // Interaction flash
      if (interactFlashRef.current > 0) { const fa = interactFlashRef.current / 20; ctx.globalAlpha = fa; ctx.fillStyle = "#fbbf24"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center"; ctx.fillText("!", playerScreenX + 8, playerScreenY - 8); ctx.textAlign = "start"; ctx.globalAlpha = 1; }
      if (sprintingRef.current && gs.player.moving) { ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; for (let sl = 0; sl < 3; sl++) { const slx = playerScreenX + 8 + (Math.random() - 0.5) * 10, sly = playerScreenY + 5 + sl * 6; const dir = gs.player.direction; const lx = dir === DIR_LEFT ? 8 : dir === DIR_RIGHT ? -8 : 0, ly = dir === DIR_UP ? 8 : dir === DIR_DOWN ? -8 : 0; ctx.beginPath(); ctx.moveTo(slx, sly); ctx.lineTo(slx + lx, sly + ly); ctx.stroke(); } }
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
        gs.explored,
        gs.specialItems.has("mapa_antigo")
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

            // HUD: Crystal speed boost
      if (gs.crystalSpeedEndTime > Date.now()) {
        const remaining = Math.ceil((gs.crystalSpeedEndTime - Date.now()) / 1000);
        ctx.fillStyle = "rgba(109,40,217,0.7)";
        ctx.fillRect(canvas.width - 132, 138, 124, 20);
        ctx.fillStyle = "#a78bfa";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "right";
        ctx.fillText("Speed x2: " + remaining + "s", canvas.width - 16, 152);
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
          specialItems: new Set(),
      achievements: new Set(),
      stepsTaken: 0,
      dialoguePagesRead: 0,
      dialoguePagesSkipped: 0,
      npcTalkCounts: {},
      questsCompletedWithoutInventory: 0,
      inventoryOpenedSinceLastQuest: false,
      usedKeyboardOnly: true,
      usedTouchControls: false,
      crystalSpeedEndTime: 0,
    };
    chestsRef.current = CHESTS.map((c) => ({ ...c }));
    specialItemChestsRef.current = SPECIAL_ITEM_CHESTS.map((c: SpecialItemChest) => ({ ...c }));
    particlesRef.current = [];
    lastZoneRef.current = null;
    dialogueActiveRef.current = false;
    cristalPickedUpRef.current = false;
    achievementQueueRef.current = [];
    npcRuntimeRef.current = NPCS.map((npc) => ({ id: npc.id, x: npc.x, y: npc.y, originX: npc.x, originY: npc.y, direction: DIR_DOWN as Direction, walkFrame: 0, walkTimer: 0, state: "idle" as NPCState, idleAnimation: (["bounce", "look_around", "wave"] as NPCIdleAnim[])[Math.floor(Math.random() * 3)], patrolTimer: Math.random() * 180 + 60, patrolTarget: null, patrolCooldown: 0 }));
    windRef.current = { dirX: 1, dirY: 0.2, strength: 0.5, timer: 0, changeCooldown: 1800 + Math.random() * 1800 };
    interactFlashRef.current = 0; sprintingRef.current = false;
    setQuests(createQuests());
    setBadges([]);
    setBadgeEmojis({});
    setSpecialItems(new Set());
    setAchievements(createAchievements());
    setAchievementBanner(null);
    setAchievementBannerVisible(false);
    setSelectedItem(null);
    setPopupItem(null);
    setInventoryTab("badges");
    setOverlay("none");
    setScreen("playing");
  }, []);

  // ================================================================
  // SECTION 24: TOUCH / MOBILE CONTROLS
  // ================================================================

  const handleTouchDir = useCallback(
    (dir: "up" | "down" | "left" | "right", pressed: boolean) => {
      touchDirRef.current[dir] = pressed;
      if (pressed) { gameStateRef.current.usedTouchControls = true; gameStateRef.current.usedKeyboardOnly = false; }
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
      {/* OVERLAY: Inventory (Full Tabbed System) */}
      {/* ============================================ */}
      {overlay === "inventory" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => { setOverlay("none"); setSelectedItem(null); }}>
          <div className="bg-[#1a1a2e]/95 border-2 border-[#fbbf24]/40 rounded-xl w-[95%] max-w-[700px] max-h-[85vh] shadow-2xl backdrop-blur-md flex flex-col"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 pb-0">
              <h2 className="text-[#fbbf24] font-bold text-xl font-mono">Inventario</h2>
              <div className="flex items-center gap-3">
                <span className="text-zinc-400 text-xs font-mono">
                  {badges.length + specialItems.size + achievements.filter((a: Achievement) => a.unlocked).length}/{CHESTS.length + SPECIAL_ITEMS.length + achievements.length} coletados
                </span>
                <button className="text-zinc-400 hover:text-white text-xl font-mono" onClick={() => { setOverlay("none"); setSelectedItem(null); }}>X</button>
              </div>
            </div>
            <div className="flex gap-1 px-5 pt-4">
              {([
                { key: "badges" as InventoryTab, label: "Badges", count: `${badges.length}/${CHESTS.length}` },
                { key: "itens" as InventoryTab, label: "Itens", count: `${specialItems.size}/${SPECIAL_ITEMS.length}` },
                { key: "conquistas" as InventoryTab, label: "Conquistas", count: `${achievements.filter((a: Achievement) => a.unlocked).length}/${achievements.length}` },
              ]).map(tab => (
                <button key={tab.key}
                  className={`flex-1 py-2 px-3 rounded-t-lg font-mono text-sm font-bold transition-colors ${inventoryTab === tab.key ? "bg-zinc-800 text-[#fbbf24] border-t border-x border-[#fbbf24]/30" : "bg-zinc-900/50 text-zinc-500 hover:text-zinc-300"}`}
                  onClick={() => { setInventoryTab(tab.key); setSelectedItem(null); }}>
                  {tab.label} <span className="text-xs opacity-60">({tab.count})</span>
                </button>
              ))}
            </div>
            <div className="bg-zinc-800/50 p-5 overflow-y-auto flex-1 min-h-[200px]">
              <div className="flex gap-4">
                <div className={selectedItem ? "w-1/2 transition-all" : "w-full transition-all"}>
                  {inventoryTab === "badges" && (
                    <>{badges.length === 0 ? (
                      <p className="text-zinc-400 text-sm font-mono text-center py-8">Ainda nao tens badges. Abre baus para colecionar!</p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {badges.map((badge, i) => (
                          <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-center hover:border-[#fbbf24]/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedItem({ id: badge, name: badge, emoji: badgeEmojis[badge] || "\u{1F3C6}", description: `Badge tecnico: ${badge}`, foundIn: "Bau do tesouro", usable: false })}>
                            <p className="text-2xl mb-1">{badgeEmojis[badge] || "\u{1F3C6}"}</p>
                            <p className="text-white text-xs font-mono truncate">{badge}</p>
                          </div>
                        ))}
                        {Array.from({ length: CHESTS.length - badges.length }).map((_, i) => (
                          <div key={`empty-${i}`} className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 text-center">
                            <p className="text-2xl mb-1 opacity-20">?</p><p className="text-zinc-700 text-xs font-mono">???</p>
                          </div>
                        ))}
                      </div>
                    )}</>
                  )}
                  {inventoryTab === "itens" && (
                    <div className="grid grid-cols-3 gap-2">
                      {SPECIAL_ITEMS.map((item) => {
                        const owned = specialItems.has(item.id);
                        return (<div key={item.id} className={`border rounded-lg p-3 text-center transition-colors ${owned ? "bg-zinc-900 border-purple-500/40 hover:border-purple-400/60 cursor-pointer" : "bg-zinc-900/30 border-zinc-800/50 opacity-50"} ${selectedItem?.id === item.id ? "ring-2 ring-purple-500" : ""}`}
                          onClick={() => owned && setSelectedItem(item)}>
                          <p className="text-2xl mb-1">{owned ? item.emoji : "?"}</p>
                          <p className={`text-xs font-mono ${owned ? "text-white" : "text-zinc-600"}`}>{owned ? item.name : "???"}</p>
                        </div>);
                      })}
                    </div>
                  )}
                  {inventoryTab === "conquistas" && (
                    <div className="space-y-2">
                      {achievements.map((ach) => (
                        <div key={ach.id} className={`flex items-center gap-3 border rounded-lg p-3 transition-colors ${ach.unlocked ? "border-[#fbbf24]/40 bg-[#fbbf24]/5" : "border-zinc-800 bg-zinc-900/30 opacity-50"}`}>
                          <span className="text-2xl">{ach.unlocked ? ach.emoji : "\u{1F512}"}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm font-mono ${ach.unlocked ? "text-[#fbbf24]" : "text-zinc-500"}`}>{ach.unlocked ? ach.name : "???"}</p>
                            <p className="text-zinc-400 text-xs font-mono">{ach.description}</p>
                          </div>
                          {ach.unlocked && <span className="text-green-400 text-xs font-mono shrink-0">Desbloqueado</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedItem && (
                  <div className="w-1/2 bg-zinc-900/80 border border-zinc-700 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <p className="text-5xl mb-2">{selectedItem.emoji}</p>
                      <p className="text-white font-bold text-lg font-mono">{selectedItem.name}</p>
                    </div>
                    <div className="space-y-3">
                      <div><p className="text-zinc-500 text-xs font-mono uppercase mb-1">Descricao</p><p className="text-zinc-300 text-sm font-mono">{selectedItem.description}</p></div>
                      <div><p className="text-zinc-500 text-xs font-mono uppercase mb-1">Encontrado em</p><p className="text-zinc-300 text-sm font-mono">{selectedItem.foundIn}</p></div>
                      {selectedItem.usable && (
                        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold py-2 rounded-lg transition-colors mt-2"
                          onClick={() => { useSpecialItem(selectedItem.id); setOverlay("none"); setSelectedItem(null); }}>
                          Usar {selectedItem.useDescription && `(${selectedItem.useDescription})`}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-mono p-3 text-center">Pressiona I ou ESC para fechar</p>
          </div>
        </div>
      )}
      {/* ============================================ */}
      {/* OVERLAY: Item Popup */}
      {/* ============================================ */}
      {overlay === "item_popup" && popupItem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-[#1a1a2e]/95 border-2 border-purple-500/60 rounded-xl p-6 text-center shadow-2xl"
            style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <p className="text-4xl mb-2">{popupItem.emoji}</p>
            <p className="text-purple-400 font-bold text-lg font-mono">Item Encontrado!</p>
            <p className="text-white font-mono mt-1">{popupItem.name}</p>
            <p className="text-zinc-400 text-xs font-mono mt-2 max-w-[250px]">{popupItem.description}</p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* BANNER: Achievement Notification */}
      {/* ============================================ */}
      {achievementBannerVisible && achievementBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          style={{ animation: "achievementSlide 3s ease-in-out" }}>
          <div className="mt-2 bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] rounded-lg px-6 py-3 shadow-2xl border border-yellow-300/50">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{achievementBanner.emoji}</span>
              <div>
                <p className="text-[#1a1a2e] font-bold text-sm font-mono">Conquista Desbloqueada!</p>
                <p className="text-[#1a1a2e]/80 text-xs font-mono">{achievementBanner.name} &mdash; {achievementBanner.description}</p>
              </div>
              <span className="text-2xl">&#127942;</span>
            </div>
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
        type: "confetti" as ParticleType,
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
