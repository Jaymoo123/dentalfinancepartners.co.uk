/**
 * GET /api/calc/pdf-offer — the runtime on/off switch for the paid workings-PDF
 * test. Reads one site_flags row; anything odd (missing table, missing row, bad
 * shape, non-Stripe link, read error, unconfigured admin) reads as off.
 *
 * CDN-cached 60s, so flipping the flag in Supabase is live within a minute and
 * the table is hit about once a minute per region. No deploy needed either way.
 */
import { NextResponse } from "next/server";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";
import { PDF_FLAG_KEY, parseOfferFlag } from "@/lib/calculators/premium/pdfRequest";

export const runtime = "nodejs";

const HEADERS = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" };
const OFF = { enabled: false };

export async function GET() {
  if (!adminConfigured()) return NextResponse.json(OFF, { headers: HEADERS });
  try {
    const res = await adminSelect<{ value: unknown }>("site_flags", {
      key: `eq.${PDF_FLAG_KEY}`,
      select: "value",
    });
    const offer = res.ok ? parseOfferFlag(res.data[0]?.value) : null;
    if (!offer || !offer.enabled) return NextResponse.json(OFF, { headers: HEADERS });
    return NextResponse.json(
      { enabled: true, link: offer.link, price_gbp: offer.priceGbp },
      { headers: HEADERS },
    );
  } catch {
    return NextResponse.json(OFF, { headers: HEADERS });
  }
}
