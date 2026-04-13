import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Aurora Borealis — Simulador Interativo",
  description:
    "Simulador interativo de Aurora Boreal. Mova o rato para pintar o céu com luzes do norte.",
};

applyProjectRouteMetadata(metadata, "/projetos/aurora-borealis");

export default function AuroraBorealisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


