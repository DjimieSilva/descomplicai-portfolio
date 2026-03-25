import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marégrafo — Restaurante de Marisco em Buarcos | Figueira da Foz",
  description:
    "Marégrafo em Buarcos, Figueira da Foz. Marisco fresco, peixe do dia e vistas únicas sobre o Atlântico. Do mar para a mesa, todos os dias. Caldeirada, arroz de marisco, grelhados frescos.",
  keywords: [
    "restaurante marisco",
    "Buarcos",
    "Figueira da Foz",
    "peixe fresco",
    "caldeirada",
    "arroz de marisco",
    "vistas mar",
    "restaurante vista mar",
    "marisqueira",
  ],
  openGraph: {
    title: "Marégrafo — Marisco Fresco com Vista Mar em Buarcos",
    description:
      "Do mar para a mesa. Peixe fresco e marisco da costa em Buarcos, com vista privilegiada sobre o Atlântico.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function MaregrafoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-[#F8F9FA] text-[#003049]"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      {children}
    </div>
  );
}
