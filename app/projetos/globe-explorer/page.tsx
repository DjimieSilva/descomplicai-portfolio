"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

/* ─────────────────────────────────────────────
   CITY DATA
───────────────────────────────────────────── */
interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  timezone: string;
  utcOffset: number; // hours from UTC
  lat: number; // degrees, N positive
  lng: number; // degrees, E positive
  funFact: string;
  color: string;
}

const CITIES: City[] = [
  {
    id: "lisboa",
    name: "Lisboa",
    country: "Portugal",
    flag: "🇵🇹",
    timezone: "WET / WEST (UTC+0/+1)",
    utcOffset: 0,
    lat: 38.7,
    lng: -9.14,
    funFact:
      "Lisboa é uma das capitais mais antigas da Europa, fundada há mais de 3 000 anos — mais velha do que Roma!",
    color: "#ff6b6b",
  },
  {
    id: "porto",
    name: "Porto",
    country: "Portugal",
    flag: "🇵🇹",
    timezone: "WET / WEST (UTC+0/+1)",
    utcOffset: 0,
    lat: 41.15,
    lng: -8.61,
    funFact:
      "O Porto deu o nome a Portugal e ao Vinho do Porto — exportado desde o século XVII para toda a Europa.",
    color: "#ffa502",
  },
  {
    id: "london",
    name: "Londres",
    country: "Reino Unido",
    flag: "🇬🇧",
    timezone: "GMT / BST (UTC+0/+1)",
    utcOffset: 0,
    lat: 51.51,
    lng: -0.13,
    funFact:
      "O Big Ben não é o nome da torre — é o nome do sino lá dentro. A torre chama-se Elizabeth Tower desde 2012.",
    color: "#74b9ff",
  },
  {
    id: "paris",
    name: "Paris",
    country: "França",
    flag: "🇫🇷",
    timezone: "CET / CEST (UTC+1/+2)",
    utcOffset: 1,
    lat: 48.85,
    lng: 2.35,
    funFact:
      "A Torre Eiffel cresce 15 cm no verão devido à dilatação térmica do ferro com o calor.",
    color: "#a29bfe",
  },
  {
    id: "berlin",
    name: "Berlim",
    country: "Alemanha",
    flag: "🇩🇪",
    timezone: "CET / CEST (UTC+1/+2)",
    utcOffset: 1,
    lat: 52.52,
    lng: 13.4,
    funFact:
      "Berlim tem mais pontes do que Veneza — cerca de 1 700 pontes atravessam os rios e canais da cidade.",
    color: "#55efc4",
  },
  {
    id: "tokyo",
    name: "Tóquio",
    country: "Japão",
    flag: "🇯🇵",
    timezone: "JST (UTC+9)",
    utcOffset: 9,
    lat: 35.68,
    lng: 139.69,
    funFact:
      "Tóquio é a maior área metropolitana do mundo, com mais de 37 milhões de habitantes — quase 4× a população de Portugal.",
    color: "#fd79a8",
  },
  {
    id: "newyork",
    name: "Nova Iorque",
    country: "Estados Unidos",
    flag: "🇺🇸",
    timezone: "EST / EDT (UTC-5/-4)",
    utcOffset: -5,
    lat: 40.71,
    lng: -74.01,
    funFact:
      "O nome original de Nova Iorque era Nova Amsterdão — foi renomeada pelos ingleses em 1664 em honra do Duque de Iorque.",
    color: "#00cec9",
  },
  {
    id: "saopulo",
    name: "São Paulo",
    country: "Brasil",
    flag: "🇧🇷",
    timezone: "BRT (UTC-3)",
    utcOffset: -3,
    lat: -23.55,
    lng: -46.63,
    funFact:
      "São Paulo tem a maior frota de helicópteros privados do mundo — mais de 700, resultado do trânsito caótico da megalópole.",
    color: "#6c5ce7",
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Austrália",
    flag: "🇦🇺",
    timezone: "AEST / AEDT (UTC+10/+11)",
    utcOffset: 10,
    lat: -33.87,
    lng: 151.21,
    funFact:
      "A Ópera de Sydney foi desenhada pelo arquiteto dinamarquês Jørn Utzon, que nunca chegou a ver o edifício terminado — abandonou o projeto em 1966.",
    color: "#fdcb6e",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "Emirados Árabes",
    flag: "🇦🇪",
    timezone: "GST (UTC+4)",
    utcOffset: 4,
    lat: 25.2,
    lng: 55.27,
    funFact:
      "Em Dubai, 88% da população é expatriada — menos de 12% são cidadãos emiratenses nativos.",
    color: "#e17055",
  },
  {
    id: "singapore",
    name: "Singapura",
    country: "Singapura",
    flag: "🇸🇬",
    timezone: "SGT (UTC+8)",
    utcOffset: 8,
    lat: 1.35,
    lng: 103.82,
    funFact:
      "Singapura é um dos países mais densamente populados do mundo, mas tem mais de 300 parques e jardins públicos.",
    color: "#00b894",
  },
  {
    id: "capetown",
    name: "Cidade do Cabo",
    country: "África do Sul",
    flag: "🇿🇦",
    timezone: "SAST (UTC+2)",
    utcOffset: 2,
    lat: -33.93,
    lng: 18.42,
    funFact:
      "A Cidade do Cabo foi fundada pelos portugueses — Bartolomeu Dias dobrou o Cabo da Boa Esperança em 1488.",
    color: "#b2bec3",
  },
  {
    id: "mexicocity",
    name: "Cidade do México",
    country: "México",
    flag: "🇲🇽",
    timezone: "CST / CDT (UTC-6/-5)",
    utcOffset: -6,
    lat: 19.43,
    lng: -99.13,
    funFact:
      "A Cidade do México afunda cerca de 50 cm por ano — foi construída sobre um lago asteca drenado no século XVI.",
    color: "#00cec9",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "Índia",
    flag: "🇮🇳",
    timezone: "IST (UTC+5:30)",
    utcOffset: 5.5,
    lat: 19.08,
    lng: 72.88,
    funFact:
      "Mumbai produz mais de 60% das receitas fiscais diretas da Índia e alberga a maior indústria cinematográfica do mundo — Bollywood.",
    color: "#e84393",
  },
  {
    id: "seoul",
    name: "Seul",
    country: "Coreia do Sul",
    flag: "🇰🇷",
    timezone: "KST (UTC+9)",
    utcOffset: 9,
    lat: 37.57,
    lng: 126.98,
    funFact:
      "Seul tem o sistema de metro mais extenso do mundo em número de estações — mais de 330 estações servem a cidade.",
    color: "#ff7675",
  },
];

/* ─────────────────────────────────────────────
   HELPERS: spherical → CSS 3D
───────────────────────────────────────────── */
/**
 * Convert lat/lng (degrees) to CSS 3D transform offsets on a sphere of radius R.
 * The globe rotates around Y, so we embed lat/lng into a rotateY(lng) rotateX(-lat) translateZ(R) chain.
 * We return the CSS transform string for the dot's inner wrapper.
 */
function latlngToTransform(lat: number, lng: number): string {
  // CSS 3D: rotate around Y axis (longitude), then around X axis (negative latitude)
  return `rotateY(${lng}deg) rotateX(${-lat}deg) translateZ(var(--globe-radius))`;
}

/* ─────────────────────────────────────────────
   STAR data (stable, generated once)
───────────────────────────────────────────── */
const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: (((i * 137.508 + 43) % 97) / 97) * 100,
  y: (((i * 53.7 + 17) % 83) / 83) * 100,
  size: ((i * 31 + 7) % 3) + 1,
  delay: ((i * 19) % 40) * 0.1,
  duration: 2 + ((i * 11) % 30) * 0.1,
}));

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function GlobeExplorer() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Globe rotation state
  const rotX = useMotionValue(15); // tilt
  const rotY = useMotionValue(0); // spin

  // Spring-based smooth rotation
  const springRotX = useSpring(rotX, { stiffness: 80, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 80, damping: 20 });

  const dragStart = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);
  const autoRotateRef = useRef<number | null>(null);
  const lastAutoYRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let raf: number;
    const spin = (time: number) => {
      if (lastTimeRef.current) {
        const dt = time - lastTimeRef.current;
        lastAutoYRef.current += dt * 0.02; // ~20 deg/s
        rotY.set(lastAutoYRef.current);
      }
      lastTimeRef.current = time;
      raf = requestAnimationFrame(spin);
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, isDragging, rotY]);

  // ── Drag handlers ──
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      setAutoRotate(false);
      lastAutoYRef.current = rotY.get();
      lastTimeRef.current = 0;
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        rotX: rotX.get(),
        rotY: rotY.get(),
      };
    },
    [rotX, rotY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      rotY.set(dragStart.current.rotY + dx * 0.4);
      rotX.set(Math.max(-45, Math.min(45, dragStart.current.rotX + dy * 0.4)));
    },
    [rotX, rotY]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
    // Resume auto-rotate after 2 s
    const timer = setTimeout(() => setAutoRotate(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ── Search ──
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.id.includes(q)
    );
  }, [searchQuery]);

  const focusCity = useCallback(
    (city: City) => {
      // Animate globe to face the city
      setAutoRotate(false);
      lastAutoYRef.current = -city.lng;
      rotY.set(-city.lng);
      rotX.set(-city.lat * 0.5);
      setHighlightedCity(city.id);
      setSelectedCity(city);
      setSearchQuery("");
      setTimeout(() => setAutoRotate(true), 5000);
    },
    [rotX, rotY]
  );

  // Close card on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCity(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const globeRadiusPx = Math.round(220 * zoom);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#030014",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── CSS variables for globe radius ── */}
      <style>{`
        :root { --globe-radius: ${globeRadiusPx}px; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes atmospherePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        .city-dot {
          position: absolute;
          width: 0;
          height: 0;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }

        .city-dot-inner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          backface-visibility: hidden;
        }

        .city-dot-inner:hover,
        .city-dot-inner.highlighted {
          transform: translate(-50%, -50%) scale(1.8);
        }

        .city-dot-inner::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: inherit;
          opacity: 0.3;
          animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }

        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        .city-label {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 11px;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 4px rgba(0,0,0,0.9);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .city-dot-inner:hover + .city-label,
        .city-dot-inner.highlighted + .city-label {
          opacity: 1;
        }

        .globe-scene {
          width: ${globeRadiusPx * 2}px;
          height: ${globeRadiusPx * 2}px;
          perspective: ${globeRadiusPx * 4}px;
          cursor: ${isDragging ? "grabbing" : "grab"};
        }

        .globe-3d {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          position: relative;
        }

        .globe-sphere {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        .continents-layer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          overflow: hidden;
        }

        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.2);
          outline: none;
          cursor: pointer;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(100,180,255,0.8);
        }

        input[type=range]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 6px rgba(100,180,255,0.8);
        }

        .search-input {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          color: white;
          padding: 10px 16px 10px 40px;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .search-input:focus {
          border-color: rgba(100,180,255,0.6);
          background: rgba(255,255,255,0.12);
        }

        @media (max-width: 640px) {
          .globe-scene {
            width: ${Math.round(globeRadiusPx * 1.5)}px !important;
            height: ${Math.round(globeRadiusPx * 1.5)}px !important;
            perspective: ${Math.round(globeRadiusPx * 3)}px !important;
          }
        }
      `}</style>

      {/* ── Stars Background ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {STARS.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "white",
              animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginBottom: "2rem",
          padding: "0 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "white",
            margin: 0,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #fff 0%, #a0c4ff 50%, #c77dff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Globo Interativo
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
            margin: "0.4rem 0 0",
          }}
        >
          Arrasta para rodar · Clica nas cidades para explorar
        </p>
      </motion.div>

      {/* ── Search Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 20,
          width: "min(320px, 90vw)",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar cidade ou país..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
        </div>

        {/* Search results dropdown */}
        <AnimatePresence>
          {searchFocused && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                background: "rgba(10, 10, 30, 0.95)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                transformOrigin: "top",
              }}
            >
              {searchResults.map((city) => (
                <button
                  key={city.id}
                  onClick={() => focusCity(city)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "10px 16px",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: 14,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <span style={{ fontSize: 20 }}>{city.flag}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{city.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                      {city.country}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Globe Scene ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 80 }}
        style={{ position: "relative", zIndex: 5 }}
      >
        {/* Atmosphere glow */}
        <div
          style={{
            position: "absolute",
            inset: `-${globeRadiusPx * 0.15}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, transparent 55%, rgba(30,100,255,0.15) 70%, rgba(60,140,255,0.35) 82%, transparent 100%)`,
            pointerEvents: "none",
            animation: "atmospherePulse 4s ease-in-out infinite",
            zIndex: 2,
          }}
        />

        {/* Globe drag zone */}
        <div
          className="globe-scene"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ position: "relative", zIndex: 3 }}
        >
          <motion.div
            className="globe-3d"
            style={{
              rotateX: springRotX,
              rotateY: springRotY,
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
            }}
          >
            {/* ── Globe Sphere: Ocean layer ── */}
            <div
              className="globe-sphere"
              style={{
                background: `
                  radial-gradient(circle at 35% 35%,
                    #1a6fa8 0%,
                    #0d4f8a 30%,
                    #073566 60%,
                    #041e3d 100%
                  )
                `,
                boxShadow: `
                  inset -${globeRadiusPx * 0.3}px -${globeRadiusPx * 0.1}px ${globeRadiusPx * 0.5}px rgba(0,0,0,0.6),
                  inset ${globeRadiusPx * 0.15}px ${globeRadiusPx * 0.15}px ${globeRadiusPx * 0.3}px rgba(255,255,255,0.08)
                `,
              }}
            >
              {/* ── Continent patches using pseudo-random blobs ── */}
              {/* Europe + Africa cluster */}
              <div
                className="continents-layer"
                style={{
                  background: `
                    radial-gradient(ellipse 18% 22% at 52% 32%, #4a7c4f 0%, transparent 100%),
                    radial-gradient(ellipse 12% 28% at 54% 57%, #5a8a40 0%, transparent 100%),
                    radial-gradient(ellipse 8% 10% at 48% 28%, #3d6e42 0%, transparent 100%),
                    radial-gradient(ellipse 20% 12% at 35% 40%, #4a7c4f 0%, transparent 100%),
                    radial-gradient(ellipse 14% 8% at 68% 45%, #3a6038 0%, transparent 100%)
                  `,
                }}
              />
              {/* Americas */}
              <div
                className="continents-layer"
                style={{
                  background: `
                    radial-gradient(ellipse 10% 18% at 23% 30%, #4a7c4f 0%, transparent 100%),
                    radial-gradient(ellipse 8% 22% at 27% 55%, #5a8a40 0%, transparent 100%),
                    radial-gradient(ellipse 6% 8% at 20% 50%, #3d6e42 0%, transparent 100%)
                  `,
                }}
              />
              {/* Asia + Oceania */}
              <div
                className="continents-layer"
                style={{
                  background: `
                    radial-gradient(ellipse 28% 18% at 72% 33%, #4a7c4f 0%, transparent 100%),
                    radial-gradient(ellipse 18% 12% at 68% 28%, #5a8a40 0%, transparent 100%),
                    radial-gradient(ellipse 8% 6% at 82% 58%, #3d6e42 0%, transparent 100%),
                    radial-gradient(ellipse 5% 4% at 88% 35%, #4a7c4f 0%, transparent 100%)
                  `,
                }}
              />
              {/* Ice caps */}
              <div
                className="continents-layer"
                style={{
                  background: `
                    radial-gradient(ellipse 100% 15% at 50% 0%, rgba(220,240,255,0.7) 0%, transparent 100%),
                    radial-gradient(ellipse 100% 10% at 50% 100%, rgba(220,240,255,0.5) 0%, transparent 100%)
                  `,
                }}
              />
              {/* Specular highlight */}
              <div
                className="continents-layer"
                style={{
                  background: `
                    radial-gradient(ellipse 40% 30% at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 100%)
                  `,
                }}
              />
            </div>

            {/* ── Day / Night terminator ── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `
                  linear-gradient(
                    to right,
                    rgba(0,0,0,0) 0%,
                    rgba(0,0,0,0) 42%,
                    rgba(0,5,20,0.3) 50%,
                    rgba(0,5,20,0.75) 60%,
                    rgba(0,5,20,0.88) 100%
                  )
                `,
                pointerEvents: "none",
              }}
            />

            {/* ── City Markers ── */}
            {CITIES.map((city) => (
              <div
                key={city.id}
                className="city-dot"
                style={{
                  transform: latlngToTransform(city.lat, city.lng),
                }}
              >
                <div
                  className={`city-dot-inner${highlightedCity === city.id ? " highlighted" : ""}`}
                  style={{
                    backgroundColor: city.color,
                    boxShadow: `0 0 0 2px rgba(255,255,255,0.4), 0 0 10px ${city.color}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(selectedCity?.id === city.id ? null : city);
                    setHighlightedCity(city.id);
                  }}
                />
                <span className="city-label">{city.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Zoom Slider ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: "2rem",
          padding: "0 1rem",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>🔭</span>
        <input
          type="range"
          min={0.5}
          max={1.8}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          style={{ width: 140 }}
        />
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>🌍</span>
      </motion.div>

      {/* ── City Count hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: 12,
          marginTop: "0.75rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {CITIES.length} cidades · clica num ponto para saber mais
      </motion.p>

      {/* ── Info Card ── */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            key={selectedCity.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            style={{
              position: "fixed",
              top: "50%",
              right: "max(1.5rem, 2vw)",
              transform: "translateY(-50%)",
              width: "min(320px, calc(100vw - 3rem))",
              background: "rgba(8, 8, 28, 0.92)",
              border: `1px solid ${selectedCity.color}40`,
              borderRadius: 20,
              padding: "1.5rem",
              backdropFilter: "blur(24px)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${selectedCity.color}20, 0 0 40px ${selectedCity.color}15`,
              zIndex: 100,
              color: "white",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setSelectedCity(null);
                setHighlightedCity(null);
              }}
              style={{
                position: "absolute",
                top: 12,
                right: 14,
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              aria-label="Fechar"
            >
              ✕
            </button>

            {/* Flag + City name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
              <span style={{ fontSize: 40, lineHeight: 1 }}>{selectedCity.flag}</span>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: selectedCity.color,
                    lineHeight: 1.1,
                  }}
                >
                  {selectedCity.name}
                </h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 2 }}>
                  {selectedCity.country}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(to right, ${selectedCity.color}60, transparent)`,
                marginBottom: "1rem",
              }}
            />

            {/* Timezone */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: 18, marginTop: 1 }}>🕐</span>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 2,
                  }}
                >
                  Fuso Horário
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                  {selectedCity.timezone}
                </p>
              </div>
            </div>

            {/* Coordinates */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: 18, marginTop: 1 }}>📍</span>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 2,
                  }}
                >
                  Coordenadas
                </p>
                <p style={{ margin: 0, fontSize: 14, fontFamily: "monospace", color: "rgba(255,255,255,0.7)" }}>
                  {selectedCity.lat > 0 ? `${selectedCity.lat}°N` : `${Math.abs(selectedCity.lat)}°S`},{" "}
                  {selectedCity.lng > 0 ? `${selectedCity.lng}°E` : `${Math.abs(selectedCity.lng)}°W`}
                </p>
              </div>
            </div>

            {/* Fun fact */}
            <div
              style={{
                background: `${selectedCity.color}12`,
                border: `1px solid ${selectedCity.color}25`,
                borderRadius: 12,
                padding: "0.85rem 1rem",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: selectedCity.color,
                  marginBottom: 6,
                  opacity: 0.9,
                }}
              >
                💡 Facto Curioso
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                {selectedCity.funFact}
              </p>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
              {CITIES.map((c, idx) => {
                const currentIdx = CITIES.findIndex((x) => x.id === selectedCity.id);
                const prevCity = CITIES[(currentIdx - 1 + CITIES.length) % CITIES.length];
                const nextCity = CITIES[(currentIdx + 1) % CITIES.length];
                if (c.id !== prevCity.id && c.id !== nextCity.id) return null;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCity(c);
                      focusCity(c);
                    }}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      color: "rgba(255,255,255,0.7)",
                      cursor: "pointer",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    {c.id === prevCity.id ? "←" : "→"} {c.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── City List Tray (bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0.75rem 1rem",
          background:
            "linear-gradient(to top, rgba(3,0,20,0.95) 0%, rgba(3,0,20,0.7) 80%, transparent 100%)",
          display: "flex",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => focusCity(city)}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: 20,
              background:
                highlightedCity === city.id
                  ? `${city.color}30`
                  : "rgba(255,255,255,0.06)",
              border: `1px solid ${
                highlightedCity === city.id ? city.color : "rgba(255,255,255,0.1)"
              }`,
              color:
                highlightedCity === city.id ? city.color : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: highlightedCity === city.id ? 700 : 400,
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            <span>{city.flag}</span>
            <span>{city.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
