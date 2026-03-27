import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sintetizador — Descomplicai",
  description:
    "Sintetizador interativo com teclado de 3 oitavas, ADSR envelope, filtros, efeitos (reverb, delay, distortion) e osciloscópio em tempo real.",
  openGraph: {
    title: "Sintetizador — Descomplicai",
    description:
      "Sintetizador web com Web Audio API, polifonia, presets e visual retro neon.",
    type: "website",
  },
};

export default function SynthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
