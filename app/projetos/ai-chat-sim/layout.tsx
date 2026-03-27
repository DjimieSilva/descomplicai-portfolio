import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat IA Simulado — Descomplicai",
  description:
    "Simula uma interface de chat com IA usando reconhecimento de padrões local. Sem APIs externas.",
};

export default function AiChatSimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
