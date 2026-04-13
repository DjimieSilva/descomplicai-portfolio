import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Seeds — Microinvestimentos com Propósito",
  description: "Plantar sementes financeiras que crescem contigo. Microinvestimentos acessíveis para todos.",
};

applyProjectRouteMetadata(metadata, "/projetos/seeds");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


