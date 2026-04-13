import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Tabela Periódica Interativa — Descomplicai",
  description:
    "Explore todos os 118 elementos químicos com detalhes completos, filtros por categoria, busca e simulador de temperatura. Uma experiência interativa e visual da tabela periódica.",
};

applyProjectRouteMetadata(metadata, "/projetos/periodic-table");

export default function PeriodicTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


