import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countdown Timer — Descomplicai",
  description:
    "Cria contagens decrescentes para os teus eventos favoritos. Partilha com amigos e nunca percas um momento especial.",
};

export default function CountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
