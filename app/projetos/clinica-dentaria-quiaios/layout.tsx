import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Médico Dentária de Quiaios | A Sua Clínica Dentária em Quiaios",
  description:
    "Clínica Médico Dentária de Quiaios — cuidados dentários de qualidade no coração da nossa vila. Próximos de si, tratamos de si como família. A 10 minutos da Figueira da Foz.",
  openGraph: {
    title: "Clínica Médico Dentária de Quiaios",
    description:
      "A sua clínica dentária de confiança em Quiaios, Figueira da Foz. Tratamos de si como família.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function ClinicaQuiaiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        fontFamily: "'Inter', 'system-ui', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
