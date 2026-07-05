/**
 * Admin console login handler (OB-01).
 *
 * Accepts a POST from the /admin/analytics/login page. Compares the submitted
 * key against ADMIN_DASHBOARD_KEY via crypto.timingSafeEqual (no timing
 * oracle). On match: sets an HttpOnly + Secure + SameSite=Strict cookie and
 * redirects to the console. On mismatch: redirects back with an error flag.
 *
 * Rate-limiting posture (SEC-06): in-process reject after 10 failures per
 * 10-minute window per IP. Lightweight guard; use Vercel Firewall in addition
 * for a hardened deployment.
 *
 * The credential is NEVER placed in a URL query parameter (OB-01 design).
 */
export const runtime = "nodejs";
export const maxDuration = 5;
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  verifyConsoleKey,
  buildSessionCookie,
} from "@accounting-network/web-shared/console/consoleAuth";

// ── Lightweight in-process rate limiter ─────────────────────────────────

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_FAILURES = 10;
const ipFailures = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipFailures.get(ip);
  if (!rec || now - rec.windowStart > WINDOW_MS) {
    ipFailures.set(ip, { count: 0, windowStart: now });
    return true;
  }
  return rec.count < MAX_FAILURES;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const rec = ipFailures.get(ip);
  if (!rec || now - rec.windowStart > WINDOW_MS) {
    ipFailures.set(ip, { count: 1, windowStart: now });
  } else {
    rec.count++;
  }
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.redirect(new URL("/admin/analytics/login?error=rate_limit", req.url), 303);
  }

  let submitted = "";
  try {
    const body = await req.formData();
    submitted = (body.get("key") as string) || "";
  } catch {
    return NextResponse.redirect(new URL("/admin/analytics/login?error=1", req.url), 303);
  }

  const expected = process.env.ADMIN_DASHBOARD_KEY || "";

  if (!verifyConsoleKey(submitted, expected)) {
    recordFailure(ip);
    return NextResponse.redirect(new URL("/admin/analytics/login?error=1", req.url), 303);
  }

  const res = NextResponse.redirect(new URL("/admin/analytics", req.url), 303);
  res.headers.set("Set-Cookie", buildSessionCookie(expected));
  return res;
}
