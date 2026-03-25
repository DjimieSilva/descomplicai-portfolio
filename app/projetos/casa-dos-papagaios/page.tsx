"use client";

import Hero from "./components/Hero";
import MarketStory from "./components/MarketStory";
import Freshness from "./components/Freshness";
import DailySpecials from "./components/DailySpecials";
import Menu from "./components/Menu";
import Awards from "./components/Awards";
import Gallery from "./components/Gallery";
import Hours from "./components/Hours";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function CasaDosPapagaiosPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <MarketStory />
      <Freshness />
      <DailySpecials />
      <Menu />
      <Awards />
      <Gallery />
      <Hours />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}
