import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashcards — Descomplicai",
  description: "Estuda com flashcards interativos. Escolhe um baralho, vira as cartas e acompanha o teu progresso.",
};

export default function FlashcardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
