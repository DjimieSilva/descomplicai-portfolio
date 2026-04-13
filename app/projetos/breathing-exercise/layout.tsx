import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Exercício de Respiração — Descomplicai",
  description:
    "Exercício de respiração guiado e meditação visual. Escolhe o teu padrão de respiração e duração da sessão para relaxar, acalmar ou energizar.",
};

applyProjectRouteMetadata(metadata, "/projetos/breathing-exercise");

export default function BreathingExerciseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


