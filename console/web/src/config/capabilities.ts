/**
 * Per-site capability map for the estate console.
 *
 * Drives which panels render "not operated on this site" vs full data.
 * Data, not code branches: add a site here when it onboards a new system.
 *
 * Current state (2026-06-11, updated G2):
 *   - property: full stack (experiments, nurture, lead-intent, personalisation)
 *   - generalist: experiments (calc_promo_inline starter)
 *   - digital-agency: nurture only
 *   - all others: analytics + leads only
 */

export type SiteCapabilities = {
  experiments: boolean;
  nurture: boolean;
  leadIntent: boolean;
  personalisation: boolean;
};

const DEFAULT_CAPS: SiteCapabilities = {
  experiments: false,
  nurture: false,
  leadIntent: false,
  personalisation: false,
};

/**
 * Map of site_key to the capabilities it operates.
 * Sites absent from this map get DEFAULT_CAPS (analytics + leads only).
 */
const CAPABILITY_MAP: Record<string, SiteCapabilities> = {
  property: {
    experiments: true,
    nurture: true,
    leadIntent: true,
    personalisation: true,
  },
  generalist: {
    experiments: true,
    nurture: false,
    leadIntent: false,
    personalisation: false,
  },
  "digital-agency": {
    experiments: false,
    nurture: true,
    leadIntent: false,
    personalisation: false,
  },
};

/**
 * Return the capability flags for a given site_key.
 * Always returns a complete SiteCapabilities object (never throws).
 */
export function getSiteCapabilities(siteKey: string): SiteCapabilities {
  return CAPABILITY_MAP[siteKey] ?? { ...DEFAULT_CAPS };
}
