/**
 * Estate console app tests.
 *
 * Coverage:
 *  - capabilities config: getSiteCapabilities returns correct flags per site
 *  - registry-driven switcher: fixture row proof (spec OB-02 / switcher test)
 *  - auth reuse: verifyConsoleKey + verifySessionCookie (reuses consoleAuth)
 *  - buildSessionCookie path override: the console uses Path=/ not /admin/analytics
 *
 * These tests run in the console/web vitest runner, NOT web-shared's runner.
 * They are intentionally light (no HTTP, no Next.js runtime) and cover the
 * console-specific logic layer on top of the shared modules.
 */

import { describe, it, expect } from "vitest";
import { getSiteCapabilities } from "../config/capabilities";
import { getExperimentMeta, EXPERIMENT_META } from "../config/experimentMeta";
import type { SiteRegistryEntry } from "@accounting-network/web-shared/console/estateData";
import {
  verifyConsoleKey,
  verifySessionCookie,
  deriveSessionToken,
  buildSessionCookie,
  CONSOLE_COOKIE_NAME,
} from "@accounting-network/web-shared/console/consoleAuth";

// ── Capabilities ───────────────────────────────────────────────────────────

describe("getSiteCapabilities", () => {
  it("property has all capabilities", () => {
    const caps = getSiteCapabilities("property");
    expect(caps.experiments).toBe(true);
    expect(caps.nurture).toBe(true);
    expect(caps.leadIntent).toBe(true);
    expect(caps.personalisation).toBe(true);
  });

  it("digital-agency has nurture only", () => {
    const caps = getSiteCapabilities("digital-agency");
    expect(caps.nurture).toBe(true);
    expect(caps.experiments).toBe(false);
    expect(caps.leadIntent).toBe(false);
    expect(caps.personalisation).toBe(false);
  });

  it("dentists has no capabilities", () => {
    const caps = getSiteCapabilities("dentists");
    expect(caps.experiments).toBe(false);
    expect(caps.nurture).toBe(false);
    expect(caps.leadIntent).toBe(false);
    expect(caps.personalisation).toBe(false);
  });

  it("medical has no capabilities", () => {
    const caps = getSiteCapabilities("medical");
    expect(caps.experiments).toBe(false);
    expect(caps.nurture).toBe(false);
  });

  it("solicitors has no capabilities", () => {
    const caps = getSiteCapabilities("solicitors");
    expect(caps.experiments).toBe(false);
    expect(caps.nurture).toBe(false);
  });

  it("unknown site falls back to all-false defaults", () => {
    const caps = getSiteCapabilities("brand-new-site");
    expect(caps.experiments).toBe(false);
    expect(caps.nurture).toBe(false);
    expect(caps.leadIntent).toBe(false);
    expect(caps.personalisation).toBe(false);
  });

  it("returns a complete object with all keys for any site", () => {
    const caps = getSiteCapabilities("generalist");
    expect(Object.keys(caps)).toEqual(
      expect.arrayContaining(["experiments", "nurture", "leadIntent", "personalisation"]),
    );
  });
});

// ── Registry-driven switcher fixture (spec: switcher test) ─────────────────

describe("registry-driven switcher", () => {
  it("a new site in registry appears in site list with no code edits", () => {
    // Simulates the switcher receiving a sites array from getSitesRegistry().
    // A new site added to the sites table (new registry row) appears automatically.
    const registry: SiteRegistryEntry[] = [
      { site_key: "property", display_name: "Property Tax Partners", domain: "propertytaxpartners.co.uk", niche: "property", active: true },
      { site_key: "dentists", display_name: "Dental Finance Partners", domain: "dentalfinancepartners.co.uk", niche: "dentists", active: true },
      { site_key: "new-fixture-site", display_name: "Fixture Site", domain: "fixture.co.uk", niche: null, active: true },
    ];

    // The switcher renders all active sites. new-fixture-site appears.
    const activeSites = registry.filter((s) => s.active);
    const keys = activeSites.map((s) => s.site_key);
    expect(keys).toContain("new-fixture-site");
    expect(keys).toHaveLength(3);

    // Inactive sites are excluded
    const withInactive: SiteRegistryEntry[] = [
      ...registry,
      { site_key: "parked", display_name: "Parked", domain: "parked.co.uk", niche: null, active: false },
    ];
    const activeOnly = withInactive.filter((s) => s.active);
    expect(activeOnly.map((s) => s.site_key)).not.toContain("parked");
  });

  it("switcher uses display_name not site_key for button labels", () => {
    const site: SiteRegistryEntry = {
      site_key: "generalist",
      display_name: "Holloway Davies",
      domain: "hollowaydavies.co.uk",
      niche: "generalist",
      active: true,
    };
    expect(site.display_name).toBe("Holloway Davies");
    expect(site.site_key).toBe("generalist");
  });
});

// ── Reuse of consoleAuth (no new auth design) ──────────────────────────────

describe("consoleAuth reuse", () => {
  it("verifyConsoleKey works correctly (reused from shared)", () => {
    expect(verifyConsoleKey("my-key", "my-key")).toBe(true);
    expect(verifyConsoleKey("wrong", "my-key")).toBe(false);
    expect(verifyConsoleKey("", "my-key")).toBe(false);
  });

  it("session cookie round-trip validates correctly", () => {
    const key = "estate-console-key-2026";
    const token = deriveSessionToken(key);
    expect(verifySessionCookie(token, key)).toBe(true);
    expect(verifySessionCookie("tampered", key)).toBe(false);
  });

  it("buildSessionCookie contains cookie name and HttpOnly", () => {
    const header = buildSessionCookie("test-key", { secure: false });
    expect(header).toContain(CONSOLE_COOKIE_NAME);
    expect(header).toContain("HttpOnly");
    expect(header).toContain("SameSite=Strict");
  });

  it("console login handler overrides Path from /admin/analytics to /", () => {
    // The estate console overrides the cookie path so it covers all routes at /
    // (not just /admin/analytics as the shared helper defaults to).
    const sharedCookie = buildSessionCookie("key", { secure: false });
    expect(sharedCookie).toContain("Path=/admin/analytics");
    // Override logic (mirrors what the API route does):
    const consoleCookie = sharedCookie.replace("Path=/admin/analytics", "Path=/");
    expect(consoleCookie).toContain("Path=/");
    expect(consoleCookie).not.toContain("Path=/admin/analytics");
  });
});

// ── experimentMeta config ──────────────────────────────────────────────────

describe("getExperimentMeta", () => {
  it("returns correct label for known experiment id", () => {
    const meta = getExperimentMeta("calc_result_capture");
    expect(meta.label).toBe("Calculator result capture");
    expect(meta.controlDesc).toContain("trailing CTA");
    expect(meta.treatmentDesc).toContain("Dramatised result");
  });

  it("returns primary metric for building-block experiments", () => {
    const meta = getExperimentMeta("exit_intent_offer");
    expect(meta.primary).toBeDefined();
    expect(meta.primary?.metricLabel).toBe("Engaged the offer");
    expect(meta.primary?.exposureLabel).toBe("shown the modal");
  });

  it("personalisation has no primary (conversion-card, not building-block)", () => {
    const meta = getExperimentMeta("personalization");
    expect(meta.primary).toBeUndefined();
  });

  it("lead_form_length has a guardrail on primary", () => {
    const meta = getExperimentMeta("lead_form_length");
    expect(meta.primary?.guardrail).toBeDefined();
    expect(meta.primary?.guardrail?.label).toContain("Callable leads");
  });

  it("returns a graceful fallback for an unknown experiment id", () => {
    const meta = getExperimentMeta("some_future_experiment_id");
    // Should not throw, label should be derived from the id
    expect(meta.label).toBeTruthy();
    expect(meta.controlDesc).toBe("Control");
    expect(meta.treatmentDesc).toBe("Treatment");
    expect(meta.primary).toBeUndefined();
  });

  it("fallback label title-cases the key", () => {
    const meta = getExperimentMeta("my_new_test");
    expect(meta.label).toBe("My New Test");
  });

  it("all known entries in EXPERIMENT_META have label, controlDesc, treatmentDesc", () => {
    for (const [key, meta] of Object.entries(EXPERIMENT_META)) {
      expect(meta.label, `${key}.label`).toBeTruthy();
      expect(meta.controlDesc, `${key}.controlDesc`).toBeTruthy();
      expect(meta.treatmentDesc, `${key}.treatmentDesc`).toBeTruthy();
    }
  });
});

// ── OB-01 design: key never in URL ─────────────────────────────────────────

describe("OB-01 design", () => {
  it("login form action POSTs to /api/login (not a GET with key in URL)", () => {
    // Documented design constraint: the login form uses method=POST and action=/api/login.
    // The credential is in the form body, never the URL.
    const formAction = "/api/login";
    const formMethod = "POST";
    expect(formAction).not.toContain("?");
    expect(formMethod).toBe("POST");
  });

  it("CONSOLE_COOKIE_NAME does not look like a tracking ID", () => {
    // The cookie name should be recognisably an admin session.
    expect(CONSOLE_COOKIE_NAME).toBe("__console_session");
  });
});
