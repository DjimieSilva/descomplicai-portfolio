"use client";

import { useState, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type WeatherKey = "sol" | "chuva" | "neve" | "poente" | "trovoada" | "arcoiris";

interface WeatherConfig {
  label: string;
  emoji: string;
  temp: number;
  description: string;
  skyDay: string;
  skyNight: string;
  groundDay: string;
  groundNight: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

/* ─────────────────────────────────────────
   Weather config
───────────────────────────────────────── */
const WEATHER: Record<WeatherKey, WeatherConfig> = {
  sol: {
    label: "Sol",
    emoji: "☀️",
    temp: 28,
    description: "Dia perfeito para um passeio! ☀️",
    skyDay: "linear-gradient(180deg, #fef08a 0%, #fbbf24 60%, #f97316 100%)",
    skyNight: "linear-gradient(180deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)",
    groundDay: "#15803d",
    groundNight: "#052e16",
  },
  chuva: {
    label: "Chuva",
    emoji: "🌧️",
    temp: 15,
    description: "Dia para ficar em casa com chá. 🌧️",
    skyDay: "linear-gradient(180deg, #374151 0%, #6b7280 60%, #9ca3af 100%)",
    skyNight: "linear-gradient(180deg, #111827 0%, #1f2937 60%, #374151 100%)",
    groundDay: "#374151",
    groundNight: "#0f172a",
  },
  neve: {
    label: "Neve",
    emoji: "❄️",
    temp: -2,
    description: "Neve fresca a cobrir tudo! ❄️",
    skyDay: "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 60%, #93c5fd 100%)",
    skyNight: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
    groundDay: "#e0f2fe",
    groundNight: "#0c1a2e",
  },
  poente: {
    label: "Pôr do sol",
    emoji: "🌅",
    temp: 20,
    description: "Que pôr do sol deslumbrante! 🌅",
    skyDay: "linear-gradient(180deg, #7c3aed 0%, #fb923c 45%, #ec4899 75%, #fbbf24 100%)",
    skyNight: "linear-gradient(180deg, #0f0a1e 0%, #1a0533 50%, #2d0066 100%)",
    groundDay: "#1c1917",
    groundNight: "#0c0a09",
  },
  trovoada: {
    label: "Trovoada",
    emoji: "⛈️",
    temp: 12,
    description: "Tempestade! Fica seguro em casa. ⛈️",
    skyDay: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    skyNight: "linear-gradient(180deg, #020617 0%, #0f172a 60%, #1e293b 100%)",
    groundDay: "#1e293b",
    groundNight: "#020617",
  },
  arcoiris: {
    label: "Arco-íris",
    emoji: "🌈",
    temp: 18,
    description: "Depois da chuva, o arco-íris! 🌈",
    skyDay: "linear-gradient(180deg, #7dd3fc 0%, #bae6fd 50%, #e0f2fe 100%)",
    skyNight: "linear-gradient(180deg, #0c1a2e 0%, #1e3a5f 60%, #0e7490 100%)",
    groundDay: "#166534",
    groundNight: "#052e16",
  },
};

/* ─────────────────────────────────────────
   Particle factories (stable references)
───────────────────────────────────────── */
function makeRaindrops(): Particle[] {
  return Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -20,
    size: 1 + Math.random() * 2,
    duration: 0.4 + Math.random() * 0.6,
    delay: Math.random() * 2,
    drift: -2 + Math.random() * 4,
    opacity: 0.5 + Math.random() * 0.5,
  }));
}

function makeSnowflakes(): Particle[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -10,
    size: 3 + Math.random() * 6,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    drift: -15 + Math.random() * 30,
    opacity: 0.6 + Math.random() * 0.4,
  }));
}

function makeHeavyRain(): Particle[] {
  return Array.from({ length: 55 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -20,
    size: 1 + Math.random() * 1.5,
    duration: 0.25 + Math.random() * 0.35,
    delay: Math.random() * 1.5,
    drift: -5 + Math.random() * 10,
    opacity: 0.6 + Math.random() * 0.4,
  }));
}

function makeBirds(): Particle[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 80,
    y: 5 + Math.random() * 30,
    size: 8 + Math.random() * 10,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    drift: 80 + Math.random() * 40,
    opacity: 0.85,
  }));
}

const RAINDROPS = makeRaindrops();
const SNOWFLAKES = makeSnowflakes();
const HEAVY_RAIN = makeHeavyRain();
const BIRDS = makeBirds();

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function WeatherMood() {
  const [weather, setWeather] = useState<WeatherKey>("sol");
  const [isNight, setIsNight] = useState(false);
  const [lightning, setLightning] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const cfg = WEATHER[weather];

  /* Lightning flash effect */
  useEffect(() => {
    if (weather !== "trovoada") return;
    const schedule = () => {
      const delay = 2500 + Math.random() * 3000;
      return setTimeout(() => {
        setLightning(true);
        setTimeout(() => setLightning(false), 120);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setLightning(true);
              setTimeout(() => setLightning(false), 80);
            }, 150);
          }
        }, 100);
        timeoutRef = schedule();
      }, delay);
    };
    let timeoutRef = schedule();
    return () => clearTimeout(timeoutRef);
  }, [weather]);

  /* Scene switch fade */
  const handleWeatherChange = (key: WeatherKey) => {
    if (key === weather) return;
    setTransitioning(true);
    setTimeout(() => {
      setWeather(key);
      setTransitioning(false);
    }, 200);
  };

  const skyGradient = isNight ? cfg.skyNight : cfg.skyDay;
  const groundColor = isNight ? cfg.groundNight : cfg.groundDay;

  /* Rainbow gradient string */
  const rainbowGradient =
    "conic-gradient(from 200deg at 50% 110%, red, orange, yellow, lime, cyan, blue, violet, transparent 40%)";

  const cloudOpacity = isNight ? 0.15 : 1;

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes rainFall {
          0%   { transform: translateY(-20px) translateX(0px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(var(--drift)); opacity: 0; }
        }

        @keyframes snowDrift {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateY(50vh) translateX(calc(var(--drift) * 0.5px)) rotate(180deg); }
          90%  { opacity: 0.8; }
          100% { transform: translateY(110vh) translateX(calc(var(--drift) * 1px)) rotate(360deg); opacity: 0; }
        }

        @keyframes birdFly {
          0%   { transform: translateX(0vw) translateY(0px); opacity: 0; }
          5%   { opacity: 1; }
          40%  { transform: translateX(calc(var(--drift) * 0.4vw)) translateY(-20px); }
          70%  { transform: translateX(calc(var(--drift) * 0.7vw)) translateY(10px); }
          95%  { opacity: 0.8; }
          100% { transform: translateX(calc(var(--drift) * 1vw)) translateY(0px); opacity: 0; }
        }

        @keyframes sunRay {
          0%, 100% { opacity: 0.5; transform: scaleX(1); }
          50%       { opacity: 0.8; transform: scaleX(1.2); }
        }

        @keyframes sunPulse {
          0%, 100% { box-shadow: 0 0 40px 20px rgba(251,191,36,0.5), 0 0 80px 40px rgba(251,191,36,0.25); }
          50%       { box-shadow: 0 0 60px 30px rgba(251,191,36,0.7), 0 0 120px 60px rgba(251,191,36,0.35); }
        }

        @keyframes sunsetGlow {
          0%, 100% { box-shadow: 0 0 60px 30px rgba(251,146,60,0.6), 0 0 120px 60px rgba(236,72,153,0.3); }
          50%       { box-shadow: 0 0 80px 40px rgba(251,146,60,0.8), 0 0 160px 80px rgba(236,72,153,0.5); }
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0px); }
          50%       { transform: translateX(12px); }
        }

        @keyframes cloudDrift {
          0%   { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }

        @keyframes puddleShimmer {
          0%, 100% { opacity: 0.4; transform: scaleX(1); }
          50%       { opacity: 0.7; transform: scaleX(1.05); }
        }

        @keyframes moonGlow {
          0%, 100% { box-shadow: 0 0 20px 10px rgba(186,230,253,0.3); }
          50%       { box-shadow: 0 0 40px 20px rgba(186,230,253,0.5); }
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: var(--star-op); transform: scale(1); }
          50%       { opacity: calc(var(--star-op) * 0.2); transform: scale(0.5); }
        }

        @keyframes rainbowAppear {
          0%   { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes sceneIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* ── Root container ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* ── Sky background ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: skyGradient,
            transition: "background 0.8s ease",
            opacity: transitioning ? 0 : 1,
            animation: transitioning ? undefined : "sceneIn 0.4s ease",
          }}
        />

        {/* ── Lightning flash overlay ── */}
        {lightning && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.7)",
              zIndex: 50,
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Stars (visible at night) ── */}
        {isNight &&
          Array.from({ length: 60 }, (_, i) => {
            const x = (i * 137.5) % 100;
            const y = (i * 73.1) % 65;
            const size = 1 + (i % 3);
            const op = 0.4 + (i % 5) * 0.12;
            const dur = 2 + (i % 4);
            const del = (i % 6) * 0.8;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: "50%",
                  background: "white",
                  // @ts-ignore CSS custom property
                  "--star-op": op,
                  animation: `starTwinkle ${dur}s ${del}s ease-in-out infinite`,
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            );
          })}

        {/* ── Moon (night) ── */}
        {isNight && (
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "12%",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, #fef9c3, #bae6fd)",
              animation: "moonGlow 4s ease-in-out infinite",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Weather-specific particles ── */}

        {/* BIRDS — Sol */}
        {weather === "sol" && !isNight &&
          BIRDS.map((b) => (
            <div
              key={b.id}
              style={{
                position: "absolute",
                left: `${b.x}%`,
                top: `${b.y}%`,
                // @ts-ignore
                "--drift": b.drift,
                animation: `birdFly ${b.duration}s ${b.delay}s ease-in-out infinite`,
                pointerEvents: "none",
                zIndex: 4,
                opacity: b.opacity,
              }}
            >
              {/* V-shape bird using two lines */}
              <svg width={b.size * 2} height={b.size} viewBox="0 0 20 10">
                <path
                  d="M0,5 Q5,0 10,5 Q15,0 20,5"
                  fill="none"
                  stroke={isNight ? "#bae6fd" : "#1e293b"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}

        {/* RAIN — Chuva */}
        {weather === "chuva" &&
          RAINDROPS.map((drop) => (
            <div
              key={drop.id}
              style={{
                position: "absolute",
                left: `${drop.x}%`,
                top: 0,
                width: `${drop.size}px`,
                height: `${drop.size * 14}px`,
                background: isNight
                  ? "rgba(147,197,253,0.6)"
                  : "rgba(186,230,253,0.7)",
                borderRadius: "1px",
                // @ts-ignore
                "--drift": `${drop.drift}px`,
                animation: `rainFall ${drop.duration}s ${drop.delay}s linear infinite`,
                pointerEvents: "none",
                zIndex: 5,
                opacity: drop.opacity,
              }}
            />
          ))}

        {/* SNOWFLAKES — Neve */}
        {weather === "neve" &&
          SNOWFLAKES.map((flake) => (
            <div
              key={flake.id}
              style={{
                position: "absolute",
                left: `${flake.x}%`,
                top: 0,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 0 4px rgba(255,255,255,0.6)",
                // @ts-ignore
                "--drift": flake.drift,
                animation: `snowDrift ${flake.duration}s ${flake.delay}s ease-in-out infinite`,
                pointerEvents: "none",
                zIndex: 5,
                opacity: flake.opacity,
              }}
            />
          ))}

        {/* HEAVY RAIN + occasional lightning bolt — Trovoada */}
        {weather === "trovoada" &&
          HEAVY_RAIN.map((drop) => (
            <div
              key={drop.id}
              style={{
                position: "absolute",
                left: `${drop.x}%`,
                top: 0,
                width: `${drop.size}px`,
                height: `${drop.size * 16}px`,
                background: "rgba(147,197,253,0.55)",
                borderRadius: "1px",
                // @ts-ignore
                "--drift": `${drop.drift}px`,
                animation: `rainFall ${drop.duration}s ${drop.delay}s linear infinite`,
                pointerEvents: "none",
                zIndex: 5,
                opacity: drop.opacity,
              }}
            />
          ))}

        {/* Lightning bolt SVG — Trovoada */}
        {weather === "trovoada" && (
          <svg
            viewBox="0 0 40 80"
            style={{
              position: "absolute",
              left: "38%",
              top: "15%",
              width: 40,
              height: 80,
              opacity: lightning ? 1 : 0,
              transition: "opacity 0.04s",
              pointerEvents: "none",
              zIndex: 6,
              filter: "drop-shadow(0 0 8px #fde68a)",
            }}
          >
            <path
              d="M22,2 L8,42 L18,42 L10,78 L34,30 L22,30 Z"
              fill="#fde68a"
            />
          </svg>
        )}

        {/* SUN circle — Sol */}
        {weather === "sol" && !isNight && (
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 100,
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            {/* Rays */}
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 3,
                  height: 50,
                  marginLeft: -1.5,
                  marginTop: -25,
                  background: "rgba(251,191,36,0.7)",
                  borderRadius: 2,
                  transformOrigin: "center 60px",
                  transform: `rotate(${i * 30}deg) translateY(-70px)`,
                  animation: `sunRay ${1.5 + i * 0.1}s ${i * 0.15}s ease-in-out infinite`,
                }}
              />
            ))}
            {/* Sun disk */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(circle at 40% 40%, #fef9c3, #fbbf24)",
                animation: "sunPulse 3s ease-in-out infinite",
              }}
            />
          </div>
        )}

        {/* SUNSET large sun at horizon — Pôr do sol */}
        {weather === "poente" && !isNight && (
          <div
            style={{
              position: "absolute",
              bottom: "22%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 130,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 35%, #fef9c3, #fbbf24 40%, #fb923c 70%)",
              animation: "sunsetGlow 4s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
        )}

        {/* RAINBOW arc — Arco-íris */}
        {weather === "arcoiris" && !isNight && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              transform: "translateX(-50%)",
              width: "min(700px, 95vw)",
              height: "min(350px, 47.5vw)",
              borderRadius: "9999px 9999px 0 0",
              background: rainbowGradient,
              opacity: 0.75,
              pointerEvents: "none",
              zIndex: 3,
              animation: "rainbowAppear 1.2s ease both",
              filter: "blur(3px)",
            }}
          />
        )}

        {/* CLOUDS — Chuva / Neve / Trovoada / Arco-íris */}
        {(weather === "chuva" ||
          weather === "neve" ||
          weather === "trovoada" ||
          weather === "arcoiris") && (
          <>
            {[
              { left: -5, top: 8, width: 260, delay: 0, dur: 35 },
              { left: 20, top: 4, width: 200, delay: -12, dur: 42 },
              { left: 55, top: 10, width: 230, delay: -8, dur: 38 },
              { left: 75, top: 3, width: 190, delay: -20, dur: 45 },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${c.left}%`,
                  top: `${c.top}%`,
                  width: c.width,
                  height: c.width * 0.5,
                  borderRadius: "50%",
                  background:
                    weather === "trovoada"
                      ? `rgba(30,41,59,${0.8 + i * 0.05})`
                      : weather === "arcoiris"
                      ? `rgba(255,255,255,${0.55 + i * 0.05})`
                      : isNight
                      ? `rgba(51,65,85,${0.5 + i * 0.07})`
                      : `rgba(203,213,225,${0.7 + i * 0.07})`,
                  filter: "blur(6px)",
                  opacity: cloudOpacity,
                  animation: `cloudDrift ${c.dur}s ${c.delay}s linear infinite`,
                  pointerEvents: "none",
                  zIndex: 4,
                }}
              />
            ))}
          </>
        )}

        {/* ── Snow cover on ground ── */}
        {weather === "neve" && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "28%",
              background: isNight
                ? "linear-gradient(to top, #0c1a2e, #1e3a5f 70%, transparent)"
                : "linear-gradient(to top, #f0f9ff, #e0f2fe 70%, transparent)",
              borderRadius: "60% 60% 0 0 / 30% 30% 0 0",
              zIndex: 8,
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Rain puddles ── */}
        {(weather === "chuva" || weather === "trovoada") && (
          <>
            {[
              { left: 8, width: 90 },
              { left: 30, width: 60 },
              { left: 52, width: 110 },
              { left: 72, width: 75 },
              { left: 88, width: 50 },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: `${14 + (i % 3) * 2}%`,
                  left: `${p.left}%`,
                  width: p.width,
                  height: 10,
                  borderRadius: "50%",
                  background: isNight
                    ? "rgba(148,163,184,0.3)"
                    : "rgba(186,230,253,0.5)",
                  animation: `puddleShimmer ${1.5 + i * 0.3}s ${i * 0.4}s ease-in-out infinite`,
                  pointerEvents: "none",
                  zIndex: 9,
                }}
              />
            ))}
          </>
        )}

        {/* ── Landscape silhouette ── */}
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "clamp(180px, 28vw, 300px)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "fill 0.8s ease",
          }}
        >
          {/* Back hills */}
          <path
            d="M0,300 L0,180 L80,140 L180,170 L280,110 L380,150 L480,90 L580,130 L680,80 L780,120 L880,70 L980,110 L1080,75 L1180,115 L1280,85 L1380,120 L1440,105 L1440,300 Z"
            fill={isNight ? "#0f172a" : groundColor}
            opacity={0.7}
          />
          {/* Mid hills */}
          <path
            d="M0,300 L0,220 L100,195 L220,215 L340,180 L460,210 L580,175 L700,205 L820,170 L940,200 L1060,178 L1180,205 L1300,185 L1440,210 L1440,300 Z"
            fill={isNight ? "#0c1220" : groundColor}
            opacity={0.85}
          />
          {/* Front ground */}
          <path
            d="M0,300 L0,260 L1440,260 L1440,300 Z"
            fill={isNight ? "#080d18" : groundColor}
          />
        </svg>

        {/* ── Tree silhouettes ── */}
        <svg
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "clamp(80px, 12vw, 130px)",
            pointerEvents: "none",
            zIndex: 11,
          }}
        >
          {[
            40, 85, 135, 220, 270, 390, 440, 575, 625, 755, 800, 845,
            960, 1010, 1110, 1165, 1290, 1345, 1400,
          ].map((x, i) => {
            const h = 60 + (i % 5) * 12;
            const treeColor = isNight ? "#050810" : "#0a1a0a";
            return (
              <g key={i} transform={`translate(${x}, ${130 - h})`}>
                <polygon
                  points={`0,${h} ${h * 0.35},0 ${h * 0.7},${h}`}
                  fill={treeColor}
                />
                <polygon
                  points={`${h * 0.08},${h * 0.58} ${h * 0.35},${h * 0.22} ${h * 0.62},${h * 0.58}`}
                  fill={treeColor}
                  opacity={0.9}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Scene content overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "clamp(1.5rem, 5vh, 3.5rem)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {/* Temperature badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: isNight ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              border: isNight
                ? "1px solid rgba(148,163,184,0.15)"
                : "1px solid rgba(255,255,255,0.4)",
              borderRadius: "999px",
              padding: "0.35rem 1rem",
              color: isNight ? "#e2e8f0" : "#1e293b",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              letterSpacing: "-0.02em",
              transition: "all 0.6s ease",
            }}
          >
            <span style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}>
              {cfg.emoji}
            </span>
            {cfg.temp}°C
          </div>

          {/* Description */}
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              fontWeight: 400,
              color: isNight ? "rgba(226,232,240,0.85)" : "rgba(15,23,42,0.8)",
              textAlign: "center",
              padding: "0 1rem",
              letterSpacing: "0.01em",
              transition: "color 0.6s ease",
              textShadow: isNight ? "none" : "0 1px 3px rgba(255,255,255,0.5)",
            }}
          >
            {cfg.description}
          </p>
        </div>

        {/* ── Bottom controls ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
            paddingBottom: "clamp(1rem, 3vh, 2rem)",
            paddingTop: "0.6rem",
            background: isNight
              ? "linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        >
          {/* Weather buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              justifyContent: "center",
              padding: "0 0.75rem",
            }}
          >
            {(Object.keys(WEATHER) as WeatherKey[]).map((key) => {
              const w = WEATHER[key];
              const active = weather === key;
              return (
                <button
                  key={key}
                  onClick={() => handleWeatherChange(key)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    border: active
                      ? "2px solid rgba(255,255,255,0.9)"
                      : "2px solid rgba(255,255,255,0.3)",
                    background: active
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    outline: "none",
                  }}
                >
                  <span>{w.emoji}</span>
                  <span>{w.label}</span>
                </button>
              );
            })}
          </div>

          {/* Day/Night toggle */}
          <button
            onClick={() => setIsNight((n) => !n)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 1.1rem",
              borderRadius: "999px",
              border: "2px solid rgba(255,255,255,0.4)",
              background: isNight
                ? "rgba(15,23,42,0.5)"
                : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {isNight ? "🌙 Noite" : "☀️ Dia"}
            <span
              style={{
                display: "inline-block",
                width: 34,
                height: 18,
                borderRadius: 9,
                background: isNight ? "#1d4ed8" : "#fbbf24",
                position: "relative",
                transition: "background 0.3s ease",
                marginLeft: 2,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: isNight ? 18 : 2,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "white",
                  transition: "left 0.3s ease",
                }}
              />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
