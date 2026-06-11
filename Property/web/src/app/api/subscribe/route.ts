/**
 * Legacy subscribe endpoint: forwards to /api/nurture/subscribe.
 *
 * The SubscribeForm has been re-pointed to POST directly to
 * /api/nurture/subscribe (see src/components/forms/SubscribeForm.tsx).
 * This shim exists for any external callers or bookmarked direct POSTs
 * that may still target the old URL. It passes the body through unchanged.
 *
 * This shim may be removed once no external consumers of /api/subscribe
 * remain. A grep of the codebase shows only SubscribeForm and lib/nurture/send.ts
 * referenced this path; both have been re-pointed to the new engine route.
 */
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");
  const target = `${base}/api/nurture/subscribe`;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const resp = await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await resp.json().catch(() => ({ ok: false }));
  return NextResponse.json(json, { status: resp.status });
}
