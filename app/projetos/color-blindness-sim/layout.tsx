import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Simulador de Daltonismo — Descomplicai",
  description:
    "Experimenta ver o mundo como alguém com daltonismo. Simula protanopia, deuteranopia e tritanopia com filtros CSS em tempo real.",
  openGraph: {
    title: "Simulador de Daltonismo — Descomplicai",
    description:
      "Ferramenta educativa interativa para designers e curiosos. Vê como 8% da população percebe as cores.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/color-blindness-sim");

export default function ColorBlindnessSimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


