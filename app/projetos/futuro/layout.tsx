import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import "./futuro.css";

export const metadata: Metadata = {
  title: "Futuro Portfolio — O Futuro é Humano",
  description: "Portfolio pessoal com experiência 3D interativa. O futuro é humano.",
};

applyProjectRouteMetadata(metadata, "/projetos/futuro");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


