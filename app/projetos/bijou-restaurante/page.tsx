"use client";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import History from "./components/History";
import Philosophy from "./components/Philosophy";
import Menu from "./components/Menu";
import WineList from "./components/WineList";
import Gallery from "./components/Gallery";
import Tradition from "./components/Tradition";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function BijouRestaurantePage() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <History />
      <Philosophy />
      <Menu />
      <WineList />
      <Gallery />
      <Tradition />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
