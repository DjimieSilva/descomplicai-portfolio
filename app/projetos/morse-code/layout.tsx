import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Código Morse — Descomplicai",
  description:
    "Tradutor interativo de Código Morse em tempo real. Converte texto para morse e morse para texto, com animação de transmissão e referência completa do alfabeto.",
  openGraph: {
    title: "Código Morse — Descomplicai",
    description:
      "Traduz texto para Código Morse e vice-versa. Inclui animação de transmissão com lâmpada, controlo de velocidade e tabela de referência completa.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/morse-code");

export default function MorseCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


