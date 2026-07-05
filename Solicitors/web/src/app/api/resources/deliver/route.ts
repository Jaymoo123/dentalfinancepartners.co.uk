/**
 * Resource delivery API stub.
 *
 * R3 ships on-page delivery only (RESOURCE_EMAIL_ENABLED = false in registry.ts).
 * This route exists so that a future email-delivery path has a home without
 * a 404. It always returns a documented no-op response and never sends email.
 *
 * To activate: set RESOURCE_EMAIL_ENABLED = true in registry.ts and wire the
 * actual email provider here (must be a verified from-domain).
 */
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: true, delivered: false, reason: "email-not-configured" },
    { status: 200 }
  );
}
