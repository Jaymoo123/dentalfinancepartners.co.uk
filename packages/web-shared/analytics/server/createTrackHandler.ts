/**
 * Factory for the per-site /api/track ingest route.
 *
 * Usage in a site's src/app/api/track/route.ts:
 *
 *   import { createTrackHandler } from "@accounting-network/web-shared/analytics/server";
 *   export const runtime = "nodejs";
 *   export const maxDuration = 10;
 *   export const dynamic = "force-dynamic";
 *   export const POST = createTrackHandler({ siteKey: <canonical key> });
 *
 * The factory preserves Property's ingest semantics verbatim (event-name allowlist,
 * server re-caps, edge-geo/no-IP, UA-heuristic + human_confirmed, single RPC via
 * service role) and adds one hardening: events whose site_key doesn't match the
 * expected key are dropped before ingest (foreign-site-key drop).
 *
 * Vercel BotID is intentionally NOT consulted here — see bots.ts for the full
 * rationale (sendBeacon carries no client challenge; false-flagged 100% of real
 * visitors when wired in 2026-06-08).
 *
 * SEC-04: the `export const runtime = "nodejs"` declaration stays in the per-site
 * route file so it remains visible at the route level (Vercel reads it there).
 */
import { type NextRequest, NextResponse } from "next/server";
import { isKnownEvent, INTERACTION_EVENTS, LIMITS } from "../types";
import { detectBot, parseUa } from "./bots";

const NO_CONTENT = new NextResponse(null, { status: 204 });

type RawEvent = Record<string, unknown>;

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

function num(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

/**
 * Visitor ids minted by synthetic/test tooling (e.g. the post-deploy probes)
 * carry this prefix. Their traffic is flagged is_bot=true so it is excluded from
 * every human-only rollup view, CRO detector and experiment-results view (all of
 * which filter is_bot=false), keeping test runs out of any decision data.
 * Real visitor ids are always minted as "v_<hex>" (see analytics/ids.ts), so this
 * prefix can never collide with a genuine visitor.
 */
export const SYNTHETIC_VISITOR_PREFIX = "synthetic_";
function isSyntheticVisitor(visitorId: unknown): boolean {
  return typeof visitorId === "string" && visitorId.startsWith(SYNTHETIC_VISITOR_PREFIX);
}

/** Keep only allowlisted events with the required identity fields + capped props.
 *  Also drops events whose site_key doesn't match the expected key (foreign-key drop). */
export function sanitiseEvents(raw: unknown, expectedSiteKey: string): RawEvent[] {
  if (!raw || typeof raw !== "object") return [];
  const events = (raw as { events?: unknown }).events;
  if (!Array.isArray(events)) return [];

  const out: RawEvent[] = [];
  for (const e of events.slice(0, LIMITS.MAX_BATCH_EVENTS)) {
    if (!e || typeof e !== "object") continue;
    const ev = e as RawEvent;
    const name = str(ev.event_name);
    const session_id = str(ev.session_id);
    const visitor_id = str(ev.visitor_id);
    const site_key = str(ev.site_key);
    if (!name || !isKnownEvent(name) || !session_id || !visitor_id || !site_key) continue;
    if (site_key !== expectedSiteKey) continue; // foreign-site-key drop

    let props = ev.props && typeof ev.props === "object" ? ev.props : {};
    try {
      if (JSON.stringify(props).length > LIMITS.MAX_PROPS_BYTES) props = {};
    } catch {
      props = {};
    }

    out.push({
      event_name: name,
      session_id,
      visitor_id,
      site_key,
      page_path: str(ev.page_path) ?? null,
      page_query: str(ev.page_query) ?? null,
      client_ts: str(ev.client_ts) ?? null,
      is_embed: ev.is_embed === true,
      props,
      _embed_slug: str(ev.embed_slug),
      _consent_state: str(ev.consent_state),
    });
  }
  return out;
}

/** Build one session-aggregate payload from a group of events (all one session). */
export function buildSession(
  group: RawEvent[],
  ctx: {
    isBot: boolean;
    botReason: string | null;
    botidVerified: boolean | null;
    country: string | null;
    city: string | null;
    region: string | null;
    timezone: string | null;
    uaFamily: string;
    osFamily: string;
  },
) {
  const first = group[0];
  const pageView = group.find((e) => e.event_name === "page_view");
  const pv = (pageView?.props ?? {}) as Record<string, unknown>;

  let engagedMs = 0;
  let maxScroll = 0;
  let humanConfirmed = false;
  let exitPath: string | null = null;
  for (const e of group) {
    if (INTERACTION_EVENTS.has(String(e.event_name))) humanConfirmed = true;
    if (e.event_name === "engagement_time") {
      engagedMs += num((e.props as Record<string, unknown>)?.engaged_ms_delta) ?? 0;
    }
    if (e.event_name === "scroll_depth") {
      maxScroll = Math.max(maxScroll, num((e.props as Record<string, unknown>)?.pct) ?? 0);
    }
    if (typeof e.page_path === "string") exitPath = e.page_path;
  }

  return {
    session_id: first.session_id,
    visitor_id: first.visitor_id,
    site_key: first.site_key,
    last_seen_at: new Date().toISOString(),
    entry_path: str(pv.is_entry ? (first.page_path as string) : undefined) ?? (first.page_path as string) ?? null,
    exit_path: exitPath,
    referrer: str(pv.referrer) ?? null,
    referrer_host: str(pv.referrer_host) ?? null,
    utm_source: str(pv.utm_source) ?? null,
    utm_medium: str(pv.utm_medium) ?? null,
    utm_campaign: str(pv.utm_campaign) ?? null,
    utm_term: str(pv.utm_term) ?? null,
    utm_content: str(pv.utm_content) ?? null,
    device_type: str(pv.device_type) ?? null,
    viewport_w: num(pv.viewport_w) ?? null,
    viewport_h: num(pv.viewport_h) ?? null,
    ua_family: ctx.uaFamily,
    os_family: ctx.osFamily,
    country: ctx.country,
    city: ctx.city,
    region: ctx.region,
    timezone: ctx.timezone,
    is_embed: first.is_embed === true,
    embed_slug: str(first._embed_slug) ?? null,
    embed_referrer_host: null,
    consent_state: str(first._consent_state) ?? "granted",
    is_bot: ctx.isBot,
    bot_reason: ctx.botReason,
    botid_verified: ctx.botidVerified,
    human_confirmed: humanConfirmed,
    event_count: group.length,
    engaged_ms: Math.round(engagedMs),
    max_scroll_pct: Math.round(maxScroll),
  };
}

async function callIngest(
  supabaseUrl: string,
  serviceKey: string,
  session: object,
  events: object[],
): Promise<void> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/ingest_web_events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ p_session: session, p_events: events }),
  });
  if (!res.ok && process.env.NODE_ENV === "development") {
    console.error("[track] ingest failed", res.status, await res.text().catch(() => ""));
  }
}

export function createTrackHandler(opts: { siteKey: string }) {
  return async function POST(request: NextRequest) {
    const SUPABASE_URL =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!SUPABASE_URL || !SERVICE_KEY) {
      if (process.env.NODE_ENV === "development") {
        console.error("[track] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
      }
      return NO_CONTENT;
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NO_CONTENT;
    }

    const events = sanitiseEvents(body, opts.siteKey);
    if (events.length === 0) return NO_CONTENT;

    const ua = request.headers.get("user-agent");
    const heuristic = detectBot(ua);
    const isBot = heuristic.isBot;
    const reason = heuristic.reason;
    const botidVerified: boolean | null = null;
    const { uaFamily, osFamily } = parseUa(ua);
    const country = request.headers.get("x-vercel-ip-country");
    const city = request.headers.get("x-vercel-ip-city");
    const region = request.headers.get("x-vercel-ip-country-region");
    const timezone = request.headers.get("x-vercel-ip-timezone");

    const groups = new Map<string, RawEvent[]>();
    for (const e of events) {
      const key = String(e.session_id);
      const g = groups.get(key);
      if (g) g.push(e);
      else groups.set(key, [e]);
    }

    try {
      await Promise.all(
        Array.from(groups.values()).map((group) => {
          // Synthetic/test traffic (post-deploy probes) is flagged is_bot so it is
          // excluded from every human-only rollup, detector and experiment metric.
          const synthetic = isSyntheticVisitor(group[0]?.visitor_id);
          const groupBot = isBot || synthetic;
          const groupReason = synthetic ? "synthetic-test" : reason;
          const session = buildSession(group, {
            isBot: groupBot,
            botReason: groupReason,
            botidVerified,
            country,
            city,
            region,
            timezone,
            uaFamily,
            osFamily,
          });
          const eventRows = group.map((e) => ({
            session_id: e.session_id,
            visitor_id: e.visitor_id,
            site_key: e.site_key,
            event_name: e.event_name,
            client_ts: e.client_ts,
            page_path: e.page_path,
            page_query: e.page_query,
            props: e.props,
            is_embed: e.is_embed === true,
            is_bot: groupBot,
          }));
          return callIngest(SUPABASE_URL, SERVICE_KEY, session, eventRows);
        }),
      );
    } catch (err) {
      if (process.env.NODE_ENV === "development") console.error("[track] error", err);
    }

    return NO_CONTENT;
  };
}
