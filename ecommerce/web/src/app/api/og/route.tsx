import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { niche } from "@/config/niche-loader";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const bareDomain = niche.domain.replace(/^www\./, "");
  const title = req.nextUrl.searchParams.get("title") ?? niche.display_name;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "white",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: niche.brand.primary_color, display: "flex" }} />
          <span style={{ fontSize: 28, fontWeight: 600, color: "#334155" }}>{niche.display_name}</span>
          <span style={{ fontSize: 24, color: "#64748b", marginLeft: "auto" }}>{bareDomain}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
