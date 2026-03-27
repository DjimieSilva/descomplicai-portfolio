import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visualizador de Sorting — Descomplicai",
  description:
    "Visualize algoritmos de ordenação em tempo real. Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort e Heap Sort com animações interativas.",
};

export default function SortingVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
