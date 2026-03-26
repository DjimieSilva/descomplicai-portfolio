"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   GLOBAL KEYFRAME STYLES (injected once)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @keyframes sunPulse {
    0%, 100% { box-shadow: 0 0 20px 8px rgba(255,200,50,0.6), 0 0 40px 16px rgba(255,150,0,0.3); transform: scale(1); }
    50%       { box-shadow: 0 0 30px 14px rgba(255,200,50,0.9), 0 0 60px 28px rgba(255,150,0,0.5); transform: scale(1.06); }
  }
  @keyframes waveShift {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fishSwim {
    0%   { transform: translateX(0) scaleX(1); }
    48%  { transform: translateX(180px) scaleX(1); }
    50%  { transform: translateX(180px) scaleX(-1); }
    98%  { transform: translateX(0) scaleX(-1); }
    100% { transform: translateX(0) scaleX(1); }
  }
  @keyframes bubbleFloat {
    0%   { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-80px) scale(1.3); opacity: 0; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.2; transform: scale(0.5); }
  }
  @keyframes rocketFloat {
    0%, 100% { transform: translateY(0) rotate(-30deg); }
    50%       { transform: translateY(-10px) rotate(-30deg); }
  }
  @keyframes nebulaGlow {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 0.9; }
  }
  @keyframes cloudDrift {
    0%   { transform: translateX(0); }
    100% { transform: translateX(20px); }
  }
  @keyframes treeSway {
    0%, 100% { transform: rotate(0deg); transform-origin: bottom center; }
    50%       { transform: rotate(2deg); transform-origin: bottom center; }
  }
  @keyframes moonGlow {
    0%, 100% { box-shadow: 0 0 15px 4px rgba(255,255,200,0.4); }
    50%       { box-shadow: 0 0 25px 10px rgba(255,255,200,0.7); }
  }
  @keyframes windowBlink {
    0%, 90%, 100% { opacity: 1; }
    92%            { opacity: 0.3; }
  }
  @keyframes snowCap {
    0%, 100% { filter: brightness(1); }
    50%       { filter: brightness(1.15); }
  }
  @keyframes boatBob {
    0%, 100% { transform: translateX(-50%) rotate(-1deg); }
    50%       { transform: translateX(-50%) rotate(1deg); }
  }
`;

/* ─────────────────────────────────────────────
   CSS ART PIECES
───────────────────────────────────────────── */

/* 1. PÔR DO SOL */
function PorDoSol({ animated }: { animated: boolean }) {
  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Sky gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #1a0533 0%, #6b21a8 20%, #c2410c 45%, #f97316 60%, #fbbf24 75%, #fed7aa 85%, #fde68a 100%)"
      }} />
      {/* Horizon haze */}
      <div style={{
        position: "absolute", bottom: "38%", left: 0, right: 0, height: 30,
        background: "linear-gradient(to bottom, transparent, rgba(251,191,36,0.3))"
      }} />
      {/* Sun */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: 54, height: 54, borderRadius: "50%",
        background: "radial-gradient(circle, #fff7ed, #fde68a 40%, #f97316)",
        animation: animated ? "sunPulse 3s ease-in-out infinite" : "none",
        zIndex: 3
      }} />
      {/* Water base */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
        background: "linear-gradient(to bottom, #7c2d12 0%, #1e1b4b 60%, #0f172a 100%)"
      }} />
      {/* Water reflection shimmer */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: "absolute",
          bottom: `${38 + i * 5}%`,
          left: `${38 + i * 2}%`,
          width: `${18 - i * 2}%`,
          height: 3,
          borderRadius: 2,
          background: "rgba(253,230,138,0.55)",
          transform: `scaleX(${1 - i * 0.1})`
        }} />
      ))}
      {/* Clouds */}
      <div style={{
        position: "absolute", top: "12%", left: "10%",
        animation: animated ? "cloudDrift 6s ease-in-out infinite alternate" : "none"
      }}>
        {[{ w: 50, h: 16, l: 0, t: 0 }, { w: 35, h: 14, l: 14, t: -8 }, { w: 30, h: 14, l: 28, t: -3 }].map((c, i) => (
          <div key={i} style={{
            position: "absolute", left: c.l, top: c.t,
            width: c.w, height: c.h, borderRadius: 20,
            background: "rgba(168,85,247,0.35)"
          }} />
        ))}
      </div>
      {/* Boat silhouette */}
      <div style={{
        position: "absolute", bottom: "30%", left: "50%",
        transform: "translateX(-50%)",
        animation: animated ? "boatBob 4s ease-in-out infinite" : "none",
        zIndex: 4
      }}>
        {/* Hull */}
        <div style={{
          width: 60, height: 14, background: "#1e1b4b",
          borderRadius: "0 0 30px 30px",
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)"
        }} />
        {/* Mast */}
        <div style={{
          position: "absolute", top: -36, left: "50%",
          transform: "translateX(-50%)",
          width: 3, height: 36, background: "#0f172a"
        }} />
        {/* Sail */}
        <div style={{
          position: "absolute", top: -34, left: "50%",
          width: 0, height: 0,
          borderLeft: "18px solid transparent",
          borderRight: "2px solid transparent",
          borderBottom: "28px solid rgba(253,230,138,0.7)"
        }} />
      </div>
    </div>
  );
}

const POR_DO_SOL_CODE = `/* Pôr do Sol — CSS puro com gradientes, clip-path e box-shadow */
<div style="background: linear-gradient(to bottom, #1a0533, #6b21a8, #c2410c, #fbbf24)">
  {/* Sun with animated glow */}
  <div style="
    width: 54px; height: 54px; border-radius: 50%;
    background: radial-gradient(circle, #fff7ed, #f97316);
    animation: sunPulse 3s ease-in-out infinite;
  "/>
  {/* Boat hull with clip-path */}
  <div style="
    width: 60px; height: 14px;
    background: #1e1b4b;
    clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  "/>
</div>`;

/* 2. MONTANHA */
function Montanha({ animated }: { animated: boolean }) {
  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Sky */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #0c4a6e 0%, #0369a1 35%, #7dd3fc 70%, #e0f2fe 100%)"
      }} />
      {/* Far mountains */}
      {[
        { left: -20, width: 160, height: 130, color: "#334155" },
        { left: 80, width: 180, height: 150, color: "#1e3a5f" },
        { left: 160, width: 160, height: 120, color: "#2d4a6e" },
      ].map((m, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "28%", left: m.left,
          width: 0, height: 0,
          borderLeft: `${m.width / 2}px solid transparent`,
          borderRight: `${m.width / 2}px solid transparent`,
          borderBottom: `${m.height}px solid ${m.color}`,
          zIndex: i + 1
        }} />
      ))}
      {/* Main mountain */}
      <div style={{
        position: "absolute", bottom: "28%", left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "110px solid transparent",
        borderRight: "110px solid transparent",
        borderBottom: "200px solid #475569",
        zIndex: 5
      }} />
      {/* Snow cap */}
      <div style={{
        position: "absolute", bottom: "calc(28% + 140px)", left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "42px solid transparent",
        borderRight: "42px solid transparent",
        borderBottom: "65px solid #f1f5f9",
        zIndex: 6,
        animation: animated ? "snowCap 4s ease-in-out infinite" : "none",
        filter: "drop-shadow(0 -2px 6px rgba(255,255,255,0.6))"
      }} />
      {/* Lake */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
        background: "linear-gradient(to bottom, #0369a1 0%, #0c4a6e 40%, #083344 100%)",
        zIndex: 4
      }} />
      {/* Lake reflection of mountain */}
      <div style={{
        position: "absolute", bottom: "2%", left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "60px solid transparent",
        borderRight: "60px solid transparent",
        borderTop: "80px solid rgba(71,85,105,0.4)",
        zIndex: 5
      }} />
      {/* Pine trees */}
      {[
        { l: 8, scale: 0.7 }, { l: 28, scale: 0.85 }, { l: 48, scale: 0.65 },
        { l: 225, scale: 0.8 }, { l: 248, scale: 0.7 }, { l: 265, scale: 0.9 },
      ].map((t, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "28%", left: t.l,
          zIndex: 4,
          animation: animated ? `treeSway ${2.5 + i * 0.3}s ease-in-out infinite alternate` : "none",
          transformOrigin: "bottom center"
        }}>
          {[{ w: 22, h: 28, top: 0 }, { w: 16, h: 22, top: 18 }, { w: 12, h: 18, top: 32 }].map((layer, li) => (
            <div key={li} style={{
              position: "absolute",
              bottom: layer.top,
              left: "50%",
              transform: `translateX(-50%) scale(${t.scale})`,
              width: 0, height: 0,
              borderLeft: `${layer.w / 2}px solid transparent`,
              borderRight: `${layer.w / 2}px solid transparent`,
              borderBottom: `${layer.h}px solid ${li === 0 ? "#166534" : li === 1 ? "#15803d" : "#16a34a"}`
            }} />
          ))}
        </div>
      ))}
      {/* Clouds */}
      {[{ t: "8%", l: "5%", w: 70 }, { t: "14%", l: "62%", w: 55 }].map((c, i) => (
        <div key={i} style={{
          position: "absolute", top: c.t, left: c.l,
          animation: animated ? `cloudDrift ${5 + i * 2}s ease-in-out infinite alternate` : "none"
        }}>
          {[
            { w: c.w, h: 18, l: 0, t: 0 },
            { w: c.w * 0.7, h: 22, l: c.w * 0.1, t: -10 },
            { w: c.w * 0.5, h: 18, l: c.w * 0.3, t: -5 },
          ].map((blob, bi) => (
            <div key={bi} style={{
              position: "absolute", left: blob.l, top: blob.t,
              width: blob.w, height: blob.h,
              borderRadius: 20, background: "rgba(255,255,255,0.85)"
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const MONTANHA_CODE = `/* Montanha — triângulos CSS + gradientes em camadas */
{/* Pico principal com border-trick */}
<div style="
  width: 0; height: 0;
  border-left: 110px solid transparent;
  border-right: 110px solid transparent;
  border-bottom: 200px solid #475569;
"/>
{/* Neve com glow animado */}
<div style="
  width: 0; height: 0;
  border-left: 42px solid transparent;
  border-right: 42px solid transparent;
  border-bottom: 65px solid #f1f5f9;
  animation: snowCap 4s ease-in-out infinite;
  filter: drop-shadow(0 -2px 6px rgba(255,255,255,0.6));
"/>`;

/* 3. CIDADE */
function Cidade({ animated }: { animated: boolean }) {
  const buildings = [
    { w: 38, h: 120, l: 5, windows: [3, 4] },
    { w: 30, h: 90, l: 48, windows: [2, 3] },
    { w: 45, h: 160, l: 83, windows: [4, 5] },
    { w: 35, h: 110, l: 133, windows: [3, 4] },
    { w: 50, h: 140, l: 173, windows: [4, 4] },
    { w: 30, h: 85, l: 228, windows: [2, 3] },
    { w: 40, h: 125, l: 263, windows: [3, 4] },
  ];
  const windowColors = ["#fde68a", "#fbbf24", "#60a5fa", "#34d399", "#f9a8d4", "#a78bfa", "#fb923c"];

  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Night sky */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #020617 0%, #0f172a 40%, #1e1b4b 70%, #1e293b 100%)"
      }} />
      {/* Stars */}
      {Array.from({ length: 40 }, (_, i) => ({
        x: (i * 37 + 11) % 290 + 5,
        y: (i * 53 + 7) % 120 + 5,
        s: (i % 3) + 1,
        d: (i * 0.3).toFixed(1)
      })).map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: s.x, top: s.y,
          width: s.s, height: s.s, borderRadius: "50%",
          background: "#fff",
          animation: animated ? `twinkle ${1.5 + parseFloat(s.d)}s ease-in-out infinite` : "none",
          animationDelay: `${s.d}s`
        }} />
      ))}
      {/* Moon */}
      <div style={{
        position: "absolute", top: 18, right: 28,
        width: 32, height: 32, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #fef9c3, #fde68a 60%, #fbbf24)",
        boxShadow: "0 0 15px 4px rgba(254,249,195,0.4)",
        animation: animated ? "moonGlow 4s ease-in-out infinite" : "none",
        zIndex: 2
      }}>
        {/* Moon crater detail */}
        <div style={{ position: "absolute", top: 8, left: 12, width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.12)" }} />
        <div style={{ position: "absolute", top: 16, left: 6, width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.1)" }} />
      </div>
      {/* Ground */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 22,
        background: "#0f172a", zIndex: 6
      }} />
      {/* Buildings */}
      {buildings.map((b, bi) => (
        <div key={bi} style={{
          position: "absolute", bottom: 22, left: b.l,
          width: b.w, height: b.h,
          background: `linear-gradient(to top, #1e293b, ${bi % 2 === 0 ? "#334155" : "#1e3a5f"})`,
          zIndex: 3
        }}>
          {/* Windows grid */}
          <div style={{
            position: "absolute", inset: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${b.windows[0]}, 1fr)`,
            gridTemplateRows: `repeat(${b.windows[1]}, 1fr)`,
            gap: 4
          }}>
            {Array.from({ length: b.windows[0] * b.windows[1] }, (_, wi) => (
              <div key={wi} style={{
                borderRadius: 1,
                background: Math.random() > 0.25
                  ? windowColors[(bi * b.windows[0] + wi) % windowColors.length]
                  : "rgba(0,0,0,0.6)",
                animation: animated ? `windowBlink ${3 + wi * 0.7}s ease-in-out infinite` : "none",
                animationDelay: `${wi * 0.4}s`
              }} />
            ))}
          </div>
          {/* Antenna on tall buildings */}
          {b.h > 130 && (
            <div style={{
              position: "absolute", top: -16, left: "50%",
              transform: "translateX(-50%)",
              width: 2, height: 16, background: "#94a3b8"
            }}>
              <div style={{
                position: "absolute", top: -3, left: "50%",
                transform: "translateX(-50%)",
                width: 5, height: 5, borderRadius: "50%",
                background: "#f87171",
                animation: animated ? "twinkle 1.2s ease-in-out infinite" : "none"
              }} />
            </div>
          )}
        </div>
      ))}
      {/* Street reflection */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 22,
        background: "linear-gradient(to top, #0f172a, rgba(30,27,75,0.5))",
        zIndex: 7
      }} />
    </div>
  );
}

const CIDADE_CODE = `/* Cidade — grid CSS para janelas, animações de piscar */
{/* Janela com animação aleatória */}
<div style="
  background: #fde68a;
  animation: windowBlink 3s ease-in-out infinite;
  animation-delay: 0.4s;
"/>
{/* Lua com gradiente radial */}
<div style="
  width: 32px; height: 32px; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fef9c3, #fbbf24);
  animation: moonGlow 4s ease-in-out infinite;
"/>`;

/* 4. OCEANO */
function Oceano({ animated }: { animated: boolean }) {
  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Sky */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "40%",
        background: "linear-gradient(to bottom, #0c4a6e, #0284c7, #38bdf8)"
      }} />
      {/* Deep ocean */}
      <div style={{
        position: "absolute", top: "38%", left: 0, right: 0, bottom: 0,
        background: "linear-gradient(to bottom, #0369a1 0%, #0c4a6e 30%, #082f49 70%, #020617 100%)"
      }} />
      {/* Animated wave layers */}
      {[
        { color: "rgba(56,189,248,0.7)", top: "36%", speed: "3s" },
        { color: "rgba(14,165,233,0.75)", top: "40%", speed: "4s" },
        { color: "rgba(2,132,199,0.8)", top: "44%", speed: "3.5s" },
        { color: "rgba(7,89,133,0.85)", top: "48%", speed: "5s" },
      ].map((w, i) => (
        <div key={i} style={{
          position: "absolute", top: w.top, left: 0,
          width: "200%", height: 30,
          background: w.color,
          borderRadius: "50% 50% 0 0 / 20px 20px 0 0",
          animation: animated ? `waveShift ${w.speed} linear infinite` : "none",
          animationDirection: i % 2 === 0 ? "normal" : "reverse"
        }} />
      ))}
      {/* Sun/horizon */}
      <div style={{
        position: "absolute", top: "10%", left: "50%",
        transform: "translateX(-50%)",
        width: 45, height: 45, borderRadius: "50%",
        background: "radial-gradient(circle, #fff, #fde68a 50%, #f97316)",
        boxShadow: "0 0 20px 8px rgba(253,230,138,0.5)"
      }} />
      {/* Horizon line glow */}
      <div style={{
        position: "absolute", top: "38%", left: 0, right: 0, height: 3,
        background: "linear-gradient(to right, transparent, rgba(125,211,252,0.8) 20%, rgba(255,255,255,0.9) 50%, rgba(125,211,252,0.8) 80%, transparent)"
      }} />
      {/* Fish */}
      <div style={{
        position: "absolute", top: "58%", left: 30,
        animation: animated ? "fishSwim 8s linear infinite" : "none",
        zIndex: 5
      }}>
        {/* Body */}
        <div style={{
          width: 28, height: 14, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: "linear-gradient(to right, #f97316, #fb923c)",
          position: "relative"
        }}>
          {/* Eye */}
          <div style={{
            position: "absolute", top: 3, right: 5,
            width: 4, height: 4, borderRadius: "50%",
            background: "#0f172a"
          }} />
          {/* Tail */}
          <div style={{
            position: "absolute", left: -10, top: "50%",
            transform: "translateY(-50%)",
            width: 0, height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: "12px solid #ea580c"
          }} />
        </div>
      </div>
      {/* Smaller fish */}
      <div style={{
        position: "absolute", top: "68%", left: 60,
        animation: animated ? "fishSwim 12s linear infinite reverse" : "none",
        animationDelay: "2s",
        zIndex: 5
      }}>
        <div style={{
          width: 18, height: 9, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: "linear-gradient(to right, #34d399, #6ee7b7)",
          position: "relative"
        }}>
          <div style={{ position: "absolute", top: 2, right: 3, width: 3, height: 3, borderRadius: "50%", background: "#0f172a" }} />
          <div style={{
            position: "absolute", left: -7, top: "50%", transform: "translateY(-50%)",
            width: 0, height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderRight: "8px solid #059669"
          }} />
        </div>
      </div>
      {/* Bubbles */}
      {[
        { l: 80, b: "55%", s: 8, d: "0s", dur: "3s" },
        { l: 120, b: "62%", s: 6, d: "1s", dur: "2.5s" },
        { l: 165, b: "70%", s: 10, d: "0.5s", dur: "3.5s" },
        { l: 210, b: "58%", s: 5, d: "1.5s", dur: "2.8s" },
        { l: 250, b: "65%", s: 7, d: "0.8s", dur: "3.2s" },
      ].map((bbl, i) => (
        <div key={i} style={{
          position: "absolute", bottom: bbl.b, left: bbl.l,
          width: bbl.s, height: bbl.s, borderRadius: "50%",
          border: "1.5px solid rgba(125,211,252,0.7)",
          background: "rgba(125,211,252,0.1)",
          animation: animated ? `bubbleFloat ${bbl.dur} ease-in infinite` : "none",
          animationDelay: bbl.d,
          zIndex: 4
        }} />
      ))}
      {/* Seaweed */}
      {[50, 140, 230].map((x, i) => (
        <div key={i} style={{ position: "absolute", bottom: 0, left: x, zIndex: 3 }}>
          {[0, 1, 2, 3].map(seg => (
            <div key={seg} style={{
              width: 6, height: 14,
              borderRadius: seg % 2 === 0 ? "0 6px 6px 0" : "6px 0 0 6px",
              background: `rgba(${i % 2 === 0 ? "21,128,61" : "4,120,87"},0.8)`,
              marginTop: -3
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const OCEANO_CODE = `/* Oceano — ondas animadas com border-radius, peixes com clip-path */
{/* Onda animada com waveShift */}
<div style="
  width: 200%; height: 30px;
  background: rgba(56,189,248,0.7);
  border-radius: 50% 50% 0 0 / 20px 20px 0 0;
  animation: waveShift 3s linear infinite;
"/>
{/* Peixe com border-trick para cauda */}
<div style="
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-right: 12px solid #ea580c;
  animation: fishSwim 8s linear infinite;
"/>`;

/* 5. FLORESTA */
function Floresta({ animated }: { animated: boolean }) {
  const treeLayers = [
    // Far trees (smaller, darker)
    { trees: [{ l: 0, s: 0.55 }, { l: 35, s: 0.6 }, { l: 68, s: 0.5 }, { l: 220, s: 0.58 }, { l: 252, s: 0.52 }, { l: 275, s: 0.6 }], color: "#14532d", bottom: "28%" },
    // Mid trees
    { trees: [{ l: 10, s: 0.75 }, { l: 50, s: 0.85 }, { l: 90, s: 0.7 }, { l: 180, s: 0.8 }, { l: 218, s: 0.72 }, { l: 258, s: 0.78 }], color: "#15803d", bottom: "22%" },
    // Near trees (larger, vivid)
    { trees: [{ l: -5, s: 1 }, { l: 38, s: 1.1 }, { l: 75, s: 0.95 }, { l: 170, s: 1.05 }, { l: 210, s: 0.9 }, { l: 255, s: 1 }], color: "#16a34a", bottom: "16%" },
  ];

  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Sky */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, #1e3a5f 0%, #1d4ed8 30%, #60a5fa 60%, #bae6fd 85%, #e0f2fe 100%)"
      }} />
      {/* Sun rays */}
      <div style={{
        position: "absolute", top: "8%", left: "50%",
        transform: "translateX(-50%)",
        width: 55, height: 55,
        borderRadius: "50%",
        background: "radial-gradient(circle, #fff 30%, #fde68a 60%, rgba(253,230,138,0))",
        boxShadow: "0 0 30px 15px rgba(253,230,138,0.4)"
      }} />
      {/* Ground */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(to bottom, #166534 0%, #14532d 50%, #052e16 100%)"
      }} />
      {/* Path */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 50, height: "30%",
        background: "linear-gradient(to top, #92400e 0%, #a16207 60%, rgba(161,98,7,0.3) 100%)",
        clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
        zIndex: 2
      }} />
      {/* Tree layers */}
      {treeLayers.map((layer, li) => (
        layer.trees.map((t, ti) => (
          <div key={`${li}-${ti}`} style={{
            position: "absolute", bottom: layer.bottom, left: t.l,
            zIndex: li + 3,
            animation: animated ? `treeSway ${2 + ti * 0.4}s ease-in-out infinite alternate` : "none",
            transformOrigin: "bottom center"
          }}>
            {[
              { w: 50, h: 50, bot: 0 },
              { w: 40, h: 45, bot: 30 },
              { w: 30, h: 40, bot: 58 },
              { w: 20, h: 35, bot: 82 },
            ].map((seg, si) => (
              <div key={si} style={{
                position: "absolute", bottom: seg.bot,
                left: "50%", transform: `translateX(-50%) scale(${t.s})`,
                width: 0, height: 0,
                borderLeft: `${seg.w / 2}px solid transparent`,
                borderRight: `${seg.w / 2}px solid transparent`,
                borderBottom: `${seg.h}px solid ${layer.color}`,
                filter: li === 2 ? "brightness(1.1)" : "brightness(0.85)"
              }} />
            ))}
            {/* Trunk */}
            <div style={{
              position: "absolute", bottom: -12, left: "50%",
              transform: `translateX(-50%) scaleX(${t.s})`,
              width: 8, height: 14,
              background: "#78350f"
            }} />
          </div>
        ))
      ))}
      {/* Mushrooms */}
      {[{ l: 95, b: "14%" }, { l: 150, b: "13%" }, { l: 200, b: "15%" }].map((m, i) => (
        <div key={i} style={{ position: "absolute", bottom: m.b, left: m.l, zIndex: 8 }}>
          <div style={{
            width: 18, height: 12,
            background: i === 1 ? "#dc2626" : "#92400e",
            borderRadius: "50% 50% 0 0",
            position: "relative"
          }}>
            {[3, 9, 14].map((d, di) => (
              <div key={di} style={{
                position: "absolute", top: 3, left: d,
                width: 2, height: 2, borderRadius: "50%",
                background: "rgba(255,255,255,0.8)"
              }} />
            ))}
          </div>
          <div style={{ width: 8, height: 8, background: "#fef3c7", margin: "0 auto" }} />
        </div>
      ))}
      {/* Flowers/grass */}
      {[20, 55, 110, 195, 240, 270].map((x, i) => (
        <div key={i} style={{
          position: "absolute", bottom: "14%", left: x,
          width: 3, height: 14,
          background: "#4ade80",
          zIndex: 7,
          transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`
        }}>
          <div style={{
            position: "absolute", top: -5, left: "50%",
            transform: "translateX(-50%)",
            width: 7, height: 7, borderRadius: "50%",
            background: i % 3 === 0 ? "#f9a8d4" : i % 3 === 1 ? "#fde68a" : "#a78bfa"
          }} />
        </div>
      ))}
    </div>
  );
}

const FLORESTA_CODE = `/* Floresta — triângulos sobrepostos em camadas + clip-path para trilha */
{/* Árvore com 4 camadas de triângulos */}
{[{ w: 50, h: 50, bot: 0 }, { w: 40, h: 45, bot: 30 }].map((seg) => (
  <div style="
    width: 0; height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid #16a34a;
    animation: treeSway 2s ease-in-out infinite alternate;
  "/>
))}
{/* Trilha com clip-path trapezoidal */}
<div style="
  background: linear-gradient(to top, #92400e, #a16207);
  clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
"/>`;

/* 6. ESPAÇO */
function Espaco({ animated }: { animated: boolean }) {
  const stars = Array.from({ length: 55 }, (_, i) => ({
    x: (i * 41 + 13) % 290 + 5,
    y: (i * 67 + 17) % 290 + 5,
    s: (i % 4) === 0 ? 3 : (i % 4) === 1 ? 2 : 1,
    d: ((i * 0.17) % 2).toFixed(2)
  }));

  return (
    <div style={{ width: 300, height: 300, position: "relative", overflow: "hidden", borderRadius: 4 }}>
      {/* Deep space */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, #1e1b4b 0%, #0f172a 40%, #020617 100%)"
      }} />
      {/* Nebula */}
      <div style={{
        position: "absolute", top: "15%", left: "55%",
        width: 130, height: 90,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.2) 50%, transparent 80%)",
        animation: animated ? "nebulaGlow 5s ease-in-out infinite" : "none",
        zIndex: 1
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "5%",
        width: 100, height: 70,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(244,114,182,0.25) 0%, rgba(168,85,247,0.15) 50%, transparent 80%)",
        animation: animated ? "nebulaGlow 7s ease-in-out infinite reverse" : "none",
        zIndex: 1
      }} />
      {/* Stars */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: s.x, top: s.y,
          width: s.s, height: s.s, borderRadius: "50%",
          background: s.s === 3 ? "#fde68a" : "#fff",
          animation: animated ? `twinkle ${1.5 + parseFloat(s.d)}s ease-in-out infinite` : "none",
          animationDelay: `${s.d}s`,
          zIndex: 2
        }} />
      ))}
      {/* Planet */}
      <div style={{
        position: "absolute", top: "18%", right: "12%",
        width: 75, height: 75, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%, #a78bfa, #7c3aed 50%, #4c1d95)",
        boxShadow: "inset -10px -8px 20px rgba(0,0,0,0.5), 0 0 20px 5px rgba(139,92,246,0.3)",
        zIndex: 4
      }}>
        {/* Surface stripes */}
        {[25, 40, 55].map((t, i) => (
          <div key={i} style={{
            position: "absolute", top: t, left: 5, right: 5, height: 5,
            borderRadius: 3,
            background: `rgba(${i === 0 ? "167,139,250" : i === 1 ? "196,181,253" : "124,58,237"},0.5)`
          }} />
        ))}
      </div>
      {/* Planet ring */}
      <div style={{
        position: "absolute", top: "calc(18% + 26px)", right: "calc(12% - 22px)",
        width: 119, height: 22,
        borderRadius: "50%",
        border: "5px solid rgba(167,139,250,0.4)",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid rgba(196,181,253,0.6)",
        zIndex: 3,
        transform: "rotateX(70deg)"
      }} />
      {/* Rocket */}
      <div style={{
        position: "absolute", top: "48%", left: "15%",
        transform: "rotate(-30deg)",
        animation: animated ? "rocketFloat 3s ease-in-out infinite" : "none",
        zIndex: 5
      }}>
        {/* Body */}
        <div style={{
          width: 20, height: 44,
          background: "linear-gradient(to bottom, #e2e8f0, #94a3b8)",
          borderRadius: "50% 50% 10% 10% / 30% 30% 10% 10%",
          position: "relative"
        }}>
          {/* Window */}
          <div style={{
            position: "absolute", top: 12, left: "50%",
            transform: "translateX(-50%)",
            width: 10, height: 10, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8)",
            border: "1.5px solid #cbd5e1"
          }} />
          {/* Nose cone */}
          <div style={{
            position: "absolute", top: -18, left: "50%",
            transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "20px solid #ef4444"
          }} />
          {/* Fins */}
          <div style={{
            position: "absolute", bottom: 0, left: -8,
            width: 0, height: 0,
            borderRight: "8px solid #94a3b8",
            borderTop: "16px solid transparent"
          }} />
          <div style={{
            position: "absolute", bottom: 0, right: -8,
            width: 0, height: 0,
            borderLeft: "8px solid #94a3b8",
            borderTop: "16px solid transparent"
          }} />
          {/* Flame */}
          <div style={{
            position: "absolute", bottom: -16, left: "50%",
            transform: "translateX(-50%)",
            width: 12, height: 18,
            background: "linear-gradient(to bottom, #fde68a, #f97316, rgba(239,68,68,0))",
            borderRadius: "50% 50% 80% 80% / 20% 20% 80% 80%",
            animation: animated ? "sunPulse 0.4s ease-in-out infinite" : "none"
          }} />
        </div>
      </div>
      {/* Small moon/asteroid */}
      <div style={{
        position: "absolute", top: "68%", right: "8%",
        width: 22, height: 20, borderRadius: "50% 45% 55% 48%",
        background: "radial-gradient(circle at 40% 35%, #94a3b8, #475569)",
        boxShadow: "inset -4px -3px 8px rgba(0,0,0,0.5)",
        zIndex: 3
      }}>
        <div style={{ position: "absolute", top: 5, left: 5, width: 5, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", top: 10, left: 12, width: 3, height: 3, borderRadius: "50%", background: "rgba(0,0,0,0.25)" }} />
      </div>
    </div>
  );
}

const ESPACO_CODE = `/* Espaço — planeta com anel 3D, foguete, nebulosa */
{/* Anel do planeta com rotateX */}
<div style="
  width: 119px; height: 22px;
  border-radius: 50%;
  border: 5px solid rgba(167,139,250,0.4);
  transform: rotateX(70deg);
"/>
{/* Foguete flutuando */}
<div style="
  transform: rotate(-30deg);
  animation: rocketFloat 3s ease-in-out infinite;
">
  {/* Cone: border-trick triangle */}
  <div style="
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #ef4444;
  "/>
</div>`;

/* ─────────────────────────────────────────────
   PIECE REGISTRY
───────────────────────────────────────────── */
const PIECES = [
  { id: 1, title: "Pôr do Sol", subtitle: "Gradientes + box-shadow pulsante", Component: PorDoSol, code: POR_DO_SOL_CODE, accent: "#f97316" },
  { id: 2, title: "Montanha", subtitle: "Triângulos CSS + neve animada", Component: Montanha, code: MONTANHA_CODE, accent: "#7dd3fc" },
  { id: 3, title: "Cidade", subtitle: "Grid de janelas + lua brilhante", Component: Cidade, code: CIDADE_CODE, accent: "#a78bfa" },
  { id: 4, title: "Oceano", subtitle: "Ondas animadas + peixes nadando", Component: Oceano, code: OCEANO_CODE, accent: "#34d399" },
  { id: 5, title: "Floresta", subtitle: "Camadas de triângulos + cogumelos", Component: Floresta, code: FLORESTA_CODE, accent: "#86efac" },
  { id: 6, title: "Espaço", subtitle: "Planeta 3D + foguete + nebulosa", Component: Espaco, code: ESPACO_CODE, accent: "#c084fc" },
];

/* ─────────────────────────────────────────────
   CARD COMPONENT
───────────────────────────────────────────── */
function ArtCard({
  piece,
  index,
  onExpand,
}: {
  piece: (typeof PIECES)[0];
  index: number;
  onExpand: () => void;
}) {
  const [showCode, setShowCode] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-art-card=""
      style={{
        background: "#1e293b",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? piece.accent : "rgba(255,255,255,0.08)"}`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${piece.accent}22`
          : "0 4px 16px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Art frame */}
      <div
        style={{
          padding: "16px 16px 0",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={onExpand}
        title="Ver em ecrã cheio"
      >
        <div
          style={{
            border: "3px solid white",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <piece.Component animated={hovered} />
          {/* Expand hint */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0)",
              transition: "background 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center",
              ...(hovered ? { background: "rgba(0,0,0,0.18)" } : {}),
            }}
          >
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 20,
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  letterSpacing: "0.05em",
                }}
              >
                Clique para expandir ↗
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <h3 style={{
              margin: 0, fontSize: 18, fontWeight: 700,
              color: "#f8fafc", letterSpacing: "-0.02em"
            }}>
              {piece.title}
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
              {piece.subtitle}
            </p>
          </div>
          <div style={{
            padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700,
            background: `${piece.accent}22`, color: piece.accent,
            border: `1px solid ${piece.accent}44`,
            whiteSpace: "nowrap", marginTop: 2
          }}>
            100% CSS
          </div>
        </div>

        {/* Toggle code */}
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            width: "100%",
            padding: "8px 12px",
            background: showCode ? `${piece.accent}18` : "rgba(255,255,255,0.05)",
            border: `1px solid ${showCode ? piece.accent + "55" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 8,
            color: showCode ? piece.accent : "#94a3b8",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "left" as const,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 14 }}>{showCode ? "▼" : "▶"}</span>
          Ver Código
        </button>

        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <pre style={{
                marginTop: 10, padding: "12px 14px",
                background: "#020617",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.07)",
                fontSize: 10.5,
                lineHeight: 1.6,
                color: "#86efac",
                overflowX: "auto",
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word" as const,
              }}>
                {piece.code}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FULLSCREEN MODAL
───────────────────────────────────────────── */
function FullscreenModal({
  piece,
  onClose,
}: {
  piece: (typeof PIECES)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(2,6,23,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scaled art */}
        <div style={{
          border: "4px solid white",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: `0 0 60px ${piece.accent}44, 0 20px 60px rgba(0,0,0,0.8)`,
          transform: "scale(1.4)",
          transformOrigin: "center center",
          marginBottom: 40,
        }}>
          <piece.Component animated={true} />
        </div>

        {/* Labels */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <h2 style={{
            margin: 0, fontSize: 28, fontWeight: 800,
            color: "#f8fafc", letterSpacing: "-0.03em"
          }}>
            {piece.title}
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#94a3b8" }}>
            {piece.subtitle}
          </p>
          <div style={{
            marginTop: 14, display: "inline-block",
            padding: "6px 18px", borderRadius: 30,
            background: `${piece.accent}22`,
            border: `1px solid ${piece.accent}66`,
            color: piece.accent,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
          }}>
            Feito 100% em CSS
          </div>
        </div>

        {/* Close hint */}
        <button
          onClick={onClose}
          style={{
            marginTop: 8,
            padding: "8px 20px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 20,
            color: "#94a3b8",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Fechar (Esc)
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function CSSArtGalleryPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Track visible section for nav dots
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const progress = scrollY / (docH - viewH);
      setActiveDot(Math.min(5, Math.floor(progress * 6)));
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const expandedPiece = PIECES.find((p) => p.id === expanded) ?? null;

  return (
    <>
      {/* Inject global keyframes */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#f8fafc",
        paddingBottom: 80,
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            padding: "60px 24px 48px",
          }}
        >
          <div style={{
            display: "inline-block",
            padding: "5px 14px",
            borderRadius: 20,
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
            color: "#a78bfa",
            marginBottom: 20,
            textTransform: "uppercase" as const,
          }}>
            Descomplicai · CSS Art
          </div>

          <h1 style={{
            margin: 0,
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #f8fafc 30%, #a78bfa 70%, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(167,139,250,0.3))",
          }}>
            Galeria de CSS Art 🎨
          </h1>

          <p style={{
            margin: "16px auto 0",
            maxWidth: 480,
            fontSize: 16,
            color: "#94a3b8",
            lineHeight: 1.6,
          }}>
            Seis ilustrações criadas apenas com{" "}
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>divs e CSS</span>.
            Sem imagens, sem SVG, sem canvas.
          </p>

          {/* Technique badges */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8,
            justifyContent: "center", marginTop: 20,
          }}>
            {["clip-path", "border-trick", "gradients", "animations", "box-shadow", "transforms"].map((tech) => (
              <span key={tech} style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11, color: "#cbd5e1",
                fontFamily: "monospace",
              }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {PIECES.map((piece, i) => (
            <ArtCard
              key={piece.id}
              piece={piece}
              index={i}
              onExpand={() => setExpanded(piece.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", marginTop: 60, color: "#475569", fontSize: 13 }}
        >
          Cada pixel desenhado com CSS puro ·{" "}
          <span style={{ color: "#64748b" }}>Descomplicai 2025</span>
        </motion.div>

        {/* Navigation dots */}
        <div style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 100,
        }}>
          {PIECES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                const cards = document.querySelectorAll("[data-art-card]");
                cards[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                setActiveDot(i);
              }}
              title={p.title}
              style={{
                width: activeDot === i ? 10 : 7,
                height: activeDot === i ? 10 : 7,
                borderRadius: "50%",
                background: activeDot === i ? p.accent : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
                boxShadow: activeDot === i ? `0 0 8px ${p.accent}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {expandedPiece && (
          <FullscreenModal
            piece={expandedPiece}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
