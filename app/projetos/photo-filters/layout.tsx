import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Editor de Fotos — Descomplicai",
  description:
    "Editor de fotos no browser com filtros, presets Instagram, recorte, rotação e download. 100% local, sem uploads.",
  openGraph: {
    title: "Editor de Fotos — Descomplicai",
    description:
      "Aplica filtros, presets e ajustes à tua foto diretamente no browser. Nada é enviado para servidores.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/photo-filters");

export default function PhotoFiltersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


