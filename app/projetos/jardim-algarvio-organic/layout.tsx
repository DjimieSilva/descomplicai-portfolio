import type { Metadata } from "next";
import { Libre_Caslon_Text, Source_Sans_3, Newsreader } from "next/font/google";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon",
  display: "swap",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JardimAlgarvio | A Arte da Jardinagem no Algarve",
  description:
    "Onde a natureza encontra o design. Criamos jardins que contam histórias, com plantas mediterrânicas nativas e design orgânico. Jardinagem artística no Algarve.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${libreCaslon.variable} ${sourceSans.variable} ${newsreader.variable}`}
      style={{
        backgroundColor: "#FDF6EC",
        color: "#5C4033",
        fontFamily: "var(--font-source-sans), sans-serif",
      }}
    >
      {children}
    </div>
  );
}
