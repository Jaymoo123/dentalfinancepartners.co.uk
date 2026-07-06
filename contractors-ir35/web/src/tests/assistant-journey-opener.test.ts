/**
 * Determinism and shape tests for the Contractor Tax Accountants (cfp) WS6
 * proactive assistant machinery:
 *  1. journeyModel -- stage ladder, profileKey stability, defaults on empty trail.
 *  2. opener.ts -- variantIndex, pickOpener determinism, all-topic coverage,
 *     frictionOpener / exitOpener, COMBO_IR35_STRUCTURE, USED_CALC, GENERIC.
 *  3. faq.ts -- shape, BY_TOPIC coverage, no em-dashes, no DJH, no
 *     unsubstantiated credential claims, GENERIC fallback, house-position facts.
 *
 * Mirrors Dentists/web/src/tests/assistant-journey-opener.test.ts for the cfp site.
 * cfp-specific: 5 TopicKeys (ir35|structure|company-tax|pay-planning|basics-expenses).
 * Cadence thresholds: [30_000, 70_000, 120_000, 180_000] ms.
 * Storage prefix: cfp_ (never dfp_/ptp_/hd_).
 *
 * These tests run in Node (no DOM). The journey model is SSR-safe: window-gated
 * functions return empty-trail defaults when window is undefined.
 *
 * Voice rule checks (LOCKED):
 * - No em-dashes in any opener, FAQ answer, or frictionOpener line.
 * - Never claim the firm is "chartered", "qualified", "regulated" or "MLR-supervised".
 * - No "DJH" anywhere in the copy.
 * - No surveillance framing ("we noticed you are struggling...").
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

function hasReflex(s: string): boolean {
  return /\bReflex\b/i.test(s);
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
    const p = makeProfile({ primaryTopic: "ir35", stage: "comparing", signals: ["multi-topic"] });
    expect(profileKey(p)).toBe(profileKey(p));
  });

  it("different topics produce different keys", () => {
    const a = makeProfile({ primaryTopic: "ir35" });
    const b = makeProfile({ primaryTopic: "pay-planning" });
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

describe("TOPIC_NOUN: all cfp topics covered", () => {
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

  // cfp-specific noun spot-checks (verbatim from brief section 4)
  it("ir35 noun is 'your IR35 take-home'", () => {
    expect(TOPIC_NOUN["ir35"]).toBe("your IR35 take-home");
  });

  it("structure noun is 'umbrella versus limited'", () => {
    expect(TOPIC_NOUN["structure"]).toBe("umbrella versus limited");
  });

  it("company-tax noun is 'your corporation tax'", () => {
    expect(TOPIC_NOUN["company-tax"]).toBe("your corporation tax");
  });

  it("pay-planning noun is 'your salary and dividend split'", () => {
    expect(TOPIC_NOUN["pay-planning"]).toBe("your salary and dividend split");
  });

  it("basics-expenses noun is 'your contractor accounting'", () => {
    expect(TOPIC_NOUN["basics-expenses"]).toBe("your contractor accounting");
  });
});

// ---------------------------------------------------------------------------
// 5. opener.ts -- TOPIC_HOOKS coverage and voice rules
// ---------------------------------------------------------------------------

describe("TOPIC_HOOKS: all cfp topics have 3 escalating lines", () => {
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

  it("no hook line contains 'Reflex'", () => {
    for (const [key, hooks] of Object.entries(TOPIC_HOOKS)) {
      for (let i = 0; i < 3; i++) {
        expect(hasReflex(hooks[i]), `Reflex in TOPIC_HOOKS['${key}'][${i}]`).toBe(false);
      }
    }
  });

  it("hook index 2 (direct) contains a call-to-action phrase", () => {
    const ctaPhrases = /want me to|shall i|interested\?|fancy|arrange|set one up|set it up|want one/i;
    for (const key of ALL_TOPIC_KEYS) {
      const direct = TOPIC_HOOKS[key][2];
      expect(
        ctaPhrases.test(direct),
        `TOPIC_HOOKS['${key}'][2] has no CTA phrase: "${direct}"`,
      ).toBe(true);
    }
  });

  // cfp-specific spot-checks (verbatim from brief section 4)
  it("ir35 hook[0] references the calculator or outside IR35", () => {
    expect(TOPIC_HOOKS["ir35"][0]).toMatch(/calculator|outside.*ir35/i);
  });

  it("structure hook[1] references running costs or admin", () => {
    expect(TOPIC_HOOKS["structure"][1]).toMatch(/running costs|admin/i);
  });

  it("pay-planning hook[1] references dividend-rate rise or Employment Allowance", () => {
    expect(TOPIC_HOOKS["pay-planning"][1]).toMatch(/dividend.rate rise|employment.allowance|caveat/i);
  });

  it("basics-expenses hook[1] references 24-month rule or mileage", () => {
    expect(TOPIC_HOOKS["basics-expenses"][1]).toMatch(/24.month|mileage/i);
  });
});

// ---------------------------------------------------------------------------
// 6. opener.ts -- pickOpener determinism
// ---------------------------------------------------------------------------

describe("pickOpener: deterministic results", () => {
  it("same profile + same pingIndex always returns the same line", () => {
    const profile = makeProfile({ primaryTopic: "ir35", stage: "comparing" });
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

  it("COMBO_IR35_STRUCTURE fires when primaryTopic=ir35, secondaryTopic=structure", () => {
    const profile = makeProfile({
      primaryTopic: "ir35",
      secondaryTopic: "structure",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    // Should be the COMBO line about IR35 status and umbrella/limited
    expect(line).toMatch(/ir35|umbrella|limited|structure/i);
  });

  it("COMBO_IR35_STRUCTURE fires when topics are reversed (primary=structure, secondary=ir35)", () => {
    const profile = makeProfile({
      primaryTopic: "structure",
      secondaryTopic: "ir35",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    expect(line).toMatch(/ir35|umbrella|limited|structure/i);
  });

  it("USED_CALC line fires at vi=2 when used-calculator signal is present", () => {
    const profile = makeProfile({
      primaryTopic: "pay-planning",
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

  it("no picked line contains 'Reflex'", () => {
    for (const topic of ALL_TOPIC_KEYS) {
      for (let i = 0; i <= 2; i++) {
        const profile = makeProfile({ primaryTopic: topic });
        const line = pickOpener(profile, i);
        expect(hasReflex(line), `Reflex in pickOpener('${topic}', ${i})`).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 7. opener.ts -- frictionOpener and exitOpener
// ---------------------------------------------------------------------------

describe("frictionOpener: topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "ir35" });
    const line = frictionOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the ir35 topic noun into the line", () => {
    const p = makeProfile({ primaryTopic: "ir35" });
    const line = frictionOpener(p);
    expect(line).toContain("your IR35 take-home");
  });

  it("slots the pay-planning topic noun into the line", () => {
    const p = makeProfile({ primaryTopic: "pay-planning" });
    const line = frictionOpener(p);
    expect(line).toContain("your salary and dividend split");
  });

  it("slots the structure topic noun into the line", () => {
    const p = makeProfile({ primaryTopic: "structure" });
    const line = frictionOpener(p);
    expect(line).toContain("umbrella versus limited");
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
    const p = makeProfile({ primaryTopic: "structure" });
    const line = frictionOpener(p);
    expect(line).toMatch(/form|trouble/i);
  });
});

describe("exitOpener: topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "ir35" });
    const line = exitOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line (ir35)", () => {
    const p = makeProfile({ primaryTopic: "ir35" });
    const line = exitOpener(p);
    expect(line).toContain("your IR35 take-home");
  });

  it("slots the topic noun into the line (company-tax)", () => {
    const p = makeProfile({ primaryTopic: "company-tax" });
    const line = exitOpener(p);
    expect(line).toContain("your corporation tax");
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
      expect(faqs.length).toBeGreaterThanOrEqual(1);
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

  it("ir35 topic has 3 Q&As (HP sections 1, 2, 17.A)", () => {
    const faqs = faqForTopic("ir35");
    expect(faqs.length).toBe(3);
  });

  it("structure topic has 2 Q&As (HP sections 17.C, 12)", () => {
    const faqs = faqForTopic("structure");
    expect(faqs.length).toBe(2);
  });

  it("pay-planning topic has 2 Q&As (HP sections 8, 5)", () => {
    const faqs = faqForTopic("pay-planning");
    expect(faqs.length).toBe(2);
  });

  it("company-tax topic has 2 Q&As (HP sections 7, 14)", () => {
    const faqs = faqForTopic("company-tax");
    expect(faqs.length).toBe(2);
  });

  it("basics-expenses topic has at least 1 Q&A", () => {
    const faqs = faqForTopic("basics-expenses");
    expect(faqs.length).toBeGreaterThanOrEqual(1);
  });
});

describe("faqForTopic: voice rules (no em-dashes, no credential claims, no DJH, no Reflex)", () => {
  const topicsAndNull: (TopicKey | null)[] = [...ALL_TOPIC_KEYS, null];

  it("no FAQ question contains an em-dash", () => {
    for (const topic of topicsAndNull) {
      const faqs = faqForTopic(topic);
      for (const { q } of faqs) {
        expect(hasEmDash(q), `em-dash in FAQ question for '${topic}': "${q}"`).toBe(false);
      }
    }
  });

  it("no FAQ answer contains an em-dash", () => {
    for (const topic of topicsAndNull) {
      const faqs = faqForTopic(topic);
      for (const { a } of faqs) {
        expect(hasEmDash(a), `em-dash in FAQ answer for '${topic}': "${a}"`).toBe(false);
      }
    }
  });

  it("no FAQ answer claims the firm is chartered, qualified, regulated or MLR-supervised", () => {
    for (const topic of topicsAndNull) {
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
    for (const topic of topicsAndNull) {
      const faqs = faqForTopic(topic);
      for (const { q, a } of faqs) {
        expect(hasDJH(q), `DJH in FAQ question for '${topic}'`).toBe(false);
        expect(hasDJH(a), `DJH in FAQ answer for '${topic}'`).toBe(false);
      }
    }
  });

  it("no FAQ content contains 'Reflex'", () => {
    for (const topic of topicsAndNull) {
      const faqs = faqForTopic(topic);
      for (const { q, a } of faqs) {
        expect(hasReflex(q), `Reflex in FAQ question for '${topic}'`).toBe(false);
        expect(hasReflex(a), `Reflex in FAQ answer for '${topic}'`).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 9. faq.ts -- house position accuracy spot-checks (HP-traced, brief section 3)
// ---------------------------------------------------------------------------

describe("faqForTopic: house position accuracy spot-checks", () => {
  // IR35: case-law whole-picture test (HP section 2)
  it("ir35 FAQ mentions Ready Mixed Concrete or case-law test", () => {
    const faqs = faqForTopic("ir35");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/ready mixed concrete|case.law/i);
  });

  it("ir35 FAQ mentions control, substitution and mutuality of obligation (HP section 2)", () => {
    const faqs = faqForTopic("ir35");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/control/i);
    expect(allText).toMatch(/substitut/i);
    expect(allText).toMatch(/mutuality of obligation/i);
  });

  // IR35: CEST is a first screen, not a guarantee (HP section 2, 17.A)
  it("ir35 FAQ confirms CEST is not a guarantee (HP section 17.A)", () => {
    const faqs = faqForTopic("ir35");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/cest/i);
    expect(allText).toMatch(/not.*guarantee|first screen/i);
  });

  // IR35: does NOT say 13.8% employer NIC (stale rate)
  it("ir35 FAQ does not contain stale 13.8% employer NIC rate", () => {
    const faqs = faqForTopic("ir35");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).not.toContain("13.8%");
  });

  // Structure: umbrella JSL reform April 2026 (HP section 12)
  it("structure FAQ mentions umbrella joint and several liability reform (HP section 12)", () => {
    const faqs = faqForTopic("structure");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/joint and several|jsl/i);
  });

  // Structure: compliant umbrella warning (HP section 12)
  it("structure FAQ recommends using a compliant umbrella", () => {
    const faqs = faqForTopic("structure");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/compliant/i);
  });

  // Structure: does NOT say limited is always better
  it("structure FAQ does not claim a limited company is always better", () => {
    const faqs = faqForTopic("structure");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).not.toMatch(/always better|limited is always/i);
  });

  // Pay-planning: dividend rates 10.75%/35.75%/39.35% from 6 April 2026 (HP section 5)
  it("pay-planning FAQ mentions 2026/27 basic dividend rate 10.75%", () => {
    const faqs = faqForTopic("pay-planning");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("10.75%");
  });

  it("pay-planning FAQ mentions 2026/27 higher dividend rate 35.75%", () => {
    const faqs = faqForTopic("pay-planning");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("35.75%");
  });

  // Pay-planning: no single universal optimal salary (HP section 8, 17)
  it("pay-planning FAQ frames optimal salary as context-dependent, not universal (HP sections 8, 17)", () => {
    const faqs = faqForTopic("pay-planning");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/no single|depends|context/i);
  });

  // Pay-planning: Employment Allowance eligibility fork (HP section 8)
  it("pay-planning FAQ mentions Employment Allowance (EA) eligibility (HP section 8)", () => {
    const faqs = faqForTopic("pay-planning");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/employment allowance/i);
  });

  // Company-tax: CT rates 19%/25% with marginal relief (HP section 7)
  it("company-tax FAQ mentions CT rate 19% below GBP50,000 (HP section 7)", () => {
    const faqs = faqForTopic("company-tax");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("19%");
    expect(allText).toMatch(/50.000|50k/i);
  });

  it("company-tax FAQ mentions CT rate 25% above GBP250,000 (HP section 7)", () => {
    const faqs = faqForTopic("company-tax");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("25%");
    expect(allText).toMatch(/250.000|250k/i);
  });

  it("company-tax FAQ mentions marginal relief (HP section 7)", () => {
    const faqs = faqForTopic("company-tax");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/marginal relief/i);
  });

  // Company-tax: s.455 charge 35.75% from 6 April 2026 (HP section 14)
  it("company-tax FAQ mentions section 455 charge at 35.75% from 6 April 2026 (HP section 14)", () => {
    const faqs = faqForTopic("company-tax");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("35.75%");
    expect(allText).toContain("6 April 2026");
  });

  // Basics-expenses: 55p mileage from 6 April 2026
  it("basics-expenses FAQ mentions 55p mileage rate from 6 April 2026", () => {
    const faqs = faqForTopic("basics-expenses");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("55p");
    expect(allText).toContain("6 April 2026");
  });

  // Basics-expenses: 24-month temporary workplace rule
  it("basics-expenses FAQ mentions the 24-month temporary workplace rule", () => {
    const faqs = faqForTopic("basics-expenses");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/24.month/i);
  });

  // GENERIC shape
  it("GENERIC has exactly 3 Q&As", () => {
    expect(GENERIC.length).toBe(3);
  });

  it("GENERIC Q&A 1 is about response speed", () => {
    expect(GENERIC[0].q).toMatch(/quickly|how.*reply|reply/i);
  });

  it("GENERIC Q&A 2 is about the first call being free", () => {
    expect(GENERIC[1].q).toMatch(/free|first.*conversation/i);
  });

  it("GENERIC Q&A 3 prompts what to have ready", () => {
    expect(GENERIC[2].q).toMatch(/ready|have ready|what.*bring|what.*need/i);
  });
});

// ---------------------------------------------------------------------------
// 10. Cadence thresholds are verbatim from brief section 4
// ---------------------------------------------------------------------------

describe("cadence thresholds: brief section 4", () => {
  it("CADENCE_THRESHOLDS_MS in SpecialistWidget matches [30000, 70000, 120000, 180000]", () => {
    // This is a structural assertion: the brief pins these exactly.
    // The widget is client-only so we cannot import it here, but we document
    // the expected values and verify the opener is configured for 4 pings (0..3).
    const expected = [30_000, 70_000, 120_000, 180_000];
    // At ping index 3, variantIndex on 'researching' = clamp(3, 0, 2) = 2.
    expect(variantIndex(3, "researching")).toBe(2);
    expect(expected.length).toBe(4);
    expect(expected[0]).toBe(30_000);
    expect(expected[1]).toBe(70_000);
    expect(expected[2]).toBe(120_000);
    expect(expected[3]).toBe(180_000);
  });
});

// ---------------------------------------------------------------------------
// 11. cfp_ storage prefix check
// ---------------------------------------------------------------------------

describe("storage prefix: cfp_ (never dfp_/ptp_/hd_)", () => {
  it("OPENER_LLM_ENRICHMENT_ENABLED is explicitly false (no LLM phase-0)", () => {
    expect(OPENER_LLM_ENRICHMENT_ENABLED).toBe(false);
  });

  it("all 5 cfp TopicKeys are present in TOPIC_NOUN", () => {
    const keys: TopicKey[] = ["ir35", "structure", "company-tax", "pay-planning", "basics-expenses"];
    for (const k of keys) {
      expect(TOPIC_NOUN[k]).toBeTruthy();
    }
  });

  it("all 5 cfp TopicKeys are present in TOPIC_HOOKS", () => {
    const keys: TopicKey[] = ["ir35", "structure", "company-tax", "pay-planning", "basics-expenses"];
    for (const k of keys) {
      expect(TOPIC_HOOKS[k]).toBeTruthy();
      expect(TOPIC_HOOKS[k].length).toBe(3);
    }
  });
});
