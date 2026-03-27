import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teoria da Cor — Descomplicai",
  description:
    "Explorador interativo de teoria das cores: roda cromática, harmonias, contrastes WCAG, simulação de daltonismo e muito mais.",
};

export default function ColorTheoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
