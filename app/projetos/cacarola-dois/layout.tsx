import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Caçarola Dois — O Mar na Mesa | Figueira da Foz",
  description:
    "Restaurante de frutos do mar contemporâneo em Figueira da Foz. O segundo capítulo da Caçarola, dedicado ao mar. Ceviches, tartares, arrozes e polvo à lagareiro. Reservas disponíveis.",
};

export default function CacarolaDoisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${hankenGrotesk.variable} ${inter.variable} bg-[#F1F5F9] text-[#0F172A]`}
    >
      {children}
    </div>
  );
}
