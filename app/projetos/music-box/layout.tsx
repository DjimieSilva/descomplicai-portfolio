import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caixa de Música — Descomplicai",
  description:
    "Piano interativo com teclado de 2 oitavas, gravação de melodias e múltiplos instrumentos. Toca, grava e reproduz as tuas composições.",
};

export default function MusicBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
