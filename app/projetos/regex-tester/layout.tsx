import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester — Descomplicai",
  description:
    "Testa expressões regulares em tempo real com destaque de correspondências, substituição, explicação e referência rápida de sintaxe.",
  openGraph: {
    title: "Regex Tester — Descomplicai",
    description:
      "Ferramenta interativa para testar e depurar expressões regulares. Destaque de matches, substituição, padrões predefinidos e cheatsheet.",
    type: "website",
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
