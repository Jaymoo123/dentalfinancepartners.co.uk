/**
 * Guard for phase 0.8: journeyModel.load() must never trust the shape of the value
 * stored under `ptp_journey`.
 *
 * getJourneyProfile() is called during SpecialistWidget's render, and the widget is
 * mounted in the root layout, above app/error.tsx. A TypeError there escalates to
 * global-error.tsx, so the visitor gets a full-screen Application Error instead of
 * the page. This test fails if the cast ever comes back.
 */
import { describe, it, expect, beforeEach, afterAll } from "vitest";

// vitest runs environment: "node", so stand up the minimum window the module reads.
const store = new Map<string, string>();
const stubWindow = {
  sessionStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  },
  location: { pathname: "/section-24" },
};
const hadWindow = "window" in globalThis;
(globalThis as unknown as { window: unknown }).window = stubWindow;

const { getJourneyProfile, recordPath, _resetJourneyModel } = await import("@/lib/intent/journeyModel");

afterAll(() => {
  if (!hadWindow) delete (globalThis as unknown as { window?: unknown }).window;
});

describe("journeyModel load()", () => {
  beforeEach(() => {
    store.clear();
    _resetJourneyModel();
  });

  const corrupt = ["null", "0", '"x"', "[]", "{}", '{"pages":null}', '{"pages":"nope"}', '{"pages":{}}', "not json at all"];

  it.each(corrupt)("survives a corrupt ptp_journey value: %s", (bad) => {
    store.set("ptp_journey", bad);
    _resetJourneyModel();
    store.set("ptp_journey", bad);
    expect(() => getJourneyProfile()).not.toThrow();
    expect(() => recordPath("/section-24")).not.toThrow();
  });

  it("still reads a well-formed trail", () => {
    store.set(
      "ptp_journey",
      JSON.stringify({
        pages: [{ path: "/section-24", topic: "section24", firstTs: 1, lastTs: 2, maxScrollPct: 80, sections: 5, computed: false }],
        usedCalculator: false,
        visitedAbout: true,
        visitedServices: false,
        visitedContact: false,
        friction: false,
      }),
    );
    const profile = getJourneyProfile();
    expect(profile.pageCount).toBe(1);
    expect(profile.signals).toContain("visited-about");
    expect(profile.signals).toContain("deep-read");
  });
});
