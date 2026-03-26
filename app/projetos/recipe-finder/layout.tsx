import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receitas Portuguesas — Descomplicai",
  description: "Encontra a receita perfeita da culinária portuguesa. Caldo Verde, Bacalhau à Brás, Pastel de Nata e muito mais.",
};

export default function RecipeFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
