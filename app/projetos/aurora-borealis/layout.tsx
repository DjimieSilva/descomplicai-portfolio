import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Borealis — Simulador Interativo",
  description:
    "Simulador interativo de Aurora Boreal. Mova o rato para pintar o céu com luzes do norte.",
};

export default function AuroraBorealisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
