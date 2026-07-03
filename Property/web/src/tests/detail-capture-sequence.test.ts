/**
 * Detail-capture sequence golden tests: shape, field-aware copy for every missing
 * combination, graceful nameless rendering (the DEFAULT case for this sequence),
 * CTA points at the /complete link (not the booking link), no em/en dashes.
 *
 * No network, no DB: builds are from static ctx objects.
 */
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));
vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

import {
  buildPropertyLeadNurtureConfig,
  buildPropertyLeadNurtureConfigs,
  LEAD_SEQUENCE_NAMES,
} from "@/config/lead-nurture";
import type { LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

const DETAILS_URL = "https://www.propertytaxpartners.co.uk/complete?t=tokPROFILE";

function ctx(over: Partial<LeadMessageContext>): LeadMessageContext {
  return {
    firstName: "there",
    bookingUrl: "https://www.propertytaxpartners.co.uk/book?t=tokBOOK",
    confirmUrl: "https://www.propertytaxpartners.co.uk/api/leads/confirm/tokC",
    optOutUrl: "https://www.propertytaxpartners.co.uk/api/leads/optout/tokO",
    optOutText: "Reply STOP to opt out.",
    siteUrl: "https://www.propertytaxpartners.co.uk",
    detailsUrl: DETAILS_URL,
    ...over,
  };
}

const BOTH = ctx({ firstName: "there", missingFields: ["name", "phone"], missingPhrase: "your name and a phone number", contactUnasked: true });
const PHONE = ctx({ firstName: "Alex", missingFields: ["phone"], missingPhrase: "a phone number we can reach you on", contactUnasked: false });
const NAME = ctx({ firstName: "there", missingFields: ["name"], missingPhrase: "your name", contactUnasked: true });
const VARIANTS: Array<[string, LeadMessageContext]> = [
  ["both", BOTH],
  ["phone", PHONE],
  ["name", NAME],
];

const config = buildPropertyLeadNurtureConfig("detail_capture");
const { steps } = config;

describe("detail-capture sequence shape", () => {
  it("is the property_detail_capture sequence", () => {
    expect(config.sequenceName).toBe(LEAD_SEQUENCE_NAMES.detail_capture);
  });
  it("has the 4 expected steps in order", () => {
    expect(steps.map((s) => s.key)).toEqual([
      "detail_capture_t0",
      "detail_capture_day1",
      "detail_capture_day3",
      "detail_capture_day7",
    ]);
  });
  it("has cumulative delays [0,24,48,168]", () => {
    expect(steps.map((s) => s.delayHours)).toEqual([0, 24, 48, 168]);
  });
  it("is email-only on every step", () => {
    for (const s of steps) expect(s.channels).toEqual(["email"]);
  });
  it("day7 prefers a Monday landing", () => {
    expect(steps[3].preferMonday).toBe(true);
  });
});

describe("buildPropertyLeadNurtureConfigs", () => {
  it("returns both primary sequences, contactability first", () => {
    const configs = buildPropertyLeadNurtureConfigs();
    expect(configs).toHaveLength(2);
    expect(configs[0].sequenceName).toBe(LEAD_SEQUENCE_NAMES.contactability);
    expect(configs[1].sequenceName).toBe(LEAD_SEQUENCE_NAMES.detail_capture);
  });
});

describe("field-aware copy", () => {
  for (const [name, c] of VARIANTS) {
    it(`references the missing phrase and points the CTA at /complete (${name})`, () => {
      for (const step of steps) {
        for (const m of step.buildMessages(c)) {
          const text = [m.subject, m.text].filter(Boolean).join("\n");
          expect(text, `${step.key} mentions the ask`).toContain(c.missingPhrase);
          // CTA is the /complete link, never the booking link.
          expect(m.text, `${step.key} CTA href`).toContain(DETAILS_URL);
          expect(m.text, `${step.key} no booking CTA`).not.toContain("/book?t=");
          // No secondary confirm link on detail-capture emails.
          expect(m.html, `${step.key} no confirm secondary`).not.toContain("confirm here");
        }
      }
    });
  }
});

describe("no em/en dash in copy", () => {
  for (const [name, c] of VARIANTS) {
    it(`clean copy (${name})`, () => {
      for (const step of steps) {
        for (const m of step.buildMessages(c)) {
          const blob = [m.subject, m.html, m.text, m.body].filter(Boolean).join(" ");
          expect(blob, `${step.key}`).not.toContain("—"); // em dash
          expect(blob, `${step.key}`).not.toContain("–"); // en dash
        }
      }
    });
  }
});

describe("graceful nameless rendering (default case)", () => {
  it("degrades to 'Hi there,' with no malformed personalization", () => {
    for (const step of steps) {
      for (const m of step.buildMessages(BOTH)) {
        const text = [m.subject, m.text].filter(Boolean).join("\n");
        expect(text, `${step.key} greeting`).toContain("Hi there,");
        expect(text, `${step.key} no empty greeting`).not.toContain("Hi ,");
        expect(text, `${step.key} no empty token`).not.toContain(", ,");
        expect(text, `${step.key} no double space`).not.toContain("  ");
        expect(text, `${step.key} no literal undefined`).not.toContain("undefined");
        expect(text, `${step.key} no literal null`).not.toContain("null");
      }
    }
  });
});

describe("warm, non-blaming tone", () => {
  it("owns the gap when the capture form did not ask (contactUnasked)", () => {
    // Step 0 opener acknowledges we reached back out, rather than implying the
    // lead withheld details we never requested.
    const step0 = steps[0].buildMessages(BOTH)[0];
    expect(step0.text).toContain("reaching out through our site");
  });

  it("never blames the lead for a field we did not ask for", () => {
    const blaming = ["you did not", "you have not", "you didn't", "you haven't", "you failed", "you forgot"];
    for (const [, c] of VARIANTS) {
      for (const step of steps) {
        for (const m of step.buildMessages(c)) {
          const text = [m.subject, m.text].filter(Boolean).join("\n").toLowerCase();
          for (const phrase of blaming) {
            expect(text, `${step.key} contains blaming phrase "${phrase}"`).not.toContain(phrase);
          }
        }
      }
    }
  });
});

describe("List-Unsubscribe header", () => {
  it("is present on every detail-capture email", () => {
    for (const step of steps) {
      for (const m of step.buildMessages(BOTH)) {
        expect(m.headers?.["List-Unsubscribe"], `${step.key}`).toBeTruthy();
      }
    }
  });
});
