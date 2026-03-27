import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fractal Explorer — Descomplicai",
  description:
    "Explorador interativo de fractais. Mandelbrot, Julia Set e Burning Ship com coloração contínua suave, zoom infinito e paletas personalizadas.",
};

export default function FractalExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
