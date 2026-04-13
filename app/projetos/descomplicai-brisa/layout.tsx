import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Descomplicai Brisa — Construo para todos",
  description:
    "110+ projetos gratuitos. Apoie o Jaime a continuar a construir para a comunidade.",
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-brisa");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


