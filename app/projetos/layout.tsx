import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { projectCount, showcaseCategoryCount } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: `${projectCount} projetos em ${showcaseCategoryCount} categorias. Websites, experiências interativas, saúde, restauração e muito mais.`,
  alternates: {
    canonical: absoluteUrl("/projetos"),
  },
  openGraph: {
    title: "Projetos | Descomplicai",
    description: `${projectCount} projetos em ${showcaseCategoryCount} categorias.`,
    url: absoluteUrl("/projetos"),
  },
  twitter: {
    title: "Projetos | Descomplicai",
    description: `${projectCount} projetos em ${showcaseCategoryCount} categorias.`,
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
