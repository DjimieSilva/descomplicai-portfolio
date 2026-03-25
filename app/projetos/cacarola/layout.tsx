import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caçarola — Cozinha Portuguesa de Tradição | Figueira da Foz",
  description:
    "Sabores autênticos da cozinha portuguesa em Figueira da Foz. Cozido à portuguesa, bacalhau à brás, feijoada — receitas de tradição preparadas com o carinho da comida da avó. Dois espaços: Caçarola e Caçarola Dois.",
};

export default function CacarolaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sourceSerif4.variable} ${inter.variable} bg-[#FFFBEB] text-[#92400E]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}
