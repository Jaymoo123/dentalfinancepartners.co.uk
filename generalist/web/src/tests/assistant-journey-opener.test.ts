/**
 * Determinism and shape tests for the WS6 proactive assistant machinery:
 *  1. journeyModel -- stage ladder, profileKey stability, defaults on empty trail.
 *  2. opener.ts -- variantIndex, pickOpener determinism, all-topic coverage,
 *     frictionOpener / exitOpener, COMBO_SOLE_INC, USED_CALC, GENERIC.
 *  3. faq.ts -- shape, BY_TOPIC coverage, no em-dashes, no DJH, no
 *     unsubstantiated credential claims, GENERIC fallback.
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
import { faqForTopic, type Faq } from "@/lib/support/faq";

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
// 1. journeyModel — defaults on empty trail (Node / SSR environment)
// ---------------------------------------------------------------------------

describe("journeyModel — empty trail defaults (Node env, no DOM)", () => {
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
// 2. journeyModel — profileKey stability
// ---------------------------------------------------------------------------

describe("profileKey — deterministic stable key", () => {
  it("same profile always returns the same key", () => {
    const p = makeProfile({ primaryTopic: "director-pay", stage: "comparing", signals: ["multi-topic"] });
    expect(profileKey(p)).toBe(profileKey(p));
  });

  it("different topics produce different keys", () => {
    const a = makeProfile({ primaryTopic: "director-pay" });
    const b = makeProfile({ primaryTopic: "vat-mtd" });
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
// 3. opener.ts — variantIndex
// ---------------------------------------------------------------------------

describe("variantIndex — escalation logic", () => {
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
// 4. opener.ts — TOPIC_NOUN coverage
// ---------------------------------------------------------------------------

describe("TOPIC_NOUN — all topics covered", () => {
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
});

// ---------------------------------------------------------------------------
// 5. opener.ts — TOPIC_HOOKS coverage and voice rules
// ---------------------------------------------------------------------------

describe("TOPIC_HOOKS — all topics have 3 escalating lines", () => {
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
    // The direct hook should invite action (want me to, shall I, interested?, fancy)
    const ctaPhrases = /want me to|shall i|interested\?|fancy|arrange|set one up/i;
    for (const key of ALL_TOPIC_KEYS) {
      const direct = TOPIC_HOOKS[key][2];
      expect(
        ctaPhrases.test(direct),
        `TOPIC_HOOKS['${key}'][2] has no CTA phrase: "${direct}"`,
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. opener.ts — pickOpener determinism
// ---------------------------------------------------------------------------

describe("pickOpener — deterministic results", () => {
  it("same profile + same pingIndex always returns the same line", () => {
    const profile = makeProfile({ primaryTopic: "director-pay", stage: "comparing" });
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

  it("returns a non-empty string with no topic (null) — falls back to GENERIC", () => {
    const profile = makeProfile({ primaryTopic: null });
    const line = pickOpener(profile, 0);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(5);
  });

  it("COMBO_SOLE_INC fires when primaryTopic=sole-trader, secondaryTopic=incorporation", () => {
    const profile = makeProfile({
      primaryTopic: "sole-trader",
      secondaryTopic: "incorporation",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    // Should be the COMBO line about "going limited beats staying a sole trader"
    expect(line).toContain("going limited");
  });

  it("COMBO_SOLE_INC fires when topics are reversed (primary=incorporation, secondary=sole-trader)", () => {
    const profile = makeProfile({
      primaryTopic: "incorporation",
      secondaryTopic: "sole-trader",
      stage: "comparing",
    });
    const line = pickOpener(profile, 0);
    expect(line).toContain("going limited");
  });

  it("USED_CALC line fires at vi=2 when used-calculator signal is present", () => {
    const profile = makeProfile({
      primaryTopic: "director-pay",
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
});

// ---------------------------------------------------------------------------
// 7. opener.ts — frictionOpener and exitOpener
// ---------------------------------------------------------------------------

describe("frictionOpener — topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "payroll" });
    const line = frictionOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line", () => {
    const p = makeProfile({ primaryTopic: "payroll" });
    const line = frictionOpener(p);
    // TOPIC_NOUN['payroll'] = 'employing staff'
    expect(line).toContain("employing staff");
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
    // Should always reference the form difficulty
    const p = makeProfile({ primaryTopic: "vat-mtd" });
    const line = frictionOpener(p);
    expect(line).toMatch(/form|trouble/i);
  });
});

describe("exitOpener — topic-aware and generic fallback", () => {
  it("returns a non-empty string with a topic", () => {
    const p = makeProfile({ primaryTopic: "exit-cgt" });
    const line = exitOpener(p);
    expect(typeof line).toBe("string");
    expect(line.length).toBeGreaterThan(10);
  });

  it("slots the topic noun into the line", () => {
    const p = makeProfile({ primaryTopic: "exit-cgt" });
    const line = exitOpener(p);
    // TOPIC_NOUN['exit-cgt'] = 'selling your business'
    expect(line).toContain("selling your business");
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
// 8. faq.ts — shape, coverage, voice rules
// ---------------------------------------------------------------------------

describe("faqForTopic — shape and coverage", () => {
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

  it("returns GENERIC (3 items) for an unrecognised topic", () => {
    const faqs = faqForTopic("unknown-topic-xyz");
    expect(faqs.length).toBe(3);
  });

  it("compliance topic has 2 Q&As", () => {
    const faqs = faqForTopic("compliance");
    expect(faqs.length).toBe(2);
  });

  it("director-pay topic has 2 Q&As", () => {
    const faqs = faqForTopic("director-pay");
    expect(faqs.length).toBe(2);
  });

  it("sole-trader and incorporation topics both have Q&As (FAQ shared)", () => {
    // Both map to incorporation-adjacent FAQs per the brief
    const st = faqForTopic("sole-trader");
    const inc = faqForTopic("incorporation");
    expect(st.length).toBeGreaterThanOrEqual(2);
    expect(inc.length).toBeGreaterThanOrEqual(2);
  });
});

describe("faqForTopic — voice rules (no em-dashes, no credential claims, no DJH)", () => {
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

describe("faqForTopic — house position accuracy spot-checks", () => {
  it("director-pay FAQ mentions 10.75% dividend tax (basic rate, 2026/27)", () => {
    const faqs = faqForTopic("director-pay");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("10.75%");
  });

  it("director-pay FAQ mentions 35.75% dividend tax (higher rate, 2026/27)", () => {
    const faqs = faqForTopic("director-pay");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("35.75%");
  });

  it("director-pay FAQ mentions £500 dividend allowance", () => {
    const faqs = faqForTopic("director-pay");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£500");
  });

  it("director-pay FAQ mentions £10,500 Employment Allowance", () => {
    const faqs = faqForTopic("director-pay");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£10,500");
  });

  it("payroll FAQ mentions employer NIC at 15% above £5,000 (NOT 13.8%)", () => {
    const faqs = faqForTopic("payroll");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("15%");
    expect(allText).toContain("£5,000");
    expect(allText).not.toContain("13.8%");
  });

  it("vat-mtd FAQ mentions £90,000 registration threshold (NOT £85,000)", () => {
    const faqs = faqForTopic("vat-mtd");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£90,000");
    expect(allText).not.toContain("£85,000");
  });

  it("vat-mtd FAQ mentions 16.5% limited-cost trader flat rate", () => {
    const faqs = faqForTopic("vat-mtd");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("16.5%");
  });

  it("rnd FAQ mentions 30% intensity threshold (ERIS)", () => {
    const faqs = faqForTopic("rnd");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("30%");
  });

  it("rnd FAQ mentions 65% subcontractor cost haircut", () => {
    const faqs = faqForTopic("rnd");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("65%");
  });

  it("exit-cgt FAQ mentions 14% BADR rate (pre-6 Apr 2026)", () => {
    const faqs = faqForTopic("exit-cgt");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("14%");
  });

  it("exit-cgt FAQ mentions 18% BADR rate (from 6 Apr 2026)", () => {
    const faqs = faqForTopic("exit-cgt");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("18%");
  });

  it("exit-cgt FAQ mentions £1m BADR lifetime limit", () => {
    const faqs = faqForTopic("exit-cgt");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£1m");
  });

  it("exit-cgt FAQ mentions 24% overflow CGT rate", () => {
    const faqs = faqForTopic("exit-cgt");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("24%");
  });

  it("incorporation FAQ frames company as a calculation not a default (§1.A)", () => {
    const faqs = faqForTopic("incorporation");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toMatch(/calculation.*default|default.*calculation/i);
  });

  it("compliance FAQ mentions 31 January Self Assessment deadline", () => {
    const faqs = faqForTopic("compliance");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("31 January");
  });

  it("compliance FAQ mentions MTD Income Tax starting 6 April 2026", () => {
    const faqs = faqForTopic("compliance");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("6 April 2026");
  });

  it("compliance FAQ mentions £50,000 MTD ITSA threshold for April 2026", () => {
    const faqs = faqForTopic("compliance");
    const allText = faqs.map((f: Faq) => f.a).join(" ");
    expect(allText).toContain("£50,000");
  });
});
