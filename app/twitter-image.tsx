import OpenGraphImage from "./opengraph-image";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Descomplicai | Portfolio de Projetos";

export default function TwitterImage() {
  return OpenGraphImage();
}
