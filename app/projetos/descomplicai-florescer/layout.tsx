import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Descomplicai Florescer — Ideias que florescem",
  description: "6 projetos que mudaram vidas. De uma semente nasce um jardim. Apoie o crescimento.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
