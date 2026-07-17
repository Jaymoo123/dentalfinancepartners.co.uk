/**
 * Resource delivery API stub (dead path as of 2026-07-17).
 *
 * Email-gated delivery was retired; resources are now open and the mid-slot
 * renders a qualified lead-capture form instead. This route is a no-op kept
 * so any stale client references get a 200 rather than a 404.
 */
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: true, delivered: false, reason: "email-not-configured" },
    { status: 200 }
  );
}
