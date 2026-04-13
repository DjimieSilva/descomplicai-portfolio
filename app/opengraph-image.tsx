import { ImageResponse } from "next/og";
import { projectCount } from "@/lib/projects";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Descomplicai | Portfolio de Projetos";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 34%), linear-gradient(135deg, #f8fafc 0%, #eff6ff 55%, #dbeafe 100%)",
          color: "#0f172a",
          fontFamily: "Inter, sans-serif",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "36px",
            padding: "40px",
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(148,163,184,0.2)",
            boxShadow: "0 28px 80px rgba(15,23,42,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2563eb",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "999px",
                  background: "#2563eb",
                }}
              />
              Descomplicai
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 74,
                  lineHeight: 1.02,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Portfolio digital sem complexidade
              </h1>
              <p
                style={{
                  margin: 0,
                  maxWidth: 860,
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: "#334155",
                }}
              >
                Websites, apps e experiências interativas desenhadas para negócio real.
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#64748b",
                }}
              >
                Projetos publicados
              </span>
              <strong
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                }}
              >
                {projectCount}
              </strong>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: 22,
                color: "#475569",
              }}
            >
              <span>descomplicai.pt</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
