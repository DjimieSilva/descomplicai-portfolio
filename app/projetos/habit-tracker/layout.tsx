import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habit Tracker — Descomplicai",
  description: "Acompanha os teus hábitos diários e mantém a consistência com streaks e visualizações.",
};

export default function HabitTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
