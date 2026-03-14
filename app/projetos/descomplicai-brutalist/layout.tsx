import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai — Brutalist Edition",
  description: "Versão brutalist do site Descomplicai",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
