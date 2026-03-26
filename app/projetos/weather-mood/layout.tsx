import type { Metadata } from "next";

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

export default function WeatherMoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
