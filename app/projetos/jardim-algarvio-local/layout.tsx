import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "JardimAlgarvio | Jardinagem e Manutenção de Jardins no Algarve",
  description:
    "Serviço profissional de jardinagem e manutenção de jardins em todo o Algarve. Corte de relva, poda de árvores, sistemas de rega, limpeza de terrenos. Orçamento grátis. +500 clientes satisfeitos.",
  keywords: [
    "jardinagem Algarve",
    "manutenção jardins Faro",
    "corte relva Albufeira",
    "poda árvores Lagos",
    "jardineiro Algarve",
    "rega jardim Portimão",
  ],
};

applyProjectRouteMetadata(metadata, "/projetos/jardim-algarvio-local");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${jakarta.variable} ${inter.variable} bg-[#F8FAF7] text-[#1F2937]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}


