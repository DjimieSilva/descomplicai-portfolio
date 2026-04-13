import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
export const metadata: Metadata = {
  title: "Friseursalon Awat & Chalak — Heilbronn",
  description: "Professioneller Friseursalon in Heilbronn seit 2007. Herrenhaarschnitte, Bartpflege und mehr.",
};
applyProjectRouteMetadata(metadata, "/projetos/friseursalon-awat-chalak");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


