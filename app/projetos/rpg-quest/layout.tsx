import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RPG Quest — Descomplicai",
  description:
    "Uma aventura RPG 2D top-down pelo portfolio da Descomplicai. Explora 5 zonas, fala com 8 NPCs, abre baus, completa quests e descobre o mundo do Jaime Silva. Canvas 2D puro, zero game engines.",
  openGraph: {
    title: "RPG Quest — Descomplicai",
    description:
      "Aventura RPG interativa pelo portfolio da Descomplicai. 5 zonas, 8 NPCs, 8 baus, 6 quests — tudo em Canvas 2D puro.",
    type: "website",
  },
};

export default function RPGQuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
