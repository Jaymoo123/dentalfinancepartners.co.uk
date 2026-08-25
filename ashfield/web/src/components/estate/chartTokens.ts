/** Shared chart tokens: CSS variables with hardcoded fallbacks (§0 of spec). */
export const INK = "var(--color-ink, #14161a)";
export const INK_70 = "var(--color-ink-70, #14161ab3)";
export const INK_45 = "var(--color-ink-45, #14161a73)";
export const NAVY = "var(--color-navy, #1e2a5e)";
export const NAVY_08 = "var(--color-navy-08, #1e2a5e14)";
export const NAVY_RAW = "#1e2a5e"; // for SVG gradient stops (stop-color can't fall back)
export const PAPER = "var(--color-paper, #faf8f5)";
export const HAIRLINE = "var(--color-hairline, #14161a1f)";
export const HAIRLINE_STRONG = "var(--color-hairline-strong, #14161a33)";

export function niceMax(v: number): number {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return step * mag;
}
