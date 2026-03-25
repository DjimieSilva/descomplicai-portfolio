"use client";

import { useEffect } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Differentiators } from "./components/Differentiators";
import { Team } from "./components/Team";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function ClinicaVascoGamaPage() {
  // Inject Playfair Display font for this page only
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      #clinica-vasco-gama-root,
      #clinica-vasco-gama-root * {
        box-sizing: border-box;
      }
      #clinica-vasco-gama-root .font-serif {
        font-family: 'Playfair Display', Georgia, serif !important;
      }
      #clinica-vasco-gama-root {
        font-family: 'Inter', system-ui, sans-serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      id="clinica-vasco-gama-root"
      className="clinica-root"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        .clinica-root .font-serif {
          font-family: 'Playfair Display', Georgia, serif !important;
        }
        .clinica-root {
          font-family: 'Inter', system-ui, sans-serif;
          color: #0A1628;
          background: #F5F0E8;
        }
        .clinica-root * {
          scroll-behavior: smooth;
        }
        .clinica-root input,
        .clinica-root select,
        .clinica-root textarea {
          font-family: inherit;
        }
        .clinica-root input:focus,
        .clinica-root select:focus,
        .clinica-root textarea:focus {
          outline: none;
        }
        .clinica-root select option {
          background-color: #0d1f3a;
          color: white;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Hero />
      <About />
      <Services />
      <Differentiators />
      <Team />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
