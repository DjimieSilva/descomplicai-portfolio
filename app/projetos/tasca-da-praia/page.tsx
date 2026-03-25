"use client";

import { Hero } from "./components/Hero";
import { Tradition } from "./components/Tradition";
import { FreshFish } from "./components/FreshFish";
import { Menu } from "./components/Menu";
import { DailyCatch } from "./components/DailyCatch";
import { Gallery } from "./components/Gallery";
import { Family } from "./components/Family";
import { Location } from "./components/Location";
import { Hours } from "./components/Hours";
import { Footer } from "./components/Footer";

export default function TascaDaPraiaPage() {
  return (
    <main>
      <Hero />
      <Tradition />
      <FreshFish />
      <DailyCatch />
      <Menu />
      <Gallery />
      <Family />
      <Location />
      <Hours />
      <Footer />
    </main>
  );
}
