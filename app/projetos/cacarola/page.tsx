"use client";

import Hero from "./components/Hero";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Especialidades from "./components/Especialidades";
import HomeCooking from "./components/HomeCooking";
import Equipa from "./components/Equipa";
import Gallery from "./components/Gallery";
import Testemunhos from "./components/Testemunhos";
import Locations from "./components/Locations";
import Reservations from "./components/Reservations";
import Footer from "./components/Footer";

export default function CacarolaPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Story />
      <Menu />
      <Especialidades />
      <HomeCooking />
      <Equipa />
      <Gallery />
      <Testemunhos />
      <Locations />
      <Reservations />
      <Footer />
    </main>
  );
}
