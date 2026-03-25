import type { Metadata } from "next";
import { Playfair_Display, Libre_Franklin } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAND Murtinheira — Cozinha Contemporânea Portuguesa | Figueira da Foz",
  description:
    "O restaurante mais bem avaliado da região de Figueira da Foz (9.7/10). Cozinha contemporânea portuguesa à beira do Atlântico, em Murtinheira. Sabores únicos, ingredientes locais.",
  openGraph: {
    title: "SAND Murtinheira",
    description: "9.7/10 — O melhor restaurante da costa da Figueira da Foz.",
    siteName: "SAND Murtinheira",
    locale: "pt_PT",
    type: "website",
  },
};

export default function SandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${libreFranklin.variable} antialiased`}
      style={{ fontFamily: "var(--font-libre-franklin), sans-serif" }}
    >
      {children}
    </div>
  );
}
