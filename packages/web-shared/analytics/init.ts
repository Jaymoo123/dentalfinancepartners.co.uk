/**
 * SDK init contract — call initAnalytics once in layout.tsx (inside AnalyticsProvider)
 * before any tracking code runs. All SDK modules that need site-specific config
 * (storage prefix, posture, topic derivation) read from getSdkConfig().
 */

export type AnalyticsPosture = "opt-out" | "opt-in";

export interface AnalyticsInitOptions {
  /** Must equal the site's canonical site_key stored in niche.config.json (PF-07). */
  siteKey: string;
  /** Used to strip the trailing site-name suffix from page titles in the journey view. */
  siteName: string;
  /**
   * Storage key prefix, frozen at adoption. Never changes after first deployment.
   * Generalist: "hd" · Property: "ptp" (pending SDK adoption)
   */
  storagePrefix: string;
  /**
   * One-time migration prefix. When set, init reads consent "denied" and visitor_id
   * from <legacyPrefix>_* keys and writes them to the new <storagePrefix>_* keys.
   * Only two values migrate (compliance + continuity); session state is not migrated.
   * Leave unset for sites with no prior SDK (generalist at first adoption).
   */
  legacyPrefix?: string;
  /**
   * AN-01 consent posture. "opt-out" = track by default, quiet opt-out control.
   * "opt-in" = require explicit grant (mount ConsentBanner).
   * The decision must be documented in the consent module, not tribal.
   */
  posture: AnalyticsPosture;
  /**
   * Route prefixes on which no tracking fires (no-track routes).
   * Default: ["/embed", "/admin"].
   */
  noTrackPrefixes?: string[];
  /**
   * Per-site topic taxonomy function. Receives pathname → returns topic string or null.
   * Sites without a taxonomy omit this; topic features no-op.
   * Dependency direction: intent reads SDK, never the reverse.
   */
  deriveTopic?: (path: string) => string | null;
}

let _config: AnalyticsInitOptions | null = null;

export function initAnalytics(opts: AnalyticsInitOptions): void {
  _config = opts;
}

/** Returns the active SDK config, or null if initAnalytics has not been called yet. */
export function getSdkConfig(): AnalyticsInitOptions | null {
  return _config;
}

/** Reset SDK config — for testing only. */
export function _resetSdkConfig(): void {
  _config = null;
}
