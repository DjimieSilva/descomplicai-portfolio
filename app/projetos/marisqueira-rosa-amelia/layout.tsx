import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Newsreader, Inter } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marisqueira Rosa Amélia | A Casa do Marisco na Figueira da Foz",
  description:
    "A Marisqueira Rosa Amélia é a casa do marisco na Figueira da Foz. Tradição, frescura e sabor do mar: camarão, lagosta, sapateira, percebes e muito mais.",
};

applyProjectRouteMetadata(metadata, "/projetos/marisqueira-rosa-amelia");

export default function MarisqueiraRosaAmeliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${newsreader.variable} ${inter.variable} bg-[#FFF1E6] text-[#1D3557]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


