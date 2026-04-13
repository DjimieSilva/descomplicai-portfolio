import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Descomplicai Cosmos — Homepage Concept",
  description:
    "Uma viagem pelo cosmos digital. Estrutura Digital, Mentoria e Inteligencia Artificial — homepage conceptual descomplicai.pt com parallax, animacoes e experiencia imersiva.",
  openGraph: {
    title: "Descomplicai Cosmos — Homepage Concept",
    description:
      "Explore o universo da Descomplicai. Estrutura digital, mentoria e inteligencia artificial acessivel a todos.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-cosmos");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sora.variable} ${inter.variable}`}>{children}</div>
  );
}


