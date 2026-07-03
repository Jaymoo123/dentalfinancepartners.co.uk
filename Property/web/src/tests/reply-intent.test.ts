/**
 * Unit tests for the reply intent classifier.
 *
 * Covers all opt-out phrases (including the three INBOUND-4 findings), positive
 * engagement signals, ambiguous replies, and the key boundary case that ensures
 * compound tokens like "STOPWATCH" are never treated as opt-outs.
 */
import { describe, it, expect } from "vitest";
import { classifyReplyIntent, classifyEmailReplyIntent } from "@/lib/leads/reply-intent";

// ── Opt-out ───────────────────────────────────────────────────────────────────

describe("opt_out — CTIA carrier keywords (exact)", () => {
  it.each([
    ["STOP"],
    ["STOPALL"],
    ["UNSUBSCRIBE"],
    ["CANCEL"],
    ["END"],
    ["QUIT"],
  ])("'%s' is opt_out", (body) => {
    expect(classifyReplyIntent(body)).toBe("opt_out");
  });
});

describe("opt_out — CTIA keywords case-insensitive and with surrounding punctuation", () => {
  it("lowercase 'stop' is opt_out", () => {
    expect(classifyReplyIntent("stop")).toBe("opt_out");
  });

  it("'STOP.' (trailing period) is opt_out", () => {
    expect(classifyReplyIntent("STOP.")).toBe("opt_out");
  });

  it("'  stop  ' (padded) is opt_out", () => {
    expect(classifyReplyIntent("  stop  ")).toBe("opt_out");
  });
});

describe("opt_out — natural-language objections (INBOUND-4 findings)", () => {
  it("'please stop' is opt_out", () => {
    expect(classifyReplyIntent("please stop")).toBe("opt_out");
  });

  it("'not interested' is opt_out", () => {
    expect(classifyReplyIntent("not interested")).toBe("opt_out");
  });

  it("'wrong number' is opt_out", () => {
    expect(classifyReplyIntent("wrong number")).toBe("opt_out");
  });
});

describe("opt_out — full phrase list", () => {
  it.each([
    ["stop texting me"],
    ["stop messaging"],
    ["please stop contacting me"],
    ["no thanks"],
    ["no thank you"],
    ["remove me"],
    ["do not contact"],
    ["don't contact"],   // apostrophe contraction normalised to "dont"
    ["leave me alone"],
    ["opt out"],
    ["optout"],
    ["unsubscribe me"],
    ["go away"],
  ])("'%s' is opt_out", (body) => {
    expect(classifyReplyIntent(body)).toBe("opt_out");
  });
});

describe("opt_out — bare NO is opt_out", () => {
  it("'NO' is opt_out", () => {
    expect(classifyReplyIntent("NO")).toBe("opt_out");
  });

  it("'no' (lowercase) is opt_out", () => {
    expect(classifyReplyIntent("no")).toBe("opt_out");
  });

  it("'No.' (trailing period) is opt_out", () => {
    expect(classifyReplyIntent("No.")).toBe("opt_out");
  });
});

// ── STOPWATCH boundary case ───────────────────────────────────────────────────

describe("word-boundary protection", () => {
  it("'STOPWATCH' is NOT opt_out (STOP must not match inside a longer token)", () => {
    expect(classifyReplyIntent("STOPWATCH")).not.toBe("opt_out");
  });

  it("'STOPWATCH' classifies as ambiguous", () => {
    expect(classifyReplyIntent("STOPWATCH")).toBe("ambiguous");
  });

  it("'UNSUBSCRIBED' does not trigger the UNSUBSCRIBE opt-out", () => {
    expect(classifyReplyIntent("UNSUBSCRIBED")).not.toBe("opt_out");
  });
});

// ── Positive ──────────────────────────────────────────────────────────────────

describe("positive — short affirmations", () => {
  it.each([
    ["YES"],
    ["yes"],
    ["Yeah"],
    ["YEP"],
    ["Y"],
    ["OK"],
    ["okay"],
    ["Sure"],
    ["PLEASE DO"],
    ["go ahead"],
    ["sounds good"],
    ["please call"],
    ["call me"],
  ])("'%s' is positive", (body) => {
    expect(classifyReplyIntent(body)).toBe("positive");
  });
});

describe("positive — day/time references", () => {
  it("'call me tomorrow' is positive", () => {
    expect(classifyReplyIntent("call me tomorrow")).toBe("positive");
  });

  it("'Monday works for me' is positive", () => {
    expect(classifyReplyIntent("Monday works for me")).toBe("positive");
  });

  it("'after 6pm' is positive", () => {
    expect(classifyReplyIntent("after 6pm")).toBe("positive");
  });

  it("'after 6' is positive", () => {
    expect(classifyReplyIntent("after 6")).toBe("positive");
  });

  it("'6pm is fine' is positive", () => {
    expect(classifyReplyIntent("6pm is fine")).toBe("positive");
  });

  it("'morning please' is positive", () => {
    expect(classifyReplyIntent("morning please")).toBe("positive");
  });

  it("'afternoon is better' is positive", () => {
    expect(classifyReplyIntent("afternoon is better")).toBe("positive");
  });

  it("'evening would be good' is positive", () => {
    expect(classifyReplyIntent("evening would be good")).toBe("positive");
  });

  it("'anytime on Tuesday' is positive", () => {
    expect(classifyReplyIntent("anytime on Tuesday")).toBe("positive");
  });
});

describe("positive — ends with question mark", () => {
  it("'can you help?' is positive", () => {
    expect(classifyReplyIntent("can you help?")).toBe("positive");
  });

  it("'what do you need from me?' is positive", () => {
    expect(classifyReplyIntent("what do you need from me?")).toBe("positive");
  });

  it("'is this free?' is positive", () => {
    expect(classifyReplyIntent("is this free?")).toBe("positive");
  });
});

// ── Ambiguous ─────────────────────────────────────────────────────────────────

describe("ambiguous — unclear or non-committal replies", () => {
  it.each([
    ["who is this"],
    ["maybe later"],
    ["how much"],
    ["thinking about it"],
    ["will think about it"],
    ["I'll get back to you"],
    ["busy right now"],
    ["STOPWATCH"],    // boundary case already tested above; also listed here for clarity
  ])("'%s' is ambiguous", (body) => {
    expect(classifyReplyIntent(body)).toBe("ambiguous");
  });
});

// ── Opt-out takes priority over positive ──────────────────────────────────────

describe("opt_out beats positive when both signals appear", () => {
  it("'please do not contact' returns opt_out not positive (DO NOT CONTACT > PLEASE DO)", () => {
    // 'PLEASE DO' is in the positive phrases, but 'DO NOT CONTACT' is
    // an opt-out phrase and opt_out is evaluated first.
    expect(classifyReplyIntent("please do not contact")).toBe("opt_out");
  });
});

// ── Email reply intent (classifyEmailReplyIntent) ─────────────────────────────
// Regression suite for the 2026-07-03 incident: a Hotmail reply whose unstripped
// quote contained our own "reply STOP" footer was falsely opted out.

describe("classifyEmailReplyIntent — the 2026-07-03 false-opt-out class", () => {
  it("a long reply containing our quoted footer is GENUINE, not opt-out", () => {
    const body =
      "Hi, it's Junayd. Best number is 07500 897741, tomorrow afternoon works.\n\n" +
      "Thanks for your message, one quick thing so we can help properly...\n" +
      "To opt out, just reply STOP.";
    expect(classifyEmailReplyIntent(body)).toBe("genuine");
  });

  it("the older linked footer wording is also inert", () => {
    const body = "Yes please call me. Opt out of these emails";
    expect(classifyEmailReplyIntent(body)).toBe("genuine");
  });

  it("a bare 'stop' inside a long conversational body is genuine ('stop by')", () => {
    const body =
      "Happy to talk this through, you could even stop by the office if easier. " +
      "I have three buy to lets and want to discuss incorporation options soon.";
    expect(classifyEmailReplyIntent(body)).toBe("genuine");
  });
});

describe("classifyEmailReplyIntent — real opt-outs still honoured", () => {
  it.each([
    ["STOP"],
    ["stop"],
    ["No"],
    ["unsubscribe"],
    ["please stop"],
    ["opt out"],
  ])("short reply '%s' is an opt-out", (body) => {
    expect(classifyEmailReplyIntent(body)).toBe("opt_out");
  });

  it.each([
    ["Please unsubscribe me from these emails, I have found another accountant."],
    ["I'm not interested in this service any more, thanks anyway for the info."],
    ["Do not contact me again about this, I never asked for these messages."],
    ["Wrong person, I never enquired about property tax. Remove me please."],
    ["Could you stop emailing me about this? I've already sorted my tax position."],
  ])("long reply with an explicit phrase is an opt-out: '%s'", (body) => {
    expect(classifyEmailReplyIntent(body)).toBe("opt_out");
  });

  it("an 'unsubscribe' SUBJECT is honoured regardless of body", () => {
    expect(classifyEmailReplyIntent("see subject", "unsubscribe")).toBe("opt_out");
  });
});
