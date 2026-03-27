import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jaime Silva — Builder, AI Architect, Systems Creator",
  description:
    "Portfolio pessoal de Jaime Silva. 24 anos, MSc IST, fundador da Descomplicai. 109 paginas numa noite. Keep building. Share Love.",
  openGraph: {
    title: "Jaime Silva — Builder & AI Architect",
    description:
      "109 paginas. 55+ projetos. Uma noite. Keep building. Share Love.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sora.variable} ${inter.variable}`}>{children}</div>
  );
}
