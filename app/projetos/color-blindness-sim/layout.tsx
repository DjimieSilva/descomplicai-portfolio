import type { Metadata } from "next";

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

export default function ColorBlindnessSimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
