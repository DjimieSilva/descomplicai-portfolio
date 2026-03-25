import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Dentária Tamargueira — Especialistas em Implantologia | Figueira da Foz",
  description:
    "Clínica Dentária Tamargueira em Figueira da Foz. Especialistas em implantologia e reabilitação oral com tecnologia de ponta e mais de 15 anos de experiência. Recupere o seu sorriso com confiança.",
  keywords: [
    "implantologia",
    "clínica dentária",
    "Figueira da Foz",
    "implantes dentários",
    "reabilitação oral",
    "dentista",
    "Tamargueira",
  ],
  openGraph: {
    title: "Clínica Dentária Tamargueira — Especialistas em Implantologia",
    description:
      "Especialistas em implantologia e reabilitação oral em Figueira da Foz. Tecnologia avançada e cuidado personalizado para recuperar o seu sorriso.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function ClinicaTamargueiralayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-[#111827] font-[family-name:var(--font-inter)]">
      {children}
    </div>
  );
}
