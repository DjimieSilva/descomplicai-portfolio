import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jogo da Memória — Descomplicai",
  description:
    "Treina a memória com este jogo de cartas interativo. Encontra todos os pares e bate o teu recorde!",
};

export default function MemoryGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
