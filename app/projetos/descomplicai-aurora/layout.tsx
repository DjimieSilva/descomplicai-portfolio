import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Aurora — Cada amanhecer traz uma nova ideia",
  description: "6 projetos que mudaram vidas. Apoie o Jaime a continuar a construir para a comunidade.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
