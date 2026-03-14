import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ondas Academy — Escola de Surf",
  description: "Escola de surf em Buarcos. Pacotes de aulas para todos os níveis.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#0A0A0A] text-white min-h-screen">{children}</div>;
}
