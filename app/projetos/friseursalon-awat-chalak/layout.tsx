import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Friseursalon Awat & Chalak — Heilbronn",
  description: "Professioneller Friseursalon in Heilbronn seit 2007. Herrenhaarschnitte, Bartpflege und mehr.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
