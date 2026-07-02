/**
 * Intent engine — booking-nudge continuity (C4).
 *
 * The engine is pure (context in, action out), so these tests pin the exact
 * behaviour change: a converted visitor holding a live booking capability gets
 * a booking offer on the sticky CTA + returning bar instead of suppression;
 * without the nudge, converted suppression is exactly as before.
 */
import { describe, it, expect } from "vitest";
import { evaluate, type IntentContext } from "@/lib/intent/engine";

function ctx(overrides: Partial<IntentContext> = {}): IntentContext {
  return {
    pageTopic: "section-24",
    entryTopic: null,
    lastTopic: null,
    returning: false,
    converted: false,
    scrollPct: 0,
    engagedMs: 0,
    isMobile: false,
    bookingNudge: null,
    ...overrides,
  };
}

describe("sticky_cta booking nudge", () => {
  it("converted + live nudge -> booking offer with the tokenised /book href", () => {
    const a = evaluate("sticky_cta", ctx({ converted: true, bookingNudge: { token: "tok/+=abc" } }));
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("booking_nudge");
    expect(a!.variant).toBe("booking");
    expect(a!.offer.kind).toBe("booking");
    expect(a!.offer.title).toBe("Pick your callback slot");
    expect(a!.offer.blurb).toBe(
      "It takes about 20 seconds and a specialist will call you at the time you choose.",
    );
    expect(a!.offer.href).toBe(`/book?t=${encodeURIComponent("tok/+=abc")}`);
  });

  it("converted without a nudge -> still suppressed (unchanged)", () => {
    expect(evaluate("sticky_cta", ctx({ converted: true }))).toBeNull();
  });

  it("converted with the nudge field absent entirely -> still suppressed (field is optional)", () => {
    const c = ctx({ converted: true });
    delete (c as { bookingNudge?: unknown }).bookingNudge;
    expect(evaluate("sticky_cta", c)).toBeNull();
  });

  it("not converted -> normal topic offer, never the booking offer", () => {
    const a = evaluate("sticky_cta", ctx({ bookingNudge: { token: "tok" } }));
    expect(a).not.toBeNull();
    expect(a!.ruleId).not.toBe("booking_nudge");
    expect(a!.offer.kind).not.toBe("booking");
  });

  it("falls back to the services topic when the page has none", () => {
    const a = evaluate(
      "sticky_cta",
      ctx({ converted: true, pageTopic: null, bookingNudge: { token: "tok" } }),
    );
    expect(a).not.toBeNull();
    expect(a!.topic).toBe("services");
  });
});

describe("hero_cta stays suppressed for converted visitors", () => {
  it("even with a live nudge (booking is sticky-bar + returning-bar only)", () => {
    expect(evaluate("hero_cta", ctx({ converted: true, bookingNudge: { token: "tok" } }))).toBeNull();
  });
});

describe("returning_bar booking nudge", () => {
  it("returning + converted + live nudge -> booking offer keyed to their last topic", () => {
    const a = evaluate(
      "returning_bar",
      ctx({ returning: true, converted: true, lastTopic: "incorporation", bookingNudge: { token: "tok" } }),
    );
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("booking_nudge");
    expect(a!.offer.kind).toBe("booking");
    expect(a!.offer.href).toBe("/book?t=tok");
    expect(a!.topic).toBe("incorporation");
  });

  it("returning + converted + live nudge, no topic trail -> falls back to services", () => {
    const a = evaluate(
      "returning_bar",
      ctx({ returning: true, converted: true, pageTopic: null, bookingNudge: { token: "tok" } }),
    );
    expect(a).not.toBeNull();
    expect(a!.topic).toBe("services");
  });

  it("returning + converted, no nudge -> suppressed (unchanged)", () => {
    expect(
      evaluate("returning_bar", ctx({ returning: true, converted: true, lastTopic: "incorporation" })),
    ).toBeNull();
  });

  it("not returning -> null even with a live nudge (it is the returning bar)", () => {
    expect(
      evaluate("returning_bar", ctx({ converted: true, bookingNudge: { token: "tok" } })),
    ).toBeNull();
  });

  it("returning + not converted -> normal returning greeting (unchanged)", () => {
    const a = evaluate("returning_bar", ctx({ returning: true, lastTopic: "section-24" }));
    expect(a).not.toBeNull();
    expect(a!.ruleId).toBe("returning_welcome");
  });
});
