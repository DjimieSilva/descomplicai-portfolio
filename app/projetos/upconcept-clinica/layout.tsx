import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-uc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Upconcept — Clínica Médica e Dentária | Figueira da Foz",
  description:
    "Upconcept Clínica Médica e Dentária em Figueira da Foz. Abertos 7 dias por semana incluindo domingos e feriados. Implantes, ortodontia, estética dentária e muito mais. Marque a sua consulta.",
  keywords: [
    "clínica dentária Figueira da Foz",
    "dentista Figueira da Foz",
    "dentista aberto domingo",
    "dentista aberto feriados",
    "implantes dentários",
    "ortodontia Figueira da Foz",
    "branqueamento dentário",
    "Upconcept clínica",
    "medicina dentária",
    "estética dentária",
    "cirurgia oral",
    "endodontia",
  ],
  authors: [{ name: "Upconcept — Clínica Médica e Dentária" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://upconcept.pt",
    siteName: "Upconcept — Clínica Médica e Dentária",
    title: "Upconcept — Clínica Médica e Dentária | Abertos 7 Dias por Semana",
    description:
      "Clínica dentária moderna em Figueira da Foz. Únicos abertos 7 dias por semana, incluindo domingos e feriados. Tecnologia de ponta ao serviço do seu sorriso.",
    images: [
      {
        url: "/og-upconcept.jpg",
        width: 1200,
        height: 630,
        alt: "Upconcept — Clínica Médica e Dentária Figueira da Foz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upconcept — Clínica Médica e Dentária | Abertos 7 Dias",
    description:
      "Clínica dentária moderna em Figueira da Foz. Únicos abertos 7 dias por semana, incluindo domingos e feriados.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UpcOnceptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} bg-[#111827] text-white antialiased`}
    >
      {children}
    </div>
  );
}
