import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zeff Pizza — 3 Conceitos de Website | Descomplicai",
  description: "Três conceitos de website para a Zeff Pizza de Figueira da Foz: Pirate Tavern, Figueira Sun e Roman Artisan.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
