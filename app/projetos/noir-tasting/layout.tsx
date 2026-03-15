import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./noir.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Noir Tasting — Provas Privadas em Caves Históricas",
  description:
    "Provas de vinho privadas em caves centenárias do Porto. Uma experiência exclusiva e inesquecível.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} noir-root bg-[#0A0A0A] text-[#F8F5F0] min-h-screen`}
    >
      {children}
    </div>
  );
}
