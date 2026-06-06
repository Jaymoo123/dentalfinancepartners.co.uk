/**
 * The first-party tracker: queue → batch → sendBeacon('/api/track').
 *
 * - Tracks by default (legitimate-interest); no-ops only when the visitor has
 *   opted out (consent === 'denied'), re-checked on every call.
 * - Batches events and flushes on size, on a timer, and on tab-hide/pagehide
 *   via navigator.sendBeacon (with fetch keepalive fallback) so events survive
 *   the page being closed.
 * - Stamps the common envelope onto every event and scrubs PII defensively.
 * - Same-origin endpoint so it works inside embed iframes and dodges most
 *   ad-blocker lists. INGEST_PATH is easy to swap if a blocker targets it.
 */
import { isTrackingAllowed, getConsent } from "./consent";
import { getSessionId, getVisitorId } from "./ids";
import {
  EventName,
  EventProps,
  LIMITS,
  TrackEvent,
} from "./types";
import { activeExperimentString } from "@/lib/experiments/active";

const INGEST_PATH = "/api/track";

interface AnalyticsConfig {
  siteKey: string;
  isEmbed: boolean;
  embedSlug?: string;
}

let config: AnalyticsConfig = { siteKey: "", isEmbed: false };
let queue: TrackEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let listenersBound = false;

/**
 * Events fired before configureAnalytics() has run (React fires child effects
 * before parent effects, so a deeply-nested mount effect like the calculator's
 * calc_view can call track() a tick before AnalyticsProvider sets the siteKey).
 * We hold those here and replay them, in order, the instant the site key
 * arrives, so the very first view is never silently dropped.
 *
 * Cap is generous (a real page fires only a handful of pre-config events) so the
 * calc_view can never be evicted by noisier auto-capture events that race ahead
 * of it. A dev-only warning fires if we ever hit the cap, so the regression that
 * caused calc_view=0 (buffer overflow before replay) is caught in QA.
 */
let pending: Array<{ eventName: EventName; props: EventProps }> = [];
const MAX_PENDING = 100;
/** Dedupe key for the buffer: only collapses events that carry a slug (the
 * idempotent "view" events — a calc_view for the same tool should be queued
 * once even if a StrictMode double-invoke / re-mount fires it twice pre-config).
 * Events without a slug (clicks, scroll, etc.) are never deduped. */
function pendingDedupeKey(eventName: EventName, props: EventProps): string | null {
  const slug = props.calculator_slug;
  if (typeof slug !== "string" || slug.length === 0) return null;
  return `${eventName}::${slug}`;
}

/** Called once by AnalyticsProvider with the site/embed context. */
export function configureAnalytics(next: AnalyticsConfig): void {
  const hadKey = !!config.siteKey;
  config = next;
  bindLifecycleFlush();
  // First time we learn the site key: replay everything captured before boot,
  // in the order it arrived. Swap the buffer out *before* replaying so any
  // re-entrant track() (now that the key is set) takes the normal queue path
  // and can't recurse back into the buffer.
  if (!hadKey && config.siteKey && pending.length > 0) {
    const replay = pending;
    pending = [];
    for (const e of replay) track(e.eventName, e.props);
  }
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_RE = /(?:\+?\d[\d\s().-]{8,}\d)/;

/** Drop any prop value that looks like an email or phone number. */
function scrubProps(props: EventProps): EventProps {
  const out: EventProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    if (typeof v === "string" && (EMAIL_RE.test(v) || PHONE_RE.test(v))) continue;
    out[k] = v;
  }
  return out;
}

function currentPath(): { path: string; query: string } {
  if (typeof window === "undefined") return { path: "", query: "" };
  return {
    path: window.location.pathname || "/",
    query: window.location.search.replace(/^\?/, ""),
  };
}

/**
 * Record an event. Cheap and safe to call anywhere; no-ops without consent or
 * outside the browser.
 */
export function track(eventName: EventName, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  if (!isTrackingAllowed()) return;
  if (!config.siteKey) {
    // Not configured yet (effect ordering race). Buffer and replay on configure
    // rather than dropping the event. Capped so a never-configured page (e.g. an
    // opted-out/embed context that bails before configure) can't grow unbounded.
    const dedupeKey = pendingDedupeKey(eventName, props);
    if (
      dedupeKey !== null &&
      pending.some((p) => pendingDedupeKey(p.eventName, p.props) === dedupeKey)
    ) {
      // An identical (event + calculator_slug) is already buffered — e.g. a
      // StrictMode double-invoke or re-mount firing calc_view twice before the
      // site key lands. Keep the first; don't double-count the view.
      return;
    }
    if (pending.length < MAX_PENDING) {
      pending.push({ eventName, props });
    } else if (process.env.NODE_ENV !== "production") {
      // We dropped a pre-config event. On a real page this should never happen;
      // if it does, a view (e.g. calc_view) may be lost — surface it in QA.
      console.warn(
        `[analytics] pre-config buffer full (${MAX_PENDING}); dropping "${eventName}". ` +
          `Event fired before configureAnalytics(); it will not be sent.`,
      );
    }
    return;
  }

  const { path, query } = currentPath();
  const exp = activeExperimentString();
  const event: TrackEvent = {
    event_name: eventName,
    visitor_id: getVisitorId(),
    session_id: getSessionId(), // also refreshes the session idle timer
    site_key: config.siteKey,
    page_path: path,
    page_query: query,
    client_ts: new Date().toISOString(),
    is_embed: config.isEmbed,
    embed_slug: config.embedSlug,
    // "undecided" => tracked by default under legitimate interest (no banner).
    consent_state: getConsent() === "undecided" ? "legitimate_interest" : getConsent(),
    props: scrubProps(exp ? { ...props, exp } : props),
  };

  queue.push(event);

  if (queue.length >= LIMITS.FLUSH_AT_EVENTS) {
    flush();
  } else {
    scheduleFlush();
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(flush, LIMITS.FLUSH_INTERVAL_MS);
}

/** Send everything queued right now. Safe to call repeatedly. */
export function flush(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (queue.length === 0) return;
  if (typeof window === "undefined") return;

  // Take at most a full batch; leave the remainder for the next flush.
  const batch = queue.slice(0, LIMITS.MAX_BATCH_EVENTS);
  queue = queue.slice(LIMITS.MAX_BATCH_EVENTS);

  const body = JSON.stringify({ events: batch });

  let sent = false;
  try {
    if (navigator.sendBeacon) {
      sent = navigator.sendBeacon(
        INGEST_PATH,
        new Blob([body], { type: "application/json" }),
      );
    }
  } catch {
    sent = false;
  }

  if (!sent) {
    // Fallback: keepalive fetch survives unload in modern browsers.
    try {
      void fetch(INGEST_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* give up silently; analytics is best-effort */
    }
  }

  // If a flush left a remainder (rare), schedule another pass.
  if (queue.length > 0) scheduleFlush();
}

function bindLifecycleFlush(): void {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;

  const onHide = () => {
    if (document.visibilityState === "hidden") flush();
  };
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("pagehide", flush);
  window.addEventListener("beforeunload", flush);
}
