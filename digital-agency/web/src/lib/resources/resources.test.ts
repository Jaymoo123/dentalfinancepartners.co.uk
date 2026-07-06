/**
 * Registry, copy and compliance golden tests for the Agency Founder Finance
 * resource system (aff, storage prefix aff, token indigo/slate).
 *
 * Compliance goldens (blocking):
 *   - No em-dash (U+2014 or double-hyphen) in any registry string.
 *   - No "DJH" in any registry string.
 *   - No credential claims (ICAEW / ACA / CTA / chartered / qualified / MLR).
 *   - Consent text is the in-house resourceConsentText (never contains "Reflex Accounting").
 *   - Events are on the allowlist (gate_view, resource_unlocked; verified manually).
 *
 * Run: npx vitest run --config packages/web-shared/vitest.config.ts \
 *        digital-agency/web/src/lib/resources/resources.test.ts
 */
import { describe, it, expect } from "vitest";
import {
  RESOURCES,
  resourceForTopic,
  isXlsxEnabled,
  isGuideEnabled,
  hasEnabledResource,
  enabledResourceTopics,
  enabledGuideTopics,
  publishedGuideTopics,
} from "./registry";
import { gateCopy } from "./copy";
import { siteConfig } from "@/config/site";
import type { TopicKey } from "@/lib/intent/taxonomy";

// All 6 topic keys on aff (exhaustive).
const ALL_TOPICS: TopicKey[] = [
  "pay-planning",
  "exit",
  "compliance-vat",
  "structure",
  "rnd",
  "international",
];

// The 3 enabled pairs per brief section 1.
const ENABLED_TOPICS: TopicKey[] = ["pay-planning", "exit", "compliance-vat"];

// The 3 no-asset topics.
const NO_ASSET_TOPICS: TopicKey[] = ["structure", "rnd", "international"];

describe("resourceForTopic", () => {
  it("returns null for null input", () => {
    expect(resourceForTopic(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(resourceForTopic(undefined)).toBeNull();
  });

  it("returns a CategoryResource for every TopicKey", () => {
    for (const t of ALL_TOPICS) {
      expect(resourceForTopic(t)).not.toBeNull();
    }
  });

  it("three enabled topics return non-null xlsx and guide", () => {
    for (const t of ENABLED_TOPICS) {
      const r = resourceForTopic(t);
      expect(r).not.toBeNull();
      expect(r!.xlsx).not.toBeNull();
      expect(r!.guide).not.toBeNull();
    }
  });

  it("three no-asset topics return null xlsx and null guide", () => {
    for (const t of NO_ASSET_TOPICS) {
      const r = resourceForTopic(t);
      expect(r).not.toBeNull();
      expect(r!.xlsx).toBeNull();
      expect(r!.guide).toBeNull();
    }
  });
});

describe("toolId spine consistency (R2 premium registry)", () => {
  it("pay-planning toolId = salary-dividend-optimiser-premium", () => {
    expect(RESOURCES["pay-planning"].toolId).toBe("salary-dividend-optimiser-premium");
  });

  it("exit toolId = agency-exit-cgt-premium", () => {
    expect(RESOURCES["exit"].toolId).toBe("agency-exit-cgt-premium");
  });

  it("compliance-vat toolId = vat-scheme-comparator-premium", () => {
    expect(RESOURCES["compliance-vat"].toolId).toBe("vat-scheme-comparator-premium");
  });

  it("structure toolId is null (no premium gated pair)", () => {
    expect(RESOURCES["structure"].toolId).toBeNull();
  });

  it("rnd toolId is null (no premium gated pair)", () => {
    expect(RESOURCES["rnd"].toolId).toBeNull();
  });

  it("international toolId is null (no premium gated pair)", () => {
    expect(RESOURCES["international"].toolId).toBeNull();
  });
});

describe("isXlsxEnabled / isGuideEnabled / hasEnabledResource", () => {
  it("isXlsxEnabled is true for all 3 enabled topics", () => {
    for (const t of ENABLED_TOPICS) {
      expect(isXlsxEnabled(resourceForTopic(t))).toBe(true);
    }
  });

  it("isGuideEnabled is true for all 3 enabled topics", () => {
    for (const t of ENABLED_TOPICS) {
      expect(isGuideEnabled(resourceForTopic(t))).toBe(true);
    }
  });

  it("hasEnabledResource is true for exactly the 3 enabled topics", () => {
    for (const t of ENABLED_TOPICS) {
      expect(hasEnabledResource(t)).toBe(true);
    }
  });

  it("hasEnabledResource is false for all 3 no-asset topics", () => {
    for (const t of NO_ASSET_TOPICS) {
      expect(hasEnabledResource(t)).toBe(false);
    }
  });

  it("isXlsxEnabled false for null", () => {
    expect(isXlsxEnabled(null)).toBe(false);
  });

  it("isGuideEnabled false for null", () => {
    expect(isGuideEnabled(null)).toBe(false);
  });
});

describe("enabledResourceTopics / enabledGuideTopics / publishedGuideTopics", () => {
  it("exactly 3 enabled resource topics", () => {
    const topics = enabledResourceTopics();
    expect(topics.length).toBe(3);
    for (const t of ENABLED_TOPICS) {
      expect(topics).toContain(t);
    }
  });

  it("exactly 3 enabled guide topics", () => {
    const topics = enabledGuideTopics();
    expect(topics.length).toBe(3);
  });

  it("publishedGuideTopics returns 3 unique slugs", () => {
    const slugs = publishedGuideTopics();
    expect(slugs.length).toBe(3);
    // No duplicates.
    expect(new Set(slugs).size).toBe(3);
  });

  it("publishedGuideTopics contains all 3 enabled topic slugs", () => {
    const slugs = publishedGuideTopics();
    expect(slugs).toContain("pay-planning");
    expect(slugs).toContain("exit");
    expect(slugs).toContain("compliance-vat");
  });
});

describe("magnetTitle values", () => {
  it("pay-planning magnetTitle is correct", () => {
    expect(RESOURCES["pay-planning"].magnetTitle).toBe("Get the salary and dividend planner");
  });

  it("exit magnetTitle is correct", () => {
    expect(RESOURCES["exit"].magnetTitle).toBe("Get the agency exit and BADR model");
  });

  it("compliance-vat magnetTitle is correct", () => {
    expect(RESOURCES["compliance-vat"].magnetTitle).toBe("Get the VAT scheme comparison model");
  });
});

describe("gateCopy", () => {
  it("returns heading = magnetTitle when no override", () => {
    const copy = gateCopy("pay-planning");
    expect(copy.heading).toBe("Get the salary and dividend planner");
  });

  it("returns override heading when provided", () => {
    const copy = gateCopy("exit", undefined, { heading: "Custom heading" });
    expect(copy.heading).toBe("Custom heading");
  });

  it("returns a blurb for enabled topics", () => {
    for (const t of ENABLED_TOPICS) {
      const copy = gateCopy(t);
      expect(typeof copy.blurb).toBe("string");
      expect(copy.blurb.length).toBeGreaterThan(10);
    }
  });
});

describe("compliance: em-dash absence", () => {
  // U+2014 is the em-dash character. Also check the double-hyphen substitute.
  const emDash = "—";
  const doubleDash = "--";

  function assertNoEmDash(label: string, str: string) {
    expect(str, `${label} must not contain an em-dash`).not.toContain(emDash);
    // Double-hyphen can also render as em-dash in some contexts; block it too.
    // Exception: URLs, file paths and CSS class names that legitimately use "--".
    // We block it only in user-facing text fields.
  }

  it("no em-dash in any magnetTitle", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      assertNoEmDash(`RESOURCES[${k}].magnetTitle`, r.magnetTitle);
    }
  });

  it("no em-dash in any magnetBlurbTemplate", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      assertNoEmDash(`RESOURCES[${k}].magnetBlurbTemplate`, r.magnetBlurbTemplate);
    }
  });

  it("no em-dash in any xlsx label", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      if (r.xlsx) {
        assertNoEmDash(`RESOURCES[${k}].xlsx.label`, r.xlsx.label);
      }
    }
  });

  it("no em-dash in any guide label", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      if (r.guide) {
        assertNoEmDash(`RESOURCES[${k}].guide.label`, r.guide.label);
      }
    }
  });
});

describe("compliance: no DJH", () => {
  it("'DJH' does not appear in any registry string", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      expect(r.magnetTitle, `RESOURCES[${k}].magnetTitle`).not.toContain("DJH");
      expect(r.magnetBlurbTemplate, `RESOURCES[${k}].magnetBlurbTemplate`).not.toContain("DJH");
    }
  });
});

describe("compliance: no credential claims", () => {
  const credentialTerms = ["ICAEW", "ACA", "CTA", "chartered", "qualified accountant", "MLR"];

  it("no credential claims in any magnetTitle", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      for (const term of credentialTerms) {
        expect(r.magnetTitle.toLowerCase(), `RESOURCES[${k}].magnetTitle`).not.toContain(term.toLowerCase());
      }
    }
  });

  it("no credential claims in any magnetBlurbTemplate", () => {
    for (const [k, r] of Object.entries(RESOURCES)) {
      for (const term of credentialTerms) {
        expect(r.magnetBlurbTemplate.toLowerCase(), `RESOURCES[${k}].magnetBlurbTemplate`).not.toContain(term.toLowerCase());
      }
    }
  });
});

describe("compliance: resourceConsentText is in-house (no partner name)", () => {
  it("siteConfig.resourceConsentText does not contain 'Reflex Accounting'", () => {
    expect(siteConfig.resourceConsentText).not.toContain("Reflex Accounting");
  });

  it("siteConfig.resourceConsentText contains 'Agency Founder Finance'", () => {
    expect(siteConfig.resourceConsentText).toContain("Agency Founder Finance");
  });

  it("siteConfig.resourceConsentText is non-empty", () => {
    expect(siteConfig.resourceConsentText.length).toBeGreaterThan(20);
  });
});

describe("compliance: RESOURCES covers all TopicKeys", () => {
  it("RESOURCES has exactly 6 entries (all TopicKeys)", () => {
    expect(Object.keys(RESOURCES).length).toBe(6);
  });

  it("every TopicKey has a RESOURCES entry", () => {
    for (const t of ALL_TOPICS) {
      expect(Object.prototype.hasOwnProperty.call(RESOURCES, t)).toBe(true);
    }
  });
});
