import type { Metadata } from "next";
import "./terroir.css";

export const metadata: Metadata = {
  title: "Terroir & Alma — Retiros Imersivos com Produtores de Vinho",
  description:
    "Retiros imersivos de 3 dias com os produtores que estão a mudar o vinho português. Uma experiência Descomplicai.",
  keywords: [
    "retiro",
    "vinho",
    "portugal",
    "enoturismo",
    "produtores",
    "terroir",
    "douro",
    "alentejo",
    "dão",
  ],
  openGraph: {
    title: "Terroir & Alma — Retiros Imersivos com Produtores de Vinho",
    description:
      "Retiros imersivos de 3 dias com os produtores que estão a mudar o vinho português.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function TerroirAlmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="terroir-root">{children}</div>;
}
