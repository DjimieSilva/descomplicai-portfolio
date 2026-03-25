import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pé na Areia | Restaurante de Praia · Figueira da Foz",
  description:
    "Pé na Areia é o restaurante de praia icónico da Figueira da Foz. Distinguido pela Seleção Gastronomia e Vinhos, oferece o melhor do mar com os pés na areia e vista para o oceano.",
};

export default function PeNaAreiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-[#1a1410] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </div>
  );
}
