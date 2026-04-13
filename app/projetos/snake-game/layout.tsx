import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Snake Game — Descomplicai",
  description: "Jogo da cobra clássico com modos de dificuldade, temas de cores e controlos tácteis.",
};

applyProjectRouteMetadata(metadata, "/projetos/snake-game");

export default function SnakeGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


