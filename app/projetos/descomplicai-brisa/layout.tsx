import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Brisa — Construo para todos",
  description:
    "110+ projetos gratuitos. Apoie o Jaime a continuar a construir para a comunidade.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
