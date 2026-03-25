import type { Metadata } from "next";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Awards from "./components/Awards";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Wines from "./components/Wines";
import Chef from "./components/Chef";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Cataventos — Gastronomia Portuguesa de Excelência | Figueira da Foz",
  description:
    "Restaurante Cataventos, distinguido na Seleção Gastronomia e Vinhos. Gastronomia portuguesa contemporânea na Figueira da Foz. Classificação 8.1/10. Reserve a sua mesa.",
  keywords: [
    "restaurante Figueira da Foz",
    "Cataventos restaurante",
    "gastronomia portuguesa",
    "Seleção Gastronomia e Vinhos",
    "restaurante distinguido",
    "bacalhau Figueira da Foz",
    "cozinha tradicional portuguesa",
  ],
  openGraph: {
    title: "Cataventos — Gastronomia Portuguesa de Excelência",
    description:
      "Distinguido na Seleção Gastronomia e Vinhos. Classificação 8.1/10. Reserve a sua mesa na Figueira da Foz.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function CataventosPage() {
  return (
    <main className="bg-[#1E293B]">
      <Nav />
      <Hero />
      <Awards />
      <Story />
      <Menu />
      <Wines />
      <Chef />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
