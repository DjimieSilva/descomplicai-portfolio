import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Globo Interativo — Descomplicai",
  description:
    "Explora o mundo com um globo 3D interativo. Clica nas cidades para descobrir factos curiosos.",
};

export default function GlobeExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
