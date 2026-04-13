import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Weather Mood — Descomplicai",
  description:
    "Gerador interativo de cenas meteorológicas. Escolhe o tempo e vê a paisagem ganhar vida com animações CSS.",
  openGraph: {
    title: "Weather Mood — Descomplicai",
    description:
      "6 cenários meteorológicos animados: sol, chuva, neve, pôr do sol, trovoada e arco-íris.",
    type: "website",
  },
};

applyProjectRouteMetadata(metadata, "/projetos/weather-mood");

export default function WeatherMoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


