/**
 * Consent source of truth (plain TS so the analytics SDK can read it without React).
 *
 * Decision: track by DEFAULT (legitimate-interest posture) for opt-out sites,
 * no blocking banner. Everything runs unless the visitor explicitly opts out via
 * the quiet "Do not track me" control (which calls setConsent("denied")). The SDK
 * and the GA/Clarity loaders read isTrackingAllowed()/getConsent().
 *
 * For opt-in sites (posture: "opt-in"), mount <ConsentBanner /> and tracking
 * only begins after the visitor explicitly accepts.
 *
 * The posture decision is written in initAnalytics() config, not tribal.
 * To change posture: update the posture option in your layout's AnalyticsProvider call.
 */
import { getSdkConfig } from "./init";

export type ConsentState = "undecided" | "granted" | "denied";

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

/** Storage key derived from the site's storagePrefix (frozen at adoption). */
function consentKey(): string {
  return `${getSdkConfig()?.storagePrefix ?? "sdk"}_consent`;
}

function read(): ConsentState {
  if (typeof window === "undefined") return "undecided";
  try {
    const v = window.localStorage.getItem(consentKey());
    if (v === "granted" || v === "denied") return v;
  } catch {
    /* storage blocked */
  }
  return "undecided";
}

/** Current consent state. */
export function getConsent(): ConsentState {
  return read();
}

/**
 * Whether tracking is allowed under the configured posture:
 *  - opt-out: allowed unless the visitor has explicitly opted out ("denied").
 *    Reads localStorage live so an opt-out takes effect on the very next event.
 *  - opt-in: allowed only when the visitor has explicitly granted consent.
 *
 * Defaults to opt-out behaviour before initAnalytics() is called, so events
 * fired by child components before the parent provider effect runs are still
 * captured by track()'s pre-config buffer rather than silently dropped.
 */
export function isTrackingAllowed(): boolean {
  const posture = getSdkConfig()?.posture;
  if (posture === "opt-in") return read() === "granted";
  return read() !== "denied";
}

/** True only when the visitor has explicitly opted out. */
export function hasOptedOut(): boolean {
  return read() === "denied";
}

/** Persist a decision and notify subscribers (banner accept/reject). */
export function setConsent(state: Exclude<ConsentState, "undecided">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(consentKey(), state);
  } catch {
    /* storage blocked — state stays in-memory for this page only */
  }
  for (const l of listeners) l(state);
}

/** Subscribe to consent changes. Returns an unsubscribe fn. */
export function onConsentChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
