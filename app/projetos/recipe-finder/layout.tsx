import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Receitas Portuguesas — Descomplicai",
  description: "Encontra a receita perfeita da culinária portuguesa. Caldo Verde, Bacalhau à Brás, Pastel de Nata e muito mais.",
};

applyProjectRouteMetadata(metadata, "/projetos/recipe-finder");

export default function RecipeFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


