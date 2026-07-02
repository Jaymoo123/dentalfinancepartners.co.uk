/**
 * GAP-3 Stage 1 test suite — shared operator console.
 *
 * Coverage (spec brief requirements):
 *   - Auth gate: timing-safe compare, session token derivation, cookie issuance,
 *     denial paths (empty/wrong key).
 *   - Query layer: smoke-tests the function signatures and aggregateRows logic
 *     against fixture rows (no HTTP — rest() is mockable via env var absence).
 *   - Journey utilities: humanise, buildActivityRows, buildStory, summariseVitals
 *     against fixture events.
 *   - Experiment arm/funnel parsing: getExperimentArms + getExperimentFunnel
 *     grouping logic against fixture rows (no HTTP).
 */

import { describe, it, expect } from "vitest";
import {
  verifyConsoleKey,
  deriveSessionToken,
  verifySessionCookie,
  buildSessionCookie,
  clearSessionCookie,
  CONSOLE_COOKIE_NAME,
} from "./consoleAuth";
import type { VisitorEvent, ExperimentResult, ExperimentFunnelRow, EnrolledLeadFact } from "./adminData";
import {
  parseExperimentArms,
  parseExperimentFunnel,
  computeContactabilityWindows,
  computeT0Readout,
} from "./adminData";
import { t0Variant } from "../lead-nurture/t0";
import {
  humanise,
  buildActivityRows,
  buildStory,
  summariseVitals,
  clockTime,
  readingTime,
  formatVital,
} from "./journey";

// ── Auth tests ─────────────────────────────────────────────────────────────

describe("verifyConsoleKey", () => {
  it("returns true for identical keys", () => {
    expect(verifyConsoleKey("secret123", "secret123")).toBe(true);
  });

  it("returns false for a wrong key", () => {
    expect(verifyConsoleKey("wrong", "secret123")).toBe(false);
  });

  it("returns false when submitted key is empty", () => {
    expect(verifyConsoleKey("", "secret123")).toBe(false);
  });

  it("returns false when expected key is empty", () => {
    expect(verifyConsoleKey("secret123", "")).toBe(false);
  });

  it("returns false when both are empty", () => {
    expect(verifyConsoleKey("", "")).toBe(false);
  });

  it("is case-sensitive", () => {
    expect(verifyConsoleKey("Secret123", "secret123")).toBe(false);
  });
});

describe("deriveSessionToken", () => {
  it("returns a 64-char hex string", () => {
    const token = deriveSessionToken("mykey");
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is deterministic for the same key", () => {
    expect(deriveSessionToken("abc")).toBe(deriveSessionToken("abc"));
  });

  it("differs for different keys", () => {
    expect(deriveSessionToken("key1")).not.toBe(deriveSessionToken("key2"));
  });
});

describe("verifySessionCookie", () => {
  it("returns true for a valid cookie matching the key", () => {
    const key = "test-secret-key-123";
    const token = deriveSessionToken(key);
    expect(verifySessionCookie(token, key)).toBe(true);
  });

  it("returns false for a tampered cookie", () => {
    const key = "test-secret-key-123";
    expect(verifySessionCookie("tampered-value", key)).toBe(false);
  });

  it("returns false for undefined cookie", () => {
    expect(verifySessionCookie(undefined, "key")).toBe(false);
  });

  it("returns false when key is empty", () => {
    expect(verifySessionCookie("sometoken", "")).toBe(false);
  });
});

describe("buildSessionCookie", () => {
  it("contains the correct cookie name", () => {
    const header = buildSessionCookie("testkey", { secure: false });
    expect(header).toContain(`${CONSOLE_COOKIE_NAME}=`);
  });

  it("contains HttpOnly and SameSite=Strict", () => {
    const header = buildSessionCookie("testkey", { secure: false });
    expect(header).toContain("HttpOnly");
    expect(header).toContain("SameSite=Strict");
  });

  it("contains Path=/admin/analytics", () => {
    const header = buildSessionCookie("testkey", { secure: false });
    expect(header).toContain("Path=/admin/analytics");
  });

  it("contains Secure flag when secure=true", () => {
    const header = buildSessionCookie("testkey", { secure: true });
    expect(header).toContain("Secure");
  });

  it("omits Secure flag when secure=false", () => {
    const header = buildSessionCookie("testkey", { secure: false });
    expect(header).not.toContain("Secure");
  });

  it("cookie value is the derived session token", () => {
    const key = "my-admin-key";
    const token = deriveSessionToken(key);
    const header = buildSessionCookie(key, { secure: false });
    expect(header).toContain(`${CONSOLE_COOKIE_NAME}=${token}`);
  });
});

describe("clearSessionCookie", () => {
  it("sets Max-Age=0", () => {
    expect(clearSessionCookie()).toContain("Max-Age=0");
  });

  it("contains the cookie name", () => {
    expect(clearSessionCookie()).toContain(CONSOLE_COOKIE_NAME);
  });
});

// ── Journey utility tests ──────────────────────────────────────────────────

function mkEvent(name: string, props: Record<string, unknown> = {}, page = "/test"): VisitorEvent {
  return {
    ts: new Date().toISOString(),
    session_id: "s1",
    event_name: name,
    page_path: page,
    props,
  };
}

describe("humanise", () => {
  it("humanises page_view with title", () => {
    const e = mkEvent("page_view", { page_title: "About us" });
    expect(humanise(e)).toContain("About us");
  });

  it("humanises page_view using page_path when no title", () => {
    const e = mkEvent("page_view", {}, "/about");
    e.page_path = "/about";
    expect(humanise(e)).toContain("/about");
  });

  it("humanises calc_computed", () => {
    const e = mkEvent("calc_computed", { calculator_slug: "income-tax" });
    expect(humanise(e)).toContain("income-tax");
  });

  it("humanises lead_submitted", () => {
    const e = mkEvent("lead_submitted", { form_id: "lead_form" });
    expect(humanise(e)).toContain("Converted");
  });

  it("humanises form_start", () => {
    const e = mkEvent("form_start", { form_id: "contact" });
    expect(humanise(e)).toContain("contact");
  });

  it("humanises cta_click with form goal annotation", () => {
    const e = mkEvent("cta_click", { cta_id: "hero_cta", cta_label: "Get started", goal: "form" });
    expect(humanise(e)).toContain("form");
  });

  it("humanises client_error with message", () => {
    const e = mkEvent("client_error", { message: "TypeError: null" });
    expect(humanise(e)).toContain("TypeError");
  });

  it("handles unknown event names gracefully", () => {
    const e = mkEvent("new_custom_event_type");
    const result = humanise(e);
    expect(result.length).toBeGreaterThan(0);
    expect(typeof result).toBe("string");
  });

  it("uses custom ruleLabel for personalization events", () => {
    const e = mkEvent("personalization_shown", { rule_id: "promo_rule" });
    const customLabel = (id: string) => `Custom(${id})`;
    expect(humanise(e, customLabel)).toContain("Custom(promo_rule)");
  });
});

describe("readingTime", () => {
  it("formats sub-60s durations", () => {
    expect(readingTime(5000)).toBe("~5s");
  });

  it("formats minute durations", () => {
    expect(readingTime(120000)).toBe("~2 min");
  });

  it("uses minimum of 1s for very short durations", () => {
    expect(readingTime(100)).toBe("~1s");
  });
});

describe("clockTime", () => {
  it("returns HH:MM format", () => {
    const iso = "2026-06-11T14:30:00Z";
    const result = clockTime(iso);
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });
});

describe("formatVital", () => {
  it("formats CLS by dividing by 1000", () => {
    expect(formatVital("CLS", 150)).toBe("0.15");
  });

  it("formats ms values under 1s", () => {
    expect(formatVital("LCP", 800)).toBe("800ms");
  });

  it("formats values over 1s as seconds", () => {
    expect(formatVital("LCP", 2500)).toBe("2.5s");
  });
});

describe("summariseVitals", () => {
  it("returns null verdict when no web_vital events", () => {
    const result = summariseVitals([mkEvent("page_view")]);
    expect(result.verdict).toBeNull();
    expect(result.rows).toHaveLength(0);
  });

  it("returns Fast verdict for all-good vitals", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "web_vital", page_path: "/", props: { metric: "LCP", value: 1000, rating: "good" } },
      { ts: "2026-06-11T10:00:01Z", session_id: "s1", event_name: "web_vital", page_path: "/", props: { metric: "CLS", value: 50, rating: "good" } },
    ];
    const result = summariseVitals(events);
    expect(result.verdict).toBe("Fast");
    expect(result.rows.length).toBeGreaterThan(0);
  });

  it("returns Slow verdict when any metric is poor", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "web_vital", page_path: "/", props: { metric: "LCP", value: 6000, rating: "poor" } },
    ];
    const result = summariseVitals(events);
    expect(result.verdict).toBe("Slow");
  });
});

describe("buildActivityRows", () => {
  it("merges consecutive engagement pings", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "engagement_time", page_path: "/", props: { engaged_ms_delta: 15000 } },
      { ts: "2026-06-11T10:00:15Z", session_id: "s1", event_name: "engagement_time", page_path: "/", props: { engaged_ms_delta: 15000 } },
    ];
    const rows = buildActivityRows(events);
    expect(rows).toHaveLength(1);
    expect(rows[0].kind).toBe("engaged");
    expect(rows[0].text).toContain("Engaged");
  });

  it("suppresses web_vital events from the activity log", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "web_vital", page_path: "/", props: { metric: "LCP", value: 1000, rating: "good" } },
      mkEvent("page_view", { page_title: "Home" }),
    ];
    const rows = buildActivityRows(events);
    expect(rows).toHaveLength(1);
    expect(rows[0].text).toContain("Home");
  });

  it("preserves non-engagement events", () => {
    const events: VisitorEvent[] = [
      mkEvent("page_view", { page_title: "Home" }),
      mkEvent("calc_view", { calculator_slug: "income-tax" }),
    ];
    const rows = buildActivityRows(events);
    expect(rows).toHaveLength(2);
  });
});

describe("buildStory", () => {
  it("groups events by session", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "page_view", page_path: "/", props: { page_title: "Home" } },
      { ts: "2026-06-11T11:00:00Z", session_id: "s2", event_name: "page_view", page_path: "/about", props: { page_title: "About" } },
    ];
    const story = buildStory(events);
    expect(story).toHaveLength(2);
    expect(story[0].sessionId).toBe("s1");
    expect(story[1].sessionId).toBe("s2");
  });

  it("includes an open line per session", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "page_view", page_path: "/", props: { page_title: "Home" } },
    ];
    const story = buildStory(events);
    expect(story[0].lines[0].kind).toBe("open");
  });

  it("marks lead_submitted as convert kind", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "page_view", page_path: "/", props: {} },
      { ts: "2026-06-11T10:05:00Z", session_id: "s1", event_name: "lead_submitted", page_path: "/contact", props: { form_id: "lead_form" } },
    ];
    const story = buildStory(events);
    const convertLine = story[0].lines.find((l) => l.kind === "convert");
    expect(convertLine).toBeDefined();
  });

  it("collapses engagement runs into reading lines", () => {
    const events: VisitorEvent[] = [
      { ts: "2026-06-11T10:00:00Z", session_id: "s1", event_name: "page_view", page_path: "/", props: {} },
      { ts: "2026-06-11T10:00:15Z", session_id: "s1", event_name: "engagement_time", page_path: "/", props: { engaged_ms_delta: 15000 } },
      { ts: "2026-06-11T10:00:30Z", session_id: "s1", event_name: "engagement_time", page_path: "/", props: { engaged_ms_delta: 15000 } },
    ];
    const story = buildStory(events);
    const readingLine = story[0].lines.find((l) => l.kind === "reading");
    expect(readingLine).toBeDefined();
    expect(readingLine!.text).toContain("Read for");
  });

  it("returns empty array for no events", () => {
    expect(buildStory([])).toHaveLength(0);
  });
});

// ── parseExperimentArms tests ─────────────────────────────────────────────

describe("parseExperimentArms", () => {
  const fixtureRows: ExperimentResult[] = [
    { exp: "calc_result_capture:control",   sessions: 120, cta_clicks: 30, form_starts: 18, converted_sessions: 6, conversion_rate: 0.05 },
    { exp: "calc_result_capture:treatment", sessions: 115, cta_clicks: 42, form_starts: 29, converted_sessions: 11, conversion_rate: 0.096 },
    { exp: "exit_intent_offer:control",     sessions: 200, cta_clicks: 10, form_starts: 8,  converted_sessions: 4, conversion_rate: 0.02 },
    { exp: "exit_intent_offer:treatment",   sessions: 195, cta_clicks: 22, form_starts: 18, converted_sessions: 9, conversion_rate: 0.046 },
  ];

  it("returns a key per experiment id", () => {
    const result = parseExperimentArms(fixtureRows);
    expect(Object.keys(result)).toContain("calc_result_capture");
    expect(Object.keys(result)).toContain("exit_intent_offer");
    expect(Object.keys(result)).toHaveLength(2);
  });

  it("places control and treatment on the correct slots", () => {
    const result = parseExperimentArms(fixtureRows);
    expect(result.calc_result_capture.control?.sessions).toBe(120);
    expect(result.calc_result_capture.treatment?.sessions).toBe(115);
  });

  it("preserves conversion_rate on each arm", () => {
    const result = parseExperimentArms(fixtureRows);
    expect(result.exit_intent_offer.control?.conversion_rate).toBeCloseTo(0.02);
    expect(result.exit_intent_offer.treatment?.conversion_rate).toBeCloseTo(0.046);
  });

  it("returns null arms for experiments with only one variant present", () => {
    const partial: ExperimentResult[] = [
      { exp: "my_test:control", sessions: 50, cta_clicks: 5, form_starts: 3, converted_sessions: 1, conversion_rate: 0.02 },
    ];
    const result = parseExperimentArms(partial);
    expect(result.my_test.control).not.toBeNull();
    expect(result.my_test.treatment).toBeNull();
  });

  it("skips rows without a colon separator (malformed exp field)", () => {
    const withBad: ExperimentResult[] = [
      { exp: "no_colon_here", sessions: 99, cta_clicks: 0, form_starts: 0, converted_sessions: 0, conversion_rate: null },
      { exp: "good_exp:control", sessions: 10, cta_clicks: 1, form_starts: 1, converted_sessions: 0, conversion_rate: 0 },
    ];
    const result = parseExperimentArms(withBad);
    expect(Object.keys(result)).not.toContain("no_colon_here");
    expect(Object.keys(result)).toContain("good_exp");
  });

  it("returns an empty map for empty input", () => {
    expect(parseExperimentArms([])).toEqual({});
  });

  it("handles an unknown experiment id gracefully (no error thrown)", () => {
    const rows: ExperimentResult[] = [
      { exp: "brand_new_unknown_id:control",   sessions: 5, cta_clicks: 0, form_starts: 0, converted_sessions: 0, conversion_rate: null },
      { exp: "brand_new_unknown_id:treatment", sessions: 5, cta_clicks: 0, form_starts: 0, converted_sessions: 0, conversion_rate: null },
    ];
    expect(() => parseExperimentArms(rows)).not.toThrow();
    const result = parseExperimentArms(rows);
    expect(result.brand_new_unknown_id).toBeDefined();
    expect(result.brand_new_unknown_id.control).not.toBeNull();
    expect(result.brand_new_unknown_id.treatment).not.toBeNull();
  });
});

// ── parseExperimentFunnel tests ───────────────────────────────────────────

describe("parseExperimentFunnel", () => {
  const fixtureRows: ExperimentFunnelRow[] = [
    { exp: "calc_result_capture:control",   exposed_sessions: 100, acted_sessions: 12, acted_with_phone_sessions: 8, converted_sessions: 5 },
    { exp: "calc_result_capture:treatment", exposed_sessions: 98,  acted_sessions: 28, acted_with_phone_sessions: 19, converted_sessions: 10 },
    { exp: "lead_form_length:control",      exposed_sessions: 80,  acted_sessions: 60, acted_with_phone_sessions: 55, converted_sessions: 7 },
    { exp: "lead_form_length:treatment",    exposed_sessions: 85,  acted_sessions: 72, acted_with_phone_sessions: 10, converted_sessions: 8 },
  ];

  it("returns a key per experiment id", () => {
    const result = parseExperimentFunnel(fixtureRows);
    expect(Object.keys(result)).toContain("calc_result_capture");
    expect(Object.keys(result)).toContain("lead_form_length");
    expect(Object.keys(result)).toHaveLength(2);
  });

  it("maps exposed, acted, acted_with_phone and converted on each arm", () => {
    const result = parseExperimentFunnel(fixtureRows);
    const ctrl = result.calc_result_capture.control;
    expect(ctrl?.exposed).toBe(100);
    expect(ctrl?.acted).toBe(12);
    expect(ctrl?.acted_with_phone).toBe(8);
    expect(ctrl?.converted).toBe(5);
    const trt = result.calc_result_capture.treatment;
    expect(trt?.exposed).toBe(98);
    expect(trt?.acted).toBe(28);
  });

  it("places guardrail (acted_with_phone) correctly on lead_form_length", () => {
    const result = parseExperimentFunnel(fixtureRows);
    expect(result.lead_form_length.control?.acted_with_phone).toBe(55);
    expect(result.lead_form_length.treatment?.acted_with_phone).toBe(10);
  });

  it("skips rows without a colon in exp field", () => {
    const bad: ExperimentFunnelRow[] = [
      { exp: "malformed", exposed_sessions: 10, acted_sessions: 5, acted_with_phone_sessions: 0, converted_sessions: 0 },
    ];
    expect(parseExperimentFunnel(bad)).toEqual({});
  });

  it("returns empty map for empty input", () => {
    expect(parseExperimentFunnel([])).toEqual({});
  });

  it("handles an unknown experiment id (funnel fallback test)", () => {
    // Unknown ids arriving from the DB must not crash -- the card will show the
    // not-enough-data state (both arms null initially) or the fallback meta label.
    const rows: ExperimentFunnelRow[] = [
      { exp: "future_experiment:control",   exposed_sessions: 20, acted_sessions: 5, acted_with_phone_sessions: 0, converted_sessions: 1 },
      { exp: "future_experiment:treatment", exposed_sessions: 22, acted_sessions: 9, acted_with_phone_sessions: 0, converted_sessions: 2 },
    ];
    expect(() => parseExperimentFunnel(rows)).not.toThrow();
    const result = parseExperimentFunnel(rows);
    expect(result.future_experiment.control?.exposed).toBe(20);
    expect(result.future_experiment.treatment?.exposed).toBe(22);
  });
});

// ── computeContactabilityWindows tests ────────────────────────────────────

describe("computeContactabilityWindows", () => {
  const NOW = new Date("2026-07-02T12:00:00Z").getTime();
  const MS_DAY = 24 * 60 * 60 * 1000;

  function mkFact(daysAgo: number, status: string, idx = 0): EnrolledLeadFact {
    return {
      leadId: `lead-${daysAgo}-${status}-${idx}`,
      createdAt: new Date(NOW - daysAgo * MS_DAY).toISOString(),
      status,
    };
  }

  it("returns zero rate and zero enrolled for empty input (no divide-by-zero)", () => {
    const result = computeContactabilityWindows([], NOW);
    expect(result.d7.enrolled).toBe(0);
    expect(result.d7.rate).toBe(0);
    expect(result.d28.enrolled).toBe(0);
    expect(result.d28.rate).toBe(0);
    expect(result.all.enrolled).toBe(0);
    expect(result.all.rate).toBe(0);
  });

  it("includes all facts in the all-time bucket regardless of age", () => {
    const facts = [mkFact(60, "contactable"), mkFact(1, "submitted")];
    const { all } = computeContactabilityWindows(facts, NOW);
    expect(all.enrolled).toBe(2);
  });

  it("filters d7 to facts within the last 7 days; d28 includes more", () => {
    const facts = [
      mkFact(3, "contactable"),   // inside d7 and d28
      mkFact(10, "contactable"),  // inside d28 only
      mkFact(35, "contactable"),  // outside both windows, inside all
    ];
    const { d7, d28, all } = computeContactabilityWindows(facts, NOW);
    expect(d7.enrolled).toBe(1);
    expect(d28.enrolled).toBe(2);
    expect(all.enrolled).toBe(3);
  });

  it("counts contactable and forwarded as contactable; other statuses do not count", () => {
    const facts = [
      mkFact(1, "contactable"),
      mkFact(2, "forwarded"),
      mkFact(3, "submitted"),
      mkFact(4, "unreachable"),
    ];
    const { all } = computeContactabilityWindows(facts, NOW);
    expect(all.contactable).toBe(2);
    expect(all.enrolled).toBe(4);
  });

  it("computes rate as contactable / enrolled", () => {
    const facts = [
      mkFact(1, "contactable"),
      mkFact(2, "submitted"),
      mkFact(3, "submitted"),
      mkFact(4, "submitted"),
    ];
    const { all } = computeContactabilityWindows(facts, NOW);
    expect(all.rate).toBeCloseTo(0.25);
  });

  it("returns rate = 0 when no enrolled falls inside the d7 window", () => {
    // Fact is 30 days old, outside the 7-day window
    const facts = [mkFact(30, "contactable")];
    const { d7 } = computeContactabilityWindows(facts, NOW);
    expect(d7.enrolled).toBe(0);
    expect(d7.rate).toBe(0);
  });
});

// ── computeT0Readout tests ────────────────────────────────────────────────

describe("computeT0Readout", () => {
  // Two arbitrary UUIDs; their arms are resolved at runtime by t0Variant so
  // the tests stay correct however the hash lands.
  const UUID_A = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const UUID_B = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";

  it("returns zero enrolled and rate = 0 for empty input", () => {
    const result = computeT0Readout([]);
    expect(result.branded.enrolled).toBe(0);
    expect(result.branded.rate).toBe(0);
    expect(result.personal.enrolled).toBe(0);
    expect(result.personal.rate).toBe(0);
  });

  it("places each fact into the arm returned by t0Variant (deterministic split)", () => {
    const facts: EnrolledLeadFact[] = [
      { leadId: UUID_A, createdAt: "2026-07-01T00:00:00Z", status: "contactable" },
      { leadId: UUID_B, createdAt: "2026-07-01T00:00:00Z", status: "contactable" },
    ];
    const result = computeT0Readout(facts);

    // Count expected branded / personal from the canonical t0Variant function
    const brandedExpected = [UUID_A, UUID_B].filter((id) => t0Variant(id) === "t0_branded").length;
    const personalExpected = [UUID_A, UUID_B].filter((id) => t0Variant(id) === "t0_personal").length;

    expect(result.branded.enrolled).toBe(brandedExpected);
    expect(result.personal.enrolled).toBe(personalExpected);
    // Total across both arms must equal 2
    expect(result.branded.enrolled + result.personal.enrolled).toBe(2);
  });

  it("counts forwarded and contactable as contactable in each arm", () => {
    const facts: EnrolledLeadFact[] = [
      { leadId: UUID_A, createdAt: "2026-07-01T00:00:00Z", status: "forwarded" },
      { leadId: UUID_B, createdAt: "2026-07-01T00:00:00Z", status: "contactable" },
    ];
    const result = computeT0Readout(facts);

    // Both statuses are contactable, so the total across arms must equal 2
    expect(result.branded.contactable + result.personal.contactable).toBe(2);
  });

  it("does not count submitted or unreachable as contactable", () => {
    const facts: EnrolledLeadFact[] = [
      { leadId: UUID_A, createdAt: "2026-07-01T00:00:00Z", status: "submitted" },
      { leadId: UUID_B, createdAt: "2026-07-01T00:00:00Z", status: "unreachable" },
    ];
    const result = computeT0Readout(facts);
    expect(result.branded.contactable + result.personal.contactable).toBe(0);
  });

  it("is deterministic: calling twice with the same facts yields the same split", () => {
    const facts: EnrolledLeadFact[] = [
      { leadId: UUID_A, createdAt: "2026-07-01T00:00:00Z", status: "contactable" },
    ];
    expect(computeT0Readout(facts)).toEqual(computeT0Readout(facts));
  });
});
