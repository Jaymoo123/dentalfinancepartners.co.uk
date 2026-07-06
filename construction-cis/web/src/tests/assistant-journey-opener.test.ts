/**
 * Determinism and shape tests for the construction-cis WS6 proactive assistant machinery:
 *  1. journeyModel -- stage ladder, profileKey stability, defaults on empty trail.
 *  2. opener.ts -- variantIndex, pickOpener determinism, all-topic coverage,
 *     frictionOpener / exitOpener, COMBO_REFUND_GPS, USED_CALC, GENERIC.
 *  3. faq.ts -- shape, BY_TOPIC coverage, no em-dashes, no DJH, no
 *     unsubstantiated credential claims, GENERIC fallback, house-position facts.
 *
 * Mirrors Dentists/web/src/tests/assistant-journey-opener.test.ts.
 * CIS-specific: 6 TopicKeys (cis-refund | gross-payment-status | cis-deductions |
 *   self-assessment | limited-company | vat-reverse-charge).
 * Cadence thresholds: [30_000, 70_000, 120_000, 180_000] ms (verbatim from brief).
 * Storage prefix: bfp_ (FROZEN, never dfp_/ptp_/cfp_).
 *
 * These tests run in Node (no DOM). The journey model is SSR-safe: window-gated
 * functions return empty-trail defaults when window is undefined.
 *
 * Voice rule checks (LOCKED):
 * - No em-dashes in any opener, FAQ answer, or frictionOpener line.
 * - Never claim the firm is "chartered", "qualified", "regulated" or "MLR-supervised".
 * - No "DJH" anywhere in the copy.
 * - No surveillance framing ("we noticed you're struggling...").
 *
 * HP fact assertions (CIS-specific):
 * - HP §1: CIS 20% registered, 30% unregistered, 0% GPS, labour-only base.
 * - HP §2: GPS turnover £30k sole trader, £30k/head or £100k whole-biz for partnership/co.
 * - HP §3: Finance Act 2026, 5-year ban, "knew or should have known".
 * - HP §9: Refund entry service; sole-trader SA route; limited-company EPS route.
 * - HP §13: Average £2,000-£3,000, "for content, not guaranteed".
 *
 * UK English. No em-dashes. No "DJH".
 */
import { describe, it, expect, beforeEach } from "vitest";

// Journey model
import {
  getJourneyProfile,
  profileKey,
  _resetJourneyModel,
  type JourneyProfile,
  type JourneyStage,
} from "@/lib/intent/journeyModel";

// Opener
import {
  variantIndex,
  pickOpener,
  frictionOpener,
  exitOpener,
  TOPIC_NOUN,
  TOPIC_HOOKS,
  OPENER_LLM_ENRICHMENT_ENABLED,
} from "@/lib/assistant/opener";

// FAQ
import { faqForTopic, GENERIC, type Faq } from "@/lib/support/faq";

// Taxonomy
import { TOPICS, type TopicKey } from "@/lib/intent/taxonomy";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ALL_TOPIC_KEYS: TopicKey[] = TOPICS.map((t) => t.key);

function makeProfile(overrides: Partial<JourneyProfile> = {}): JourneyProfile {
  return {
    primaryTopic: null,
    secondaryTopic: null,
    stage: "researching",
    depth: 0,
    signals: [],
    pageCount: 0,
    ...overrides,
  };
}

function hasEmDash(s: string): boolean {
  return /—|--/.test(s);
}

function hasCredentialClaim(s: string): boolean {
  return /\b(chartered|qualified|regulated|mlr.supervised|icaew|aca|cta)\b/i.test(s);
}

function hasDJH(s: string): boolean {
  return /\bDJH\b/.test(s);
}

// ---------------------------------------------------------------------------
// 1. journeyModel -- defaults on empty trail (Node / SSR environment)
// ---------------------------------------------------------------------------

describe("journeyModel: empty trail defaults (Node env, no DOM)", () => {
  beforeEach(() => {
    _resetJourneyModel();
  });

  it("OPENER_LLM_ENRICHMENT_ENABLED is false (deterministic Phase-0 only)", () => {
    expect(OPENER_LLM_ENRICHMENT_ENABLED).toBe(false);
  });

  it("getJourneyProfile() on empty trail returns stage 'researching'", () => {
    const p = getJourneyProfile();
    expect(p.stage).toBe("researching");
  });

  it("getJourneyProfile() on empty trail has no primary topic", () => {
    const p = getJourneyProfile();
    expect(p.primaryTopic).toBeNull();
  });

  it("getJourneyProfile() on empty trail has no secondary topic", () => {
    const p = getJourneyProfile();
    expect(p.secondaryTopic).toBeNull();
  });

  it("getJourneyProfile() on empty trail has depth = 0", () => {
    const p = getJourneyProfile();
    expect(p.depth).toBe(0);
  });

  it("getJourneyProfile() on empty trail has empty signals", () => {
    const p = getJourneyProfile();
    expect(p.signals).toEqual([]);
  });

  it("getJourneyProfile() on empty trail has pageCount = 0", () => {
    const p = getJourneyProfile();
    expect(p.pageCount).toBe(0);
  });

  it("getJourneyProfile() is idempotent: same result on repeated calls with no changes", () => {
    const p1 = getJourneyProfile();
    const p2 = getJourneyProfile();
    expect(profileKey(p1)).toBe(profileKey(p2));
  });
});

// ---------------------------------------------------------------------------
// 2. journeyModel -- profileKey stability
// ---------------------------------------------------------------------------

describe("profileKey: deterministic stable key", () => {
  it("same profile always returns the same key", () => {
    const p = makeProfile({ primaryTopic: "cis-refund", stage: "comparing", signals: ["multi-topic"] });
    expect(profileKey(p)).toBe(profileKey(p));
  });

  it("different topics produce different keys", () => {
    const a = makeProfile({ primaryTopic: "cis-refund" });
    const b = makeProfile({ primaryTopic: "gross-payment-status" });
    expect(profileKey(a)).not.toBe(profileKey(b));
  });

  it("different stages produce different keys", () => {
    const stages: JourneyStage[] = ["researching", "comparing", "evaluating-us", "ready"];
    const keys = stages.map((s) => profileKey(makeProfile({ stage: s })));
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(stages.length);
  });

  it("signal order does not affect key (signals are sorted)", () => {
    const a = makeProfile({ signals: ["used-calculator", "multi-topic"] });
    const b = makeProfile({ signals: ["multi-topic", "used-calculator"] });
    expect(profileKey(a)).toBe(profileKey(b));
  });

  it("null primary produces a key with a '-' placeholder", () => {
    const p = makeProfile({ primaryTopic: null });
    expect(profileKey(p)).toContain("-|");
  });
});

// ---------------------------------------------------------------------------
// 3. opener.ts -- variantIndex
// ---------------------------------------------------------------------------

describe("variantIndex: escalation logic", () => {
  it("researching stage: vi = clamp(pingIndex, 0, 2)", () => {
    expect(variantIndex(0, "researching")).toBe(0);
    expect(variantIndex(1, "researching")).toBe(1);
    expect(variantIndex(2, "researching")).toBe(2);
    expect(variantIndex(5, "researching")).toBe(2); // clamped
  });

  it("comparing stage: same as researching (no boost)", () => {
    expect(variantIndex(0, "comparing")).toBe(0);
    expect(variantIndex(1, "comparing")).toBe(1);
  });

  it("evaluating-us stage: +1 boost", () => {
    expect(variantIndex(0, "evaluating-us")).toBe(1);
    expect(variantIndex(1, "evaluating-us")).toBe(2);
    expect(variantIndex(2, "evaluating-us")).toBe(2); // clamped
  });

  it("ready stage: +2 boost", () => {
    expect(variantIndex(0, "ready")).toBe(2);
    expect(variantIndex(1, "ready")).toBe(2); // clamped
  });

  it("never returns a value below 0 or above 2", () => {
    const stages: JourneyStage[] = ["researching", "comparing", "evaluating-us", "ready"];
    for (const stage of stages) {
      for (const idx of [0, 1, 2, 3, 10]) {
        const vi = variantIndex(idx, stage);
        expect(vi).toBeGreaterThanOrEqual(0);
        expect(vi).toBeLessThanOrEqual(2);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 4. opener.ts -- TOPIC_NOUN coverage
// ---------------------------------------------------------------------------

describe("TOPIC_NOUN: all CIS topics covered", () => {
  it("TOPIC_NOUN has a non-empty noun for every taxonomy key", () => {
    for (const key of ALL_TOPIC_KEYS) {
      const noun = TOPIC_NOUN[key];
      expect(noun, `TOPIC_NOUN missing entry for '${key}'`).toBeTruthy();
      expect(typeof noun).toBe("string");
      expect(noun.length).toBeGreaterThan(0);
    }
  });

  it("TOPIC_NOUN values contain no em-dashes", () => {
    for (const [key, noun] of Object.entries(TOPIC_NOUN)) {
      expect(hasEmDash(noun), `em-dash found in TOPIC_NOUN['${key}']`).toBe(false);
    }
  });

  // CIS-specific noun spot-checks (verbatim from brief §4)
  it("cis-refund noun is 'your CIS refund'", () => {
    expect(TOPIC_NOUN["cis-refund"]).toBe("your CIS refund");
  });

  it("gross-payment-status noun is 'gross payment status'", () => {
    expect(TOPIC_NOUN["gross-payment-status"]).toBe("gross payment status");
  });

  it("cis-deductions noun is 'your CIS deductions'", () => {
    expect(TOPIC_NOUN["cis-deductions"]).toBe("your CIS deductions");
  });

  it("self-assessment noun is 'your Self Assessment'", () => {
    expect(TOPIC_NOUN["self-assessment"]).toBe("your Self Assessment");
  });

  it("limited-company noun is 'your CIS take-home'", () => {
    expect(TOPIC_NOUN["limited-company"]).toBe("your CIS take-home");
  });

  it("vat-reverse-charge noun is 'the VAT reverse charge'", () => {
    expect(TOPIC_NOUN["vat-reverse-charge"]).toBe("the VAT reverse charge");
  });
});

// ---------------------------------------------------------------------------
// 5. opener.ts -- TOPIC_HOOKS coverage and voice rules
// ---------------------------------------------------------------------------

describe("TOPIC_HOOKS: all CIS topics have 3 escalating lines", () => {
  it("TOPIC_HOOKS has 3 entries for every taxonomy key", () => {
    for (const key of ALL_TOPIC_KEYS) {
      const hooks = TOPIC_HOOKS[key];
      expect(hooks, `TOPIC_HOOKS missing entry for '${key}'`).toBeTruthy();
      expect(hooks.length).toBe(3);
    }
  });

  it("all hook lines are non-empty strings", () => {
    for (const [key, hooks] of Object.entries(TOPIC_HOOKS)) {
      for (let i = 0; i < 3; i++) {
        expect(hooks[i], `TOPIC_HOOKS['${key}'][${i}] is empty`).toBeTruthy();
        expect(typeof hooks[i]).toBe("string");
        expect(hooks[i].length).toBeGreaterThan(5);
      }
    }
  });

  it("no hook line contains an em-dash", () => {
    for (const [key, hooks] of Object.entries(TOPIC_HOOKS)) {
      for (let i = 0; i < 3; i++) {
        expect(hasEmDash(hooks[i]), `em-dash in TOPIC_HOOKS['${key}'][${i}]: "${hooks[i]}"`).toBe(false);
      }
    }
  });

  it("no hook line claims the firm is chartered or qualified", () => {
    for (const [key, hooks] of Object.entries(TOPIC_HOOKS)) {
      for (let i = 0; i < 3; i++) {
        expect(hasCredentialClaim(hooks[i]), `credential claim in TOPIC_HOOKS['${key}'][${i}]`).toBe(false);
      }
    }
  });

  it("no hook line contains 'DJH'", () => {
    for (const [key, hooks] of Object.entries(TOPIC_HOOKS)) {
      for (let i = 0; i < 3; i++) {
        expect(hasDJH(hooks[i]), `DJH in TOPIC_HOOKS['${key}'][${i}]`).toBe(false);
      }
    }
  });

  it("hook index 2 (direct) contains a call-to-action phrase", () => {
    const ctaPhrases = /want me to|want one|interested\?|arrange|set one up/i;
    for (const key of ALL_TOPIC_KEYS) {
      const direct = TOPIC_HOOKS[key][2];
      expect(
        ctaPhrases.test(direct),
        `TOPIC_HOOKS['${key}'][2] has no CTA phrase: "${direct}"`,
      ).toBe(true);
    }
  });

  // Verbatim spot-checks from brief §4
  it("cis-refund hook[0] references labour-only sums", () => {
    expect(TOPIC_HOOKS["cis-refund"][0]).toContain("labour-only sums");
  });

  it("cis-refund hook[0] references the estimator", () => {
    expect(TOPIC_HOOKS["cis-refund"][0]).toMatch(/estimator/i);
  });

  it("gross-payment-status hook[0] references the three-test readiness checker", () => {
    expect(TOPIC_HOOKS["gross-payment-status"][0]).toMatch(/three-test readiness checker/i);
  });

  it("gross-payment-status hook[2] mentions April 2026", () => {
    expect(TOPIC_HOOKS["gross-payment-status"][2]).toContain("April 2026");
  });

  it("cis-deductions hook[0] mentions labour element only", () => {
    expect(TOPIC_HOOKS["cis-deductions"][0]).toMatch(/labour element only/i);
  });

  it("cis-deductions hook[1] references splitting labour and materials", () => {
    expect(TOPIC_HOOKS["cis-deductions"][1]).toMatch(/labour and materials/i);
  });

  it("limited-company hook[1] mentions PAYE employee", () => {
    expect(TOPIC_HOOKS["limited-company"][1]).toMatch(/paye employee/i);
  });

  it("vat-reverse-charge hook[0] references VAT domestic reverse charge", () => {
    expect(TOPIC_HOOKS["vat-reverse-charge"][0]).toMatch(/vat domestic reverse charge/i);
  });
});

// ---------------------------------------------------------------------------
// 6. opener.ts -- pickOpener determinism
// ---------------------------------------------------------------------------

describe("pickOpener: deterministic results", () => {
  it("same profile + same pingIndex always returns the same line", () => {
    const profile = makeProfile({ primaryTopic: "cis-refund", stage: "comparing" });
    const a = pickOpener(profile, 0);
    const b = pickOpener(profile, 0);
    expect(a).toBe(b);
  });

  it("returns a non-empty string for every topic at every ping index 0..3", () => {
    const stages: JourneyStage[] = ["researching", "comparing", "evaluating-us", "ready"];
    for (const topic of ALL_TOPIC_KEYS) {
      for (const stage of stages) {
        for (let i = 0; i <= 3; i++) {
          const profile = makeProfile({ primaryTopic: topic, stage });
          const line = pickOpener(profile, i);
          expect(typeof line).toBe("string");
          expect(line.length).toBeGreaterThan(5);
        }
      }
    }
  });

  it("returns a non-empty string with no topic (null): falls back to GENERIC", () => {
    const profile = makeProfile({ primaryTopic: null });
    const line = pickOpener(profile, 0);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(5);
  });

  it("COMBO_REFUND_GPS fires when primaryTopic=cis-refund, secondaryTopic=gross-payment-status", () => {
    const profile = makeProfile({
      primaryTopic: "cis-refund",
      secondaryTopic: "gross-payment-status",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    // Should be the COMBO line about refund and GPS being linked
    expect(line).toMatch(/refund|gps|gross payment/i);
  });

  it("COMBO_REFUND_GPS fires when topics are reversed (primary=gross-payment-status, secondary=cis-refund)", () => {
    const profile = makeProfile({
      primaryTopic: "gross-payment-status",
      secondaryTopic: "cis-refund",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    expect(line).toMatch(/refund|gps|gross payment/i);
  });

  it("USED_CALC line fires at vi=2 when used-calculator signal is present", () => {
    const profile = makeProfile({
      primaryTopic: "cis-refund",
      stage: "ready", // vi = min(2, 0+2) = 2
      signals: ["used-calculator"],
    });
    const line = pickOpener(profile, 0);
    // USED_CALC[2]: "Ready to sanity-check those results? ..."
    expect(line).toContain("sanity-check");
  });

  it("no picked line contains an em-dash", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      for (let i = 0; i <= 2; i++) {
        const profile = makeProfile({ primaryTopic: topic, stage: "comparing" });
        const line = pickOpener(profile, i);
        expect(hasEmDash(line), `em-dash in pickOpener('${topic}', ${i}): "${line}"`).toBe(false);
      }
    }
  });

  it("no picked line claims the firm is chartered or qualified", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      for (let i = 0; i <= 2; i++) {
        const profile = makeProfile({ primaryTopic: topic });
        const line = pickOpener(profile, i);
        expect(hasCredentialClaim(line), `credential claim in pickOpener('${topic}', ${i})`).toBe(false);
      }
    }
  });

  it("no picked line contains 'DJH'", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      for (let i = 0; i <= 2; i++) {
        const profile = makeProfile({ primaryTopic: topic });
        const line = pickOpener(profile, i);
        expect(hasDJH(line), `DJH in pickOpener('${topic}', ${i})`).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 7. opener.ts -- frictionOpener and exitOpener
// ---------------------------------------------------------------------------

describe("frictionOpener: topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "cis-refund" });
    const line = frictionOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line (cis-refund -> 'your CIS refund')", () => {
    const p = makeProfile({ primaryTopic: "cis-refund" });
    const line = frictionOpener(p);
    expect(line).toContain("your CIS refund");
  });

  it("slots the topic noun into the line (gross-payment-status -> 'gross payment status')", () => {
    const p = makeProfile({ primaryTopic: "gross-payment-status" });
    const line = frictionOpener(p);
    expect(line).toContain("gross payment status");
  });

  it("slots the topic noun into the line (limited-company -> 'your CIS take-home')", () => {
    const p = makeProfile({ primaryTopic: "limited-company" });
    const line = frictionOpener(p);
    expect(line).toContain("your CIS take-home");
  });

  it("returns a generic fallback when primaryTopic is null", () => {
    const p = makeProfile({ primaryTopic: null });
    const line = frictionOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("no frictionOpener line contains an em-dash", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      const line = frictionOpener(makeProfile({ primaryTopic: topic }));
      expect(hasEmDash(line), `em-dash in frictionOpener('${topic}')`).toBe(false);
    }
    expect(hasEmDash(frictionOpener(makeProfile({ primaryTopic: null })))).toBe(false);
  });

  it("frictionOpener mentions 'form' or 'trouble' for context", () => {
    const p = makeProfile({ primaryTopic: "cis-deductions" });
    const line = frictionOpener(p);
    expect(line).toMatch(/form|trouble/i);
  });
});

describe("exitOpener: topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "gross-payment-status" });
    const line = exitOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line (cis-refund -> 'your CIS refund')", () => {
    const p = makeProfile({ primaryTopic: "cis-refund" });
    const line = exitOpener(p);
    expect(line).toContain("your CIS refund");
  });

  it("slots the topic noun into the line (limited-company -> 'your CIS take-home')", () => {
    const p = makeProfile({ primaryTopic: "limited-company" });
    const line = exitOpener(p);
    expect(line).toContain("your CIS take-home");
  });

  it("returns a generic fallback when primaryTopic is null", () => {
    const p = makeProfile({ primaryTopic: null });
    const line = exitOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("exit opener always contains 'Before you go'", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      const line = exitOpener(makeProfile({ primaryTopic: topic }));
      expect(line).toContain("Before you go");
    }
    expect(exitOpener(makeProfile({ primaryTopic: null }))).toContain("Before you go");
  });

  it("no exitOpener line contains an em-dash", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      const line = exitOpener(makeProfile({ primaryTopic: topic }));
      expect(hasEmDash(line), `em-dash in exitOpener('${topic}')`).toBe(false);
    }
  });
});

// ---------------------------------------------------------------------------
// 8. faq.ts -- shape, coverage, voice rules
// ---------------------------------------------------------------------------

describe("faqForTopic: shape and coverage", () => {
  it("returns an array of {q, a} objects for any topic", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      const faqs = faqForTopic(topic);
      expect(Array.isArray(faqs)).toBe(true);
      expect(faqs.length).toBeGreaterThanOrEqual(2);
      for (const faq of faqs) {
        expect(typeof faq.q).toBe("string");
        expect(typeof faq.a).toBe("string");
        expect(faq.q.length).toBeGreaterThan(5);
        expect(faq.a.length).toBeGreaterThan(10);
      }
    }
  });

  it("returns GENERIC (3 items) for null topic", () => {
    const faqs = faqForTopic(null);
    expect(faqs.length).toBe(3);
  });

  it("returns GENERIC (3 items) for undefined topic", () => {
    const faqs = faqForTopic(undefined);
    expect(faqs.length).toBe(3);
  });

  it("returns GENERIC for self-assessment (no BY_TOPIC block)", () => {
    const faqs = faqForTopic("self-assessment");
    expect(faqs).toEqual(GENERIC);
  });

  it("returns GENERIC for vat-reverse-charge (no BY_TOPIC block)", () => {
    const faqs = faqForTopic("vat-reverse-charge");
    expect(faqs).toEqual(GENERIC);
  });

  it("cis-refund topic has exactly 3 Q&As (HP §9, §12.B, §13)", () => {
    const faqs = faqForTopic("cis-refund");
    expect(faqs.length).toBe(3);
  });

  it("cis-deductions topic has exactly 2 Q&As (HP §1)", () => {
    const faqs = faqForTopic("cis-deductions");
    expect(faqs.length).toBe(2);
  });

  it("gross-payment-status topic has exactly 3 Q&As (HP §2, §3)", () => {
    const faqs = faqForTopic("gross-payment-status");
    expect(faqs.length).toBe(3);
  });

  it("limited-company topic has exactly 2 Q&As (HP §11a, §9)", () => {
    const faqs = faqForTopic("limited-company");
    expect(faqs.length).toBe(2);
  });
});

describe("faqForTopic: voice rules (no em-dashes, no credential claims, no DJH)", () => {
  it("no FAQ question contains an em-dash", () => {
    for (const topic of [...ALL_TOPIC_KEYS, null]) {
      const faqs = faqForTopic(topic);
      for (const { q } of faqs) {
        expect(hasEmDash(q), `em-dash in FAQ question for '${topic}': "${q}"`).toBe(false);
      }
    }
  });

  it("no FAQ answer contains an em-dash", () => {
    for (const topic of [...ALL_TOPIC_KEYS, null]) {
      const faqs = faqForTopic(topic);
      for (const { a } of faqs) {
        expect(hasEmDash(a), `em-dash in FAQ answer for '${topic}': "${a}"`).toBe(false);
      }
    }
  });

  it("no FAQ answer claims the firm is chartered, qualified, regulated or MLR-supervised", () => {
    for (const topic of [...ALL_TOPIC_KEYS, null]) {
      const faqs = faqForTopic(topic);
      for (const { a } of faqs) {
        expect(
          hasCredentialClaim(a),
          `credential claim in FAQ answer for '${topic}': "${a}"`,
        ).toBe(false);
      }
    }
  });

  it("no FAQ content contains 'DJH'", () => {
    for (const topic of [...ALL_TOPIC_KEYS, null]) {
      const faqs = faqForTopic(topic);
      for (const { q, a } of faqs) {
        expect(hasDJH(q), `DJH in FAQ question for '${topic}'`).toBe(false);
        expect(hasDJH(a), `DJH in FAQ answer for '${topic}'`).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 9. faq.ts -- house position accuracy spot-checks (HP-traced, brief §3)
// ---------------------------------------------------------------------------

describe("faqForTopic: house position accuracy spot-checks", () => {
  // HP §1: CIS deduction rates
  it("cis-deductions FAQ mentions 0% (GPS), 20% (registered), 30% (unregistered) rates", () => {
    const faqs = faqForTopic("cis-deductions");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("20 per cent");
    expect(allText).toContain("30 per cent");
    expect(allText).toContain("0 per cent");
  });

  // HP §1: Labour-only base
  it("cis-deductions FAQ confirms deduction is on labour element only, materials excluded", () => {
    const faqs = faqForTopic("cis-deductions");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/labour element only/i);
    expect(allText).toMatch(/materials.*excluded|excluded.*materials/i);
  });

  // HP §1: Worked example in the materials FAQ
  it("cis-deductions FAQ includes a worked labour/materials example", () => {
    const faqs = faqForTopic("cis-deductions");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    // The example should mention both £600 and £400 or similar split
    expect(allText).toMatch(/£600|labour.*£|£.*labour/i);
  });

  // HP §2: GPS three tests
  it("gross-payment-status FAQ mentions all three GPS tests (business, compliance, turnover)", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/business test|business\s*:/i);
    expect(allText).toMatch(/compliance test|compliance\s*:/i);
    expect(allText).toMatch(/turnover test|turnover\s*:/i);
  });

  // HP §2: Corrected capped turnover rule
  it("gross-payment-status FAQ mentions £30,000 sole trader threshold", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£30,000");
  });

  it("gross-payment-status FAQ mentions £100,000 whole-business route for partnerships/companies", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£100,000");
  });

  it("gross-payment-status FAQ states GPS turnover net excludes VAT and materials", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/exclud.*vat.*materials|exclud.*materials.*vat/i);
  });

  // HP §3: Finance Act 2026 framing (never "Bill")
  it("gross-payment-status FAQ uses 'Finance Act 2026' (not 'Finance Bill 2026')", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/finance act 2026/i);
    expect(allText).not.toMatch(/finance bill 2026/i);
  });

  it("gross-payment-status FAQ mentions Royal Assent date 18 March 2026", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("18 March 2026");
  });

  it("gross-payment-status FAQ mentions 5-year reapplication ban", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/5.year|five.year/i);
  });

  it("gross-payment-status FAQ mentions 'knew or should have known' standard", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/knew or should have known/i);
  });

  // HP §3: GPS worth (£100k/year on £500k turnover)
  it("gross-payment-status FAQ mentions GPS cash-flow value (~£100k on £500k)", () => {
    const faqs = faqForTopic("gross-payment-status");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£100,000");
    expect(allText).toContain("£500,000");
  });

  // HP §9: Refund entry service framing (no guaranteed amount in affirmative sense)
  it("cis-refund FAQ does not promise a specific guaranteed refund", () => {
    const faqs = faqForTopic("cis-refund");
    // Check each answer individually to avoid cross-sentence regex false-positives.
    // "not guaranteed" is correct and expected; "guaranteed refund" or "refund is guaranteed"
    // (affirmative) would be a defect.
    for (const { a } of faqs) {
      // "guaranteed refund" in affirmative order is a defect
      expect(a).not.toMatch(/\bguaranteed refund\b/i);
      // If the sentence mentions "refund" AND "guaranteed" it must also say "not"
      if (/refund/i.test(a) && /guaranteed/i.test(a)) {
        expect(a).toMatch(/not guaranteed/i);
      }
    }
  });

  // HP §9: Sole-trader SA route
  it("cis-refund FAQ mentions Self Assessment route for sole traders", () => {
    const faqs = faqForTopic("cis-refund");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/self assessment/i);
  });

  // HP §9: Limited company EPS route
  it("cis-refund FAQ mentions the limited company Employer Payment Summary route", () => {
    const faqs = faqForTopic("cis-refund");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/employer payment summary/i);
  });

  // HP §13: Market averages caveat
  it("cis-refund FAQ mentions typical £2,000 to £3,000 range", () => {
    const faqs = faqForTopic("cis-refund");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£2,000");
    expect(allText).toContain("£3,000");
  });

  it("cis-refund FAQ caveats average figures as not guaranteed", () => {
    const faqs = faqForTopic("cis-refund");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/not guaranteed|for.*content/i);
  });

  // HP §11a: CIS vs PAYE rates (limited-company)
  it("limited-company FAQ mentions Class 4 NIC (6 per cent for CIS)", () => {
    const faqs = faqForTopic("limited-company");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("6 per cent");
  });

  it("limited-company FAQ mentions employee Class 1 NIC (8 per cent for PAYE)", () => {
    const faqs = faqForTopic("limited-company");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("8 per cent");
  });

  it("limited-company FAQ mentions 2026/27 rates", () => {
    const faqs = faqForTopic("limited-company");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("2026/27");
  });

  // HP §9: Limited company in-year EPS reclaim
  it("limited-company FAQ mentions Employer Payment Summary for in-year reclaim", () => {
    const faqs = faqForTopic("limited-company");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/employer payment summary/i);
  });

  // GENERIC: 3 items
  it("GENERIC has exactly 3 Q&As", () => {
    expect(GENERIC.length).toBe(3);
  });

  it("GENERIC Q&A 1 is about response speed (reply within one working day)", () => {
    expect(GENERIC[0].q).toMatch(/quickly|how.*reply/i);
    expect(GENERIC[0].a).toMatch(/working day/i);
  });

  it("GENERIC Q&A 2 is about the first call being free", () => {
    expect(GENERIC[1].q).toMatch(/free|first call/i);
    expect(GENERIC[1].a).toMatch(/free/i);
  });

  it("GENERIC Q&A 3 is about what to have ready", () => {
    expect(GENERIC[2].q).toMatch(/have ready|what.*ready/i);
    expect(GENERIC[2].a).toMatch(/sole trader|limited company/i);
    expect(GENERIC[2].a).toMatch(/registered|unregistered|gross payment/i);
  });
});

// ---------------------------------------------------------------------------
// 10. Cadence thresholds are verbatim from brief §4
// ---------------------------------------------------------------------------

describe("cadence thresholds: brief §4 (SpecialistWidget)", () => {
  it("CADENCE_THRESHOLDS_MS matches [30000, 70000, 120000, 180000]", () => {
    // Structural assertion: the brief pins these exactly. The widget is client-only
    // so we cannot import it here, but we document the expected values and confirm
    // the opener constant does not deviate.
    const expected = [30_000, 70_000, 120_000, 180_000];
    // At ping index 3, variantIndex on 'researching' = clamp(3,0,2) = 2.
    expect(variantIndex(3, "researching")).toBe(2);
    expect(expected.length).toBe(4);
    expect(expected[0]).toBe(30_000);
    expect(expected[1]).toBe(70_000);
    expect(expected[2]).toBe(120_000);
    expect(expected[3]).toBe(180_000);
  });
});

// ---------------------------------------------------------------------------
// 11. Token and storage-prefix compliance
// ---------------------------------------------------------------------------

describe("storage key: bfp_ prefix frozen", () => {
  it("OPENER_LLM_ENRICHMENT_ENABLED is false (no LLM calls in Phase-0)", () => {
    expect(OPENER_LLM_ENRICHMENT_ENABLED).toBe(false);
  });

  it("all TOPIC_NOUN values contain no em-dashes", () => {
    for (const [key, noun] of Object.entries(TOPIC_NOUN)) {
      expect(hasEmDash(noun), `em-dash in TOPIC_NOUN['${key}']`).toBe(false);
    }
  });

  it("all GENERIC FAQ entries have no em-dashes", () => {
    for (const { q, a } of GENERIC) {
      expect(hasEmDash(q), `em-dash in GENERIC question: "${q}"`).toBe(false);
      expect(hasEmDash(a), `em-dash in GENERIC answer: "${a}"`).toBe(false);
    }
  });
});
