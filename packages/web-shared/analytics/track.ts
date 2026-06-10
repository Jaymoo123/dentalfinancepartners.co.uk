/**
 * The first-party tracker: queue → batch → sendBeacon('/api/track').
 *
 * - Tracks by default (opt-out posture); no-ops only when the visitor has
 *   opted out (consent === 'denied') under opt-out, or hasn't opted in under
 *   opt-in. Re-checked on every call via isTrackingAllowed().
 * - Batches events and flushes on size, on a timer, and on tab-hide/pagehide
 *   via navigator.sendBeacon (with fetch keepalive fallback).
 * - Stamps the common envelope onto every event and scrubs PII defensively.
 * - Same-origin endpoint so it works inside embed iframes and dodges most
 *   ad-blocker lists.
 */
import { isTrackingAllowed, getConsent } from "./consent";
import { getSessionId, getVisitorId } from "./ids";
import {
  EventName,
  EventProps,
  LIMITS,
  TrackEvent,
} from "./types";
import { activeExperimentString } from "./experiments/active";

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
 * before parent effects). We hold those here and replay them in order the
 * instant the site key arrives, so the very first view is never silently dropped.
 */
let pending: Array<{ eventName: EventName; props: EventProps }> = [];
const MAX_PENDING = 100;

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
  if (!hadKey && config.siteKey && pending.length > 0) {
    const replay = pending;
    pending = [];
    for (const e of replay) track(e.eventName, e.props);
  }
}

/** Reset internal state — for testing only. */
export function _resetTrackConfig(): void {
  config = { siteKey: "", isEmbed: false };
  queue = [];
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  listenersBound = false;
  pending = [];
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_RE = /(?:\+?\d[\d\s().-]{8,}\d)/;

/** Drop any prop value that looks like an email or phone number. */
export function scrubProps(props: EventProps): EventProps {
  const out: EventProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    if (typeof v === "string" && (EMAIL_RE.test(v) || PHONE_RE.test(v))) continue;
    out[k] = v;
  }
  return out;
}

const CLARITY_EVENTS: ReadonlySet<string> = new Set([
  "calc_computed",
  "calc_result_viewed",
  "form_start",
  "form_submit",
  "lead_submitted",
  "resource_unlocked",
  "rage_click",
  "exit_intent_shown",
  "subscribe_submitted",
  "experiment_action",
]);
const CLARITY_UPGRADE: ReadonlySet<string> = new Set([
  "form_start",
  "lead_submitted",
  "rage_click",
]);

function forwardToClarity(eventName: string): void {
  const w = window as unknown as { clarity?: (...args: unknown[]) => void };
  if (typeof w.clarity !== "function") return;
  if (CLARITY_EVENTS.has(eventName)) w.clarity("event", eventName);
  if (CLARITY_UPGRADE.has(eventName)) w.clarity("upgrade", eventName);
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
    const dedupeKey = pendingDedupeKey(eventName, props);
    if (
      dedupeKey !== null &&
      pending.some((p) => pendingDedupeKey(p.eventName, p.props) === dedupeKey)
    ) {
      return;
    }
    if (pending.length < MAX_PENDING) {
      pending.push({ eventName, props });
    } else if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[analytics] pre-config buffer full (${MAX_PENDING}); dropping "${eventName}".`,
      );
    }
    return;
  }

  const { path, query } = currentPath();
  const exp = activeExperimentString();
  const event: TrackEvent = {
    event_name: eventName,
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    site_key: config.siteKey,
    page_path: path,
    page_query: query,
    client_ts: new Date().toISOString(),
    is_embed: config.isEmbed,
    embed_slug: config.embedSlug,
    consent_state: getConsent() === "undecided" ? "legitimate_interest" : getConsent(),
    props: scrubProps(exp ? { ...props, exp } : props),
  };

  queue.push(event);
  forwardToClarity(eventName);

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
    try {
      void fetch(INGEST_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* give up silently */
    }
  }

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
