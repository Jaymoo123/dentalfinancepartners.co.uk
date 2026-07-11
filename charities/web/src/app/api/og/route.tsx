import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title") ?? "BRAND_TBD Charity Accountancy";
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
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "#1a5c4a", display: "flex" }} />
          <span style={{ fontSize: 28, fontWeight: 600, color: "#334155" }}>BRAND_TBD Charity Accountancy</span>
          <span style={{ fontSize: 24, color: "#64748b", marginLeft: "auto" }}>brand-tbd-charities.invalid</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
