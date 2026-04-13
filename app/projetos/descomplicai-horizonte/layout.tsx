import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Descomplicai Horizonte — O futuro é para todos",
  description: "110+ projetos gratuitos. Junta-te ao horizonte e apoia o Jaime a construir para a comunidade.",
};
applyProjectRouteMetadata(metadata, "/projetos/descomplicai-horizonte");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


