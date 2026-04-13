import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Emoji Mixer — Descomplicai",
  description:
    "Mistura emojis aleatórios e gera histórias divertidas em português. Gira os slots, guarda os teus favoritos e partilha as histórias mais hilariantes!",
};

applyProjectRouteMetadata(metadata, "/projetos/emoji-mixer");

export default function EmojiMixerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


