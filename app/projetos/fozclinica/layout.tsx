import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fozclinica | Centro de Saúde e Bem-Estar — Figueira da Foz",
  description:
    "Fozclinica — centro multidisciplinar de saúde e bem-estar na Figueira da Foz. Medicina dentária, podologia, psicologia e reabilitação física num só lugar. Marque a sua consulta.",
  keywords: [
    "clínica saúde Figueira da Foz",
    "medicina dentária Figueira da Foz",
    "podologia Figueira da Foz",
    "psicologia Figueira da Foz",
    "reabilitação física Figueira da Foz",
    "fisioterapia Figueira da Foz",
    "clínica multidisciplinar",
    "Fozclinica",
    "centro bem-estar",
  ],
  authors: [{ name: "Fozclinica" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Fozclinica",
    title: "Fozclinica | Centro de Saúde e Bem-Estar — Figueira da Foz",
    description:
      "Centro multidisciplinar com medicina dentária, podologia, psicologia e reabilitação física. A sua saúde, toda no mesmo lugar.",
    images: [
      {
        url: "/og-fozclinica.jpg",
        width: 1200,
        height: 630,
        alt: "Fozclinica — Centro de Saúde e Bem-Estar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fozclinica | Centro de Saúde e Bem-Estar",
    description:
      "Medicina dentária, podologia, psicologia e reabilitação física na Figueira da Foz.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FozclinicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-[family-name:var(--font-inter)]">{children}</div>
  );
}
