import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NALU Cabedelo | Bar de Praia · Figueira da Foz",
  description:
    "NALU é o bar de praia mais vibrante de Cabedelo. Petiscos, cocktails, música ao vivo e o pôr do sol mais bonito da Figueira da Foz. Onde o Mar Encontra o Sabor.",
};

export default function NaluLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-[#0A1628] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </div>
  );
}
