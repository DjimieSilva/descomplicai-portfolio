import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Drum Machine — Descomplicai",
  description:
    "Drum machine retro com sequenciador de 16 passos, 8 sons sintetizados via Web Audio API, swing, tap tempo e padrões pré-definidos.",
  openGraph: {
    title: "Drum Machine — Descomplicai",
    description:
      "Sequenciador rítmico com Web Audio API, estética retro neon, swing, tap tempo e export JSON.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/drum-machine");

export default function DrumMachineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


