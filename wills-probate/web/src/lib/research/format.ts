// Shared number/label formatting for the /research section.
// ponytail: small enough to keep as plain functions, no class/registry needed.

export function fmtNumber(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return n.toLocaleString("en-GB");
}

export function fmtWeeks(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `${n.toFixed(1)} weeks`;
}

export function fmtSignedWeeks(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  const s = n > 0 ? "+" : "";
  return `${s}${n.toFixed(1)}`;
}

export function fmtPct(n: number | null | undefined, sign = true): string {
  if (n === null || n === undefined) return "n/a";
  const s = sign && n > 0 ? "+" : "";
  return `${s}${n.toFixed(1)}%`;
}

export function fmtGbp(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${n.toLocaleString("en-GB")}`;
}

export function fmtGbpM(n: number | null | undefined): string {
  if (n === null || n === undefined) return "n/a";
  return `£${n.toLocaleString("en-GB")}m`;
}

/** "2026-Q1" -> "Q1 2026" */
export function quarterLabel(q: string): string {
  const [y, qq] = q.split("-");
  return `${qq} ${y}`;
}
