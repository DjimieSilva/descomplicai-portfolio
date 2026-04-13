import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Clínica Vasco da Gama | Medicina Dentária de Excelência — Figueira da Foz",
  description:
    "Clínica Vasco da Gama — referência em medicina dentária premium na Figueira da Foz. Laboratório de próteses próprio, implantologia, ortodontia, estética facial e muito mais. Marque a sua consulta.",
  keywords: [
    "clínica dentária Figueira da Foz",
    "dentista Figueira da Foz",
    "implantes dentários",
    "ortodontia",
    "branqueamento dentário",
    "próteses dentárias",
    "estética dental",
    "botox dentista",
    "Clínica Vasco da Gama",
  ],
  authors: [{ name: "Clínica Vasco da Gama" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://clinicavascodagama.pt",
    siteName: "Clínica Vasco da Gama",
    title: "Clínica Vasco da Gama | Medicina Dentária de Excelência",
    description:
      "Laboratório de próteses próprio, implantologia avançada e estética facial na Figueira da Foz. Mais de 20 anos ao serviço do seu sorriso.",
    images: [
      {
        url: "/og-clinica-vasco-da-gama.jpg",
        width: 1200,
        height: 630,
        alt: "Clínica Vasco da Gama — Medicina Dentária Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Vasco da Gama | Medicina Dentária de Excelência",
    description:
      "Laboratório de próteses próprio, implantologia avançada e estética facial na Figueira da Foz.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

applyProjectRouteMetadata(metadata, "/projetos/clinica-vasco-da-gama");

export default function ClinicaVascoGamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


