/**
 * Native callback booking: domain logic for the "pick a time for your call"
 * flow. No availability logic: the team calls the lead; the window tells them
 * when the lead said they would pick up.
 *
 * Pure and shared by the /book page, the thank-you inline picker, and the
 * POST /api/leads/book validator.
 */

export interface CallWindow {
  key: string;
  label: string;
  hours: string;
}

export const CALL_WINDOWS: CallWindow[] = [
  { key: "morning", label: "Morning", hours: "9am to 12pm" },
  { key: "afternoon", label: "Afternoon", hours: "12pm to 3pm" },
  { key: "late_afternoon", label: "Late afternoon", hours: "3pm to 5:30pm" },
];

export function windowByKey(key: string): CallWindow | null {
  return CALL_WINDOWS.find((w) => w.key === key) ?? null;
}

/** Max days ahead a slot may be (inclusive). */
export const MAX_DAYS_AHEAD = 21;

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseIsoDate(iso: string): Date | null {
  if (!ISO_DATE_RE.test(iso)) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  if (d.toISOString().slice(0, 10) !== iso) return null;
  return d;
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isWeekday(d: Date): boolean {
  const day = d.getUTCDay();
  return day >= 1 && day <= 5;
}

export function isValidBookingDate(iso: string, now: Date = new Date()): boolean {
  const d = parseIsoDate(iso);
  if (!d || !isWeekday(d)) return false;
  const todayIso = toIsoDate(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())));
  if (iso < todayIso) return false;
  const limit = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + MAX_DAYS_AHEAD));
  return d.getTime() <= limit.getTime();
}

export interface BookableDay {
  iso: string;
  weekday: string;
  day: number;
  month: string;
}

export function upcomingWeekdays(count = 10, from: Date = new Date()): BookableDay[] {
  const days: BookableDay[] = [];
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const weekdayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "UTC" });
  const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
  while (days.length < count) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (!isWeekday(cursor)) continue;
    days.push({
      iso: toIsoDate(cursor),
      weekday: weekdayFmt.format(cursor),
      day: cursor.getUTCDate(),
      month: monthFmt.format(cursor),
    });
  }
  return days;
}

export function bookingLabel(iso: string, windowKey: string): string | null {
  const d = parseIsoDate(iso);
  const w = windowByKey(windowKey);
  if (!d || !w) return null;
  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return `${dateFmt.format(d)}, ${w.label.toLowerCase()} (${w.hours})`;
}
