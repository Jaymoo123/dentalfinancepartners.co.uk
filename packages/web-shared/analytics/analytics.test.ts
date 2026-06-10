/**
 * Analytics SDK unit suite — §2.7 of STANDARDISATION_PHASE_A_SPEC.md
 *
 * Pure-unit tests: consent state machine · id minting + idle roll + legacyPrefix
 * migration · scrubProps · sanitiseEvents (allowlist, envelope, caps, foreign-key)
 * · bot heuristic · buildSession aggregation · experiments stamping
 *
 * browser APIs (localStorage/sessionStorage) are mocked via globalThis so the
 * tests run in the node environment without jsdom.
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { initAnalytics, _resetSdkConfig } from "./init";
import { isTrackingAllowed, setConsent, getConsent } from "./consent";
import { getVisitorId, getSessionId, isNewSession, _resetMigration, safeGet } from "./ids";
import { scrubProps } from "./track";
import { sanitiseEvents, buildSession } from "./server/createTrackHandler";
import { detectBot } from "./server/bots";
import { setActiveExperiment, activeExperimentString, _clearExperiments } from "./experiments/active";
import { registerExperiments, getExperiment } from "./experiments/registry";
import { assignVariant } from "./experiments/assign";

// ---------------------------------------------------------------------------
// localStorage / sessionStorage mock helpers
// ---------------------------------------------------------------------------

class MockStorage implements Storage {
  private store: Record<string, string> = {};
  get length() { return Object.keys(this.store).length; }
  key(n: number) { return Object.keys(this.store)[n] ?? null; }
  getItem(key: string) { return this.store[key] ?? null; }
  setItem(key: string, value: string) { this.store[key] = value; }
  removeItem(key: string) { delete this.store[key]; }
  clear() { this.store = {}; }
}

let mockLS: MockStorage;
let mockSS: MockStorage;

function setupBrowserMocks() {
  mockLS = new MockStorage();
  mockSS = new MockStorage();
  Object.defineProperty(globalThis, "window", {
    value: {
      localStorage: mockLS,
      sessionStorage: mockSS,
      location: { pathname: "/test", search: "" },
      navigator: {},
    },
    configurable: true,
    writable: true,
  });
}

function teardownBrowserMocks() {
  // @ts-expect-error intentional cleanup
  delete (globalThis as Record<string, unknown>).window;
}

// ---------------------------------------------------------------------------
// 1. Consent state machine per posture
// ---------------------------------------------------------------------------

describe("consent state machine", () => {
  beforeEach(() => {
    setupBrowserMocks();
    _resetSdkConfig();
    _resetMigration();
  });
  afterEach(teardownBrowserMocks);

  it("opt-out: allowed when no consent stored", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-out" });
    expect(isTrackingAllowed()).toBe(true);
  });

  it("opt-out: allowed when consent is undecided (no value)", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-out" });
    mockLS.setItem("t_consent", ""); // invalid value → treated as undecided
    expect(isTrackingAllowed()).toBe(true);
  });

  it("opt-out: blocked when consent is denied", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-out" });
    setConsent("denied");
    expect(isTrackingAllowed()).toBe(false);
  });

  it("opt-out: re-allowed after denial reversed to granted", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-out" });
    setConsent("denied");
    setConsent("granted");
    expect(isTrackingAllowed()).toBe(true);
  });

  it("opt-in: blocked when no consent stored", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-in" });
    expect(isTrackingAllowed()).toBe(false);
  });

  it("opt-in: blocked when consent is undecided", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-in" });
    expect(getConsent()).toBe("undecided");
    expect(isTrackingAllowed()).toBe(false);
  });

  it("opt-in: allowed after explicit grant", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "t", posture: "opt-in" });
    setConsent("granted");
    expect(isTrackingAllowed()).toBe(true);
  });

  it("consent key is prefix-namespaced", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    setConsent("denied");
    expect(mockLS.getItem("hd_consent")).toBe("denied");
    expect(mockLS.getItem("sdk_consent")).toBeNull(); // wrong prefix unused
  });
});

// ---------------------------------------------------------------------------
// 2. Id minting + idle roll + legacyPrefix migration
// ---------------------------------------------------------------------------

describe("id minting", () => {
  beforeEach(() => {
    setupBrowserMocks();
    _resetSdkConfig();
    _resetMigration();
  });
  afterEach(teardownBrowserMocks);

  it("mints a new visitor id with v_ prefix", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    const id = getVisitorId();
    expect(id).toMatch(/^v_/);
  });

  it("returns the same visitor id on repeated calls", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    const a = getVisitorId();
    const b = getVisitorId();
    expect(a).toBe(b);
  });

  it("two minted ids share no derivable structure", () => {
    // mint two ids in fresh storages
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    const id1 = getVisitorId();
    // wipe storage and reset migration to mint a new id
    mockLS.clear();
    _resetMigration();
    const id2 = getVisitorId();
    expect(id1).not.toBe(id2);
    // they only share the "v_" prefix (random, not derived from each other)
    const tail1 = id1.slice(2);
    const tail2 = id2.slice(2);
    expect(tail1).not.toBe(tail2);
  });

  it("session id is a fresh s_ id on first call", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    // Give sessionStorage access via our mock
    const sid = getSessionId();
    expect(sid).toMatch(/^s_/);
  });

  it("isNewSession returns true when no session exists", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    expect(isNewSession()).toBe(true);
  });

  it("isNewSession returns false after getSessionId called", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    getSessionId();
    expect(isNewSession()).toBe(false);
  });
});

describe("legacyPrefix migration", () => {
  beforeEach(() => {
    setupBrowserMocks();
    _resetSdkConfig();
    _resetMigration();
  });
  afterEach(teardownBrowserMocks);

  it("migrates consent denied from legacy prefix", () => {
    mockLS.setItem("ptp_consent", "denied");
    initAnalytics({
      siteKey: "test", siteName: "Test", storagePrefix: "hd",
      legacyPrefix: "ptp", posture: "opt-out",
    });
    // run migration by calling getVisitorId (which calls runLegacyMigration)
    getVisitorId();
    expect(mockLS.getItem("hd_consent")).toBe("denied");
  });

  it("migrates visitor id from legacy prefix", () => {
    mockLS.setItem("ptp_vid", "v_legacy123");
    initAnalytics({
      siteKey: "test", siteName: "Test", storagePrefix: "hd",
      legacyPrefix: "ptp", posture: "opt-out",
    });
    const id = getVisitorId();
    expect(id).toBe("v_legacy123");
    expect(mockLS.getItem("hd_vid")).toBe("v_legacy123");
  });

  it("does not overwrite existing new-prefix vid with legacy", () => {
    mockLS.setItem("ptp_vid", "v_old");
    mockLS.setItem("hd_vid", "v_new");
    initAnalytics({
      siteKey: "test", siteName: "Test", storagePrefix: "hd",
      legacyPrefix: "ptp", posture: "opt-out",
    });
    const id = getVisitorId();
    expect(id).toBe("v_new"); // existing new-prefix id wins
  });

  it("does not migrate granted consent (only denied is compliance-critical)", () => {
    mockLS.setItem("ptp_consent", "granted");
    initAnalytics({
      siteKey: "test", siteName: "Test", storagePrefix: "hd",
      legacyPrefix: "ptp", posture: "opt-out",
    });
    getVisitorId();
    // granted is not migrated — opt-out posture allows tracking by default anyway
    expect(mockLS.getItem("hd_consent")).toBeNull();
  });

  it("migration runs only once (idempotent)", () => {
    mockLS.setItem("ptp_vid", "v_once");
    initAnalytics({
      siteKey: "test", siteName: "Test", storagePrefix: "hd",
      legacyPrefix: "ptp", posture: "opt-out",
    });
    getVisitorId(); // runs migration
    mockLS.setItem("ptp_vid", "v_changed"); // mutate legacy after migration
    getVisitorId(); // should NOT re-migrate
    expect(mockLS.getItem("hd_vid")).toBe("v_once"); // unchanged
  });

  it("no legacyPrefix — migration is a no-op", () => {
    initAnalytics({ siteKey: "test", siteName: "Test", storagePrefix: "hd", posture: "opt-out" });
    getVisitorId();
    // No legacy keys should appear
    expect(mockLS.getItem("ptp_vid")).toBeNull();
    expect(mockLS.getItem("ptp_consent")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// 3. scrubProps — PII removal
// ---------------------------------------------------------------------------

describe("scrubProps", () => {
  it("removes email-shaped values", () => {
    const result = scrubProps({ label: "test", contact: "user@example.com" });
    expect(result).not.toHaveProperty("contact");
    expect(result.label).toBe("test");
  });

  it("removes phone-shaped values", () => {
    const result = scrubProps({ info: "07700 900123", section: "hero" });
    expect(result).not.toHaveProperty("info");
    expect(result.section).toBe("hero");
  });

  it("preserves non-PII string values", () => {
    const result = scrubProps({ cta_id: "book-call", pct: 75 });
    expect(result.cta_id).toBe("book-call");
    expect(result.pct).toBe(75);
  });

  it("drops undefined values", () => {
    const result = scrubProps({ a: "keep", b: undefined });
    expect(result).toHaveProperty("a");
    expect(result).not.toHaveProperty("b");
  });

  it("preserves boolean and number values", () => {
    const result = scrubProps({ flag: true, count: 3, ratio: 0.5 });
    expect(result.flag).toBe(true);
    expect(result.count).toBe(3);
    expect(result.ratio).toBe(0.5);
  });
});

// ---------------------------------------------------------------------------
// 4. sanitiseEvents — allowlist + envelope + caps + foreign-key drop
// ---------------------------------------------------------------------------

describe("sanitiseEvents", () => {
  const validEvent = {
    event_name: "page_view",
    session_id: "s_abc",
    visitor_id: "v_xyz",
    site_key: "general",
    page_path: "/",
    props: {},
  };

  it("accepts a valid event batch", () => {
    const result = sanitiseEvents({ events: [validEvent] }, "general");
    expect(result).toHaveLength(1);
    expect(result[0].event_name).toBe("page_view");
  });

  it("rejects an event with an unknown event name", () => {
    const result = sanitiseEvents(
      { events: [{ ...validEvent, event_name: "invented_event" }] },
      "general",
    );
    expect(result).toHaveLength(0);
  });

  it("rejects an event missing session_id", () => {
    const result = sanitiseEvents(
      { events: [{ ...validEvent, session_id: undefined }] },
      "general",
    );
    expect(result).toHaveLength(0);
  });

  it("rejects an event missing visitor_id", () => {
    const result = sanitiseEvents(
      { events: [{ ...validEvent, visitor_id: "" }] },
      "general",
    );
    expect(result).toHaveLength(0);
  });

  it("drops events whose site_key doesn't match expected (foreign-key drop)", () => {
    const result = sanitiseEvents(
      { events: [{ ...validEvent, site_key: "property" }] },
      "general",
    );
    expect(result).toHaveLength(0);
  });

  it("keeps events matching the expected site_key", () => {
    const result = sanitiseEvents(
      { events: [{ ...validEvent, site_key: "general" }] },
      "general",
    );
    expect(result).toHaveLength(1);
  });

  it("truncates batch to MAX_BATCH_EVENTS (40)", () => {
    const events = Array.from({ length: 50 }, () => ({ ...validEvent }));
    const result = sanitiseEvents({ events }, "general");
    expect(result).toHaveLength(40);
  });

  it("replaces oversized props with empty object", () => {
    const bigProps = { data: "x".repeat(5000) };
    const result = sanitiseEvents(
      { events: [{ ...validEvent, props: bigProps }] },
      "general",
    );
    expect(result).toHaveLength(1);
    expect(result[0].props).toEqual({});
  });

  it("returns empty array for non-object input", () => {
    expect(sanitiseEvents(null, "general")).toHaveLength(0);
    expect(sanitiseEvents("bad", "general")).toHaveLength(0);
  });

  it("returns empty array when events key is not an array", () => {
    expect(sanitiseEvents({ events: "bad" }, "general")).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// 5. Bot heuristic fixtures
// ---------------------------------------------------------------------------

describe("detectBot", () => {
  it("flags Googlebot UA as bot", () => {
    const r = detectBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
    expect(r.isBot).toBe(true);
    expect(r.reason).toBe("ua_pattern");
  });

  it("flags missing UA as bot", () => {
    const r = detectBot(null);
    expect(r.isBot).toBe(true);
    expect(r.reason).toBe("ua_missing");
  });

  it("flags a very short UA as bot", () => {
    const r = detectBot("curl");
    expect(r.isBot).toBe(true);
  });

  it("flags a UA with no Mozilla/ token", () => {
    const r = detectBot("python-httpx/0.27 SomeLib/1.0 requests-test/custom-agent-v1");
    expect(r.isBot).toBe(true);
    expect(r.reason).toBe("ua_no_mozilla");
  });

  it("passes a real Chrome UA", () => {
    const r = detectBot(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    );
    expect(r.isBot).toBe(false);
    expect(r.reason).toBeNull();
  });

  it("passes a real Safari UA", () => {
    const r = detectBot(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    );
    expect(r.isBot).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 6. buildSession aggregation
// ---------------------------------------------------------------------------

describe("buildSession", () => {
  const ctx = {
    isBot: false,
    botReason: null,
    botidVerified: null,
    country: "GB",
    city: "London",
    region: "ENG",
    timezone: "Europe/London",
    uaFamily: "Chrome",
    osFamily: "Windows",
  };

  function makeEvent(name: string, extra: Record<string, unknown> = {}) {
    return {
      event_name: name,
      session_id: "s_test",
      visitor_id: "v_test",
      site_key: "general",
      page_path: "/test",
      page_query: "",
      is_embed: false,
      props: {},
      ...extra,
    };
  }

  it("human_confirmed is false with only a page_view", () => {
    const session = buildSession([makeEvent("page_view")], ctx);
    expect(session.human_confirmed).toBe(false);
  });

  it("human_confirmed flips true on the first interaction event", () => {
    const session = buildSession(
      [makeEvent("page_view"), makeEvent("element_click")],
      ctx,
    );
    expect(session.human_confirmed).toBe(true);
  });

  it("engagement_time deltas are summed", () => {
    const session = buildSession(
      [
        makeEvent("page_view"),
        makeEvent("engagement_time", { props: { engaged_ms_delta: 5000 } }),
        makeEvent("engagement_time", { props: { engaged_ms_delta: 3000 } }),
      ],
      ctx,
    );
    expect(session.engaged_ms).toBe(8000);
  });

  it("max_scroll_pct tracks the maximum pct seen", () => {
    const session = buildSession(
      [
        makeEvent("page_view"),
        makeEvent("scroll_depth", { props: { pct: 25 } }),
        makeEvent("scroll_depth", { props: { pct: 75 } }),
        makeEvent("scroll_depth", { props: { pct: 50 } }),
      ],
      ctx,
    );
    expect(session.max_scroll_pct).toBe(75);
  });

  it("carries geo context from the ctx arg", () => {
    const session = buildSession([makeEvent("page_view")], ctx);
    expect(session.country).toBe("GB");
    expect(session.ua_family).toBe("Chrome");
    expect(session.os_family).toBe("Windows");
  });

  it("event_count matches the number of events in the group", () => {
    const session = buildSession(
      [makeEvent("page_view"), makeEvent("scroll_depth", { props: { pct: 25 } })],
      ctx,
    );
    expect(session.event_count).toBe(2);
  });

  it("is_bot propagates from ctx", () => {
    const botCtx = { ...ctx, isBot: true, botReason: "ua_pattern" };
    const session = buildSession([makeEvent("page_view")], botCtx);
    expect(session.is_bot).toBe(true);
    expect(session.bot_reason).toBe("ua_pattern");
  });
});

// ---------------------------------------------------------------------------
// 7. Experiments stamping
// ---------------------------------------------------------------------------

describe("experiments stamping", () => {
  beforeEach(() => {
    _clearExperiments();
  });

  it("activeExperimentString returns undefined when no experiments active", () => {
    expect(activeExperimentString()).toBeUndefined();
  });

  it("returns a key:variant string after setActiveExperiment", () => {
    setActiveExperiment("personalization", "treatment");
    expect(activeExperimentString()).toBe("personalization:treatment");
  });

  it("concatenates multiple active experiments with commas", () => {
    setActiveExperiment("exp_a", "v1");
    setActiveExperiment("exp_b", "v2");
    const str = activeExperimentString()!;
    expect(str).toContain("exp_a:v1");
    expect(str).toContain("exp_b:v2");
  });

  it("assignVariant returns null for an empty registry", () => {
    expect(assignVariant("v_somevisitor", "any_experiment")).toBeNull();
  });

  it("assignVariant returns a stable variant from a registered experiment", () => {
    registerExperiments([{
      key: "calc_cta",
      status: "running",
      variants: [{ id: "control", weight: 50 }, { id: "treatment", weight: 50 }],
    }]);
    const v1 = assignVariant("v_abc123", "calc_cta");
    const v2 = assignVariant("v_abc123", "calc_cta");
    expect(v1).not.toBeNull();
    expect(v1).toBe(v2); // deterministic
    expect(["control", "treatment"]).toContain(v1);
  });

  it("assignVariant returns null for an 'off' experiment", () => {
    registerExperiments([{ key: "off_test", status: "off", variants: [{ id: "x", weight: 1 }] }]);
    expect(assignVariant("v_abc", "off_test")).toBeNull();
  });

  it("getExperiment returns null from empty registry", () => {
    expect(getExperiment("anything")).toBeNull();
  });
});
