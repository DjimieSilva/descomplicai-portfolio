import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System Masterclass — Descomplicai",
  description:
    "Masterclass interativa com 16 capitulos — 15 componentes UI, GSAP, Lenis, spring physics, glassmorphism e mais.",
  openGraph: {
    title: "Design System Masterclass — Descomplicai",
    description: "16 capitulos. 15 componentes. Uma masterclass interativa sobre engenharia de interfaces.",
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
