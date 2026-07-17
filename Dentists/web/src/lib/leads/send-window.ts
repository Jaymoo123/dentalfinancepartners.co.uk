/**
 * Pure Europe/London send-window scheduler.
 *
 * No dependencies. DST is handled entirely via Intl.DateTimeFormat with
 * timeZone "Europe/London" -- offsets are never hardcoded.
 */

// ---------------------------------------------------------------------------
// Internal London wall-clock helpers
// ---------------------------------------------------------------------------

interface LondonParts {
  year: number;
  month: number;   // 1-12
  day: number;     // 1-31
  hour: number;    // 0-23
  minute: number;  // 0-59
  weekday: string; // "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
}

/**
 * Return Europe/London wall-clock parts for a given epoch ms.
 *
 * hourCycle "h23" ensures midnight renders as "00" (not "24" which some
 * h24 implementations emit). weekday "short" returns "Mon"..."Sun" in en-GB.
 */
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

/**
 * Find the epoch ms that corresponds to the given Europe/London wall-clock
 * time (month is 1-12, day is 1-31).
 *
 * Strategy: start with a rough UTC guess (treating London as UTC=no offset),
 * read back the actual London parts, compute the minute difference, and adjust.
 * Repeat up to 4 times. Converges in 1-2 iterations even across DST
 * boundaries because we only schedule during business hours (never near the
 * 1-2am DST window).
 *
 * Month/day arithmetic overflow is normalised automatically by Date.UTC
 * (e.g. month=4, day=32 becomes May 2).
 */
function londonEpochMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number {
  // Starting approximation: treat the desired wall-clock as UTC
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

// ---------------------------------------------------------------------------
// Window minute-of-day constants
// ---------------------------------------------------------------------------

const EMAIL_OPEN = 8 * 60;           // 08:00
const SMS_OPEN = 9 * 60;             // 09:00
const WEEKDAY_CLOSE = 20 * 60 + 31;  // exclusive -- 20:30 is the last valid minute
const SAT_OPEN = 10 * 60;            // 10:00
const SAT_CLOSE = 18 * 60;           // exclusive -- 18:00 is outside

// ---------------------------------------------------------------------------
// Public types and API
// ---------------------------------------------------------------------------

export interface SendWindowOpts {
  /** Preferred local hour 0-23, derived from on-site activity. */
  bestSendHour?: number | null;
  /** Step includes SMS/WhatsApp (stricter 09:00 open, no Sunday). */
  hasSms: boolean;
  /** Fresh-start touch: if landing day is Saturday roll to Monday instead. */
  preferMonday?: boolean;
}

/**
 * True when the given moment is inside the send window for the channel class.
 *
 * Windows (Europe/London wall-clock):
 *   Sunday          -- never
 *   Saturday        -- 10:00 to 17:59 (18:00 is exclusive)
 *   Mon-Fri email   -- 08:00 to 20:30 inclusive
 *   Mon-Fri SMS     -- 09:00 to 20:30 inclusive
 */
export function inSendWindow(atMs: number, hasSms: boolean): boolean {
  const { hour, minute, weekday } = londonParts(atMs);
  const mod = hour * 60 + minute;

  if (weekday === "Sun") return false;

  if (weekday === "Sat") {
    return mod >= SAT_OPEN && mod < SAT_CLOSE;
  }

  // Mon-Fri
  const open = hasSms ? SMS_OPEN : EMAIL_OPEN;
  return mod >= open && mod < WEEKDAY_CLOSE;
}

/**
 * Mode of the visitor's active hours (Europe/London) from ISO timestamps.
 * Returns null if fewer than 3 samples are provided.
 * On a tie the lower-indexed hour in the first scan wins.
 */
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

// ---------------------------------------------------------------------------
// Internal scheduling helpers
// ---------------------------------------------------------------------------

/** Clamp a desired hour into the standard weekday send window. */
function clampWeekdayHour(hour: number, hasSms: boolean): number {
  const min = hasSms ? 9 : 8;
  return Math.min(Math.max(hour, min), 20);
}

/**
 * Snap a candidate epoch ms (already set to the desired hour on a given
 * London calendar day) to a valid send day.
 *
 * Sunday                    -> Monday at clampedWeekdayHour.
 * Saturday + preferMonday   -> Monday (+2 days) at clampedWeekdayHour.
 * Saturday, no preferMonday -> same day, hour clamped to [10, 17].
 * Weekday                   -> unchanged.
 */
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
    // Stay on Saturday, clamp into [10:00, 17:00]
    const satHour = Math.min(Math.max(desiredHour, 10), 17);
    return londonEpochMs(year, month, day, satHour, 0);
  }

  return candidateMs;
}

/**
 * Build a candidate epoch ms: take the London calendar date of dueMs,
 * place the send at desiredHour:00, then apply day-of-week rules.
 */
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

/**
 * Roll fromMs forward to the next send-window open time.
 * Used only for the delayHours=0 out-of-window case.
 */
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
    // Past Saturday close -> Monday
    return londonEpochMs(year, month, day + 2, open, 0);
  }

  // Weekday
  const windowOpen = hasSms ? SMS_OPEN : EMAIL_OPEN;
  if (mod < windowOpen) {
    return londonEpochMs(year, month, day, open, 0);
  }

  // Past today's close: check tomorrow with a noon probe to get the right date
  const tomorrowProbe = londonEpochMs(year, month, day + 1, 12, 0);
  const tp = londonParts(tomorrowProbe);

  if (tp.weekday === "Sat") {
    if (preferMonday) {
      // Friday -> Saturday -> skip to Monday (+3 days from today)
      return londonEpochMs(year, month, day + 3, open, 0);
    }
    return londonEpochMs(year, month, day + 1, 10, 0);
  }

  // Tomorrow is a weekday (Sunday after a weekday cannot happen in the Gregorian calendar)
  return londonEpochMs(year, month, day + 1, open, 0);
}

/**
 * Given the epoch ms the previous step completed and the step's delayHours,
 * return the epoch ms the next step should fire, snapped into the send window.
 *
 * Algorithm:
 *
 * 1. delayHours == 0: if fromMs is already in the send window, return it
 *    unchanged; otherwise roll forward to the next window open.
 *
 * 2. delayHours > 0: due = fromMs + delayHours*3600000. Clamp
 *    (bestSendHour ?? 10) into the base weekday window. Build a candidate at
 *    that hour on the London calendar day of due.
 *
 * 3. Apply day-of-week rules: Sunday -> Monday; Saturday + preferMonday ->
 *    Monday; Saturday without preferMonday -> Saturday clamped to [10:00, 17:00].
 *
 * 4. Minimum-gap guard: if candidate < fromMs + max(2h, delayHours/2 h), push
 *    one London calendar day forward and re-apply day rules.
 *
 * 5. Returns exact epoch ms at the top of the minute (:00 seconds, no jitter).
 */
export function computeNextSendMs(
  fromMs: number,
  delayHours: number,
  opts: SendWindowOpts,
): number {
  const { hasSms, preferMonday = false } = opts;
  const rawBest = opts.bestSendHour ?? 10;

  // --- delayHours == 0 ---
  if (delayHours === 0) {
    if (inSendWindow(fromMs, hasSms)) return fromMs;
    return nextWindowOpenMs(fromMs, hasSms, preferMonday);
  }

  // --- Delayed send ---
  const dueMs = fromMs + delayHours * 3_600_000;
  const clampedHour = clampWeekdayHour(rawBest, hasSms);

  let candidateMs = buildCandidateMs(dueMs, clampedHour, hasSms, preferMonday);

  // Minimum-gap guard
  const minGapMs = Math.max(2 * 3_600_000, (delayHours / 2) * 3_600_000);
  if (candidateMs < fromMs + minGapMs) {
    const { year, month, day } = londonParts(candidateMs);
    // Use noon as a neutral probe to get the correct London date for +1 day
    const nextDayProbe = londonEpochMs(year, month, day + 1, 12, 0);
    candidateMs = buildCandidateMs(nextDayProbe, clampedHour, hasSms, preferMonday);
  }

  return candidateMs;
}
