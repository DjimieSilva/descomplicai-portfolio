import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Newsreader, Lora } from "next/font/google";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Descomplicai Organic — Nature-Inspired Design",
  description:
    "Versao organic do Descomplicai com tons terrosos, formas curvas e texturas naturais",
  openGraph: {
    title: "Descomplicai Organic — Nature-Inspired Design",
    description:
      "Tecnologia que cresce contigo. Design organico, humano e sustentavel.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-organic");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${newsreader.variable} ${lora.variable}`}>{children}</div>
  );
}
