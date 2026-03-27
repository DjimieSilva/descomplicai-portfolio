import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Descomplicai RPG — The Quest",
  description:
    "Uma aventura RPG 2D top-down pelo portfolio da Descomplicai. Explora 6 zonas, fala com 12 NPCs, completa 8 quests, abre 15 baus e descobre o mundo do Jaime Silva.",
  openGraph: {
    title: "Descomplicai RPG — The Quest",
    description:
      "Uma aventura RPG interativa pelo portfolio da Descomplicai. 5000+ linhas de codigo puro.",
    type: "website",
  },
};

export default function RPGQuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sora.variable} ${inter.variable}`}>{children}</div>
  );
}
