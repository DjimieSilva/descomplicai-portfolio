import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Jardim — Redesign",
  description:
    "Cultivamos presenca digital para pessoas e empresas — uma homepage organica inspirada num jardim portugues",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');`}</style>
      {children}
    </>
  );
}
