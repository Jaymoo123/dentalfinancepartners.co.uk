/**
 * Factory for the per-site /api/leads/submit chokepoint (non-Property sites).
 *
 * Usage in a site's src/app/api/leads/submit/route.ts:
 *
 *   import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
 *   export const runtime = "nodejs";      // SEC-04: stays visible at route level
 *   export const maxDuration = 10;
 *   export const dynamic = "force-dynamic";
 *   export const POST = createLeadSubmitHandler({ source: "<canonical site key>" });
 *
 * Ports Property's api/leads/submit semantics steps 1-3 ONLY (see
 * Property/web/src/app/api/leads/submit/route.ts, the canonical reference):
 *   1. Honeypot (`enquiry_ref`) -> store the row FLAGGED (extras.honeypot=true)
 *      and return a success shape. Never silently lose a possible real lead;
 *      never signal detection to a bot. This replaces the estate's historical
 *      client-side silent drop that destroyed autofilled real submissions.
 *   2. Server-side validation with field floors (values mirror
 *      Property/web/src/lib/leads/field-floors.ts; inlined here deliberately so
 *      this module never imports lead-nurture/* into non-Property bundles).
 *   3. Dedupe against a recent same-source+email lead with adopt-and-merge
 *      semantics (blanks never overwrite good values; messages append with a
 *      separator, capped at 4000 chars trimming from the front).
 * Property's steps 4-6 (Twilio/email verification, nurture enrolment, booking
 * token) are deliberately NOT ported: no partner qualification bar exists for
 * these sites and nurture is out of scope. The estate-level pg_net triggers on
 * the shared `leads` table (notify -> owner inbox + Reflex CC, AI/Companies
 * House enrich) fire on this insert unchanged.
 *
 * Probe support: a body carrying `probe_secret` matching env LEAD_PROBE_SECRET
 * is rewritten to source='test' (operator-only routing per Property's
 * lead-routing.ts: no partner CC, enrichment skipped) so the once-per-site
 * live-form validation exercises the real form -> route -> insert -> notify
 * path without ever emailing the partner firm.
 *
 * Environment isolation: like createTrackHandler, only the production
 * deployment writes real rows. Dev/preview return a success-shaped no-op so
 * (a) preview browsing never creates real leads/notifications and (b) the
 * client fallback (which would direct-insert via the anon key on 5xx) is not
 * triggered. Escape hatch: LEADS_ALLOW_NONPROD_SUBMIT=1.
 *
 * Rate limiting (SEC-06): best-effort in-process fixed window per IP. On Fluid
 * Compute instances are reused across requests so this has real bite, but it is
 * NOT durable across instances; the durable backstops are the honeypot, strict
 * validation, and the 24h same-email dedupe (which caps rows per email per day
 * at 1). A shared-store limiter (or BotID deep-mode on lead forms, the marked
 * intent in analytics/server/bots.ts) is the recorded follow-up if abuse is
 * ever observed.
 */
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Field floors mirror Property/web/src/lib/leads/field-floors.ts.
const MIN_NAME = 2;
const MIN_PHONE_DIGITS = 10;
const DEFAULT_MIN_MESSAGE = 10;
const DEFAULT_DEDUPE_WINDOW_MS = 24 * 3_600_000;
const MAX_MERGED_MESSAGE = 4_000;

const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 10;
const rateStore = new Map<string, { windowStart: number; count: number }>();

/** Test hook: clear the in-process rate limiter between cases. */
export function __resetLeadSubmitRateLimiter(): void {
  rateStore.clear();
}

function rateLimited(ip: string, now: number): boolean {
  const entry = rateStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateStore.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function digits(s: string): number {
  return (s.match(/\d/g) || []).length;
}

function secretMatches(candidate: string, expected: string): boolean {
  if (!candidate || !expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Merge a prior stored message with a resubmitted one (Property semantics). */
export function mergeLeadMessages(prior: string, next: string): string {
  const priorMsg = prior.trim();
  const newMsg = next.trim();
  // Unlike Property, message is OPTIONAL on the lighter form, so an empty
  // resubmit must never append a dangling separator to the stored message.
  if (!priorMsg || !newMsg || priorMsg === newMsg) return newMsg || priorMsg;
  const combined = `${priorMsg}\n\n---\n${newMsg}`;
  return combined.length > MAX_MERGED_MESSAGE ? combined.slice(-MAX_MERGED_MESSAGE) : combined;
}

type Env = Record<string, string | undefined>;

function resolveEnv(env: Env) {
  return {
    supabaseUrl: env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || "",
    serviceKey: env.SUPABASE_SERVICE_ROLE_KEY || "",
    probeSecret: env.LEAD_PROBE_SECRET || "",
    vercelEnv: env.VERCEL_ENV,
    allowNonProd: env.LEADS_ALLOW_NONPROD_SUBMIT === "1",
  };
}

async function postgrest(
  supabaseUrl: string,
  serviceKey: string,
  path: string,
  init: RequestInit,
): Promise<Response> {
  return fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      ...(init.headers ?? {}),
    },
  });
}

export interface LeadSubmitOptions {
  /** Canonical site key. Enforced server-side; the body cannot spoof it. */
  source: string;
  dedupeWindowMs?: number;
  /** Message floor for email_only captures (full-form messages are optional). */
  minMessage?: number;
}

export function createLeadSubmitHandler(opts: LeadSubmitOptions) {
  const dedupeWindowMs = opts.dedupeWindowMs ?? DEFAULT_DEDUPE_WINDOW_MS;
  const minMessage = opts.minMessage ?? DEFAULT_MIN_MESSAGE;

  return async function POST(request: Request): Promise<NextResponse> {
    const env = resolveEnv(process.env);

    // Environment isolation: success-shaped no-op outside production so preview
    // browsing never creates real leads AND the client fallback never fires.
    if (env.vercelEnv !== "production" && !env.allowNonProd) {
      return NextResponse.json({ success: true, leadId: null, skipped: "nonprod" });
    }

    if (!env.supabaseUrl || !env.serviceKey) {
      return NextResponse.json(
        { success: false, error: "Service unavailable. Please try again shortly." },
        { status: 503 },
      );
    }

    const ip =
      request.headers.get("x-real-ip") ||
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      "unknown";
    if (rateLimited(ip, Date.now())) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
    }

    const honeypot = String(body.enquiry_ref ?? "").trim();
    const full_name = String(body.full_name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "Other").trim() || "Other";
    const message = String(body.message ?? "").trim();
    const emailOnly = String(body.captureMode ?? "full").trim() === "email_only";

    // Server-enforced source. The ONLY override is the live-form probe: a
    // matching probe_secret rewrites to 'test' (operator-only routing, no
    // partner CC, enrichment skipped). A wrong/absent secret is ignored and the
    // submission proceeds as a normal lead for the configured site.
    const probe = secretMatches(String(body.probe_secret ?? ""), env.probeSecret);
    const source = probe ? "test" : opts.source;

    const extrasIn =
      body.extras && typeof body.extras === "object"
        ? (body.extras as Record<string, unknown>)
        : null;

    const baseRow = {
      full_name,
      email,
      phone,
      role,
      message,
      source,
      source_url: (body.source_url as string) ?? null,
      submitted_at: (body.submitted_at as string) ?? new Date().toISOString(),
      consent_given: body.consent_given ?? true,
      consent_text: (body.consent_text as string) ?? null,
      consent_at: (body.consent_at as string) ?? new Date().toISOString(),
      visitor_id: (body.visitor_id as string) ?? null,
      session_id: (body.session_id as string) ?? null,
      extras: probe ? { ...(extrasIn ?? {}), probe: true } : extrasIn,
    };

    // 1. Honeypot: store flagged, return success (no bot signal, no lost human).
    if (honeypot) {
      try {
        await postgrest(env.supabaseUrl, env.serviceKey, "leads", {
          method: "POST",
          body: JSON.stringify({
            ...baseRow,
            extras: { ...(baseRow.extras ?? {}), honeypot: true, suspected_spam: true },
          }),
        });
      } catch (e) {
        console.error("[leads/submit] honeypot store failed", e);
      }
      return NextResponse.json({ success: true });
    }

    // 2. Validate. Full form: name + email + phone mandatory, message optional
    //    (lighter qualified pattern — owner decision 2026-07-05). email_only
    //    (specialist-widget captures): email + message only.
    const validationFails = emailOnly
      ? !EMAIL_RE.test(email) || message.length < minMessage
      : full_name.length < MIN_NAME || !EMAIL_RE.test(email) || digits(phone) < MIN_PHONE_DIGITS;
    if (validationFails) {
      return NextResponse.json(
        {
          success: false,
          error: emailOnly
            ? "Please enter a valid email and a short message."
            : "Please complete your name, a valid email and a valid phone number.",
        },
        { status: 400 },
      );
    }

    // 3. Dedupe (best-effort) against a recent same-source+email lead.
    let leadId: string | null = null;
    let existing: { id: string; full_name: string; phone: string; message: string } | null = null;
    try {
      const since = new Date(Date.now() - dedupeWindowMs).toISOString();
      const qs =
        `select=id,full_name,phone,message` +
        `&source=eq.${encodeURIComponent(source)}` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&created_at=gte.${encodeURIComponent(since)}` +
        `&order=created_at.desc&limit=1`;
      const res = await postgrest(env.supabaseUrl, env.serviceKey, `leads?${qs}`, { method: "GET" });
      if (res.ok) {
        const rows = (await res.json()) as Array<{
          id: string;
          full_name: string;
          phone: string;
          message: string;
        }>;
        if (rows.length) {
          existing = rows[0];
          leadId = rows[0].id;
        }
      }
    } catch (e) {
      console.error("[leads/submit] dedupe lookup failed (non-fatal)", e);
    }

    if (leadId && existing) {
      try {
        const update: Record<string, unknown> = {
          message: mergeLeadMessages(existing.message ?? "", message),
          role,
          submitted_at: baseRow.submitted_at,
        };
        // Never overwrite a good stored value with a blank.
        if (full_name) update.full_name = full_name;
        if (phone) update.phone = phone;
        const res = await postgrest(
          env.supabaseUrl,
          env.serviceKey,
          `leads?id=eq.${encodeURIComponent(leadId)}`,
          { method: "PATCH", body: JSON.stringify(update) },
        );
        if (!res.ok) console.error("[leads/submit] dedupe update failed (non-fatal)", res.status);
      } catch (e) {
        console.error("[leads/submit] dedupe update failed (non-fatal)", e);
      }
      return NextResponse.json({ success: true, leadId });
    }

    try {
      const res = await postgrest(env.supabaseUrl, env.serviceKey, "leads", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(baseRow),
      });
      if (!res.ok) {
        console.error("[leads/submit] insert failed", res.status);
        return NextResponse.json(
          { success: false, error: "Could not save your enquiry. Please try again." },
          { status: 500 },
        );
      }
      const rows = (await res.json()) as Array<{ id: string }>;
      leadId = rows[0]?.id ?? null;
    } catch (e) {
      console.error("[leads/submit] insert failed", e);
      return NextResponse.json(
        { success: false, error: "Could not save your enquiry. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, leadId });
  };
}
