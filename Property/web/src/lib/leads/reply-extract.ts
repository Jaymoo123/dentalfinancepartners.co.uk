/**
 * Deterministic extraction of a UK phone number from a free-text email reply.
 *
 * No third party and no AI: the reply's content (which may include the prospect's
 * name and number) never leaves the app. We only pull out something that looks
 * like a UK phone number; Twilio Lookup verifies it downstream, so a wrong grab
 * simply fails verification and never promotes the lead. Property values, dates,
 * and other numbers are ignored because a UK number must start with 0 or +44 and
 * resolve to 10-11 national digits.
 */

/**
 * Return the first plausible UK phone number found in `text`, kept as the user
 * typed it (spacing/formatting preserved), or null when none is found.
 */
export function extractUkPhone(text: string | null | undefined): string | null {
  if (!text) return null;
  // A candidate begins with +44 / 0044 / 44 or a word-boundary 0, then a run of
  // digits and common separators. Kept liberal; the digit-length check filters.
  const re = /(?:\+?44|\b0)[\d\s().-]{7,16}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const token = m[0].trim();
    const digits = token.replace(/\D/g, "");
    // Normalise an international prefix to a leading 0 for the validity check.
    let national = digits;
    if (national.startsWith("0044")) national = "0" + national.slice(4);
    else if (national.startsWith("44")) national = "0" + national.slice(2);
    // UK national numbers are 10 or 11 digits and start with 0.
    if (national.startsWith("0") && (national.length === 10 || national.length === 11)) {
      return token;
    }
  }
  return null;
}
