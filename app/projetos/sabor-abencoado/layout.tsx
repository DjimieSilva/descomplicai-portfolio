import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";import type { Metadata, Viewport } from "next";
import "./sabor-abencoado.css";

export const metadata: Metadata = {
  title: "Sabor Abençoado — Bolos e Pães Caseiros em Olhão",
  description: "Pastry Takeaway em Olhão. Pão com chouriço, tartes, bolos caseiros, pudins — entrega ao domicílio de segunda a sexta. Encomende pelo WhatsApp!",
  openGraph: {
    title: "Sabor Abençoado — Pastry Takeaway",
    description: "Bolos e pães caseiros feitos com amor em Olhão. Encomende pelo WhatsApp!",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F0",
};

applyProjectRouteMetadata(metadata, "/projetos/sabor-abencoado");

export default function SaborAbencoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


