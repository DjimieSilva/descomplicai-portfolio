import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisador de Texto — Descomplicai",
  description:
    "Analisa textos em tempo real: contagem de palavras, frases, legibilidade, palavras mais frequentes e muito mais.",
};

export default function TextAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
