import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai — Editorial Edition",
  description: "Versao editorial premium do site Descomplicai",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
