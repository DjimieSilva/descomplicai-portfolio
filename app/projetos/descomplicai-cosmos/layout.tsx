import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Descomplicai Cosmos \u2014 Redesign",
  description:
    "Uma viagem pelo cosmos digital. Estrutura Digital, Mentoria e IA \u2014 redesign conceptual da homepage descomplicai.pt",
  openGraph: {
    title: "Descomplicai Cosmos \u2014 Redesign",
    description:
      "Explore o universo da Descomplicai. Estrutura digital, mentoria e intelig\u00eancia artificial.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sora.variable} ${inter.variable}`}>{children}</div>
  );
}
