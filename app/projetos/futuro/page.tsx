"use client";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { System } from "./components/System";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="section-divider" />
    </div>
  );
}

export default function FuturoPage() {
  return (
    <main
      className="futuro-root relative min-h-screen"
      style={{ background: "var(--background)" }}
    >
      <Nav />
      <Hero />
      <SectionDivider />
      <Manifesto />
      <SectionDivider />
      <System />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </main>
  );
}
