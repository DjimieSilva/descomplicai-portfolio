import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Literata, Inter } from "next/font/google";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O Picadeiro — Referência Gastronómica | Figueira da Foz",
  description:
    "Cozinha portuguesa refinada no coração da Figueira da Foz. Ingredientes da época, técnicas tradicionais, apresentação contemporânea. Reserve a sua mesa.",
};

applyProjectRouteMetadata(metadata, "/projetos/o-picadeiro");

export default function OPicadeiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${literata.variable} ${inter.variable} bg-[#FFFBEB] text-[#292524]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


