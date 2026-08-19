/**
 * Estate consent-wording drift guard. The pool gates check each LEAD's stored
 * consent_text against SHARING_CONSENT_PHRASES (offer-send.ts), so a site whose
 * form wording drifts off the anchor list silently locks ALL its future leads
 * out of the pool (fail-closed by design; correct but expensive when
 * accidental). This test pins every in-scope site's configured consent copy to
 * the anchor list so drift breaks CI instead of shipping.
 *
 * Repo-file check, not an import: each site is its own Next.js app, so the
 * site configs cannot be imported across apps from here. Reading the source
 * file text is deliberate.
 *
 * Scope: Property + the 6 in-scope Tier-2 sites (estate lead-stack port,
 * 2026-08-19). Add each Tier-3 site here as its consent wording lands (P5).
 * wills-probate and divorce-finances are out of scope (owner, 2026-08-19).
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { consentAllowsSharing } from "@/lib/leads/offer-send";

const REPO_ROOT = join(__dirname, "..", "..", "..", "..");

const IN_SCOPE_SITES = [
  "Property",
  "Dentists",
  "Solicitors",
  "Medical",
  "generalist",
  "contractors-ir35",
  "construction-cis",
];

/** Extract the leadConsentText literal from a site's config source text. */
function leadConsentTextOf(siteDir: string): string {
  const src = readFileSync(
    join(REPO_ROOT, siteDir, "web", "src", "config", "site.ts"),
    "utf8",
  );
  // Matches the declaration (`const leadConsentText = \`...\``) or an inline
  // property (`leadConsentText: "..."`); template literals may embed ${...}.
  const m = src.match(/leadConsentText\s*[:=]\s*(?:`([^`]*)`|"([^"]*)")/);
  if (!m) throw new Error(`${siteDir}: leadConsentText not found in site.ts`);
  return m[1] ?? m[2] ?? "";
}

describe("estate consent wording stays on the offer-gate anchor list", () => {
  for (const site of IN_SCOPE_SITES) {
    it(`${site}: leadConsentText passes consentAllowsSharing`, () => {
      const text = leadConsentTextOf(site);
      expect(text.length).toBeGreaterThan(20);
      // The stored consent_text is the site template with the brand name
      // resolved; the anchors are brand-independent substrings, so checking the
      // template directly is valid.
      expect(consentAllowsSharing(text)).toBe(true);
    });
  }
});
