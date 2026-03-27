import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Científica — Descomplicai",
  description:
    "Calculadora científica completa com funções trigonométricas, logarítmicas, memória e histórico de cálculos. Modo DEG/RAD, expressões complexas e suporte a teclado.",
  openGraph: {
    title: "Calculadora Científica — Descomplicai",
    description:
      "Calculadora científica com sin, cos, tan, log, ln, raízes, potências, memória e histórico — direto no browser.",
    type: "website",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
