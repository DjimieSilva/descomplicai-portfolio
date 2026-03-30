import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Semente — Cada projeto é uma semente",
  description: "110+ projetos gratuitos. Apoie o jardim digital do Jaime.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
