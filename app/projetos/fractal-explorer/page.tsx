"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type FractalType = "mandelbrot" | "julia" | "burningship";

type ColorPalette = {
  id: string;
  label: string;
  fn: (t: number, maxIter: number) => [number, number, number];
};

type ViewState = {
  centerX: number;
  centerY: number;
  zoom: number; // pixels per unit
};

type RenderState = {
  progress: number; // 0..1
  rendering: boolean;
  pass: number; // 0 = coarse, 1 = fine
};

// ---------------------------------------------------------------------------
// COLOR PALETTES
// ---------------------------------------------------------------------------

const PALETTES: ColorPalette[] = [
  {
    id: "fogo",
    label: "Fogo",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = t * 60; // 0..60  red→yellow
      const s = 100;
      const l = 20 + t * 50;
      return [h, s, l];
    },
  },
  {
    id: "oceano",
    label: "Oceano",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = 180 + t * 60; // cyan→blue
      const s = 80 + t * 20;
      const l = 15 + t * 55;
      return [h, s, l];
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = 120 + t * 200; // green→pink
      const s = 70 + t * 30;
      const l = 20 + t * 50;
      return [h % 360, s, l];
    },
  },
  {
    id: "galaxia",
    label: "Galáxia",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = 260 + t * 120; // purple→gold
      const s = 60 + t * 40;
      const l = 10 + t * 60;
      return [h % 360, s, l];
    },
  },
  {
    id: "floresta",
    label: "Floresta",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = 80 + t * 40; // dark green→brown
      const s = 40 + t * 40;
      const l = 10 + t * 50;
      return [h % 360, s, l];
    },
  },
  {
    id: "arcoiris",
    label: "Arco-íris",
    fn: (t) => {
      if (t >= 1) return [0, 0, 0];
      const h = (t * 360 * 3) % 360;
      const s = 90;
      const l = 20 + t * 40;
      return [h, s, l];
    },
  },
];

// ---------------------------------------------------------------------------
// FRACTAL MATH
// ---------------------------------------------------------------------------

function computeMandelbrot(
  cx: number,
  cy: number,
  maxIter: number
): [number, number, number] {
  let zx = 0,
    zy = 0;
  let zx2 = 0,
    zy2 = 0;
  let iter = 0;
  while (iter < maxIter && zx2 + zy2 < 4) {
    zy = 2 * zx * zy + cy;
    zx = zx2 - zy2 + cx;
    zx2 = zx * zx;
    zy2 = zy * zy;
    iter++;
  }
  return [iter, zx2 + zy2, Math.sqrt(zx2 + zy2)];
}

function computeJulia(
  px: number,
  py: number,
  cx: number,
  cy: number,
  maxIter: number
): [number, number, number] {
  let zx = px,
    zy = py;
  let zx2 = zx * zx,
    zy2 = zy * zy;
  let iter = 0;
  while (iter < maxIter && zx2 + zy2 < 4) {
    zy = 2 * zx * zy + cy;
    zx = zx2 - zy2 + cx;
    zx2 = zx * zx;
    zy2 = zy * zy;
    iter++;
  }
  return [iter, zx2 + zy2, Math.sqrt(zx2 + zy2)];
}

function computeBurningShip(
  cx: number,
  cy: number,
  maxIter: number
): [number, number, number] {
  let zx = 0,
    zy = 0;
  let zx2 = 0,
    zy2 = 0;
  let iter = 0;
  while (iter < maxIter && zx2 + zy2 < 4) {
    zy = Math.abs(2 * zx * zy) + cy;
    zx = zx2 - zy2 + cx;
    zx2 = zx * zx;
    zy2 = zy * zy;
    iter++;
  }
  return [iter, zx2 + zy2, Math.sqrt(zx2 + zy2)];
}

// Smooth (continuous) iteration count
function smoothIter(iter: number, maxIter: number, mod: number): number {
  if (iter >= maxIter) return 1.0;
  const smooth = iter + 1 - Math.log(Math.log(Math.max(mod, 1))) / Math.LN2;
  return Math.max(0, smooth / maxIter);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

// ---------------------------------------------------------------------------
// ZOOM FORMAT
// ---------------------------------------------------------------------------

function formatZoom(zoom: number): string {
  const base = zoom / 200; // relative to initial zoom
  if (base < 1000) return `${base.toFixed(1)}×`;
  const exp = Math.floor(Math.log10(base));
  const mantissa = base / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}×10${toSuperscript(exp)}`;
}

function toSuperscript(n: number): string {
  const map: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "-": "⁻",
  };
  return String(n)
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

// ---------------------------------------------------------------------------
// INITIAL VIEWS PER FRACTAL
// ---------------------------------------------------------------------------

const INITIAL_VIEWS: Record<FractalType, ViewState> = {
  mandelbrot: { centerX: -0.5, centerY: 0, zoom: 200 },
  julia: { centerX: 0, centerY: 0, zoom: 200 },
  burningship: { centerX: -0.5, centerY: 0.5, zoom: 200 },
};

// ---------------------------------------------------------------------------
// RENDER CONFIG
// ---------------------------------------------------------------------------

const ROWS_PER_FRAME = 4; // rows rendered per animation frame (coarse pass)
const ROWS_PER_FRAME_FINE = 8; // rows rendered per animation frame (fine pass)
const COARSE_STEP = 4; // pixel step for coarse pass

// ---------------------------------------------------------------------------
// MINI-MAP DIMENSIONS
// ---------------------------------------------------------------------------

const MINIMAP_W = 120;
const MINIMAP_H = 90;

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function FractalExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  // View state
  const [view, setView] = useState<ViewState>(INITIAL_VIEWS.mandelbrot);
  const viewRef = useRef<ViewState>(INITIAL_VIEWS.mandelbrot);

  // Controls state
  const [fractalType, setFractalType] = useState<FractalType>("mandelbrot");
  const fractalTypeRef = useRef<FractalType>("mandelbrot");
  const [maxIter, setMaxIter] = useState(200);
  const maxIterRef = useRef(200);
  const [paletteId, setPaletteId] = useState("galaxia");
  const paletteIdRef = useRef("galaxia");
  const [juliaC, setJuliaC] = useState({ re: -0.7269, im: 0.1889 });
  const juliaCRef = useRef({ re: -0.7269, im: 0.1889 });

  // Render progress
  const [renderState, setRenderState] = useState<RenderState>({
    progress: 0,
    rendering: false,
    pass: 0,
  });

  // UI state
  const [controlsOpen, setControlsOpen] = useState(true);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [crosshair, setCrosshair] = useState({ px: 0, py: 0, visible: false });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const lastTouchDistRef = useRef(0);
  const lastTouchMidRef = useRef({ x: 0, y: 0 });

  // Render abort ref
  const renderIdRef = useRef(0);

  // Canvas size
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);

  // ---------------------------------------------------------------------------
  // Sync refs with state
  // ---------------------------------------------------------------------------

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    fractalTypeRef.current = fractalType;
    const newView = INITIAL_VIEWS[fractalType];
    setView(newView);
    viewRef.current = newView;
  }, [fractalType]);

  useEffect(() => {
    maxIterRef.current = maxIter;
  }, [maxIter]);

  useEffect(() => {
    paletteIdRef.current = paletteId;
  }, [paletteId]);

  useEffect(() => {
    juliaCRef.current = juliaC;
  }, [juliaC]);

  // ---------------------------------------------------------------------------
  // CANVAS SETUP + RESIZE
  // ---------------------------------------------------------------------------

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvasSizeRef.current = { w: canvas.width, h: canvas.height };

    // Offscreen canvas for double-buffering
    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    offscreenRef.current = off;
  }, []);

  useEffect(() => {
    initCanvas();
    const observer = new ResizeObserver(() => {
      initCanvas();
      triggerRender();
    });
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCanvas]);

  // ---------------------------------------------------------------------------
  // RENDER ENGINE
  // ---------------------------------------------------------------------------

  const triggerRender = useCallback(() => {
    const id = ++renderIdRef.current;
    const canvas = canvasRef.current;
    const offscreen = offscreenRef.current;
    if (!canvas || !offscreen) return;

    const ctx = canvas.getContext("2d");
    const offCtx = offscreen.getContext("2d");
    if (!ctx || !offCtx) return;

    const W = canvas.width;
    const H = canvas.height;
    offscreen.width = W;
    offscreen.height = H;

    const view = viewRef.current;
    const fractal = fractalTypeRef.current;
    const maxIt = maxIterRef.current;
    const palette = PALETTES.find((p) => p.id === paletteIdRef.current) ?? PALETTES[3];
    const jc = juliaCRef.current;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    setRenderState({ progress: 0, rendering: true, pass: 0 });

    // Coarse pass: render every COARSE_STEP pixels
    const imgCoarse = offCtx.createImageData(W, H);
    const dataCoarse = imgCoarse.data;

    let rowCoarse = 0;

    function renderCoarseChunk() {
      if (renderIdRef.current !== id) return;
      const endRow = Math.min(rowCoarse + ROWS_PER_FRAME * COARSE_STEP, H);

      for (let py = rowCoarse; py < endRow; py += COARSE_STEP) {
        for (let px = 0; px < W; px += COARSE_STEP) {
          const mx = (px - W / 2) / view.zoom + view.centerX;
          const my = (py - H / 2) / view.zoom + view.centerY;

          let iter: number, mod: number;
          if (fractal === "mandelbrot") {
            [iter, , mod] = computeMandelbrot(mx, my, maxIt);
          } else if (fractal === "julia") {
            [iter, , mod] = computeJulia(mx, my, jc.re, jc.im, maxIt);
          } else {
            [iter, , mod] = computeBurningShip(mx, my, maxIt);
          }

          const t = smoothIter(iter, maxIt, mod);
          const [h, s, l] = palette.fn(t, maxIt);
          const [r, g, b] = t >= 1 ? [0, 0, 0] : hslToRgb(h, s, l);

          // Fill the block
          for (let dy = 0; dy < COARSE_STEP && py + dy < H; dy++) {
            for (let dx = 0; dx < COARSE_STEP && px + dx < W; dx++) {
              const i = ((py + dy) * W + (px + dx)) * 4;
              dataCoarse[i] = r;
              dataCoarse[i + 1] = g;
              dataCoarse[i + 2] = b;
              dataCoarse[i + 3] = 255;
            }
          }
        }
      }

      offCtx!.putImageData(imgCoarse, 0, 0);
      ctx!.drawImage(offscreen!, 0, 0);

      rowCoarse = endRow;
      const prog = rowCoarse / H;
      setRenderState({ progress: prog * 0.5, rendering: true, pass: 0 });

      if (rowCoarse < H) {
        rafRef.current = requestAnimationFrame(renderCoarseChunk);
      } else {
        // Start fine pass
        rowFine = 0;
        rafRef.current = requestAnimationFrame(renderFineChunk);
        setRenderState({ progress: 0.5, rendering: true, pass: 1 });
      }
    }

    // Fine pass: render every pixel
    const imgFine = offCtx.createImageData(W, H);
    const dataFine = imgFine.data;
    let rowFine = 0;

    function renderFineChunk() {
      if (renderIdRef.current !== id) return;
      const endRow = Math.min(rowFine + ROWS_PER_FRAME_FINE, H);

      for (let py = rowFine; py < endRow; py++) {
        for (let px = 0; px < W; px++) {
          const mx = (px - W / 2) / view.zoom + view.centerX;
          const my = (py - H / 2) / view.zoom + view.centerY;

          let iter: number, mod: number;
          if (fractal === "mandelbrot") {
            [iter, , mod] = computeMandelbrot(mx, my, maxIt);
          } else if (fractal === "julia") {
            [iter, , mod] = computeJulia(mx, my, jc.re, jc.im, maxIt);
          } else {
            [iter, , mod] = computeBurningShip(mx, my, maxIt);
          }

          const t = smoothIter(iter, maxIt, mod);
          const [h, s, l] = palette.fn(t, maxIt);
          const [r, g, b] = t >= 1 ? [0, 0, 0] : hslToRgb(h, s, l);

          const i = (py * W + px) * 4;
          dataFine[i] = r;
          dataFine[i + 1] = g;
          dataFine[i + 2] = b;
          dataFine[i + 3] = 255;
        }
      }

      offCtx!.putImageData(imgFine, 0, 0);
      ctx!.drawImage(offscreen!, 0, 0);

      rowFine = endRow;
      const prog = 0.5 + (rowFine / H) * 0.5;
      setRenderState({ progress: prog, rendering: true, pass: 1 });

      if (rowFine < H) {
        rafRef.current = requestAnimationFrame(renderFineChunk);
      } else {
        setRenderState({ progress: 1, rendering: false, pass: 1 });
        renderMinimap(view, fractal, maxIt, palette, jc);
      }
    }

    rafRef.current = requestAnimationFrame(renderCoarseChunk);
  }, []);

  // ---------------------------------------------------------------------------
  // MINIMAP RENDERER
  // ---------------------------------------------------------------------------

  function renderMinimap(
    view: ViewState,
    fractal: FractalType,
    maxIt: number,
    palette: ColorPalette,
    jc: { re: number; im: number }
  ) {
    const mc = minimapRef.current;
    if (!mc) return;
    const mCtx = mc.getContext("2d");
    if (!mCtx) return;
    mc.width = MINIMAP_W;
    mc.height = MINIMAP_H;

    const img = mCtx.createImageData(MINIMAP_W, MINIMAP_H);
    const data = img.data;

    // Minimap shows a fixed range: -2.5..1 x -1.25..1.25
    const rangeX = 3.5;
    const rangeY = 2.5;
    const startX = -2.5;
    const startY = -1.25;

    const miniMaxIt = Math.min(maxIt, 100); // keep minimap fast

    for (let py = 0; py < MINIMAP_H; py++) {
      for (let px = 0; px < MINIMAP_W; px++) {
        const mx = startX + (px / MINIMAP_W) * rangeX;
        const my = startY + (py / MINIMAP_H) * rangeY;

        let iter: number, mod: number;
        if (fractal === "mandelbrot") {
          [iter, , mod] = computeMandelbrot(mx, my, miniMaxIt);
        } else if (fractal === "julia") {
          [iter, , mod] = computeJulia(mx, my, jc.re, jc.im, miniMaxIt);
        } else {
          [iter, , mod] = computeBurningShip(mx, my, miniMaxIt);
        }

        const t = smoothIter(iter, miniMaxIt, mod);
        const [h, s, l] = palette.fn(t, miniMaxIt);
        const [r, g, b] = t >= 1 ? [0, 0, 0] : hslToRgb(h, s, l);

        const i = (py * MINIMAP_W + px) * 4;
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      }
    }

    mCtx.putImageData(img, 0, 0);

    // Draw viewport rectangle
    const vpLeft = ((view.centerX - canvasSizeRef.current.w / (2 * view.zoom) - startX) / rangeX) * MINIMAP_W;
    const vpTop = ((view.centerY - canvasSizeRef.current.h / (2 * view.zoom) - startY) / rangeY) * MINIMAP_H;
    const vpW = (canvasSizeRef.current.w / view.zoom / rangeX) * MINIMAP_W;
    const vpH = (canvasSizeRef.current.h / view.zoom / rangeY) * MINIMAP_H;

    mCtx.strokeStyle = "rgba(255,255,255,0.8)";
    mCtx.lineWidth = 1.5;
    mCtx.strokeRect(vpLeft, vpTop, vpW, vpH);
  }

  // ---------------------------------------------------------------------------
  // TRIGGER RENDER ON STATE CHANGES
  // ---------------------------------------------------------------------------

  useEffect(() => {
    triggerRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, fractalType, maxIter, paletteId, juliaC]);

  // ---------------------------------------------------------------------------
  // COORDINATE CONVERSION
  // ---------------------------------------------------------------------------

  function canvasToMath(px: number, py: number): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const dpr = dprRef.current;
    const W = canvas.width;
    const H = canvas.height;
    const v = viewRef.current;
    return {
      x: ((px * dpr) - W / 2) / v.zoom + v.centerX,
      y: ((py * dpr) - H / 2) / v.zoom + v.centerY,
    };
  }

  // ---------------------------------------------------------------------------
  // MOUSE / TOUCH HANDLERS
  // ---------------------------------------------------------------------------

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { x, y } = canvasToMath(px, py);
    setMouseCoords({ x, y });
    setCrosshair({ px: e.clientX - rect.left, py: e.clientY - rect.top, visible: true });

    if (isDraggingRef.current) {
      const dx = (e.clientX - dragStartRef.current.x) * dprRef.current;
      const dy = (e.clientY - dragStartRef.current.y) * dprRef.current;
      const v = viewRef.current;
      const newView = {
        ...v,
        centerX: dragStartRef.current.cx - dx / v.zoom,
        centerY: dragStartRef.current.cy - dy / v.zoom,
      };
      setView(newView);
      viewRef.current = newView;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCrosshair((c) => ({ ...c, visible: false }));
    isDraggingRef.current = false;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      isDraggingRef.current = true;
      const v = viewRef.current;
      dragStartRef.current = { x: e.clientX, y: e.clientY, cx: v.centerX, cy: v.centerY };
    }
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const wasDragging = isDraggingRef.current;
      isDraggingRef.current = false;

      const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const totalDrag =
        Math.abs(e.clientX - dragStartRef.current.x) +
        Math.abs(e.clientY - dragStartRef.current.y);

      if (wasDragging && totalDrag > 5) return; // was a pan, not a click

      const { x, y } = canvasToMath(px, py);

      if (e.button === 0) {
        // zoom in
        const newView = { centerX: x, centerY: y, zoom: viewRef.current.zoom * 2 };
        setView(newView);
        viewRef.current = newView;
      } else if (e.button === 2) {
        // zoom out
        const newView = { centerX: x, centerY: y, zoom: viewRef.current.zoom * 0.5 };
        setView(newView);
        viewRef.current = newView;
      }
    },
    []
  );

  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { x, y } = canvasToMath(px, py);
    const newView = { ...viewRef.current, centerX: x, centerY: y };
    setView(newView);
    viewRef.current = newView;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { x, y } = canvasToMath(px, py);
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    const v = viewRef.current;
    const newZoom = v.zoom * factor;
    // Keep point under mouse stationary
    const newCenterX = x - (x - v.centerX) / factor;
    const newCenterY = y - (y - v.centerY) / factor;
    const newView = { centerX: newCenterX, centerY: newCenterY, zoom: newZoom };
    setView(newView);
    viewRef.current = newView;
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      isDraggingRef.current = true;
      const v = viewRef.current;
      dragStartRef.current = { x: t.clientX, y: t.clientY, cx: v.centerX, cy: v.centerY };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      lastTouchDistRef.current = dist;
      lastTouchMidRef.current = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDraggingRef.current) {
      const t = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dx = (t.clientX - dragStartRef.current.x) * dprRef.current;
      const dy = (t.clientY - dragStartRef.current.y) * dprRef.current;
      const v = viewRef.current;
      const newView = {
        ...v,
        centerX: dragStartRef.current.cx - dx / v.zoom,
        centerY: dragStartRef.current.cy - dy / v.zoom,
      };
      setView(newView);
      viewRef.current = newView;
      void rect; // suppress lint
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const mid = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };
      const factor = dist / lastTouchDistRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const { x, y } = canvasToMath(mid.x - rect.left, mid.y - rect.top);
      const v = viewRef.current;
      const newZoom = v.zoom * factor;
      const newCenterX = x - (x - v.centerX) / factor;
      const newCenterY = y - (y - v.centerY) / factor;
      const newView = { centerX: newCenterX, centerY: newCenterY, zoom: newZoom };
      setView(newView);
      viewRef.current = newView;
      lastTouchDistRef.current = dist;
      lastTouchMidRef.current = mid;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 0) {
      isDraggingRef.current = false;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // FULLSCREEN
  // ---------------------------------------------------------------------------

  const toggleFullscreen = useCallback(async () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ---------------------------------------------------------------------------
  // SCREENSHOT
  // ---------------------------------------------------------------------------

  const downloadScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `fractal-${fractalType}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [fractalType]);

  // ---------------------------------------------------------------------------
  // RESET VIEW
  // ---------------------------------------------------------------------------

  const resetView = useCallback(() => {
    const newView = INITIAL_VIEWS[fractalTypeRef.current];
    setView(newView);
    viewRef.current = newView;
  }, []);

  // ---------------------------------------------------------------------------
  // DERIVED VALUES
  // ---------------------------------------------------------------------------

  const zoomLabel = useMemo(() => formatZoom(view.zoom), [view.zoom]);

  const currentPalette = useMemo(
    () => PALETTES.find((p) => p.id === paletteId) ?? PALETTES[3],
    [paletteId]
  );

  // ---------------------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // ---------------------------------------------------------------------------

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const v = viewRef.current;
      const step = 50 / v.zoom;
      switch (e.key) {
        case "ArrowLeft":
          setView((prev) => ({ ...prev, centerX: prev.centerX - step }));
          break;
        case "ArrowRight":
          setView((prev) => ({ ...prev, centerX: prev.centerX + step }));
          break;
        case "ArrowUp":
          setView((prev) => ({ ...prev, centerY: prev.centerY - step }));
          break;
        case "ArrowDown":
          setView((prev) => ({ ...prev, centerY: prev.centerY + step }));
          break;
        case "+":
        case "=":
          setView((prev) => ({ ...prev, zoom: prev.zoom * 1.5 }));
          break;
        case "-":
          setView((prev) => ({ ...prev, zoom: prev.zoom / 1.5 }));
          break;
        case "r":
        case "R":
          resetView();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "s":
        case "S":
          downloadScreenshot();
          break;
        case "c":
        case "C":
          setControlsOpen((o) => !o);
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resetView, toggleFullscreen, downloadScreenshot]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* CANVAS                                                               */}
      {/* ------------------------------------------------------------------ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* CROSSHAIR                                                            */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {crosshair.visible && (
          <motion.div
            key="crosshair"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="pointer-events-none absolute"
            style={{ left: crosshair.px, top: crosshair.py }}
          >
            <div
              className="absolute"
              style={{
                left: -20,
                top: 0,
                width: 40,
                height: 1,
                background: "rgba(255,255,255,0.5)",
                transform: "translateY(-0.5px)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: 0,
                top: -20,
                width: 1,
                height: 40,
                background: "rgba(255,255,255,0.5)",
                transform: "translateX(-0.5px)",
              }}
            />
            <div
              className="absolute w-2 h-2 rounded-full border border-white/70"
              style={{ left: -4, top: -4, background: "transparent" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* PROGRESS BAR                                                         */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {renderState.rendering && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-50"
            style={{ height: 3 }}
          >
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #7c3aed, #db2777, #f59e0b)",
                width: `${renderState.progress * 100}%`,
                transition: "width 0.1s linear",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* TOP HUD — zoom & coords                                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div
          className="px-4 py-2 rounded-xl text-xs font-mono text-white/80 flex gap-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span>
            <span className="text-white/40 mr-1">Zoom</span>
            <span className="text-white/90">{zoomLabel}</span>
          </span>
          <span className="text-white/20">|</span>
          <span>
            <span className="text-white/40 mr-1">Re</span>
            <span className="text-white/90">{mouseCoords.x.toFixed(8)}</span>
          </span>
          <span className="text-white/20">|</span>
          <span>
            <span className="text-white/40 mr-1">Im</span>
            <span className="text-white/90">{mouseCoords.y.toFixed(8)}</span>
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MINIMAP                                                              */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="absolute bottom-4 left-4 z-40 overflow-hidden rounded-lg"
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}
      >
        <canvas
          ref={minimapRef}
          width={MINIMAP_W}
          height={MINIMAP_H}
          style={{ display: "block" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 text-center text-white/40 py-0.5"
          style={{ fontSize: 9, background: "rgba(0,0,0,0.5)" }}
        >
          Mapa Geral
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTROLS PANEL                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute top-4 right-4 z-40 w-72">
        {/* Header */}
        <button
          onClick={() => setControlsOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/90 transition-all"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: renderState.rendering
                  ? "#f59e0b"
                  : "#22c55e",
                boxShadow: renderState.rendering
                  ? "0 0 6px #f59e0b"
                  : "0 0 6px #22c55e",
              }}
            />
            Fractal Explorer
          </span>
          <motion.span
            animate={{ rotate: controlsOpen ? 180 : 0 }}
            className="text-white/40"
          >
            ▲
          </motion.span>
        </button>

        {/* Panel body */}
        <AnimatePresence>
          {controlsOpen && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden mt-2 rounded-xl text-sm text-white/80"
              style={{
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="p-4 space-y-5">

                {/* Fractal type */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    Tipo de Fractal
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["mandelbrot", "julia", "burningship"] as FractalType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFractalType(type)}
                        className="py-2 px-1 rounded-lg text-xs font-medium transition-all text-center"
                        style={{
                          background:
                            fractalType === type
                              ? "rgba(124,58,237,0.7)"
                              : "rgba(255,255,255,0.05)",
                          border:
                            fractalType === type
                              ? "1px solid rgba(124,58,237,0.8)"
                              : "1px solid rgba(255,255,255,0.06)",
                          color: fractalType === type ? "#fff" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {type === "mandelbrot"
                          ? "Mandelbrot"
                          : type === "julia"
                          ? "Julia"
                          : "Burning Ship"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Julia C sliders */}
                <AnimatePresence>
                  {fractalType === "julia" && (
                    <motion.div
                      key="julia-sliders"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-3"
                    >
                      <div>
                        <label className="flex justify-between text-xs mb-1">
                          <span className="text-white/40 uppercase tracking-widest">c.real</span>
                          <span className="font-mono text-white/70">{juliaC.re.toFixed(4)}</span>
                        </label>
                        <input
                          type="range"
                          min={-2}
                          max={2}
                          step={0.0001}
                          value={juliaC.re}
                          onChange={(e) =>
                            setJuliaC((prev) => ({ ...prev, re: parseFloat(e.target.value) }))
                          }
                          className="w-full accent-purple-500"
                          style={{ height: 4 }}
                        />
                      </div>
                      <div>
                        <label className="flex justify-between text-xs mb-1">
                          <span className="text-white/40 uppercase tracking-widest">c.imag</span>
                          <span className="font-mono text-white/70">{juliaC.im.toFixed(4)}</span>
                        </label>
                        <input
                          type="range"
                          min={-2}
                          max={2}
                          step={0.0001}
                          value={juliaC.im}
                          onChange={(e) =>
                            setJuliaC((prev) => ({ ...prev, im: parseFloat(e.target.value) }))
                          }
                          className="w-full accent-purple-500"
                          style={{ height: 4 }}
                        />
                      </div>
                      {/* Julia presets */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                          Presets Julia
                        </label>
                        <div className="grid grid-cols-2 gap-1">
                          {[
                            { label: "Espiral", re: -0.7269, im: 0.1889 },
                            { label: "Dendrite", re: 0, im: 1 },
                            { label: "Coelho", re: -0.123, im: 0.745 },
                            { label: "Basilisco", re: -0.4, im: 0.6 },
                            { label: "Cristal", re: 0.285, im: 0.01 },
                            { label: "Névoa", re: -0.8, im: 0.156 },
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              onClick={() => setJuliaC({ re: preset.re, im: preset.im })}
                              className="py-1.5 px-2 rounded-lg text-xs transition-all"
                              style={{
                                background:
                                  juliaC.re === preset.re && juliaC.im === preset.im
                                    ? "rgba(124,58,237,0.5)"
                                    : "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color:
                                  juliaC.re === preset.re && juliaC.im === preset.im
                                    ? "#fff"
                                    : "rgba(255,255,255,0.45)",
                              }}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Iteration depth */}
                <div>
                  <label className="flex justify-between text-xs mb-1">
                    <span className="text-white/40 uppercase tracking-widest">Profundidade</span>
                    <span className="font-mono text-white/70">{maxIter}</span>
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={maxIter}
                    onChange={(e) => setMaxIter(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                    style={{ height: 4 }}
                  />
                  <div className="flex justify-between text-xs text-white/20 mt-1">
                    <span>50</span>
                    <span>2000</span>
                  </div>
                </div>

                {/* Color palette */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    Paleta de Cores
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {PALETTES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPaletteId(p.id)}
                        className="py-2 px-1 rounded-lg text-xs font-medium transition-all text-center flex flex-col items-center gap-1"
                        style={{
                          background:
                            paletteId === p.id
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(255,255,255,0.04)",
                          border:
                            paletteId === p.id
                              ? "1px solid rgba(255,255,255,0.3)"
                              : "1px solid rgba(255,255,255,0.06)",
                          color: paletteId === p.id ? "#fff" : "rgba(255,255,255,0.45)",
                        }}
                      >
                        <PalettePreview palette={p} />
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <ActionButton onClick={resetView} label="Reset" icon="⟳" />
                  <ActionButton onClick={downloadScreenshot} label="Guardar" icon="↓" />
                  <ActionButton onClick={toggleFullscreen} label={isFullscreen ? "Sair" : "Ecrã"} icon="⤢" />
                </div>

                {/* Keyboard shortcuts hint */}
                <div
                  className="rounded-lg p-3 space-y-1"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="text-xs uppercase tracking-widest text-white/25 mb-2">Atalhos</p>
                  {[
                    ["Scroll / ± ", "Zoom"],
                    ["Click", "Zoom 2×"],
                    ["Click Direito", "Zoom 0.5×"],
                    ["Arrastar", "Pan"],
                    ["R", "Reset"],
                    ["S", "Guardar"],
                    ["F", "Ecrã completo"],
                    ["C", "Painel"],
                  ].map(([key, desc]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span
                        className="font-mono px-1.5 py-0.5 rounded text-white/50"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          fontSize: 10,
                        }}
                      >
                        {key}
                      </span>
                      <span className="text-white/30">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RENDERING OVERLAY (very subtle)                                     */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {renderState.rendering && (
          <motion.div
            key="rendering-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 z-40 pointer-events-none"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#f59e0b",
                  animation: "pulse 1s ease-in-out infinite",
                }}
              />
              {renderState.pass === 0 ? "Esboço…" : "Refinando…"}
              <span className="font-mono">{Math.round(renderState.progress * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* FRACTAL LABEL — bottom center                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div
          className="px-4 py-1.5 rounded-lg text-xs text-white/30 font-mono"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          {fractalType === "mandelbrot" && "Conjunto de Mandelbrot  •  z ↦ z² + c"}
          {fractalType === "julia" && `Conjunto de Julia  •  c = ${juliaC.re.toFixed(4)} + ${juliaC.im.toFixed(4)}i`}
          {fractalType === "burningship" && "Burning Ship  •  z ↦ (|Re(z)| + i|Im(z)|)² + c"}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255,255,255,0.1);
          border-radius: 9999px;
          cursor: pointer;
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7c3aed;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
          box-shadow: 0 0 6px rgba(124,58,237,0.6);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7c3aed;
          border: 2px solid rgba(255,255,255,0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function PalettePreview({ palette }: { palette: ColorPalette }) {
  const stops = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const [h, s, l] = palette.fn(t, 200);
      arr.push(`hsl(${h},${s}%,${l}%)`);
    }
    return arr.join(",");
  }, [palette]);

  return (
    <div
      className="w-full h-2 rounded-full"
      style={{ background: `linear-gradient(90deg,${stops})` }}
    />
  );
}

function ActionButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 rounded-lg text-xs transition-all active:scale-95"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.6)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLButtonElement).style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
