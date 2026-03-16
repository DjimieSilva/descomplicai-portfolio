"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurText } from "@/components/ui/blur-text";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { GlowCard } from "@/components/ui/glow-card";

/* ─── Tech Stack Data ─── */

const majorTech = [
  { name: "Next.js 16", icon: "N", color: "bg-blue-500", subtitle: "Framework" },
  { name: "React 19", icon: "R", color: "bg-cyan-500", subtitle: "UI Library" },
  { name: "TypeScript", icon: "TS", color: "bg-blue-600", subtitle: "Linguagem" },
  { name: "Tailwind v4", icon: "T", color: "bg-teal-500", subtitle: "Styling" },
  { name: "GSAP", icon: "G", color: "bg-green-500", subtitle: "Animacoes" },
];

const supportingTech = [
  "Framer Motion",
  "Lenis",
  "Sharp",
  "CSS Custom Properties",
  "IntersectionObserver",
  "Spring Physics",
  "requestAnimationFrame",
  "ScrollTrigger",
];

/* ─── TechStackSection ─── */

export function TechStackSection() {
  return (
    <section className="relative bg-white border-b border-slate-100 py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            Construido Com
          </span>
        </div>

        {/* Major tech — row 1 */}
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8"
          direction="up"
          staggerDelay={0.04}
        >
          {majorTech.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-200"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${tech.color} text-sm font-bold text-white`}
              >
                {tech.icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900">{tech.name}</p>
                <p className="text-xs text-slate-400">{tech.subtitle}</p>
              </div>
            </div>
          ))}
        </StaggerContainer>

        {/* Supporting tech — row 2 */}
        <StaggerContainer
          className="flex flex-wrap justify-center gap-2"
          direction="up"
          staggerDelay={0.04}
        >
          {supportingTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-blue-200 hover:text-blue-600"
            >
              {tech}
            </span>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── FooterSection ─── */

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 py-20 px-6">
      <AnimatedGradient />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Brand */}
        <BlurText
          text="Descomplicai"
          className="text-5xl font-bold"
          animateBy="letters"
          gradient
          as="h2"
        />

        {/* Subtitle */}
        <p className="mt-4 text-lg text-slate-500">
          Design System Masterclass v3.0
        </p>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-500">
          16 capitulos &middot; 15 componentes &middot; Construido com Next.js,
          GSAP, Lenis e Framer Motion. De engenheiros para engenheiros.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="/"
            className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            Voltar ao Inicio
          </MagneticButton>

          <MagneticButton
            href="/projetos"
            className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            Ver Projetos
          </MagneticButton>
        </div>

        {/* Copyright */}
        <p className="mt-16 text-xs text-slate-600">
          &copy; 2026 Descomplicai &mdash; Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
