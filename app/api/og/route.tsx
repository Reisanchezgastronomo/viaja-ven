import { ImageResponse } from "next/og";

export const runtime = "edge";

// Imagen real para la vista previa de WhatsApp, generada en el servidor.
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
          background: "#F6F1E7",
          color: "#16352F",
          padding: "58px 70px 0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-140px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            border: "2px solid rgba(201,169,106,.30)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "-10px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "2px solid rgba(201,169,106,.17)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px", zIndex: 1 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#C9A96A", display: "flex" }} />
          <div style={{ fontSize: 27, letterSpacing: "2.2px", fontWeight: 700, color: "#1A3B35", display: "flex" }}>
            VENEZUELA AUTÉNTICA
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "23px",
            zIndex: 1,
            marginTop: 15,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.16,
              letterSpacing: "-1.4px",
              maxWidth: 1020,
              color: "#16352F",
            }}
          >
            <span>Del valor de un territorio</span>
            <span>a experiencias gastronómicas</span>
            <span>organizadas.</span>
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#8A6A33", fontWeight: 600 }}>
            VIAJA · Demostrador de Colonia Tovar
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            width: 1200,
            marginLeft: "-70px",
            background: "#16352F",
            color: "#F6F1E7",
            padding: "24px 70px",
            minHeight: "92px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 20 }}>
            Rei Sánchez | Dirección Ejecutiva
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#E7D9BA" }}>
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
