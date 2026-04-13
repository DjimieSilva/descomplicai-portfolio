import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Semente — Cada projeto é uma semente",
  description: "110+ projetos gratuitos. Apoie o jardim digital do Jaime.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-semente");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


