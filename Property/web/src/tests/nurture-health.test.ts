/**
 * Unit tests for the PURE evaluateGuardrails function in nurture-health.ts.
 *
 * All tests are synchronous and deterministic: no I/O, no DB, no network.
 * The async functions (getNurtureHealth, runNurtureGuardrails) are NOT tested
 * here because they require a live DB.
 */

import { describe, it, expect } from "vitest";
import {
  evaluateGuardrails,
  DEFAULT_THRESHOLDS,
} from "@/lib/leads/nurture-health";
import type { NurtureHealth, GuardrailThresholds } from "@/lib/leads/nurture-health";

// ---------------------------------------------------------------------------
// Helper: minimal all-zero health fixture
// ---------------------------------------------------------------------------

function makeHealth(overrides: Partial<NurtureHealth> = {}): NurtureHealth {
  return {
    siteKey: "property",
    sends24h: 0,
    sent24h: 0,
    failed24h: 0,
    skipped24h: 0,
    sends1h: 0,
    failed1h: 0,
    skipped1h: 0,
    complaints24h: 0,
    complaints7d: 0,
    bounces24h: 0,
    bounces7d: 0,
    optouts7d: 0,
    replies24h: 0,
    booked24h: 0,
    activeLeads: 0,
    stuckLeads: 0,
    contactable: 0,
    unreachable: 0,
    forwarded: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// DEFAULT_THRESHOLDS are pinned
// ---------------------------------------------------------------------------

describe("DEFAULT_THRESHOLDS (pinned values)", () => {
  it("complaints24hPause is 2", () => {
    expect(DEFAULT_THRESHOLDS.complaints24hPause).toBe(2);
  });

  it("complaints7dPause is 3", () => {
    expect(DEFAULT_THRESHOLDS.complaints7dPause).toBe(3);
  });

  it("failedSend1hRatePause is 0.25", () => {
    expect(DEFAULT_THRESHOLDS.failedSend1hRatePause).toBe(0.25);
  });

  it("failedSend1hMinAttempts is 4", () => {
    expect(DEFAULT_THRESHOLDS.failedSend1hMinAttempts).toBe(4);
  });

  it("hardBounceRateAlert is 0.05", () => {
    expect(DEFAULT_THRESHOLDS.hardBounceRateAlert).toBe(0.05);
  });

  it("hardBounceMinSends is 20", () => {
    expect(DEFAULT_THRESHOLDS.hardBounceMinSends).toBe(20);
  });

  it("optouts7dAlert is 3", () => {
    expect(DEFAULT_THRESHOLDS.optouts7dAlert).toBe(3);
  });

  it("stuckLeadsAlert is 3", () => {
    expect(DEFAULT_THRESHOLDS.stuckLeadsAlert).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// complaints_24h rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: complaints_24h", () => {
  it("2 complaints in 24 h -> shouldPause true, breach rule 'complaints_24h'", () => {
    const h = makeHealth({ complaints24h: 2 });
    const v = evaluateGuardrails(h);
    expect(v.shouldPause).toBe(true);
    const breach = v.breaches.find((b) => b.rule === "complaints_24h");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("pause");
  });

  it("1 complaint in 24 h -> no pause from complaints_24h", () => {
    const h = makeHealth({ complaints24h: 1 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "complaints_24h");
    expect(breach).toBeUndefined();
    expect(v.shouldPause).toBe(false);
  });

  it("0 complaints in 24 h -> no breach", () => {
    const h = makeHealth({ complaints24h: 0 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "complaints_24h")).toBeUndefined();
  });

  it("3 complaints in 24 h (above threshold) -> still triggers pause", () => {
    const h = makeHealth({ complaints24h: 3 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "complaints_24h");
    expect(breach).toBeDefined();
    expect(v.shouldPause).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// complaints_7d rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: complaints_7d", () => {
  it("3 complaints in 7 d -> shouldPause true, breach rule 'complaints_7d'", () => {
    const h = makeHealth({ complaints7d: 3 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "complaints_7d");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("pause");
    expect(v.shouldPause).toBe(true);
  });

  it("2 complaints in 7 d -> no complaints_7d breach", () => {
    const h = makeHealth({ complaints7d: 2 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "complaints_7d")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// failed_send_rate_1h rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: failed_send_rate_1h", () => {
  it("sends1h=4, failed1h=2, skipped1h=0 (50% > 25%, >=4 real attempts) -> shouldPause true, rule 'failed_send_rate_1h'", () => {
    const h = makeHealth({ sends1h: 4, failed1h: 2, skipped1h: 0 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "failed_send_rate_1h");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("pause");
    expect(v.shouldPause).toBe(true);
  });

  it("sends1h=3, failed1h=3 (100% failure rate but below min 4 attempts) -> no pause from failed_send_rate_1h", () => {
    const h = makeHealth({ sends1h: 3, failed1h: 3 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "failed_send_rate_1h");
    expect(breach).toBeUndefined();
  });

  it("sends1h=8, skipped1h=5, failed1h=2 (realAttempts=3 < min 4, dilution) -> no pause from failed_send_rate_1h", () => {
    const h = makeHealth({ sends1h: 8, skipped1h: 5, failed1h: 2 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "failed_send_rate_1h");
    expect(breach).toBeUndefined();
  });

  it("sends1h=6, skipped1h=0, failed1h=2 (realAttempts=6, 33% > 25%) -> pause", () => {
    const h = makeHealth({ sends1h: 6, skipped1h: 0, failed1h: 2 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "failed_send_rate_1h");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("pause");
    expect(v.shouldPause).toBe(true);
  });

  it("sends1h=4, failed1h=1 (25% = threshold, NOT strictly greater) -> no breach", () => {
    const h = makeHealth({ sends1h: 4, failed1h: 1 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "failed_send_rate_1h")).toBeUndefined();
  });

  it("sends1h=0, failed1h=0 -> no breach (no division by zero)", () => {
    const h = makeHealth({ sends1h: 0, failed1h: 0 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "failed_send_rate_1h")).toBeUndefined();
  });

  it("sends1h=8, failed1h=3 (37.5% > 25%, >=4 attempts) -> pause", () => {
    const h = makeHealth({ sends1h: 8, failed1h: 3 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "failed_send_rate_1h")).toBeDefined();
    expect(v.shouldPause).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// hard_bounce_rate rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: hard_bounce_rate", () => {
  it("sent24h=20, bounces24h=2 (10% > 5%) -> ALERT 'hard_bounce_rate', NOT pause", () => {
    const h = makeHealth({ sent24h: 20, bounces24h: 2 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "hard_bounce_rate");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("alert");
    // hard_bounce_rate is alert-only: should not cause pause on its own
    const pauseBreaches = v.breaches.filter((b) => b.severity === "pause");
    expect(pauseBreaches.length).toBe(0);
    expect(v.shouldPause).toBe(false);
  });

  it("sent24h=10, bounces24h=5 (below min sent 20) -> no bounce breach", () => {
    const h = makeHealth({ sent24h: 10, bounces24h: 5 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "hard_bounce_rate")).toBeUndefined();
  });

  it("sent24h=20, bounces24h=1 (5% = threshold, NOT strictly greater) -> no breach", () => {
    const h = makeHealth({ sent24h: 20, bounces24h: 1 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "hard_bounce_rate")).toBeUndefined();
  });

  it("sent24h=100, bounces24h=10 (10% > 5%, well above min) -> ALERT", () => {
    const h = makeHealth({ sent24h: 100, bounces24h: 10 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "hard_bounce_rate");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("alert");
  });
});

// ---------------------------------------------------------------------------
// optouts_7d rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: optouts_7d", () => {
  it("optouts7d=3 -> ALERT 'optouts_7d', not pause", () => {
    const h = makeHealth({ optouts7d: 3 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "optouts_7d");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("alert");
    expect(v.shouldPause).toBe(false);
  });

  it("optouts7d=2 -> no optouts_7d breach", () => {
    const h = makeHealth({ optouts7d: 2 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "optouts_7d")).toBeUndefined();
  });

  it("optouts7d=10 -> ALERT", () => {
    const h = makeHealth({ optouts7d: 10 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "optouts_7d")).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// stuck_leads rule
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: stuck_leads", () => {
  it("stuckLeads=3 -> ALERT 'stuck_leads', not pause", () => {
    const h = makeHealth({ stuckLeads: 3 });
    const v = evaluateGuardrails(h);
    const breach = v.breaches.find((b) => b.rule === "stuck_leads");
    expect(breach).toBeDefined();
    expect(breach!.severity).toBe("alert");
    expect(v.shouldPause).toBe(false);
  });

  it("stuckLeads=2 -> no stuck_leads breach", () => {
    const h = makeHealth({ stuckLeads: 2 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "stuck_leads")).toBeUndefined();
  });

  it("stuckLeads=5 -> ALERT", () => {
    const h = makeHealth({ stuckLeads: 5 });
    const v = evaluateGuardrails(h);
    expect(v.breaches.find((b) => b.rule === "stuck_leads")).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// All-clean health
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: clean health", () => {
  it("all-zero health -> breaches empty, shouldPause false, pauseReason null", () => {
    const h = makeHealth();
    const v = evaluateGuardrails(h);
    expect(v.breaches).toHaveLength(0);
    expect(v.shouldPause).toBe(false);
    expect(v.pauseReason).toBeNull();
  });

  it("health just below every threshold -> no breaches", () => {
    const h = makeHealth({
      complaints24h: 1,
      complaints7d: 2,
      sends1h: 3,
      failed1h: 3,
      sends24h: 19,
      bounces24h: 5,
      optouts7d: 2,
      stuckLeads: 2,
    });
    const v = evaluateGuardrails(h);
    expect(v.breaches).toHaveLength(0);
    expect(v.shouldPause).toBe(false);
    expect(v.pauseReason).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// pauseReason invariant: non-null exactly when shouldPause is true
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: pauseReason invariant", () => {
  it("pauseReason is null when shouldPause is false (clean health)", () => {
    const v = evaluateGuardrails(makeHealth());
    expect(v.shouldPause).toBe(false);
    expect(v.pauseReason).toBeNull();
  });

  it("pauseReason is a non-empty string when shouldPause is true (complaints_24h)", () => {
    const v = evaluateGuardrails(makeHealth({ complaints24h: 2 }));
    expect(v.shouldPause).toBe(true);
    expect(typeof v.pauseReason).toBe("string");
    expect((v.pauseReason as string).length).toBeGreaterThan(0);
  });

  it("pauseReason is non-empty when shouldPause is true (failed_send_rate_1h)", () => {
    const v = evaluateGuardrails(makeHealth({ sends1h: 4, failed1h: 2 }));
    expect(v.shouldPause).toBe(true);
    expect(v.pauseReason).toBeTruthy();
  });

  it("pauseReason includes all pause-breach details when multiple pause rules fire", () => {
    const v = evaluateGuardrails(
      makeHealth({ complaints24h: 2, complaints7d: 3, sends1h: 4, failed1h: 2 }),
    );
    expect(v.shouldPause).toBe(true);
    // All three pause-rule details should appear in pauseReason (joined by "; ")
    expect(v.pauseReason).toContain("complaint");
    expect(v.pauseReason).toContain("failed");
  });

  it("alert-only breaches do not set shouldPause (optouts+stuck+bounce)", () => {
    const v = evaluateGuardrails(
      makeHealth({
        optouts7d: 3,
        stuckLeads: 3,
        sent24h: 20,
        bounces24h: 2,
      }),
    );
    expect(v.breaches.length).toBeGreaterThan(0);
    expect(v.shouldPause).toBe(false);
    expect(v.pauseReason).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Custom thresholds override
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: custom thresholds override", () => {
  const strict: GuardrailThresholds = {
    ...DEFAULT_THRESHOLDS,
    complaints24hPause: 1, // stricter: pause on 1 complaint
  };

  it("1 complaint triggers pause when threshold is 1", () => {
    const v = evaluateGuardrails(makeHealth({ complaints24h: 1 }), strict);
    const breach = v.breaches.find((b) => b.rule === "complaints_24h");
    expect(breach).toBeDefined();
    expect(v.shouldPause).toBe(true);
  });

  it("1 complaint does NOT trigger pause with DEFAULT_THRESHOLDS (threshold=2)", () => {
    const v = evaluateGuardrails(makeHealth({ complaints24h: 1 }));
    expect(v.shouldPause).toBe(false);
  });

  it("custom minAttempts of 10 suppresses failed_send_rate_1h breach for 4 sends", () => {
    const loose: GuardrailThresholds = {
      ...DEFAULT_THRESHOLDS,
      failedSend1hMinAttempts: 10,
    };
    const v = evaluateGuardrails(makeHealth({ sends1h: 4, failed1h: 2 }), loose);
    expect(v.breaches.find((b) => b.rule === "failed_send_rate_1h")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Breach detail strings: no em-dash or en-dash
// ---------------------------------------------------------------------------

describe("evaluateGuardrails: copy hygiene in breach details", () => {
  it("breach detail strings contain no em-dash (U+2014) or en-dash (U+2013)", () => {
    const h = makeHealth({
      complaints24h: 2,
      complaints7d: 3,
      sends1h: 4,
      failed1h: 2,
      sent24h: 20,
      bounces24h: 2,
      optouts7d: 3,
      stuckLeads: 3,
    });
    const v = evaluateGuardrails(h);
    expect(v.breaches.length).toBeGreaterThan(0);
    for (const b of v.breaches) {
      expect(b.detail).not.toMatch(/[—–]/);
    }
    if (v.pauseReason) {
      expect(v.pauseReason).not.toMatch(/[—–]/);
    }
  });
});
