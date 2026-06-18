/**
 * Lead-notification CC routing. Guards the rule that Property's own leads go to
 * the internal inbox only (no partner CC), while every other site still copies
 * the partner firm. env is injected so each case is isolated from process.env.
 */
import { describe, it, expect } from "vitest";
import {
  resolveLeadCc,
  ccExcludedSources,
  DEFAULT_PARTNER_CC,
  DEFAULT_CC_EXCLUDED_SOURCES,
} from "@/lib/lead-routing";

const empty: Record<string, string | undefined> = {};

describe("resolveLeadCc", () => {
  it("does NOT copy the partner on Property leads (default exclusion)", () => {
    expect(resolveLeadCc("property", empty)).toEqual([]);
  });

  it("copies the partner on every other site's leads", () => {
    for (const source of ["dentists", "medical", "solicitors", "generalist", "agency", "contractors-ir35"]) {
      expect(resolveLeadCc(source, empty)).toEqual([DEFAULT_PARTNER_CC]);
    }
  });

  it("matches the Property source case-insensitively and trims whitespace", () => {
    expect(resolveLeadCc("Property", empty)).toEqual([]);
    expect(resolveLeadCc("  property  ", empty)).toEqual([]);
    expect(resolveLeadCc("PROPERTY", empty)).toEqual([]);
  });

  it("copies the partner when source is missing or empty (not Property)", () => {
    expect(resolveLeadCc(undefined, empty)).toEqual([DEFAULT_PARTNER_CC]);
    expect(resolveLeadCc("", empty)).toEqual([DEFAULT_PARTNER_CC]);
  });

  it("honours a custom partner CC list for non-excluded sites", () => {
    const env = { LEADS_NOTIFY_CC: "a@x.com, b@y.com" };
    expect(resolveLeadCc("dentists", env)).toEqual(["a@x.com", "b@y.com"]);
    expect(resolveLeadCc("property", env)).toEqual([]); // still excluded
  });

  it("honours a custom exclude list (e.g. also exclude dentists)", () => {
    const env = { LEADS_NOTIFY_CC_EXCLUDE_SOURCES: "property, dentists" };
    expect(resolveLeadCc("dentists", env)).toEqual([]);
    expect(resolveLeadCc("medical", env)).toEqual([DEFAULT_PARTNER_CC]);
  });

  it("an explicit empty exclude list re-enables the partner on Property", () => {
    const env = { LEADS_NOTIFY_CC_EXCLUDE_SOURCES: "" };
    expect(resolveLeadCc("property", env)).toEqual([DEFAULT_PARTNER_CC]);
  });
});

describe("ccExcludedSources", () => {
  it("defaults to Property only", () => {
    expect(ccExcludedSources(empty)).toEqual([DEFAULT_CC_EXCLUDED_SOURCES]);
    expect(DEFAULT_CC_EXCLUDED_SOURCES).toBe("property");
  });
});
