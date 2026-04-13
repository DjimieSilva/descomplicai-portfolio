import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Editor Markdown — Descomplicai",
  description:
    "Editor de Markdown com pré-visualização em tempo real. Escreve, formata e exporta os teus documentos sem instalar nada.",
};

applyProjectRouteMetadata(metadata, "/projetos/markdown-editor");

export default function MarkdownEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


