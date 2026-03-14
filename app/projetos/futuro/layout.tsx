import type { Metadata } from "next";
import "./futuro.css";

export const metadata: Metadata = {
  title: "Futuro Portfolio — O Futuro é Humano",
  description: "Portfolio pessoal com experiência 3D interativa. O futuro é humano.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
