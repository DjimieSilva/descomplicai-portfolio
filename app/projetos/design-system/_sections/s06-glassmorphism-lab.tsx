"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StaggerContainer } from "@/components/ui/stagger-container";

const DEFAULTS = {
  blur: 20,
  saturation: 180,
  opacity: 8,
  borderOpacity: 15,
} as const;

const presets = [
  {
    name: "Subtil",
    desc: "Quase transparente. Ideal para overlays de navegacao onde o conteudo atras deve permanecer legivel.",
    blur: 12,
    saturation: 150,
    opacity: 5,
    borderOpacity: 10,
  },
  {
    name: "Standard",
    desc: "O equilibrio perfeito entre visibilidade e transparencia. Usado na maioria dos cards deste site.",
    blur: 20,
    saturation: 180,
    opacity: 8,
    borderOpacity: 15,
  },
  {
    name: "Heavy",
    desc: "Mais opaco e com mais blur. Bom para modais, tooltips e elementos que precisam de mais destaque.",
    blur: 30,
    saturation: 200,
    opacity: 12,
    borderOpacity: 25,
  },
] as const;

export function GlassmorphismLabSection() {
  const [blurValue, setBlurValue] = useState<number>(DEFAULTS.blur);
  const [saturation, setSaturation] = useState<number>(DEFAULTS.saturation);
  const [opacity, setOpacity] = useState<number>(DEFAULTS.opacity);
  const [borderOpacity, setBorderOpacity] = useState<number>(DEFAULTS.borderOpacity);

  function resetAll() {
    setBlurValue(DEFAULTS.blur);
    setSaturation(DEFAULTS.saturation);
    setOpacity(DEFAULTS.opacity);
    setBorderOpacity(DEFAULTS.borderOpacity);
  }

  function applyPreset(preset: (typeof presets)[number]) {
    setBlurValue(preset.blur);
    setSaturation(preset.saturation);
    setOpacity(preset.opacity);
    setBorderOpacity(preset.borderOpacity);
  }

  const cssCode = `backdrop-filter: blur(${blurValue}px) saturate(${saturation}%);
background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});`;

  return (
    <section className="relative bg-slate-50 py-32 px-6 overflow-hidden">
      <AnimatedGradient />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label="Capitulo 04"
          title="Laboratorio de Glassmorphism"
          description="O efeito de vidro digital depende de 4 variaveis. Ajuste cada uma e observe o resultado."
        />

        {/* Interactive Lab */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {/* Controls — Left Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Controlos</h3>

            {/* Backdrop Blur */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Backdrop Blur
                </label>
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {blurValue}px
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={blurValue}
                onChange={(e) => setBlurValue(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-500"
                data-hover
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0px</span>
                <span>40px</span>
              </div>
            </div>

            {/* Saturacao */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Saturacao
                </label>
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {saturation}%
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={300}
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-500"
                data-hover
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>100%</span>
                <span>300%</span>
              </div>
            </div>

            {/* Opacidade do Fundo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Opacidade do Fundo
                </label>
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {(opacity / 100).toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-500"
                data-hover
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0.00</span>
                <span>0.30</span>
              </div>
            </div>

            {/* Opacidade da Borda */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Opacidade da Borda
                </label>
                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {(borderOpacity / 100).toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-500"
                data-hover
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0.00</span>
                <span>0.40</span>
              </div>
            </div>

            {/* Reset Button */}
            <MagneticButton
              className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              onClick={resetAll}
              data-hover
            >
              Reset para Defaults
            </MagneticButton>

            {/* Generated CSS */}
            <div className="rounded-xl bg-slate-900 p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] font-mono text-slate-500">
                  CSS gerado
                </span>
              </div>
              <pre className="font-mono text-xs leading-relaxed text-green-400 whitespace-pre-wrap">
                {cssCode}
              </pre>
            </div>
          </div>

          {/* Preview — Right 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Preview ao Vivo
            </h3>

            {/* Colorful Background with Glass Preview */}
            <div
              className="relative min-h-[480px] rounded-2xl overflow-hidden p-8 flex flex-col items-center justify-center gap-6"
              style={{
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              }}
            >
              {/* Gradient circles */}
              <div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute top-[10%] right-[-5%] w-[50%] h-[50%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-[10%] right-[10%] w-[35%] h-[35%] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)",
                }}
              />

              {/* Main Preview Card */}
              <div
                className="relative z-10 w-full max-w-md transition-all duration-300"
                style={{
                  backdropFilter: `blur(${blurValue}px) saturate(${saturation}%)`,
                  WebkitBackdropFilter: `blur(${blurValue}px) saturate(${saturation}%)`,
                  background: `rgba(255, 255, 255, ${opacity / 100})`,
                  border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
                  borderRadius: 24,
                  padding: 32,
                }}
              >
                <h4 className="text-xl font-bold text-white mb-2">
                  GlassCard Preview
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  Este card usa os valores que definiste nos controlos. Experimenta
                  mover os sliders e observa como o efeito de vidro muda em tempo
                  real sobre este fundo colorido.
                </p>
                <div className="inline-flex items-center rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white border border-white/10 transition-colors hover:bg-white/20 cursor-pointer">
                  Botao de Exemplo
                </div>
              </div>

              {/* Smaller Preview Card */}
              <div
                className="relative z-10 w-full max-w-xs transition-all duration-300"
                style={{
                  backdropFilter: `blur(${blurValue}px) saturate(${saturation}%)`,
                  WebkitBackdropFilter: `blur(${blurValue}px) saturate(${saturation}%)`,
                  background: `rgba(255, 255, 255, ${opacity / 100})`,
                  border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
                  borderRadius: 24,
                  padding: 32,
                }}
              >
                <h4 className="text-base font-semibold text-white mb-1">
                  Card Secundario
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  O mesmo efeito numa escala menor. Repara como o blur se comporta
                  com menos area de fundo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Recipes */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3 text-center">
            Receitas Prontas
          </h3>
          <p className="text-slate-500 text-center mb-8 max-w-xl mx-auto">
            Tres configuracoes testadas e aprovadas. Clica em &quot;Aplicar&quot; para
            carregar os valores nos sliders acima.
          </p>

          <StaggerContainer
            className="grid gap-6 md:grid-cols-3"
            staggerDelay={0.1}
          >
            {presets.map((preset) => (
              <GlassCard key={preset.name} className="relative">
                <Spotlight size={180} />

                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                  {preset.name}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {preset.desc}
                </p>

                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">blur</span>
                    <span className="font-mono text-slate-700">{preset.blur}px</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">saturate</span>
                    <span className="font-mono text-slate-700">{preset.saturation}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">opacity</span>
                    <span className="font-mono text-slate-700">
                      {(preset.opacity / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">border</span>
                    <span className="font-mono text-slate-700">
                      {(preset.borderOpacity / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                <MagneticButton
                  className="w-full rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                  onClick={() => applyPreset(preset)}
                  data-hover
                >
                  Aplicar
                </MagneticButton>
              </GlassCard>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
