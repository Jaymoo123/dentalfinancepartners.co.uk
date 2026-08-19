// Composes the three guided-enquiry answers into the single `message` string stored on
// the lead, so the server chokepoint and DB schema stay unchanged.

export const SITUATION_MIN_CHARS = 40;

export const ENQUIRY_ERRORS = {
  situation: "Tell us a bit more so we can prepare. A couple of sentences is ideal.",
  prompted: "Tell us what has prompted your enquiry.",
  callGoal: "Tell us what you would like from the call.",
} as const;

export type EnquiryParts = {
  situation: string;
  prompted: string;
  callGoal: string;
};

export function validateEnquiryParts(
  parts: EnquiryParts,
): Partial<Record<keyof EnquiryParts, string>> {
  const errs: Partial<Record<keyof EnquiryParts, string>> = {};
  if (parts.situation.trim().length < SITUATION_MIN_CHARS) {
    errs.situation = ENQUIRY_ERRORS.situation;
  }
  if (parts.prompted.trim().length < 3) {
    errs.prompted = ENQUIRY_ERRORS.prompted;
  }
  if (parts.callGoal.trim().length < 3) {
    errs.callGoal = ENQUIRY_ERRORS.callGoal;
  }
  return errs;
}

export function composeEnquiryMessage(parts: EnquiryParts): string {
  const situation = parts.situation.trim();
  const prompted = parts.prompted.trim();
  const callGoal = parts.callGoal.trim();
  return `Situation: ${situation}\n\nPrompted by: ${prompted}\n\nWants from call: ${callGoal}`;
}

// ---------------------------------------------------------------------------
// Echo: parse a stored lead message back into its labelled parts
// ---------------------------------------------------------------------------

export interface EnquiryEchoes {
  situation?: string;
  prompted?: string;
  callGoal?: string;
}

const LABEL_SITUATION = "Situation: ";
const LABEL_PROMPTED = "\n\nPrompted by: ";
const LABEL_CALL_GOAL = "\n\nWants from call: ";

/**
 * Parse a stored lead message back into its labelled parts.
 * Returns {} for legacy free-text messages (anything that does not start
 * with "Situation: ").
 */
export function parseEnquiryEchoes(
  message: string | null | undefined,
): EnquiryEchoes {
  if (!message || !message.startsWith(LABEL_SITUATION)) return {};

  let rest = message.slice(LABEL_SITUATION.length);

  const promptedIdx = rest.indexOf(LABEL_PROMPTED);
  if (promptedIdx === -1) {
    return { situation: rest };
  }

  const situation = rest.slice(0, promptedIdx);
  rest = rest.slice(promptedIdx + LABEL_PROMPTED.length);

  const callGoalIdx = rest.indexOf(LABEL_CALL_GOAL);
  if (callGoalIdx === -1) {
    return { situation, prompted: rest };
  }

  const prompted = rest.slice(0, callGoalIdx);
  const callGoal = rest.slice(callGoalIdx + LABEL_CALL_GOAL.length);

  return { situation, prompted, callGoal };
}

// ---------------------------------------------------------------------------
// normaliseEcho: make a fragment safe to weave into "you'd like to {echo}"
// ---------------------------------------------------------------------------

/** Allowed characters in an echo fragment. */
const ECHO_ALLOWED_RE = /^[a-zA-Z0-9 £%&',.()-]*$/;

/**
 * Leading filler phrases to strip (case-insensitive).
 * Ordered longest-first so the greedier match wins.
 */
const STRIP_PREFIXES_RE =
  /^(?:i would like to |i'd like to |i want to |we want to |to )/i;

/**
 * Echo hygiene: make a fragment safe to weave into "you'd like to {echo}".
 *
 * Pipeline (in order):
 *   1. Return "" if raw is undefined or null.
 *   2. trim()
 *   3. Strip a leading "to ", "i want to ", "i'd like to ", "i would like to ",
 *      or "we want to " (case-insensitive).
 *   4. Lowercase the first character.
 *   5. Collapse internal whitespace runs to a single space.
 *   6. Strip a trailing full stop.
 *   7. Return "" if fewer than 8 chars remain.
 *   8. Truncate at the last word boundary before position 120; no ellipsis appended.
 *   9. Return "" if the result contains an email address (@), a URL (http or www.),
 *      a phone-number-like run of 7+ consecutive digits, or any character
 *      outside [a-zA-Z0-9 £%&',.()-].
 */
export function normaliseEcho(raw: string | undefined): string {
  if (raw === undefined || raw === null) return "";

  let s = (raw as string).trim();

  // Strip leading filler phrase
  s = s.replace(STRIP_PREFIXES_RE, "");

  // Lowercase first character
  if (s.length > 0) {
    s = s[0].toLowerCase() + s.slice(1);
  }

  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();

  // Strip trailing full stop
  if (s.endsWith(".")) {
    s = s.slice(0, -1);
  }

  // Too short to be useful
  if (s.length < 8) return "";

  // Truncate at last word boundary before position 120
  if (s.length > 120) {
    const cut = s.lastIndexOf(" ", 119);
    s = cut >= 0 ? s.slice(0, cut) : s.slice(0, 120);
  }

  // Reject content with emails, URLs, phone-like digit runs, or disallowed chars
  if (s.includes("@")) return "";
  if (/https?:\/\//i.test(s) || /www\./i.test(s)) return "";
  if (/\d{7,}/.test(s)) return "";
  if (!ECHO_ALLOWED_RE.test(s)) return "";

  return s;
}

// ---------------------------------------------------------------------------
// categoryPhrase: neutral fallback from intent category or role
// ---------------------------------------------------------------------------

const CATEGORY_PHRASE_MAP: Record<string, string> = {
  incorporation: "work out whether a limited company is the right move",
  section24: "get on top of what Section 24 means for you",
  cgt: "understand the tax position before you sell",
  portfolio_structuring: "get your portfolio structured properly",
  mtd: "get ready for Making Tax Digital",
  non_resident: "get your UK property tax position clear from abroad",
};

/**
 * Neutral fallback phrase when no clean echo exists, derived from the
 * intent category then role. Falls back to a generic property tax phrase.
 * The _role parameter is reserved for future use.
 */
export function categoryPhrase(
  intentCategory?: string,
  _role?: string,
): string {
  if (intentCategory && intentCategory in CATEGORY_PHRASE_MAP) {
    return CATEGORY_PHRASE_MAP[intentCategory];
  }
  return "get your property tax position clear";
}
