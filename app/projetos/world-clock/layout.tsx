import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Relógio Mundial — Descomplicai",
  description:
    "Dashboard de fusos horários mundiais com relógio analógico, clocks digitais e planeador de reuniões.",
};

applyProjectRouteMetadata(metadata, "/projetos/world-clock");

export default function WorldClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


