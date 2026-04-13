import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Roda da Decisão — Descomplicai",
  description:
    "Deixa a roda decidir por ti! Gira a roda da decisão com as tuas opções e descobre o resultado de forma divertida.",
};

applyProjectRouteMetadata(metadata, "/projetos/decision-wheel");

export default function DecisionWheelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


