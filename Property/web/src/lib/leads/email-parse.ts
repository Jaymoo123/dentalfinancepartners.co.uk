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
 *
 * Cuts at the first marker of quoted content. Gmail/Apple prefix quoted lines
 * with ">" and add an "On ... wrote:" attribution; Outlook/Hotmail instead
 * insert a separator (a run of underscores or "-----Original Message-----")
 * followed by a bare "From:/Sent:/To:/Subject:" header block with NO ">"
 * prefixes. The 2026-07-03 incident: a Hotmail reply kept the entire quoted
 * original (including our own "reply STOP" footer) because only the Gmail
 * markers were handled, and the opt-out matcher then read our footer as the
 * lead's words. Every marker below is therefore load-bearing.
 */
export function stripQuotedHistory(text: string, maxLen = 1000): string {
  const lines = text.split("\n");
  const cutIdx = lines.findIndex((l, i) => {
    const t = l.trimStart();
    if (t.startsWith(">")) return true;
    // Gmail attribution; also catch it when the client hard-wraps it so only
    // the trailing "wrote:" survives on its own line.
    if (/^On .+ wrote:/i.test(t) || /wrote:\s*$/i.test(t)) return true;
    // Outlook / Apple Mail separators.
    if (/^-{2,}\s*Original Message\s*-{2,}/i.test(t)) return true;
    if (/^_{6,}\s*$/.test(t)) return true;
    // Outlook header block: a "From:" line followed shortly by Sent:/Date:/To:/
    // Subject:. Not applied to the first line so a message that opens with a
    // "From:"-like sentence is never emptied.
    if (i > 0 && /^From:\s/i.test(t)) {
      const next = lines.slice(i + 1, i + 4).map((x) => x.trimStart());
      if (next.some((x) => /^(Sent|Date|To|Subject):\s/i.test(x))) return true;
    }
    return false;
  });
  // A hard-wrapped attribution puts "wrote:" on its own line and the "On ..."
  // opener on the line above; drop that dangling opener too.
  let end = cutIdx === -1 ? lines.length : cutIdx;
  while (
    end > 0 &&
    /^On\s.+/i.test(lines[end - 1].trimStart()) &&
    !/wrote:\s*$/i.test(lines[end - 1])
  ) {
    end--;
  }
  return lines.slice(0, end).join("\n").trim().slice(0, maxLen);
}

/**
 * Crude HTML-to-text for received emails whose plain-text part is absent.
 * Good enough for opt-out keyword matching, phone extraction and the operator
 * forward; not a general-purpose renderer.
 */
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
