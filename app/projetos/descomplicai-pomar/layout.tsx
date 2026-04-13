import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Pomar — Cada projeto é um fruto",
  description: "110+ projetos gratuitos. Cada um plantado com cuidado, cultivado com paixão, oferecido a todos.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-pomar");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


