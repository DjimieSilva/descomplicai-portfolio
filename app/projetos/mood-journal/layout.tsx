import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diário de Humor — Descomplicai",
  description: "Regista o teu estado de espírito diário e acompanha as tuas emoções ao longo do tempo.",
};

export default function MoodJournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
