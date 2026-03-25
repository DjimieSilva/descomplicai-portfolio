"use client";

import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Menu from "./components/Menu";
import FreshMarket from "./components/FreshMarket";
import WineBar from "./components/WineBar";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function CacarolaDoisPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Concept />
      <Menu />
      <FreshMarket />
      <WineBar />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
