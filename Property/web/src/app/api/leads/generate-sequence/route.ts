/**
 * Internal fire-and-forget endpoint: generates AI personalised sequence copy
 * for a given lead and stores it on lead_nurture_state.generated_copy.
 *
 * Called by the submit route after a new enrolment when copyAiEnabled(). The
 * caller does NOT await the response (it uses after() from Next.js). This
 * route is therefore allowed up to 60 seconds.
 *
 * Security: a shared-secret header check (x-internal-token) guards the route.
 * It is not publicly documented and never linked from the front end.
 *
 * British English. No em-dashes.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { generateLeadSequenceCopy } from "@/lib/leads/sequence-gen";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Constant-time string compare (padded so length never leaks via timing). */
function safeEqual(a: string, b: string): boolean {
  try {
    const ab = Buffer.from(a.padEnd(256, "\0"), "utf8");
    const bb = Buffer.from(b.padEnd(256, "\0"), "utf8");
    if (ab.length !== bb.length) return false;
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // Shared-secret guard: only the submit route (same deployment) should call this.
  // Prefer a DEDICATED secret (GAP-8) so this internal endpoint never reuses the
  // master token-signing secret; fall back to it only if the dedicated one is
  // unset, and compare in constant time (unlike the old `token !== secret`).
  const secret = process.env.LEAD_INTERNAL_SECRET || process.env.LEAD_NURTURE_TOKEN_SECRET || "";
  const token = req.headers.get("x-internal-token") ?? "";

  if (!secret || !safeEqual(token, secret)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const leadId = typeof body.leadId === "string" ? body.leadId.trim() : "";
  if (!leadId) {
    return NextResponse.json({ error: "leadId required" }, { status: 400 });
  }

  const result = await generateLeadSequenceCopy(leadId);
  return NextResponse.json({ status: result.status });
}
