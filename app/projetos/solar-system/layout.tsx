import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema Solar — Explorador Interativo",
  description:
    "Explore o Sistema Solar de forma interativa. Clique nos planetas para descobrir curiosidades sobre Mercúrio, Vénus, Terra, Marte, Júpiter, Saturno, Urano e Neptuno.",
};

export default function SolarSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
