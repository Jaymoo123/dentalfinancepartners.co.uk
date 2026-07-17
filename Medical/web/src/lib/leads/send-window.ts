/**
 * Pure Europe/London send-window scheduler.
 *
 * No dependencies. DST is handled entirely via Intl.DateTimeFormat with
 * timeZone "Europe/London" -- offsets are never hardcoded.
 *
 * Verbatim port from Property (site-agnostic pure functions).
 */

interface LondonParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: string;
}

function londonParts(ms: number): LondonParts {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });

  const p = fmt.formatToParts(new Date(ms));
  const get = (type: string): string =>
    p.find((part) => part.type === type)?.value ?? "0";

  return {
    year: parseInt(get("year"), 10),
    month: parseInt(get("month"), 10),
    day: parseInt(get("day"), 10),
    hour: parseInt(get("hour"), 10),
    minute: parseInt(get("minute"), 10),
    weekday: get("weekday"),
  };
}

function londonEpochMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number {
  let ms = Date.UTC(year, month - 1, day, hour, minute, 0, 0);

  for (let i = 0; i < 4; i++) {
    const actual = londonParts(ms);
    const diffMinutes =
      (hour * 60 + minute) - (actual.hour * 60 + actual.minute);
    if (diffMinutes === 0) break;
    ms += diffMinutes * 60_000;
  }

  return ms;
}

const EMAIL_OPEN = 8 * 60;
const SMS_OPEN = 9 * 60;
const WEEKDAY_CLOSE = 20 * 60 + 31;
const SAT_OPEN = 10 * 60;
const SAT_CLOSE = 18 * 60;

export interface SendWindowOpts {
  bestSendHour?: number | null;
  hasSms: boolean;
  preferMonday?: boolean;
}

export function inSendWindow(atMs: number, hasSms: boolean): boolean {
  const { hour, minute, weekday } = londonParts(atMs);
  const mod = hour * 60 + minute;

  if (weekday === "Sun") return false;

  if (weekday === "Sat") {
    return mod >= SAT_OPEN && mod < SAT_CLOSE;
  }

  const open = hasSms ? SMS_OPEN : EMAIL_OPEN;
  return mod >= open && mod < WEEKDAY_CLOSE;
}

export function bestHourFromTimestamps(isoTimestamps: string[]): number | null {
  if (isoTimestamps.length < 3) return null;

  const counts = new Map<number, number>();
  for (const iso of isoTimestamps) {
    const ms = Date.parse(iso);
    if (isNaN(ms)) continue;
    const { hour } = londonParts(ms);
    counts.set(hour, (counts.get(hour) ?? 0) + 1);
  }

  if (counts.size === 0) return null;

  let bestHour = 0;
  let bestCount = 0;
  for (const [hour, count] of counts) {
    if (count > bestCount) {
      bestCount = count;
      bestHour = hour;
    }
  }

  return bestHour;
}

function clampWeekdayHour(hour: number, hasSms: boolean): number {
  const min = hasSms ? 9 : 8;
  return Math.min(Math.max(hour, min), 20);
}

function snapToValidDay(
  candidateMs: number,
  hasSms: boolean,
  preferMonday: boolean,
  desiredHour: number,
): number {
  const { year, month, day, weekday } = londonParts(candidateMs);

  if (weekday === "Sun") {
    return londonEpochMs(
      year, month, day + 1,
      clampWeekdayHour(desiredHour, hasSms), 0,
    );
  }

  if (weekday === "Sat") {
    if (preferMonday) {
      return londonEpochMs(
        year, month, day + 2,
        clampWeekdayHour(desiredHour, hasSms), 0,
      );
    }
    const satHour = Math.min(Math.max(desiredHour, 10), 17);
    return londonEpochMs(year, month, day, satHour, 0);
  }

  return candidateMs;
}

function buildCandidateMs(
  dueMs: number,
  desiredHour: number,
  hasSms: boolean,
  preferMonday: boolean,
): number {
  const { year, month, day } = londonParts(dueMs);
  const candidate = londonEpochMs(year, month, day, desiredHour, 0);
  return snapToValidDay(candidate, hasSms, preferMonday, desiredHour);
}

function nextWindowOpenMs(
  fromMs: number,
  hasSms: boolean,
  preferMonday: boolean,
): number {
  const { year, month, day, hour, minute, weekday } = londonParts(fromMs);
  const mod = hour * 60 + minute;
  const open = hasSms ? 9 : 8;

  if (weekday === "Sun") {
    return londonEpochMs(year, month, day + 1, open, 0);
  }

  if (weekday === "Sat") {
    if (preferMonday) {
      return londonEpochMs(year, month, day + 2, open, 0);
    }
    if (mod < SAT_OPEN) {
      return londonEpochMs(year, month, day, 10, 0);
    }
    return londonEpochMs(year, month, day + 2, open, 0);
  }

  const windowOpen = hasSms ? SMS_OPEN : EMAIL_OPEN;
  if (mod < windowOpen) {
    return londonEpochMs(year, month, day, open, 0);
  }

  const tomorrowProbe = londonEpochMs(year, month, day + 1, 12, 0);
  const tp = londonParts(tomorrowProbe);

  if (tp.weekday === "Sat") {
    if (preferMonday) {
      return londonEpochMs(year, month, day + 3, open, 0);
    }
    return londonEpochMs(year, month, day + 1, 10, 0);
  }

  return londonEpochMs(year, month, day + 1, open, 0);
}

export function computeNextSendMs(
  fromMs: number,
  delayHours: number,
  opts: SendWindowOpts,
): number {
  const { hasSms, preferMonday = false } = opts;
  const rawBest = opts.bestSendHour ?? 10;

  if (delayHours === 0) {
    if (inSendWindow(fromMs, hasSms)) return fromMs;
    return nextWindowOpenMs(fromMs, hasSms, preferMonday);
  }

  const dueMs = fromMs + delayHours * 3_600_000;
  const clampedHour = clampWeekdayHour(rawBest, hasSms);

  let candidateMs = buildCandidateMs(dueMs, clampedHour, hasSms, preferMonday);

  const minGapMs = Math.max(2 * 3_600_000, (delayHours / 2) * 3_600_000);
  if (candidateMs < fromMs + minGapMs) {
    const { year, month, day } = londonParts(candidateMs);
    const nextDayProbe = londonEpochMs(year, month, day + 1, 12, 0);
    candidateMs = buildCandidateMs(nextDayProbe, clampedHour, hasSms, preferMonday);
  }

  return candidateMs;
}
