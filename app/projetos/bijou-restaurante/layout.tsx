import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { EB_Garamond, Source_Sans_3 } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bijou Restaurante — Desde 1912 | Figueira da Foz",
  description:
    "Mais de 110 anos de tradição gastronómica no coração da Figueira da Foz. Cozinha portuguesa autêntica, transmitida de geração em geração desde 1912.",
};

applyProjectRouteMetadata(metadata, "/projetos/bijou-restaurante");

export default function BijouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${ebGaramond.variable} ${sourceSans3.variable} bg-[#FFFFF0] text-[#4A3728]`}
      style={{ fontFamily: "var(--font-source-sans-3), sans-serif" }}
    >
      {children}
    </div>
  );
}


