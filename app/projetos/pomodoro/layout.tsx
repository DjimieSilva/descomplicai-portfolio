import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer — Descomplicai",
  description:
    "Temporizador Pomodoro interativo. Gere o teu foco, pausas e sessões de trabalho com estilo.",
};

export default function PomodoroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
