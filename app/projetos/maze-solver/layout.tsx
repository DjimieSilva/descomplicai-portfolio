import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Labirinto — Descomplicai",
  description:
    "Gera e resolve labirintos com algoritmos clássicos. Escolhe entre Recursive Backtracker, Kruskal e Prim para gerar, e BFS, DFS ou A* para resolver. Modo jogador com controlos de teclado.",
};

applyProjectRouteMetadata(metadata, "/projetos/maze-solver");

export default function MazeSolverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


