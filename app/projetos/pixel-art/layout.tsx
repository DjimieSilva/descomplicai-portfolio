import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixel Art Editor — Descomplicai",
  description:
    "Editor de pixel art interativo no browser. Pinta, apaga, preenche e exporta como PNG. Com paleta de cores, templates e suporte a toque.",
  openGraph: {
    title: "Pixel Art Editor — Descomplicai",
    description:
      "Cria pixel art diretamente no browser. Ferramentas de pincel, borracha, balde e conta-gotas. Exporta como PNG.",
    type: "website",
  },
};

export default function PixelArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
