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
import { generateLeadSequenceCopy } from "@/lib/leads/sequence-gen";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  // Shared-secret guard: only the submit route (same deployment) should call this.
  const secret = process.env.LEAD_NURTURE_TOKEN_SECRET ?? "";
  const token = req.headers.get("x-internal-token") ?? "";

  if (!secret || token !== secret) {
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
