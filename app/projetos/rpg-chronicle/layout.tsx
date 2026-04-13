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
  title: "Descomplicai Chronicle — A Jornada",
  description:
    "Uma jornada cinematica pelo mundo da inteligencia artificial. Portfolio interativo de Jaime com parallax, RPG narrativo e scroll experience.",
};

applyProjectRouteMetadata(metadata, "/projetos/rpg-chronicle");

export default function ChronicleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sora.variable} ${inter.variable}`}
      style={{ background: "#030014" }}
    >
      {children}
    </div>
  );
}


