import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relógio Mundial — Descomplicai",
  description:
    "Dashboard de fusos horários mundiais com relógio analógico, clocks digitais e planeador de reuniões.",
};

export default function WorldClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
