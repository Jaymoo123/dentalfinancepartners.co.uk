/**
 * The exact marketing-consent disclosure for the newsletter opt-in (LD-09).
 *
 * Lives in its own module (no server-only imports) so the client-side
 * SignupForm can render it as the checkbox label AND send it verbatim as
 * consent_text, while the server-side NurtureConfig uses it as
 * defaultConsentText. One string, one source — if you change it, both
 * surfaces change together. Never store a consent_text the visitor did not
 * see (the LD-04/LD-09 fabrication lesson).
 */
export const AGENCY_NEWSLETTER_CONSENT_TEXT =
  "I agree to receive the Agency Founder Tax Brief and related UK tax updates by email from Agency Founder Finance. Unsubscribe any time.";
