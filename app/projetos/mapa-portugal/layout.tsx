import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa de Portugal — Descomplicai",
  description:
    "Mapa interativo de Portugal com 18 distritos e 2 regiões autónomas. Explora população, gastronomia e curiosidades de cada região.",
};

export default function MapaPortugalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
