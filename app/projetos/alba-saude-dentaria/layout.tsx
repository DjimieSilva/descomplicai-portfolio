import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alba Saúde Dentária | Centro de Excelência com Bloco Operatório — Figueira da Foz",
  description:
    "Alba Saúde Dentária — o maior centro de saúde dentária da Figueira da Foz. 6+ médicos especializados, bloco operatório próprio, tecnologia de ponta. Rua Miguel Bombarda 66.",
  keywords: [
    "clínica dentária Figueira da Foz",
    "dentista Figueira da Foz",
    "bloco operatório dentário",
    "implantes dentários Figueira da Foz",
    "ortodontia Figueira da Foz",
    "cirurgia oral Figueira da Foz",
    "ADSE dentista",
    "Multicare dentista Figueira da Foz",
    "Alba Saúde Dentária",
    "centro dentário Figueira da Foz",
    "Médis dentista",
    "sedação consciente dentista",
  ],
  authors: [{ name: "Alba Saúde Dentária" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Alba Saúde Dentária",
    title: "Alba Saúde Dentária | Centro de Excelência com Bloco Operatório",
    description:
      "O maior centro de saúde dentária da Figueira da Foz. 6+ médicos, bloco operatório, tecnologia avançada e acordos com os principais seguros de saúde.",
    images: [
      {
        url: "/og-alba-saude-dentaria.jpg",
        width: 1200,
        height: 630,
        alt: "Alba Saúde Dentária — Centro de Excelência Dentária, Figueira da Foz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alba Saúde Dentária | Centro de Excelência com Bloco Operatório",
    description:
      "O maior centro de saúde dentária da Figueira da Foz. 6+ médicos especializados e bloco operatório próprio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AlbaSaudeDentariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
