import type { Metadata } from "next";
import { MetaPixel } from "./components/meta-pixel";
import { Providers } from "./components/providers";
import "./bfitfam.css";

export const metadata: Metadata = {
  title: "BFITFAM — Personal Training Online | Unidos pelo Foco",
  description:
    "Treino personalizado online com o Bethow. Planos de treino, nutrição e coaching para alcançares os teus objetivos. Casa, ginásio ou outdoor.",
  keywords: [
    "personal trainer online",
    "treino personalizado",
    "BFITFAM",
    "fitness online Portugal",
    "plano de treino",
    "nutrição desportiva",
    "online coaching",
  ],
  openGraph: {
    title: "BFITFAM — Personal Training Online",
    description:
      "Treino personalizado online com o Bethow. Unidos pelo foco.",
    type: "website",
    locale: "pt_PT",
    alternateLocale: "en_US",
  },
};

export default function BfitfamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0A0A0A] text-white antialiased">
      <MetaPixel />
      <Providers>{children}</Providers>
    </div>
  );
}
