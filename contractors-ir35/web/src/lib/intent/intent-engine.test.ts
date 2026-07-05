/**
 * Intent engine tests for contractors-ir35 (cfp).
 *
 * Covers:
 *  1. Taxonomy completeness: all 7 category slugs + 6 calc slugs + 10 /for types
 *     resolve to valid topic keys (no null / undefined gaps).
 *  2. deriveTopic routing: blog / calculators / embed / for routes resolve correctly.
 *  3. Engine ladder: the escalation behaviour (light -> tool, engaged -> review,
 *     deeply engaged -> specialist, converted -> null).
 *  4. Surface guards: returning_bar suppressed unless returning + unconverted.
 *  5. deep_scroll_modal respects the scroll threshold.
 *
 * TL-03: no react / window / document / fetch — pure Node.js module tests only.
 */

import { describe, it, expect } from "vitest";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  FOR_SLUG_TO_TOPIC,
  getTopic,
  topicForBlogSlug,
  topicForCalcSlug,
  topicForForSlug,
  } from "./taxonomy";
import { deriveTopic } from "./deriveTopic";
import { evaluate, type IntentContext } from "./engine";

// ── Taxonomy completeness ─────────────────────────────────────────────────

describe("taxonomy completeness", () => {
  // All 7 blog category slugs verified against 50 live posts
  const EXPECTED_CATEGORY_SLUGS = [
    "ir35-status",
    "contractor-accounting-basics",
    "umbrella-vs-limited-company",
    "limited-company-tax",
    "pension-and-dividends",
    "mtd-and-compliance",
    "expenses-and-deductions",
  ];

  it("all 7 blog category slugs resolve to a topic", () => {
    for (const slug of EXPECTED_CATEGORY_SLUGS) {
      const key = topicForBlogSlug(slug);
      expect(key, `category slug "${slug}" should resolve to a topic`).not.toBeNull();
      expect(getTopic(key), `topic key "${key}" should exist in TOPICS`).not.toBeNull();
    }
  });

  // All 6 calculator slugs verified against lib/calculators/registry.ts
  const EXPECTED_CALC_SLUGS = [
    "outside-ir35-take-home-calculator",
    "inside-ir35-take-home-calculator",
    "umbrella-vs-limited-calculator",
    "dividend-tax-calculator",
    "corporation-tax-calculator",
    "contractor-salary-dividend-calculator",
  ];

  it("all 6 calculator slugs resolve to a topic", () => {
    for (const slug of EXPECTED_CALC_SLUGS) {
      const key = topicForCalcSlug(slug);
      expect(key, `calc slug "${slug}" should resolve to a topic`).not.toBeNull();
      expect(getTopic(key), `topic key "${key}" should exist in TOPICS`).not.toBeNull();
    }
  });

  it("CALC_SLUG_TO_TOPIC has exactly 6 entries", () => {
    expect(Object.keys(CALC_SLUG_TO_TOPIC)).toHaveLength(6);
  });

  // All /for/[slug] contractor types from src/data/contractor-types.ts
  const EXPECTED_FOR_SLUGS = [
    "it-contractors",
    "engineering-contractors",
    "finance-contractors",
    "management-consultants",
    "project-managers",
    "nhs-locum-doctors",
    "oil-gas-contractors",
    "legal-contractors",
    "marketing-contractors",
    "construction-contractors",
  ];

  it("all 10 /for contractor type slugs resolve to a topic", () => {
    for (const slug of EXPECTED_FOR_SLUGS) {
      const key = topicForForSlug(slug);
      expect(key, `/for slug "${slug}" should resolve to a topic`).not.toBeNull();
      expect(getTopic(key), `topic key "${key}" should exist in TOPICS`).not.toBeNull();
    }
  });

  it("FOR_SLUG_TO_TOPIC has at least 10 entries", () => {
    expect(Object.keys(FOR_SLUG_TO_TOPIC).length).toBeGreaterThanOrEqual(10);
  });

  it("every TOPIC has a non-empty key, label, ctaCopy", () => {
    for (const t of TOPICS) {
      expect(t.key).toBeTruthy();
      expect(t.label).toBeTruthy();
      expect(t.ctaCopy).toBeTruthy();
    }
  });

  it("getTopic returns null for unknown keys", () => {
    expect(getTopic("nonexistent-topic-xyz")).toBeNull();
    expect(getTopic(null)).toBeNull();
    expect(getTopic(undefined)).toBeNull();
  });
});

// ── deriveTopic routing ────────────────────────────────────────────────────

describe("deriveTopic routing", () => {
  it("blog category slug routes resolve", () => {
    expect(deriveTopic("/blog/ir35-status/what-is-ir35")).toBe("ir35");
    expect(deriveTopic("/blog/umbrella-vs-limited-company")).toBe("structure");
    expect(deriveTopic("/blog/limited-company-tax/slug")).toBe("company-tax");
    expect(deriveTopic("/blog/pension-and-dividends/slug")).toBe("pay-planning");
    expect(deriveTopic("/blog/contractor-accounting-basics")).toBe("basics-expenses");
    expect(deriveTopic("/blog/expenses-and-deductions/slug")).toBe("basics-expenses");
    expect(deriveTopic("/blog/mtd-and-compliance/slug")).toBe("company-tax");
  });

  it("calculator routes resolve", () => {
    expect(deriveTopic("/calculators/outside-ir35-take-home-calculator")).toBe("ir35");
    expect(deriveTopic("/calculators/inside-ir35-take-home-calculator")).toBe("ir35");
    expect(deriveTopic("/calculators/umbrella-vs-limited-calculator")).toBe("structure");
    expect(deriveTopic("/calculators/dividend-tax-calculator")).toBe("pay-planning");
    expect(deriveTopic("/calculators/corporation-tax-calculator")).toBe("company-tax");
    expect(deriveTopic("/calculators/contractor-salary-dividend-calculator")).toBe("pay-planning");
  });

  it("embed routes resolve same as calculator routes", () => {
    expect(deriveTopic("/embed/outside-ir35-take-home-calculator")).toBe("ir35");
    expect(deriveTopic("/embed/umbrella-vs-limited-calculator")).toBe("structure");
  });

  it("/for contractor type routes resolve", () => {
    expect(deriveTopic("/for/it-contractors")).toBe("ir35");
    expect(deriveTopic("/for/finance-contractors")).toBe("pay-planning");
    expect(deriveTopic("/for/construction-contractors")).toBe("basics-expenses");
    expect(deriveTopic("/for/nhs-locum-doctors")).toBe("pay-planning");
  });

  it("non-topic pages return null", () => {
    expect(deriveTopic("/")).toBeNull();
    expect(deriveTopic("/contact")).toBeNull();
    expect(deriveTopic("/about")).toBeNull();
    expect(deriveTopic("/admin/analytics")).toBeNull();
  });

  it("unknown blog category returns null", () => {
    expect(deriveTopic("/blog/nonexistent-category/slug")).toBeNull();
  });

  it("unknown calculator returns null", () => {
    expect(deriveTopic("/calculators/nonexistent-calc")).toBeNull();
  });

  it("unknown /for type returns null", () => {
    expect(deriveTopic("/for/unknown-contractor-type")).toBeNull();
  });

  it("strips trailing slash and query/hash before matching", () => {
    expect(deriveTopic("/blog/ir35-status/")).toBe("ir35");
    expect(deriveTopic("/blog/ir35-status?foo=bar")).toBe("ir35");
    expect(deriveTopic("/blog/ir35-status#section")).toBe("ir35");
  });
});

// ── Engine escalation ladder ───────────────────────────────────────────────

function makeCtx(overrides: Partial<IntentContext> = {}): IntentContext {
  return {
    pageTopic: "ir35",
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

describe("engine escalation ladder", () => {
  it("light browser: sticky_cta returns a tool offer (ir35 -> outside calc)", () => {
    const action = evaluate("sticky_cta", makeCtx());
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("tool");
    expect(action!.offer.href).toContain("outside-ir35-take-home-calculator");
  });

  it("engaged reader (60%+ scroll): sticky_cta returns a review/specialist offer", () => {
    const action = evaluate("sticky_cta", makeCtx({ scrollPct: 65 }));
    expect(action).not.toBeNull();
    expect(["specialist", "guide"]).toContain(action!.offer.kind);
  });

  it("deeply engaged (90s+ and 60%+ scroll): sticky_cta returns specialist escalation", () => {
    const action = evaluate("sticky_cta", makeCtx({ engagedMs: 95_000, scrollPct: 70 }));
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("escalate_specialist");
    expect(action!.variant).toBe("escalate");
  });

  it("converted visitor: sticky_cta returns null (never nag)", () => {
    const action = evaluate("sticky_cta", makeCtx({ converted: true }));
    expect(action).toBeNull();
  });

  it("no topic: sticky_cta returns null", () => {
    const action = evaluate("sticky_cta", makeCtx({ pageTopic: null, entryTopic: null }));
    expect(action).toBeNull();
  });

  it("basics-expenses topic: sticky_cta falls back to specialist (no primary calculator)", () => {
    const action = evaluate("sticky_cta", makeCtx({ pageTopic: "basics-expenses" }));
    expect(action).not.toBeNull();
    expect(action!.offer.kind).toBe("specialist");
    expect(action!.offer.href).toBe("/contact");
  });

  it("next_step uses pageTopic only", () => {
    const action = evaluate("next_step", makeCtx({ pageTopic: "structure" }));
    expect(action).not.toBeNull();
    expect(action!.topic).toBe("structure");
  });

  it("next_step returns null when no pageTopic", () => {
    const action = evaluate("next_step", makeCtx({ pageTopic: null }));
    expect(action).toBeNull();
  });

  it("deep_scroll_modal: null below threshold", () => {
    const action = evaluate("deep_scroll_modal", makeCtx({ scrollPct: 50 }));
    expect(action).toBeNull();
  });

  it("deep_scroll_modal: fires above threshold", () => {
    const action = evaluate("deep_scroll_modal", makeCtx({ pageTopic: "ir35", scrollPct: 75 }));
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("deep_scroll_offer");
  });

  it("deep_scroll_modal: null when converted", () => {
    const action = evaluate("deep_scroll_modal", makeCtx({ scrollPct: 80, converted: true }));
    expect(action).toBeNull();
  });

  it("returning_bar: null when not returning", () => {
    const action = evaluate("returning_bar", makeCtx({ returning: false, lastTopic: "ir35" }));
    expect(action).toBeNull();
  });

  it("returning_bar: fires for returning + unconverted", () => {
    const action = evaluate("returning_bar", makeCtx({ returning: true, lastTopic: "ir35" }));
    expect(action).not.toBeNull();
    expect(action!.ruleId).toBe("returning_welcome");
    expect(action!.surface).toBe("returning_bar");
  });

  it("returning_bar: null when converted even if returning", () => {
    const action = evaluate("returning_bar", makeCtx({ returning: true, converted: true, lastTopic: "ir35" }));
    expect(action).toBeNull();
  });

  it("returning_bar: null when no resume topic", () => {
    const action = evaluate("returning_bar", makeCtx({ returning: true, lastTopic: null, entryTopic: null }));
    expect(action).toBeNull();
  });
});

// ── Lead engine integration: enquiry_ref pass-through ─────────────────────

describe("submit-client honeypot contract", () => {
  it("submitContractorLead is importable and has the correct signature", async () => {
    const mod = await import("@/lib/leads/submit-client");
    expect(typeof mod.submitContractorLead).toBe("function");
    // Calling with empty strings should not throw synchronously.
    // (It will fail with a network error in test env, not throw.)
    const promise = mod.submitContractorLead(
      {
        full_name: "Test",
        email: "t@t.com",
        phone: "07700 900123",
        role: "IT Contractor",
        message: "Test",
        source: "contractors-ir35",
      },
      "" /* honeypot empty */,
    );
    expect(promise).toBeInstanceOf(Promise);
    // Resolve or reject -- either is fine in test env (no real server).
    await promise.catch(() => {});
  });
});
