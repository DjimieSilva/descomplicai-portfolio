import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Analisador de Texto — Descomplicai",
  description:
    "Analisa textos em tempo real: contagem de palavras, frases, legibilidade, palavras mais frequentes e muito mais.",
};

applyProjectRouteMetadata(metadata, "/projetos/text-analyzer");

export default function TextAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


