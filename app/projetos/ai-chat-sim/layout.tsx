import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Chat IA Simulado — Descomplicai",
  description:
    "Simula uma interface de chat com IA usando reconhecimento de padrões local. Sem APIs externas.",
};

applyProjectRouteMetadata(metadata, "/projetos/ai-chat-sim");

export default function AiChatSimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


