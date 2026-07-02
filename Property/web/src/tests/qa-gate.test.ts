/**
 * Exhaustive tests for the AI content QA gate.
 * Covers every failure code, adversarial fixtures, accumulation of multiple
 * failures, and passing fixtures shaped like real sequence copy.
 */

import { describe, it, expect } from "vitest";
import { qaGateMessage } from "@/lib/ai/qa-gate";
import type { QaInput, QaOptions } from "@/lib/ai/qa-gate";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const SITE = "https://www.propertytaxpartners.co.uk";
const OPTS: QaOptions = { siteUrl: SITE };

/** Minimal valid email that satisfies every rule. */
const GOOD_EMAIL: QaInput = {
  subject: "Your property tax call slot is ready",
  paragraphs: [
    "Hi {{firstName}}, thank you for getting in touch with Property Tax Partners.",
    "Our team has reviewed your query and is ready to speak with you.",
    "Please book a convenient time here: {{bookingUrl}}",
  ],
};

/** Minimal valid SMS that satisfies every rule. */
const GOOD_SMS: QaInput = {
  body: "Hi {{firstName}}, it's Property Tax Partners. Book here: {{bookingUrl}} Reply STOP to opt out.",
};

function failures(result: ReturnType<typeof qaGateMessage>): string[] {
  return result.ok ? [] : result.failures;
}

// ---------------------------------------------------------------------------
// Passing fixtures
// ---------------------------------------------------------------------------

describe("passing fixtures", () => {
  it("accepts a well-formed email", () => {
    expect(qaGateMessage("email", GOOD_EMAIL, OPTS)).toEqual({ ok: true });
  });

  it("accepts a well-formed SMS", () => {
    expect(qaGateMessage("sms", GOOD_SMS, OPTS)).toEqual({ ok: true });
  });

  it("accepts a brief with no booking CTA required by default", () => {
    const input: QaInput = {
      body: "Section 24 restricts finance cost relief for residential landlords in England and Wales. Portfolio restructuring may improve the position over multiple tax years.",
    };
    expect(qaGateMessage("brief", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts a chat message with no booking CTA required by default", () => {
    const input: QaInput = {
      body: "The capital gains tax annual allowance for individuals is currently set by statute and reviewed each April.",
    };
    expect(qaGateMessage("chat", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts a booking URL in place of {{bookingUrl}} placeholder in email", () => {
    const input: QaInput = {
      subject: "Ready to book",
      paragraphs: [
        `Book here: ${SITE}/book/session`,
        "Hi {{firstName}}.",
      ],
    };
    expect(qaGateMessage("email", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts an SMS with a literal booking URL instead of placeholder", () => {
    const input: QaInput = {
      body: `Book: ${SITE}/book/intro Reply STOP to opt out.`,
    };
    expect(qaGateMessage("sms", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts email with requireBookingCta explicitly false", () => {
    const input: QaInput = {
      subject: "Quick update",
      paragraphs: ["No booking link needed in this message."],
    };
    expect(
      qaGateMessage("email", input, { ...OPTS, requireBookingCta: false }),
    ).toEqual({ ok: true });
  });

  it("accepts allowlisted /tools URL", () => {
    const input: QaInput = {
      subject: "Try our calculator",
      paragraphs: [
        `Use the SDLT tool: ${SITE}/tools/sdlt {{bookingUrl}}`,
      ],
    };
    expect(qaGateMessage("email", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts allowlisted /calculators URL", () => {
    const input: QaInput = {
      body: `Try this: ${SITE}/calculators/sdlt Reply STOP to opt out. {{bookingUrl}}`,
    };
    expect(qaGateMessage("sms", input, OPTS)).toEqual({ ok: true });
  });

  it("accepts allowlisted /research URL", () => {
    const input: QaInput = {
      body: `Read the index: ${SITE}/research/landlord-tax-index Reply STOP to opt out. {{bookingUrl}}`,
    };
    expect(qaGateMessage("sms", input, OPTS)).toEqual({ ok: true });
  });

  it("allows plain numbers (hours, minutes) without triggering banned:figures", () => {
    const input: QaInput = {
      subject: "Appointment confirmed",
      paragraphs: [
        "Your call is in 24 hours. It will last around 20 minutes. {{bookingUrl}}",
      ],
    };
    expect(qaGateMessage("email", input, OPTS)).toEqual({ ok: true });
  });

  it("does not flag British spellings (colour, organise, behaviour)", () => {
    const input: QaInput = {
      body: "Please organise your colour-coded files and review your behaviour log. Reply STOP to opt out. {{bookingUrl}}",
    };
    expect(qaGateMessage("sms", input, OPTS)).toEqual({ ok: true });
  });
});

// ---------------------------------------------------------------------------
// Rule 1: em_dash
// ---------------------------------------------------------------------------

describe("em_dash", () => {
  it("flags an em-dash (U+2014) in an email paragraph", () => {
    const input: QaInput = {
      ...GOOD_EMAIL,
      paragraphs: ["Call us today — we are ready. {{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("em_dash");
  });

  it("flags an en-dash (U+2013) in an SMS body", () => {
    const input: QaInput = {
      body: "Hi – book here: {{bookingUrl}} Reply STOP to opt out.",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain("em_dash");
  });

  it("flags an en-dash in the email subject", () => {
    const input: QaInput = {
      ...GOOD_EMAIL,
      subject: "Your slot – ready now",
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("em_dash");
  });
});

// ---------------------------------------------------------------------------
// Rule 2: subject_too_long
// ---------------------------------------------------------------------------

describe("subject_too_long", () => {
  it("accepts a 78-char subject", () => {
    const input: QaInput = {
      ...GOOD_EMAIL,
      subject: "a".repeat(78),
    };
    expect(failures(qaGateMessage("email", input, OPTS))).not.toContain(
      "subject_too_long",
    );
  });

  it("flags a 79-char subject", () => {
    const input: QaInput = {
      ...GOOD_EMAIL,
      subject: "a".repeat(79),
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      "subject_too_long",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 2: sms_too_long
// ---------------------------------------------------------------------------

describe("sms_too_long", () => {
  it("accepts a 320-char SMS body", () => {
    const base = "Hi {{firstName}} Reply STOP. {{bookingUrl}} ";
    const body = base + "x".repeat(320 - base.length);
    expect(failures(qaGateMessage("sms", { body }, OPTS))).not.toContain(
      "sms_too_long",
    );
  });

  it("flags a 321-char SMS body", () => {
    const body = "x".repeat(321);
    expect(failures(qaGateMessage("sms", { body }, OPTS))).toContain(
      "sms_too_long",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 2: too_many_paragraphs
// ---------------------------------------------------------------------------

describe("too_many_paragraphs", () => {
  it("accepts exactly 5 paragraphs", () => {
    const input: QaInput = {
      subject: "Five paras",
      paragraphs: [
        "Para one {{bookingUrl}}",
        "Para two.",
        "Para three.",
        "Para four.",
        "Para five.",
      ],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).not.toContain(
      "too_many_paragraphs",
    );
  });

  it("flags 6 paragraphs", () => {
    const input: QaInput = {
      subject: "Six paras",
      paragraphs: [
        "Para one {{bookingUrl}}",
        "Para two.",
        "Para three.",
        "Para four.",
        "Para five.",
        "Para six.",
      ],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      "too_many_paragraphs",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 2: paragraph_too_long
// ---------------------------------------------------------------------------

describe("paragraph_too_long", () => {
  it("accepts a paragraph of exactly 500 chars", () => {
    const input: QaInput = {
      subject: "Para length",
      paragraphs: ["a".repeat(500) + " {{bookingUrl}}"],
    };
    // Note: the paragraph itself is 500 + " {{bookingUrl}}" chars (>500), so
    // test a paragraph that is exactly 500:
    const input500: QaInput = {
      subject: "Para length",
      paragraphs: ["a".repeat(498) + " X", "{{bookingUrl}}"],
    };
    expect(
      failures(qaGateMessage("email", input500, OPTS)),
    ).not.toContain("paragraph_too_long");
  });

  it("flags a paragraph of 501 chars", () => {
    const input: QaInput = {
      subject: "Para length",
      paragraphs: ["a".repeat(501), "{{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      "paragraph_too_long",
    );
  });

  it("reports paragraph_too_long only once even if multiple paragraphs exceed the cap", () => {
    const input: QaInput = {
      subject: "Two long paras",
      paragraphs: ["a".repeat(501), "b".repeat(501), "{{bookingUrl}}"],
    };
    const f = failures(qaGateMessage("email", input, OPTS));
    expect(f.filter((c) => c === "paragraph_too_long").length).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Rule 2: body_too_long
// ---------------------------------------------------------------------------

describe("body_too_long", () => {
  it("flags a chat body of 501 chars", () => {
    const input: QaInput = { body: "a".repeat(501) };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "body_too_long",
    );
  });

  it("accepts a chat body of 500 chars", () => {
    const input: QaInput = { body: "a".repeat(500) };
    expect(failures(qaGateMessage("chat", input, OPTS))).not.toContain(
      "body_too_long",
    );
  });

  it("flags a brief body of 1201 chars", () => {
    const input: QaInput = { body: "a".repeat(1201) };
    expect(failures(qaGateMessage("brief", input, OPTS))).toContain(
      "body_too_long",
    );
  });

  it("accepts a brief body of 1200 chars", () => {
    const input: QaInput = { body: "a".repeat(1200) };
    expect(failures(qaGateMessage("brief", input, OPTS))).not.toContain(
      "body_too_long",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 2: empty
// ---------------------------------------------------------------------------

describe("empty", () => {
  it("flags email with no subject", () => {
    const input: QaInput = {
      paragraphs: ["Hello {{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("empty");
  });

  it("flags email with blank subject", () => {
    const input: QaInput = {
      subject: "   ",
      paragraphs: ["Hello {{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("empty");
  });

  it("flags email with no paragraphs", () => {
    const input: QaInput = { subject: "Hi there" };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("empty");
  });

  it("flags email with empty paragraphs array", () => {
    const input: QaInput = { subject: "Hi there", paragraphs: [] };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("empty");
  });

  it("flags email where all paragraphs are whitespace-only", () => {
    const input: QaInput = {
      subject: "Hi there",
      paragraphs: ["   ", "\t", ""],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain("empty");
  });

  it("flags SMS with missing body", () => {
    expect(failures(qaGateMessage("sms", {}, OPTS))).toContain("empty");
  });

  it("flags SMS with whitespace-only body", () => {
    const input: QaInput = { body: "   " };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain("empty");
  });

  it("flags chat with blank body", () => {
    expect(failures(qaGateMessage("chat", { body: "" }, OPTS))).toContain(
      "empty",
    );
  });

  it("flags brief with blank body", () => {
    expect(failures(qaGateMessage("brief", { body: "" }, OPTS))).toContain(
      "empty",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 3: banned:advice
// ---------------------------------------------------------------------------

describe("banned:advice", () => {
  const advicePhrases = [
    "you should review your position",
    "we recommend speaking to a specialist",
    "you must file before the deadline",
    "you need to submit this form",
    "we advise caution",
    "our advice is to wait",
    "make sure you keep records",
    "you ought to consider this",
  ];

  for (const phrase of advicePhrases) {
    it(`flags "${phrase}"`, () => {
      const input: QaInput = { body: phrase };
      expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
        "banned:advice",
      );
    });
  }

  it("flags advice phrase case-insensitively (YOU SHOULD)", () => {
    const input: QaInput = { body: "YOU SHOULD check this." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:advice",
    );
  });

  it("does not flag 'you should' when only 'should' appears without 'you'", () => {
    const input: QaInput = { body: "This should help." };
    expect(failures(qaGateMessage("chat", input, OPTS))).not.toContain(
      "banned:advice",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 3: banned:figures
// ---------------------------------------------------------------------------

describe("banned:figures", () => {
  it("flags £5,000 (pound + digit)", () => {
    const input: QaInput = { body: "Save up to £5,000 in tax." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:figures",
    );
  });

  it("flags £50 (pound immediately followed by digit)", () => {
    const input: QaInput = { body: "A saving of £50." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:figures",
    );
  });

  it("flags 40% (digit + percent sign)", () => {
    const input: QaInput = { body: "A reduction of 40% may apply." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:figures",
    );
  });

  it("flags '20 per cent' (digit + per cent)", () => {
    const input: QaInput = { body: "Relief of 20 per cent applies." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:figures",
    );
  });

  it("does not flag '24 hours' or '20 minutes'", () => {
    const input: QaInput = { body: "A call takes 24 hours to confirm, lasting 20 minutes." };
    expect(failures(qaGateMessage("chat", input, OPTS))).not.toContain(
      "banned:figures",
    );
  });

  it("does not flag '£' without an immediately following digit", () => {
    const input: QaInput = { body: "Costs are quoted in £ and vary." };
    expect(failures(qaGateMessage("chat", input, OPTS))).not.toContain(
      "banned:figures",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 3: banned:credentials
// ---------------------------------------------------------------------------

describe("banned:credentials", () => {
  const credentialPhrases = [
    "our chartered accountants will help",
    "as an ICAEW member",
    "ACCA qualified team",
    "ACA designation",
    "CTA adviser",
    "regulated by the FCA",
    "a qualified accountant will review",
    "MLR-supervised firm",
  ];

  for (const phrase of credentialPhrases) {
    it(`flags "${phrase}"`, () => {
      const input: QaInput = { body: phrase };
      expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
        "banned:credentials",
      );
    });
  }
});

// ---------------------------------------------------------------------------
// Rule 3: banned:glass_wall
// ---------------------------------------------------------------------------

describe("banned:glass_wall", () => {
  const glassPhrases = [
    "we saw you were interested",
    "we noticed your visit",
    "you visited our calculators",
    "you viewed the SDLT page",
    "you read our landlord guide",
    "you returned to our site",
    "your visits to the property section",
    "you have been looking at our content",
    "you've been looking at the tools",
    "you browsed the research section",
  ];

  for (const phrase of glassPhrases) {
    it(`flags "${phrase}"`, () => {
      const input: QaInput = { body: phrase };
      expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
        "banned:glass_wall",
      );
    });
  }
});

// ---------------------------------------------------------------------------
// Rule 3: banned:guarantee
// ---------------------------------------------------------------------------

describe("banned:guarantee", () => {
  it("flags 'guarantee'", () => {
    const input: QaInput = { body: "We guarantee savings." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:guarantee",
    );
  });

  it("flags 'you will save'", () => {
    const input: QaInput = { body: "You will save money." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:guarantee",
    );
  });

  it("flags 'risk-free'", () => {
    const input: QaInput = { body: "This is a risk-free consultation." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:guarantee",
    );
  });

  it("flags 'no risk'", () => {
    const input: QaInput = { body: "There is no risk involved." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:guarantee",
    );
  });

  it("flags 'certain to'", () => {
    const input: QaInput = { body: "You are certain to benefit." };
    expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
      "banned:guarantee",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 3: banned:hmrc_attribution
// ---------------------------------------------------------------------------

describe("banned:hmrc_attribution", () => {
  const phrases = [
    "HMRC says landlords must register",
    "HMRC confirmed the deadline",
    "HMRC has confirmed the policy",
    "According to HMRC the rate is fixed",
  ];

  for (const phrase of phrases) {
    it(`flags "${phrase}"`, () => {
      const input: QaInput = { body: phrase };
      expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
        "banned:hmrc_attribution",
      );
    });
  }
});

// ---------------------------------------------------------------------------
// Rule 4: us_spelling
// ---------------------------------------------------------------------------

describe("us_spelling", () => {
  const cases: Array<[string, string]> = [
    ["We will organize your records.", "us_spelling:organize"],
    ["The system is organized.", "us_spelling:organized"],
    ["The firm organizes events.", "us_spelling:organizes"],
    ["We are organizing files.", "us_spelling:organizing"],
    ["We will optimize the process.", "us_spelling:optimize"],
    ["Please analyze the results.", "us_spelling:analyze"],
    ["The preferred color is blue.", "us_spelling:color"],
    ["Multiple colors available.", "us_spelling:colors"],
    ["We favor the simpler approach.", "us_spelling:favor"],
    ["User behavior data.", "us_spelling:behavior"],
    ["The center of the issue.", "us_spelling:center"],
  ];

  for (const [text, expectedCode] of cases) {
    it(`flags "${text}" as "${expectedCode}"`, () => {
      const input: QaInput = { body: text };
      expect(failures(qaGateMessage("chat", input, OPTS))).toContain(
        expectedCode,
      );
    });
  }

  it("does not flag British spellings organise/optimise/analyse", () => {
    const input: QaInput = {
      body: "Please organise, optimise, and analyse the portfolio.",
    };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f.some((c) => c.startsWith("us_spelling:"))).toBe(false);
  });

  it("does not flag 'discolor' (us_spelling word boundary prevents mid-word match)", () => {
    // "discolor" does contain "color" but \bcolor\b requires a word boundary
    // before "c". In "discolor" the "c" is preceded by "s" (word char), so
    // no boundary fires. This test guards against a false positive.
    const input: QaInput = { body: "discolor discolors" };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f.some((c) => c.startsWith("us_spelling:"))).toBe(false);
  });

  it("does not flag 'favourite' or 'favour' (British spellings)", () => {
    const input: QaInput = { body: "My favourite and favourable option." };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f.some((c) => c.startsWith("us_spelling:"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Rule 5: unknown_placeholder
// ---------------------------------------------------------------------------

describe("unknown_placeholder", () => {
  it("flags {{leadId}} as unknown", () => {
    const input: QaInput = {
      body: "Your lead ID is {{leadId}}. Reply STOP. {{bookingUrl}}",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "unknown_placeholder:leadId",
    );
  });

  it("flags {{siteName}} as unknown", () => {
    const input: QaInput = { body: "From {{siteName}}. Reply STOP. {{bookingUrl}}" };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "unknown_placeholder:siteName",
    );
  });

  it("does not flag allowed placeholders", () => {
    const allowed = [
      "{{firstName}}",
      "{{bookingUrl}}",
      "{{confirmUrl}}",
      "{{calculatorUrl}}",
      "{{calculatorName}}",
      "{{windowLabel}}",
    ];
    const input: QaInput = {
      body: `${allowed.join(" ")} Reply STOP.`,
    };
    const f = failures(qaGateMessage("sms", input, OPTS));
    expect(f.some((c) => c.startsWith("unknown_placeholder:"))).toBe(false);
  });

  it("reports each unique unknown placeholder name once", () => {
    const input: QaInput = {
      body: "{{leadId}} and {{leadId}} and {{agentName}}. Reply STOP. {{bookingUrl}}",
    };
    const f = failures(qaGateMessage("sms", input, OPTS));
    expect(f.filter((c) => c === "unknown_placeholder:leadId").length).toBe(1);
    expect(f).toContain("unknown_placeholder:agentName");
  });
});

// ---------------------------------------------------------------------------
// Rule 6: missing_booking_cta
// ---------------------------------------------------------------------------

describe("missing_booking_cta", () => {
  it("flags email missing {{bookingUrl}} and any booking URL", () => {
    const input: QaInput = {
      subject: "Check in",
      paragraphs: ["Hi {{firstName}}, just a quick update."],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      "missing_booking_cta",
    );
  });

  it("flags SMS missing {{bookingUrl}} and any booking URL", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, it's Property Tax Partners. Reply STOP to opt out.",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "missing_booking_cta",
    );
  });

  it("does not flag brief (default requireBookingCta is false)", () => {
    const input: QaInput = { body: "No booking link here." };
    expect(failures(qaGateMessage("brief", input, OPTS))).not.toContain(
      "missing_booking_cta",
    );
  });

  it("does not flag chat (default requireBookingCta is false)", () => {
    const input: QaInput = { body: "No booking link here." };
    expect(failures(qaGateMessage("chat", input, OPTS))).not.toContain(
      "missing_booking_cta",
    );
  });

  it("does not flag when requireBookingCta is explicitly false for email", () => {
    const input: QaInput = {
      subject: "Update",
      paragraphs: ["Just an update, no booking needed."],
    };
    expect(
      failures(qaGateMessage("email", input, { ...OPTS, requireBookingCta: false })),
    ).not.toContain("missing_booking_cta");
  });

  it("flags brief when requireBookingCta is explicitly true", () => {
    const input: QaInput = { body: "No link here." };
    expect(
      failures(qaGateMessage("brief", input, { ...OPTS, requireBookingCta: true })),
    ).toContain("missing_booking_cta");
  });
});

// ---------------------------------------------------------------------------
// Rule 7: sms_missing_optout
// ---------------------------------------------------------------------------

describe("sms_missing_optout", () => {
  it("flags SMS without STOP", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, book here: {{bookingUrl}}",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "sms_missing_optout",
    );
  });

  it("flags SMS where STOP appears in lowercase only", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, book: {{bookingUrl}} Reply stop to opt out.",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "sms_missing_optout",
    );
  });

  it("flags SMS where STOP appears in mixed case (Stop)", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, book: {{bookingUrl}} Reply Stop to opt out.",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).toContain(
      "sms_missing_optout",
    );
  });

  it("does not flag SMS that contains the uppercase word STOP", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, book: {{bookingUrl}} Reply STOP to opt out.",
    };
    expect(failures(qaGateMessage("sms", input, OPTS))).not.toContain(
      "sms_missing_optout",
    );
  });

  it("does not apply sms_missing_optout to email", () => {
    const input: QaInput = {
      subject: "No stop word",
      paragraphs: ["{{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).not.toContain(
      "sms_missing_optout",
    );
  });
});

// ---------------------------------------------------------------------------
// Rule 8: url_not_allowlisted
// ---------------------------------------------------------------------------

describe("url_not_allowlisted", () => {
  it("flags a foreign domain URL", () => {
    const input: QaInput = {
      subject: "Check this",
      paragraphs: ["See: https://www.example.com/offer {{bookingUrl}}"],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      "url_not_allowlisted:https://www.example.com/offer",
    );
  });

  it("flags a siteUrl URL with a path that is not allowlisted", () => {
    const input: QaInput = {
      subject: "Unallowed path",
      paragraphs: [`Link: ${SITE}/about-us {{bookingUrl}}`],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      `url_not_allowlisted:${SITE}/about-us`,
    );
  });

  it("flags the siteUrl origin with no path", () => {
    const input: QaInput = {
      subject: "Home link",
      paragraphs: [`Visit: ${SITE} {{bookingUrl}}`],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).toContain(
      `url_not_allowlisted:${SITE}`,
    );
  });

  it("does not flag an allowlisted /api/leads/confirm URL", () => {
    const url = `${SITE}/api/leads/confirm/abc123`;
    const input: QaInput = {
      subject: "Confirm",
      paragraphs: [`Confirm here: ${url} {{bookingUrl}}`],
    };
    expect(failures(qaGateMessage("email", input, OPTS))).not.toContain(
      `url_not_allowlisted:${url}`,
    );
  });

  it("reports each unique flagged URL once", () => {
    const badUrl = "https://www.bad.com/page";
    const input: QaInput = {
      subject: "Repeated",
      paragraphs: [`${badUrl} and ${badUrl} {{bookingUrl}}`],
    };
    const f = failures(qaGateMessage("email", input, OPTS));
    expect(
      f.filter((c) => c === `url_not_allowlisted:${badUrl}`).length,
    ).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Multiple failures accumulate (never short-circuits)
// ---------------------------------------------------------------------------

describe("multiple failures accumulate", () => {
  it("accumulates em_dash + banned:advice + banned:figures", () => {
    const input: QaInput = {
      body: "You should save £5,000 — it is guaranteed.",
    };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f).toContain("em_dash");
    expect(f).toContain("banned:advice");
    expect(f).toContain("banned:figures");
    expect(f).toContain("banned:guarantee");
  });

  it("accumulates sms_missing_optout + missing_booking_cta + sms_too_long", () => {
    // No STOP, no booking CTA, body > 320 chars
    const body = "This is a plain message with no stop word and no booking link. " + "x".repeat(260);
    const input: QaInput = { body };
    const f = failures(qaGateMessage("sms", input, OPTS));
    expect(f).toContain("sms_missing_optout");
    expect(f).toContain("missing_booking_cta");
    expect(f).toContain("sms_too_long");
  });

  it("accumulates unknown_placeholder + banned:credentials + us_spelling", () => {
    const input: QaInput = {
      body: "Dear {{clientRef}}, our chartered team will organize your records.",
    };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f).toContain("unknown_placeholder:clientRef");
    expect(f).toContain("banned:credentials");
    expect(f).toContain("us_spelling:organize");
  });

  it("accumulates subject_too_long + too_many_paragraphs for a malformed email", () => {
    const input: QaInput = {
      subject: "s".repeat(79),
      paragraphs: ["p1 {{bookingUrl}}", "p2", "p3", "p4", "p5", "p6"],
    };
    const f = failures(qaGateMessage("email", input, OPTS));
    expect(f).toContain("subject_too_long");
    expect(f).toContain("too_many_paragraphs");
  });

  it("accumulates glass_wall + hmrc_attribution", () => {
    const input: QaInput = {
      body: "We noticed your interest. HMRC confirmed the deadline.",
    };
    const f = failures(qaGateMessage("chat", input, OPTS));
    expect(f).toContain("banned:glass_wall");
    expect(f).toContain("banned:hmrc_attribution");
  });
});

// ---------------------------------------------------------------------------
// Real-copy passing fixtures
// ---------------------------------------------------------------------------

describe("real sequence copy passing fixtures", () => {
  it("passes a multi-paragraph email confirmation", () => {
    const input: QaInput = {
      subject: "We have received your property tax enquiry",
      paragraphs: [
        "Hi {{firstName}}, thank you for reaching out to Property Tax Partners.",
        "One of our property tax specialists will review your situation and be in touch within two working days.",
        "In the meantime, you can book a free introductory call at a time that suits you: {{bookingUrl}}",
        "If you have questions before then, please reply to this message.",
      ],
    };
    expect(qaGateMessage("email", input, OPTS)).toEqual({ ok: true });
  });

  it("passes a follow-up SMS with all required elements", () => {
    const input: QaInput = {
      body: "Hi {{firstName}}, it's Property Tax Partners. Still happy to talk through your property tax position. Book a call: {{bookingUrl}} Reply STOP to opt out.",
    };
    expect(qaGateMessage("sms", input, OPTS)).toEqual({ ok: true });
  });

  it("passes a brief with an allowlisted calculator URL", () => {
    const input: QaInput = {
      body: `A landlord with a standard buy-to-let property who has not incorporated may benefit from running an incorporation comparison via ${SITE}/calculators/incorporation. The position turns on mortgage interest relief and profit extraction costs.`,
    };
    expect(qaGateMessage("brief", input, OPTS)).toEqual({ ok: true });
  });

  it("passes a chat reply that mentions {{windowLabel}} and {{calculatorName}}", () => {
    const input: QaInput = {
      body: "Based on what you have shared, the {{calculatorName}} tool may be helpful. We have left the {{windowLabel}} open for you.",
    };
    expect(qaGateMessage("chat", input, OPTS)).toEqual({ ok: true });
  });

  it("passes an email confirmation using {{confirmUrl}}", () => {
    const input: QaInput = {
      subject: "Please confirm your booking",
      paragraphs: [
        "Hi {{firstName}}, please confirm your appointment by clicking the link below.",
        "Confirm here: {{confirmUrl}}",
        "If you did not request this, please ignore this message.",
        "You can also book a different slot: {{bookingUrl}}",
      ],
    };
    expect(qaGateMessage("email", input, OPTS)).toEqual({ ok: true });
  });
});
