import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JardimAlgarvio Premium | Paisagismo de Autor no Algarve",
  description:
    "Estudio de paisagismo e design de jardins no Algarve. Projetos exclusivos de arquitetura paisagista com plantas mediterranicas nativas, sistemas de rega eficientes e espacos exteriores de luxo.",
};

applyProjectRouteMetadata(metadata, "/projetos/jardim-algarvio-premium");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} bg-[#1A1A18] text-[#F5F0E8]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


