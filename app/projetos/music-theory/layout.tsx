import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teoria Musical — Descomplicai",
  description:
    "Ferramenta interativa de teoria musical: escalas, acordes e círculo de quintas com piano virtual e Web Audio API.",
  openGraph: {
    title: "Teoria Musical — Descomplicai",
    description:
      "Aprende teoria musical de forma interativa — escalas, acordes e círculo de quintas com áudio real.",
    type: "website",
  },
};

export default function MusicTheoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
