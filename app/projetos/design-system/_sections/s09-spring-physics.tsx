"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DotGrid } from "@/components/ui/dot-grid";

/* ---------- types ---------- */

interface SpringPreset {
  name: string;
  stiffness: number;
  damping: number;
  mass: number;
  description: string;
}

/* ---------- data ---------- */

const variables = [
  {
    symbol: "k",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    label: "Stiffness",
    description: "Quao forte a mola puxa de volta",
  },
  {
    symbol: "x",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    label: "Displacement",
    description: "Distancia do ponto de repouso",
  },
  {
    symbol: "b",
    color: "text-cyan-600",
    bg: "bg-cyan-50 border-cyan-200",
    label: "Damping",
    description: "Resistencia ao movimento (atrito)",
  },
  {
    symbol: "v",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    label: "Velocity",
    description: "Velocidade actual do objecto",
  },
];

const presets: SpringPreset[] = [
  {
    name: "Rapido & Snappy",
    stiffness: 400,
    damping: 30,
    mass: 0.8,
    description: "Botoes, toggles, tooltips",
  },
  {
    name: "Suave & Natural",
    stiffness: 200,
    damping: 20,
    mass: 1,
    description: "Cards, modais, transicoes",
  },
  {
    name: "Lento & Dramatico",
    stiffness: 80,
    damping: 15,
    mass: 2,
    description: "Hero elements, page transitions",
  },
];

/* ---------- component ---------- */

export function SpringPhysicsSection() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(1);

  /* spring simulation state */
  const [position, setPosition] = useState(0);
  const simRef = useRef<{
    velocity: number;
    position: number;
    target: number;
    running: boolean;
  }>({ velocity: 0, position: 0, target: 0, running: false });
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const stopSimulation = useCallback(() => {
    simRef.current.running = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const tick = useCallback(
    (time: number) => {
      if (!simRef.current.running) return;

      const dt = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 1000, 0.064)
        : 0.016;
      lastTimeRef.current = time;

      const sim = simRef.current;
      const force = stiffness * (sim.target - sim.position);
      const dampingForce = damping * sim.velocity;
      const acceleration = (force - dampingForce) / mass;
      sim.velocity += acceleration * dt;
      sim.position += sim.velocity * dt;

      setPosition(sim.position);

      /* settle check */
      if (
        Math.abs(sim.velocity) < 0.001 &&
        Math.abs(sim.target - sim.position) < 0.001
      ) {
        sim.position = sim.target;
        sim.velocity = 0;
        sim.running = false;
        setPosition(sim.target);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [stiffness, damping, mass]
  );

  const fire = useCallback(() => {
    stopSimulation();
    const nextTarget = simRef.current.target === 0 ? 1 : 0;
    simRef.current = {
      velocity: 0,
      position: simRef.current.target === 0 ? 0 : 1,
      target: nextTarget,
      running: true,
    };
    lastTimeRef.current = 0;
    setPosition(simRef.current.position);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, stopSimulation]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const applyPreset = useCallback(
    (preset: SpringPreset) => {
      stopSimulation();
      setStiffness(preset.stiffness);
      setDamping(preset.damping);
      setMass(preset.mass);
      simRef.current = { velocity: 0, position: 0, target: 0, running: false };
      setPosition(0);
    },
    [stopSimulation]
  );

  return (
    <section className="relative bg-white py-32 px-6 overflow-hidden">
      <DotGrid opacity={0.04} />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 08"
          title="Fisica de Springs"
          description="Animacoes lineares parecem roboticas. Springs trazem a naturalidade do mundo fisico para o digital."
        />

        {/* ---------- A Equacao ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            A Equacao
          </h3>

          <GlassCard className="mx-auto max-w-3xl text-center" hover={false}>
            <p className="font-mono text-3xl md:text-4xl tracking-wide">
              <span className="text-slate-800">F = </span>
              <span className="text-slate-800">-</span>
              <span className="text-blue-600 font-bold">k</span>
              <span className="text-purple-600 font-bold">x</span>
              <span className="text-slate-800"> - </span>
              <span className="text-cyan-600 font-bold">b</span>
              <span className="text-emerald-600 font-bold">v</span>
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Lei de Hooke com amortecimento — a equacao fundamental das
              animacoes spring
            </p>
          </GlassCard>

          <StaggerContainer
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {variables.map((v) => (
              <div
                key={v.symbol}
                className={`rounded-xl border p-4 ${v.bg}`}
                data-hover
              >
                <span className={`font-mono text-2xl font-bold ${v.color}`}>
                  {v.symbol}
                </span>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {v.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">{v.description}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>

        {/* ---------- Visualizador de Spring ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Visualizador de Spring
          </h3>

          <GlassCard className="mx-auto max-w-3xl" hover={false}>
            {/* sliders */}
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              {/* stiffness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Stiffness
                  </label>
                  <span className="text-sm font-bold text-blue-600">
                    {stiffness}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={500}
                  step={10}
                  value={stiffness}
                  onChange={(e) => setStiffness(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  data-hover
                />
              </div>

              {/* damping */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Damping
                  </label>
                  <span className="text-sm font-bold text-cyan-600">
                    {damping}
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={damping}
                  onChange={(e) => setDamping(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                  data-hover
                />
              </div>

              {/* mass */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500">
                    Mass
                  </label>
                  <span className="text-sm font-bold text-emerald-600">
                    {mass.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  data-hover
                />
              </div>
            </div>

            {/* animation track */}
            <div className="relative h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30 transition-none"
                style={{
                  left: `calc(${Math.min(Math.max(position, 0), 1) * 100}% - ${position * 4}rem)`,
                }}
              />
            </div>

            {/* fire button */}
            <div className="mt-6 text-center">
              <MagneticButton
                className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white"
                onClick={fire}
                data-hover
              >
                Disparar
              </MagneticButton>
            </div>

            {/* code block */}
            <div className="mt-6 rounded-lg bg-slate-900 px-5 py-4 overflow-x-auto">
              <code className="text-sm font-mono text-slate-300">
                <span className="text-slate-500">{"// "}</span>
                <span className="text-purple-400">transition</span>
                <span className="text-slate-500">{": {"}</span>
                {"\n  "}
                <span className="text-cyan-400">type</span>
                <span className="text-slate-500">{": "}</span>
                <span className="text-emerald-400">{'"spring"'}</span>
                <span className="text-slate-500">,</span>
                {"\n  "}
                <span className="text-cyan-400">stiffness</span>
                <span className="text-slate-500">{": "}</span>
                <span className="text-amber-400">{stiffness}</span>
                <span className="text-slate-500">,</span>
                {"\n  "}
                <span className="text-cyan-400">damping</span>
                <span className="text-slate-500">{": "}</span>
                <span className="text-amber-400">{damping}</span>
                <span className="text-slate-500">,</span>
                {"\n  "}
                <span className="text-cyan-400">mass</span>
                <span className="text-slate-500">{": "}</span>
                <span className="text-amber-400">{mass}</span>
                {"\n"}
                <span className="text-slate-500">{"}"}</span>
              </code>
            </div>
          </GlassCard>
        </div>

        {/* ---------- Presets ---------- */}
        <div className="mb-20">
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Presets
          </h3>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-3"
            staggerDelay={0.1}
          >
            {presets.map((preset) => (
              <GlassCard key={preset.name} data-hover>
                <Spotlight size={180} />

                <h4 className="text-lg font-bold text-slate-900">
                  {preset.name}
                </h4>

                <div className="mt-3 space-y-1">
                  <p className="text-xs font-mono text-slate-500">
                    stiffness:{" "}
                    <span className="text-blue-600">{preset.stiffness}</span>
                  </p>
                  <p className="text-xs font-mono text-slate-500">
                    damping:{" "}
                    <span className="text-cyan-600">{preset.damping}</span>
                  </p>
                  <p className="text-xs font-mono text-slate-500">
                    mass:{" "}
                    <span className="text-emerald-600">{preset.mass}</span>
                  </p>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {preset.description}
                </p>

                <div className="mt-4">
                  <MagneticButton
                    className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={() => applyPreset(preset)}
                    data-hover
                  >
                    Aplicar
                  </MagneticButton>
                </div>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>

        {/* ---------- Spring vs Linear vs Ease ---------- */}
        <div>
          <h3 className="mb-8 text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Spring vs Linear vs Ease
          </h3>

          <div className="mx-auto max-w-2xl space-y-6">
            {/* Linear */}
            <div>
              <div className="relative h-10 rounded-full bg-slate-100 border border-slate-200">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                  {[0, 0.2, 0.4, 0.6, 0.8, 1].map((p) => (
                    <div
                      key={`linear-${p}`}
                      className="w-3 h-3 rounded-full bg-slate-400"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Linear:</span>{" "}
                velocidade constante, robotico
              </p>
            </div>

            {/* Ease-out */}
            <div>
              <div className="relative h-10 rounded-full bg-slate-100 border border-slate-200">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center px-2">
                  {[0, 0.35, 0.58, 0.74, 0.88, 1].map((p, i) => (
                    <div
                      key={`ease-${i}`}
                      className="w-3 h-3 rounded-full bg-amber-500"
                      style={{
                        position: "absolute",
                        left: `calc(${p * 100}% - 6px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Ease-out:</span>{" "}
                desacelera no final, previsivel
              </p>
            </div>

            {/* Spring */}
            <div>
              <div className="relative h-10 rounded-full bg-slate-100 border border-slate-200">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center px-2">
                  {[0, 0.4, 0.75, 1.08, 0.97, 1].map((p, i) => (
                    <div
                      key={`spring-${i}`}
                      className="w-3 h-3 rounded-full bg-blue-500"
                      style={{
                        position: "absolute",
                        left: `calc(${Math.min(p, 1.1) * 90}% - 6px + 5%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Spring:</span>{" "}
                overshoot natural, organico
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
