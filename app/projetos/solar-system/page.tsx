"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface PlanetData {
  id: string;
  name: string;
  namePT: string;
  size: number;
  orbitRadius: number;
  color: string;
  orbitDuration: number; // seconds at 1x speed
  funFact: string;
  distance: string; // from sun
  diameter: string;
  hasMoon?: boolean;
  hasRing?: boolean;
  ringColor?: string;
  bands?: string[];
  tilt?: number;
}

const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    namePT: "Mercúrio",
    size: 8,
    orbitRadius: 90,
    color: "#9E9E9E",
    orbitDuration: 8,
    funFact:
      "Apesar de ser o planeta mais próximo do Sol, não é o mais quente. As suas temperaturas variam entre -180°C e 430°C.",
    distance: "57,9 milhões km",
    diameter: "4.879 km",
  },
  {
    id: "venus",
    name: "Venus",
    namePT: "Vénus",
    size: 14,
    orbitRadius: 140,
    color: "#E8D44D",
    orbitDuration: 20,
    funFact:
      "Vénus gira no sentido oposto ao da maioria dos planetas. Um dia em Vénus dura mais do que um ano venusiano!",
    distance: "108,2 milhões km",
    diameter: "12.104 km",
  },
  {
    id: "earth",
    name: "Earth",
    namePT: "Terra",
    size: 15,
    orbitRadius: 195,
    color: "#3B82F6",
    orbitDuration: 30,
    funFact:
      "A Terra é o único planeta conhecido com vida. O seu nome é o único que não vem da mitologia greco-romana.",
    distance: "149,6 milhões km",
    diameter: "12.742 km",
    hasMoon: true,
  },
  {
    id: "mars",
    name: "Mars",
    namePT: "Marte",
    size: 10,
    orbitRadius: 258,
    color: "#EF4444",
    orbitDuration: 56,
    funFact:
      "Marte tem o maior vulcão do Sistema Solar: o Olympus Mons, com 21 km de altura — quase 3x o Everest!",
    distance: "227,9 milhões km",
    diameter: "6.779 km",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    namePT: "Júpiter",
    size: 46,
    orbitRadius: 358,
    color: "#D97706",
    orbitDuration: 356,
    funFact:
      "A Grande Mancha Vermelha de Júpiter é uma tempestade que dura há mais de 350 anos. Cabe dois planetas Terra lá dentro!",
    distance: "778,5 milhões km",
    diameter: "139.820 km",
    bands: ["#C2855A", "#D97706", "#B45309", "#E8A455", "#C97A35"],
  },
  {
    id: "saturn",
    name: "Saturn",
    namePT: "Saturno",
    size: 38,
    orbitRadius: 468,
    color: "#EAB308",
    orbitDuration: 882,
    funFact:
      "Saturno é tão leve que flutuaria na água! A sua densidade média é menor do que a da água.",
    distance: "1,43 mil milhões km",
    diameter: "116.460 km",
    hasRing: true,
    ringColor: "rgba(234, 179, 8, 0.35)",
  },
  {
    id: "uranus",
    name: "Uranus",
    namePT: "Urano",
    size: 26,
    orbitRadius: 568,
    color: "#67E8F9",
    orbitDuration: 2520,
    funFact:
      "Urano orbita o Sol «deitado de lado» com uma inclinação de 98°. As suas estações duram cerca de 21 anos cada!",
    distance: "2,87 mil milhões km",
    diameter: "50.724 km",
    tilt: 98,
  },
  {
    id: "neptune",
    name: "Neptune",
    namePT: "Neptuno",
    size: 24,
    orbitRadius: 660,
    color: "#3730A3",
    orbitDuration: 4938,
    funFact:
      "Neptuno tem os ventos mais velozes do Sistema Solar — chegando a 2.100 km/h. Só foi descoberto em 1846, previsto matematicamente antes de ser visto!",
    distance: "4,50 mil milhões km",
    diameter: "49.244 km",
  },
];

// --- Star generation (stable, SSR-safe via deterministic values) ---
const STARS = Array.from({ length: 200 }, (_, i) => {
  // Simple LCG for reproducible pseudo-random positions
  const a = (i * 1664525 + 1013904223) >>> 0;
  const b = (i * 22695477 + 1) >>> 0;
  const x = (a % 10000) / 100;
  const y = (b % 10000) / 100;
  const size = (i % 3) + 1;
  const duration = 2 + (i % 4);
  const delay = (i % 5) * 0.7;
  return { x, y, size, duration, delay };
});

// --- Orbit path component ---
function OrbitPath({ radius, scale }: { radius: number; scale: number }) {
  const r = radius * scale;
  return (
    <div
      className="absolute rounded-full border border-white/5 pointer-events-none"
      style={{
        width: r * 2,
        height: r * 2,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

// --- Planet component ---
interface PlanetProps {
  planet: PlanetData;
  speed: number;
  paused: boolean;
  scale: number;
  onSelect: (planet: PlanetData) => void;
  isSelected: boolean;
}

function Planet({ planet, speed, paused, scale, onSelect, isSelected }: PlanetProps) {
  const orbitR = planet.orbitRadius * scale;
  const planetSize = planet.size * scale;
  const animDuration = planet.orbitDuration / speed;

  return (
    <div
      className="absolute"
      style={{
        width: orbitR * 2,
        height: orbitR * 2,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        animation: `orbit ${animDuration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      {/* Planet body wrapper — positioned on the orbit path */}
      <div
        className="absolute"
        style={{
          top: "0%",
          left: "50%",
          transform: `translateX(-50%) translateY(-${planetSize / 2}px)`,
        }}
      >
        {/* Counter-rotate label so it stays readable */}
        <div
          style={{
            animation: `counter-orbit ${animDuration}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* Saturn ring — behind planet */}
          {planet.hasRing && (
            <div
              className="absolute pointer-events-none"
              style={{
                width: planetSize * 2.6,
                height: planetSize * 0.55,
                border: `${Math.max(2, planetSize * 0.09)}px solid ${planet.ringColor}`,
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                boxShadow: `0 0 ${planetSize * 0.2}px ${planet.ringColor}`,
              }}
            />
          )}

          {/* Planet circle */}
          <motion.div
            className="relative cursor-pointer"
            style={{
              width: planetSize,
              height: planetSize,
              borderRadius: "50%",
              background: planet.id === "jupiter"
                ? `radial-gradient(ellipse at 35% 35%, #E8A455, ${planet.color} 40%, #B45309 70%, #7C3A12)`
                : planet.id === "earth"
                ? `radial-gradient(ellipse at 35% 35%, #4ADE80 20%, ${planet.color} 50%, #1E40AF 80%)`
                : planet.id === "saturn"
                ? `radial-gradient(ellipse at 35% 35%, #FDE68A, ${planet.color} 50%, #92400E)`
                : planet.id === "uranus"
                ? `radial-gradient(ellipse at 35% 35%, #A5F3FC, ${planet.color} 60%, #0E7490)`
                : planet.id === "neptune"
                ? `radial-gradient(ellipse at 35% 35%, #6366F1, ${planet.color} 60%, #1E1B4B)`
                : planet.id === "mars"
                ? `radial-gradient(ellipse at 35% 35%, #FC8181, ${planet.color} 50%, #991B1B)`
                : planet.id === "venus"
                ? `radial-gradient(ellipse at 35% 35%, #FEF3C7, ${planet.color} 60%, #B45309)`
                : `radial-gradient(ellipse at 35% 35%, #D4D4D4, ${planet.color} 60%, #525252)`,
              boxShadow: isSelected
                ? `0 0 0 2px white, 0 0 ${planetSize}px ${planet.color}`
                : `0 0 ${planetSize * 0.5}px ${planet.color}40`,
              zIndex: 1,
              position: "relative",
            }}
            whileHover={{ scale: 1.35 }}
            onClick={() => onSelect(planet)}
            title={planet.namePT}
          >
            {/* Jupiter bands */}
            {planet.id === "jupiter" && (
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-50 pointer-events-none">
                {[20, 35, 50, 65, 80].map((top, i) => (
                  <div
                    key={i}
                    className="absolute w-full"
                    style={{
                      top: `${top}%`,
                      height: "8%",
                      background: i % 2 === 0 ? "#C97A35" : "#7C3A12",
                      opacity: 0.6,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Earth moon */}
            {planet.hasMoon && (
              <div
                className="absolute pointer-events-none"
                style={{
                  width: planetSize * 3,
                  height: planetSize * 3,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `orbit ${animDuration * 0.075}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: planetSize * 0.27,
                    height: planetSize * 0.27,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 40%, #E5E7EB, #9CA3AF)",
                    top: "0%",
                    left: "50%",
                    transform: `translateX(-50%) translateY(-${(planetSize * 0.27) / 2}px)`,
                    boxShadow: "0 0 4px rgba(255,255,255,0.3)",
                  }}
                />
              </div>
            )}
          </motion.div>

          {/* Planet label */}
          <div
            className="absolute text-center pointer-events-none"
            style={{
              top: planetSize + 4,
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="text-white/60 font-medium tracking-wide"
              style={{ fontSize: Math.max(9, Math.min(12, planetSize * 0.7)) }}
            >
              {planet.namePT}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Info Panel ---
interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

function InfoPanel({ planet, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          key={planet.id}
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="absolute top-4 right-4 z-50 w-72 md:w-80"
        >
          <div
            className="rounded-2xl border border-white/10 backdrop-blur-xl p-5"
            style={{ background: "rgba(3, 0, 20, 0.88)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    background: `radial-gradient(circle at 35% 35%, white 0%, ${planet.color} 50%)`,
                    boxShadow: `0 0 12px ${planet.color}80`,
                  }}
                />
                <h2 className="text-white font-bold text-xl tracking-tight">
                  {planet.namePT}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors text-lg leading-none"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-white/50 text-sm">Distância ao Sol</span>
                <span className="text-white/90 text-sm font-medium">{planet.distance}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-white/50 text-sm">Diâmetro</span>
                <span className="text-white/90 text-sm font-medium">{planet.diameter}</span>
              </div>
            </div>

            {/* Fun fact */}
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1.5 font-semibold">
                Curiosidade
              </p>
              <p className="text-white/80 text-sm leading-relaxed">{planet.funFact}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main page ---
export default function SolarSystemPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive scale calculation
  const updateScale = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const shortSide = Math.min(width, height);
    // Neptune orbit at scale=1 reaches 660px from center. Need shortSide/2 >= 660+24
    const needed = (660 + 24) * 2;
    const newScale = Math.min(1, (shortSide / needed) * 0.92);
    setScale(newScale);
  }, []);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateScale]);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet));
  };

  return (
    <>
      {/* Global keyframe styles */}
      <style>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes counter-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes sun-pulse {
          0%, 100% { box-shadow: 0 0 60px 20px #FCD34D80, 0 0 120px 40px #F59E0B40, 0 0 200px 60px #EF444420; }
          50%       { box-shadow: 0 0 80px 30px #FCD34D99, 0 0 160px 60px #F59E0B60, 0 0 260px 80px #EF444430; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        @keyframes sun-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ background: "#030014", minHeight: "100svh", height: "100svh" }}
      >
        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Page title */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <h1 className="text-white/80 font-bold text-base md:text-lg tracking-wider uppercase">
            Sistema Solar
          </h1>
          <p className="text-white/30 text-xs mt-0.5 hidden sm:block">
            Clique num planeta para saber mais
          </p>
        </div>

        {/* Orbit paths */}
        <div className="absolute inset-0 pointer-events-none">
          {PLANETS.map((planet) => (
            <OrbitPath key={planet.id} radius={planet.orbitRadius} scale={scale} />
          ))}
        </div>

        {/* Sun */}
        <div
          className="absolute rounded-full"
          style={{
            width: 62 * scale,
            height: 62 * scale,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at 38% 35%, #FEF9C3 0%, #FDE047 20%, #F59E0B 50%, #DC2626 80%, #7F1D1D 100%)",
            animation: "sun-pulse 3s ease-in-out infinite",
            zIndex: 10,
          }}
        >
          {/* Sun surface texture */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden opacity-30"
            style={{
              animation: "sun-rotate 20s linear infinite",
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(255,200,0,0.3) 20%, transparent 40%, rgba(255,150,0,0.2) 60%, transparent 80%, rgba(255,200,0,0.3) 100%)",
            }}
          />
        </div>

        {/* Planets */}
        {PLANETS.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            speed={speed}
            paused={paused}
            scale={scale}
            onSelect={handlePlanetSelect}
            isSelected={selectedPlanet?.id === planet.id}
          />
        ))}

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <div
            className="flex items-center gap-4 rounded-2xl border border-white/10 backdrop-blur-xl px-5 py-3"
            style={{ background: "rgba(3, 0, 20, 0.80)" }}
          >
            {/* Pause/Play */}
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-white/50 text-white/70 hover:text-white transition-all hover:scale-110 active:scale-95 text-sm"
              aria-label={paused ? "Iniciar" : "Pausar"}
            >
              {paused ? "▶" : "⏸"}
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10" />

            {/* Speed slider */}
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs w-16 text-right">
                {speed.toFixed(1)}× velocidade
              </span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 md:w-32 accent-yellow-400 cursor-pointer"
                aria-label="Velocidade das órbitas"
              />
              <div className="flex gap-1 items-center">
                <span className="text-white/20 text-xs">lento</span>
                <span className="text-white/20 text-xs mx-1">·</span>
                <span className="text-white/20 text-xs">rápido</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <InfoPanel planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      </div>
    </>
  );
}
