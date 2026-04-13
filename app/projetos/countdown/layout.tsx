import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Countdown Timer — Descomplicai",
  description:
    "Cria contagens decrescentes para os teus eventos favoritos. Partilha com amigos e nunca percas um momento especial.",
};

applyProjectRouteMetadata(metadata, "/projetos/countdown");

export default function CountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


