"use client";

import Hero from "./components/Hero";
import Story from "./components/Story";
import Menu from "./components/Menu";
import HomeCooking from "./components/HomeCooking";
import Gallery from "./components/Gallery";
import Locations from "./components/Locations";
import Reservations from "./components/Reservations";
import Footer from "./components/Footer";

export default function CacarolaPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Story />
      <Menu />
      <HomeCooking />
      <Gallery />
      <Locations />
      <Reservations />
      <Footer />
    </main>
  );
}
