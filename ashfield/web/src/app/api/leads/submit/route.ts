/**
 * Ashfield Trading lead submission chokepoint.
 *
 * Parent-brand enquiries are COMMERCIAL (rent-a-site / buy-leads / partnership),
 * not client leads: no nurture enrolment, no booking token, no partner CC.
 * The shared factory already does everything this route needs (honeypot tag,
 * validation, 24h dedupe, env isolation, probe support) and enrols nothing
 * unless an onLeadInserted hook is passed, so nurture is off by construction.
 *
 * The contact form posts captureMode "email_only" (no phone field), which maps
 * to the factory's email+message validation path. Source is server-enforced.
 */
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

// ponytail: no onLeadInserted hook -- deliberate, keeps nurture disabled.
export const POST = createLeadSubmitHandler({ source: "ashfield" });
