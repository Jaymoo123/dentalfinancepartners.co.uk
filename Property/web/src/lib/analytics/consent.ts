/**
 * Consent source of truth (plain TS so the analytics SDK can read it without React).
 *
 * Decision (updated 2026-06-05): track by DEFAULT (legitimate-interest posture),
 * no blocking banner. Everything runs unless the visitor explicitly opts out via
 * the quiet "Do not track me" control (which calls setConsent("denied")). The SDK
 * and the GA/Clarity loaders read isTrackingAllowed()/getConsent().
 *
 * To revert to opt-in, change isTrackingAllowed() back to `read() === "granted"`
 * and re-mount <ConsentBanner/> in ConsentProvider.
 */

export type ConsentState = "undecided" | "granted" | "denied";

const CONSENT_KEY = "ptp_consent";

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

function read(): ConsentState {
  if (typeof window === "undefined") return "undecided";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
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
 * Track by default (legitimate-interest posture): allowed unless the visitor has
 * explicitly opted out. Reads localStorage live, so an opt-out takes effect on
 * the very next event with no reload.
 */
export function isTrackingAllowed(): boolean {
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
    window.localStorage.setItem(CONSENT_KEY, state);
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
