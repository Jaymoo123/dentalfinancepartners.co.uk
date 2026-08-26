/**
 * Presentation helpers for worked-example result rows on Medical's calculator pages.
 *
 * Worked-example results are keyed by raw camelCase config identifiers. Rendered as-is
 * they reach the reader as "monthlyDrawings: 5159", which looks unfinished. Nothing in
 * the shared tool config carries a per-key human label for these rows, so the label is
 * derived here.
 *
 * Deliberately Medical-local. The shared tool type and the shared renderers are read by
 * other sites in the estate and must not change for this.
 */

const ACRONYMS = new Set(["nhs", "ni", "paye", "vat", "cgt", "iht", "hmrc", "ir35", "uk"]);

/** "monthlyDrawings" -> "Monthly drawings"; "class4NI" -> "Class 4 NI". */
export function humaniseKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((word, i) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : i === 0
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word.toLowerCase(),
    )
    .join(" ");
}

// ponytail: worked-example results carry no per-key type info, so money is inferred from
// the key name. The denylist covers every non-money suffix currently in use; extend it if
// a config adds a numeric key that is a rate, count or duration rather than an amount.
const NON_MONEY_KEY = /(pct|percent|rate|age|years|months|days|count|plan)$/i;

/** Money keys render as GBP; everything else renders verbatim. */
export function formatValue(key: string, value: unknown): string {
  if (typeof value !== "number" || NON_MONEY_KEY.test(key)) return String(value);
  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}
