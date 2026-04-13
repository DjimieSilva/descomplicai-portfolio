import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Habit Tracker — Descomplicai",
  description: "Acompanha os teus hábitos diários e mantém a consistência com streaks e visualizações.",
};

applyProjectRouteMetadata(metadata, "/projetos/habit-tracker");

export default function HabitTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


