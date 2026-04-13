import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Mapa de Portugal — Descomplicai",
  description:
    "Mapa interativo de Portugal com 18 distritos e 2 regiões autónomas. Explora população, gastronomia e curiosidades de cada região.",
};

applyProjectRouteMetadata(metadata, "/projetos/mapa-portugal");

export default function MapaPortugalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


