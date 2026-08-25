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
 *   3. Dedupe against a recent same-source lead with adopt-and-merge semantics
 *      (blanks never overwrite good values; messages append with a separator,
 *      capped at 4000 chars trimming from the front; extras shallow-merge with
 *      incoming keys winning). Exact source+email eq fast path first; on a miss,
 *      a second pass over recent same-source rows matches on the plus-alias
 *      normalised email OR the last-10-digits phone key, so `x+tag@` then `x@`
 *      (or same phone, different email) merge into one row instead of two.
 *      Merged responses carry `merged: true` so site route tails can skip
 *      re-enrolment.
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

/** Returns true when the submission looks like a QA/test lead. */
export function isTestLead(params: { email: string; full_name: string; qa?: boolean }): boolean {
  if (params.qa) return true;
  if (/@(test|example)\./i.test(params.email)) return true;
  if (/\+test@/i.test(params.email)) return true;
  if (/^test\b/i.test(params.full_name)) return true;
  return false;
}
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

/**
 * Canonical email for dedupe matching: trimmed, lowercased, plus-addressing
 * stripped from the local part (`kendlc2026+ma@gmail.com` -> `kendlc2026@gmail.com`).
 * Dots are deliberately NOT stripped (Gmail-only semantics; too aggressive).
 */
export function normalizeEmailForDedupe(email: string): string {
  const e = email.trim().toLowerCase();
  const at = e.indexOf("@");
  if (at === -1) return e;
  const plus = e.slice(0, at).indexOf("+");
  return plus === -1 ? e : e.slice(0, plus) + e.slice(at);
}

/**
 * Canonical phone for dedupe matching: last 10 digits (drops country code /
 * leading zero differences), or null when there are fewer than 10 digits.
 */
export function phoneDedupeKey(phone: string): string | null {
  const d = (phone.match(/\d/g) || []).join("");
  return d.length < 10 ? null : d.slice(-10);
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
  /**
   * Called after a brand-new lead row is inserted (not on dedupe merges). Used
   * by sites that run lead-nurture enrolment from the submit route. Best-effort:
   * any error is caught and logged by the caller; it must never block or lose the
   * lead. The lead shape is a minimal NurtureLead-compatible object.
   */
  onLeadInserted?: (lead: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    role: string;
    message: string;
    source: string;
  }) => Promise<void>;
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
    const qaFlag = body.qa === true || extrasIn?.qa === true;

    const baseRow = {
      is_test: isTestLead({ email, full_name, qa: qaFlag }),
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

    // 1. Honeypot: tag-only. Every hit in history was a real human caught by
    //    browser autofill (2 hits, 0 bots, 2026-07-13), so the lead proceeds
    //    through the normal pipeline; the tag is kept purely for monitoring.
    //    Upgrade path if real bot spam ever appears: Vercel BotID.
    if (honeypot) {
      baseRow.extras = { ...(baseRow.extras ?? {}), honeypot: true };
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

    // 3. Dedupe (best-effort): exact source+email eq fast path, then a second
    //    pass over recent same-source rows on normalised email / phone key.
    let leadId: string | null = null;
    type DedupeCandidate = {
      id: string;
      full_name: string;
      phone: string;
      message: string;
      email?: string;
      extras?: Record<string, unknown> | null;
    };
    let existing: DedupeCandidate | null = null;
    try {
      const since = new Date(Date.now() - dedupeWindowMs).toISOString();
      const qs =
        `select=id,full_name,phone,message,extras` +
        `&source=eq.${encodeURIComponent(source)}` +
        `&email=eq.${encodeURIComponent(email)}` +
        `&created_at=gte.${encodeURIComponent(since)}` +
        `&order=created_at.desc&limit=1`;
      const res = await postgrest(env.supabaseUrl, env.serviceKey, `leads?${qs}`, { method: "GET" });
      if (res.ok) {
        const rows = (await res.json()) as DedupeCandidate[];
        if (rows.length) existing = rows[0];
      }
      if (!existing) {
        // Second pass: same person on a plus-alias email or a phone-only match
        // (real incident 2026-08-19: wizard with `x+ma@` then form with `x@`
        // four minutes later created two rows and two nurture sequences).
        const candQs =
          `select=id,full_name,phone,message,email,extras` +
          `&source=eq.${encodeURIComponent(source)}` +
          `&created_at=gte.${encodeURIComponent(since)}` +
          `&order=created_at.desc&limit=50`;
        const candRes = await postgrest(env.supabaseUrl, env.serviceKey, `leads?${candQs}`, {
          method: "GET",
        });
        if (candRes.ok) {
          const rows = (await candRes.json()) as DedupeCandidate[];
          const emailKey = normalizeEmailForDedupe(email);
          const phoneKey = phoneDedupeKey(phone);
          existing =
            rows.find(
              (r) =>
                normalizeEmailForDedupe(r.email ?? "") === emailKey ||
                (phoneKey !== null && phoneDedupeKey(r.phone ?? "") === phoneKey),
            ) ?? null;
        }
      }
      leadId = existing?.id ?? null;
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
        // Merge extras Property-style so e.g. wizard answers on the prior row
        // survive a plain-form resubmission (and vice versa). Incoming wins.
        const priorExtras =
          existing.extras && typeof existing.extras === "object" ? existing.extras : null;
        if (priorExtras || baseRow.extras) {
          update.extras = { ...(priorExtras ?? {}), ...(baseRow.extras ?? {}) };
        }
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
      // merged:true lets site route tails (nurture enrolment etc.) skip
      // re-enrolling an inbox that is already in a sequence.
      return NextResponse.json({ success: true, leadId, merged: true });
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

    // Post-insert hook (e.g. nurture enrolment). Best-effort: never blocks or
    // loses the lead. Only fires on brand-new inserts, not dedupe merges.
    if (leadId && opts.onLeadInserted) {
      try {
        await opts.onLeadInserted({ id: leadId, full_name, email, phone, role, message, source });
      } catch (e) {
        console.error("[leads/submit] onLeadInserted hook failed (non-fatal)", e);
      }
    }

    return NextResponse.json({ success: true, leadId });
  };
}
