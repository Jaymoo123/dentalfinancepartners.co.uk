/**
 * Intent engine tests for Agency Founder Finance (Wave 5 Worker 2).
 *
 * Covers:
 *  1. deriveTopic: all 9 blog category slugs, all 8 calc slugs, all 19
 *     /agencies/* slugs, all 10 relocation page slugs, all 3 for-* routes,
 *     and the no-topic fallback paths.
 *  2. Taxonomy completeness: every TopicKey has a TOPICS entry; every mapped
 *     calculator slug is in the registry; every blog category slug produced
 *     by the site's content appears in at least one topic.
 *  3. Engine ladder: evaluate() respects converted/returning/scroll/engaged
 *     thresholds in the correct escalation order.
 *  4. Newsletter unmount: grep assertions that no newsletter component is
 *     imported by PageShell, layout, SiteFooter, or BlogPostRenderer.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import {
  TOPICS,
  CALC_SLUG_TO_TOPIC,
  AGENCIES_SLUG_TO_TOPIC,
  RELOCATION_SLUG_TO_TOPIC,
  getTopic,
  topicForBlogSlug,
  topicForCalcSlug,
  topicForAgenciesSlug,
  topicForRelocationSlug,
  type TopicKey,
} from "@/lib/intent/taxonomy";
import { evaluate, type IntentContext } from "@/lib/intent/engine";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function baseCtx(overrides: Partial<IntentContext> = {}): IntentContext {
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

const SRC = join(
  process.cwd(),
  "src",
);
function readSrc(relPath: string): string {
  return readFileSync(join(SRC, relPath), "utf-8");
}

// ---------------------------------------------------------------------------
// deriveTopic: blog category slugs (all 9)
// ---------------------------------------------------------------------------
describe("deriveTopic: blog category slugs", () => {
  const cases: [string, TopicKey][] = [
    ["/blog/international-agencies", "international"],
    ["/blog/international-agencies/some-post", "international"],
    ["/blog/tax-and-compliance", "compliance-vat"],
    ["/blog/tax-and-compliance/some-post", "compliance-vat"],
    ["/blog/growth-and-exit", "exit"],
    ["/blog/growth-and-exit/some-post", "exit"],
    ["/blog/agency-finance-essentials", "structure"],
    ["/blog/agency-finance-essentials/some-post", "structure"],
    ["/blog/contractors-and-ir35", "structure"],
    ["/blog/contractors-and-ir35/some-post", "structure"],
    ["/blog/making-tax-digital", "compliance-vat"],
    ["/blog/making-tax-digital/some-post", "compliance-vat"],
    ["/blog/salary-and-dividends", "pay-planning"],
    ["/blog/salary-and-dividends/some-post", "pay-planning"],
    ["/blog/incorporation-and-structure", "structure"],
    ["/blog/incorporation-and-structure/some-post", "structure"],
    ["/blog/agency-accountant-services", "structure"],
    ["/blog/agency-accountant-services/some-post", "structure"],
  ];

  for (const [path, expected] of cases) {
    it(`${path} -> ${expected}`, () => {
      expect(deriveTopic(path)).toBe(expected);
    });
  }
});

// ---------------------------------------------------------------------------
// deriveTopic: calculator slugs (all 8)
// ---------------------------------------------------------------------------
describe("deriveTopic: calculator slugs", () => {
  const cases: [string, TopicKey][] = [
    ["/calculators/salary-dividend-optimiser", "pay-planning"],
    ["/calculators/pension-contribution-optimiser", "pay-planning"],
    ["/calculators/rd-tax-credit-estimator", "rnd"],
    ["/calculators/agency-valuation", "exit"],
    ["/calculators/badr-cgt-calculator", "exit"],
    ["/calculators/vat-scheme-comparator", "compliance-vat"],
    ["/calculators/take-home-pay-calculator", "structure"],
    ["/calculators/employer-ni-calculator", "structure"],
  ];

  for (const [path, expected] of cases) {
    it(`${path} -> ${expected}`, () => {
      expect(deriveTopic(path)).toBe(expected);
    });
  }
});

// ---------------------------------------------------------------------------
// deriveTopic: embed slugs (same calc slug logic)
// ---------------------------------------------------------------------------
describe("deriveTopic: embed slugs", () => {
  it("/embed/salary-dividend-optimiser -> pay-planning", () => {
    expect(deriveTopic("/embed/salary-dividend-optimiser")).toBe("pay-planning");
  });
  it("/embed/badr-cgt-calculator -> exit", () => {
    expect(deriveTopic("/embed/badr-cgt-calculator")).toBe("exit");
  });
});

// ---------------------------------------------------------------------------
// deriveTopic: /agencies/* (all 19)
// ---------------------------------------------------------------------------
describe("deriveTopic: agencies slugs (all 19)", () => {
  const cases: [string, TopicKey][] = [
    ["/agencies/ai-agencies", "rnd"],
    ["/agencies/crypto-web3-agencies", "rnd"],
    ["/agencies/saas-agencies", "rnd"],
    ["/agencies/ecommerce-agencies", "structure"],
    ["/agencies/marketing-agencies", "compliance-vat"],
    ["/agencies/advertising-agencies", "compliance-vat"],
    ["/agencies/social-media-agencies", "compliance-vat"],
    ["/agencies/email-marketing-agencies", "compliance-vat"],
    ["/agencies/influencer-marketing-agencies", "compliance-vat"],
    ["/agencies/performance-marketing-agencies", "compliance-vat"],
    ["/agencies/ppc-agencies", "compliance-vat"],
    ["/agencies/creative-agencies", "pay-planning"],
    ["/agencies/branding-agencies", "pay-planning"],
    ["/agencies/digital-agencies", "pay-planning"],
    ["/agencies/web-design-agencies", "structure"],
    ["/agencies/seo-agencies", "structure"],
    ["/agencies/pr-agencies", "structure"],
    ["/agencies/video-production-agencies", "structure"],
    ["/agencies/recruitment-agencies", "structure"],
  ];

  for (const [path, expected] of cases) {
    it(`${path} -> ${expected}`, () => {
      expect(deriveTopic(path)).toBe(expected);
    });
  }
});

// ---------------------------------------------------------------------------
// deriveTopic: relocation pages (all 10) -> international
// ---------------------------------------------------------------------------
describe("deriveTopic: relocation pages (all 10)", () => {
  const slugs = [
    "dubai-relocation",
    "portugal-relocation",
    "cyprus-relocation",
    "spain-relocation",
    "singapore-relocation",
    "malta-relocation",
    "estonia-relocation",
    "greece-relocation",
    "italy-relocation",
    "switzerland-relocation",
  ];

  for (const slug of slugs) {
    it(`/${slug} -> international`, () => {
      expect(deriveTopic(`/${slug}`)).toBe("international");
    });
  }
});

// ---------------------------------------------------------------------------
// deriveTopic: for-* routes
// ---------------------------------------------------------------------------
describe("deriveTopic: for-* routes", () => {
  it("/for-new-founders -> structure", () => {
    expect(deriveTopic("/for-new-founders")).toBe("structure");
  });
  it("/for-growth-stage -> pay-planning", () => {
    expect(deriveTopic("/for-growth-stage")).toBe("pay-planning");
  });
  it("/for-pre-exit -> exit", () => {
    expect(deriveTopic("/for-pre-exit")).toBe("exit");
  });
});

// ---------------------------------------------------------------------------
// deriveTopic: no-topic fallback paths
// ---------------------------------------------------------------------------
describe("deriveTopic: no-topic fallback", () => {
  const noTopics = [
    "/",
    "",
    "/contact",
    "/about",
    "/blog",
    "/agencies",
    "/free-health-check",
    "/privacy-policy",
    "/glossary/some-term",
    "/locations/london",
  ];

  for (const path of noTopics) {
    it(`${path || "(empty)"} -> null`, () => {
      expect(deriveTopic(path)).toBeNull();
    });
  }
});

// ---------------------------------------------------------------------------
// Taxonomy completeness
// ---------------------------------------------------------------------------
describe("taxonomy completeness", () => {
  it("every TopicKey has an entry in TOPICS", () => {
    const allKeys: TopicKey[] = [
      "international",
      "pay-planning",
      "rnd",
      "exit",
      "compliance-vat",
      "structure",
    ];
    for (const key of allKeys) {
      expect(getTopic(key)).not.toBeNull();
    }
  });

  it("every TOPICS entry has a key, label, ctaCopy, and blogCategorySlugs array", () => {
    for (const t of TOPICS) {
      expect(typeof t.key).toBe("string");
      expect(typeof t.label).toBe("string");
      expect(typeof t.ctaCopy).toBe("string");
      expect(Array.isArray(t.blogCategorySlugs)).toBe(true);
    }
  });

  it("all 8 calculator slugs are in CALC_SLUG_TO_TOPIC", () => {
    const registrySlug = [
      "salary-dividend-optimiser",
      "rd-tax-credit-estimator",
      "agency-valuation",
      "badr-cgt-calculator",
      "vat-scheme-comparator",
      "pension-contribution-optimiser",
      "take-home-pay-calculator",
      "employer-ni-calculator",
    ];
    for (const slug of registrySlug) {
      expect(CALC_SLUG_TO_TOPIC[slug]).toBeDefined();
    }
  });

  it("all 19 agencies slugs are in AGENCIES_SLUG_TO_TOPIC", () => {
    const slugs = [
      "advertising-agencies",
      "ai-agencies",
      "branding-agencies",
      "creative-agencies",
      "crypto-web3-agencies",
      "digital-agencies",
      "ecommerce-agencies",
      "email-marketing-agencies",
      "influencer-marketing-agencies",
      "marketing-agencies",
      "performance-marketing-agencies",
      "ppc-agencies",
      "pr-agencies",
      "recruitment-agencies",
      "saas-agencies",
      "seo-agencies",
      "social-media-agencies",
      "video-production-agencies",
      "web-design-agencies",
    ];
    expect(Object.keys(AGENCIES_SLUG_TO_TOPIC)).toHaveLength(19);
    for (const slug of slugs) {
      expect(AGENCIES_SLUG_TO_TOPIC[slug]).toBeDefined();
    }
  });

  it("all 10 relocation slugs are in RELOCATION_SLUG_TO_TOPIC with value 'international'", () => {
    const slugs = [
      "dubai-relocation",
      "portugal-relocation",
      "cyprus-relocation",
      "spain-relocation",
      "singapore-relocation",
      "malta-relocation",
      "estonia-relocation",
      "greece-relocation",
      "italy-relocation",
      "switzerland-relocation",
    ];
    expect(Object.keys(RELOCATION_SLUG_TO_TOPIC)).toHaveLength(10);
    for (const slug of slugs) {
      expect(RELOCATION_SLUG_TO_TOPIC[slug]).toBe("international");
    }
  });

  it("topicForBlogSlug returns correct topic for each blog category slug", () => {
    expect(topicForBlogSlug("international-agencies")).toBe("international");
    expect(topicForBlogSlug("tax-and-compliance")).toBe("compliance-vat");
    expect(topicForBlogSlug("making-tax-digital")).toBe("compliance-vat");
    expect(topicForBlogSlug("salary-and-dividends")).toBe("pay-planning");
    expect(topicForBlogSlug("growth-and-exit")).toBe("exit");
    expect(topicForBlogSlug("agency-finance-essentials")).toBe("structure");
    expect(topicForBlogSlug("contractors-and-ir35")).toBe("structure");
    expect(topicForBlogSlug("incorporation-and-structure")).toBe("structure");
    expect(topicForBlogSlug("agency-accountant-services")).toBe("structure");
    expect(topicForBlogSlug("unknown-category")).toBeNull();
  });

  it("topicForCalcSlug returns correct topic for each calculator slug", () => {
    expect(topicForCalcSlug("salary-dividend-optimiser")).toBe("pay-planning");
    expect(topicForCalcSlug("pension-contribution-optimiser")).toBe("pay-planning");
    expect(topicForCalcSlug("rd-tax-credit-estimator")).toBe("rnd");
    expect(topicForCalcSlug("agency-valuation")).toBe("exit");
    expect(topicForCalcSlug("badr-cgt-calculator")).toBe("exit");
    expect(topicForCalcSlug("vat-scheme-comparator")).toBe("compliance-vat");
    expect(topicForCalcSlug("take-home-pay-calculator")).toBe("structure");
    expect(topicForCalcSlug("employer-ni-calculator")).toBe("structure");
    expect(topicForCalcSlug("unknown-calc")).toBeNull();
  });

  it("topicForAgenciesSlug returns correct topic for a sample of agencies slugs", () => {
    expect(topicForAgenciesSlug("ai-agencies")).toBe("rnd");
    expect(topicForAgenciesSlug("marketing-agencies")).toBe("compliance-vat");
    expect(topicForAgenciesSlug("creative-agencies")).toBe("pay-planning");
    expect(topicForAgenciesSlug("web-design-agencies")).toBe("structure");
    expect(topicForAgenciesSlug("unknown-type")).toBeNull();
  });

  it("topicForRelocationSlug returns 'international' for all relocation slugs", () => {
    expect(topicForRelocationSlug("dubai-relocation")).toBe("international");
    expect(topicForRelocationSlug("switzerland-relocation")).toBe("international");
    expect(topicForRelocationSlug("not-a-relocation")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Engine: escalation ladder
// ---------------------------------------------------------------------------
describe("engine: evaluate() escalation ladder", () => {
  it("converted visitor -> sticky_cta returns null", () => {
    const result = evaluate("sticky_cta", baseCtx({ pageTopic: "pay-planning", converted: true }));
    expect(result).toBeNull();
  });

  it("no topic -> sticky_cta returns null", () => {
    const result = evaluate("sticky_cta", baseCtx({ pageTopic: null, entryTopic: null }));
    expect(result).toBeNull();
  });

  it("light browser -> sticky_cta returns a tool offer for pay-planning", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({ pageTopic: "pay-planning", scrollPct: 10, engagedMs: 5000 }),
    );
    expect(result).not.toBeNull();
    expect(result!.topic).toBe("pay-planning");
    expect(result!.offer.kind).toBe("tool");
    expect(result!.offer.href).toBe("/calculators/salary-dividend-optimiser");
  });

  it("deeply engaged + 60%+ scroll + not converted -> escalates to specialist", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({
        pageTopic: "pay-planning",
        scrollPct: 70,
        engagedMs: 100_000,
        converted: false,
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.offer.kind).toBe("specialist");
    expect(result!.ruleId).toBe("escalate_specialist");
    expect(result!.variant).toBe("escalate");
  });

  it("engaged reader (60%+ scroll, not deeply engaged) -> review offer", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({
        pageTopic: "exit",
        scrollPct: 65,
        engagedMs: 30_000,
        converted: false,
      }),
    );
    expect(result).not.toBeNull();
    expect(["specialist", "tool"]).toContain(result!.offer.kind);
  });

  it("topic with no calculator (international) -> falls back to specialist", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({ pageTopic: "international", scrollPct: 10, engagedMs: 5000 }),
    );
    expect(result).not.toBeNull();
    // international has no primaryCalculator so toolOffer returns null
    expect(result!.offer.kind).toBe("specialist");
  });

  it("next_step: no pageTopic -> null", () => {
    const result = evaluate("next_step", baseCtx({ pageTopic: null }));
    expect(result).toBeNull();
  });

  it("next_step: with pageTopic -> non-null", () => {
    const result = evaluate("next_step", baseCtx({ pageTopic: "rnd" }));
    expect(result).not.toBeNull();
    expect(result!.surface).toBe("next_step");
    expect(result!.topic).toBe("rnd");
  });

  it("deep_scroll_modal: scroll < 70% -> null", () => {
    const result = evaluate(
      "deep_scroll_modal",
      baseCtx({ pageTopic: "compliance-vat", scrollPct: 50 }),
    );
    expect(result).toBeNull();
  });

  it("deep_scroll_modal: scroll >= 70% + pageTopic -> non-null", () => {
    const result = evaluate(
      "deep_scroll_modal",
      baseCtx({ pageTopic: "compliance-vat", scrollPct: 75 }),
    );
    expect(result).not.toBeNull();
    expect(result!.surface).toBe("deep_scroll_modal");
  });

  it("deep_scroll_modal: converted -> null", () => {
    const result = evaluate(
      "deep_scroll_modal",
      baseCtx({ pageTopic: "exit", scrollPct: 80, converted: true }),
    );
    expect(result).toBeNull();
  });

  it("returning_bar: not returning -> null", () => {
    const result = evaluate(
      "returning_bar",
      baseCtx({ returning: false, lastTopic: "pay-planning" }),
    );
    expect(result).toBeNull();
  });

  it("returning_bar: returning + lastTopic -> non-null", () => {
    const result = evaluate(
      "returning_bar",
      baseCtx({ returning: true, lastTopic: "structure", converted: false }),
    );
    expect(result).not.toBeNull();
    expect(result!.ruleId).toBe("returning_welcome");
    expect(result!.topic).toBe("structure");
  });

  it("returning_bar: converted -> null", () => {
    const result = evaluate(
      "returning_bar",
      baseCtx({ returning: true, lastTopic: "exit", converted: true }),
    );
    expect(result).toBeNull();
  });

  it("entryTopic used when pageTopic is null for sticky_cta", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({
        pageTopic: null,
        entryTopic: "rnd",
        scrollPct: 10,
        engagedMs: 5000,
        converted: false,
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.topic).toBe("rnd");
  });

  it("ruleId is correct for tool offer", () => {
    const result = evaluate(
      "sticky_cta",
      baseCtx({ pageTopic: "compliance-vat", scrollPct: 5, engagedMs: 1000 }),
    );
    expect(result?.ruleId).toBe("topic_cta");
    expect(result?.variant).toBe("default");
  });
});

// ---------------------------------------------------------------------------
// Newsletter unmount assertions (grep-based)
// ---------------------------------------------------------------------------
describe("newsletter unmount assertions", () => {
  it("PageShell does not import or mount any newsletter component", () => {
    const src = readSrc("components/layout/PageShell.tsx");
    expect(src).not.toMatch(/from.*newsletter\//);
    expect(src).not.toMatch(/<ExitIntentModal/);
    expect(src).not.toMatch(/<InlinePrompt/);
    expect(src).not.toMatch(/<SignupForm/);
    expect(src).not.toMatch(/<StickyCard/);
  });

  it("app/layout.tsx does not import newsletter ExitIntentModal", () => {
    const src = readSrc("app/layout.tsx");
    // Must not import from the newsletter folder
    expect(src).not.toMatch(/from.*newsletter\/ExitIntentModal/);
    // Must not have unconditional GoogleAnalytics in head
    expect(src).not.toMatch(/<GoogleAnalytics/);
  });

  it("SiteFooter does not import or mount SignupForm", () => {
    const src = readSrc("components/layout/SiteFooter.tsx");
    expect(src).not.toMatch(/from.*newsletter\/SignupForm/);
    expect(src).not.toMatch(/<SignupForm/);
  });

  it("SiteFooter imports and mounts ConsentToggle", () => {
    const src = readSrc("components/layout/SiteFooter.tsx");
    expect(src).toMatch(/ConsentToggle/);
  });

  it("homepage (app/page.tsx) does not mount SignupForm", () => {
    const src = readSrc("app/page.tsx");
    expect(src).not.toMatch(/<SignupForm/);
  });

  it("BlogPostRenderer does not import or mount newsletter InlinePrompt", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    expect(src).not.toMatch(/from.*newsletter\/InlinePrompt/);
    expect(src).not.toMatch(/<InlinePrompt/);
  });

  it("BlogPostRenderer imports InlineMiniLeadForm and NextStepOffer", () => {
    const src = readSrc("components/blog/BlogPostRenderer.tsx");
    expect(src).toMatch(/InlineMiniLeadForm/);
    expect(src).toMatch(/NextStepOffer/);
  });

  it("app/layout.tsx mounts IntentProvider, ReturningBar, DeepScrollModal, and qualified ExitIntentModal", () => {
    const src = readSrc("app/layout.tsx");
    expect(src).toMatch(/IntentProvider/);
    expect(src).toMatch(/ReturningBar/);
    expect(src).toMatch(/DeepScrollModal/);
    expect(src).toMatch(/ExitIntentModal/);
  });
});

// ---------------------------------------------------------------------------
// aff_ prefix assertions (no bfp_ / ptp_ / cfp_ keys leaked)
// ---------------------------------------------------------------------------
describe("aff_ storage prefix compliance", () => {
  const filesToCheck = [
    "components/intent/IntentProvider.tsx",
    "components/intent/DeepScrollModal.tsx",
    "components/intent/ReturningBar.tsx",
    "components/ui/StickyCTA.tsx",
    "components/blog/ExitIntentModal.tsx",
  ];

  for (const f of filesToCheck) {
    it(`${f} uses aff_ prefix and not bfp_/ptp_/cfp_`, () => {
      const src = readSrc(f);
      expect(src).not.toMatch(/bfp_/);
      expect(src).not.toMatch(/ptp:/);
      expect(src).not.toMatch(/cfp_/);
      // Must use aff_ for any persistent storage key
      if (src.match(/localStorage|sessionStorage/)) {
        expect(src).toMatch(/aff[_:]/);
      }
    });
  }
});

// ---------------------------------------------------------------------------
// No em-dash assertions in user-facing strings
// ---------------------------------------------------------------------------
describe("no em-dashes in user-facing strings", () => {
  const filesToCheck = [
    "components/intent/DeepScrollModal.tsx",
    "components/intent/ReturningBar.tsx",
    "components/intent/NextStepOffer.tsx",
    "components/blog/ExitIntentModal.tsx",
    "components/blog/InlineMiniLeadForm.tsx",
    "lib/intent/engine.ts",
  ];

  for (const f of filesToCheck) {
    it(`${f} contains no em-dashes`, () => {
      const src = readSrc(f);
      expect(src).not.toMatch(/—/); // em dash character
      expect(src).not.toMatch(/&mdash;/);
    });
  }
});

// ---------------------------------------------------------------------------
// No DJH in any intent/newsletter surface
// ---------------------------------------------------------------------------
describe("no DJH in intent surfaces", () => {
  const filesToCheck = [
    "components/intent/IntentProvider.tsx",
    "components/intent/DeepScrollModal.tsx",
    "components/intent/ReturningBar.tsx",
    "components/intent/NextStepOffer.tsx",
    "components/blog/ExitIntentModal.tsx",
    "components/blog/InlineMiniLeadForm.tsx",
    "lib/intent/taxonomy.ts",
    "lib/intent/engine.ts",
  ];

  for (const f of filesToCheck) {
    it(`${f} does not contain DJH`, () => {
      const src = readSrc(f);
      expect(src).not.toMatch(/DJH/);
    });
  }
});

// ---------------------------------------------------------------------------
// WS6: opener.ts, faq.ts, SpecialistWidget.tsx compliance
// ---------------------------------------------------------------------------
import {
  TOPIC_NOUN,
  TOPIC_HOOKS,
  OPENER_LLM_ENRICHMENT_ENABLED,
  variantIndex,
  pickOpener,
  openerFor,
  frictionOpener,
  exitOpener,
} from "@/lib/assistant/opener";
import { GENERIC as FAQ_GENERIC, BY_TOPIC as FAQ_BY_TOPIC, faqForTopic } from "@/lib/support/faq";

// All 6 topic keys (exhaustive).
const ALL_TOPIC_KEYS: TopicKey[] = [
  "pay-planning",
  "exit",
  "compliance-vat",
  "structure",
  "rnd",
  "international",
];

describe("WS6: opener.ts compliance", () => {
  it("OPENER_LLM_ENRICHMENT_ENABLED is false (deterministic Phase-0)", () => {
    expect(OPENER_LLM_ENRICHMENT_ENABLED).toBe(false);
  });

  it("TOPIC_NOUN is exhaustive over all 6 TopicKeys", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(TOPIC_NOUN[k], `TOPIC_NOUN[${k}] must be defined`).toBeTruthy();
    }
  });

  it("TOPIC_NOUN pay-planning is 'your salary and dividend split' (spec §4)", () => {
    expect(TOPIC_NOUN["pay-planning"]).toBe("your salary and dividend split");
  });

  it("TOPIC_NOUN exit is 'your agency exit'", () => {
    expect(TOPIC_NOUN["exit"]).toBe("your agency exit");
  });

  it("TOPIC_NOUN compliance-vat is 'your agency VAT'", () => {
    expect(TOPIC_NOUN["compliance-vat"]).toBe("your agency VAT");
  });

  it("TOPIC_NOUN structure is 'your agency structure'", () => {
    expect(TOPIC_NOUN["structure"]).toBe("your agency structure");
  });

  it("TOPIC_NOUN rnd is 'R&D tax relief'", () => {
    expect(TOPIC_NOUN["rnd"]).toBe("R&D tax relief");
  });

  it("TOPIC_NOUN international is 'moving your agency abroad'", () => {
    expect(TOPIC_NOUN["international"]).toBe("moving your agency abroad");
  });

  it("TOPIC_HOOKS is exhaustive over all 6 TopicKeys, each with exactly 3 lines", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(TOPIC_HOOKS[k], `TOPIC_HOOKS[${k}] must be defined`).toBeTruthy();
      expect(TOPIC_HOOKS[k].length, `TOPIC_HOOKS[${k}] must have 3 hooks`).toBe(3);
      for (let i = 0; i < 3; i++) {
        expect(typeof TOPIC_HOOKS[k][i]).toBe("string");
        expect(TOPIC_HOOKS[k][i].length).toBeGreaterThan(10);
      }
    }
  });

  it("no em-dash (U+2014) in any TOPIC_HOOKS string", () => {
    for (const k of ALL_TOPIC_KEYS) {
      for (const line of TOPIC_HOOKS[k]) {
        expect(line, `TOPIC_HOOKS[${k}] contains em-dash`).not.toContain("—");
      }
    }
  });

  it("no double-hyphen em-dash substitute in any TOPIC_HOOKS string", () => {
    for (const k of ALL_TOPIC_KEYS) {
      for (const line of TOPIC_HOOKS[k]) {
        expect(line, `TOPIC_HOOKS[${k}] contains double-hyphen`).not.toMatch(/ -- /);
      }
    }
  });

  it("no em-dash in any TOPIC_NOUN string", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(TOPIC_NOUN[k]).not.toContain("—");
      expect(TOPIC_NOUN[k]).not.toMatch(/ -- /);
    }
  });

  it("no 'DJH' in any TOPIC_HOOKS or TOPIC_NOUN string", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(TOPIC_NOUN[k]).not.toContain("DJH");
      for (const line of TOPIC_HOOKS[k]) {
        expect(line).not.toContain("DJH");
      }
    }
  });

  it("no credential claims in any TOPIC_HOOKS string", () => {
    const credentials = ["ICAEW", "ACA", "CTA", "chartered", "qualified accountant", "MLR"];
    for (const k of ALL_TOPIC_KEYS) {
      for (const line of TOPIC_HOOKS[k]) {
        for (const c of credentials) {
          expect(line.toLowerCase()).not.toContain(c.toLowerCase());
        }
      }
    }
  });
});

describe("WS6: opener determinism", () => {
  it("variantIndex 0 researching = 0", () => {
    expect(variantIndex(0, "researching")).toBe(0);
  });

  it("variantIndex 0 evaluating-us = 1", () => {
    expect(variantIndex(0, "evaluating-us")).toBe(1);
  });

  it("variantIndex 0 ready = 2", () => {
    expect(variantIndex(0, "ready")).toBe(2);
  });

  it("variantIndex clamps to max 2", () => {
    expect(variantIndex(5, "ready")).toBe(2);
  });

  it("pickOpener returns a non-empty string for every TopicKey at all ping indices", () => {
    const profile = {
      primaryTopic: null as TopicKey | null,
      secondaryTopic: null as TopicKey | null,
      stage: "researching" as const,
      depth: 0,
      signals: [] as string[],
      pageCount: 1,
    };
    for (const k of ALL_TOPIC_KEYS) {
      for (let i = 0; i < 4; i++) {
        const result = pickOpener({ ...profile, primaryTopic: k }, i);
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(10);
      }
    }
  });

  it("pickOpener returns the combo line when both exit and pay-planning are present", () => {
    const profile = {
      primaryTopic: "exit" as TopicKey,
      secondaryTopic: "pay-planning" as TopicKey,
      stage: "researching" as const,
      depth: 0.5,
      signals: [] as string[],
      pageCount: 2,
    };
    const line = pickOpener(profile, 0);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
    // The combo line should differ from a plain exit line.
    const exitLine = pickOpener(
      { ...profile, secondaryTopic: null },
      0,
    );
    expect(line).not.toBe(exitLine);
  });

  it("openerFor is an alias for pickOpener", () => {
    const profile = {
      primaryTopic: "pay-planning" as TopicKey,
      secondaryTopic: null as TopicKey | null,
      stage: "comparing" as const,
      depth: 0.3,
      signals: [] as string[],
      pageCount: 2,
    };
    expect(openerFor(profile, 1)).toBe(pickOpener(profile, 1));
  });

  it("frictionOpener returns a non-empty string with no em-dash", () => {
    const profile = {
      primaryTopic: "pay-planning" as TopicKey,
      secondaryTopic: null as TopicKey | null,
      stage: "researching" as const,
      depth: 0.1,
      signals: [] as string[],
      pageCount: 1,
    };
    const line = frictionOpener(profile);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
    expect(line).not.toContain("—");
    expect(line).not.toMatch(/ -- /);
  });

  it("exitOpener returns a non-empty string with no em-dash", () => {
    const profile = {
      primaryTopic: "exit" as TopicKey,
      secondaryTopic: null as TopicKey | null,
      stage: "ready" as const,
      depth: 0.8,
      signals: ["used-calculator"] as string[],
      pageCount: 3,
    };
    const line = exitOpener(profile);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
    expect(line).not.toContain("—");
    expect(line).not.toMatch(/ -- /);
  });
});

describe("WS6: faq.ts compliance", () => {
  it("GENERIC has exactly 3 entries", () => {
    expect(FAQ_GENERIC.length).toBe(3);
  });

  it("every GENERIC entry has non-empty q and a", () => {
    for (const faq of FAQ_GENERIC) {
      expect(faq.q.length).toBeGreaterThan(5);
      expect(faq.a.length).toBeGreaterThan(10);
    }
  });

  it("BY_TOPIC covers all 6 TopicKeys", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(FAQ_BY_TOPIC[k], `BY_TOPIC[${k}] must be defined`).toBeTruthy();
      expect((FAQ_BY_TOPIC[k] as unknown[]).length).toBeGreaterThan(0);
    }
  });

  it("faqForTopic returns GENERIC when topic is null", () => {
    expect(faqForTopic(null)).toBe(FAQ_GENERIC);
  });

  it("faqForTopic returns GENERIC when topic is undefined", () => {
    expect(faqForTopic(undefined)).toBe(FAQ_GENERIC);
  });

  it("faqForTopic returns topic block for every known TopicKey", () => {
    for (const k of ALL_TOPIC_KEYS) {
      const result = faqForTopic(k);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("no em-dash in any FAQ question or answer", () => {
    const allFaqs = [
      ...FAQ_GENERIC,
      ...Object.values(FAQ_BY_TOPIC).flatMap((arr) => arr ?? []),
    ];
    for (const faq of allFaqs) {
      expect(faq.q, "FAQ question contains em-dash").not.toContain("—");
      expect(faq.a, "FAQ answer contains em-dash").not.toContain("—");
      expect(faq.q, "FAQ question contains double-hyphen").not.toMatch(/ -- /);
      expect(faq.a, "FAQ answer contains double-hyphen").not.toMatch(/ -- /);
    }
  });

  it("no 'DJH' in any FAQ question or answer", () => {
    const allFaqs = [
      ...FAQ_GENERIC,
      ...Object.values(FAQ_BY_TOPIC).flatMap((arr) => arr ?? []),
    ];
    for (const faq of allFaqs) {
      expect(faq.q).not.toContain("DJH");
      expect(faq.a).not.toContain("DJH");
    }
  });

  it("no credential claims in any FAQ answer", () => {
    const credentials = ["ICAEW", "ACA", "CTA", "chartered", "qualified accountant", "MLR-supervised"];
    const allFaqs = [
      ...FAQ_GENERIC,
      ...Object.values(FAQ_BY_TOPIC).flatMap((arr) => arr ?? []),
    ];
    for (const faq of allFaqs) {
      for (const c of credentials) {
        expect(faq.a.toLowerCase(), `FAQ answer contains credential claim '${c}'`).not.toContain(c.toLowerCase());
      }
    }
  });

  it("pay-planning FAQ answer mentions 2026/27 dividend rate", () => {
    const payFaqs = FAQ_BY_TOPIC["pay-planning"] ?? [];
    const combined = payFaqs.map((f) => f.a).join(" ");
    expect(combined).toMatch(/2026\/27|10\.75|35\.75|39\.35/);
  });

  it("exit FAQ answer mentions BADR 18% and 14% for 2026/27", () => {
    const exitFaqs = FAQ_BY_TOPIC["exit"] ?? [];
    const combined = exitFaqs.map((f) => f.a).join(" ");
    expect(combined).toMatch(/18|14/);
    expect(combined).toMatch(/BADR|Business Asset Disposal/i);
  });

  it("compliance-vat FAQ mentions 16.5% limited-cost trader rate", () => {
    const vatFaqs = FAQ_BY_TOPIC["compliance-vat"] ?? [];
    const combined = vatFaqs.map((f) => f.a).join(" ");
    expect(combined).toMatch(/16\.5|limited.cost/i);
  });

  it("rnd FAQ answer includes honesty framing (most agency work does not qualify)", () => {
    const rndFaqs = FAQ_BY_TOPIC["rnd"] ?? [];
    const combined = rndFaqs.map((f) => f.q + " " + f.a).join(" ");
    expect(combined).toMatch(/does not|routine|not.qualify|specific|only qualify/i);
  });

  it("international FAQ includes relocation hedge (no firm UAE figures, temporary non-residence)", () => {
    const intlFaqs = FAQ_BY_TOPIC["international"] ?? [];
    const combined = intlFaqs.map((f) => f.a).join(" ");
    expect(combined).toMatch(/non.residen|UAE|temporary/i);
  });
});

describe("WS6: SpecialistWidget source compliance (grep assertions)", () => {
  it("SpecialistWidget.tsx uses aff_assistant_active key", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).toMatch(/aff_assistant_active/);
  });

  it("SpecialistWidget.tsx uses captureMode email_only", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    // Both must appear; close enough in a compact payload literal.
    expect(src).toMatch(/captureMode/);
    expect(src).toMatch(/email_only/);
  });

  it("SpecialistWidget.tsx passes honeypot enquiry_ref to submitAffLead", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).toMatch(/enquiry_ref/);
    expect(src).toMatch(/submitAffLead/);
  });

  it("SpecialistWidget.tsx does NOT early-return on honeypot fill", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    // The honeypot value is logged/passed but must not cause an early return.
    // We check that there is no 'if (honeypot) return' pattern.
    expect(src).not.toMatch(/if\s*\(\s*honeypot\s*\)\s*return/);
  });

  it("SpecialistWidget.tsx uses leadConsentText in code (not resourceConsentText)", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).toMatch(/leadConsentText/);
    // Strip comment lines so explanatory comments do not trigger a false positive.
    const codeOnly = src
      .split("\n")
      .filter((l) => !l.trimStart().startsWith("*") && !l.trimStart().startsWith("//"))
      .join("\n");
    expect(codeOnly).not.toMatch(/resourceConsentText/);
  });

  it("SpecialistWidget.tsx CADENCE_THRESHOLDS_MS = [30000, 70000, 120000, 180000]", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).toMatch(/30[_,]?000/);
    expect(src).toMatch(/70[_,]?000/);
    expect(src).toMatch(/120[_,]?000/);
    expect(src).toMatch(/180[_,]?000/);
  });

  it("SpecialistWidget.tsx AUTO_OPEN_DELAY_MS = 600", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).toMatch(/AUTO_OPEN_DELAY_MS\s*=\s*600|setTimeout[^)]*600/);
  });

  it("SpecialistWidget.tsx does not USE var(--gold), var(--navy), var(--dark), var(--primary) in code", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    // Strip comment lines (JSDoc block lines starting with '*' and '//' lines)
    // so that prohibition notes in comments do not trigger the assertion.
    const codeOnly = src
      .split("\n")
      .filter((l) => !l.trimStart().startsWith("*") && !l.trimStart().startsWith("//"))
      .join("\n");
    expect(codeOnly).not.toMatch(/var\(--gold\)/);
    expect(codeOnly).not.toMatch(/var\(--navy\)/);
    expect(codeOnly).not.toMatch(/var\(--dark\)/);
    expect(codeOnly).not.toMatch(/var\(--primary\)/);
  });

  it("SpecialistWidget.tsx does not contain 'DJH'", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).not.toMatch(/DJH/);
  });

  it("SpecialistWidget.tsx does not contain em-dash in user-facing strings", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).not.toContain("—");
    expect(src).not.toMatch(/&mdash;/);
  });

  it("SpecialistWidget.tsx no /book path (contact only)", () => {
    const src = readSrc("components/support/SpecialistWidget.tsx");
    expect(src).not.toMatch(/["'`]\/book["'`]/);
  });

  it("app/layout.tsx mounts SpecialistWidget next to ExitIntentModal", () => {
    const src = readSrc("app/layout.tsx");
    expect(src).toMatch(/SpecialistWidget/);
    expect(src).toMatch(/ExitIntentModal/);
  });
});

describe("WS6: journeyModel.ts source compliance (grep assertions)", () => {
  it("journeyModel.ts uses storage key aff_journey", () => {
    const src = readSrc("lib/intent/journeyModel.ts");
    expect(src).toMatch(/aff_journey/);
  });

  it("journeyModel.ts has all three special-page flags (/about, /services, /contact)", () => {
    const src = readSrc("lib/intent/journeyModel.ts");
    expect(src).toMatch(/visitedAbout/);
    expect(src).toMatch(/visitedServices/);
    expect(src).toMatch(/visitedContact/);
  });

  it("journeyModel.ts implements the 4-stage ladder", () => {
    const src = readSrc("lib/intent/journeyModel.ts");
    expect(src).toMatch(/researching/);
    expect(src).toMatch(/comparing/);
    expect(src).toMatch(/evaluating-us/);
    expect(src).toMatch(/ready/);
  });

  it("journeyModel.ts does not use bfp_, ptp_, cfp_, dfp_ prefix", () => {
    const src = readSrc("lib/intent/journeyModel.ts");
    expect(src).not.toMatch(/bfp_/);
    expect(src).not.toMatch(/ptp_/);
    expect(src).not.toMatch(/cfp_/);
    expect(src).not.toMatch(/dfp_/);
  });
});
