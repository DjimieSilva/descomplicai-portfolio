import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meio Cheio — Wine Cellar & Bar de Vinhos",
  description:
    "Vinhos portugueses, petiscos de autor e noites inesqueciveis na Figueira da Foz. O copo esta sempre meio cheio.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
