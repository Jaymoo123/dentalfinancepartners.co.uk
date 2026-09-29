/**
 * Generic tests for the shared help-widget engine: route parsing, the journey
 * model's DOM-free defaults, and the offer escalation ladder.
 *
 * Site-specific tests (which slug maps to which topic, and the wording of the
 * openers) stay on the site that owns that config. The two journey-model cases
 * below moved here from startups-tech/web/src/tests/assistant-opener.test.ts.
 */
import { describe, it, expect } from "vitest";
import { makeDeriveTopic } from "./deriveTopic";
import { createJourneyModel, profileKey } from "./journeyModel";
import { evaluate, DEFAULT_THRESHOLDS } from "./engine";
import { shouldUpgradeToModal, type ModalUpgradeCause } from "./SpecialistWidget";
import type {
  EngineConfig,
  IntentContext,
  IntentOffer,
  JourneyProfile,
  RouteRule,
  WidgetTopic,
} from "./types";

/* ------------------------------------------------------------ deriveTopic */

const rules: RouteRule[] = [
  { segments: ["blog"], lookup: (s) => (s === "alpha" ? "a" : null) },
  { segments: ["calculators", "embed"], lookup: (s) => (s === "calc-one" ? "c" : null) },
  { segments: ["for"], lookup: () => "fixed" },
];
const deriveTopic = makeDeriveTopic(rules);

describe("makeDeriveTopic", () => {
  it("returns null for the root and the empty path", () => {
    expect(deriveTopic("/")).toBeNull();
    expect(deriveTopic("")).toBeNull();
  });

  it("returns null for a bare index route with no second segment", () => {
    expect(deriveTopic("/blog")).toBeNull();
    expect(deriveTopic("/calculators")).toBeNull();
  });

  it("returns null for an unmapped route family", () => {
    expect(deriveTopic("/contact")).toBeNull();
    expect(deriveTopic("/about/team")).toBeNull();
  });

  it("maps the second segment through the rule's lookup", () => {
    expect(deriveTopic("/blog/alpha")).toBe("a");
    expect(deriveTopic("/blog/alpha/a-post")).toBe("a");
    expect(deriveTopic("/blog/unknown")).toBeNull();
  });

  it("honours every segment alias on one rule", () => {
    expect(deriveTopic("/calculators/calc-one")).toBe("c");
    expect(deriveTopic("/embed/calc-one")).toBe("c");
  });

  it("supports a rule that ignores the slug entirely", () => {
    expect(deriveTopic("/for/anything-at-all")).toBe("fixed");
  });

  it("ignores query strings, hashes and trailing slashes", () => {
    expect(deriveTopic("/blog/alpha/")).toBe("a");
    expect(deriveTopic("/blog/alpha?page=2")).toBe("a");
    expect(deriveTopic("/blog/alpha#method")).toBe("a");
    expect(deriveTopic("///blog///alpha//")).toBe("a");
  });

  it("the first matching rule wins", () => {
    const d = makeDeriveTopic([
      { segments: ["x"], lookup: () => "first" },
      { segments: ["x"], lookup: () => "second" },
    ]);
    expect(d("/x/y")).toBe("first");
  });
});

/* ----------------------------------------------------------- journeyModel */

describe("journey model defaults without a DOM", () => {
  const journey = createJourneyModel({ storageKey: "test_journey", deriveTopic });

  it("an empty trail gives a researching profile", () => {
    journey._reset();
    const p = journey.getProfile();
    expect(p.primaryTopic).toBeNull();
    expect(p.secondaryTopic).toBeNull();
    expect(p.stage).toBe("researching");
    expect(p.pageCount).toBe(0);
    expect(p.depth).toBe(0);
    expect(p.signals).toEqual([]);
  });

  it("init and recordPath are safe with no window", () => {
    journey._reset();
    expect(() => journey.init()).not.toThrow();
    expect(() => journey.recordPath("/blog/alpha")).not.toThrow();
    expect(journey.getProfile().stage).toBe("researching");
  });
});

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

describe("profileKey", () => {
  it("is stable and order-independent on signals", () => {
    const a = makeProfile({ primaryTopic: "rnd", stage: "ready", signals: ["b", "a"] });
    const b = makeProfile({ primaryTopic: "rnd", stage: "ready", signals: ["a", "b"] });
    expect(profileKey(a)).toBe(profileKey(b));
    expect(profileKey(makeProfile())).toBe("-|-|researching|");
  });
});

/* ----------------------------------------------------------------- engine */

const topics: WidgetTopic[] = [
  { key: "t1", label: "Topic one", primaryCalculator: "calc-one", ctaCopy: "CTA", resourceId: null },
  { key: "t2", label: "Topic two", primaryCalculator: null, ctaCopy: "CTA2", resourceId: null },
];

function offer(kind: IntentOffer["kind"], key: string): IntentOffer {
  return { kind, title: `${kind}:${key}`, blurb: "b", href: "/h", reason: "r" };
}

function makeEngine(over: Partial<EngineConfig["offers"]> = {}): EngineConfig {
  return {
    getTopic: (k) => topics.find((t) => t.key === k) ?? null,
    offers: {
      tool: (k) => (topics.find((t) => t.key === k)?.primaryCalculator ? offer("tool", k) : null),
      review: (k) => offer("specialist", k),
      specialist: (k) => offer("specialist", k),
      returningReason: "resume",
      ...over,
    },
  };
}

function makeCtx(over: Partial<IntentContext> = {}): IntentContext {
  return {
    pageTopic: null,
    entryTopic: null,
    lastTopic: null,
    returning: false,
    converted: false,
    scrollPct: 0,
    engagedMs: 0,
    isMobile: false,
    ...over,
  };
}

describe("evaluate", () => {
  const cfg = makeEngine();

  it("never nags a converted visitor on the pushy surfaces", () => {
    const ctx = makeCtx({ pageTopic: "t1", converted: true, scrollPct: 100, engagedMs: 999_999 });
    expect(evaluate("hero_cta", ctx, cfg)).toBeNull();
    expect(evaluate("sticky_cta", ctx, cfg)).toBeNull();
    expect(evaluate("deep_scroll_modal", ctx, cfg)).toBeNull();
    expect(evaluate("returning_bar", { ...ctx, returning: true }, cfg)).toBeNull();
  });

  it("falls back to the entry topic on the CTA surfaces, but not on next_step", () => {
    const ctx = makeCtx({ pageTopic: null, entryTopic: "t1" });
    expect(evaluate("hero_cta", ctx, cfg)?.topic).toBe("t1");
    expect(evaluate("next_step", ctx, cfg)).toBeNull();
  });

  it("returns null when there is no topic at all", () => {
    expect(evaluate("hero_cta", makeCtx(), cfg)).toBeNull();
  });

  it("a light browser gets the tool offer", () => {
    const a = evaluate("hero_cta", makeCtx({ pageTopic: "t1" }), cfg);
    expect(a?.offer.kind).toBe("tool");
    expect(a?.ruleId).toBe("topic_cta");
    expect(a?.variant).toBe("default");
    expect(a?.calculatorSlug).toBe("calc-one");
  });

  it("an engaged reader escalates past the tool", () => {
    const ctx = makeCtx({ pageTopic: "t1", scrollPct: DEFAULT_THRESHOLDS.scrollEscalatePct });
    expect(evaluate("hero_cta", ctx, cfg)?.offer.kind).toBe("specialist");
  });

  it("a deeply engaged, unconverted visitor gets the specialist and the escalate variant", () => {
    const ctx = makeCtx({
      pageTopic: "t1",
      engagedMs: DEFAULT_THRESHOLDS.engagedEscalateMs,
      scrollPct: DEFAULT_THRESHOLDS.scrollEscalatePct,
    });
    const a = evaluate("hero_cta", ctx, cfg);
    expect(a?.ruleId).toBe("escalate_specialist");
    expect(a?.variant).toBe("escalate");
  });

  it("falls down the ladder when the richer asset does not exist", () => {
    const thin = makeEngine({ review: () => null });
    // t2 has no calculator, so tool() is null too: only the specialist is left.
    expect(evaluate("hero_cta", makeCtx({ pageTopic: "t2" }), thin)?.offer.kind).toBe("specialist");
  });

  it("the deep-scroll modal waits for its scroll threshold", () => {
    const below = makeCtx({ pageTopic: "t1", scrollPct: DEFAULT_THRESHOLDS.scrollModalPct - 1 });
    const at = makeCtx({ pageTopic: "t1", scrollPct: DEFAULT_THRESHOLDS.scrollModalPct });
    expect(evaluate("deep_scroll_modal", below, cfg)).toBeNull();
    expect(evaluate("deep_scroll_modal", at, cfg)?.ruleId).toBe("deep_scroll_offer");
  });

  it("the returning bar needs a returning visitor and a topic to resume", () => {
    expect(evaluate("returning_bar", makeCtx({ lastTopic: "t1" }), cfg)).toBeNull();
    expect(evaluate("returning_bar", makeCtx({ returning: true }), cfg)).toBeNull();
    const a = evaluate("returning_bar", makeCtx({ returning: true, lastTopic: "t1" }), cfg);
    expect(a?.ruleId).toBe("returning_welcome");
  });

  it("next_step is tied to the current page topic", () => {
    const a = evaluate("next_step", makeCtx({ pageTopic: "t1", entryTopic: "t2" }), cfg);
    expect(a?.ruleId).toBe("topic_next_step");
    expect(a?.topic).toBe("t1");
  });

  it("site thresholds override the defaults", () => {
    const eager: EngineConfig = { ...cfg, thresholds: { scrollModalPct: 10 } };
    const ctx = makeCtx({ pageTopic: "t1", scrollPct: 10 });
    expect(evaluate("deep_scroll_modal", ctx, cfg)).toBeNull();
    expect(evaluate("deep_scroll_modal", ctx, eager)).not.toBeNull();
  });

  it("an unknown topic key yields no action", () => {
    expect(evaluate("hero_cta", makeCtx({ pageTopic: "nope" }), cfg)).toBeNull();
  });
});

/* ------------------------------------------------- modal upgrade (GF8 / W-B1) */

describe("shouldUpgradeToModal", () => {
  it("never upgrades a panel that is already modal", () => {
    for (const cause of ["launcher", "pointer", "key", "focus"] as ModalUpgradeCause[]) {
      expect(shouldUpgradeToModal(cause, { alreadyModal: true })).toBe(false);
    }
  });

  it("upgrades on a deliberate open: launcher, pointer press, Enter or Space", () => {
    expect(shouldUpgradeToModal("launcher", { alreadyModal: false })).toBe(true);
    expect(shouldUpgradeToModal("pointer", { alreadyModal: false })).toBe(true);
    expect(shouldUpgradeToModal("key", { alreadyModal: false })).toBe(true);
  });

  it("does not upgrade when a forward Tab arrives from outside the panel", () => {
    expect(
      shouldUpgradeToModal("focus", {
        alreadyModal: false,
        relatedTargetInsidePanel: false,
      }),
    ).toBe(false);
  });

  it("does not upgrade while a Tab is passing through the panel's own controls", () => {
    expect(
      shouldUpgradeToModal("focus", {
        alreadyModal: false,
        relatedTargetInsidePanel: true,
        tabbedInFromPage: true,
      }),
    ).toBe(false);
  });

  it("upgrades on focus moving between panel controls after a deliberate entry", () => {
    expect(
      shouldUpgradeToModal("focus", {
        alreadyModal: false,
        relatedTargetInsidePanel: true,
        tabbedInFromPage: false,
      }),
    ).toBe(true);
  });
});
