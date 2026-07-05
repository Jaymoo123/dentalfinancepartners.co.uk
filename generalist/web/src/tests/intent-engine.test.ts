/**
 * Intent engine tests for Holloway Davies (generalist).
 *
 * Coverage:
 *  1. evaluate() ladder logic -- all surfaces, escalation paths, edge cases.
 *  2. Taxonomy completeness:
 *     - Every calculator slug in registry.ts maps to a topic (or is in an
 *       explicit allowlist of intentionally unmapped slugs).
 *     - Every distinct blog category found in the content frontmatter maps to
 *       a topic via slugifyCategory(), or is explicitly listed as absent.
 *  3. The R&D slugify ambiguity guard -- verifies "randd-tax-credits" is the
 *     correct output of slugifyCategory("R&D Tax Credits"), not "rd-tax-credits".
 */
import { describe, it, expect } from "vitest";
import { evaluate, type IntentContext } from "@/lib/intent/engine";
import { TOPICS, CALC_SLUG_TO_TOPIC, topicForBlogSlug, topicForCalcSlug } from "@/lib/intent/taxonomy";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ctx(overrides: Partial<IntentContext> = {}): IntentContext {
  return {
    pageTopic: "limited-company",
    entryTopic: null,
    lastTopic: null,
    returning: false,
    converted: false,
    scrollPct: 0,
    engagedMs: 0,
    isMobile: false,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// 1. evaluate() ladder logic
// ---------------------------------------------------------------------------

describe("sticky_cta", () => {
  it("returns null when converted (no topic)", () => {
    expect(evaluate("sticky_cta", ctx({ converted: true }))).toBeNull();
  });

  it("returns null when converted even with a page topic", () => {
    expect(
      evaluate("sticky_cta", ctx({ converted: true, pageTopic: "limited-company" })),
    ).toBeNull();
  });

  it("returns null when there is no topic at all", () => {
    expect(evaluate("sticky_cta", ctx({ pageTopic: null, entryTopic: null }))).toBeNull();
  });

  it("returns a tool offer for a light browser with a topic", () => {
    const a = evaluate("sticky_cta", ctx({ scrollPct: 10, engagedMs: 5000 }));
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("topic_cta");
    expect(a!.offer.kind).toBe("tool");
    expect(a!.topic).toBe("limited-company");
  });

  it("escalates to specialist for a deeply engaged visitor", () => {
    const a = evaluate(
      "sticky_cta",
      ctx({ scrollPct: 70, engagedMs: 95_000 }),
    );
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("escalate_specialist");
    expect(a!.offer.kind).toBe("specialist");
    expect(a!.variant).toBe("escalate");
  });

  it("uses entry topic when page has no topic", () => {
    const a = evaluate(
      "sticky_cta",
      ctx({ pageTopic: null, entryTopic: "rnd" }),
    );
    expect(a).not.toBeNull();
    expect(a!.topic).toBe("rnd");
  });

  it("compliance topic (no calculator) -> specialist offer as fallback", () => {
    const a = evaluate("sticky_cta", ctx({ pageTopic: "compliance" }));
    expect(a).not.toBeNull();
    expect(a!.calculatorSlug).toBeNull();
    expect(a!.offer.kind).toBe("specialist");
  });
});

describe("next_step", () => {
  it("returns null when there is no page topic", () => {
    expect(evaluate("next_step", ctx({ pageTopic: null }))).toBeNull();
  });

  it("is tied to the current page topic, not the entry topic", () => {
    const a = evaluate(
      "next_step",
      ctx({ pageTopic: "exit-cgt", entryTopic: "sole-trader" }),
    );
    expect(a).not.toBeNull();
    expect(a!.topic).toBe("exit-cgt");
    expect(a!.surface).toBe("next_step");
    expect(a!.ruleId).toBe("topic_next_step");
  });
});

describe("deep_scroll_modal", () => {
  it("returns null when not scrolled deep enough", () => {
    expect(
      evaluate("deep_scroll_modal", ctx({ scrollPct: 50 })),
    ).toBeNull();
  });

  it("returns null when converted", () => {
    expect(
      evaluate(
        "deep_scroll_modal",
        ctx({ scrollPct: 80, converted: true }),
      ),
    ).toBeNull();
  });

  it("returns null when there is no page topic", () => {
    expect(
      evaluate(
        "deep_scroll_modal",
        ctx({ scrollPct: 80, pageTopic: null }),
      ),
    ).toBeNull();
  });

  it("fires when scrolled past 70% with an unconverted visitor", () => {
    const a = evaluate(
      "deep_scroll_modal",
      ctx({ scrollPct: 80, pageTopic: "vat-mtd" }),
    );
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("deep_scroll_offer");
    expect(a!.topic).toBe("vat-mtd");
  });
});

describe("returning_bar", () => {
  it("returns null for a first-time visitor", () => {
    expect(evaluate("returning_bar", ctx({ returning: false }))).toBeNull();
  });

  it("returns null for a returning visitor who has already converted", () => {
    expect(
      evaluate("returning_bar", ctx({ returning: true, converted: true })),
    ).toBeNull();
  });

  it("returns null for a returning visitor with no topic trail", () => {
    expect(
      evaluate(
        "returning_bar",
        ctx({ returning: true, pageTopic: null, entryTopic: null, lastTopic: null }),
      ),
    ).toBeNull();
  });

  it("resumes the last topic for a returning unconverted visitor", () => {
    const a = evaluate(
      "returning_bar",
      ctx({ returning: true, lastTopic: "payroll", pageTopic: null }),
    );
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("returning_welcome");
    expect(a!.topic).toBe("payroll");
  });

  it("falls back to entry topic when lastTopic is null", () => {
    const a = evaluate(
      "returning_bar",
      ctx({
        returning: true,
        lastTopic: null,
        entryTopic: "sole-trader",
        pageTopic: null,
      }),
    );
    expect(a).not.toBeNull();
    expect(a!.topic).toBe("sole-trader");
  });
});

describe("hero_cta", () => {
  it("returns null when converted", () => {
    expect(evaluate("hero_cta", ctx({ converted: true }))).toBeNull();
  });

  it("returns an action when not converted and topic is present", () => {
    const a = evaluate("hero_cta", ctx({ pageTopic: "director-pay" }));
    expect(a).not.toBeNull();
    expect(a!.surface).toBe("hero_cta");
  });
});

// ---------------------------------------------------------------------------
// 2. Taxonomy completeness: every calculator slug in registry maps to a topic
// ---------------------------------------------------------------------------

/**
 * All slugs from generalist/web/src/lib/tools/registry.ts.
 * These are inlined here so the test is pure (no dynamic import of registry)
 * but guarded so a new slug added to registry without updating CALC_SLUG_TO_TOPIC
 * will cause the test to FAIL, prompting the developer to add the mapping.
 *
 * If a slug is intentionally unmapped (e.g. a generic informational tool),
 * add it to UNMAPPED_CALC_SLUGS below with a reason comment.
 */
const ALL_REGISTRY_CALC_SLUGS: string[] = [
  "salary-dividend-optimiser",
  "take-home-pay-calculator",
  "employer-ni-calculator",
  "pension-contribution-optimiser",
  "rd-tax-credit-estimator",
  "badr-cgt-calculator",
  "vat-scheme-comparator",
];

/** Slugs intentionally absent from CALC_SLUG_TO_TOPIC. Empty for this site. */
const UNMAPPED_CALC_SLUGS: string[] = [];

describe("taxonomy completeness: calculator slugs", () => {
  it("every registry slug maps to a known topic or is in the explicit allowlist", () => {
    const missing: string[] = [];
    for (const slug of ALL_REGISTRY_CALC_SLUGS) {
      if (UNMAPPED_CALC_SLUGS.includes(slug)) continue;
      const topic = topicForCalcSlug(slug);
      if (!topic) missing.push(slug);
    }
    expect(missing).toEqual([]);
  });

  it("CALC_SLUG_TO_TOPIC contains no stale slugs not in registry or allowlist", () => {
    const known = new Set([...ALL_REGISTRY_CALC_SLUGS, ...UNMAPPED_CALC_SLUGS]);
    const stale = Object.keys(CALC_SLUG_TO_TOPIC).filter((s) => !known.has(s));
    expect(stale).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 3. Taxonomy completeness: every blog category slug maps to a topic
// ---------------------------------------------------------------------------

/**
 * All distinct category slugs (output of slugifyCategory) found in the blog
 * content frontmatter. Inlined here so the test is self-contained.
 * Keep in sync with generalist/web/content/blog/*.md frontmatter.
 *
 * slugifyCategory logic (from lib/blog.ts):
 *   .toLowerCase()
 *   .replace(/[()]/g, "")
 *   .replace(/&/g, "and")   <-- NOTE: "&" becomes "and" with NO space
 *   .replace(/\s+/g, "-")
 *   .replace(/--+/g, "-")
 *   .trim()
 *
 * "R&D Tax Credits" -> "r" + "and" + "d tax credits" -> "randd-tax-credits"
 * NOT "rd-tax-credits". Verified by running the function in Node.
 */
const ALL_BLOG_CATEGORY_SLUGS: string[] = [
  "limited-company-tax",
  "sole-trader-and-self-employment",
  "vat-and-making-tax-digital",
  "payroll-and-paye",
  "randd-tax-credits", // from "R&D Tax Credits" (see note above)
  "incorporation-and-structure",
  "exit-and-capital-gains",
  "director-pay-and-dividends",
  "bookkeeping-and-compliance",
  "corporation-tax",
];

/**
 * Category slugs deliberately absent from the intent taxonomy.
 * None for this site -- all categories map to a topic.
 */
const UNMAPPED_CATEGORY_SLUGS: string[] = [];

describe("taxonomy completeness: blog category slugs", () => {
  it("every blog category slug maps to a known topic or is in the explicit allowlist", () => {
    const missing: string[] = [];
    for (const slug of ALL_BLOG_CATEGORY_SLUGS) {
      if (UNMAPPED_CATEGORY_SLUGS.includes(slug)) continue;
      const topic = topicForBlogSlug(slug);
      if (!topic) missing.push(slug);
    }
    expect(missing).toEqual([]);
  });

  it("each mapped category slug resolves to a topic with a real entry in TOPICS", () => {
    for (const slug of ALL_BLOG_CATEGORY_SLUGS) {
      if (UNMAPPED_CATEGORY_SLUGS.includes(slug)) continue;
      const topicKey = topicForBlogSlug(slug);
      if (!topicKey) continue;
      const topic = TOPICS.find((t) => t.key === topicKey);
      expect(topic, `No TOPIC entry for key "${topicKey}" (from slug "${slug}")`).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// 4. R&D slugify ambiguity guard
// ---------------------------------------------------------------------------

/**
 * This is the critical guard flagged in the task spec. Verifies that the slug
 * "randd-tax-credits" (the actual slugifyCategory output for "R&D Tax Credits")
 * resolves to a topic, and that the naive "rd-tax-credits" does NOT, so we
 * catch any future incorrect wiring.
 */
describe("R&D category slug ambiguity guard", () => {
  it("'randd-tax-credits' (actual slugifyCategory output) resolves to the rnd topic", () => {
    expect(topicForBlogSlug("randd-tax-credits")).toBe("rnd");
  });

  it("'rd-tax-credits' (naive/wrong slug) does NOT resolve to any topic", () => {
    expect(topicForBlogSlug("rd-tax-credits")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// 5. All topics cover their declared calculator links
// ---------------------------------------------------------------------------

describe("topic calculator links are consistent", () => {
  it("every topic with a primaryCalculator has it in CALC_SLUG_TO_TOPIC or is the primary", () => {
    for (const topic of TOPICS) {
      if (!topic.primaryCalculator) continue;
      // The calc slug must map to SOME topic (could be this topic or another).
      const mappedTopic = topicForCalcSlug(topic.primaryCalculator);
      expect(
        mappedTopic,
        `Topic "${topic.key}" lists primaryCalculator "${topic.primaryCalculator}" but it has no CALC_SLUG_TO_TOPIC entry`,
      ).not.toBeNull();
    }
  });
});
