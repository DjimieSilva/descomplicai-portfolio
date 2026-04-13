import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Flashcards — Descomplicai",
  description: "Estuda com flashcards interativos. Escolhe um baralho, vira as cartas e acompanha o teu progresso.",
};

applyProjectRouteMetadata(metadata, "/projetos/flashcards");

export default function FlashcardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


