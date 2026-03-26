import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban Board — Descomplicai",
  description:
    "Quadro Kanban interativo para organizar as tuas tarefas. Arrastra, edita e gere prioridades com facilidade.",
};

export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
