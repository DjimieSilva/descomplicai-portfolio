import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Libre_Caslon_Text, Inter } from "next/font/google";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quinta da Salmanha | Restaurante & Eventos · Figueira da Foz",
  description:
    "Uma experiência gastronómica única numa quinta histórica com vista para o rio. Cozinha tradicional portuguesa, buffet diário e espaço de eventos para casamentos e celebrações junto ao Mondego.",
};

applyProjectRouteMetadata(metadata, "/projetos/quinta-da-salmanha");

export default function QuintaDaSalmanhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${libreCaslon.variable} ${inter.variable} bg-[#FEFCE8] text-[#3D2B1F]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


