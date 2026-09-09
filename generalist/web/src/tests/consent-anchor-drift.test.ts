/**
 * Consent-wording drift guard, ported from Property's estate-wide
 * `consent-anchor-drift.test.ts` and narrowed to this site.
 *
 * The pool gates check each LEAD's stored consent_text against
 * SHARING_CONSENT_PHRASES in Property's `lib/leads/offer-send.ts`, so if this
 * site's form wording drifts off the anchor list it silently locks ALL its
 * future leads out of the pool (fail-closed by design; correct, but expensive
 * when accidental). The design port restyles the surfaces that sit beside the
 * capture fields, which is exactly when the wording gets "tidied".
 *
 * The anchor list is READ OUT OF Property's source text rather than copied
 * here: this site is a separate Next.js app so the module cannot be imported
 * (it pulls Resend and Supabase), and a second hand-typed copy of the anchors
 * is the drift this test exists to catch.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const REPO_ROOT = join(__dirname, "..", "..", "..", "..");

function sharingConsentPhrases(): string[] {
  const src = readFileSync(
    join(REPO_ROOT, "Property", "web", "src", "lib", "leads", "offer-send.ts"),
    "utf8",
  );
  const block = src.match(/SHARING_CONSENT_PHRASES\s*=\s*\[([\s\S]*?)\]/)?.[1];
  if (!block) throw new Error("SHARING_CONSENT_PHRASES not found in Property offer-send.ts");
  return [...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function leadConsentText(): string {
  const src = readFileSync(join(__dirname, "..", "config", "site.ts"), "utf8");
  const m = src.match(/leadConsentText\s*[:=]\s*(?:`([^`]*)`|"([^"]*)")/);
  if (!m) throw new Error("leadConsentText not found in src/config/site.ts");
  return m[1] ?? m[2] ?? "";
}

describe("generalist consent wording stays on the offer-gate anchor list", () => {
  it("leadConsentText matches at least one sharing anchor", () => {
    const text = leadConsentText().toLowerCase();
    const anchors = sharingConsentPhrases();
    expect(anchors.length).toBeGreaterThan(0);
    expect(text.length).toBeGreaterThan(20);
    expect(
      anchors.some((p) => text.includes(p.toLowerCase())),
      `leadConsentText matches none of: ${anchors.join(" | ")}`,
    ).toBe(true);
  });
});
