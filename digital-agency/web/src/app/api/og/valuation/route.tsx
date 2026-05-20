import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { calculate, formatGbpCompact, fromSearchParams, typeLabel } from "@/lib/valuation";

export const runtime = "edge";

const BRAND = "#4f46e5";
const INK = "#0f172a";
const MUTED = "#475569";

export async function GET(req: NextRequest) {
  const inputs = fromSearchParams(req.nextUrl.searchParams);
  const r = calculate(inputs);

  const midLabel = formatGbpCompact(r.mid);
  const lowLabel = formatGbpCompact(r.low);
  const highLabel = formatGbpCompact(r.high);
  const revenueLabel = formatGbpCompact(inputs.revenue);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ height: "12px", background: BRAND, width: "100%" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "56px 64px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: BRAND,
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              Agency valuation estimate
            </div>
            <div
              style={{
                fontSize: 30,
                color: INK,
                fontWeight: 700,
                display: "flex",
                marginTop: "8px",
              }}
            >
              {typeLabel(inputs.type)} · {revenueLabel} revenue · {inputs.ebitdaPct}% EBITDA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: MUTED,
                fontWeight: 600,
                display: "flex",
              }}
            >
              Mid estimate
            </div>
            <div
              style={{
                fontSize: 144,
                fontWeight: 800,
                color: INK,
                lineHeight: 1,
                letterSpacing: "-3px",
                display: "flex",
              }}
            >
              {midLabel}
            </div>
            <div
              style={{
                fontSize: 28,
                color: MUTED,
                display: "flex",
                marginTop: "8px",
              }}
            >
              Range: {lowLabel} – {highLabel}
              {"  ·  "}
              {r.adjustedMultiple.toFixed(1)}× EBITDA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "24px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 20, color: INK, fontWeight: 700, display: "flex" }}>
                Agency Founder Finance
              </div>
              <div style={{ fontSize: 16, color: MUTED, display: "flex" }}>
                Specialist accountants for UK + UAE agency founders
              </div>
            </div>
            <div
              style={{
                fontSize: 18,
                color: BRAND,
                fontWeight: 700,
                display: "flex",
              }}
            >
              agencyfounderfinance.co.uk/calculators/agency-valuation
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
