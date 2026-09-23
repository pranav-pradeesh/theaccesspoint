import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const LEFT = "40,34 96,22 96,182 40,168";
const RIGHT = "104,22 160,34 160,168 104,182";
const SPARK = "M100 76C101.8 93 107 98.2 124 100C107 101.8 101.8 107 100 124C98.2 107 93 101.8 76 100C93 98.2 98.2 93 100 76Z";

/** Branded Open Graph card: obsidian canvas, gateway mark, eyebrow + title. */
export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 78% 40%, rgba(8,107,255,0.45) 0%, #04070d 60%)",
          color: "#f6f8fc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="58" viewBox="14 12 172 180">
            <polygon points={LEFT} transform="translate(-16 0)" fill="#0b2a67" />
            <polygon points={RIGHT} transform="translate(16 0)" fill="#086bff" />
            <path d={SPARK} fill="#ffffff" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>THE ACCESS POINT</div>
            <div style={{ fontSize: 16, color: "#94a3b8", letterSpacing: 3 }}>GATEWAY TO KNOWLEDGE</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 22, color: "#25c7ff", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5, marginTop: 18 }}>{title}</div>
        </div>
        <div style={{ height: 2, width: "100%", background: "linear-gradient(90deg, rgba(8,107,255,0) 0%, #25c7ff 50%, rgba(8,107,255,0) 100%)" }} />
      </div>
    ),
    ogSize,
  );
}
