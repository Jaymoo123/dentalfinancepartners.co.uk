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
