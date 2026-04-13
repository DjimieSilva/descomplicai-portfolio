import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Zeff Pizza — 3 Conceitos de Website | Descomplicai",
  description: "Três conceitos de website para a Zeff Pizza de Figueira da Foz: Pirate Tavern, Figueira Sun e Roman Artisan.",
};
applyProjectRouteMetadata(metadata, "/projetos/zeff-pizza");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


