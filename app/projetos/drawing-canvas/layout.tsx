import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quadro de Desenho — Descomplicai",
  description:
    "Quadro de desenho interativo com lápis, formas geométricas, borracha, desfazer/refazer e exportação em PNG. Funciona no browser, sem instalar nada.",
};

export default function DrawingCanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
