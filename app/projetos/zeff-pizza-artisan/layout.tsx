import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zeff Pizza — Roman Artisan",
  description: "Website concept para Zeff Pizza, Figueira da Foz. Pizza romana artesanal.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
