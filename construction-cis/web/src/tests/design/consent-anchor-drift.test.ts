/**
 * Consent wording: REACH, not wording.
 *
 * WHAT IS ALREADY COVERED, AND IS NOT REPEATED HERE. `src/tests/lead-payload.test.ts`
 * pins `siteConfig.leadConsentText` byte-exact (`:34-40`), asserts the pool-gate
 * anchor phrase "specialist partner network" and bans "Reflex" and "DJH". That is
 * sufficient for the wording itself, and it is one of the estate's 7 consent pins:
 * a second copy of the literal in this file would BE the drift it claims to catch.
 * So no literal appears below.
 *
 * WHAT WAS MISSING. Nothing asserted that the pinned string actually REACHES every
 * surface that takes a name, an email or a phone number directly. (Verified against
 * this site's disk: `InlineMiniLeadForm` renders no fields of its own, it delegates
 * to `MiniCapture`, so it carries no separate consent copy to drift; `BookingPicker`
 * collects only a date and a call window, no name/email/phone; `GateOrForm` does not
 * exist on this site. None of the three add a surface, so CAPTURE_SURFACES stays at
 * the three components that render their own fields.) The wording being right in
 * `site.ts` is worth nothing on a form that renders its own sentence instead, and
 * that is not hypothetical: TD-15 is live. `/complete` collects the phone number,
 * the single most onward-shared field, under `DetailsForm`'s hand-typed "We only
 * use this to arrange your free review", which contradicts both the privacy policy
 * and `site.ts`. The design port restyles exactly these surfaces, which is when a
 * sentence gets "tidied".
 *
 * WHY THIS MATTERS MORE THAN ITS SIZE SUGGESTS. Changing consent wording on the
 * estate's flagship took mini-form leads from about 10 a week to 3.9 and had to be
 * reverted. The gate fails closed in the other direction too: a lead whose stored
 * `consent_text` drifts off the anchor list is locked out of the pool for ever.
 *
 * >>> WHEN YOU FIX TD-15 (point DetailsForm at `siteConfig.leadConsentText`):
 * >>> delete the `.fails` on the last test and delete this note.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "..", "..");
const read = (...p: string[]) => readFileSync(join(SRC, ...p), "utf8");

/** Surfaces that render their own name/email/phone fields (verified against disk). */
const CAPTURE_SURFACES = [
  ["components", "forms", "LeadForm.tsx"],
  ["components", "forms", "MiniCapture.tsx"],
  ["components", "support", "SpecialistWidget.tsx"],
];

describe("consent wording reaches every capture surface", () => {
  it("every capture surface reads the single source of truth", () => {
    const missing = CAPTURE_SURFACES.filter(
      (p) => !/siteConfig\.leadConsentText/.test(read(...p)),
    ).map((p) => p.join("/"));
    expect(
      missing,
      `these surfaces collect personal data without rendering siteConfig.leadConsentText: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it("no surface hand-types its own sharing sentence", () => {
    // A second copy of the wording anywhere is drift waiting to happen, whether
    // or not it currently matches.
    const offenders = CAPTURE_SURFACES.filter((p) =>
      /details may be shared|partner network who will contact/.test(read(...p)),
    ).map((p) => p.join("/"));
    expect(offenders, offenders.join(", ")).toEqual([]);
  });

  it("the byte-exact pin in lead-payload.test.ts has not been deleted", () => {
    // The wording pin lives there, not here. This asserts the tripwire is still
    // armed, without making a second copy of the string it protects.
    const pin = read("tests", "lead-payload.test.ts");
    expect(/siteConfig\.leadConsentText\)\.toBe\(/.test(pin)).toBe(true);
    expect(/specialist partner network/.test(pin)).toBe(true);
  });

  it("DetailsForm.tsx exists and is non-trivial (guards the .fails below from a silent rename/delete)", () => {
    const path = join(SRC, "components", "forms", "DetailsForm.tsx");
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, "utf8").length).toBeGreaterThan(500);
  });

  it.fails("DetailsForm carries the canonical consent wording (TD-15)", () => {
    const src = read("components", "forms", "DetailsForm.tsx");
    expect(
      /siteConfig\.leadConsentText/.test(src),
      "/complete collects the phone number under a single-purpose promise the privacy policy contradicts",
    ).toBe(true);
    expect(/We only use this to arrange your free review/.test(src)).toBe(false);
  });
});
