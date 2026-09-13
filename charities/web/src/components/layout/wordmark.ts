/**
 * One source for the wordmark lockup strings, read by both the header and the
 * footer through the kit shell's props.
 *
 * Its own module rather than nav.ts: nav.ts imports the calculator registry and
 * is therefore server-only, while the chrome wiring that needs these strings is
 * a client component. Importing them from nav.ts would drag every tool's
 * compute function into the client bundle.
 *
 * Strings are P1_ADOPTION_SPEC §2.1's; the display name is "Trustee Tax"
 * (charities/niche.config.json). Owner pick still open.
 */
export const WORDMARK_TOP = "TRUSTEE TAX";
export const WORDMARK_BOTTOM = "CHARITY ACCOUNTANTS";
