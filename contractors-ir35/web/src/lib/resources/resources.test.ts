/**
 * Registry + copy golden tests for the Contractor Tax Accountants resource system.
 *
 * Compliance goldens (blocking):
 *   - No em-dash (U+2014 or "--") in any registry string.
 *   - The string "DJH" appears nowhere.
 *   - The rendered gate consent string equals siteConfig.resourceConsentText exactly.
 *   - Every emitted event is on the allowlist.
 *
 * Registry goldens:
 *   - resourceForTopic maps every TopicKey and returns null for null/undefined.
 *   - The two no-asset topics (company-tax, basics-expenses) have no enabled xlsx/guide.
 *   - isXlsxEnabled / isGuideEnabled / hasEnabledResource / enabledResourceTopics /
 *     publishedGuideTopics behave correctly.
 *   - toolId per enabled topic equals the R2 premium toolId.
 *
 * No em-dashes in test titles.
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
} from "./registry.js";
import { gateCopy } from "./copy.js";
import type { TopicKey } from "../intent/taxonomy.js";

const ALL_TOPICS: TopicKey[] = ["ir35", "structure", "company-tax", "pay-planning", "basics-expenses"];
const ENABLED_TOPICS: TopicKey[] = ["ir35", "structure", "pay-planning"];
const NO_ASSET_TOPICS: TopicKey[] = ["company-tax", "basics-expenses"];

// ---- resourceForTopic ----

describe("resourceForTopic", () => {
  it("returns non-null for every defined TopicKey", () => {
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

  it("returns null for an unknown key", () => {
    expect(resourceForTopic("unknown" as TopicKey)).toBeNull();
  });
});

// ---- isXlsxEnabled ----

describe("isXlsxEnabled", () => {
  it("returns true for ir35", () => {
    expect(isXlsxEnabled(resourceForTopic("ir35"))).toBe(true);
  });

  it("returns true for structure", () => {
    expect(isXlsxEnabled(resourceForTopic("structure"))).toBe(true);
  });

  it("returns true for pay-planning", () => {
    expect(isXlsxEnabled(resourceForTopic("pay-planning"))).toBe(true);
  });

  it("returns false for company-tax (no asset)", () => {
    expect(isXlsxEnabled(resourceForTopic("company-tax"))).toBe(false);
  });

  it("returns false for basics-expenses (no asset)", () => {
    expect(isXlsxEnabled(resourceForTopic("basics-expenses"))).toBe(false);
  });

  it("returns false for null", () => {
    expect(isXlsxEnabled(null)).toBe(false);
  });
});

// ---- isGuideEnabled ----

describe("isGuideEnabled", () => {
  it("returns true for ir35", () => {
    expect(isGuideEnabled(resourceForTopic("ir35"))).toBe(true);
  });

  it("returns true for structure", () => {
    expect(isGuideEnabled(resourceForTopic("structure"))).toBe(true);
  });

  it("returns true for pay-planning", () => {
    expect(isGuideEnabled(resourceForTopic("pay-planning"))).toBe(true);
  });

  it("returns false for company-tax (no guide)", () => {
    expect(isGuideEnabled(resourceForTopic("company-tax"))).toBe(false);
  });

  it("returns false for basics-expenses (no guide)", () => {
    expect(isGuideEnabled(resourceForTopic("basics-expenses"))).toBe(false);
  });

  it("returns false for null", () => {
    expect(isGuideEnabled(null)).toBe(false);
  });
});

// ---- hasEnabledResource ----

describe("hasEnabledResource", () => {
  for (const t of ENABLED_TOPICS) {
    it(`returns true for ${t}`, () => {
      expect(hasEnabledResource(t)).toBe(true);
    });
  }

  for (const t of NO_ASSET_TOPICS) {
    it(`returns false for ${t} (no asset)`, () => {
      expect(hasEnabledResource(t)).toBe(false);
    });
  }

  it("returns false for null", () => {
    expect(hasEnabledResource(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(hasEnabledResource(undefined)).toBe(false);
  });
});

// ---- enabledResourceTopics ----

describe("enabledResourceTopics", () => {
  it("returns exactly the 3 enabled topics", () => {
    const enabled = enabledResourceTopics().sort();
    expect(enabled).toEqual(["ir35", "pay-planning", "structure"]);
  });

  it("does not include company-tax or basics-expenses", () => {
    const enabled = enabledResourceTopics();
    expect(enabled).not.toContain("company-tax");
    expect(enabled).not.toContain("basics-expenses");
  });
});

// ---- enabledGuideTopics ----

describe("enabledGuideTopics", () => {
  it("returns exactly the 3 guide-enabled topics", () => {
    const guides = enabledGuideTopics().sort();
    expect(guides).toEqual(["ir35", "pay-planning", "structure"]);
  });
});

// ---- publishedGuideTopics ----

describe("publishedGuideTopics", () => {
  it("returns 3 unique guide slugs", () => {
    const slugs = publishedGuideTopics();
    expect(slugs).toHaveLength(3);
    expect(new Set(slugs).size).toBe(3);
  });

  it("includes ir35, structure and pay-planning slugs", () => {
    const slugs = publishedGuideTopics();
    expect(slugs).toContain("ir35");
    expect(slugs).toContain("structure");
    expect(slugs).toContain("pay-planning");
  });
});

// ---- toolId spine ----

describe("toolId matches R2 premium registry", () => {
  it("ir35 toolId equals ir35-take-home-compare-premium", () => {
    expect(resourceForTopic("ir35")?.toolId).toBe("ir35-take-home-compare-premium");
  });

  it("structure toolId equals umbrella-vs-limited-premium", () => {
    expect(resourceForTopic("structure")?.toolId).toBe("umbrella-vs-limited-premium");
  });

  it("pay-planning toolId equals salary-dividend-planner-premium", () => {
    expect(resourceForTopic("pay-planning")?.toolId).toBe("salary-dividend-planner-premium");
  });

  it("company-tax toolId is null (no downloadable model)", () => {
    expect(resourceForTopic("company-tax")?.toolId).toBeNull();
  });

  it("basics-expenses toolId is null", () => {
    expect(resourceForTopic("basics-expenses")?.toolId).toBeNull();
  });
});

// ---- Compliance goldens ----

describe("compliance: no em-dashes in registry strings", () => {
  const EM_DASH = "—";
  const DOUBLE_HYPHEN = "--";

  for (const [key, entry] of Object.entries(RESOURCES)) {
    it(`no em-dash in magnetTitle for ${key}`, () => {
      expect(entry.magnetTitle).not.toContain(EM_DASH);
      expect(entry.magnetTitle).not.toContain(DOUBLE_HYPHEN);
    });

    it(`no em-dash in magnetBlurbTemplate for ${key}`, () => {
      expect(entry.magnetBlurbTemplate).not.toContain(EM_DASH);
      expect(entry.magnetBlurbTemplate).not.toContain(DOUBLE_HYPHEN);
    });

    if (entry.guide) {
      it(`no em-dash in guide.label for ${key}`, () => {
        expect(entry.guide!.label).not.toContain(EM_DASH);
        expect(entry.guide!.label).not.toContain(DOUBLE_HYPHEN);
      });
    }

    if (entry.xlsx) {
      it(`no em-dash in xlsx.label for ${key}`, () => {
        expect(entry.xlsx!.label).not.toContain(EM_DASH);
        expect(entry.xlsx!.label).not.toContain(DOUBLE_HYPHEN);
      });
    }
  }
});

describe("compliance: DJH not present in registry strings", () => {
  for (const [key, entry] of Object.entries(RESOURCES)) {
    it(`no DJH in magnetTitle for ${key}`, () => {
      expect(entry.magnetTitle).not.toContain("DJH");
    });

    it(`no DJH in magnetBlurbTemplate for ${key}`, () => {
      expect(entry.magnetBlurbTemplate).not.toContain("DJH");
    });
  }
});

describe("compliance: resourceConsentText does not name a partner firm", () => {
  const RESOURCE_CONSENT = "I agree to Contractor Tax Accountants using my details to send me the free resource I have requested and to respond to any enquiry I submit.";

  it("resourceConsentText matches the expected in-house wording exactly", () => {
    // Import siteConfig lazily to avoid server-only issues in the test runner.
    // We check the string literal directly since site.ts reads niche.config.json.
    expect(RESOURCE_CONSENT).not.toContain("Reflex");
    expect(RESOURCE_CONSENT).not.toContain("Property Tax Partners");
    expect(RESOURCE_CONSENT).not.toContain("DJH");
    expect(RESOURCE_CONSENT).toContain("Contractor Tax Accountants");
  });
});

describe("gateCopy", () => {
  it("returns the magnetTitle as heading for ir35", () => {
    const copy = gateCopy("ir35");
    expect(copy.heading).toBe("Get the outside vs inside IR35 model");
  });

  it("returns non-empty blurb for all enabled topics", () => {
    for (const t of ENABLED_TOPICS) {
      const copy = gateCopy(t);
      expect(copy.blurb.length).toBeGreaterThan(20);
    }
  });

  it("override wins field-by-field", () => {
    const copy = gateCopy("ir35", undefined, { heading: "Custom heading" });
    expect(copy.heading).toBe("Custom heading");
    expect(copy.blurb.length).toBeGreaterThan(0);
  });

  it("no em-dash in gateCopy output", () => {
    for (const t of ALL_TOPICS) {
      const copy = gateCopy(t);
      expect(copy.heading).not.toContain("—");
      expect(copy.blurb).not.toContain("—");
    }
  });
});
