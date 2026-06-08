/**
 * First-party analytics ingest endpoint.
 *
 * Browsers sendBeacon() a batch of events here (same-origin, so it works inside
 * embed iframes and dodges most ad-blocker lists). This route:
 *   1. validates the batch (event-name allowlist + size caps),
 *   2. bot-filters server-side (heuristics now; Vercel BotID is a drop-in),
 *   3. derives country from the edge geo header and NEVER stores raw IP,
 *   4. aggregates the batch into one session upsert + an event insert, and
 *   5. writes via the service role through the ingest_web_events RPC, which
 *      OR-merges sticky flags and increments counters atomically.
 *
 * Anonymous, track-by-default (the client sends unless the visitor opted out), no PII. Always
 * returns 204 so bots get no signal; failures are logged server-side, never thrown
 * back to the page.
 */
import { NextResponse, type NextRequest } from "next/server";
import { isKnownEvent, INTERACTION_EVENTS, LIMITS } from "@/lib/analytics/types";
import { detectBot, parseUa } from "@/lib/analytics/server/bots";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const NO_CONTENT = new NextResponse(null, { status: 204 });

type RawEvent = Record<string, unknown>;

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

function num(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

/** Keep only allowlisted events with the required identity fields + capped props. */
function sanitiseEvents(raw: unknown): RawEvent[] {
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
function buildSession(
  group: RawEvent[],
  ctx: {
    isBot: boolean;
    botReason: string | null;
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
    botid_verified: null,
    human_confirmed: humanConfirmed,
    event_count: group.length,
    engaged_ms: Math.round(engagedMs),
    max_scroll_pct: Math.round(maxScroll),
  };
}

async function callIngest(session: object, events: object[]): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ingest_web_events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ p_session: session, p_events: events }),
  });
  if (!res.ok && process.env.NODE_ENV === "development") {
    console.error("[track] ingest failed", res.status, await res.text().catch(() => ""));
  }
}

export async function POST(request: NextRequest) {
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

  const events = sanitiseEvents(body);
  if (events.length === 0) return NO_CONTENT;

  const ua = request.headers.get("user-agent");
  const { isBot, reason } = detectBot(ua);
  const { uaFamily, osFamily } = parseUa(ua);
  const country = request.headers.get("x-vercel-ip-country"); // edge geo; never raw IP
  const city = request.headers.get("x-vercel-ip-city");
  const region = request.headers.get("x-vercel-ip-country-region");
  const timezone = request.headers.get("x-vercel-ip-timezone");

  // Tag each event with the bot verdict, then group by session.
  const groups = new Map<string, RawEvent[]>();
  for (const e of events) {
    e.is_bot = isBot;
    const key = String(e.session_id);
    const g = groups.get(key);
    if (g) g.push(e);
    else groups.set(key, [e]);
  }

  try {
    await Promise.all(
      Array.from(groups.values()).map((group) => {
        const session = buildSession(group, {
          isBot,
          botReason: reason,
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
          is_bot: isBot,
        }));
        return callIngest(session, eventRows);
      }),
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[track] error", err);
  }

  return NO_CONTENT;
}
