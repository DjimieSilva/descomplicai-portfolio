import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Fractal Explorer — Descomplicai",
  description:
    "Explorador interativo de fractais. Mandelbrot, Julia Set e Burning Ship com coloração contínua suave, zoom infinito e paletas personalizadas.",
};

applyProjectRouteMetadata(metadata, "/projetos/fractal-explorer");

export default function FractalExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


