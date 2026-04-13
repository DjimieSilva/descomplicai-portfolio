import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Horizonte v2 — Sunrise Design",
  description: "Versão evoluída do Horizonte com crowdfunding, transparência e comunidade",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
