/**
 * Anonymous identity for first-party analytics.
 *
 *   visitor_id  persistent  (localStorage)   — same person across visits, same origin
 *   session_id  rolling     (sessionStorage) — resets after 30 min idle / tab close
 *
 * Decision (locked): main-site stitching only. localStorage is per-origin, so an
 * embedded calculator iframe gets its OWN visitor_id — embed journeys are tracked
 * but intentionally not joined to a later main-site visit. No cross-origin bridge.
 *
 * Ids are random and NOT derived from any PII.
 */
import { LIMITS } from "./types";

const VISITOR_KEY = "ptp_vid";
const SESSION_KEY = "ptp_sid";
const SESSION_TS_KEY = "ptp_sid_ts";

function randomId(prefix: string): string {
  // crypto.randomUUID is available in all modern browsers; fall back defensively.
  try {
    const c: Crypto | undefined =
      typeof crypto !== "undefined" ? crypto : undefined;
    if (c?.randomUUID) {
      return `${prefix}_${c.randomUUID().replace(/-/g, "")}`;
    }
    if (c?.getRandomValues) {
      const buf = new Uint8Array(16);
      c.getRandomValues(buf);
      const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${prefix}_${hex}`;
    }
  } catch {
    /* crypto blocked — fall through */
  }
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSet(store: Storage | undefined, key: string, value: string): void {
  try {
    store?.setItem(key, value);
  } catch {
    /* private mode / storage full — ids degrade to per-pageview, acceptable */
  }
}

/** Stable per-visitor id, minted once and persisted. */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  const ls = window.localStorage;
  let id = safeGet(ls, VISITOR_KEY);
  if (!id) {
    id = randomId("v");
    safeSet(ls, VISITOR_KEY, id);
  }
  return id;
}

/**
 * Current session id, rolling on a 30-minute idle window. Reading it also
 * refreshes the idle timer, so call this on every tracked event.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const ss = window.sessionStorage;
  const now = Date.now();
  const lastTs = Number(safeGet(ss, SESSION_TS_KEY) || 0);
  let id = safeGet(ss, SESSION_KEY);

  if (!id || !lastTs || now - lastTs > LIMITS.SESSION_IDLE_MS) {
    id = randomId("s");
    safeSet(ss, SESSION_KEY, id);
  }
  safeSet(ss, SESSION_TS_KEY, String(now));
  return id;
}

/** True if a brand-new session id would be minted on the next getSessionId(). */
export function isNewSession(): boolean {
  if (typeof window === "undefined") return false;
  const ss = window.sessionStorage;
  const lastTs = Number(safeGet(ss, SESSION_TS_KEY) || 0);
  return !safeGet(ss, SESSION_KEY) || !lastTs || Date.now() - lastTs > LIMITS.SESSION_IDLE_MS;
}
