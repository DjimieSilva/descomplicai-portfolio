import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Horizonte — O futuro é para todos",
  description: "110+ projetos gratuitos. Junta-te ao horizonte e apoia o Jaime a construir para a comunidade.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
