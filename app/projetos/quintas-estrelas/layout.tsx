import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import "./quintas.css";

export const metadata: Metadata = {
  title: "Quintas & Estrelas — Durma entre vinhas. Acorde com estrelas.",
  description:
    "Experiências de 1 a 3 noites em quintas vínicas portuguesas. Alojamento único, gastronomia local, atividades para toda a família e jantares sob as estrelas no Douro, Alentejo e Dão.",
  keywords: [
    "quintas",
    "estrelas",
    "enoturismo",
    "glamping",
    "vinho",
    "portugal",
    "douro",
    "alentejo",
    "dão",
    "família",
    "stargazing",
  ],
  openGraph: {
    title: "Quintas & Estrelas — Durma entre vinhas. Acorde com estrelas.",
    description:
      "Escapadelas em quintas vínicas portuguesas para toda a família. Alojamento, gastronomia e noites de estrelas.",
    type: "website",
    locale: "pt_PT",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/quintas-estrelas");

export default function QuintasEstrelasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="quintas-root">{children}</div>;
}


