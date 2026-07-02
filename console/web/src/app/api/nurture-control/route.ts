/**
 * Nurture-send pause / resume control endpoint (console-only).
 *
 * Auth gate: identical to every other console route. Reads the HttpOnly
 * __console_session cookie and validates it against the ADMIN_DASHBOARD_KEY-
 * derived token (see checkAuth / consoleAuth). An unauthenticated POST receives
 * 401 and no DB write occurs.
 *
 * Body: application/x-www-form-urlencoded (submitted by the panel form):
 *   paused  "true" | "false"
 *   by      operator label (e.g. "console-operator")
 *
 * On success: 303 redirect to the Referer so the browser reloads the
 * dashboard with the updated state. Falls back to / when Referer is absent
 * or cross-origin.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth";
import { setNurturePaused } from "@accounting-network/web-shared/console/adminData";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Gate: same auth mechanism used by every console page and every console API.
  // verifySessionCookie() compares the __console_session cookie (SHA-256 of
  // "console-session:<ADMIN_DASHBOARD_KEY>") in constant time.
  const authed = await checkAuth();
  if (!authed) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let paused = false;
  let by = "console-operator";
  try {
    const body = await req.formData();
    paused = (body.get("paused") as string) === "true";
    const rawBy = body.get("by") as string | null;
    if (rawBy) by = rawBy;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  try {
    await setNurturePaused(paused, by);
  } catch (err) {
    console.error("[nurture-control] setNurturePaused failed", err);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  // Redirect back to the referring page so the operator sees the updated state.
  // Validate the Referer to same-origin relative paths only.
  const referer = req.headers.get("referer") || "";
  let target = "/";
  if (referer) {
    try {
      const base = new URL(req.url);
      const ref = new URL(referer);
      if (ref.origin === base.origin) {
        target = ref.pathname + ref.search;
      }
    } catch {
      // keep target = "/"
    }
  }
  return NextResponse.redirect(new URL(target, req.url), 303);
}
