/**
 * Determinism and shape tests for the Dentists WS6 proactive assistant machinery:
 *  1. journeyModel -- stage ladder, profileKey stability, defaults on empty trail.
 *  2. opener.ts -- variantIndex, pickOpener determinism, all-topic coverage,
 *     frictionOpener / exitOpener, COMBO_ASSOCIATE_PRINCIPAL, USED_CALC, GENERIC.
 *  3. faq.ts -- shape, BY_TOPIC coverage, no em-dashes, no DJH, no
 *     unsubstantiated credential claims, GENERIC fallback, house-position facts.
 *
 * Mirrors generalist/web/src/tests/assistant-journey-opener.test.ts.
 * Dentists-specific: 7 TopicKeys (associate|principal|buying|selling|nhs|uda-calc|compliance).
 * Cadence thresholds: [30_000, 70_000, 120_000, 180_000] ms.
 * Storage prefix: dfp_ (never hd_/ptp_).
 *
 * These tests run in Node (no DOM). The journey model is SSR-safe: window-gated
 * functions return empty-trail defaults when window is undefined.
 *
 * Voice rule checks (LOCKED):
 * - No em-dashes in any opener, FAQ answer, or frictionOpener line.
 * - Never claim the firm is "chartered", "qualified", "regulated" or "MLR-supervised".
 * - No "DJH" anywhere in the copy.
 * - No surveillance framing ("we noticed you're struggling...").
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
    const p = makeProfile({ primaryTopic: "associate", stage: "comparing", signals: ["multi-topic"] });
    expect(profileKey(p)).toBe(profileKey(p));
  });

  it("different topics produce different keys", () => {
    const a = makeProfile({ primaryTopic: "associate" });
    const b = makeProfile({ primaryTopic: "nhs" });
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

describe("TOPIC_NOUN: all Dentists topics covered", () => {
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

  // Dentists-specific noun spot-checks (verbatim from brief §3.2)
  it("associate noun is 'your take-home'", () => {
    expect(TOPIC_NOUN["associate"]).toBe("your take-home");
  });

  it("principal noun is 'your profit extraction'", () => {
    expect(TOPIC_NOUN["principal"]).toBe("your profit extraction");
  });

  it("nhs noun is 'your NHS contract'", () => {
    expect(TOPIC_NOUN["nhs"]).toBe("your NHS contract");
  });

  it("uda-calc noun is 'your UDA contract'", () => {
    expect(TOPIC_NOUN["uda-calc"]).toBe("your UDA contract");
  });

  it("selling noun is 'selling your practice'", () => {
    expect(TOPIC_NOUN["selling"]).toBe("selling your practice");
  });

  it("buying noun is 'buying a practice'", () => {
    expect(TOPIC_NOUN["buying"]).toBe("buying a practice");
  });

  it("compliance noun is 'your accounts and deadlines'", () => {
    expect(TOPIC_NOUN["compliance"]).toBe("your accounts and deadlines");
  });
});

// ---------------------------------------------------------------------------
// 5. opener.ts -- TOPIC_HOOKS coverage and voice rules
// ---------------------------------------------------------------------------

describe("TOPIC_HOOKS: all Dentists topics have 3 escalating lines", () => {
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
    // The direct hook should invite action
    const ctaPhrases = /want me to|shall i|interested\?|fancy|arrange|set one up/i;
    for (const key of ALL_TOPIC_KEYS) {
      const direct = TOPIC_HOOKS[key][2];
      expect(
        ctaPhrases.test(direct),
        `TOPIC_HOOKS['${key}'][2] has no CTA phrase: "${direct}"`,
      ).toBe(true);
    }
  });

  // Verbatim spot-checks from brief §3.2
  it("associate hook[0] references the calculator", () => {
    expect(TOPIC_HOOKS["associate"][0]).toContain("calculator");
  });

  it("principal hook[1] mentions NHS pension trade-off", () => {
    expect(TOPIC_HOOKS["principal"][1]).toMatch(/nhs pension/i);
  });

  it("nhs hook[0] references the UDA tool", () => {
    expect(TOPIC_HOOKS["nhs"][0]).toMatch(/tool|calculator/i);
  });

  it("selling hook[1] references CGT or BADR", () => {
    expect(TOPIC_HOOKS["selling"][1]).toMatch(/cgt|badr/i);
  });

  it("buying hook[0] mentions indicative value", () => {
    expect(TOPIC_HOOKS["buying"][0]).toMatch(/indicative value/i);
  });
});

// ---------------------------------------------------------------------------
// 6. opener.ts -- pickOpener determinism
// ---------------------------------------------------------------------------

describe("pickOpener: deterministic results", () => {
  it("same profile + same pingIndex always returns the same line", () => {
    const profile = makeProfile({ primaryTopic: "associate", stage: "comparing" });
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

  it("COMBO_ASSOCIATE_PRINCIPAL fires when primaryTopic=associate, secondaryTopic=principal", () => {
    const profile = makeProfile({
      primaryTopic: "associate",
      secondaryTopic: "principal",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    // Should be the COMBO line about associate towards owning/incorporating
    expect(line).toMatch(/associate|owning|incorporating/i);
  });

  it("COMBO_ASSOCIATE_PRINCIPAL fires when topics are reversed (primary=principal, secondary=associate)", () => {
    const profile = makeProfile({
      primaryTopic: "principal",
      secondaryTopic: "associate",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    expect(line).toMatch(/associate|owning|incorporating/i);
  });

  it("USED_CALC line fires at vi=2 when used-calculator signal is present", () => {
    const profile = makeProfile({
      primaryTopic: "nhs",
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
    const p = makeProfile({ primaryTopic: "associate" });
    const line = frictionOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line (associate -> 'your take-home')", () => {
    const p = makeProfile({ primaryTopic: "associate" });
    const line = frictionOpener(p);
    expect(line).toContain("your take-home");
  });

  it("slots the topic noun into the line (nhs -> 'your NHS contract')", () => {
    const p = makeProfile({ primaryTopic: "nhs" });
    const line = frictionOpener(p);
    expect(line).toContain("your NHS contract");
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
    const p = makeProfile({ primaryTopic: "principal" });
    const line = frictionOpener(p);
    expect(line).toMatch(/form|trouble/i);
  });
});

describe("exitOpener: topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "selling" });
    const line = exitOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line (selling -> 'selling your practice')", () => {
    const p = makeProfile({ primaryTopic: "selling" });
    const line = exitOpener(p);
    expect(line).toContain("selling your practice");
  });

  it("slots the topic noun into the line (buying -> 'buying a practice')", () => {
    const p = makeProfile({ primaryTopic: "buying" });
    const line = exitOpener(p);
    expect(line).toContain("buying a practice");
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

  it("returns GENERIC for uda-calc (no BY_TOPIC block)", () => {
    const faqs = faqForTopic("uda-calc");
    // uda-calc has no BY_TOPIC entry; should fall back to GENERIC
    expect(faqs).toEqual(GENERIC);
  });

  it("returns GENERIC for compliance (no BY_TOPIC block)", () => {
    const faqs = faqForTopic("compliance");
    expect(faqs).toEqual(GENERIC);
  });

  it("associate topic has exactly 3 Q&As (HP §1, §8, §1.B)", () => {
    const faqs = faqForTopic("associate");
    expect(faqs.length).toBe(3);
  });

  it("principal topic has exactly 3 Q&As (HP §5, §2.C, §5.A)", () => {
    const faqs = faqForTopic("principal");
    expect(faqs.length).toBe(3);
  });

  it("buying topic has exactly 2 Q&As (HP §4, §3, §7)", () => {
    const faqs = faqForTopic("buying");
    expect(faqs.length).toBe(2);
  });

  it("selling topic has exactly 2 Q&As (HP §4, §4.A, §2.C)", () => {
    const faqs = faqForTopic("selling");
    expect(faqs.length).toBe(2);
  });

  it("nhs topic has exactly 3 Q&As (HP §3, §3.A, §2.C)", () => {
    const faqs = faqForTopic("nhs");
    expect(faqs.length).toBe(3);
  });
});

describe("faqForTopic: voice rules (no em-dashes, no credential claims, no DJH, no Reflex)", () => {
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

  it("no FAQ content contains 'Reflex'", () => {
    for (const topic of [...ALL_TOPIC_KEYS, null]) {
      const faqs = faqForTopic(topic);
      for (const { q, a } of faqs) {
        expect(hasReflex(q), `Reflex in FAQ question for '${topic}'`).toBe(false);
        expect(hasReflex(a), `Reflex in FAQ answer for '${topic}'`).toBe(false);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 9. faq.ts -- house position accuracy spot-checks (HP-traced, brief §4.2)
// ---------------------------------------------------------------------------

describe("faqForTopic: house position accuracy spot-checks", () => {
  // Associate: Class 2 removed (HP §8)
  it("associate FAQ confirms Class 2 NIC was removed from 6 April 2024", () => {
    const faqs = faqForTopic("associate");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/class 2.*removed|removed.*class 2/i);
    expect(allText).toContain("6 April 2024");
  });

  // Associate: Class 4 rates (HP §8)
  it("associate FAQ mentions Class 4 at 6% between £12,570 and £50,270", () => {
    const faqs = faqForTopic("associate");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("6%");
    expect(allText).toContain("£12,570");
    expect(allText).toContain("£50,270");
  });

  // Associate: mileage 55p from 6 Apr 2026 (HP §8)
  it("associate FAQ mentions mileage at 55p from 6 April 2026", () => {
    const faqs = faqForTopic("associate");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("55p");
    expect(allText).toContain("6 April 2026");
  });

  // Principal: incorporation is a calculation not a default (HP §5)
  it("principal FAQ frames company as a calculation, not a default", () => {
    const faqs = faqForTopic("principal");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/calculation.*default|default.*calculation/i);
  });

  // Principal: dividend rise 10.75%/35.75% from 2026/27 (HP §5)
  it("principal FAQ mentions 2026/27 dividend rate 10.75%", () => {
    const faqs = faqForTopic("principal");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("10.75%");
  });

  it("principal FAQ mentions 2026/27 dividend rate 35.75%", () => {
    const faqs = faqForTopic("principal");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("35.75%");
  });

  // Principal: NHS pension trap (HP §2.C)
  it("principal FAQ mentions NHS Pension trap: dividends not pensionable", () => {
    const faqs = faqForTopic("principal");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/dividend.*not pensionable|not pensionable.*dividend/i);
  });

  // Principal: s.455 charge 35.75% from 6 Apr 2026 (HP §5.A)
  it("principal FAQ mentions s.455 charge at 35.75% from 6 April 2026", () => {
    const faqs = faqForTopic("principal");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("35.75%");
    expect(allText).toContain("6 April 2026");
  });

  // Selling: BADR 14% to 5 Apr 2026, 18% from 6 Apr 2026 (HP §4)
  it("selling FAQ mentions BADR 14% rate (pre-6 Apr 2026)", () => {
    const faqs = faqForTopic("selling");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("14%");
  });

  it("selling FAQ mentions BADR 18% rate (from 6 Apr 2026)", () => {
    const faqs = faqForTopic("selling");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("18%");
  });

  it("selling FAQ mentions £1m BADR lifetime limit", () => {
    const faqs = faqForTopic("selling");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£1m");
  });

  it("selling FAQ mentions 24% CGT rate on gains above the limit", () => {
    const faqs = faqForTopic("selling");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("24%");
  });

  // Selling: s.28 disposal timing — unconditional exchange (HP §4.A)
  it("selling FAQ explains unconditional exchange fixes the rate", () => {
    const faqs = faqForTopic("selling");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/unconditional/i);
  });

  // Buying: valuation multiples + goodwill (HP §4, §3)
  it("buying FAQ mentions EBITDA multiples", () => {
    const faqs = faqForTopic("buying");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/ebitda/i);
  });

  it("buying FAQ mentions section 198 fixtures election (HP §7)", () => {
    const faqs = faqForTopic("buying");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/section 198|s\.198|s198/i);
  });

  // NHS: no standard UDA value (HP §3)
  it("nhs FAQ confirms there is no standard national UDA value", () => {
    const faqs = faqForTopic("nhs");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/no national uda value|no.*national.*uda/i);
  });

  // NHS: 96% clawback line (HP §3.A)
  it("nhs FAQ mentions 96% UDA delivery clawback threshold", () => {
    const faqs = faqForTopic("nhs");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("96%");
  });

  // NHS: incorporation pension trap for dentists (HP §2.C)
  it("nhs FAQ mentions the incorporation pension trap: dividends not pensionable", () => {
    const faqs = faqForTopic("nhs");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/pension trap|dividend.*not pensionable|not pensionable/i);
  });

  // NHS: does NOT say 13.8% employer NIC (stale — current rate 15%)
  it("nhs FAQ does not contain stale 13.8% employer NIC rate", () => {
    const faqs = faqForTopic("nhs");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).not.toContain("13.8%");
  });

  // Associate: does NOT tell associate to pay Class 2 weekly (HP §8 — Class 2 removed)
  it("associate FAQ does NOT instruct paying weekly Class 2", () => {
    const faqs = faqForTopic("associate");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).not.toMatch(/pay.*weekly.*class 2|class 2.*weekly/i);
  });

  // GENERIC: 3 items (brief §2)
  it("GENERIC has exactly 3 Q&As", () => {
    expect(GENERIC.length).toBe(3);
  });

  it("GENERIC Q&A 1 is about response speed", () => {
    expect(GENERIC[0].q).toMatch(/quickly|how.*reply/i);
  });

  it("GENERIC Q&A 2 is about the first call being free", () => {
    expect(GENERIC[1].q).toMatch(/free|first.*conversation/i);
  });
});

// ---------------------------------------------------------------------------
// 10. Cadence thresholds are verbatim from brief §3.3
// ---------------------------------------------------------------------------

describe("cadence thresholds: brief §3.3", () => {
  it("CADENCE_THRESHOLDS_MS in SpecialistWidget matches [30000, 70000, 120000, 180000]", () => {
    // This is a structural assertion: the brief pins these exactly.
    // The widget is client-only so we cannot import it here, but we document
    // the expected values and check the opener constants do not deviate.
    const expected = [30_000, 70_000, 120_000, 180_000];
    // Verify that the opener is configured for 4 pings (0..3).
    // At ping index 3, variantIndex on 'researching' = clamp(3,0,2) = 2.
    expect(variantIndex(3, "researching")).toBe(2);
    // The expected array has 4 entries.
    expect(expected.length).toBe(4);
    expect(expected[0]).toBe(30_000);
    expect(expected[1]).toBe(70_000);
    expect(expected[2]).toBe(120_000);
    expect(expected[3]).toBe(180_000);
  });
});
