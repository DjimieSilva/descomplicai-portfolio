import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Maré — Construo para todos",
  description: "110+ projetos gratuitos. Como ondas no oceano, cada projeto alcança quem precisa.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
