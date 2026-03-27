import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabela Periódica Interativa — Descomplicai",
  description:
    "Explore todos os 118 elementos químicos com detalhes completos, filtros por categoria, busca e simulador de temperatura. Uma experiência interativa e visual da tabela periódica.",
};

export default function PeriodicTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
