import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arte Generativa — Descomplicai",
  description:
    "Motor de arte generativa com 8 algoritmos: Fluxo, Árvore fractal, Espiral de Fibonacci, Ondas de interferência, Galáxia espiral, Mosaico Voronoi, Labirinto e Constelação. Arte de galeria gerada no browser.",
};

export default function GenerativeArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
