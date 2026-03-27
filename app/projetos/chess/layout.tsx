import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xadrez — Descomplicai",
  description: "Jogo de xadrez interativo com regras completas.",
};

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
