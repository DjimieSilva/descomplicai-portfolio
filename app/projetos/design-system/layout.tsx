import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Descomplicai",
  description:
    "Showcase interativo do design system Descomplicai — 15 componentes, GSAP, Lenis, glassmorphism e mais.",
  openGraph: {
    title: "Design System — Descomplicai",
    description: "15 componentes UI premium. Glassmorphism, parallax, smooth scroll.",
    type: "website",
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
