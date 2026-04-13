import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mesa dos Amigos — Cozinha Thai na Figueira da Foz",
  description:
    "A Tailândia chegou à Figueira da Foz. O único restaurante Thai da costa portuguesa com avaliação 9.2/10. Sabores autênticos, fusão perfeita.",
};

applyProjectRouteMetadata(metadata, "/projetos/mesa-dos-amigos");

export default function MesaDosAmigosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sora.variable} ${inter.variable} bg-[#292524] text-[#F5F0E8]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


