/**
 * Intent engine tests for Medical Accountants UK (Worker 2 deliverable).
 *
 * Covers:
 *  1. Taxonomy completeness: every tool slug maps to a topic; every distinct
 *     category slug found in Medical/web/content/blog frontmatter maps or is
 *     explicitly listed as absent (config "Consultant Tax" = 0 posts, absent).
 *  2. Case-insensitivity: multiple casing variants of the same category produce
 *     the same topic via slugifyCategory (validated at slug level).
 *  3. deriveTopic: flat blog hubs, calculator slugs, /for-* routes,
 *     /nhs-pension pillar, flat post slug path (returns null -- topic comes
 *     as a prop), excluded paths, unknown paths.
 *  4. topicFromCategory: the server-side resolver used for flat blog posts.
 *  5. Engine evaluate: key surface/context scenarios (topic_cta, escalation,
 *     deep_scroll, returning_bar, converted suppression).
 *  6. "Consultant Tax" explicitly absent: config category with 0 posts must
 *     NOT appear in the taxonomy.
 *
 * TL-03: pure Node.js module tests -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  getTopic,
  topicForBlogSlug,
  topicForCalcSlug,
} from "@/lib/intent/taxonomy";
import { deriveTopic, topicFromCategory } from "@/lib/intent/deriveTopic";
import { evaluate, type IntentContext } from "@/lib/intent/engine";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** slugifyCategory duplicated here to keep tests self-contained. */
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
 * The 8 real category slugs from Medical/web/content/blog frontmatter (73 posts).
 * "Consultant Tax" config category has 0 posts and is DELIBERATELY ABSENT --
 * see the explicit absent test below.
 *
 *   gp-practice-management             20 posts -> gp-practice
 *   gp-accountant-services             16 posts -> gp-practice
 *   gp-tax-and-accounts                16 posts -> gp-tax
 *   nhs-pension-planning                8 posts -> nhs-pension
 *   locum-tax                           6 posts -> locum
 *   incorporation-and-company-structures 4 posts -> incorporation-private
 *   private-practice                    2 posts -> incorporation-private
 *   medical-expenses                    1 post  -> gp-tax
 */
const ALL_CONTENT_CATEGORY_SLUGS = [
  "gp-practice-management",
  "gp-accountant-services",
  "gp-tax-and-accounts",
  "nhs-pension-planning",
  "locum-tax",
  "incorporation-and-company-structures",
  "private-practice",
  "medical-expenses",
] as const;

/** Tool slugs from registry.ts (all 3). */
const ALL_TOOL_SLUGS = [
  "nhs-pension-annual-allowance",
  "locum-tax-calculator",
  "private-practice-incorporation",
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

  it("taxonomy covers exactly 5 topics", () => {
    expect(TOPICS).toHaveLength(5);
  });

  // ── 6. "Consultant Tax" EXPLICITLY ABSENT ──────────────────────────────────
  it("'Consultant Tax' (config category, 0 posts) is deliberately absent from taxonomy", () => {
    // This config category has 0 posts and must NOT appear in any topic's
    // blogCategorySlugs. The slug is "consultant-tax".
    const consultantTaxSlug = "consultant-tax";
    expect(topicForBlogSlug(consultantTaxSlug)).toBeNull();
    // Also confirm no TOPICS entry claims it
    const allCatSlugs = TOPICS.flatMap((t) => t.blogCategorySlugs);
    expect(allCatSlugs).not.toContain(consultantTaxSlug);
  });
});

// ── 2. Case-insensitivity ────────────────────────────────────────────────────

describe("case-insensitivity via slugifyCategory", () => {
  const caseVariants: Array<[string, string]> = [
    ["GP Practice Management", "gp-practice-management"],
    ["Gp Practice Management", "gp-practice-management"],
    ["gp practice management", "gp-practice-management"],
    ["GP Accountant Services", "gp-accountant-services"],
    ["GP Tax and Accounts", "gp-tax-and-accounts"],
    ["NHS Pension Planning", "nhs-pension-planning"],
    ["Locum Tax", "locum-tax"],
    ["Incorporation and Company Structures", "incorporation-and-company-structures"],
    ["Private Practice", "private-practice"],
    ["Medical Expenses", "medical-expenses"],
  ];

  it.each(caseVariants)(
    "slugify('%s') === '%s'",
    (input, expected) => {
      expect(slugify(input)).toBe(expected);
    },
  );

  it("slugified variants of 'GP Practice Management' all resolve to the same topic", () => {
    const variants = ["GP Practice Management", "Gp Practice Management", "gp practice management"];
    const topics = variants.map((v) => topicForBlogSlug(slugify(v)));
    expect(new Set(topics).size).toBe(1);
    expect(topics[0]).toBe("gp-practice");
  });

  it("slugified variants of 'Locum Tax' all resolve to the same topic", () => {
    const variants = ["Locum Tax", "Locum tax", "locum tax"];
    const topics = variants.map((v) => topicForBlogSlug(slugify(v)));
    expect(new Set(topics).size).toBe(1);
    expect(topics[0]).toBe("locum");
  });
});

// ── 3. deriveTopic (URL-based) ────────────────────────────────────────────────

describe("deriveTopic -- static hub paths", () => {
  it("/blog/gp-practice-management -> 'gp-practice'", () => {
    expect(deriveTopic("/blog/gp-practice-management")).toBe("gp-practice");
  });

  it("/blog/gp-accountant-services -> 'gp-practice'", () => {
    expect(deriveTopic("/blog/gp-accountant-services")).toBe("gp-practice");
  });

  it("/blog/gp-tax-and-accounts -> 'gp-tax'", () => {
    expect(deriveTopic("/blog/gp-tax-and-accounts")).toBe("gp-tax");
  });

  it("/blog/medical-expenses -> 'gp-tax'", () => {
    expect(deriveTopic("/blog/medical-expenses")).toBe("gp-tax");
  });

  it("/blog/nhs-pension-planning -> 'nhs-pension'", () => {
    expect(deriveTopic("/blog/nhs-pension-planning")).toBe("nhs-pension");
  });

  it("/blog/locum-tax -> 'locum'", () => {
    expect(deriveTopic("/blog/locum-tax")).toBe("locum");
  });

  it("/blog/incorporation-and-company-structures -> 'incorporation-private'", () => {
    expect(deriveTopic("/blog/incorporation-and-company-structures")).toBe("incorporation-private");
  });

  it("/blog/private-practice -> 'incorporation-private'", () => {
    expect(deriveTopic("/blog/private-practice")).toBe("incorporation-private");
  });
});

describe("deriveTopic -- flat post paths return null (topic comes as prop)", () => {
  it("/blog/some-flat-post-slug -> null (not a hub slug)", () => {
    // Flat blog post paths use /blog/[slug] where [slug] is the post slug,
    // not a category slug. Since post slugs are not in BLOG_HUB_SLUG_TO_TOPIC,
    // deriveTopic returns null and the topic is injected via TopicOverrideProvider.
    expect(deriveTopic("/blog/gp-tax-planning-2026")).toBeNull();
    expect(deriveTopic("/blog/nhs-pension-tapered-allowance")).toBeNull();
    expect(deriveTopic("/blog/locum-expenses-guide")).toBeNull();
  });

  it("/blog with no further segment -> null", () => {
    expect(deriveTopic("/blog")).toBeNull();
  });
});

describe("deriveTopic -- calculators and embed", () => {
  it("/calculators/nhs-pension-annual-allowance -> 'nhs-pension'", () => {
    expect(deriveTopic("/calculators/nhs-pension-annual-allowance")).toBe("nhs-pension");
  });

  it("/calculators/locum-tax-calculator -> 'locum'", () => {
    expect(deriveTopic("/calculators/locum-tax-calculator")).toBe("locum");
  });

  it("/calculators/private-practice-incorporation -> 'incorporation-private'", () => {
    expect(deriveTopic("/calculators/private-practice-incorporation")).toBe("incorporation-private");
  });

  it("/embed/nhs-pension-annual-allowance -> 'nhs-pension'", () => {
    expect(deriveTopic("/embed/nhs-pension-annual-allowance")).toBe("nhs-pension");
  });

  it("/embed/locum-tax-calculator -> 'locum'", () => {
    expect(deriveTopic("/embed/locum-tax-calculator")).toBe("locum");
  });

  it("/calculators/unknown-tool -> null", () => {
    expect(deriveTopic("/calculators/unknown-tool")).toBeNull();
  });
});

describe("deriveTopic -- /for-* routes", () => {
  it("/for-gps -> 'gp-practice'", () => {
    expect(deriveTopic("/for-gps")).toBe("gp-practice");
  });

  it("/for-consultants -> 'gp-tax'", () => {
    expect(deriveTopic("/for-consultants")).toBe("gp-tax");
  });

  it("/for-locum-doctors -> 'locum'", () => {
    expect(deriveTopic("/for-locum-doctors")).toBe("locum");
  });

  it("/for-junior-doctors -> 'gp-tax'", () => {
    expect(deriveTopic("/for-junior-doctors")).toBe("gp-tax");
  });
});

describe("deriveTopic -- /nhs-pension pillar", () => {
  it("/nhs-pension -> 'nhs-pension'", () => {
    expect(deriveTopic("/nhs-pension")).toBe("nhs-pension");
  });
});

describe("deriveTopic -- excluded and unknown paths", () => {
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
    expect(deriveTopic("/blog/gp-practice-management/")).toBe("gp-practice");
    expect(deriveTopic("/for-gps/")).toBe("gp-practice");
    expect(deriveTopic("/nhs-pension/")).toBe("nhs-pension");
  });

  it("query strings are stripped", () => {
    expect(deriveTopic("/blog/nhs-pension-planning?utm_source=email")).toBe("nhs-pension");
  });

  it("hash fragments are stripped", () => {
    expect(deriveTopic("/blog/locum-tax#section")).toBe("locum");
  });
});

// ── 4. topicFromCategory (server-side flat-post resolver) ──────────────────

describe("topicFromCategory -- server-side category resolver for flat posts", () => {
  it("'GP Practice Management' -> 'gp-practice'", () => {
    expect(topicFromCategory("GP Practice Management")).toBe("gp-practice");
  });

  it("'gp-practice-management' (already slugified) -> 'gp-practice'", () => {
    // Handles both slugified and human-readable forms
    expect(topicFromCategory("gp-practice-management")).toBe("gp-practice");
  });

  it("'GP Accountant Services' -> 'gp-practice'", () => {
    expect(topicFromCategory("GP Accountant Services")).toBe("gp-practice");
  });

  it("'GP Tax and Accounts' -> 'gp-tax'", () => {
    expect(topicFromCategory("GP Tax and Accounts")).toBe("gp-tax");
  });

  it("'Medical Expenses' -> 'gp-tax'", () => {
    expect(topicFromCategory("Medical Expenses")).toBe("gp-tax");
  });

  it("'NHS Pension Planning' -> 'nhs-pension'", () => {
    expect(topicFromCategory("NHS Pension Planning")).toBe("nhs-pension");
  });

  it("'Locum Tax' -> 'locum'", () => {
    expect(topicFromCategory("Locum Tax")).toBe("locum");
  });

  it("'Incorporation and Company Structures' -> 'incorporation-private'", () => {
    expect(topicFromCategory("Incorporation and Company Structures")).toBe("incorporation-private");
  });

  it("'Private Practice' -> 'incorporation-private'", () => {
    expect(topicFromCategory("Private Practice")).toBe("incorporation-private");
  });

  it("'Consultant Tax' (0 posts, absent) -> null", () => {
    expect(topicFromCategory("Consultant Tax")).toBeNull();
  });

  it("unknown category -> null", () => {
    expect(topicFromCategory("Some Unknown Category")).toBeNull();
  });

  it("empty string -> null", () => {
    expect(topicFromCategory("")).toBeNull();
  });
});

// ── 5. Engine evaluate ───────────────────────────────────────────────────────

describe("evaluate: sticky_cta", () => {
  it("returns null when converted", () => {
    const ctx = { ...baseCtx, pageTopic: "locum" as const, converted: true };
    expect(evaluate("sticky_cta", ctx)).toBeNull();
  });

  it("returns null when no topic", () => {
    const ctx = { ...baseCtx, pageTopic: null, entryTopic: null };
    expect(evaluate("sticky_cta", ctx)).toBeNull();
  });

  it("returns a topic_cta action for light browser with topic (locum has calculator)", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "locum" as const,
      scrollPct: 10,
      engagedMs: 5000,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("locum");
    expect(action!.ruleId).toBe("topic_cta");
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("/calculators/");
  });

  it("escalates to specialist when deeply engaged", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "nhs-pension" as const,
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
      entryTopic: "incorporation-private" as const,
    };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("incorporation-private");
  });

  it("gp-practice (no calculator) falls back to specialist offer", () => {
    const ctx = { ...baseCtx, pageTopic: "gp-practice" as const, scrollPct: 10, engagedMs: 1000 };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    // gp-practice has no primaryCalculator, so offer falls back to specialist/review
    expect(action!.offer.href).toBe("/contact");
  });
});

describe("evaluate: deep_scroll_modal", () => {
  it("returns null below scroll threshold", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs-pension" as const, scrollPct: 50 };
    expect(evaluate("deep_scroll_modal", ctx)).toBeNull();
  });

  it("returns action above scroll threshold with topic", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs-pension" as const, scrollPct: 75 };
    const action = evaluate("deep_scroll_modal", ctx);
    expect(action).not.toBeNull();
    expect(action!.surface).toBe("deep_scroll_modal");
    expect(action!.topic).toBe("nhs-pension");
  });

  it("returns null when converted", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "locum" as const,
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
      lastTopic: "locum" as const,
    };
    expect(evaluate("returning_bar", ctx)).toBeNull();
  });

  it("returns null when converted", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: true,
      lastTopic: "locum" as const,
    };
    expect(evaluate("returning_bar", ctx)).toBeNull();
  });

  it("returns action for returning unconverted with lastTopic", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: false,
      lastTopic: "incorporation-private" as const,
    };
    const action = evaluate("returning_bar", ctx);
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("returning_welcome");
    expect(action!.topic).toBe("incorporation-private");
  });

  it("falls back to entryTopic when lastTopic is null", () => {
    const ctx = {
      ...baseCtx,
      returning: true,
      converted: false,
      lastTopic: null,
      entryTopic: "nhs-pension" as const,
    };
    const action = evaluate("returning_bar", ctx);
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("nhs-pension");
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

  it("returns action with pageTopic (gp-practice, no calc -> specialist)", () => {
    const ctx = { ...baseCtx, pageTopic: "gp-practice" as const };
    const action = evaluate("next_step", ctx);
    expect(action).not.toBeNull();
    expect(action!.surface).toBe("next_step");
    expect(action!.topic).toBe("gp-practice");
    // gp-practice has no primaryCalculator, so offer falls back to specialist/review
    expect(["specialist", "guide"]).toContain(action!.offer.kind);
  });

  it("returns tool offer for locum (has calculator)", () => {
    const ctx = { ...baseCtx, pageTopic: "locum" as const };
    const action = evaluate("next_step", ctx);
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("locum-tax-calculator");
  });
});

describe("evaluate: offer escalation ladder", () => {
  it("light browser gets tool offer when topic has calculator", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs-pension" as const, scrollPct: 10, engagedMs: 1000 };
    const action = evaluate("sticky_cta", ctx);
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("/calculators/");
  });

  it("gp-practice topic (no calculator) falls back to specialist even for light browser", () => {
    const ctx = { ...baseCtx, pageTopic: "gp-practice" as const, scrollPct: 10, engagedMs: 1000 };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.offer.href).toBe("/contact");
  });

  it("engaged reader gets review offer", () => {
    const ctx = {
      ...baseCtx,
      pageTopic: "locum" as const,
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
    const ctx = { ...baseCtx, pageTopic: "nhs-pension" as const };
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

  it("incorporation-private topic resolves correct calculator slug", () => {
    const ctx = { ...baseCtx, pageTopic: "incorporation-private" as const };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.calculatorSlug).toBe("private-practice-incorporation");
  });

  it("nhs-pension topic resolves correct calculator slug", () => {
    const ctx = { ...baseCtx, pageTopic: "nhs-pension" as const };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.calculatorSlug).toBe("nhs-pension-annual-allowance");
  });

  it("locum topic resolves correct calculator slug", () => {
    const ctx = { ...baseCtx, pageTopic: "locum" as const };
    const action = evaluate("sticky_cta", ctx);
    expect(action).not.toBeNull();
    expect(action!.calculatorSlug).toBe("locum-tax-calculator");
  });

  it("no em-dashes in any ctaCopy or offer copy", () => {
    for (const t of TOPICS) {
      expect(t.ctaCopy).not.toContain("—");
      expect(t.ctaCopy).not.toContain("--");
    }
    // Spot-check engine outputs
    const surfaces = ["sticky_cta", "next_step", "deep_scroll_modal"] as const;
    const topics = ["gp-practice", "locum", "nhs-pension", "incorporation-private"] as const;
    for (const surface of surfaces) {
      for (const pageTopic of topics) {
        const ctx = { ...baseCtx, pageTopic, scrollPct: 75 };
        const action = evaluate(surface, ctx);
        if (action) {
          expect(action.offer.title).not.toContain("—");
          expect(action.offer.blurb).not.toContain("—");
          expect(action.ctaCopy).not.toContain("—");
        }
      }
    }
  });
});
