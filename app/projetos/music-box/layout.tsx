import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Caixa de Música — Descomplicai",
  description:
    "Piano interativo com teclado de 2 oitavas, gravação de melodias e múltiplos instrumentos. Toca, grava e reproduz as tuas composições.",
};

applyProjectRouteMetadata(metadata, "/projetos/music-box");

export default function MusicBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


