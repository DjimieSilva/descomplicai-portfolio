import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import "./rota.css";

export const metadata: Metadata = {
  title: "Rota dos Vinhos — Descubra as Regiões Vinícolas de Portugal",
  description:
    "Rotas guiadas pelas melhores regiões vinícolas portuguesas. Douro, Alentejo, Dão, Bairrada, Vinhos Verdes e Lisboa. Transporte, guia, provas e almoço incluídos.",
  keywords: [
    "rota dos vinhos",
    "enoturismo",
    "portugal",
    "douro",
    "alentejo",
    "vinhos verdes",
    "wine tours",
  ],
  openGraph: {
    title: "Rota dos Vinhos — Descubra as Regiões Vinícolas de Portugal",
    description:
      "Rotas guiadas pelas melhores regiões vinícolas portuguesas. Transporte, guia, provas e almoço incluídos.",
    type: "website",
    locale: "pt_PT",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/rota-dos-vinhos");

export default function RotaDosVinhosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="rota-root">{children}</div>;
}


