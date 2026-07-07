/**
 * Console session check endpoint.
 *
 * GET → 200 { ok: true } if authenticated, 401 { ok: false } if not.
 *
 * Used by CSR dashboard pages on mount to decide whether to show content
 * or redirect to /login. The actual __console_session cookie is HttpOnly
 * so client JS cannot read it directly — this endpoint acts as the auth probe.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth";

export async function GET(): Promise<NextResponse> {
  const authed = await checkAuth();
  if (!authed) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
