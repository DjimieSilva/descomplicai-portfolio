import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - Clínica Médica e Dentária | Prevenção e Saúde Oral — Figueira da Foz",
  description:
    "Premium Clínica Médica e Dentária — especialistas em prevenção e saúde oral holística na Figueira da Foz. Prevenir é o melhor tratamento. Higiene oral, implantologia, ortodontia e muito mais.",
  keywords: [
    "clínica dentária Figueira da Foz",
    "dentista Figueira da Foz",
    "prevenção dentária",
    "higiene oral",
    "implantes dentários Figueira da Foz",
    "ortodontia Figueira da Foz",
    "estética dentária",
    "odontopediatria",
    "Premium Clínica Dentária",
    "saúde oral holística",
  ],
  authors: [{ name: "Premium - Clínica Médica e Dentária" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Premium - Clínica Médica e Dentária",
    title: "Premium - Clínica Médica e Dentária | Prevenir é o Melhor Tratamento",
    description:
      "Especialistas em prevenção e saúde oral holística na Figueira da Foz. Consultas de rotina, programa de prevenção e tratamentos de excelência.",
    images: [
      {
        url: "/og-premium-clinica.jpg",
        width: 1200,
        height: 630,
        alt: "Premium - Clínica Médica e Dentária — Figueira da Foz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium - Clínica Médica e Dentária | Figueira da Foz",
    description:
      "Especialistas em prevenção e saúde oral holística. Prevenir é o melhor tratamento.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PremiumClinicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
