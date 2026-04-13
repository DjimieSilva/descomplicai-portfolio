import type { Metadata } from "next";
import { applyProjectRouteMetadata } from "@/lib/project-route-metadata";

export const metadata: Metadata = {
  title: "Visualizador de Sorting — Descomplicai",
  description:
    "Visualize algoritmos de ordenação em tempo real. Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort e Heap Sort com animações interativas.",
};

applyProjectRouteMetadata(metadata, "/projetos/sorting-visualizer");

export default function SortingVisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


