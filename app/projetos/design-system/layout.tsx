import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

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

applyProjectRouteMetadata(metadata, "/projetos/design-system");

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


