import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teste de Velocidade — Descomplicai",
  description:
    "Testa a tua velocidade de digitação com frases em português. Descobre o teu WPM e melhora a tua performance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
