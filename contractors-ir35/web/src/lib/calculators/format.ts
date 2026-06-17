/** Shared formatters for the calculator fleet. */

export function gbp(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/** Pounds with two decimals, for figures where the pennies matter. */
export function gbp2(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function pct(n: number, dp = 1): string {
  return `${n.toFixed(dp)}%`;
}
