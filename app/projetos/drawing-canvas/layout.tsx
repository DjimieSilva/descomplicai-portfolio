import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Quadro de Desenho — Descomplicai",
  description:
    "Quadro de desenho interativo com lápis, formas geométricas, borracha, desfazer/refazer e exportação em PNG. Funciona no browser, sem instalar nada.",
};

applyProjectRouteMetadata(metadata, "/projetos/drawing-canvas");

export default function DrawingCanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


