/**
 * In-app analytics event bus — a tiny synchronous pub/sub so client components
 * can REACT to events the moment they're tracked, without a server round-trip.
 *
 * track() is otherwise fire-and-forget to /api/track. Some UX needs to respond
 * to behaviour in real time — e.g. the proactive assistant pops the instant a
 * form_error/honeypot fires, and the journey model accumulates the live trail
 * from section_view/scroll_depth/page_view. Those subscribe here.
 *
 * Mirrors the onConsentChange() listener pattern in consent.ts. Listeners run
 * synchronously inside track(), each wrapped so a throwing subscriber can never
 * break tracking. The bus is fed only AFTER track()'s consent + config gate, so
 * an opted-out visitor never triggers a subscriber (no proactive UI for them).
 */
import type { EventName, EventProps } from "./types";

export type AnalyticsListener = (eventName: EventName, props: EventProps) => void;

const listeners = new Set<AnalyticsListener>();

/** Subscribe to tracked events (post consent/config gate). Returns an unsubscribe fn. */
export function onAnalyticsEvent(fn: AnalyticsListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Fan a tracked event out to in-app subscribers. Called by track() once an event
 * has cleared the consent + config gate. Each listener is isolated: a throw is
 * swallowed (and surfaced in dev) so analytics delivery is never affected.
 */
export function emitAnalyticsEvent(eventName: EventName, props: EventProps): void {
  if (listeners.size === 0) return;
  for (const fn of listeners) {
    try {
      fn(eventName, props);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[analytics-bus] listener threw on "${eventName}"`, err);
      }
    }
  }
}

/** Drop all subscribers — for testing only. */
export function _resetAnalyticsBus(): void {
  listeners.clear();
}
