/**
 * Shared formatters for the Holloway Davies research pages (UK Small Business
 * Barometer + supplementary assets). Kept small and dependency-free.
 */

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-03" -> "Mar 2026". */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const mi = Number(m) - 1;
  if (!y || mi < 0 || mi > 11) return ym;
  return `${MONTHS_SHORT[mi]} ${y}`;
}

/** Thousands-separated en-GB integer. Returns "n/a" for null/undefined. */
export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return Math.round(n).toLocaleString("en-GB");
}

/** "+4.0%" style percent string. */
export function fmtPercent(n: number | null | undefined, showSign = true): string {
  if (n === null || n === undefined) return "n/a";
  const sign = showSign && n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

/** Plain "94.6%" style percent string (no sign). */
export function fmtPct1(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)}%`;
}
