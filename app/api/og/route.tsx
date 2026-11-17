import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(125deg, #0E302C 0%, #174840 58%, #27574D 100%)",
          color: "#F8F5EC",
          padding: "64px 72px 52px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-115px",
            top: "-150px",
            width: "570px",
            height: "570px",
            borderRadius: "50%",
            border: "2px solid rgba(225,203,150,.28)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "-25px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "2px solid rgba(225,203,150,.16)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "17px", zIndex: 1 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#D8B882", display: "flex" }} />
          <div style={{ fontSize: 27, letterSpacing: "2.3px", fontWeight: 700, display: "flex" }}>
            VENEZUELA AUTÉNTICA
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "26px", zIndex: 1, marginTop: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 57, fontWeight: 700, lineHeight: 1.17, letterSpacing: "-1.5px", maxWidth: 920 }}>
            <span>Del valor de un territorio</span>
            <span>a experiencias gastronómicas</span>
            <span>organizadas.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#E3CFA9", fontWeight: 500 }}>
            VIAJA · Demostrador de Colonia Tovar
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px", zIndex: 1 }}>
          <div style={{ display: "flex", fontSize: 20, color: "#F5EDDC" }}>
            Rei Sánchez | Dirección Ejecutiva
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#E4DFD1" }}>
            Prototipo ilustrativo · Sin reservas ni pagos
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=0, s-maxage=86400" },
    }
  );
}
