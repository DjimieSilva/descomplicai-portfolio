import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pé no Bairro — Cozinha de Bairro com Alma | Figueira da Foz",
  description:
    "Restaurante de bairro contemporâneo em Figueira da Foz. Comida portuguesa com alma: bifanas gourmet, francesinhas, petiscos e muito mais. Reservas disponíveis.",
};

applyProjectRouteMetadata(metadata, "/projetos/pe-no-bairro");

export default function PeNoBairroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} bg-[#171717] text-white`}
    >
      {children}
    </div>
  );
}


