/**
 * NurtureConfig: everything the shared nurture engine needs from the host site.
 *
 * PF-07 fix: no site-key or identity literal lives in the shared engine.
 * Every site composes the engine by passing its own config object. The engine
 * refuses to operate rather than fall back to a hardcoded default (EN-06 fix).
 *
 * Sequence content is per-site config (steps: subject, body builder, delay).
 * The engine is content-agnostic; it only drives the scheduler and I/O.
 */

/** One step in the drip sequence. */
export interface NurtureStep {
  /** Stable identifier for logs/debugging. */
  key: string;
  /** Days to wait after the PREVIOUS step before this one is due. Step 0 = 0 (immediate). */
  delayDays: number;
  /** Email subject line. */
  subject: string;
  /**
   * Build the HTML + plain-text body for this step.
   * Receives the absolute, token-bearing unsubscribe URL so CTAs and footers
   * can be UTM-tagged and fully resolved without the engine knowing the site URL.
   */
  buildBody: (unsubscribeUrl: string) => {
    /** Rendered HTML body (including any CTA button). Must include the unsubscribe link. */
    html: string;
    /** Plain-text mirror. Must include the unsubscribe link. */
    text: string;
    /** RFC 8058 List-Unsubscribe header value. Must be the per-subscriber token URL. */
    listUnsubscribeHeader: string;
  };
}

/** Per-site composition contract passed to engine factories. */
export interface NurtureConfig {
  /**
   * Site key stored on every subscriber row (e.g. "generalist", "property").
   * Read from config, NEVER hardcoded inside the engine. PF-07.
   */
  siteKey: string;

  /**
   * Sequence name stored on nurture_state / nurture_sends rows.
   * Allows multiple sequences per site in the future.
   */
  sequenceName: string;

  /** Sequence steps, in order. Step 0 is sent immediately on opt-in (welcome). */
  steps: NurtureStep[];

  /** Resend "from" identity. Required. No fallback (EN-06). */
  fromAddress: string;

  /** Reply-To address. Required. No fallback (EN-06). */
  replyTo: string;

  /**
   * Default consent text shown to subscribers when the form label isn't passed
   * at opt-in time. Stored on the subscriber row (LD-09).
   */
  defaultConsentText: string;

  /**
   * Base URL of the site (e.g. "https://www.hollowaydavies.co.uk").
   * Used by the subscribe handler to build the confirmation redirect URL.
   * Required. No fallback (EN-06).
   */
  siteUrl: string;
}

/**
 * Read a required string from an environment variable.
 * Throws if absent or empty — the engine refuses to operate rather than
 * fall back to another site's identity (EN-06, SEC-05 posture).
 */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(
      `Required environment variable ${name} is not set. ` +
        `The nurture engine will not operate with missing identity config (EN-06).`,
    );
  }
  return v.trim();
}
