"use client";

import { HeroSection } from "./_sections/s01-hero";
import { SobreSection } from "./_sections/s02-sobre";
import { ProdutosSection } from "./_sections/s03-produtos";
import { ComoEncomendarSection } from "./_sections/s04-como-encomendar";
import { FooterSection } from "./_sections/s05-footer";

export default function SaborAbencoadoPage() {
  return (
    <main className="sa-root">
      <HeroSection />
      <SobreSection />
      <ProdutosSection />
      <ComoEncomendarSection />
      <FooterSection />
    </main>
  );
}
