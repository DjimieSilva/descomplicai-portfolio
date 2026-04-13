import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Céu — O futuro é para todos",
  description: "110+ projetos gratuitos. Como estrelas no céu, cada projeto ilumina o caminho de alguém.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-ceu");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


