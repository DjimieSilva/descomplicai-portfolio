import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Neobrutalism — Bold Design Concept",
  description: "Versão neobrutalist do Descomplicai com cores bold, sombras duras e tipografia oversized",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
