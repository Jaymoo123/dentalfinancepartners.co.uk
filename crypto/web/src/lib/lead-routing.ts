/**
 * Decides who receives and who is CC'd on a lead-notification email for the
 * Crypto site. Keyed on leads.source ('crypto').
 *
 * Kept as pure functions (env injected) so the routing rules are unit-testable.
 * Mirrors Property/web/src/lib/lead-routing.ts structure verbatim.
 */
export const DEFAULT_PARTNER_CC = "";
export const DEFAULT_CC_EXCLUDED_SOURCES = "property,test";

// All operator notifications route to the Ashfield Trading inbox, same as
// Property (the legacy hotmail default was retired estate-wide 2026-08-19).
export const DEFAULT_NOTIFY_TO = "junayd@ashfieldtrading.com";
export const PROPERTY_NOTIFY_TO = "junayd@ashfieldtrading.com";

function parseList(value: string | undefined, fallback: string): string[] {
  return (value ?? fallback)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

type Env = Record<string, string | undefined>;

export function ccExcludedSources(env: Env = process.env): string[] {
  return parseList(env.LEADS_NOTIFY_CC_EXCLUDE_SOURCES, DEFAULT_CC_EXCLUDED_SOURCES).map((s) =>
    s.toLowerCase(),
  );
}

export function resolveLeadCc(source: string | undefined, env: Env = process.env): string[] {
  const sourceKey = (source ?? "").trim().toLowerCase();
  if (ccExcludedSources(env).includes(sourceKey)) return [];
  return parseList(env.LEADS_NOTIFY_CC, DEFAULT_PARTNER_CC);
}

export function resolveLeadTo(source: string | undefined, env: Env = process.env): string {
  const sourceKey = (source ?? "").trim().toLowerCase();
  if (sourceKey === "test") {
    return env.LEADS_NOTIFY_TO_TEST || env.LEADS_NOTIFY_TO || DEFAULT_NOTIFY_TO;
  }
  if (sourceKey === "property") {
    return env.LEADS_NOTIFY_TO_PROPERTY || PROPERTY_NOTIFY_TO;
  }
  return env.LEADS_NOTIFY_TO || DEFAULT_NOTIFY_TO;
}
