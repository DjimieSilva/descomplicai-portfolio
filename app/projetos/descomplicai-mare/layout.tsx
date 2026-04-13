import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Maré — Construo para todos",
  description: "110+ projetos gratuitos. Como ondas no oceano, cada projeto alcança quem precisa.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-mare");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


