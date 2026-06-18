/**
 * Decides who is CC'd on a lead-notification email, per originating site.
 *
 * The internal inbox (LEADS_NOTIFY_TO) always receives the lead. The partner
 * firm (Reflex Accounting, LEADS_NOTIFY_CC) is copied on leads from every site
 * EXCEPT those listed in LEADS_NOTIFY_CC_EXCLUDE_SOURCES — which defaults to
 * "property", so Property's own leads stay internal-only (no partner CC) while
 * dentists / medical / solicitors / generalist / agency / contractors-ir35
 * leads still copy the partner.
 *
 * Kept as a pure function (env injected) so the routing rule is unit-testable
 * without standing up the route or mocking Resend. The `source` value is the
 * `leads.source` column, the lowercase site key written by every lead form.
 */
export const DEFAULT_PARTNER_CC = "ahmadtirmizey@reflexaccounting.co.uk";
export const DEFAULT_CC_EXCLUDED_SOURCES = "property";

function parseList(value: string | undefined, fallback: string): string[] {
  return (value ?? fallback)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Reads env loosely so it accepts both process.env and plain test objects. */
type Env = Record<string, string | undefined>;

/** Sites whose leads are NOT copied to the partner firm (lowercased). */
export function ccExcludedSources(env: Env = process.env): string[] {
  return parseList(env.LEADS_NOTIFY_CC_EXCLUDE_SOURCES, DEFAULT_CC_EXCLUDED_SOURCES).map((s) =>
    s.toLowerCase(),
  );
}

/**
 * The CC recipients for a lead with the given `source`. Empty array means the
 * email goes to the internal inbox only (the route then omits the CC header).
 */
export function resolveLeadCc(source: string | undefined, env: Env = process.env): string[] {
  const sourceKey = (source ?? "").trim().toLowerCase();
  if (ccExcludedSources(env).includes(sourceKey)) return [];
  return parseList(env.LEADS_NOTIFY_CC, DEFAULT_PARTNER_CC);
}
