import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Playground — Descomplicai",
  description:
    "Experimenta propriedades CSS em tempo real. Controla width, height, border-radius, box-shadow, transforms e muito mais com prévia ao vivo.",
  openGraph: {
    title: "CSS Playground — Descomplicai",
    description:
      "Ferramenta interativa para explorar CSS. Ajusta estilos com sliders e color pickers, copia o CSS gerado e aplica presets prontos.",
    type: "website",
  },
};

export default function CSSPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
