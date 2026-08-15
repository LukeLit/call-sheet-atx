import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Call Sheet ATX — the call sheet for Austin artists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#100E0C",
          color: "#F3EBE0",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          <span>Austin, TX</span>
          <span>Muse</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            Call Sheet ATX
          </div>
          <div style={{ marginTop: 28, fontSize: 28, maxWidth: 760, lineHeight: 1.3, opacity: 0.85 }}>
            The call sheet for Austin artists looking for grants and programs.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
