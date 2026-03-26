"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface AuroraStreak {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  rotation: number;
  createdAt: number;
}

interface AuroraStrip {
  id: number;
  top: number;        // % from top
  width: number;      // vw
  left: number;       // vw offset
  height: number;     // px
  color: string;
  opacity: number;
  duration: number;   // animation-duration (s)
  delay: number;      // animation-delay (s)
  blur: number;       // px
  skewX: number;      // deg
}

/* ─────────────────────────────────────────
   Static data (computed once outside component
   so SSR and client first render agree)
───────────────────────────────────────── */
const AURORA_COLORS = [
  "rgba(0,255,136,VAL)",    // green
  "rgba(0,221,255,VAL)",    // cyan
  "rgba(136,68,255,VAL)",   // purple
  "rgba(0,200,180,VAL)",    // teal
  "rgba(100,255,200,VAL)",  // mint
  "rgba(180,100,255,VAL)",  // violet
];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function makeStars(): Star[] {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    y: randomBetween(0, 70),
    size: randomBetween(1, 3),
    opacity: randomBetween(0.3, 1),
    duration: randomBetween(2, 6),
    delay: randomBetween(0, 5),
  }));
}

function makeAuroraStrips(): AuroraStrip[] {
  const strips: AuroraStrip[] = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    const colorTemplate =
      AURORA_COLORS[Math.floor(randomBetween(0, AURORA_COLORS.length))];
    const opVal = randomBetween(0.15, 0.55).toFixed(2);
    strips.push({
      id: i,
      top: randomBetween(5, 55),
      width: randomBetween(60, 140),
      left: randomBetween(-20, 30),
      height: randomBetween(60, 200),
      color: colorTemplate.replace("VAL", opVal),
      opacity: 1,
      duration: randomBetween(5, 18),
      delay: randomBetween(0, 10),
      blur: randomBetween(20, 70),
      skewX: randomBetween(-15, 15),
    });
  }
  return strips;
}

/* Stable references — created once at module level */
const INITIAL_STARS = makeStars();
const INITIAL_STRIPS = makeAuroraStrips();

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function AuroraBorealis() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 }); // % of viewport
  const [streaks, setStreaks] = useState<AuroraStreak[]>([]);
  const [isPainting, setIsPainting] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const paintIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streakCounter = useRef(0);

  /* Derive accent color from mouse X position */
  const accentHue = Math.round((mouse.x / 100) * 300);
  const accentColor = `hsl(${accentHue}, 100%, 70%)`;

  /* Intensity modifier: mouse Y drives glow strength */
  const intensityMod = 0.6 + (1 - mouse.y / 100) * 0.8;

  /* ── Event helpers ── */
  const getRelativePos = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return { x: 50, y: 50 };
      const rect = el.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      };
    },
    []
  );

  const spawnStreak = useCallback((x: number, y: number) => {
    const colorTemplate =
      AURORA_COLORS[Math.floor(randomBetween(0, AURORA_COLORS.length))];
    const streak: AuroraStreak = {
      id: streakCounter.current++,
      x,
      y: y - 5,
      width: randomBetween(8, 25),
      height: randomBetween(80, 220),
      color: colorTemplate.replace("VAL", randomBetween(0.5, 0.9).toFixed(2)),
      opacity: 1,
      rotation: randomBetween(-20, 20),
      createdAt: Date.now(),
    };
    setStreaks((prev) => [...prev.slice(-60), streak]); // keep max 60
  }, []);

  /* Fade-out old streaks */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStreaks((prev) =>
        prev
          .map((s) => ({
            ...s,
            opacity: Math.max(0, s.opacity - 0.015),
          }))
          .filter((s) => now - s.createdAt < 8000)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  /* Pulse intensity subtle oscillation */
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.03;
      setPulseIntensity(0.85 + Math.sin(t) * 0.15);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  /* ── Mouse handlers ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const pos = getRelativePos(e.clientX, e.clientY);
      setMouse(pos);
      if (isPainting) spawnStreak(pos.x, pos.y);
    },
    [getRelativePos, isPainting, spawnStreak]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsPainting(true);
      const pos = getRelativePos(e.clientX, e.clientY);
      spawnStreak(pos.x, pos.y);
      paintIntervalRef.current = setInterval(() => {
        const el = containerRef.current;
        if (!el) return;
      }, 80);
    },
    [getRelativePos, spawnStreak]
  );

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
    if (paintIntervalRef.current) clearInterval(paintIntervalRef.current);
  }, []);

  /* ── Touch handlers ── */
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getRelativePos(touch.clientX, touch.clientY);
      setMouse(pos);
      spawnStreak(pos.x, pos.y);
    },
    [getRelativePos, spawnStreak]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const pos = getRelativePos(touch.clientX, touch.clientY);
      setIsPainting(true);
      spawnStreak(pos.x, pos.y);
    },
    [getRelativePos, spawnStreak]
  );

  const handleTouchEnd = useCallback(() => setIsPainting(false), []);

  /* ── Render ── */
  return (
    <>
      {/* Global keyframes injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Lato:wght@300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes auroraFlow {
          0%   { transform: translateX(0%)    scaleY(1)    skewX(var(--skew)); }
          25%  { transform: translateX(8%)    scaleY(1.15) skewX(calc(var(--skew) + 5deg)); }
          50%  { transform: translateX(-5%)   scaleY(0.9)  skewX(calc(var(--skew) - 3deg)); }
          75%  { transform: translateX(10%)   scaleY(1.2)  skewX(calc(var(--skew) + 8deg)); }
          100% { transform: translateX(0%)    scaleY(1)    skewX(var(--skew)); }
        }

        @keyframes auroraFade {
          0%   { opacity: 0.1; }
          30%  { opacity: 1; }
          60%  { opacity: 0.5; }
          80%  { opacity: 0.9; }
          100% { opacity: 0.1; }
        }

        @keyframes auroraRipple {
          0%   { transform: scaleX(1)   translateY(0px); }
          33%  { transform: scaleX(1.1) translateY(-10px); }
          66%  { transform: scaleX(0.95) translateY(5px); }
          100% { transform: scaleX(1)   translateY(0px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: var(--star-op); transform: scale(1); }
          50%       { opacity: calc(var(--star-op) * 0.2); transform: scale(0.7); }
        }

        @keyframes streakFade {
          0%   { opacity: 0; transform: scaleY(0.3); }
          20%  { opacity: 1; transform: scaleY(1.1); }
          100% { opacity: 0; transform: scaleY(1); }
        }

        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,221,255,0.2); }
          50%       { text-shadow: 0 0 40px rgba(0,255,136,0.8), 0 0 100px rgba(136,68,255,0.4), 0 2px 4px rgba(0,0,0,0.5); }
        }

        @keyframes subtitleFloat {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }

        @keyframes mountainPulse {
          0%, 100% { filter: brightness(0.4) blur(0px); }
          50%       { filter: brightness(0.6) blur(0.5px); }
        }

        @keyframes cursorAurora {
          0%   { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50%  { transform: scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 0.6; }
        }

        @keyframes groundGlow {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.6; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a1a",
          overflow: "hidden",
          cursor: isPainting ? "crosshair" : "none",
          userSelect: "none",
          touchAction: "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Stars ── */}
        {INITIAL_STARS.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "white",
              // @ts-ignore CSS custom property
              "--star-op": star.opacity,
              animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ── Static aurora strips ── */}
        {INITIAL_STRIPS.map((strip) => (
          <div
            key={strip.id}
            style={{
              position: "absolute",
              top: `${strip.top}%`,
              left: `${strip.left}vw`,
              width: `${strip.width}vw`,
              height: `${strip.height}px`,
              background: strip.color,
              filter: `blur(${strip.blur}px)`,
              borderRadius: "50%",
              // @ts-ignore CSS custom property
              "--skew": `${strip.skewX}deg`,
              transform: `skewX(${strip.skewX}deg)`,
              animation: `
                auroraFlow ${strip.duration}s ${strip.delay}s ease-in-out infinite,
                auroraFade ${strip.duration * 0.8}s ${strip.delay * 0.5}s ease-in-out infinite,
                auroraRipple ${strip.duration * 1.3}s ${strip.delay * 0.3}s ease-in-out infinite
              `,
              willChange: "transform, opacity",
              pointerEvents: "none",
              mixBlendMode: "screen",
              scale: String(intensityMod),
              transition: "scale 0.5s ease",
            }}
          />
        ))}

        {/* ── Mouse-driven glow cursor ── */}
        <div
          style={{
            position: "absolute",
            left: `${mouse.x}%`,
            top: `${mouse.y}%`,
            transform: "translate(-50%, -50%)",
            width: isPainting ? "120px" : "60px",
            height: isPainting ? "120px" : "60px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)`,
            filter: "blur(8px)",
            animation: "cursorAurora 3s linear infinite",
            pointerEvents: "none",
            transition: "width 0.2s ease, height 0.2s ease",
            zIndex: 10,
          }}
        />

        {/* ── Painted streaks ── */}
        {streaks.map((streak) => (
          <div
            key={streak.id}
            style={{
              position: "absolute",
              left: `${streak.x}%`,
              top: `${streak.y}%`,
              width: `${streak.width}px`,
              height: `${streak.height}px`,
              background: streak.color,
              borderRadius: "40%",
              filter: `blur(${streak.width * 0.8}px)`,
              transform: `translateX(-50%) rotate(${streak.rotation}deg)`,
              opacity: streak.opacity,
              mixBlendMode: "screen",
              pointerEvents: "none",
              transition: "opacity 0.1s linear",
              zIndex: 8,
            }}
          />
        ))}

        {/* ── Dynamic aurora influenced by mouse position ── */}
        <div
          style={{
            position: "absolute",
            left: `${mouse.x - 30}%`,
            top: `${mouse.y - 20}%`,
            width: "70vw",
            height: "300px",
            background: `radial-gradient(ellipse at center, ${accentColor}22 0%, transparent 70%)`,
            filter: "blur(40px)",
            borderRadius: "50%",
            pointerEvents: "none",
            transition: "left 0.8s ease, top 0.8s ease, background 0.5s ease",
            mixBlendMode: "screen",
            zIndex: 5,
          }}
        />

        {/* ── Ground horizon glow ── */}
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(0,255,136,0.08) 0%, transparent 100%)",
            animation: "groundGlow 4s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 6,
          }}
        />

        {/* ── Mountain silhouette ── */}
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "280px",
            animation: "mountainPulse 8s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 20,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background ridge */}
          <path
            d="M0,300 L0,220 L60,180 L120,210 L200,140 L280,190 L340,110 L400,160 L460,90 L530,145 L600,70 L660,120 L720,55 L790,105 L850,45 L910,95 L980,30 L1040,80 L1100,50 L1160,100 L1220,65 L1290,115 L1360,80 L1440,130 L1440,300 Z"
            fill="#0d0d1e"
          />
          {/* Mid ridge */}
          <path
            d="M0,300 L0,260 L80,230 L160,250 L240,200 L320,240 L400,185 L480,220 L560,170 L640,210 L720,160 L800,200 L880,150 L960,190 L1040,165 L1120,200 L1200,175 L1280,215 L1360,190 L1440,220 L1440,300 Z"
            fill="#0a0a18"
          />
          {/* Foreground ridge */}
          <path
            d="M0,300 L0,280 L120,265 L240,275 L360,258 L480,270 L600,255 L720,268 L840,252 L960,265 L1080,250 L1200,263 L1320,255 L1440,268 L1440,300 Z"
            fill="#080810"
          />
          {/* Ground floor */}
          <rect x="0" y="290" width="1440" height="10" fill="#06060e" />
        </svg>

        {/* ── Tree silhouettes on ground ── */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            pointerEvents: "none",
            zIndex: 22,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {[
            { x: 50, h: 80 }, { x: 90, h: 65 }, { x: 130, h: 90 },
            { x: 210, h: 70 }, { x: 260, h: 85 },
            { x: 380, h: 75 }, { x: 420, h: 95 },
            { x: 560, h: 80 }, { x: 610, h: 60 },
            { x: 740, h: 90 }, { x: 790, h: 72 }, { x: 830, h: 85 },
            { x: 950, h: 78 }, { x: 1000, h: 88 },
            { x: 1100, h: 70 }, { x: 1150, h: 92 },
            { x: 1280, h: 75 }, { x: 1330, h: 85 }, { x: 1390, h: 68 },
          ].map((tree, i) => (
            <g key={i} transform={`translate(${tree.x}, ${120 - tree.h})`}>
              {/* Pine tree shape */}
              <polygon
                points={`0,${tree.h} ${tree.h * 0.35},0 ${tree.h * 0.7},${tree.h}`}
                fill="#06060d"
              />
              <polygon
                points={`${tree.h * 0.1},${tree.h * 0.55} ${tree.h * 0.35},${tree.h * 0.2} ${tree.h * 0.6},${tree.h * 0.55}`}
                fill="#07070f"
              />
            </g>
          ))}
        </svg>

        {/* ── Text overlay ── */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.08em",
              lineHeight: 1.1,
              animation: "titleGlow 4s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}
          >
            Aurora Borealis
          </h1>
          <p
            style={{
              fontFamily: "'Lato', -apple-system, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              color: "rgba(180,240,255,0.75)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginTop: "0.75rem",
              animation: "subtitleFloat 3s ease-in-out infinite",
            }}
          >
            Mova o rato para pintar o céu
          </p>
        </div>

        {/* ── Bottom hint ── */}
        <div
          style={{
            position: "absolute",
            bottom: "calc(18% + 16px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', -apple-system, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              color: "rgba(100,200,255,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              animation: "subtitleFloat 5s 1s ease-in-out infinite",
            }}
          >
            Clique e arraste para criar novas auroras
          </p>
        </div>
      </div>
    </>
  );
}
