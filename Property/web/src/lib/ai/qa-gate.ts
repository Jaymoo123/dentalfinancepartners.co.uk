/**
 * QA gate: deterministic content safety and quality checks that every
 * AI-generated message must pass before it can reach a human.
 *
 * Pure function; no side-effects; zero imports.
 * British English project: no em-dashes or en-dashes in this file or in any
 * string it produces.
 */

export type QaKind = "email" | "sms" | "brief" | "chat";

export interface QaInput {
  subject?: string;       // email only
  paragraphs?: string[];  // email body paragraphs
  body?: string;          // sms / chat / brief text
}

export interface QaOptions {
  siteUrl: string;             // e.g. "https://www.propertytaxpartners.co.uk"
  requireBookingCta?: boolean; // default true for email+sms, false for brief/chat
}

export type QaResult = { ok: true } | { ok: false; failures: string[] };

// ---------------------------------------------------------------------------
// Internal constants
// ---------------------------------------------------------------------------

const ALLOWED_PLACEHOLDERS = new Set([
  "firstName",
  "bookingUrl",
  "confirmUrl",
  "calculatorUrl",
  "calculatorName",
  "windowLabel",
]);

const ALLOWED_PATH_PREFIXES: string[] = [
  "/book",
  "/api/leads/confirm",
  "/api/leads/ics",
  "/tools",
  "/calculators",
  "/research",
];

// Banned pattern groups: each pair is [pattern (no g flag), failure category].
// All patterns are case-insensitive.
const BANNED_GROUPS: Array<[RegExp, string]> = [
  [
    /\byou should\b|\bwe recommend\b|\byou must\b|\byou need to\b|\bwe advise\b|\bour advice\b|\bmake sure you\b|\byou ought to\b/i,
    "advice",
  ],
  [
    // guarantee/guaranteed/guarantees; you will save; risk-free; no risk; certain to
    /\bguarantee(?:d|s)?\b|\byou will save\b|\brisk-free\b|\bno risk\b|\bcertain to\b/i,
    "guarantee",
  ],
  // Figures: money (£ + digit) or percentage (digit + %) or "N per cent"
  [/£\d|\d%|\d\s*per\s+cent\b/i, "figures"],
  [
    /\bhmrc says\b|\bhmrc confirmed\b|\bhmrc has confirmed\b|\baccording to hmrc\b/i,
    "hmrc_attribution",
  ],
  [
    /\bchartered\b|\bicaew\b|\bacca\b|\baca\b|\bcta\b|\bregulated by\b|\bqualified accountant\b|\bmlr[- ]supervised\b/i,
    "credentials",
  ],
  [
    /\bwe saw\b|\bwe noticed\b|\byou visited\b|\byou viewed\b|\byou read\b|\byou returned\b|\byour visits\b|\byou have been looking\b|\byou've been looking\b|\byou browsed\b/i,
    "glass_wall",
  ],
];

// US spelling patterns: [regex (no g flag, case-insensitive), stem used in failure code].
// The -ize words drop their final 'e' before '-ing' (organize -> organizing),
// so the stem is split at 'z' to handle all inflections correctly.
const US_SPELLING_PATTERNS: Array<[RegExp, string]> = [
  [/\borganiz(?:e(?:d|s)?|ing)\b/i, "organize"],
  [/\boptimiz(?:e(?:d|s)?|ing)\b/i, "optimize"],
  [/\banalyz(?:e(?:d|s)?|ing)\b/i, "analyze"],
  [/\bcolor(?:s)?\b/i, "color"],
  [/\bfavor(?:s|ite)?\b/i, "favor"],
  [/\bcenter(?:s|ed)?\b/i, "center"],
  [/\bbehavior(?:s)?\b/i, "behavior"],
];

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

/** Extract all http(s) URLs from text, stripping common trailing punctuation. */
function extractUrls(text: string): string[] {
  const re = /https?:\/\/\S+/g;
  const urls: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const url = m[0].replace(/[.,;:!?)"'>]+$/, "");
    if (url) urls.push(url);
  }
  return urls;
}

/** Return the path portion of a URL after removing the siteUrl origin. */
function urlPathAfterOrigin(url: string, siteUrl: string): string {
  const after = url.slice(siteUrl.length);
  return after.startsWith("/") ? after : `/${after}`;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function qaGateMessage(
  kind: QaKind,
  input: QaInput,
  opts: QaOptions,
): QaResult {
  const failures: string[] = [];

  // Resolve requireBookingCta: default true for email and sms, false otherwise.
  const requireBookingCta =
    opts.requireBookingCta !== undefined
      ? opts.requireBookingCta
      : kind === "email" || kind === "sms";

  // Build combined text from all relevant fields for this kind.
  const textParts: string[] = [];
  if (kind === "email") {
    if (input.subject != null) textParts.push(input.subject);
    if (input.paragraphs) textParts.push(...input.paragraphs);
  } else {
    if (input.body != null) textParts.push(input.body);
  }
  const allText = textParts.join(" ");

  // =========================================================================
  // Rule 2a: Empty check
  // =========================================================================
  if (kind === "email") {
    const subjectBlank = !input.subject || input.subject.trim() === "";
    const parasBlank =
      !input.paragraphs ||
      input.paragraphs.length === 0 ||
      input.paragraphs.every((p) => p.trim() === "");
    if (subjectBlank || parasBlank) failures.push("empty");
  } else {
    if (!input.body || input.body.trim() === "") failures.push("empty");
  }

  // =========================================================================
  // Rule 2b: Length caps
  // =========================================================================
  if (kind === "email") {
    if (input.subject && input.subject.length > 78) {
      failures.push("subject_too_long");
    }
    if (input.paragraphs) {
      if (input.paragraphs.length > 5) {
        failures.push("too_many_paragraphs");
      }
      // Report once if any paragraph exceeds the per-paragraph cap.
      let reportedParaTooLong = false;
      for (const para of input.paragraphs) {
        if (!reportedParaTooLong && para.length > 500) {
          failures.push("paragraph_too_long");
          reportedParaTooLong = true;
        }
      }
    }
  } else if (kind === "sms") {
    if (input.body && input.body.length > 320) failures.push("sms_too_long");
  } else if (kind === "chat") {
    if (input.body && input.body.length > 500) failures.push("body_too_long");
  } else if (kind === "brief") {
    if (input.body && input.body.length > 1200) failures.push("body_too_long");
  }

  // =========================================================================
  // Rule 1: Em-dash (U+2014) and en-dash (U+2013)
  // =========================================================================
  if (/—|–/.test(allText)) failures.push("em_dash");

  // =========================================================================
  // Rule 3: Banned patterns (report each category at most once)
  // =========================================================================
  for (const [re, category] of BANNED_GROUPS) {
    if (re.test(allText)) failures.push(`banned:${category}`);
  }

  // =========================================================================
  // Rule 4: US spellings (report each matched stem once)
  // =========================================================================
  for (const [re, stem] of US_SPELLING_PATTERNS) {
    // Use exec on the non-global regex so there is no lastIndex state to reset.
    const m = re.exec(allText);
    if (m) failures.push(`us_spelling:${m[0].toLowerCase()}`);
  }

  // =========================================================================
  // Rule 5: Placeholder allowlist
  // =========================================================================
  const seenUnknownPh = new Set<string>();
  const phRe = /\{\{([^}]+)\}\}/g;
  let phMatch: RegExpExecArray | null;
  while ((phMatch = phRe.exec(allText)) !== null) {
    const name = phMatch[1].trim();
    if (!ALLOWED_PLACEHOLDERS.has(name) && !seenUnknownPh.has(name)) {
      seenUnknownPh.add(name);
      failures.push(`unknown_placeholder:${name}`);
    }
  }

  // =========================================================================
  // Rule 6: Booking CTA
  // =========================================================================
  if (requireBookingCta) {
    const hasPlaceholder = allText.includes("{{bookingUrl}}");
    const hasBookUrl = extractUrls(allText).some(
      (url) =>
        url.startsWith(opts.siteUrl) &&
        urlPathAfterOrigin(url, opts.siteUrl).startsWith("/book"),
    );
    if (!hasPlaceholder && !hasBookUrl) failures.push("missing_booking_cta");
  }

  // =========================================================================
  // Rule 7: SMS opt-out (case-sensitive whole word "STOP")
  // =========================================================================
  if (kind === "sms" && !/\bSTOP\b/.test(allText)) {
    failures.push("sms_missing_optout");
  }

  // =========================================================================
  // Rule 8: URL allowlist
  // =========================================================================
  const seenFlaggedUrls = new Set<string>();
  for (const url of extractUrls(allText)) {
    if (seenFlaggedUrls.has(url)) continue;
    let allowed = false;
    if (url.startsWith(opts.siteUrl)) {
      const path = urlPathAfterOrigin(url, opts.siteUrl);
      allowed = ALLOWED_PATH_PREFIXES.some((prefix) =>
        path.startsWith(prefix),
      );
    }
    if (!allowed) {
      seenFlaggedUrls.add(url);
      failures.push(`url_not_allowlisted:${url}`);
    }
  }

  return failures.length === 0 ? { ok: true } : { ok: false, failures };
}
