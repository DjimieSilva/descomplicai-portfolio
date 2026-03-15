import type { Metadata } from "next";
import "./rua.css";

export const metadata: Metadata = {
  title: "Vinho na Rua — Tours de Vinho e Petiscos pelas Ruas de Portugal",
  description:
    "Bebe. Come. Descomplica. Walking tours casuais de vinho e petiscos por Porto, Lisboa, Braga, Évora e Faro. Sem pretensão, só sabor.",
  keywords: [
    "vinho",
    "petiscos",
    "walking tour",
    "porto",
    "lisboa",
    "braga",
    "évora",
    "faro",
    "enoturismo",
    "portugal",
    "tascas",
    "vinho na rua",
  ],
  openGraph: {
    title: "Vinho na Rua — Tours de Vinho e Petiscos pelas Ruas de Portugal",
    description:
      "Walking tours casuais de vinho e petiscos por cidades portuguesas. Sem formalidade. Só sabor.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function VinhoNaRuaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="rua-root">{children}</div>;
}
