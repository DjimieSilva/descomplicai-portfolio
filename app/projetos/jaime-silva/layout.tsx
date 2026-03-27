import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jaime Silva — Builder, AI Architect, Systems Creator",
  description:
    "Portfolio pessoal de Jaime Silva. Builder, AI Architect e Systems Creator. Keep building. Share Love.",
  openGraph: {
    title: "Jaime Silva — Builder & AI Architect",
    description: "Keep building. Share Love.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${sora.variable} ${inter.variable}`}>{children}</div>
  );
}
