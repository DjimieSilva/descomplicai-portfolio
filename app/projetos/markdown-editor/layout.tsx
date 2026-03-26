import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor Markdown — Descomplicai",
  description:
    "Editor de Markdown com pré-visualização em tempo real. Escreve, formata e exporta os teus documentos sem instalar nada.",
};

export default function MarkdownEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
