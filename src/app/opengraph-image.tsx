import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Open Call — Find the support that already exists";
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
          <span>Starting in Austin</span>
          <span>Muse</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            Open Call
          </div>
          <div style={{ marginTop: 28, fontSize: 28, maxWidth: 760, lineHeight: 1.3, opacity: 0.85 }}>
            Artists shouldn&apos;t have to be grant researchers to make a living from their work.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
