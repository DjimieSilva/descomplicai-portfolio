import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Descomplicai — Brutalist Edition",
  description: "Versão brutalist do site Descomplicai",
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-brutalist");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


