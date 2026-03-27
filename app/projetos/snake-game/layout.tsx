import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snake Game — Descomplicai",
  description: "Jogo da cobra clássico com modos de dificuldade, temas de cores e controlos tácteis.",
};

export default function SnakeGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
