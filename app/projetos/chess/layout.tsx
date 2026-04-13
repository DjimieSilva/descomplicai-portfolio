import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Xadrez — Descomplicai",
  description: "Jogo de xadrez interativo com regras completas.",
};

applyProjectRouteMetadata(metadata, "/projetos/chess");

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


