/**
 * Determinism, coverage and voice tests for the help widget's opener copy and
 * the journey model behind it.
 *
 * Runs in Node with no DOM. The journey model itself is the kit's
 * (@accounting-network/web-shared/support/journeyModel) and is tested there;
 * this file covers the copy and the taxonomy coupling that are this site's.
 *
 * Voice rules (LOCKED, and the reason this file exists):
 * - No em-dashes anywhere in the copy.
 * - No credential or regulator claim (chartered, qualified, regulated,
 *   accredited, MLR, ICAEW, ACCA).
 * - No pricing and no "free" offer.
 * - No turnaround promise other than the site's own 24 hours.
 * - No surveillance framing.
 */
import { describe, it, expect } from "vitest";
import type {
  JourneyProfile,
  JourneyStage,
} from "@accounting-network/web-shared/support/types";
import {
  variantIndex,
  pickOpener,
  frictionOpener,
  exitOpener,
  TOPIC_NOUN,
  TOPIC_HOOKS,
  OPENER_LLM_ENRICHMENT_ENABLED,
} from "@/lib/assistant/opener";
import { TOPICS, type TopicKey } from "@/lib/intent/taxonomy";

const ALL_TOPIC_KEYS: TopicKey[] = TOPICS.map((t) => t.key);
const STAGES: JourneyStage[] = ["researching", "comparing", "evaluating-us", "ready"];

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

/** Every line the opener module can ever produce. */
function allLines(): string[] {
  const lines: string[] = [];
  for (const noun of Object.values(TOPIC_NOUN)) lines.push(noun);
  for (const hooks of Object.values(TOPIC_HOOKS)) lines.push(...hooks);
  const topics: Array<TopicKey | null> = [...ALL_TOPIC_KEYS, null];
  for (const t of topics) {
    for (const s of STAGES) {
      for (let i = 0; i < 4; i++) {
        lines.push(pickOpener(makeProfile({ primaryTopic: t, stage: s }), i));
        lines.push(
          pickOpener(
            makeProfile({ primaryTopic: t, stage: s, signals: ["used-calculator"] }),
            i,
          ),
        );
      }
    }
    lines.push(frictionOpener(makeProfile({ primaryTopic: t })));
    lines.push(exitOpener(makeProfile({ primaryTopic: t })));
  }
  // The combination opener needs both topics set.
  for (let i = 0; i < 3; i++) {
    lines.push(
      pickOpener(makeProfile({ primaryTopic: "tronc", secondaryTopic: "staff-costs" }), i),
    );
    lines.push(
      pickOpener(makeProfile({ primaryTopic: "staff-costs", secondaryTopic: "tronc" }), i),
    );
  }
  return lines;
}

describe("opener coverage and determinism", () => {
  it("LLM enrichment stays off", () => {
    expect(OPENER_LLM_ENRICHMENT_ENABLED).toBe(false);
  });

  it("every taxonomy topic has a noun and three hooks", () => {
    for (const k of ALL_TOPIC_KEYS) {
      expect(TOPIC_NOUN[k]).toBeTruthy();
      expect(TOPIC_HOOKS[k]).toHaveLength(3);
      for (const h of TOPIC_HOOKS[k]) expect(h.length).toBeGreaterThan(10);
    }
    expect(Object.keys(TOPIC_NOUN).sort()).toEqual([...ALL_TOPIC_KEYS].sort());
    expect(Object.keys(TOPIC_HOOKS).sort()).toEqual([...ALL_TOPIC_KEYS].sort());
  });

  it("variantIndex clamps to 0..2 and boosts by stage", () => {
    expect(variantIndex(0, "researching")).toBe(0);
    expect(variantIndex(0, "evaluating-us")).toBe(1);
    expect(variantIndex(0, "ready")).toBe(2);
    expect(variantIndex(5, "researching")).toBe(2);
    expect(variantIndex(-3, "researching")).toBe(0);
  });

  it("pickOpener is deterministic for the same profile and index", () => {
    const p = makeProfile({ primaryTopic: "vat", stage: "comparing" });
    expect(pickOpener(p, 1)).toBe(pickOpener(p, 1));
  });

  it("a profile with no topic still gets a line", () => {
    for (let i = 0; i < 4; i++) expect(pickOpener(makeProfile(), i).length).toBeGreaterThan(10);
  });

  it("the combination and used-calculator overrides fire", () => {
    const combo = pickOpener(
      makeProfile({ primaryTopic: "tronc", secondaryTopic: "staff-costs" }),
      0,
    );
    expect(combo).not.toBe(TOPIC_HOOKS.tronc[0]);
    const calc = pickOpener(
      makeProfile({ primaryTopic: "tronc", stage: "ready", signals: ["used-calculator"] }),
      0,
    );
    expect(calc).not.toBe(TOPIC_HOOKS.tronc[2]);
  });

  it("friction and exit openers name the topic when there is one", () => {
    for (const k of ALL_TOPIC_KEYS) {
      const p = makeProfile({ primaryTopic: k });
      expect(frictionOpener(p)).toContain(TOPIC_NOUN[k]);
      expect(exitOpener(p)).toContain(TOPIC_NOUN[k]);
    }
    expect(frictionOpener(makeProfile()).length).toBeGreaterThan(10);
    expect(exitOpener(makeProfile()).length).toBeGreaterThan(10);
  });
});

describe("opener voice rules", () => {
  const lines = allLines();

  it("the corpus is not empty (guards the guard)", () => {
    expect(lines.length).toBeGreaterThan(100);
  });

  it("no em-dash", () => {
    const EM_DASH = String.fromCharCode(0x2014);
    expect(lines.filter((l) => l.includes(EM_DASH))).toEqual([]);
  });

  it("no credential, regulator or accreditation claim", () => {
    const banned = /\b(chartered|qualified|regulated|accredited|MLR|ICAEW|ACCA|CIOT|FCA)\b/i;
    expect(lines.filter((l) => banned.test(l))).toEqual([]);
  });

  it("no pricing and no free offer", () => {
    const banned = /\b(free|no cost|discount|£|cheap|quote)\b/i;
    expect(lines.filter((l) => banned.test(l))).toEqual([]);
  });

  it("the only turnaround promise is the site's own 24 hours", () => {
    const promises =
      /\b(same day|within the hour|immediately|instant reply|one working day|guarantee)\b/i;
    expect(lines.filter((l) => promises.test(l))).toEqual([]);
    for (const l of lines.filter((l) => /\breply\b/i.test(l))) {
      expect(l).toMatch(/within 24 hours/);
    }
  });

  it("no surveillance framing", () => {
    const banned = /(we noticed|we can see you|you seem to be struggling|we have been watching)/i;
    expect(lines.filter((l) => banned.test(l))).toEqual([]);
  });

  it("hook lines stay under 20 words", () => {
    for (const hooks of Object.values(TOPIC_HOOKS)) {
      for (const h of hooks) expect(h.split(/\s+/).length).toBeLessThan(20);
    }
  });
});
