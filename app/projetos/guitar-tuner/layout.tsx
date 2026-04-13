import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Afinador de Guitarra — Descomplicai",
  description:
    "Afinador de guitarra interativo com biblioteca de acordes. Tons de referência via Web Audio API, afinações alternativas e diagramas de acordes com reprodução.",
  openGraph: {
    title: "Afinador de Guitarra — Descomplicai",
    description:
      "Afina a tua guitarra online com tons de referência precisos. Explora acordes com diagramas interativos e reprodução de áudio.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/guitar-tuner");

export default function GuitarTunerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


