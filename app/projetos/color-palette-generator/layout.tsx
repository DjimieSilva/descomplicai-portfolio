import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator — Descomplicai",
  description:
    "Gera paletas de cores harmoniosas com um clique. Exporta variáveis CSS, copia códigos hex e muito mais.",
  openGraph: {
    title: "Color Palette Generator — Descomplicai",
    description:
      "Gerador de paletas de cores interativo. Algoritmo HSL com golden ratio para combinações sempre harmoniosas.",
    type: "website",
  },
};

export default function ColorPaletteGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
