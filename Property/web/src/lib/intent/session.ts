/**
 * Client-side intent + visit state for personalization. Deterministic, no
 * server round-trip, SSR-safe (every accessor guards `window`). Storage:
 *  - ptp_entry_topic (sessionStorage): topic of THIS session's landing page
 *    (the search-intent proxy; first page wins).
 *  - ptp_last_topic  (localStorage):   most-recent non-null topic across visits.
 *  - ptp_visits      (localStorage):   session count (returning detection).
 */
const ENTRY_KEY = "ptp_entry_topic";
const LAST_KEY = "ptp_last_topic";
const VISITS_KEY = "ptp_visits";

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
    if (s.getItem(ENTRY_KEY) === null) s.setItem(ENTRY_KEY, topic ?? "");
  } catch {
    /* storage full / blocked: degrade silently */
  }
}

/** Remember the most-recent non-null topic across sessions (returning tailoring). */
export function recordTopicVisit(topic: string | null): void {
  const s = ls();
  if (!s || !topic) return;
  try {
    s.setItem(LAST_KEY, topic);
  } catch {
    /* ignore */
  }
}

export function getEntryTopic(): string | null {
  const s = ss();
  if (!s) return null;
  try {
    return s.getItem(ENTRY_KEY) || null;
  } catch {
    return null;
  }
}

export function getLastTopic(): string | null {
  const s = ls();
  if (!s) return null;
  try {
    return s.getItem(LAST_KEY) || null;
  } catch {
    return null;
  }
}

/** Increment the session counter once per new session (call with isNewSession). */
export function bumpVisits(isNewSession: boolean): void {
  const s = ls();
  if (!s || !isNewSession) return;
  try {
    const n = parseInt(s.getItem(VISITS_KEY) || "0", 10) || 0;
    s.setItem(VISITS_KEY, String(n + 1));
  } catch {
    /* ignore */
  }
}

export function getVisitCount(): number {
  const s = ls();
  if (!s) return 0;
  try {
    return parseInt(s.getItem(VISITS_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export function isReturning(): boolean {
  return getVisitCount() > 1;
}
