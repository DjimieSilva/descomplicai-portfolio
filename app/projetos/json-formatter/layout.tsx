import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter — Descomplicai",
  description:
    "Formata, valida e explora JSON em tempo real. Syntax highlighting, tree view colapsável, JSONPath, stats e muito mais.",
  openGraph: {
    title: "JSON Formatter — Descomplicai",
    description:
      "Ferramenta para formatar, validar e explorar JSON. Tree view interativa, JSONPath ao hover, busca, minify e estatísticas.",
    type: "website",
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
