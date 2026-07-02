/**
 * Reply intent classifier — deterministic, dependency-free.
 *
 * Classifies an inbound SMS/WhatsApp body as opt_out, positive, or ambiguous
 * so the Twilio inbound webhook can route each reply correctly without treating
 * objections as positive engagement signals.
 *
 * Evaluation order is fixed: opt_out -> positive -> ambiguous.
 * Surrounding punctuation is stripped; internal apostrophes are removed so
 * contractions (e.g. "don't") match their without-apostrophe phrase forms.
 *
 * Relevant obligation: Data Sharing Agreement Sch 2 §6 requires opt-outs and
 * objections to be honoured immediately.
 */

export type ReplyIntent = 'opt_out' | 'positive' | 'ambiguous';

/** Normalise the raw body for classification. */
function normalise(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase()
    .replace(/['‘’]/g, '')    // remove apostrophes and smart quotes
    .replace(/^[^\w]+|[^\w]+$/g, '');   // strip surrounding punctuation
}

/**
 * Build a word-boundary-aware regex for a phrase. Uses look-around assertions
 * rather than \b so that single-token phrases (e.g. "STOP") do not match
 * inside longer tokens (e.g. "STOPWATCH").
 */
function wbPhrase(phrase: string): RegExp {
  const escaped = phrase
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/ /g, '\\s+');
  return new RegExp(`(?<![A-Z0-9])${escaped}(?![A-Z0-9])`);
}

// ── Opt-out phrases ───────────────────────────────────────────────────────────
// Covers CTIA short-code carrier keywords plus common natural-language
// objections per Data Sharing Agreement Sch 2 §6.
const OPT_OUT_PHRASES: ReadonlyArray<string> = [
  'STOP',
  'STOPALL',
  'UNSUBSCRIBE',
  'CANCEL',
  'END',
  'QUIT',
  'PLEASE STOP',
  'STOP TEXTING',
  'STOP MESSAGING',
  'STOP CONTACTING',
  'NOT INTERESTED',
  'NO THANKS',
  'NO THANK YOU',
  'WRONG NUMBER',
  'REMOVE ME',
  'DO NOT CONTACT',
  'DONT CONTACT',
  'LEAVE ME ALONE',
  'OPT OUT',
  'OPTOUT',
  'UNSUBSCRIBE ME',
  'GO AWAY',
];

const OPT_OUT_REGEXES: ReadonlyArray<RegExp> = OPT_OUT_PHRASES.map(wbPhrase);

// ── Positive engagement phrases ───────────────────────────────────────────────
const POSITIVE_PHRASES: ReadonlyArray<string> = [
  'YES',
  'YEAH',
  'YEP',
  'Y',
  'GO AHEAD',
  'SOUNDS GOOD',
  'PLEASE CALL',
  'CALL ME',
  'OK',
  'OKAY',
  'SURE',
  'PLEASE DO',
];

const POSITIVE_REGEXES: ReadonlyArray<RegExp> = POSITIVE_PHRASES.map(wbPhrase);

// Named day or "tomorrow" — scheduling intent.
const DAY_RE = /\b(MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY|TOMORROW)\b/;

// Time-of-day reference: "after 6", "6pm", "morning", "afternoon", "evening".
const TIME_RE = /\b(AFTER\s+\d+|\d+\s*(?:AM|PM)|MORNING|AFTERNOON|EVENING)\b/;

/**
 * Classify an inbound SMS/WhatsApp reply body.
 *
 * Returns:
 *   'opt_out'  — honour immediately; stop nurture, send no ack.
 *   'positive' — genuine engagement; promote lead and send ack.
 *   'ambiguous'— unclear intent; queue for human review only.
 */
export function classifyReplyIntent(body: string): ReplyIntent {
  const norm = normalise(body);

  // ── Opt-out (must be checked first per DSA Sch 2 §6) ─────────────────────
  // A bare "NO" (whole message after normalisation) is treated as an opt-out.
  if (norm === 'NO') return 'opt_out';
  for (const re of OPT_OUT_REGEXES) {
    if (re.test(norm)) return 'opt_out';
  }

  // ── Positive engagement ───────────────────────────────────────────────────
  for (const re of POSITIVE_REGEXES) {
    if (re.test(norm)) return 'positive';
  }
  if (DAY_RE.test(norm) || TIME_RE.test(norm)) return 'positive';
  // A question mark signals the lead is actively seeking information.
  if (body.trimEnd().endsWith('?')) return 'positive';

  return 'ambiguous';
}
