import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { niche } from "@/config/niche-loader";

export const runtime = "edge";

/**
 * OG image route.
 *
 * Brand colors read from niche.config.json so the Phase-4 design pass
 * propagates automatically. No hardcoded hex literals for site-specific colors.
 *
 * Usage: /api/og?title=Your+Title&category=IR35+Status
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? niche.display_name;
  const category = searchParams.get("category") ?? "";

  const brandColor = niche.brand.primary_color;
  const displayName = niche.display_name;
  const domain = niche.domain;

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {category && (
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: brandColor,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </span>
          )}
          <h1
            style={{
              fontSize: title.length > 60 ? 40 : 52,
              fontWeight: 700,
              color: "#1e293b",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: brandColor,
            }}
          >
            {displayName}
          </span>
          <span
            style={{
              fontSize: 20,
              color: "#64748b",
            }}
          >
            {domain}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: brandColor,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
