import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Art Gallery — Descomplicai",
  description:
    "Galeria de arte feita 100% em CSS puro. Seis ilustrações criadas apenas com divs, gradientes, borders e clip-path — sem imagens, sem SVG, sem canvas.",
};

export default function CSSArtGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
