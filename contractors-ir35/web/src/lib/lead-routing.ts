/**
 * Lead-notification routing for Contractor Tax Accountants.
 * Ported from generalist/web/src/lib/lead-routing.ts. See that file for full docs.
 * NEVER import into a client component.
 */
export const DEFAULT_PARTNER_CC = "";
export const DEFAULT_CC_EXCLUDED_SOURCES = "property,test";
export const DEFAULT_NOTIFY_TO = "junaydmoughal@hotmail.co.uk";
export const PROPERTY_NOTIFY_TO = "junayd@ashfieldtrading.com";

type Env = Record<string, string | undefined>;

function parseList(value: string | undefined, fallback: string): string[] {
  return (value ?? fallback)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

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
