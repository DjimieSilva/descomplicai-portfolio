import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Swiss — International Style Design Concept",
  description: "Versão Swiss/International Style do Descomplicai — grid rigoroso, whitespace extremo, Inter puro, zero decoração",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
