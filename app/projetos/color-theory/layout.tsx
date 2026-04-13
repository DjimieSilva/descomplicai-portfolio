import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Teoria da Cor — Descomplicai",
  description:
    "Explorador interativo de teoria das cores: roda cromática, harmonias, contrastes WCAG, simulação de daltonismo e muito mais.",
};

applyProjectRouteMetadata(metadata, "/projetos/color-theory");

export default function ColorTheoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


