/**
 * Port guard over `niche.config.json`, covering the three things the design
 * port can break silently. Deliberately additive to `src/lib/niche-config.test.ts`,
 * which already asserts `site_key`, a truthy `source_identifier`, a hex
 * `primary_color`, the domain, the categories and the blog CTA copy. Nothing
 * there is repeated here.
 *
 * 1. `source_identifier` PINNED to the literal. The existing test only asserts
 *    it is truthy, so a rename to "trade" or "cis" would pass while every lead
 *    from this site landed under a source the pipeline does not recognise. Lead
 *    attribution failing is silent: the form still submits.
 * 2. `brand.primary_color` against the CSS token. The port rewrites the token
 *    layer in `globals.css`; the config copy of the same colour is in a
 *    different file and nothing else keeps the two in step. `--brand-primary`
 *    must also still alias `--accent`, because that is the token every ported
 *    surface reads.
 * 3. Every `navigation[]` entry must resolve to a real route. The chrome rebuild
 *    is regrouping this array from flat to grouped, which is how a sibling port
 *    nearly shipped five dead links: the group headers were authored before the
 *    routes existed. Written against the SUPERSET shape (`children`, `groups`,
 *    flat) using the kit's own `childHrefs`, so it needs no edit when the shape
 *    changes, and it fails on a nav link with no route rather than warning.
 */
import { describe, it, expect } from "vitest";
import { join } from "path";
import {
  childHrefs,
  type NavItemLike,
} from "@accounting-network/web-shared/design/guards/nav-active-state";
import { niche } from "@/config/niche-loader";
import nicheConfig from "../../../../niche.config.json";
import { buildPrimaryNav } from "@/lib/nav";
import { routeExists } from "./route-exists";

const GLOBALS_CSS = join(__dirname, "..", "..", "app", "globals.css");

describe("construction-cis niche config, port guards", () => {
  it("pins source_identifier to the lead-pipeline literal", () => {
    expect(
      niche.content_strategy.source_identifier,
      "lead attribution keys off this string; a drift routes every lead to an unknown source",
    ).toBe("construction-cis");
  });

  it("keeps brand.primary_color in sync with the --accent / --brand-primary token", async () => {
    const { readFileSync } = await import("fs");
    const css = readFileSync(GLOBALS_CSS, "utf8");
    const accent = css.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/)?.[1];
    expect(accent, "globals.css declares no literal --accent colour").toBeTruthy();
    expect(
      niche.brand.primary_color.toLowerCase(),
      "niche.config.json brand.primary_color and globals.css --accent have drifted apart",
    ).toBe(accent!.toLowerCase());
    expect(
      /--brand-primary:\s*var\(--accent\)/.test(css),
      "--brand-primary must alias --accent: it is the token every ported surface reads",
    ).toBe(true);
  });

  it("resolves every navigation entry, at any depth, to a real route", () => {
    // Both the authored config and the built nav SiteHeader renders: the second
    // adds registry-derived groups the first does not contain.
    const nav = (nicheConfig.navigation as NavItemLike[]).concat(
      buildPrimaryNav() as NavItemLike[],
    );
    expect(nav.length).toBeGreaterThan(0);
    const hrefs = nav.flatMap((item) => [item.href, ...childHrefs(item)]).filter(Boolean);
    const dead = hrefs.filter((href) => !href.startsWith("http") && !routeExists(href));
    expect(dead, `navigation links with no route: ${dead.join(", ")}`).toEqual([]);
  });

  it("the resolver really can tell a missing route from a present one", () => {
    // Guards the guard: a resolver that returned true unconditionally would make
    // the dead-link assertion above vacuous.
    expect(routeExists("/contact")).toBe(true);
    expect(routeExists("/no-such-route-exists")).toBe(false);
  });
});
