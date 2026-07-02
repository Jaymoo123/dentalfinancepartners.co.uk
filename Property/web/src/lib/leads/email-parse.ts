/**
 * Pure helpers for parsing inbound reply emails. Extracted from the
 * /api/leads/inbound/email route so they stay unit-testable: an App Router
 * route module may only export the HTTP handlers and route config, not helpers.
 */

const EMAIL_ANGLE_RE = /<([^>\s]+@[^>\s]+)>/;
const EMAIL_BARE_RE = /([^\s@,;]+@[^\s@,;]+\.[^\s@,;]+)/;

/**
 * Extract a bare lower-cased email address from a From header value.
 * Handles both "Name <email>" and plain "email" forms.
 */
export function extractEmail(from: string): string | null {
  const m = from.match(EMAIL_ANGLE_RE) ?? from.match(EMAIL_BARE_RE);
  if (!m) return null;
  return m[1].toLowerCase().trim();
}

/**
 * Strip quoted reply history from a plain-text email body.
 * Cuts at the first line beginning with ">" (quoted block) or matching a
 * "On ... wrote:" attribution line. Trims whitespace and caps length.
 */
export function stripQuotedHistory(text: string, maxLen = 1000): string {
  const lines = text.split("\n");
  const cutIdx = lines.findIndex((l) => {
    const t = l.trimStart();
    return t.startsWith(">") || /^On .+ wrote:/i.test(t);
  });
  const relevant = cutIdx === -1 ? lines : lines.slice(0, cutIdx);
  return relevant.join("\n").trim().slice(0, maxLen);
}
