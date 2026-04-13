import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Domine, Inter } from "next/font/google";

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Café Praça 18 — O Coração da Figueira | Figueira da Foz",
  description:
    "O café mais bem avaliado da Figueira da Foz. Avaliação 9.6/10. Pequenos-almoços, almoços, pastéis de nata e café de qualidade no coração da Praça.",
};

applyProjectRouteMetadata(metadata, "/projetos/cafe-praca-18");

export default function CafePraca18Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${domine.variable} ${inter.variable}`}
      style={{
        fontFamily: "var(--font-inter), sans-serif",
        backgroundColor: "#FFF8F0",
        color: "#3C1518",
      }}
    >
      {children}
    </div>
  );
}


