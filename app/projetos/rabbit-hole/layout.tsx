import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "The Infinite Corridor — Descomplicai",
  description:
    "Uma experiência imersiva de mistério digital — 79 páginas, 11 secções, puzzles, narrativa não-linear e segredos escondidos. Prof. Chen Jiang, 2019–2021.",
  openGraph: {
    title: "The Infinite Corridor — Descomplicai",
    description:
      "Experiência imersiva de mistério — 79 páginas, narrativa não-linear, puzzles e segredos.",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/rabbit-hole");

export default function RabbitHoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


