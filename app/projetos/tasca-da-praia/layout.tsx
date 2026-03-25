import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasca Da Praia — Peixe Fresco do Dia | Buarcos, Figueira da Foz",
  description:
    "Restaurante de pesca tradicional em Buarcos, Figueira da Foz. Peixe fresco do dia, caldeirada, arroz de marisco e a autêntica tradição da tasca piscatória da costa.",
};

export default function TascaDaPraiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${merriweather.variable} ${inter.variable} bg-[#F9FAFB] text-[#1E3A5F]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}
