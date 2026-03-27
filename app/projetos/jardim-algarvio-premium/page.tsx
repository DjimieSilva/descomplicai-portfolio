import CinematicHero from "./components/CinematicHero";
import Philosophy from "./components/Philosophy";
import PortfolioGallery from "./components/PortfolioGallery";
import DesignProcess from "./components/DesignProcess";
import ProjectShowcase from "./components/ProjectShowcase";
import Testimonials from "./components/Testimonials";
import AwardsPress from "./components/AwardsPress";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function JardimAlgarvioPremiumPage() {
  return (
    <main className="overflow-x-hidden">
      <CinematicHero />
      <Philosophy />
      <PortfolioGallery />
      <DesignProcess />
      <ProjectShowcase />
      <Testimonials />
      <AwardsPress />
      <Contact />
      <Footer />
    </main>
  );
}
