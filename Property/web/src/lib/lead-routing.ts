/**
 * Decides, per originating site, who RECEIVES and who is CC'd on a
 * lead-notification email. One shared trigger sends every site's leads to this
 * single Property-hosted route, so both decisions are keyed on the `leads.source`
 * column (the lowercase site key written by every lead form).
 *
 * Recipient (to): Property's own leads go to the Ashfield Trading inbox
 * (LEADS_NOTIFY_TO_PROPERTY); every other site goes to the shared internal inbox
 * (LEADS_NOTIFY_TO). See resolveLeadTo.
 *
 * CC: the partner firm (Reflex Accounting, LEADS_NOTIFY_CC) is copied on leads
 * from every site EXCEPT those in LEADS_NOTIFY_CC_EXCLUDE_SOURCES (defaults to
 * "property,test"), so Property's own leads (and synthetic test leads) stay
 * internal-only while dentists, medical, solicitors, generalist, agency and
 * contractors-ir35 still copy the partner. See resolveLeadCc.
 *
 * source='test' is the reserved synthetic-lead value used by the post-deploy
 * smoke check: it is never copied to any vendor (CC-excluded) and is routed only
 * to the operator (resolveLeadTo). The probe deletes the row after asserting.
 *
 * Kept as pure functions (env injected) so the routing rules are unit-testable
 * without standing up the route or mocking Resend.
 */
export const DEFAULT_PARTNER_CC = "ahmadtirmizey@reflexaccounting.co.uk";
export const DEFAULT_CC_EXCLUDED_SOURCES = "property,test";

// Lead-notification recipient (the "to"). Property's own leads go to the
// dedicated Ashfield Trading inbox (the DJH-deal inbox); every other site's leads
// keep going to the shared internal inbox, exactly as before. Both env-overridable.
export const DEFAULT_NOTIFY_TO = "junaydmoughal@hotmail.co.uk";
export const PROPERTY_NOTIFY_TO = "junayd@ashfieldtrading.com";

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

/**
 * The lead-notification recipient ("to") for a lead with the given `source`.
 * Property leads go to the Ashfield Trading inbox (LEADS_NOTIFY_TO_PROPERTY,
 * default junayd@ashfieldtrading.com); every other site goes to the shared
 * internal inbox (LEADS_NOTIFY_TO, default junaydmoughal@hotmail.co.uk). Property
 * therefore routes correctly from code even if LEADS_NOTIFY_TO is left unchanged.
 */
export function resolveLeadTo(source: string | undefined, env: Env = process.env): string {
  const sourceKey = (source ?? "").trim().toLowerCase();
  if (sourceKey === "test") {
    // Synthetic/test leads (post-deploy smoke checks) go ONLY to the operator,
    // never a vendor. Overridable via LEADS_NOTIFY_TO_TEST.
    return env.LEADS_NOTIFY_TO_TEST || env.LEADS_NOTIFY_TO || DEFAULT_NOTIFY_TO;
  }
  if (sourceKey === "property") {
    return env.LEADS_NOTIFY_TO_PROPERTY || PROPERTY_NOTIFY_TO;
  }
  return env.LEADS_NOTIFY_TO || DEFAULT_NOTIFY_TO;
}
