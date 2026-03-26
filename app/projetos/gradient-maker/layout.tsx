import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Maker — Descomplicai",
  description:
    "Cria gradientes CSS personalizados com prévia em tempo real. Escolhe cores, direção e copia o CSS gerado.",
  openGraph: {
    title: "Gradient Maker — Descomplicai",
    description:
      "Ferramenta interativa para criar gradientes CSS. Prévia ao vivo, presets prontos e cópia de código com um clique.",
    type: "website",
  },
};

export default function GradientMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
