import { ImageResponse } from "next/og"

export const alt = "Praxis digital gemacht – Websites für Heilmittelpraxen"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#fcfaf6",
          color: "#2b2622",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#2f6762" }}>Für Ergotherapie, Logopädie, Physiotherapie und Podologie</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Ihre Praxis,</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05, color: "#2f6762" }}>digital gemacht.</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#6b625a" }}>Ein Angebot von Studio Fi aus Lage</div>
      </div>
    ),
    size
  )
}
