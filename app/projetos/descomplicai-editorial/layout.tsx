import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Descomplicai — Editorial Edition",
  description: "Versao editorial premium do site Descomplicai",
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-editorial");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


