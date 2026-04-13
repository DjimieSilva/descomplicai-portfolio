import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Portfolio Builder — Descomplicai",
  description:
    "Cria o teu portfolio profissional em minutos. Preenche os campos, escolhe um template e exporta um ficheiro HTML pronto a usar.",
  openGraph: {
    title: "Portfolio Builder — Descomplicai",
    description:
      "Ferramenta interativa para criar portfolios profissionais. Três templates, preview em tempo real e exportação HTML.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/portfolio-builder");

export default function PortfolioBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


