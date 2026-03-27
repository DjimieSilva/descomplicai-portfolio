"use client";

import { useRef, useState, useEffect, useCallback, ChangeEvent, DragEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Filters {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  sharpen: boolean;
}

interface Transform {
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  crop: CropRect | null;
}

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Preset {
  id: string;
  name: string;
  filters: Filters;
  transform?: Partial<Transform>;
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: Filters = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
  blur: 0,
  sharpen: false,
};

const DEFAULT_TRANSFORM: Transform = {
  rotation: 0,
  flipH: false,
  flipV: false,
  crop: null,
};

const PRESETS: Preset[] = [
  {
    id: "original",
    name: "Original",
    filters: { ...DEFAULT_FILTERS },
  },
  {
    id: "bw",
    name: "Preto e Branco",
    filters: { brightness: 5, contrast: 20, saturation: -100, hue: 0, blur: 0, sharpen: false },
  },
  {
    id: "sepia",
    name: "Sépia",
    filters: { brightness: 5, contrast: 10, saturation: -60, hue: 30, blur: 0, sharpen: false },
  },
  {
    id: "vintage",
    name: "Vintage",
    filters: { brightness: -10, contrast: -10, saturation: -30, hue: 15, blur: 0, sharpen: false },
  },
  {
    id: "warm",
    name: "Warm",
    filters: { brightness: 10, contrast: 5, saturation: 20, hue: -15, blur: 0, sharpen: false },
  },
  {
    id: "cool",
    name: "Cool",
    filters: { brightness: 5, contrast: 10, saturation: 10, hue: 180, blur: 0, sharpen: false },
  },
  {
    id: "dramatic",
    name: "Dramatic",
    filters: { brightness: -15, contrast: 50, saturation: 20, hue: 0, blur: 0, sharpen: true },
  },
  {
    id: "fade",
    name: "Fade",
    filters: { brightness: 20, contrast: -30, saturation: -20, hue: 0, blur: 0, sharpen: false },
  },
  {
    id: "vivid",
    name: "Vivid",
    filters: { brightness: 5, contrast: 20, saturation: 60, hue: 0, blur: 0, sharpen: true },
  },
  {
    id: "film",
    name: "Film",
    filters: { brightness: -5, contrast: 15, saturation: -15, hue: 10, blur: 0, sharpen: false },
  },
  {
    id: "night",
    name: "Night",
    filters: { brightness: -30, contrast: 30, saturation: -20, hue: 200, blur: 0, sharpen: false },
  },
  {
    id: "sunrise",
    name: "Sunrise",
    filters: { brightness: 15, contrast: 10, saturation: 40, hue: -20, blur: 0, sharpen: false },
  },
];

// ─── Pixel Manipulation ───────────────────────────────────────────────────────

function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}

function applyPixelFilters(
  imageData: ImageData,
  filters: Filters
): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const { brightness, contrast, saturation, hue, sharpen } = filters;

  const brightnessF = brightness / 100;
  const contrastF = (contrast + 100) / 100;
  const saturationF = (saturation + 100) / 100;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Brightness
    r = clamp(r + brightnessF * 255);
    g = clamp(g + brightnessF * 255);
    b = clamp(b + brightnessF * 255);

    // Contrast
    r = clamp((r - 128) * contrastF + 128);
    g = clamp((g - 128) * contrastF + 128);
    b = clamp((b - 128) * contrastF + 128);

    // Saturation via HSL-like approach
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    r = clamp(gray + saturationF * (r - gray));
    g = clamp(gray + saturationF * (g - gray));
    b = clamp(gray + saturationF * (b - gray));

    // Hue rotation (simple RGB shift approximation)
    if (hue !== 0) {
      const rad = (hue * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const nr = clamp(
        r * (0.213 + cos * 0.787 - sin * 0.213) +
        g * (0.715 - cos * 0.715 - sin * 0.715) +
        b * (0.072 - cos * 0.072 + sin * 0.928)
      );
      const ng = clamp(
        r * (0.213 - cos * 0.213 + sin * 0.143) +
        g * (0.715 + cos * 0.285 + sin * 0.140) +
        b * (0.072 - cos * 0.072 - sin * 0.283)
      );
      const nb = clamp(
        r * (0.213 - cos * 0.213 - sin * 0.787) +
        g * (0.715 - cos * 0.715 + sin * 0.715) +
        b * (0.072 + cos * 0.928 + sin * 0.072)
      );
      r = nr; g = ng; b = nb;
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  const result = new ImageData(data, imageData.width, imageData.height);

  // Sharpen via convolution
  if (sharpen) {
    return applySharpen(result);
  }

  return result;
}

function applySharpen(imageData: ImageData): ImageData {
  const src = imageData.data;
  const w = imageData.width;
  const h = imageData.height;
  const output = new Uint8ClampedArray(src.length);
  // Sharpen kernel
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = Math.min(Math.max(x + kx, 0), w - 1);
          const py = Math.min(Math.max(y + ky, 0), h - 1);
          const idx = (py * w + px) * 4;
          const ki = (ky + 1) * 3 + (kx + 1);
          r += src[idx] * kernel[ki];
          g += src[idx + 1] * kernel[ki];
          b += src[idx + 2] * kernel[ki];
        }
      }
      const oi = (y * w + x) * 4;
      output[oi] = clamp(r);
      output[oi + 1] = clamp(g);
      output[oi + 2] = clamp(b);
      output[oi + 3] = src[oi + 3];
    }
  }
  return new ImageData(output, w, h);
}

// ─── Default Image Generator ──────────────────────────────────────────────────

function generateDefaultImage(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d")!;
  const w = canvas.width;
  const h = canvas.height;

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#1a1a2e");
  grad.addColorStop(0.3, "#16213e");
  grad.addColorStop(0.6, "#0f3460");
  grad.addColorStop(1, "#533483");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative circles
  const circles = [
    { x: w * 0.2, y: h * 0.3, r: 120, color: "rgba(255,100,100,0.25)" },
    { x: w * 0.7, y: h * 0.5, r: 160, color: "rgba(100,200,255,0.2)" },
    { x: w * 0.5, y: h * 0.8, r: 100, color: "rgba(255,200,50,0.2)" },
    { x: w * 0.85, y: h * 0.15, r: 80, color: "rgba(150,255,150,0.2)" },
  ];
  circles.forEach(({ x, y, r, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 60) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
  }
  for (let j = 0; j < h; j += 60) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
  }

  // Central text
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `bold ${Math.floor(w / 14)}px system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Arrasta a tua foto", w / 2, h / 2 - 20);
  ctx.font = `${Math.floor(w / 22)}px system-ui`;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillText("ou clica para carregar", w / 2, h / 2 + 30);
}

// ─── Preset Thumbnail ─────────────────────────────────────────────────────────

function PresetThumb({
  preset,
  sourceCanvas,
  isActive,
  onClick,
}: {
  preset: Preset;
  sourceCanvas: HTMLCanvasElement | null;
  isActive: boolean;
  onClick: () => void;
}) {
  const thumbRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!thumbRef.current || !sourceCanvas) return;
    const thumb = thumbRef.current;
    const ctx = thumb.getContext("2d")!;
    const tw = thumb.width;
    const th = thumb.height;

    // Draw source scaled down
    ctx.clearRect(0, 0, tw, th);
    ctx.drawImage(sourceCanvas, 0, 0, tw, th);

    // Apply filters
    const imgData = ctx.getImageData(0, 0, tw, th);
    const filtered = applyPixelFilters(imgData, preset.filters);
    ctx.putImageData(filtered, 0, 0);

    // Blur via CSS if needed (can't do pixel-blur efficiently for thumbs)
    if (preset.filters.blur > 0) {
      thumb.style.filter = `blur(${preset.filters.blur * 0.3}px)`;
    } else {
      thumb.style.filter = "";
    }
  }, [preset, sourceCanvas]);

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 group transition-all ${
        isActive ? "opacity-100 scale-100" : "opacity-70 hover:opacity-100"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-md transition-all ${
          isActive
            ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-zinc-900"
            : "ring-1 ring-white/10 group-hover:ring-white/30"
        }`}
      >
        <canvas
          ref={thumbRef}
          width={72}
          height={72}
          className="block w-[72px] h-[72px] object-cover"
        />
        {isActive && (
          <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <span className={`text-[10px] font-medium leading-tight text-center max-w-[72px] truncate ${
        isActive ? "text-indigo-300" : "text-zinc-400 group-hover:text-zinc-200"
      }`}>
        {preset.name}
      </span>
    </button>
  );
}

// ─── Slider Component ─────────────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  unit = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">
          {value > 0 ? `+${value}` : value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 accent-indigo-500"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PhotoFilterEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const compareCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS });
  const [transform, setTransform] = useState<Transform>({ ...DEFAULT_TRANSFORM });
  const [activePreset, setActivePreset] = useState("original");
  const [isDragging, setIsDragging] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [compare, setCompare] = useState(false);
  const [comparePos, setComparePos] = useState(50);
  const [activePanel, setActivePanel] = useState<"filters" | "presets" | "transform">("presets");
  const [history, setHistory] = useState<{ filters: Filters; transform: Transform }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isCropping, setIsCropping] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [sourceForThumb, setSourceForThumb] = useState<HTMLCanvasElement | null>(null);

  // Push to history
  const pushHistory = useCallback((f: Filters, t: Transform) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      return [...next, { filters: { ...f }, transform: { ...t } }];
    });
    setHistoryIndex((i) => i + 1);
  }, [historyIndex]);

  // Render canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    if (!originalImage) {
      generateDefaultImage(canvas);
      return;
    }

    const { rotation, flipH, flipV, crop } = transform;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.translate(cx, cy);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.translate(-cx, -cy);

    if (crop) {
      ctx.drawImage(
        originalImage,
        crop.x, crop.y, crop.w, crop.h,
        0, 0, canvas.width, canvas.height
      );
    } else {
      const scale = Math.min(canvas.width / originalImage.width, canvas.height / originalImage.height);
      const dw = originalImage.width * scale;
      const dh = originalImage.height * scale;
      const dx = (canvas.width - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.drawImage(originalImage, dx, dy, dw, dh);
    }

    ctx.restore();

    // Apply pixel filters
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const filtered = applyPixelFilters(imgData, filters);
    ctx.putImageData(filtered, 0, 0);

    // CSS blur (pixel blur is slow for large canvas)
    if (filters.blur > 0) {
      canvas.style.filter = `blur(${filters.blur}px)`;
    } else {
      canvas.style.filter = "";
    }

    // Update thumbnail source
    setSourceForThumb(canvas);
  }, [originalImage, filters, transform]);

  // Render compare (original side)
  const renderCompare = useCallback(() => {
    const comp = compareCanvasRef.current;
    if (!comp || !originalImage) return;
    const ctx = comp.getContext("2d")!;
    const canvas = canvasRef.current!;
    comp.width = canvas.width;
    comp.height = canvas.height;
    const scale = Math.min(comp.width / originalImage.width, comp.height / originalImage.height);
    const dw = originalImage.width * scale;
    const dh = originalImage.height * scale;
    ctx.drawImage(originalImage, (comp.width - dw) / 2, (comp.height - dh) / 2, dw, dh);
    comp.style.filter = "";
  }, [originalImage]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  useEffect(() => {
    if (compare) renderCompare();
  }, [compare, renderCompare]);

  // Load image
  const loadImage = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setHasImage(true);
        setFilters({ ...DEFAULT_FILTERS });
        setTransform({ ...DEFAULT_TRANSFORM });
        setActivePreset("original");
        setHistory([]);
        setHistoryIndex(-1);
        setCropRect(null);
        setIsCropping(false);
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  // Drag & drop
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) loadImage(file);
  }, [loadImage]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  // Apply preset
  const applyPreset = useCallback((preset: Preset) => {
    pushHistory(filters, transform);
    setFilters({ ...preset.filters });
    setActivePreset(preset.id);
  }, [filters, transform, pushHistory]);

  // Update filter
  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setActivePreset("original");
  }, []);

  // Commit filter change to history (on mouseup)
  const commitFilter = useCallback(() => {
    pushHistory(filters, transform);
  }, [filters, transform, pushHistory]);

  // Transform actions
  const rotate90 = (dir: 1 | -1) => {
    setTransform((prev) => {
      const next = { ...prev, rotation: (prev.rotation + 90 * dir + 360) % 360 };
      pushHistory(filters, next);
      return next;
    });
  };

  const toggleFlip = (axis: "flipH" | "flipV") => {
    setTransform((prev) => {
      const next = { ...prev, [axis]: !prev[axis] };
      pushHistory(filters, next);
      return next;
    });
  };

  // Undo / Redo
  const undo = () => {
    if (historyIndex <= 0) return;
    const entry = history[historyIndex - 1];
    setFilters({ ...entry.filters });
    setTransform({ ...entry.transform });
    setHistoryIndex(historyIndex - 1);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const entry = history[historyIndex + 1];
    setFilters({ ...entry.filters });
    setTransform({ ...entry.transform });
    setHistoryIndex(historyIndex + 1);
  };

  // Reset
  const resetAll = () => {
    pushHistory(filters, transform);
    setFilters({ ...DEFAULT_FILTERS });
    setTransform({ ...DEFAULT_TRANSFORM });
    setActivePreset("original");
    setCropRect(null);
    setIsCropping(false);
  };

  // Download
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "foto-editada.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Crop canvas interaction
  const getCropCoords = (e: MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleCanvasMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isCropping) return;
    const coords = getCropCoords(e);
    setCropStart(coords);
    setCropRect(null);
  };

  const handleCanvasMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isCropping || !cropStart) return;
    const coords = getCropCoords(e);
    const canvas = canvasRef.current!;
    setCropRect({
      x: Math.min(cropStart.x, coords.x),
      y: Math.min(cropStart.y, coords.y),
      w: Math.abs(coords.x - cropStart.x),
      h: Math.abs(coords.y - cropStart.y),
    });
    // Draw overlay
    renderCanvas();
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const r = {
      x: Math.min(cropStart.x, coords.x),
      y: Math.min(cropStart.y, coords.y),
      w: Math.abs(coords.x - cropStart.x),
      h: Math.abs(coords.y - cropStart.y),
    };
    ctx.clearRect(r.x, r.y, r.w, r.h);
    ctx.strokeStyle = "rgba(99,102,241,0.9)";
    ctx.lineWidth = 2;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.restore();
  };

  const handleCanvasMouseUp = () => {
    if (!isCropping) return;
    setCropStart(null);
    if (cropRect && cropRect.w > 10 && cropRect.h > 10) {
      setTransform((prev) => {
        const next = { ...prev, crop: cropRect };
        pushHistory(filters, next);
        return next;
      });
    }
    setIsCropping(false);
  };

  // Compare drag
  const handleCompareDrag = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setComparePos(pct);
  };

  const panels = [
    { id: "presets", label: "Presets" },
    { id: "filters", label: "Ajustes" },
    { id: "transform", label: "Transformar" },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold">Editor de Fotos</h1>
            <p className="text-[10px] text-zinc-500">100% local — nada é enviado</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Desfazer"
            className="p-1.5 rounded-md hover:bg-zinc-800 disabled:opacity-30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Refazer"
            className="p-1.5 rounded-md hover:bg-zinc-800 disabled:opacity-30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
          <div className="w-px h-5 bg-zinc-700 mx-1" />
          {/* Compare toggle */}
          <button
            onClick={() => setCompare((v) => !v)}
            title="Comparar original"
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              compare ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Comparar
          </button>
          {/* Reset */}
          <button
            onClick={resetAll}
            title="Reiniciar tudo"
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            Reset
          </button>
          {/* Download */}
          <button
            onClick={download}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Canvas area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-4 min-h-[300px] md:min-h-0">
          <div
            ref={containerRef}
            className={`relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border transition-all ${
              isDragging
                ? "border-indigo-400 shadow-indigo-900/50"
                : "border-zinc-800"
            } ${isCropping ? "cursor-crosshair" : "cursor-default"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => { if (!hasImage && !isCropping) fileInputRef.current?.click(); }}
          >
            {/* Main canvas */}
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full object-contain block"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
            />

            {/* Compare overlay */}
            <AnimatePresence>
              {compare && originalImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex"
                  onMouseMove={handleCompareDrag}
                >
                  {/* Original side */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - comparePos}% 0 0)` }}
                  >
                    <canvas
                      ref={compareCanvasRef}
                      className="w-full h-full object-contain block"
                    />
                    <div className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded">
                      ORIGINAL
                    </div>
                  </div>
                  {/* Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
                    style={{ left: `${comparePos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
                      </svg>
                    </div>
                    <div className="absolute bottom-2 left-1 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded whitespace-nowrap">
                      EDITADO
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag overlay */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-indigo-950/80 border-2 border-dashed border-indigo-400 rounded-xl flex flex-col items-center justify-center gap-2"
                >
                  <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm font-semibold text-indigo-300">Larga aqui</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Crop indicator label */}
            {isCropping && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                Desenha o recorte
              </div>
            )}
          </div>

          {/* Upload button below canvas */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Carregar foto
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-zinc-600 text-xs">ou arrasta para a área acima</span>
          </div>
        </div>

        {/* Sidebar */}
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full md:w-72 bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col shrink-0"
        >
          {/* Panel tabs */}
          <div className="flex border-b border-zinc-800 shrink-0">
            {panels.map((panel) => (
              <button
                key={panel.id}
                onClick={() => setActivePanel(panel.id)}
                className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                  activePanel === panel.id
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {panel.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <AnimatePresence mode="wait">
              {/* Presets panel */}
              {activePanel === "presets" && (
                <motion.div
                  key="presets"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((preset) => (
                      <PresetThumb
                        key={preset.id}
                        preset={preset}
                        sourceCanvas={sourceForThumb}
                        isActive={activePreset === preset.id}
                        onClick={() => applyPreset(preset)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Filters panel */}
              {activePanel === "filters" && (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Slider
                    label="Brilho"
                    value={filters.brightness}
                    min={-100}
                    max={100}
                    onChange={(v) => updateFilter("brightness", v)}
                  />
                  <Slider
                    label="Contraste"
                    value={filters.contrast}
                    min={-100}
                    max={100}
                    onChange={(v) => updateFilter("contrast", v)}
                  />
                  <Slider
                    label="Saturação"
                    value={filters.saturation}
                    min={-100}
                    max={100}
                    onChange={(v) => updateFilter("saturation", v)}
                  />
                  <Slider
                    label="Matiz"
                    value={filters.hue}
                    min={0}
                    max={360}
                    onChange={(v) => updateFilter("hue", v)}
                    unit="°"
                  />
                  <Slider
                    label="Desfoque"
                    value={filters.blur}
                    min={0}
                    max={10}
                    onChange={(v) => updateFilter("blur", v)}
                    unit="px"
                  />

                  {/* Sharpen toggle */}
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-medium text-zinc-400">Nitidez</span>
                    <button
                      onClick={() => {
                        updateFilter("sharpen", !filters.sharpen);
                        commitFilter();
                      }}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        filters.sharpen ? "bg-indigo-600" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          filters.sharpen ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Commit on blur */}
                  <div
                    onMouseUp={commitFilter}
                    onTouchEnd={commitFilter}
                    className="hidden"
                  />
                </motion.div>
              )}

              {/* Transform panel */}
              {activePanel === "transform" && (
                <motion.div
                  key="transform"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Rotate buttons */}
                  <div>
                    <p className="text-xs font-medium text-zinc-400 mb-2">Rodar 90°</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => rotate90(-1)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Esq.
                      </button>
                      <button
                        onClick={() => rotate90(1)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors"
                      >
                        Dir.
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Free rotation slider */}
                  <Slider
                    label="Rotação livre"
                    value={transform.rotation}
                    min={0}
                    max={360}
                    onChange={(v) => setTransform((prev) => ({ ...prev, rotation: v }))}
                    unit="°"
                  />

                  {/* Flip buttons */}
                  <div>
                    <p className="text-xs font-medium text-zinc-400 mb-2">Espelhar</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFlip("flipH")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                          transform.flipH ? "bg-indigo-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m-12 0l4-4m-4 4l4 4m4 9H4m16 0l-4-4m4 4l-4 4" />
                        </svg>
                        Horizontal
                      </button>
                      <button
                        onClick={() => toggleFlip("flipV")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                          transform.flipV ? "bg-indigo-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Vertical
                      </button>
                    </div>
                  </div>

                  {/* Crop tool */}
                  <div>
                    <p className="text-xs font-medium text-zinc-400 mb-2">Recorte</p>
                    <button
                      onClick={() => {
                        setIsCropping((v) => !v);
                        setCropRect(null);
                      }}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isCropping ? "bg-indigo-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21v-4m0 0H3m4 0h10m4-18v4m0 0h4m-4 0H7M3 7v10m18-10v10" />
                      </svg>
                      {isCropping ? "A recortar — arrasta na foto" : "Ativar recorte"}
                    </button>
                    {transform.crop && (
                      <button
                        onClick={() => {
                          setTransform((prev) => ({ ...prev, crop: null }));
                        }}
                        className="w-full mt-1.5 py-1.5 rounded-lg bg-red-900/50 hover:bg-red-900 text-xs font-medium text-red-300 transition-colors"
                      >
                        Remover recorte
                      </button>
                    )}
                  </div>

                  {/* Current rotation display */}
                  <div className="bg-zinc-800 rounded-lg p-3 space-y-1.5 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Rotação</span>
                      <span className="text-zinc-200 font-mono">{transform.rotation}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Espelhar H</span>
                      <span className={transform.flipH ? "text-indigo-400" : "text-zinc-500"}>
                        {transform.flipH ? "Sim" : "Não"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Espelhar V</span>
                      <span className={transform.flipV ? "text-indigo-400" : "text-zinc-500"}>
                        {transform.flipV ? "Sim" : "Não"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recorte</span>
                      <span className={transform.crop ? "text-indigo-400" : "text-zinc-500"}>
                        {transform.crop ? "Ativo" : "Nenhum"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar footer: current filter values */}
          <div className="border-t border-zinc-800 px-4 py-3 shrink-0">
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              {[
                { label: "Brilho", value: filters.brightness },
                { label: "Contraste", value: filters.contrast },
                { label: "Saturação", value: filters.saturation },
                { label: "Matiz", value: filters.hue, unit: "°" },
                { label: "Desfoque", value: filters.blur, unit: "px" },
                { label: "Nitidez", value: filters.sharpen ? "On" : "Off" },
              ].map(({ label, value, unit = "" }) => (
                <div key={label}>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-wide">{label}</p>
                  <p className="text-xs font-mono text-zinc-300">
                    {typeof value === "number"
                      ? `${value > 0 ? "+" : ""}${value}${unit}`
                      : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Global slider track style */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
