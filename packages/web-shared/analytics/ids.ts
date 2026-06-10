/**
 * Anonymous identity for first-party analytics.
 *
 *   visitor_id  persistent  (localStorage)   — same person across visits, same origin
 *   session_id  rolling     (sessionStorage) — resets after 30 min idle / tab close
 *
 * Storage keys are derived from the site's storagePrefix (frozen at adoption via
 * initAnalytics). If legacyPrefix is set, a one-time migration runs on first call:
 *   - consent "denied" is copied (compliance — an opt-out must never be orphaned)
 *   - visitor_id is copied (journey continuity)
 *   - session state is NOT migrated (30-min expiry makes it cheap to lose)
 *
 * Ids are random and NOT derived from any PII.
 */
import { LIMITS } from "./types";
import { getSdkConfig } from "./init";

function prefix(): string {
  return getSdkConfig()?.storagePrefix ?? "sdk";
}

function visitorKey(): string { return `${prefix()}_vid`; }
function sessionKey(): string { return `${prefix()}_sid`; }
function sessionTsKey(): string { return `${prefix()}_sid_ts`; }

function randomId(p: string): string {
  try {
    const c: Crypto | undefined =
      typeof crypto !== "undefined" ? crypto : undefined;
    if (c?.randomUUID) {
      return `${p}_${c.randomUUID().replace(/-/g, "")}`;
    }
    if (c?.getRandomValues) {
      const buf = new Uint8Array(16);
      c.getRandomValues(buf);
      const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${p}_${hex}`;
    }
  } catch {
    /* crypto blocked */
  }
  return `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

export function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function safeSet(store: Storage | undefined, key: string, value: string): void {
  try {
    store?.setItem(key, value);
  } catch {
    /* private mode / storage full */
  }
}

let _migrated = false;

/**
 * One-time legacyPrefix migration. Copies consent "denied" and visitor_id from
 * the legacy key namespace to the new storagePrefix namespace. Runs at most once
 * per page load. No-op if legacyPrefix is not set.
 */
export function runLegacyMigration(): void {
  if (_migrated || typeof window === "undefined") return;
  _migrated = true;
  const cfg = getSdkConfig();
  if (!cfg?.legacyPrefix) return;

  const ls = window.localStorage;
  const newConsentKey = `${cfg.storagePrefix}_consent`;
  const legacyConsentVal = safeGet(ls, `${cfg.legacyPrefix}_consent`);
  if (legacyConsentVal === "denied" && !safeGet(ls, newConsentKey)) {
    safeSet(ls, newConsentKey, "denied");
  }

  const newVidKey = `${cfg.storagePrefix}_vid`;
  const legacyVid = safeGet(ls, `${cfg.legacyPrefix}_vid`);
  if (legacyVid && !safeGet(ls, newVidKey)) {
    safeSet(ls, newVidKey, legacyVid);
  }
}

/** Reset migration flag — for testing only. */
export function _resetMigration(): void {
  _migrated = false;
}

/** Stable per-visitor id, minted once and persisted. */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  runLegacyMigration();
  const ls = window.localStorage;
  let id = safeGet(ls, visitorKey());
  if (!id) {
    id = randomId("v");
    safeSet(ls, visitorKey(), id);
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
  const lastTs = Number(safeGet(ss, sessionTsKey()) || 0);
  let id = safeGet(ss, sessionKey());

  if (!id || !lastTs || now - lastTs > LIMITS.SESSION_IDLE_MS) {
    id = randomId("s");
    safeSet(ss, sessionKey(), id);
  }
  safeSet(ss, sessionTsKey(), String(now));
  return id;
}

/** True if a brand-new session id would be minted on the next getSessionId(). */
export function isNewSession(): boolean {
  if (typeof window === "undefined") return false;
  const ss = window.sessionStorage;
  const lastTs = Number(safeGet(ss, sessionTsKey()) || 0);
  return !safeGet(ss, sessionKey()) || !lastTs || Date.now() - lastTs > LIMITS.SESSION_IDLE_MS;
}
