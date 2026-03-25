import type { Metadata } from "next";
import { Public_Sans, Inter } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Casa dos Papagaios — Mercado Municipal | Figueira da Foz",
  description:
    "Restaurante premiado no coração do Mercado Municipal da Figueira da Foz. Do mercado para o prato — a frescura máxima todos os dias.",
};

export default function CasaDosPapagaiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${publicSans.variable} ${inter.variable} bg-[#FEF3C7] text-[#78350F]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}
