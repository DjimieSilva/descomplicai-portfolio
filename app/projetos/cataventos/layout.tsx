export default function CataventosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </div>
  );
}
