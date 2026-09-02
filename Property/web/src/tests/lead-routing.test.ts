/**
 * Lead-notification recipient + CC routing. Guards two rules: Property's own
 * leads go to the Ashfield Trading inbox (every other site to the shared internal
 * inbox), and every site except synthetic test leads copies the partner CC
 * (umair@propertytaxpartners.co.uk, owner instruction 2026-09-01). env is
 * injected so each case is isolated from process.env.
 */
import { describe, it, expect } from "vitest";
import {
  resolveLeadCc,
  resolveLeadTo,
  ccExcludedSources,
  DEFAULT_PARTNER_CC,
  DEFAULT_CC_EXCLUDED_SOURCES,
  DEFAULT_NOTIFY_TO,
  PROPERTY_NOTIFY_TO,
} from "@/lib/lead-routing";

const empty: Record<string, string | undefined> = {};

describe("resolveLeadCc", () => {
  it("copies the partner by default", () => {
    expect(DEFAULT_PARTNER_CC).toBe("umair@propertytaxpartners.co.uk");
  });

  it("copies the partner on every site's leads except synthetic test leads", () => {
    for (const source of [
      "property",
      "dentists",
      "medical",
      "solicitors",
      "generalist",
      "agency",
      "contractors-ir35",
    ]) {
      expect(resolveLeadCc(source, empty)).toEqual([DEFAULT_PARTNER_CC]);
    }
    expect(resolveLeadCc("test", empty)).toEqual([]);
  });

  it("copies the partner when source is missing or empty", () => {
    expect(resolveLeadCc(undefined, empty)).toEqual([DEFAULT_PARTNER_CC]);
    expect(resolveLeadCc("", empty)).toEqual([DEFAULT_PARTNER_CC]);
  });

  it("honours an explicit LEADS_NOTIFY_CC list for non-excluded sites only", () => {
    const env = { LEADS_NOTIFY_CC: "a@x.com, b@y.com" };
    expect(resolveLeadCc("dentists", env)).toEqual(["a@x.com", "b@y.com"]);
    expect(resolveLeadCc("property", env)).toEqual(["a@x.com", "b@y.com"]);
    expect(resolveLeadCc("test", env)).toEqual([]); // synthetic leads never CC'd
  });

  it("honours a custom exclude list alongside an explicit CC", () => {
    const env = {
      LEADS_NOTIFY_CC: "a@x.com",
      LEADS_NOTIFY_CC_EXCLUDE_SOURCES: "property, dentists",
    };
    expect(resolveLeadCc("dentists", env)).toEqual([]);
    expect(resolveLeadCc("medical", env)).toEqual(["a@x.com"]);
  });
});

describe("ccExcludedSources", () => {
  it("defaults to synthetic test leads only", () => {
    expect(ccExcludedSources(empty)).toEqual(["test"]);
    expect(DEFAULT_CC_EXCLUDED_SOURCES).toBe("test");
  });
});

describe("resolveLeadTo", () => {
  it("sends Property's own leads to the Ashfield Trading inbox (default)", () => {
    expect(resolveLeadTo("property", empty)).toBe(PROPERTY_NOTIFY_TO);
    expect(PROPERTY_NOTIFY_TO).toBe("junayd@ashfieldtrading.com");
  });

  it("sends every other site's leads to the shared internal inbox (default)", () => {
    for (const source of ["dentists", "medical", "solicitors", "generalist", "agency", "contractors-ir35"]) {
      expect(resolveLeadTo(source, empty)).toBe(DEFAULT_NOTIFY_TO);
    }
    expect(DEFAULT_NOTIFY_TO).toBe("junayd@ashfieldtrading.com");
  });

  it("sends synthetic test leads only to the operator (never a vendor)", () => {
    expect(resolveLeadTo("test", empty)).toBe(DEFAULT_NOTIFY_TO);
    expect(resolveLeadTo("test", { LEADS_NOTIFY_TO_TEST: "probe@ashfieldtrading.com" })).toBe(
      "probe@ashfieldtrading.com",
    );
  });

  it("matches the Property source case-insensitively and trims whitespace", () => {
    expect(resolveLeadTo("Property", empty)).toBe(PROPERTY_NOTIFY_TO);
    expect(resolveLeadTo("  property  ", empty)).toBe(PROPERTY_NOTIFY_TO);
  });

  it("treats a missing or empty source as a non-Property site", () => {
    expect(resolveLeadTo(undefined, empty)).toBe(DEFAULT_NOTIFY_TO);
    expect(resolveLeadTo("", empty)).toBe(DEFAULT_NOTIFY_TO);
  });

  it("lets LEADS_NOTIFY_TO_PROPERTY override the Property inbox", () => {
    const env = { LEADS_NOTIFY_TO_PROPERTY: "leads@ashfieldtrading.com" };
    expect(resolveLeadTo("property", env)).toBe("leads@ashfieldtrading.com");
  });

  it("lets LEADS_NOTIFY_TO override the default inbox WITHOUT affecting Property", () => {
    const env = { LEADS_NOTIFY_TO: "inbox@example.com" };
    expect(resolveLeadTo("dentists", env)).toBe("inbox@example.com");
    expect(resolveLeadTo("property", env)).toBe(PROPERTY_NOTIFY_TO); // Property unaffected
  });
});
