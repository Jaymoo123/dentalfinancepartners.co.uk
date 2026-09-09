/**
 * Ported from Property's `niche-config.test.ts`. Pins the config fields the
 * analytics SDK, routing and lead pipeline depend on, plus the brand-colour
 * pair the design port touches: `brand.primary_color` in niche.config.json and
 * the `--accent` / `--brand-primary` token in globals.css are the same colour,
 * and a restyle that changes one must change the other.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
// Relative path so the test works without Next.js module resolution.
import nicheConfig from "../../../niche.config.json";

const GLOBALS_CSS = join(__dirname, "..", "app", "globals.css");

describe("generalist niche config", () => {
  it("has the correct site_key (analytics FK constraint)", () => {
    expect(nicheConfig.content_strategy.site_key).toBe("generalist");
  });

  it("has the correct source_identifier (lead pipeline key)", () => {
    expect(nicheConfig.content_strategy.source_identifier).toBe("generalist");
  });

  it("has a non-empty display_name, domain and niche_id", () => {
    expect(nicheConfig.display_name).toBeTruthy();
    expect(nicheConfig.domain).toContain("hollowaydavies");
    expect(nicheConfig.niche_id).toBe("generalist");
  });

  it("keeps brand.primary_color in sync with the --accent token in globals.css", () => {
    const css = readFileSync(GLOBALS_CSS, "utf8");
    const accent = css.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/)?.[1];
    expect(accent, "globals.css declares no literal --accent colour").toBeTruthy();
    expect(
      nicheConfig.brand.primary_color.toLowerCase(),
      "niche.config.json brand.primary_color and globals.css --accent have drifted apart",
    ).toBe(accent!.toLowerCase());
    // --brand-primary is the token every ported surface reads; it must alias --accent.
    expect(/--brand-primary:\s*var\(--accent\)/.test(css)).toBe(true);
  });
});
