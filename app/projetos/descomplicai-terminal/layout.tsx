import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descomplicai Terminal — Redesign",
  description:
    "Homepage redesign com estetica hacker/terminal para Descomplicai",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
          `,
        }}
      />
      {children}
    </>
  );
}
