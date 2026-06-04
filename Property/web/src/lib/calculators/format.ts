/** Shared formatting helpers for calculator results. */

export const gbp = (n: number) =>
  "£" + Math.round(n).toLocaleString("en-GB", { maximumFractionDigits: 0 });

export const pct = (n: number, dp = 1) => `${n.toFixed(dp)}%`;
