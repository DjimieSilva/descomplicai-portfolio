import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Zen — Wabi-Sabi Design Concept",
  description: "Versão wabi-sabi do Descomplicai — assimetria intencional, serif elegante, kanji decorativos, calma absoluta",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
