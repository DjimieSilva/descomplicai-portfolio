import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Descomplicai Glass — Glassmorphism Design",
  description:
    "Versão glassmorphism do Descomplicai com vidro fosco, transparência e blur effects",
  openGraph: {
    title: "Descomplicai Glass — Glassmorphism Design",
    description:
      "Versão glassmorphism do Descomplicai com vidro fosco, transparência e blur effects sobre gradients suaves.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/descomplicai-glassmorphism");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}
