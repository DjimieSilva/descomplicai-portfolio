import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Passwords — Descomplicai",
  description:
    "Gera passwords seguras com controlo total: comprimento, maiúsculas, números, símbolos e muito mais. Analisa a força em tempo real.",
  openGraph: {
    title: "Gerador de Passwords — Descomplicai",
    description:
      "Ferramenta interativa para criar passwords fortes e seguras. Mede a força, estima o tempo de quebra e guarda histórico.",
    type: "website",
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
