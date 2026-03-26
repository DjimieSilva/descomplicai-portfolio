import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC — Descomplicai",
  description:
    "Calcula o teu Índice de Massa Corporal (IMC) de forma simples. Suporte para sistema métrico e imperial, com dicas de saúde e histórico de cálculos.",
  openGraph: {
    title: "Calculadora de IMC — Descomplicai",
    description:
      "Descobre o teu IMC em segundos. Métrico ou imperial, com categorias visuais e dicas de saúde em português.",
    type: "website",
  },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
