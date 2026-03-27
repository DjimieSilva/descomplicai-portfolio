"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Cell = {
  walls: [boolean, boolean, boolean, boolean]; // N, E, S, W
  visited: boolean;
};

type MazeGrid = Cell[][];

type GenAlgo = "backtracker" | "kruskal" | "prim";
type SolveAlgo = "bfs" | "dfs" | "astar";
type GameMode = "idle" | "generating" | "generated" | "solving" | "solved" | "playing" | "won";

type Stats = {
  genTime: number | null;
  solveTime: number | null;
  pathLength: number | null;
  cellsVisited: number | null;
};

type PlayerState = {
  row: number;
  col: number;
  steps: number;
  startTime: number | null;
  elapsed: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_SIZES = [10, 15, 25, 35, 50] as const;

const GEN_ALGO_LABELS: Record<GenAlgo, string> = {
  backtracker: "Recursive Backtracker",
  kruskal: "Kruskal",
  prim: "Prim",
};

const SOLVE_ALGO_LABELS: Record<SolveAlgo, string> = {
  bfs: "BFS — Caminho mais curto",
  dfs: "DFS — Busca em profundidade",
  astar: "A* — Caminho óptimo",
};

const COLORS = {
  bg: "#0a0a0f",
  wall: "#0d0d14",
  wallBorder: "#1a1a2e",
  path: "#12121e",
  visited: "#0d2d3a",
  solution: "#f5c518",
  start: "#00ff88",
  end: "#ff3366",
  player: "#a78bfa",
  playerGlow: "#7c3aed",
  neonCyan: "#00e5ff",
  neonPurple: "#a78bfa",
  text: "#e2e8f0",
  dim: "#475569",
};

// ─── Maze Logic ───────────────────────────────────────────────────────────────

function createGrid(rows: number, cols: number): MazeGrid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      walls: [true, true, true, true] as [boolean, boolean, boolean, boolean],
      visited: false,
    }))
  );
}

function cloneGrid(grid: MazeGrid): MazeGrid {
  return grid.map((row) =>
    row.map((cell) => ({ walls: [...cell.walls] as [boolean, boolean, boolean, boolean], visited: cell.visited }))
  );
}

// Remove wall between two adjacent cells
function removeWall(grid: MazeGrid, r1: number, c1: number, r2: number, c2: number) {
  const dr = r2 - r1;
  const dc = c2 - c1;
  if (dr === -1) { grid[r1][c1].walls[0] = false; grid[r2][c2].walls[2] = false; }
  else if (dc === 1) { grid[r1][c1].walls[1] = false; grid[r2][c2].walls[3] = false; }
  else if (dr === 1) { grid[r1][c1].walls[2] = false; grid[r2][c2].walls[0] = false; }
  else if (dc === -1) { grid[r1][c1].walls[3] = false; grid[r2][c2].walls[1] = false; }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns an array of [grid snapshots] for animation
function generateBacktracker(rows: number, cols: number): { snapshots: MazeGrid[]; final: MazeGrid } {
  const grid = createGrid(rows, cols);
  const snapshots: MazeGrid[] = [];
  const stack: [number, number][] = [];
  const sr = 0, sc = 0;
  grid[sr][sc].visited = true;
  stack.push([sr, sc]);

  const DIRS: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let step = 0;
  const snapshotInterval = Math.max(1, Math.floor((rows * cols) / 200));

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors = shuffleArray(DIRS)
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].visited);

    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const [nr, nc] = neighbors[0];
      removeWall(grid, r, c, nr, nc);
      grid[nr][nc].visited = true;
      stack.push([nr, nc]);
    }

    step++;
    if (step % snapshotInterval === 0) {
      snapshots.push(cloneGrid(grid));
    }
  }

  // Reset visited for solving phase
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) grid[r][c].visited = false;

  return { snapshots, final: grid };
}

function generateKruskal(rows: number, cols: number): { snapshots: MazeGrid[]; final: MazeGrid } {
  const grid = createGrid(rows, cols);
  const parent = Array.from({ length: rows * cols }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x: number, y: number): boolean {
    const px = find(x), py = find(y);
    if (px === py) return false;
    parent[px] = py;
    return true;
  }

  // Build all edges
  type Edge = { r1: number; c1: number; r2: number; c2: number };
  const edges: Edge[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r + 1 < rows) edges.push({ r1: r, c1: c, r2: r + 1, c2: c });
      if (c + 1 < cols) edges.push({ r1: r, c1: c, r2: r, c2: c + 1 });
    }
  }

  const shuffled = shuffleArray(edges);
  const snapshots: MazeGrid[] = [];
  const snapshotInterval = Math.max(1, Math.floor(shuffled.length / 200));

  shuffled.forEach((edge, i) => {
    const id1 = edge.r1 * cols + edge.c1;
    const id2 = edge.r2 * cols + edge.c2;
    if (union(id1, id2)) {
      removeWall(grid, edge.r1, edge.c1, edge.r2, edge.c2);
    }
    if (i % snapshotInterval === 0) snapshots.push(cloneGrid(grid));
  });

  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) grid[r][c].visited = false;
  return { snapshots, final: grid };
}

function generatePrim(rows: number, cols: number): { snapshots: MazeGrid[]; final: MazeGrid } {
  const grid = createGrid(rows, cols);
  const inMaze = Array.from({ length: rows }, () => Array(cols).fill(false));
  const frontierList: [number, number][] = [];
  const DIRS: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const snapshots: MazeGrid[] = [];

  function addFrontier(r: number, c: number) {
    if (r >= 0 && r < rows && c >= 0 && c < cols && !inMaze[r][c]) {
      if (!frontierList.some(([fr, fc]) => fr === r && fc === c)) {
        frontierList.push([r, c]);
      }
    }
  }

  const sr = Math.floor(Math.random() * rows);
  const sc = Math.floor(Math.random() * cols);
  inMaze[sr][sc] = true;
  DIRS.forEach(([dr, dc]) => addFrontier(sr + dr, sc + dc));

  let step = 0;
  const snapshotInterval = Math.max(1, Math.floor((rows * cols) / 200));

  while (frontierList.length > 0) {
    const idx = Math.floor(Math.random() * frontierList.length);
    const [r, c] = frontierList.splice(idx, 1)[0];

    // Find neighbors in maze
    const mazeNeighbors = DIRS
      .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
      .filter(([nr, nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols && inMaze[nr][nc]);

    if (mazeNeighbors.length > 0) {
      const [nr, nc] = mazeNeighbors[Math.floor(Math.random() * mazeNeighbors.length)];
      removeWall(grid, r, c, nr, nc);
      inMaze[r][c] = true;
      DIRS.forEach(([dr, dc]) => addFrontier(r + dr, c + dc));
    }

    step++;
    if (step % snapshotInterval === 0) snapshots.push(cloneGrid(grid));
  }

  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) grid[r][c].visited = false;
  return { snapshots, final: grid };
}

// Solve: returns list of {visited, path} steps
type SolveStep = { visited: Set<number>; path: number[] };

function solveBFS(grid: MazeGrid, rows: number, cols: number): SolveStep[] {
  const steps: SolveStep[] = [];
  const visited = new Set<number>();
  const parent = new Map<number, number>();
  const queue: number[] = [0];
  const goal = rows * cols - 1;
  visited.add(0);

  const DIRS: [number, number, number][] = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const r = Math.floor(cur / cols);
    const c = cur % cols;

    steps.push({ visited: new Set(visited), path: [] });

    if (cur === goal) break;

    for (const [dr, dc, wallIdx] of DIRS) {
      const nr = r + dr, nc = c + dc;
      const nid = nr * cols + nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[r][c].walls[wallIdx] && !visited.has(nid)) {
        visited.add(nid);
        parent.set(nid, cur);
        queue.push(nid);
      }
    }
  }

  // Build path
  const path: number[] = [];
  let cur = goal;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = parent.get(cur)!;
  }

  if (steps.length > 0) {
    steps[steps.length - 1] = { visited: new Set(visited), path };
  }

  return steps;
}

function solveDFS(grid: MazeGrid, rows: number, cols: number): SolveStep[] {
  const steps: SolveStep[] = [];
  const visited = new Set<number>();
  const parent = new Map<number, number>();
  const stack: number[] = [0];
  const goal = rows * cols - 1;
  let found = false;

  const DIRS: [number, number, number][] = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]];

  while (stack.length > 0 && !found) {
    const cur = stack.pop()!;
    if (visited.has(cur)) continue;
    visited.add(cur);

    const r = Math.floor(cur / cols);
    const c = cur % cols;

    steps.push({ visited: new Set(visited), path: [] });

    if (cur === goal) { found = true; break; }

    for (const [dr, dc, wallIdx] of DIRS) {
      const nr = r + dr, nc = c + dc;
      const nid = nr * cols + nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[r][c].walls[wallIdx] && !visited.has(nid)) {
        parent.set(nid, cur);
        stack.push(nid);
      }
    }
  }

  const path: number[] = [];
  let cur = goal;
  while (cur !== undefined && cur !== 0) {
    path.unshift(cur);
    cur = parent.get(cur)!;
  }
  path.unshift(0);

  if (steps.length > 0) steps[steps.length - 1] = { visited: new Set(visited), path };
  return steps;
}

function solveAStar(grid: MazeGrid, rows: number, cols: number): SolveStep[] {
  const steps: SolveStep[] = [];
  const visited = new Set<number>();
  const parent = new Map<number, number>();
  const goal = rows * cols - 1;
  const gr = rows - 1, gc = cols - 1;

  const gScore = new Map<number, number>();
  const fScore = new Map<number, number>();

  gScore.set(0, 0);
  fScore.set(0, gr + gc);

  // Min-heap via sorted array (small maze sizes OK)
  const open: number[] = [0];

  const DIRS: [number, number, number][] = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]];

  while (open.length > 0) {
    open.sort((a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity));
    const cur = open.shift()!;

    if (visited.has(cur)) continue;
    visited.add(cur);

    const r = Math.floor(cur / cols);
    const c = cur % cols;

    steps.push({ visited: new Set(visited), path: [] });

    if (cur === goal) break;

    for (const [dr, dc, wallIdx] of DIRS) {
      const nr = r + dr, nc = c + dc;
      const nid = nr * cols + nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[r][c].walls[wallIdx] && !visited.has(nid)) {
        const tentG = (gScore.get(cur) ?? Infinity) + 1;
        if (tentG < (gScore.get(nid) ?? Infinity)) {
          parent.set(nid, cur);
          gScore.set(nid, tentG);
          fScore.set(nid, tentG + Math.abs(nr - gr) + Math.abs(nc - gc));
          if (!open.includes(nid)) open.push(nid);
        }
      }
    }
  }

  const path: number[] = [];
  let cur = goal;
  while (cur !== undefined && cur !== 0) {
    path.unshift(cur);
    cur = parent.get(cur)!;
  }
  path.unshift(0);

  if (steps.length > 0) steps[steps.length - 1] = { visited: new Set(visited), path };
  return steps;
}

// ─── Canvas Drawing ───────────────────────────────────────────────────────────

function drawMaze(
  ctx: CanvasRenderingContext2D,
  grid: MazeGrid,
  rows: number,
  cols: number,
  cellSize: number,
  visitedSet?: Set<number>,
  solutionPath?: number[],
  playerPos?: { row: number; col: number }
) {
  const w = cols * cellSize;
  const h = rows * cellSize;

  ctx.fillStyle = COLORS.wall;
  ctx.fillRect(0, 0, w, h);

  const solutionSet = new Set(solutionPath ?? []);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const id = r * cols + c;

      // Cell background
      if (r === 0 && c === 0) {
        ctx.fillStyle = COLORS.start;
      } else if (r === rows - 1 && c === cols - 1) {
        ctx.fillStyle = COLORS.end;
      } else if (playerPos && playerPos.row === r && playerPos.col === c) {
        ctx.fillStyle = COLORS.player;
      } else if (solutionSet.has(id)) {
        ctx.fillStyle = COLORS.solution;
      } else if (visitedSet?.has(id)) {
        ctx.fillStyle = COLORS.visited;
      } else {
        ctx.fillStyle = COLORS.path;
      }

      ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);

      // Draw walls
      ctx.strokeStyle = COLORS.wallBorder;
      ctx.lineWidth = cellSize > 12 ? 1.5 : 1;
      ctx.beginPath();

      const cell = grid[r][c];
      // N
      if (cell.walls[0]) { ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); }
      // E
      if (cell.walls[1]) { ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); }
      // S
      if (cell.walls[2]) { ctx.moveTo(x, y + cellSize); ctx.lineTo(x + cellSize, y + cellSize); }
      // W
      if (cell.walls[3]) { ctx.moveTo(x, y); ctx.lineTo(x, y + cellSize); }

      ctx.stroke();
    }
  }

  // Draw player dot if in playing mode
  if (playerPos) {
    const px = playerPos.col * cellSize + cellSize / 2;
    const py = playerPos.row * cellSize + cellSize / 2;
    const radius = cellSize * 0.3;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.player;
    ctx.fill();

    // glow
    const grad = ctx.createRadialGradient(px, py, 0, px, py, radius * 2);
    grad.addColorStop(0, "rgba(167,139,250,0.4)");
    grad.addColorStop(1, "rgba(167,139,250,0)");
    ctx.beginPath();
    ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Start label
  if (cellSize > 10) {
    ctx.fillStyle = "#000";
    ctx.font = `bold ${Math.max(8, cellSize * 0.45)}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("S", cellSize / 2, cellSize / 2);
    ctx.fillText("E", (cols - 0.5) * cellSize, (rows - 0.5) * cellSize);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MazeSolverPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const animIndexRef = useRef(0);

  const [gridSize, setGridSize] = useState<number>(25);
  const [genAlgo, setGenAlgo] = useState<GenAlgo>("backtracker");
  const [solveAlgo, setSolveAlgo] = useState<SolveAlgo>("bfs");
  const [gameMode, setGameMode] = useState<GameMode>("idle");
  const [speed, setSpeed] = useState<number>(50); // 0=instant, 100=slow
  const [stats, setStats] = useState<Stats>({ genTime: null, solveTime: null, pathLength: null, cellsVisited: null });

  const mazeRef = useRef<MazeGrid | null>(null);
  const visitedRef = useRef<Set<number>>(new Set());
  const solutionRef = useRef<number[]>([]);
  const playerRef = useRef<PlayerState>({ row: 0, col: 0, steps: 0, startTime: null, elapsed: 0 });
  const [playerDisplay, setPlayerDisplay] = useState({ steps: 0, elapsed: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rows = gridSize;
  const cols = gridSize;

  const CANVAS_SIZE = Math.min(560, typeof window !== "undefined" ? window.innerWidth - 48 : 560);
  const cellSize = Math.floor(CANVAS_SIZE / gridSize);
  const canvasW = cellSize * cols;
  const canvasH = cellSize * rows;

  // Redraw canvas
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mazeRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mode = gameMode;
    drawMaze(
      ctx,
      mazeRef.current,
      rows,
      cols,
      cellSize,
      mode === "playing" || mode === "won" ? undefined : visitedRef.current,
      mode === "solved" || mode === "generated" ? solutionRef.current : [],
      mode === "playing" || mode === "won" ? playerRef.current : undefined
    );
  }, [gameMode, rows, cols, cellSize]);

  useEffect(() => {
    if (mazeRef.current) redraw();
  }, [redraw]);

  // ── Generation ──────────────────────────────────────────────────────────────

  const handleGenerate = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    visitedRef.current = new Set();
    solutionRef.current = [];
    playerRef.current = { row: 0, col: 0, steps: 0, startTime: null, elapsed: 0 };
    setPlayerDisplay({ steps: 0, elapsed: 0 });
    setStats({ genTime: null, solveTime: null, pathLength: null, cellsVisited: null });
    setGameMode("generating");

    const t0 = performance.now();
    let result: { snapshots: MazeGrid[]; final: MazeGrid };

    if (genAlgo === "backtracker") result = generateBacktracker(rows, cols);
    else if (genAlgo === "kruskal") result = generateKruskal(rows, cols);
    else result = generatePrim(rows, cols);

    const genTime = performance.now() - t0;
    mazeRef.current = result.final;

    const snapshots = result.snapshots;
    const totalSnaps = snapshots.length;

    // Speed: 0 = instant, 100 = very slow
    const delay = speed === 0 ? 0 : Math.floor(speed * 0.8);

    if (delay === 0 || totalSnaps === 0) {
      setGameMode("generated");
      setStats((s) => ({ ...s, genTime: Math.round(genTime) }));
      redraw();
      return;
    }

    animIndexRef.current = 0;

    const animate = () => {
      const i = animIndexRef.current;
      if (i >= totalSnaps) {
        mazeRef.current = result.final;
        setGameMode("generated");
        setStats((s) => ({ ...s, genTime: Math.round(genTime) }));
        redraw();
        return;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) drawMaze(ctx, snapshots[i], rows, cols, cellSize, new Set(), []);
      }

      animIndexRef.current++;
      animFrameRef.current = window.setTimeout(animate, delay) as unknown as number;
    };

    animate();
  }, [genAlgo, rows, cols, speed, cellSize, redraw]);

  // ── Solving ─────────────────────────────────────────────────────────────────

  const handleSolve = useCallback(() => {
    if (!mazeRef.current || gameMode === "generating" || (gameMode as string) === "idle") return;
    cancelAnimationFrame(animFrameRef.current);
    visitedRef.current = new Set();
    solutionRef.current = [];
    setGameMode("solving");

    const t0 = performance.now();
    let steps: SolveStep[];

    if (solveAlgo === "bfs") steps = solveBFS(mazeRef.current, rows, cols);
    else if (solveAlgo === "dfs") steps = solveDFS(mazeRef.current, rows, cols);
    else steps = solveAStar(mazeRef.current, rows, cols);

    const solveTime = performance.now() - t0;
    const lastStep = steps[steps.length - 1] ?? { visited: new Set(), path: [] };
    const pathLength = lastStep.path.length;
    const cellsVisited = lastStep.visited.size;

    const delay = speed === 0 ? 0 : Math.floor(speed * 0.5);

    if (delay === 0 || steps.length <= 1) {
      visitedRef.current = lastStep.visited;
      solutionRef.current = lastStep.path;
      setGameMode("solved");
      setStats((s) => ({ ...s, solveTime: Math.round(solveTime), pathLength, cellsVisited }));
      redraw();
      return;
    }

    animIndexRef.current = 0;

    const animate = () => {
      const i = animIndexRef.current;
      if (i >= steps.length) {
        visitedRef.current = lastStep.visited;
        solutionRef.current = lastStep.path;
        setGameMode("solved");
        setStats((s) => ({ ...s, solveTime: Math.round(solveTime), pathLength, cellsVisited }));
        redraw();
        return;
      }

      visitedRef.current = steps[i].visited;
      const canvas = canvasRef.current;
      if (canvas && mazeRef.current) {
        const ctx = canvas.getContext("2d");
        if (ctx) drawMaze(ctx, mazeRef.current, rows, cols, cellSize, visitedRef.current, i === steps.length - 1 ? lastStep.path : []);
      }

      animIndexRef.current++;
      animFrameRef.current = window.setTimeout(animate, delay) as unknown as number;
    };

    animate();
  }, [gameMode, solveAlgo, rows, cols, speed, cellSize, redraw]);

  // ── Player Mode ─────────────────────────────────────────────────────────────

  const startPlayerMode = useCallback(() => {
    if (!mazeRef.current || (gameMode as string) === "idle" || gameMode === "generating") return;
    cancelAnimationFrame(animFrameRef.current);
    visitedRef.current = new Set();
    solutionRef.current = [];
    playerRef.current = { row: 0, col: 0, steps: 0, startTime: Date.now(), elapsed: 0 };
    setPlayerDisplay({ steps: 0, elapsed: 0 });
    setGameMode("playing");

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current.startTime) {
        const elapsed = Math.floor((Date.now() - playerRef.current.startTime) / 1000);
        playerRef.current.elapsed = elapsed;
        setPlayerDisplay((d) => ({ ...d, elapsed }));
      }
    }, 1000);
  }, [gameMode]);

  const movePlayer = useCallback((dr: number, dc: number) => {
    if (!mazeRef.current || (gameMode !== "playing" && gameMode !== "won")) return;
    const { row, col } = playerRef.current;
    const nr = row + dr;
    const nc = col + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;

    // Check wall direction
    let wallIdx = -1;
    if (dr === -1) wallIdx = 0;
    else if (dc === 1) wallIdx = 1;
    else if (dr === 1) wallIdx = 2;
    else if (dc === -1) wallIdx = 3;

    if (mazeRef.current[row][col].walls[wallIdx]) return; // blocked

    playerRef.current = { ...playerRef.current, row: nr, col: nc, steps: playerRef.current.steps + 1 };
    setPlayerDisplay((d) => ({ ...d, steps: playerRef.current.steps }));

    if (nr === rows - 1 && nc === cols - 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      const elapsed = playerRef.current.startTime
        ? Math.floor((Date.now() - playerRef.current.startTime) / 1000)
        : 0;
      playerRef.current.elapsed = elapsed;
      setGameMode("won");
    }

    redraw();
  }, [gameMode, rows, cols, redraw]);

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameMode !== "playing") return;
      const map: Record<string, [number, number]> = {
        ArrowUp: [-1, 0], w: [-1, 0], W: [-1, 0],
        ArrowRight: [0, 1], d: [0, 1], D: [0, 1],
        ArrowDown: [1, 0], s: [1, 0], S: [1, 0],
        ArrowLeft: [0, -1], a: [0, -1], A: [0, -1],
      };
      if (map[e.key]) {
        e.preventDefault();
        movePlayer(...map[e.key]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameMode, movePlayer]);

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = "#1e1e3a";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Clica em 'Gerar' para começar", canvasW / 2, canvasH / 2);
  }, [canvasW, canvasH]);

  const isBusy = gameMode === "generating" || gameMode === "solving";
  const hasGrid = gameMode !== "idle";

  const speedLabel = speed === 0 ? "Instantâneo" : speed < 30 ? "Rápido" : speed < 70 ? "Médio" : "Lento";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        padding: "24px 16px 48px",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        <h1
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            background: `linear-gradient(135deg, ${COLORS.neonCyan}, ${COLORS.neonPurple})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}
        >
          Labirinto
        </h1>
        <p style={{ color: COLORS.dim, fontSize: "0.9rem" }}>
          Gera e resolve labirintos com algoritmos clássicos
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 260px",
          gap: 24,
          alignItems: "start",
        }}
        className="maze-layout"
      >
        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              border: `1px solid #1e1e3a`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: `0 0 40px rgba(0,229,255,0.07)`,
              background: COLORS.wallBorder,
            }}
          >
            <canvas
              ref={canvasRef}
              width={canvasW}
              height={canvasH}
              style={{ display: "block", maxWidth: "100%" }}
            />
          </div>

          {/* Touch D-pad (mobile) */}
          <AnimatePresence>
            {(gameMode === "playing" || gameMode === "won") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 52px)",
                  gridTemplateRows: "repeat(3, 52px)",
                  gap: 4,
                }}
              >
                {[
                  { label: "↑", row: 0, col: 1, dr: -1, dc: 0 },
                  { label: "←", row: 1, col: 0, dr: 0, dc: -1 },
                  { label: "↓", row: 1, col: 2, dr: 1, dc: 0 },
                  { label: "→", row: 2, col: 1, dr: 0, dc: 1 },
                ].map(({ label, row: gr, col: gc, dr, dc }) => (
                  <button
                    key={label}
                    onPointerDown={(e) => { e.preventDefault(); movePlayer(dr, dc); }}
                    style={{
                      gridRow: gr + 1,
                      gridColumn: gc + 1,
                      width: 52,
                      height: 52,
                      background: "#1a1a2e",
                      border: `1px solid #2a2a4a`,
                      borderRadius: 8,
                      color: COLORS.neonCyan,
                      fontSize: 20,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      WebkitTapHighlightColor: "transparent",
                      userSelect: "none",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Win banner */}
          <AnimatePresence>
            {gameMode === "won" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "linear-gradient(135deg, #00ff88, #00e5ff)",
                  color: "#000",
                  borderRadius: 12,
                  padding: "16px 32px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                Chegaste! Em {playerDisplay.elapsed}s com {playerDisplay.steps} movimentos
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Grid Size */}
          <Panel title="Tamanho">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {GRID_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => { setGridSize(s); setGameMode("idle"); mazeRef.current = null; visitedRef.current = new Set(); solutionRef.current = []; }}
                  disabled={isBusy}
                  style={chipStyle(gridSize === s, isBusy)}
                >
                  {s}×{s}
                </button>
              ))}
            </div>
          </Panel>

          {/* Gen Algo */}
          <Panel title="Geração">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(Object.keys(GEN_ALGO_LABELS) as GenAlgo[]).map((algo) => (
                <button
                  key={algo}
                  onClick={() => setGenAlgo(algo)}
                  disabled={isBusy}
                  style={chipStyle(genAlgo === algo, isBusy, true)}
                >
                  {GEN_ALGO_LABELS[algo]}
                </button>
              ))}
            </div>
          </Panel>

          {/* Solve Algo */}
          <Panel title="Resolução">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(Object.keys(SOLVE_ALGO_LABELS) as SolveAlgo[]).map((algo) => (
                <button
                  key={algo}
                  onClick={() => setSolveAlgo(algo)}
                  disabled={isBusy}
                  style={chipStyle(solveAlgo === algo, isBusy, true)}
                >
                  {SOLVE_ALGO_LABELS[algo]}
                </button>
              ))}
            </div>
          </Panel>

          {/* Speed */}
          <Panel title={`Velocidade — ${speedLabel}`}>
            <input
              type="range"
              min={0}
              max={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isBusy}
              style={{ width: "100%", accentColor: COLORS.neonCyan, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: COLORS.dim, marginTop: 2 }}>
              <span>Instantâneo</span>
              <span>Lento</span>
            </div>
          </Panel>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ActionButton
              onClick={handleGenerate}
              disabled={isBusy}
              loading={gameMode === "generating"}
              color={COLORS.neonCyan}
            >
              {gameMode === "generating" ? "A gerar…" : "Gerar"}
            </ActionButton>

            <ActionButton
              onClick={handleSolve}
              disabled={isBusy || !hasGrid || (gameMode as string) === "idle"}
              loading={gameMode === "solving"}
              color={COLORS.solution}
            >
              {gameMode === "solving" ? "A resolver…" : "Resolver"}
            </ActionButton>

            <ActionButton
              onClick={startPlayerMode}
              disabled={isBusy || !hasGrid || (gameMode as string) === "idle"}
              loading={false}
              color={COLORS.player}
            >
              {gameMode === "playing" || gameMode === "won" ? "Reiniciar jogador" : "Jogar"}
            </ActionButton>
          </div>

          {/* Player stats */}
          <AnimatePresence>
            {(gameMode === "playing" || gameMode === "won") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Panel title="Jogador">
                  <StatRow label="Movimentos" value={playerDisplay.steps} />
                  <StatRow label="Tempo" value={`${playerDisplay.elapsed}s`} />
                  <div style={{ marginTop: 8, fontSize: "0.72rem", color: COLORS.dim }}>
                    Usa WASD ou ↑↓←→
                  </div>
                </Panel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <AnimatePresence>
            {(stats.genTime !== null || stats.solveTime !== null) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Panel title="Estatísticas">
                  {stats.genTime !== null && <StatRow label="Tempo geração" value={`${stats.genTime}ms`} />}
                  {stats.solveTime !== null && <StatRow label="Tempo resolução" value={`${stats.solveTime}ms`} />}
                  {stats.pathLength !== null && <StatRow label="Comprimento" value={stats.pathLength} />}
                  {stats.cellsVisited !== null && <StatRow label="Células visitadas" value={stats.cellsVisited} />}
                </Panel>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <Panel title="Legenda">
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: "0.78rem" }}>
              {[
                { color: COLORS.start, label: "Início" },
                { color: COLORS.end, label: "Fim" },
                { color: COLORS.visited, label: "Visitado" },
                { color: COLORS.solution, label: "Solução" },
                { color: COLORS.player, label: "Jogador" },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: color, flexShrink: 0 }} />
                  <span style={{ color: COLORS.dim }}>{label}</span>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          .maze-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#0f0f1a",
        border: "1px solid #1e1e3a",
        borderRadius: 10,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#4a4a6a",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", marginBottom: 4 }}>
      <span style={{ color: "#4a4a6a" }}>{label}</span>
      <span style={{ fontWeight: 600, fontFamily: "monospace", color: "#e2e8f0" }}>{value}</span>
    </div>
  );
}

function ActionButton({
  onClick,
  disabled,
  loading,
  color,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#111" : `${color}18`,
        border: `1px solid ${disabled ? "#222" : color}`,
        borderRadius: 8,
        color: disabled ? "#333" : color,
        padding: "10px 16px",
        fontSize: "0.9rem",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        opacity: loading ? 0.8 : 1,
        letterSpacing: "0.02em",
        width: "100%",
      }}
    >
      {loading ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              border: `2px solid ${color}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.6s linear infinite",
            }}
          />
          {children}
        </span>
      ) : (
        children
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

function chipStyle(active: boolean, disabled: boolean, fullWidth = false): React.CSSProperties {
  return {
    background: active ? "#1a1a3a" : "transparent",
    border: `1px solid ${active ? "#4a4aaa" : "#1e1e3a"}`,
    borderRadius: 6,
    color: active ? "#a78bfa" : "#475569",
    padding: fullWidth ? "7px 10px" : "5px 10px",
    fontSize: "0.8rem",
    fontWeight: active ? 600 : 400,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s",
    textAlign: "left" as const,
    width: fullWidth ? "100%" : "auto",
  };
}
