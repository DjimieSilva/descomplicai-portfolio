import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Arte Generativa — Descomplicai",
  description:
    "Motor de arte generativa com 8 algoritmos: Fluxo, Árvore fractal, Espiral de Fibonacci, Ondas de interferência, Galáxia espiral, Mosaico Voronoi, Labirinto e Constelação. Arte de galeria gerada no browser.",
};

applyProjectRouteMetadata(metadata, "/projetos/generative-art");

export default function GenerativeArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


