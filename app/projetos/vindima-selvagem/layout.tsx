import type { Metadata } from "next";
import "./vindima.css";

export const metadata: Metadata = {
  title: "Vindima Selvagem — Experiência de Vindima no Douro",
  description:
    "Colha as suas próprias uvas no coração do Douro. Uma experiência autêntica de vindima tradicional com almoço regional, prova de vinhos e pôr-do-sol no terraço.",
  keywords: [
    "vindima",
    "douro",
    "experiência",
    "vinho",
    "enoturismo",
    "portugal",
    "vindima selvagem",
  ],
  openGraph: {
    title: "Vindima Selvagem — Experiência de Vindima no Douro",
    description:
      "Colha as suas próprias uvas no coração do Douro. Uma experiência autêntica de vindima tradicional.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function VindimaSelvagem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="vindima-root">{children}</div>;
}
