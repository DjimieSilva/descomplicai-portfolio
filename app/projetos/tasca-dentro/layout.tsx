import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Tás-cá Dentro — Gastrobar de Autor",
  description: "Cozinha de autor, carta de vinhos premium e música ao vivo na Figueira da Foz",
};
applyProjectRouteMetadata(metadata, "/projetos/tasca-dentro");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0A0A0A] text-white min-h-screen">{children}</div>;
}


