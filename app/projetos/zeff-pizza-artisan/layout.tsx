import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Zeff Pizza — Roman Artisan",
  description: "Website concept para Zeff Pizza, Figueira da Foz. Pizza romana artesanal.",
};
applyProjectRouteMetadata(metadata, "/projetos/zeff-pizza-artisan");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


