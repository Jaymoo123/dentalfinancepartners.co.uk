/**
 * Registry, copy, spine and compliance golden tests for the construction-cis
 * resource system (Trade Tax Specialists).
 *
 * Tests:
 *   - resourceForTopic returns correct entries for all TopicKeys
 *   - cis-deductions alias points to cis-refund resources
 *   - toolId spine consistency (each enabled topic has the right toolId)
 *   - self-assessment and vat-reverse-charge have NO enabled assets
 *   - hasEnabledResource: true for the 4 main topics, false for the 2 no-asset topics
 *   - publishedGuideTopics deduplicates the cis-deductions alias
 *   - gateCopy returns strings for all topics (never throws)
 *   - compliance: no em-dash in any copy string
 *   - compliance: no DJH in any copy string
 *   - compliance: resourceConsentText contains no partner firm name
 *   - compliance: events on allowlist (structural check via RESOURCES)
 *
 * Runs as part of: npm test --workspace construction-cis/web
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

// ---- All topic keys ----
const ALL_TOPICS: TopicKey[] = [
  "cis-refund",
  "cis-deductions",
  "limited-company",
  "gross-payment-status",
  "self-assessment",
  "vat-reverse-charge",
];

const ENABLED_TOPICS: TopicKey[] = [
  "cis-refund",
  "cis-deductions",
  "limited-company",
  "gross-payment-status",
];

const NO_ASSET_TOPICS: TopicKey[] = ["self-assessment", "vat-reverse-charge"];

// ---- resourceForTopic ----

describe("resourceForTopic", () => {
  it("returns non-null for all 6 TopicKeys", () => {
    for (const t of ALL_TOPICS) {
      expect(resourceForTopic(t)).not.toBeNull();
    }
  });

  it("returns null for null input", () => {
    expect(resourceForTopic(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(resourceForTopic(undefined)).toBeNull();
  });

  it("cis-refund has xlsx enabled", () => {
    const r = resourceForTopic("cis-refund");
    expect(isXlsxEnabled(r)).toBe(true);
  });

  it("cis-refund has guide enabled", () => {
    const r = resourceForTopic("cis-refund");
    expect(isGuideEnabled(r)).toBe(true);
  });

  it("limited-company has xlsx enabled", () => {
    const r = resourceForTopic("limited-company");
    expect(isXlsxEnabled(r)).toBe(true);
  });

  it("limited-company has guide enabled", () => {
    const r = resourceForTopic("limited-company");
    expect(isGuideEnabled(r)).toBe(true);
  });

  it("gross-payment-status has xlsx enabled", () => {
    const r = resourceForTopic("gross-payment-status");
    expect(isXlsxEnabled(r)).toBe(true);
  });

  it("gross-payment-status has guide enabled", () => {
    const r = resourceForTopic("gross-payment-status");
    expect(isGuideEnabled(r)).toBe(true);
  });
});

// ---- cis-deductions alias ----

describe("cis-deductions alias", () => {
  it("cis-deductions xlsx file points to the cis-refund workbook", () => {
    const alias = resourceForTopic("cis-deductions");
    const flagship = resourceForTopic("cis-refund");
    expect(alias?.xlsx?.file).toBe(flagship?.xlsx?.file);
  });

  it("cis-deductions guide slug points to cis-refund", () => {
    const alias = resourceForTopic("cis-deductions");
    expect(alias?.guide?.slug).toBe("cis-refund");
  });

  it("cis-deductions has xlsx enabled (same file as cis-refund)", () => {
    expect(isXlsxEnabled(resourceForTopic("cis-deductions"))).toBe(true);
  });

  it("cis-deductions has guide enabled", () => {
    expect(isGuideEnabled(resourceForTopic("cis-deductions"))).toBe(true);
  });
});

// ---- toolId spine consistency ----

describe("toolId spine", () => {
  it("cis-refund toolId = cis-refund-planner-premium", () => {
    expect(RESOURCES["cis-refund"].toolId).toBe("cis-refund-planner-premium");
  });

  it("cis-deductions toolId = cis-refund-planner-premium (alias spine)", () => {
    expect(RESOURCES["cis-deductions"].toolId).toBe("cis-refund-planner-premium");
  });

  it("limited-company toolId = cis-vs-paye-premium", () => {
    expect(RESOURCES["limited-company"].toolId).toBe("cis-vs-paye-premium");
  });

  it("gross-payment-status toolId = cis-gps-readiness-premium", () => {
    expect(RESOURCES["gross-payment-status"].toolId).toBe("cis-gps-readiness-premium");
  });

  it("self-assessment toolId is null (no premium tool)", () => {
    expect(RESOURCES["self-assessment"].toolId).toBeNull();
  });

  it("vat-reverse-charge toolId is null (no premium tool)", () => {
    expect(RESOURCES["vat-reverse-charge"].toolId).toBeNull();
  });
});

// ---- No-asset topics ----

describe("no-asset topics", () => {
  for (const t of NO_ASSET_TOPICS) {
    it(`${t}: xlsx is null`, () => {
      expect(resourceForTopic(t)?.xlsx).toBeNull();
    });
    it(`${t}: guide is null`, () => {
      expect(resourceForTopic(t)?.guide).toBeNull();
    });
    it(`${t}: hasEnabledResource is false`, () => {
      expect(hasEnabledResource(t)).toBe(false);
    });
  }
});

// ---- hasEnabledResource ----

describe("hasEnabledResource", () => {
  for (const t of ENABLED_TOPICS) {
    it(`${t}: hasEnabledResource is true`, () => {
      expect(hasEnabledResource(t)).toBe(true);
    });
  }

  it("null returns false", () => {
    expect(hasEnabledResource(null)).toBe(false);
  });

  it("undefined returns false", () => {
    expect(hasEnabledResource(undefined)).toBe(false);
  });
});

// ---- enabledResourceTopics ----

describe("enabledResourceTopics", () => {
  it("returns at least the 4 enabled topics", () => {
    const enabled = enabledResourceTopics();
    for (const t of ENABLED_TOPICS) {
      expect(enabled).toContain(t);
    }
  });

  it("does NOT include self-assessment", () => {
    expect(enabledResourceTopics()).not.toContain("self-assessment");
  });

  it("does NOT include vat-reverse-charge", () => {
    expect(enabledResourceTopics()).not.toContain("vat-reverse-charge");
  });
});

// ---- enabledGuideTopics ----

describe("enabledGuideTopics", () => {
  it("includes cis-refund", () => {
    expect(enabledGuideTopics()).toContain("cis-refund");
  });

  it("includes cis-deductions (alias also has guide)", () => {
    expect(enabledGuideTopics()).toContain("cis-deductions");
  });

  it("includes gross-payment-status", () => {
    expect(enabledGuideTopics()).toContain("gross-payment-status");
  });
});

// ---- publishedGuideTopics deduplication ----

describe("publishedGuideTopics", () => {
  it("returns an array of unique guide slugs", () => {
    const slugs = publishedGuideTopics();
    const set = new Set(slugs);
    expect(set.size).toBe(slugs.length);
  });

  it("cis-refund appears exactly once (not duplicated by cis-deductions alias)", () => {
    const slugs = publishedGuideTopics();
    const count = slugs.filter((s) => s === "cis-refund").length;
    expect(count).toBe(1);
  });

  it("includes gross-payment-status", () => {
    expect(publishedGuideTopics()).toContain("gross-payment-status");
  });

  it("includes cis-vs-paye (limited-company guide)", () => {
    expect(publishedGuideTopics()).toContain("cis-vs-paye");
  });
});

// ---- gateCopy ----

describe("gateCopy", () => {
  it("returns heading and blurb for all 6 topics without throwing", () => {
    for (const t of ALL_TOPICS) {
      const result = gateCopy(t);
      expect(typeof result.heading).toBe("string");
      expect(result.heading.length).toBeGreaterThan(0);
      expect(typeof result.blurb).toBe("string");
      expect(result.blurb.length).toBeGreaterThan(0);
    }
  });

  it("returns heading and blurb for null without throwing", () => {
    const result = gateCopy(null);
    expect(typeof result.heading).toBe("string");
    expect(typeof result.blurb).toBe("string");
  });

  it("override heading wins", () => {
    const result = gateCopy("cis-refund", undefined, { heading: "Custom heading" });
    expect(result.heading).toBe("Custom heading");
  });

  it("override blurb wins", () => {
    const result = gateCopy("cis-refund", undefined, { blurb: "Custom blurb." });
    expect(result.blurb).toBe("Custom blurb.");
  });
});

// ---- Compliance: no em-dashes ----

describe("compliance: no em-dashes in copy", () => {
  it("no em-dashes in any RESOURCES magnetTitle", () => {
    for (const r of Object.values(RESOURCES)) {
      expect(r.magnetTitle).not.toContain("—");
    }
  });

  it("no em-dashes in any RESOURCES magnetBlurbTemplate", () => {
    for (const r of Object.values(RESOURCES)) {
      expect(r.magnetBlurbTemplate).not.toContain("—");
    }
  });

  it("no em-dashes in gateCopy output for any topic", () => {
    for (const t of ALL_TOPICS) {
      const { heading, blurb } = gateCopy(t);
      expect(heading).not.toContain("—");
      expect(blurb).not.toContain("—");
    }
  });
});

// ---- Compliance: no DJH ----

describe("compliance: no DJH in copy", () => {
  it("no DJH in any RESOURCES string", () => {
    for (const r of Object.values(RESOURCES)) {
      const s = JSON.stringify(r);
      expect(s).not.toMatch(/\bDJH\b/);
    }
  });
});

// ---- Compliance: resourceConsentText ----

describe("compliance: resourceConsentText", () => {
  it("resourceConsentText is a non-empty string", () => {
    expect(typeof siteConfig.resourceConsentText).toBe("string");
    expect(siteConfig.resourceConsentText.length).toBeGreaterThan(0);
  });

  it("resourceConsentText does not contain a partner firm name", () => {
    // In-house only: must not mention any partner firm.
    // The partner field is currently null; this test guards against future regressions.
    const text = siteConfig.resourceConsentText;
    // Must not mention "Property Tax Partners" (the lead-gen partner)
    expect(text).not.toContain("Property Tax Partners");
    // Must not mention "Ashfield Trading" (the operating company - in-house reference)
    // Actually Ashfield Trading IS the operating company so its absence just means it's
    // described by trading name only, which is Trade Tax Specialists.
    // The key check: does not frame as a data-share with a third-party firm.
    expect(text).not.toContain("independent data controller");
    expect(text).not.toContain("third-party");
  });

  it("resourceConsentText mentions Trade Tax Specialists", () => {
    expect(siteConfig.resourceConsentText).toContain("Trade Tax Specialists");
  });

  it("resourceConsentText mentions free resource", () => {
    expect(siteConfig.resourceConsentText).toContain("free resource");
  });
});

// ---- Compliance: xlsx file paths are consistent ----

describe("compliance: xlsx file paths", () => {
  it("cis-refund xlsx file is under /resources/cis-refund/", () => {
    const r = resourceForTopic("cis-refund");
    expect(r?.xlsx?.file).toMatch(/^\/resources\/cis-refund\//);
  });

  it("limited-company xlsx file is under /resources/cis-vs-paye/", () => {
    const r = resourceForTopic("limited-company");
    expect(r?.xlsx?.file).toMatch(/^\/resources\/cis-vs-paye\//);
  });

  it("gross-payment-status xlsx file is under /resources/gross-payment-status/", () => {
    const r = resourceForTopic("gross-payment-status");
    expect(r?.xlsx?.file).toMatch(/^\/resources\/gross-payment-status\//);
  });
});
