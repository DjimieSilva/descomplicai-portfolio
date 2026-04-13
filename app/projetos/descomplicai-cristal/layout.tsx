import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Cristal — Transparência total. Impacto real.",
  description: "6 projetos extraordinários. Transparência total. Apoie o Jaime a continuar a criar.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-cristal");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


