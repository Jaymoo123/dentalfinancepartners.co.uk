/**
 * Smoke test: Property niche config validates. Ensures the critical fields that
 * the analytics SDK, routing, and lead pipeline depend on are present and correct.
 * This is the F1 regression sentinel — if the config diverges, the test fails
 * before a build lands on prod.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
// Use a relative path so the test works without Next.js module resolution.
import nicheConfig from "../../../niche.config.json";

describe("Property niche config", () => {
  it("has the correct site_key (analytics FK constraint)", () => {
    expect(nicheConfig.content_strategy.site_key).toBe("property");
  });

  it("has the correct source_identifier (lead pipeline key)", () => {
    expect(nicheConfig.content_strategy.source_identifier).toBe("property");
  });

  it("has a non-empty display_name", () => {
    expect(nicheConfig.display_name).toBeTruthy();
  });

  it("has a non-empty domain", () => {
    expect(nicheConfig.domain).toBeTruthy();
    expect(nicheConfig.domain).toContain("propertytaxpartners");
  });

  it("has a non-empty niche_id", () => {
    expect(nicheConfig.niche_id).toBe("property");
  });

  /**
   * Phase 0.9. 21 production client_error rows show `niche` genuinely undefined in
   * some client bundles (partial chunk load). In the assistant widget the
   * dereference sits inside the async submit handler, where no error boundary
   * catches it: the button stays on "Sending..." and the lead is lost. Client
   * components must read the guarded `sourceIdentifier` export from niche-loader.
   * Server files may dereference directly - there is no partial-chunk failure mode.
   */
  it("no client component dereferences niche.content_strategy unguarded", () => {
    const SRC = join(__dirname, "..");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(p);
        } else if (/\.tsx?$/.test(entry.name) && !entry.name.includes(".test.")) {
          const text = readFileSync(p, "utf8");
          if (text.startsWith('"use client"') && text.includes("niche.content_strategy")) {
            offenders.push(p.slice(SRC.length + 1).replace(/\\/g, "/"));
          }
        }
      }
    };
    walk(SRC);
    expect(offenders).toEqual([]);
  });
});
