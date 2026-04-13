import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Visualizador Musical — Descomplicai",
  description:
    "Visualizador musical interativo com barras equalizador, ondas e padrão circular. Animações em tempo real com múltiplos temas de cor.",
  openGraph: {
    title: "Visualizador Musical — Descomplicai",
    description:
      "Visualizador musical interativo com 3 modos de visualização e 4 temas de cor.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/music-visualizer");

export default function MusicVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


