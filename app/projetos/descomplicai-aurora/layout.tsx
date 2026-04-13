import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Aurora — Cada amanhecer traz uma nova ideia",
  description: "6 projetos que mudaram vidas. Apoie o Jaime a continuar a construir para a comunidade.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-aurora");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


