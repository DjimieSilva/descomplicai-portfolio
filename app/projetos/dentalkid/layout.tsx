import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Dentalkid — O Dentista das Crianças | Figueira da Foz",
  description:
    "Dentalkid é a clínica dentária especializada em crianças e adolescentes em Figueira da Foz. Com clínicas em Buarcos e Tavarede, tornamos as visitas ao dentista uma aventura divertida e sem medos!",
  keywords: [
    "dentista crianças",
    "clínica dentária pediátrica",
    "Figueira da Foz",
    "Buarcos",
    "Tavarede",
    "ortodontia infantil",
    "dentista infantil",
    "Dentalkid",
    "dentes bebé",
    "odontopediatria",
  ],
  openGraph: {
    title: "Dentalkid — O Dentista das Crianças | Figueira da Foz",
    description:
      "Clínica dentária especializada em crianças e adolescentes em Figueira da Foz. Duas clínicas: Buarcos e Tavarede. Tornamos as visitas ao dentista divertidas!",
    type: "website",
    locale: "pt_PT",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/dentalkid");

export default function DentalkidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white text-[#1E1B4B]"
      style={{ fontFamily: "'Nunito', 'Inter', sans-serif" }}
    >
      {children}
    </div>
  );
}


