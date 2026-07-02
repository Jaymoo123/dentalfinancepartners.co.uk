/**
 * Client-side visit state for personalisation. Deterministic, no server
 * round-trip, SSR-safe (every accessor guards `window`). Storage keys are
 * derived from the site's storagePrefix (frozen at adoption via initAnalytics).
 *
 * Topic derivation is NOT here — `deriveTopic` is site-specific taxonomy
 * injected via initAnalytics (see init.ts). Sites without a taxonomy pass
 * nothing; topic features no-op.
 *
 * Stores:
 *  - <prefix>_entry_topic (sessionStorage): topic of THIS session's landing page
 *    (the search-intent proxy; first page wins)
 *  - <prefix>_last_topic  (localStorage):   most-recent non-null topic across visits
 *  - <prefix>_visits      (localStorage):   session count (returning detection)
 *  - <prefix>_converted   (localStorage):   lead converted flag (stop nagging)
 *  - <prefix>_booking_nudge (localStorage): {t, exp} signed booking capability
 *    token from the lead submit (nothing personal), until it expires
 *  - <prefix>_booked      (localStorage):   callback booked flag (kills the nudge)
 */
import { getSdkConfig } from "./init";

function p(): string {
  return getSdkConfig()?.storagePrefix ?? "sdk";
}

function ss(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}
function ls(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Record the session's landing topic. First call of the session wins. */
export function recordEntryTopic(topic: string | null): void {
  const s = ss();
  if (!s) return;
  try {
    if (s.getItem(`${p()}_entry_topic`) === null) s.setItem(`${p()}_entry_topic`, topic ?? "");
  } catch {
    /* storage full / blocked */
  }
}

/** Remember the most-recent non-null topic across sessions (returning tailoring). */
export function recordTopicVisit(topic: string | null): void {
  const s = ls();
  if (!s || !topic) return;
  try {
    s.setItem(`${p()}_last_topic`, topic);
  } catch {
    /* ignore */
  }
}

export function getEntryTopic(): string | null {
  const s = ss();
  if (!s) return null;
  try {
    return s.getItem(`${p()}_entry_topic`) || null;
  } catch {
    return null;
  }
}

export function getLastTopic(): string | null {
  const s = ls();
  if (!s) return null;
  try {
    return s.getItem(`${p()}_last_topic`) || null;
  } catch {
    return null;
  }
}

/** Increment the session counter once per new session (call with isNewSession). */
export function bumpVisits(isNewSess: boolean): void {
  const s = ls();
  if (!s || !isNewSess) return;
  try {
    const n = parseInt(s.getItem(`${p()}_visits`) || "0", 10) || 0;
    s.setItem(`${p()}_visits`, String(n + 1));
  } catch {
    /* ignore */
  }
}

export function getVisitCount(): number {
  const s = ls();
  if (!s) return 0;
  try {
    return parseInt(s.getItem(`${p()}_visits`) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export function isReturning(): boolean {
  return getVisitCount() > 1;
}

/** Mark this visitor converted (set on lead submit) so we stop nagging them. */
export function setConverted(): void {
  const s = ls();
  if (!s) return;
  try {
    s.setItem(`${p()}_converted`, "1");
  } catch {
    /* ignore */
  }
}

export function isConverted(): boolean {
  const s = ls();
  if (!s) return false;
  try {
    return s.getItem(`${p()}_converted`) === "1";
  } catch {
    return false;
  }
}

/** Persist the signed booking capability token at submit (nothing personal, just the capability). */
export function setBookingNudge(token: string, expiresAtMs: number): void {
  const s = ls();
  if (!s || !token) return;
  try {
    s.setItem(`${p()}_booking_nudge`, JSON.stringify({ t: token, exp: expiresAtMs }));
  } catch {
    /* ignore */
  }
}

/** The live booking nudge, or null when absent/expired/already booked. */
export function getBookingNudge(): { token: string } | null {
  const s = ls();
  if (!s) return null;
  try {
    if (s.getItem(`${p()}_booked`) === "1") return null;
    const raw = s.getItem(`${p()}_booking_nudge`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t?: unknown; exp?: unknown };
    if (typeof parsed.t !== "string" || !parsed.t) return null;
    if (typeof parsed.exp !== "number" || Date.now() >= parsed.exp) return null;
    return { token: parsed.t };
  } catch {
    return null;
  }
}

/** Mark the callback as booked: clears the nudge permanently. */
export function setBookingDone(): void {
  const s = ls();
  if (!s) return;
  try {
    s.setItem(`${p()}_booked`, "1");
    s.removeItem(`${p()}_booking_nudge`);
  } catch {
    /* ignore */
  }
}
