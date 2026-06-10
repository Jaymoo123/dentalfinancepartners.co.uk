/**
 * One-click unsubscribe for nurture emails.
 *
 * GET (visitor clicks the footer link) returns a small confirmation page; POST
 * (RFC 8058 List-Unsubscribe-Post, sent by Gmail/Apple Mail) returns JSON. Both
 * resolve the token to a subscriber, mark them unsubscribed, and pause their
 * schedule. The token is a random uuid, not the email, so the link carries no PII.
 */
import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured, adminSelect, adminUpdate } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");

async function unsubscribe(token: string): Promise<boolean> {
  if (!adminConfigured() || !token || token.length > 64) return false;
  const found = await adminSelect<{ id: string }>("subscribers", {
    select: "id",
    unsubscribe_token: `eq.${token}`,
    limit: "1",
  });
  const id = found.data[0]?.id;
  if (!id) return false;
  const nowIso = new Date().toISOString();
  await adminUpdate("subscribers", { id: `eq.${id}` }, { status: "unsubscribed", updated_at: nowIso });
  await adminUpdate("nurture_state", { subscriber_id: `eq.${id}` }, { status: "paused", updated_at: nowIso });
  return true;
}

function confirmationPage(ok: boolean): NextResponse {
  const title = ok ? "Unsubscribed" : "Already removed";
  const msg = ok
    ? "You have been unsubscribed. You will not receive any more property tax update emails."
    : "We could not find that subscription. It may already have been removed.";
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f1f5f9;">
  <div style="max-width:540px;margin:64px auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:32px;">
    <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">${title}</h1>
    <p style="margin:0;color:#334155;font-size:15px;line-height:1.6;">${msg}</p>
    <p style="margin:20px 0 0;"><a href="${SITE}" style="color:#059669;font-weight:600;text-decoration:none;">Back to Property Tax Partners</a></p>
  </div>
</body></html>`;
  return new NextResponse(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token") || "";
  return confirmationPage(await unsubscribe(token));
}

export async function POST(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token") || "";
  const ok = await unsubscribe(token);
  return NextResponse.json({ ok });
}
