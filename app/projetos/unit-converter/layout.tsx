import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Conversor de Unidades — Descomplicai",
  description:
    "Converte unidades de comprimento, peso, temperatura, velocidade, volume e área em tempo real. Simples, rápido e sem complicações.",
  openGraph: {
    title: "Conversor de Unidades — Descomplicai",
    description:
      "Ferramenta gratuita para converter qualquer unidade de medida. Comprimento, peso, temperatura, velocidade, volume e área.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/unit-converter");

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


