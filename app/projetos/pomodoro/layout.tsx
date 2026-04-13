import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Pomodoro Timer — Descomplicai",
  description:
    "Temporizador Pomodoro interativo. Gere o teu foco, pausas e sessões de trabalho com estilo.",
};

applyProjectRouteMetadata(metadata, "/projetos/pomodoro");

export default function PomodoroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


