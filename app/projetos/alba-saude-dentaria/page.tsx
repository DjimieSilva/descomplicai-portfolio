import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { Team } from "./components/Team";
import { Technology } from "./components/Technology";
import { Testimonials } from "./components/Testimonials";
import { Insurance } from "./components/Insurance";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function AlbaSaudeDentariaPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Hero />
      <Stats />
      <About />
      <Services />
      <Technology />
      <Team />
      <Testimonials />
      <Insurance />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
