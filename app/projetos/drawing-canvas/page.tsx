"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tool = "pencil" | "rect" | "circle" | "line" | "eraser";

interface Point {
  x: number;
  y: number;
}

interface HistoryEntry {
  imageData: ImageData;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRESET_COLORS = [
  "#1e1e1e",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
];

const MAX_HISTORY = 30;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCanvasPoint(
  canvas: HTMLCanvasElement,
  e: { clientX: number; clientY: number }
): Point {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tool state
  const [activeTool, setActiveTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#1e1e1e");
  const [brushSize, setBrushSize] = useState(4);
  const [opacity, setOpacity] = useState(1.0);
  const [fillShape, setFillShape] = useState(false);

  // Drawing state (refs to avoid stale closures in event handlers)
  const isDrawing = useRef(false);
  const startPoint = useRef<Point>({ x: 0, y: 0 });
  const lastPoint = useRef<Point>({ x: 0, y: 0 });
  const snapshotRef = useRef<ImageData | null>(null);
  const pointsBuffer = useRef<Point[]>([]);

  // History
  const history = useRef<HistoryEntry[]>([]);
  const historyIndex = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Keep latest values accessible in event handlers via refs
  const activeToolRef = useRef(activeTool);
  const colorRef = useRef(color);
  const brushSizeRef = useRef(brushSize);
  const opacityRef = useRef(opacity);
  const fillShapeRef = useRef(fillShape);

  useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { brushSizeRef.current = brushSize; }, [brushSize]);
  useEffect(() => { opacityRef.current = opacity; }, [opacity]);
  useEffect(() => { fillShapeRef.current = fillShape; }, [fillShape]);

  // ---------------------------------------------------------------------------
  // History helpers
  // ---------------------------------------------------------------------------

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Truncate redo stack
    const newHistory = history.current.slice(0, historyIndex.current + 1);
    newHistory.push({ imageData });
    if (newHistory.length > MAX_HISTORY) newHistory.shift();
    history.current = newHistory;
    historyIndex.current = newHistory.length - 1;

    setCanUndo(historyIndex.current > 0);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex.current <= 0) return;
    historyIndex.current -= 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(history.current[historyIndex.current].imageData, 0, 0);
    setCanUndo(historyIndex.current > 0);
    setCanRedo(true);
  }, []);

  const redo = useCallback(() => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(history.current[historyIndex.current].imageData, 0, 0);
    setCanUndo(true);
    setCanRedo(historyIndex.current < history.current.length - 1);
  }, []);

  // ---------------------------------------------------------------------------
  // Canvas init — white background + save initial state
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to its CSS rendered size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 1200;
    canvas.height = rect.height || 700;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save blank state as first history entry
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    history.current = [{ imageData }];
    historyIndex.current = 0;
    setCanUndo(false);
    setCanRedo(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Drawing context setup
  // ---------------------------------------------------------------------------

  const setupCtx = useCallback(
    (ctx: CanvasRenderingContext2D, tool: Tool) => {
      ctx.globalAlpha = opacityRef.current;
      ctx.lineWidth = brushSizeRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = colorRef.current;
        ctx.fillStyle = colorRef.current;
      }
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Draw shape preview (rect, circle, line) on top of snapshot
  // ---------------------------------------------------------------------------

  const drawShapePreview = useCallback(
    (current: Point) => {
      const canvas = canvasRef.current;
      if (!canvas || !snapshotRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Restore to snapshot before drawing preview
      ctx.putImageData(snapshotRef.current, 0, 0);

      const tool = activeToolRef.current;
      setupCtx(ctx, tool);

      const sx = startPoint.current.x;
      const sy = startPoint.current.y;

      ctx.beginPath();
      if (tool === "rect") {
        const w = current.x - sx;
        const h = current.y - sy;
        if (fillShapeRef.current) {
          ctx.fillRect(sx, sy, w, h);
        } else {
          ctx.strokeRect(sx, sy, w, h);
        }
      } else if (tool === "circle") {
        const rx = Math.abs(current.x - sx) / 2;
        const ry = Math.abs(current.y - sy) / 2;
        const cx = sx + (current.x - sx) / 2;
        const cy = sy + (current.y - sy) / 2;
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        if (fillShapeRef.current) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      } else if (tool === "line") {
        ctx.moveTo(sx, sy);
        ctx.lineTo(current.x, current.y);
        ctx.stroke();
      }
    },
    [setupCtx]
  );

  // ---------------------------------------------------------------------------
  // Freehand drawing with quadraticCurveTo for smooth lines
  // ---------------------------------------------------------------------------

  const drawFreehand = useCallback(
    (current: Point) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setupCtx(ctx, activeToolRef.current);

      pointsBuffer.current.push(current);

      if (pointsBuffer.current.length < 3) {
        // Not enough points yet — just draw a dot
        ctx.beginPath();
        ctx.arc(current.x, current.y, brushSizeRef.current / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }

      const pts = pointsBuffer.current;
      const len = pts.length;

      ctx.beginPath();
      ctx.moveTo(
        (pts[len - 3].x + pts[len - 2].x) / 2,
        (pts[len - 3].y + pts[len - 2].y) / 2
      );
      ctx.quadraticCurveTo(
        pts[len - 2].x,
        pts[len - 2].y,
        (pts[len - 2].x + pts[len - 1].x) / 2,
        (pts[len - 2].y + pts[len - 1].y) / 2
      );
      ctx.stroke();

      lastPoint.current = current;
    },
    [setupCtx]
  );

  // ---------------------------------------------------------------------------
  // Clear
  // ---------------------------------------------------------------------------

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, [saveState]);

  // ---------------------------------------------------------------------------
  // Download
  // ---------------------------------------------------------------------------

  const downloadPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "quadro-de-desenho.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  // ---------------------------------------------------------------------------
  // Pointer start
  // ---------------------------------------------------------------------------

  const handlePointerStart = useCallback(
    (point: Point) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      isDrawing.current = true;
      startPoint.current = point;
      lastPoint.current = point;
      pointsBuffer.current = [point];

      const tool = activeToolRef.current;

      if (tool === "rect" || tool === "circle" || tool === "line") {
        // Save snapshot for live preview
        snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } else {
        // pencil / eraser: draw start dot
        setupCtx(ctx, tool);
        ctx.beginPath();
        ctx.arc(point.x, point.y, brushSizeRef.current / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [setupCtx]
  );

  // ---------------------------------------------------------------------------
  // Pointer move
  // ---------------------------------------------------------------------------

  const handlePointerMove = useCallback(
    (point: Point) => {
      if (!isDrawing.current) return;
      const tool = activeToolRef.current;
      if (tool === "pencil" || tool === "eraser") {
        drawFreehand(point);
      } else {
        drawShapePreview(point);
      }
    },
    [drawFreehand, drawShapePreview]
  );

  // ---------------------------------------------------------------------------
  // Pointer end
  // ---------------------------------------------------------------------------

  const handlePointerEnd = useCallback(
    (point?: Point) => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      const tool = activeToolRef.current;
      if ((tool === "rect" || tool === "circle" || tool === "line") && point) {
        drawShapePreview(point);
      }
      snapshotRef.current = null;
      pointsBuffer.current = [];
      saveState();
    },
    [drawShapePreview, saveState]
  );

  // ---------------------------------------------------------------------------
  // Mouse events
  // ---------------------------------------------------------------------------

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pt = getCanvasPoint(canvas, e.nativeEvent);
      handlePointerStart(pt);
    },
    [handlePointerStart]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pt = getCanvasPoint(canvas, e.nativeEvent);
      handlePointerMove(pt);
    },
    [handlePointerMove]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const pt = getCanvasPoint(canvas, e.nativeEvent);
      handlePointerEnd(pt);
    },
    [handlePointerEnd]
  );

  const onMouseLeave = useCallback(() => {
    if (isDrawing.current) handlePointerEnd();
  }, [handlePointerEnd]);

  // ---------------------------------------------------------------------------
  // Touch events
  // ---------------------------------------------------------------------------

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const pt = getCanvasPoint(canvas, e.touches[0]);
      handlePointerStart(pt);
    },
    [handlePointerStart]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const pt = getCanvasPoint(canvas, e.touches[0]);
      handlePointerMove(pt);
    },
    [handlePointerMove]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const touch = e.changedTouches[0];
      const pt = touch ? getCanvasPoint(canvas, touch) : undefined;
      handlePointerEnd(pt);
    },
    [handlePointerEnd]
  );

  // ---------------------------------------------------------------------------
  // Keyboard shortcuts
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMeta = e.ctrlKey || e.metaKey;
      if (isMeta && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (isMeta && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  // ---------------------------------------------------------------------------
  // Cursor style
  // ---------------------------------------------------------------------------

  const cursorStyle =
    activeTool === "eraser"
      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='white' stroke='%23999' stroke-width='2'/%3E%3C/svg%3E\") 12 12, crosshair"
      : "crosshair";

  // ---------------------------------------------------------------------------
  // Tool buttons definition
  // ---------------------------------------------------------------------------

  const tools: { id: Tool; label: string; icon: string }[] = [
    { id: "pencil", label: "Lápis", icon: "✏️" },
    { id: "rect", label: "Retângulo", icon: "🔲" },
    { id: "circle", label: "Círculo", icon: "⭕" },
    { id: "line", label: "Linha reta", icon: "➖" },
    { id: "eraser", label: "Borracha", icon: "🧹" },
  ];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f5f5f5",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* TOOLBAR                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          zIndex: 10,
        }}
      >
        {/* Title */}
        <span
          style={{
            fontWeight: 700,
            fontSize: "17px",
            color: "#1e1e1e",
            whiteSpace: "nowrap",
            marginRight: "4px",
          }}
        >
          Quadro de Desenho ✏️
        </span>

        <Divider />

        {/* Tool buttons */}
        <div style={{ display: "flex", gap: "4px" }}>
          {tools.map((t) => (
            <button
              key={t.id}
              title={t.label}
              onClick={() => setActiveTool(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                borderRadius: "8px",
                border: activeTool === t.id ? "2px solid #8b5cf6" : "2px solid transparent",
                background: activeTool === t.id ? "#f3f0ff" : "#f9fafb",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeTool === t.id ? 600 : 400,
                color: activeTool === t.id ? "#8b5cf6" : "#374151",
                transition: "all 0.15s ease",
              }}
            >
              <span>{t.icon}</span>
              <span
                style={{
                  display: "none",
                  // Show on wider screens via media-free approach — label always visible
                }}
                className="tool-label"
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>

        <Divider />

        {/* Clear */}
        <button
          title="Limpar tudo"
          onClick={clearCanvas}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "2px solid transparent",
            background: "#fef2f2",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.borderColor = "#ef4444")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.borderColor = "transparent")
          }
        >
          🗑️ Limpar
        </button>

        <Divider />

        {/* Color presets */}
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              title={c}
              onClick={() => setColor(c)}
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: c,
                border: color === c ? "3px solid #8b5cf6" : "2px solid #d1d5db",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "transform 0.1s ease",
                transform: color === c ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
          {/* Custom color */}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Cor personalizada"
            style={{
              width: "28px",
              height: "28px",
              border: "2px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "1px",
              background: "transparent",
            }}
          />
        </div>

        <Divider />

        {/* Brush size */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" }}>
            Tamanho
          </span>
          <input
            type="range"
            min={1}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: "80px", accentColor: "#8b5cf6" }}
          />
          <span
            style={{
              minWidth: "24px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: 600,
              color: "#8b5cf6",
            }}
          >
            {brushSize}
          </span>
        </div>

        <Divider />

        {/* Opacity */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" }}>
            Opacidade
          </span>
          <input
            type="range"
            min={10}
            max={100}
            value={Math.round(opacity * 100)}
            onChange={(e) => setOpacity(Number(e.target.value) / 100)}
            style={{ width: "70px", accentColor: "#8b5cf6" }}
          />
          <span
            style={{
              minWidth: "32px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: 600,
              color: "#8b5cf6",
            }}
          >
            {Math.round(opacity * 100)}%
          </span>
        </div>

        <Divider />

        {/* Fill toggle — only relevant for shapes */}
        <button
          title="Alternar preenchimento das formas"
          onClick={() => setFillShape((v) => !v)}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: fillShape ? "2px solid #8b5cf6" : "2px solid #d1d5db",
            background: fillShape ? "#f3f0ff" : "#f9fafb",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            color: fillShape ? "#8b5cf6" : "#374151",
            whiteSpace: "nowrap",
            transition: "all 0.15s ease",
          }}
        >
          {fillShape ? "⬛ Preenchido" : "⬜ Contorno"}
        </button>

        <Divider />

        {/* Undo / Redo */}
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Desfazer (Ctrl+Z)"
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "2px solid transparent",
              background: canUndo ? "#f9fafb" : "#f3f4f6",
              cursor: canUndo ? "pointer" : "not-allowed",
              fontSize: "14px",
              color: canUndo ? "#374151" : "#9ca3af",
              transition: "all 0.15s ease",
            }}
          >
            ↩️ Desfazer
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Refazer (Ctrl+Y)"
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "2px solid transparent",
              background: canRedo ? "#f9fafb" : "#f3f4f6",
              cursor: canRedo ? "pointer" : "not-allowed",
              fontSize: "14px",
              color: canRedo ? "#374151" : "#9ca3af",
              transition: "all 0.15s ease",
            }}
          >
            ↪️ Refazer
          </button>
        </div>

        <Divider />

        {/* Download */}
        <button
          onClick={downloadPNG}
          title="Guardar como PNG"
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#8b5cf6",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#7c3aed")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#8b5cf6")
          }
        >
          ⬇️ Guardar PNG
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CANVAS AREA                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          // Subtle dot grid background
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundColor: "#f9fafb",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            cursor: cursorStyle,
            touchAction: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Divider helper
// ---------------------------------------------------------------------------

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "28px",
        background: "#e5e7eb",
        flexShrink: 0,
      }}
    />
  );
}
