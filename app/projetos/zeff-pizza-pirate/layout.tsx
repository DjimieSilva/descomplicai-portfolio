import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Zeff Pizza — A Taverna Pirata",
  description: "Website concept para Zeff Pizza, Figueira da Foz. Pizza romana artesanal.",
};
applyProjectRouteMetadata(metadata, "/projetos/zeff-pizza-pirate");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


