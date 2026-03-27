"use client";

import React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Seeded PRNG (Mulberry32) ─────────────────────────────────────────────────
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Simplex-like Noise (2D) ──────────────────────────────────────────────────
function buildNoise(seed: number) {
  const rng = mulberry32(seed);
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a: number, b: number, t: number) { return a + t * (b - a); }
  function grad(hash: number, x: number, y: number) {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }
  return function noise(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[xi] + yi];
    const ab = perm[perm[xi] + yi + 1];
    const ba = perm[perm[xi + 1] + yi];
    const bb = perm[perm[xi + 1] + yi + 1];
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    );
  };
}

// ─── Color Palettes ───────────────────────────────────────────────────────────
const PALETTES: Record<string, string[]> = {
  Cosmos:   ["#0d0221","#190335","#3d0066","#6a0dad","#9b5de5","#c77dff","#e0aaff","#f8edff"],
  Aurora:   ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#ae2012"],
  Neon:     ["#10002b","#240046","#3c096c","#5a189a","#7b2fbe","#9d4edd","#ff6b6b","#ffd166"],
  Oceano:   ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#caf0f8"],
  Floresta: ["#081c15","#1b4332","#2d6a4f","#40916c","#52b788","#74c69d","#95d5b2","#b7e4c7"],
  Fogo:     ["#03071e","#370617","#6a040f","#9d0208","#d00000","#dc2f02","#f48c06","#faa307"],
};

// ─── Types ────────────────────────────────────────────────────────────────────
type AlgoKey = "Fluxo"|"Árvore"|"Espiral"|"Ondas"|"Galáxia"|"Mosaico"|"Labirinto"|"Constelação";
type Resolution = 512|1024|2048;
type Season = "Primavera"|"Verão"|"Outono"|"Inverno";

interface Controls {
  seed: number;
  resolution: Resolution;
  palette: string;
  animated: boolean;
  speed: number;
  season: Season;
  voronoiPoints: number;
  mazeSize: number;
  galaxyArms: number;
  starCount: number;
  phyllotaxisAngle: number;
  waveCount: number;
  connectionThreshold: number;
}

const DEFAULT_CONTROLS: Controls = {
  seed: 42,
  resolution: 1024,
  palette: "Cosmos",
  animated: false,
  speed: 1,
  season: "Outono",
  voronoiPoints: 80,
  mazeSize: 25,
  galaxyArms: 4,
  starCount: 5000,
  phyllotaxisAngle: 137.508,
  waveCount: 4,
  connectionThreshold: 120,
};

// ─── Algorithm Renderers ──────────────────────────────────────────────────────

// 1. FLUXO — Flow field
function renderFluxo(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, palette, speed } = controls;
  const colors = PALETTES[palette];
  const noise = buildNoise(seed);
  const rng = mulberry32(seed + 1);

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);

  const PARTICLES = 2000;
  const STEPS = 80;
  const SCALE = 0.003;
  const timeOffset = frame * 0.003 * speed;

  for (let i = 0; i < PARTICLES; i++) {
    let x = rng() * w;
    let y = rng() * h;
    const colorIdx = Math.floor(rng() * (colors.length - 2)) + 2;
    const baseAlpha = 0.04 + rng() * 0.08;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let s = 0; s < STEPS; s++) {
      const nx = x * SCALE;
      const ny = y * SCALE;
      const angle = noise(nx + timeOffset, ny + timeOffset) * Math.PI * 4;
      const vx = Math.cos(angle) * 2;
      const vy = Math.sin(angle) * 2;

      ctx.lineTo(x + vx, y + vy);
      x += vx;
      y += vy;

      if (x < 0 || x > w || y < 0 || y > h) break;
    }

    const hue = ((Math.atan2(
      noise(x * SCALE, y * SCALE),
      noise(x * SCALE + 5.2, y * SCALE + 1.3)
    ) / Math.PI + 1) / 2 * 360) | 0;

    ctx.strokeStyle = `hsla(${hue},80%,65%,${baseAlpha})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}

// 2. ÁRVORE — Fractal tree
function renderArvore(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, season, animated, speed } = controls;
  const rng = mulberry32(seed);
  const wind = animated ? Math.sin(frame * 0.02 * speed) * 0.12 : 0;

  const seasonColors: Record<Season, { trunk: string; leaf: string[] }> = {
    Primavera: { trunk: "#5d4037", leaf: ["#a5d6a7","#ce93d8","#f48fb1","#fff9c4"] },
    Verão:     { trunk: "#4e342e", leaf: ["#1b5e20","#2e7d32","#388e3c","#43a047"] },
    Outono:    { trunk: "#3e2723", leaf: ["#bf360c","#e65100","#f57f17","#f9a825","#d84315"] },
    Inverno:   { trunk: "#37474f", leaf: ["#eceff1","#b0bec5","#90a4ae","#78909c"] },
  };
  const sc = seasonColors[season];

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);

  function branch(
    x: number, y: number,
    angle: number, len: number,
    depth: number,
    parentWidth: number
  ) {
    if (depth === 0 || len < 2) return;

    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = sc.trunk;
    ctx.lineWidth = Math.max(0.5, parentWidth * 0.7);
    ctx.stroke();

    if (depth <= 2) {
      const leafColor = sc.leaf[Math.floor(rng() * sc.leaf.length)];
      ctx.beginPath();
      ctx.arc(ex, ey, 3 + rng() * 4, 0, Math.PI * 2);
      ctx.fillStyle = leafColor + "cc";
      ctx.fill();
    }

    const spread = 0.35 + rng() * 0.15;
    const windFactor = wind * (1 - depth / 10);
    branch(ex, ey, angle - spread + windFactor, len * 0.72, depth - 1, parentWidth * 0.7);
    branch(ex, ey, angle + spread + windFactor, len * 0.72, depth - 1, parentWidth * 0.7);
    if (rng() > 0.6) {
      branch(ex, ey, angle + windFactor * 0.5, len * 0.65, depth - 2, parentWidth * 0.5);
    }
  }

  branch(w / 2, h * 0.92, -Math.PI / 2, h * 0.18, 11, w * 0.008);
}

// 3. ESPIRAL — Fibonacci / Phyllotaxis
function renderEspiral(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, palette, phyllotaxisAngle, animated, speed } = controls;
  const colors = PALETTES[palette];
  const rng = mulberry32(seed);

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const N = 1200;
  const maxR = Math.min(w, h) * 0.46;
  const angleRad = (phyllotaxisAngle * Math.PI) / 180;
  const timeOff = animated ? frame * 0.01 * speed : 0;

  for (let i = 0; i < N; i++) {
    const t = i / N;
    const r = Math.sqrt(i / N) * maxR;
    const theta = i * angleRad + timeOff;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    const colorIdx = Math.floor((theta % (Math.PI * 2)) / (Math.PI * 2) * colors.length);
    const color = colors[Math.abs(colorIdx) % colors.length];
    const size = 1.5 + t * 6 + Math.sin(i * 0.1) * 1.5;
    const alpha = 0.6 + 0.4 * t;

    // Glow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    grad.addColorStop(0, color + "ff");
    grad.addColorStop(0.4, color + "88");
    grad.addColorStop(1, color + "00");
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// 4. ONDAS — Interference pattern
function renderOndas(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, palette, waveCount, animated, speed } = controls;
  const colors = PALETTES[palette];
  const rng = mulberry32(seed);
  const timeOff = animated ? frame * 0.04 * speed : 0;

  const sources: Array<{ x: number; y: number; freq: number; phase: number }> = [];
  for (let i = 0; i < waveCount; i++) {
    sources.push({
      x: 0.15 * w + rng() * 0.7 * w,
      y: 0.15 * h + rng() * 0.7 * h,
      freq: 0.008 + rng() * 0.012,
      phase: rng() * Math.PI * 2,
    });
  }

  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;
  const numColors = colors.length;

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      let amp = 0;
      for (const s of sources) {
        const dist = Math.sqrt((px - s.x) ** 2 + (py - s.y) ** 2);
        amp += Math.sin(dist * s.freq - timeOff + s.phase);
      }
      amp = (amp / waveCount + 1) / 2;

      const ci = Math.floor(amp * (numColors - 1));
      const cf = amp * (numColors - 1) - ci;
      const c1 = hexToRgb(colors[Math.min(ci, numColors - 1)]);
      const c2 = hexToRgb(colors[Math.min(ci + 1, numColors - 1)]);

      const idx = (py * w + px) * 4;
      data[idx]     = c1[0] + (c2[0] - c1[0]) * cf;
      data[idx + 1] = c1[1] + (c2[1] - c1[1]) * cf;
      data[idx + 2] = c1[2] + (c2[2] - c1[2]) * cf;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

// 5. GALÁXIA — Spiral galaxy
function renderGalaxia(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, galaxyArms, starCount, animated, speed } = controls;
  const rng = mulberry32(seed);
  const timeOff = animated ? frame * 0.002 * speed : 0;

  ctx.fillStyle = "#00000f";
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.44;

  // Background stars
  for (let i = 0; i < 800; i++) {
    const x = rng() * w;
    const y = rng() * h;
    const r = rng() * 1.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.1 + rng() * 0.5})`;
    ctx.fill();
  }

  // Core glow
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.25);
  coreGrad.addColorStop(0, "rgba(200,180,255,0.9)");
  coreGrad.addColorStop(0.3, "rgba(100,80,200,0.4)");
  coreGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = coreGrad;
  ctx.fillRect(0, 0, w, h);

  // Arm stars
  for (let i = 0; i < starCount; i++) {
    const arm = Math.floor(rng() * galaxyArms);
    const r = Math.pow(rng(), 0.7) * maxR;
    const baseAngle = (arm / galaxyArms) * Math.PI * 2;
    const spiralAngle = baseAngle + r * 0.005 + timeOff;
    const scatter = (rng() - 0.5) * 0.4 * (r / maxR);
    const angle = spiralAngle + scatter;

    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle) * 0.5; // flatten

    const t = r / maxR;
    const hue = 220 + t * 140; // blue center to red edges
    const sat = 60 + t * 30;
    const lit = 40 + (1 - t) * 50;
    const alpha = (1 - t * 0.7) * (0.4 + rng() * 0.6);
    const starSize = (1 - t * 0.6) * (0.5 + rng() * 2.5);

    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`;
    ctx.fill();

    // Bright core stars
    if (rng() > 0.97) {
      ctx.beginPath();
      ctx.arc(x, y, starSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue},${sat}%,90%,0.9)`;
      ctx.fill();
    }
  }

  // Nebula dust lanes
  for (let i = 0; i < galaxyArms * 3; i++) {
    const arm = Math.floor(rng() * galaxyArms);
    const r = rng() * maxR * 0.8;
    const baseAngle = (arm / galaxyArms) * Math.PI * 2;
    const angle = baseAngle + r * 0.004 + timeOff + (rng() - 0.5) * 0.6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle) * 0.5;
    const size = 20 + rng() * 60;

    const nebGrad = ctx.createRadialGradient(x, y, 0, x, y, size);
    const hue = 200 + rng() * 80;
    nebGrad.addColorStop(0, `hsla(${hue},60%,50%,0.06)`);
    nebGrad.addColorStop(1, `hsla(${hue},60%,50%,0)`);
    ctx.fillStyle = nebGrad;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
  }
}

// 6. MOSAICO — Voronoi tessellation
function renderMosaico(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  _frame: number
) {
  const { seed, palette, voronoiPoints } = controls;
  const colors = PALETTES[palette];
  const rng = mulberry32(seed);

  const pts: Array<{ x: number; y: number; color: string }> = [];
  for (let i = 0; i < voronoiPoints; i++) {
    pts.push({
      x: rng() * w,
      y: rng() * h,
      color: colors[Math.floor(rng() * colors.length)],
    });
  }

  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      let minDist1 = Infinity;
      let minDist2 = Infinity;
      let closest = 0;

      for (let i = 0; i < pts.length; i++) {
        const dx = px - pts[i].x;
        const dy = py - pts[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy); // Euclidean
        if (dist < minDist1) {
          minDist2 = minDist1;
          minDist1 = dist;
          closest = i;
        } else if (dist < minDist2) {
          minDist2 = dist;
        }
      }

      const border = minDist2 - minDist1 < 2;
      const rgb = border ? [10, 10, 15] : hexToRgb(pts[closest].color);
      // Distance shading
      const shade = border ? 1 : 0.4 + 0.6 * Math.min(1, minDist1 / (w * 0.15));

      const idx = (py * w + px) * 4;
      data[idx]     = rgb[0] * shade;
      data[idx + 1] = rgb[1] * shade;
      data[idx + 2] = rgb[2] * shade;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  // Draw seed points
  for (const pt of pts) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  }
}

// 7. LABIRINTO — Maze generator
function renderLabirinto(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  _frame: number
) {
  const { seed, palette, mazeSize } = controls;
  const colors = PALETTES[palette];
  const rng = mulberry32(seed);

  const cols = mazeSize;
  const rows = mazeSize;
  const cellW = w / cols;
  const cellH = h / rows;

  // Maze grid: each cell has 4 walls [N, E, S, W]
  const walls = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => [true, true, true, true])
  );
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(0));

  // Recursive backtracker
  const stack: Array<[number, number]> = [];
  const startR = 0, startC = 0;
  visited[startR][startC] = true;
  stack.push([startR, startC]);
  let maxDist = 0;

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors: Array<[number, number, number, number]> = [];
    if (r > 0 && !visited[r-1][c]) neighbors.push([r-1, c, 0, 2]);
    if (c < cols-1 && !visited[r][c+1]) neighbors.push([r, c+1, 1, 3]);
    if (r < rows-1 && !visited[r+1][c]) neighbors.push([r+1, c, 2, 0]);
    if (c > 0 && !visited[r][c-1]) neighbors.push([r, c-1, 3, 1]);

    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const ni = Math.floor(rng() * neighbors.length);
      const [nr, nc, wall, oppWall] = neighbors[ni];
      walls[r][c][wall] = false;
      walls[nr][nc][oppWall] = false;
      visited[nr][nc] = true;
      dist[nr][nc] = dist[r][c] + 1;
      maxDist = Math.max(maxDist, dist[nr][nc]);
      stack.push([nr, nc]);
    }
  }

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);

  // Draw cells colored by distance
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = dist[r][c] / maxDist;
      const ci = Math.floor(t * (colors.length - 1));
      const cf = t * (colors.length - 1) - ci;
      const c1 = hexToRgb(colors[Math.min(ci, colors.length - 1)]);
      const c2 = hexToRgb(colors[Math.min(ci + 1, colors.length - 1)]);
      const r_ = Math.round(c1[0] + (c2[0] - c1[0]) * cf);
      const g_ = Math.round(c1[1] + (c2[1] - c1[1]) * cf);
      const b_ = Math.round(c1[2] + (c2[2] - c1[2]) * cf);

      ctx.fillStyle = `rgb(${r_},${g_},${b_})`;
      ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 1, cellH - 1);
    }
  }

  // Draw walls
  ctx.strokeStyle = "#0a0a0f";
  ctx.lineWidth = Math.max(1.5, cellW * 0.08);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW;
      const y = r * cellH;
      // North
      if (walls[r][c][0]) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellW, y);
        ctx.stroke();
      }
      // East
      if (walls[r][c][1]) {
        ctx.beginPath();
        ctx.moveTo(x + cellW, y);
        ctx.lineTo(x + cellW, y + cellH);
        ctx.stroke();
      }
      // South
      if (walls[r][c][2]) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellH);
        ctx.lineTo(x + cellW, y + cellH);
        ctx.stroke();
      }
      // West
      if (walls[r][c][3]) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellH);
        ctx.stroke();
      }
    }
  }

  // Solution path: BFS from start to end
  const endR = rows - 1, endC = cols - 1;
  const prev = Array.from({ length: rows }, () => new Array(cols).fill(null));
  const bfsVisited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const bfsQueue: Array<[number, number]> = [[0, 0]];
  bfsVisited[0][0] = true;
  while (bfsQueue.length > 0) {
    const [r, c] = bfsQueue.shift()!;
    if (r === endR && c === endC) break;
    const dirs: Array<[number, number, number]> = [[r-1,c,0],[r,c+1,1],[r+1,c,2],[r,c-1,3]];
    for (const [nr, nc, wall] of dirs) {
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !walls[r][c][wall] && !bfsVisited[nr][nc]) {
        bfsVisited[nr][nc] = true;
        prev[nr][nc] = [r, c];
        bfsQueue.push([nr, nc]);
      }
    }
  }

  // Draw solution
  const path: Array<[number, number]> = [];
  let cur: [number, number] | null = [endR, endC];
  while (cur) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();

  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const [r, c] = path[i];
    const px = (c + 0.5) * cellW;
    const py = (r + 0.5) * cellH;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = Math.max(1, cellW * 0.22);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

// 8. CONSTELAÇÃO — Connected star network
function renderConstelacao(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  controls: Controls,
  frame: number
) {
  const { seed, palette, connectionThreshold, animated, speed } = controls;
  const colors = PALETTES[palette];
  const rng = mulberry32(seed);
  const N = 180;
  const timeOff = frame * 0.01 * speed;

  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);

  const stars: Array<{
    x: number; y: number; r: number; color: string;
    cluster: number; twinkle: number; twinkleSpeed: number;
  }> = [];

  const numClusters = 6;
  const clusterCenters = Array.from({ length: numClusters }, () => ({
    x: 0.1 * w + rng() * 0.8 * w,
    y: 0.1 * h + rng() * 0.8 * h,
  }));

  for (let i = 0; i < N; i++) {
    const cluster = Math.floor(rng() * numClusters);
    const cc = clusterCenters[cluster];
    const spread = Math.min(w, h) * 0.12;
    stars.push({
      x: cc.x + (rng() - 0.5) * spread,
      y: cc.y + (rng() - 0.5) * spread,
      r: 1.5 + rng() * 3.5,
      color: colors[Math.floor(rng() * colors.length)],
      cluster,
      twinkle: rng() * Math.PI * 2,
      twinkleSpeed: 0.5 + rng() * 2,
    });
  }

  const thresh2 = connectionThreshold * connectionThreshold;

  // Draw connections
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 > thresh2) continue;

      const dist = Math.sqrt(dist2);
      const alpha = (1 - dist / connectionThreshold) * 0.35;
      const sameCluster = stars[i].cluster === stars[j].cluster;
      const color = sameCluster ? stars[i].color : "#ffffff";

      ctx.beginPath();
      ctx.moveTo(stars[i].x, stars[i].y);
      ctx.lineTo(stars[j].x, stars[j].y);
      ctx.strokeStyle = color + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = sameCluster ? 0.8 : 0.4;
      ctx.stroke();
    }
  }

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const twinkle = animated
      ? 0.5 + 0.5 * Math.sin(timeOff * s.twinkleSpeed + s.twinkle)
      : 1;
    const r = s.r * twinkle;

    // Glow
    const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
    grad.addColorStop(0, s.color + "cc");
    grad.addColorStop(0.5, s.color + "44");
    grad.addColorStop(1, s.color + "00");
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = twinkle;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Cluster labels (faint)
  for (const cc of clusterCenters) {
    ctx.beginPath();
    ctx.arc(cc.x, cc.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fill();
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

const ALGORITHMS: Record<AlgoKey, {
  label: string;
  description: string;
  renderer: (ctx: CanvasRenderingContext2D, w: number, h: number, c: Controls, f: number) => void;
  supportsAnimation: boolean;
  heavy: boolean;
}> = {
  Fluxo: {
    label: "Fluxo",
    description: "Campo de fluxo com ruído Perlin — 2000 partículas seguem o campo vetorial",
    renderer: renderFluxo,
    supportsAnimation: true,
    heavy: false,
  },
  Árvore: {
    label: "Árvore",
    description: "Árvore fractal com simulação de vento e folhagem sazonal",
    renderer: renderArvore,
    supportsAnimation: true,
    heavy: false,
  },
  Espiral: {
    label: "Espiral",
    description: "Filotaxia de Fibonacci — padrão de sementes de girassol com ângulo ajustável",
    renderer: renderEspiral,
    supportsAnimation: true,
    heavy: false,
  },
  Ondas: {
    label: "Ondas",
    description: "Padrão de interferência de múltiplas fontes de onda — efeito Moiré",
    renderer: renderOndas,
    supportsAnimation: true,
    heavy: true,
  },
  Galáxia: {
    label: "Galáxia",
    description: "Galáxia espiral logarítmica com nébulas, estrelas e núcleo luminoso",
    renderer: renderGalaxia,
    supportsAnimation: true,
    heavy: false,
  },
  Mosaico: {
    label: "Mosaico",
    description: "Mosaico Voronoi com gradiente de distância e bordas precisas",
    renderer: renderMosaico,
    supportsAnimation: false,
    heavy: true,
  },
  Labirinto: {
    label: "Labirinto",
    description: "Labirinto gerado por backtracker recursivo com caminho solução",
    renderer: renderLabirinto,
    supportsAnimation: false,
    heavy: false,
  },
  Constelação: {
    label: "Constelação",
    description: "Rede de estrelas conectadas por proximidade com cintilação animada",
    renderer: renderConstelacao,
    supportsAnimation: true,
    heavy: false,
  },
};

const ALGO_KEYS = Object.keys(ALGORITHMS) as AlgoKey[];

// ─── Gallery Thumbnail ────────────────────────────────────────────────────────
function GalleryThumb({
  algoKey,
  seed,
  palette,
  onClick,
}: {
  algoKey: AlgoKey;
  seed: number;
  palette: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const controls: Controls = {
      ...DEFAULT_CONTROLS,
      seed,
      palette,
      resolution: 512,
      animated: false,
    };
    ALGORITHMS[algoKey].renderer(ctx, 200, 200, controls, 0);
  }, [algoKey, seed, palette]);

  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(150,100,255,0.5)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer rounded-xl overflow-hidden border border-white/10 relative group"
    >
      <canvas ref={ref} width={200} height={200} className="w-full aspect-square block" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
        <span className="text-xs text-white font-medium">{ALGORITHMS[algoKey].label} #{seed}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GenerativeArtPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const isRenderingRef = useRef<boolean>(false);

  const [algo, setAlgo] = useState<AlgoKey>("Fluxo");
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const [seedInput, setSeedInput] = useState("42");
  const [rendering, setRendering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [galleryMode, setGalleryMode] = useState(false);
  const [galleryItems, setGalleryItems] = useState<Array<{ algoKey: AlgoKey; seed: number; palette: string }>>([]);
  const [selectedGallery, setSelectedGallery] = useState<null | { algoKey: AlgoKey; seed: number; palette: string }>(null);

  const setControl = useCallback(<K extends keyof Controls>(key: K, value: Controls[K]) => {
    setControls(prev => ({ ...prev, [key]: value }));
  }, []);

  // Draw to offscreen canvas then blit to display canvas
  const drawFrame = useCallback((frameNum: number, ctrl: Controls, algoKey: AlgoKey) => {
    const displayCanvas = canvasRef.current;
    if (!displayCanvas) return;

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
    }
    const off = offscreenRef.current;
    off.width = ctrl.resolution;
    off.height = ctrl.resolution;
    const ctx = off.getContext("2d");
    if (!ctx) return;

    ALGORITHMS[algoKey].renderer(ctx, ctrl.resolution, ctrl.resolution, ctrl, frameNum);

    // Blit to display
    const dCtx = displayCanvas.getContext("2d");
    if (!dCtx) return;
    dCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    dCtx.drawImage(off, 0, 0, displayCanvas.width, displayCanvas.height);
  }, []);

  // Render once (non-animated)
  const renderOnce = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    frameRef.current = 0;
    setRendering(true);
    setTimeout(() => {
      drawFrame(0, controls, algo);
      setRendering(false);
    }, 10);
  }, [controls, algo, drawFrame]);

  // Animation loop
  const startAnimation = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    let localFrame = frameRef.current;

    const loop = () => {
      drawFrame(localFrame, controls, algo);
      localFrame++;
      frameRef.current = localFrame;
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
  }, [controls, algo, drawFrame]);

  useEffect(() => {
    if (controls.animated && ALGORITHMS[algo].supportsAnimation) {
      startAnimation();
    } else {
      cancelAnimationFrame(animFrameRef.current);
      renderOnce();
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [algo, controls, renderOnce, startAnimation]);

  // Download full-res PNG
  const downloadPNG = useCallback(() => {
    const off = offscreenRef.current;
    if (!off) return;
    const link = document.createElement("a");
    link.download = `generative-art-${algo.toLowerCase()}-seed${controls.seed}-${controls.resolution}px.png`;
    link.href = off.toDataURL("image/png");
    link.click();
  }, [algo, controls.seed, controls.resolution]);

  // New seed
  const newSeed = useCallback(() => {
    const s = Math.floor(Math.random() * 999999);
    setControls(prev => ({ ...prev, seed: s }));
    setSeedInput(String(s));
  }, []);

  // Auto gallery
  const generateGallery = useCallback(() => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      algoKey: ALGO_KEYS[i % ALGO_KEYS.length],
      seed: Math.floor(Math.random() * 999999),
      palette: Object.keys(PALETTES)[Math.floor(Math.random() * Object.keys(PALETTES).length)],
    }));
    setGalleryItems(items);
    setGalleryMode(true);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Inter', sans-serif" }}
    >
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,10,20,0.95)", backdropFilter: "blur(12px)" }}
      >
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "#c77dff" }}>
            Arte Generativa
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "rgba(200,200,220,0.5)" }}>
            8 algoritmos · Arte de galeria gerada no browser
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateGallery}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "rgba(100,50,200,0.3)", border: "1px solid rgba(150,100,255,0.4)", color: "#c77dff" }}
          >
            Auto-Galeria
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPNG}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "rgba(100,50,200,0.15)", border: "1px solid rgba(150,100,255,0.25)", color: "#a0a0c0" }}
          >
            Download PNG
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFullscreen(f => !f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#a0a0c0" }}
          >
            {fullscreen ? "Sair" : "Tela Cheia"}
          </motion.button>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-72 flex-shrink-0 border-r border-white/10 overflow-y-auto"
          style={{ background: "rgba(12,12,22,0.9)" }}
        >
          {/* Algorithm tabs */}
          <div className="p-4 border-b border-white/10">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(200,200,220,0.4)" }}>Algoritmo</p>
            <div className="grid grid-cols-2 gap-1.5">
              {ALGO_KEYS.map(key => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAlgo(key)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                  style={{
                    background: algo === key ? "rgba(150,100,255,0.25)" : "rgba(255,255,255,0.04)",
                    border: algo === key ? "1px solid rgba(150,100,255,0.5)" : "1px solid rgba(255,255,255,0.07)",
                    color: algo === key ? "#c77dff" : "rgba(200,200,220,0.6)",
                  }}
                >
                  {ALGORITHMS[key].label}
                </motion.button>
              ))}
            </div>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(180,180,200,0.45)" }}>
              {ALGORITHMS[algo].description}
            </p>
          </div>

          {/* Seed */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,200,220,0.4)" }}>Semente</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={seedInput}
                onChange={e => {
                  setSeedInput(e.target.value);
                  const n = parseInt(e.target.value);
                  if (!isNaN(n)) setControl("seed", n);
                }}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e0e0f0",
                  outline: "none",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={newSeed}
                className="px-3 py-2 rounded-lg text-xs font-medium"
                style={{ background: "rgba(150,100,255,0.2)", border: "1px solid rgba(150,100,255,0.35)", color: "#c77dff" }}
              >
                Nova
              </motion.button>
            </div>
          </div>

          {/* Resolution */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,200,220,0.4)" }}>Resolução</p>
            <div className="flex gap-1.5">
              {([512, 1024, 2048] as Resolution[]).map(r => (
                <button
                  key={r}
                  onClick={() => setControl("resolution", r)}
                  className="flex-1 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{
                    background: controls.resolution === r ? "rgba(150,100,255,0.25)" : "rgba(255,255,255,0.04)",
                    border: controls.resolution === r ? "1px solid rgba(150,100,255,0.5)" : "1px solid rgba(255,255,255,0.07)",
                    color: controls.resolution === r ? "#c77dff" : "rgba(200,200,220,0.5)",
                  }}
                >
                  {r}px
                </button>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,200,220,0.4)" }}>Paleta</p>
            <div className="space-y-1.5">
              {Object.entries(PALETTES).map(([name, cols]) => (
                <button
                  key={name}
                  onClick={() => setControl("palette", name)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: controls.palette === name ? "rgba(150,100,255,0.15)" : "transparent",
                    border: controls.palette === name ? "1px solid rgba(150,100,255,0.35)" : "1px solid transparent",
                  }}
                >
                  <div className="flex gap-0.5 flex-1">
                    {cols.slice(1, 7).map((c, i) => (
                      <div key={i} className="flex-1 rounded-sm h-4" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: controls.palette === name ? "#c77dff" : "rgba(200,200,220,0.5)" }}>
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,200,220,0.4)" }}>Animação</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setControl("animated", !controls.animated)}
                className="w-12 h-6 rounded-full transition-all relative"
                style={{
                  background: controls.animated ? "#7b2fbe" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                disabled={!ALGORITHMS[algo].supportsAnimation}
              >
                <motion.div
                  animate={{ x: controls.animated ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-5 h-5 rounded-full"
                  style={{ background: "#e0e0ff" }}
                />
              </button>
              <span className="text-xs" style={{ color: "rgba(200,200,220,0.5)" }}>
                {controls.animated ? "Ligada" : "Desligada"}
                {!ALGORITHMS[algo].supportsAnimation && " (não disponível)"}
              </span>
            </div>
            {controls.animated && (
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: "rgba(200,200,220,0.4)" }}>Velocidade</span>
                  <span className="text-xs font-mono" style={{ color: "rgba(200,200,220,0.6)" }}>{controls.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range" min={0.1} max={5} step={0.1}
                  value={controls.speed}
                  onChange={e => setControl("speed", parseFloat(e.target.value))}
                  className="w-full accent-violet-500"
                  style={{ accentColor: "#9d4edd" }}
                />
              </div>
            )}
          </div>

          {/* Algorithm-specific controls */}
          <div className="p-4 space-y-4">
            <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,200,220,0.4)" }}>Controles Específicos</p>

            {algo === "Árvore" && (
              <div className="space-y-2">
                <p className="text-xs" style={{ color: "rgba(200,200,220,0.5)" }}>Estação</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["Primavera","Verão","Outono","Inverno"] as Season[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setControl("season", s)}
                      className="py-1.5 rounded-md text-xs transition-all"
                      style={{
                        background: controls.season === s ? "rgba(150,100,255,0.25)" : "rgba(255,255,255,0.04)",
                        border: controls.season === s ? "1px solid rgba(150,100,255,0.5)" : "1px solid rgba(255,255,255,0.07)",
                        color: controls.season === s ? "#c77dff" : "rgba(200,200,220,0.5)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {algo === "Espiral" && (
              <SliderControl
                label="Ângulo Filotaxia"
                value={controls.phyllotaxisAngle}
                min={130} max={145} step={0.001}
                onChange={v => setControl("phyllotaxisAngle", v)}
                display={v => v.toFixed(3) + "°"}
              />
            )}

            {algo === "Ondas" && (
              <SliderControl
                label="Fontes de Onda"
                value={controls.waveCount}
                min={2} max={7} step={1}
                onChange={v => setControl("waveCount", v)}
                display={v => String(v)}
              />
            )}

            {algo === "Galáxia" && (
              <>
                <SliderControl
                  label="Braços da Galáxia"
                  value={controls.galaxyArms}
                  min={2} max={8} step={1}
                  onChange={v => setControl("galaxyArms", v)}
                  display={v => String(v)}
                />
                <SliderControl
                  label="Estrelas"
                  value={controls.starCount}
                  min={1000} max={10000} step={500}
                  onChange={v => setControl("starCount", v)}
                  display={v => v.toLocaleString("pt")}
                />
              </>
            )}

            {algo === "Mosaico" && (
              <SliderControl
                label="Pontos Voronoi"
                value={controls.voronoiPoints}
                min={20} max={200} step={5}
                onChange={v => setControl("voronoiPoints", v)}
                display={v => String(v)}
              />
            )}

            {algo === "Labirinto" && (
              <SliderControl
                label="Tamanho da Grade"
                value={controls.mazeSize}
                min={8} max={50} step={1}
                onChange={v => setControl("mazeSize", v)}
                display={v => `${v}×${v}`}
              />
            )}

            {algo === "Constelação" && (
              <SliderControl
                label="Distância de Conexão"
                value={controls.connectionThreshold}
                min={50} max={300} step={10}
                onChange={v => setControl("connectionThreshold", v)}
                display={v => String(v) + "px"}
              />
            )}
          </div>
        </motion.aside>

        {/* MAIN CANVAS AREA */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Canvas container */}
          <motion.div
            layout
            className={`relative ${fullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-black/95" : ""}`}
          >
            {fullscreen && (
              <button
                onClick={() => setFullscreen(false)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white"
                style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                ✕ Fechar
              </button>
            )}
            <div
              className={`relative rounded-2xl overflow-hidden shadow-2xl ${fullscreen ? "max-h-screen max-w-screen" : ""}`}
              style={{
                boxShadow: "0 0 80px rgba(100,50,200,0.3), 0 0 40px rgba(50,0,100,0.4)",
                border: "1px solid rgba(150,100,255,0.2)",
              }}
            >
              <canvas
                ref={canvasRef}
                width={Math.min(controls.resolution, fullscreen ? 900 : 680)}
                height={Math.min(controls.resolution, fullscreen ? 900 : 680)}
                style={{
                  display: "block",
                  imageRendering: controls.resolution === 2048 ? "auto" : "crisp-edges",
                }}
              />
              {rendering && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,10,20,0.7)" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-8 h-8 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: "#9d4edd" }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Algo info bar */}
          {!fullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex gap-6 items-center"
            >
              <div className="text-center">
                <p className="text-xs" style={{ color: "rgba(200,200,220,0.35)" }}>Algoritmo</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#c77dff" }}>{algo}</p>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="text-center">
                <p className="text-xs" style={{ color: "rgba(200,200,220,0.35)" }}>Semente</p>
                <p className="text-sm font-mono font-semibold mt-0.5" style={{ color: "#e0e0f0" }}>{controls.seed}</p>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="text-center">
                <p className="text-xs" style={{ color: "rgba(200,200,220,0.35)" }}>Resolução</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#e0e0f0" }}>{controls.resolution}×{controls.resolution}</p>
              </div>
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="text-center">
                <p className="text-xs" style={{ color: "rgba(200,200,220,0.35)" }}>Paleta</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#e0e0f0" }}>{controls.palette}</p>
              </div>
              {ALGORITHMS[algo].heavy && (
                <>
                  <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <div className="text-center">
                    <p className="text-xs px-2 py-1 rounded" style={{ color: "#f48c06", background: "rgba(244,140,6,0.12)", border: "1px solid rgba(244,140,6,0.2)" }}>
                      GPU-intensivo
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* GALLERY MODAL */}
      <AnimatePresence>
        {galleryMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-3xl rounded-2xl overflow-hidden"
              style={{ background: "#0f0f1e", border: "1px solid rgba(150,100,255,0.25)" }}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "#c77dff" }}>Auto-Galeria</h2>
                  <p className="text-xs mt-1" style={{ color: "rgba(200,200,220,0.4)" }}>
                    6 artes geradas aleatoriamente — clique para visualizar em tamanho completo
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateGallery}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(150,100,255,0.2)", border: "1px solid rgba(150,100,255,0.35)", color: "#c77dff" }}
                  >
                    Regenerar
                  </motion.button>
                  <button
                    onClick={() => { setGalleryMode(false); setSelectedGallery(null); }}
                    className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white/80"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Fechar
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedGallery ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <button
                      onClick={() => setSelectedGallery(null)}
                      className="mb-4 text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(200,200,220,0.6)" }}
                    >
                      ← Voltar à galeria
                    </button>
                    <div className="rounded-xl overflow-hidden">
                      <GalleryThumb
                        algoKey={selectedGallery.algoKey}
                        seed={selectedGallery.seed}
                        palette={selectedGallery.palette}
                        onClick={() => {
                          setAlgo(selectedGallery.algoKey);
                          setControls(prev => ({ ...prev, seed: selectedGallery.seed, palette: selectedGallery.palette }));
                          setSeedInput(String(selectedGallery.seed));
                          setGalleryMode(false);
                          setSelectedGallery(null);
                        }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-center" style={{ color: "rgba(200,200,220,0.4)" }}>
                      Clique na imagem para abrir no editor
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 grid grid-cols-3 gap-4"
                  >
                    {galleryItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <GalleryThumb
                          algoKey={item.algoKey}
                          seed={item.seed}
                          palette={item.palette}
                          onClick={() => setSelectedGallery(item)}
                        />
                        <p className="text-xs mt-2 text-center" style={{ color: "rgba(200,200,220,0.35)" }}>
                          {ALGORITHMS[item.algoKey].label} · {item.palette}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reusable Slider Control ──────────────────────────────────────────────────
function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: (v: number) => string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-xs" style={{ color: "rgba(200,200,220,0.5)" }}>{label}</span>
        <span className="text-xs font-mono" style={{ color: "rgba(200,200,220,0.7)" }}>{display(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: "#9d4edd" }}
      />
    </div>
  );
}
