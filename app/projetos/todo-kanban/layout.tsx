import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Kanban Board — Descomplicai",
  description:
    "Quadro Kanban interativo para organizar as tuas tarefas. Arrastra, edita e gere prioridades com facilidade.",
};

applyProjectRouteMetadata(metadata, "/projetos/todo-kanban");

export default function KanbanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


