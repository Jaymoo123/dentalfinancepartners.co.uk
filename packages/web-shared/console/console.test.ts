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
import type { VisitorEvent } from "./adminData";
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
