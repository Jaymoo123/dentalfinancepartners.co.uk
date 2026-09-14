/**
 * POST /api/calc/pdf-request — stores the click-time snapshot of a premium
 * calculator so the PDF can be produced by hand from exactly the figures the
 * buyer paid for. Returns { id }, which the client passes to Stripe as
 * client_reference_id.
 *
 * This route NEVER touches `leads` or `lead_contact_events`, so no lead email,
 * no partner CC and no nurture enrolment can fire from a purchase.
 *
 * ponytail: open insert, rows hold no PII; add a per-IP rate limit if the table
 * ever fills with junk.
 */
import { NextResponse } from "next/server";
import { adminConfigured, adminInsert } from "@/lib/supabase/admin";
import { PDF_TOOLS, PDF_PAYLOAD_MAX_BYTES } from "@/lib/calculators/premium/pdfRequest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!adminConfigured()) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const text = await req.text();
  if (text.length > PDF_PAYLOAD_MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const toolId = typeof body.tool_id === "string" ? body.tool_id : "";
  const values = body.values;
  if (!PDF_TOOLS.has(toolId) || !values || typeof values !== "object") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const res = await adminInsert<{ id: string }>("calc_pdf_requests", {
    site_key: "property",
    tool_id: toolId,
    placement: typeof body.placement === "string" ? body.placement : null,
    payload: body,
    user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
  });
  const id = res.data[0]?.id;
  if (!res.ok || !id) return NextResponse.json({ error: "store_failed" }, { status: 502 });
  return NextResponse.json({ id });
}
