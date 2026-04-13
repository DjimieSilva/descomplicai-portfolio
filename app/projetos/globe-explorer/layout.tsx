import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Globo Interativo — Descomplicai",
  description:
    "Explora o mundo com um globo 3D interativo. Clica nas cidades para descobrir factos curiosos.",
};

applyProjectRouteMetadata(metadata, "/projetos/globe-explorer");

export default function GlobeExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


