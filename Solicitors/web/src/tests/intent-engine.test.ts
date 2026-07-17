/**
 * Intent engine tests for Accounts for Lawyers (Solicitors).
 *
 * Verifies:
 *  1. Taxonomy completeness -- every key in CALC_SLUG_TO_TOPIC resolves to a
 *     known TopicKey and every blog category slug resolves correctly.
 *  2. /for-* route table -- every /for-* route in FOR_ROUTE_TO_TOPIC maps to a
 *     known TopicKey.
 *  3. deriveTopic -- blog, calculator, embed, and /for-* routes derive
 *     correctly; unmatched routes return null.
 *  4. evaluate ladder -- the escalation ladder (light browser -> engaged ->
 *     deeply engaged) produces the right offer kinds for a topic with and
 *     without a primaryCalculator.
 *  5. Surface gate rules -- converted visitor never gets a sticky_cta;
 *     deep_scroll_modal respects scroll threshold; returning_bar only fires for
 *     returning + not converted.
 *
 * Pure Node.js module tests only -- no React, no window, no fetch.
 */

import { describe, it, expect } from "vitest";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  getTopic,
  topicForBlogSlug,
  topicForCalcSlug,
  type TopicKey,
} from "@/lib/intent/taxonomy";
import { deriveTopic, FOR_ROUTE_TO_TOPIC } from "@/lib/intent/deriveTopic";
import { evaluate, type IntentContext } from "@/lib/intent/engine";

// ── helpers ──────────────────────────────────────────────────────────────────

function ctx(overrides: Partial<IntentContext> = {}): IntentContext {
  return {
    pageTopic: null,
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

const ALL_TOPIC_KEYS = TOPICS.map((t) => t.key) as TopicKey[];

// ── taxonomy completeness ─────────────────────────────────────────────────────

describe("taxonomy: CALC_SLUG_TO_TOPIC completeness", () => {
  it("every calculator slug maps to a known TopicKey", () => {
    for (const [slug, key] of Object.entries(CALC_SLUG_TO_TOPIC)) {
      const topic = getTopic(key);
      expect(topic, `CALC_SLUG_TO_TOPIC["${slug}"] = "${key}" does not resolve`).not.toBeNull();
    }
  });

  it("maps all six registry calculator slugs", () => {
    const expectedSlugs = [
      "solicitor-take-home",
      "fa-2014-salaried-member",
      "llp-profit-share-allocation",
      "law-firm-valuation",
      "sra-client-account-reserve",
      "indemnity-premium-estimator",
    ];
    for (const slug of expectedSlugs) {
      expect(
        CALC_SLUG_TO_TOPIC[slug],
        `Calculator slug "${slug}" is not mapped in CALC_SLUG_TO_TOPIC`,
      ).toBeDefined();
    }
  });
});

describe("taxonomy: blog category slug coverage", () => {
  const expectedBlogSlugs = [
    "sra-compliance-trust-accounting",
    "sra-accounts-rules",
    "compliance-risk-colp-cofa",
    "sole-practitioner-tax",
    "locum-solicitor-tax",
    "partnership-llp-accounting",
    "practice-sale-succession",
    "practice-succession-sale",
    "practice-finance-cash-flow",
    "vat-compliance",
    "structure-incorporation",
  ];

  for (const slug of expectedBlogSlugs) {
    it(`blog slug "${slug}" resolves to a topic`, () => {
      const key = topicForBlogSlug(slug);
      expect(key, `Blog slug "${slug}" returned null`).not.toBeNull();
      expect(ALL_TOPIC_KEYS).toContain(key);
    });
  }
});

describe("taxonomy: all topics have valid primaryCalculator or null", () => {
  it("primaryCalculator slugs that are non-null are mapped in CALC_SLUG_TO_TOPIC", () => {
    const calcKeys = new Set(Object.keys(CALC_SLUG_TO_TOPIC));
    // Collect slugs the other way: topics declare a primaryCalculator
    for (const t of TOPICS) {
      if (t.primaryCalculator !== null) {
        // The calculator slug should be mapped back (not required to be the
        // same topic, but must exist in the registry map).
        expect(
          calcKeys.has(t.primaryCalculator),
          `Topic "${t.key}" declares primaryCalculator "${t.primaryCalculator}" which is not in CALC_SLUG_TO_TOPIC`,
        ).toBe(true);
      }
    }
  });
});

// ── /for-* route table ────────────────────────────────────────────────────────

describe("FOR_ROUTE_TO_TOPIC: /for-* route table", () => {
  const expectedRoutes = [
    "for-partners",
    "for-locum-solicitors",
    "for-junior-solicitors",
    "for-firm-buyers",
  ];

  it("covers all four /for-* routes in the app", () => {
    for (const route of expectedRoutes) {
      expect(
        FOR_ROUTE_TO_TOPIC[route],
        `Route "/${route}" is missing from FOR_ROUTE_TO_TOPIC`,
      ).toBeDefined();
    }
  });

  it("every mapped TopicKey is a valid topic", () => {
    for (const [route, key] of Object.entries(FOR_ROUTE_TO_TOPIC)) {
      const topic = getTopic(key);
      expect(topic, `FOR_ROUTE_TO_TOPIC["${route}"] = "${key}" does not resolve`).not.toBeNull();
    }
  });

  it("for-partners -> partnership-llp", () => {
    expect(FOR_ROUTE_TO_TOPIC["for-partners"]).toBe("partnership-llp");
  });
  it("for-locum-solicitors -> sole-practitioner", () => {
    expect(FOR_ROUTE_TO_TOPIC["for-locum-solicitors"]).toBe("sole-practitioner");
  });
  it("for-junior-solicitors -> sole-practitioner", () => {
    expect(FOR_ROUTE_TO_TOPIC["for-junior-solicitors"]).toBe("sole-practitioner");
  });
  it("for-firm-buyers -> succession-sale", () => {
    expect(FOR_ROUTE_TO_TOPIC["for-firm-buyers"]).toBe("succession-sale");
  });
});

// ── deriveTopic ───────────────────────────────────────────────────────────────

describe("deriveTopic", () => {
  it("returns null for homepage", () => {
    expect(deriveTopic("/")).toBeNull();
  });

  it("returns null for /contact", () => {
    expect(deriveTopic("/contact")).toBeNull();
  });

  it("derives topic from blog category slug", () => {
    expect(deriveTopic("/blog/sra-compliance-trust-accounting/some-article")).toBe("sra-compliance");
    expect(deriveTopic("/blog/sole-practitioner-tax")).toBe("sole-practitioner");
    expect(deriveTopic("/blog/partnership-llp-accounting/some-article")).toBe("partnership-llp");
    expect(deriveTopic("/blog/practice-sale-succession/some-article")).toBe("succession-sale");
    expect(deriveTopic("/blog/practice-succession-sale")).toBe("succession-sale");
    expect(deriveTopic("/blog/practice-finance-cash-flow")).toBe("practice-finance");
    expect(deriveTopic("/blog/vat-compliance")).toBe("vat");
    expect(deriveTopic("/blog/structure-incorporation")).toBe("incorporation");
  });

  it("derives topic from calculator slug", () => {
    expect(deriveTopic("/calculators/solicitor-take-home")).toBe("sole-practitioner");
    expect(deriveTopic("/calculators/llp-profit-share-allocation")).toBe("partnership-llp");
    expect(deriveTopic("/calculators/law-firm-valuation")).toBe("succession-sale");
    expect(deriveTopic("/calculators/sra-client-account-reserve")).toBe("sra-compliance");
    expect(deriveTopic("/calculators/indemnity-premium-estimator")).toBe("professional-indemnity");
  });

  it("derives topic from /embed/<slug>", () => {
    expect(deriveTopic("/embed/solicitor-take-home")).toBe("sole-practitioner");
    expect(deriveTopic("/embed/law-firm-valuation")).toBe("succession-sale");
  });

  it("derives topic from /for-* routes", () => {
    expect(deriveTopic("/for-partners")).toBe("partnership-llp");
    expect(deriveTopic("/for-locum-solicitors")).toBe("sole-practitioner");
    expect(deriveTopic("/for-junior-solicitors")).toBe("sole-practitioner");
    expect(deriveTopic("/for-firm-buyers")).toBe("succession-sale");
  });

  it("strips trailing slashes and query strings", () => {
    expect(deriveTopic("/blog/sole-practitioner-tax/")).toBe("sole-practitioner");
    expect(deriveTopic("/calculators/solicitor-take-home?ref=blog")).toBe("sole-practitioner");
  });

  it("returns null for unmapped blog category slug", () => {
    expect(deriveTopic("/blog/nonexistent-category/some-post")).toBeNull();
  });
});

// ── evaluate: escalation ladder ───────────────────────────────────────────────

describe("evaluate: sticky_cta escalation ladder", () => {
  const topic: TopicKey = "sole-practitioner"; // has a primaryCalculator

  it("light browser: returns tool offer", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: topic, scrollPct: 10, engagedMs: 5000 }));
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("/calculators/");
  });

  it("engaged reader (scroll 65%): returns specialist or review offer", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: topic, scrollPct: 65, engagedMs: 5000 }));
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("specialist");
  });

  it("deeply engaged (90s + 65% scroll): escalates to specialist", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: topic, scrollPct: 65, engagedMs: 95000 }));
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("specialist");
    expect(action!.ruleId).toBe("escalate_specialist");
    expect(action!.variant).toBe("escalate");
  });

  it("converted visitor: returns null (never nag)", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: topic, converted: true }));
    expect(action).toBeNull();
  });

  it("no topic: returns null", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: null }));
    expect(action).toBeNull();
  });
});

describe("evaluate: vat topic (no primaryCalculator)", () => {
  it("returns a specialist offer (tool fallback when no calculator)", () => {
    const action = evaluate("sticky_cta", ctx({ pageTopic: "vat", scrollPct: 5, engagedMs: 1000 }));
    expect(action).not.toBeNull();
    // vat has no calculator, so toolOffer returns null and falls back to specialist.
    expect(action!.offer.kind).toBe("specialist");
    expect(action!.offer.href).toBe("/contact");
  });
});

// ── evaluate: deep_scroll_modal ───────────────────────────────────────────────

describe("evaluate: deep_scroll_modal", () => {
  it("returns null below 70% scroll", () => {
    const action = evaluate("deep_scroll_modal", ctx({ pageTopic: "sra-compliance", scrollPct: 60 }));
    expect(action).toBeNull();
  });

  it("fires at 75% scroll with a page topic", () => {
    const action = evaluate("deep_scroll_modal", ctx({ pageTopic: "sra-compliance", scrollPct: 75 }));
    expect(action).not.toBeNull();
    expect(action!.surface).toBe("deep_scroll_modal");
    expect(action!.ruleId).toBe("deep_scroll_offer");
  });

  it("returns null when converted", () => {
    const action = evaluate("deep_scroll_modal", ctx({ pageTopic: "sra-compliance", scrollPct: 80, converted: true }));
    expect(action).toBeNull();
  });

  it("returns null when no pageTopic", () => {
    const action = evaluate("deep_scroll_modal", ctx({ scrollPct: 80 }));
    expect(action).toBeNull();
  });
});

// ── evaluate: returning_bar ───────────────────────────────────────────────────

describe("evaluate: returning_bar", () => {
  it("fires for a returning visitor with a last topic", () => {
    const action = evaluate("returning_bar", ctx({ returning: true, lastTopic: "succession-sale" }));
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("returning_welcome");
    expect(action!.topic).toBe("succession-sale");
  });

  it("returns null when not returning", () => {
    const action = evaluate("returning_bar", ctx({ returning: false, lastTopic: "succession-sale" }));
    expect(action).toBeNull();
  });

  it("returns null when converted", () => {
    const action = evaluate("returning_bar", ctx({ returning: true, lastTopic: "succession-sale", converted: true }));
    expect(action).toBeNull();
  });

  it("returns null when no lastTopic and no entryTopic", () => {
    const action = evaluate("returning_bar", ctx({ returning: true }));
    expect(action).toBeNull();
  });

  it("falls back to entryTopic when lastTopic is null", () => {
    const action = evaluate("returning_bar", ctx({ returning: true, entryTopic: "partnership-llp" }));
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("partnership-llp");
  });
});

// ── evaluate: next_step ───────────────────────────────────────────────────────

describe("evaluate: next_step", () => {
  it("uses pageTopic, not entryTopic", () => {
    const action = evaluate("next_step", ctx({
      pageTopic: "practice-finance",
      entryTopic: "vat",
    }));
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("practice-finance");
    expect(action!.ruleId).toBe("topic_next_step");
  });

  it("returns null when no pageTopic", () => {
    const action = evaluate("next_step", ctx({ entryTopic: "vat" }));
    expect(action).toBeNull();
  });
});

// ── topicForCalcSlug and topicForBlogSlug ─────────────────────────────────────

describe("topicForCalcSlug", () => {
  it("returns correct topic for known slugs", () => {
    expect(topicForCalcSlug("sra-client-account-reserve")).toBe("sra-compliance");
    expect(topicForCalcSlug("fa-2014-salaried-member")).toBe("partnership-llp");
    expect(topicForCalcSlug("law-firm-valuation")).toBe("succession-sale");
  });

  it("returns null for unknown slug", () => {
    expect(topicForCalcSlug("nonexistent-tool")).toBeNull();
  });
});

describe("topicForBlogSlug", () => {
  it("returns correct topic for known slugs", () => {
    expect(topicForBlogSlug("sra-compliance-trust-accounting")).toBe("sra-compliance");
    expect(topicForBlogSlug("locum-solicitor-tax")).toBe("sole-practitioner");
    expect(topicForBlogSlug("firm-acquisition-merger")).toBe("succession-sale");
  });

  it("returns null for unmapped slug", () => {
    expect(topicForBlogSlug("mystery-category")).toBeNull();
  });
});
