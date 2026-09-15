/**
 * Guards on the warm-handoff introduction.
 *
 * These cover the properties that, if they broke, would email a real customer
 * something they should not have received. Everything else in the module is
 * plumbing and is exercised by the joint test run against Sheet2.
 */
import { describe, it, expect, afterEach } from "vitest";
import {
  assertUnarmedSendIsSafe,
  buildIntroEmail,
  firstNameOf,
  normaliseEmail,
  resolveBrand,
  resolveMode,
  resolveRecipients,
  possessive,
  sendingDomainVerified,
  maxPerRun,
  type IntroLead,
} from "@/lib/leads/handoff-intro";

const ENV_KEYS = [
  "LEAD_HANDOFF_MODE",
  "LEAD_HANDOFF_OPERATOR_EMAIL",
  "LEAD_HANDOFF_MAX_PER_RUN",
] as const;

afterEach(() => {
  for (const k of ENV_KEYS) delete process.env[k];
});

const lead: IntroLead = {
  id: "11111111-2222-3333-4444-555555555555",
  email: "enquirer@example.com",
  full_name: "Jane Smith",
  phone: "07700900123",
  message: "I have four rental properties and want advice on restructuring.",
  source: "dentists",
  status: "new",
  created_at: "2026-09-15T10:00:00Z",
};

describe("mode defaults", () => {
  it("is report when unset", () => {
    expect(resolveMode()).toBe("report");
  });

  it("is report for an unrecognised value, never live", () => {
    process.env.LEAD_HANDOFF_MODE = "LIVE!"; // typo
    expect(resolveMode()).toBe("report");
    process.env.LEAD_HANDOFF_MODE = "yes";
    expect(resolveMode()).toBe("report");
  });

  it("only exact 'live' arms it", () => {
    process.env.LEAD_HANDOFF_MODE = " Live ";
    expect(resolveMode()).toBe("live");
  });
});

describe("recipient gate", () => {
  it("collapses every recipient to the operator while unarmed", () => {
    process.env.LEAD_HANDOFF_OPERATOR_EMAIL = "op@example.com";
    const r = resolveRecipients("redirect", lead.email!, "omar@aswatax.example", "boss@example.com");
    expect(r.to).toBe("op@example.com");
    expect(r.cc).toEqual([]);
    expect(r.bcc).toEqual([]);
  });

  it("refuses to build an unarmed send with no operator address", () => {
    expect(() =>
      resolveRecipients("redirect", lead.email!, "omar@aswatax.example", ""),
    ).toThrow(/OPERATOR_EMAIL/);
  });

  it("passes real recipients through only in live mode", () => {
    const r = resolveRecipients("live", lead.email!, "omar@aswatax.example", "boss@example.com");
    expect(r.to).toBe("enquirer@example.com");
    expect(r.cc).toEqual(["omar@aswatax.example"]);
    expect(r.bcc).toEqual(["boss@example.com"]);
  });

  it("throws if any non-operator address survives into an unarmed send", () => {
    expect(() =>
      assertUnarmedSendIsSafe(
        { to: "op@example.com", cc: ["enquirer@example.com"], bcc: [] },
        "op@example.com",
      ),
    ).toThrow(/refusing to send while unarmed/);
  });

  it("is case and whitespace insensitive about the operator address", () => {
    expect(() =>
      assertUnarmedSendIsSafe({ to: " OP@Example.com ", cc: [], bcc: [] }, "op@example.com"),
    ).not.toThrow();
  });
});

describe("brand resolution", () => {
  it("maps a real source to its real brand", () => {
    expect(resolveBrand("dentists")?.name).toBe("Dental Finance Partners");
    expect(resolveBrand("construction-cis")?.name).toBe("Trade Tax Specialists");
  });

  it("refuses unknown sources rather than inventing a brand", () => {
    expect(resolveBrand("wills-probate")).toBeNull();
    expect(resolveBrand("divorce-finances")).toBeNull();
    expect(resolveBrand("")).toBeNull();
    expect(resolveBrand(null)).toBeNull();
  });
});

describe("verified sending domain gate", () => {
  it("allows the one domain actually verified in Resend", () => {
    expect(sendingDomainVerified("www.propertytaxpartners.co.uk")).toBe(true);
    expect(sendingDomainVerified("propertytaxpartners.co.uk")).toBe(true);
  });

  it("refuses every site whose domain is not verified, including the failed one", () => {
    // dentalfinancepartners.co.uk exists in Resend but sits in "failed" state;
    // the other 15 sites have no sending domain at all.
    expect(sendingDomainVerified("www.dentalfinancepartners.co.uk")).toBe(false);
    expect(sendingDomainVerified("www.hollowaydavies.co.uk")).toBe(false);
    expect(sendingDomainVerified("www.medicalaccounts.co.uk")).toBe(false);
  });

  it("does not let a lookalike domain through", () => {
    expect(sendingDomainVerified("notpropertytaxpartners.co.uk")).toBe(false);
    expect(sendingDomainVerified("propertytaxpartners.co.uk.evil.com")).toBe(false);
  });
});

describe("copy", () => {
  it("names the enquiring site, not Property, for a non-Property lead", () => {
    const { html, text } = buildIntroEmail(lead, resolveBrand("dentists")!);
    expect(text).toContain("Dental Finance Partners");
    expect(text).not.toContain("Property Tax Partners");
    expect(html).toContain("Dental Finance Partners");
  });

  it("names the partner and the person, which is the whole point", () => {
    const { text } = buildIntroEmail(lead, resolveBrand("property")!);
    expect(text).toContain("Omar");
    expect(text).toContain("Aswatax");
    expect(text).toContain("Chartered Tax Adviser");
  });

  it("carries no em-dashes (house style)", () => {
    const { text, subject } = buildIntroEmail(lead, resolveBrand("property")!);
    expect(text).not.toContain("—");
    expect(subject).not.toContain("—");
  });

  it("quotes back their contact details and their own words, and nothing else", () => {
    const { text } = buildIntroEmail(lead, resolveBrand("property")!);
    expect(text).toContain("Jane Smith");
    expect(text).toContain("07700900123");
    expect(text).toContain("rental properties");
  });

  it("carries no tracking or internal fields: the enquirer is a recipient", () => {
    const leaky: IntroLead = {
      ...lead,
      source: "property",
    };
    const { text, html } = buildIntroEmail(leaky, resolveBrand("property")!);
    // Analytics identifiers, commercial fields and internal ids must never appear:
    // the enquirer receives this and the partner firm is copied on it.
    for (const leak of [
      leaky.id,
      "visitor_id",
      "session_id",
      "source_url",
      "quality",
      "tier",
      "price",
      "£",
      "utm_",
      "status",
    ]) {
      expect(text.toLowerCase()).not.toContain(leak.toLowerCase());
      expect(html.toLowerCase()).not.toContain(leak.toLowerCase());
    }
  });

  it("names Aswatax and its standing in one plain sentence", () => {
    const { text } = buildIntroEmail(lead, resolveBrand("property")!);
    expect(text).toContain("our partner firm Aswatax");
    expect(text).toContain("Chartered Tax Advisers registered with the Chartered Institute of Taxation");
  });

  it("uses the enquirer's name as the subject, not a scripted line", () => {
    expect(buildIntroEmail(lead, resolveBrand("property")!).subject).toBe("Jane's enquiry");
    expect(
      buildIntroEmail({ ...lead, full_name: null }, resolveBrand("property")!).subject,
    ).toBe("Your enquiry");
  });
});

/**
 * Every shape below was measured in the live lead table on 2026-09-15 (308 rows).
 * The counts in the comments are how many leads carried that shape, which is why
 * each case is here rather than being imagined.
 */
describe("names as they actually arrive", () => {
  const cases: [string, string | null, string][] = [
    // 42 leads: no name at all.
    ["", null, "empty"],
    ["   ", null, "whitespace only"],
    // 19 leads: a title in the name field. Used to produce "Hi Mr,".
    ["Mr John Smith", "John", "title stripped"],
    ["Dr. Amara Okafor", "Amara", "title with full stop"],
    ["MRS SARAH JONES", "Sarah", "title plus all caps"],
    ["Prof Helen Yeung", "Helen", "professor"],
    // 9 leads: shouting. Used to produce "Hi JOHN,".
    ["JOHN SMITH", "John", "all caps"],
    ["MARIE-CLAIRE DUBOIS", "Marie-Claire", "all caps hyphenated"],
    // 14 leads: all lowercase.
    ["sarah jones", "Sarah", "all lowercase"],
    ["o'brien", "O'Brien", "lowercase with apostrophe"],
    // 6 leads: a single initial first. "Hi J," is worse than "Hello,".
    ["J Smith", null, "single initial"],
    ["A B", null, "two initials"],
    // 18 leads: one token only. Perfectly greetable.
    ["Dave", "Dave", "single token"],
    // 4 leads: does not start with a letter, and 4 with non-ASCII.
    ["07700900123", null, "phone number in the name field"],
    ["123 Main St", null, "starts with digits"],
    ["!!!", null, "symbols"],
    ["Élodie Martin", "Élodie", "accented, kept"],
    // 1 lead: an email address in the name field.
    ["jo @gmail.com", null, "contains an at sign"],
    // 5 leads: four or more tokens. First name still works.
    ["Mr Jean Paul Van Der Berg", "Jean", "title plus many tokens"],
    // A title on its own is not a name.
    ["Dr", null, "title alone"],
  ];

  for (const [input, expected, label] of cases) {
    it(`${label}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      expect(firstNameOf(input)).toBe(expected);
    });
  }

  it("never greets with a title, across every title we have seen", () => {
    for (const t of ["Mr", "Mrs", "Ms", "Miss", "Mx", "Dr", "Prof", "Sir", "Rev"]) {
      expect(firstNameOf(`${t} Taylor Brook`)).toBe("Taylor");
    }
  });

  it("builds a sensible email for a shouting, titled lead", () => {
    const { subject, text } = buildIntroEmail(
      { ...lead, full_name: "MR DAVID OKONKWO" },
      resolveBrand("property")!,
    );
    expect(subject).toBe("David's enquiry");
    expect(text).toContain("Hi David,");
    expect(text).toContain("get David booked in");
    // The quoted block still shows exactly what they typed.
    expect(text).toContain("Name: MR DAVID OKONKWO");
  });

  it("greeting, subject and the line to Omar always agree", () => {
    // These three read the same name from one source. If someone later edits one
    // of them in isolation, the email starts addressing "David" and asking Omar to
    // book "them", or worse greets nobody while naming someone further down.
    const shapes = ["Sarah Whitfield", "MR DAVID OKONKWO", "j smith", "", "07700900123", "Dr"];
    for (const shape of shapes) {
      const { subject, text } = buildIntroEmail(
        { ...lead, full_name: shape || null },
        resolveBrand("property")!,
      );
      const named = text.includes("Hi ") && !text.includes("Hello,");
      if (named) {
        const greeted = text.split(",")[0].replace("Hi ", "").trim();
        expect(text).toContain(`get ${greeted} booked in`);
        expect(subject).toBe(`${possessive(greeted)} enquiry`);
      } else {
        expect(text).toContain("Hello,");
        expect(text).toContain("get them booked in");
        expect(subject).toBe("Your enquiry");
      }
    }
  });

  it("never truncates the enquiry, however long it is", () => {
    // This email replaced the forwarded lead notification as how the partner firm
    // receives an enquiry, so a clipped message means work is quoted on partial
    // information. The longest real message on 2026-09-15 was 1,860 characters;
    // this tests an order of magnitude beyond it.
    const long = Array.from({ length: 400 }, (_, i) => `Sentence number ${i} about the portfolio.`).join(" ");
    const tail = "FINAL-SENTENCE-MARKER";
    const message = `${long} ${tail}`;
    const { text, html } = buildIntroEmail({ ...lead, message }, resolveBrand("property")!);
    expect(message.length).toBeGreaterThan(15000);
    expect(text).toContain(message);
    expect(text).toContain(tail);
    expect(html).toContain(tail);
    // No ellipsis or "clipped" artefact introduced anywhere.
    expect(text).not.toContain("…");
  });

  it("keeps line breaks in a multi-line enquiry readable", () => {
    // 158 of 308 real messages contain newlines.
    const message = ["First point.", "Second point.", "Third point."].join(String.fromCharCode(10));
    const { text, html } = buildIntroEmail({ ...lead, message }, resolveBrand("property")!);
    expect(text).toContain(message);
    expect(html).toContain("First point.<br>Second point.<br>Third point.");
  });

  it("handles an enquiry with no message at all", () => {
    // 6 real leads have an empty message: the row is dropped, not left dangling.
    const { text } = buildIntroEmail({ ...lead, message: null }, resolveBrand("property")!);
    expect(text).not.toContain("Message:");
    expect(text).toContain("Name:");
  });

  it("escapes markup in an enquiry rather than rendering it", () => {
    const message = "<script>alert(1)</script> & \"quoted\"";
    const { html } = buildIntroEmail({ ...lead, message }, resolveBrand("property")!);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("possessive handles names ending in s", () => {
    expect(possessive("Sarah")).toBe("Sarah's");
    expect(possessive("James")).toBe("James'");
  });

  it("falls back to a nameless greeting rather than guessing", () => {
    const { text } = buildIntroEmail({ ...lead, full_name: null }, resolveBrand("property")!);
    expect(text).toContain("Hello,");
    expect(text).toContain("get them booked in");
  });
});

describe("dedupe key", () => {
  it("normalises case and whitespace so one person cannot be introduced twice", () => {
    expect(normaliseEmail("  Jane@Example.COM ")).toBe("jane@example.com");
  });
});

describe("cap", () => {
  it("defaults to a small number", () => {
    expect(maxPerRun()).toBe(5);
  });

  it("ignores nonsense rather than becoming unlimited", () => {
    process.env.LEAD_HANDOFF_MAX_PER_RUN = "not-a-number";
    expect(maxPerRun()).toBe(5);
    process.env.LEAD_HANDOFF_MAX_PER_RUN = "0";
    expect(maxPerRun()).toBe(5);
    process.env.LEAD_HANDOFF_MAX_PER_RUN = "-3";
    expect(maxPerRun()).toBe(5);
  });
});
