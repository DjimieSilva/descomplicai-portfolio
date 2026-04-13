import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Sistema Solar — Explorador Interativo",
  description:
    "Explore o Sistema Solar de forma interativa. Clique nos planetas para descobrir curiosidades sobre Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Urano e Neptuno.",
};

applyProjectRouteMetadata(metadata, "/projetos/solar-system");

export default function SolarSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


