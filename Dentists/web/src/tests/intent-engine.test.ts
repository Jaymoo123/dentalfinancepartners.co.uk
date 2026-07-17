/**
 * Intent engine tests for Dental Finance Partners (Worker 2 deliverable).
 *
 * Covers:
 *  1. Taxonomy completeness: every tool slug maps to a topic; every distinct
 *     category slug found in Dentists/web/content maps or is explicitly absent.
 *  2. Case-insensitivity: multiple casing variants of the same category slug
 *     produce the same topic (validated at the slug level, not string compare).
 *  3. deriveTopic: blog categories, calculator slugs, /for-* routes, excluded
 *     paths, unknown paths.
 *  4. Engine evaluate: key surface/context scenarios (topic_cta, escalation,
 *     deep_scroll, returning_bar, converted suppression).
 *
 * TL-03: pure Node.js module tests -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import { TOPICS, CALC_SLUG_TO_TOPIC, getTopic, topicForBlogSlug, topicForCalcSlug } from "@/lib/intent/taxonomy";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { evaluate, type IntentContext } from "@/lib/intent/engine";

// ── Helpers ─────────────────────────────────────────────────────────────────

/** The slugifyCategory function duplicated here to keep tests self-contained. */
function slugify(cat: string): string {
  return cat
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

const baseCtx: IntentContext = {
  pageTopic: null,
  entryTopic: null,
  lastTopic: null,
  returning: false,
  converted: false,
  scrollPct: 0,
  engagedMs: 0,
  isMobile: false,
};

// ── 1. Taxonomy completeness ─────────────────────────────────────────────────

/**
 * Every category slug found in Dentists/web/content/blog frontmatter must
 * either map to a topic OR be explicitly listed as unmapped here. Case
 * variants merge at slug level, so "Associate Tax" and "Associate tax" both
 * produce "associate-tax" and are counted once.
 *
 * The 12 distinct slugs from the audit:
 *   associate-tax, locum-tax, practice-accounting, practice-finance,
 *   capital-allowances-and-equipment, buying-a-practice,
 *   goodwill-and-practice-sale, nhs-contracts, nhs-pension,
 *   vat-and-compliance, general, specialist-services
 */
const ALL_CONTENT_CATEGORY_SLUGS = [
  // associate-related
  "associate-tax",
  "locum-tax",
  "associate-incorporation",
  // principal-related
  "practice-accounting",
  "practice-finance",
  "capital-allowances-and-equipment",
  // practice transactions
  "buying-a-practice",
  "goodwill-and-practice-sale",
  // NHS
  "nhs-contracts",
  "nhs-pension",
  // compliance / catch-all
  "vat-and-compliance",
  "general",
  "specialist-services",
] as const;

/** Tool slugs from registry.ts (all 5). */
const ALL_TOOL_SLUGS = [
  "uda-value",
  "associate-take-home",
  "practice-valuation",
  "locum-structure",
  "principal-extraction",
] as const;

describe("taxonomy completeness", () => {
  it("every content category slug maps to a topic", () => {
    for (const slug of ALL_CONTENT_CATEGORY_SLUGS) {
      const topic = topicForBlogSlug(slug);
      expect(topic, `category slug "${slug}" has no topic mapping`).not.toBeNull();
    }
  });

  it("every tool slug maps to a topic via CALC_SLUG_TO_TOPIC", () => {
    for (const slug of ALL_TOOL_SLUGS) {
      expect(
        CALC_SLUG_TO_TOPIC[slug],
        `tool slug "${slug}" has no CALC_SLUG_TO_TOPIC entry`,
      ).toBeDefined();
    }
  });

  it("every tool slug topicForCalcSlug matches CALC_SLUG_TO_TOPIC", () => {
    for (const slug of ALL_TOOL_SLUGS) {
      expect(topicForCalcSlug(slug)).toBe(CALC_SLUG_TO_TOPIC[slug]);
    }
  });

  it("every CALC_SLUG_TO_TOPIC value resolves to a real topic via getTopic", () => {
    for (const [slug, topicKey] of Object.entries(CALC_SLUG_TO_TOPIC)) {
      const topic = getTopic(topicKey);
      expect(topic, `CALC_SLUG_TO_TOPIC["${slug}"] -> "${topicKey}" not in TOPICS`).not.toBeNull();
    }
  });

  it("all TOPICS have a valid key and label", () => {
    for (const t of TOPICS) {
      expect(t.key.length).toBeGreaterThan(0);
      expect(t.label.length).toBeGreaterThan(0);
    }
  });

  it("all TOPICS blogCategorySlugs are non-empty strings", () => {
    for (const t of TOPICS) {
      expect(Array.isArray(t.blogCategorySlugs)).toBe(true);
      expect(t.blogCategorySlugs.length).toBeGreaterThan(0);
      for (const s of t.blogCategorySlugs) {
        expect(typeof s).toBe("string");
        expect(s.length).toBeGreaterThan(0);
      }
    }
  });

  it("no two TOPICS share the same blogCategorySlug", () => {
    const seen = new Set<string>();
    for (const t of TOPICS) {
      for (const s of t.blogCategorySlugs) {
        expect(seen.has(s), `"${s}" appears in multiple topics`).toBe(false);
        seen.add(s);
      }
    }
  });
});

// ── 2. Case-insensitivity ────────────────────────────────────────────────────

describe("case-insensitivity via slugifyCategory", () => {
  const caseVariants: Array<[string, string]> = [
    ["Associate Tax", "associate-tax"],
    ["Associate tax", "associate-tax"],
    ["associate tax", "associate-tax"],
    ["Practice Accounting", "practice-accounting"],
    ["Practice accounting", "practice-accounting"],
    ["practice accounting", "practice-accounting"],
    ["Practice Finance", "practice-finance"],
    ["Practice finance", "practice-finance"],
    ["Capital Allowances & Equipment", "capital-allowances-and-equipment"],
    ["Buying a Practice", "buying-a-practice"],
    ["Buying a practice", "buying-a-practice"],
    ["NHS Contracts", "nhs-contracts"],
    ["NHS Pension", "nhs-pension"],
    ["VAT & Compliance", "vat-and-compliance"],
    ["VAT & compliance", "vat-and-compliance"],
    ["Goodwill & Practice Sale", "goodwill-and-practice-sale"],
    ["Locum Tax", "locum-tax"],
    ["Specialist Services", "specialist-services"],
    ["General", "general"],
  ];

  it.each(caseVariants)(
    "slugify('%s') === '%s'",
    (input, expected) => {
      expect(slugify(input)).toBe(expected);
    },
  );

  it("slugified variants of 'Associate Tax' all resolve to the same topic", () => {
    const variants = ["Associate Tax", "Associate tax", "associate tax"];
    const topics = variants.map((v) => topicForBlogSlug(slugify(v)));
    expect(new Set(topics).size).toBe(1);
    expect(topics[0]).toBe("associate");
  });

  it("slugified variants of 'Practice Accounting' all resolve to the same topic", () => {
    const variants = ["Practice Accounting", "Practice accounting", "practice accounting"];
    const topics = variants.map((v) => topicForBlogSlug(slugify(v)));
    expect(new Set(topics).size).toBe(1);
    expect(topics[0]).toBe("principal");
  });
});

// ── 3. deriveTopic ───────────────────────────────────────────────────────────

describe("deriveTopic", () => {
  it("blog/associate-tax/some-slug -> 'associate'", () => {
    expect(deriveTopic("/blog/associate-tax/some-slug")).toBe("associate");
  });

  it("blog/locum-tax/some-slug -> 'associate'", () => {
    expect(deriveTopic("/blog/locum-tax/some-slug")).toBe("associate");
  });

  it("blog/practice-accounting/some-slug -> 'principal'", () => {
    expect(deriveTopic("/blog/practice-accounting/some-slug")).toBe("principal");
  });

  it("blog/practice-finance/some-slug -> 'principal'", () => {
    expect(deriveTopic("/blog/practice-finance/some-slug")).toBe("principal");
  });

  it("blog/capital-allowances-and-equipment/some-slug -> 'principal'", () => {
    expect(deriveTopic("/blog/capital-allowances-and-equipment/some-slug")).toBe("principal");
  });

  it("blog/buying-a-practice/some-slug -> 'buying'", () => {
    expect(deriveTopic("/blog/buying-a-practice/some-slug")).toBe("buying");
  });

  it("blog/goodwill-and-practice-sale/some-slug -> 'selling'", () => {
    expect(deriveTopic("/blog/goodwill-and-practice-sale/some-slug")).toBe("selling");
  });

  it("blog/nhs-contracts/some-slug -> 'nhs'", () => {
    expect(deriveTopic("/blog/nhs-contracts/some-slug")).toBe("nhs");
  });

  it("blog/nhs-pension/some-slug -> 'nhs'", () => {
    expect(deriveTopic("/blog/nhs-pension/some-slug")).toBe("nhs");
  });

  it("blog/vat-and-compliance/some-slug -> 'compliance'", () => {
    expect(deriveTopic("/blog/vat-and-compliance/some-slug")).toBe("compliance");
  });

  it("blog/general/some-slug -> 'compliance'", () => {
    expect(deriveTopic("/blog/general/some-slug")).toBe("compliance");
  });

  it("blog/specialist-services/some-slug -> 'compliance'", () => {
    expect(deriveTopic("/blog/specialist-services/some-slug")).toBe("compliance");
  });

  it("blog/unknown-category/slug -> null (unmapped category)", () => {
    expect(deriveTopic("/blog/unknown-category/slug")).toBeNull();
  });

  it("calculators/uda-value -> 'nhs'", () => {
    expect(deriveTopic("/calculators/uda-value")).toBe("nhs");
  });

  it("calculators/associate-take-home -> 'associate'", () => {
    expect(deriveTopic("/calculators/associate-take-home")).toBe("associate");
  });

  it("calculators/practice-valuation -> 'buying'", () => {
    expect(deriveTopic("/calculators/practice-valuation")).toBe("buying");
  });

  it("calculators/locum-structure -> 'associate'", () => {
    expect(deriveTopic("/calculators/locum-structure")).toBe("associate");
  });

  it("calculators/principal-extraction -> 'principal'", () => {
    expect(deriveTopic("/calculators/principal-extraction")).toBe("principal");
  });

  it("embed/uda-value -> 'nhs' (embed mirrors calculators)", () => {
    expect(deriveTopic("/embed/uda-value")).toBe("nhs");
  });

  it("/for-associates -> 'associate'", () => {
    expect(deriveTopic("/for-associates")).toBe("associate");
  });

  it("/for-locum-dentists -> 'associate'", () => {
    expect(deriveTopic("/for-locum-dentists")).toBe("associate");
  });

  it("/for-principals -> 'principal'", () => {
    expect(deriveTopic("/for-principals")).toBe("principal");
  });

  it("/for-practice-buyers -> 'buying'", () => {
    expect(deriveTopic("/for-practice-buyers")).toBe("buying");
  });

  it("homepage -> null", () => {
    expect(deriveTopic("/")).toBeNull();
  });

  it("/contact -> null", () => {
    expect(deriveTopic("/contact")).toBeNull();
  });

  it("/admin/analytics -> null", () => {
    expect(deriveTopic("/admin/analytics")).toBeNull();
  });

  it("empty string -> null", () => {
    expect(deriveTopic("")).toBeNull();
  });

  it("trailing slashes are stripped", () => {
    expect(deriveTopic("/blog/associate-tax/")).toBe("associate");
    expect(deriveTopic("/for-associates/")).toBe("associate");
  });

  it("query strings are stripped", () => {
    expect(deriveTopic("/blog/nhs-pension/slug?utm_source=email")).toBe("nhs");
  });

  it("hash fragments are stripped", () => {
    expect(deriveTopic("/blog/buying-a-practice/slug#section")).toBe("buying");
  });
});

// ── 4. Engine evaluate ───────────────────────────────────────────────────────

describe("evaluate: sticky_cta", () => {
  it("returns null when converted", () => {
    const ctx = { ...baseCtx, pageTopic: "associate" as const, converted: true };
    expect(evaluate("sticky_cta", ctx)).toBeNull();
  });

  it("returns null when no topic", () => {
    const ctx = { ...baseCtx, pageTopic: null, entryTopic: null };
    expect(evaluate("sticky_cta", ctx)).toBeNull();
  });

  it("returns a topic_cta action for light browser with topic", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "associate" as const,
      scrollPct: 10,
      engagedMs: 5000,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("associate");
    expect(action!.ruleId).toBe("topic_cta");
    expect(action!.offer.kind).toBe("tool");
  });

  it("escalates to specialist when deeply engaged", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "principal" as const,
      scrollPct: 75,
      engagedMs: 95_000,
      converted: false,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("escalate_specialist");
    expect(action!.offer.kind).toBe("specialist");
    expect(action!.variant).toBe("escalate");
  });

  it("uses entryTopic when pageTopic is null", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: null,
      entryTopic: "buying" as const,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("buying");
  });
});

describe("evaluate: deep_scroll_modal", () => {
  it("returns null below scroll threshold", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs" as const, scrollPct: 50 };
    expect(evaluate("deep_scroll_modal", ctx)).toBeNull();
  });

  it("returns action above scroll threshold with topic", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs" as const, scrollPct: 75 };
    const action = evaluate("deep_scroll_modal", ctx);
    expect(action).not.toBeNull();
    expect(action!.surface).toBe("deep_scroll_modal");
    expect(action!.topic).toBe("nhs");
  });

  it("returns null when converted", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "nhs" as const,
      scrollPct: 80,
      converted: true,
    };
    expect(evaluate("deep_scroll_modal", ctx)).toBeNull();
  });

  it("returns null when no pageTopic even above threshold", () => {
    const ctx = { ...baseCtx, pageTopic: null, scrollPct: 80 };
    expect(evaluate("deep_scroll_modal", ctx)).toBeNull();
  });
});

describe("evaluate: returning_bar", () => {
  it("returns null when not returning", () => {
    const ctx = {
      ...baseCtx,
      returning: false,
      lastTopic: "associate" as const,
    };
    expect(evaluate("returning_bar", ctx)).toBeNull();
  });

  it("returns null when converted", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: true,
      lastTopic: "associate" as const,
    };
    expect(evaluate("returning_bar", ctx)).toBeNull();
  });

  it("returns action for returning unconverted with lastTopic", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: false,
      lastTopic: "selling" as const,
    };
    const action = evaluate("returning_bar", ctx);
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("returning_welcome");
    expect(action!.topic).toBe("selling");
  });

  it("falls back to entryTopic when lastTopic is null", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: false,
      lastTopic: null,
      entryTopic: "buying" as const,
    };
    const action = evaluate("returning_bar", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("buying");
  });

  it("returns null when returning but no topic context", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      lastTopic: null,
      entryTopic: null,
    };
    expect(evaluate("returning_bar", ctx)).toBeNull();
  });
});

describe("evaluate: next_step", () => {
  it("returns null when no pageTopic", () => {
    expect(evaluate("next_step", baseCtx)).toBeNull();
  });

  it("returns action with pageTopic", () => {
    const ctx = { ...baseCtx, pageTopic: "compliance" as const };
    const action = evaluate("next_step", ctx);
    expect(action).not.toBeNull();
    expect(action!.surface).toBe("next_step");
    expect(action!.topic).toBe("compliance");
    // compliance has no primary calculator, so offer falls back to specialist/review
    expect(["specialist", "guide"]).toContain(action!.offer.kind);
  });
});

describe("evaluate: offer escalation ladder", () => {
  it("light browser gets tool offer when topic has calculator", () => {
    const ctx = { ...baseCtx, pageTopic: "associate" as const, scrollPct: 10, engagedMs: 1000 };
    const action = evaluate("sticky_cta", ctx);
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("/calculators/");
  });

  it("compliance topic (no calculator) falls back to specialist even for light browser", () => {
    const ctx = { ...baseCtx, pageTopic: "compliance" as const, scrollPct: 10, engagedMs: 1000 };
    const action = evaluate("sticky_cta", ctx);
    // compliance has no primaryCalculator so tool offer is null -> falls to specialist/review
    expect(action).not.toBeNull();
    expect(action!.offer.href).toBe("/contact");
  });

  it("engaged reader gets review offer", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "principal" as const,
      scrollPct: 65,
      engagedMs: 20_000,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action!.offer.kind).toBe("specialist");
    expect(action!.offer.href).toBe("/contact");
  });
});

describe("evaluate: action shape", () => {
  it("all fields are present and typed correctly", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs" as const };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(typeof action!.ruleId).toBe("string");
    expect(typeof action!.topic).toBe("string");
    expect(typeof action!.label).toBe("string");
    expect(typeof action!.ctaCopy).toBe("string");
    expect(typeof action!.variant).toBe("string");
    expect(typeof action!.offer.title).toBe("string");
    expect(typeof action!.offer.blurb).toBe("string");
    expect(typeof action!.offer.href).toBe("string");
    expect(typeof action!.offer.reason).toBe("string");
    expect(["tool", "guide", "specialist"]).toContain(action!.offer.kind);
  });
});
