import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Portugal — Descomplicai",
  description:
    "Testa os teus conhecimentos sobre Portugal: geografia, história, cultura e gastronomia. 15 perguntas, timer por pergunta e resultados divertidos.",
};

export default function QuizPortugalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
